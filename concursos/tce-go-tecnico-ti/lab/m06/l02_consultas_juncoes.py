# -*- coding: utf-8 -*-
# L2: consultas, juncoes e subconsultas. Executa, em SQLite e em PostgreSQL, as alternativas das questoes TRT-5/2022 (Analista e Tecnico), TRT-2/2014, TRT-2/2018 e TRT-3/2015.
from common import *

def go(D):
    D.run("CREATE TABLE departamento (nomedepartamento VARCHAR(50) PRIMARY KEY, telefonedepartamento VARCHAR(15), localdepartamento VARCHAR(40))", show=False)
    D.run("CREATE TABLE funcionario (emailfuncionario VARCHAR(50) PRIMARY KEY, nomefuncionario VARCHAR(70), telefonefuncionario VARCHAR(15), nomedepartamento VARCHAR(50) REFERENCES departamento(nomedepartamento))", show=False)
    D.run("CREATE TABLE login (emailfuncionario VARCHAR(50) PRIMARY KEY REFERENCES funcionario(emailfuncionario), senha VARCHAR(50))", show=False)
    D.ins('departamento', [('TI','111','Bloco A'),('RH','222','Bloco B'),('Juridico','333','Bloco C')])
    D.ins('funcionario', [('ana@x.br','Ana','9','TI'),('bia@x.br','Bia','8','TI'),('caio@x.br','Caio','7','RH')])
    D.ins('login', [('ana@x.br','s1'),('bia@x.br','s2'),('caio@x.br','s3')])
    print('\nDados didaticos criados pelo laboratorio, com a mesma estrutura do modelo da prova (TRT-5 2022, Analista, Q21 a Q25).')
    D.run("SELECT * FROM departamento ORDER BY 1")

    sub('TRT-5 2022 Analista Q22: nome de cada departamento e quantidade de funcionarios (gabarito D)')
    alts = {
    'A': "SELECT f.nomedepartamento, (SELECT COUNT(f.nomefuncionario) FROM funcionario f WHERE f.nomedepartamento = d.nomedepartamento) FROM departamento d",
    'B': "SELECT f.nomedepartamento, (SELECT COUNT(f.nomefuncionario) FROM funcionario f WHERE d.nomedepartamento = f.nomedepartamento) AS quantidade_funcionarios FROM departamento d GROUP BY f.nomedepartamento",
    'C': "SELECT d.nomedepartamento, COUNT(f.nomefuncionario) FROM funcionario f, departamento d",
    'D': "SELECT d.nomedepartamento, (SELECT COUNT(f.nomefuncionario) FROM funcionario f WHERE d.nomedepartamento = f.nomedepartamento) AS quantidade_funcionarios FROM departamento d GROUP BY d.nomedepartamento ORDER BY 1",
    'E': "SELECT d.nomedepartamento, COUNT(f.nomefuncionario) FROM funcionario f, departamento d WHERE d.nomedepartamento = f.nomedepartamento",
    }
    for k, q in alts.items():
        print('\n[alternativa %s]' % k); D.run(q)

    sub('TRT-5 2022 Analista Q23: nome, departamento e senha de todos os funcionarios, sem repeticao (gabarito E; esperado: 3 linhas)')
    alts = {
    'A': "SELECT f.nomefuncionario, d.nomedepartamento, l.senha FROM login l, funcionario f, departamento d GROUP BY f.nomefuncionario",
    'B': "SELECT f.nomefuncionario, d.nomedepartamento, l.senha FROM login l, funcionario f, departamento d WHERE f.nomedepartamento = d.nomedepartamento OR f.emailfuncionario = l.emailfuncionario",
    'C': "SELECT f.nomefuncionario, d.nomedepartamento, (SELECT l.senha FROM login l WHERE f.emailfuncionario = l.emailfuncionario) as senha FROM funcionario f, departamento d",
    'D': "SELECT f.nomefuncionario, d.nomedepartamento, l.senha FROM login l, funcionario f, departamento d",
    'E': "SELECT f.nomefuncionario, f.nomedepartamento, (SELECT l.senha FROM login l WHERE f.emailfuncionario = l.emailfuncionario) as senha FROM funcionario f",
    }
    for k, q in alts.items():
        r = D.run(q, show=False); print('[alternativa %s] -> %s' % (k, ('%d linhas' % len(r)) if isinstance(r, list) else r))
    print(); D.run(alts['E'] + ' ORDER BY 1')

    sub('TRT-2 2014 Tecnico Q39: nome do funcionario e do departamento (gabarito D)')
    D.run("CREATE TABLE d2 (depno INTEGER PRIMARY KEY, dnome TEXT, dlocal TEXT)", show=False)
    D.run("CREATE TABLE f2 (funno INTEGER PRIMARY KEY, depno INTEGER REFERENCES d2(depno), fnome TEXT, fcargo TEXT, fsal NUMERIC)", show=False)
    D.ins('d2', [(1,'TI','Brasilia'),(2,'RH','Goiania')])
    D.ins('f2', [(1,1,'Ana','analista',9000),(2,1,'Bia','analista de sistemas',8000),(3,2,'Caio','tecnico',5000),(4,2,'Dora','analista',7000)])
    print('[alternativa A / E: sem condicao de juncao = produto cartesiano, 2 x 4 = 8 linhas]')
    r = D.run("select f.fnome, d.dnome from f2 f, d2 d", show=False); print('%d linhas' % len(r))
    print('[alternativa B]'); D.run("select fnome, dnome from f2, d2 where depno = depno")
    print('[alternativa D]'); D.run("select f.fnome, d.dnome from f2 f, d2 d where f.depno = d.depno ORDER BY 1")

    sub('TRT-2 2014 Tecnico Q40: media e soma dos salarios dos cargos iniciados por "anali" (gabarito C)')
    for k, q in {'A': "select avg(fsal),sum(fsal) from f2 where fcargo='anali%'",
                 'B': "select average(fsal),sum(fsal) from f2 where fcargo like 'anali'",
                 'C': "select avg(fsal),sum(fsal) from f2 where fcargo like 'anali%'",
                 'D': "select avg(fsal),sum(fsal) from f2 where fcargo begin 'anali'",
                 'E': "select avg(fsal),sum(fsal) from f2 where fcargo like 'anali*'"}.items():
        print('[alternativa %s]' % k); D.run(q)

    sub('TRT-2 2018 Tecnico Q44: departamentos 10 ou 20, ordem alfabetica crescente por nome (gabarito A)')
    D.run("CREATE TABLE func (nome TEXT, coddep INTEGER)", show=False)
    D.ins('func', [('Zeca',10),('Ana',20),('Bia',30),('Caio',10)])
    for k, w in {'A': "codDep IN (10,20) ORDER BY nome ASC", 'B': "codDep CONTAIN(10 OR 20) ORDER BY nome ASC", 'C': "codDep=10 OR codDep=20 ORDER ASC nome",
                 'D': "codDep BELONG(10 OR 20) ORDER BY nome ASCENDING", 'E': "codDep BETWEEN(10,20) ORDER BY nome ASC"}.items():
        print('[alternativa %s]' % k); D.run("SELECT nome, codDep FROM func WHERE " + w)

    sub('TRT-3 2015 Tecnico Q50: advogados SEM processo (gabarito C)')
    D.run("CREATE TABLE advogado (numerooabadvogado TEXT PRIMARY KEY, nomeadvogado TEXT)", show=False)
    D.run("CREATE TABLE advogado_processo (numerooabadvogado TEXT, numeroprocesso TEXT, tipoatuacao TEXT)", show=False)
    D.ins('advogado', [('59445','Marta'),('67812','Joao'),('34001','Paulo')])
    D.ins('advogado_processo', [('59445','000346','Acusacao'),('67812','000182','Defesa')])
    for k, q in {'A': "SELECT nomeAdvogado FROM advogado WHERE numeroOABAdvogado IS NOT(SELECT numeroOABAdvogado FROM advogado_processo)",
                 'C': "SELECT nomeadvogado FROM advogado WHERE numerooabadvogado NOT IN (SELECT numerooabadvogado FROM advogado_processo)",
                 'D': "SELECT DISTINCT nomeadvogado FROM advogado JOIN advogado_processo ON advogado.numerooabadvogado=advogado_processo.numerooabadvogado",
                 'E': "SELECT DISTINCT nomeadvogado FROM advogado WHERE nomeadvogado NOT IN (SELECT nomeadvogado FROM advogado_processo)"}.items():
        print('[alternativa %s]' % k); D.run(q)
    print('[equivalente com LEFT JOIN anti-juncao]')
    D.run("SELECT a.nomeadvogado FROM advogado a LEFT JOIN advogado_processo p ON a.numerooabadvogado = p.numerooabadvogado WHERE p.numerooabadvogado IS NULL")
    print('\n[armadilha: uma linha com NULL na subconsulta faz o NOT IN devolver NENHUMA linha]')
    D.run("INSERT INTO advogado_processo VALUES (NULL,'000999','Defesa')")
    D.run("SELECT nomeadvogado FROM advogado WHERE numerooabadvogado NOT IN (SELECT numerooabadvogado FROM advogado_processo)")
    print('[NOT EXISTS nao sofre desse problema]')
    D.run("SELECT nomeadvogado FROM advogado a WHERE NOT EXISTS (SELECT 1 FROM advogado_processo p WHERE p.numerooabadvogado = a.numerooabadvogado)")

    sub('TRT-5 2022 Tecnico Q51: cidades sem repeticao (gabarito D)')
    D.run("CREATE TABLE cadastro (nome TEXT, cidade TEXT)", show=False)
    D.ins('cadastro', [('a','Santos'),('b','Santos'),('c','Santos'),('d','Recife'),('e','Santos')])
    for k, q in {'A': "SELECT COUNT (DISTINCT Cidade) FROM Cadastro", 'B': "SELECT COUNT (MODE Cidade) FROM Cadastro", 'C': "DISPLAY UNIQUE Cidade FROM Cadastro",
                 'D': "SELECT DISTINCT Cidade FROM Cadastro ORDER BY 1", 'E': "SELECT UNIQUE Cidade FROM Cadastro"}.items():
        print('[alternativa %s]' % k); D.run(q)

h('L2. Consultas SQL, juncoes e subconsultas')
pg = PGServer('l02'); P = pg.conn(); versions(P)
h('SQLite'); go(sqlite_mem())
h('PostgreSQL'); go(P)
pg.close()
