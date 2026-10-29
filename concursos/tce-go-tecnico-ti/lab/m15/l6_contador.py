# -*- coding: utf-8 -*-
# L6: o contador de linhas do site (JavaScript, em Node) deve dar o mesmo resultado que o de linhas15.py (Python)
# nas respostas-modelo, em casos de borda e em 300 textos aleatorios (semente fixa).
import json,subprocess,random,os,cases15 as C,linhas15 as L
H=os.path.dirname(os.path.abspath(__file__))
JS=os.path.join(H,'..','..','..','nca-m13','concursos','tce-go-tecnico-ti','sites','assets','discursiva-core.js')
if not os.path.exists(JS): JS='/workspace/nca-m13/concursos/tce-go-tecnico-ti/sites/assets/discursiva-core.js'
casos=[('vazio',''),('uma palavra','abc'),('so espacos','   \n  '),('enter no fim','a\n\nb\n\n\n'),('linha em branco no meio','a\n\nb'),('palavra gigante','x'*200),('exato 90','a'*45+' '+'b'*44),('91 com espaco','a'*45+' '+'b'*45)]
for c in C.ALL: casos.append(('modelo '+c['id'],'\n'.join(c['modelo'])))
rnd=random.Random(15); W=['segurança','de','da','backup','PostgreSQL','autenticação','a','LGPD','incidente','Resolução','CD/ANPD','15/2024','x'*30,'y'*95]
for i in range(300):
    n=rnd.randint(0,120); t=''
    for _ in range(n): t+=rnd.choice(W)+rnd.choice([' ',' ',' ','  ','\n','\n\n'])
    casos.append(('aleatorio %d'%i,t))
cpls=[60,90,120]
payload=json.dumps([[n,t] for n,t in casos])
js="const C=require(%s);const a=JSON.parse(require('fs').readFileSync(0,'utf8'));console.log(JSON.stringify(a.map(([n,t])=>[60,90,120].map(c=>C.countLines(t,c)))))"%json.dumps(JS)
r=subprocess.run(['node','-e',js],input=payload,capture_output=True,text=True)
if r.returncode: print('FALHA ao rodar node:',r.stderr[:300]); raise SystemExit(1)
out=json.loads(r.stdout); bad=0
for (n,t),o in zip(casos,out):
    p=[L.count_lines(t,c) for c in cpls]
    if p!=o: bad+=1; print('DIVERGE',n,p,o)
    elif not n.startswith('aleatorio'): print('%-24s OK  linhas a 60/90/120: %s'%(n,o))
print('\n%d textos x 3 larguras: %d divergencias entre JavaScript e Python.'%(len(casos),bad))
print('Node:',subprocess.run(['node','--version'],capture_output=True,text=True).stdout.strip())
