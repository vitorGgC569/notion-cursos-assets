(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Identificação','Destinatário','Texto','Fecho'],subs=['epígrafe e data','endereço e vocativo','corpo do ofício','fecho e assinatura'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'Um ofício de uma Câmara fictícia',text:'<p>A <b>Câmara Municipal de Vila Exemplo</b>, que é <b>fictícia</b>, precisa do auditório da Prefeitura para uma audiência pública. Para pedir, ela escreve um <b>ofício</b>. No padrão ofício, tanto o Manual da Presidência quanto o de Goiás pedem as mesmas peças, em ordem. Vamos montar o documento parte por parte.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: quem escreve e para quem'));
  N.push(X.box('c1',34,126,170,52,'Câmara','n','Presidente da Câmara'));
  N.push(X.box('c2',270,126,170,52,'Ofício','a','pede a cessão do auditório'));
  N.push(X.box('c3',500,126,170,52,'Prefeitura','n','Prefeito Municipal'));
  N.push(X.line('cl1',204,152,270,152,'',true));N.push(X.line('cl2',440,152,500,152,'a',true));
  N.push(X.text('t0',34,250,'Cada passo acende um bloco do ofício: identificação, destinatário, texto e fecho.','t'));return N}},
{label:'1. Epígrafe',title:'A epígrafe: espécie, número, ano e siglas',text:'<p>A <b>epígrafe</b> do ofício traz a <b>espécie</b> do documento, o <b>número</b>, o <b>ano</b> e as <b>siglas</b> do setor e do órgão. No manual da Presidência, o exemplo vem com as siglas da <b>menor</b> para a <b>maior</b> hierarquia. Aqui: <b>OFÍCIO Nº 14/2026/SA/CMVE</b>, em que SA é a Secretaria Administrativa e CMVE, a Câmara. O cabeçalho, com o nome do órgão, aparece só na primeira página.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('A epígrafe'));
  N.push(X.box('e1',34,120,130,52,'OFÍCIO','a','a espécie'));
  N.push(X.box('e2',184,120,100,52,'Nº 14','n','o número'));
  N.push(X.box('e3',304,120,100,52,'/2026','n','o ano'));
  N.push(X.box('e4',424,120,110,52,'/SA','n','o setor'));
  N.push(X.box('e5',554,120,116,52,'/CMVE','n','o órgão'));
  N.push(X.text('t1',34,226,'OFÍCIO Nº 14/2026/SA/CMVE','t'));
  N.push(X.text('t1b',34,252,'As siglas vão da menor para a maior hierarquia, como no exemplo do manual.','t'));return N}},
{label:'2. Local e data',title:'Local e data: sem a sigla do estado',text:'<p>Logo abaixo vêm o <b>local</b> e a <b>data</b> de emissão: <b>Vila Exemplo, 3 de fevereiro de 2026.</b> A cidade não leva a sigla do estado, o mês vai por extenso e o primeiro dia do mês se escreve <b>1º</b>. O local e a data são parte da identificação do documento.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Local e data'));
  N.push(X.box('l1',34,126,200,52,'Vila Exemplo','a','cidade, sem sigla do estado'));
  N.push(X.box('l2',274,126,200,52,'3 de fevereiro','n','mês por extenso'));
  N.push(X.box('l3',514,126,156,52,'de 2026.','n','ano e ponto final'));
  N.push(X.text('t2',34,226,'Vila Exemplo, 3 de fevereiro de 2026.','t'));
  N.push(X.text('t2b',34,252,'No dia 1º do mês, escreve-se 1º, e não 1.','t'));return N}},
{label:'3. Endereçamento',title:'Endereçamento e vocativo',text:'<p>O <b>endereçamento</b> dá o destinatário. Para o Prefeito, que recebe <b>Vossa Excelência</b>, escreve-se <b>A Sua Excelência o Senhor</b>, o nome, o cargo e o endereço. Já o <b>vocativo</b> é <b>Senhor Prefeito,</b> com vírgula. O vocativo <b>Excelentíssimo Senhor</b> fica para os chefes dos Poderes federais, e não para o Prefeito.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Endereçamento e vocativo'));
  N.push(X.box('d1',34,116,310,76,'A Sua Excelência o Senhor','a','Fulano de Tal\nPrefeito Municipal de Vila Exemplo'));
  N.push(X.box('d2',384,116,286,76,'Senhor Prefeito,','n','vocativo, com vírgula'));
  N.push(X.text('t3',34,232,'Vossa Excelência: endereçamento "A Sua Excelência o Senhor".','t'));
  N.push(X.text('t3b',34,256,'Vossa Senhoria: endereçamento "Ao Senhor".','t'));return N}},
{label:'4. Assunto',title:'O assunto: frase nominal',text:'<p>O <b>assunto</b> resume o teor do ofício em uma <b>frase nominal</b>, isto é, <b>sem verbo</b>, e curta. O manual da Presidência sugere de quatro a cinco palavras; o de Goiás, em torno de cinco. Aqui: <b>Assunto: Solicitação de cessão de auditório.</b> Escrever "Solicita o auditório" seria um erro, porque há verbo.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('O assunto'));
  N.push(X.box('s1',34,120,636,56,'Assunto: Solicitação de cessão de auditório.','a','frase nominal, sem verbo'));
  N.push(X.box('s2',34,200,290,52,'Certo','d','Solicitação de cessão de auditório.'));
  N.push(X.box('s3',380,200,290,52,'Errado','m','Solicito o auditório (tem verbo)'));return N}},
{label:'5. Texto',title:'O texto: três partes, parágrafos numerados',text:'<p>O corpo do ofício tem <b>introdução</b> (o que se pede), <b>desenvolvimento</b> (os detalhes) e <b>conclusão</b> (o que se espera). Quando há mais de um parágrafo, eles são <b>numerados</b>; num texto de um só parágrafo, não se numera. No exemplo são três: pedido da cessão, tema e público da audiência e pedido de confirmação até 20 de fevereiro de 2026.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Corpo do ofício'));
  N.push(X.box('x1',34,116,636,48,'1. Introdução','a','Solicito a cessão do auditório para a audiência pública de 10 de março.'));
  N.push(X.box('x2',34,176,636,48,'2. Desenvolvimento','n','A audiência trata da revisão do Plano Diretor e reúne cerca de 120 pessoas.'));
  N.push(X.box('x3',34,236,636,48,'3. Conclusão','n','Peço a confirmação até 20 de fevereiro de 2026.'));
  N.push(X.text('t5',34,314,'Mais de um parágrafo: numerados. Um só parágrafo: sem número.','t'));return N}},
{label:'6. Fecho',title:'Fecho e signatário',text:'<p>Só existem <b>dois fechos</b>: <b>Respeitosamente,</b> para autoridade superior e <b>Atenciosamente,</b> para as demais. Aqui, a Câmara escreve a outro Poder, em posição equivalente, e o fecho é <b>Atenciosamente,</b>. Depois, o <b>signatário</b>: o <b>nome em maiúsculas</b>, sem negrito, e o <b>cargo</b> com iniciais maiúsculas, centralizados. Se o ofício passar de uma página, a numeração começa na segunda.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Fecho e assinatura'));
  N.push(X.box('g1',184,116,336,52,'Atenciosamente,','a','um dos dois fechos'));
  N.push(X.box('g2',184,190,336,70,'CICLANO DE TAL','n','Presidente da Câmara Municipal'));
  N.push(X.line('gl1',352,168,352,190,'a',true));
  N.push(X.text('t6',34,296,'Fechos: Respeitosamente (autoridade superior) e Atenciosamente (demais casos).','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que monta um ofício de uma Câmara fictícia, parte por parte: epígrafe, local e data, endereçamento e vocativo, assunto, texto em parágrafos numerados, fecho e signatário'});
})();
