// Formulas do Modulo 9 (mesmas usadas no gerador do site). Funciona no navegador e no Node.
(function(root){
function nChunks(n,size,ov){ if(n<=size) return 1; return Math.ceil((n-ov)/(size-ov)); }
function cosine(a,b){ var d=0,x=0,y=0; for(var i=0;i<a.length;i++){d+=a[i]*b[i];x+=a[i]*a[i];y+=b[i]*b[i];} return d/(Math.sqrt(x)*Math.sqrt(y)); }
function precisionAtK(r,rel,k){ var c=0; for(var i=0;i<k&&i<r.length;i++) if(rel.indexOf(r[i])>=0) c++; return c/k; }
function recallAtK(r,rel,k){ var c=0; for(var i=0;i<k&&i<r.length;i++) if(rel.indexOf(r[i])>=0) c++; return c/rel.length; }
function mrr(r,rel){ for(var i=0;i<r.length;i++) if(rel.indexOf(r[i])>=0) return 1/(i+1); return 0; }
function combos(n,k){ if(k<0||k>n) return 0; var r=1; for(var i=1;i<=k;i++) r=r*(n-k+i)/i; return Math.round(r); }
function passK(n,c,k){ if(n-c<k) return 1; return 1-combos(n-c,k)/combos(n,k); }
function agentTokens(S,A,N){ return N*S+A*N*(N-1)/2; }
var A={combos:combos,agentTokens:agentTokens,nChunks:nChunks,cosine:cosine,precisionAtK:precisionAtK,recallAtK:recallAtK,mrr:mrr,passK:passK};
if(typeof module!=='undefined') module.exports=A; else root.FM9=A;
})(this);
