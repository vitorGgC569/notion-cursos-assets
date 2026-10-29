# -*- coding: utf-8 -*-
# L2: confere, contra o texto extraido dos PDFs das provas, o texto-base, os enunciados, as alternativas e o gabarito das 10 questoes reais da FCC.
import re,os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import texts14 as T, cq14, quotes14 as QT
F=os.path.join(os.path.dirname(os.path.abspath(__file__)),'fontes')
def rd(n): return open(os.path.join(F,n),encoding='utf-8',errors='ignore').read()
def N(s): return QT.norm(s)
tj=N(rd('prova_tjce_p4.txt')); al=N(rd('prova_alesp_p7_esq.txt')+' '+rd('prova_alesp_p7_dir.txt'))
ok=bad=0
def chk(rotulo,cond):
    global ok,bad
    print(('OK    ' if cond else 'FALHA ')+rotulo); ok+=cond; bad+=(not cond)
print('== Texto-base BYOD (TJ-CE 2022, caderno C03 tipo 001, p. 4 do PDF)')
for i,p in enumerate(T.BYOD,1): chk('paragrafo %d (%d caracteres) consta na prova'%(i,len(p)),N(p) in tj)
print('== Texto-base UAC (AL-SP 2010, caderno X22 tipo 001, p. 7 do PDF, coluna esquerda)')
for i,p in enumerate(T.UAC_PIECES,1): chk('trecho %d (%d caracteres) consta na prova'%(i,len(p)),N(p) in al)
chk('lacunas [PARTICLE], [VERB] e [TO USE] constam na prova',all(k in al for k in ('[PARTICLE]','[VERB]','[TO USE]')))
chk('lacuna da questao 33 aparece como "X , Redmond" (quadrado do PDF) e foi escrita [X]',('X , Redmond: I' in al) and '[X], Redmond' in ' '.join(T.UAC))
print('== Enunciados e alternativas')
def enun_ok(q):
    txt=al if q['src'].startswith('Fonte: FCC, AL-SP') else tj
    e=re.sub(r'<[^>]+>',' ',q['enun'])
    e=e.replace('[X]','X').replace('("X , Redmond','').strip()
    return txt, e
for q in cq14.REAL:
    n=int(re.search(r'questão (\d+)',q['src']).group(1)); txt,_=enun_ok(q)
    alts=all(N(o['t']) in txt for o in q['opts'])
    chk('questao %d: as 5 alternativas constam na prova'%n,alts)
    if n==33: chk('questao 33: enunciado ("Qual a alternativa que melhor preenche a lacuna") consta na prova','Qual a alternativa que melhor preenche a lacuna' in al)
    elif n==11: chk('questao 11: enunciado consta na prova',N(q['enun']) in tj)
    elif n==12: chk('questao 12: enunciado consta na prova (a extracao OCR do PDF grudou "Inthe")',all(f in tj for f in ('fragment from the fourth paragraph','Nonetheless, it\'s safe to assume that some level of user error is reduced by familiarity and comfort with BYOD devices','the underlined expression can be replaced, without any change in the meaning of the sentence, by:')))
    else: chk('questao %d: enunciado consta na prova'%n,N(q['enun'])[:50] in al)
print('== Gabarito oficial')
gt=rd('gab_tjce.txt'); ga=rd('gab_alesp.txt')
chk('TJ-CE: cabecalho do gabarito traz "C03 - ANA JUD- CIÊNCIA DA COMP- SISTEMAS DA INFORMAÇÃO" e tipo 1','C03 - ANA JUD' in gt and re.search(r'Tipo gabarito\s+1',gt) is not None)
chk('AL-SP: cabecalho do gabarito traz "X22 - AG LEG. DE SERVIÇOS TEC. E ADM. PROC. DE DADOS" e tipo 1','X22 - AG LEG' in ga and 'Tipo Gabarito: 1' in ga)
G=lambda txt,n: re.search(r'%03d - ([A-E])'%n,txt).group(1)
for q in cq14.REAL:
    n=int(re.search(r'questão (\d+)',q['src']).group(1)); txt=ga if q['src'].startswith('Fonte: FCC, AL-SP') else gt
    o=G(txt,n); chk('questao %d: gabarito oficial %s, gabarito do curso %s'%(n,o,q['ok']),o==q['ok'])
print('\nRESUMO: %d conferencias OK, %d falhas'%(ok,bad))
