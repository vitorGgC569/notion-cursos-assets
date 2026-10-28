# -*- coding: utf-8 -*-
# L4: NULL e logica de tres valores (STN 2024 Q62), com SQL executado em SQLite e PostgreSQL.
from common import *
def go(D):
    D.run("CREATE TABLE exemplo (a INTEGER, b INTEGER, c INTEGER)", show=False)
    D.run("INSERT INTO exemplo VALUES (10, 20, NULL)", show=False)
    print('Tabela exemplo, uma linha (A, B, C) = (10, 20, NULL), como no enunciado da Q62:'); D.run("SELECT * FROM exemplo")
    sub('STN 2024 Q62 (gabarito B): valores de x1, y1, x2, y2, x3, y3')
    D.run("""select
case when (not C is null or B = 15) then 1 else 0 end x1,
case when not (not C is null or B = 15) then 1 else 0 end y1,
case when (C = null or B <> null) then 1 else 0 end x2,
case when not (C = null or B <> null) then 1 else 0 end y2,
case when (C < A or C > A) then 1 else 0 end x3,
case when not (C < A or C > A) then 1 else 0 end y3
from exemplo""")
    print('Alternativa B = 0, 1, 0, 0, 0, 0. O resultado do banco bate com a alternativa B.')
    sub('Por que: cada expressao avaliada sozinha (UNKNOWN aparece como NULL)')
    D.run("""SELECT
 (NOT c IS NULL OR b = 15) AS e1,
 NOT (NOT c IS NULL OR b = 15) AS e1_negada,
 (c = NULL OR b <> NULL) AS e2,
 NOT (c = NULL OR b <> NULL) AS e2_negada,
 (c < a OR c > a) AS e3,
 NOT (c < a OR c > a) AS e3_negada
FROM exemplo""")
    print('Regra: CASE WHEN so executa o THEN se a condicao for TRUE. UNKNOWN (NULL) cai no ELSE. NOT UNKNOWN continua UNKNOWN.')
    sub('Tabelas-verdade do SQL, executadas')
    T, F, N = ('TRUE', 'FALSE', 'CAST(NULL AS BOOLEAN)') if D.kind == 'PostgreSQL' else ('1', '0', 'NULL')
    D.run("SELECT (%s AND %s) AS u_and_t, (%s AND %s) AS u_and_f, (%s OR %s) AS u_or_t, (%s OR %s) AS u_or_f, (NOT %s) AS not_u" % (N, T, N, F, N, T, N, F, N))
    print('UNKNOWN (NULL) E TRUE = UNKNOWN; UNKNOWN E FALSE = FALSE; UNKNOWN OU TRUE = TRUE; UNKNOWN OU FALSE = UNKNOWN; NAO UNKNOWN = UNKNOWN. (No SQLite, TRUE e FALSE sao 1 e 0.)')
    sub('Comparacoes com NULL: = NULL nunca e verdadeiro; use IS NULL')
    D.run("CREATE TABLE t (x INTEGER)", show=False); D.run("INSERT INTO t VALUES (1), (2), (NULL), (NULL)", show=False)
    D.run("SELECT COUNT(*) AS todas, COUNT(x) AS nao_nulos, SUM(CASE WHEN x = NULL THEN 1 ELSE 0 END) AS igual_null, SUM(CASE WHEN x IS NULL THEN 1 ELSE 0 END) AS is_null FROM t")
    sub('NOT IN com NULL, e COALESCE/NULLIF')
    D.run("SELECT 3 AS valor, (3 IN (1, 2, NULL)) AS in_com_null, (3 NOT IN (1, 2, NULL)) AS not_in_com_null, (1 IN (1, 2, NULL)) AS achou")
    D.run("SELECT COALESCE(NULL, NULL, 7) AS coalesce, NULLIF(5, 5) AS nullif_igual, NULLIF(5, 6) AS nullif_diferente")
    sub('DISTINCT, GROUP BY e UNIQUE tratam NULLs de modos diferentes')
    D.run("SELECT DISTINCT x FROM t ORDER BY x")
    D.run("CREATE TABLE u (x INTEGER UNIQUE)", show=False)
    D.run("INSERT INTO u VALUES (NULL)"); D.run("INSERT INTO u VALUES (NULL)")
    D.run("SELECT COUNT(*) AS nulls_em_coluna_unique FROM u")
h('L4. NULL e logica de tres valores')
pg = PGServer('l04'); P = pg.conn(); versions(P)
h('SQLite'); go(sqlite_mem())
h('PostgreSQL'); go(P)
pg.close()
