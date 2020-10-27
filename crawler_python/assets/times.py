from bs4 import BeautifulSoup
from athon.crawler_python.assets.jogadores import AthonScrapJogadores

import requests


class AthonScrapTimes(object):
    def __init__(self):
        self.page = None
        self.soup = None

    def times(self, url):
        self.page = requests.get(url)
        soup = BeautifulSoup(self.page.content, "html.parser")
        athon_jogadores = AthonScrapJogadores()
        ''' 
            A pagina possui duas tabelas:
                Times Ativos    (Nosso ponto de interesse)
                Times Inativos 
        '''

        #  obter os times ativos (sem o detalhamento ainda)
        ativos = [time for time in soup.findAll("table", )[0].text.split('\n') if time != '' and '[edit]' not in time]

        times = []
        #  obter a lista de times ativos, candidatos às vagas.
        #  pela classe que estão definidos. limitando também a 64 times
        candidatos = BeautifulSoup(self.page.content, "html.parser").findAll("span",
                                                                             {"class": "team-template-team-standard"})
        for candidato in candidatos:
            if candidato.text in ativos:
                if not any([time.text == candidato.text for time in times]):
                    # realizar um corte para a montagem das chaves
                    if len(times) < 64:
                        # precisa verificar se a line ( o time), está realmente completo no link descritivo sobre o time
                        if len(athon_jogadores.jogadores(url='https://liquipedia.net' + candidato.find('a')['href'])) == 5:
                            times.append(candidato)
        return times
