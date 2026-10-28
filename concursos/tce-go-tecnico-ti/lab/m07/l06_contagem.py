# -*- coding: utf-8 -*-
"""L6: análise combinatória conferida por força bruta com itertools."""
from itertools import product,permutations,combinations,combinations_with_replacement
from math import factorial,comb,perm
from common import *
print('--- 1. Princípio multiplicativo')
print('3 camisas, 4 calças, 2 sapatos:',3*4*2,'combinações; por enumeração:',len(list(product(range(3),range(4),range(2)))))
print('Senhas de 3 dígitos (0 a 9) com repetição:',10**3,'; sem repetição (arranjo):',perm(10,3),'=',len(list(permutations(range(10),3))))
print('\n--- 2. Permutações')
print('Anagramas de BANCO:',factorial(5),'=',len(set(permutations('BANCO'))))
print('Anagramas de ARARA (repetições, 3 A e 2 R): 5!/(3!2!) =',factorial(5)//(factorial(3)*factorial(2)),'=',len(set(permutations('ARARA'))))
print('Mesa redonda com 5 pessoas (permutação circular):',factorial(4),'; pela enumeração (fixando a primeira):',len(list(permutations(range(1,5)))))
print('\n--- 3. Combinações e arranjos')
print('Comissões de 3 em 8 pessoas:',comb(8,3),'=',len(list(combinations(range(8),3))))
print('Arranjos A(8,3) = C(8,3)*3! =',perm(8,3),'=',comb(8,3)*factorial(3))
print('Combinações com repetição de 3 sabores em 5 bolas: C(7,5) =',comb(7,5),'=',len(list(combinations_with_replacement(range(3),5))))
print('Ordem importa? Presidente e vice entre 8:',perm(8,2),'; dois representantes:',comb(8,2))
print('\n--- 4. "Pelo menos um" pelo complemento')
print('Sorteios de 3 dígitos com pelo menos um 7:',10**3-9**3,'=',sum(1 for t in product(range(10),repeat=3) if 7 in t))
print('\n--- 5. Princípio da casa dos pombos: em 13 pessoas, ao menos',-(-13//12),'fazem aniversário no mesmo mês')
print('\n--- 6. TCE-GO 2009, questão 17 (árvore genealógica de Dona Marieta)')
filhos=10; netos=(filhos-3)*3; bisnetos=(netos-4)*5; tataranetos=(bisnetos-9)*2
print('filhos',filhos,'; netos',netos,'; bisnetos',bisnetos,'; tataranetos',tataranetos,'; total',filhos+netos+bisnetos+tataranetos)
confere('tg',17,letra_por_valor(filhos+netos+bisnetos+tataranetos,[226,264,268,272,277]))
print('\n--- 7. TRT-2 2014, questão 16 (classes por ano, arredondando para cima)')
lim={1:20,2:25,3:25,4:30,5:30,6:35,7:35,8:35,9:35}
classes=sum(-(-100//l) for l in lim.values()); print('classes por ano:',[-(-100//l) for l in lim.values()],'; total',classes)
confere('t2a',16,letra_por_valor(classes,[31,32,33,34,35]))
print('\n--- 8. TRT-2 2014, questão 17 (caminho mínimo em malha 10 x 10)')
n=10; lado=200
def passos(x0,y0,x1,y1): return abs(x1-x0)+abs(y1-y0)
d=passos(0,0,5,5)+passos(5,5,10,10)
print('lados percorridos =',d,'; distância =',d*lado,'m')
# conferência por busca em largura numa malha de pontos 11 x 11
from collections import deque
def bfs(a,b):
    dist={a:0};q=deque([a])
    while q:
        x,y=q.popleft()
        for dx,dy in((1,0),(-1,0),(0,1),(0,-1)):
            p=(x+dx,y+dy)
            if 0<=p[0]<=n and 0<=p[1]<=n and p not in dist: dist[p]=dist[(x,y)]+1; q.append(p)
    return dist[b]
print('busca em largura: canto ao centro',bfs((0,0),(5,5)),'e centro ao canto oposto',bfs((5,5),(10,10)))
confere('t2a',17,letra_por_valor(d*lado,[1400,2000,2800,4000,8000]))
print('\n--- 9. TRT-2 2014, questão 18 (algarismos dos ímpares de 1 a 349)')
alg=sum(len(str(k)) for k in range(1,350,2)); print('quantidade de ímpares',len(range(1,350,2)),'; algarismos escritos',alg)
confere('t2a',18,letra_por_valor(alg,[350,420,470,455,525]))
print('\n--- 10. TRT-23 2022, questão 15 (assentos do teatro)')
fileiras=5+4+1; por_fileira=3+2+1; print('fileiras mínimas',fileiras,'; assentos por fileira mínimos',por_fileira,'; total',fileiras*por_fileira)
confere('t23',15,letra_por_valor(fileiras*por_fileira,[100,45,60,50,65]))
