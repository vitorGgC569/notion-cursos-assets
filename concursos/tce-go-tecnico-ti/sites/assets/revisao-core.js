/* TCE-GO 2026 · cartões de revisão por módulo: lógica pura (sem DOM), testável no Node */
(function(root){
'use strict';
var C={};
/* Monta a lista de cartões a mostrar. D.decks=[{m,nome,ess:[{f,b}],comp:[{f,b}]}]
   S={mode:'ess'|'comp', sel:{m:true|false}, known:{id:true}} ; opts={only:bool,shuffle:bool,rng:fn} */
C.id=function(m,tipo,i){return 'm'+m+tipo+i};
C.cards=function(D,S,opts){
  opts=opts||{};var out=[];
  D.decks.forEach(function(d){
    if(S.sel&&S.sel[d.m]===false)return;
    var tipo=S.mode==='comp'?'c':'e',lista=S.mode==='comp'?d.comp:d.ess;
    lista.forEach(function(c,i){out.push({id:C.id(d.m,tipo,i),m:d.m,nome:d.nome,f:c.f,b:c.b,tipo:tipo})});
  });
  if(opts.only)out=out.filter(function(c){return !(S.known&&S.known[c.id])});
  if(opts.shuffle)out=C.shuffle(out,opts.rng||Math.random);
  return out;
};
C.shuffle=function(a,rng){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(rng()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a};
/* contagem de sabidos entre os cartões do modo atual e módulos selecionados */
C.stats=function(D,S){
  var all=C.cards(D,S,{}),k=0;all.forEach(function(c){if(S.known&&S.known[c.id])k++});
  return {total:all.length,known:k,left:all.length-k};
};
/* texto dos cartões que faltam, para colar no caderno de erros */
C.missingText=function(D,S){
  var by={};C.cards(D,S,{only:true}).forEach(function(c){(by[c.m]=by[c.m]||{nome:c.nome,l:[]}).l.push(c.f)});
  var ms=Object.keys(by).map(Number).sort(function(a,b){return a-b});
  return ms.map(function(m){return 'Módulo '+m+' ('+by[m].nome+')\n'+by[m].l.map(function(f){return '- '+f}).join('\n')}).join('\n\n');
};
if(typeof module!=='undefined'&&module.exports)module.exports=C;else root.RevCore=C;
})(typeof window!=='undefined'?window:this);
