(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Receber','Guardar','Controlar','Conferir'],subs=['nota x pedido','endereço','pedido na hora','contagem'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'O caminho de uma resma de papel',text:'<p>A Câmara <b>fictícia</b> de Vila Nova precisa de papel sulfite. O setor de compras faz o pedido, o fornecedor entrega e a resma passa por quatro momentos até o fim do ano: <b>receber, guardar, controlar e conferir</b>. Vamos acompanhar esse caminho.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: o pedido de papel'));
  N.push(X.box('c1',34,126,170,52,'Setor de compras','n','pede 100 resmas'));
  N.push(X.box('c2',270,126,170,52,'Fornecedor','n','entrega com nota fiscal'));
  N.push(X.box('c3',500,126,170,52,'Almoxarifado','a','recebe e guarda'));
  N.push(X.line('cl1',204,152,270,152,'',true));N.push(X.line('cl2',440,152,500,152,'a',true));
  N.push(X.text('t0',34,250,'Cada passo da história acende uma etapa da rotina de materiais.','t'));return N}},
{label:'1. Receber',title:'Receber: nota fiscal confere com o pedido',text:'<p>O responsável compara a <b>nota fiscal com o pedido</b>: item, quantidade, qualidade e prazo. Aqui chegaram 90 resmas em vez de 100. Há <b>divergência</b>, que é registrada e comunicada ao fornecedor. O recebimento <b>provisório</b> é sumário, e o <b>definitivo</b> exige servidor ou comissão designados e termo detalhado.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Conferência na entrada'));
  N.push(X.box('r1',34,116,190,58,'Pedido','n','100 resmas'));
  N.push(X.box('r2',34,196,190,58,'Nota fiscal','n','90 resmas'));
  N.push(X.box('r3',300,150,160,58,'Divergência','m','10 resmas a menos'));
  N.push(X.box('r4',520,150,150,58,'Registrar e avisar','a','o fornecedor'));
  N.push(X.line('rl1',224,145,300,170,'',true));N.push(X.line('rl2',224,225,300,190,'',true));N.push(X.line('rl3',460,179,520,179,'a',true));
  N.push(X.text('t1',300,260,'Termo detalhado, servidor ou comissão designados:\nrecebimento definitivo (Lei 14.133/2021, art. 140).','t'));return N}},
{label:'2. Guardar',title:'Guardar: cada material tem seu endereço',text:'<p>Aceitas as 90 resmas, elas vão para a <b>armazenagem</b>: um local identificado, de fácil acesso, protegido de umidade e sol, com os itens de maior giro perto da saída. Um bom <b>layout</b> poupa tempo e evita perda.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Dentro do almoxarifado'));
  N.push(X.box('g1',34,120,150,50,'Prateleira A1','a','papel sulfite\n(giro alto)'));
  N.push(X.box('g2',204,120,150,50,'Prateleira B2','n','toner e cartuchos'));
  N.push(X.box('g3',374,120,150,50,'Prateleira C3','n','material de limpeza'));
  N.push(X.box('g4',544,120,126,50,'Saída','m','balcão de entrega'));
  N.push(X.line('gl1',184,145,544,145,'a',true));
  N.push(X.text('t2',34,215,'Itens de maior giro perto da saída. Cada item no seu endereço.\nProduto químico longe de papel; nada encostado na parede ou no chão.','t'));return N}},
{label:'3. Controlar',title:'Controlar: quando fazer um novo pedido?',text:'<p>O consumo médio é de 20 resmas por semana, a entrega leva 2 semanas e o estoque de segurança é de 10. O <b>ponto de reposição</b> é 20 × 2 + 10 = <b>50 resmas</b>. Quando o saldo chegar a 50, é hora de pedir de novo, antes que o papel acabe.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Os níveis de estoque'));
  N.push(X.box('n1',34,116,200,48,'Máximo','n','110 resmas'));
  N.push(X.box('n2',34,174,200,48,'Ponto de reposição','a','50 resmas: pedir'));
  N.push(X.box('n3',34,232,200,48,'Estoque de segurança','m','10 resmas: reserva'));
  N.push(X.line('nl1',234,140,300,140,'',false));N.push(X.line('nl2',234,198,300,198,'a',true));N.push(X.line('nl3',234,256,300,256,'',false));
  N.push(X.text('t3',320,130,'PR = consumo médio x prazo de reposição\n      + estoque de segurança\n\nPR = 20 x 2 + 10 = 50','t'));return N}},
{label:'4. Fornecer',title:'Fornecer: o setor pede, o almoxarifado entrega',text:'<p>A secretaria pede 5 resmas por <b>requisição</b>. O almoxarifado entrega e dá <b>baixa</b> no estoque: o saldo registrado na ficha cai de 90 para 85. Tudo o que entra e sai é lançado, com data, quantidade e responsável. Saída sem registro faz o estoque "mentir".</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Requisição e saída'));
  N.push(X.box('f1',34,126,160,52,'Secretaria','n','requisição: 5 resmas'));
  N.push(X.box('f2',280,126,170,52,'Almoxarifado','a','entrega e registra'));
  N.push(X.box('f3',520,126,150,52,'Ficha de estoque','n','saldo 90 > 85'));
  N.push(X.line('fl1',194,152,280,152,'',true));N.push(X.line('fl2',450,152,520,152,'a',true));
  N.push(X.text('t4',34,250,'Entrada e saída sempre registradas: data, quantidade, saldo.','t'));return N}},
{label:'5. Inventário',title:'Conferir: o inventário compara o físico com o registro',text:'<p>No fim do ano, o <b>inventário</b> conta o que existe de fato e compara com o saldo registrado. A contagem achou 83 resmas, mas a ficha diz 85. Há uma <b>diferença</b>, que deve ser apurada e justificada antes de qualquer ajuste. Inventário também é feito para os bens permanentes, no patrimônio.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Contagem x registro'));
  N.push(X.box('i1',60,126,240,58,'Contagem física','n','83 resmas na prateleira'));
  N.push(X.box('i2',420,126,240,58,'Saldo da ficha','n','85 resmas no sistema'));
  N.push(X.box('i3',230,222,260,54,'Diferença: 2 resmas','m','apurar, justificar, ajustar'));
  N.push(X.line('il1',180,184,260,222,'',true));N.push(X.line('il2',540,184,460,222,'',true));
  return N}},
{label:'6. Fecho',title:'O roteiro que você leva para a prova',text:'<p>Quando a questão falar de materiais, pergunte em que ponto do caminho a situação está: <b>receber</b> (conferir nota, recebimento definitivo), <b>guardar</b> (armazenagem), <b>controlar</b> (níveis, ponto de reposição, curva ABC, PEPS) ou <b>conferir</b> (inventário, baixa). A banca cobrou esse tema em oito questões das duas provas analisadas.</p>',
 scene:function(){var N=top(-1,[0,1,2,3]);N=N.concat(scn('Quatro perguntas'));
  N.push(X.pill('q1',40,116,'Receber: a nota confere com o pedido? Quem faz o definitivo?','a',420));
  N.push(X.pill('q2',40,152,'Guardar: o item está no endereço certo?','n',320));
  N.push(X.pill('q3',40,188,'Controlar: o saldo chegou ao ponto de reposição?','n',390));
  N.push(X.pill('q4',40,224,'Conferir: a contagem bate com o registro?','n',330));
  N.push(X.text('t6',40,280,'Treine nos desafios e nos exercícios.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que acompanha o caminho de uma resma de papel numa Câmara fictícia: recebimento, armazenagem, controle de estoque com ponto de reposição, fornecimento ao setor e inventário'});
})();
