(function(){
var TD=window.TD,$=function(s,r){return (r||document).querySelector(s)};
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
var embed=/[?&]embed=1/.test(location.search)||window.self!==window.top;
if(embed)document.documentElement.classList.add('compact');
var full=$('#full');if(full){full.href=location.href.replace(/[?&]embed=1/,'').replace(/#.*$/,'');if(window.top===window.self)full.style.display='none'}
var KEY='tm'+TD.n+'-done';
function P(pr){return (pr||'aluno@vm-aula:~$')+' '}
/* abas */
var tabs=document.querySelectorAll('.tabs button');
function showTab(id){tabs.forEach(function(b){b.setAttribute('aria-selected',b.dataset.t===id)});$('#v-passo').hidden=id!=='passo';$('#v-vez').hidden=id!=='vez';if(id!=='passo')stopPlay();try{history.replaceState(null,'','#'+id)}catch(e){}}
tabs.forEach(function(b){b.onclick=function(){showTab(b.dataset.t)}});
/* ============ passo a passo ============ */
var flat=[];TD.parts.forEach(function(p,pi){p.steps.forEach(function(s,si){flat.push({p:pi,s:si,step:s})})});
var cur=0,playing=false,timer=null,speed=1,token=0;
var scr=$('#scr'),exp=$('#exp'),ctr=$('#ctr'),chips=$('#chips');
TD.parts.forEach(function(p,pi){var b=el('button','chip',esc(p.title));b.onclick=function(){go(flat.findIndex(function(f){return f.p===pi}))};chips.appendChild(b)});
function markedHTML(out,notes,hidden){var h='',pos=0;notes.forEach(function(n,i){h+=esc(out.slice(pos,n.a))+'<span class="mk'+(hidden?' hid':'')+'" data-n="'+(i+1)+'" id="mk'+i+'">'+esc(out.slice(n.a,n.b))+'</span>';pos=n.b});return h+esc(out.slice(pos))}
function entryHTML(step,withMarks){return '<span class="pr">'+esc(P(step.pr))+'</span><span class="cm">'+esc(step.cmd)+'</span>\n'+(step.out!==''?(withMarks?markedHTML(step.out,step.notes,false):esc(step.out))+'\n':'')}
function clearTimers(){token++;clearTimeout(timer)}
function wait(ms,t){return new Promise(function(r){timer=setTimeout(function(){r(t===token)},ms)})}
function setExp(step,reveal){exp.innerHTML='';exp.appendChild(el('p','w',esc(step.what)));var ol=el('ol');step.notes.forEach(function(n,i){var li=el('li',reveal?'show':'','<b>'+(i+1)+'</b><span><code>'+esc(step.out.slice(n.a,n.b).replace(/\s+/g,' '))+'</code>: '+esc(n.t)+'</span>');li.dataset.i=i;li.onmouseenter=function(){var m=$('#mk'+i);if(m)m.classList.add('on')};li.onmouseleave=function(){var m=$('#mk'+i);if(m)m.classList.remove('on')};ol.appendChild(li)});if(step.notes.length)exp.appendChild(ol)}
function upd(){var f=flat[cur];ctr.textContent='Passo '+(cur+1)+' de '+flat.length;chips.childNodes.forEach(function(c,i){c.setAttribute('aria-current',i===f.p)});$('#prev').disabled=cur===0;$('#next').disabled=cur===flat.length-1;$('#intro').textContent=TD.parts[f.p].intro;$('#prog').style.width=((cur+1)/flat.length*100)+'%'}
function renderStatic(i){clearTimers();var f=flat[i],h='';for(var k=0;k<=i;k++){if(flat[k].p!==f.p)continue;h+=entryHTML(flat[k].step,k===i)}scr.innerHTML=h;scr.scrollTop=scr.scrollHeight;setExp(f.step,true);upd()}
async function animate(i,auto){var t=(++token);clearTimeout(timer);var f=flat[i],step=f.step,h='';for(var k=0;k<i;k++){if(flat[k].p===f.p)h+=entryHTML(flat[k].step,false)}scr.innerHTML=h;setExp(step,false);upd();
 var cmd=step.cmd;
 var line=el('span');scr.appendChild(line);
 for(var c=0;c<=cmd.length;c++){line.innerHTML='<span class="pr">'+esc(P(step.pr))+'</span><span class="cm">'+esc(cmd.slice(0,c))+'</span><span class="cur"></span>';scr.scrollTop=scr.scrollHeight;if(!await wait((c===0?350:28+Math.random()*30)/speed,t))return}
 line.innerHTML='<span class="pr">'+esc(P(step.pr))+'</span><span class="cm">'+esc(cmd)+'</span>\n';
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
function startPlay(){playing=true;$('#play').textContent='Pausar';$('#play').classList.add('pri');animate(cur,true)}
$('#prev').onclick=function(){stopPlay();cur=Math.max(0,cur-1);renderStatic(cur)};
$('#next').onclick=function(){stopPlay();if(cur<flat.length-1){cur++;animate(cur,false)}};
$('#play').onclick=function(){if(playing){stopPlay();clearTimers();renderStatic(cur)}else startPlay()};
$('#spd').onchange=function(e){speed=parseFloat(e.target.value)};
$('#again').onclick=function(){stopPlay();animate(cur,false)};
document.addEventListener('keydown',function(e){if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT'||$('#v-passo').hidden)return;if(e.key==='ArrowRight')$('#next').click();else if(e.key==='ArrowLeft')$('#prev').click();else if(e.key===' '){e.preventDefault();$('#play').click()}});
/* ============ sua vez ============ */
function norm(s){return s.trim().replace(/\s+/g,' ')}
var LES={};flat.forEach(function(f,i){var k=norm(f.step.cmd);if(!LES.hasOwnProperty(k))LES[k]=f.step});
var tasks=TD.tasks,hist=[],hi=0;
var tdone=[];try{tdone=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}
if(tdone.length!==tasks.length)tdone=tasks.map(function(){return false});
var tcur=tdone.indexOf(false)>=0?tdone.indexOf(false):0,tstep=0,ansOk=false;
var tl=$('#tlist'),tq=$('#tq'),tfb=$('#tfb'),tscr=$('#tscr'),tin=$('#tin'),tans=$('#tans'),tpr=$('#tpr');
function saveDone(){try{localStorage.setItem(KEY,JSON.stringify(tdone))}catch(e){}}
function renderTasks(){tl.innerHTML='';tasks.forEach(function(t,i){var li=el('li',(tdone[i]?'done ':'')+(i===tcur?'cur':''),'<span class="n">'+(tdone[i]?'✓':i+1)+'</span><span>'+esc(t.q.length>64?t.q.slice(0,62)+'…':t.q)+'</span>');li.onclick=function(){tcur=i;tstep=0;ansOk=false;renderTasks();showTask()};tl.appendChild(li)});var n=tdone.filter(Boolean).length;$('#tprog').style.width=(n/tasks.length*100)+'%';$('#tcount').textContent=n+' de '+tasks.length+' tarefas concluídas'}
function curPrompt(){var t=tasks[tcur];var s=t.steps[Math.min(tstep,t.steps.length-1)];return P(s.pr)}
function showTask(){var t=tasks[tcur];$('#tn').textContent='Tarefa '+(tcur+1)+' de '+tasks.length;tq.textContent=t.q;tfb.hidden=true;tfb.className='fb';tans.hidden=!(t.ans&&tstep>=t.steps.length);if(t.ans){$('#tans label').textContent=t.ans.label;$('#tans input').value=''}tpr.textContent=curPrompt()}
function fb(msg,ok){tfb.hidden=false;tfb.className='fb'+(ok?' ok':'');tfb.innerHTML=msg}
function complete(extra){if(!tdone[tcur]){tdone[tcur]=true;saveDone()}renderTasks();fb('Tarefa concluída. '+(extra||'')+(tcur<tasks.length-1?' <a href="#" id="nx">Próxima tarefa</a>':' Você terminou todas as tarefas deste módulo.'),true);var nx=$('#nx');if(nx)nx.onclick=function(e){e.preventDefault();tcur++;tstep=0;ansOk=false;renderTasks();showTask()}}
function termPrint(h){tscr.insertAdjacentHTML('beforeend',h);tscr.scrollTop=tscr.scrollHeight}
function resetTerm(){tscr.innerHTML='<span class="dim">Terminal simulado. Cada resposta é uma saída gravada de verdade numa máquina Linux, na ordem das tarefas.\nDigite ajuda para ver os comandos aceitos.\n\n</span>'}
function help(){var t=tasks[tcur],h='Comando desta tarefa (use o botão Dica se travar):\n  '+(tstep<t.steps.length?'passo '+(tstep+1)+' de '+t.steps.length:'concluídos todos os passos')+'\n\nTambém respondo com a saída gravada de qualquer comando do Passo a passo:\n';var seen={};flat.forEach(function(f){var k=norm(f.step.cmd);if(!seen[k]){seen[k]=1;h+='  '+f.step.cmd+'\n'}});return h+'\nclear limpa a tela.'}
function runLine(raw){var c=norm(raw);var t=tasks[tcur];
 var pr=tstep<t.steps.length?curPrompt():P('aluno@vm-aula:~$'.replace('~$','~$'));
 termPrint('<span class="pr">'+esc(pr)+'</span><span class="cm">'+esc(raw)+'</span>\n');
 if(c==='')return;
 if(c==='clear'){tscr.innerHTML='';return}
 if(c==='ajuda'||c==='help'){termPrint('<span class="dim">'+esc(help())+'\n</span>');return}
 if(tstep<t.steps.length){var s=t.steps[tstep];
  if(s.acc.some(function(r){return new RegExp(r).test(c)})){
   if(s.out!=='')termPrint(esc(s.out)+'\n');tstep++;
   if(tstep>=t.steps.length){if(t.ans){tans.hidden=false;tpr.textContent=P('aluno@vm-aula:~$');fb('Boa. Agora responda no campo abaixo do terminal.')}else complete(t.msg)}
   else{tpr.textContent=curPrompt();fb('Certo. Próximo passo ('+(tstep+1)+' de '+t.steps.length+').',true)}
   return}
 }
 /* comando de outra tarefa ou do passo a passo */
 for(var i=0;i<tasks.length;i++){if(i===tcur&&tstep<tasks[i].steps.length&&false)continue;var st=tasks[i].steps;for(var j=0;j<st.length;j++){if(st[j].acc.some(function(r){return new RegExp(r).test(c)})&&(i!==tcur||j<tstep)){termPrint('<span class="dim"># saída gravada na tarefa '+(i+1)+'; em outra ordem ela pode mudar\n</span>'+(st[j].out!==''?esc(st[j].out)+'\n':''));return}}}
 if(LES.hasOwnProperty(c)){var ls=LES[c];termPrint('<span class="dim"># saída gravada no Passo a passo; o estado da máquina lá era outro\n</span>'+(ls.out!==''?esc(ls.out)+'\n':''));return}
 var msg=tstep<t.steps.length?'Esse não é o comando desta tarefa e eu só respondo com saídas gravadas de verdade. Leia o enunciado ou use a Dica.':'Os passos desta tarefa já foram feitos.';
 termPrint('<span class="dim">'+esc(msg)+' Digite ajuda para ver os comandos.\n</span>');fb(esc(msg))}
$('#tform').onsubmit=function(e){e.preventDefault();var v=tin.value;tin.value='';if(v.trim())hist.push(v);hi=hist.length;runLine(v)};
tin.onkeydown=function(e){if(e.key==='ArrowUp'&&hist.length){hi=Math.max(0,hi-1);tin.value=hist[hi];e.preventDefault()}else if(e.key==='ArrowDown'){hi=Math.min(hist.length,hi+1);tin.value=hist[hi]||'';e.preventDefault()}};
$('#thint').onclick=function(){fb(esc(tasks[tcur].hint))};
$('#tsol').onclick=async function(){var t=tasks[tcur];if(tstep>=t.steps.length){fb('Os comandos já foram executados.'+(t.ans?' Falta a resposta no campo.':''));return}var s=t.steps[tstep].cmd;tin.value='';for(var i=0;i<=s.length;i++){tin.value=s.slice(0,i);await new Promise(function(r){setTimeout(r,22)})}tin.focus();fb('Comando digitado no terminal. Aperte Enter para rodar.')};
$('#treset').onclick=function(){tstep=0;ansOk=false;resetTerm();showTask();fb('Tarefa reiniciada desde o primeiro passo.')};
$('#tans form').onsubmit=function(e){e.preventDefault();var t=tasks[tcur];if(!t.ans)return;function nz(x){return x.trim().replace(',','.').replace(/\s+/g,'').toLowerCase()}var v=nz($('#tans input').value);var ok=[t.ans.val].concat(t.ans.alt||[]).map(nz);if(ok.indexOf(v)>=0)complete('Resposta correta: '+esc(t.ans.val)+'.');else fb('Ainda não. Olhe a saída do terminal com calma. Se precisar, use a dica.')};
resetTerm();renderTasks();showTask();
var h=(location.hash||'').slice(1);showTab(h==='vez'?'vez':'passo');
renderStatic(0);go(0);
})();
