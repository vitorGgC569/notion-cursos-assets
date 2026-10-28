# -*- coding: utf-8 -*-
# L8: views, views materializadas, triggers, funcoes e procedures. PostgreSQL 18 (PL/pgSQL) e SQLite (views e triggers). Oracle (PL/SQL) nao foi executado.
from common import *
pg = PGServer('l08'); P = pg.conn(); S = sqlite_mem(); versions(P)

def base(D):
    D.run("CREATE TABLE processo (numeroprocesso TEXT PRIMARY KEY, tribunalprocesso INTEGER, anoinicioprocesso INTEGER)", show=False)
    D.ins('processo', [('000182',3,2008),('000346',15,2010),('000467',5,2009),('000999',2,2005),('001001',20,2012)])

h('Views (SQLite e PostgreSQL)')
for D in (S, P):
    print('\n[%s]' % D.kind); base(D)
    D.run("CREATE VIEW processos_recentes AS SELECT numeroprocesso AS numero_do_processo, tribunalprocesso AS numero_do_tribunal FROM processo WHERE anoinicioprocesso >= 2008")
    D.run("SELECT * FROM processos_recentes ORDER BY 1")
    print('A view nao guarda dados: ela guarda a consulta. Mudou a tabela, mudou a view:')
    D.run("UPDATE processo SET anoinicioprocesso = 2000 WHERE numeroprocesso = '000182'")
    D.run("SELECT * FROM processos_recentes ORDER BY 1")
    print('Seguranca: a view esconde colunas e linhas; o usuario recebe GRANT na view, nao na tabela (veja DCL abaixo, em PostgreSQL).')
print('\nSintaxes erradas da prova TRT-3 2015 Q51 (CREATE VIEW ... ON/WITH SELECT):')
P.run("CREATE VIEW v_errada ON SELECT numeroprocesso FROM processo")
P.run("CREATE VIEW v_errada WITH SELECT numeroprocesso FROM processo")

h('PostgreSQL: view materializada (guarda o resultado) e REFRESH')
P.run("CREATE MATERIALIZED VIEW mv_total AS SELECT tribunalprocesso, COUNT(*) AS qtd FROM processo GROUP BY tribunalprocesso")
P.run("SELECT * FROM mv_total ORDER BY 1")
P.run("INSERT INTO processo VALUES ('002002', 3, 2020)")
print('[a materializada ainda mostra o valor antigo]'); P.run("SELECT * FROM mv_total WHERE tribunalprocesso = 3")
P.run("REFRESH MATERIALIZED VIEW mv_total")
P.run("SELECT * FROM mv_total WHERE tribunalprocesso = 3")

h('PostgreSQL: DCL, GRANT e REVOKE de verdade (TRT-14 2022 Q36 e Analista Q44; TRT-5 Analista Q26)')
P.run("CREATE ROLE analista LOGIN PASSWORD 'x'", show=True)
P.run("SELECT has_table_privilege('analista', 'processo', 'SELECT') AS pode_select_antes")
P.run("GRANT SELECT ON processos_recentes TO analista")
P.run("SELECT has_table_privilege('analista', 'processos_recentes', 'SELECT') AS pode_select_na_view, has_table_privilege('analista', 'processo', 'SELECT') AS pode_select_na_tabela")
P.run("REVOKE SELECT ON processos_recentes FROM analista")
P.run("SELECT has_table_privilege('analista', 'processos_recentes', 'SELECT') AS pode_select_na_view")
print('A sintaxe do Oracle GRANT create session, create table, create view TO analista (TRT-5 Analista Q26) NAO foi executada: privilegios de sistema sao do Oracle e nao existem no PostgreSQL.')
P.run("GRANT create session, create table, create view TO analista")

