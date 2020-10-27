CREATE TABLE IF NOT EXISTS athon.regioes(
    regiao_id int NOT NULL AUTO_INCREMENT,
    nome varchar(20) NOT NULL,
    PRIMARY KEY (regiao_id)
)  ENGINE=InnoDB;

INSERT INTO athon.regioes(nome) values ('Sul');
INSERT INTO athon.regioes(nome) values ('Sudeste');
INSERT INTO athon.regioes(nome) values ('Centro-Oeste');
INSERT INTO athon.regioes(nome) values ('Norte');
INSERT INTO athon.regioes(nome) values ('Nordeste');

select * from athon.regioes;

CREATE TABLE IF NOT EXISTS athon.estados(
    estado_id int NOT NULL AUTO_INCREMENT,
    regiao_id INT NOT NULL,
    nome varchar(30) NOT NULL,
    sigla varchar(2) NOT NULL,
    FOREIGN KEY (regiao_id) REFERENCES athon.regioes(regiao_id),
    PRIMARY KEY (estado_id)
)  ENGINE=InnoDB;

INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Rio Grande do Sul', 1, 'RS');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Santa Catarina', 1, 'SC');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Paraná', 1, 'PR');

INSERT INTO athon.estados(nome, regiao_id, sigla) values ('São Paulo', 2, 'SP');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Rio de Janeiro', 2, 'RJ');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Minas Gerais', 2, 'MG');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Espírito Santo', 2, 'ES');

INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Mato Grosso', 3, 'MT');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Mato Grosso do Sul', 3, 'MS');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Goiás', 3, 'GO');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Distrito Federal', 3, 'DF');

INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Tocantins', 4, 'TO');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Roraima', 4, 'RR');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Rondônia', 4, 'RO');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Pará', 4, 'PA');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Amazonas', 4, 'AM');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Amapá', 4, 'AP');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Acre', 4, 'AC');

INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Alagoas', 5, 'AL');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Bahia', 5, 'BA');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Ceará', 5, 'CE');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Maranhão', 5, 'MA');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Paraíba', 5, 'PB');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Pernambuco', 5, 'PE');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Piauí', 5, 'PI');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Rio Grande do Norte', 5, 'RN');
INSERT INTO athon.estados(nome, regiao_id, sigla) values ('Sergipe', 5, 'SE');

select * from athon.estados;

