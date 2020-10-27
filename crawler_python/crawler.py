from bs4 import element
from athon.db.conexoes.mySQL import Conexao
from athon.crawler_python.assets.armas import AthonScrapArmas
from athon.crawler_python.assets.arenas import AthonScrapArenas
from athon.crawler_python.assets.times import AthonScrapTimes
from athon.crawler_python.assets.jogadores import AthonScrapJogadores

from athon.crawler_python.assets.imagens import AthonScrapJogadoresImagens
from athon.crawler_python.assets.imagens import AthonScrapArenasBandeirasImagens
from athon.crawler_python.assets.imagens import AthonScrapTimesImagens
from athon.crawler_python.assets.imagens import AthonScrapArmasImagens



import random

ARMAS = True
TIMES = True
JOGADORES = True
ARENAS = True

conexao = Conexao(None)
#  limpar os dados iniciais
if ARMAS:
    conexao.delete('DELETE FROM armas', AUTO_INCREMENT=True)
if TIMES:
    conexao.delete('DELETE FROM jogadores', AUTO_INCREMENT=True)
if JOGADORES:
    conexao.delete('DELETE FROM times', AUTO_INCREMENT=True)
if ARENAS:
    conexao.delete('DELETE FROM arenas', AUTO_INCREMENT=True)
    #conexao.delete('DELETE FROM arenas where lat = 0 AND lng = 0')

if ARMAS:
    #  inclusão das armas do jogo
    AthonScrapArmas()
    AthonScrapArmasImagens()

if TIMES:   # https://liquipedia.net/counterstrike
    # inclusão dos times participantes do torneio (limitados a 64)
    athon_times = AthonScrapTimes()
    times = athon_times.times(url='https://liquipedia.net/counterstrike/Portal:Teams')
    conexao.select(campos=['estado_id', 'regiao_id', 'nome'], tabela='estados')
    for time in times:
        # os estados que de cada um dos times será escolhido randomicamente
        # todo: diretamente na conexão é possível verificar os tipos de dados originários e modificar o DataFrame padas
        data = {'estado_id': int(random.choice(conexao.tabela['estado_id'])),
                'nome': time.text,
                'logo': 'https://liquipedia.net' + time.find('a').find('img')['src'],
                'href': 'https://liquipedia.net' + time.find('a')['href']}
        sql = "INSERT INTO times (estado_id, nome, logo, href) VALUES (%(estado_id)s, %(nome)s, %(logo)s, %(href)s)"
        conexao.insert(sql, data)
    AthonScrapTimesImagens()

if JOGADORES:  # https://liquipedia.net/counterstrike
    # inclusão dos jogadores, dentro de suas respectivas equipes
    athon_jogadores = AthonScrapJogadores()
    conexao.select(campos=['time_id', 'href'], tabela='times')
    for index in conexao.tabela.index:
        jogadores = athon_jogadores.jogadores(url=conexao.tabela.loc[index, 'href'])
        for jogador in jogadores:
            data = {'time_id': int(conexao.tabela.loc[index, 'time_id']),
                    'apelido': jogador.findAll('td')[1].text.replace('\n', ''),
                    'nome': jogador.findAll('td')[2].text.replace('\n', ''),
                    'bandeira': 'https://liquipedia.net' + jogador.find('td').find('span').find('a').find('img')['src']}
            sql = '''INSERT INTO jogadores (time_id, apelido, nome, bandeira) 
                        VALUES (%(time_id)s, %(apelido)s, %(nome)s, %(bandeira)s)'''
            conexao.insert(sql, data)
    AthonScrapJogadoresImagens()

if ARENAS:  # https://pt.wikipedia.org/wiki/Lista_dos_maiores_est%C3%A1dios_de_futebol_do_Brasil
    # inclusão dos arenas, locais que os jogos vão ocorrer com a presença de público
    athon_arenas = AthonScrapArenas()
    arenas = athon_arenas.arenas(url='https://pt.wikipedia.org/wiki/Lista_dos_maiores_est%C3%A1dios_de_futebol_do_Brasil')
    sigla  = ''
    capacidade = ''
    bandeira = ''
    for arena in arenas:
        href = arena['arena'].findAll('td')[0].findAll('a')[0]['href']

        # nem sempre haverá uma imagem da arena
        imagem = ''
        imagens = [tr.find('td').findAll('a')
                   for tr in arena['detalhes'].find('tbody').findAll('tr')
                   if type(tr.find('td')) == element.Tag and len(tr.find('td').findAll('a')) > 0]
        if len(imagens) > 0:
            imagem = [imagem.find('img')['src']
                      for imagem in imagens[0]
                      if imagem.find('img') is not None and int(imagem.find('img')['height']) > 10]

        # nem sempre o valor virá preenchido na td, quando não assumirá o último valor.
        try:
            sigla = arena['arena'].findAll('td')[2].findAll('a')[1].text
            bandeira  = arena['arena'].findAll('td')[2].find('img')['src']
        except:
            pass

        # nem sempre o valor virá preenchido na td, quando não assumirá o último valor.
        try:
            capacidade = arena['arena'].findAll('td')[3].text.replace('.', '').strip()
        except:
            pass

        conexao.select(campos=['estado_id'], tabela='estados', where='sigla ={}'.format('"' + sigla + '"'))
        data = {'nome': arena['arena'].findAll('td')[0].findAll('a')[0].text,
                'localidade': arena['arena'].findAll('td')[1].findAll('a')[0].text,
                'estado_id': int(conexao.tabela['estado_id'][0]),
                'bandeira': bandeira,
                'capacidade': capacidade,
                'lat': arena['lat'],
                'lng': arena['lng'],
                'href': 'https://pt.wikipedia.org' + href,
                'img': '' if len(imagem) == 0 else imagem[0]
                }

        sql = '''INSERT INTO arenas (estado_id, nome, localidade, capacidade, lat, lng, href, img, bandeira) 
                    VALUES (%(estado_id)s, %(nome)s, %(localidade)s, %(capacidade)s,
                            %(lat)s, %(lng)s, %(href)s, %(img)s, %(bandeira)s) '''
        conexao.insert(sql, data)
    AthonScrapArenasBandeirasImagens()
