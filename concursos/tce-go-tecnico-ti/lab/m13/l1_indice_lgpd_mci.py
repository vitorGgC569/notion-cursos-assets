# L1: indexa a LGPD e o Marco Civil a partir do texto oficial baixado (Camara dos Deputados, texto atualizado)
import re,sys
sys.path.insert(0,'.'); from art import load,arts
for nome,rot in (('lgpd_atual','LGPD (Lei 13.709/2018)'),('mci_atual','Marco Civil (Lei 12.965/2014)')):
    t=load(nome); a=arts(t)
    nums=sorted(a,key=lambda k:(int(re.match(r'\d+',k).group()),k))
    print(rot,'| artigos distintos encontrados:',len(nums),'| maior numero:',max(int(re.match(r'\d+',k).group()) for k in nums))
    print('  artigos com mais de um trecho (referencias no texto ou redacoes):',[k for k in nums if len(a[k])>1][:12],'...')
# LGPD: contagens de incisos
t=load('lgpd_atual'); a=arts(t)
rom=['I','II','III','IV','V','VI','VII','VIII','IX','X']
def conta(art,n=10):
    s=a[art][0]; achados=[r for r in rom if re.search(r'(?:^|[:;.)] |ou )'+r+r' ?- ',s)]
    return achados
print('\nLGPD art. 6 (principios): incisos encontrados',conta('6'),'=>',len(conta('6')),'principios')
print('LGPD art. 7 (bases legais): incisos encontrados',conta('7'),'=>',len(conta('7')),'bases')
s=a['52'][0]; print('LGPD art. 52 (sancoes): incisos citados:',[r for r in ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'] if re.search(r'(?:^|[:;.)] |ou )'+r+r' ?- ',s)])
for k in ('3','4','5'):
    print('LGPD art.',k,'trecho inicial:',a[k][0][:160],'...')
# Marco Civil: artigos de guarda e responsabilidade
m=load('mci_atual'); b=arts(m)
for k in ('9','13','14','15','19','21'):
    print('MCI art.',k,':',b[k][0][:230],'...')