h('Triggers: auditoria automatica (PostgreSQL com PL/pgSQL)')
P.run("CREATE TABLE auditoria (id SERIAL PRIMARY KEY, quando TEXT, operacao TEXT, numero TEXT, antes INTEGER, depois INTEGER)", show=False)
P.run("""CREATE FUNCTION audita() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO auditoria (quando, operacao, numero, antes, depois) VALUES ('t', TG_OP, OLD.numeroprocesso, OLD.tribunalprocesso, NEW.tribunalprocesso);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO auditoria (quando, operacao, numero, antes, depois) VALUES ('t', TG_OP, OLD.numeroprocesso, OLD.tribunalprocesso, NULL);
    RETURN OLD;
  END IF;
  RETURN NEW;
END $$""")
P.run("CREATE TRIGGER trg_audita AFTER UPDATE OR DELETE ON processo FOR EACH ROW EXECUTE FUNCTION audita()")
P.run("UPDATE processo SET tribunalprocesso = 4 WHERE numeroprocesso = '000467'")
P.run("DELETE FROM processo WHERE numeroprocesso = '000999'")
P.run("SELECT operacao, numero, antes, depois FROM auditoria ORDER BY id")
print('\nTrigger BEFORE: valida e pode alterar a linha antes de gravar')
P.run("""CREATE FUNCTION valida_ano() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.anoinicioprocesso < 1980 THEN RAISE EXCEPTION 'ano invalido: %', NEW.anoinicioprocesso; END IF;
  NEW.numeroprocesso := upper(NEW.numeroprocesso);
  RETURN NEW;
END $$""")
P.run("CREATE TRIGGER trg_valida BEFORE INSERT ON processo FOR EACH ROW EXECUTE FUNCTION valida_ano()")
P.run("INSERT INTO processo VALUES ('abc1', 1, 1970)")
P.run("INSERT INTO processo VALUES ('abc1', 1, 2021)")
P.run("SELECT * FROM processo WHERE tribunalprocesso = 1")

h('Procedures e funcoes (PostgreSQL): FUNCTION devolve valor; PROCEDURE e chamada com CALL e pode controlar a transacao')
P.run("""CREATE FUNCTION total_por_tribunal(t INTEGER) RETURNS BIGINT LANGUAGE sql AS $$ SELECT COUNT(*) FROM processo WHERE tribunalprocesso = t $$""")
P.run("SELECT total_por_tribunal(3) AS processos_no_tribunal_3")
P.run("CREATE TABLE log_lote (n INTEGER)", show=False)
P.run("""CREATE PROCEDURE arquiva_lote() LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO log_lote SELECT COUNT(*) FROM processo;
  COMMIT;
  INSERT INTO log_lote SELECT COUNT(*) FROM processo WHERE anoinicioprocesso > 2010;
  COMMIT;
END $$""")
P.run("CALL arquiva_lote()")
P.run("SELECT * FROM log_lote ORDER BY n")
print('Funcao nao pode dar COMMIT dentro dela; procedure (PostgreSQL 11+) pode:')
P.run("CREATE FUNCTION f_commit() RETURNS void LANGUAGE plpgsql AS $$ BEGIN COMMIT; END $$")
P.run("SELECT f_commit()")
P.run("""DO $$
DECLARE r RECORD; soma INTEGER := 0;
BEGIN
  FOR r IN SELECT tribunalprocesso FROM processo LOOP soma := soma + r.tribunalprocesso; END LOOP;
  RAISE NOTICE 'soma = %', soma;
  EXCEPTION WHEN others THEN RAISE;
END $$""")

h('SQLite: triggers tambem existem (sem PL/pgSQL; o corpo e SQL puro)')
S.run("CREATE TABLE auditoria (id INTEGER PRIMARY KEY, operacao TEXT, numero TEXT, antes INTEGER, depois INTEGER)", show=False)
S.run("""CREATE TRIGGER trg_audita AFTER UPDATE OF tribunalprocesso ON processo
BEGIN
  INSERT INTO auditoria (operacao, numero, antes, depois) VALUES ('UPDATE', OLD.numeroprocesso, OLD.tribunalprocesso, NEW.tribunalprocesso);
END""")
S.run("""CREATE TRIGGER trg_valida BEFORE INSERT ON processo WHEN NEW.anoinicioprocesso < 1980
BEGIN
  SELECT RAISE(ABORT, 'ano invalido');
END""")
S.run("UPDATE processo SET tribunalprocesso = 4 WHERE numeroprocesso = '000467'")
S.run("SELECT operacao, numero, antes, depois FROM auditoria")
S.run("INSERT INTO processo VALUES ('abc1', 1, 1970)")
print('\nSQLite nao tem CREATE PROCEDURE nem PL/SQL. Oracle (PL/SQL) nao foi executado neste laboratorio.')
pg.close()
