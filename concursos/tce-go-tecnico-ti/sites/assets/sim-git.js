(function(){
'use strict';
var K=window.K,G=new window.GitSim(),KEY='tcegoti:m08-sim-git',S=K.store.get(KEY,{})||{};S.done=S.done||{};
var did={};
var MIS=[
 {id:'m1',t:'Primeiro commit',d:'Inicie o repositório (git init), crie um arquivo, prepare-o (git add) e faça o commit.',ok:function(g){return !!g.tip()}},
 {id:'m2',t:'Branch de funcionalidade',d:'Crie a branch feature com git switch -c feature e faça nela um commit.',ok:function(g){return !!g.br.feature&&g.br.feature!==g.br.main}},
 {id:'m3',t:'Merge com commit de junção',d:'Volte para a main e execute git merge --no-ff feature. O commit do topo deve ter dois pais.',ok:function(g){var t=g.tip();return !!t&&g.c[t].p.length===2}},
 {id:'m4',t:'Resolva um conflito',d:'Altere a mesma linha do mesmo arquivo em duas branches, faça o merge, veja UU no status, resolva com echo, git add e git commit.',ok:function(g){return did.conflict&&!g.merging&&g.tip()&&g.c[g.tip()].p.length===2}},
 {id:'m5',t:'História linear com rebase',d:'Em uma branch com commits próprios, execute git rebase main depois que a main avançou.',ok:function(){return !!did.rebase}},
 {id:'m6',t:'Desfazer com revert',d:'Faça um commit e desfaça-o com git revert HEAD sem reescrever a história.',ok:function(g){var t=g.tip();return !!t&&/^Revert /.test(g.c[t].msg)}},
 {id:'m7',t:'Guardar trabalho com stash',d:'Altere um arquivo rastreado, use git stash e depois git stash pop.',ok:function(){return !!did.stashpop}},
 {id:'m8',t:'Voltar no tempo com reset',d:'Use git reset --soft, --mixed ou --hard HEAD~1 e veja o status e o log.',ok:function(){return !!did.reset}}
];
var out=K.$('#tout'),inp=K.$('#tin'),hist=[],hp=0;
function line(t,cls){var d=document.createElement('div');d.className='ln'+(cls?' '+cls:'');d.textContent=t;out.appendChild(d);out.scrollTop=out.scrollHeight;if(out.parentNode)out.parentNode.scrollTop=out.parentNode.scrollHeight}
function track(cmd,o){
  if(o.err&&!/^(CONFLICT|Automatic)/.test(o.err)&&!/^(CONFLICT|Automatic)/.test(o.out||''))return;
  if(/^git merge/.test(cmd)&&G.merging)did.conflict=true;
  if(/^git rebase/.test(cmd)&&/Successfully rebased/.test(o.out||''))did.rebase=true;
  if(/^git stash pop/.test(cmd)&&!o.err)did.stashpop=true;
  if(/^git reset/.test(cmd)&&!o.err)did.reset=true}
function run(cmd){
  line('ana@dev:~/projeto$ '+cmd,'ps');
  var o=G.exec(cmd);
  if(o.clear){out.innerHTML='';return}
  if(o.err&&!(o.out))line(o.err,'err');
  else{if(o.out)line(o.out);if(o.err)line(o.err,'err')}
  track(cmd,o);draw();missions()}
function xy(i,l){return {x:30+i*58,y:62+l*46}}
function draw(){
  var d=G.dag(),svg=K.$('#dag'),h='',n=d.ids.length,i,tip=G.tip();
  if(!n){svg.setAttribute('viewBox','0 0 360 90');svg.innerHTML='<text x="14" y="46" fill="currentColor" font-size="13">O grafo de commits aparece aqui. Comece com git init.</text>';return}
  var W=Math.max(360,110+n*58),Hh=62+d.lanes*46+24,pos={};
  d.ids.forEach(function(id,k){pos[id]=xy(k,d.lane[id])});
  svg.setAttribute('viewBox','0 0 '+W+' '+Hh);
  d.ids.forEach(function(id){G.c[id].p.forEach(function(p){var a=pos[id],b=pos[p];h+='<path d="M'+b.x+' '+b.y+' C'+(b.x+24)+' '+b.y+' '+(a.x-24)+' '+a.y+' '+a.x+' '+a.y+'" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/>'})});
  d.ids.forEach(function(id){var p=pos[id],isT=id===tip;
    h+='<circle cx="'+p.x+'" cy="'+p.y+'" r="'+(isT?9:7)+'" fill="'+(isT?'var(--accent,#2f6f5e)':'var(--surface,#fff)')+'" stroke="currentColor" stroke-width="2"/>';
    h+='<text x="'+p.x+'" y="'+(p.y+24)+'" text-anchor="middle" font-size="10" fill="currentColor" font-family="monospace">'+id.slice(0,5)+'</text>'});
  var lab={};Object.keys(G.br).forEach(function(b){(lab[G.br[b]]=lab[G.br[b]]||[]).push(b)});Object.keys(G.tags).forEach(function(t){(lab[G.tags[t]]=lab[G.tags[t]]||[]).push('tag '+t)});
  Object.keys(lab).forEach(function(id){var p=pos[id];lab[id].forEach(function(b,j){var cur=(b===G.head.b),lb=(cur?'HEAD → ':'')+b,w=lb.length*6.6+14,y=p.y-30-j*18;
    h+='<rect x="'+(p.x-w/2)+'" y="'+y+'" width="'+w+'" height="16" rx="8" fill="'+(cur?'var(--accent,#2f6f5e)':'var(--surface-2,#eee)')+'" stroke="currentColor" stroke-opacity=".35"/><text x="'+p.x+'" y="'+(y+12)+'" text-anchor="middle" font-size="10.5" fill="'+(cur?'#fff':'currentColor')+'" font-family="monospace">'+K.esc(lb)+'</text>'})});
  svg.innerHTML=h}
function missions(){
  var h='',nd=0;
  MIS.forEach(function(m,i){var okk=!!S.done[m.id];if(!okk){try{if(m.ok(G)){S.done[m.id]=1;okk=true}}catch(e){}}if(okk)nd++;
    h+='<li style="list-style:none;margin:8px 0;display:flex;gap:10px;align-items:flex-start"><span class="pill'+(okk?' acc':'')+'" style="flex:none">'+(okk?'feita':(i+1))+'</span><span><b>'+K.esc(m.t)+'</b><br><span style="font-size:13px;color:var(--muted)">'+K.esc(m.d)+'</span></span></li>'});
  K.store.set(KEY,S);
  K.$('#mis').innerHTML='<p class="kicker">Missões ('+nd+' de '+MIS.length+')</p><ul style="padding:0;margin:0">'+h+'</ul>'}
K.$('#tbox').addEventListener('click',function(){inp.focus()});
inp.addEventListener('keydown',function(e){
  if(e.key==='Enter'){var v=inp.value;inp.value='';if(v.trim()){hist.push(v);hp=hist.length;run(v)}}
  else if(e.key==='ArrowUp'){if(hp>0){hp--;inp.value=hist[hp];e.preventDefault()}}
  else if(e.key==='ArrowDown'){if(hp<hist.length-1){hp++;inp.value=hist[hp]}else{hp=hist.length;inp.value=''}}});
K.$('#reset').addEventListener('click',function(){G.reset0();did={};out.innerHTML='';line('Repositório reiniciado. Digite help para ver os comandos.','dim');draw();missions()});
var ex=K.$$('[data-ex]');ex.forEach(function(b){b.addEventListener('click',function(){var cs=b.getAttribute('data-ex').split(';;');cs.forEach(function(c){run(c.trim())})})});
K.$('#zera').addEventListener('click',function(){S={done:{}};did={};K.store.set(KEY,S);missions()});
line('Simulador didático de Git. É um modelo, não o Git: veja os limites no fim da página. Digite help.','dim');
draw();missions();
window.__sim={run:run,G:G};
})();
