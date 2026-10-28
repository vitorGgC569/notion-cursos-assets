# Simulado autoral estilo FCC (25 questões)

Questões AUTORAIS, elaboradas para este módulo no estilo da FCC (cinco alternativas, uma correta). Não são questões de provas reais; cada uma está marcada como autoral.

## Questão 1 (Modelagem) - autoral

Na modelagem de dados, o modelo que descreve entidades, atributos e relacionamentos de forma independente de qualquer SGBD, sem tipos de dados nem índices, é o modelo

A) físico.
B) conceitual.
C) lógico, pois já define tabelas e chaves estrangeiras.
D) funcional.
E) de armazenamento, pois descreve o negócio e não os dados.

**Gabarito: B.** A modelagem avança do mais abstrato ao mais concreto: conceitual (entidades e relacionamentos, em geral o MER), lógico (tabelas, colunas e chaves do modelo relacional) e físico (tipos, índices e armazenamento do SGBD). O modelo lógico já depende do modelo de dados relacional; "funcional" não é nível de modelagem de dados.

## Questão 2 (Modelagem) - autoral

O Dependente de um Funcionário só pode ser identificado pelo seu nome em conjunto com a matrícula do Funcionário a que pertence. No modelo entidade-relacionamento, Dependente é um exemplo de

A) entidade associativa.
B) atributo multivalorado.
C) especialização total do Funcionário.
D) entidade fraca.
E) relacionamento ternário.

**Gabarito: D.** Entidade fraca é a que não tem identificador próprio suficiente e depende de uma entidade forte; sua chave é a chave da entidade forte mais um discriminador (aqui, a matrícula e o nome). Entidade associativa transforma um relacionamento em entidade; atributo multivalorado tem vários valores para uma mesma entidade; especialização cria subtipos; e o relacionamento ternário liga três entidades.

## Questão 3 (Modelo relacional) - autoral

O relacionamento muitos para muitos (N:N) entre as entidades Aluno e Disciplina, ao ser mapeado para o modelo relacional, é implementado por

A) uma tabela associativa, com chave estrangeira para Aluno e para Disciplina, cuja chave primária costuma ser composta por essas duas colunas.
B) uma chave estrangeira de Disciplina na tabela Aluno.
C) uma chave estrangeira de Aluno na tabela Disciplina.
D) uma coluna multivalorada com a lista de disciplinas na tabela Aluno.
E) duas tabelas independentes, sem nenhuma chave em comum.

**Gabarito: A.** No modelo relacional uma chave estrangeira representa, no máximo, um relacionamento 1:N. Para N:N é preciso uma tabela intermediária (por exemplo, matricula(aluno_id, disciplina_id)), com duas chaves estrangeiras e chave primária composta, que ainda pode guardar atributos do relacionamento, como a nota. Colunas multivaloradas violam a 1FN.

## Questão 4 (Restrições e NULL) - autoral

Uma tabela do PostgreSQL tem a coluna cpf declarada com UNIQUE (sem NOT NULL). Foram executadas as inserções de cpf iguais a '111', NULL e NULL, e depois uma nova inserção de '111'. É correto afirmar que

A) a segunda inserção já falha, pois só pode haver um NULL em coluna UNIQUE.
B) a terceira inserção falha, pois dois NULL são iguais.
C) todas as quatro inserções são aceitas, pois UNIQUE só vale para chave primária.
D) a primeira inserção falha, pois UNIQUE exige NOT NULL.
E) as três primeiras inserções são aceitas, pois NULL não conta como valor repetido, e a quarta falha por violar a unicidade.

**Gabarito: E.** Em uma restrição UNIQUE o NULL é desconhecido, e dois desconhecidos não são considerados iguais; por isso o PostgreSQL aceita vários NULL (o SQLite também; os laboratórios L4 e L13 executam inserções de NULL em coluna UNIQUE). A repetição de '111' viola a unicidade. UNIQUE não exige NOT NULL e vale para qualquer coluna em que seja declarada.

## Questão 5 (Álgebra relacional) - autoral

Em álgebra relacional, a consulta SELECT DISTINCT nome FROM func WHERE salario > 5000 corresponde à expressão

A) σnome(πsalario>5000(func)).
B) func ⋈ nome.
C) πnome(σsalario>5000(func)).
D) πsalario>5000(σnome(func)).
E) func − σsalario>5000(func).

