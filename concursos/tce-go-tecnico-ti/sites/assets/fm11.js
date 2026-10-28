// Formulas do Modulo 11 (mesmas do laboratorio L1 e L4). Funciona no navegador e no Node.
(function(root){
function evm(bac,pv,ev,ac){var cpi=ev/ac,spi=ev/pv,eacT=bac/cpi;return {cpi:cpi,spi:spi,cv:ev-ac,sv:ev-pv,eacAt:ac+(bac-ev),eacTip:eacT,eacCS:ac+(bac-ev)/(cpi*spi),etc:eacT-ac,vac:bac-eacT,tcpi:(bac-ev)/(bac-ac)};}
function budgetMin(slo,days){return days*24*60*(1-slo/100);}
function downtimeHours(avail){return (1-avail/100)*8760;}
function seriesAvail(a,b){return a*b/100;}
function parallelAvail(a,b){return 100-(100-a)*(100-b)/100;}
var A={evm:evm,budgetMin:budgetMin,downtimeHours:downtimeHours,seriesAvail:seriesAvail,parallelAvail:parallelAvail};
if(typeof module!=='undefined') module.exports=A; else root.FM11=A;
})(this);
