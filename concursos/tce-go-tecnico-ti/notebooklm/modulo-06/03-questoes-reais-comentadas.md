# Questões reais (FCC, FGV e Cebraspe) com gabarito comentado

52 questões reais de Banco de Dados, sendo 34 da FCC, 14 da FGV e 4 do Cebraspe (formato Certo ou Errado). A prioridade foi a FCC, a banca do concurso; as questões da FCC vêm de provas de Técnico e de Analista Judiciário de TI de tribunais regionais do trabalho, porque o assunto é o mesmo e a FCC cobra bastante SQL. A FGV e o Cebraspe completam subtemas como normalização e data warehouse, sempre com a banca, o órgão, o ano e o número identificados. O gabarito é o oficial de cada prova. Questões anuladas, específicas de SQL Server ou Oracle sem equivalente, ou que dependem de imagem sem possibilidade de redesenho não foram incluídas; a figura da questão do TRT-5 foi redesenhada. Os comentários são explicações próprias, não texto da banca. Muitas consultas foram executadas de verdade no PostgreSQL 18.4 e no SQLite 3.46.1 (veja o Laboratório). Distribuição por subtema: Modelagem ER e modelos (6); Normalização e dependências funcionais (4); SQL: DDL, DML e DCL (5); Consultas, junções e subconsultas (16); Restrições, chaves e NULL (7); Índices e otimização (2); PostgreSQL e MySQL (2); DW, BI e modelagem dimensional (8); NoSQL e CAP (2). Não há questão real localizada sobre transações e ACID, views, procedures e triggers, bancos vetoriais, backup e replicação, nem sobre segurança; esses assuntos são cobertos pelo simulado autoral, pelos cartões, pelos desafios e pelo Laboratório.

Provas de origem:
- FCC, TRT-1 (RJ) 2014, Técnico Judiciário, Tecnologia da Informação, caderno C03 tipo 1
- FCC, TRT-2 (SP) 2014, Técnico Judiciário, Tecnologia da Informação, caderno M13 tipo 1
- FCC, TRT-3 (MG) 2015, Técnico Judiciário, Tecnologia da Informação, caderno T32 tipo 1
- FCC, TRT-2 (SP) 2018, Técnico Judiciário, Tecnologia da Informação, caderno TJ05 tipo 1
- FCC, TRT-14 (RO/AC) 2022, Técnico Judiciário, Tecnologia da Informação, caderno F06 tipo 1
- FCC, TRT-22 (PI) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno K11 tipo 1
- FCC, TRT-5 (BA) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno T20 tipo 1
- FCC, TRT-23 (MT) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno T18 tipo 1
- FCC, TRT-14 (RO/AC) 2022, Analista Judiciário, TI, caderno D04 tipo 1
- FCC, TRT-22 (PI) 2022, Analista Judiciário, TI, caderno G07 tipo 1
- FCC, TRT-5 (BA) 2022, Analista Judiciário, TI, caderno N14 tipo 1
- FCC, TRT-2 (SP) 2018, Analista Judiciário, TI, caderno AJ19 tipo 1
- FGV, STN 2024, Auditor Federal de Finanças e Controle, TI (Transformação Digital), manhã, tipo 1 (branca)
- FGV, SEFAZ-AM 2022, Analista de Tecnologia da Informação da Fazenda Estadual, prova 2 (tarde), tipo 1
- FGV, TJ-RJ 2025 (prova aplicada em 01/02/2026), Analista Judiciário, TI, Analista de Inteligência Artificial, tarde, tipo 1 (branca)
- Cebraspe, Banco Central do Brasil (BCB) 2024, Analista, Tecnologia da Informação (cargo 2), aplicação em 04/08/2024

## Questão 1 (Modelagem ER e modelos) - FCC, TRT-1 (RJ) 2014, questão 44

Considerando o modelo entidade-relacionamento utilizado na modelagem de dados de Bancos de Dados relacionais, um conjunto de entidades deve possuir atributos. Um atributo denominado composto é aquele que tem como característica

A) um tamanho mínimo correspondente a 100 caracteres alfabéticos.
B) ocupar, no mínimo 30 bytes para o armazenamento, em cada registro.
C) sempre, em sua composição, partes numéricas e partes literais.
D) não ser armazenado internamente nos arquivos do banco de dados.
E) poder ser dividido em subpartes menores que ainda apresentem significado.

**Gabarito: E.** Atributo composto é o que se divide em subpartes com significado próprio: endereço (rua, número, cidade, UF) ou nome completo (prenome, sobrenome). Na passagem para o modelo relacional, em geral cada subparte vira uma coluna, o que também atende à 1FN (valores atômicos). Não confunda com atributo multivalorado (vários valores, como telefones) nem com derivado (calculado, como idade).

## Questão 2 (Modelagem ER e modelos) - FCC, TRT-14 (RO/AC) 2022, questão 34

No Modelo Entidade-Relacionamento − MER, considere a hipótese de uma entidade denominada Cidadão que necessita ser modelada sob dois aspectos: Pessoa Física ou Pessoa Jurídica, cada um deles com atributos específicos. Em relação à entidade Cidadão, cada um desses aspectos é

A) um auto relacionamento.
B) um atributo multivalorado.
C) um relacionamento de grau três.
D) uma especialização.
E) uma entidade associativa.

**Gabarito: D.** Pessoa Física e Pessoa Jurídica são subtipos de Cidadão, cada um com atributos próprios: é a especialização (o caminho inverso, juntar subtipos em um supertipo, é a generalização). Auto relacionamento liga a entidade a ela mesma; atributo multivalorado tem vários valores; grau três é um relacionamento ternário; entidade associativa transforma um relacionamento em entidade.

## Questão 3 (Modelagem ER e modelos) - FCC, TRT-5 (BA) 2022, questão 48

Considere os seguintes requisitos aplicáveis a um Modelo Entidade × Relacionamento:

I. Tribunal se relaciona com Funcionário.II. Os funcionários só podem pertencer a um dado tribunal.III. Um tribunal tem muitos funcionários.IV. Os funcionários podem ter ou não dependentes.V. Um tribunal é reconhecido unicamente por seu código e tem vários dados associados a esse código.VI. Um funcionário é reconhecido unicamente por seu registro funcional e tem vários dados associados a esse registro.

Ao observar os requisitos do modelo, um técnico definiu, corretamente, que

A) o relacionamento entre tribunal e funcionário é de grau binário, cardinalidade 1:N no sentido tribunal-funcionário e que funcionário se relaciona com uma entidade fraca denominada Dependente.
B) o atributo identificador de Tribunal é composto por código concatenado com registro funcional visando a unicidade de chave e que funcionário tem como atributos multivalorados na 3FN a relação de todos os seus dependentes, quando couber.
C) o relacionamento entre tribunal e funcionário é de grau unário, cardinalidade N:1 no sentido tribunal-funcionário e que funcionário se relaciona com uma entidade-associativa denominada Dependente.
D) o atributo identificador de Tribunal é composto por registro funcional e como chave estrangeira o código, visando a unicidade de registro e que funcionário tem como atributos multivalorados na 3FN a relação de todos os seus dependentes, quando couber, complementados unitariamente com o código do tribunal.
E) o relacionamento entre tribunal e funcionário é de grau ternário em razão da existência de uma entidade Dependente relacionada a funcionário, cardinalidade 1:N no sentido tribunal-funcionário e que funcionário se relaciona com uma entidade opcional denominada Dependente.

**Gabarito: A.** Duas entidades (Tribunal e Funcionário) formam um relacionamento binário (grau 2). Um tribunal tem muitos funcionários e cada funcionário pertence a um só tribunal: 1:N no sentido tribunal para funcionário. Dependente só existe em função de Funcionário (identifica-se por ele), então é entidade fraca. As demais alternativas erram o grau (unário e ternário), concatenam identificadores sem motivo ou chamam Dependente de entidade associativa ou "opcional".

## Questão 4 (Modelagem ER e modelos) - FCC, TRT-14 (RO/AC) 2022, questão 43

Considere o Modelo Entidade-Relacionamento (MER). Uma entidade desse modelo que só pode ser identificada por meio da associação com uma outra entidade, ou seja, sua chave primária é composta pela chave proveniente dessa outra entidade, concatenada a um identificador de si própria, é classificada como

A) Relação Dependente.
B) Entidade Associativa.
C) Relação por Associação.
D) Entidade Fraca.
E) Entidade subordinada.

**Gabarito: D.** Entidade fraca não tem identificador próprio suficiente: sua chave primária é a chave da entidade forte (proprietária) mais um discriminador (identificador parcial), como Dependente(matrículaFuncionário, númeroDoDependente). A entidade associativa, ao contrário, nasce da transformação de um relacionamento em entidade. "Relação Dependente", "Relação por Associação" e "Entidade subordinada" não são termos do MER.

## Questão 5 (Modelagem ER e modelos) - FCC, TRT-5 (BA) 2022, questão 21

Observando o Modelo Entidade-Relacionamento apresentado, é possível concluir corretamente que

Figura redesenhada a partir da descrição das tabelas da prova: Departamento (nomeDepartamento PK, telefoneDepartamento, localDepartamento); Funcionario (emailFuncionario PK, nomeFuncionario, telefoneFuncionario, nomeDepartamento FK); Login (emailFuncionario PK e FK, senha). Funcionario e Login se relacionam 1:1; Departamento tem N funcionários.

[Figura: Figura redesenhada do modelo entidade-relacionamento com Departamento, Funcionario e Login]

A) o atributo nomeDepartamento é chave estrangeira na entidade Departamento.
B) a entidade Login não tem chave estrangeira nem primária.
C) a cardinalidade do relacionamento entre as entidades Funcionario e Login é um-para-um.
D) o atributo telefoneFuncionario é adequado para ser chave primária na entidade Funcionario.
E) a chave primária da entidade Login é composta, pois emailFuncionario é chave primaria e chave estrangeira ao mesmo tempo.

