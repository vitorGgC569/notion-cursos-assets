(function(){
var K=window.K,X=K.X;
function z(t){return X.zone('z',10,10,700,330,t)}
var S=[
{label:'0. A consulta',title:'SELECT * FROM cliente WHERE cpf = \'123\'',text:'<p>A tabela tem 1 milhão de linhas (exemplo didático) espalhadas em muitas páginas de disco. Sem índice, o SGBD não sabe onde está o CPF.</p>',
 scene:function(){return [z('Tabela com 1.000.000 de linhas'),X.box('t',60,90,600,90,'Tabela cliente','n','sem índice em cpf'),X.text('q',60,230,'WHERE cpf = \'123\'','t')]}},
{label:'1. Varredura sequencial',title:'Seq Scan: lê a tabela inteira',text:'<p>Sem índice, o plano é <b>Seq Scan</b>: lê todas as páginas e testa cada linha. O custo cresce com o tamanho da tabela, O(n). Para consultas que devolvem quase toda a tabela, é até a melhor escolha.</p>',
 scene:function(){var B=[],i;for(i=0;i<8;i++)B.push(X.box('p'+i,40+i*80,100,70,50,'pág '+(i+1),'a'));return [z('Seq Scan: todas as páginas')].concat(B,[X.text('t',60,200,'lê todas as páginas e filtra linha a linha','t')])}},
{label:'2. B-tree',title:'Com índice B-tree: desce a árvore',text:'<p>O índice é uma árvore balanceada. A busca desce da raiz às folhas em poucos passos: com milhões de entradas, apenas cerca de <b>3 a 4 níveis</b>, ou seja O(log n). Na folha está o ponteiro para a linha.</p>',
 scene:function(){return [z('Index Scan: raiz, ramo, folha, linha'),X.box('r',275,60,170,50,'Raiz','a','100 | 500'),X.box('m',275,140,170,50,'Nó interno','a','120 | 180 | 300'),X.box('f',275,220,170,50,'Folha','a','cpf 123 → ponteiro'),X.box('l',520,220,150,50,'Linha','d','na tabela'),X.line('l1',360,112,360,138,'a',true),X.line('l2',360,192,360,218,'a',true),X.line('l3',447,245,518,245,'a',true)]}},
{label:'3. Sargável',title:'Sargabilidade: a função na coluna desliga o índice',text:'<p><code>WHERE UPPER(nome) = \'ANA\'</code> ou <code>WHERE EXTRACT(YEAR FROM data) = 2025</code> aplicam uma função à coluna e impedem o uso do índice comum. Reescreva para <code>data &gt;= \'2025-01-01\' AND data &lt; \'2026-01-01\'</code> ou crie um <b>índice funcional</b>.</p>',
 scene:function(){return [z('Sargável x não sargável'),X.box('a',40,80,300,90,'Usa o índice','a','data >= \'2025-01-01\'\nAND data < \'2026-01-01\''),X.box('b',380,80,300,90,'Não usa o índice comum','d','EXTRACT(YEAR FROM data) = 2025\nLIKE \'%x\'')]}},
{label:'4. Custo dos índices',title:'Índice não é de graça',text:'<p>Cada <code>INSERT</code>, <code>UPDATE</code> e <code>DELETE</code> também atualiza os índices, e eles ocupam espaço. Em colunas com <b>baixa seletividade</b> (poucos valores distintos), o otimizador prefere varrer a tabela. Índice composto só ajuda pelo <b>prefixo à esquerda</b>.</p>',
 scene:function(){return [z('Custos e escolhas'),X.box('a',40,80,200,100,'Leitura','a','mais rápida com índice'),X.box('b',260,80,200,100,'Escrita','d','mais lenta: atualiza índices'),X.box('c',480,80,200,100,'Espaço','n','estrutura extra em disco')]}},
{label:'5. EXPLAIN',title:'EXPLAIN mostra a escolha do otimizador',text:'<p>O otimizador usa estatísticas (<code>ANALYZE</code>) para estimar custos e escolher entre <b>Seq Scan</b> e <b>Index Scan</b>, e entre as junções <i>nested loop</i>, <i>hash</i> e <i>merge</i>. <code>EXPLAIN ANALYZE</code> executa e mostra tempos reais. O laboratório L7 compara os planos no PostgreSQL e no SQLite.</p>',
 scene:function(){return [z('Plano de execução'),X.box('a',60,70,280,70,'EXPLAIN','n','plano estimado'),X.box('b',380,70,280,70,'EXPLAIN ANALYZE','a','executa e mede'),X.box('c',60,180,600,80,'Seq Scan  x  Index Scan  |  Nested Loop  x  Hash Join  x  Merge Join','d','custo estimado por estatísticas')]}}
];
K.explain({w:720,h:350,steps:S,alt:'Animação de índice B-tree contra varredura sequencial, com sargabilidade e EXPLAIN'});
})();
