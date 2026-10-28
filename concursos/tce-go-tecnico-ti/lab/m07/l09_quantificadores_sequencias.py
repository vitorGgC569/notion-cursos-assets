# -*- coding: utf-8 -*-
"""L9: quantificadores em modelos finitos, contagem de "não todos", sequências e filas."""
from itertools import product
from fractions import Fraction as F
from common import *
IMP=lambda p,q:(not p) or q
print('--- 1. Negação de quantificadores em um universo finito')
U=[1,2,3,4,5,6]
todo=lambda f:all(f(x) for x in U); existe=lambda f:any(f(x) for x in U)
par=lambda x:x%2==0; maior3=lambda x:x>3
print('não(todo x é par)      =',not todo(par),'  existe x que não é par =',existe(lambda x:not par(x)))
print('não(existe x > 3)      =',not existe(maior3),' todo x é <= 3         =',todo(lambda x:not maior3(x)))
print('"Todo A é B" é falso quando basta UM A que não é B; "algum A é B" não implica "todo A é B".')
print('\n--- 2. TCE-GO 2009, questão 21 (cobras, répteis e venenosos)')
# elemento = (cobra, réptil, venenoso); modelos com até 4 elementos
elementos=list(product([True,False],repeat=3)); M=[]
for n in range(1,5):
    for modelo in product(elementos,repeat=n):
        if all(IMP(c,r) for c,r,v in modelo) and any(r and v for c,r,v in modelo): M.append(modelo)
print('modelos testados:',len(M))
necessarias('tg',21,{'A':lambda m:all(IMP(c,v) for c,r,v in m),
 'B':lambda m:any(r and v and c for c,r,v in m),
 'C':lambda m:all(IMP(r,c) for c,r,v in m),
 'D':lambda m:all(IMP(r and v,c) for c,r,v in m),
 'E':lambda m:all(IMP(c and v,r) for c,r,v in m)},M)
print('\n--- 3. TRT-1 2014, questão 26 (técnicos, coordenadores e chefes)')
sol=[(c,h) for c in range(0,9) for h in range(0,9) if c<4 and c!=1 and c>=2 and 1<h<c]
print('(coordenadores, chefes de trabalhos especiais) possíveis:',sol)
c,h=sol[0]; print('reunião = chefes + técnicos que não coordenam =',h,'+',8-c,'=',h+8-c)
confere('t1',26,letra_por_valor(h+8-c,[6,8,5,4,7]))
print('\n--- 4. TRT-1 2014, questão 27 (categorias J, K, L e M)')
el=list(product([True,False],repeat=3))  # (K, L, M); todos são J
M=[]
for modelo in product(el,repeat=3):
    k=[e[0] for e in modelo]; l=[e[1] for e in modelo]; m=[e[2] for e in modelo]
    if any(k) and not all(k) and any(l) and not all(l) and any(m) and not all(m) and not any(a and b for a,b in zip(l,m)): M.append(modelo)
print('modelos de 3 elementos compatíveis:',len(M))
nec=lambda f:all(all(f(e) for e in mod if e[0]) for mod in M)
pos=lambda f:any(any(f(e) for e in mod if e[0]) for mod in M)
res={'A':nec(lambda e:not e[2]),'B':pos(lambda e:e[1] and e[2]),'C':pos(lambda e:e[1] and not e[2]),'D':False,'E':nec(lambda e:e[1])}
print('A "não está em M" (sempre?)',res['A'],'| B "pode estar em M e L"',res['B'],'| C "pode estar em L e não em M"',res['C'],'| D "pode não ser J" False (todos são J) | E "está em L" (sempre?)',res['E'])
confere('t1',27,[l for l,v in res.items() if v][0])
print('\n--- 5. Sequências: gerar e conferir')
print('TCE-GO 2009, questão 18 (soma das posições das letras, alfabeto de 26 letras)')
pos_=lambda s:sum(ord(ch)-64 for ch in s)
for g,n in [('ABH',11),('DBX',30),('MAR',32),('KIT',40),('CYN',42)]: print(' ',g,pos_(g),'(dado',n,')'); assert pos_(g)==n
print('  PAZ =',pos_('PAZ'))
confere('tg',18,letra_por_valor(pos_('PAZ'),[31,36,40,43,46]))
print('TCE-GO 2009, questão 19 (cada termo repete; os pares diminuem 7, 8, 9, ...)')
seq=[120]; dec=7
while len(seq)<20:
    seq.append(seq[-1]); seq.append(seq[-1]-dec); dec+=1