**Gabarito: C.** No modelo, Login usa como chave primária o mesmo emailFuncionario que referencia Funcionario: a chave primária que é também chave estrangeira caracteriza um relacionamento um-para-um (cada funcionário tem no máximo um login). A: nomeDepartamento é a chave primária em Departamento e chave estrangeira em Funcionario. B: Login tem as duas. D: telefone não identifica a pessoa (pode repetir ou mudar). E: a chave é simples (um atributo), não composta. A figura foi redesenhada; o MER original é só uma das formas de representar o mesmo esquema.

## Questão 6 (Normalização e dependências funcionais) - FCC, TRT-14 (RO/AC) 2022, questão 35

No contexto da normalização de dados, considere as definições:

I. Uma relação onde todos os domínios de atributos possuem apenas valores atômicos (simples e indivisíveis).II. Uma relação onde todos os atributos que não participam da chave primária são dependentes desta.

A relação que atende às duas definições simultaneamente

A) está na primeira forma normal.
B) está na segunda forma normal.
C) está na terceira forma normal.
D) não está normalizada.
E) é uma relação nula.

**Gabarito: B.** I é a definição da 1FN (valores atômicos). II é a da 2FN, em sua formulação básica: os atributos não chave dependem da chave primária (e, na 2FN completa, dependem de toda a chave, sem dependência parcial). Atender às duas é estar na 2FN. Para a 3FN seria preciso eliminar também as dependências transitivas entre não chaves. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): a decomposição 1FN, 2FN e 3FN foi feita passo a passo no script L5, com testes de dependência funcional em SQL.

## Questão 7 (Normalização e dependências funcionais) - FCC, TRT-23 (MT) 2022, questão 50

Considere que uma organização possui um banco de dados com os registros de cidadãos identificados pelo CPF, endereços residenciais identificados pelo CEP e habilidades profissionais pré-determinadas. Os dados dos cidadãos, além dos pessoais, incluem a situação empregatícia atual que pode ser uma das três: empregado contratado, empregado temporário ou desempregado. O banco completo, então, é formado pelas tabelas de cidadãos (cadastro de pessoas), endereços (tabela de CEP), habilidades (tabela de habilidades), tabela cidadão-habilidade e tabela cidadão-endereço. No modelo entidade-relacionamento normalizado até a 3FN, identifica-se como relacionamento, entidade e atributo, correta e respectivamente,

A) cidadão-habilidade, cidadão e situação empregatícia.
B) cidadão, cidadão-endereço e habilidade.
C) situação empregatícia, cidadão e endereço.
D) habilidade, endereço e cidadão-endereço.
E) cidadão-endereço, situação-empregatícia e habilidade.

**Gabarito: A.** As tabelas de cadastro (cidadão, endereço, habilidade) são entidades. As tabelas "cidadão-habilidade" e "cidadão-endereço" resolvem relacionamentos muitos para muitos, então representam relacionamentos. "Situação empregatícia" tem só três valores fixos e é característica do cidadão: atributo. Assim a sequência relacionamento, entidade, atributo é: cidadão-habilidade, cidadão, situação empregatícia.

## Questão 8 (Normalização e dependências funcionais) - FGV, STN 2024, questão 60

Com referência à normalização de bancos de dados, considere uma tabela relacional T, com colunas A, B, C, D, E, na qual as dependências funcionais identificadas são exibidas a seguir.

A -> B
B -> A
A -> C
B -> D
B -> E
D -> B

O comando SQL utilizado na criação dessa tabela é exibido a seguir.

create table T (
  A int not null unique,
  B int not null unique,
  C int not null unique,
  D int not null unique,
  E int not null )

Assinale a dependência funcional adicional necessária para que o esquema acima esteja de acordo com a forma normal Boyce-Codd.

A) A, B, C, D -> E
B) C -> D
C) C -> E
D) E -> A
E) E -> A, B, C, D

**Gabarito: B.** Na FNBC todo determinante de uma dependência funcional deve ser chave candidata. O declarado (UNIQUE NOT NULL) torna A, B, C e D chaves candidatas. Pelo fecho das dependências dadas: A determina B, C, D (via B) e E; B determina A, D, E; D determina B e, então, tudo. Mas C não determina nada: o fecho de C é só {C}, e as chaves derivadas não incluem C. Acrescentar C -> D faz C determinar D, logo B, logo tudo, e C vira chave: as chaves derivadas passam a ser {A}, {B}, {C}, {D}, iguais às declaradas. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): no script L5, um fecho de atributos em Python confirma que só a alternativa B produz as quatro chaves declaradas.

## Questão 9 (Normalização e dependências funcionais) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 115

Julgue o item a seguir.

Considera-se que uma tabela está na terceira forma normal (3FN) quando não existem dependências multivaloradas, ou seja, campos que se repetem em relação à chave primária.


**Gabarito: E.** (Errado) Item errado. Campos que se repetem (grupos repetidos) violam a 1FN. Dependências multivaloradas são tratadas na 4FN. A 3FN exige estar na 2FN e que nenhum atributo não chave dependa transitivamente da chave: todo atributo não chave depende "da chave, de toda a chave e nada além da chave".

## Questão 10 (SQL: DDL, DML e DCL) - FCC, TRT-14 (RO/AC) 2022, questão 36

No contexto da SQL, os comandos classificados, correta e respectivamente, como DDL e DML são:

A) Update e Delete.
B) Alter e Revoke.
C) Drop e Create.
D) Grant e Insert.
E) Alter e Delete.

**Gabarito: E.** DDL (definição de dados) cria ou altera estruturas: CREATE, ALTER, DROP, TRUNCATE. DML (manipulação) trabalha com as linhas: INSERT, UPDATE, DELETE, MERGE (e, em muitas classificações, SELECT, também chamado DQL). DCL (controle) concede e retira permissões: GRANT e REVOKE. Em E, Alter é DDL e Delete é DML. A: ambos DML. B: Revoke é DCL. C: ambos DDL. D: Grant é DCL. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o script L12 executa cada comando.

## Questão 11 (SQL: DDL, DML e DCL) - FCC, TRT-23 (MT) 2022, questão 52

Na linguagem SQL são respectivamente comandos DML, DDL e DCL:

A) DROP, LOCK TABLE e GRANT
B) UPDATE, CALL e ALTER
C) CREATE, INSERT e GRANT
D) MERGE, TRUNCATE e REVOKE
E) RENAME, DELETE e DROP

**Gabarito: D.** MERGE (insere ou atualiza conforme a correspondência) é DML; TRUNCATE (esvazia a tabela) é DDL; REVOKE é DCL. A: DROP é DDL, não DML. B: CALL executa procedimentos e ALTER é DDL. C: CREATE é DDL e INSERT é DML (ordem trocada). E: RENAME é DDL e DELETE é DML (ordem trocada). Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): MERGE, TRUNCATE e REVOKE rodaram no PostgreSQL 18.4 (L12).

## Questão 12 (SQL: DDL, DML e DCL) - FCC, TRT-14 (RO/AC) 2022, questão 44

No contexto da SQL, os comandos classificados, correta e respectivamente, como DCL, DML e DDL, são:

A) Revoke, Insert e Alter.
B) Grant, Drop e Create.
C) Update, Select e Insert.
D) Revoke, Create e Alter.
E) Drop, Grant e Delete.

**Gabarito: A.** Revoke é DCL, Insert é DML e Alter é DDL. B: Drop e Create são DDL. C: Update e Insert são DML e não há DCL. D: Create é DDL (não DML). E: Drop é DDL, Grant é DCL, Delete é DML (tudo fora de ordem).

## Questão 13 (SQL: DDL, DML e DCL) - FCC, TRT-14 (RO/AC) 2022, questão 45

Considere a seguinte sintaxe SQL de um comando genérico UPDATE:

UPDATE  I
  II  coluna1 = valor1, coluna2 = valor2
  III  condição;

As lacunas I, II e III devem ser preenchidas, respectivamente, por

A) nome da tabela − LET − WHERE
B) nome do banco de dados − GET − FOR
C) nome da tabela − FOR − SET
D) nome do banco de dados − LET − FOR
E) nome da tabela − SET − WHERE

**Gabarito: E.** A sintaxe é UPDATE nome_da_tabela SET coluna = valor, ... WHERE condição. Sem WHERE, todas as linhas são alteradas. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): no PostgreSQL, UPDATE ... LET e UPDATE ... FOR deram "syntax error"; o UPDATE com SET e WHERE alterou só a linha 1 e o UPDATE sem WHERE zerou o salário das 3 linhas (L12).

## Questão 14 (SQL: DDL, DML e DCL) - FCC, TRT-5 (BA) 2022, questão 26

Para um administrador de banco de dados Oracle atribuir ao usuário analista os privilégios para criar sessões, tabelas e views ele deve utilizar, em condições ideais, a instrução

A) GRANT OPERATION(create session, create table, create view) TO analista;
B) ALLOW create session, create table, create view TO analista;
C) GRANT create session, create table, create view TO analista;
D) GRANT PERMISSION(create session, create table, create) TO analista;
E) DELEGATE TO analista PERMISSION TO create session, create table, create view;

**Gabarito: C.** Privilégios de sistema no Oracle são concedidos com GRANT privilégio1, privilégio2 ... TO usuário. As demais formas (OPERATION, ALLOW, PERMISSION, DELEGATE) não existem na SQL. Dialeto: Oracle (não testado: o laboratório não tem Oracle). O PostgreSQL concede privilégios de objeto (GRANT SELECT ON tabela TO papel) e a forma de privilégio de sistema "create session" não existe lá; o L8 mostra o erro correspondente.

## Questão 15 (Consultas, junções e subconsultas) - FCC, TRT-2 (SP) 2014, questão 39

