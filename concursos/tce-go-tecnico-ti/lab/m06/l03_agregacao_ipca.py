# -*- coding: utf-8 -*-
# L3: agregacao, subconsultas correlacionadas e as questoes STN/FGV 2024 (Q56 a Q59) sobre a tabela IPCA.
# A tabela IPCA da prova e uma figura; aqui usamos DADOS DIDATICOS (numeros inventados) com a mesma estrutura ano, mes, indice. Valores em quartos (0,25) para que a subtracao em ponto flutuante do SQLite seja exata.
from common import *
from collections import defaultdict

IDX = {2022: [0.50,0.25,0.75,1.00,0.75,0.50,0.50,0.25,0.75,0.75,1.25,1.25],
       2023: [1.00,1.00,0.75,0.50,0.75,0.75,0.50,0.50,0.25,0.50,0.75,0.50]}
ROWS = [(a, m + 1, v) for a, vs in IDX.items() for m, v in enumerate(vs)]
DELET = {(2022, 3), (2022, 4), (2022, 9), (2022, 12)}   # linhas "perdidas" para a Q59

def esperado():
    pos = {(a, m): v for a, m, v in ROWS}
    saltos = []
    for (a, m), v in pos.items():
        prev = (a, m - 1) if m > 1 else (a - 1, 12)
        if prev in pos: saltos.append((a, m, v - pos[prev]))
    mx = max(s for _, _, s in saltos)
    q56 = sorted((a, m, s) for a, m, s in saltos if s == mx)
    q57 = []
    for a in IDX:
        top = max(v for aa, m, v in ROWS if aa == a)
        q57 += [(a, m) for aa, m, v in ROWS if aa == a and v == top]
    return q56, sorted(q57)

