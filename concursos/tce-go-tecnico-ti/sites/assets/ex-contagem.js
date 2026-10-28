(function(){
var K=window.K,X=K.X;
var S=[
{label:'0. Multiplicativo',title:'Princípio multiplicativo: etapas sucessivas se multiplicam',text:'<p>Se uma tarefa tem etapas e cada etapa tem um número de escolhas, o total é o <b>produto</b>. 3 camisas e 2 calças formam <code>3 × 2 = 6</code> trajes. Use quando a palavra é <b>"e"</b>: escolhe a camisa <b>e</b> a calça.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Árvore de possibilidades'),X.box('r',40,160,110,40,'início','m'),
  X.box('c1',210,60,110,40,'camisa A','n'),X.box('c2',210,160,110,40,'camisa B','n'),X.box('c3',210,260,110,40,'camisa C','n'),
  X.box('k1',400,40,150,30,'A com calça 1','a'),X.box('k2',400,78,150,30,'A com calça 2','a'),X.box('k3',400,140,150,30,'B com calça 1','a'),X.box('k4',400,178,150,30,'B com calça 2','a'),X.box('k5',400,240,150,30,'C com calça 1','a'),X.box('k6',400,278,150,30,'C com calça 2','a'),
  X.box('t',580,160,110,40,'3 × 2 = 6','d')]}},
{label:'1. Aditivo',title:'Princípio aditivo: alternativas que não se misturam somam',text:'<p>Para ir ao trabalho há 3 linhas de ônibus <b>ou</b> 2 de metrô, e a pessoa escolhe um meio só: <code>3 + 2 = 5</code> maneiras. Use quando a palavra é <b>"ou"</b> e os conjuntos não têm elementos em comum. Se houver elementos comuns, subtraia a interseção (inclusão-exclusão).</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Ou um, ou outro'),X.box('a',60,70,260,100,'3 linhas de ônibus','n','escolhe 1 de 3'),X.box('b',400,70,260,100,'2 linhas de metrô','n','escolhe 1 de 2'),
  X.box('c',200,210,320,70,'3 + 2 = 5 maneiras','d','não é 3 × 2')]}},
{label:'2. Permutação',title:'Permutação simples: n! filas diferentes',text:'<p>De quantas maneiras 4 pessoas formam uma fila? Para a 1ª posição há 4 escolhas, para a 2ª há 3, depois 2 e 1: <code>4 · 3 · 2 · 1 = 4! = 24</code>. Permutação usa <b>todos</b> os elementos e só muda a <b>ordem</b>. Se duas pessoas devem ficar juntas, trate-as como um bloco e multiplique por 2 (a ordem interna).</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Fila de 4 pessoas'),X.box('p1',60,80,120,70,'1ª posição','n','4 escolhas'),X.box('p2',200,80,120,70,'2ª posição','n','3 escolhas'),X.box('p3',340,80,120,70,'3ª posição','n','2 escolhas'),X.box('p4',480,80,120,70,'4ª posição','n','1 escolha'),
  X.box('r',160,190,340,60,'4 · 3 · 2 · 1 = 4! = 24','d'),X.box('j',60,265,540,44,'Dois sempre juntos: 3! · 2! = 12','m')]}},
{label:'3. Arranjo',title:'Arranjo A(n, p): escolhe p de n, e a ordem importa',text:'<p>Em uma corrida com 5 atletas, de quantas formas saem ouro e prata? A ordem importa (ouro/prata é diferente de prata/ouro): <code>A(5,2) = 5 · 4 = 20</code>. Fórmula: <code>n! ÷ (n − p)!</code>. Pistas: <b>cargos distintos</b>, pódio, senha sem repetição, premiações diferentes.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Pódio com 5 atletas'),X.box('o',60,70,200,80,'Ouro','n','5 candidatos'),X.box('p',300,70,200,80,'Prata','n','4 candidatos restantes'),
  X.box('r',60,180,440,70,'A(5, 2) = 5 · 4 = 20','d','n! ÷ (n − p)! = 120 ÷ 6'),X.box('m',540,70,150,180,'ordem\nimporta','a')]}},
{label:'4. Combinação',title:'Combinação C(n, p): escolhe p de n, ordem não importa',text:'<p>Em uma comissão de 2 pessoas entre 5 candidatos, "Ana e Bia" é o mesmo grupo que "Bia e Ana". Cada comissão foi contada 2! vezes nos arranjos: <code>C(5,2) = A(5,2) ÷ 2! = 20 ÷ 2 = 10</code>. Fórmula: <code>n! ÷ [p! · (n − p)!]</code>. Pistas: comissão, grupo, equipe, subconjunto.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Comissão de 2 entre 5'),X.box('a',60,70,300,70,'Arranjos: 20','n','Ana-Bia e Bia-Ana contam separado'),X.box('b',400,70,260,70,'÷ 2! = ÷ 2','a','cada comissão repetida 2 vezes'),
  X.box('c',60,170,600,70,'C(5, 2) = 20 ÷ 2 = 10','d','a ordem não importa'),X.box('d',60,260,600,44,'Identidade útil: C(n, p) = C(n, n − p)','m')]}},
{label:'5. Repetição',title:'Permutação com elementos repetidos',text:'<p>Anagramas de <b>ANA</b>: se as três letras fossem diferentes, seriam 3! = 6. Como o A aparece 2 vezes, dividem-se as trocas entre letras iguais: <code>3! ÷ 2! = 3</code> (ANA, AAN, NAA). Para <b>ARARA</b> (3 A, 2 R): <code>5! ÷ (3! · 2!) = 10</code>.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Anagramas'),X.box('a',60,70,280,80,'ANA','n','3! ÷ 2! = 3'),X.box('b',380,70,280,80,'ARARA','n','5! ÷ (3! · 2!) = 10'),
  X.box('c',60,180,600,70,'Divida por k! para cada letra que se repete k vezes','a'),X.box('d',60,266,600,44,'ANA, AAN, NAA são os três anagramas','m')]}},
{label:'6. Como escolher',title:'Quatro perguntas para escolher a técnica',text:'<p>1) As etapas são sucessivas? <b>Multiplique</b>. 2) São alternativas excludentes? <b>Some</b>. 3) A <b>ordem importa</b>? Sim: arranjo (ou permutação, se usa todos). Não: <b>combinação</b>. 4) Há repetidos? Divida por k!. Na dúvida, liste um caso pequeno e veja se trocar a ordem gera outro resultado.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Decisão'),X.box('a',40,60,300,60,'Etapas sucessivas: "e"','a','multiplica'),X.box('b',380,60,300,60,'Alternativas: "ou"','a','soma'),
  X.box('c',40,150,300,60,'Ordem importa','n','arranjo ou permutação'),X.box('d',380,150,300,60,'Ordem não importa','n','combinação'),X.box('e',40,240,640,56,'Elementos repetidos: divida por k! de cada repetição','m')]}}
];
K.explain({w:720,h:350,steps:S,alt:'Animação das técnicas de contagem: princípios multiplicativo e aditivo, permutação, arranjo, combinação e anagramas'});
})();
