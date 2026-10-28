# -*- coding: utf-8 -*-
# L5: normalizacao na pratica. Verifica dependencias funcionais com SQL, mostra anomalias, decompoe em 1FN, 2FN e 3FN e confere a juncao sem perdas.
# Tambem calcula fecho de atributos e chaves candidatas em Python (nao e SQL) para a Q60 da STN 2024.
from common import *
from itertools import combinations

def fecho(attrs, fds):
    r = set(attrs)
    ch = True
    while ch:
        ch = False
        for l, d in fds:
            if set(l) <= r and not set(d) <= r:
                r |= set(d); ch = True
    return r

def chaves(U, fds):
    out = []
    for n in range(1, len(U) + 1):
        for c in combinations(sorted(U), n):
            if fecho(c, fds) >= set(U) and not any(set(k) <= set(c) for k in out): out.append(c)
    return out

def go(D):
    sub('Tabela nao normalizada: um pedido com varios itens numa unica coluna (viola a 1FN)')
    D.run("CREATE TABLE pedido0 (pedido INTEGER, cliente TEXT, cidade TEXT, uf TEXT, itens TEXT)", show=False)
    D.ins('pedido0', [(1,'Ana','Goiania','GO','caneta,lapis'),(2,'Bia','Anapolis','GO','caneta')])
    D.run("SELECT * FROM pedido0 ORDER BY 1")
    print('Buscar quem comprou "lapis" exige LIKE em texto: a coluna itens nao e atomica.')
    sub('1FN: valores atomicos, uma linha por (pedido, produto)')
    D.run("CREATE TABLE pedido1 (pedido INTEGER, produto TEXT, preco NUMERIC, qtd INTEGER, cliente TEXT, cidade TEXT, uf TEXT, PRIMARY KEY (pedido, produto))", show=False)
    D.ins('pedido1', [(1,'caneta',3,10,'Ana','Goiania','GO'),(1,'lapis',1,20,'Ana','Goiania','GO'),(2,'caneta',3,5,'Bia','Anapolis','GO'),(3,'caneta',3,7,'Caio','Goiania','GO')])
    D.run("SELECT * FROM pedido1 ORDER BY 1, 2")
    print('Chave: (pedido, produto). Dependencias: pedido -> cliente, cidade, uf (parcial); produto -> preco (parcial); cidade -> uf (transitiva).')
    sub('Teste de dependencia funcional com SQL: X -> Y vale se nao existe X com mais de um Y')
    for x, y in [('pedido', 'cliente'), ('produto', 'preco'), ('cidade', 'uf'), ('uf', 'cidade'), ('cliente', 'cidade')]:
        r = D.run("SELECT COUNT(*) FROM (SELECT %s FROM pedido1 GROUP BY %s HAVING COUNT(DISTINCT %s) > 1) t" % (x, x, y), show=False)[0][0]
        print('%s -> %s : %s (violacoes: %s)' % (x, y, 'VALE nos dados' if r == 0 else 'NAO vale', r))
    print('(Atencao: o teste so refuta; a dependencia funcional e uma regra do negocio, nao um fato dos dados.)')
    sub('Anomalia de atualizacao: mudar a cidade do cliente Ana em apenas uma das linhas')
    D.run("UPDATE pedido1 SET cidade = 'Aparecida' WHERE pedido = 1 AND produto = 'caneta'")
    D.run("SELECT pedido, produto, cliente, cidade FROM pedido1 WHERE cliente = 'Ana' ORDER BY 2")
    print('A mesma cliente aparece com duas cidades: inconsistencia.')
    D.run("UPDATE pedido1 SET cidade = 'Goiania' WHERE pedido = 1", show=False)
    sub('2FN: elimina dependencia parcial (atributos que dependem so de parte da chave)')
    D.run("CREATE TABLE produto (produto TEXT PRIMARY KEY, preco NUMERIC)", show=False)
    D.run("CREATE TABLE pedido2 (pedido INTEGER PRIMARY KEY, cliente TEXT, cidade TEXT, uf TEXT)", show=False)
    D.run("CREATE TABLE item (pedido INTEGER REFERENCES pedido2(pedido), produto TEXT REFERENCES produto(produto), qtd INTEGER, PRIMARY KEY (pedido, produto))", show=False)
    D.run("INSERT INTO produto SELECT DISTINCT produto, preco FROM pedido1", show=False)
    D.run("INSERT INTO pedido2 SELECT DISTINCT pedido, cliente, cidade, uf FROM pedido1", show=False)
    D.run("INSERT INTO item SELECT pedido, produto, qtd FROM pedido1", show=False)
    D.run("SELECT * FROM pedido2 ORDER BY 1")
    sub('3FN: elimina dependencia transitiva (cidade -> uf, e pedido -> cidade)')
    D.run("CREATE TABLE cidade (cidade TEXT PRIMARY KEY, uf TEXT)", show=False)
    D.run("INSERT INTO cidade SELECT DISTINCT cidade, uf FROM pedido2", show=False)
    D.run("CREATE TABLE pedido3 AS SELECT pedido, cliente, cidade FROM pedido2", show=False)
    D.run("SELECT * FROM cidade ORDER BY 1")
    D.run("SELECT * FROM pedido3 ORDER BY 1")
    sub('Decomposicao sem perdas: a juncao das tabelas normalizadas reconstroi a tabela original')
    D.run("""SELECT COUNT(*) AS linhas_da_juncao FROM (
SELECT p.pedido, i.produto, pr.preco, i.qtd, p.cliente, p.cidade, c.uf
FROM pedido3 p JOIN item i ON i.pedido = p.pedido JOIN produto pr ON pr.produto = i.produto JOIN cidade c ON c.cidade = p.cidade) t""")
    D.run("""WITH j AS (SELECT p.pedido, i.produto, pr.preco, i.qtd, p.cliente, p.cidade, c.uf
  FROM pedido3 p JOIN item i ON i.pedido = p.pedido JOIN produto pr ON pr.produto = i.produto JOIN cidade c ON c.cidade = p.cidade),
o AS (SELECT pedido, produto, preco, qtd, cliente, cidade, uf FROM pedido1)
SELECT (SELECT COUNT(*) FROM (SELECT * FROM j EXCEPT SELECT * FROM o) x) + (SELECT COUNT(*) FROM (SELECT * FROM o EXCEPT SELECT * FROM j) y) AS linhas_diferentes""")
    print('Zero diferencas: a decomposicao e sem perda (e preserva as dependencias).')
    sub('Mudar a cidade da Ana agora e um UPDATE de uma unica linha')
    D.run("UPDATE pedido3 SET cidade = 'Anapolis' WHERE cliente = 'Ana'")
    sub('Desnormalizacao consciente: uma view/consulta pronta para leitura (trade-off: redundancia por desempenho)')
    D.run("CREATE VIEW vw_pedidos AS SELECT p.pedido, p.cliente, p.cidade, c.uf, i.produto, i.qtd, pr.preco, i.qtd * pr.preco AS total FROM pedido3 p JOIN cidade c ON c.cidade = p.cidade JOIN item i ON i.pedido = p.pedido JOIN produto pr ON pr.produto = i.produto", show=False)
    D.run("SELECT * FROM vw_pedidos ORDER BY pedido, produto")

