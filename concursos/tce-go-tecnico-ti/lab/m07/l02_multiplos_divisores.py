# -*- coding: utf-8 -*-
"""L2: múltiplos, divisores, MMC, MDC e restos."""
from math import gcd,lcm
from common import *
def fatora(n):
    f={};d=2
    while n>1:
        while n%d==0: f[d]=f.get(d,0)+1; n//=d
        d+=1
    return f
print('--- 1. Fatoração, MMC e MDC')
for a,b in [(24,30),(12,18),(5,6)]:
    print(f'{a} = {fatora(a)}, {b} = {fatora(b)}  MMC={lcm(a,b)}  MDC={gcd(a,b)}  conferência MMC*MDC=a*b: {lcm(a,b)*gcd(a,b)==a*b}')
print('Número de divisores de 360 (fórmula pelos expoentes):',eval('*'.join(str(e+1) for e in fatora(360).values())),'| contagem direta:',sum(1 for d in range(1,361) if 360%d==0))
print('\n--- 2. TRT-5 2022, questão 15: ciclistas com voltas de 5 e 6 minutos em 90 minutos')
m=lcm(5,6); encontros=[t for t in range(1,91) if t%5==0 and t%6==0]
print('MMC =',m,'; instantes em que passam juntos (depois da largada):',encontros)
confere('t5',15,letra_por_valor(len(encontros),[1,2,3,4,5]))
print('\n--- 3. TRT-4 2022, questão 19: cadeiras entre 300 e 400, arrumáveis em 24 e em 30 fileiras')
c=[n for n in range(300,401) if n%24==0 and n%30==0]
print('Candidatos:',c,'; soma dos algarismos de',c[0],'=',sum(map(int,str(c[0]))))
confere('t4',19,letra_por_valor(sum(map(int,str(c[0]))),[6,8,7,9,10]))
print('\n--- 4. TRT-1 2014, questão 22: mesmo resto para um divisor entre 6 e 9')
nums=[30,37,65,45,79]
for d in range(6,10):
    restos=[n%d for n in nums]; print(f'divisor {d}: restos {restos}')
d=7; restos=[n%d for n in nums]
destoa=[n for n,r in zip(nums,restos) if restos.count(r)==1]
print('Com divisor 7, o número que destoa é',destoa)
confere('t1',22,letra_por_valor(destoa[0],[37,65,30,45,79]))
print('\n--- 5. Critérios de divisibilidade conferidos')
print('Divisível por 3 se a soma dos algarismos é:',all((n%3==0)==(sum(map(int,str(n)))%3==0) for n in range(1,5000)))
print('Divisível por 4 se os dois últimos algarismos formam múltiplo de 4:',all((n%4==0)==(n%100%4==0) for n in range(1,5000)))
print('Divisível por 11 pela soma alternada:',all((n%11==0)==(sum(int(ch)*(-1)**i for i,ch in enumerate(str(n)[::-1]))%11==0) for n in range(1,5000)))
print('Primos até 50:',[n for n in range(2,51) if all(n%d for d in range(2,int(n**.5)+1))])
