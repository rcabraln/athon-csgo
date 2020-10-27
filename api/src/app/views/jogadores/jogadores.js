const conexao = require('../../../config/conexao')

class Jogadores {

    /**
    * ranking de jogador ordenado por posição da equipe no campeonato, pontos feitos pelo jogador, HSs feitos pelo jogador
    */
    listaEquipesPontos(res) {
        const sql = ` select * from (
                            select jogadores.*,
                                (select max(fase) from partidas pa where pa.time_id_vencedor = jogadores.time_id)	as fase_vencedor,
                                (select max(fase) from partidas pa where pa.time_id_perdedor = jogadores.time_id)	as fase_perdedor
                                from (
                                    select sum(k.pontos) as total, sum(k.tipo) as HSjogador, jo.*, ti.nome as nome_time, logo_angular, href,
                                    e.nome as estado, e.sigla as sigla, r.nome as regiao
                                    from kills k
                                        inner join rounds_jogadores_armas rja on (rja.round_jogador_arma_id = k.round_jogador_arma_id)
                                        inner join jogadores jo on (jo.jogador_id = rja.jogador_id)
                                        inner join times ti on (ti.time_id = jo.time_id)
                                        inner join estados e on (e.estado_id = ti.estado_id)
                                        inner join regioes r on (r.regiao_id = e.regiao_id)
                                        group by jo.jogador_id
                            ) as jogadores
                        ) as jogadores order by fase_vencedor desc, fase_perdedor desc,  total desc, HSjogador desc `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    /**
    * ranking de jogador ordenado por pontos feitos pelo jogador, HSs feitos pelo jogador
    */
    listaPontos(res) {
        const sql = ` select * from (
                        select jogadores.*
                         from (
                            select sum(k.pontos) as total, sum(k.tipo) as HSjogador, jo.*, ti.nome as nome_time, logo_angular, href,
                            e.nome as estado, e.sigla as sigla, r.nome as regiao
                            from kills k
                                inner join rounds_jogadores_armas rja on (rja.round_jogador_arma_id = k.round_jogador_arma_id)
                                inner join jogadores jo on (jo.jogador_id = rja.jogador_id)
                                inner join times ti on (ti.time_id = jo.time_id)
                                inner join estados e on (e.estado_id = ti.estado_id)
                                inner join regioes r on (r.regiao_id = e.regiao_id)
                                group by jo.jogador_id
                        ) as jogadores
                    ) as jogadores order by total desc, HSjogador desc `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}
module.exports = new Jogadores