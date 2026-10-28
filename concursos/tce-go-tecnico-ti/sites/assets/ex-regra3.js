(function(){
var K=window.K,X=K.X;
var S=[
{label:'0. Monte a tabela',title:'Duas grandezas, uma incógnita',text:'<p>Regra de três simples relaciona <b>duas grandezas</b> em dois casos. Exemplo: 3 cadernos custam R$ 18; quanto custam 7? Coloque valores da mesma grandeza na mesma coluna e a incógnita <b>x</b> no lugar do que se quer saber.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Passo 1: tabela'),X.box('h1',160,60,200,36,'Cadernos','m'),X.box('h2',380,60,200,36,'Preço (R$)','m'),
  X.box('a1',160,110,200,50,'3','n'),X.box('a2',380,110,200,50,'18','n'),X.box('b1',160,180,200,50,'7','n'),X.box('b2',380,180,200,50,'x','a'),
  X.box('t',160,250,420,44,'mesma grandeza na mesma coluna','t')]}},
{label:'1. Direta',title:'Grandezas diretamente proporcionais: setas no mesmo sentido',text:'<p>Mais cadernos, mais dinheiro: as duas crescem juntas. É <b>direta</b>. Multiplicam-se em cruz: <code>3 · x = 7 · 18</code>, então <code>x = 126 ÷ 3 = 42</code>. Outra forma: o preço unitário é 18 ÷ 3 = 6, e 7 · 6 = 42.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Direta'),X.box('h1',160,50,200,36,'Cadernos','m'),X.box('h2',380,50,200,36,'Preço (R$)','m'),
  X.box('a1',160,100,200,50,'3','n'),X.box('a2',380,100,200,50,'18','n'),X.box('b1',160,170,200,50,'7','n'),X.box('b2',380,170,200,50,'x = 42','d'),
  X.line('s1',140,125,140,195,'a',true),X.line('s2',600,125,600,195,'a',true),X.box('t',160,240,420,50,'3x = 7 · 18  ⇒  x = 42','a','produto em cruz')]}},
{label:'2. Inversa',title:'Grandezas inversamente proporcionais: setas contrárias',text:'<p>6 operários terminam a obra em 10 dias. Em quantos dias 15 operários? Mais operários, <b>menos dias</b>: é <b>inversa</b>. Aqui o <b>produto</b> é constante: <code>6 · 10 = 15 · x</code>, logo <code>x = 60 ÷ 15 = 4 dias</code>. Na inversa, multiplica-se na horizontal, e não em cruz.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Inversa'),X.box('h1',160,50,200,36,'Operários','m'),X.box('h2',380,50,200,36,'Dias','m'),
  X.box('a1',160,100,200,50,'6','n'),X.box('a2',380,100,200,50,'10','n'),X.box('b1',160,170,200,50,'15','n'),X.box('b2',380,170,200,50,'x = 4','d'),
  X.line('s1',140,195,140,125,'a',true),X.line('s2',600,125,600,195,'a',true),X.box('t',160,240,420,50,'6 · 10 = 15 · x  ⇒  x = 4','a','o produto se mantém')]}},
{label:'3. Como decidir',title:'O teste da seta: compare cada grandeza com a incógnita',text:'<p>Pergunte: <b>se a outra grandeza aumenta, a incógnita aumenta ou diminui?</b> Aumenta junto: direta. Aumenta enquanto a incógnita diminui: inversa. Exemplos: velocidade e tempo (mesma distância) são inversas; trabalhadores e tempo, inversas; quantidade e preço, diretas; área pintada e tinta, diretas.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Teste da seta'),X.box('d1',40,60,300,70,'Direta','a','quantidade × preço\ntrabalho feito × tempo'),X.box('i1',380,60,300,70,'Inversa','d','operários × dias\nvelocidade × tempo'),
  X.box('q',40,160,640,50,'Pergunta: se uma dobra, a outra dobra ou cai à metade?','n'),X.box('r',40,230,640,50,'Dobra junto: direta. Dobra uma e cai a outra: inversa.','m')]}},
{label:'4. Composta',title:'Regra de três composta: compare cada grandeza com a incógnita',text:'<p>8 máquinas, 6 h/dia, 5 dias produzem 480 peças. Quantas peças fazem 10 máquinas, 9 h/dia, 4 dias? Todas as três (máquinas, horas, dias) são <b>diretas</b> em relação às peças. Multiplique as razões: <code>x = 480 · (10/8) · (9/6) · (4/5) = 720</code>. Se alguma fosse inversa, inverta a sua razão.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Composta'),X.box('h0',60,50,120,32,'Máquinas','m'),X.box('h1',190,50,120,32,'Horas/dia','m'),X.box('h2',320,50,120,32,'Dias','m'),X.box('h3',450,50,150,32,'Peças','m'),
  X.box('a0',60,90,120,44,'8','n'),X.box('a1',190,90,120,44,'6','n'),X.box('a2',320,90,120,44,'5','n'),X.box('a3',450,90,150,44,'480','n'),
  X.box('b0',60,144,120,44,'10','n'),X.box('b1',190,144,120,44,'9','n'),X.box('b2',320,144,120,44,'4','n'),X.box('b3',450,144,150,44,'x = 720','d'),
  X.box('f',60,210,540,50,'x = 480 · 10/8 · 9/6 · 4/5 = 720','a','todas diretas com peças'),X.box('g',60,270,540,40,'Inversa? inverta aquela razão.','m')]}},
{label:'5. Erros comuns',title:'Dois erros que a banca espera',text:'<p><b>Erro 1:</b> tratar inversa como direta (5 pedreiros levam 12 dias; 10 pedreiros levam 6, e não 24). <b>Erro 2:</b> comparar grandezas com unidades diferentes (minutos com horas): converta antes. E sempre faça a <b>verificação de bom senso</b>: se há mais trabalhadores, o tempo tem que diminuir.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Cuidados'),X.box('a',40,60,300,100,'Direta × inversa','a','5 pedreiros: 12 dias\n10 pedreiros: 6 dias, não 24'),X.box('b',380,60,300,100,'Unidades iguais','a','minutos com minutos\nreais com reais'),
  X.box('c',40,190,640,80,'Bom senso','d','o resultado tem que fazer sentido: mais gente, menos tempo')]}}
];
K.explain({w:720,h:350,steps:S,alt:'Animação de regra de três simples direta, inversa e composta'});
})();
