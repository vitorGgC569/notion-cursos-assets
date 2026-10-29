# -*- coding: utf-8 -*-
# L5: (1) mede onde os termos do glossario aparecem nas fontes em ingles; (2) confere os 9 codigos HTTP do desafio contra a pagina da MDN.
import os,sys,re
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import cx14, quotes14 as Q
F=Q.FONTES
FILES=['rfc2119.txt','rfc9110.txt','semver.clean.txt','mdn_status.clean.txt','keepachangelog.clean.txt','py_venv.clean.txt','git_commit.clean.txt','man_curl.clean.txt','openapi.clean.txt','pg_backup.clean.txt']
TXT={f:open(os.path.join(F,f),encoding='utf-8',errors='ignore').read().lower() for f in FILES}
TERMS=['deprecated','endpoint','request','response','payload','rate limiting','idempotent','safe','must','should','may','backward compatible','language-agnostic','self-contained','workaround','timeout','changelog','pre-release','library','parameter','header','body','install','troubleshoot','default','retry','obsolete','specification']
print('== 1. Frequencia dos termos nas 10 fontes em ingles (contagem simples, sem diferenciar maiusculas)')
print('%-20s %6s  %s'%('termo','total','fontes onde aparece'))
for t in TERMS:
    c={f:len(re.findall(r'(?<![a-z])'+re.escape(t),TXT[f])) for f in FILES}; tot=sum(c.values())
    onde=', '.join('%s:%d'%(f.split('.')[0],n) for f,n in sorted(c.items(),key=lambda x:-x[1]) if n)[:80]
    print('%-20s %6d  %s'%(t,tot,onde if tot else 'NAO aparece nas fontes baixadas'))
print('\n== 2. Codigos HTTP do desafio contra a pagina da MDN (linha do codigo e frase seguinte)')
L=[l.strip() for l in open(os.path.join(F,'mdn_status.clean.txt'),encoding='utf-8').read().split('\n')]
ok=bad=0
for k,idx,exp in cx14.HTTP_MAP:
    label=cx14.M_HTTP['labels'][idx]; frase=Q.get(k)
    pos=[i for i,l in enumerate(L) if l.startswith(label.split(' ')[0]+' ')]
    achou=False
    for i in pos:
        if Q.norm(L[i]).startswith(Q.norm(label)) and Q.norm(frase)[:40] in Q.norm(' '.join(L[i+1:i+3])): achou=True
    ok+=achou; bad+=(not achou)
    print('%-5s %-28s %s'%('OK' if achou else 'FALHA',label,frase[:70]))
print('\nRESUMO: %d codigos conferidos OK, %d falhas'%(ok,bad))
