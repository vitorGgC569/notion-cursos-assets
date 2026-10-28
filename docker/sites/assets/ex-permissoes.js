(function(){
var K=window.K,X=K.X;
function bits(m){return [4,2,1].map(function(b){return (m&b)>0})}
function scene(mode,who,note,fname,own){
  var N=[],L=['r','w','x'],grp=['dono (u)','grupo (g)','outros (o)'],str='';
  N.push(X.text('fn',40,34,'-'+[0,1,2].map(function(g){return L.map(function(l,i){return (mode>>((2-g)*3))&(4>>i)?l:'-'}).join('')}).join('')+'  '+(own||'aluno aluno')+'  '+fname,'b'));
  for(var g=0;g<3;g++){
    var m=(mode>>((2-g)*3))&7,b=bits(m);
    N.push(X.zone('g'+g,40+g*216,56,200,126,grp[g]));
    for(var i=0;i<3;i++)N.push(X.box('b'+g+i,56+g*216+i*56,86,50,38,L[i],b[i]?'a':'m',(['4','2','1'])[i]));
    N.push(X.text('o'+g,140+g*216,156,String(m),'b','middle'));
    N.push(X.text('os'+g,140+g*216,172,b.map(function(x,i){return x?[4,2,1][i]:null}).filter(Boolean).join(' + ')||'0','t','middle'));
  }
  N.push(X.box('oct',40,200,648,36,'chmod '+(mode.toString(8))+' '+fname,'d'));
  String(note).split('\n').forEach(function(l,i){N.push(X.text('n'+i,40,262+i*18,l,'t'))});
  return N;
}
var S=[
{cmd:'ls -l script.sh',out:'-rw-r--r-- 1 aluno aluno 120 out 27 script.sh',title:'Ler a coluna de permissões',text:'<p>Os 9 caracteres depois do primeiro (tipo do arquivo) são <b>três grupos de três</b>: dono, grupo e outros, cada um com <code>r</code> (ler), <code>w</code> (escrever) e <code>x</code> (executar). Aqui: o dono lê e escreve; grupo e outros só leem. Em octal, cada letra vale 4, 2 e 1, e <b>644</b> resume o conjunto.</p>',scene:function(){return scene(0o644,0,'Os bits acesos estão ligados. Cada grupo soma 4 (r) + 2 (w) + 1 (x).','script.sh')}},
{cmd:'./script.sh',out:'bash: ./script.sh: Permissão negada',title:'Sem x não executa',text:'<p>O arquivo tem conteúdo de script, mas ninguém tem <code>x</code>. O sistema se recusa a executar. Precisamos dar permissão de execução.</p>',scene:function(){return scene(0o644,0,'Nenhum grupo tem x.','script.sh')}},
{cmd:'chmod u+x script.sh',title:'Modo simbólico: ligar um bit',text:'<p>A forma simbólica altera só o que você pede: <code>u</code> (dono), <code>g</code> (grupo), <code>o</code> (outros), <code>a</code> (todos), com <code>+</code> ou <code>−</code> e as letras. <code>u+x</code> liga o <code>x</code> do dono e não mexe no resto.</p>',scene:function(){return scene(0o744,0,'u+x: o dono agora executa; grupo e outros\ncontinuam só lendo. 644 virou 744.','script.sh')}},
{cmd:'chmod 755 script.sh',title:'Modo octal: tudo de uma vez',text:'<p>A forma octal define os três grupos de uma vez: <code>7</code> = rwx, <code>5</code> = r-x. O padrão para scripts e programas: o dono faz tudo, os demais leem e executam.</p>',scene:function(){return scene(0o755,0,'7 = 4+2+1 (rwx); 5 = 4+1 (r-x).','script.sh')}},
{cmd:'chmod 600 ~/.ssh/id_ed25519',title:'Chaves privadas: só o dono',text:'<p>Uma chave privada SSH <b>precisa</b> ser <code>600</code>. Se outros usuários puderem ler, o <code>ssh</code> recusa a usá-la. Arquivos secretos nunca devem ser lidos por grupo ou outros.</p>',scene:function(){return scene(0o600,0,'6 = rw- para o dono; 0 = --- para grupo e outros.','id_ed25519')}},
{cmd:'chmod g+w,o-r relatorio.txt',title:'Combinar mudanças',text:'<p>Dá para encadear com vírgula: aqui o grupo ganha escrita e os outros perdem leitura. Partindo de <code>644</code>, o resultado é <code>664 − o:r</code> = <b>660</b>.</p>',scene:function(){return scene(0o660,0,'Antes: 644. g+w deixa 664; o-r tira o 4 dos outros: 660.','relatorio.txt')}},
{cmd:'chmod 755 pasta/   e   chmod 644 pasta/arq',title:'Em diretórios, x significa "entrar"',text:'<p>Em uma pasta, <code>r</code> permite <b>listar</b> o conteúdo e <code>x</code> permite <b>entrar</b> e acessar os itens dentro. Sem <code>x</code> o <code>cd</code> falha, mesmo com <code>r</code>. Por isso pastas costumam ser <code>755</code> e arquivos <code>644</code>.</p>',scene:function(){return scene(0o755,0,'Pasta 755: todos listam e entram; só o dono altera.','pasta/')}}
];
K.explain({w:720,h:330,steps:S,alt:'Bits de permissão rwx e valor octal'});
})();
