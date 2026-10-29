(function(){
var TD=window.TD,$=function(s,r){return (r||document).querySelector(s)};
var PROMPT=TD.prompt+' ';
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
var embed=/[?&]embed=1/.test(location.search)||window.self!==window.top;
if(embed)document.documentElement.classList.add('compact');
var full=$('#full');if(full){full.href=location.href.replace(/[?&]embed=1/,'');if(window.top===window.self)full.style.display='none'}
/* abas */
var tabs=document.querySelectorAll('.tabs button');
function showTab(id){tabs.forEach(function(b){b.setAttribute('aria-selected',b.dataset.t===id)});$('#v-passo').hidden=id!=='passo';$('#v-vez').hidden=id!=='vez';if(id!=='passo')stopPlay();try{history.replaceState(null,'','#'+id)}catch(e){}}
tabs.forEach(function(b){b.onclick=function(){showTab(b.dataset.t)}});
/* ============ passo a passo ============ */
var flat=[];TD.parts.forEach(function(p,pi){p.steps.forEach(function(s,si){flat.push({p:pi,s:si,step:s})})});
var cur=0,playing=false,timer=null,speed=1,token=0;
var scr=$('#scr'),exp=$('#exp'),ctr=$('#ctr'),chips=$('#chips');
TD.parts.forEach(function(p,pi){var b=el('button','chip',p.title);b.onclick=function(){go(flat.findIndex(function(f){return f.p===pi}))};chips.appendChild(b)});
function markedHTML(out,notes,hidden){var h='',pos=0;notes.forEach(function(n,i){h+=esc(out.slice(pos,n.a))+'<span class="mk'+(hidden?' hid':'')+'" data-n="'+(i+1)+'" id="mk'+i+'">'+esc(out.slice(n.a,n.b))+'</span>';pos=n.b});return h+esc(out.slice(pos))}
function entryHTML(step,withMarks){return '<span class="pr">'+esc(PROMPT)+'</span><span class="cm">'+esc(step.cmd)+'</span>\n'+(step.out!==''?(withMarks?markedHTML(step.out,step.notes,false):esc(step.out))+'\n':'')}
function clearTimers(){token++;clearTimeout(timer)}
function wait(ms,t){return new Promise(function(r){timer=setTimeout(function(){r(t===token)},ms)})}
function setExp(step,reveal){exp.innerHTML='';exp.appendChild(el('p','w',esc(step.what)));var ol=el('ol');step.notes.forEach(function(n,i){var li=el('li',reveal?'show':'','<b>'+(i+1)+'</b><span>'+esc(step.out.slice(n.a,n.b)).replace(/^(.*)$/s,'<code>$1</code>')+': '+esc(n.t)+'</span>');li.dataset.i=i;li.onmouseenter=function(){var m=$('#mk'+i);if(m)m.classList.add('on')};li.onmouseleave=function(){var m=$('#mk'+i);if(m)m.classList.remove('on')};ol.appendChild(li)});if(step.notes.length)exp.appendChild(ol)}
function upd(){var f=flat[cur];ctr.textContent='Passo '+(cur+1)+' de '+flat.length;chips.childNodes.forEach(function(c,i){c.setAttribute('aria-current',i===f.p)});$('#prev').disabled=cur===0;$('#next').disabled=cur===flat.length-1;$('#intro').textContent=TD.parts[f.p].intro;$('#prog').style.width=((cur+1)/flat.length*100)+'%'}
function renderStatic(i){clearTimers();var f=flat[i],h='';for(var k=0;k<=i;k++){if(flat[k].p!==f.p)continue;h+=entryHTML(flat[k].step,k===i)}scr.innerHTML=h;scr.scrollTop=scr.scrollHeight;setExp(f.step,true);upd()}
async function animate(i,auto){var t=(++token);clearTimeout(timer);var f=flat[i],step=f.step,h='';for(var k=0;k<i;k++){if(flat[k].p===f.p)h+=entryHTML(flat[k].step,false)}scr.innerHTML=h;setExp(step,false);upd();
 var base=scr.innerHTML,cmd=step.cmd,typed='';
 var line=el('span');scr.appendChild(line);
 for(var c=0;c<=cmd.length;c++){line.innerHTML='<span class="pr">'+esc(PROMPT)+'</span><span class="cm">'+esc(cmd.slice(0,c))+'</span><span class="cur"></span>';scr.scrollTop=scr.scrollHeight;if(!await wait((c===0?350:28+Math.random()*30)/speed,t))return}
 line.innerHTML='<span class="pr">'+esc(PROMPT)+'</span><span class="cm">'+esc(cmd)+'</span>\n';
 if(!await wait(260/speed,t))return;
 var out=step.out;if(out!==''){var L=out.split('\n'),acc='';var chunk=Math.max(1,Math.ceil(L.length/40));var o=el('span');scr.appendChild(o);for(var j=0;j<L.length;j+=chunk){acc=L.slice(0,j+chunk).join('\n');o.textContent=acc;scr.scrollTop=scr.scrollHeight;if(!await wait(40/speed,t))return}
  o.innerHTML=markedHTML(out,step.notes,true)+'\n'}
 scr.scrollTop=scr.scrollHeight;
 for(var n=0;n<step.notes.length;n++){if(!await wait(auto?900/speed:350/speed,t))return;var m=$('#mk'+n);if(m)m.classList.remove('hid');var li=exp.querySelectorAll('li')[n];if(li)li.classList.add('show');
  if(auto){if(!await wait(Math.min(5200,1200+step.notes[n].t.length*38)/speed,t))return}}
 if(auto&&playing){if(!await wait(1200/speed,t))return;if(cur<flat.length-1){cur++;animate(cur,true)}else stopPlay()}
}
function go(i){stopPlay();cur=Math.max(0,Math.min(flat.length-1,i));animate(cur,false)}
function stopPlay(){playing=false;$('#play').textContent='Autoplay';$('#play').classList.remove('pri')}
function startPlay(){playing=true;$('#play').textContent='Pausar';$('#play').classList.add('pri');if(cur===flat.length-1&&false)cur=0;animate(cur,true)}
$('#prev').onclick=function(){stopPlay();cur=Math.max(0,cur-1);renderStatic(cur)};
$('#next').onclick=function(){stopPlay();if(cur<flat.length-1){cur++;animate(cur,false)}};
$('#play').onclick=function(){if(playing){stopPlay();clearTimers();renderStatic(cur)}else startPlay()};
$('#spd').onchange=function(e){speed=parseFloat(e.target.value)};
$('#again').onclick=function(){stopPlay();animate(cur,false)};
document.addEventListener('keydown',function(e){if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT'||$('#v-passo').hidden)return;if(e.key==='ArrowRight')$('#next').click();else if(e.key==='ArrowLeft')$('#prev').click();else if(e.key===' '){e.preventDefault();$('#play').click()}});
/* ============ sua vez ============ */
var PID=TD.pid;
function norm(s){s=s.trim().replace(/\s+/g,' ').replace(/"/g,"'").replace(/\s*\|\s*/g,' | ').replace(/\s*>\s*\/dev\/null/g,' > /dev/null').replace(/\(\s*/g,'( ').replace(/\s*\)/g,' )').replace(/\s*;\s*/g,'; ');return s.replace(/'([A-Za-z0-9_.\/%=-]+)'/g,'$1')}
var SIM={};Object.keys(TD.sim).forEach(function(k){SIM[norm(k)]=TD.sim[k]});
var PSMAP={S:TD.simps.S,T:TD.simps.T,G:TD.simps.G};
var st,log,hist=[],hi=0;
function resetState(){st={proc:'S',lastSig:null,file:false,flags:{psT:false,psG:false,stopped:false,cont:false,gone:false},ran:{}};log=[]}
resetState();
var tasks=[
{q:'Descubra só a arquitetura do processador, sem mais nada na saída.',hint:'O uname tem uma opção que mostra apenas a máquina (machine).',sol:'uname -m',ok:['uname -m'],part:{'uname -a':'Funciona, mas o -a traz tudo. A arquitetura está lá (x86_64), só que para pegar apenas ela o certo é uname -m.'}},
{q:'Quantas CPUs lógicas esta máquina tem? Use o comando que responde só com o número.',hint:'Seis letras, começa com n e termina com c.',sol:'nproc',ok:['nproc'],part:{'lscpu':'Dá para achar na linha CPU(s), mas o nproc responde direto com o número.'}},
{q:'Rode o comando de memória em formato legível e diga quanto está disponível (coluna available).',hint:'free, com a opção -h.',sol:'free -h',ok:['free -h'],ans:{label:'Valor da coluna available (ex.: 3.4Gi)',re:function(){var m=TD.sim['free -h'].match(/^Mem:.*?(\S+)\s*$/m);return m[1]}}},
{q:'Qual é o tipo de sistema de arquivos da raiz (/)? Descubra e digite a resposta.',hint:'O df com -hT mostra o tipo. Também serve o findmnt.',sol:'df -hT /',ok:['df -hT','df -hT /','findmnt /','findmnt'],ans:{label:'Tipo do sistema de arquivos',re:function(){return 'ext4'}}},
{q:'Quem é o processo de PID 1 nesta máquina? Descubra e digite o nome.',hint:'ps com -o e as colunas pid,ppid,stat,rss,cmd, e -p 1. Também dá para olhar ps aux ou pstree -p.',sol:'ps -o pid,ppid,stat,rss,cmd -p 1',ok:['ps -o pid,ppid,stat,rss,cmd -p 1','ps aux','ps -ef','pstree -p'],ans:{label:'Nome do processo de PID 1',re:function(){return 'bash'}}},
{q:'Congele o sleep (PID '+PID+'), confirme com ps que ele ficou parado (T) e depois descongele.',hint:'kill -STOP PID, depois ps -o pid,ppid,stat,rss,cmd -p PID, depois kill -CONT PID.',sol:'kill -STOP '+PID,msg:'Você viu o estado T no ps e o processo voltou a dormir.',check:function(){return st.flags.psT&&st.flags.cont}},
{q:'Encerre o sleep com TERM (ou KILL) e confirme com ps que ele sumiu.',hint:'kill -TERM PID ou kill -9 PID, e depois o ps com o mesmo PID. Atenção: se ele estiver parado, o TERM só vale depois do CONT.',sol:'kill -TERM '+PID,msg:'O processo sumiu da lista, como esperado.',check:function(){return st.flags.psG}},
{q:'Converta 202 de decimal para hexadecimal.',hint:'O printf aceita %x. O bc também converte, com obase=16.',sol:"printf '%x\\n' 202",ok:["printf '%x\\n' 202","printf '%X\\n' 202","echo 'obase=16; 202' | bc"]},
{q:'Veja os bytes da palavra K8s em hexadecimal.',hint:'echo -n \'K8s\' | xxd',sol:"echo -n 'K8s' | xxd",ok:["echo -n 'K8s' | xxd","printf 'K8s' | xxd"]},
{q:'Escreva 512 MiB em um arquivo teste.img com blocos de 1 MiB, sem passar pelo cache, e veja a velocidade.',hint:'dd com if=/dev/zero, of=teste.img, bs=1M, count=512 e oflag=direct.',sol:'dd if=/dev/zero of=teste.img bs=1M count=512 oflag=direct',msg:'A velocidade muda a cada máquina e a cada execução. O importante é entender o que o oflag=direct faz.',check:function(){return !!log.dd}},
{q:'Limite a memória virtual a 500000 KiB num subshell e confirme o valor.',hint:'( ulimit -v 500000; ulimit -v )',sol:'( ulimit -v 500000; ulimit -v )',ok:['( ulimit -v 500000; ulimit -v )','bash -c ulimit -v 500000; ulimit -v']},
{q:'Veja o resumo das chamadas de sistema do ls /etc, escondendo a listagem.',hint:'strace -c ls /etc, mandando a saída padrão para /dev/null.',sol:'strace -c ls /etc > /dev/null',ok:['strace -c ls /etc > /dev/null']}
];
var tdone=JSON.parse(localStorage.getItem('tm1-done')||'[]'),tcur=tdone.indexOf(false)>=0?tdone.indexOf(false):0;
if(tdone.length!==tasks.length){tdone=tasks.map(function(){return false});tcur=0}
tasks.forEach(function(t,i){if(tdone[i])return});
var tl=$('#tlist'),tq=$('#tq'),tfb=$('#tfb'),tscr=$('#tscr'),tin=$('#tin'),tans=$('#tans');
function saveDone(){try{localStorage.setItem('tm1-done',JSON.stringify(tdone))}catch(e){}}
function renderTasks(){tl.innerHTML='';tasks.forEach(function(t,i){var li=el('li',(tdone[i]?'done ':'')+(i===tcur?'cur':''),'<span class="n">'+(tdone[i]?'✓':i+1)+'</span><span>'+esc(t.q.length>64?t.q.slice(0,62)+'…':t.q)+'</span>');li.onclick=function(){tcur=i;renderTasks();showTask()};tl.appendChild(li)});var n=tdone.filter(Boolean).length;$('#tprog').style.width=(n/tasks.length*100)+'%';$('#tcount').textContent=n+' de '+tasks.length+' tarefas concluídas'}
function showTask(){var t=tasks[tcur];$('#tn').textContent='Tarefa '+(tcur+1);tq.textContent=t.q;tfb.hidden=true;tfb.className='fb';tans.hidden=!t.ans;if(t.ans){$('#tans label').textContent=t.ans.label;$('#tans input').value='';}}
function fb(msg,ok){tfb.hidden=false;tfb.className='fb'+(ok?' ok':'');tfb.innerHTML=msg}
function complete(extra){if(!tdone[tcur]){tdone[tcur]=true;saveDone()}renderTasks();fb('Tarefa concluída. '+(extra||'')+(tcur<tasks.length-1?' <a href="#" id="nx">Próxima tarefa</a>':' Você terminou todas as tarefas deste módulo.'),true);var nx=$('#nx');if(nx)nx.onclick=function(e){e.preventDefault();tcur++;renderTasks();showTask()}}
function termPrint(h){tscr.insertAdjacentHTML('beforeend',h);tscr.scrollTop=tscr.scrollHeight}
function resetTerm(){tscr.innerHTML='<span class="dim">Terminal simulado. Cada resposta é uma saída gravada de verdade numa máquina Linux.\nJá deixei um sleep 600 rodando em segundo plano, com PID '+PID+'. Digite ajuda para ver os comandos.\n\n</span>'}
function help(){return 'Comandos com saída gravada:\n  uname -a | -m | -r      cat /etc/os-release     lscpu | nproc\n  free -h                 lsblk | df -hT | df -hT / | findmnt | findmnt /\n  ps aux | ps -ef | pstree -p | top -b -n 1 | head -12\n  ps -o pid,ppid,stat,rss,cmd -p '+PID+'   (ou -p 1)\n  kill -STOP|-CONT|-TERM|-9 '+PID+'     kill -l\n  strace -c ls /etc > /dev/null\n  printf, bc, xxd (veja os exemplos da aba Passo a passo)\n  dd if=/dev/zero of=teste.img bs=1M count=512 oflag=direct\n  ls -lh teste.img | ls teste.img | rm teste.img\n  ulimit -v | ( ulimit -v 500000; ulimit -v )\nclear limpa a tela. Em Reiniciar, o sleep volta a rodar.'}
/* executa: devolve {out,id} */
function sigOf(tok){tok=tok.replace(/^-/,'').replace(/^SIG/,'').toUpperCase();var m={STOP:'STOP',19:'STOP',CONT:'CONT',18:'CONT',TERM:'TERM',15:'TERM',KILL:'KILL',9:'KILL'};return m[tok]||null}
function exec(raw){var c=norm(raw),m;
 if(c==='')return null;
 if(c==='clear'){tscr.innerHTML='';return null}
 if(c==='ajuda'||c==='help')return{out:help(),id:'ajuda'};
 if(m=c.match(/^ps -o pid,ppid,stat,rss,cmd -p (\d+)$/)||c.match(/^ps -p (\d+) -o pid,ppid,stat,rss,cmd$/)){
  if(m[1]==='1')return{out:TD.simps.P1,id:'ps1'};
  if(m[1]!==String(PID))return{out:TD.simps.G,id:'psX'};
  var s=st.proc,k=s==='TP'?'T':s;if(s==='T'||s==='TP')st.flags.psT=true;if(s==='G')st.flags.psG=true;return{out:PSMAP[k],id:'psPid'}}
 if(m=c.match(/^kill (.*)$/)&&c!=='kill -l'){var tk=c.split(' ').slice(1),pid=tk[tk.length-1],sg;
  if(tk.length===1&&/^\d+$/.test(pid))sg='TERM';else if(tk[0]==='-s'&&tk.length===3)sg=sigOf(tk[1]);else if(tk.length===2)sg=sigOf(tk[0]);else sg=null;
  if(!sg||!/^\d+$/.test(pid))return{out:'Neste simulador o kill aceita STOP, CONT, TERM e KILL (por nome ou número) e um PID, como kill -STOP '+PID+'.',id:'x',note:1};
  if(pid!==String(PID))return{out:'Neste exercício o processo é o sleep de PID '+PID+'. Use esse número.',id:'x',note:1};
  if(st.proc==='G')return{out:TD.simmisc.nosuch,id:'killG'};
  st.lastSig=sg;
  if(sg==='STOP'){if(st.proc==='S')st.proc='T';st.flags.stopped=true}
  else if(sg==='CONT'){if(st.proc==='T'){st.proc='S';st.flags.cont=true}else if(st.proc==='TP'){st.proc='G';st.flags.gone=true}else st.flags.cont=true}
  else if(sg==='TERM'){if(st.proc==='S'){st.proc='G';st.flags.gone=true}else if(st.proc==='T')st.proc='TP'}
  else if(sg==='KILL'){st.proc='G';st.flags.gone=true}
  return{out:'',id:'kill'+sg}}
 if(m=c.match(/^wait (\d+); echo \$\?$/)){if(String(m[1])!==String(PID))return{out:'Use o PID '+PID+'.',id:'x',note:1};if(st.proc==='G'&&st.lastSig==='KILL')return{out:TD.simmisc.wait9,id:'wait'};return{out:'Só gravei a saída do wait depois de um kill -9. Experimente o kill -9 '+PID+' e tente de novo.',id:'x',note:1}}
 if(m=c.match(/^dd (.*)$/)){var a=m[1].split(' '),need={'if=/dev/zero':1,'bs=1M':1,'count=512':1,'oflag=direct':1},have={},of=null;a.forEach(function(x){if(need[x])have[x]=1;else if(/^of=\S+$/.test(x))of=x;});if(Object.keys(have).length===4&&of){st.file=true;log.dd=true;return{out:TD.simmisc.dd,id:'dd'}}return{out:'Só gravei a saída do dd com if=/dev/zero, of=ARQUIVO, bs=1M, count=512 e oflag=direct. Confira se não faltou nenhuma opção.',id:'x',note:1}}
 if(c==='ls -lh teste.img')return{out:st.file?TD.simmisc.ls_img:TD.simmisc.ls_none,id:'lsl'};
 if(c==='ls teste.img')return{out:st.file?TD.simmisc.ls_exist:TD.simmisc.ls_none,id:'ls'};
 if(c==='rm teste.img'){if(st.file){st.file=false;return{out:'',id:'rm'}}return{out:TD.simmisc.rm_none,id:'rm'}}
 if(SIM.hasOwnProperty(c)){
  if(/^(ps aux|ps -ef|pstree -p|top -b -n 1 \| head -12)$/.test(c)&&st.proc!=='S')return{out:'Com o sleep fora do estado S, estas listas ficariam diferentes e eu só gravei a versão com ele dormindo. Clique em Reiniciar sleep para voltar a esse estado.',id:'x',note:1};
  return{out:SIM[c],id:c}}
 return{out:'Esse comando não faz parte do roteiro deste simulador, que só responde com saídas gravadas de verdade. Digite ajuda para ver a lista.',id:'x',note:1}}
function evalTask(r,raw){var t=tasks[tcur];if(!r||tdone[tcur]&&!t.check)return;
 if(t.check){if(t.check()){complete(t.msg||'');return}
  if(tcur===5&&r.id==='killSTOP')fb('O processo foi congelado. Agora confira com o ps se o STAT virou T.');
  else if(tcur===6&&(r.id==='killTERM'||r.id==='killKILL')){if(st.proc==='TP')fb('O TERM foi enviado, mas o processo estava parado e ele ainda não o tratou. Descongele com kill -CONT '+PID+' e confira com o ps.');else fb('Sinal enviado. Agora confira com o ps se o processo sumiu.')}
  
  return}
 var c=norm(raw);var ok=(t.ok||[]).map(norm);
 if(ok.indexOf(c)>=0){if(t.ans){fb('Boa. Agora responda no campo abaixo do terminal.')}else complete(c==='free -h'?'':'')}
 else if(t.part&&t.part[c])fb(t.part[c]);
}
function runLine(raw){termPrint('<span class="pr">'+esc(PROMPT)+'</span><span class="cm">'+esc(raw)+'</span>\n');var r=exec(raw);if(r&&r.out!==''){termPrint((r.note?'<span class="dim">':'')+esc(r.out)+(r.note?'</span>':'')+'\n')}if(r&&!r.note)evalTask(r,raw);else if(r&&r.note)fb(esc(r.out))}
$('#tform').onsubmit=function(e){e.preventDefault();var v=tin.value;tin.value='';if(v.trim())hist.push(v);hi=hist.length;runLine(v)};
tin.onkeydown=function(e){if(e.key==='ArrowUp'&&hist.length){hi=Math.max(0,hi-1);tin.value=hist[hi];e.preventDefault()}else if(e.key==='ArrowDown'){hi=Math.min(hist.length,hi+1);tin.value=hist[hi]||'';e.preventDefault()}};
$('#thint').onclick=function(){fb(esc(tasks[tcur].hint))};
$('#tsol').onclick=async function(){var s=tasks[tcur].sol;tin.value='';for(var i=0;i<=s.length;i++){tin.value=s.slice(0,i);await new Promise(function(r){setTimeout(r,22)})}tin.focus();fb('Resposta digitada no terminal. Aperte Enter para rodar.')};
$('#treset').onclick=function(){resetState();resetTerm();fb('Terminal reiniciado: o sleep voltou a rodar.')};
$('#tans form').onsubmit=function(e){e.preventDefault();var t=tasks[tcur];if(!t.ans)return;var v=$('#tans input').value.trim().replace(',','.').toLowerCase();var want=t.ans.re().toLowerCase();if(v===want||v.replace(/\s/g,'')===want.replace(/\s/g,''))complete('Resposta correta: '+esc(t.ans.re())+'.');else fb('Ainda não. Rode o comando e olhe a saída com calma. Se precisar, use a dica.')};
resetTerm();renderTasks();showTask();
/* iniciar */
var h=(location.hash||'').slice(1);showTab(h==='vez'?'vez':'passo');
renderStatic(0);go(0);
})();
