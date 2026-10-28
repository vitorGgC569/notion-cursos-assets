# -*- coding: utf-8 -*-
"""L11: confere por código a resposta correta das 25 questões autorais do simulado."""
from fractions import Fraction as F
from itertools import product,permutations,combinations
from math import gcd,lcm,comb,factorial,hypot
from collections import Counter
IMP=lambda p,q:(not p) or q
def fmt(x):
    return f'{x:,}'.replace(',','.')
R={}
R[1]=(2-3*(-4)+(-6)//3,'12.')
R[2]=(F(3,4)+F(5,6)-F(1,3),'5/4.')
R[3]=(len([t for t in range(1,601) if t%12==0 and t%18==0]),'16 vezes.')
l=gcd(180,240); R[4]=((180//l)*(240//l),'12.')
partes=[2400*k//12 for k in (2,3,7)]; R[5]=(max(partes)-min(partes),'1.000,00.')
R[6]=(F(4800*5*8*15,8*6*10),'6.000 peças.')
R[7]=(F(12*20,15),'16 dias.')
R[8]=(F(250)*F(12,10)*F(8,10),'240,00.')
R[9]=(F(4700-4000,4000)*100,'17,5%.')
R[10]=(F(35,100)*(F(40,100)*250),'35.')
R[11]=(5*12-4*10,'20.')
R[12]=((F(15,2)*10-6*2-8*3)/5,'7,8.')
R[13]=(120-(70+55-30),'25.')
R[14]=(sum(1 for t in permutations('123456',3) if int(t[-1])%2==0),'60.')
R[15]=(comb(9,3)-comb(4,3),'80.')
R[16]=(factorial(8)//(factorial(2)*factorial(2)),'10.080.')
# 17: negação da condicional
neg=lambda p,q:not IMP(p,q)
R[17]=('chove e não cancelado' if all(neg(p,q)==(p and not q) for p,q in product([True,False],repeat=2)) else '?','chove e o evento não é cancelado.')
f=lambda p,q:IMP(p,q) and (not q)
R[18]=('¬p ∧ ¬q' if all(f(p,q)==((not p) and (not q)) for p,q in product([True,False],repeat=2)) else '?','¬p ∧ ¬q.')
cands={'(p ∧ q) → p':lambda p,q:IMP(p and q,p),'(p ∨ q) → p':lambda p,q:IMP(p or q,p),'p → (p ∧ q)':lambda p,q:IMP(p,p and q),'(p → q) → p':lambda p,q:IMP(IMP(p,q),p),'p ∧ (p → q)':lambda p,q:p and IMP(p,q)}
taut=[k for k,g in cands.items() if all(g(p,q) for p,q in product([True,False],repeat=2))]
R[19]=(taut[0] if len(taut)==1 else '?','(p ∧ q) → p.')
valid=all((not p) for p,q in product([True,False],repeat=2) if IMP(p,q) and not q)
R[20]=('Marta não estudou' if valid else '?','Marta não estudou.')
U=[1,2,3,4]
ok=all((not all(x%2==0 for x in S))==any(x%2!=0 for x in S) for n in range(1,5) for S in product(U,repeat=n))
R[21]=('existe servidor que não é pontual' if ok else '?','existe servidor desse órgão que não é pontual.')
vm=[(a,b,c) for a,b,c in product([True,False],repeat=3) if a==(not b) and b==(not c) and c==((not a) and (not b))]
R[22]=('apenas Bia' if vm==[(False,True,False)] else '?','apenas Bia.')
R[23]=((10+1)**2-1,'120.')
seq=[3,8,15,24,35]; assert seq==[(n+1)**2-1 for n in range(1,6)]
R[24]=(hypot(3,4),'5.')
dias=['segunda','terça','quarta','quinta','sexta','sábado','domingo']
R[25]=(dias[(dias.index('terça')+100)%7],'quinta-feira.')
ESPERADO={k:v[1] for k,v in R.items()}
if __name__=='__main__':
    for k in sorted(R):
        valor,txt=R[k]; print(f'Questão {k:2d}: valor calculado = {valor!s:28}  resposta no simulado: {txt}')
    # coerência explícita entre valor calculado e texto
    chk={1:12,2:F(5,4),3:16,4:12,5:1000,6:6000,7:16,8:240,9:F(35,2),10:35,11:20,12:F(39,5),13:25,14:60,15:80,16:10080,23:120,24:5.0,25:'quinta'}
    for k,v in chk.items(): assert R[k][0]==v,(k,R[k][0],v)
    for k in (17,18,19,20,21,22): assert R[k][0]!='?',k
    print('\nAs 25 respostas conferem com o simulado.')