Para exibir apenas o nome de todos os funcionários, sem repetição, e o respectivo nome do departamento que o funcionário trabalha, utiliza-se a instrução

A) select f.FNome, d.DNome from funcionario f, departamento d;
B) select FNome, DNome from funcionario, departamento where DepNo=DepNo;
C) select FNome, DNome from funcionario f, departamento d where d=f;
D) select f.FNome, d.DNome from funcionario f, departamento d where f.DepNo=d.DepNo;
E) select FNome, DNome from funcionario, departamento;

**Gabarito: D.** A junção correta liga as duas tabelas pela chave: f.DepNo = d.DepNo. Sem condição de junção (A e E) sai o produto cartesiano. Em B a coluna DepNo é ambígua e a condição DepNo=DepNo compara a coluna com ela mesma. C compara aliases, que não são valores. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): com 4 funcionários e 2 departamentos, A e E devolveram 8 linhas; B deu "column reference depno is ambiguous" (PostgreSQL) e "ambiguous column name" (SQLite); D devolveu as 4 linhas certas (L2).

## Questão 16 (Consultas, junções e subconsultas) - FCC, TRT-2 (SP) 2014, questão 40

Para exibir a média e a soma dos salários de todos os funcionários cujo cargo inicia-se pela palavra 'anali' utiliza-se a instrução:

A) select avg(Fsal),sum(FSal) from funcionario where FCargo='anali%';
B) select average(Fsal),sum(FSal) from funcionario where FCargo like 'anali';
C) select avg(Fsal),sum(FSal) from funcionario where FCargo like 'anali%';
D) select avg(Fsal),sum(FSal) from funcionario where FCargo begin 'anali';
E) select avg(Fsal),sum(FSal) from funcionario where FCargo like 'anali*';

**Gabarito: C.** A função de média é AVG (não AVERAGE) e o padrão "começa com" usa LIKE com o curinga %, que significa zero ou mais caracteres. A usa "=" com %, que vira comparação literal e não casa com nada; B não tem curinga e usa uma função inexistente; D usa BEGIN, que não é operador; E usa * (curinga de shell, não de SQL). Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): A e E não casaram nenhuma linha (média e soma nulas), B deu "function average(numeric) does not exist" e D, "syntax error at or near begin"; só C devolveu média 8000 e soma 24000 (L2).

## Questão 17 (Consultas, junções e subconsultas) - FCC, TRT-3 (MG) 2015, questão 50

Para exibir o nome de todos os advogados que NÃO estão ligados a nenhum processo na tabela advogado_processo utiliza-se a instrução:

A) SELECT nomeAdvogado FROM advogado WHERE numeroOABAdvogado IS NOT(SELECT numeroOABAdvogado FROM advogado_processo);
B) SELECT nomeAdvogado FROM advogado RIGHT JOIN advogado_processo ON advogado.numeroOABAdvogado<>advogado_processo.numeroOABAdvogado;
C) SELECT nomeAdvogado FROM advogado WHERE numeroOABAdvogado NOT IN (SELECT numeroOABAdvogado FROM advogado_processo);
D) SELECT DISTINCT nomeAdvogado FROM advogado JOIN advogado_processo ON advogado.numeroOABAdvogado=advogado_processo.numeroOABAdvogado;
E) SELECT DISTINCT nomeAdvogado FROM advogado WHERE nomeAdvogado NOT IN (SELECT nomeAdvogado FROM advogado_processo);

**Gabarito: C.** A pergunta é um "anti-join": advogados cuja chave não aparece na tabela associativa. NOT IN com subconsulta pela chave (OAB) resolve. A: "IS NOT (subconsulta)" não é sintaxe de SQL (o PostgreSQL recusa; o SQLite aceita, mas devolve João e Paulo, o que está errado). B: o RIGHT JOIN com "<>" lista pares diferentes. D: o JOIN devolve só os advogados que TÊM processo (o oposto). E: compara pelo nome, e advogado_processo nem tem essa coluna. Cuidado em prova: NOT IN devolve vazio se a subconsulta tiver algum NULL; NOT EXISTS ou LEFT JOIN ... IS NULL são mais seguros. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L2 reproduz a armadilha do NULL e as três formas equivalentes.

## Questão 18 (Consultas, junções e subconsultas) - FCC, TRT-2 (SP) 2018, questão 44

Em um banco de dados Oracle aberto e em condições ideais há uma tabela chamada func de onde se deseja exibir os nomes dos funcionários (campo nome) e os códigos de departamentos (campo codDep) de todos os funcionários dos departamentos 10 ou 20 em ordem alfabética crescente por nome. Para isso, utilizando PL/SQL, um Técnico de TI deve utilizar a instrução

SELECT nome, codDep FROM func WHERE

A) codDep IN (10,20) ORDER BY nome ASC;
B) codDep CONTAIN(10 OR 20) ORDER BY nome ASC;
C) codDep=10 OR codDep=20 ORDER ASC nome;
D) codDep BELONG(10 OR 20) ORDER BY nome ASCENDING;
E) codDep BETWEEN(10,20) ORDER BY nome ASC;

**Gabarito: A.** IN (10,20) é a forma curta de codDep=10 OR codDep=20, e ORDER BY nome ASC ordena de forma crescente (ASC é o padrão). B (CONTAIN) e D (BELONG) não existem; C escreve "ORDER ASC nome", fora da sintaxe; E usa BETWEEN com parênteses e vírgula, sem a palavra AND. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): só A devolveu as linhas (Ana, Caio, Zeca); B, C, D e E deram "syntax error" no PostgreSQL e no SQLite (L2). Dialeto: Oracle na prova; a sintaxe dessas cláusulas é a mesma.

## Questão 19 (Consultas, junções e subconsultas) - FCC, TRT-14 (RO/AC) 2022, questão 39

Considere a seguinte sintaxe SQL para obter todas as colunas da tabela Clientes, classificando a coluna Estado em ordem decrescente:

I * FROM Clientes
II Estado III ;

As lacunas I, II e III devem ser preenchidas, respectivamente, por:

A) SELECT − CLASS − ORDER DECR
B) CLASS − ORDER BY − INV
C) SELECT − ORDER BY − DESC
D) OBTAIN − CLASS DESC − ORDER
E) SELECT CLASS − BY − DESC

**Gabarito: C.** A forma é SELECT * FROM Clientes ORDER BY Estado DESC. DESC ordena do maior para o menor (ASC, o padrão, do menor para o maior). CLASS, OBTAIN, INV e DECR não existem. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o PostgreSQL devolveu SP, GO, BA com ORDER BY estado DESC e "syntax error at or near BY" com CLASS BY (L12).

## Questão 20 (Consultas, junções e subconsultas) - FCC, TRT-5 (BA) 2022, questão 51

Considere uma tabela relacional com alto volume de dados denominada Cadastro, com diversas pessoas de cidades em comum ou não. Usando a linguagem SQL e considerando o campo da tabela denominado Cidade, um técnico fez uma seleção para descobrir quais são as cidades existentes. Na hipótese de haver dez pessoas cadastradas que moram em Santos, por exemplo, essa cidade será exibida dez vezes. Para resolver o problema e mostrar apenas uma única vez cada cidade, ele deve utilizar

A) SELECT COUNT (DISTINCT Cidade) FROM Cadastro.
B) SELECT COUNT (MODE Cidade) FROM Cadastro.
C) DISPLAY UNIQUE Cidade FROM Cadastro.
D) SELECT DISTINCT Cidade FROM Cadastro.
E) SELECT UNIQUE Cidade FROM Cadastro.

**Gabarito: D.** SELECT DISTINCT elimina linhas repetidas do resultado. A conta quantas cidades diferentes existem (um número, não a lista). B e C não são SQL. E: "SELECT UNIQUE" existe no Oracle como sinônimo de DISTINCT, mas não é o padrão SQL, e o gabarito oficial é D. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): no PostgreSQL e no SQLite, A devolveu um número, B e C deram "syntax error", D devolveu cada cidade uma vez e E deu "syntax error" (L2).

## Questão 21 (Consultas, junções e subconsultas) - FCC, TRT-1 (RJ) 2014, questão 45

Considere a existência da seguinte tabela de um Banco de Dados relacional:

Produto (ID, Item, Tipo, Custo)

A consulta SQL para obter o Custo médio dos Itens de cada Tipo de Produto é

SELECT Tipo, AVG (Custo)
FROM Produto
Cláusula 3

O conteúdo da Cláusula 3 para completar a consulta e atender o especificado na questão é

A) ORDER BY Tipo.
B) HAVING Tipo LIKE " ".
C) WHERE Tipo IN GROUP.
D) GROUP BY Tipo.
E) WHERE ALL Tipo (Item).

**Gabarito: D.** Média por tipo pede agrupamento: GROUP BY Tipo, e a função AVG calcula uma média por grupo. ORDER BY só ordena (sem GROUP BY o PostgreSQL recusa a consulta, e o SQLite devolve uma linha única com a média geral e um Tipo qualquer). HAVING filtra grupos depois de agrupar, e sem GROUP BY trata a tabela como um grupo só. C e E não são sintaxe SQL. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L3 executou as cinco alternativas e mostra a diferença entre COUNT(*) e COUNT(coluna) e entre WHERE e HAVING.

## Questão 22 (Consultas, junções e subconsultas) - FCC, TRT-5 (BA) 2022, questão 22

Para exibir todos os nomes dos departamentos e a quantidade de funcionários de cada departamento utiliza-se a instrução SQL

Figura redesenhada a partir da descrição das tabelas da prova: Departamento (nomeDepartamento PK, telefoneDepartamento, localDepartamento); Funcionario (emailFuncionario PK, nomeFuncionario, telefoneFuncionario, nomeDepartamento FK); Login (emailFuncionario PK e FK, senha). Funcionario e Login se relacionam 1:1; Departamento tem N funcionários.

