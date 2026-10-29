// Contagem de prazo em dias uteis, art. 55 da Lei 16.168/2007: exclui o dia do comeco e inclui o do vencimento.
// Datas em UTC para evitar efeito de fuso horario. Feriados: so os informados.
function parse(s){var p=s.split('-');return new Date(Date.UTC(+p[0],+p[1]-1,+p[2]));}
function iso(d){return d.toISOString().slice(0,10);}
function util(d,fer){var w=d.getUTCDay();return w!==0&&w!==6&&!fer.has(iso(d));}
function prazoUteis(inicio,n,fer){var d=parse(inicio),c=0;while(c<n){d=new Date(d.getTime()+86400000);if(util(d,fer))c++;}return iso(d);}
function prazoCorridos(inicio,n){return iso(new Date(parse(inicio).getTime()+n*86400000));}
if(typeof module!=='undefined')module.exports={prazoUteis:prazoUteis,prazoCorridos:prazoCorridos,parse:parse,iso:iso};
