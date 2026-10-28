(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['A tabela','Os tipos','As razões','O resultado'],subs=['três grandezas','direta ou inversa','multiplicar','e a conferência'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O problema',title:'Um arquivo para digitalizar',text:'<p>Em uma Câmara <b>fictícia</b>, <b>4 servidores</b>, trabalhando <b>6 horas por dia</b>, digitalizam o arquivo em <b>15 dias</b>. Em quantos dias <b>6 servidores</b>, trabalhando <b>5 horas por dia</b>, fariam o mesmo trabalho? São <b>três grandezas</b> (servidores, horas por dia e dias), então é uma <b>regra de três composta</b>. O caso mostra, em sete passos, como resolver.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('O enunciado'));
  N.push(X.box('c1',34,126,200,52,'4 servidores','a','6 horas por dia'));
  N.push(X.box('c2',254,126,200,52,'15 dias','a','o trabalho todo'));
  N.push(X.box('c3',474,126,196,52,'6 servidores','a','5 horas por dia, x dias?'));
  N.push(X.text('t0',34,250,'O trabalho a fazer é o mesmo nos dois casos.','t'));return N}},
{label:'1. A tabela',title:'Valores da mesma grandeza na mesma coluna',text:'<p>Monte a <b>tabela</b>: uma coluna para cada grandeza, uma linha para cada situação. A incógnita <b>x</b> vai no lugar que se quer descobrir. Organizar tudo antes de pensar evita trocar as razões depois. A grandeza da incógnita, aqui os <b>dias</b>, é a que vamos comparar com as outras duas.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('A tabela'));
  N.push(X.box('a1',34,112,200,48,'Servidores: 4','d','Horas por dia: 6'));
  N.push(X.box('a2',254,112,200,48,'Dias: 15','d','primeira situação'));
  N.push(X.box('b1',34,176,200,48,'Servidores: 6','a','Horas por dia: 5'));
  N.push(X.box('b2',254,176,200,48,'Dias: x','a','a incógnita'));
  N.push(X.text('t1',34,258,'Compare sempre a incógnita com uma grandeza por vez.','t'));return N}},
{label:'2. Dias e servidores',title:'Mais servidores, menos dias',text:'<p>Primeira comparação, deixando as horas por dia como estão: se há <b>mais servidores</b>, o trabalho termina em <b>menos dias</b>. As grandezas se movem em sentidos opostos, então são <b>inversamente proporcionais</b>. A razão que entra na conta é a dos servidores <b>invertida</b>: <b>4 ÷ 6</b>.</p>',
 scene:function(){var N=top(1);N=N.concat(scn('Dias e servidores'));
  N.push(X.box('d1',34,126,200,52,'Servidores','d','4 passam a 6, aumentam'));
  N.push(X.box('d2',254,126,200,52,'Dias','d','15 passam a x, diminuem'));
  N.push(X.box('d3',474,126,196,52,'INVERSA','a','razão usada: 4 ÷ 6'));
  N.push(X.text('t2',34,250,'Setas em sentidos opostos: inverta a razão.','t'));return N}},
{label:'3. Dias e horas por dia',title:'Menos horas por dia, mais dias',text:'<p>Segunda comparação, agora com as horas por dia: se cada servidor trabalha <b>menos horas por dia</b> (5 em vez de 6), o trabalho leva <b>mais dias</b>. De novo sentidos opostos, então a relação é <b>inversa</b>, e a razão das horas entra <b>invertida</b>: <b>6 ÷ 5</b>.</p>',
 scene:function(){var N=top(1,[]);N=N.concat(scn('Dias e horas por dia'));
  N.push(X.box('h1',34,126,200,52,'Horas por dia','d','6 passam a 5, diminuem'));
  N.push(X.box('h2',254,126,200,52,'Dias','d','aumentam'));
  N.push(X.box('h3',474,126,196,52,'INVERSA','a','razão usada: 6 ÷ 5'));
  N.push(X.text('t3',34,250,'Cada grandeza é comparada só com a incógnita.','t'));return N}},
{label:'4. A proporção',title:'Multiplique as razões',text:'<p>Na regra de três composta, a razão da incógnita é igual ao <b>produto</b> das razões das outras grandezas, cada uma já na posição certa. Então: <b>x ÷ 15 = (4 ÷ 6) × (6 ÷ 5)</b>. Se uma das relações fosse direta, a razão entraria sem inverter.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Montando a proporção'));
  N.push(X.box('p1',34,126,200,52,'x ÷ 15','a','a razão dos dias'));
  N.push(X.box('p2',254,126,200,52,'4 ÷ 6','d','servidores, invertida'));
  N.push(X.box('p3',474,126,196,52,'6 ÷ 5','d','horas por dia, invertida'));
  N.push(X.text('t4',34,250,'x ÷ 15 = (4 ÷ 6) × (6 ÷ 5)','t'));return N}},
{label:'5. A conta',title:'Resolva a conta',text:'<p>Multiplique as razões do lado direito: <b>(4 ÷ 6) × (6 ÷ 5) = 24 ÷ 30 = 4 ÷ 5</b>. Então <b>x ÷ 15 = 4 ÷ 5</b>, e em cruz <b>5x = 60</b>, ou seja, <b>x = 12 dias</b>. Menos dias do que os 15 da primeira situação, o que faz sentido: há mais servidores, e cada um trabalha só uma hora a menos por dia.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('A conta'));
  N.push(X.box('r1',34,126,200,52,'24 ÷ 30','d','igual a 4 ÷ 5'));
  N.push(X.box('r2',254,126,200,52,'x = 15 × 4 ÷ 5','d','x = 60 ÷ 5'));
  N.push(X.box('r3',474,126,196,52,'x = 12 dias','a','a resposta'));
  N.push(X.text('t5',34,250,'12 dias é menor que 15: o resultado faz sentido.','t'));return N}},
{label:'6. A conferência',title:'O trabalho total é o mesmo',text:'<p>Para conferir, calcule o <b>trabalho total</b> em servidores-hora. Na primeira situação: 4 × 6 × 15 = <b>360</b>. Na segunda: 6 × 5 × 12 = <b>360</b>. Os dois números iguais mostram que a resposta está certa. Essa conferência funciona porque o trabalho a fazer é o mesmo nos dois casos.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Conferindo'));
  N.push(X.box('v1',34,126,200,52,'4 × 6 × 15','d','= 360 servidores-hora'));
  N.push(X.box('v2',254,126,200,52,'6 × 5 × 12','d','= 360 servidores-hora'));
  N.push(X.box('v3',474,126,196,52,'Iguais','a','resposta confirmada'));
  N.push(X.text('t6',34,250,'Se der diferente, volte e confira qual razão inverteu.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que resolve uma regra de três composta: 4 servidores, 6 horas por dia, 15 dias; com 6 servidores e 5 horas por dia, são 12 dias. Mostra a tabela, as duas relações inversas, a multiplicação das razões, a conta e a conferência pelo trabalho total de 360 servidores-hora'});
})();
