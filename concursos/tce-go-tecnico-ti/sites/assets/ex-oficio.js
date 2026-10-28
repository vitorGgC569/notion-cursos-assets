(function(){
var K=window.K,X=K.X;
function doc(hi){var parts=[['cabeçalho',22],['identificação',54],['local e data',86],['endereçamento',118],['assunto',158],['vocativo',190],['texto',222],['fecho',262],['assinatura',294]];
 var N=[X.box('pg',200,6,320,312,'','n')];
 parts.forEach(function(p,i){N.push(X.box('p'+i,214,p[1]-8,292,22,p[0],hi===i?'a':'m'))});return N}
var S=[
{label:'0. Padrão ofício',title:'Um só formato para ofício, aviso e memorando',text:'<p>Pelo Manual de Redação da Presidência (3ª edição, 2018), ofício, aviso e memorando seguem o <b>padrão ofício</b>. A primeira página traz: cabeçalho, identificação, local e data, endereçamento, assunto, vocativo, texto, fecho e assinatura.</p>',scene:function(){return doc(-1)}},
{label:'1. Identificação',title:'Identificação do expediente',text:'<p>Nome do tipo em maiúsculas, <b>Nº</b>, número, ano e siglas do setor, da menor para a maior hierarquia, separados por barra, alinhada à esquerda. Exemplo: <code>OFÍCIO Nº 652/2018/SAA/SE/MT</code>.</p>',scene:function(){return doc(1)}},
{label:'2. Local e data',title:'Local e data: à direita, com ponto final',text:'<p>Cidade, vírgula, <b>sem sigla da UF</b>, dia sem zero à esquerda (ordinal só no dia 1º), mês com inicial minúscula e ponto final: <code>Brasília, 2 de fevereiro de 2018.</code></p>',scene:function(){return doc(2)}},
{label:'3. Endereçamento',title:'Endereçamento e vocativo',text:'<p>Endereçamento: <b>A Sua Excelência o Senhor</b> (Vossa Excelência) ou <b>Ao Senhor</b> (Vossa Senhoria), seguido de nome, cargo e endereço. Vocativo sempre com vírgula: <b>Senhor Ministro,</b>. <b>Excelentíssimo Senhor</b> só para Chefes de Poder. Abolidos: <i>Digníssimo (DD)</i> e <i>Ilustríssimo (Ilmo.)</i>.</p>',scene:function(){return doc(3)}},
{label:'4. Assunto',title:'Assunto: em negrito, sem verbo, com ponto final',text:'<p><b>Assunto:</b> em negrito, inicial maiúscula, curto (4 a 5 palavras), sem verbo, terminado em ponto final. Exemplo: <i>Assunto: Solicitação de informações.</i></p>',scene:function(){return doc(4)}},
{label:'5. Texto',title:'Texto: introdução, desenvolvimento e conclusão',text:'<p>Introdução apresenta o assunto (evite <i>Tenho a honra de</i> e <i>Cumpre-me informar que</i>; prefira <i>Informo</i>, <i>Solicito</i>, <i>Comunico</i>). Desenvolvimento explica as razões. Conclusão traz a providência esperada. Os atributos do Manual: clareza e precisão, objetividade, concisão, coesão e coerência, impessoalidade, formalidade e padronização, norma padrão.</p>',scene:function(){return doc(6)}},
{label:'6. Fecho',title:'Fecho: só dois, sem numeração',text:'<p><b>Respeitosamente,</b> para autoridade de hierarquia superior (inclusive o Presidente da República). <b>Atenciosamente,</b> para mesma hierarquia, inferior e demais casos. Não há outros fechos: o Manual aboliu os quinze modelos antigos. Fica alinhado à margem esquerda e não é numerado.</p>',scene:function(){return doc(7)}},
{label:'7. Assinatura',title:'Assinatura: nome em maiúsculas e cargo',text:'<p>Nome em <b>maiúsculas, sem negrito</b>, e cargo com iniciais maiúsculas (preposições em minúscula), <b>centralizados</b>, sem linha acima do nome. Recomenda-se não deixar a assinatura em página isolada.</p>',scene:function(){return doc(8)}}
];
K.explain({w:720,h:330,steps:S,alt:'Animação das partes do padrão ofício'});
})();
