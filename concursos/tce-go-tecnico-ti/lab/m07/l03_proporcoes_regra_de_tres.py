# -*- coding: utf-8 -*-
"""L3: razão, proporção, divisão proporcional e regra de três (simples, inversa e composta)."""
from fractions import Fraction as F
from math import ceil
from common import *
print('--- 1. Regra de três simples, direta e inversa')
print('Direta: 3 kg custam 18; 5 kg custam',F(5)*18/3)
print('Inversa: 6 pessoas fazem em 10 dias; 15 pessoas fazem em',F(6*10,15),'dias (pessoas x dias = constante)')
print('Composta pela unidade de trabalho: 6 pessoas, 5 dias, 2 h/dia =',6*5*2,'pessoa-horas')
print('\n--- 2. Divisão proporcional')
def dividir(total,partes):
    s=sum(partes); return [F(total)*p/s for p in partes]
print('1200 em partes proporcionais a 25, 40, 35:',[float(x) for x in dividir(1200,[25,40,35])])
print('1200 em partes proporcionais a 5, 15, 20:',[float(x) for x in dividir(1200,[5,15,20])])
print('\n--- 3. TRT-22 2022, questão 19 (gorjetas)')
idade=dividir(1200,[25,40,35])[0]; servico=dividir(1200,[5,15,20])[0]
print('Alberto pela idade:',float(idade),'; pelo tempo de serviço:',float(servico),'; deixou de ganhar:',float(idade-servico))
confere('t22',19,letra_por_valor(idade-servico,[100,250,30,150,300]))
print('\n--- 4. TRT-14 2022, questão 11 (frações da herança)')
T=F(4664); novo=T*F(3,8); sob=T-novo; velho=sob/5; resto=sob-velho; cada=resto/5
print('mais novo',float(novo),'; mais velho',float(velho),'; cada um dos 5 demais',float(cada),'; diferença velho - André =',float(velho-cada))
confere('t14',11,letra_por_valor(velho-cada,[F('111.5'),F('116.6'),F('124.4'),F('128.5'),F('132.5')]))
print('\n--- 5. TRT-14 2022, questão 12 (razão entre livros)')
sol=[k for k in range(1,5000) if F(2*k-120+34,7*k+56)==F(9,40)]
k=sol[0]; ing=2*k-120+34; por=7*k+56
print('k =',k,'; inglês depois =',ing,'; português depois =',por,'; total =',ing+por,'; razão =',F(ing,por))
confere('t14',12,letra_por_valor(ing+por,[1974,2037,2016,1995,2058]))
print('\n--- 6. TRT-5 2022, questão 14 (salário de Ana e Marcos)')
sal=[m for m in range(2001,40000) if F(5*m,6)-2000==F(4,5)*(m-2000) and (5*m)%6==0]
print('Salário de Marcos:',sal)
confere('t5',14,letra_por_valor(sal[0],[5200,7400,9300,10500,12000]))
print('\n--- 7. TRT-5 2022, questão 13 e TRT-2 2018, questão 13 (pessoa-horas)')
falta=6*5*2-2*5*4; dias=F(falta,1*4); print('TRT-5: faltam',falta,'pessoa-horas; 1 pessoa, 4 h/dia ->',dias,'dias')
confere('t5',13,letra_por_valor(dias,[4,5,6,7,8]))
total=15*25*8; feito=15*5*8; resta=total-feito; dd=F(resta,15*10); print('TRT-2: total',total,'; feito',feito,'; resta',resta,'; dias restantes',dd,'; total de dias',5+dd)
confere('t2',13,letra_por_valor(5+dd,[20,17,19,21,18]))
print('\n--- 8. TRT-4 2022, questão 20 (impressoras com tempo igual)')
v=[5,4,9]; t=F(162,sum(v)); partes=[x*t for x in v]; print('tempo',t,'min; apostilas por impressora',[int(x) for x in partes])
confere('t4',20,letra_por_valor(partes[1],[18,36,45,24,54]))
print('\n--- 9. TRT-1 2014, questão 28 (relógios)')
dif=F(40,4)+F(15,3); h=90/dif; print('A diferença cresce',dif,'s por hora; 90 s ->',h,'horas')
confere('t1',28,letra_por_valor(h,[6,F(9,2),5,F(11,2),F(13,2)]))
print('\n--- 10. Grandezas: produto ou razão constante')
print('Velocidade x tempo (inversa): 60 km/h x 2 h =',60*2,'; 80 km/h x 1,5 h =',80*1.5,'(produto constante, mesma distância)')
