# L1: indexa a Lei Organica (Lei 16.168/2007) a partir do texto oficial baixado
import re,sys,collections
sys.path.insert(0,'.'); from art import load,arts
t=load('fontes/lei16168.clean.txt'); a=arts(t)
nums=sorted(a,key=lambda k:(int(re.match(r'\d+',k).group()),k))
print('artigos distintos encontrados:',len(nums),'| maior numero:',max(int(re.match(r'\d+',k).group()) for k in nums))
print('artigos com mais de uma versao no PDF compilado:',sum(1 for k in a if len(a[k])>1))
print('sufixados (-A etc.):',[k for k in nums if '-' in k])
vet=[k for k in nums if re.match(r'Art\. \S+\s+VETADO\.',a[k][0])]
print('artigos integralmente vetados (nao existem no direito vigente):',vet)
# titulos
ti=[(m.start(),m.group(1)) for m in re.finditer(r'TÍTULO ([IVX]+) (?:\d+ )?(?=D[AEO]S? |DISPOSI)',t)]
seen={}
for pos,r in ti: seen.setdefault(r,pos)
order=sorted(seen.items(),key=lambda x:x[1])
def nome(pos):
    m=re.match(r'TÍTULO [IVX]+ (?:\d+ )?((?:D[AEO]S? |DISPOSI)[A-ZÀ-Ú ,]+?)(?= \d* ?CAPÍTULO| Art\.| SEÇÃO)',t[pos:pos+200]); return m.group(1) if m else '?'
pos_art={k:t.find(a[k][0][:40]) for k in nums}
print('\nartigos por titulo (posicao da primeira ocorrencia no texto):')
for idx,(r,pos) in enumerate(order):
    end=order[idx+1][1] if idx+1<len(order) else len(t)
    ks=[k for k in nums if pos<=pos_art[k]<end]
    if ks: print(f'  Titulo {r:<5} {nome(pos):<40} arts. {ks[0]} a {ks[-1]} ({len(ks)})')
