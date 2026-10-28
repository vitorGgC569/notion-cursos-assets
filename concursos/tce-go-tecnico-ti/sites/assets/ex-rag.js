(function(){
var K=window.K,X=K.X;
function off(hl){return [X.zone('zo',10,10,700,130,'Preparação (offline)'),
 X.box('d',24,45,110,60,'Documentos','n','normas, manuais'),X.line('a1',134,75,168,75,'',true),
 X.box('c',168,45,110,60,'Chunks','n','trechos'),X.line('a2',278,75,312,75,'',true),
 X.box('e',312,45,110,60,'Embeddings','n','vetores'),X.line('a3',422,75,456,75,'',true),
 X.box('v',456,45,140,60,'Índice vetorial','n','banco de vetores')]}
function on(){return [X.zone('zq',10,150,700,170,'Consulta (online)')]}
var S=[
{label:'0. Problema',title:'Por que RAG: o LLM não conhece os seus documentos',text:'<p>Um LLM só sabe o que viu no treinamento, que tem data de corte e não inclui os documentos internos. Sem lastro ele pode <b>alucinar</b>. O <b>RAG</b> (<i>retrieval-augmented generation</i>) busca trechos relevantes em uma base e os entrega ao modelo como contexto, sem retreiná-lo.</p>',
 scene:function(){return [X.box('u',40,60,150,60,'Pergunta','n'),X.line('l',190,90,280,90,'',true),X.box('m',280,60,160,60,'LLM sozinho','n','conhecimento congelado'),X.line('l2',440,90,520,90,'',true),X.box('r',520,60,160,60,'Resposta','m','pode alucinar')]}},
{label:'1. Chunks',title:'Preparação 1: dividir os documentos em trechos (chunks)',text:'<p>Os documentos são divididos em <b>chunks</b> de tamanho adequado (por exemplo, centenas de tokens), muitas vezes com <b>sobreposição</b> para não cortar uma ideia ao meio. Trechos muito grandes diluem o sentido; muito pequenos perdem contexto.</p>',
 scene:function(){return off().concat([X.box('c2',168,45,110,60,'Chunks','a','trechos')])}},
{label:'2. Embeddings',title:'Preparação 2: transformar em embeddings',text:'<p>Um <b>modelo de embeddings</b> converte cada trecho em um vetor numérico. Textos de sentido parecido ficam <b>próximos</b> no espaço vetorial, mesmo com palavras diferentes. A proximidade é medida, por exemplo, pela <b>similaridade do cosseno</b>.</p>',
 scene:function(){return off().concat([X.box('e2',312,45,110,60,'Embeddings','a','vetores')])}},
{label:'3. Índice',title:'Preparação 3: guardar no índice vetorial',text:'<p>Os vetores, com os textos e metadados (fonte, página, data), vão para um <b>índice vetorial</b> (banco de vetores) que faz busca aproximada por vizinhos mais próximos. Essa etapa é feita uma vez e atualizada quando os documentos mudam.</p>',
 scene:function(){return off().concat([X.box('v2',456,45,140,60,'Índice vetorial','a','banco de vetores')])}},
{label:'4. Busca',title:'Consulta 1 e 2: embedding da pergunta e busca por similaridade',text:'<p>A pergunta vira um vetor pelo <b>mesmo modelo de embeddings</b> e o índice devolve os <b>k trechos mais similares</b>. Combinar a busca vetorial com a busca por palavras-chave (<b>busca híbrida</b>) e reordenar os resultados (<i>reranking</i>) costuma melhorar a qualidade.</p>',
 scene:function(){return off().concat(on(),[X.box('q',24,190,110,60,'Pergunta','n'),X.line('b1',134,220,168,220,'',true),X.box('qe',168,190,120,60,'Embedding','a','da pergunta'),X.line('b2',288,220,322,220,'',true),X.box('bu',322,190,150,60,'Busca por similaridade','a','top k trechos')])}},
{label:'5. Prompt',title:'Consulta 3: montar o prompt com o contexto recuperado',text:'<p>Os trechos recuperados entram no <b>prompt</b> junto com a instrução (por exemplo: "responda só com base nos trechos e cite a fonte; se não houver resposta, diga que não sabe") e com a pergunta. É aqui que a <b>engenharia de prompt e de contexto</b> trabalha.</p>',
 scene:function(){return off().concat(on(),[X.box('bu',24,190,150,60,'Top k trechos','n'),X.line('b1',174,220,208,220,'',true),X.box('pr',208,175,200,90,'Prompt','a','instrução + trechos\n+ pergunta')])}},
{label:'6. Resposta',title:'Consulta 4: o LLM gera a resposta com citação',text:'<p>O modelo redige a resposta <b>fundamentada nos trechos</b> e pode citar as fontes, o que permite conferir. O RAG reduz alucinações e atualiza o conhecimento sem retreinar, mas não as elimina: depende da qualidade da busca e dos documentos. Em dados pessoais, vale a <b>LGPD</b> também sobre a base indexada.</p>',
 scene:function(){return off().concat(on(),[X.box('pr',24,185,150,70,'Prompt','n','instrução + trechos'),X.line('b1',174,220,238,220,'',true),X.box('llm',238,185,130,70,'LLM','a'),X.line('b2',368,220,432,220,'',true),X.box('re',432,175,240,90,'Resposta com fontes','a','conferível pelo usuário')])}}
];
K.explain({w:720,h:330,steps:S,alt:'Animação do fluxo de RAG: chunks, embeddings, índice vetorial, busca, prompt e resposta'});
})();