h('L5. Normalizacao na pratica'); pg = PGServer('l05'); P = pg.conn(); versions(P)
h('SQLite'); go(sqlite_mem())
h('PostgreSQL'); go(P)
pg.close()

h('Python (nao e SQL): fecho de atributos e chaves candidatas, para a STN 2024 Q60')
FDS = [('A','B'),('B','A'),('A','C'),('B','D'),('B','E'),('D','B')]
U = 'ABCDE'
print('Esquema T(A,B,C,D,E). Dependencias lidas do enunciado: ' + ', '.join('%s->%s' % f for f in FDS))
print('Declaracao SQL: A, B, C e D sao UNIQUE NOT NULL; E nao.')
for x in ['A', 'B', 'C', 'D', 'E']:
    print('fecho(%s) = {%s}' % (x, ','.join(sorted(fecho(x, FDS)))))
print('Chaves candidatas com as dependencias dadas: ' + ', '.join('{' + ','.join(k) + '}' for k in chaves(U, FDS)))
DECL = [('A',), ('B',), ('C',), ('D',)]
print('Chaves declaradas no CREATE TABLE (UNIQUE NOT NULL): ' + ', '.join('{' + ','.join(k) + '}' for k in DECL))
print('Em BCNF, todo determinante e superchave. O esquema so e coerente se as dependencias levarem exatamente as chaves declaradas e nenhuma outra (E nao e UNIQUE).')
for nome, extra in [('A) A,B,C,D -> E', [('ABCD','E')]), ('B) C -> D', [('C','D')]), ('C) C -> E', [('C','E')]), ('D) E -> A', [('E','A')]), ('E) E -> A,B,C,D', [('E','ABCD')])]:
    F2 = FDS + extra
    ks = chaves(U, F2)
    det = {l for l, _ in F2}
    ruins = [l for l in sorted(det) if fecho(l, F2) < set(U)]
    print('%s: chaves = %s ; determinantes que nao sao superchave: %s ; chaves == declaradas: %s' % (nome, ', '.join('{' + ','.join(k) + '}' for k in ks), ruins or 'nenhum', ks == DECL))
print('Somente a alternativa B (C -> D) faz de C uma chave, como o UNIQUE de C declara, sem criar chave nova (como E) nem deixar determinante fora da chave (como C -> E).')
