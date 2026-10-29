// Priorizacao didatica do PDTI 2025-2026 do TCE-GO (Tabela 1): soma dos 7 criterios.
// CP01: 1 a 50 (nota da Presidencia). CP02 a CP04: Alto/Alta 10, Medio/Media 5, Baixo/Baixa 2,5.
// CP03: todas as areas 10, 2 a 3 areas 5, uma area 2,5. CP05 a CP07 sao INVERSOS: Alta 2,5, Media 5, Baixa 10.
// O PDTI nao traz formula escrita; a soma e uma hipotese didatica.
var NIVEL={alta:0,media:1,baixa:2};
var DIRETO=[10,5,2.5], INVERSO=[2.5,5,10];
function pontos(cp01,n){ // n: {cp02,cp03,cp04,cp05,cp06,cp07} com valores 'alta'|'media'|'baixa'
  var c1=Math.max(1,Math.min(50,Number(cp01)||1));
  var p={cp01:c1,cp02:DIRETO[NIVEL[n.cp02]],cp03:DIRETO[NIVEL[n.cp03]],cp04:DIRETO[NIVEL[n.cp04]],cp05:INVERSO[NIVEL[n.cp05]],cp06:INVERSO[NIVEL[n.cp06]],cp07:INVERSO[NIVEL[n.cp07]]};
  p.total=p.cp01+p.cp02+p.cp03+p.cp04+p.cp05+p.cp06+p.cp07; return p;
}
if(typeof module!=='undefined')module.exports={pontos:pontos};
