# -*- coding: utf-8 -*-
# L9: modelagem dimensional (estrela), ROLLUP/CUBE, medidas aditivas, semiaditivas e nao aditivas, e funcoes de janela. Dados didaticos.
from common import *
def go(D):
    D.run("CREATE TABLE dim_tempo (tempo_id INTEGER PRIMARY KEY, ano INTEGER, trimestre INTEGER, mes INTEGER)", show=False)
    D.run("CREATE TABLE dim_produto (produto_id INTEGER PRIMARY KEY, produto TEXT, categoria TEXT)", show=False)
    D.run("CREATE TABLE dim_loja (loja_id INTEGER PRIMARY KEY, loja TEXT, uf TEXT)", show=False)
    D.run("CREATE TABLE fato_venda (tempo_id INTEGER REFERENCES dim_tempo, produto_id INTEGER REFERENCES dim_produto, loja_id INTEGER REFERENCES dim_loja, qtd INTEGER, receita NUMERIC, custo NUMERIC)", show=False)
    D.ins('dim_tempo', [(1,2025,1,1),(2,2025,1,2),(3,2025,2,4),(4,2025,2,5)])
    D.ins('dim_produto', [(1,'Caneta','Papelaria'),(2,'Caderno','Papelaria'),(3,'Mouse','Informatica')])
    D.ins('dim_loja', [(1,'Centro','GO'),(2,'Shopping','GO'),(3,'Plano','DF')])
    D.ins('fato_venda', [(1,1,1,10,100,60),(1,2,1,5,150,90),(1,3,2,2,120,80),(2,1,3,20,200,120),(2,3,1,4,240,160),(3,2,2,8,240,144),(3,3,3,3,180,120),(4,1,2,15,150,90),(4,2,3,6,180,108)])
    print('Esquema estrela: a tabela fato (medidas) no centro e tres dimensoes (tempo, produto, loja). Dados didaticos.')
    D.run("SELECT COUNT(*) AS linhas_da_fato FROM fato_venda")
    sub('Consulta tipica de BI: junta a fato com as dimensoes e agrega')
    D.run("""SELECT t.trimestre, p.categoria, SUM(f.receita) AS receita, SUM(f.qtd) AS qtd
FROM fato_venda f JOIN dim_tempo t ON t.tempo_id = f.tempo_id JOIN dim_produto p ON p.produto_id = f.produto_id
GROUP BY t.trimestre, p.categoria ORDER BY 1, 2""")
    sub('Drill-up com ROLLUP: subtotais por UF e total geral (PostgreSQL); no SQLite use UNION ALL')
    if D.kind == 'PostgreSQL':
        D.run("""SELECT l.uf, p.categoria, SUM(f.receita) AS receita
FROM fato_venda f JOIN dim_loja l ON l.loja_id = f.loja_id JOIN dim_produto p ON p.produto_id = f.produto_id
GROUP BY ROLLUP (l.uf, p.categoria) ORDER BY l.uf NULLS LAST, p.categoria NULLS LAST""")
        sub('CUBE: todas as combinacoes de agrupamento (PostgreSQL); GROUPING() distingue NULL de subtotal')
        D.run("""SELECT COALESCE(l.uf, 'TOTAL') AS uf, COALESCE(p.categoria, 'TOTAL') AS categoria, SUM(f.receita) AS receita, GROUPING(l.uf, p.categoria) AS nivel
FROM fato_venda f JOIN dim_loja l ON l.loja_id = f.loja_id JOIN dim_produto p ON p.produto_id = f.produto_id
GROUP BY CUBE (l.uf, p.categoria) ORDER BY nivel, 1, 2""")
    else:
        print("[SQLite 3.46 nao implementa ROLLUP nem CUBE:]")
        D.run("SELECT l.uf, p.categoria, SUM(f.receita) FROM fato_venda f JOIN dim_loja l ON l.loja_id = f.loja_id JOIN dim_produto p ON p.produto_id = f.produto_id GROUP BY ROLLUP (l.uf, p.categoria)")
        D.run("""SELECT l.uf, p.categoria, SUM(f.receita) AS receita FROM fato_venda f JOIN dim_loja l ON l.loja_id = f.loja_id JOIN dim_produto p ON p.produto_id = f.produto_id GROUP BY l.uf, p.categoria
UNION ALL SELECT l.uf, NULL, SUM(f.receita) FROM fato_venda f JOIN dim_loja l ON l.loja_id = f.loja_id GROUP BY l.uf
UNION ALL SELECT NULL, NULL, SUM(f.receita) FROM fato_venda f ORDER BY 1, 2""")
    sub('Medidas: aditiva (receita), nao aditiva (margem %) e semiaditiva (saldo)')
    D.run("""SELECT SUM(receita) AS receita_total_correta,
 SUM((receita - custo) * 100.0 / receita) AS soma_de_margens_ERRADA,
 (SUM(receita) - SUM(custo)) * 100.0 / SUM(receita) AS margem_total_correta
FROM fato_venda""")
    print('Nao aditiva: percentuais e razoes nao se somam; some os componentes e divida no final.')
    D.run("CREATE TABLE fato_saldo (mes INTEGER, conta INTEGER, saldo NUMERIC)", show=False)
    D.ins('fato_saldo', [(1,1,100),(1,2,200),(2,1,150),(2,2,200),(3,1,120),(3,2,300)])
    print('Semiaditiva: o saldo SOMA entre contas num mesmo mes, mas NAO entre meses:')
    D.run("SELECT mes, SUM(saldo) AS saldo_do_mes FROM fato_saldo GROUP BY mes ORDER BY mes")
    D.run("SELECT conta, SUM(saldo) AS soma_entre_meses_ERRADA, AVG(saldo) AS media, (SELECT saldo FROM fato_saldo s2 WHERE s2.conta = s.conta AND s2.mes = 3) AS ultimo_saldo FROM fato_saldo s GROUP BY conta ORDER BY conta")
    sub('Funcoes de janela (SQL:2003): RANK, LAG, soma acumulada e media movel')
    D.run("""SELECT mes, SUM(saldo) AS total,
 LAG(SUM(saldo)) OVER (ORDER BY mes) AS mes_anterior,
 SUM(SUM(saldo)) OVER (ORDER BY mes) AS acumulado
FROM fato_saldo GROUP BY mes ORDER BY mes""")
    D.run("""SELECT p.categoria, p.produto, SUM(f.receita) AS receita,
 RANK() OVER (PARTITION BY p.categoria ORDER BY SUM(f.receita) DESC) AS posicao,
 ROUND(100.0 * SUM(f.receita) / SUM(SUM(f.receita)) OVER (PARTITION BY p.categoria), 1) AS pct_da_categoria
FROM fato_venda f JOIN dim_produto p ON p.produto_id = f.produto_id GROUP BY p.categoria, p.produto ORDER BY 1, 4""")
    D.run("""SELECT t.mes, SUM(f.receita) AS receita, ROUND(AVG(SUM(f.receita)) OVER (ORDER BY t.mes ROWS BETWEEN 1 PRECEDING AND CURRENT ROW), 1) AS media_movel_2
FROM fato_venda f JOIN dim_tempo t ON t.tempo_id = f.tempo_id GROUP BY t.mes ORDER BY t.mes""")
    sub('Estrela x floco de neve (TRT-22 Q27 e TJ-RJ Q39): a mesma pergunta, dimensao desnormalizada x normalizada')
    D.run("CREATE TABLE sn_categoria (categoria_id INTEGER PRIMARY KEY, categoria TEXT)", show=False)
    D.run("CREATE TABLE sn_produto (produto_id INTEGER PRIMARY KEY, produto TEXT, categoria_id INTEGER REFERENCES sn_categoria)", show=False)
    D.ins('sn_categoria', [(1,'Papelaria'),(2,'Informatica')])
    D.ins('sn_produto', [(1,'Caneta',1),(2,'Caderno',1),(3,'Mouse',2)])
    print('Estrela: dim_produto ja traz a categoria (1 juncao entre a fato e a dimensao, texto repetido):')
    D.run("SELECT p.categoria, SUM(f.receita) AS receita FROM fato_venda f JOIN dim_produto p ON p.produto_id = f.produto_id GROUP BY p.categoria ORDER BY 1")
    print('Floco de neve: a categoria foi normalizada em outra tabela (2 juncoes para a mesma resposta, sem repetir o texto):')
    D.run("SELECT c.categoria, SUM(f.receita) AS receita FROM fato_venda f JOIN sn_produto p ON p.produto_id = f.produto_id JOIN sn_categoria c ON c.categoria_id = p.categoria_id GROUP BY c.categoria ORDER BY 1")
    sub('Dimensao com historico (SCD tipo 2): nova linha a cada mudanca, com validade')
    D.run("CREATE TABLE dim_cliente (sk INTEGER PRIMARY KEY, cliente_id INTEGER, cidade TEXT, inicio TEXT, fim TEXT, atual INTEGER)", show=False)
    D.ins('dim_cliente', [(1,10,'Goiania','2020-01-01','2024-06-30',0),(2,10,'Brasilia','2024-07-01','9999-12-31',1)])
    D.run("SELECT * FROM dim_cliente ORDER BY sk")
    print('Uma venda de 2023 deve apontar para a chave substituta 1 (Goiania), a de 2025 para a 2 (Brasilia): o fato guarda a chave substituta, nao a chave de negocio.')
h('L9. Modelagem dimensional, OLAP e funcoes de janela'); pg = PGServer('l09'); P = pg.conn(); versions(P)
h('SQLite'); go(sqlite_mem())
h('PostgreSQL'); go(P)
pg.close()
