(function(){
var K=window.K,X=K.X;
/* estado -> cena */
function G(st){
  var N=[];
  N.push(X.zone('zw',8,6,222,120,'Diretório de trabalho'),X.zone('zi',249,6,222,120,'Área de preparação (index)'),X.zone('zr',490,6,222,120,'Repositório (.git)'));
  var cnt={w:0,i:0,r:0},ax={w:20,i:261,r:502};
  var files=st.files||((st.commits&&st.commits.length)?[{id:9,n:'README.md',s:'commitado',a:'r'}]:[]);
  [['w',20],['i',261]].forEach(function(z){if(!files.some(function(f){return f.a===z[0]}))N.push(X.text('e'+z[0],z[1]+4,76,'(vazio)','t'))});
  files.forEach(function(f){
    var a=f.a,n=cnt[a]++;
    N.push(X.box('f'+f.id,ax[a]+(n%2)*100,34+Math.floor(n/2)*40,92,30,f.n,f.c||'n',f.s));
  });
  if(st.arrow)N.push(X.line('ar',st.arrow[0],70,st.arrow[1],70,'a',true));
  // grafo
  var X0=70,dx=88,lane=[222,312];
  (st.commits||[]).forEach(function(c){
    (c.p||[]).forEach(function(p){var P=st.commits.filter(function(q){return q.id===p})[0];N.push(X.line('e'+c.id+p,X0+P.col*dx+17,lane[P.lane],X0+c.col*dx-17,lane[c.lane],'',true))});
  });
  (st.commits||[]).forEach(function(c){N.push(X.circ('c'+c.id,X0+c.col*dx,lane[c.lane],16,c.id,c.hl?'a':'n',null))});
  var at={};
  Object.keys(st.br||{}).forEach(function(b){var c=st.br[b];(at[c]=at[c]||[]).push({n:b,t:'br'})});
  if(st.remote){(at[st.remote]=at[st.remote]||[]).push({n:'origin/main',t:'rm'})}
  Object.keys(at).forEach(function(cid){
    var c=st.commits.filter(function(q){return q.id===cid})[0],y=lane[c.lane]-46,x=X0+c.col*dx-16;
    at[cid].forEach(function(p,i){
      var yy=y-i*25,isH=st.head===p.n&&p.t==='br';
      N.push(X.pill('p'+p.n,x,yy,p.n,isH?'a':p.t==='rm'?'m':'n'));
      if(isH)N.push(X.pill('HEAD',x+p.n.length*6.9+24,yy,'HEAD','d',50));
    });
  });
  if(st.note)N.push(X.text('note',360,376,st.note,'t','middle'));
  return N;
}
var C1={id:'A',col:0,lane:0,p:[]},C2={id:'B',col:1,lane:0,p:['A']},C3={id:'C',col:2,lane:1,p:['B']},C4={id:'D',col:2,lane:0,p:['B']},C5={id:'E',col:3,lane:0,p:['D','C']};
var steps=[
{cmd:'git init',out:'Initialized empty Git repository in /home/aluno/proj/.git/',title:'Criar o repositório',text:'<p>Cria a pasta oculta <code>.git</code>, onde o Git guarda tudo. A partir daqui existem as <b>três áreas</b>: seu diretório de trabalho, a área de preparação e o repositório. Ainda não há nenhum commit.</p>',scene:function(){return G({})}},
{cmd:'echo "# oi" > README.md',title:'Um arquivo novo aparece',text:'<p>O arquivo existe só no diretório de trabalho. O Git ainda não o acompanha: ele é <b>não rastreado</b> (<code>untracked</code>).</p>',scene:function(){return G({files:[{id:1,n:'README.md',s:'não rastreado',a:'w'}]})}},
{cmd:'git status',out:'Untracked files:\n\tREADME.md',title:'Perguntar o estado das áreas',text:'<p><code>git status</code> não muda nada: apenas compara as três áreas e conta o que encontrou. Use sempre que estiver em dúvida.</p>',scene:function(){return G({files:[{id:1,n:'README.md',s:'não rastreado',a:'w',c:'a'}]})}},
{cmd:'git add README.md',title:'Preparar para o commit',text:'<p><code>git add</code> copia o arquivo para a <b>área de preparação</b>. Ela monta o próximo commit: só entra nele o que estiver aqui.</p>',scene:function(){return G({files:[{id:1,n:'README.md',s:'preparado',a:'i',c:'a'}],arrow:[222,258]})}},
{cmd:'git commit -m "primeiro"',out:'[main (root-commit) 21934d7] primeiro',title:'Gravar o primeiro commit',text:'<p>O <code>commit</code> tira uma foto do que está na área de preparação e a guarda no repositório. Nasce o commit <b>A</b>, o branch <code>main</code> aponta para ele e <code>HEAD</code> aponta para <code>main</code>.</p>',scene:function(){return G({files:[{id:1,n:'README.md',s:'commitado',a:'r'}],commits:[C1],br:{main:'A'},head:'main',arrow:[463,499]})}},
{cmd:'edite README.md  &&  git diff',out:'-# oi\n+# oi, mundo',title:'Modificar e comparar',text:'<p>Editar o arquivo cria uma diferença entre o diretório de trabalho e o último commit. <code>git diff</code> mostra exatamente essa diferença, linha a linha.</p>',scene:function(){return G({files:[{id:1,n:'README.md',s:'modificado',a:'w',c:'a'},{id:2,n:'README.md',s:'versão commitada',a:'r'}],commits:[C1],br:{main:'A'},head:'main'})}},
{cmd:'git add . && git commit -m "segundo"',out:'[main 8c1f0a2] segundo',title:'Segundo commit',text:'<p>Cada commit guarda um ponteiro para o <b>pai</b>. O commit <b>B</b> aponta para <b>A</b> e <code>main</code> avança para B, levando o <code>HEAD</code> junto.</p>',scene:function(){return G({files:[{id:2,n:'README.md',s:'commitado',a:'r'}],commits:[C1,C2],br:{main:'B'},head:'main'})}},
{cmd:'git branch feat',title:'Criar um branch',text:'<p>Um branch é só um <b>rótulo móvel</b> que aponta para um commit. Criar <code>feat</code> não copia nada: apenas coloca outra etiqueta em B. O <code>HEAD</code> continua em <code>main</code>.</p>',scene:function(){return G({commits:[C1,C2],br:{main:'B',feat:'B'},head:'main'})}},
{cmd:'git switch feat',out:"Switched to branch 'feat'",title:'Mudar de branch',text:'<p><code>git switch</code> move o <code>HEAD</code> para <code>feat</code> e atualiza os arquivos para refletir esse commit. Daqui em diante, os novos commits avançam <code>feat</code>.</p>',scene:function(){return G({commits:[C1,C2],br:{main:'B',feat:'B'},head:'feat'})}},
{cmd:'git commit -m "feat: recurso"',out:'[feat 94ecc73] feat: recurso',title:'Commit no branch feat',text:'<p>O commit <b>C</b> nasce com B como pai. Só <code>feat</code> (e o <code>HEAD</code>) andaram: <code>main</code> continua em B.</p>',scene:function(){return G({commits:[C1,C2,C3],br:{main:'B',feat:'C'},head:'feat'})}},
{cmd:'git switch main',title:'Voltar ao main',text:'<p>O <code>HEAD</code> volta para <code>main</code> e os arquivos voltam ao estado de B. O trabalho de <code>feat</code> está salvo no commit C, só não aparece no diretório.</p>',scene:function(){return G({commits:[C1,C2,C3],br:{main:'B',feat:'C'},head:'main'})}},
{cmd:'git commit -m "ajuste no main"',out:'[main 737ad64] ajuste no main',title:'As histórias divergem',text:'<p>Agora <code>main</code> e <code>feat</code> têm commits que o outro não tem: o histórico <b>divergiu</b>. Isso é normal em times que trabalham em paralelo.</p>',scene:function(){return G({commits:[C1,C2,C3,C4],br:{main:'D',feat:'C'},head:'main'})}},
{cmd:'git merge feat',out:"Merge made by the 'ort' strategy.",title:'Juntar as histórias',text:'<p>O <code>merge</code> cria o commit <b>E</b> com <b>dois pais</b> (D e C), reunindo o trabalho dos dois branches. <code>main</code> avança para E. Se os dois tivessem mudado a mesma linha, o Git pararia e pediria que você resolvesse o conflito.</p>',scene:function(){return G({commits:[C1,C2,C3,C4,C5],br:{main:'E',feat:'C'},head:'main'})}},
{cmd:'git log --oneline --graph',out:'*   e3a91b0 (HEAD -> main) Merge branch \'feat\'\n|\\\n| * 94ecc73 (feat) feat: recurso\n* | 737ad64 ajuste no main\n|/\n* 8c1f0a2 segundo\n* 21934d7 primeiro',title:'Ler o histórico',text:'<p><code>git log --oneline --graph</code> desenha no terminal o mesmo grafo que você acabou de ver.</p>',scene:function(){return G({commits:[C1,C2,C3,C4,C5].map(function(c){return Object.assign({hl:true},c)}),br:{main:'E',feat:'C'},head:'main'})}},
{cmd:'git push origin main',out:'main -> main',title:'Enviar para o remoto',text:'<p><code>push</code> envia seus commits para o repositório remoto (GitHub). O rótulo <code>origin/main</code> mostra onde o remoto está, do ponto de vista do seu computador. <code>git pull</code> faz o caminho contrário: <code>fetch</code> (traz) e depois <code>merge</code> (junta).</p>',scene:function(){return G({commits:[C1,C2,C3,C4,C5],br:{main:'E',feat:'C'},head:'main',remote:'E'})}}
];
K.explain({w:720,h:392,steps:steps,alt:'Três áreas do Git e grafo de commits'});
})();
