const conexao = require('../../../config/conexao')
class Charts {
    /**
    * jogadores que mais pegaram a primeira kill
    */
    listaJogadoresPrimeiraKill(res) {
        const sql = ` select * from (
                            select  j.nome, j.apelido,  j.bandeira_angular, sum(1) as first_kills from (
                                            select  rja.jogador_id from rounds r
                                                inner join rounds_jogadores_armas rja on (rja.round_id = r.round_id)
                                                inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                                                 group by r.round_id
                                          ) as kill_1_jogador
                                          inner join jogadores j on (j.jogador_id = kill_1_jogador.jogador_id)
                                                group by j.jogador_id
                            ) as  kill_1_jogador order by first_kills desc, nome limit 20 `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * times que mais pegaram  a primeira kill
    */
    listaTimesPrimeiraKill(res) {
        const sql = `
                        select * from (
                        select  t.nome,  t.logo_angular, sum(1) as first_kills from (
                                            select  j.time_id, IF(p.time_id_vencedor=j.time_id, 1, 0) as venceu  from rounds r
                                                inner join rounds_jogadores_armas rja on (rja.round_id = r.round_id)
                                                inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                                                inner join jogadores j on (j.jogador_id = rja.jogador_id)
                                                inner join partidas p on (p.partida_id = rja.partida_id)
                                             group by r.round_id
                                      ) as kill_1_time
                                      inner join times t on (t.time_id = kill_1_time.time_id)
                                            group by t.time_id
                        ) as  kill_1_time order by first_kills desc, nome limit 20`
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * casos em quem o time que pegou a primeira kill do round, também teve a vitória
    */
    listaVitoriaPrimeiraKill(res) {
        const sql = `select "Requisição Inativa" from armas `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * kills x partidas x jogador (média por round(
    */
    listaMediaKillJogadores(res) {
        const sql = ` select "Requisição Inativa" from armas `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * kills x arma
    */
    listaKillArmas(res) {
        const sql = `
                         select nome, total as kills, icone_angular as logo from (
                                        select sum(1) as total, sum(k.tipo) as HSArma, a.* from kills k
                                            inner join rounds_jogadores_armas rja on (rja.round_jogador_arma_id = k.round_jogador_arma_id)
                                            inner join armas a on (a.arma_id = rja.arma_id)
                                            group by a.arma_id
                                    )  as armas order by total desc, HSArma desc, nome limit 16`
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * time x kill (média por partida)
    */
    listaKillTimes(res) {
        const sql = `
                        select * from (
                            select nome, logo, (kills/f) as kills from (
                                select k.*, (select max(fase) from partidas where time_id_vencedor= k.time_id or time_id_perdedor= k.time_id) as f from (
                                    select  t.nome,  t.logo_angular logo, t.time_id,  sum(1) as kills from (
                                                        select  j.time_id, IF(p.time_id_vencedor=j.time_id, 1, 0) as venceu  from rounds r
                                                            inner join rounds_jogadores_armas rja on (rja.round_id = r.round_id)
                                                            inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                                                            inner join jogadores j on (j.jogador_id = rja.jogador_id)
                                                            inner join partidas p on (p.partida_id = rja.partida_id)
                                                         group by k.kill_id
                                                  ) as kill_time
                                                  inner join times t on (t.time_id = kill_time.time_id)
                                                        group by t.time_id
                                    ) as  k
                            ) as k
                        ) as kill_time order by kills desc, nome limit 12`
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * time x vitórias
    */
    listaTimesVitorias(res) {
        const sql = ` select "Requisição Inativa" from armas `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * geolocalização dos jogos
    */
    listaArenasLatLng(res) {
        const sql = ` select lat, lng, a.nome, a.href from arenas as a
                        inner join partidas p on (p.arena_id = a.arena_id)
                            order by p.publico desc `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * partida x região x público
    */
    listaRegioesPublico(res) {
        const sql = ` select "Requisição Inativa" from armas `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * linha do tempo do time vencedor
    */
    linhaDoTempoVencedor(res) {
            const sql = ` select DATE_FORMAT(inicio, '%Y-%m-%d %H:%m') as inicio, texto, icone, DATE_FORMAT(if(fim is null, inicio, fim), '%Y-%m-%d %H:%m') as fim from (
                            select linha.*,
                                   (select data_partida from partidas where time_id_vencedor = linha.time_id_vencedor and fase=linha.fase+1 ) as fim
                                from (
                                select pa.data_partida as inicio, partida_id, concat('jogo pela ', pa.fase ,'ª fase, na arena ', a.nome, ' no ', e.nome) as texto,
                                    a.bandeira_angular as icone, pa.time_id_vencedor,pa.fase
                                 from
                                        (select partidas.time_id_vencedor as idv from partidas order by partida_id desc limit 1) campeao
                                  inner join partidas pa on (pa.time_id_vencedor = campeao.idv)
                                  inner join arenas a on (a.arena_id = pa.arena_id)
                                  inner join estados e on (e.estado_id = a.estado_id)
                            ) as linha
                        ) as linha     `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * Estados x número de partidas
    */
    listaEstadosPartidas(res) {
        const sql = ` select e.nome, sum(1) as total from partidas p
                        inner join arenas a on(a.arena_id = p.arena_id)
                        inner join estados e on(e.estado_id = a.estado_id)
                        group by e.estado_id `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * Times x {menor resultado de um jogador, maior resultado de um jogador} x top 10 na classificação geral
    */
    listaTimesMaximosMinimos(res) {
        const sql = ` select "Requisição Inativa" from armas `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * diagrama de fluxo, uso das arenas por estado
    */
    listaEstadosFluxo(res) {
        const sql = `
                        select sum(1) as total,
                                    concat(fase_anterior, 'ª fase: ', estado_anterior ) as origem,
                                    concat(fase_atual, 'ª fase: ',estado_atual  ) as destino

                        from (
                            select anterior.*,
                                   pa.fase as fase_atual, e.nome estado_atual, a.nome nome_atual, pa.time_id_vencedor as time_atual
                                 from (
                                                select p.fase as fase_anterior, e.nome estado_anterior, a.nome nome_anterior, p.time_id_vencedor as time_anteriro
                                                from partidas as p
                                                        inner join arenas a on (a.arena_id = p.arena_id)
                                                        inner join estados e on (e.estado_id = a.estado_id)
                                ) as anterior
                                inner join partidas pa on ((pa.time_id_A = anterior.time_anteriro or pa.time_id_B = anterior.time_anteriro) and pa.fase = anterior.fase_anterior+1)
                                    inner join arenas a on (a.arena_id = pa.arena_id)
                                    inner join estados e on (e.estado_id = a.estado_id)
                        ) as partidas group by estado_anterior, estado_atual, fase_anterior, fase_atual `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * Audiência x data
    */
    listaAudienciaData(res) {
        const sql = ` select DATE_FORMAT(pa.data_partida, '%Y-%m-%d') as "x", pa.publico as value, partida_id as id, r.nome as regiao, e.nome as "y",
                        concat(tv.nome, '(vencedor) x ', tp.nome,'(perdedor). Arena ', a.nome, ', pacidade de ',a.capacidade, ' pessoas' ) as title,
                        r.color
                        from partidas pa
                             inner join arenas a  on (a.arena_id = pa.arena_id)
                             inner join estados e  on (e.estado_id = a.estado_id)
                             inner join regioes r  on (r.regiao_id = e.regiao_id)
                             inner join times tv  on (tv.time_id = pa.time_id_vencedor)
                             inner join times tp  on (tp.time_id = pa.time_id_perdedor)
                      order by data_partida `
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Charts