[Figura: Figura redesenhada do modelo entidade-relacionamento com Departamento, Funcionario e Login]

A) SELECT f.nomeDepartamento, (SELECT COUNT(f.nomeFuncionario) FROM funcionario f WHERE f.nomeDepartamento = d.nomeDepartamento) FROM departamento d;
B) SELECT f.nomeDepartamento, (SELECT COUNT(f.nomeFuncionario) FROM funcionario f WHERE d.nomeDepartamento = f.nomeDepartamento) AS Quantidade_Funcionarios FROM departamento d GROUP BY f.nomeDepartamento;
C) SELECT d.nomeDepartamento, COUNT(f.nomeFuncionario) FROM funcionario f, departamento d;
D) SELECT d.nomeDepartamento, (SELECT COUNT(f.nomeFuncionario) FROM funcionario f WHERE d.nomeDepartamento = f.nomeDepartamento) AS Quantidade_Funcionarios FROM departamento d GROUP BY d.nomeDepartamento;
E) SELECT d.nomeDepartamento, COUNT(f.nomeFuncionario) FROM funcionario f, departamento d WHERE d.nomeDepartamento = f.nomeDepartamento;

**Gabarito: D.** A forma correta usa uma subconsulta correlacionada na lista do SELECT: para cada departamento d, conta os funcionários cujo nomeDepartamento é igual. Em A e B o "f." da lista externa não existe (o alias f só vale dentro da subconsulta). C mistura coluna e agregação sem GROUP BY e sem junção. E tem junção, mas sem GROUP BY. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): com dados didáticos (3 departamentos), A e B deram erro ("missing FROM-clause entry for table f" no PostgreSQL; "no such column" no SQLite); C e E deram "must appear in the GROUP BY clause" no PostgreSQL e, no SQLite, devolveram uma linha só; só D devolveu as 3 linhas (Juridico 0, RH 1, TI 2) (L2).

## Questão 23 (Consultas, junções e subconsultas) - FCC, TRT-5 (BA) 2022, questão 23

Para exibir corretamente o nome do funcionário, nome de seu departamento e a senha de login, de todos os funcionários, sem repetição, utiliza-se a instrução

Figura redesenhada a partir da descrição das tabelas da prova: Departamento (nomeDepartamento PK, telefoneDepartamento, localDepartamento); Funcionario (emailFuncionario PK, nomeFuncionario, telefoneFuncionario, nomeDepartamento FK); Login (emailFuncionario PK e FK, senha). Funcionario e Login se relacionam 1:1; Departamento tem N funcionários.

[Figura: Figura redesenhada do modelo entidade-relacionamento com Departamento, Funcionario e Login]

A) SELECT f.nomeFuncionario, d.nomeDepartamento, l.senha FROM login l, funcionario f, departamento d GROUP BY f.nomeFuncionario;
B) SELECT f.nomeFuncionario, d.nomeDepartamento, l.senha FROM login l, funcionario f, departamento d WHERE f.nomeDepartamento = d.nomeDepartamento OR f.emailFuncionario=l.emailFuncionario;
C) SELECT f.nomeFuncionario, d.nomeDepartamento, (SELECT l.senha FROM login l WHERE f.emailFuncionario = l.emailFuncionario) as Senha FROM funcionario f, departamento d;
D) SELECT f.nomeFuncionario, d.nomeDepartamento, l.senha FROM login l, funcionario f, departamento d;
E) SELECT f.nomeFuncionario, f.nomeDepartamento, (SELECT l.senha FROM login l WHERE f.emailFuncionario = l.emailFuncionario) as Senha FROM funcionario f;

**Gabarito: E.** Basta ler a tabela funcionario: nomeDepartamento já está nela (chave estrangeira) e a senha vem de uma subconsulta correlacionada pela chave de Login. A, B, C e D ligam as três tabelas sem a condição certa (produto cartesiano ou OR em vez de AND) e repetem funcionários. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): com 3 funcionários, 3 departamentos e 3 logins, o esperado são 3 linhas: E devolveu 3; B, C e D devolveram 15, 9 e 27; A deu erro no PostgreSQL ("must appear in the GROUP BY clause") e, no SQLite, que aceita colunas fora do GROUP BY, devolveu 3 linhas (L2).

## Questão 24 (Consultas, junções e subconsultas) - FCC, TRT-22 (PI) 2022, questão 23

Considere que em um banco de dados Oracle 19c aberto e funcionando em condições ideais, exista a tabela TRTServ:

Codigo  Servico                                  Local
1       Serviço de Informação ao Cidadão – SIC  Teresina
2       Ouvidoria                               Teresina
3       Cartilha Rede Ouvir                     Estado do Piauí

Para atualizar e mostrar os termos Teresina para TRT-22 do campo Local, deve-se utilizar o seguinte comando PL/SQL:

A) SELECT FROM TRTServ, Local REPLACE ("Teresina", "TRT-22");
B) SELECT REPLACE (Local, 'Teresina', 'TRT-22') FROM TRTServ;
C) SELECT FROM TRTServ REPLACE (Local, "Teresina", "TRT-22");
D) SELECT SUBST (Local, 'Teresina', 'TRT-22') FROM TRTServ;
E) SELECT FROM TRTServ, Local SUBST ('Teresina', 'TRT-22');

**Gabarito: B.** A função de texto é REPLACE(coluna, procurado, substituto), usada na lista do SELECT, e os textos vão entre aspas simples (aspas duplas são identificadores). SUBST não existe, e "SELECT FROM" sem lista de colunas é inválido. Atenção: o SELECT só exibe o valor trocado, não grava (o enunciado diz "atualizar e mostrar"; gravar exigiria UPDATE). Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): no PostgreSQL, B devolveu TRT-22, TRT-22, Estado do Piaui; D deu "function subst does not exist"; aspas duplas deram "column Teresina does not exist"; e a linha original continuou com "Teresina" (L12). Dialeto: Oracle na prova; REPLACE é igual no PostgreSQL.

## Questão 25 (Consultas, junções e subconsultas) - FCC, TRT-2 (SP) 2018, questão 57

Para criar uma consulta que pesquise na tabela Trabalhadores de um banco de dados aberto e em condições ideais todos os nomes e telefones de trabalhadores cujos nomes sejam Sofia ou Sophia, um Analista de Sistemas deve utilizar a instrução PL/SQL

SELECT nome, telefone FROM Trabalhadores WHERE

A) REGEXP_LIKE (nome, '^So(f|ph)ia$');
B) nome ='^So(f|ph)ia$';
C) nome CONTAINS('^So(f|ph)ia$');
D) nome REGEXP('%So(f|ph)ia%');
E) REGEXP(nome, '%So(f|ph)ia%');

**Gabarito: A.** No Oracle, REGEXP_LIKE(coluna, expressão regular) testa se o valor casa com o padrão. Em ^So(f|ph)ia$, ^ e $ ancoram início e fim e (f|ph) é alternativa: casa Sofia e Sophia. B usa "=" com regex (comparação literal); C usa CONTAINS (do Oracle Text, com outra sintaxe); D e E usam "%" (curinga do LIKE, não de regex). Dialeto: Oracle (não testado). No PostgreSQL o operador equivalente é nome ~ '^So(f|ph)ia$'.

## Questão 26 (Consultas, junções e subconsultas) - FGV, STN 2024, questão 56

No contexto da tabela IPCA, analise o script SQL de criação da view "v1".

create view v1 as
select ano, mes, salto from (
 select y.ano, y.mes, y.indice anterior,
 x.indice novo, y.indice - x.indice salto
 from ipca x, ipca y
 where
 ((x.ano = y.ano and y.mes = x.mes + 1)
 Or
 (y.ano = x.ano + 1 and y.mes = 1 and x.mes = 12))
) x

Admitindo que pode haver empates, assinale o comando SQL que emprega corretamente a view v1 para produzir o ano/mês que teve o maior salto positivo do índice em relação ao mês anterior, e o valor do salto. (A tabela IPCA da prova é uma figura: ano, mes, indice.)

A) select * from v1 where salto = max(salto)
B) select ano, mes, salto from v1 where salto = (select max(salto) from v1)
C) select ano, mes, salto from v1
D) select ano, mes, salto from v1 where salto = max(v1.salto)
E) select ano, mes, salto from v1 where salto > 0

**Gabarito: B.** Função de agregação não pode ficar direto no WHERE (A e D); a forma correta compara com uma subconsulta escalar que devolve o máximo, e o "= (select max...)" traz todos os meses empatados. C devolve todos os saltos e E, só os positivos. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): em uma tabela IPCA didática (valores inventados, mesma estrutura), A e D deram "misuse of aggregate function max()" no SQLite; C devolveu as 23 linhas da view e E, 7; B devolveu exatamente os 3 meses empatados no maior salto, igual ao cálculo feito em Python (L3).

## Questão 27 (Consultas, junções e subconsultas) - FGV, STN 2024, questão 57

No contexto da tabela IPCA apresentada (colunas ano, mes, indice), assinale o comando SQL que produz, corretamente, para cada ano, o mês com o maior índice, ou meses, pois pode haver empate entre os índices de dois ou mais meses num mesmo ano.

A) select * from ipca where exists (select mes, ano from ipca x where x.ano = ipca.ano and x.indice > ipca.indice group by ano) order by ano, mês
B) select ano, mes from ipca where not exists (select mes, ano from ipca x where x.ano = ipca.ano and x.indice > ipca.indice) order by ano, mês
C) select ano, mes from ipca where not exists (select mes, ano from ipca x where x.ano >= ipca.ano and x.indice < ipca.indice) order by ano, mês
D) select ano, mes from ipca where exists (select * from ipca x where x.ano = ipca.ano and x.indice = ipca.indice group by mes) order by ano, mês
E) select ano, mes from ipca where exists (select mes, ano from ipca x where x.ano = ipca.ano or x.indice > ipca.indice)

