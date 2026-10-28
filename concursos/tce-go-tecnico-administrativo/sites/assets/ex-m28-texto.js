(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Ler a proposta',label:'Recorte',text:'<p>Sublinhe o <b>verbo de comando</b> e as palavras que delimitam o assunto. O <b>recorte</b> é o que a proposta realmente pergunta.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Assunto','a','campo amplo']],[['Recorte','m','o que se pergunta']],'proposta')}},
{title:'2. Ler os textos de apoio',label:'Interpretação',text:'<p>Procure a <b>ideia central</b> de cada texto, a <b>relação</b> entre eles e um dado para retomar com suas palavras. Não copie.</p>',scene:function(){return sc('PASSO 2 DE 6',[['Ideia central','a'],['Relação','n'],['Dado','n']],'textos de apoio')}},
{title:'3. Formular a tese',label:'Tese',text:'<p>Escreva em <b>uma frase</b> a posição que o texto defende. Sem tese, os argumentos ficam soltos.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Posição','a'],['em uma frase','n']],'tese')}},
{title:'4. Introduzir',label:'4 a 6 linhas',text:'<p>A introdução apresenta o assunto, delimita o <b>recorte</b> e enuncia a <b>tese</b>.</p>',scene:function(){return sc('PASSO 4 DE 6',[['Assunto','a'],['Recorte','n'],['Tese','n']],'introdução')}},
{title:'5. Desenvolver',label:'2 argumentos',text:'<p>Dois parágrafos, cada um com <b>um argumento diferente</b>, explicação e exemplo. O segundo aprofunda ou completa o primeiro.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['Argumento 1','a','explicação e exemplo']],[['Argumento 2','m','outro ângulo']],'desenvolvimento')}},
{title:'6. Concluir',label:'Encaminhamento',text:'<p>Retome a <b>tese</b> e feche com um <b>encaminhamento</b>. Não abra argumento novo e não repita a introdução.</p>',scene:function(){return sc('PASSO 6 DE 6',[['Retomada','a'],['Encaminhamento','n']],'conclusão')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos do texto: ler a proposta, ler os textos de apoio, formular a tese, introduzir, desenvolver dois argumentos e concluir com encaminhamento'});
})();