**Gabarito: C.** A seleção σ filtra linhas (equivale ao WHERE) e a projeção π escolhe colunas e elimina duplicatas (equivale ao SELECT DISTINCT). Primeiro se filtram as linhas e depois se projeta a coluna: π(σ(func)). Trocar os papéis, usar junção sem segunda relação ou diferença não representa a consulta.

## Questão 6 (Normalização) - autoral

Considere a relação Item(pedido, produto, nome_produto, qtde), com chave primária (pedido, produto), em que produto → nome_produto. A relação

A) viola a 1FN, pois há colunas repetidas.
B) viola a 3FN, mas está na 2FN, pois há dependência transitiva.
C) está na FNBC, pois toda coluna depende da chave.
D) viola a 4FN, pois há dependência multivalorada.
E) viola a 2FN, pois nome_produto depende de apenas parte da chave composta; a solução é criar uma tabela Produto(produto, nome_produto).

**Gabarito: E.** Dependência parcial (um atributo não chave que depende de parte da chave composta) viola a 2FN. A decomposição cria Produto(produto, nome_produto) e deixa Item(pedido, produto, qtde). Não há grupo repetido (1FN está satisfeita) nem a dependência é transitiva, e a relação não está na FNBC porque produto, que é determinante, não é superchave.

## Questão 7 (Normalização) - autoral

A relação Func(matricula, nome, cod_depto, nome_depto) tem chave primária matricula e a dependência cod_depto → nome_depto. A relação

A) está na 2FN, mas não na 3FN, pois nome_depto depende de cod_depto, que não é chave (dependência transitiva).
B) está na 3FN, pois todas as colunas dependem da matrícula.
C) não está na 1FN, pois há colunas com valores compostos.
D) não está na 2FN, pois a chave é composta.
E) está na FNBC, pois cod_depto determina nome_depto.

**Gabarito: A.** A chave é simples, logo não há dependência parcial e a 2FN vale. Mas matricula → cod_depto → nome_depto é uma dependência transitiva, que viola a 3FN. A decomposição gera Depto(cod_depto, nome_depto) e Func(matricula, nome, cod_depto). Na FNBC, todo determinante deve ser superchave, e cod_depto não é.

## Questão 8 (Normalização) - autoral

Uma equipe de BI decidiu repetir o nome do cliente na tabela de pedidos, evitando a junção com a tabela de clientes nos relatórios. Essa prática, chamada desnormalização,

A) elimina as anomalias de atualização, pois reduz o número de tabelas.
B) é obrigatória para atingir a 3FN.
C) acelera leituras ao evitar junções, mas aumenta a redundância e o risco de anomalias de atualização.
D) reduz o espaço de armazenamento, pois remove dados repetidos.
E) só pode ser aplicada em bancos NoSQL.

**Gabarito: C.** Desnormalizar é repetir ou reunir dados de propósito para acelerar leituras; o preço é espaço extra e a necessidade de manter as cópias consistentes (anomalia de atualização se o nome do cliente mudar). É uma decisão feita depois de normalizar e medir, comum em DW e relatórios, e não é exigida pela 3FN.

## Questão 9 (DDL, DML e DCL) - autoral

Sobre os comandos SQL de definição e manipulação de dados, é correto afirmar:

A) DELETE FROM t sempre remove a tabela inteira, inclusive a estrutura.
B) TRUNCATE TABLE aceita cláusula WHERE para remover só algumas linhas.
C) DROP TABLE apaga as linhas e mantém a estrutura da tabela.
D) TRUNCATE TABLE remove todas as linhas da tabela e mantém sua estrutura, enquanto DROP TABLE remove também a estrutura.
E) UPDATE sem WHERE altera apenas a primeira linha da tabela.

**Gabarito: D.** TRUNCATE esvazia a tabela (sem WHERE) e preserva a estrutura; DROP TABLE remove estrutura e dados. DELETE apaga linhas (todas, se não houver WHERE) mas não a tabela; UPDATE sem WHERE altera todas as linhas. O laboratório L12 executa o TRUNCATE no PostgreSQL.

## Questão 10 (DDL, DML e DCL) - autoral

No PostgreSQL, para permitir que o usuário ana apenas consulte a tabela contrato, sem poder alterá-la, deve-se executar

A) GRANT ALL PRIVILEGES ON contrato TO ana;
B) GRANT SELECT ON contrato TO ana;
C) REVOKE SELECT ON contrato FROM ana;
D) ALLOW READ ON contrato FOR ana;
E) CREATE ROLE ana WITH SELECT ON contrato;