**Gabarito: B.** É o padrão "máximo por grupo" sem função de janela: um mês é o maior do ano se NÃO EXISTE outro mês do mesmo ano com índice maior. Ele devolve todos os empatados. A e E dizem o oposto (existe maior, ou usam OR e cobrem linhas de outros anos). D casa cada mês com ele mesmo (sempre existe). C compara anos com >= e índices com <, o que não isola o máximo do ano. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): na tabela IPCA didática o resultado correto tinha 4 linhas (nov/22, dez/22, jan/23 e fev/23, em empate); B devolveu esses 4; A devolveu 20, C devolveu 3 e D e E devolveram 24 no SQLite; no PostgreSQL, A e D dão erro de GROUP BY (L3).

## Questão 28 (Consultas, junções e subconsultas) - FGV, STN 2024, questão 58

No contexto da tabela IPCA apresentada, o comando SQL a seguir produz o índice acumulado a cada ano, que é obtido pela multiplicação acumulativa de um conjunto de termos da forma (1 + i/100), onde i é o valor do índice em cada um dos doze meses de cada ano.

select
 Y.ano,
 (1+ m1.indice/100) * (1+ m2.indice/100) * ... * (1+ m12.indice/100) índice
from IPCA m1, IPCA m2, ..., IPCA m12,
 . . . . . . . .  Y
where
 m12.mes =12 and m11.mes=11 and ... and m1.mes=1
 and m12.ano = m11.ano and ... and m2.ano = m1.ano
 and m1.ano = Y.ano
order by 1

(O comando foi abreviado com reticências; a prova lista os 12 aliases m1 a m12.) Assinale o trecho que deve substituir o trecho pontilhado do comando acima, de modo que o cálculo e a apresentação sejam produzidos corretamente.

A) (select ano - 2021 as ano from IPCA)
B) (select ano from IPCA)
C) (select distinct ano from IPCA)
D) (select distinct ano, mes from IPCA)
E) select distinct ano from IPCA

**Gabarito: C.** A tabela derivada Y precisa listar cada ano uma única vez: (select distinct ano from IPCA) Y. Sem DISTINCT (B), o ano se repete uma vez por mês e o produto sai 12 vezes. A subtrai 2021 (os anos deixam de casar). D traz o mês também e cada ano apareceria 12 vezes. E é um SELECT sem parênteses: uma tabela derivada na cláusula FROM exige parênteses. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): C devolveu 1 linha por ano (2 linhas); B e D, 24; A, 0; E deu "syntax error". Os valores numéricos diferem entre SQLite e PostgreSQL (divisão inteira no SQLite quando a coluna guarda inteiros); force o tipo decimal com 100.0.

## Questão 29 (Consultas, junções e subconsultas) - FGV, STN 2024, questão 59

No contexto da tabela IPCA apresentada, considere que ocorreu um acidente que fez com que diversas linhas dessa tabela tenham sido aleatoriamente deletadas, embora todos os índices dos meses de 2023 tenham permanecido intactos e nenhum dos anos tenha sido completamente deletado. Analise as três versões de SQL que, pretensamente, poderiam recompor a tabela corretamente, inserindo os meses deletados com o valor nulo na coluna indice.

I.
insert into IPCA(indice, ano, mes)
select NULL, a.ano, a.mes
from (select distinct ano, mes from IPCA) a
where not exists
 (select * from IPCA x
  where x.ano = a.ano and x.mes = a.mes)

II.
insert into IPCA(indice, ano, mes)
select NULL, a.ano, b.mes
from (select distinct ano from IPCA) a,
     (select distinct mes from IPCA) b
where not exists
 (select * from IPCA x
  where x.ano = a.ano and x.mes = b.mes)

III.
insert into IPCA(indice, ano, mes)
select NULL, a.ano, a.mes
from IPCA a
where a.ano * 100 + a.mes not in
 (select x.mes + x.ano * 100 from IPCA x)

A respeito da adequação desses comandos ao que se pretende, é correto concluir que

A) nenhum seria adequado.
B) somente I seria adequado.
C) somente II seria adequado.
D) somente III seria adequado.
E) todos seriam adequados.

**Gabarito: C.** Para achar o que FALTA é preciso gerar o universo (todos os anos × todos os meses) e subtrair o que existe. Só a versão II faz o produto cartesiano de anos e meses (a × b) e insere os pares ausentes. I e III partem das próprias linhas existentes e procuram, nelas, linhas que não estão nelas: a condição nunca é verdadeira e nada é inserido. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): em 24 linhas com 4 apagadas, I e III inseriram 0 linhas e II inseriu 4, com indice NULL, completando 24 (L3).

## Questão 30 (Consultas, junções e subconsultas) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 114

Julgue o item a seguir.

Quando utilizado o comando SELECT, podem-se incluir várias subqueries internas na mesma instrução.


**Gabarito: C.** (Certo) Item certo. Subconsultas (subqueries) podem aparecer em várias posições da mesma instrução: lista do SELECT (escalar), cláusula FROM (tabela derivada), WHERE (IN, EXISTS, comparações) e HAVING, e podem ser aninhadas. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): as consultas do L2 e do L3 usam subconsultas escalares, correlacionadas, em IN, em NOT IN e em EXISTS.

## Questão 31 (Restrições, chaves e NULL) - FCC, TRT-22 (PI) 2022, questão 23

Considere que em um banco de dados Oracle 19c, aberto e funcionando em condições ideais, um Técnico está criando a tabela TRTFunc, utilizando a instrução abaixo.

CREATE TABLE TRTFunc
( NroMatricula numeric(10) NOT NULL,
  NomeFunc varchar2(100) NOT NULL,
  Telefone varchar2(50),
  CONSTRAINT I
);

Para criar uma restrição, cujo nome seja matricula_unica, de forma que os campos NroMatricula e NomeFunc sejam únicos, a lacuna I deve ser corretamente preenchida com

A) UNIQUE matricula_unica (NroMatricula, NomeFunc)
B) matricula_unica UNIQUE (NroMatricula AND NomeFunc)
C) UNIQUE (NroMatricula, NomeFunc) AS matricula_unica
D) matricula_unica UNIQUE (NroMatricula, NomeFunc)
E) matricula_unica UNIQUE (NroMatricula) UNIQUE (NomeFunc)

**Gabarito: D.** Restrição de tabela nomeada segue CONSTRAINT nome TIPO (colunas): aqui, CONSTRAINT matricula_unica UNIQUE (NroMatricula, NomeFunc). A lista de colunas vira uma restrição composta: é o PAR que não pode repetir. A inverte nome e tipo; B usa AND, que não cabe na lista de colunas; C usa "AS" (que não existe em restrições); E cria duas restrições separadas e sem nome. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): a forma D criou a restrição, uma repetição do mesmo par deu "duplicate key value violates unique constraint matricula_unica" e a mesma matrícula com nome diferente passou (L1). Dialeto: Oracle na prova (a sintaxe de CONSTRAINT é padrão e igual no PostgreSQL).

## Questão 32 (Restrições, chaves e NULL) - FCC, TRT-22 (PI) 2022, questão 24

Considere que um Técnico está trabalhando em um banco de dados PostgreSQL aberto e funcionando em condições ideais. O Técnico inseriu a seguinte sequência de comandos:

DROP TABLE I TRTContatos;
CREATE TABLE TRTContatos(
  II  codigo  PRIMARY KEY,
  orgao VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

Para que uma eventual tabela TRTContatos anterior seja excluída e que o campo codigo seja preenchido automaticamente com números sequenciais a partir de 1, as lacunas I e II devem ser, correta e respectivamente, preenchidas com

A) ALL ROWS − COUNT UP
B) IF EXISTS − SERIAL
C) IF EXISTS − SEQUENTIAL
D) ALL RECORDS − COUNT UP
E) ALL RECORDS − SERIAL

**Gabarito: B.** DROP TABLE IF EXISTS não gera erro se a tabela não existir (útil em scripts). SERIAL é o pseudo-tipo do PostgreSQL que cria uma sequência (inteiro autoincremental, a partir de 1). As demais (ALL ROWS, ALL RECORDS, COUNT UP, SEQUENTIAL) não existem. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o script L1 executou a sequência no PostgreSQL 18.4 e mostrou que SERIAL cria uma sequence própria. (No PostgreSQL moderno, GENERATED ... AS IDENTITY é o recurso padrão SQL equivalente.)

## Questão 33 (Restrições, chaves e NULL) - FCC, TRT-22 (PI) 2022, questão 26

Considere que em um banco de dados SQL Server, aberto e funcionando em condições ideais, um Técnico está criando a tabela TRTFunc, utilizando a instrução abaixo.

CREATE TABLE TRTFunc
( NroMatricula INT IDENTITY PRIMARY KEY,
  NomeFunc varchar(255) NOT NULL,
  Salario DEC(10,2) CONSTRAINT I
);

Para criar uma restrição, cujo nome seja valor_positivo, de forma que o campo Salario deva ser positivo e maior que zero, a lacuna I deve ser corretamente preenchida com

A) valor_positivo IS (Salario > 0)
B) CHECK (Salario > 0) AS valor_positivo
C) valor_positivo CHECK (Salario > 0)
D) VALIDATE valor_positivo CHECK (Salario > 0)
E) valor_positivo VALIDATE (Salario > 0)

**Gabarito: C.** CHECK declara uma condição que toda linha deve satisfazer; nomeada, fica CONSTRAINT valor_positivo CHECK (Salario > 0). IS, AS e VALIDATE não fazem parte da sintaxe. Cuidado com NULL: o CHECK só rejeita quando a condição é FALSA, e com NULL ela é UNKNOWN, então a linha passa. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): (dialeto: SQL Server na prova; a restrição CHECK nomeada é igual no PostgreSQL e no SQLite) um salário negativo foi rejeitado com "violates check constraint valor_positivo" e um salário NULL foi aceito (L1).

