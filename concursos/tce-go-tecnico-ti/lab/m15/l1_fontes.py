# -*- coding: utf-8 -*-
# L1: lista as fontes guardadas em fontes/ (tamanho, SHA-256, palavras e URL de origem lida do fetch.sh).
import os,hashlib,re
H=os.path.dirname(os.path.abspath(__file__)); F=os.path.join(H,'fontes')
URL={}
for ln in open(os.path.join(H,'fetch.sh'),encoding='utf-8'):
    m=re.match(r'^([\w.]+)\|(https?://\S+)$',ln.strip())
    if m:
        f=m.group(1)
        if f.endswith('.html'): f=f[:-5]+'.clean.txt'
        if f.endswith('.pdf'): f=f[:-4]+'.txt'
        URL[f]=m.group(2)
LOCAL={'edital_cap7.txt':'Edital 01/2026 do TCE-GO, capitulo 7 (PDF oficial; trecho copiado)','edital_cap8.txt':'Edital 01/2026, capitulo 8 (trechos 8.12, 8.20, 8.21, 8.33)',
 'edital_cap11_12.txt':'Edital 01/2026, capitulos 11 e 12','edital_cronograma.txt':'Edital 01/2026, Anexo III (cronograma previsto)',
 'trf4_2019_prova.txt':'Prova Estudo de Caso, TRF-4 2019, caderno 04 tipo 001 (PDF do agregador eticaconcursos.com.br), paginas 16 e 17 e o edital citado na capa',
 'gran2024_pagina.txt':'TRT-20 2024, questao 3558872: texto da pagina do agregador Gran Questoes (enunciado e itens do edital)'}
print('%-26s %9s %8s  %-12s %s'%('arquivo','bytes','palavras','sha256','origem'))
n=0
for f in sorted(set(URL)|set(LOCAL)):
    p=os.path.join(F,f)
    if not os.path.exists(p): print('%-26s AUSENTE'%f); continue
    b=open(p,'rb').read(); w=len(re.findall(r'\w+',b.decode('utf-8','ignore')))
    print('%-26s %9d %8d  %-12s %s'%(f,len(b),w,hashlib.sha256(b).hexdigest()[:12],URL.get(f) or LOCAL[f])); n+=1
print('\n%d arquivos. Baixados em 28/10/2026 (fetch.sh). Paginas web mudam: o conteudo vale para essa data. Os PDFs originais nao foram copiados para o repositorio.'%n)
