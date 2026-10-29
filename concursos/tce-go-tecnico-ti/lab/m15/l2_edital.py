# -*- coding: utf-8 -*-
# L2: confere, no texto do Edital 01/2026, cada trecho literal citado no modulo (capitulos 7, 8, 11 e 12 e o cronograma)
# e mostra que o edital NAO fixa o numero de linhas da resposta.
import re,quotes15 as Q
ok=bad=0
for k in sorted(Q.Q,key=lambda x:(len(x),x)):
    if not k.startswith('ed_'): continue
    f,t=Q.Q[k]; r=Q.check(k); ok+=r; bad+=(not r)
    print('%-14s %-5s %s'%(k,'OK' if r else 'FALHA',Q.norm(t)[:78]))
print('\n%d trechos do edital encontrados, %d falhas.'%(ok,bad))
txt=Q.text('edital_cap11_12.txt')
print('\nOcorrencias da palavra "linhas" no capitulo 11 do edital:')
for m in re.finditer(r'.{60}\blinhas\b.{60}',txt): print('  ...'+m.group(0)+'...')
nums=re.findall(r'\b\d+\s*\([^)]*\)\s*linhas',txt)
print('Numero de linhas fixado no capitulo 11 (padrao "N (extenso) linhas"):',nums if nums else 'nenhum')
print('Conclusao: o limite vem do enunciado da questao (item 11.16); o numero nao esta no edital.')