## Questão 34 (Restrições, chaves e NULL) - FCC, TRT-3 (MG) 2015, questão 48

Um técnico de TI adicionou por engano, no PL/SQL, uma constraint CHECK chamada chkAnoProcesso na tabela processo para que o campo anoInicioProcesso permita apenas valores maiores do que 1980. Para remover essa constraint o técnico deve utilizar a instrução:

A) ALTER TABLE processo DROP CHECK chkAnoProcesso;
B) DROP CONSTRAINT chkAnoProcesso FROM processo;
C) DROP CHECK chkAnoProcesso FROM processo;
D) ALTER TABLE processo DROP CONSTRAINT chkAnoProcesso;
E) DELETE FROM processo DROP CHECK chkAnoProcesso;

**Gabarito: D.** Restrições são alteradas com ALTER TABLE ... DROP CONSTRAINT nome (padrão SQL, Oracle e PostgreSQL). "DROP CHECK" existe só no MySQL 8.0.16+ (como ALTER TABLE ... DROP CHECK nome), mas a prova é de PL/SQL (Oracle). B, C e E misturam DROP, FROM e DELETE de forma inválida. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): no PostgreSQL, D removeu a restrição e "DROP CHECK" deu "syntax error at or near CHECK"; no SQLite, nem DROP CONSTRAINT existe (L1).

## Questão 35 (Restrições, chaves e NULL) - FCC, TRT-2 (SP) 2018, questão 45

Considere que um Técnico de TI deseja criar as tabelas abaixo em um banco de dados PostgreSQL 8 aberto e em condições ideais.

CREATE TABLE departamento (
  codDep varchar(10) primary key,
  local point
);
CREATE TABLE funcionario (
  codDep varchar(10)  I  ,
  salario real,
  dataAdm date
);

Para que codDep na tabela funcionario seja definido como chave estrangeira com relação à tabela departamento, a lacuna I deve ser preenchida com

A) foreign key departamento(codDep)
B) constraint foreign key REF departamento(codDep)
C) foreign key IN departamento(codDep)
D) constraint departamento(codDep)
E) references departamento(codDep)

**Gabarito: E.** Na declaração da própria coluna, a chave estrangeira é escrita com REFERENCES tabela(coluna). A forma FOREIGN KEY (coluna) REFERENCES tabela(coluna) só serve como restrição de tabela, depois da lista de colunas. As alternativas A, B, C e D misturam palavras que não existem (REF, IN) ou omitem REFERENCES. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): E criou a chave estrangeira; "foreign key departamento(coddep)" deu "syntax error at or near foreign" e "constraint departamento(coddep)" deu "syntax error at or near (". Um departamento inexistente foi recusado e apagar o pai com filhos também (ação padrão NO ACTION) (L1).

## Questão 36 (Restrições, chaves e NULL) - FCC, TRT-22 (PI) 2022, questão 26

Considere que um Analista está trabalhando em um banco de dados PostgreSQL aberto e funcionando em condições ideais. O Analista inseriu a seguinte sequência de comandos:

DROP TABLE I TRTContatos;
CREATE TABLE TRTContatos (
  cod serial PRIMARY KEY,
  orgao VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  descricao VARCHAR(255)
);
INSERT INTO TRTContatos (orgao, email) VALUES
 ('Ouvidoria','ouvidoria@trt22.jus.br:'),
 ('Escola Judicial','ejud@trt22.jus.br'),
 ('Corregedoria','secor@trt22.jus.br')
 II ;

É correto afirmar que

A) haverá erro, pois não é possível fazer inserção de múltiplas linhas em tabelas do PostgreSQL.
B) haverá erro devido ao fato de as 3 linhas a serem inseridas na tabela TRTContatos não terem os 4 campos informados em CREATE TABLE.
C) I deve ser preenchido com IF EXISTS e II deve ser preenchido com RETURNING * para que as linhas inseridas sejam apresentadas.
D) I deve ser preenchido com ALL ROWS e II deve ficar sem nenhum preenchimento.
E) faltou um _ entre cod e serial, pois o certo seria cod_serial PRIMARY KEY.

**Gabarito: C.** O INSERT com várias linhas (VALUES (...), (...), (...)) é aceito pelo PostgreSQL. Pode-se listar só as colunas que vai preencher: cod (serial) recebe o valor da sequência e descricao fica NULL. RETURNING * devolve as linhas inseridas (com os cod gerados), e DROP TABLE IF EXISTS evita erro numa tabela inexistente. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o script L1 executou essa sequência no PostgreSQL 18.4 e devolveu 3 linhas com cod 1, 2, 3 e descricao NULL; "cod_serial PRIMARY KEY" deu "syntax error at or near PRIMARY".

## Questão 37 (Restrições, chaves e NULL) - FGV, STN 2024, questão 62

No contexto da lógica de três estados, normalmente usada em expressões lógicas que envolvem valores nulos, considere uma tabela relacional exemplo com colunas A, B, C, com apenas uma linha, cujos valores das colunas são, respectivamente, 10, 20 e null, além do comando SQL a seguir.

select
 case when (not C is null or B = 15)
  then 1 else 0 end x1,
 case when not (not C is null or B = 15)
  then 1 else 0 end y1,
 case when (C = null or B <> null)
  then 1 else 0 end x2,
 case when not (C = null or B <> null)
  then 1 else 0 end y2,
 case when (C < A or C > A)
  then 1 else 0 end x3,
 case when not (C < A or C > A)
  then 1 else 0 end y3
from exemplo

Assinale os valores do resultado da execução do comando acima, na ordem das colunas x1, y1, x2, y2, x3, y3.

A) 0, 0, 0, 0, 0, 1
B) 0, 1, 0, 0, 0, 0
C) 0, 1, 0, 1, 0, 1
D) 0, 1, 1, 0, 1, 0
E) 0, 1, 1, 1, 0, 0

**Gabarito: B.** CASE WHEN só escolhe o ramo THEN quando a condição é VERDADEIRA; FALSO e UNKNOWN caem no ELSE. x1: "not C is null" é falso e B=15 é falso, logo falso: 0. y1 é a negação de um falso, verdadeiro: 1. x2: C = null é UNKNOWN (comparar com NULL nunca é verdadeiro) e B <> null também; UNKNOWN OR UNKNOWN = UNKNOWN: 0. y2: NOT UNKNOWN = UNKNOWN, então 0 (não 1). x3 e y3: C  A são UNKNOWN, logo 0 e 0. Resultado: 0, 1, 0, 0, 0, 0. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o comando foi executado no PostgreSQL e no SQLite e devolveu 0, 1, 0, 0, 0, 0 nos dois (L4), que traz também a tabela-verdade do UNKNOWN, COUNT com NULL e a armadilha do NOT IN.

## Questão 38 (Índices e otimização) - FGV, STN 2024, questão 67

Os gerenciadores de bancos de dados relacionais empregam técnicas de otimização de consultas e operações SQL. Dada uma expressão lógica, especificada por meio dessa linguagem, os gerenciadores buscam estabelecer a melhor estratégia para executar o comando SQL e produzir o resultado desejado.

No contexto da execução eficiente de uma consulta, assinale a definição correta para o conceito de Query Plan (Plano de Consulta).

A) A execução monitorada da consulta, de modo a identificar um padrão de desempenho em termos de recursos e tempo.
B) A identificação do conjunto de índices e chaves estrangeiras existentes no banco de dados que podem ser empregados na execução da consulta.
C) Um conjunto de informações sobre tabelas, índices e ordenações do banco de dados, que possivelmente podem ser empregadas na execução da consulta.
D) Uma amostra reduzida e representativa dos dados do banco de dados que permite avaliar uma consulta rapidamente.
E) Uma sequência de operações para a execução da consulta acompanhada de uma previsão de tempo/espaço com os recursos disponíveis no banco de dados.

**Gabarito: E.** O plano de consulta é a sequência de operações escolhida pelo otimizador (varredura sequencial, uso de índice, tipo de junção, ordenação), com uma estimativa de custo (tempo e espaço). A primeira alternativa descreve outra coisa (monitoramento da execução real). Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): no PostgreSQL, EXPLAIN mostra o plano e o custo estimado sem executar, e EXPLAIN ANALYZE executa e mostra também o tempo real. No L7, a mesma consulta trocou de Seq Scan para Index Scan depois de criado o índice, e o plano mostrado pelo EXPLAIN ANALYZE mudou.

## Questão 39 (Índices e otimização) - FGV, STN 2024, questão 69

No contexto de uma Árvore B, estrutura comumente utilizada na indexação de tabelas relacionais, considere as seguintes propriedades numa Árvore B de grau g.

1. Todas as folhas estão no mesmo nível de profundidade na árvore.2. Todos os nós podem conter, no máximo, 2g - 1 chaves.3. Exceto pelo nó raiz, todos os demais nós devem conter, no mínimo, g -1 chaves.4. Para uma árvore com N chaves, a complexidade do algoritmo de inserção é O(n).5. Para uma árvore com N chaves, a complexidade do algoritmo de inserção é O(log n).

Estão corretas as afirmativas

A) 2, 3 e 4, apenas.
B) 1, 2, 3 e 5.
C) 1, 2, 4 e 5.
D) 2, 3, 4 e 5.
E) 1, 3, 4 e 5.

**Gabarito: B.** A Árvore B é balanceada: todas as folhas ficam no mesmo nível (1) e, com grau g, cada nó guarda no máximo 2g-1 chaves (2) e, exceto a raiz, no mínimo g-1 (3). A altura cresce com o logaritmo de N, então busca e inserção custam O(log n) (5), e não O(n) (4, falsa). Por isso um índice B-tree acelera buscas por igualdade e por faixa. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L7 mostra que a busca por chave passou de Seq Scan (lê a tabela toda) para Index Scan (poucas páginas) quando existe um índice B-tree, e que funções sobre a coluna (não sargável) impedem o uso do índice.