seq=seq[:20]; print(' ',seq[:10],'...'); s=seq[13]+seq[14]; print('  14º =',seq[13],'; 15º =',seq[14],'; soma =',s,'(ímpar)' if s%2 else '(par)')
alts={'A':s%2==1,'B':s<100,'C':s%3==0,'D':s>130,'E':s%5==0}; print('  alternativas verdadeiras:',[l for l,v in alts.items() if v])
confere('tg',19,[l for l,v in alts.items() if v][0])
print('TRT-14 2022, questão 14 (sequência mista; ímpares: +3; pares: dois fios 8,9,10 e 5,6,7)')
def elem(n):
    if n%2==1: return 4+3*((n-1)//2)
    k=n//2
    return 8+(k-1)//2 if k%2==1 else 5+(k-2)//2
print('  primeiros 12:',[elem(i) for i in range(1,13)],'(dado: 4,8,7,5,10,9,13,6,16,10,19,7)')
assert [elem(i) for i in range(1,13)]==[4,8,7,5,10,9,13,6,16,10,19,7]
print('  99º =',elem(99),'; 100º =',elem(100),'; diferença =',elem(99)-elem(100))
confere('t14',14,letra_por_valor(elem(99)-elem(100),[115,125,119,122,118]))
print('TRT-1 2014, questão 21 (2; 5; 4; 7; 6; 9; ...)')
def e21(n): return n+1 if n%2==1 else n+3
print('  primeiros 11:',[e21(i) for i in range(1,12)]); assert [e21(i) for i in range(1,12)]==[2,5,4,7,6,9,8,11,10,13,12]
print('  112º =',e21(112)); confere('t1',21,letra_por_valor(e21(112),[121,151,115,125,117]))
print('\n--- 6. TRT-1 2014, questão 23 (fila; a primeira pessoa recua 1, 2, 3 e 4 posições)')
fila=list('ABCDE')
for k in (1,2,3,4):
    p=fila.pop(0); fila.insert(k,p); print(' ',k,'recuo(s):',''.join(fila))
confere('t1',23,letra_por_valor(fila[1],['A','D','C','B','E']))
print('\n--- 7. TRT-1 2014, questão 24 (idades)')
def modelos(distintas):
    out=[]
    for D in range(31,40):
        for A in range(1,D):
            for B in range(21,A):
                if B==30: continue
                for C in range(A,D):
                    if distintas and len({A,B,C,D})<4: continue
                    out.append((A,B,C,D))
    return out
for dist in (True,False):
    M=modelos(dist); print(f'  idades {"todas diferentes" if dist else "podendo repetir"}: {len(M)} modelos; soma mínima {min(map(sum,M))}, soma máxima {max(map(sum,M))}')
M=modelos(True)
necessarias('t1',24,{'A':lambda m:sum(m)<80,'B':lambda m:m[2]-m[3] in(1,-1),'C':lambda m:m[3]==25 and m[0]==35,'D':lambda m:sum(m)<=150,'E':lambda m:m[2]+m[3]==m[0]+m[1]+50},M,'com idades diferentes; se Alberto e Cleuza puderem ter a mesma idade, a soma chega a 152')
print('\n--- 8. TRT-2 2014, questão 19 (senha crescente)')
M=[s for s in product(range(10),repeat=4) if all(s[i]<s[i+1] for i in range(3)) and s[0]>2 and s[2]>6 and sum(1 for i,d in enumerate((9,4,0,1)) if s[i]==d)==1 and len(set(s)&{9,4,0,1})==1]
print('  senhas possíveis:',M); confere('t2a',19,letra_por_valor(sum(M[0]),[22,24,20,23,21]))
print('\n--- 9. TRT-22 2022, questão 16 (quadriculado 2 x 2 com 1, 2, 3, 4)')
from itertools import permutations
S=[p for p in permutations([1,2,3,4]) if p[0]+p[1]==3 and p[0]+p[3]==4]
print('  quadriculados (a b / c d):',S); a,b,c,d=S[0]; print('  soma da 1ª coluna =',a+c)
confere('t22',16,letra_por_valor(a+c,[5,4,6,7,8]))
