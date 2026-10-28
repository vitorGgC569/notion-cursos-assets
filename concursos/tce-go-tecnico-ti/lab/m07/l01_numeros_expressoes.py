# -*- coding: utf-8 -*-
"""L1: inteiros, racionais, expressões numéricas e padrões. Usa só a biblioteca padrão do Python."""
from fractions import Fraction as F
from common import *
print('--- 1. Ponto flutuante contra fração exata')
print('0,1 + 0,2 com float :',0.1+0.2,'(não é exatamente 0,3)')
print('0,1 + 0,2 com Fraction:',F(1,10)+F(2,10),'(exato)')
print('1/2 + 1/3 + 1/7 =',F(1,2)+F(1,3)+F(1,7),'; o que falta para 1 =',1-(F(1,2)+F(1,3)+F(1,7)))
print('\n--- 2. Ordem das operações e sinais')
print('2 + 3 * 4 ** 2 =',2+3*4**2,'  (potência, depois produto, depois soma)')
print('-3 ** 2 =',-3**2,'  e  (-3) ** 2 =',(-3)**2)
print('(2 + 3) * 4 ** 2 =',(2+3)*4**2)
print('Divisão inteira e resto com negativos: -7 // 2 =',-7//2,', -7 % 2 =',-7%2,', divmod(7,2) =',divmod(7,2))
print('Verificação 7 = 2*3 + 1:',2*3+1==7)
print('Racionais: 3/4 = 0,75 =',F(3,4),'=',float(F(3,4)),'; dízima 1/3 =',round(1/3,10),'(Fraction mantém 1/3)')
print('\n--- 3. TCE-GO 2009, questão 23: a * b = a + b + a.b')
def star(a,b): return a+b+a*b
v=star(2,star(12,5)); print('12 * 5 =',star(12,5),'; 2 * 77 =',v,'; atalho (a+1)(b+1)-1 =',(2+1)*(77+1)-1)
confere('tg',23,letra_por_valor(v,[217,223,227,233,237]))
print('\n--- 4. TCE-GO 2009, questão 22: o quadrado de 33...34')
for n in range(1,10):
    x=int('3'*(n-1)+'4'); q=x*x
    forma='1'*n+'5'*(n-1)+'6'
    print(f'n={n}: {x}^2 = {q}', '(segue a regra: n uns, n-1 cincos, um seis)' if str(q)==forma else '(NÃO segue)')
    assert str(q)==forma
x=333333334; q=x*x; s=sum(map(int,str(q)))
print('333333334^2 =',q,'; soma dos algarismos =',s)
faixas=['0 e 25','25 e 50','50 e 75','75 e 100','100 e 125']
faixa=[f for f in faixas if int(f.split(' e ')[0])<s<int(f.split(' e ')[1])][0]
print('Faixa em que a soma está:',faixa)
confere('tg',22,letra_por_valor(faixa,faixas),'a soma dos algarismos é 9 * 1 + 8 * 5 + 6 = 55')
print('\n--- 5. TRT-22 2022, questão 18: x e 2x com soma igual ao dobro do produto')
achados=[(F(p,q)) for q in range(1,13) for p in range(1,40) if F(p,q)+2*F(p,q)==2*(F(p,q)*2*F(p,q))]
x=sorted(set(achados))[0]; print('x =',x,' maior número =',2*x,'(busca em frações com denominador até 12)')
confere('t22',18,letra_por_valor(2*x,[F(1,2),F(1,4),F(3,2),F(5,2),F(2,4)]))
print('\n--- 6. TRT-4 2022, questão 17: frações do terreno')
resto=1-(F(1,2)+F(1,3)+F(1,7)); total=500/resto
print('Daniel ficou com',resto,'do terreno; terreno inteiro =',total,'m²')
confere('t4',17,letra_por_valor(total,[21000,20000,25000,18000,15000]))
