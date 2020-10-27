const conexao = require('../../../config/conexao')

class Arenas {
    /**
    * obter todas as arenas, ordenadas maior público
    */
    lista(res) {
        const sql = ` select capacidade, publico, SUBSTRING(lat, 1, 10) as lat, SUBSTRING(lng, 1, 10) as lng, DATE_FORMAT(pa.data_partida, '%d/%m/%Y') as data,
                        a.nome as arena, e.nome as estado, r.nome as regiao,  a.arena_id, a.estado_id, r.regiao_id, localidade, href, img, bandeira_angular
                        from arenas as a
                            inner join partidas pa on(pa.arena_id = a.arena_id)
                            inner join estados e on (e.estado_id = a.estado_id)
                            inner join regioes r on (r.regiao_id = e.regiao_id)
                        order by publico desc `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}
module.exports = new Arenas