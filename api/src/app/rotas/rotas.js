const Armas = require('../views/armas/armas')
const Jogadores = require('../views/jogadores/jogadores')
const Partidas = require('../views/partidas/partidas')
const Arenas = require('../views/arenas/arenas')
const Times = require('../views/times/times')
const Charts = require('../views/charts/charts')

module.exports = (app) => {

    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/metodos/metodos.marko'),
            {
                metodos:[
                            {id: '/armas/lista/nomes', descricao: 'Lista de armas'},
                            {id: '/armas/lista/nomes/1', descricao: 'Uma única arma'},
                            {id: '/armas/lista/mortes', descricao: 'Lista de armas com as mortes ocorridas usando as mesmas'},
                            {id: '/armas/lista/mortes/1', descricao: 'Uma única arma com as mortes atribuídas a ela'},
                            {id: '/partidas', descricao: 'Lista de partidas ocorridas'},
                            {id: '/partidas/1', descricao: 'Dados de uma única partida'},
                            {id: '/partidas/winner/mvp/1', descricao: 'Dados do melhor jogador do time que ganhou uma partida'},
                            {id: '/partidas/loser/mvp/1', descricao: 'Dados do melhor jogador do time que perdeu uma partida'},
                            {id: '/partidas/winner/pontos/1', descricao: 'Dados dos jogadores do time que ganhou uma partida'},
                            {id: '/partidas/loser/pontos/1', descricao: 'Dados dos jogadores do time que ganhou uma partida'},
                            {id: '/arenas', descricao: 'Arenas onde as partidas aconteceram'},
                            {id: '/times', descricao: 'Dados dos times'},
                            {id: '/times/campeao', descricao: 'Dados do time campeão'},
                            {id: '/times/time/1', descricao: 'Dados de um time'},
                            {id: '/times/estado/1', descricao: 'Dados dos times hospedados em um estado do Brasil'},
                            {id: '/times/regiao/1', descricao: 'Dados dos times hospedados em uma região do Brasil'},
                            {id: '/jogadores/lista/times', descricao: 'Jogadores Ordenados por vitórias, pontos e HS'},
                            {id: '/jogadores/lista/pontos', descricao: 'Jogadores Ordenados pontos e HS'},
                            {id: '/chats/jogadores/primeirakill', descricao: 'Quantidades de vezes que os jogadores pegaram a primeira kill de um round'},
                            {id: '/chats/jogadores/mediakill', descricao: 'Média de kills dos jogadores por round'},
                            {id: '/chats/times/primeirakill', descricao: 'Quantidade de vezes que os times pegaram a primeira kill em um roud'},
                            {id: '/chats/times/primeirakillvitorias', descricao: 'Quantidade de vezes que os times pegaram a primeira kill em um round e obtiveram a vitória do jogo'},
                            {id: '/chats/times/kill', descricao: 'Total de kills dos times'},
                            {id: '/chats/times/vitorias', descricao: 'Total de vitorias por time'},
                            {id: '/chats/times/campeao', descricao: 'Dados do time campeão'},
                            {id: '/chats/times/maximosminimos', descricao: 'Menor e maior número de kills feitos por um dos integrantes de um time, para cada um dos times, ao longo da competição'},
                            {id: '/chats/armas/kill', descricao: 'Armas e suas quantidades de kills'},
                            {id: '/chats/arenas/latlng', descricao: 'Localização das arenas'},
                            {id: '/chats/arenas/audiencia', descricao: 'Audiência das arenas'},
                            {id: '/chats/regioes/publico', descricao: 'Público das arenas, por região do país'},
                            {id: '/chats/estados/partidas', descricao: 'Número de partidas ocorridas em cada estado'},
                            {id: '/chats/estados/fluxo', descricao: 'Fluxo de estados que estavam ocorrendo as partidas ao longo da competição'}
                ]
            }
        );
    });

    app.get('/armas/lista/nomes', (req, res) => {
        Armas.lista(res)
    })

    app.get('/armas/lista/nomes/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Armas.buscaPorId(id, res)
    })

    app.get('/armas/lista/mortes', (req, res) => {
        Armas.listaMortes(res)
    })

    app.get('/armas/lista/mortes/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Armas.buscaMortesPorId(id, res)
    })

    app.get('/partidas', (req, res) => {
        Partidas.lista(res)
    })

    app.get('/partidas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Partidas.buscaPorId(id, res)
    })

    app.get('/partidas/winner/mvp/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Partidas.buscaPorIdMVPV(id, res)
    })

    app.get('/partidas/loser/mvp/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Partidas.buscaPorIdMVPP(id, res)
    })

    app.get('/partidas/winner/pontos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Partidas.buscaPorIdPontosV(id, res)
    })

    app.get('/partidas/loser/pontos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Partidas.buscaPorIdPontosP(id, res)
    })

    app.get('/arenas', (req, res) => {
        Arenas.lista(res)
    })

    app.get('/times', (req, res) => {
        Times.lista(res)
    })

    app.get('/times/campeao', (req, res) => {
        Times.campeao(res)
    })

    app.get('/times/time/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Times.buscaPorIdTime(id, res)
    })

    app.get('/times/estado/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Times.buscaPorIdEstado(id, res)
    })

    app.get('/times/regiao/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Times.buscaPorIdRegiao(id, res)
    })


    app.get('/jogadores/lista/times', (req, res) => {
        Jogadores.listaEquipesPontos(res)
    })

    app.get('/jogadores/lista/pontos', (req, res) => {
        Jogadores.listaPontos(res)
    })


    app.get('/chats/jogadores/primeirakill', (req, res) => {
        Charts.listaJogadoresPrimeiraKill(res)
    })

    app.get('/chats/times/primeirakill', (req, res) => {
        Charts.listaTimesPrimeiraKill(res)
    })

    app.get('/chats/times/primeirakillvitorias', (req, res) => {
        Charts.listaVitoriaPrimeiraKill(res)
    })

    app.get('/chats/jogadores/mediakill', (req, res) => {
        Charts.listaMediaKillJogadores(res)
    })

    app.get('/chats/armas/kill', (req, res) => {
        Charts.listaKillArmas(res)
    })

    app.get('/chats/times/kill', (req, res) => {
        Charts.listaKillTimes(res)
    })

    app.get('/chats/times/vitorias', (req, res) => {
        Charts.listaTimesVitorias(res)
    })

    app.get('/chats/arenas/latlng', (req, res) => {
        Charts.listaArenasLatLng(res)
    })

    app.get('/chats/regioes/publico', (req, res) => {
        Charts.listaRegioesPublico(res)
    })

    app.get('/chats/times/campeao', (req, res) => {
        Charts.linhaDoTempoVencedor(res)
    })

    app.get('/chats/estados/partidas', (req, res) => {
        Charts.listaEstadosPartidas(res)
    })

    app.get('/chats/times/maximosminimos', (req, res) => {
        Charts.listaTimesMaximosMinimos(res)
    })

    app.get('/chats/estados/fluxo', (req, res) => {
        Charts.listaEstadosFluxo(res)
    })

    app.get('/chats/arenas/audiencia', (req, res) => {
        Charts.listaAudienciaData(res)
    })
}