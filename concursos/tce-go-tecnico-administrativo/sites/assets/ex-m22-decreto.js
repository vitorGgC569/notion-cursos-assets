(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Diretrizes',label:'Art. 1º',text:'<p><b>Presunção de boa-fé</b>, compartilhamento de informações, racionalização, <b>linguagem clara</b> e eliminação de formalidades cujo custo supere o risco.</p>',scene:function(){return sc('PASSO 1 DE 6',[['Boa-fé','a'],['Linguagem clara','n'],['Custo menor que risco','n']],'art. 1º')}},
{title:'2. Documentos',label:'Arts. 2º e 3º',text:'<p>O órgão <b>obtém</b> da base oficial o que já consta dela e <b>não exige</b> do usuário. Se não for possível, vale a <b>declaração escrita</b>.</p>',scene:function(){return sc2('PASSO 2 DE 6',[['Base oficial','a','órgão busca']],[['Declaração','m','se não for possível']],'arts. 2º e 3º')}},
{title:'3. Firma e cópia',label:'Arts. 9º e 10',text:'<p>Fica <b>dispensado</b> o reconhecimento de firma e a autenticação de cópia, salvo dúvida fundada ou previsão legal.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Sem firma','a'],['Sem autenticação','n'],['Exceção: dúvida','n']],'art. 9º')}},
{title:'4. Carta de Serviços',label:'Art. 11',text:'<p>Informa os <b>serviços</b>, as <b>formas de acesso</b> e os <b>compromissos e padrões de qualidade</b> do atendimento.</p>',scene:function(){return sc('PASSO 4 DE 6',[['Serviços','a'],['Acesso','n'],['Padrões de qualidade','n']],'art. 11')}},
{title:'5. Simplifique!',label:'Art. 13',text:'<p>Formulário pelo qual o usuário <b>solicita simplificação</b> ou melhoria do serviço público.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['Usuário','a','solicita']],[['Simplifique!','m','formulário']],'art. 13')}},
{title:'6. Satisfação e sanção',label:'Arts. 16 e 20',text:'<p>Os órgãos usam <b>pesquisa de satisfação</b> para ajustar os serviços. Quem descumpre o Decreto responde pela <b>Lei 8.112/1990</b>.</p>',scene:function(){return sc2('PASSO 6 DE 6',[['Pesquisa','a','art. 20']],[['Sanção','m','art. 16']],'arts. 16 e 20')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelo Decreto 9.094: diretrizes, documentos, firma e cópia, Carta de Serviços, Simplifique! e pesquisa de satisfação'});
})();