**Gabarito: B.** GRANT SELECT concede apenas o privilégio de leitura (privilégio mínimo). ALL PRIVILEGES concederia também INSERT, UPDATE e DELETE; REVOKE retira privilégios; ALLOW READ e a sintaxe de CREATE ROLE com SELECT não existem em SQL. O laboratório L11 executa GRANT e REVOKE no PostgreSQL.

## Questão 11 (Consultas e junções) - autoral

As tabelas dep(id, nome) e func(id, dep_id) têm os dados: dep = (1, RH), (2, TI), (3, Jurídico); func = (1, 1), (2, 1), (3, 2). O resultado de

SELECT d.nome, COUNT(f.id) AS q
FROM dep d LEFT JOIN func f ON f.dep_id = d.id
GROUP BY d.nome ORDER BY d.nome;

é

A) Jurídico 0; RH 2; TI 1.
B) RH 2; TI 1.
C) Jurídico 1; RH 2; TI 1.
D) Jurídico NULL; RH 2; TI 1.
E) Jurídico 3; RH 3; TI 3.

**Gabarito: A.** O LEFT JOIN preserva todos os departamentos; para Jurídico não há funcionário e f.id fica NULL. COUNT(f.id) ignora NULL e dá 0 (COUNT(*) daria 1, e é essa a pegadinha). O INNER JOIN omitiria Jurídico, e 3 em todos seria o produto cartesiano. Executado em PostgreSQL e SQLite (laboratório L13).

## Questão 12 (Consultas e junções) - autoral

As tabelas a(x), com os valores 1, 2 e 3, e b(y), com os valores 1 e NULL, foram criadas. O resultado de SELECT COUNT(*) FROM a WHERE x NOT IN (SELECT y FROM b) é

A) 1.
B) 2.
C) 3.
D) 0.
E) um erro de execução, pois b tem NULL.

**Gabarito: D.** x NOT IN (1, NULL) equivale a x <> 1 AND x <> NULL. Para x = 2 e 3, a segunda comparação é desconhecida, e AND com desconhecido nunca é verdadeiro; para x = 1 é falso. Logo nenhuma linha passa e COUNT(*) é 0. Com NOT EXISTS ou LEFT JOIN ... IS NULL o resultado seria 2. Executado em PostgreSQL e SQLite (laboratório L13).

## Questão 13 (Agregação e NULL) - autoral

A tabela v(c) tem quatro linhas, com os valores 10, 20, NULL e 30. O resultado de SELECT COUNT(*), COUNT(c), AVG(c) FROM v é

A) 4, 4 e 15.
B) 3, 3 e 20.
C) 4, 3 e 15.
D) 4, 4 e 20.
E) 4, 3 e 20.

**Gabarito: E.** COUNT(*) conta as 4 linhas; COUNT(c) ignora o NULL e conta 3; AVG(c) ignora o NULL: (10 + 20 + 30) / 3 = 20. Considerar o NULL como zero daria 15. Executado em PostgreSQL e SQLite (laboratório L13).

## Questão 14 (Segurança) - autoral

Uma aplicação monta consultas concatenando o texto digitado pelo usuário, o que permite um ataque de SQL Injection. A defesa mais eficaz entre as listadas é

A) criptografar o disco do servidor de banco de dados.
B) agendar backups completos diários.
C) usar consultas parametrizadas (prepared statements) e uma conta de banco com privilégio mínimo.
D) usar a conta de administrador do banco, para evitar erros de permissão.
E) trocar o PostgreSQL por um banco NoSQL.

**Gabarito: C.** Na SQL Injection, a entrada do usuário é interpretada como código. Parametrizar separa o código dos dados, e o privilégio mínimo limita o estrago. Criptografia de disco protege contra roubo da mídia, backup ajuda na recuperação, e a conta de administrador piora o risco. Bancos NoSQL também sofrem injeção.

## Questão 15 (Agregação e NULL) - autoral

A tabela t(c) tem três linhas, com os valores 'a', 'b' e NULL. O resultado de SELECT COUNT(*) FROM t WHERE c <> 'a' é

A) 2.
B) 1.
C) 3.
D) 0.
E) um erro, pois NULL não pode ser comparado.

**Gabarito: B.** Para 'b', 'b' <> 'a' é verdadeiro; para 'a', falso; para NULL, NULL <> 'a' é desconhecido, e o WHERE só aceita linhas em que a condição é verdadeira. Logo o resultado é 1. Para incluir o NULL, seria preciso OR c IS NULL. Executado em PostgreSQL e SQLite (laboratório L13).

