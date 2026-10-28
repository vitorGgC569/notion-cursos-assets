# URLs públicas para adicionar como fonte no NotebookLM (Módulo 6: Banco de Dados)

Todas as URLs abaixo foram abertas em 28/10/2026 (por curl, a partir do ambiente de trabalho) e responderam HTTP 200, depois de seguir redirecionamentos. Adicione em "Adicionar fonte > Site" (ou YouTube) no NotebookLM. Os vídeos do YouTube foram conferidos por oEmbed (HTTP 200); o YouTube bloqueou a abertura automática da página do vídeo, por isso as durações não foram verificadas e o conteúdo não foi assistido por inteiro. Várias páginas estão em inglês (PostgreSQL, SQLite, MongoDB, Redis, Neo4j, Cassandra, Oracle); o NotebookLM aceita, e você pode pedir respostas em português. Páginas que falharam no teste (um endereço do Planalto e uma página da Wikipédia) não foram incluídas.

## PostgreSQL (documentação oficial, em inglês)
- Documentação do PostgreSQL: https://www.postgresql.org/docs/current/index.html
- Transações: https://www.postgresql.org/docs/current/tutorial-transactions.html
- Isolamento de transações: https://www.postgresql.org/docs/current/transaction-iso.html
- Índices: https://www.postgresql.org/docs/current/indexes.html
- Usando EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html
- Triggers (CREATE TRIGGER): https://www.postgresql.org/docs/current/sql-createtrigger.html
- GRANT: https://www.postgresql.org/docs/current/sql-grant.html
- Row Level Security: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- Backup e restauração: https://www.postgresql.org/docs/current/backup.html
- pg_dump: https://www.postgresql.org/docs/current/app-pgdump.html
- Alta disponibilidade e replicação: https://www.postgresql.org/docs/current/high-availability.html
- Servidores em espera (warm standby): https://www.postgresql.org/docs/current/warm-standby.html
- Manutenção, VACUUM: https://www.postgresql.org/docs/current/routine-vacuuming.html
- JSON e JSONB: https://www.postgresql.org/docs/current/datatype-json.html
- Consultas recursivas (WITH): https://www.postgresql.org/docs/current/queries-with.html
- Funções de janela: https://www.postgresql.org/docs/current/tutorial-window.html
- pgvector (busca vetorial): https://github.com/pgvector/pgvector

## SQLite
- Documentação do SQLite: https://www.sqlite.org/docs.html
- Linguagem SQL do SQLite: https://www.sqlite.org/lang.html
- Planejador de consultas e índices: https://www.sqlite.org/queryplanner.html
- Transações: https://www.sqlite.org/lang_transaction.html

## Oracle e NoSQL
- Oracle Database, documentação: https://docs.oracle.com/en/database/oracle/oracle-database/index.html
- MongoDB, manual: https://www.mongodb.com/docs/manual/
- Redis, documentação: https://redis.io/docs/latest/
- Neo4j, primeiros passos: https://neo4j.com/docs/getting-started/
- Apache Cassandra, documentação: https://cassandra.apache.org/doc/latest/
- IBM, o que são bancos NoSQL: https://www.ibm.com/br-pt/think/topics/nosql-databases
- AWS, NoSQL: https://aws.amazon.com/pt/nosql/
- AWS, o que são bancos de dados vetoriais: https://aws.amazon.com/pt/what-is/vector-databases/

## Conceitos (Wikipédia em português)
- Normalização de dados: https://pt.wikipedia.org/wiki/Normaliza%C3%A7%C3%A3o_de_dados
- ACID: https://pt.wikipedia.org/wiki/ACID
- Álgebra relacional: https://pt.wikipedia.org/wiki/%C3%81lgebra_relacional
- Teorema CAP: https://pt.wikipedia.org/wiki/Teorema_CAP

## Data warehouse, segurança e governança
- AWS, o que é data warehouse: https://aws.amazon.com/pt/what-is/data-warehouse/
- IBM, o que é OLAP: https://www.ibm.com/br-pt/think/topics/olap
- Microsoft, data warehousing: https://learn.microsoft.com/pt-br/azure/architecture/data-guide/relational-data/data-warehousing
- OWASP, SQL Injection: https://owasp.org/www-community/attacks/SQL_Injection
- ANPD (LGPD): https://www.gov.br/anpd/pt-br
- DAMA International (governança de dados): https://dama.org/

## Banca e edital
- FCC, concursos: https://www.fcc.org.br/fcc/concursos
- FGV Conhecimento, concursos: https://conhecimento.fgv.br/concursos
- Cebraspe, concursos: https://www.cebraspe.org.br/

