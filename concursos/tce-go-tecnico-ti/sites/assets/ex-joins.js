(function(){
var K=window.K,X=K.X;
function dep(k){k=k||{};return [X.box('d1',40,70,150,44,'RH',k.d1||'n','id 1'),X.box('d2',40,140,150,44,'TI',k.d2||'n','id 2'),X.box('d3',40,210,150,44,'Jurídico',k.d3||'n','id 3'),X.text('td',40,56,'dep','t')]}
function fun(k){k=k||{};return [X.box('f1',530,70,150,44,'Ana',k.f1||'n','dep_id 1'),X.box('f2',530,140,150,44,'Bia',k.f2||'n','dep_id 1'),X.box('f3',530,210,150,44,'Caio',k.f3||'n','dep_id 2'),X.text('tf',530,56,'func','t')]}
function z(t){return X.zone('z',10,10,700,330,t)}
var S=[
{label:'0. Os dados',title:'Duas tabelas: dep e func',text:'<p><code>dep</code> tem RH, TI e Jurídico. <code>func</code> tem Ana e Bia (dep_id 1) e Caio (dep_id 2). O departamento Jurídico <b>não tem</b> funcionários. Vamos juntar as duas tabelas de formas diferentes.</p>',
 scene:function(){return [z('Tabelas de entrada')].concat(dep(),fun())}},
{label:'1. Produto cartesiano',title:'Sem condição: todas as combinações (3 × 3 = 9 linhas)',text:'<p>Sem a cláusula <code>ON</code>, cada linha de dep se combina com cada linha de func: <b>m × n</b>. É o <code>CROSS JOIN</code>, e é também o resultado de esquecer a condição da junção.</p>',
 scene:function(){var L=[],i,j;for(i=0;i<3;i++)for(j=0;j<3;j++)L.push(X.line('c'+i+j,190,92+i*70,530,92+j*70,'m',false));return [z('CROSS JOIN: 9 pares')].concat(dep(),fun(),L)}},
{label:'2. A condição ON',title:'ON f.dep_id = d.id mantém só os pares que casam',text:'<p>A condição filtra o produto cartesiano. Sobram 3 pares: RH–Ana, RH–Bia e TI–Caio. É o <code>INNER JOIN</code>. O Jurídico <b>desaparece</b> do resultado, porque não tem par.</p>',
 scene:function(){return [z('INNER JOIN: 3 linhas')].concat(dep({d3:'d'}),fun(),[X.line('a1',190,92,530,92,'a',true),X.line('a2',190,92,530,162,'a',true),X.line('a3',190,162,530,232,'a',true)])}},
{label:'3. LEFT JOIN',title:'LEFT JOIN preserva o lado esquerdo inteiro',text:'<p>Todas as linhas de <code>dep</code> aparecem. Onde não há par, as colunas de <code>func</code> vêm <b>NULL</b>. Resultado: 4 linhas (RH–Ana, RH–Bia, TI–Caio e Jurídico com NULL). <code>RIGHT JOIN</code> faz o espelho; <code>FULL JOIN</code> preserva os dois lados.</p>',
 scene:function(){return [z('LEFT JOIN: 4 linhas')].concat(dep({d3:'a'}),fun(),[X.line('a1',190,92,530,92,'a',true),X.line('a2',190,92,530,162,'a',true),X.line('a3',190,162,530,232,'a',true),X.box('nl',530,280,150,40,'NULL','d','sem funcionário'),X.line('a4',190,232,530,300,'m',true)])}},
{label:'4. COUNT',title:'COUNT(f.id) dá 0; COUNT(*) daria 1',text:'<p>Com <code>GROUP BY d.nome</code>: RH = 2, TI = 1 e Jurídico = <b>0</b>, pois <code>COUNT(f.id)</code> ignora o NULL. Com <code>COUNT(*)</code> o Jurídico apareceria com <b>1</b>, porque a linha existe. Executado no laboratório L13, em PostgreSQL e SQLite.</p>',
 scene:function(){return [z('Resultado do agrupamento'),X.box('r1',60,80,180,50,'RH','n','COUNT(f.id) = 2'),X.box('r2',270,80,180,50,'TI','n','COUNT(f.id) = 1'),X.box('r3',480,80,180,50,'Jurídico','a','COUNT(f.id) = 0'),X.box('w',270,200,180,60,'COUNT(*) no Jurídico','d','daria 1 (a linha existe)'),X.line('lw',570,132,380,198,'m',true)]}},
{label:'5. Anti-junção',title:'Quem não tem par: NOT EXISTS (e a armadilha do NOT IN)',text:'<p>Para listar departamentos <b>sem</b> funcionários use <code>NOT EXISTS</code> ou <code>LEFT JOIN ... WHERE f.id IS NULL</code>. Evite <code>NOT IN</code> quando a subconsulta puder ter NULL: <code>x NOT IN (1, NULL)</code> nunca é verdadeiro e o resultado vem <b>vazio</b>.</p>',
 scene:function(){return [z('Anti-junção')].concat(dep({d1:'d',d2:'d',d3:'a'}),[X.box('q',300,100,330,100,'WHERE NOT EXISTS (...)','a','devolve só o Jurídico'),X.line('l',192,232,300,170,'a',true),X.text('w',300,250,'NOT IN com NULL na subconsulta: resultado vazio','t')])}}
];
K.explain({w:720,h:350,steps:S,alt:'Animação de junções SQL: produto cartesiano, INNER JOIN, LEFT JOIN, COUNT com NULL e anti-junção'});
})();