## Questão 16 (Transações e ACID) - autoral

Uma transferência bancária debita a conta A e, em seguida, credita a conta B. Ocorre uma falha após o débito e antes do crédito, e o SGBD desfaz o débito. A propriedade que garante esse comportamento é a

A) durabilidade.
B) escalabilidade.
C) isolamento.
D) integridade referencial.
E) atomicidade.

**Gabarito: E.** A atomicidade diz que a transação é executada por inteiro ou nada acontece: o ROLLBACK desfaz o débito. Durabilidade garante que o que foi confirmado sobrevive a falhas; isolamento trata de transações concorrentes; integridade referencial trata de chaves estrangeiras. O laboratório L6 executa o caso com PostgreSQL e SQLite.

## Questão 17 (Isolamento e bloqueios) - autoral

No nível de isolamento READ COMMITTED, a transação T1 lê o saldo de uma conta (100). A transação T2 altera o saldo para 150 e confirma. Quando T1 lê o mesmo saldo novamente, obtém 150. Esse fenômeno é chamado de

A) leitura não repetível.
B) leitura suja.
C) leitura fantasma.
D) atualização perdida.
E) deadlock.

**Gabarito: A.** Leitura não repetível é a mesma linha com valores diferentes em duas leituras da mesma transação, porque outra transação confirmou uma alteração entre elas. Leitura suja seria ler o dado de T2 antes do commit (READ COMMITTED impede); fantasma seriam linhas novas no filtro; atualização perdida é uma escrita sobrescrevendo outra. Isso é evitado em REPEATABLE READ.

## Questão 18 (Isolamento e bloqueios) - autoral

A transação T1 bloqueia a linha A e depois solicita a linha B; a transação T2 bloqueia a linha B e depois solicita a linha A. Ambas esperam indefinidamente. Nessa situação,

A) ocorre um deadlock; o SGBD o detecta (grafo de espera) e aborta uma das transações, que deve ser reexecutada.
B) ocorre uma leitura fantasma, resolvida com o nível READ UNCOMMITTED.
C) ocorre atualização perdida, resolvida com um índice em A e B.
D) não há problema, pois bloqueios compartilhados nunca se bloqueiam.
E) o SGBD aguarda o timeout e então confirma as duas transações.

**Gabarito: A.** Esperas circulares caracterizam o deadlock. O SGBD o detecta e escolhe uma vítima, abortando-a com erro. Prevenir exige acessar os recursos na mesma ordem e manter transações curtas. O laboratório L6 provoca e mostra um deadlock real no PostgreSQL.

## Questão 19 (Índices) - autoral

Existe um índice B-tree na coluna data_pedido. Entre as condições a seguir, a que permite ao otimizador usar esse índice (sargável) é

A) WHERE EXTRACT(YEAR FROM data_pedido) = 2025
B) WHERE TO_CHAR(data_pedido, 'YYYY') = '2025'
C) WHERE data_pedido >= DATE '2025-01-01' AND data_pedido < DATE '2026-01-01'
D) WHERE CAST(data_pedido AS TEXT) LIKE '2025%'
E) WHERE date_trunc('year', data_pedido) = DATE '2025-01-01'

**Gabarito: C.** Uma condição é sargável quando compara a coluna "pura" com um intervalo ou valor. Aplicar função à coluna (EXTRACT, TO_CHAR, CAST, date_trunc) impede o uso do índice comum, a menos que exista índice funcional. A faixa de datas equivale ao ano de 2025 e usa o índice. O laboratório L7 compara os planos de EXPLAIN.

## Questão 20 (Views, triggers e procedures) - autoral

No PostgreSQL, um trigger BEFORE INSERT ... FOR EACH ROW

A) executa depois de a linha ser gravada e não pode alterá-la.
B) dispõe da linha OLD, que contém os valores anteriores da inserção.
C) executa uma única vez por comando, independentemente do número de linhas.
D) pode alterar os valores de NEW antes de a linha ser gravada.
E) só pode ser criado sobre views.

**Gabarito: D.** Triggers BEFORE ... FOR EACH ROW executam antes da gravação e podem modificar NEW (valores padrão, normalização de texto). OLD não existe em INSERT; FOR EACH STATEMENT é que dispara uma vez por comando; INSTEAD OF é que se aplica a views. O laboratório L8 cria triggers com PL/pgSQL no PostgreSQL.