def go(D):
    D.run("CREATE TABLE ipca (ano INTEGER NOT NULL, mes INTEGER NOT NULL, indice NUMERIC)", show=False)
    D.ins('ipca', ROWS)
    print('Tabela IPCA didatica (indice = variacao mensal em %%, valores inventados): %d linhas (2 anos x 12 meses). Primeiras linhas:' % len(ROWS))
    D.run("SELECT * FROM ipca ORDER BY ano, mes LIMIT 5")
    q56, q57 = esperado()
    print('\nResultado esperado, calculado em Python (nao em SQL): Q56 = %s ; Q57 = %s' % (q56, q57))

    sub('STN 2024 Q56 (gabarito B): view v1 e o maior salto positivo, admitindo empates')
    D.run("""create view v1 as
select ano, mes, salto from (
select y.ano, y.mes, y.indice anterior,
x.indice novo, y.indice - x.indice salto
from ipca x, ipca y
where
((x.ano = y.ano and y.mes = x.mes + 1)
Or
(y.ano = x.ano + 1 and y.mes = 1 and x.mes = 12))
) x""")
    D.run("SELECT count(*) AS linhas_da_view FROM v1")
    alts = {'A': "select * from v1 where salto = max(salto)",
            'B': "select ano, mes, salto from v1 where salto = (select max(salto) from v1)",
            'C': "select ano, mes, salto from v1",
            'D': "select ano, mes, salto from v1 where salto = max(v1.salto)",
            'E': "select ano, mes, salto from v1 where salto > 0"}
    for k, q in alts.items():
        print('\n[alternativa %s]' % k)
        r = D.run(q + ' ORDER BY ano, mes' if k in 'BCE' else q, show=(k in 'ABD'))
        if k in 'CE': print('devolveu %d linhas (a pergunta pede apenas o maior salto)' % len(r))
        if k == 'B': print('confere com o esperado: %s' % ([(int(t[0]), int(t[1]), float(t[2])) for t in r] == q56))

    sub('STN 2024 Q57 (gabarito B): para cada ano, o mes (ou meses) de maior indice')
    alts = {'A': "select * from ipca where exists (select mes, ano from ipca x where x.ano = ipca.ano and x.indice > ipca.indice group by ano) order by ano, mes",
            'B': "select ano, mes from ipca where not exists (select mes, ano from ipca x where x.ano = ipca.ano and x.indice > ipca.indice) order by ano, mes",
            'C': "select ano, mes from ipca where not exists (select mes, ano from ipca x where x.ano >= ipca.ano and x.indice < ipca.indice) order by ano, mes",
            'D': "select ano, mes from ipca where exists (select * from ipca x where x.ano = ipca.ano and x.indice = ipca.indice group by mes) order by ano, mes",
            'E': "select ano, mes from ipca where exists (select mes, ano from ipca x where x.ano = ipca.ano or x.indice > ipca.indice)"}
    print('(A prova usa "order by ano, mês" com acento; aqui escrevemos "mes", sem acento, como na tabela do laboratorio.)')
    for k, q in alts.items():
        r = D.run(q, show=False)
        if isinstance(r, str): print('[alternativa %s] %s' % (k, r)); continue
        got = sorted((int(t[0]), int(t[1])) for t in r)
        print('[alternativa %s] %d linhas; confere com o esperado: %s' % (k, len(r), got == q57))
    print(); D.run(alts['B'])

    sub('STN 2024 Q58 (gabarito C): indice acumulado por ano; o que entra no lugar das reticencias')
    corpo = ("select Y.ano, (1+ m1.indice/100) * (1+ m2.indice/100) * (1+ m3.indice/100) * (1+ m4.indice/100) * (1+ m5.indice/100) * (1+ m6.indice/100) * "
             "(1+ m7.indice/100) * (1+ m8.indice/100) * (1+ m9.indice/100) * (1+ m10.indice/100) * (1+ m11.indice/100) * (1+ m12.indice/100) as indice "
             "from IPCA m1, IPCA m2, IPCA m3, IPCA m4, IPCA m5, IPCA m6, IPCA m7, IPCA m8, IPCA m9, IPCA m10, IPCA m11, IPCA m12, %s Y "
             "where m12.mes =12 and m11.mes=11 and m10.mes=10 and m9.mes =9 and m8.mes =8 and m7.mes=7 and m6.mes =6 and m5.mes =5 and m4.mes=4 and m3.mes =3 and m2.mes =2 and m1.mes=1 "
             "and m12.ano = m11.ano and m11.ano = m10.ano and m10.ano = m9.ano and m9.ano = m8.ano and m8.ano = m7.ano and m7.ano = m6.ano and m6.ano = m5.ano "
             "and m5.ano = m4.ano and m4.ano = m3.ano and m3.ano = m2.ano and m2.ano = m1.ano and m1.ano = Y.ano order by 1")
    alts = {'A': '(select ano - 2021 as ano from IPCA)', 'B': '(select ano from IPCA)', 'C': '(select distinct ano from IPCA)',
            'D': '(select distinct ano, mes from IPCA)', 'E': 'select distinct ano from IPCA'}
    for k, t in alts.items():
        r = D.run(corpo % t, show=False)
        print('[alternativa %s] %s' % (k, r if isinstance(r, str) else '%d linhas devolvidas' % len(r)))
    print('\n[alternativa C, resultado, arredondado a 4 casas para caber na tela]'); D.run('select ano, round(cast(indice as numeric), 4) as indice from (%s) t order by 1' % (corpo % alts['C']).replace(' order by 1', ''))
    print('Atencao: SQLite e PostgreSQL devolvem numeros diferentes para este mesmo SQL (compare 2022 e 2023 nos dois blocos). Motivo no SQLite: a coluna NUMERIC guarda 1.0 como inteiro 1, e inteiro / inteiro e divisao inteira. No PostgreSQL, NUMERIC preserva as casas decimais. Em ambos, inteiro / inteiro tambem e divisao inteira:')
    D.run("SELECT 1/100 AS inteiro_por_inteiro, 1/100.0 AS inteiro_por_decimal")
    print('Em producao, force o tipo decimal (cast ou 100.0) para nao depender do dialeto.')
    print('(O resultado de cada ano e o produto dos 12 fatores (1 + i/100); sem o DISTINCT, o mesmo produto se repete em 12 linhas por ano.)')

    sub('STN 2024 Q59 (gabarito C): recompor meses apagados com indice NULL')
    D.run("DROP VIEW v1", show=False)
    pr = ["insert into IPCA(indice, ano, mes) select NULL, a.ano, a.mes from (select distinct ano, mes from IPCA) a where not exists (select * from IPCA x where x.ano = a.ano and x.mes = a.mes)",
          "insert into IPCA(indice, ano, mes) select NULL, a.ano, b.mes from (select distinct ano from IPCA) a, (select distinct mes from IPCA) b where not exists (select * from IPCA x where x.ano = a.ano and x.mes = b.mes)",
          "insert into IPCA(indice, ano, mes) select NULL, a.ano, a.mes from IPCA a where a.ano * 100 + a.mes not in (select x.mes + x.ano * 100 from IPCA x)"]
    for nome, sql in zip(['I', 'II', 'III'], pr):
        D.run("DELETE FROM ipca", show=False)
        D.ins('ipca', [r for r in ROWS if (r[0], r[1]) not in DELET])
        antes = D.run("SELECT count(*) FROM ipca", show=False)[0][0]
        r = D.run(sql, show=False)
        depois = D.run("SELECT count(*) FROM ipca", show=False)[0][0]
        nulos = D.run("SELECT count(*) FROM ipca WHERE indice IS NULL", show=False)[0][0]
        print('[versao %s] linhas antes: %s ; depois: %s ; linhas com indice NULL: %s ; tabela completa (24 linhas): %s' % (nome, antes, depois, nulos, depois == 24))
    print('Leitura: so a versao II recompoe os 4 meses apagados de 2022. A I e a III procuram, na propria tabela, linhas que nao existem na propria tabela: nao inserem nada.')

    sub('Nao veio da prova: GROUP BY, HAVING e funcoes de agregacao com NULL')
    D.run("CREATE TABLE produto (id INTEGER, item TEXT, tipo TEXT, custo NUMERIC)", show=False)
    D.ins('produto', [(1,'Caneta','papelaria',3),(2,'Lapis','papelaria',1),(3,'Mouse','info',40),(4,'Teclado','info',90),(5,'Cabo','info',None),(6,'Cola','papelaria',5)])
    print('TRT-1 2014 Tecnico Q45 (gabarito D): custo medio por tipo de produto')
    D.run("SELECT Tipo, AVG(Custo) FROM Produto GROUP BY Tipo ORDER BY Tipo")
    print('alternativa A (ORDER BY Tipo, sem GROUP BY):'); D.run("SELECT Tipo, AVG(Custo) FROM Produto ORDER BY Tipo")
    print('alternativa B (HAVING sem GROUP BY):'); D.run("SELECT Tipo, AVG(Custo) FROM Produto HAVING Tipo LIKE ' '")
    print('alternativa C:'); D.run("SELECT Tipo, AVG(Custo) FROM Produto WHERE Tipo IN GROUP")
    print('alternativa E:'); D.run("SELECT Tipo, AVG(Custo) FROM Produto WHERE ALL Tipo (Item)")
    print('\nCOUNT(*) conta linhas; COUNT(custo) ignora NULL; AVG ignora NULL (media de 40 e 90 = 65, e nao de 3 valores):')
    D.run("SELECT tipo, COUNT(*) AS linhas, COUNT(custo) AS com_custo, AVG(custo) AS media, SUM(custo) AS soma FROM produto GROUP BY tipo ORDER BY tipo")
    print('HAVING filtra grupos depois de agrupar; WHERE filtra linhas antes:')
    D.run("SELECT tipo, COUNT(*) AS n FROM produto WHERE custo IS NOT NULL GROUP BY tipo HAVING COUNT(*) >= 3 ORDER BY tipo")

h('L3. Agregacao e as questoes da STN 2024 (FGV)')
pg = PGServer('l03'); P = pg.conn(); versions(P)
h('SQLite'); go(sqlite_mem())
h('PostgreSQL'); go(P)
pg.close()
