# L2: varre os textos oficiais e lista prazos e quantidades escritos com numero e extenso, por norma e artigo.
# Serve para montar a tabela de numeros da Teoria e para ver onde a norma e inconsistente.
import re,sys
sys.path.insert(0,'.'); from art import load,arts
FONTES=[('lgpd_atual','LGPD'),('mci_atual','Marco Civil'),('mp2200_atual','MP 2.200-2'),('lei14063','Lei 14.063'),('rn13_2016','RN 13/2016'),('ra14_2024','RA 14/2024'),('ra17_2024','RA 17/2024'),('ra14_2025','RA 14/2025'),('rn5_2024','RN 5/2024'),('lc205','LC 205/2025')]
UN=r'(?:dias úteis|dias|meses|mês|anos|ano|horas|membros|conselheiros)'
PAD=re.compile(r'(\d+(?:,\d+)?)\s*\(([^)]{2,40})\)\s*('+UN+')')
EXT={'um':1,'uma':1,'dois':2,'duas':2,'três':3,'quatro':4,'cinco':5,'seis':6,'sete':7,'oito':8,'nove':9,'dez':10,'onze':11,'doze':12,'quinze':15,'vinte':20,'trinta':30,'sessenta':60,'noventa':90,'cento e vinte':120,'vinte e quatro':24,'quarenta e oito':48,'oito':8,'trinta e seis':36}
tot=0;inc=[]
for f,rot in FONTES:
    t=load(f); a=arts(t); ach=[]
    for n,trs in a.items():
        for tr in trs:
            for m in PAD.finditer(tr):
                num,ext,un=m.group(1),m.group(2).strip(),m.group(3)
                v=EXT.get(ext.lower()); ok='' if v is None else ('OK' if float(v)==float(num.replace(',','.')) else 'DIVERGE')
                ach.append((n,num,ext,un,ok))
                if ok=='DIVERGE': inc.append((rot,n,num,ext,un))
    print('\n%s: %d ocorrencias de "N (extenso) unidade"'%(rot,len(ach)))
    for n,num,ext,un,ok in ach[:40]: print('  art. %-5s %s (%s) %s %s'%(n,num,ext,un,ok))
    tot+=len(ach)
print('\nTotal de ocorrencias:',tot)
print('Divergencias entre numero e extenso:',inc if inc else 'nenhuma')
