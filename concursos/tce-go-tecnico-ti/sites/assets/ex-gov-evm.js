(function(){
var K=window.K,X=K.X;
var S=[
{label:'0. Dados',title:'Valor agregado: três linhas e um orçamento',text:'<p>BAC (orçamento no término) R$ 500.000; PV (valor planejado) R$ 270.000; EV (valor agregado) R$ 213.000; AC (custo real) R$ 255.000. São os dados do laboratório L1.</p>',
 scene:function(){return [X.box('pv',16,40,150,56,'PV 270.000','n','planejado'),X.box('ev',186,40,150,56,'EV 213.000','a','agregado'),X.box('ac',356,40,150,56,'AC 255.000','m','real'),X.box('bac',526,40,170,56,'BAC 500.000','d','orçamento')]}},
{label:'1. CPI e SPI',title:'CPI = EV/AC e SPI = EV/PV',text:'<p>CPI = 213.000/255.000 = <b>0,8353</b>: cada real gasto gerou R$ 0,84 de valor. SPI = 213.000/270.000 = <b>0,7889</b>. Ambos abaixo de 1: acima do custo e atrasado. CV = −42.000 e SV = −57.000.</p>',
 cmd:'CPI = EV/AC ; SPI = EV/PV',out:'  →  CPI 0.8353 | SPI 0.7889  (L1)',
 scene:function(){return [X.box('c',16,50,320,70,'CPI 0,84','m','custo: acima do orçado'),X.box('s',380,50,320,70,'SPI 0,79','m','prazo: atrasado'),X.text('t',16,170,'Índice acima de 1 é bom; abaixo de 1, ruim.','t')]}},
{label:'2. Previsões',title:'EAC: três formas de prever o custo final',text:'<p>Se o desvio foi atípico: EAC = AC + (BAC − EV) = <b>542.000</b>. Se vai se repetir (típico): EAC = BAC/CPI = <b>598.591,55</b>. Se prazo e custo pesam juntos: AC + (BAC − EV)/(CPI×SPI) = <b>690.538,58</b>. ETC típico = 343.591,55 e VAC = −98.591,55.</p>',
 scene:function(){return [X.box('a',16,40,214,60,'atípico','n','542.000'),X.box('t',253,40,214,60,'típico','a','598.591,55'),X.box('c',490,40,214,60,'CPI × SPI','m','690.538,58'),X.text('x',16,150,'Quanto maior o EAC, mais o projeto estoura o BAC de 500.000.','t')]}},
{label:'3. TCPI',title:'TCPI: a eficiência exigida daqui para frente',text:'<p>TCPI para fechar no BAC = (BAC − EV)/(BAC − AC) = 287.000/245.000 = <b>1,1714</b>. É preciso render 17% mais do que o necessário, com um CPI atual de 0,84. Para fechar no EAC típico, o TCPI é igual ao CPI (0,8353): a meta é a eficiência atual.</p>',
 scene:function(){return [X.box('t',16,50,320,70,'TCPI(BAC) = 1,1714','m','exige melhorar'),X.box('u',380,50,320,70,'TCPI(EAC típico) = 0,8353','a','mantém o ritmo atual')]}},
{label:'4. Caminho crítico',title:'CPM: caminho crítico e folga',text:'<p>Atividades A a G (L2): o <b>caminho crítico A→B→D→F→G soma 18 dias</b>; C tem 4 dias de folga e E, 2. Com PERT, a soma dos te do caminho dá 19 dias (σ = 1,453); no Monte Carlo (seed 11), P50 = 19,92 e P80 = 21,56 dias, com 14,3% de chance de terminar em até 18 dias.</p>',
 scene:function(){var n=['A 3','B 4','D 5','F 4','G 2'];var o=n.map(function(t,i){return X.box('k'+i,10+i*110,40,100,50,t,'m')});o.push(X.box('c',120,120,100,46,'C 4 de folga','n'),X.box('e',230,120,100,46,'E 2 de folga','n'));o.push(X.text('t',16,200,'Somar durações prováveis subestima o prazo.','t'));return o}},
{label:'5. Portfólio',title:'Portfólio: VPL, TIR, payback e orçamento',text:'<p>Com taxa de 10% (L3): "Modernizar sistema de processos" VPL 217.987, TIR 29,1%, payback 2,53 anos; "Migração para a nuvem" VPL 257.963. Orçamento de R$ 1.000.000: a melhor <b>combinação</b> é modernizar + migrar (VPL 475.950). "Intranet nova" tem VPL −61.592: nunca se paga. O ranking por nota estratégica x IL não coincide com o por VPL; governança de portfólio exige critérios aprovados.</p>',
 scene:function(){return [X.box('a',16,40,214,60,'Modernizar','a','VPL 217.987'),X.box('b',253,40,214,60,'Migração nuvem','a','VPL 257.963'),X.box('c',490,40,214,60,'Intranet nova','m','VPL −61.592'),X.text('t',16,140,'Combinação escolhida: 475.950 de VPL com R$ 1.000.000.','t')]}}
];
K.explain({w:720,h:260,steps:S,alt:'Animação passo a passo de valor agregado, previsão de custo, caminho crítico e portfólio'});
})();
