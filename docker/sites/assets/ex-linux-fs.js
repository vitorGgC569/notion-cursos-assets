(function(){
var K=window.K,X=K.X;
/* árvore: nó = [nome, filhos|null]; cada caminho é um id estável */
function walk(t,path,depth,out){
  var id=path||'/';out.push({id:id,n:t[0],d:depth,dir:!!t[1]});
  (t[1]||[]).forEach(function(c){walk(c,(path==='/'?'':path)+'/'+c[0],depth+1,out)});
}
function scene(tree,cwd,hl,note){
  var rows=[];walk(tree,'',0,rows);
  var N=[X.zone('z',8,6,330,338,'Sistema de arquivos')];
  rows.forEach(function(r,i){
    var id=r.id||'/',isC=id===cwd,h=hl&&hl.indexOf(id)>-1;
    N.push(X.box('n'+id,30+r.d*24,30+i*22.5,r.dir?100:124,19,(id==='/'?'/':(r.dir?r.n+'/':r.n)),isC?'d':h?'a':(r.dir?'n':'m')));
  });
  N.push(X.box('cw',360,32,340,52,'Você está em','n',cwd),X.zone('zn',360,100,340,244,'O que isso mostra'));
  String(note||'').split('\n').forEach(function(l,i){N.push(X.text('nt'+i,376,138+i*20,l,'t'))});
  return N;
}
function T(x){return x}
var base=['/',[['home',[['aluno',[['docs',[['a.txt']]],['b.txt']]]]],['etc',[['hosts']]],['tmp',[]]]];
function mod(f){var t=JSON.parse(JSON.stringify(base));f(t);return t}
function dir(t,n){return t[1].filter(function(c){return c[0]===n})[0]}
var home=function(t){return dir(dir(t,'home'),'aluno')};
var S=[
{cmd:'pwd',out:'/home/aluno',title:'Onde estou',text:'<p>Tudo no Linux parte da <b>raiz</b> <code>/</code>. <code>pwd</code> imprime o diretório atual, o ponto de partida para caminhos relativos.</p>',scene:function(){return scene(base,'/home/aluno',[],'pwd mostra o diretório atual.\nCaminhos que começam com / são\nabsolutos; os demais são relativos\nao diretório atual.')}},
{cmd:'ls',out:'docs  b.txt',title:'Listar o conteúdo',text:'<p><code>ls</code> lista o que há no diretório atual. Com <code>-l</code> mostra permissões, dono e tamanho; com <code>-a</code> inclui os arquivos ocultos (que começam com ponto).</p>',scene:function(){return scene(base,'/home/aluno',['/home/aluno/docs','/home/aluno/b.txt'],'ls lista o conteúdo do diretório atual\n(em destaque).')}},
{cmd:'cd docs',title:'Entrar em uma pasta',text:'<p><code>cd</code> muda o diretório atual. <code>cd ..</code> sobe um nível, <code>cd ~</code> (ou só <code>cd</code>) volta para o seu home, <code>cd -</code> volta para onde estava.</p>',scene:function(){return scene(base,'/home/aluno/docs',[],'cd docs: caminho relativo, resolve\npara /home/aluno/docs.')}},
{cmd:'mkdir projeto',title:'Criar uma pasta',text:'<p><code>mkdir</code> cria um diretório. Com <code>-p</code> cria toda a cadeia de uma vez (<code>mkdir -p a/b/c</code>) e não reclama se já existe.</p>',scene:function(){var t=mod(function(t){dir(dir(home(t),'docs')?home(t):home(t),'docs')[1].push(['projeto',[]])});return scene(t,'/home/aluno/docs',['/home/aluno/docs/projeto'],'mkdir cria o diretório projeto\ndentro do diretório atual.')}},
{cmd:'touch projeto/notas.txt',title:'Criar um arquivo vazio',text:'<p><code>touch</code> cria um arquivo vazio se não existir (ou atualiza a data de modificação se já existir). Para escrever conteúdo use o redirecionamento: <code>echo oi &gt; notas.txt</code>.</p>',scene:function(){var t=mod(function(t){dir(home(t),'docs')[1].push(['projeto',[['notas.txt']]])});return scene(t,'/home/aluno/docs',['/home/aluno/docs/projeto/notas.txt'],'touch cria o arquivo vazio\nprojeto/notas.txt.')}},
{cmd:'cp a.txt projeto/',title:'Copiar',text:'<p><code>cp origem destino</code> duplica o arquivo: o original continua onde estava. Para pastas, use <code>cp -r</code>.</p>',scene:function(){var t=mod(function(t){dir(home(t),'docs')[1].push(['projeto',[['notas.txt'],['a.txt']]])});return scene(t,'/home/aluno/docs',['/home/aluno/docs/projeto/a.txt','/home/aluno/docs/a.txt'],'a.txt existe agora em dois lugares.')}},
{cmd:'mv b.txt projeto/',title:'Mover (ou renomear)',text:'<p><code>mv</code> move o item: ele sai de um lugar e vai para o outro. Se o destino é o mesmo diretório com outro nome (<code>mv b.txt c.txt</code>), é um <b>renomear</b>.</p>',scene:function(){var t=mod(function(t){var h=home(t);h[1]=h[1].filter(function(c){return c[0]!=='b.txt'});dir(h,'docs')[1].push(['projeto',[['notas.txt'],['a.txt'],['b.txt']]])});return scene(t,'/home/aluno/docs',['/home/aluno/docs/projeto/b.txt'],'b.txt saiu de /home/aluno e foi\npara projeto/. Só existe em um lugar.')}},
{cmd:'rm projeto/notas.txt',title:'Remover um arquivo',text:'<p><code>rm</code> apaga <b>definitivamente</b>: não existe lixeira no terminal. Para uma pasta é preciso <code>rm -r</code>. Antes de usar <code>rm -r</code>, confira o caminho com <code>ls</code>.</p>',scene:function(){var t=mod(function(t){dir(home(t),'docs')[1].push(['projeto',[['a.txt'],['b.txt']]]);var h=home(t);h[1]=h[1].filter(function(c){return c[0]!=='b.txt'})});return scene(t,'/home/aluno/docs',['/home/aluno/docs/projeto'],'notas.txt foi apagado sem passar\npor lixeira.')}}
];
K.explain({w:720,h:352,steps:S,alt:'Árvore de arquivos do Linux'});
})();
