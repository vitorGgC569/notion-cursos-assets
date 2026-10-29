# -*- coding: utf-8 -*-
# L3: confere que cada citacao literal em ingles (Teoria e questoes) existe, palavra por palavra, no arquivo da fonte.
import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import quotes14 as Q
ok=bad=0
for k,(f,t) in Q.Q.items():
    r=Q.check(k); ok+=r; bad+=(not r)
    print('%-5s %-16s %-26s %3d car.  %s'%('OK' if r else 'FALHA',k,f,len(t),(t[:60]+'...') if len(t)>60 else t))
print('\nRESUMO: %d citacoes encontradas, %d falhas'%(ok,bad))
print('Obs.: aspas e apostrofos tipograficos foram normalizados para retos na comparacao e na exibicao.')
