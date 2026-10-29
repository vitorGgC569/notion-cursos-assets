# -*- coding: utf-8 -*-
# L4: confere cada citacao literal de fonte (leis, resolucao, NIST, PostgreSQL, OWASP, RFC, PHP, GitLab, Jenkins, rede)
# usada na Teoria e nos casos. As frases da Wikipedia sao fonte SECUNDARIA.
import quotes15 as Q
ok=bad=0
for k in sorted(Q.Q):
    if k.startswith(('ed_','trf4_','trt20_')): continue
    f,t=Q.Q[k]; r=Q.check(k); ok+=r; bad+=(not r)
    print('%-16s %-5s %-24s %s'%(k,'OK' if r else 'FALHA',f,Q.norm(t)[:60]))
print('\n%d citacoes encontradas, %d falhas.'%(ok,bad))
print('Normalizacao: espacos e quebras de linha unificados, aspas e apostrofos tipograficos trocados por retos. Texto da Lei 14.133: edicao do Senado Federal (6a edicao, atualizada ate julho de 2026); LGPD: portal da Camara dos Deputados (texto atualizado).')
