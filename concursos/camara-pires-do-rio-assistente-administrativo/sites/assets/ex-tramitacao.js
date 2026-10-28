(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Protocolo','Processo','Operações','Arquivo'],subs=['registrar','autuar e tramitar','juntar e retirar','guardar ou eliminar'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'Um requerimento chega ao balcão',text:'<p>Na Câmara <b>fictícia</b> de Vila Nova, um servidor entrega um <b>requerimento</b> pedindo autorização para um curso de capacitação. O papel chega solto, sem capa e sem número: é um <b>documento avulso</b>. Vamos acompanhar o caminho dele, do balcão ao arquivo.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: o balcão do protocolo'));
  N.push(X.box('c1',34,126,170,52,'Servidor','n','entrega o requerimento'));
  N.push(X.box('c2',270,126,170,52,'Protocolo','a','recebe o documento'));
  N.push(X.box('c3',500,126,170,52,'Documento avulso','n','sem capa, sem número'));
  N.push(X.line('cl1',204,152,270,152,'',true));N.push(X.line('cl2',440,152,500,152,'a',true));
  N.push(X.text('t0',34,250,'Cada passo acende uma etapa do caminho: protocolo, processo, operações e arquivo.','t'));return N}},
{label:'1. Protocolo',title:'O protocolo faz seis coisas',text:'<p>O protocolo <b>recebe</b> o documento e confere o destino e os anexos; <b>classifica</b> por assunto, pelo código do órgão; <b>registra</b> os dados e gera o número (<b>NUP</b>); <b>distribui</b> ao setor; <b>controla a tramitação</b> (quem enviou, quem recebeu, quando); e <b>expede</b> o que sai do órgão. Registrar não é o mesmo que distribuir.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('As atividades do protocolo'));
  var a=['Receber','Classificar','Registrar','Distribuir','Controlar','Expedir'],i;
  for(i=0;i<6;i++){N.push(X.box('p'+i,24+i*112,140,104,52,a[i],i===2?'a':'n',i===2?'gera o NUP':''));}
  for(i=0;i<5;i++){N.push(X.line('pl'+i,128+i*112,166,136+i*112,166,i===1?'a':'',true));}
  N.push(X.text('t1',40,250,'Receber, classificar, registrar, distribuir, controlar, expedir.\nO número identifica o documento em toda a tramitação.','t'));return N}},
{label:'2. Autuação',title:'Autuar: o avulso vira processo',text:'<p>Como o pedido exige <b>análise e decisão</b> da autoridade, o protocolo faz a <b>autuação</b>: reúne o documento em uma <b>capa</b> e forma o <b>processo</b>, com número único e folhas numeradas em ordem. O requerimento vira a <b>folha 1</b>. Nem todo documento é autuado: um simples aviso, não.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Autuação'));
  N.push(X.box('a1',40,130,180,60,'Documento avulso','n','requerimento'));
  N.push(X.box('a2',300,116,180,88,'Capa do processo','a','número único\nassunto, interessado'));
  N.push(X.box('a3',540,130,130,60,'Folha 1','n','requerimento'));
  N.push(X.line('al1',220,160,300,160,'a',true));N.push(X.line('al2',480,160,540,160,'',true));
  N.push(X.text('t2',40,240,'Autuar: avulso + capa + número + folhas numeradas = processo.','t'));return N}},
{label:'3. Tramitação',title:'Tramitar: despacho e folhas numeradas',text:'<p>O processo passa de setor em setor: Gabinete, Jurídico e Gestão de Pessoas. A cada passagem, a autoridade lança um <b>despacho</b> (informativo ou decisório) e a nova folha recebe o <b>número seguinte</b>, sem repetir nem saltar. Cada <b>volume</b> comporta, no máximo, 200 folhas. Cada envio e recebimento é registrado no controle da tramitação.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('O processo anda pelos setores'));
  N.push(X.box('m1',34,126,150,56,'Gabinete','n','folha 2: despacho'));
  N.push(X.box('m2',214,126,150,56,'Jurídico','a','folha 3: parecer'));
  N.push(X.box('m3',394,126,150,56,'Gestão de Pessoas','n','folha 4: informação'));
  N.push(X.box('m4',574,126,100,56,'Gabinete','n','decisão'));
  N.push(X.line('ml1',184,154,214,154,'',true));N.push(X.line('ml2',364,154,394,154,'a',true));N.push(X.line('ml3',544,154,574,154,'',true));
  N.push(X.text('t3',34,230,'Folhas em ordem: 1, 2, 3, 4... Volume cheio (200 folhas): abre-se o volume 2.\nO controle da tramitação mostra onde o processo está.','t'));return N}},
{label:'4. Juntada',title:'Juntar: anexação e apensação',text:'<p>O Jurídico pede a <b>certidão</b> do curso, e ela é incluída no processo: <b>anexação</b>, união <b>definitiva</b>. Depois, a unidade nota que há outro processo, de outro servidor, sobre o mesmo curso. Para decidirem juntos, os dois ficam <b>apensados</b>, união <b>temporária</b>: cada um mantém a sua identidade e, depois da decisão, podem ser separados (<b>desapensação</b>).</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Duas formas de juntada'));
  N.push(X.box('j1',34,120,200,56,'Processo principal','a','curso de capacitação'));
  N.push(X.box('j2',34,200,200,56,'Certidão do curso','n','documento a incluir'));
  N.push(X.line('jl1',134,200,134,176,'a',true));
  N.push(X.text('j3',250,214,'ANEXAÇÃO: definitiva','t'));
  N.push(X.box('j4',470,120,200,56,'Outro processo','n','mesmo curso, outro servidor'));
  N.push(X.line('jl2',470,148,234,148,'',true));
  N.push(X.text('j5',470,214,'APENSAÇÃO: temporária\ne cada um mantém a identidade','t'));return N}},
{label:'5. Retirar e arquivar',title:'Retirar folhas e arquivar',text:'<p>Se uma folha entrou por engano, o <b>desentranhamento</b> a retira de vez, com justificativa e despacho. Se um conjunto de folhas deve formar outro processo, é o <b>desmembramento</b>. Decidido o pedido, o processo é <b>arquivado</b> por despacho: a tramitação acabou. Se for preciso retomar a ação, há o <b>desarquivamento</b>. Mera cópia para consulta é <b>empréstimo</b>, que não retoma nada.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Retirar, decidir e guardar'));
  N.push(X.box('r1',34,118,190,52,'Desentranhamento','n','retira folha, com despacho'));
  N.push(X.box('r2',34,186,190,52,'Desmembramento','n','folhas formam novo processo'));
  N.push(X.box('r3',290,150,170,56,'Decisão','a','pedido deferido'));
  N.push(X.box('r4',520,150,150,56,'Arquivamento','a','por despacho'));
  N.push(X.line('rl1',224,144,290,170,'',true));N.push(X.line('rl2',224,212,290,190,'',true));N.push(X.line('rl3',460,178,520,178,'a',true));
  N.push(X.text('t5',290,250,'Desarquivar retoma a ação. Empréstimo apenas cede para consulta.','t'));return N}},
{label:'6. Idades e fim',title:'O arquivo: três idades e a eliminação',text:'<p>Arquivado, o processo está no <b>arquivo corrente</b>. Cumprido o prazo da <b>tabela de temporalidade</b>, ele é <b>transferido</b> ao <b>intermediário</b> e, por fim, ou <b>recolhido</b> ao <b>permanente</b> (valor histórico) ou <b>eliminado</b>. A eliminação segue um roteiro: a <b>CPAD</b> avalia, o titular aprova a listagem, a <b>instituição arquivística pública autoriza</b>, publica-se o edital, elimina-se e lavra-se o termo.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Três idades'));
  N.push(X.box('z1',34,126,170,56,'Corrente','n','uso frequente'));
  N.push(X.box('z2',270,126,170,56,'Intermediário','n','uso pouco frequente'));
  N.push(X.box('z3',510,100,170,52,'Permanente','a','guarda definitiva'));
  N.push(X.box('z4',510,176,170,52,'Eliminação','m','autorizada'));
  N.push(X.line('zl1',204,154,270,154,'a',true));N.push(X.line('zl2',440,146,510,126,'',true));N.push(X.line('zl3',440,162,510,202,'',true));
  N.push(X.text('t6',34,260,'Transferência: corrente > intermediário. Recolhimento: intermediário > permanente.\nQuem autoriza a eliminação: a instituição arquivística pública.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que acompanha um requerimento numa Câmara fictícia: recebimento e registro no protocolo, autuação, tramitação com despachos e folhas numeradas, juntada por anexação e apensação, desentranhamento, arquivamento, três idades e eliminação'});
})();
