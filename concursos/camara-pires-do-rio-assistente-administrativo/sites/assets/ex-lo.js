(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Reunião','Mesa','Vereador','Quórum','Contas'],subs=['arts. 58 a 61','arts. 62 a 68','arts. 75 a 82','arts. 83 e 84','arts. 101 a 107'],N=[],i;
  for(i=0;i<5;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*139,14,130,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'Uma Câmara fictícia começa a legislatura',text:'<p>A <b>Câmara Municipal de Vila Exemplo</b>, que é <b>fictícia</b>, vai começar uma legislatura. O caminho passa por cinco perguntas: quando a Câmara <b>se reúne</b>? Como se forma a <b>Mesa</b>? Quais são as regras do <b>Vereador</b>? Que <b>quórum</b> cada votação exige? Quem <b>fiscaliza as contas</b>?</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: da posse à fiscalização'));
  N.push(X.box('c1',34,126,170,52,'Posse','n','Vereadores e Mesa'));
  N.push(X.box('c2',270,126,170,52,'Votações','a','quórum de cada matéria'));
  N.push(X.box('c3',500,126,170,52,'Contas','d','controle externo'));
  N.push(X.line('cl1',204,152,270,152,'',true));N.push(X.line('cl2',440,152,500,152,'',true));
  N.push(X.text('t0',34,250,'Cada passo acende um bloco: reunião, Mesa, Vereador, quórum e contas.','t'));return N}},
{label:'1. Reunião',title:'Legislatura, sessão legislativa e recesso',text:'<p>A <b>legislatura</b> dura <b>quatro anos</b>, a partir de <b>1º de janeiro</b> do ano seguinte ao da eleição, e cada ano é uma <b>sessão legislativa</b> (art. 58, § 1º). Pela <b>EC 51/2024</b>, a Câmara se reúne de <b>2 de fevereiro a 30 de junho</b> e de <b>1º de agosto a 15 de dezembro</b> (art. 59). Se a data cair em sábado, domingo ou feriado, a reunião passa ao <b>primeiro dia útil seguinte</b>.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Arts. 58 e 59'));
  N.push(X.box('a1',34,120,200,52,'Legislatura','a','4 anos, a partir de 1º/1'));
  N.push(X.box('a2',254,120,200,52,'1º período','d','2/2 a 30/6'));
  N.push(X.box('a3',474,120,196,52,'2º período','d','1º/8 a 15/12'));
  N.push(X.box('a4',254,190,200,48,'Recesso','m','entre os períodos'));
  N.push(X.line('al1',234,146,254,146,'',true));N.push(X.line('al2',454,146,474,146,'',true));
  N.push(X.text('t1',34,268,'O texto-base dizia 15 de fevereiro; a EC 51/2024 mudou para 2 de fevereiro.','t'));
  N.push(X.text('t1b',34,292,'Sessões preparatórias: a partir de 1º de janeiro do primeiro ano da legislatura.','t'));return N}},
{label:'2. Mesa',title:'Quem dirige a Câmara: a Mesa Diretora',text:'<p>Pela <b>EC 16/2004</b>, a Mesa tem <b>Presidente, Vice-Presidente, 1º e 2º Secretários</b>, que se substituem nessa ordem. O mandato é de <b>dois anos</b>, e a <b>EC 29/2013</b> veda a <b>recondução</b> para o mesmo cargo na eleição seguinte. A eleição do <b>segundo biênio</b> é feita até a <b>última sessão ordinária do segundo ano</b> (art. 63, EC 40/2014), com posse em <b>1º de janeiro</b>. Sem nenhum membro da Mesa, preside o <b>Vereador mais idoso</b> presente.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Arts. 62 a 68'));
  N.push(X.box('m1',34,120,200,52,'Composição','a','Presidente, Vice, 1º e 2º Sec.'));
  N.push(X.box('m2',254,120,200,52,'Mandato','d','2 anos'));
  N.push(X.box('m3',474,120,196,52,'Recondução','n','vedada ao mesmo cargo'));
  N.push(X.box('m4',34,196,200,52,'2º biênio','n','até a última sessão do 2º ano'));
  N.push(X.box('m5',254,196,200,52,'Vaga','n','1ª sessão ordinária seguinte'));
  N.push(X.box('m6',474,196,196,52,'Sem Mesa','m','preside o mais idoso'));
  N.push(X.text('t2',34,290,'Decisão da Mesa: sempre por maioria de seus membros (art. 67, parágrafo único).','t'));return N}},
{label:'3. Vereador',title:'Prerrogativas e proibições',text:'<p>O Vereador é <b>inviolável</b> por opiniões, palavras e votos <b>no exercício do mandato e na circunscrição do Município</b> (art. 75, EC 33/2013). A partir do <b>diploma</b>, não pode firmar contrato com o poder público (salvo <b>cláusulas uniformes</b>). A partir da <b>posse</b>, não pode patrocinar causa em que o poder público seja interessado nem ser titular de <b>mais de um cargo ou mandato eletivo</b> (art. 76). Pode ser <b>Secretário municipal</b>, se licenciado.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Arts. 75 e 76'));
  N.push(X.box('v1',34,120,200,52,'Inviolabilidade','a','mandato e Município'));
  N.push(X.box('v2',254,120,200,52,'Desde o diploma','d','contrato: só cláusulas uniformes'));
  N.push(X.box('v3',474,120,196,52,'Desde a posse','d','sem patrocinar causa'));
  N.push(X.box('v4',254,196,200,52,'Exceção','m','Secretário, se licenciado'));
  N.push(X.line('vl1',234,146,254,146,'',true));N.push(X.line('vl2',454,146,474,146,'',true));
  N.push(X.text('t3',34,290,'A EC 16/2004 revogou os §§ 1º a 6º do art. 75 (imunidade processual do texto-base).','t'));return N}},
{label:'4. Perda',title:'Perda, extinção, licença e suplente',text:'<p>Perde o mandato quem <b>infringe as proibições</b> ou age com <b>quebra de decoro</b>: decide o <b>Plenário</b>, por <b>dois terços</b>, em votação secreta e com <b>ampla defesa</b> (art. 77, § 3º). Quem falta a <b>um terço</b> das sessões ordinárias ou a <b>cinco</b> extraordinárias perde o mandato por <b>declaração da Mesa</b>. Renúncia e morte <b>extinguem</b> o mandato, declarado pelo <b>Presidente</b>. A licença para <b>interesse particular</b> é sem remuneração, até <b>120 dias</b> por sessão legislativa. Perda e extinção levam à convocação <b>definitiva</b> do suplente.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Arts. 77 a 81'));
  N.push(X.box('p1',34,120,200,52,'Proibição ou decoro','n','Plenário, 2/3, ampla defesa'));
  N.push(X.box('p2',254,120,200,52,'Faltas','n','declara a Mesa'));
  N.push(X.box('p3',474,120,196,52,'Renúncia ou morte','n','declara o Presidente'));
  N.push(X.box('p4',34,196,200,52,'Perda ou extinção','d','suplente definitivo'));
  N.push(X.box('p5',254,196,200,52,'Licença maior que 120 dias','a','suplente temporário'));
  N.push(X.text('t4',34,290,'Sem suplente: o Presidente avisa o TRE em 48 horas, se faltarem 15 meses ou mais.','t'));return N}},
{label:'5. Quórum',title:'Quanto vale cada votação',text:'<p>Regra geral: <b>maioria dos votos</b>, presente a <b>maioria absoluta</b> dos membros (art. 83). Exigem <b>dois terços</b>: emendas à Lei Orgânica, <b>rejeição do parecer prévio do TCM</b> e perda de mandato. Exigem <b>maioria absoluta</b>: rejeição de veto, leis complementares, vacância de Prefeito e Vice e permissão para posse fora do prazo. A sessão só é <b>aberta</b> com <b>um terço</b> dos membros (art. 74). A <b>CPI</b> nasce com <b>um terço</b>, e o recurso contra decisão de comissão exige <b>um quinto</b>.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Arts. 69, 74 e 83'));
  N.push(X.box('q1',34,120,200,52,'Maioria dos votos','n','presente a maioria absoluta'));
  N.push(X.box('q2',254,120,200,52,'Maioria absoluta','d','veto, lei complementar'));
  N.push(X.box('q3',474,120,196,52,'Dois terços','a','emenda, parecer do TCM'));
  N.push(X.box('q4',34,196,200,52,'Um terço','n','abrir sessão e criar CPI'));
  N.push(X.box('q5',254,196,200,52,'Um quinto','n','recurso ao Plenário'));
  N.push(X.line('ql1',234,146,254,146,'',true));N.push(X.line('ql2',454,146,474,146,'',true));
  N.push(X.text('t5',34,290,'Com treze Vereadores, a maioria absoluta é de sete votos.','t'));return N}},
{label:'6. Contas',title:'Fiscalização: Câmara e Tribunal de Contas',text:'<p>A fiscalização contábil, financeira, orçamentária, patrimonial e operacional é exercida pela <b>Câmara</b>, mediante <b>controle externo</b>, e pelo <b>controle interno</b> de cada Poder (art. 101). O controle externo conta com o <b>Tribunal de Contas dos Municípios</b> (art. 102). As contas <b>mensais</b> vão ao Tribunal em até <b>45 dias</b>, e as <b>anuais</b> em até <b>60 dias</b> após a abertura da sessão legislativa. O Tribunal emite o <b>parecer prévio</b> em <b>60 dias</b>, e só <b>dois terços</b> da Câmara o afastam. A Câmara não julga as contas antes do parecer e do exame dos <b>contribuintes</b>.</p>',
 scene:function(){var N=top(4,[0,1,2,3]);N=N.concat(scn('Arts. 101 a 107'));
  N.push(X.box('k1',34,120,200,52,'Contas mensais','n','45 dias do mês'));
  N.push(X.box('k2',254,120,200,52,'Contas anuais','n','60 dias após a sessão'));
  N.push(X.box('k3',474,120,196,52,'Parecer do TCM','a','60 dias, prévio'));
  N.push(X.line('kl1',234,146,254,146,'',true));N.push(X.line('kl2',454,146,474,146,'',true));
  N.push(X.box('k4',254,196,200,52,'Julgamento','d','Câmara, depois do parecer'));
  N.push(X.box('k5',474,196,196,52,'Afastar o parecer','d','dois terços'));
  N.push(X.line('kl3',454,222,474,222,'',true));
  N.push(X.text('t6',34,290,'Denúncia ao TCM: qualquer cidadão, partido, associação ou sindicato (art. 106).','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que acompanha uma Câmara Municipal fictícia: períodos de reunião, Mesa Diretora, prerrogativas e perda do mandato do Vereador, quórum de cada votação e fiscalização das contas com o Tribunal de Contas dos Municípios'});
})();