## Questão 21 (PostgreSQL e Oracle) - autoral

No PostgreSQL, o MVCC mantém versões antigas de linhas na própria tabela. A remoção dessas versões mortas e a atualização das estatísticas pelo processo autovacuum são realizadas pelo comando

A) CHECKPOINT.
B) VACUUM (e ANALYZE).
C) REINDEX.
D) pg_dump.
E) TRUNCATE.

**Gabarito: B.** Em UPDATE e DELETE o PostgreSQL não sobrescreve a linha: cria nova versão e mantém a antiga visível para transações mais antigas. O VACUUM recupera o espaço das versões mortas, e o ANALYZE atualiza as estatísticas do otimizador. CHECKPOINT força gravação de páginas sujas; REINDEX reconstrói índices; pg_dump gera backup lógico.

## Questão 22 (NoSQL) - autoral

Em um sistema distribuído, durante uma partição de rede, o projeto opta por continuar respondendo em todos os nós, aceitando que algumas leituras retornem dados desatualizados até as réplicas convergirem. Segundo o teorema CAP, o sistema privilegia

A) consistência (CP), com disponibilidade parcial.
B) consistência e disponibilidade (CA), pois partições não ocorrem.
C) as propriedades ACID estritas em todas as réplicas.
D) a tolerância a partição, abrindo mão das demais.
E) disponibilidade (AP), com consistência eventual.

**Gabarito: E.** Com partição de rede é preciso escolher entre consistência e disponibilidade. Responder sempre, mesmo com dados defasados, é AP (modelo BASE: consistência eventual); recusar leituras para não devolver dados antigos é CP. CA só existe sem partição, o que não é realista em sistemas distribuídos.

## Questão 23 (Bancos vetoriais) - autoral

Em uma solução de busca semântica com RAG, os documentos foram transformados em embeddings e gravados em um banco vetorial. Ao receber uma pergunta, o sistema deve

A) convertê-la em uma consulta LIKE sobre o texto original dos documentos.
B) calcular o hash exato da pergunta e buscar o mesmo hash nos documentos.
C) usar embeddings de outro modelo, pois a dimensão dos vetores é irrelevante.
D) convertê-la em embedding com o mesmo modelo e buscar os vetores mais próximos (cosseno, distância euclidiana ou produto escalar) para montar o contexto.
E) criar um índice B-tree sobre cada vetor para busca por igualdade.

**Gabarito: D.** A pergunta precisa estar no mesmo espaço vetorial dos documentos, ou seja, ser codificada pelo mesmo modelo (mesma dimensão). A busca por similaridade devolve os vizinhos mais próximos, em geral com índices aproximados como HNSW ou IVF, e os trechos recuperados compõem o contexto da resposta. O laboratório L10 executa essa busca com pgvector.

## Questão 24 (Replicação e backup) - autoral

Uma instituição aceita perder, no máximo, 5 minutos de dados e ficar no máximo 1 hora fora do ar após um desastre. Esses dois limites são, respectivamente,

A) o RTO e o RPO.
B) o MTBF e o MTTR.
C) o RPO e o RTO.
D) o SLA e o SLO.
E) o PITR e o WAL.

**Gabarito: C.** RPO (objetivo de ponto de recuperação) é a quantidade de dados que se aceita perder, medida em tempo; RTO (objetivo de tempo de recuperação) é quanto tempo o serviço pode ficar indisponível. MTBF e MTTR são métricas de confiabilidade; SLA e SLO são acordos e metas de serviço; PITR e WAL são mecanismos de recuperação.

## Questão 25 (Data warehouse) - autoral

Em um data warehouse dimensional, a categoria de um produto mudou e se deseja manter o histórico, de modo que vendas antigas continuem associadas à categoria antiga. A técnica adequada para a dimensão Produto é

A) a dimensão lentamente mutável do tipo 1, que sobrescreve o valor anterior.
B) a dimensão lentamente mutável do tipo 2, que cria uma nova linha com datas de vigência.
C) a operação ROLLUP, que gera subtotais.
D) a desnormalização da tabela fato.
E) o tipo 3, que mantém todas as versões históricas em linhas separadas.

**Gabarito: B.** No SCD tipo 2 cada mudança gera uma nova linha (com chave substituta nova e vigência), preservando todo o histórico. O tipo 1 sobrescreve e perde o histórico; o tipo 3 guarda apenas o valor anterior em outra coluna; ROLLUP é uma operação de agregação. O laboratório L9 executa o SCD tipo 2.