## Questão 40 (PostgreSQL e MySQL) - FCC, TRT-1 (RJ) 2014, questão 47

No sistema gerenciador de Banco de Dados PostgreSQL (v. 9.1), a forma para se declarar um atributo com o tipo de dados Array, com duas dimensões, tendo o nome teste é

A) . . . teste [ [ ] ] . . .
B) . . . teste 2 [ ] . . .
C) . . . teste [ 2 ] . . .
D) . . . teste [ ] [ ] . . .
E) . . . teste [ ] x [ ] . . .

**Gabarito: D.** O PostgreSQL declara arrays acrescentando colchetes ao tipo; para duas dimensões, dois pares de colchetes: teste integer[][] (ou ARRAY[][]). Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): no PostgreSQL 18.4, "integer[][]" resultou em duas dimensões no catálogo (attndims = 2), enquanto a alternativa C (integer[2]) foi aceita, mas registrada com uma só dimensão (attndims = 1); as demais deram "syntax error". Observação didática: o PostgreSQL não impõe o número de dimensões nem o tamanho declarado, que servem como documentação; o gabarito oficial é D (L12).

## Questão 41 (PostgreSQL e MySQL) - FCC, TRT-2 (SP) 2014, questão 36

O MySQL suporta dois tipos diferentes de tabelas: tabelas seguras com transação e tabelas não seguras com transação. Nas tabelas seguras com transação, mesmo se o MySQL falhar ou se houver problemas com hardware, os dados normalmente podem ser recuperados. Além disso, é possível combinar muitas instruções e aceitar todas de uma vez com o comando COMMIT. Já as tabelas não seguras com transação, além de serem mais rápidas, não possuem nenhuma sobrecarga de transação, além de usarem menos espaço em disco e menos memória para as atualizações.

É um tipo de tabela segura com transação:

A) InnoDB.
B) HEAP.
C) ISAM.
D) MERGE.
E) MyISAM.

**Gabarito: A.** InnoDB é o mecanismo de armazenamento transacional do MySQL (ACID, COMMIT/ROLLBACK, chaves estrangeiras, bloqueio por linha) e é o padrão desde o MySQL 5.5. MyISAM, HEAP (MEMORY) e MERGE não são transacionais; ISAM é o antecessor do MyISAM. Não testado: o laboratório não tem MySQL. O mesmo conceito de transação (COMMIT/ROLLBACK) foi executado no PostgreSQL (L6).

## Questão 42 (DW, BI e modelagem dimensional) - FCC, TRT-3 (MG) 2015, questão 52

A modelagem multidimensional é utilizada especialmente para sumarizar e reestruturar dados e apresentá-los em visões que suportem a análise dos valores desses dados. Um modelo multidimensional é formado por dimensões, e por uma coleção de itens de dados composta de dados de medidas e de contexto, denominada

A) slice.
B) fato.
C) versão.
D) schema.
E) pivot.

**Gabarito: B.** A tabela fato guarda as medidas (valores numéricos analisados, como quantidade e valor) e as chaves das dimensões que dão o contexto (quem, o quê, quando, onde). Slice é um corte do cubo e pivot, uma rotação da visão (operações OLAP); schema é o desenho (estrela ou floco de neve). Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L9 montou um esquema estrela com fato_venda e dimensões de tempo, produto e loja e consultou por dimensão.

## Questão 43 (DW, BI e modelagem dimensional) - FCC, TRT-3 (MG) 2015, questão 53

Um técnico de TI precisa utilizar um subconjunto de dados de um Data Warehouse direcionado à área administrativa de um Tribunal. Esses dados serão armazenados em um banco de dado modelado multidimensionalmente, que será criado capturando-se dados diretamente de sistemas transacionais, buscando as informações relevantes para os processos de negócio da área administrativa. Esse banco de dados será um

A) OLAP.
B) MOLAP.
C) Data Mining.
D) Big Data.
E) Data Mart.

**Gabarito: E.** Um Data Mart é um subconjunto do DW (ou um repositório departamental) voltado a uma área de negócio, aqui a administrativa. OLAP é a categoria de processamento analítico e MOLAP, o armazenamento multidimensional; Data Mining é a descoberta de padrões; Big Data é um conceito de volume e variedade, não um tipo de repositório departamental.

## Questão 44 (DW, BI e modelagem dimensional) - FCC, TRT-22 (PI) 2022, questão 27

Na modelagem multidimensional de um Data Warehouse, há dois modelos que são mais utilizados. O primeiro deles é um schema no qual somente a tabela fato e as tabelas de dimensões a ela relacionadas estão nele contidas e não é usada normalização; nesse schema, poucas junções com chave estrangeira são usadas e há menos redundância de dados. O segundo é um schema no qual a tabela fato, bem como as tabelas de dimensões e as tabelas de outras hierarquias (subdimensões) relacionadas estão nele contidas; nesse schema há mais junções com chaves estrangeiras e pode haver uma maior redundância de dados.

O primeiro e o segundo schemas são, correta e respectivamente, denominados

A) non-hierarchical tree e hierarchical tree.
B) top-down clustered e bottom-up clustered.
C) star e snowflake.
D) bottom-up clustered e top-down clustered.
E) snowflake e star.

**Gabarito: C.** Esquema estrela (star): fato no centro e dimensões desnormalizadas, poucas junções. Floco de neve (snowflake): dimensões normalizadas em subdimensões, mais junções e mais integridade (o enunciado diz "maior redundância" no segundo, o que o gabarito oficial aceitou). As demais são termos inventados. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L9 construiu os dois formatos e mostrou a diferença no número de junções para obter o mesmo relatório.

## Questão 45 (DW, BI e modelagem dimensional) - FGV, SEFAZ-AM 2022, questão 36

Assinale a opção que apresenta os tipos de métricas presentes nas tabelas Fato utilizadas em modelos multidimensionais.

A) Cubo e hipercubo.
B) Estrela e floco de neve.
C) Boolena, numérica e string.
D) Aditiva, não aditiva e semiaditiva.
E) Chave surrogate, dimensão e hierarquia.

**Gabarito: D.** Medidas aditivas podem ser somadas em todas as dimensões (valor da venda); semiaditivas, só em algumas (saldo de conta: soma-se entre contas, mas não ao longo do tempo); não aditivas, em nenhuma (razões, percentuais, preço unitário). Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L9 mostra a soma correta do valor de venda, o saldo que só faz sentido em uma data (somar o saldo da mesma conta em meses diferentes dá um número sem sentido) e a razão que se recalcula a partir dos componentes.

## Questão 46 (DW, BI e modelagem dimensional) - FGV, TJ-RJ 2025 (prova aplicada em 01/02/2026), questão 38

Uma corporação multinacional do setor de varejo está unificando suas plataformas de dados. O cenário atual apresenta dois desafios distintos: (1) transacional e BI: o sistema de vendas gera registros financeiros que exigem consistência estrita (ACID), e a equipe de analistas consome esses dados via painéis de BI que demandam baixa latência em consultas complexas com múltiplas junções; (2) Big Data e IA: o sistema de e-commerce gera petabytes de logs de navegação (clickstream) e dados de sensores IoT (semiestruturados), e a equipe de ciência de dados precisa acessar esses dados em formato bruto, sem a perda causada por agregações prematuras. O arquiteto precisa propor uma solução única que evite a duplicação de dados entre silos (um Data Warehouse para o BI e um Data Lake para a IA) e reduza o custo de armazenamento, mantendo a governança. Considerando os requisitos apresentados e as características das arquiteturas modernas de dados, a abordagem arquitetural e de modelagem adequada é:

A) implementar um Data Warehouse Enterprise (EDW) baseado em banco de dados relacional com modelagem normalizada (3FN) para todos os dados, garantindo a integridade referencial tanto das vendas quanto dos logs, visto que a normalização é a única forma de garantir consistência ACID em escala de petabytes;
B) adotar uma arquitetura Data Lake pura (baseada em Hadoop/HDFS ou Object Storage), utilizando a abordagem Schema-on-Read para todos os consumidores; isso atenderá à equipe de ciência de dados, e a equipe de BI deverá adaptar suas ferramentas para realizar as agregações e junções em tempo de execução, aceitando a latência inerente à varredura de arquivos brutos;
C) manter a separação física, construindo um Data Mart dimensional para cada departamento dentro de um banco relacional proprietário e utilizando ferramentas de federação de dados (Data Virtualization) para que a equipe de ciência de dados consulte o Data Mart em tempo real, evitando assim a construção de um Data Lake e garantindo que o modelo de dados seja sempre Schema-on-Write;
D) utilizar um banco de dados NoSQL orientado a documentos (como MongoDB) para centralizar tanto as vendas quanto os logs, aproveitando a flexibilidade do esquema (schemaless) para ingerir dados heterogêneos rapidamente, e resolver a necessidade de BI através de processos de desnormalização extrema, armazenando todos os dados relacionados em um único documento aninhado para evitar joins;
E) implementar uma arquitetura Lakehouse, utilizando formatos de tabela abertos (como Delta Lake ou Apache Iceberg) sobre o armazenamento de objetos; isso permite aplicar transações ACID e Schema Enforcement nos dados de vendas, enquanto se adota uma modelagem dimensional (esquema estrela) na camada "Gold" para performance de BI, mantendo os dados brutos (camada "Bronze") acessíveis para Machine Learning.

**Gabarito: E.** O Lakehouse junta o armazenamento barato e bruto do Data Lake com transações ACID e imposição de esquema (formatos abertos como Delta Lake e Iceberg), e organiza camadas (Bronze: bruto; Silver: limpo; Gold: modelado em estrela para BI). Os demais itens ou forçam um único modelo para necessidades diferentes (A e D), ou mantêm os silos (B e C). Não testado: o laboratório não executa Delta Lake nem Iceberg.

