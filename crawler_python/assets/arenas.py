from bs4 import BeautifulSoup, element
from athon.crawler_python.assets.latlng import LatLng
from athon.assets_python.regex import Regex
from athon.db.conexoes.mySQL import Conexao
import requests


class AthonScrapArenas(object):
    def __init__(self, **kwargs):
        self.page = None
        self.soup = None
        self.regex = Regex()
        self.limite = kwargs.get('limite', None)
        self.conexao = Conexao(None)

    def arenas(self, url):
        self.page = requests.get(url)
        soup = BeautifulSoup(self.page.content, "html.parser").findAll("table")
        arenas = []

        #  arenas listadas
        ativos = [tr for tr in soup[0].find('tbody') if type(tr) == element.Tag]

        #  obter a lista de renas com link ativo, contendo a descrição das mesmas
        for idx, ativo in enumerate(ativos):
            if self.limite is None or idx < self.limite:
                # encontrou link dentro da tabela
                if len(ativo.findAll('a')) > 0:
                    # verificar usando Regex, se trata-se de um link válido
                    href = 'https://pt.wikipedia.org' + ativo.findAll('a')[0]['href']
                    if href is not None:
                        posicao = self.regex.busca(self.regex.LINK, href)
                        if posicao != {'SEM': 'CORRESPONDENCIA'}:

                            # verifica se a página existe de fato (artigo escrito ou não)
                            # artigos não escritos possuem menos informações válidas
                            subpag = requests.get(href)
                            soup = BeautifulSoup(subpag.content, "html.parser").findAll('table')

                            if len(soup) > 0:
                                # verificar se já existe no bando de dados
                                nome = ativo.findAll('td')[0].findAll('a')[0].text
                                localidade = ativo.findAll('td')[1].findAll('a')[0].text
                                self.conexao.select(campos=['arena_id'], tabela='arenas',
                                                    where='nome ={} and localidade ={}'.format('"' + nome + '"', '"' + localidade + '"'))

                                if len(self.conexao.tabela['arena_id']) == 0:
                                    lat, lng = LatLng(ativo)
                                    arenas.append({'arena': ativo,
                                                   'detalhes': [table for table in soup][0],
                                                   'lat': lat,
                                                   'lng': lng})
                                    print('{} {} {} '.format(nome, lat, lng))

        return arenas
