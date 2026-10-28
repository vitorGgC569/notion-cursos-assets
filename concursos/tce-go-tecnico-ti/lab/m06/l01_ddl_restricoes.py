# -*- coding: utf-8 -*-
# L1: DDL e restricoes (PK, FK, UNIQUE, CHECK, NOT NULL, SERIAL), nas questoes TRT-22/2022, TRT-2/2018 e TRT-3/2015.
from common import *
pg = PGServer('l01'); P = pg.conn(); S = sqlite_mem()
h('L1. DDL e restricoes de integridade'); versions(P)

h('PostgreSQL: CREATE TABLE com restricoes nomeadas (TRT-22 2022, Tecnico, Q23 e Q26)')
P.run("DROP TABLE IF EXISTS trtfunc")
P.run("""CREATE TABLE trtfunc (
  nromatricula numeric(10) NOT NULL,
  nomefunc varchar(100) NOT NULL,
  telefone varchar(50),
  salario numeric(10,2),
  CONSTRAINT matricula_unica UNIQUE (nromatricula, nomefunc),
  CONSTRAINT valor_positivo CHECK (salario > 0)
)""")
P.run("INSERT INTO trtfunc VALUES (1, 'Ana', '6199', 3500.00)")
sub('mesmo par (matricula, nome): viola UNIQUE')
P.run("INSERT INTO trtfunc VALUES (1, 'Ana', '6188', 4000.00)")
sub('mesma matricula com outro nome: o UNIQUE e do PAR, entao passa')
P.run("INSERT INTO trtfunc VALUES (1, 'Bia', NULL, 4000.00)")
sub('salario negativo: viola CHECK valor_positivo')
P.run("INSERT INTO trtfunc VALUES (2, 'Caio', NULL, -10)")
sub('nome nulo: viola NOT NULL')
P.run("INSERT INTO trtfunc VALUES (3, NULL, NULL, 10)")
sub('NULL em salario: CHECK devolve UNKNOWN e a linha PASSA (pegadinha)')
P.run("INSERT INTO trtfunc VALUES (4, 'Dora', NULL, NULL)")
P.run("SELECT * FROM trtfunc ORDER BY nromatricula, nomefunc")

h('PostgreSQL: DROP TABLE IF EXISTS e SERIAL (TRT-22 2022, Tecnico, Q24; Analista Q26)')
P.run("DROP TABLE IF EXISTS trtcontatos")
P.run("DROP TABLE IF EXISTS trtcontatos")
P.run("""CREATE TABLE trtcontatos (
  cod serial PRIMARY KEY,
  orgao varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  descricao varchar(255)
)""")
sub('INSERT de varias linhas e RETURNING * (Analista TRT-22 Q26, alternativa C)')
P.run("""INSERT INTO trtcontatos (orgao, email) VALUES
 ('Ouvidoria','ouvidoria@trt22.jus.br'),
 ('Escola Judicial','ejud@trt22.jus.br'),
 ('Corregedoria','secor@trt22.jus.br')
RETURNING *""")
sub('alternativa A diz que PostgreSQL nao aceita varias linhas; alternativa E diz que seria cod_serial (nenhuma funciona):')
P.run("CREATE TABLE t_errado (cod_serial PRIMARY KEY, x int)")
sub('SERIAL e so atalho: cria uma sequence')
P.run("SELECT pg_get_serial_sequence('trtcontatos','cod') AS sequencia")

h('PostgreSQL: chave estrangeira (TRT-2 2018, Tecnico, Q45)')
P.run("DROP TABLE IF EXISTS funcionario; DROP TABLE IF EXISTS departamento")
P.run("CREATE TABLE departamento (coddep varchar(10) PRIMARY KEY, local_ point)")
sub('forma correta (alternativa E): references departamento(coddep)')
P.run("CREATE TABLE funcionario (coddep varchar(10) references departamento(coddep), salario real, dataadm date)")
sub('forma de alternativa A: foreign key departamento(coddep)')
P.run("CREATE TABLE f2 (coddep varchar(10) foreign key departamento(coddep))")
sub('forma de alternativa D: constraint departamento(coddep)')
P.run("CREATE TABLE f3 (coddep varchar(10) constraint departamento(coddep))")
P.run("INSERT INTO departamento VALUES ('10', NULL)")
P.run("INSERT INTO funcionario VALUES ('10', 1000, '2018-01-02')")
sub('departamento inexistente: viola a FK')
P.run("INSERT INTO funcionario VALUES ('99', 1000, '2018-01-02')")
sub('apagar o pai com filho existente: viola a FK (acao padrao NO ACTION)')
P.run("DELETE FROM departamento WHERE coddep = '10'")

h('PostgreSQL: remover uma constraint (TRT-3 2015, Tecnico, Q48, alternativa D)')
P.run("CREATE TABLE processo (numeroprocesso varchar(10) PRIMARY KEY, anoinicioprocesso int, CONSTRAINT chkanoprocesso CHECK (anoinicioprocesso > 1980))")
P.run("INSERT INTO processo VALUES ('000182', 1970)")
P.run("ALTER TABLE processo DROP CHECK chkanoprocesso")
P.run("ALTER TABLE processo DROP CONSTRAINT chkanoprocesso")
P.run("INSERT INTO processo VALUES ('000182', 1970)")

h('SQLite 3.46: as mesmas ideias, com diferencas de dialeto')
S.run("CREATE TABLE departamento (coddep TEXT PRIMARY KEY, nome TEXT NOT NULL)")
S.run("CREATE TABLE funcionario (id INTEGER PRIMARY KEY AUTOINCREMENT, coddep TEXT REFERENCES departamento(coddep), salario REAL CHECK (salario > 0))")
S.run("INSERT INTO departamento VALUES ('10','TI')")
S.run("INSERT INTO funcionario (coddep, salario) VALUES ('10', 1000)")
sub('FK violada (PRAGMA foreign_keys = ON ativo nesta conexao)')
S.run("INSERT INTO funcionario (coddep, salario) VALUES ('99', 1000)")
sub('CHECK violado')
S.run("INSERT INTO funcionario (coddep, salario) VALUES ('10', -5)")
sub('SQLite nao tem ALTER TABLE ... DROP CONSTRAINT: o comando nem e reconhecido')
S.run("ALTER TABLE funcionario DROP CONSTRAINT chk")
sub('tipagem dinamica do SQLite: coluna REAL aceita texto que nao vira numero')
S.run("CREATE TABLE t (n INTEGER)")
S.run("INSERT INTO t VALUES ('abc')")
S.run("SELECT n, typeof(n) FROM t")
pg.close()
