(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Três leis',label:'Iniciativa do Executivo',text:'<p>O art. 165 manda o <b>Poder Executivo</b> iniciar três leis: o <b>plano plurianual</b>, as <b>diretrizes orçamentárias</b> e os <b>orçamentos anuais</b>.</p>',scene:function(){return sc('PASSO 1 DE 6',[['PPA','a'],['LDO','n'],['LOA','n']],'art. 165')}},
{title:'2. PPA',label:'Médio prazo',text:'<p>Dura <b>quatro anos</b>: começa no segundo ano do mandato e termina no primeiro do mandato seguinte. Traz <b>diretrizes, objetivos e metas</b> para despesas de capital e programas continuados.</p>',scene:function(){return sc2('PASSO 2 DE 6',[['PPA','a','4 anos']],[['Capital','m','e programas']],'165, § 1º')}},
{title:'3. LDO',label:'Orienta a LOA',text:'<p>Traz as <b>metas e prioridades</b>, a <b>política fiscal</b>, orienta a LOA, dispõe sobre <b>alterações tributárias</b> e a política das <b>agências de fomento</b>.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Metas','a'],['Prioridades','n'],['Orienta a LOA','n']],'165, § 2º')}},
{title:'4. LOA',label:'Receita e despesa',text:'<p>A LOA <b>prevê a receita</b> e <b>fixa a despesa</b>. Reúne três orçamentos: o <b>fiscal</b>, o de <b>investimento</b> das estatais e o da <b>seguridade social</b>.</p>',scene:function(){return sc('PASSO 4 DE 6',[['Fiscal','a'],['Investimento','n'],['Seguridade','n']],'165, § 5º')}},
{title:'5. Compatibilidade',label:'Degraus que se encaixam',text:'<p>A LOA tem de ser compatível com o <b>PPA</b> e a <b>LDO</b>. As emendas só passam se respeitarem essa compatibilidade. E o investimento que passa de um ano tem de estar no PPA.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['PPA','a','plano']],[['LDO','m','guia'],['LOA','m','valores']],'166, § 3º')}},
{title:'6. Prazos e recesso',label:'Só a LDO trava',text:'<p>A <b>sessão legislativa</b> não é interrompida sem a aprovação da <b>LDO</b>. No ADCT, a LDO da União é enviada até 8 meses e meio antes do fim do exercício.</p>',scene:function(){return sc('PASSO 6 DE 6',[['LDO','a'],['Recesso','n'],['Trava','n']],'art. 57, § 2º')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelas três leis do orçamento: iniciativa, PPA, LDO, LOA, compatibilidade e prazos'});
})();