const conexao = require('../../../config/conexao')

class Partidas {
    /**
    * obter todas as partidas da competição, com informações gerais completas
    */
    lista(res) {
        const sql = ` select * from (
                            select
                            pa.fase, pa.partida_id,
                            IF(pa.time_id_A=pa.time_id_vencedor, placar_timeA, placar_timeB) as Rounds_vencedor,
                            IF(pa.time_id_A=pa.time_id_perdedor, placar_timeA, placar_timeB) as Rounds_perdedor,
                            time_id_vencedor, tiv.nome as time_vencedor, tiv.logo_angular as logo_vencedor, tiv.href as href_vencedor,
                            etiv.nome as estado_vencedor, etiv.sigla as sigla_vencedor, rtiv.nome as regiao_vencedor,
                            time_id_perdedor, tip.nome as time_perdedor, tip.logo_angular as logo_perdedor, tip.href as href_perdedor,
                            etip.nome as estado_perdedor, etip.sigla as sigla_perdedor, rtip.nome as regiao_perdedor,
                            capacidade, publico, SUBSTRING(lat, 1, 10) as lat, SUBSTRING(lng, 1, 10) as lng, DATE_FORMAT(pa.data_partida, '%d/%m/%Y') as data,
                            a.nome as arena, e.nome as estado_arena, r.nome as regiao_arena,  a.arena_id,
                            a.estado_id, r.regiao_id, localidade, a.href as href_arena, a.img as img_arena, a.bandeira_angular as bandeira_arena,
                            jomvpv.nome as mvp_v_nome, jomvpv.apelido as mvp_v_apelido, jomvpv.bandeira_angular as mvp_v_bandeira,
                            jomvpp.nome as mvp_p_nome, jomvpp.apelido as mvp_p_apelido, jomvpp.bandeira_angular as mvp_p_bandeira,
                            jomvpv.nome as mvp_partida_nome,
                            sum(k.pontos) as pontos_partida, sum(k.tipo) as HS_partida
                            from arenas as a
                                inner join partidas pa on(pa.arena_id = a.arena_id)
                                inner join estados e on (e.estado_id = a.estado_id)
                                inner join regioes r on (r.regiao_id = e.regiao_id)
                                inner join times tiv on (tiv.time_id = pa.time_id_vencedor)
                                inner join times tip on (tip.time_id = pa.time_id_perdedor)
                                inner join estados etiv on (etiv.estado_id = tiv.estado_id)
                                inner join estados etip on (etip.estado_id = tip.estado_id)
                                inner join regioes rtiv on (rtiv.regiao_id = etiv.regiao_id)
                                inner join regioes rtip on (rtip.regiao_id = etip.regiao_id)
                                inner join jogadores jomvpv on (jomvpv.jogador_id = pa.jogador_id_mvp_vencedor)
                                inner join jogadores jomvpp on (jomvpp.jogador_id = pa.jogador_id_mvp_perdedor)

                                inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id )
                                inner join jogadores jo_rja on (jo_rja.jogador_id = rja.jogador_id and jo_rja.time_id = pa.time_id_vencedor)
                                inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                            group by pa.partida_id
                        ) as partidas order by fase desc, pontos_partida desc, HS_partida `


        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    /**
    * obter uma única partida competição, com informações gerais completas
    */
    buscaPorId(id, res) {
        const sql = `  select * from (
                            select
                            pa.fase, pa.partida_id,
                            IF(pa.time_id_A=pa.time_id_vencedor, placar_timeA, placar_timeB) as Rounds_vencedor,
                            IF(pa.time_id_A=pa.time_id_perdedor, placar_timeA, placar_timeB) as Rounds_perdedor,
                            time_id_vencedor, tiv.nome as time_vencedor, tiv.logo_angular as logo_vencedor, tiv.href as href_vencedor,
                            etiv.nome as estado_vencedor, etiv.sigla as sigla_vencedor, rtiv.nome as regiao_vencedor,
                            time_id_perdedor, tip.nome as time_perdedor, tip.logo_angular as logo_perdedor, tip.href as href_perdedor,
                            etip.nome as estado_perdedor, etip.sigla as sigla_perdedor, rtip.nome as regiao_perdedor,
                            capacidade, publico, SUBSTRING(lat, 1, 10) as lat, SUBSTRING(lng, 1, 10) as lng, DATE_FORMAT(pa.data_partida, '%d/%m/%Y') as data,
                            a.nome as arena, e.nome as estado_arena, r.nome as regiao_arena,  a.arena_id,
                            a.estado_id, r.regiao_id, localidade, a.href as href_arena, a.img as img_arena, a.bandeira_angular as bandeira_arena,
                            jomvpv.nome as mvp_v_nome, jomvpv.apelido as mvp_v_apelido, jomvpv.bandeira_angular as mvp_v_bandeira,
                            jomvpp.nome as mvp_p_nome, jomvpp.apelido as mvp_p_apelido, jomvpp.bandeira_angular as mvp_p_bandeira,
                            jomvpv.nome as mvp_partida_nome,
                            sum(k.pontos) as pontos_partida, sum(k.tipo) as HS_partida
                            from arenas as a
                                inner join partidas pa on(pa.arena_id = a.arena_id)
                                inner join estados e on (e.estado_id = a.estado_id)
                                inner join regioes r on (r.regiao_id = e.regiao_id)
                                inner join times tiv on (tiv.time_id = pa.time_id_vencedor)
                                inner join times tip on (tip.time_id = pa.time_id_perdedor)
                                inner join estados etiv on (etiv.estado_id = tiv.estado_id)
                                inner join estados etip on (etip.estado_id = tip.estado_id)
                                inner join regioes rtiv on (rtiv.regiao_id = etiv.regiao_id)
                                inner join regioes rtip on (rtip.regiao_id = etip.regiao_id)
                                inner join jogadores jomvpv on (jomvpv.jogador_id = pa.jogador_id_mvp_vencedor)
                                inner join jogadores jomvpp on (jomvpp.jogador_id = pa.jogador_id_mvp_perdedor)

                                inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id )
                                inner join jogadores jo_rja on (jo_rja.jogador_id = rja.jogador_id and jo_rja.time_id = pa.time_id_vencedor)
                                inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                            where pa.partida_id = ${id}
                            group by pa.partida_id
                        ) as partidas order by fase desc, pontos_partida desc, HS_partida desc `

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    /**
    * Obter os pontos do melhor jogador de uma partida, do time vencedor
    */
    buscaPorIdMVPV(id, res) {
        const sql = ` select pa.partida_id, sum(pontos) as pontos_mpv_vencedor, sum(tipo) as hs_mpv_vencedor
                        from partidas pa
                        inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id and rja.jogador_id = pa.jogador_id_mvp_vencedor)
                        inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                        where pa.partida_id = ${id} `

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    /**
    * Obter os pontos do melhor jogador de uma partida, do time perdedor
    */
    buscaPorIdMVPP(id, res) {
        const sql = ` select pa.partida_id, sum(pontos) as pontos_mpv_vencedor, sum(tipo) as hs_mpv_vencedor
                        from partidas pa
                            inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id and rja.jogador_id = pa.jogador_id_mvp_perdedor)
                            inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                        where pa.partida_id = ${id} `

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }


    /**
    * Obter os pontos do time vencedor de uma partida
    */
    buscaPorIdPontosV(id, res) {
        const sql = ` select * from (
                                select pa.partida_id, sum(pontos) as pontos_mpv_vencedor, sum(tipo) as hs_mpv_vencedor, jo.nome as jogador, apelido, bandeira_angular,
                                IF(jo.jogador_id = pa.jogador_id_mvp_vencedor, "MVP", "") as MVP, ti.nome as nome_time, ti.logo_angular as logo_time, ti.href as href_time,
                                e.nome as estado_time, e.sigla as sigla_time, r.nome as regiao_time
                                 from partidas pa
                                   inner join times ti on (ti.time_id= pa.time_id_vencedor)
                                   inner join estados e on (e.estado_id = ti.estado_id)
                                   inner join regioes r on (r.regiao_id = e.regiao_id)
                                   inner join jogadores jo on (jo.time_id= pa.time_id_vencedor)
                                   inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id and rja.jogador_id = jo.jogador_id)
                                   inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                                where pa.partida_id =  ${id}
                                group by jo.jogador_id
                            ) as time_vencedor order by pontos_mpv_vencedor desc, hs_mpv_vencedor desc `

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    /**
    * Obter os pontos do time perdedor de uma partida
    */
    buscaPorIdPontosP(id, res) {
        const sql = ` select * from (
                            select pa.partida_id, sum(pontos) as pontos_mpv_perdedor, sum(tipo) as hs_mpv_perdedor, jo.nome as jogador, apelido, bandeira_angular,
                            IF(jo.jogador_id = pa.jogador_id_mvp_perdedor, "MVP", "") as MVP, ti.nome as nome_time, ti.logo_angular as logo_time, ti.href as href_time,
                            e.nome as estado_time, e.sigla as sigla_time, r.nome as regiao_time
                             from partidas pa
                               inner join times ti on (ti.time_id= pa.time_id_perdedor)
                               inner join estados e on (e.estado_id = ti.estado_id)
                               inner join regioes r on (r.regiao_id = e.regiao_id)
                               inner join jogadores jo on (jo.time_id= pa.time_id_perdedor)
                               inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id and rja.jogador_id = jo.jogador_id)
                               inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
                            where pa.partida_id =  ${id}
                            group by jo.jogador_id
                        ) as time_perdedor order by pontos_mpv_perdedor desc, hs_mpv_perdedor desc `

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Partidas