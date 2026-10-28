# -*- coding: utf-8 -*-
# L10: documentos (JSONB), chave-valor, wide-column simulado, grafo com CTE recursiva, busca vetorial (pgvector), backup logico (pg_dump/pg_restore) e replicacao fisica em streaming (pg_basebackup).
# MongoDB, Redis, Cassandra, Neo4j e Oracle NAO foram executados: nao ha servidor deles neste laboratorio.
from common import *
import subprocess, os, shutil, time, json, tempfile
T0 = time.time()
BIN = os.path.join(os.path.dirname(pixeltable_pgserver.__file__), 'pginstall18', 'bin') + '/'
def sh(cmd, quiet=True):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return r.returncode, (r.stdout + r.stderr).strip()
pg = PGServer('l10'); P = pg.conn(); versions(P)

h('NoSQL de documentos: JSONB no PostgreSQL (o modelo de documento do MongoDB, com SQL)')
P.run("CREATE TABLE doc (id SERIAL PRIMARY KEY, d JSONB)", show=False)
P.run("""INSERT INTO doc (d) VALUES
('{"nome":"Ana","tags":["ti","bd"],"endereco":{"cidade":"Goiania","uf":"GO"},"nota":8.5}'),
('{"nome":"Bia","tags":["rh"],"endereco":{"cidade":"Anapolis","uf":"GO"}}'),
('{"nome":"Caio","tags":["ti"],"nota":6,"extra":{"hobby":"xadrez"}}')""", show=False)
print('Esquema flexivel: cada documento tem campos diferentes (nota so existe em alguns, extra so em um).')
P.run("SELECT id, d->>'nome' AS nome, d->'endereco'->>'cidade' AS cidade, (d->>'nota')::numeric AS nota FROM doc ORDER BY id")
print('Consultas por conteudo: contem a tag ti; tem a chave nota:')
P.run("SELECT d->>'nome' AS nome FROM doc WHERE d @> '{\"tags\":[\"ti\"]}' ORDER BY id")
P.run("SELECT d->>'nome' AS nome FROM doc WHERE d ? 'nota' ORDER BY id")
P.run("CREATE INDEX idx_doc_gin ON doc USING GIN (d)")
P.run("SELECT jsonb_pretty(d) FROM doc WHERE id = 1")
print('Atualizacao parcial de um campo dentro do documento:'); P.run("UPDATE doc SET d = jsonb_set(d, '{endereco,cidade}', '\"Aparecida\"') WHERE id = 1")
P.run("SELECT d->'endereco' AS endereco FROM doc WHERE id = 1")

h('Chave-valor (modelo do Redis) com uma tabela, e expiracao (TTL)')
P.run("CREATE TABLE kv (k TEXT PRIMARY KEY, v TEXT, expira TIMESTAMPTZ)", show=False)
P.run("INSERT INTO kv VALUES ('sessao:42', 'ana', now() + interval '30 minutes'), ('sessao:43', 'bia', now() - interval '1 minute')", show=False)
P.run("SELECT v FROM kv WHERE k = 'sessao:42' AND expira > now()")
P.run("SELECT v FROM kv WHERE k = 'sessao:43' AND expira > now()")
print('Acesso por chave e O(1) em hash (Redis) ou O(log n) em B-tree (PostgreSQL). O Redis nao foi executado aqui.')

h('Familia de colunas (wide-column, modelo do Cassandra): linhas esparsas por particao, ordenadas por coluna de clusterizacao')
P.run("CREATE TABLE sensor (sensor_id INTEGER, ts INTEGER, temperatura NUMERIC, umidade NUMERIC, PRIMARY KEY (sensor_id, ts))", show=False)
P.run("INSERT INTO sensor VALUES (1,100,20.5,60),(1,101,21.0,NULL),(1,102,21.5,58),(2,100,30.0,NULL)", show=False)
P.run("SELECT * FROM sensor WHERE sensor_id = 1 ORDER BY ts DESC")
print('Consulta por particao (sensor_id) e intervalo na clusterizacao (ts) e o padrao de acesso do wide-column; o Cassandra nao foi executado aqui.')

