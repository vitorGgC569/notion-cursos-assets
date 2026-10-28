(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Sujeito','Nome','Verbo','Crase'],subs=['concordância verbal','concordância nominal','regência verbal','teste do masculino'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'O rascunho de um ofício fictício',text:'<p>A <b>Câmara Municipal de Vila Exemplo</b>, que é <b>fictícia</b>, tem um rascunho de ofício com seis deslizes de gramática. Antes de assinar, a assessoria revisa frase por frase. Cada passo mostra o erro, a regra e a forma correta: <b>concordância verbal</b>, <b>concordância nominal</b>, <b>regência</b> e <b>crase</b>.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: a revisão do rascunho'));
  N.push(X.box('c1',34,126,170,52,'Rascunho','n','frases com deslizes'));
  N.push(X.box('c2',270,126,170,52,'Revisão','a','regra por regra'));
  N.push(X.box('c3',500,126,170,52,'Ofício','d','pronto para assinar'));
  N.push(X.line('cl1',204,152,270,152,'',true));N.push(X.line('cl2',440,152,500,152,'a',true));
  N.push(X.text('t0',34,250,'Cada passo acende um bloco: sujeito, nome, verbo e crase.','t'));return N}},
{label:'1. Núcleo',title:'Núcleo do sujeito: o verbo concorda com ele',text:'<p>O rascunho diz: <b>"O conjunto das propostas apresentadas pelos vereadores foram aprovadas"</b>. O verbo foi para o plural porque o termo mais próximo é plural. Mas o <b>núcleo do sujeito</b> é <b>conjunto</b>, no singular. "Das propostas" é adjunto e não manda no verbo. Forma correta: <b>"foi aprovado"</b>.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Sujeito simples: ache o núcleo'));
  N.push(X.box('n1',34,120,170,52,'O conjunto','a','núcleo: singular'));
  N.push(X.box('n2',224,120,210,52,'das propostas...','m','adjunto: não manda'));
  N.push(X.box('n3',454,120,216,52,'foi aprovado','d','verbo no singular'));
  N.push(X.text('t1',34,226,'Errado: "foram aprovadas". Certo: "O conjunto ... foi aprovado".','t'));
  N.push(X.text('t1b',34,252,'Risque o que vem depois da preposição e conte só com o núcleo.','t'));return N}},
{label:'2. Impessoal',title:'Haver e fazer: sem sujeito, no singular',text:'<p>Outra frase: <b>"Haviam dúvidas sobre o prazo"</b>. Aqui "haver" tem o sentido de <b>existir</b>, e então é <b>impessoal</b>: não tem sujeito e fica no singular. Forma correta: <b>"Havia dúvidas sobre o prazo"</b>. O mesmo vale para <b>fazer</b> indicando tempo: <b>"Faz dois anos"</b>.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Verbos impessoais'));
  N.push(X.box('i1',34,120,200,52,'Haviam','m','errado: o verbo não varia'));
  N.push(X.box('i2',254,120,200,52,'Havia','d','existir: singular'));
  N.push(X.box('i3',474,120,196,52,'Faz dois anos','n','tempo: singular'));
  N.push(X.text('t2',34,226,'"Dúvidas" é objeto direto, e não sujeito.','t'));
  N.push(X.text('t2b',34,252,'Com locução verbal, o auxiliar acompanha: "Deve haver vagas".','t'));return N}},
{label:'3. O se',title:'O se: apassivador ou indeterminação',text:'<p>O rascunho traz <b>"Aluga-se salas para a audiência"</b>. O verbo "alugar" é transitivo direto, então o <b>se</b> é <b>apassivador</b> e "salas" é o sujeito: <b>"Alugam-se salas"</b>. Já com verbo que pede preposição, como <b>"Precisa-se de servidores"</b>, o <b>se</b> indetermina o sujeito e o verbo fica no singular.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Os dois valores do se'));
  N.push(X.box('s1',34,120,300,56,'Alugam-se salas','d','se apassivador: o verbo concorda'));
  N.push(X.box('s2',370,120,300,56,'Precisa-se de servidores','n','indeterminação: singular'));
  N.push(X.text('t3',34,226,'Errado: "Aluga-se salas". Certo: "Alugam-se salas".','t'));
  N.push(X.text('t3b',34,252,'Teste: passe para a voz passiva. "Salas são alugadas" confirma o apassivador.','t'));return N}},
{label:'4. Nome',title:'Concordância nominal: anexo e meio',text:'<p>Agora o <b>nome</b>. O rascunho diz <b>"Seguem anexo as cópias"</b>. <b>Anexo</b> é adjetivo e concorda com o substantivo: <b>"Seguem anexas as cópias"</b>. A locução <b>em anexo</b> é invariável. Já <b>meio</b>, com sentido de "um pouco", é advérbio e não varia: <b>"meio cansadas"</b>.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Adjetivo concorda, advérbio não'));
  N.push(X.box('a1',34,120,200,52,'anexas','d','concorda com cópias'));
  N.push(X.box('a2',254,120,200,52,'em anexo','n','locução: invariável'));
  N.push(X.box('a3',474,120,196,52,'meio cansadas','n','advérbio: invariável'));
  N.push(X.text('t4',34,226,'Errado: "seguem anexo as cópias". Certo: "seguem anexas as cópias".','t'));
  N.push(X.text('t4b',34,252,'Também variam: incluso, obrigado, mesmo, próprio.','t'));return N}},
{label:'5. Regência',title:'Regência: a preposição que o verbo pede',text:'<p>Outra frase: <b>"O cargo que o servidor aspira exige nível médio"</b>. No sentido de <b>pretender</b>, "aspirar" pede <b>a</b>: "aspira ao cargo". Ao relativizar, a preposição vem antes do relativo: <b>"O cargo a que o servidor aspira"</b>. Sem o a, "aspirar" significa respirar: "aspirou o ar".</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Regência e relativo'));
  N.push(X.box('r1',34,120,200,52,'aspira ao cargo','a','pretender: pede a'));
  N.push(X.box('r2',254,120,200,52,'a que','d','preposição antes do que'));
  N.push(X.box('r3',474,120,196,52,'aspirou o ar','m','sem a: respirar'));
  N.push(X.text('t5',34,226,'Errado: "o cargo que o servidor aspira". Certo: "o cargo a que o servidor aspira".','t'));
  N.push(X.text('t5b',34,252,'Desmonte: "O servidor aspira ao cargo" mostra a preposição.','t'));return N}},
{label:'6. Crase',title:'Crase: o teste do masculino',text:'<p>Por fim: <b>"O processo será entregue a Secretaria"</b>. "Entregue" pede <b>a</b>, e "Secretaria" é feminina e aceita o artigo <b>a</b>. Teste: troque por uma palavra masculina. <b>"Entregue ao Gabinete"</b> mostra o <b>ao</b>, então há crase: <b>"entregue à Secretaria"</b>. A locução <b>a partir de</b> nunca leva crase.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Crase: a + a'));
  N.push(X.box('k1',34,120,200,52,'entregue ao Gabinete','n','teste: aparece ao'));
  N.push(X.box('k2',254,120,200,52,'entregue à Secretaria','d','há crase'));
  N.push(X.box('k3',474,120,196,52,'a partir de','m','nunca leva crase'));
  N.push(X.line('kl1',234,146,254,146,'a',true));
  N.push(X.text('t6',34,226,'Errado: "entregue a Secretaria". Certo: "entregue à Secretaria".','t'));
  N.push(X.text('t6b',34,252,'Antes de verbo, masculino e pronome de tratamento: sem crase.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que revisa um rascunho de ofício de uma Câmara fictícia, frase por frase: núcleo do sujeito, verbos impessoais, o se, concordância nominal com anexo e meio, regência do verbo aspirar e crase pelo teste do masculino'});
})();
