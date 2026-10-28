# -*- coding: utf-8 -*-
"""L7: conectivos, tabelas-verdade, equivalências e classificação (tautologia, contradição, contingência)."""
from itertools import product
from common import *
IMP=lambda p,q:(not p) or q
BIC=lambda p,q:p==q
XOR=lambda p,q:p!=q
def tabela(nome,f):
    print(f'\n{nome}'); print(' p  q | resultado')
    for p,q in product([True,False],repeat=2): print(f' {"V" if p else "F"}  {"V" if q else "F"} |   {"V" if f(p,q) else "F"}')
print('--- 1. Os conectivos')
tabela('Negação de p (não p): vale o contrário de p',lambda p,q:not p)
tabela('Conjunção p e q (verdadeira só se as duas são)',lambda p,q:p and q)
tabela('Disjunção p ou q (falsa só se as duas são falsas)',lambda p,q:p or q)
tabela('Disjunção exclusiva "ou p, ou q" (verdadeira se diferentes)',XOR)
tabela('Condicional se p então q (falsa só em V seguido de F)',IMP)
tabela('Bicondicional p se e somente se q (iguais)',BIC)
def classifica(f,n):
    r=[f(*v) for v in product([True,False],repeat=n)]
    return 'tautologia' if all(r) else 'contradição' if not any(r) else 'contingência'
def equiv(f,g,n): return all(f(*v)==g(*v) for v in product([True,False],repeat=n))
print('\n--- 2. Classificação')
print('p ou não p          :',classifica(lambda p:p or not p,1))
print('p e não p           :',classifica(lambda p:p and not p,1))
print('p -> (p ou q)       :',classifica(lambda p,q:IMP(p,p or q),2))
print('p -> q              :',classifica(IMP,2))
print('(p e (p -> q)) -> q :',classifica(lambda p,q:IMP(p and IMP(p,q),q),2),'(modus ponens como fórmula)')
print('\n--- 3. Equivalências e negações (conferidas nas quatro linhas)')
E=[('p -> q  =  não p ou q',lambda p,q:IMP(p,q),lambda p,q:(not p) or q),
   ('p -> q  =  não q -> não p (contrapositiva)',lambda p,q:IMP(p,q),lambda p,q:IMP(not q,not p)),
   ('não(p e q)  =  não p ou não q (De Morgan)',lambda p,q:not(p and q),lambda p,q:(not p) or (not q)),
   ('não(p ou q)  =  não p e não q (De Morgan)',lambda p,q:not(p or q),lambda p,q:(not p) and (not q)),
   ('não(p -> q)  =  p e não q',lambda p,q:not IMP(p,q),lambda p,q:p and not q),
   ('p <-> q  =  (p -> q) e (q -> p)',BIC,lambda p,q:IMP(p,q) and IMP(q,p)),
   ('"ou p, ou q"  =  não(p <-> q)',XOR,lambda p,q:not BIC(p,q))]
for t,f,g in E: print(('equivalentes     ' if equiv(f,g,2) else 'NÃO equivalentes ')+t); assert equiv(f,g,2)
print('\nFalácias: p -> q NÃO equivale à recíproca nem à inversa')
print('p -> q  vs  q -> p        :',equiv(IMP,lambda p,q:IMP(q,p),2))
print('p -> q  vs  não p -> não q:',equiv(IMP,lambda p,q:IMP(not p,not q),2))
print('\n--- 4. TRT-14 2022, questão 15: negação de (p -> q)')
# p = (a ou b)  com a: "2 feriados" e b: "5 domingos"; q: "em março nunca há carnaval". "pode haver carnaval" = não q.
alts={'A':lambda a,b,q:(not a and not b) and (not q),
      'B':lambda a,b,q:((not a) or (not b)) and (not q),
      'C':lambda a,b,q:(a or b) and (not q),
      'D':lambda a,b,q:IMP((not a) and (not b),not q),
      'E':lambda a,b,q:IMP((not a) and (not b),not q)}
neg=lambda a,b,q:not IMP(a or b,q)
ok=[l for l,f in alts.items() if all(f(*v)==neg(*v) for v in product([True,False],repeat=3))]
print('Alternativas equivalentes a não(p -> q) nas 8 linhas:',ok)
confere('t14',15,ok[0],'não(p -> q) equivale a p e não q: "há 2 feriados ou 5 domingos, e pode haver carnaval"')
print('\n--- 5. Número de linhas e da soma de linhas verdadeiras')
for n in range(1,6): print(f'{n} proposições simples: {2**n} linhas')