h('Grafos: relacionamentos como cidadao de primeira classe (CTE recursiva no lugar do Cypher)')
P.run("CREATE TABLE segue (de TEXT, para TEXT)", show=False)
P.run("INSERT INTO segue VALUES ('ana','bia'),('bia','caio'),('caio','dora'),('ana','eva'),('eva','dora')", show=False)
P.run("""WITH RECURSIVE alcance(pessoa, saltos) AS (
  SELECT para, 1 FROM segue WHERE de = 'ana'
  UNION
  SELECT s.para, a.saltos + 1 FROM alcance a JOIN segue s ON s.de = a.pessoa WHERE a.saltos < 3
)
SELECT pessoa, MIN(saltos) AS saltos FROM alcance GROUP BY pessoa ORDER BY saltos, pessoa""")
print('Em um banco de grafos (Neo4j) isso seria MATCH (a {nome:"ana"})-[:SEGUE*1..3]->(p) RETURN p. Nao testado aqui.')

h('Banco de dados vetorial: extensao pgvector no PostgreSQL (embeddings)')
r = P.run("CREATE EXTENSION IF NOT EXISTS vector")
if not isinstance(r, str):
    P.run("SELECT extversion AS versao_pgvector FROM pg_extension WHERE extname = 'vector'")
    P.run("CREATE TABLE trecho (id SERIAL PRIMARY KEY, texto TEXT, emb vector(3))", show=False)
    print('Embeddings de 3 dimensoes inventados para o exemplo (modelos reais usam centenas ou milhares de dimensoes):')
    P.run("""INSERT INTO trecho (texto, emb) VALUES
('gato e cachorro', '[0.9, 0.1, 0.0]'), ('felino domestico', '[0.85, 0.15, 0.05]'), ('contas a pagar', '[0.0, 0.2, 0.95]'), ('fatura do cartao', '[0.05, 0.25, 0.9]')""", show=False)
    print('Consulta: o vetor [0.88, 0.12, 0.02] (algo como "animal"). <=> e distancia de cosseno, <-> e distancia euclidiana:')
    P.run("SELECT texto, ROUND((emb <=> '[0.88,0.12,0.02]')::numeric, 4) AS dist_cosseno, ROUND((emb <-> '[0.88,0.12,0.02]')::numeric, 4) AS dist_euclid FROM trecho ORDER BY emb <=> '[0.88,0.12,0.02]' LIMIT 4")
    P.run("CREATE INDEX idx_trecho_hnsw ON trecho USING hnsw (emb vector_cosine_ops)")
    P.run("SET enable_seqscan = off", show=False)
    rows = P.run("EXPLAIN (COSTS OFF) SELECT texto FROM trecho ORDER BY emb <=> '[0.88,0.12,0.02]' LIMIT 2", show=False)
    print('pg> EXPLAIN (COSTS OFF) SELECT texto FROM trecho ORDER BY emb <=> ... LIMIT 2')
    for x in rows: print('   ' + x[0])
    print('(enable_seqscan = off so para forcar o plano com indice na tabela minuscula; o indice HNSW e aproximado (ANN), troca exatidao por velocidade.)')

