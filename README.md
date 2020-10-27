# athon-csgo
Este projeto tem como intuito simular um campeonato de CSGo e apresenta os dados de forma clara. Para isso, foi dividido da seguinte maneira:

# 1) Persistência dos dados (Mysql):
Para que as aplicações funcionem corretamente, é necessário que o banco esteja devidamente criado. E para evitar reprocessamento, também é importante que os dados já estejam devidamente populados.     

**Como proceder?:**


    |  Instrução         |   Descrição                                                                                                     |
    |--------------------|-----------------------------------------------------------------------------------------------------------------|
    |  Dump              | Em athon\db\dump existe o arquivo athon_dump.slq que contém estrutura e dados do banco. Precisara restaurá-lo   |
    |  Python Crawler    | Configurar o arquivo athon/db/conexoes/mySQL.py conforme as configurações do ambiente local                     |
    |  Node API          | Configurar o arquivo athon/api/src/config/conexao.js conforme as configurações do ambiente local                |	

 2) Coleta de Dados Básicos (Python):
     Objetivo: usando como tecnologias Python e BeautifulSoup, coletar informações dos principais times de CSGo atuais, bem como imagens de logos e bandeiras. Além disso dados de georreferenciamento que serão usados para marcar os locais das partidas.
   

    |  coleta            |   link                                                                                                                  |
    |--------------------|-------------------------------------------------------------------------------------------------------------------------|
    |  times             |     [Times de CSGo da Liquipedia](https://liquipedia.net/counterstrike/Portal:Teams)                                    |
    |  jogadores         |     [Jogadores de CSGo da Liquipedia](https://liquipedia.net/counterstrike/Portal:Teams)                                |
    |  arenas            |     [Arenas do Brasil da wikipedia](https://pt.wikipedia.org/wiki/Lista_dos_maiores_est%C3%A1dios_de_futebol_do_Brasil) |
    |  geolocalização    |     [Latitude e Longitude do Google Maps](https://www.google.com/maps)                                                  |
    |  geolocalização    |     [Latitude e Longitude do latitude.to](https://latitude.to/)                                                         |
           
    
		
     Como proceder?:	
		    Após o enviroment configurado (dependências em python), para executar a aplicação basta utilizar os seguintes comandos (a partida da raiz - athon- do projeto):
		    CD crawler_python
		    crawler.py
	      *Este processo pode ser demorado, devido a quantidade de requisições, se você já fez o dump da base MySql, com os dados devidamente populados, não será necessário.
	
	3) Simulação do Campeonato
	4) Disponibilidade das Informações Coletadas e Geradas
	5) Apresentação dos dados
	



