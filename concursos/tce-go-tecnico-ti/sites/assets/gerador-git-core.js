/* Gerador de questoes de Git do Modulo 8: deterministico (mesma semente, mesma questao).
   A resposta certa vem do modelo git-core.js, que o Laboratorio L10 confere contra o Git real. */
(function(root){
'use strict';
var Git=root.GitSim||(typeof require!=='undefined'?require('./git-core.js'):null);
function rng(seed){var a=seed>>>0;return function(){a=(a+0x6D2B79F5)>>>0;var t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function ri(r,a,b){return a+Math.floor(r()*(b-a+1))}
function pick(r,arr){return arr[Math.floor(r()*arr.length)]}
function shuffle(r,arr){var a=arr.slice(),i,j,t;for(i=a.length-1;i>0;i--){j=Math.floor(r()*(i+1));t=a[i];a[i]=a[j];a[j]=t}return a}
var MSG=['login','cadastro','relatorio','busca','filtro','tema','api','teste','docs','layout','cache','export'];
var ARQ=['a.txt','b.txt','c.txt','d.txt','app.py','index.html','notas.md'];
function nomes(r,n){return shuffle(r,MSG).slice(0,n)}
function run(script){var g=new Git(),i;for(i=0;i<script.length;i++){var o=g.exec(script[i]);if(o.err&&!/^(CONFLICT|Automatic)/.test(o.err))throw new Error(script[i]+': '+o.err)}return g}
/* constroi opcoes: vals[0] certa; strings embaralhadas; numeros ordenados */
function variantes(c){
  var v=[],m=c.match(/\d+/);
  if(m){[1,-1,2,-2,3].forEach(function(d){var n=parseInt(m[0],10)+d;if(n>=0)v.push(c.replace(m[0],String(n)))})}
  var sw=[[/\?\? /g,'A  '],[/A  /g,'?? '],[/ M /g,'M  '],[/M  /g,' M '],[/ M/g,' D']];
  sw.forEach(function(p){var x=c.replace(p[0],p[1]);if(x!==c)v.push(x)});
  v.push('(vazio: nada a mostrar)');
  return v}
function opcoes(r,vals,num){
  var u=[],i,seen={};
  function add(x){var k=String(x);if(!seen[k]){seen[k]=1;u.push(x);return true}return false}
  for(i=0;i<vals.length;i++)add(vals[i]);
  var c=vals[0],d=1;
  while(u.length<5&&num){var x=c+(d%2?1:-1)*Math.ceil(d/2);d++;if(x>=0)add(x)}
  if(!num){var vs=variantes(String(c));for(i=0;i<vs.length&&u.length<5;i++)add(vs[i]);
    var n2=0;while(u.length<5&&n2<20){add(String(c)+(n2?' ('+n2+')':'')+'.');n2++}}
  u=u.slice(0,5);var o=num?u.slice().sort(function(a,b){return a-b}):shuffle(r,u);
  return {opcoes:o.map(String),certa:o.indexOf(c)}}
function fmtScript(s){return s.join('\n')}
function logLinha(g){var o=g.log({oneline:true,graph:true,all:true});return o.out}
function count(g,b){return Object.keys(g.anc(g.br[b])).length}
function st(g){return g.statusEntries().join(' | ')||'(vazio: nada a mostrar)'}
var T={};
/* 1. contagem de commits depois de um merge */
T.contagem={tema:'Merge e histórico',f:function(r,n){
  var m=nomes(r,8),k=0,s=['git init'],base=ri(r,1,2),a=ri(r,1,2+n),b=ri(r,1,1+n),noff=r()<0.5&&n>1;
  function c(arq,msg){s.push('echo "'+msg+'" > '+arq,'git add '+arq,'git commit -m "'+msg+'"')}
  for(var i=0;i<base;i++)c(ARQ[k++],m[i]);
  s.push('git switch -c feature');
  for(i=0;i<a;i++)c('f'+(i+1)+'.txt','f-'+m[(base+i)%8]+i);
  s.push('git switch main');
  var mm=n>1?ri(r,0,2):0;for(i=0;i<mm;i++)c('m'+(i+1)+'.txt','m-'+m[(base+a+i)%8]+i);
  s.push('git merge '+(noff?'--no-ff ':'')+'feature');
  var g=run(s),tot=count(g,'main'),np=g.c[g.tip()].p.length;
  var tipo=r()<0.5?0:1;
  var texto=fmtScript(s)+'\n\nQuantos commits aparecem em "git log --oneline" na branch main, e quantos pais tem o commit do topo?';
  var cert=tot+' commits e '+np+' pai'+(np>1?'s':'');
  var alts=[cert,(tot+1)+' commits e '+np+' pai'+(np>1?'s':''),tot+' commits e '+(3-np)+' pai'+(3-np>1?'s':''),(tot-1)+' commits e '+(3-np)+' pai'+(3-np>1?'s':''),(tot+2)+' commits e '+np+' pai'+(np>1?'s':'')];
  var O=opcoes(r,alts,false);
  var ff=(mm===0&&!noff);
  return {texto:texto,script:s,query:'count:main+parents',answer:tot+':'+np,opcoes:O.opcoes,certa:O.certa,
   passos:['Na main há '+base+' commit(s) antes da branch. A feature recebeu '+a+' e a main recebeu '+mm+'.',
    ff?'Como a main não andou, o merge é um avanço rápido (fast-forward): só move o ponteiro, sem commit novo e com 1 pai no topo.':'Como '+(noff?'foi usado --no-ff':'as duas branches divergiram')+', o merge cria um commit de junção com 2 pais.',
    'Total na main: '+base+' + '+a+' + '+mm+(ff?'':' + 1 (junção)')+' = '+tot+'.','Estado final:\n'+logLinha(g)]}}};
/* 2. status --short */
T.status={tema:'Git local',f:function(r,n){
  var s=['git init'],arq=shuffle(r,ARQ),i;
  s.push('echo "v1" > '+arq[0],'git add '+arq[0],'git commit -m "inicio"');
  s.push('echo "v2" > '+arq[0]);
  s.push('echo "novo" > '+arq[1]);
  if(n>1){s.push('git add '+arq[1])}
  if(n>2){s.push('echo "outro" > '+arq[2],'git add '+arq[0])}
  var g=run(s),cert=st(g);
  var texto=fmtScript(s)+'\n\nQual é a saída de "git status --short" ao final?';
  var map={'M':'M','A':'A'};
  var alts=[cert,cert.replace(/\?\?/g,'A '),cert.replace(/^ M/,'M ').replace(/\| M/,'| M'),cert.replace(/^A /,'??'),cert.replace(/M/g,'D')];
  alts=alts.filter(function(x,i,a){return a.indexOf(x)===i});
  var extra=['(vazio: nada a mostrar)',' M '+arq[0],'?? '+arq[0]+' | ?? '+arq[1],'A  '+arq[0]];
  extra.forEach(function(x){if(alts.indexOf(x)<0)alts.push(x)});
  var O=opcoes(r,alts.slice(0,5),false);
  return {texto:texto,script:s,query:'status',answer:cert,opcoes:O.opcoes,certa:O.certa,
   passos:['"??" é arquivo novo não rastreado; "A " é novo e preparado; " M" é alterado e não preparado; "M " é alterado e preparado (a primeira coluna é o índice, a segunda é o diretório de trabalho).',
    'Aplicando ao script, o resultado é: '+cert+'.']}}};
/* 3. reset */
T.reset={tema:'Reset, revert e stash',f:function(r,n){
  var m=nomes(r,6),s=['git init'],modos=['--soft','--mixed','--hard'],modo=pick(r,modos),tot=ri(r,2,2+n),i;
  for(i=0;i<tot;i++)s.push('echo "'+m[i]+'" > '+ARQ[i],'git add '+ARQ[i],'git commit -m "'+m[i]+'"');
  var back=ri(r,1,Math.min(2,tot-1));
  s.push('git reset '+modo+' HEAD~'+back);
  var g=run(s),cert=st(g),qt=count(g,'main');
  var texto=fmtScript(s)+'\n\nDepois do reset, quantos commits tem a main e qual é a saída de "git status --short"?';
  var alts=[qt+' commits; '+cert];
  ['--soft','--mixed','--hard'].forEach(function(mm){if(mm!==modo){var g2=run(s.slice(0,-1).concat(['git reset '+mm+' HEAD~'+back]));alts.push(count(g2,'main')+' commits; '+st(g2))}});
  alts.push((qt+1)+' commits; '+cert,(qt-1)+' commits; '+cert);
  alts=alts.filter(function(x,i,a){return a.indexOf(x)===i}).slice(0,5);
  var O=opcoes(r,alts,false);
  return {texto:texto,script:s,query:'count+status',answer:qt+':'+cert,opcoes:O.opcoes,certa:O.certa,
   passos:['O reset move a branch '+back+' commit(s) para trás: sobram '+qt+' commits na main.',
    modo==='--soft'?'--soft só move a branch: os arquivos dos commits desfeitos continuam no índice (preparados, "A ").':modo==='--mixed'?'--mixed (o padrão) move a branch e zera o índice: os arquivos viram não rastreados ("??").':'--hard move a branch e sobrescreve o índice e o diretório de trabalho: os arquivos dos commits desfeitos somem.',
    'Saída de status --short: '+cert+'.']}}};
/* 4. rebase */
T.rebase={tema:'Rebase e histórico linear',f:function(r,n){
  var m=nomes(r,8),s=['git init'],base=ri(r,1,2),a=ri(r,1,2+n),mm=ri(r,1,2+n),i;
  function c(arq,msg){s.push('echo "'+msg+'" > '+arq,'git add '+arq,'git commit -m "'+msg+'"')}
  for(i=0;i<base;i++)c(ARQ[i],m[i]);
  s.push('git switch -c feature');for(i=0;i<a;i++)c('f'+(i+1)+'.txt','f-'+m[(i+base)%8]+i);
  s.push('git switch main');for(i=0;i<mm;i++)c('m'+(i+1)+'.txt','m-'+m[(i+base+a)%8]+i);
  s.push('git switch feature','git rebase main');
  var g=run(s),tot=count(g,'feature'),np=g.c[g.br.feature].p.length;
  var texto=fmtScript(s)+'\n\nDepois do rebase, quantos commits tem a feature e quantos pais tem o commit do topo da feature?';
  var cert=tot+' commits e '+np+' pai';
  var alts=[cert,(tot+1)+' commits e 2 pais',tot+' commits e 2 pais',(tot-1)+' commits e '+np+' pai',(tot+1)+' commits e '+np+' pai'];
  var O=opcoes(r,alts,false);
  return {texto:texto,script:s,query:'count:feature+parents',answer:tot+':'+np,opcoes:O.opcoes,certa:O.certa,
   passos:['Antes: '+base+' commit(s) comuns, a feature com '+a+' e a main com '+mm+' próprios.','O rebase reaplica os '+a+' commits da feature sobre a ponta da main (eles ganham novos hashes) e não cria commit de junção.',
    'Total na feature: '+base+' + '+mm+' + '+a+' = '+tot+'; o topo tem 1 pai (história linear).','Estado final:\n'+logLinha(g)]}}};
/* 5. revert e arquivos */
T.revert={tema:'Reset, revert e stash',f:function(r,n){
  var m=nomes(r,6),s=['git init'],tot=ri(r,2,3+n),i;
  for(i=0;i<tot;i++)s.push('echo "'+m[i]+'" > '+ARQ[i],'git add '+ARQ[i],'git commit -m "'+m[i]+'"');
  s.push('git revert HEAD');
  var g=run(s),qt=count(g,'main'),files=Object.keys(g.wt).sort().join(', ')||'(nenhum)';
  var texto=fmtScript(s)+'\n\nDepois do revert, quantos commits tem a main e quais arquivos existem no diretório?';
  var antes=Object.keys(g.tree(g.c[g.tip()].p[0])).sort().join(', ');var alts=[qt+' commits; '+files,(qt-1)+' commits; '+antes,(qt-1)+' commits; '+files];
  alts.push((qt+1)+' commits; '+files);
  alts=alts.filter(function(x,i,a){return a.indexOf(x)===i}).slice(0,5);
  var O=opcoes(r,alts,false);
  return {texto:texto,script:s,query:'count+files',answer:qt+':'+files,opcoes:O.opcoes,certa:O.certa,
   passos:['O revert não apaga o commit: cria um novo commit que desfaz o efeito do último.','Por isso a main passa de '+tot+' para '+qt+' commits, e o arquivo criado pelo último commit deixa de existir.','Arquivos: '+files+'.']}}};
/* 6. stash */
T.stash={tema:'Reset, revert e stash',f:function(r,n){
  var s=['git init'],a0=pick(r,ARQ);
  s.push('echo "v1" > '+a0,'git add '+a0,'git commit -m "base"','echo "v2" > '+a0);
  var pop=r()<0.5||n>1;
  s.push('git stash');if(pop)s.push('git stash pop');
  var g=run(s),cert=st(g),mid=run(s.slice(0,pop?-1:s.length));
  var texto=fmtScript(s)+'\n\nQual é a saída de "git status --short" ao final?';
  var alts=[cert,'(vazio: nada a mostrar)',' M '+a0,'M  '+a0,'?? '+a0];
  alts=alts.filter(function(x,i,a){return a.indexOf(x)===i});
  var O=opcoes(r,alts.slice(0,5),false);
  return {texto:texto,script:s,query:'status',answer:cert,opcoes:O.opcoes,certa:O.certa,
   passos:['O "git stash" guarda a alteração (v2) em uma pilha e deixa o diretório igual ao último commit: status vazio.',pop?'O "git stash pop" devolve a alteração ao diretório, não preparada: aparece " M".':'Sem o pop, a alteração continua guardada na pilha.','Saída final: '+cert+'.']}}};
var ORDEM=['contagem','status','reset','rebase','revert','stash'];
var NIV={1:[0,1,2,3,4,5],2:[0,1,2,3,4,5],3:[0,1,2,3,4,5]};
function gerar(tema,nivel,seed){
  var ids=ORDEM.filter(function(id){return tema==='Todos'||T[id].tema===tema});
  var r=rng(seed*2654435761>>>0),id=ids[Math.floor(r()*ids.length)];
  var q=T[id].f(r,nivel);q.tema=T[id].tema;q.nivel=nivel;q.seed=seed;q.id=id;return q}
function temas(){var o=[];ORDEM.forEach(function(id){if(o.indexOf(T[id].tema)<0)o.push(T[id].tema)});return o}
root.GQ={gerar:gerar,temas:temas,rng:rng,ORDEM:ORDEM,T:T};
if(typeof module!=='undefined')module.exports=root.GQ;
})(typeof window!=='undefined'?window:globalThis);
