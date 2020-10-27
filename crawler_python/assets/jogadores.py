from bs4 import BeautifulSoup
import requests


class AthonScrapJogadores(object):
    def __init__(self):
        self.page = None
        self.soup = None

    def jogadores(self, url):
        self.page = requests.get(url)
        soup = BeautifulSoup(self.page.content, "html.parser").findAll("table")
        jogadores = []

        #  obter os jogadores ativos
        ativos = [table for table in soup if 'Active' in table.text]
        if ativos != []:
            ativos = [tr for tr in ativos[0].findAll('tr')]

            #  obter a lista de jogadores ativos, (exceto coach).
            for ativo in ativos:
                # as informações precisa estar conditas em td
                if len(ativo.findAll("td")) > 0:
                    #  realizar um corte para não carregar o coach
                    if '(Coach)' not in ativo.text:
                        # time composto de apenas 5 jogadores
                        if len(jogadores) < 5:
                            jogadores.append(ativo)
        return jogadores
