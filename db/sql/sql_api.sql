-- metodo armas - OK
select * from armas order by nome

-- metodo armas por id da arma - OK
select * from armas where arma_id = 1;

-- metodo armas ordenado por total de mortes, total de HS, nome - OK
select * from (
	select sum(1) as total, sum(k.tipo) as HSArma, a.* from kills k
		inner join rounds_jogadores_armas rja on (rja.round_jogador_arma_id = k.round_jogador_arma_id)
		inner join armas a on (a.arma_id = rja.arma_id)
		group by a.arma_id
)  as armas order by total desc, HSArma desc, nome

-- metodo armas ordenado por total de mortes, total de HS, nome de um único ID - OK
select sum(1) as total, sum(k.tipo) as HSArma, a.* from kills k
	inner join rounds_jogadores_armas rja on (rja.round_jogador_arma_id = k.round_jogador_arma_id)
	inner join armas a on (a.arma_id = rja.arma_id)
where a.arma_id = 1
group by a.arma_id



-- metodo times ordenados por vitórias na competição e pontos
select * from (
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
) as times order by fase_vencedor desc, fase_perdedor desc, total desc;

-- busca de times por id do time
select ti.*, e.nome as estado, e.sigla, r.nome as regiao from times ti
	inner join estados e on (e.estado_id = ti.estado_id)
    inner join regioes r on (r.regiao_id = e.regiao_id)
where ti.time_id = 1;

-- busca de times por estado
select ti.*, e.nome as estado, e.sigla, r.nome as regiao from times ti
	inner join estados e on (e.estado_id = ti.estado_id)
    inner join regioes r on (r.regiao_id = e.regiao_id)
where e.estado_id = 1;

-- busca de times por região
select ti.*, e.nome as estado, e.sigla, r.nome as regiao from times ti
	inner join estados e on (e.estado_id = ti.estado_id)
    inner join regioes r on (r.regiao_id = e.regiao_id)
    where r.regiao_id = 1;

-- busca time campeão
select ti.*, e.nome as estado, e.sigla, r.nome as regiao from times ti
	inner join estados e on (e.estado_id = ti.estado_id)
    inner join regioes r on (r.regiao_id = e.regiao_id)
    inner join partidas pa on (pa.time_id_vencedor = ti.time_id)
order by pa.partida_id desc limit 1




-- ranking de jogador ordenado por posição da equipe no campeonato, pontos feitos pelo jogador, HSs feitos pelo jogador
select * from (
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
) as jogadores order by fase_vencedor desc, fase_perdedor desc,  total desc, HSjogador desc;


-- ranking de jogador ordenado por pontos feitos pelo jogador, HSs feitos pelo jogador
select * from (
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
) as jogadores order by total desc, HSjogador desc;



-- metodo arenas, pelo uso em ordem cronologica
select capacidade, publico, SUBSTRING(lat, 1, 10) as lat, SUBSTRING(lng, 1, 10) as lng, DATE_FORMAT(pa.data_partida, '%d/%m/%Y') as data,
a.nome as arena, e.nome as estado, r.nome as regiao,  a.arena_id, a.estado_id, r.regiao_id, localidade, href, img, bandeira_angular
from arenas as a
	inner join partidas pa on(pa.arena_id = a.arena_id)
	inner join estados e on (e.estado_id = a.estado_id)
	inner join regioes r on (r.regiao_id = e.regiao_id)
order by publico desc
;


-- metodo de todas as partidas com todas as informações, por posição da partida -ok
select * from (
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
) as partidas order by fase desc, pontos_partida desc, HS_partida desc ;


-- metodo de única as partida com todas as informações, por posição da partida OK
select * from (
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
	where pa.partida_id = 1
    group by pa.partida_id
) as partidas order by fase desc, pontos_partida desc, HS_partida desc ;


-- metodo de todas as partidas pontos e hs do melhor jogador do time vencedor - descontinuar
select pa.partida_id, sum(pontos) as pontos_mpv_vencedor, sum(tipo) as hs_mpv_vencedor
 from partidas pa
   inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id and rja.jogador_id = pa.jogador_id_mvp_vencedor)
   inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
   group by pa.partida_id
   ;
-- metodo de uma única partida pontos e hs do melhor jogador do time vencedor ok
select pa.partida_id, sum(pontos) as pontos_mpv_vencedor, sum(tipo) as hs_mpv_vencedor
 from partidas pa
   inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id and rja.jogador_id = pa.jogador_id_mvp_vencedor)
   inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
   where pa.partida_id = 1;

-- metodo de todas as partidas pontos e hs do melhor jogador do time perdedor- descontinuar
select pa.partida_id, sum(pontos) as pontos_mpv_perdedor, sum(tipo) as hs_mpv_perdedor
 from partidas pa
   inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id and rja.jogador_id = pa.jogador_id_mvp_perdedor)
   inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
   group by pa.partida_id;

-- metodo de uma única partida pontos e hs do melhor jogador do time perdedor ok
select pa.partida_id, sum(pontos) as pontos_mpv_vencedor, sum(tipo) as hs_mpv_vencedor
 from partidas pa
   inner join rounds_jogadores_armas rja on (rja.partida_id = pa.partida_id and rja.jogador_id = pa.jogador_id_mvp_perdedor)
   inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
where pa.partida_id = 1;


-- metodo pontos de um time vencedor de uma partida
select * from (
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
	where pa.partida_id = 1
	group by jo.jogador_id
) as time_vencedor order by pontos_mpv_vencedor desc, hs_mpv_vencedor desc;

-- metodo pontos de um time perdedor de uma partida
select * from (
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
	where pa.partida_id = 1
	group by jo.jogador_id
) as time_perdedor order by pontos_mpv_perdedor desc, hs_mpv_perdedor desc;



-- graficos
-- 1
select * from (
select  j.nome, j.apelido,  j.bandeira_angular, sum(1) as first_kills from (
				select  rja.jogador_id from rounds r
					inner join rounds_jogadores_armas rja on (rja.round_id = r.round_id)
					inner join kills k on (k.round_jogador_arma_id = rja.round_jogador_arma_id)
					 group by r.round_id
		      ) as kill_1_jogador
              inner join jogadores j on (j.jogador_id = kill_1_jogador.jogador_id)
					group by j.jogador_id
) as  kill_1_jogador order by first_kills desc, nome limit 20
-- 2
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
) as  kill_1_time order by first_kills desc, nome limit 20

-- 8
select lat, lng, a.nome, a.href from arenas as a
	inner join partidas p on (p.arena_id = a.arena_id)
		order by p.publico desc

-- 11
 select e.nome, sum(1) as total from partidas p
	inner join arenas a on(a.arena_id = p.arena_id)
    inner join estados e on(e.estado_id = a.estado_id)
    group by e.estado_id
