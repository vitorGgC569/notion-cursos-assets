# -*- coding: utf-8 -*-
"""L5: conjuntos, diagramas de Venn e inclusão-exclusão."""
from itertools import product
from common import *
print('--- 1. Operações com conjuntos do Python')
A={1,2,3,4,5,6}; B={4,5,6,7,8}; U=set(range(1,11))
print('A união B =',sorted(A|B),'; A inter B =',sorted(A&B),'; A - B =',sorted(A-B),'; complemento de A =',sorted(U-A))
print('n(A uniao B) = n(A) + n(B) - n(A inter B):',len(A|B),'=',len(A),'+',len(B),'-',len(A&B))
print('Leis de De Morgan para conjuntos:',U-(A|B)==(U-A)&(U-B),U-(A&B)==(U-A)|(U-B))
print('\n--- 2. Inclusão-exclusão com três conjuntos, conferida por enumeração')
import random
random.seed(7)
for _ in range(3):
    pessoas=[tuple(random.random()<.5 for _ in range(3)) for _ in range(100)]
    a=sum(p[0] for p in pessoas); b=sum(p[1] for p in pessoas); c=sum(p[2] for p in pessoas)
    ab=sum(p[0] and p[1] for p in pessoas); ac=sum(p[0] and p[2] for p in pessoas); bc=sum(p[1] and p[2] for p in pessoas); abc=sum(all(p) for p in pessoas)
    uniao=sum(any(p) for p in pessoas)
    print('n(AuBuC) por contagem =',uniao,'; pela fórmula =',a+b+c-ab-ac-bc+abc)
    assert uniao==a+b+c-ab-ac-bc+abc
print('\n--- 3. TRT-5 2022, questão 12 (futebol e tênis)')
fut,ten,ambos,total=15,12,10,25
nenhum=total-(fut+ten-ambos); print('gostam de pelo menos um =',fut+ten-ambos,'; não gostam de nenhum =',nenhum)
confere('t5',12,letra_por_valor(nenhum,[5,6,7,8,10]))
print('\n--- 4. TRT-22 2022, questão 20 (massa e carne, todos gostam de ao menos um)')
ambos=45+52-80; print('Gostam dos dois =',ambos,'(45 + 52 - 80)')
confere('t22',20,letra_por_valor(ambos,[15,17,16,14,22]))
print('\n--- 5. TRT-23 2022, questão 14 (indústrias com no máximo 2 insumos)')
print('Total de usos de insumo: 16 + 9 + 8 =',16+9+8)
res=set()
for n2 in range(0,31):
    for n1 in range(0,31):
        n0=30-n1-n2
        if n0>=0 and n1+2*n2==33: res.add((n0,n1,n2))
print('Soluções (nenhuma, só um, dois insumos):',sorted(res))
print('Com todas as 30 indústrias usando ao menos um insumo (n0 = 0):',[r for r in sorted(res) if r[0]==0])
dois=[r for r in res if r[0]==0][0][2]
confere('t23',14,letra_por_valor(dois,[3,6,4,5,2]),'o gabarito pressupõe que toda indústria usa pelo menos um insumo (n0 = 0)')
print('\n--- 6. Contar sem Venn: o complemento')
print('Quantos números de 1 a 100 não são múltiplos de 2 nem de 3:',sum(1 for n in range(1,101) if n%2 and n%3),'= 100 - (50 + 33 - 16)')
