/* Funcoes puras do treino de Estudo de Caso (prova discursiva). Rodam no navegador e no Node (teste do laboratorio L6).
   countLines e uma ESTIMATIVA: paragrafo novo = linha nova; palavras sao postas ate completar "cpl" caracteres. */
(function(root){
  function norm(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
  function countLines(text,cpl){
    cpl=Math.max(10,Math.floor(cpl)||90);
    var paras=String(text).replace(/\r/g,'').split('\n');
    while(paras.length&&!paras[paras.length-1].trim())paras.pop();
    var n=0;
    paras.forEach(function(p){
      var words=p.split(/\s+/).filter(Boolean);
      if(!words.length){n+=1;return}
      var lines=1,cur=0;
      words.forEach(function(w){
        var L=w.length;
        if(L>cpl){if(cur>0)lines++;var extra=Math.ceil(L/cpl)-1;lines+=extra;cur=L-extra*cpl}
        else if(cur===0)cur=L;
        else if(cur+1+L<=cpl)cur+=1+L;
        else{lines++;cur=L}
      });
      n+=lines;
    });
    return n;
  }
  function countWords(text){return String(text).split(/\s+/).filter(Boolean).length}
  function hits(text,terms){var t=norm(text);return terms.filter(function(x){return t.indexOf(norm(x))>=0})}
  function fmtTime(sec){sec=Math.max(0,Math.round(sec));var m=Math.floor(sec/60),s=sec%60;return (m<10?'0':'')+m+':'+(s<10?'0':'')+s}
  function sumPoints(items,checked){var s=0;items.forEach(function(it,i){if(checked[i])s+=it.p});return s}
  var api={norm:norm,countLines:countLines,countWords:countWords,hits:hits,fmtTime:fmtTime,sumPoints:sumPoints};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DiscCore=api;
})(typeof window!=='undefined'?window:this);
