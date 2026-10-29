# L7: extrai dos textos oficiais (GNOI) fatos das politicas: principios da PSI (RA 17/2024, art. 8), niveis do planejamento (RA 15/2024, art. 4),
# encarregado LGPD (RN 5/2024, art. 16) e responsavel pela Politica de Comunicacao (RA 19/2024, art. 3).
import re,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'fontes')
def t(f): return re.sub(r'\s+',' ',open(os.path.join(D,f+'.clean.txt')).read())
def trecho(f,ini,fim):
    x=t(f); i=x.find(ini); j=x.find(fim,i+1); return x[i:j]
a8=trecho('ra17_2024','Art. 8º','Art. 9º')
pr=re.findall(r'[IVX]+ - ([a-zçãéíóú]+):',a8)
print('RA 17/2024, art. 8: %d principios:'%len(pr),', '.join(pr))
a4=trecho('ra15_2024','Art. 4º','Art. 5º')
niv=re.findall(r'(I{1,3}) - no nível (\w+), ([^;.]+)',a4)
print('\nRA 15/2024, art. 4: %d niveis'%len(niv))
for r,n,p in niv: print('  ',r,n,'->',p.strip())
a16=trecho('rn5_2024','Art. 16.','§2º')
print('\nRN 5/2024, art. 16:',a16.strip()[:200])
a3=trecho('ra19_2024','Art. 3º','Art. 4º')
print('\nRA 19/2024, art. 3:',a3.strip())
a7=trecho('ra17_2024','Art. 7º','Art. 8º')
print('\nRA 17/2024, art. 7:',a7.strip()[:260])
