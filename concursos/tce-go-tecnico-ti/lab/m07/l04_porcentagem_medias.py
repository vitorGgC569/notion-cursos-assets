# -*- coding: utf-8 -*-
"""L4: porcentagem, acréscimos e descontos sucessivos, e médias."""
from fractions import Fraction as F
from statistics import mean,median,multimode,geometric_mean,harmonic_mean
from common import *
print('--- 1. Fator multiplicativo')
for p in (10,20,130):
    print(f'aumento de {p}% multiplica por {1+p/100}; desconto de {p if p<100 else 0}% multiplica por {1-p/100 if p<100 else "-"}')
print('\n--- 2. Sucessivos: +20% e depois -20% não volta ao valor inicial')
f=F(12,10)*F(8,10); print('fator =',f,'=',float(f),'; variação final =',float(f-1)*100,'%')
print('Dois descontos de 10% valem',float(1-F(9,10)**2)*100,'% de desconto, e não 20%')
print('Valor de 200 com +30% e depois -10%:',200*1.3*0.9)
print('\n--- 3. Pontos percentuais e porcentagem de porcentagem')
print('De 40% para 50% são 10 pontos percentuais e uma alta de',(50-40)/40*100,'%')
print('20% de 30% de 500 =',F(20,100)*F(30,100)*500)
print('\n--- 4. TRT-2 2018, questão 11 (salários e acréscimo de 130%)')
sol=[B for B in range(1,100000) if F(23,10)*F(3,7)*B+60==B]
B=sol[0]; A=F(3,7)*B; print('Bárbara =',B,'; Arthur =',A,'; soma =',A+B,'; conferência: 1800*2,3+60 =',A*F(23,10)+60)
confere('t2',11,letra_por_valor(A+B,[6000,5400,6200,6400,5900]))
print('\n--- 5. TRT-2 2018, questão 12 (tabela 2 x 2 com total 100)')
tot=100; H=70; M=30; M_jov=F(20,100)*M; jov=F(20,100)*tot; H_jov=jov-M_jov; H_velho=H-H_jov
print('mulheres jovens',M_jov,'; homens jovens',H_jov,'; homens com 40 anos ou mais',H_velho,'%')
confere('t2',12,letra_por_valor(H_velho,[52,48,56,54,45]))
print('\n--- 6. TRT-23 2022, questão 12 (perda de 4 bolinhas reduz a 90%)')
x=[n for n in range(1,1000) if F(n-4)==F(9,10)*n]; print('total antes =',x)
confere('t23',12,letra_por_valor(x[0],[40,60,80,32,44]))
print('\n--- 7. Médias')
dados=[4,8,8,10,15]
print('dados',dados,'aritmética',mean(dados),'mediana',median(dados),'moda',multimode(dados))
print('ponderada de 6 (peso 2) e 9 (peso 3):',(6*2+9*3)/(2+3))
print('geométrica de 2 e 8:',geometric_mean([2,8]),'; harmônica de 60 e 40 km/h (mesma distância):',harmonic_mean([60,40]),'km/h (e não 50)')
print('A média aritmética não é a velocidade média se os trechos têm a mesma distância: 120 km a 60 e 120 km a 40 levam',120/60+120/40,'h, média',240/(120/60+120/40))
print('\n--- 8. TRT-5 2022, questão 11 (média por partes)')
falta=71-6*F(13,2); media=falta/4; print('Pontos nas 6 primeiras =',6*F(13,2),'; faltam',falta,'; média nas 4 últimas =',float(media))
confere('t5',11,letra_por_valor(media,[7,F(15,2),8,F(17,2),9]))
print('\n--- 9. TRT-23 2022, questão 13 (média estritamente menor que 15)')
soma=13+14+14+16
idades=[i for i in range(1,40) if (soma+i)/5<15]; print('soma dos quatro =',soma,'; idades inteiras que mantêm a média < 15:',idades[0],'a',idades[-1])
confere('t23',13,letra_por_valor(max(idades),[17,18,16,19,15]))