CREATE TABLE IF NOT EXISTS athon.times(
    time_id int NOT NULL AUTO_INCREMENT,
    estado_id INT NOT NULL,
    nome varchar(80) NOT NULL,
    logo varchar(255) NULL DEFAULT "",
    href varchar(255) NULL DEFAULT "",
    FOREIGN KEY (estado_id) REFERENCES athon.estados(estado_id),
    PRIMARY KEY (time_id)
)  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS athon.jogadores(
    jogador_id int NOT NULL AUTO_INCREMENT,
    time_id INT NOT NULL,
    nome varchar(80) NOT NULL,
    apelido varchar(30) NOT NULL,
    bandeira varchar(255) NULL DEFAULT "",
    FOREIGN KEY (time_id) REFERENCES athon.times(time_id),
    PRIMARY KEY (jogador_id)
)  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS athon.arenas(
    arena_id int NOT NULL AUTO_INCREMENT,
    estado_id INT NOT NULL,
    nome varchar(80) NOT NULL,
    localidade varchar(80) NOT NULL,
    capacidade INT NULL DEFAULT 0,
    lat varchar(20) NULL DEFAULT "",
    lng varchar(20) NULL DEFAULT "",
    href varchar(255) NULL DEFAULT "",
    img varchar(255) NULL DEFAULT "",
    bandeira varchar(255) NULL DEFAULT "",
    FOREIGN KEY (estado_id) REFERENCES athon.estados(estado_id),
    PRIMARY KEY (arena_id)
)  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS athon.partidas(
    partida_id int NOT NULL AUTO_INCREMENT,
    arena_id INT NOT NULL,
    fase INT NULL DEFAULT 0,
    publico INT NULL DEFAULT 0,
    time_id_A INT NOT NULL DEFAULT 0,
    time_id_B INT NOT NULL DEFAULT 0,
    time_id_vencedor INT NULL DEFAULT 0,
    time_id_perdedor INT NULL DEFAULT 0,
    placar_timeA INT NULL DEFAULT 0,
    placar_timeB INT NULL DEFAULT 0,
    jogador_id_mvp_vencedor INT NULL DEFAULT 0,
    jogador_id_mvp_perdedor INT NULL DEFAULT 0,
    data_partida DATETIME NULL DEFAULT NULL,
    FOREIGN KEY (arena_id) REFERENCES athon.arenas(arena_id),
    FOREIGN KEY (time_id_A) REFERENCES athon.times(time_id),
    FOREIGN KEY (time_id_B) REFERENCES athon.times(time_id),
    PRIMARY KEY (partida_id)
)  ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS athon.rounds(
    round_id int NOT NULL AUTO_INCREMENT,
    partida_id INT NOT NULL,
    time_id_vencedor INT NULL DEFAULT 0,
    time_id_perdedor INT NULL DEFAULT 0,
    jogador_id_mvp_vencedor INT NULL DEFAULT 0,
    jogador_id_mvp_perdedor INT NULL DEFAULT 0,
    FOREIGN KEY (partida_id) REFERENCES athon.partidas(partida_id),
    FOREIGN KEY (time_id_vencedor) REFERENCES athon.times(time_id),
    FOREIGN KEY (time_id_perdedor) REFERENCES athon.times(time_id),
    PRIMARY KEY (round_id)
)  ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS athon.armas(
    arma_id int NOT NULL AUTO_INCREMENT,
    nome varchar(80) NOT NULL,
    icone varchar(255) NULL DEFAULT "",
    PRIMARY KEY (arma_id)
)  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS athon.rounds_jogadores_armas(
	round_jogador_arma_id INT NOT NULL AUTO_INCREMENT,
	partida_id INT NOT NULL,
    round_id int NOT NULL,
    jogador_id int NOT NULL,
    arma_id int NOT NULL,
    FOREIGN KEY (partida_id) REFERENCES athon.partidas(partida_id),
    FOREIGN KEY (round_id) REFERENCES athon.rounds(round_id),
    FOREIGN KEY (jogador_id) REFERENCES athon.jogadores(jogador_id),
    FOREIGN KEY (arma_id) REFERENCES athon.armas(arma_id),
    PRIMARY KEY (round_jogador_arma_id)
)  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS athon.kills(
    kill_id int NOT NULL AUTO_INCREMENT,
    round_jogador_arma_id INT NULL DEFAULT 0,
    jogador_id INT NULL DEFAULT 0,
    tipo  int null default 0,
    pontos  int null default 0,
    FOREIGN KEY (round_jogador_arma_id) REFERENCES athon.rounds_jogadores_armas(round_jogador_arma_id),
    FOREIGN KEY (jogador_id) REFERENCES athon.jogadores(jogador_id),
    PRIMARY KEY (kill_id)
)  ENGINE=InnoDB;

'''
DROP TABLE athon.jogadores;
DROP TABLE athon.times;
DROP TABLE athon.estados;
DROP TABLE athon.regioes;
DROP TABLE athon.kills;
DROP TABLE athon.rounds_jogadores_armas;
DROP TABLE athon.armas;
DROP TABLE athon.arenas;
DROP TABLE athon.rounds;
DROP TABLE athon.partidas;

'''

alter table athon.times add column logo_local varchar(255) null default "";
alter table athon.times add column logo_nome varchar(80) null default "";
alter table athon.times add column logo_angular varchar(255) null default "";

alter table athon.jogadores add column bandeira_local varchar(255) null default "";
alter table athon.jogadores add column bandeira_nome varchar(80) null default "";
alter table athon.jogadores add column bandeira_angular varchar(255) null default "";

alter table athon.arenas add column bandeira_local varchar(255) null default "";
alter table athon.arenas add column bandeira_nome varchar(80) null default "";
alter table athon.arenas add column bandeira_angular varchar(255) null default "";

alter table athon.armas add column icone_local varchar(255) null default "";
alter table athon.armas add column icone_nome varchar(80) null default "";
alter table athon.armas add column icone_angular varchar(255) null default "";