h('Backup logico: pg_dump e pg_restore (copia consistente em um instante, com a base em uso)')
P.run("CREATE TABLE cliente (id INTEGER PRIMARY KEY, nome TEXT)", show=False); P.run("INSERT INTO cliente SELECT g, 'cliente' || g FROM generate_series(1, 1000) g", show=False)
d = tempfile.mkdtemp(); dump = d + '/backup.dump'
rc, out = sh('%spg_dump -h %s -U postgres -Fc -f %s postgres' % (BIN, pg.dir, dump)); print('pg_dump -Fc: codigo de saida %d, arquivo de backup com %d bytes' % (rc, os.path.getsize(dump)))
rc, out = sh('%spg_restore -l %s | grep -E "TABLE DATA" | head -3' % (BIN, dump)); print('pg_restore -l (trechos do sumario):'); print(out)
P.run("CREATE DATABASE restaurado")
rc, out = sh('%spg_restore -h %s -U postgres -d restaurado %s' % (BIN, pg.dir, dump)); print('pg_restore: codigo de saida %d' % rc)
R = pg.conn('restaurado'); R.run("SELECT COUNT(*) AS clientes_restaurados FROM cliente")
print('Desastre simulado: apagamos tudo na base original e restauramos de novo:')
P.run("DELETE FROM cliente"); P.run("SELECT COUNT(*) AS clientes_apos_o_desastre FROM cliente")
R.run("SELECT COUNT(*) AS clientes_na_copia_restaurada FROM cliente")

h('Replicacao fisica em streaming: primario e standby (pg_basebackup)')
sb = '/tmp/pgdata_m06_standby'; sock = '/tmp/pgsock_m06_standby'
shutil.rmtree(sb, ignore_errors=True); shutil.rmtree(sock, ignore_errors=True); os.makedirs(sock)
P.run("CREATE TABLE pedido (id INTEGER PRIMARY KEY, nome TEXT)", show=False); P.run("INSERT INTO pedido SELECT g, 'pedido' || g FROM generate_series(1, 3) g", show=False)
P.run("SHOW wal_level"); P.run("SHOW max_wal_senders")
rc, out = sh('%spg_basebackup -h %s -U postgres -D %s -R -X stream -P' % (BIN, pg.dir, sb)); print('pg_basebackup -R -X stream: codigo de saida %d' % rc)
print('Arquivos criados pelo -R no standby:', ', '.join(sorted(f for f in os.listdir(sb) if f in ('standby.signal', 'postgresql.auto.conf'))))
rc, out = sh('%spg_ctl -D %s -o "-c unix_socket_directories=%s -c port=5433 -c listen_addresses=\'\'" -w -l %s/log start' % (BIN, sb, sock, sock)); print('pg_ctl start do standby: codigo de saida %d' % rc)
conn = psycopg.connect('host=%s port=5433 dbname=postgres user=postgres' % sock, autocommit=True); S = DB('PostgreSQL', conn)
print('\n[standby] esta em recuperacao (somente leitura)?'); S.run("SELECT pg_is_in_recovery() AS em_recuperacao")
print('[primario] estado da replicacao:'); P.run("SELECT state, sync_state FROM pg_stat_replication")
print('[primario] grava uma linha nova:'); P.run("INSERT INTO pedido VALUES (9999, 'novo')")
time.sleep(1.0)
print('[standby] a linha ja chegou?'); S.run("SELECT * FROM pedido WHERE id = 9999")
print('[standby] tentativa de escrita:'); S.run("INSERT INTO pedido VALUES (10000, 'x')")
print('[standby] atraso de replay:'); S.run("SELECT pg_last_wal_replay_lsn() IS NOT NULL AS recebendo_wal")
print('\nPromocao (failover manual): o standby vira primario')
rc, out = sh('%spg_ctl -D %s promote -w' % (BIN, sb)); print('pg_ctl promote: codigo de saida %d' % rc)
S2 = DB('PostgreSQL', psycopg.connect('host=%s port=5433 dbname=postgres user=postgres' % sock, autocommit=True))
S2.run("SELECT pg_is_in_recovery() AS em_recuperacao"); S2.run("INSERT INTO pedido VALUES (10000, 'gravado no novo primario')")
S2.run("SELECT COUNT(*) AS pedidos_no_novo_primario FROM pedido")
sh('%spg_ctl -D %s -m fast stop' % (BIN, sb))
print('\nReplicacao assincrona: o primario nao espera o standby confirmar, por isso pode haver perda de dados no failover. A sincrona (synchronous_commit) espera, com custo de latencia. RPO e RTO: veja a teoria.')
pg.close(); shutil.rmtree(sb, ignore_errors=True); shutil.rmtree(sock, ignore_errors=True)