## Videoaulas
- Bancos de Dados, Aula 02, Modelo Entidade-Relacionamento (UNIVESP): https://www.youtube.com/watch?v=oPlXecD-gZM
- O Que é Normalização de Dados? 1FN, 2FN e 3FN (Mauro, Blog do SQL): https://www.youtube.com/watch?v=2RGpyryOAkM
- SQL Joins: INNER, LEFT, RIGHT e FULL JOIN (Canal TI): https://www.youtube.com/watch?v=Lt8Hry6N334
- As propriedades ACID em Bancos de Dados (Bóson Treinamentos): https://www.youtube.com/watch?v=fVRY554MHWc
- Índices, Fundamentos, Estruturas e Usabilidade, Parte 1 (Gustavo Maia): https://www.youtube.com/watch?v=r-0CV82OYak
- Devo usar NoSQL? (Fabio Akita): https://www.youtube.com/watch?v=EdOkYEE1J_Y

## Provas oficiais das questões reais
Os PDFs abaixo foram usados nas questões de 03-questoes-reais-comentadas.md. As provas da FCC vêm de sites agregadores (eticaconcursos.com.br e estudegratis.com.br), usados só para localizar os PDFs; as da FGV e do Cebraspe são dos endereços oficiais das bancas. A prova e o gabarito do TRT-23 MT 2022 (Técnico TI) também foram usados, mas não foi encontrado endereço público que respondesse HTTP 200, por isso não estão listados. Não há link direto para os cadernos de questões da FGV de STN, SEFAZ-AM e TJ-RJ: ficam na página de cada concurso em conhecimento.fgv.br.
- FCC TRT-1 RJ 2014 Técnico TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2014-trt-1-regiao-rj-tecnico-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-1 RJ 2014 Técnico TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2014-trt-1-regiao-rj-tecnico-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-2 SP 2014 Técnico TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2014-trt-2-regiao-sp-tecnico-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-2 SP 2014 Técnico TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2014-trt-2-regiao-sp-tecnico-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-2 SP 2018 Técnico TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2018-trt-2-regiao-sp-tecnico-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-2 SP 2018 Técnico TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2018-trt-2-regiao-sp-tecnico-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-14 RO/AC 2022 Técnico TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2022-trt-14-regiao-ro-e-ac-tecnico-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-14 RO/AC 2022 Técnico TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2022-trt-14-regiao-ro-e-ac-tecnico-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-22 PI 2022 Técnico TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2022-trt-22-regiao-pi-tecnico-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-22 PI 2022 Técnico TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2022-trt-22-regiao-pi-tecnico-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-5 BA 2022 Técnico TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2022-trt-5-regiao-ba-tecnico-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-5 BA 2022 Técnico TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2022-trt-5-regiao-ba-tecnico-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-2 SP 2018 Analista TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2018-trt-2-regiao-sp-analista-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-2 SP 2018 Analista TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2018-trt-2-regiao-sp-analista-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-14 RO/AC 2022 Analista TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2022-trt-14-regiao-ro-e-ac-analista-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-14 RO/AC 2022 Analista TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2022-trt-14-regiao-ro-e-ac-analista-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-22 PI 2022 Analista TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2022-trt-22-regiao-pi-analista-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-22 PI 2022 Analista TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2022-trt-22-regiao-pi-analista-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-5 BA 2022 Analista TI, prova: https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2022-trt-5-regiao-ba-analista-judiciario-tecnologia-da-informacao-prova.pdf
- FCC TRT-5 BA 2022 Analista TI, gabarito: https://eticaconcursos.com.br/provas/arquivos/gabarito/fcc-2022-trt-5-regiao-ba-analista-judiciario-tecnologia-da-informacao-gabarito.pdf
- FCC TRT-3 MG 2015 Técnico TI, prova: https://www.estudegratis.com.br/images/provas/34526-fcc-2015-trt-3-regiao-mg-tecnico-judiciario-area-tecnologia-da-informacao-prova.pdf
- FCC TRT-3 MG 2015 Técnico TI, gabarito: https://www.estudegratis.com.br/images/provas/34526-fcc-2015-trt-3-regiao-mg-tecnico-judiciario-area-tecnologia-da-informacao-gabarito.pdf
- FGV STN 2024, gabaritos (manhã e tarde): https://conhecimento.fgv.br/sites/default/files/concursos/stn2024_gabaritos_manha-e-tarde_sdjsldds.pdf
- FGV SEFAZ-AM 2022, gabarito definitivo: https://conhecimento.fgv.br/sites/default/files/concursos/sefazam2022_gabarito_definitivo.pdf
- FGV TJ-RJ, gabarito definitivo (Analista): https://conhecimento.fgv.br/sites/default/files/concursos/tjrj-analista-gabarito-definitivo.pdf
- Cebraspe BCB 2024, prova (cargo 2): https://cdn.cebraspe.org.br/concursos/bcb_24/arquivos/959_BCB_002_01.PDF
- Cebraspe BCB 2024, gabarito definitivo: https://cdn.cebraspe.org.br/concursos/BCB_24/arquivos/GAB_DEFINITIVO_959_BCB_002_01.PDF
