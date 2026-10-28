# -*- coding: utf-8 -*-
"""L10: relatório de cobertura. Roda os scripts L1 a L9 e confirma que cada questão real foi resolvida por código e bate com o gabarito oficial."""
import json,subprocess,sys,os
from collections import Counter
from common import GAB,ORG
D=os.path.dirname(os.path.abspath(__file__))
if os.path.exists(os.path.join(D,'conferidas.json')): os.remove(os.path.join(D,'conferidas.json'))
for f in sorted(x for x in os.listdir(D) if x[:2]=='l0' and x.endswith('.py')):
    r=subprocess.run([sys.executable,os.path.join(D,f)],capture_output=True,text=True,cwd=D)
    print(f'{f}: {"ok" if r.returncode==0 else "FALHOU"}')
    assert r.returncode==0,r.stderr
reg=json.load(open(os.path.join(D,'conferidas.json')))
falta=[k for k in GAB if f'{k[0]}-{k[1]}' not in reg]
print('\nQuestões reais no banco:',len(GAB),'| conferidas por código:',len(reg),'| sem conferência:',falta)
print('Divergências com o gabarito oficial:',[k for k,(l,ok) in reg.items() if not ok])
print('\nPor prova:')
c=Counter(k[0] for k in GAB)
for s,n in c.items(): print(f'  {ORG[s]}: {n} questões, {sum(1 for k,(l,ok) in reg.items() if k.split("-")[0]==s and ok)} conferidas')
print('\nDistribuição das letras do gabarito:',dict(sorted(Counter(GAB.values()).items())))
assert not falta and all(ok for l,ok in reg.values())
