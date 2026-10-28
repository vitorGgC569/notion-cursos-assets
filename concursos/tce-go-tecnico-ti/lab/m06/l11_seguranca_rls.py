# -*- coding: utf-8 -*-
# L11: seguranca e governanca em PostgreSQL: papeis, privilegios minimos, GRANT por coluna, view de mascaramento, Row Level Security (RLS), SQL injection com parametros.
from common import *
pg = PGServer('l11'); P = pg.conn(); versions(P)
h('Papeis e privilegio minimo')
P.run("CREATE TABLE servidor (id INTEGER PRIMARY KEY, nome TEXT, cpf TEXT, salario NUMERIC, lotacao TEXT)", show=False)
P.run("INSERT INTO servidor VALUES (1,'Ana','111.111.111-11',9000,'TI'),(2,'Bia','222.222.222-22',7000,'RH'),(3,'Caio','333.333.333-33',8000,'TI')", show=False)
P.run("CREATE ROLE leitor LOGIN", show=False); P.run("CREATE ROLE gestor_ti LOGIN", show=False)
P.run("GRANT SELECT (id, nome, lotacao) ON servidor TO leitor")
def como(papel, sql, tag):
    P.run("SET ROLE " + papel, show=False)
    print('[como %s]' % papel); P.run(sql); P.run("RESET ROLE", show=False)
como('leitor', "SELECT id, nome, lotacao FROM servidor ORDER BY id", 1)
como('leitor', "SELECT cpf FROM servidor", 2)
como('leitor', "SELECT * FROM servidor", 3)
print('GRANT por coluna: o leitor enxerga nome e lotacao, nunca cpf nem salario. SELECT * tambem falha, porque inclui colunas sem permissao.')

h('Mascaramento com view (LGPD: minimizacao)')
P.run("CREATE VIEW servidor_mascarado AS SELECT id, nome, '***.***.***-' || RIGHT(cpf, 2) AS cpf, lotacao FROM servidor")
P.run("GRANT SELECT ON servidor_mascarado TO leitor")
como('leitor', "SELECT * FROM servidor_mascarado ORDER BY id", 4)

h('Row Level Security (RLS): cada gestor ve so a propria lotacao')
P.run("GRANT SELECT ON servidor TO gestor_ti")
P.run("ALTER TABLE servidor ENABLE ROW LEVEL SECURITY")
P.run("CREATE POLICY so_ti ON servidor FOR SELECT TO gestor_ti USING (lotacao = 'TI')")
como('gestor_ti', "SELECT id, nome, lotacao FROM servidor ORDER BY id", 5)
print('O dono da tabela (superusuario aqui) ignora a politica; um papel sem politica aplicavel ve zero linhas (negacao por padrao):')
P.run("GRANT SELECT ON servidor TO leitor"); como('leitor', "SELECT COUNT(*) AS linhas_visiveis FROM servidor", 6)
P.run("SELECT COUNT(*) AS linhas_do_dono FROM servidor")

h('Revogacao e consulta aos privilegios')
P.run("REVOKE ALL ON servidor FROM leitor")
P.run("SELECT has_table_privilege('leitor', 'servidor', 'SELECT') AS leitor_le_servidor, has_table_privilege('gestor_ti', 'servidor', 'SELECT') AS gestor_le_servidor")

h('SQL injection: concatenacao versus consulta parametrizada')
P.run("RESET ROLE", show=False)
entrada = "x' OR '1'='1"
cur = P.c.cursor()
q = "SELECT nome FROM servidor WHERE nome = '" + entrada + "'"
print('Entrada maliciosa: ' + entrada); print('Concatenada: ' + q)
print('  linhas devolvidas: %d (todas!)' % len(cur.execute(q).fetchall()))
print("Parametrizada: SELECT nome FROM servidor WHERE nome = %s")
print('  linhas devolvidas: %d' % len(cur.execute("SELECT nome FROM servidor WHERE nome = %s", (entrada,)).fetchall()))
print('O parametro e tratado como dado, nunca como parte do comando.')
pg.close()
