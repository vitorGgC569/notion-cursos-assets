(function(){
var K=window.K,X=K.X;
/* barra: valor v numa escala em que 100 = 400 px */
function bar(id,x,y,v,t,c,s){return X.box(id,x,y,Math.max(30,v*3.6),40,t,c||'n',s)}
var S=[
{label:'0. Percentual é fração',title:'25% de 800: uma fração de denominador 100',text:'<p>"Por cento" quer dizer "por cem". <b>25% = 25/100 = 1/4</b>. Então 25% de 800 é <code>800 × 25/100 = 200</code>. Em decimal: 25% = 0,25 e <code>800 × 0,25 = 200</code>. Sempre identifique <b>sobre quem</b> o percentual incide: aquele valor é a base (100%).</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Porcentagem de um valor'),X.box('t',60,60,600,50,'Base: 800  (100%)','n'),
  X.box('p',60,130,150,50,'25%  =  200','a'),X.box('r',216,130,444,50,'75%  =  600','n'),
  X.box('f',60,210,600,60,'25% = 25/100 = 1/4 = 0,25','d','800 × 0,25 = 200')]}},
{label:'1. Aumento e desconto',title:'Fator de multiplicação: ×1,20 e ×0,85',text:'<p>Um <b>aumento de 20%</b> multiplica por <b>1,20</b> (100% + 20%). Um <b>desconto de 15%</b> multiplica por <b>0,85</b> (100% − 15%). Um passo só: <code>R$ 200 × 1,20 = R$ 240</code>. É mais rápido e evita errar a conta com duas etapas.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Fatores'),X.box('a',60,70,200,60,'R$ 200','n','preço inicial'),
  X.line('l1',262,100,358,100,'a',true),X.box('b',360,70,200,60,'× 1,20','a','aumento de 20%'),X.line('l2',562,100,640,100,'a',true),X.box('c',480,160,180,60,'R$ 240','d'),
  X.box('d',60,160,200,60,'R$ 200','n','preço inicial'),X.line('l3',262,190,358,190,'',true),X.box('e',270,230,300,50,'× 0,85  (desconto de 15%)','m','daria R$ 170')]}},
{label:'2. Aumentos sucessivos',title:'+20% e depois −20% não voltam ao início',text:'<p>Os percentuais incidem sobre bases diferentes e <b>não se somam</b>. De 100, +20% leva a 120. Os −20% incidem sobre 120: <code>120 × 0,80 = 96</code>. Resultado: perda líquida de <b>4%</b>. O fator total é <code>1,20 × 0,80 = 0,96</code>.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Sucessivos'),bar('b1',60,60,100,'100','n','início'),bar('b2',60,120,120,'120','a','+20%'),bar('b3',60,180,96,'96','d','−20% de 120'),
  X.text('t1',500,86,'base 100','t'),X.text('t2',500,146,'× 1,20','t'),X.text('t3',500,206,'× 0,80','t'),
  X.box('f',60,240,600,50,'Fator total 1,20 × 0,80 = 0,96: perda de 4%','a')]}},
{label:'3. Variação percentual',title:'Variação = (final − inicial) ÷ inicial',text:'<p>De R$ 80 para R$ 100, o aumento foi de 20 reais. O percentual é calculado sobre o valor <b>inicial</b>: <code>20 ÷ 80 = 0,25 = 25%</code>. Dividir pelo final (20 ÷ 100 = 20%) é o erro clássico. Para voltar de 100 a 80, a queda é de 20 ÷ 100 = 20%.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Variação'),bar('i',60,60,80,'inicial: R$ 80','n'),bar('f',60,120,100,'final: R$ 100','a'),
  X.box('d',60,190,250,70,'diferença: 20','n','100 − 80'),X.box('r',340,190,320,70,'20 ÷ 80 = 25%','d','base é o valor inicial'),
  X.box('e',60,274,600,40,'Erro comum: 20 ÷ 100 = 20% (usa o final)','m')]}},
{label:'4. Pontos percentuais',title:'Pontos percentuais não são percentuais',text:'<p>Se a taxa passou de 20% para 25%, ela subiu <b>5 pontos percentuais</b> (25 − 20). Mas a variação percentual foi <code>5 ÷ 20 = 25%</code>. A diferença entre as duas taxas é em pontos; a razão entre elas é em percentual. A FCC explora essa troca de palavras.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'p.p. e %'),X.box('a',60,70,250,70,'Taxa antes: 20%','n'),X.box('b',60,170,250,70,'Taxa depois: 25%','a'),
  X.line('l1',312,105,398,105,'a',true),X.line('l2',312,205,398,205,'a',true),X.box('c',400,70,260,70,'+5 pontos percentuais','d','25 − 20'),X.box('d',400,170,260,70,'+25% de aumento','d','5 ÷ 20')]}},
{label:'5. Porcentagem da porcentagem',title:'Percentual de um percentual: multiplique',text:'<p>"40% dos funcionários são mulheres, e 30% delas têm pós-graduação": <code>0,40 × 0,30 = 0,12 = 12%</code> do total. Cada nível multiplica a base do anterior. Se são 500 funcionários: 500 × 0,40 = 200 mulheres; 200 × 0,30 = 60 com pós.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Em cascata'),X.box('a',60,60,600,50,'500 funcionários (100%)','n'),X.box('b',60,130,300,50,'40%: 200 mulheres','a'),
  X.box('c',60,200,150,50,'30% delas: 60','d'),X.box('d',230,200,430,50,'60 ÷ 500 = 12% do total (0,40 × 0,30)','n')]}}
];
K.explain({w:720,h:350,steps:S,alt:'Animação de porcentagem: fração, fator de aumento, variações sucessivas, variação percentual e pontos percentuais'});
})();
