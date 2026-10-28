# -*- coding: utf-8 -*-
"""Confere as regras de forma do padrão ofício (Manual de Redação da Presidência, 3ª ed., 2018, item 5.1).
Uso didático: confere só o que dá para checar por texto (não substitui a leitura do Manual)."""
import re,sys
MESES='janeiro fevereiro março abril maio junho julho agosto setembro outubro novembro dezembro'.split()
UF=r'(?:AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)'
def checa(texto):
    L=[l.strip() for l in texto.strip().split('\n') if l.strip()]
    r=[]
    def reg(ok,regra,det=''): r.append((ok,regra,det))
    ident=L[0]
    reg(bool(re.fullmatch(r'(OFÍCIO|AVISO|MEMORANDO)(?: CIRCULAR)? Nº \d+/\d{4}(?:/[A-Z]+)+',ident)),'Identificação: tipo em maiúsculas, Nº, número/ano/siglas',ident)
    d=L[1]
    m=re.fullmatch(r'([A-ZÁÉÍÓÚÂÊÔÃÕÇ][\wÀ-ú ]+), (1º|[2-9]|[12]\d|3[01]) de ([a-zç]+) de (\d{4})\.',d)
    reg(bool(m) and m.group(3) in MESES,'Local e data: cidade, dia sem zero (1º só no dia 1), mês minúsculo, ponto final',d)
    reg(not re.search(r', '+UF+r' ?,?',d) and not re.search(r'/'+UF,d),'Local: sem sigla da UF depois da cidade',d)
    ass=[l for l in L if l.startswith('Assunto:')]
    if ass:
        a=ass[0];n=len(a.split(':',1)[1].split())
        reg(a.endswith('.'),'Assunto: termina em ponto final',a)
        reg(3<=n<=6,'Assunto: curto (o Manual sugere de 4 a 5 palavras)',f'{n} palavras')
    else: reg(False,'Assunto: presente')
    voc=[l for l in L if re.match(r'^(Senhor|Senhora|Excelentíssimo|Excelentíssima)\b.*,$',l)]
    reg(bool(voc),'Vocativo: forma de tratamento seguida de vírgula',voc[0] if voc else 'não encontrado')
    reg(not any(re.search(r'Digníssimo|Ilustríssimo|\bDD\b|\bIlmo',l) for l in L),'Sem Digníssimo/Ilustríssimo (abolidos)','')
    fechos=[l for l in L if l in ('Respeitosamente,','Atenciosamente,')]
    reg(bool(fechos),'Fecho: apenas Respeitosamente, ou Atenciosamente,',fechos[0] if fechos else 'outro fecho ou ausente')
    nome=L[-2] if len(L)>2 else ''
    reg(nome.isupper() and '*' not in nome,'Assinatura: nome em maiúsculas (sem negrito)',nome)
    reg(not re.search(r'Tenho a honra de|Tenho o prazer de|Cumpre-me informar',texto),'Texto: evita Tenho a honra de / Cumpre-me informar que','')
    return r
OK='''OFÍCIO Nº 45/2026/GAB/DTI
Goiânia, 2 de novembro de 2026.
Assunto: Solicitação de acesso ao sistema.
Senhor Diretor,
Solicito acesso ao sistema de processos para a equipe de controle externo.
Respeitosamente,
MARIA SOUZA
Chefe da Divisão de Auditoria'''
RUIM='''Ofício 45/26
Goiânia, GO, 02 de Novembro de 2026
Assunto: Pedido
Digníssimo Senhor Diretor
Tenho a honra de solicitar acesso ao sistema de processos.
Att.
Maria Souza
Chefe da Divisão de Auditoria'''
for nome,t in (('OFÍCIO CORRETO',OK),('OFÍCIO COM ERROS',RUIM)):
    print('==',nome)
    r=checa(t)
    for ok,reg_,det in r: print(('[ok]   ' if ok else '[ERRO] ')+reg_+(f'  -> {det}' if det else ''))
    print(f'   {sum(1 for o,_,_ in r if o)}/{len(r)} regras atendidas')
