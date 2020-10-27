import re


class Regex():
    '''
        1) . o "ponto" que significa qualquer char
        2) {e} as chaves que servem para definir uma quantidade de caracteres específicas que é desejado encontrar
        3) se quisermos procurar pelo * ou . literalmente (sem significado especial), devemos utilizar o caractere \
        4) [] classe de caracteres
            [A-Z][a-z]
            [ADFJMNOS]
            [àáÀÁâÂãÃéÉêÊíÍóÓôÔõÕúÚüÜçÇ]
            \d == [0-9] ou [0123456789]
            \s == [     ] incluindo tab
            \w == [A-Za-z0-9_] word char

        5) Ancoras
            \b == word boundary
                \bxxx\b antes e depois não pode conter um \w word char
            \B == Non word boundary
            ^ inicio
            $ fim

        6) Quantifiers
            ? Zero ou uma vez
            * Zero ou mais vezes
            + uma ou mais vezes
                +? cada resultado é limitado a primeira incidência do caracter (preguiçoso)
                    Ganancioso: [a-z]{1,5}
                    Preguiçoso: [a-z]{1,5}?
            {n} exatamente n vezes
            {n,} no mín n vezes
            {n,m} no min n+1 vezes no max m vezes

        7) () um grupo de informações
           ()? grupo não obrigatório
           (?:) grupo que não faz parte dos resultados de grupos
           (?:)? grupo não obrigatório e que não faz parte dos resultados de grupos
           \1 referencia ao primeiro grupo (backreferences)
           \2 referencia ao segundo grupo (backreferences)
           \3 referencia ao terceiro grupo (backreferences)
           '''

    def __init__(self):
        # https://regex101.com/
        # https://regex101.com/r/l5vTgf/1/
        # para validar e testar regex de forma eficiênte

        self.NUMEROS = r'[\d]+'
        self.NUMEROS_REAIS = r'^[-+\s]?[0-9]\d{0,11}(\.\d{0,11})*[,.]?\d{0,11}$'
        self.NUMEROS_INTEIROS = r'^[0-9]\d{0,8}(\.\d{0,9})*$'
        self.NUMEROS_REAIS_ = r'[-+\s]?[0-9]\d{0,11}(\.\d{0,11})*[,.]?\d{0,11}'
        self.NUMEROS_INTEIROS_ = r'[0-9]\d{0,8}(\.\d{0,9})*'
        self.CEP = r'\d{5}[.-]?\d{3}'
        self.SINAIS = r'[>]?[<]?[=]?'
        self.LETRAS = r'[a-zA-Z]+'

        self.IPV4 = r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'
        self.IPV6 = r'(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))'

        self.DATA_EXTENSO = r'[0123]?\d\s+(de\s+)?[A-Z]?[a-zç]{3,8}\s+(de\s+)?[12]\d{3}'  # 5 de Maio de 1989
        self.DATA_EXTENSO_GRUPOS = r'([0-2]?[1-9]|[3][0-1]{1,2})[\s+.-/]+(?:de\s+)?([A-Z]?[a-zç]{3,8})[\s+.-/]+(?:de\s+)?([1-2]?[0-9]{2,4})'  # 5 de Maio de 1989 ||| 5 ||| Maio ||| 1989
        self.MES_ANO = r'([A-Z]?[a-zç]{3,8})[\s+.-]+(?:de\s+)?([1-2]?[0-9]{2,4})'

        self.DATA_NUMERICA = r'[0123]?\d\/[01]?\d\/[0-9]{4}'
        self.DATA_NUMERICA_GRUPOS = r'([0-2]?[1-9]|[3][0-1]{1,2})[\s+.-/]+(?:de\s+)?([0]?[1-9]|[1][0-2]{1,2})[\s+.-/]+(?:de\s+)?([1-2]?[0-9]{2,4})'

        self.EMAIL = '([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+'  # user@dominio. [com, br, info, life]

        self.LINK_HTML = r'^[Hh][Tt][Tt][Pp][sS]?.+html$'
        self.LINK = r"^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\%\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
        self._HTML_H = r'<({}).+?>([\w\àáÀÁâÂãÃéÉêÊíÍóÓôÔõÕúÚüÜçÇ.\s]+)</\1>'

        self.HORARIO = r'([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])'
        self.DATAS = [
          r'([3]{1}[0-1]{1}|[1-2]{1}[0-9]{1}|[0]?[1-9]{1})[\s+.-]+(?:de\s+)?([A-Z]?[a-zç]{3,8})[\s+.-]+(?:de\s+)?([1-2]?[0-9]{2,4})',        # 5 de Maio de 1989 ou 89 ||| 5 ||| Maio ||| 1989 ou 89
          r'([A-Z]?[a-zç]{3,8})\s+(?:de\s+)?([3]{1}[0-1]{1}|[1-2]{1}[0-9]{1}|[0]?[1-9]{1})\s+(?:de\s+)?([1-2][0-9]{2, 4})',                  # Maio 5 1989 ou 89 ||| Maio ||| 5 ||| 1989 ou 89
          r'([1-2][0-9]{3})[\s+.-]+(?:de\s+)?([A-Z]?[a-zç]{3,8})[\s+.-]+(?:de\s+)?([3]{1}[0-1]{1}|[1-2]{1}[0-9]{1}|[0]?[1-9]{1})',           # 1989 ou 89 de Maio de 5 ||| 1989 ou 89 ||| Maio ||| 5
          r'([3]{1}[0-1]{1}|[1-2]{1}[0-9]{1}|[0]?[1-9]{1})[\s+.-]+(?:de\s+)?([0]?[1-9]|[1][0-2]{1,2})[\s+.-]+(?:de\s+)?([1-2]?[0-9]{2,4})',  # 25 de 05 de 1989 ou 89
          r'([0]?[1-9]|[1][0-2]{1,2})[\s+.-]+(?:de\s+)?([3]{1}[0-1]{1}|[1-2]{1}[0-9]{1}|[0]?[1-9]{1})[\s+.-]+(?:de\s+)?([1-2]?[0-9]{2,4})',  # 05 de 25 de 1989 ou 89
          r'([1-2]{1}[0-9]{3})[\s+.-]+(?:de\s+)?([0]?[1-9]|[1][0-2]{1,2})[\s+.-]+(?:de\s+)?([3]{1}[0-1]{1}|[1-2]{1}[0-9]{1}|[0]?[1-9]{1})',  # 2020 25 10
         ]

    def html_h(self, arg):  # h1,h2,h3,h4,h5,h6, h1|h2 h1|h2|h3 h1|h2|h3|h4 ...
        arg = arg.replace('h', '[**]')
        arg = arg.replace('H', '[hH]')
        arg = arg.replace('[**]', '[hH]')
        arg = arg.replace('1', '[1]')
        arg = arg.replace('2', '[2]')
        arg = arg.replace('3', '[3]')
        arg = arg.replace('4', '[4]')
        arg = arg.replace('5', '[5]')
        arg = arg.replace('6', '[6]')
        return self._HTML_H.format(arg)

    def reais(self, arg):
        lista = ['real', 'dolar', 'd', 'r', 's', '$', ' ', '%']
        arg = str(arg)
        arg = arg.lower()
        for l in lista:
            arg = arg.replace(l, '')
        arg = arg.replace(',', '.')
        arg = arg.replace('.', '', Counter(arg)['.']-1)
        retorno = self.busca(self.NUMEROS_REAIS, arg).get('grupo0', None)
        if retorno is None:
            return None
        else:
            return float(retorno) if '.' in retorno else int(retorno)

    def porcentagem(self, arg):
        retorno = self.reais(arg)
        return None if retorno is None else "{0:.2f}%".format(retorno)

    def busca(self, exp, valor, **kwargs):
        if valor is None:
            return {'SEM' : 'CORRESPONDENCIA'}
        regex = re.compile(exp)
        resultados = regex.finditer(valor)
        foco = kwargs.get('foco', 0)
        index = kwargs.get('index', 0)

        retornos = {}
        for idx, resultado in enumerate(resultados):
            retorno ={'grupo' + str(idx): resultado.group(),
                      'inicio' + str(idx): resultado.start(),
                      'fim' + str(idx): resultado.end(),
                      'quantidade' + str(idx): resultado.re.groups,
                      }
            if resultado.re.groups + 1 > 0:
                retorno.update({'sub_grupos' + str(idx): {}})
                retorno['sub_grupos' + str(idx)].update({'grupos': {}})
            for i in range(resultado.re.groups + 1):
                if i == 0:
                    retorno['sub_grupos' + str(idx)].update({'dados': resultado.group(i)})
                if foco == i:
                    retorno['sub_grupos' + str(idx)].update({'texto': resultado.group(i)})
                if index == i:
                    retorno['sub_grupos' + str(idx)].update({'index': resultado.group(i)})
                retorno['sub_grupos' + str(idx)]['grupos'].update({'grupo_' + str(i): resultado.group(i)})
            if retorno.get('grupo' + str(idx)) != '':
                retornos.update(retorno)
        if retornos == {}:
            retornos.update({'SEM' : 'CORRESPONDENCIA'})
        return retornos