## Questão 47 (DW, BI e modelagem dimensional) - FGV, TJ-RJ 2025 (prova aplicada em 01/02/2026), questão 39

Um arquiteto de dados está projetando o Data Warehouse (DW) de uma grande rede de varejo. A tabela de fatos de vendas (Fato_Vendas) deverá ser conectada a uma dimensão de produtos. A hierarquia dos produtos é complexa e profunda: Departamento → Divisão → Categoria → Subcategoria → Produto. O DBA, preocupado com a integridade dos dados e o espaço de armazenamento, propôs que essa hierarquia fosse modelada seguindo os princípios da normalização: a tabela de produtos conteria apenas o ID da subcategoria, que apontaria para uma tabela de subcategorias, que, por sua vez, apontaria para uma tabela de categorias, e assim sucessivamente, evitando a repetição de textos descritivos em milhões de linhas de produtos. Considerando os conceitos de modelagem dimensional (Ralph Kimball) e o impacto dessa decisão na performance de consultas analíticas (OLAP), é correto afirmar que:

A) a proposta do DBA configura um esquema floco de neve (Snowflake Schema); embora economize espaço em disco e facilite a manutenção da integridade referencial, essa abordagem prejudica o desempenho das consultas de Business Intelligence (BI) ao exigir múltiplas junções (joins) para recuperar a descrição completa dos atributos hierárquicos;
B) a abordagem sugerida caracteriza um esquema estrela (Star Schema), que é o padrão recomendado pela metodologia Kimball, pois a normalização das dimensões garante que o motor de banco de dados utilize índices bitmap de forma mais eficiente, acelerando o filtro de consultas agregadas;
C) a desnormalização completa da dimensão, consolidando todos os níveis hierárquicos em uma única tabela Dim_Produto (esquema estrela), deve ser evitada em Data Warehouses modernos baseados em armazenamento colunar, pois a redundância de dados textuais impede a compressão eficiente e aumenta o I/O de disco;
D) a proposta do DBA visa a transformar o modelo dimensional em um modelo relacional de Terceira Forma Normal (3FN), o que inviabiliza o uso de ferramentas de visualização de dados (como Power BI ou Tableau), visto que essas ferramentas são tecnicamente incompatíveis com tabelas normalizadas;
E) a tabela fato, tanto no esquema estrela quanto no floco de neve, deve ser normalizada para evitar a duplicação de métricas; a diferença reside apenas no fato de que o esquema floco de neve utiliza chaves naturais (CPF, CNPJ) nas junções, enquanto o esquema estrela exige o uso de chaves substitutas (Surrogate Keys).

**Gabarito: A.** Normalizar a dimensão em tabelas encadeadas é o esquema floco de neve: economiza espaço e preserva a integridade, mas exige várias junções para recuperar a hierarquia, o que pesa nas consultas de BI. Kimball recomenda dimensões desnormalizadas (estrela). B erra ao dizer que a normalização é característica da estrela; C erra ao dizer que a desnormalização deve ser evitada (a compressão colunar lida bem com a repetição); D e E afirmam incompatibilidades que não existem. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L9 comparou os dois esquemas: o floco de neve precisou de mais junções para o mesmo relatório.

## Questão 48 (DW, BI e modelagem dimensional) - FGV, TJ-RJ 2025 (prova aplicada em 01/02/2026), questão 40

Um time está iniciando a migração de dados de um sistema transacional (OLTP) legado para um novo Data Warehouse (DW) corporativo. O sistema legado possui um modelo de dados altamente normalizado, atendendo à Terceira Forma Normal (3FN), o que garante a integridade das transações diárias. No entanto, para o novo ambiente analítico, cujo foco é a geração de relatórios gerenciais e painéis de BI com alto volume de leitura, o arquiteto decidiu aplicar técnicas de desnormalização intencional em algumas tabelas, consolidando dados de produtos e categorias em uma única estrutura dimensional. Considerando os impactos dessa decisão de projeto e os fundamentos da modelagem de dados, é correto afirmar que:

A) a desnormalização tem como objetivo principal otimizar as operações de escrita (inserts e updates), pois, ao repetir os dados em uma única tabela, o banco de dados elimina a necessidade de verificar restrições de integridade referencial em múltiplas tabelas;
B) a estratégia adotada visa a reduzir a quantidade de junções (joins) necessárias durante as consultas analíticas, melhorando o desempenho de leitura, embora isso acarrete aumento do espaço de armazenamento e risco de anomalias de atualização;
C) a manutenção do modelo na Terceira Forma Normal (3FN) seria a escolha ideal para o Data Warehouse, pois a normalização maximiza a performance de consultas de agregação ao garantir que os dados não estejam duplicados, facilitando a leitura sequencial do disco;
D) desnormalização é um requisito obrigatório para bancos de dados NoSQL, mas é tecnicamente inviável em bancos de dados relacionais (SQL), visto que estes não suportam a existência de redundância de dados dentro de uma mesma tabela;
E) ao desnormalizar as tabelas, o arquiteto está transformando o modelo em um esquema floco de neve (Snowflake), que é caracterizado justamente pelo uso de tabelas de dimensão únicas e planas, contendo todos os atributos descritivos sem relacionamentos hierárquicos externos.

**Gabarito: B.** Desnormalizar é duplicar dados de propósito para evitar junções: a leitura fica mais rápida, ao custo de mais espaço e do risco de anomalias de atualização (o mesmo dado em vários lugares). A erra ao dizer que melhora a escrita (piora); C inverte a lógica; D é falsa (SQL aceita redundância; ela só é indesejável); E descreve a estrela, não o floco de neve. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L5 mostra as anomalias de atualização e inserção da tabela não normalizada, e o L9 mostra que a dimensão desnormalizada (estrela) responde à mesma pergunta com uma junção a menos que a normalizada (floco de neve).

## Questão 49 (DW, BI e modelagem dimensional) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 116

Julgue o item a seguir.

Em um data warehouse, a ocorrência de deadlocks causados por grande fluxo de dados é um fator crítico para o desempenho.


**Gabarito: E.** (Errado) Item errado. O DW é voltado a leituras analíticas em grande volume (cargas em lote, consultas pesadas), com poucas escritas concorrentes: não há o padrão de muitas transações curtas de atualização que causa deadlocks no OLTP. O fator crítico de desempenho no DW é o tempo de carga (ETL) e das consultas de agregação, tratados com modelagem dimensional, índices e particionamento. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o deadlock provocado em OLTP está no L6, não no L9.

## Questão 50 (NoSQL e CAP) - FGV, SEFAZ-AM 2022, questão 34

Com relação ao teorema CAP e suas propriedades aplicadas ao contexto de bancos de dados NoSQL na Web, analise as afirmativas a seguir.

I. Consistência é a garantia de o sistema devolverá a resposta correta a cada requisição de dados que atender, ou seja, os dados devolvidos serão os mais atualizados que estejam disponíveis.II. Atomicidade é a garantia de que toda requisição recebida pelo sistema em um nó não falho, será respondida o mais isoladamente possível.III. Performance é a garantia de que o sistema continue operante mesmo no caso da ocorrência de uma falha que isole os nós em grupos, e que os nós não consigam se comunicar com os demais do grupo.

Está correto o que se afirma em

A) I, apenas.
B) II, apenas.
C) III, apenas.
D) I e II, apenas.
E) II e III, apenas.

**Gabarito: A.** CAP significa Consistency, Availability e Partition tolerance. Só a I está correta (consistência: toda leitura devolve a escrita mais recente). A II troca Availability (disponibilidade: todo nó não falho responde) por "atomicidade", e a III troca Partition tolerance (o sistema continua operando com partição de rede) por "performance". Com partição de rede inevitável, a escolha prática é entre CP e AP. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): o L10 simula um modelo de chave-valor, um de documentos (JSONB com índice GIN), um de colunas e um de grafos (consulta recursiva); a escolha CP/AP não foi simulada.

## Questão 51 (NoSQL e CAP) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 113

Julgue o item a seguir.

Um dos objetivos do sharding de arquivos em bancos de dados NoSQL é melhorar o balanceamento de carga entre os nós da aplicação.


**Gabarito: C.** (Certo) Item certo. Sharding particiona os dados horizontalmente entre vários nós (por faixa ou por hash de uma chave), distribuindo leituras e escritas e permitindo escalar horizontalmente. O ganho depende de uma boa chave de partição (uma chave ruim cria "hot spots"). Não testado: o laboratório não executa MongoDB, Redis nem Cassandra; os modelos de dados equivalentes foram reproduzidos no PostgreSQL (L10).

## Questão 52 (Modelagem ER e modelos) - FGV, STN 2024, questão 70

Com relação aos modelos de dados em aplicações de bancos de dados, a prática adotada em muitos casos é um modelo progressivo, baseado em níveis de abstração. Assinale esses níveis, na ordem em que são usualmente empregados nessa estratégia.

A) Modelo conceitual – Modelo funcional – Modelo físico.
B) Modelo conceitual – Modelo lógico – Modelo físico.
C) Modelo funcional – Modelo conceitual – Modelo lógico.
D) Modelo funcional – Modelo lógico – Modelo físico.
E) Modelo lógico – Modelo físico – Modelo funcional.

**Gabarito: B.** A modelagem avança do mais abstrato ao mais concreto: o modelo conceitual (entidades e relacionamentos, sem tecnologia, em geral o MER) vem primeiro; o lógico traduz para o modelo do SGBD (tabelas, colunas e chaves do modelo relacional, com normalização); o físico define tipos, índices, partições e armazenamento do produto escolhido. "Funcional" não é um nível de modelagem de dados. Laboratório (executado em PostgreSQL 18.4 e SQLite 3.46.1): os scripts L1 e L5 percorrem o caminho do modelo lógico (tabelas, chaves, normalização) ao físico (tipos, restrições e índices em um SGBD real).
