from athon.db.conexoes.mySQL import Conexao
import random
import datetime


class AthonTorneio(object):

    def __init__(self):
        self.conexao = Conexao(None)
        self.arenas_sorteadas = []
        self.times_sorteados = []

        self.times_classificados = []
        self.arenas_classificadas = []
        self.armas_classificadas = []
        self.ativo = False # todo: é só uma trava temporária em quanto desenvolvimento

    def _buscar_arenas(self):
        self.conexao.select(campos=['arena_id'], tabela='arenas', where=' lat !=0 and lng !=0')
        self.arenas_classificadas = list(self.conexao.tabela['arena_id'])

    def _buscar_times(self, **kwargs):
        fase = kwargs.get('fase', None)
        if fase is None:
            self.conexao.select(campos=['time_id'], tabela='times')
            self.times_classificados = list(self.conexao.tabela['time_id'])
        else:
            self.conexao.select(campos=['time_id_vencedor'], tabela='partidas', where=' fase={}'.format(str(fase)))
            self.times_classificados = list(self.conexao.tabela['time_id_vencedor'])

    def _buscar_armas(self):
        self.conexao.select(campos=['arma_id'], tabela='armas')
        self.armas_classificadas = list(self.conexao.tabela['arma_id'])

    def torneio(self):
        if self.ativo:
            self.conexao.delete('DELETE FROM kills', AUTO_INCREMENT=True)
            self.conexao.delete('DELETE FROM rounds_jogadores_armas', AUTO_INCREMENT=True)
            self.conexao.delete('DELETE FROM rounds', AUTO_INCREMENT=True)
            self.conexao.delete('DELETE FROM partidas', AUTO_INCREMENT=True)

            self.arenas_sorteadas = []
            self.times_sorteados = []

            self._buscar_times()
            self._buscar_arenas()
            self._buscar_armas()

            fase = 0
            while len(self.times_classificados) > 1:  # em quanto não houver um campeão
                fase += 1
                for _ in range(int(len(self.times_classificados) / 2)):
                    # cálculo das semanas em que as partidas irão ocorrer
                    data_partida = datetime.datetime.now() + datetime.timedelta(days=(fase * 7) + random.choice([1, 2, 3, 4]))
                    data = {'fase': fase,
                            'time_id_vencedor': 0,
                            'time_id_perdedor': 0,
                            'placar_timeA': 0,
                            'placar_timeB': 0,
                            'jogador_id_mvp_vencedor': 0,
                            'jogador_id_mvp_perdedor': 0,
                            'publico': 0,
                            'data_partida': data_partida
                            }
                    # sorteio (time A) a partir do conjunto das diferenças para evitar duplicidade
                    time = int(random.choice(list(set(self.times_classificados).difference(self.times_sorteados))))
                    self.times_sorteados.append(time)
                    data.update({'time_id_A': time})

                    # sorteio (time B) a partir do conjunto das diferenças para evitar duplicidade
                    time = int(random.choice(list(set(self.times_classificados).difference(self.times_sorteados))))
                    self.times_sorteados.append(time)
                    data.update({'time_id_B': time})

                    # sorteio (arena) a partir do conjunto das diferenças para evitar duplicidade
                    arena = int(random.choice(list(set(self.arenas_classificadas).difference(self.arenas_sorteadas))))
                    self.arenas_sorteadas.append(arena)
                    data.update({'arena_id': arena})

                    self.conexao.insert('partidas', data)
                    self.conexao.select(campos=['max(partida_id) as partida_id'], tabela='partidas')
                    self._partida(self.conexao.tabela.loc[0, 'partida_id'])

                # Buscar os novos classificados da bateria, para a próxima fase
                self.times_sorteados = []
                self._buscar_times(fase=fase)

    def _partida(self, partida_id):
        print('partida. partida: {} horario: {}'.format(partida_id, str(datetime.datetime.now())))
        self.conexao.select(campos=['*'], tabela='partidas', where=' partida_id ={}'.format(str(partida_id)))
        partida = self.conexao.tabela
        self.conexao.select(campos=['capacidade'], tabela='arenas',
                            where=' arena_id ={}'.format(str(partida.loc[0, 'arena_id'])))
        arena = self.conexao.tabela
        round = 0
        vitoriasA = 0
        vitoriasB = 0
        while round < 30 or vitoriasB == vitoriasA:
            if random.choice([0, 1]) == 0:
                vitoriasA += 1
                self._round('A', 'B', partida)
            else:
                vitoriasB += 1
                self._round('B', 'A', partida)

            round += 1
            # se um dos dois chegar a metade + 1, do máximo projetado de rounds (30), ganhou a partida
            if (vitoriasB != vitoriasA) and (vitoriasA > 15 or vitoriasB > 15):
                break

        chances_capacidade = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]
        # gravar em bando os resultados da partida
        data = {
            'time_id_vencedor': partida.loc[0, 'time_id_A'] if vitoriasA > vitoriasB else partida.loc[0, 'time_id_B'],
            'time_id_perdedor': partida.loc[0, 'time_id_B'] if vitoriasA > vitoriasB else partida.loc[0, 'time_id_A'],
            'placar_timeA': vitoriasA,
            'placar_timeB': vitoriasB,
            'jogador_id_mvp_vencedor': 0,
            'jogador_id_mvp_perdedor': 0,
            'publico': int(arena.loc[0, 'capacidade'] * (0.4 + random.choice(chances_capacidade))),
            }
        self.conexao.update('partidas', data, where='partida_id={}'.format(partida_id))
        mvp_vencedor, mvp_perdedor = self._mvp(partida_id, tipo='partida')
        data = {'jogador_id_mvp_vencedor': mvp_vencedor,
                'jogador_id_mvp_perdedor': mvp_perdedor
                }
        self.conexao.update('partidas', data, where='partida_id={}'.format(partida_id))

    def _round(self, vencedor, perdedor, partida):
        print('round. vencedor{} perdedor{} partida{} horario{}'.format(vencedor, perdedor, partida.loc[0, 'partida_id'], str(datetime.datetime.now())))
        data = {'partida_id': partida.loc[0, 'partida_id'],
                'time_id_vencedor': partida.loc[0, 'time_id_' + vencedor],
                'time_id_perdedor': partida.loc[0, 'time_id_' + perdedor],
                'jogador_id_mvp_vencedor': 0,
                'jogador_id_mvp_perdedor': 0,
                }
        self.conexao.insert('rounds', data)
        self.conexao.select(campos=['max(round_id) as round_id'], tabela='rounds')
        round = self.conexao.tabela
        self._armas(round.loc[0, 'round_id'])
        self._kills(round.loc[0, 'round_id'], partida.loc[0, 'partida_id'])
        mvp_vencedor, mvp_perdedor = self._mvp(round.loc[0, 'round_id'], tipo='round')
        data = {'jogador_id_mvp_vencedor': mvp_vencedor,
                'jogador_id_mvp_perdedor': mvp_perdedor
                }
        self.conexao.update('rounds', data, where='round_id={}'.format(round.loc[0, 'round_id']))

    def _armas(self, round_id):
        print('armas. round: {} horario: {}'.format(round_id, str(datetime.datetime.now())))
        self.conexao.select(campos=['*'], tabela='rounds', where=' round_id ={}'.format(str(round_id)))
        round = self.conexao.tabela
        self.conexao.select(campos=['jogador_id'], tabela='jogadores',
                            where=' time_id in ({}, {})'.format(
                                round.loc[0, 'time_id_vencedor'], round.loc[0, 'time_id_perdedor']))
        jogadores = self.conexao.tabela
        for jogador in list(jogadores['jogador_id']):
            data = {
                'partida_id': round.loc[0, 'partida_id'],
                'round_id': round.loc[0, 'round_id'],
                'jogador_id': jogador,
                'arma_id': random.choice(self.armas_classificadas)
            }
            self.conexao.insert('rounds_jogadores_armas', data)

    def _kills(self, round_id, partida_id):
        print('kills. round: {} partida: {} horario: {}'.format(round_id, partida_id, str(datetime.datetime.now())))
        self.conexao.select(campos=['*'], tabela='rounds', where=' round_id ={}'.format(str(round_id)))
        round = self.conexao.tabela
        mortos = []
        # vendedores
        self.conexao.select(campos=['jogador_id'], tabela='jogadores',
                            where='time_id ={}'.format(round.loc[0, 'time_id_vencedor']))
        vencedores = list(self.conexao.tabela['jogador_id'])

        # perdedores
        self.conexao.select(campos=['jogador_id'], tabela='jogadores',
                            where='time_id ={}'.format(round.loc[0, 'time_id_perdedor']))
        perdedores = list(self.conexao.tabela['jogador_id'])

        # kills do time vencedor, todos_ os oponetes
        for _ in range(0, 5, 1):
            vencedor = random.choices(vencedores)[0]
            # difference para que não morra duas vezes
            perdedor = random.choices(list(set(perdedores).difference(mortos)))[0]
            mortos.append(perdedor)

            where = 'partida_id = {} and round_id = {} and jogador_id = {}'.format(partida_id, round_id, vencedor)
            self.conexao.select(campos=['round_jogador_arma_id'], tabela='rounds_jogadores_armas', where=where)
            tipo = random.choices([i for i in range(100)])[0]
            data = {
                'jogador_id': perdedor,
                'tipo': 1 if tipo > 70 else 0,  # para ser HS precisa ter tirado  > 70%
                'pontos': 5 if tipo > 70 else 3,  # 5 pontos para HS, 3 para kill normal
                'round_jogador_arma_id': list(self.conexao.tabela['round_jogador_arma_id'])[0]
            }
            self.conexao.insert('kills', data)

        # kills do time perdedor, podem ter matado de 0 a 4 oponentes
        for _ in range(0, random.choices([0, 1, 2, 3, 4])[0], 1):
            # difference para que não morra duas vezes
            vencedor = random.choices(list(set(vencedores).difference(mortos)))[0]
            mortos.append(vencedor)

            perdedor = random.choices(perdedores)[0]

            where = 'partida_id = {} and round_id = {} and jogador_id = {}'.format(partida_id, round_id, perdedor)
            self.conexao.select(campos=['round_jogador_arma_id'], tabela='rounds_jogadores_armas', where=where)
            tipo = random.choices([i for i in range(100)])[0]
            data = {
                'jogador_id': vencedor,
                'tipo': 1 if tipo > 70 else 0,  # para ser HS precisa ter tirado  > 70%
                'pontos': 5 if tipo > 70 else 3,  # 5 pontos para HS, 3 para kill normal
                'round_jogador_arma_id': list(self.conexao.tabela['round_jogador_arma_id'])[0]
            }
            self.conexao.insert('kills', data)

    def _mvp(self, id, **kwargs):
        tipo = kwargs.get('tipo', None)
        print('MVP tipo: {} horario: {}'.format(tipo, str(datetime.datetime.now())))
        mvp_vencedor = 0
        mvp_perdedor = 0
        if tipo is not None:
            if tipo.lower() == 'round':
                sql = '''
                select * from(
                    select sum(pontos) as total, ra.jogador_id from kills 
                        inner join rounds_jogadores_armas as ra on(kills.round_jogador_arma_id = ra.round_jogador_arma_id)
                        inner join rounds as ro on (ro.round_id= ra.round_id)
                        inner join times as ti on (ti.time_id= ro.time_id_vencedor)
                        inner join jogadores as jo on (jo.jogador_id= ra.jogador_id)
                    where ra.round_id={} and jo.time_id = ro.time_id_vencedor group by ra.jogador_id
                ) as base order by total desc
                '''.format(id)
                self.conexao.select(sql=sql)
                mvp_vencedor = int(list(self.conexao.tabela['jogador_id'])[0])

                sql = '''
                select * from(
                    select sum(pontos) as total, ra.jogador_id from kills 
                        inner join rounds_jogadores_armas as ra on(kills.round_jogador_arma_id = ra.round_jogador_arma_id)
                        inner join rounds as ro on (ro.round_id= ra.round_id)
                        inner join times as ti on (ti.time_id= ro.time_id_perdedor)
                        inner join jogadores as jo on (jo.jogador_id= ra.jogador_id)
                    where ra.round_id={} and jo.time_id = ro.time_id_perdedor group by ra.jogador_id
                ) as base order by total desc
                '''.format(id)
                self.conexao.select(sql=sql)
                if len(list(self.conexao.tabela['jogador_id'])) > 0:
                    mvp_perdedor = int(list(self.conexao.tabela['jogador_id'])[0])

            if tipo.lower() == 'partida':
                sql = '''
                select * from(
                    select sum(pontos) as total, ra.jogador_id from kills 
                        inner join rounds_jogadores_armas as ra on(kills.round_jogador_arma_id = ra.round_jogador_arma_id)
                        inner join rounds as ro on (ro.round_id= ra.round_id)
                        inner join times as ti on (ti.time_id= ro.time_id_vencedor)
                        inner join jogadores as jo on (jo.jogador_id= ra.jogador_id)
                        inner join partidas as pa on (pa.partida_id= ro.partida_id)
                    where ra.partida_id={} and jo.time_id = pa.time_id_vencedor group by ra.jogador_id
                ) as base order by total desc   
                '''.format(id)
                self.conexao.select(sql=sql)
                mvp_vencedor = int(list(self.conexao.tabela['jogador_id'])[0])

                sql = '''
                select * from(
                    select sum(pontos) as total, ra.jogador_id from kills 
                        inner join rounds_jogadores_armas as ra on(kills.round_jogador_arma_id = ra.round_jogador_arma_id)
                        inner join rounds as ro on (ro.round_id= ra.round_id)
                        inner join times as ti on (ti.time_id= ro.time_id_perdedor)
                        inner join jogadores as jo on (jo.jogador_id= ra.jogador_id)
                        inner join partidas as pa on (pa.partida_id= ro.partida_id)
                    where ra.partida_id={} and jo.time_id = pa.time_id_perdedor group by ra.jogador_id
                ) as base order by total desc   
                '''.format(id)
                self.conexao.select(sql=sql)
                if len(list(self.conexao.tabela['jogador_id'])) > 0:
                    mvp_perdedor = int(list(self.conexao.tabela['jogador_id'])[0])

        return mvp_vencedor, mvp_perdedor


athon_tornoio = AthonTorneio()
athon_tornoio.torneio()
