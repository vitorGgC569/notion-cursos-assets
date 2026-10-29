# L6: PDTI 2025-2026 do TCE-GO. (1) conta os codigos de iniciativas das Tabelas 2 e 3 no texto extraido do PDF;
# (2) le as notas de prioridade da Tabela 2; (3) testa se cada nota e compativel com a SOMA dos 7 criterios da Tabela 1.
# Limite: o PDTI nao traz a formula por escrito; a soma e uma hipotese didatica que o laboratorio testa por compatibilidade.
import re,sys,itertools
sys.path.insert(0,'.'); import quotes
t=quotes.txt('pdti')
i2=t.find('Tabela 2 - Iniciativas sem custo'); i3=t.find('Tabela 3 - Iniciativas com custo'); i4=t.find('Tabela 4 - Portf')
s2,s3=t[i2:i3],t[i3:i4]
A=sorted(set(re.findall(r'\bA(\d{1,2})\b',s2)),key=int); C=sorted(set(re.findall(r'\bC(\d{1,2})\b',s3)),key=int)
print('Tabela 2 (sem custo): codigos distintos encontrados:',len(A),'de A%s a A%s'%(A[0],A[-1]))
print('Tabela 3 (com custo): codigos distintos encontrados:',len(C),'de C%s a C%s'%(C[0],C[-1]))
notas=[float(x.replace(',','.')) for x in re.findall(r'(?:SEC-[A-Z]+|DI-[A-Z]+|GPRES) (\d{2,3}(?:,\d)?)\b',s2)]
print('\nnotas de prioridade lidas na Tabela 2: %d valores; maior %.1f; menor %.1f'%(len(notas),max(notas),min(notas)))
print('em ordem decrescente?', notas==sorted(notas,reverse=True), '(o texto diz que a lista segue a ordem de prioridade)')
# criterios da Tabela 1
disc={'CP02':(10,5,2.5),'CP03':(10,5,2.5),'CP04':(10,5,2.5),'CP05':(2.5,5,10),'CP06':(2.5,5,10),'CP07':(2.5,5,10)}
somas=set()
for combo in itertools.product(*disc.values()): somas.add(sum(combo))
print('\ncriterios discretos (CP02 a CP07): %d combinacoes, %d somas distintas, de %.1f a %.1f'%(3**6,len(somas),min(somas),max(somas)))
print('CP01 vai de 1 a 50 (nota dada pela Presidencia). Soma teorica: minimo %.1f, maximo %.1f'%(1+min(somas),50+max(somas)))
incomp=[]
for n in sorted(set(notas),reverse=True):
    cabe=[cp1 for cp1 in range(1,51) if (n-cp1) in somas]
    print('nota %6.1f: compativel com a soma? %s%s'%(n,'sim' if cabe else 'NAO','' if not cabe else ' (CP01 possiveis: %d a %d)'%(min(cabe),max(cabe))))
    if not cabe: incomp.append(n)
print('\nnotas incompativeis com a soma de numeros inteiros em CP01:',incomp if incomp else 'nenhuma')
print('Teste fraco: como CP01 varia de 1 a 50, quase toda nota cabe em alguma combinacao.')
print('Observacao: compatibilidade nao prova a formula. O PDTI nao traz formula escrita; a calculadora do curso e um modelo didatico.')
