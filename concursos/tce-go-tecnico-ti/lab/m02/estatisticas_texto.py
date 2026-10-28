# -*- coding: utf-8 -*-
"""Estatísticas simples de um texto: palavras por período, vírgulas e conectivos por tipo.
Serve para enxergar a sua escrita (períodos longos e cheios de vírgulas são risco de ambiguidade)."""
import re,statistics
TEXTO='''O tribunal de contas fiscaliza a aplicação dos recursos públicos. Quando uma irregularidade é encontrada, o gestor é notificado, e o processo segue para análise técnica. Embora o prazo seja curto, a equipe precisa conferir os documentos, porque qualquer falha pode invalidar a decisão. Portanto, a clareza do relatório é essencial. Os auditores, que conhecem o processo, redigem o parecer; o relator, contudo, decide.'''
CONECT={'adição':['e','além disso','também'],'oposição':['mas','porém','contudo','todavia','embora'],'causa':['porque','pois','já que'],'tempo':['quando','enquanto','depois'],'conclusão':['portanto','logo','por isso'],'finalidade':['para que','a fim de']}
per=[p.strip() for p in re.split(r'(?<=[.!?])\s+',TEXTO) if p.strip()]
print(f'Períodos: {len(per)}')
tot=[]
for i,p in enumerate(per,1):
    w=re.findall(r"[\wÀ-ÿ-]+",p);v=p.count(',');tot.append(len(w))
    print(f'  período {i}: {len(w):2d} palavras, {v} vírgulas, {p.count(";")} ponto e vírgula')
print(f'Média: {statistics.mean(tot):.1f} palavras por período (maior: {max(tot)})')
low=TEXTO.lower();print('Conectivos por tipo:')
for tipo,lst in CONECT.items():
    c={x:len(re.findall(r'(?<![\wÀ-ÿ])'+re.escape(x)+r'(?![\wÀ-ÿ])',low)) for x in lst}
    print(f'  {tipo:10s} {sum(c.values())}  '+', '.join(f'{k}={v}' for k,v in c.items() if v))
