from athon.db.conexoes.mySQL import Conexao
from os import path
import urllib.request
import time


def salvar(url, local):
    if url[:2] == '//':
        url = 'http://' + url[2:]
    urllib.request.urlretrieve(url, local)

def AthonScrapTimesImagens():
    conexao = Conexao(None)
    conexao.select(campos=['logo', 'time_id'], tabela='times')
    logos = conexao.tabela[:]

    for i in logos.index:
        diretorio = "..\\..\\cliente-angular\\athon\\src\\assets\\imagens_times"
        if path.exists(diretorio):
            logo = logos.loc[i, 'logo']
            logo_nome = logo.split('/')[len(logo.split('/'))-1]
            logo_local = diretorio + '\\' + logo_nome
            logo_angular = '/assets/imagens_times/' + logo_nome
            if not(path.exists(logo_local)):
                salvar(logo, logo_local)
                time.sleep(5)
                print(logo_local)
            data = {
                'logo_local': logo_local,
                'logo_nome': logo_nome,
                'logo_angular': logo_angular
                }
            conexao.update('times', data, where='time_id={}'.format(logos.loc[i, 'time_id']))


def AthonScrapJogadoresImagens():
    conexao = Conexao(None)
    conexao.select(campos=['bandeira', 'jogador_id'], tabela='jogadores')
    bandeiras = conexao.tabela[:]

    for i in bandeiras.index:
        diretorio = "..\\..\\cliente-angular\\athon\\src\\assets\\imagens_jogadores"
        if path.exists(diretorio):
            bandeira = bandeiras.loc[i, 'bandeira']
            bandeira_nome = bandeira.split('/')[len(bandeira.split('/'))-1]
            bandeira_local = diretorio + '\\' + bandeira_nome
            bandeira_angular = '/assets/imagens_jogadores/' + bandeira_nome
            if not(path.exists(bandeira_local)):
                salvar(bandeira, bandeira_local)
                time.sleep(5)
                print(bandeira_local)
            data = {
                'bandeira_local': bandeira_local,
                'bandeira_nome': bandeira_nome,
                'bandeira_angular': bandeira_angular
                }
            conexao.update('jogadores', data, where='jogador_id={}'.format(bandeiras.loc[i, 'jogador_id']))


def AthonScrapArenasBandeirasImagens():
    conexao = Conexao(None)
    conexao.select(campos=['bandeira', 'arena_id'], tabela='arenas')
    bandeiras = conexao.tabela[:]

    for i in bandeiras.index:
        diretorio = "..\\..\\cliente-angular\\athon\\src\\assets\\imagens_arenas\\bandeiras"
        if path.exists(diretorio):
            bandeira = bandeiras.loc[i, 'bandeira']
            bandeira_nome = bandeira.split('/')[len(bandeira.split('/'))-1]
            bandeira_nome = bandeira_nome.replace('%', '')
            bandeira_local = diretorio + '\\' + bandeira_nome
            bandeira_angular = '/assets/imagens_arenas/bandeiras/' + bandeira_nome
            if not(path.exists(bandeira_local)):
                salvar(bandeira, bandeira_local)
                time.sleep(5)
                print(bandeira_local)
            data = {
                'bandeira_local': bandeira_local,
                'bandeira_nome': bandeira_nome,
                'bandeira_angular': bandeira_angular
                }
            conexao.update('arenas', data, where='arena_id={}'.format(bandeiras.loc[i, 'arena_id']))


def AthonScrapArmasImagens():
    conexao = Conexao(None)
    conexao.select(campos=['icone', 'arma_id', 'nome'], tabela='armas')
    icones = conexao.tabela[:]

    for i in icones.index:
        diretorio = "..\\..\\cliente-angular\\athon\\src\\assets\\imagens_armas\\icones"
        if path.exists(diretorio):
            icone = icones.loc[i, 'icone']
            icone_nome = icone.split('/')[len(icone.split('/'))-1]
            icone_nome = icones.loc[i, 'nome'] + icone_nome.replace('%', '') + '.png'
            icone_local = diretorio + '\\' + icone_nome
            icone_angular = '/assets/imagens_armas/icones/' + icone_nome
            if not(path.exists(icone_local)):
                salvar(icone, icone_local)
                time.sleep(5)
                print(icone_nome)
            data = {
                'icone_local': icone_local,
                'icone_nome': icone_nome,
                'icone_angular': icone_angular
                }
            conexao.update('armas', data, where='arma_id={}'.format(icones.loc[i, 'arma_id']))


AthonScrapArmasImagens()