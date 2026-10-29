# -*- coding: utf-8 -*-
# L5: confere os 9 casos: espelho soma 100, cada item tem ao menos um termo-chave na resposta-modelo (isso mede o espelho
# contra a resposta, nao contra a banca), cada comando aparece com a letra, e a resposta cabe no limite de linhas.
import cases15 as C,linhas15 as L,re
bad=0
print('%-4s %-6s %5s %6s %7s %7s %6s  %s'%('caso','tipo','soma','itens','letras','linhas90','linhas70','chars'))
for c in C.ALL:
    soma=sum(p for _,p,_ in c['esp']); txt='\n'.join(c['modelo'])
    itens=sum(1 for _,p,t in c['esp'] if L.hits(txt,t))
    letras=sum(1 for l,_ in c['cmd'] if re.search(r'(^|\n)%s\. '%re.escape(l),txt))
    l90=L.count_lines(txt,90); l70=L.count_lines(txt,70)
    ok=soma==100 and itens==len(c['esp']) and letras==len(c['cmd']) and l90<=c['linhas']
    bad+=(not ok)
    print('%-4s %-6s %5d %3d/%-2d %4d/%-2d %7d %7d %6d  %s'%(c['id'],c['tipo'],soma,itens,len(c['esp']),letras,len(c['cmd']),l90,l70,len(txt),'OK' if ok else 'FALHA'))
    for d,p,t in c['esp']:
        if not L.hits(txt,t): print('     item sem termo na resposta:',d[:60])
print('\n%d casos, %d falhas. Linhas estimadas a 90 e a 70 caracteres por linha (sua letra pode ocupar mais).'%(len(C.ALL),bad))
print('Limites: casos autorais e simulado 15 linhas; TRF-4 2019 20 linhas; TRT-20 2024 15 linhas.')
print('Aviso: o espelho e a resposta-modelo sao AUTORAIS, inclusive nos 3 casos reais; nao e o espelho da banca.')
