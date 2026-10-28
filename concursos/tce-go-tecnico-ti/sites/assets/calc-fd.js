(function(){
'use strict';
function $(s){return document.querySelector(s)}
function esc(s){return String(s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function toks(s){return s.split(/[\s,;]+/).filter(Boolean)}
function fmt(a){return '{'+a.join(', ')+'}'}
function closure(X,F){var r={},ch=true;X.forEach(function(a){r[a]=1});
  while(ch){ch=false;F.forEach(function(f){if(f[0].every(function(a){return r[a]})){f[1].forEach(function(b){if(!r[b]){r[b]=1;ch=true}})}})}
  return r}
function keysOf(r){return Object.keys(r)}
function parse(){
  var U=toks($('#attrs').value),F=[],err=null,lines=$('#fds').value.split(/\n/),i;
  var seen={};U=U.filter(function(a){if(seen[a])return false;seen[a]=1;return true});
  if(U.length<1)return {err:'Informe os atributos.'};
  if(U.length>12)return {err:'Use no máximo 12 atributos.'};
  for(i=0;i<lines.length;i++){var ln=lines[i].trim();if(!ln)continue;
    var p=ln.split(/->|→/);if(p.length!==2)return {err:'Linha '+(i+1)+': use o formato X -> Y.'};
    var L=toks(p[0]),R=toks(p[1]);if(!L.length||!R.length)return {err:'Linha '+(i+1)+': lado vazio.'};
    var all=L.concat(R);for(var j=0;j<all.length;j++)if(!seen[all[j]])return {err:'Linha '+(i+1)+': o atributo '+esc(all[j])+' não está na lista de atributos.'};
    F.push([L,R])}
  return {U:U,F:F}
}
function calc(){
  var o=$('#outm'),P=parse();
  if(P.err){o.innerHTML='<p class="muted">'+P.err+'</p>';return}
  var U=P.U,F=P.F,n=U.length,N=1<<n,masks=[],m,i;
  function names(mk){var r=[];for(var k=0;k<n;k++)if(mk&(1<<k))r.push(U[k]);return r}
  function cl(mk){return closure(names(mk),F)}
  function full(mk){var c=cl(mk);return U.every(function(a){return c[a]})}
  for(m=1;m<N;m++)masks.push(m);
  masks.sort(function(a,b){return pop(a)-pop(b)||a-b});
  function pop(x){var c=0;while(x){c+=x&1;x>>=1}return c}
  var keys=[];masks.forEach(function(mk){if(full(mk)&&!keys.some(function(k){return (k&mk)===k}))keys.push(mk)});
  var primeMask=0;keys.forEach(function(k){primeMask|=k});
  function isPrime(a){return (primeMask&(1<<U.indexOf(a)))!==0}
  function isSuper(mk){return full(mk)}
  var v2=[],v3=[],vb=[];
  keys.forEach(function(k){if(pop(k)>1){for(var s=(k-1)&k;s>0;s=(s-1)&k){var c=cl(s);U.forEach(function(a){var bit=1<<U.indexOf(a);if(c[a]&&!(s&bit)&&!isPrime(a)&&!(k&bit)){var t=fmt(names(s))+' → '+a+' (parcial em '+fmt(names(k))+')';if(v2.indexOf(t)<0)v2.push(t)}})}}});
  F.forEach(function(f){var L=0;f[0].forEach(function(a){L|=1<<U.indexOf(a)});
    f[1].forEach(function(b){if(f[0].indexOf(b)>=0)return;var t=fmt(f[0])+' → '+b;
      if(!isSuper(L)){vb.push(t);if(!isPrime(b))v3.push(t)}})});
  var nf=vb.length===0?'FNBC':(v3.length===0?'3FN':(v2.length===0?'2FN':'1FN'));
  var X=toks($('#xset').value),bad=X.filter(function(a){return U.indexOf(a)<0}),h='';
  if(X.length&&!bad.length){var c=keysOf(closure(X,F));h+='<tr><th>Fecho de '+fmt(X)+'</th><td><span class="bn">'+fmt(U.filter(function(a){return c.indexOf(a)>=0}))+'</span><br><span class="muted">'+(c.length===n?fmt(X)+' é superchave (determina todos os atributos).':fmt(X)+' não determina todos os atributos.')+'</span></td></tr>'}
  else if(bad.length){h+='<tr><th>Fecho</th><td class="muted">O atributo '+esc(bad[0])+' não existe.</td></tr>'}
  h+='<tr><th>Chaves candidatas</th><td><span class="bn">'+keys.map(function(k){return fmt(names(k))}).join('  ')+'</span><br><span class="muted">atributos primos: '+fmt(U.filter(isPrime))+'</span></td></tr>';
  h+='<tr><th>Forma normal mais alta</th><td><span class="bn">'+nf+'</span> <span class="muted">(supondo valores atômicos, isto é, 1FN)</span></td></tr>';
  h+='<tr><th>Viola a 2FN</th><td>'+(v2.length?v2.map(esc).join('<br>'):'<span class="muted">nenhuma dependência parcial</span>')+'</td></tr>';
  h+='<tr><th>Viola a 3FN</th><td>'+(v3.length?v3.map(esc).join('<br>'):'<span class="muted">nenhuma</span>')+'</td></tr>';
  h+='<tr><th>Viola a FNBC</th><td>'+(vb.length?vb.map(esc).join('<br>'):'<span class="muted">nenhuma: todo determinante é superchave</span>')+'</td></tr>';
  o.innerHTML='<table class="tbl">'+h+'</table>'
}
['#attrs','#fds','#xset'].forEach(function(s){$(s).addEventListener('input',calc)});
function set(a,f,x){$('#attrs').value=a;$('#fds').value=f;$('#xset').value=x;calc()}
$('#ex1').addEventListener('click',function(){set('A, B, C, D, E','A -> B\nB -> A\nA -> C\nB -> D\nB -> E\nD -> B','C')});
$('#ex2').addEventListener('click',function(){set('A, B, C, D, E','A -> B\nB -> A\nA -> C\nB -> D\nB -> E\nD -> B\nC -> D','C')});
$('#ex3').addEventListener('click',function(){set('pedido, produto, preco, qtd, cliente, cidade, uf','pedido, produto -> qtd\npedido -> cliente\nproduto -> preco\ncliente -> cidade\ncidade -> uf','pedido')});
$('#ex4').addEventListener('click',function(){set('aluno, curso, professor','aluno, curso -> professor\nprofessor -> curso','professor')});
calc();
})();
