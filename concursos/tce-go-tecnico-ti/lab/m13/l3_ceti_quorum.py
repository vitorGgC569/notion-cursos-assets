# L3: RN 13/2016 (CETI): le os artigos de composicao e quorum e calcula o que cada numero implica.
import re,sys,math
sys.path.insert(0,'.'); import quotes
for k in ('rn13a3','rn13a9ii','rn13a11','rn13a13','rn13a19p3'):
    print(k,'=>',quotes.get(k)); print()
t=quotes.txt('rn13_2016')
for ch in ('Art. 12.','Art. 14.'):
    i=t.find(ch); print(t[i:i+520]); print()
tit,sup=7,4
print('composicao no art. 3: ate 11 (dez) membros; titulares=%d, suplentes=%d, soma=%d'%(tit,sup,tit+sup))
print('regra de 50 por cento mais um sobre 7 titulares: 3,5 + 1 = 4,5, logo',math.ceil(7*0.5+1),'membros')
print('regra de 50 por cento mais um sobre 11 membros: 5,5 + 1 = 6,5, logo',math.ceil(11*0.5+1),'membros')
print('quorum minimo literal do art. 9, II e do art. 14, p. unico: 4 membros')
print('Conclusao: os numeros nao fecham entre si (4 e menor que 50 por cento mais um de 7 ou de 11).')
print('Na prova, responda pelo artigo que a questao pede; o texto vigente e o do link oficial (nao testado depois de 28/10/2026).')
