const conexao = require('../../../config/conexao')
class Armas {
    /**
    * obter todas as armas, ordenadas por nome
    */
    lista(res) {
        const sql = `select * from armas order by nome `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * obter uma única arma buscando por ID
    */
    buscaPorId(id, res) {
        const sql = `select * from armas where arma_id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * obter todas as armas, com total de kills, ordenadas por total, hs, e nome
    */
    listaMortes(res) {
        const sql = `select * from (
                        select sum(1) as total, sum(k.tipo) as HSArma, a.* from kills k
                            inner join rounds_jogadores_armas rja on (rja.round_jogador_arma_id = k.round_jogador_arma_id)
                            inner join armas a on (a.arma_id = rja.arma_id)
                            group by a.arma_id
                    )  as armas order by total desc, HSArma desc, nome `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * obter uma única armas, com total de kills, ordenadas por total, hs, e nome
    */
    buscaMortesPorId(id, res) {
        const sql = ` select sum(1) as total, sum(k.tipo) as HSArma, a.* from kills k
                            inner join rounds_jogadores_armas rja on (rja.round_jogador_arma_id = k.round_jogador_arma_id)
                            inner join armas a on (a.arma_id = rja.arma_id)
                      where a.arma_id = ${id}
                      group by a.arma_id `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Armas