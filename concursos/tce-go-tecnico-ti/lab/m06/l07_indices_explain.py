# -*- coding: utf-8 -*-
# L7: indices, B-tree e planos de execucao. EXPLAIN QUERY PLAN no SQLite e EXPLAIN (ANALYZE) no PostgreSQL, com dados gerados (didaticos).
from common import *
import random
def plano(D, q):
    if D.kind == 'SQLite':
        rows = D.run('EXPLAIN QUERY PLAN ' + q, show=False)
        print('sq> EXPLAIN QUERY PLAN ' + q)
        for r in rows: print('   ' + r[3])
    else:
        rows = D.run('EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF, SUMMARY OFF, BUFFERS OFF) ' + q, show=False)
        print('pg> EXPLAIN (ANALYZE, COSTS OFF, TIMING OFF, SUMMARY OFF) ' + q)
        for r in rows: print('   ' + r[0])

def go(D, N):
    random.seed(7)
    D.run("CREATE TABLE pessoa (id INTEGER PRIMARY KEY, cpf TEXT, nome TEXT, cidade TEXT, nascimento INTEGER, ativo INTEGER)", show=False)
    cid = ['Goiania','Anapolis','Aparecida','Rio Verde','Catalao']
    rows = ["(%d,'%011d','pessoa%d','%s',%d,%d)" % (i, i * 7919 % 99999999999, i, cid[i % 5], 1950 + i % 60, 1 if i % 100 == 0 else 0) for i in range(1, N + 1)]
    for k in range(0, N, 5000):
        D.run("INSERT INTO pessoa VALUES " + ','.join(rows[k:k + 5000]), show=False)
    if D.kind == 'PostgreSQL': D.run("ANALYZE pessoa", show=False)
    print('Tabela pessoa com %d linhas geradas (dados didaticos). Coluna ativo = 1 em 1%% das linhas.' % N)
    D.run("SELECT COUNT(*) AS linhas FROM pessoa")
    q1 = "SELECT * FROM pessoa WHERE cpf = '00000007919'"
    sub('1. Busca por igualdade SEM indice: varredura da tabela inteira')
    plano(D, q1)
    sub('2. Cria indice B-tree em cpf e repete')
    D.run("CREATE INDEX idx_pessoa_cpf ON pessoa (cpf)")
    if D.kind == 'PostgreSQL': D.run("ANALYZE pessoa", show=False)
    plano(D, q1)
    sub('3. Indice UNIQUE faz o papel de restricao e de indice ao mesmo tempo')
    D.run("CREATE UNIQUE INDEX uq_pessoa_nome ON pessoa (nome)")
    D.run("INSERT INTO pessoa VALUES (%d,'x','pessoa1','Goiania',1990,0)" % (N + 1))
    sub('4. Indice composto: vale o prefixo mais a esquerda')
    D.run("CREATE INDEX idx_cid_nasc ON pessoa (cidade, nascimento)")
    if D.kind == 'PostgreSQL': D.run("ANALYZE pessoa", show=False)
    print('[usa as duas colunas]'); plano(D, "SELECT id FROM pessoa WHERE cidade = 'Goiania' AND nascimento = 1990")
    print('[usa so o prefixo cidade]'); plano(D, "SELECT id FROM pessoa WHERE cidade = 'Goiania' AND ativo = 1")
    print('[so a segunda coluna: nao e o prefixo mais a esquerda]'); plano(D, "SELECT id FROM pessoa WHERE nascimento = 1990")
    print('Leitura: o SQLite varre o indice inteiro (SCAN ... COVERING INDEX); o PostgreSQL 18 faz varias buscas no indice, uma por valor distinto de cidade (skip scan, novo na versao 18; veja Index Searches). Nos dois casos a coluna lider continua sendo a mais importante.')
    sub('5. Funcao sobre a coluna impede o uso do indice (nao "sargable")')
    plano(D, "SELECT * FROM pessoa WHERE substr(cpf, 1, 5) = '00000'")
    plano(D, "SELECT * FROM pessoa WHERE cpf >= '00000' AND cpf < '00001'")
    sub('6. Baixa seletividade: indice em coluna com poucos valores distintos')
    D.run("CREATE INDEX idx_ativo ON pessoa (ativo)")
    if D.kind == 'PostgreSQL': D.run("ANALYZE pessoa", show=False)
    print('[ativo = 1 (1% das linhas): raro, o indice compensa]'); plano(D, "SELECT * FROM pessoa WHERE ativo = 1")
    print('[ativo = 0 (99% das linhas): o otimizador prefere ler a tabela toda]'); plano(D, "SELECT * FROM pessoa WHERE ativo = 0")
    sub('7. Indice parcial (somente as linhas ativas) e indice de cobertura')
    if D.kind == 'PostgreSQL':
        D.run("CREATE INDEX idx_ativos_parcial ON pessoa (nome) WHERE ativo = 1")
        plano(D, "SELECT nome FROM pessoa WHERE ativo = 1 AND nome = 'pessoa100'")
        D.run("VACUUM (ANALYZE) pessoa", show=False)
        D.run("CREATE INDEX idx_cobre ON pessoa (cidade) INCLUDE (nome)")
        D.run("VACUUM (ANALYZE) pessoa", show=False)
        print('[Index Only Scan: a resposta sai do proprio indice]'); plano(D, "SELECT COUNT(nome) FROM pessoa WHERE cidade = 'Catalao'")
        D.run("SELECT indexname FROM pg_indexes WHERE tablename = 'pessoa' ORDER BY 1")
        D.run("SELECT pg_size_pretty(pg_relation_size('pessoa')) AS tabela, pg_size_pretty(pg_relation_size('idx_pessoa_cpf')) AS indice_cpf")
    else:
        D.run("CREATE INDEX idx_ativos_parcial ON pessoa (nome) WHERE ativo = 1")
        D.run("CREATE INDEX idx_cobre ON pessoa (cidade, nome)")
        print('[COVERING INDEX: a resposta sai do proprio indice]'); plano(D, "SELECT cidade, nome FROM pessoa WHERE cidade = 'Catalao'")
        D.run("SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'pessoa' ORDER BY 1")
    sub('8. Ordenacao: o indice evita o SORT')
    plano(D, "SELECT * FROM pessoa ORDER BY nome LIMIT 3")
    plano(D, "SELECT * FROM pessoa ORDER BY nascimento, nome LIMIT 3")
    sub('9. JOIN: a chave estrangeira sem indice obriga varredura')
    D.run("CREATE TABLE pedido (id INTEGER PRIMARY KEY, pessoa_id INTEGER, valor INTEGER)", show=False)
    D.run("INSERT INTO pedido SELECT i, (i * 37) %% %d + 1, i %% 500 FROM (SELECT id AS i FROM pessoa WHERE id <= 20000) t" % N, show=False)
    if D.kind == 'PostgreSQL': D.run("ANALYZE pedido", show=False)
    q = "SELECT p.nome, SUM(o.valor) FROM pessoa p JOIN pedido o ON o.pessoa_id = p.id WHERE p.cpf = '00000300922' GROUP BY p.nome"
    print('[sem indice em pedido.pessoa_id]'); plano(D, q)
    D.run("CREATE INDEX idx_pedido_pessoa ON pedido (pessoa_id)")
    if D.kind == 'PostgreSQL': D.run("ANALYZE pedido", show=False)
    print('[com indice em pedido.pessoa_id]'); plano(D, q)
    sub('10. Custo do indice: toda escrita atualiza tambem os indices')
    D.run("SELECT COUNT(*) AS indices_da_tabela_pessoa FROM %s WHERE %s" % (('pg_indexes', "tablename = 'pessoa'") if D.kind == 'PostgreSQL' else ('sqlite_master', "type = 'index' AND tbl_name = 'pessoa'")))

h('L7. Indices, B-tree e planos de execucao'); pg = PGServer('l07'); P = pg.conn(); versions(P)
h('SQLite'); go(sqlite_mem(), 50000)
h('PostgreSQL'); go(P, 200000)
pg.close()
