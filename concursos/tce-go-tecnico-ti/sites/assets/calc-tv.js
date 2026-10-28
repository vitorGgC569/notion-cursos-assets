(function(){
'use strict';
function $(s){return document.querySelector(s)}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
/* léxico */
function lex(s){
  var t=[],i=0,m;s=s.replace(/\s+/g,' ');
  while(i<s.length){
    var c=s[i];
    if(c===' '){i++;continue}
    if(c==='('||c===')'){t.push({k:c});i++;continue}
    var r=s.slice(i);
    if((m=/^(<->|<=>|↔)/.exec(r))){t.push({k:'iff'});i+=m[0].length;continue}
    if((m=/^(->|=>|→|⇒)/.exec(r))){t.push({k:'imp'});i+=m[0].length;continue}
    if((m=/^(xor|⊻|⊕)/i.exec(r))){t.push({k:'xor'});i+=m[0].length;continue}
    if((m=/^(\^|&|∧|\be\b|and\b)/i.exec(r))){t.push({k:'and'});i+=m[0].length;continue}
    if((m=/^(\||∨|ou\b|or\b)/i.exec(r))){t.push({k:'or'});i+=m[0].length;continue}
    if((m=/^(~|!|¬|não\b|nao\b|not\b)/i.exec(r))){t.push({k:'not'});i+=m[0].length;continue}
    if((m=/^([pqrst])\b/i.exec(r))||(m=/^([pqrst])(?=[^a-z]|$)/i.exec(r))){t.push({k:'var',v:m[1].toLowerCase()});i+=1;continue}
    throw new Error('Símbolo não reconhecido: "'+c+'". Use as letras p, q, r, s, t e os conectivos ~, ^, v, ->, <->.');
  }
  return t;
}
/* 'v' como "ou" só entre operandos: tratamos antes do léxico */
function prep(s){return s.replace(/(^|[^a-zA-Zãç])v(?![a-zA-Zãç])/gi,'$1 | ')}
function parse(src){
  var t=lex(prep(src)),i=0;
  function peek(){return t[i]&&t[i].k}
  function eat(k){if(peek()!==k)throw new Error('Expressão incompleta ou parênteses desbalanceados.');return t[i++]}
  function iff(){var a=imp();while(peek()==='iff'){i++;a={op:'iff',a:a,b:imp()}}return a}
  function imp(){var a=or();if(peek()==='imp'){i++;return {op:'imp',a:a,b:imp()}}return a}
  function or(){var a=and();while(peek()==='or'||peek()==='xor'){var o=t[i++].k;a={op:o,a:a,b:and()}}return a}
  function and(){var a=not();while(peek()==='and'){i++;a={op:'and',a:a,b:not()}}return a}
  function not(){if(peek()==='not'){i++;return {op:'not',a:not()}}return atom()}
  function atom(){
    if(peek()==='('){i++;var e=iff();eat(')');return e}
    if(peek()==='var')return {op:'var',v:t[i++].v};
    throw new Error('Esperava uma proposição (p, q, r, s ou t) ou um parêntese.');
  }
  if(!t.length)throw new Error('Digite uma fórmula.');
  var e=iff();if(i<t.length)throw new Error('Sobrou texto no fim da fórmula.');return e;
}
function ev(n,env){
  switch(n.op){case 'var':return env[n.v];case 'not':return !ev(n.a,env);case 'and':return ev(n.a,env)&&ev(n.b,env);case 'or':return ev(n.a,env)||ev(n.b,env);
  case 'xor':return ev(n.a,env)!==ev(n.b,env);case 'imp':return !ev(n.a,env)||ev(n.b,env);case 'iff':return ev(n.a,env)===ev(n.b,env)}
}
var SYM={and:'∧',or:'∨',xor:'⊻',imp:'→',iff:'↔'};
function show(n,top){
  if(n.op==='var')return n.v;if(n.op==='not')return '~'+show(n.a);
  var s=show(n.a)+' '+SYM[n.op]+' '+show(n.b);return top?s:'('+s+')';
}
function vars(n,acc){acc=acc||{};if(n.op==='var')acc[n.v]=1;else{vars(n.a,acc);if(n.b)vars(n.b,acc)}return acc}
function subs(n,out){out=out||[];if(n.op==='var')return out;subs(n.a,out);if(n.b)subs(n.b,out);var s=show(n,true);if(out.indexOf(s)<0)out.push(s);return out}
function subNodes(n,out){out=out||[];if(n.op==='var')return out;subNodes(n.a,out);if(n.b)subNodes(n.b,out);out.push(n);return out}
function envs(vs){var o=[],n=vs.length,i,j;for(i=0;i<Math.pow(2,n);i++){var e={};for(j=0;j<n;j++)e[vs[j]]=((i>>(n-1-j))&1)===0;o.push(e)}return o}
function vf(b){return b?'V':'F'}
function tabela(n,full){
  var vs=Object.keys(vars(n)).sort(),E=envs(vs),cols=full?subNodes(n):[n],seen={},cc=[];
  cols.forEach(function(c){var s=show(c,true);if(!seen[s]){seen[s]=1;cc.push(c)}});
  var res=E.map(function(e){return ev(n,e)});
  var h='<div style="overflow-x:auto"><table class="tbl"><tr>'+vs.map(function(v){return '<th style="width:auto">'+v+'</th>'}).join('')+cc.map(function(c,i){return '<th style="width:auto'+(i===cc.length-1?';color:var(--accent)':'')+'">'+esc(show(c,true))+'</th>'}).join('')+'</tr>';
  E.forEach(function(e,r){h+='<tr>'+vs.map(function(v){return '<td>'+vf(e[v])+'</td>'}).join('')+cc.map(function(c,i){var x=ev(c,e);return '<td'+(i===cc.length-1?' class="bn"':'')+'>'+vf(x)+'</td>'}).join('')+'</tr>'});
  h+='</table></div>';
  var nv=res.filter(Boolean).length,cls=nv===res.length?'Tautologia (todas as linhas V)':nv===0?'Contradição (todas as linhas F)':'Contingência (há linhas V e F)';
  return {html:h,res:res,vs:vs,cls:cls,nv:nv,n:res.length};
}
function calc(){
  var o=$('#outm'),a=$('#fa').value,b=$('#fb').value.trim(),A,B;
  try{A=parse(a)}catch(e){o.innerHTML='<p class="muted">'+esc(e.message)+'</p>';return}
  var T=tabela(A,true);
  var h='<p><span class="bn">'+esc(T.cls)+'</span><br><span class="muted">'+T.n+' linhas ('+T.vs.length+(T.vs.length>1?' proposições simples':' proposição simples')+', 2<sup>'+T.vs.length+'</sup> = '+T.n+'); '+T.nv+' V e '+(T.n-T.nv)+' F na coluna final.</span></p>'+T.html;
  if(b){
    try{B=parse(b)}catch(e){o.innerHTML=h+'<p class="muted">Segunda fórmula: '+esc(e.message)+'</p>';return}
    var va=Object.keys(vars(A)),vb=Object.keys(vars(B)),all=Object.keys(Object.assign({},vars(A),vars(B))).sort(),E=envs(all),dif=[],i;
    E.forEach(function(e){if(ev(A,e)!==ev(B,e))dif.push(e)});
    h+='<p style="margin-top:18px"><b>Comparação</b>: <code>'+esc(show(A,true))+'</code> e <code>'+esc(show(B,true))+'</code><br>';
    if(!dif.length)h+='<span class="bn">São equivalentes</span>: têm a mesma coluna final nas '+E.length+' linhas.</p>';
    else{h+='<span class="bn">Não são equivalentes</span>: diferem em '+dif.length+' de '+E.length+' linhas. Primeira diferença: '+all.map(function(v){return v+'='+vf(dif[0][v])}).join(', ')+', com a primeira valendo '+vf(ev(A,dif[0]))+' e a segunda '+vf(ev(B,dif[0]))+'.</p>'}
  }
  o.innerHTML=h;
}
$('#fa').addEventListener('input',calc);$('#fb').addEventListener('input',calc);
var EX=[['(p ^ q) -> ~r',''],['p -> q','~q -> ~p'],['~(p -> q)','p ^ ~q'],['p -> q','q -> p'],['~(p ^ q)','~p v ~q'],['p v ~p','']];
EX.forEach(function(e,i){var b=$('#ex'+(i+1));if(b)b.addEventListener('click',function(){$('#fa').value=e[0];$('#fb').value=e[1];calc()})});
window.__tv={parse:parse,ev:ev,tabela:tabela,show:show};
calc();
})();
