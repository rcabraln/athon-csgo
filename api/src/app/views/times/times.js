const conexao = require('../../../config/conexao')

class Times {
    /**
      metodo times ordenados por vitórias na competição e pontos
    */
    lista(res) {
        const sql = ` select * from (
                            select times.*,
                                  (select max(fase) from partidas pa where pa.time_id_vencedor = times.time_id)	as fase_vencedor,
                                  (select max(fase) from partidas pa where pa.time_id_perdedor = times.time_id)	as fase_perdedor
                             from (
                                select sum(k.pontos) as total, sum(k.tipo) as HSEquipe, ti.*, e.nome as estado, e.sigla, r.nome as regiao

                                from kills k
                                    inner join rounds_jogadores_armas rja on (rja.round_jogador_arma_id = k.round_jogador_arma_id)
                                    inner join jogadores jo on (jo.jogador_id = rja.jogador_id)
                                    inner join times ti on (ti.time_id = jo.time_id)
                                    inner join estados e on (e.estado_id = ti.estado_id)
                                    inner join regioes r on (r.regiao_id = e.regiao_id)
                                    group by ti.time_id
                            ) as times
                        ) as times order by fase_vencedor desc, fase_perdedor desc, total desc `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * Dados do time Campeao
    */
    campeao(res) {
        const sql = ` select ti.*, e.nome as estado, e.sigla, r.nome as regiao from times ti
                            inner join estados e on (e.estado_id = ti.estado_id)
                            inner join regioes r on (r.regiao_id = e.regiao_id)
                            inner join partidas pa on (pa.time_id_vencedor = ti.time_id)
                        order by pa.partida_id desc limit 1 `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    /**
    * busca de times por id do time
    */
    buscaPorIdTime(id, res) {
        const sql = `  select ti.*, e.nome as estado, e.sigla, r.nome as regiao from times ti
                          inner join estados e on (e.estado_id = ti.estado_id)
                          inner join regioes r on (r.regiao_id = e.regiao_id)
                       where ti.time_id = ${id} `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * busca de times por id do estado
    */
    buscaPorIdEstado(id, res) {
        const sql = `select ti.*, e.nome as estado, e.sigla, r.nome as regiao from times ti
                        inner join estados e on (e.estado_id = ti.estado_id)
                        inner join regioes r on (r.regiao_id = e.regiao_id)
                    where e.estado_id = ${id} `

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    *  busca de times por id da região
    */
    buscaPorIdRegiao(id, res) {
        const sql = `select ti.*, e.nome as estado, e.sigla, r.nome as regiao from times ti
                        inner join estados e on (e.estado_id = ti.estado_id)
                        inner join regioes r on (r.regiao_id = e.regiao_id)
                        where r.regiao_id =  ${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}
module.exports = new Times