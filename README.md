# Athon-csgo   #python #crawler #mysql #nodejs #angular
Este projeto tem como intuito simular um campeonato de CSGo e apresenta os dados de forma clara. Para isso, foi dividido da seguinte maneira:

# 1) Persistência dos dados (Mysql):
Objetivo: Para que as aplicações funcionem corretamente, é necessário que o banco esteja devidamente criado. E para evitar reprocessamento, também é importante que os dados já estejam devidamente populados.     

**Como proceder?:**

|  Instrução         |   Descrição                                                                                                         |
|--------------------|---------------------------------------------------------------------------------------------------------------------|
|  Dump              | Em **athon\db\dump** existe o arquivo athon_dump.slq que contém estrutura e dados do banco. Precisara restaurar     |
|  Python Crawler    | Configurar o arquivo **athon/db/conexoes/mySQL.py** conforme as configurações do ambiente local                     |
|  Node API          | Configurar o arquivo **athon/api/src/config/conexao.js** conforme as configurações do ambiente local                |	

**Modelo entidade e relacionamentos**
```diff
! mais informações em athon\documentacao\db
```
![alt text](https://uploaddeimagens.com.br/images/002/937/297/full/2020-10-27_15-16.jpg?1603819030)


 # 2) Coleta de Dados Básicos (Crawler - Python):
Objetivo: usando como tecnologias Python e BeautifulSoup, coletar informações dos principais times de CSGo atuais, bem como imagens de logos e bandeiras. Além disso dados de georreferenciamento que serão usados para marcar os locais das partidas.
```diff
! Muito importante: Se você já fez o Dump da Base, não só da estrutura mas também dos dados, o passo 2 é meramente informativo (a menos que seja do seu desejo zerar as informações para importá-las novamente)

@@ Este processo pode ser demorado, devido a quantidade de requisições @@
```

|  coleta            |   link                                                                                                                  |
|--------------------|-------------------------------------------------------------------------------------------------------------------------|
|  armas             |     armas são coletadas localmente, com trata-se um grupo sem variação nos dados, já estão disponíveis para inserção    |
|  times             |     [Times de CSGo da Liquipedia](https://liquipedia.net/counterstrike/Portal:Teams)                                    |
|  jogadores         |     [Jogadores de CSGo da Liquipedia](https://liquipedia.net/counterstrike/Portal:Teams)                                |
|  arenas            |     [Arenas do Brasil da wikipedia](https://pt.wikipedia.org/wiki/Lista_dos_maiores_est%C3%A1dios_de_futebol_do_Brasil) |
|  geolocalização    |     [Latitude e Longitude do Google Maps](https://www.google.com/maps)                                                  |
|  geolocalização    |     [Latitude e Longitude do latitude.to](https://latitude.to/)                                                         |

**Como proceder?:**           

|  Instrução         |   Descrição (Após o enviroment configurado (dependências em python)                                                 |
|--------------------|---------------------------------------------------------------------------------------------------------------------|
|  comando           |  **CD crawler_python**                                                                                              |
|  comando           |  **crawler.py**                                                                                                     |
|  resultado         |  as informações de base serão preenchidas                                                                    |	

# 3) Simulação do Campeonato (Python)
```diff
! Muito importante: Se você já fez o Dump da Base, não só da estrutura mas também dos dados, o passo 3 é meramente informativo (a menos que você tenha realizado o procedimento 2 e precisa gerar um novo campeonato)
@@ Este processo pode ser demorado, devido a quantidade de informações @@
```
Objetivo: usando como tecnologia Python, é um procedimento que com base nas informações já coletadas, irá simular com campeonato de CSGo. Tendo como resultados:
|  resultado         |   descrição                                                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------|
|  partidas          |     2 times escolhidos aleatoriamente, com resultado também aleatório. O time perdedor é eliminado                            |
|  local da partida  |     Um local para a partida, escolhido aleatoriamente (uma arena), que não poderá se repetir durante a competição             |
|  rounds            |     Cada partida tem até 30 rounds, ganha quem fizer 16 pontos primeiro. Se permanecer empatado em 15x15, joga-se um desempate|
|  armas usadas      |     Ao inicio de cada round, cada um dos 10 jogadores (5 de cada time), recebe uma arma de forma aleatória                    |
|  kills             |     Em processo de sorteio, até que um dos times não tenha jogadores vivos, são atribuídas kills para um dos jogadores do round (que ainda esteja vivo, claro)       |
|  tipo de kill      |     Uma kill pode ser normal (+3 pontos) ou Head Shot (+5 pontos)                                                             |
|  pontos por jogador|     Aos jogadores são atribuídos o total de pontos referentes a suas kills                                                    |
|  pontos por time   |     Aos times são atribuídos o total de pontos referentes às kills de seus jogadores                                          |

**Como proceder?:**           

|  Instrução         |   Descrição (Após o enviroment configurado (dependências em python)                                                 |
|--------------------|---------------------------------------------------------------------------------------------------------------------|
|  comando           |  **CD torneio_python**                                                                                              |
|  comando           |  **torneio.py**                                                                                                     |
|  resultado         |  as informações de torneio serão preenchidas                                                                        |		


# 4) Disponibilidade das Informações Coletadas e Geradas (Node + Mysql)
Objetivo: utilizando uma modelagem em NodeJS, consultar o banco de dados Mysql e disponibilizar os dados via API rest 

**Como proceder?:** iniciando a aplicação na porta 3000           

|  Instrução         |   Descrição (Após o enviroment configurado (Node devidamente instalado))                                            |
|--------------------|---------------------------------------------------------------------------------------------------------------------|
|  comando           |  **CD API**                                                                                                         |
|  comando           |  **npm install**                                                                                                    |
|  comando           |  **node server.js**                                                                                                 |	

**Metodos?:**
|  método                                         |  url local (Api node deve estar rodando em localhost:3000)                                                                        | status |
|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------|
| (localhost:3000/armas/lista/nomes    			  | descricao: Lista de armas                                                                                                         | ativa  | 
| localhost:3000/armas/lista/nomes/1  			  | descricao: Uma única arma                                                                                                         | ativa  |
| localhost:3000/armas/lista/mortes   			  | descricao: Lista de armas com as mortes ocorridas usando as mesmas                                                                | ativa  |
| localhost:3000/armas/lista/mortes/1 			  | descricao: Uma única arma com as mortes atribuídas a ela                                                                          | ativa  |
| localhost:3000/partidas                		  | descricao: Lista de partidas ocorridas                                                                                            | ativa  |
| localhost:3000/partidas/1              		  | descricao: Dados de uma única partida                                                                                             | ativa  |
| localhost:3000/partidas/winner/mvp/1   		  | descricao: Dados do melhor jogador do time que ganhou uma partida                                                                 | ativa  |
| localhost:3000/partidas/loser/mvp/1    		  | descricao: Dados do melhor jogador do time que perdeu uma partida                                                                 | ativa  |
| localhost:3000/partidas/winner/pontos/1		  | descricao: Dados dos jogadores do time que ganhou uma partida                                                                     | ativa  |
| localhost:3000/partidas/loser/pontos/1 		  | descricao: Dados dos jogadores do time que ganhou uma partida                                                                     | ativa  |
| localhost:3000/arenas                  		  | descricao: Arenas onde as partidas aconteceram                                                                                    | ativa  |
| localhost:3000/times                   		  | descricao: Dados dos times                                                                                                        | ativa  |
| localhost:3000/times/campeao 					  | descricao: Dados do time campeão                                                                                                  | ativa  |
| localhost:3000/times/time/1 				      | descricao: Dados de um time                                                                                                       | ativa  |
| localhost:3000/times/estado/1              	  | descricao: Dados dos times hospedados em um estado do Brasil                                                                      | ativa  |
| localhost:3000/times/regiao/1              	  | descricao: Dados dos times hospedados em uma região do Brasil                                                                     | ativa  |
| localhost:3000/jogadores/lista/times       	  | descricao: Jogadores Ordenados por vitórias, pontos e HS                                                                          | ativa  |
| localhost:3000/jogadores/lista/pontos      	  | descricao: Jogadores Ordenados pontos e HS                                                                                        | ativa  |
| localhost:3000/chats/jogadores/primeirakill	  | descricao: Quantidades de vezes que os jogadores pegaram a primeira kill de um round                                              | ativa  |
| localhost:3000/chats/jogadores/mediakill   	  | descricao: Média de kills dos jogadores por round                                                                                 | **inativa**|
| localhost:3000/chats/times/primeirakill    	  | descricao: Quantidade de vezes que os times pegaram a primeira kill em um roud                                                    | ativa  |
| localhost:3000/chats/times/primeirakillvitorias | descricao: Quantidade de vezes que os times pegaram a primeira kill em um round e obtiveram a vitória do jogo                     | **inativa**|
| localhost:3000/chats/times/kill 				  | descricao: Total de kills dos times                                                                                               | ativa  |
| localhost:3000/chats/times/vitorias 			  | descricao: Total de vitorias por time                                                                                             | **inativa**|
| localhost:3000/chats/times/campeao 			  | descricao: Dados do time campeão                                                                                                  | ativa  |
| localhost:3000/chats/times/maximosminimos 	  | descricao: Menor e maior número de kills feitos por um dos integrantes de um time, para cada um dos times, ao longo da competição | **inativa**|
| localhost:3000/chats/armas/kill       	      | descricao: Armas e suas quantidades de kills                                                                                      | ativa  |
| localhost:3000/chats/arenas/latlng    		  | descricao: Localização das arenas                                                                                                 | ativa  |
| localhost:3000/chats/arenas/audiencia			  | descricao: Audiência das arenas                                                                                                   | ativa  |
| localhost:3000/chats/regioes/publico 			  | descricao: Público das arenas, por região do país                                                                                 | **inativa**|
| localhost:3000/chats/estados/partidas			  | descricao: Número de partidas ocorridas em cada estado                                                                            | ativa  |
| localhost:3000/chats/estados/fluxo   			  | descricao: Fluxo de estados que estavam ocorrendo as partidas ao longo da competição}                                             | ativa  |


# 5) Apresentação dos dados (Angular)	
Objetivo: utilizando uma modelagem em Angular, consumir a API Node, e apresentar os dados 

**Como proceder?:** iniciando a aplicação na porta 4200           

|  Instrução                                         |   Descrição (Após o enviroment configurado (Node devidamente instalado))                                            |
|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
|  comando                                           |  **CD cliente-angular**                                                                                             |
|  comando                                           |  **CD athon**                                                                                                       |
|  comando (caso não tenha o angular cli no ambiente)|  **CD npm i -g @angular/cli@**                                                                                      |
|  comando                                           |  **npm install**                                                                                                    |
|  comando                                           |  **ng serve.js**                                                                                                    |
|  instrução                                         |  **abra http://localhost:4200/partidas no navegador**                                                               |

![alt text](https://uploaddeimagens.com.br/images/002/937/281/full/2020-10-27_15-07.jpg?1603818517)

# Dados do torneio
![alt text](https://uploaddeimagens.com.br/images/002/937/283/full/2020-10-27_15-08.jpg?1603818563)
![alt text](https://uploaddeimagens.com.br/images/002/937/286/full/2020-10-27_15-08%282%29.jpg?1603818582)
# Gráficos do torneio
![alt text](https://uploaddeimagens.com.br/images/002/937/271/full/2020-10-27_15-04.jpg?1603818377)
![alt text](https://uploaddeimagens.com.br/images/002/937/266/full/2020-10-27_15-04%282%29.jpg?1603818307)
