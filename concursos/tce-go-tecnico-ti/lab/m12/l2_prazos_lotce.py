# L2: extrai todos os prazos numericos (dias, anos, meses) da LOTCE, com o artigo
import re,sys
sys.path.insert(0,'.'); from art import load,arts
a=arts(load('fontes/lei16168.clean.txt'))
pat=re.compile(r'(\d{1,3}) \(([a-zçãé ]+)\) (dias|anos|ano|meses|horas|dia)')
rows=[]
for k in sorted(a,key=lambda k:(int(re.match(r'\d+',k).group()),k)):
    txt=a[k][0]
    # corta a versao: ate o proximo marcador de artigo/capitulo
    txt=re.split(r' (?:CAPÍTULO|SEÇÃO|TÍTULO) ',txt)[0]
    for m in pat.finditer(txt):
        ctx=txt[max(0,m.start()-60):m.end()+30]
        rows.append((k,m.group(1)+' '+m.group(3),ctx))
print('ocorrencias de prazo:',len(rows))
for k,p,c in rows: print(f'art. {k:<6} {p:<9} ...{c}...')
