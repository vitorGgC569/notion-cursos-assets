# -*- coding: utf-8 -*-
# L4: para cada questao (10 reais, 12 de exercicio e 10 do simulado), confere no texto-base as frases que sustentam o gabarito (ev)
# e que as expressoes usadas nos distratores (neg) NAO constam do texto.
import os,sys,re
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import cq14, quotes14 as Q
def norm(s): return Q.norm(re.sub(r'<[^>]+>',' ',s))
tot=ok=bad=0
for grp,L in (('REAIS',cq14.REAL),('EXERCICIOS',cq14.EX),('SIMULADO',cq14.SIM)):
    print('== %s'%grp)
    for i,x in enumerate(L,1):
        t,paras,cred=cq14.passage_paras(x); txt=norm(' '.join(paras)); low=txt.lower()
        r=[]
        for e in x['ev']: c=norm(e) in txt; r.append(('ev',e,c))
        for e in x['neg']: c=e.lower() not in low; r.append(('neg',e,c))
        c5=len(x['opts'])==5 and x['ok'] in 'ABCDE'
        good=all(c for _,_,c in r) and c5
        tot+=1; ok+=good; bad+=(not good)
        print('%-5s q%02d [%s] texto=%s gabarito=%s  evidencias OK %d/%d, ausencias OK %d/%d%s'%('OK' if good else 'FALHA',i,'real' if not x['autoral'] else 'autoral',x['pid'],x['ok'],
          sum(1 for k,_,c in r if k=='ev' and c),sum(1 for k,_,_ in r if k=='ev'),sum(1 for k,_,c in r if k=='neg' and c),sum(1 for k,_,_ in r if k=='neg'),
          '' if x['ev'] else '  (sem evidencia textual a conferir: depende do gabarito oficial/gramatica)'))
        for k,e,c in r:
            if not c: print('        FALHA',k,repr(e))
print('\nRESUMO: %d questoes conferidas OK, %d falhas'%(ok,bad))
print('Limite: o script confere frases do texto, nao o raciocinio; o gabarito das 10 reais vem do gabarito oficial (L2) e o das autorais e minha leitura do texto.')
