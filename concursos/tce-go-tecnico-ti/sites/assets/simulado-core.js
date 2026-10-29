/* Funcoes puras do simulado no formato da prova (nota ponderada, corte, tempo). Rodam no navegador e no Node. */
(function(root){
  function weightOf(disc,id){for(var i=0;i<disc.length;i++)if(disc[i].id===id)return disc[i].w;return 1}
  function maxPoints(qs,disc){var s=0;qs.forEach(function(q){s+=weightOf(disc,q.d)});return s}
  function score(qs,disc,ans){
    var by={},tot={pts:0,max:0,ok:0,n:0,blank:0,g:{pts:0,max:0,ok:0,n:0},e:{pts:0,max:0,ok:0,n:0}};
    disc.forEach(function(d){by[d.id]={id:d.id,nome:d.nome,g:d.g,w:d.w,ok:0,n:0,pts:0,max:0}});
    qs.forEach(function(q){
      var d=disc.filter(function(x){return x.id===q.d})[0],w=d.w,a=ans[q.n],hit=a===q.ok,grp=d.g==='G'?tot.g:tot.e,b=by[q.d];
      b.n++;b.max+=w;grp.n++;grp.max+=w;tot.n++;tot.max+=w;
      if(a==null||a==='')tot.blank++;
      if(hit){b.ok++;b.pts+=w;grp.ok++;grp.pts+=w;tot.ok++;tot.pts+=w}
    });
    tot.by=disc.map(function(d){return by[d.id]});tot.pts=tot.g.pts+tot.e.pts;return tot;
  }
  function cutPoints(max,pct){return Math.ceil(max*pct/100-1e-9)}
  function status(pts,max,cutPct,goalPct){
    if(pts>=cutPoints(max,goalPct))return 'meta';
    if(pts>=cutPoints(max,cutPct))return 'corte';
    return 'abaixo';
  }
  function fmtHMS(sec){sec=Math.max(0,Math.round(sec));var h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s}
  function timeLeft(startAt,minutes,now){return Math.max(0,Math.round(minutes*60-(now-startAt)/1000))}
  function caseScore(items,chk,desc,zero){var s=0;items.forEach(function(it,i){if(chk&&chk[i])s+=it.p});return zero?0:Math.max(0,s-(desc||0))}
  function finalVerdict(objStatus,caseScoreValue,minCase){
    var objOk=objStatus!=='abaixo',caseOk=caseScoreValue>=minCase;
    return {obj:objOk,caso:caseOk,all:objOk&&caseOk};
  }
  var api={weightOf:weightOf,maxPoints:maxPoints,score:score,cutPoints:cutPoints,status:status,fmtHMS:fmtHMS,timeLeft:timeLeft,caseScore:caseScore,finalVerdict:finalVerdict};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SimCore=api;
})(typeof window!=='undefined'?window:this);
