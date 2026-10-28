// Formulas do Modulo 10 (mesmas usadas no gerador do site). Funciona no navegador e no Node.
(function(root){
function entropyBits(len,alpha){ return len*Math.log2(alpha); }
function keysSym(n){ return n*(n-1)/2; }
function keysAsym(n){ return 2*n; }
function ale(av,ef,aro){ return av*ef*aro; }
function sle(av,ef){ return av*ef; }
function downtimeHours(avail){ return (1-avail/100)*8760; }
function seriesAvail(a,b){ return a*b/100; }
function parallelAvail(a,b){ return 100-(100-a)*(100-b)/100; }
function bruteYears(bits,rate){ return Math.pow(2,bits-1)/rate/31557600; }
function restoreSets(tipo,k){ if(tipo==='completo') return 1; if(tipo==='incremental') return 1+k; return k>=1?2:1; }
function backupBytes(tipo,F,d,k){ if(tipo==='completo') return F*(k+1); if(tipo==='incremental') return F+d*k; return F+d*k*(k+1)/2; }
function hexLen(bits){ return bits/4; }
function rpoHoras(freq){ return freq; }
var A={entropyBits:entropyBits,keysSym:keysSym,keysAsym:keysAsym,ale:ale,sle:sle,downtimeHours:downtimeHours,seriesAvail:seriesAvail,parallelAvail:parallelAvail,bruteYears:bruteYears,restoreSets:restoreSets,backupBytes:backupBytes,hexLen:hexLen,rpoHoras:rpoHoras};
if(typeof module!=='undefined') module.exports=A; else root.FM10=A;
})(this);
