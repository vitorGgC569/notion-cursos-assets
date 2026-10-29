# -*- coding: utf-8 -*-
# L3: confere, nos textos guardados, o enunciado e os comandos dos 3 casos REAIS (TRF-4 2019 Q1 e Q2, TRT-20 2024)
# e os itens dos editais dessas provas citados no modulo.
import re,quotes15 as Q,cases15 as C
tot=bad=0
for c in C.REAIS:
    t=Q.text(c['srcfile']); print('== %s (%s)'%(c['id'],c['titulo']))
    itens=[('enunciado',p) for p in c['enun'] if not p.startswith('Resumo autoral')]+[('comando '+l,x) for l,x in c['cmd']]
    for p in c.get('enun_extra',[]):
        m=re.search(r'"(.+)"',p); itens.append(('trecho citado',m.group(1)))
    for nome,p in itens:
        r=Q.norm(p) in t; tot+=1; bad+=(not r); print('  %-14s %-5s %s'%(nome,'OK' if r else 'FALHA',Q.norm(p)[:70]))
    if any(p.startswith('Resumo autoral') for p in c['enun']): print('  (o resumo do enunciado da Q2 e AUTORAL e nao foi conferido contra o texto: foi declarado como resumo)')
print('\nItens de edital das provas reais:')
for k in [k for k in Q.Q if k.startswith('trf4_') or k.startswith('trt20_')]:
    r=Q.check(k); tot+=1; bad+=(not r); print('  %-12s %-5s %s'%(k,'OK' if r else 'FALHA',Q.norm(Q.Q[k][1])[:70]))
print('\n%d conferencias, %d falhas.'%(tot,bad))
print('Ressalva: o PDF da prova e o texto da pagina vieram de agregadores, nao do site da banca; o espelho oficial nao foi localizado.')
