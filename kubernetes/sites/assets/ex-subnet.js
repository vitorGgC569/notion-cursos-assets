(function(){
var K=window.K,X=K.X;
function bits(n){return ('00000000'+n.toString(2)).slice(-8)}
var IP=[192,168,10,37],MASK=[255,255,255,192],NET=[192,168,10,0],BC=[192,168,10,63];
function row(id,y,oct,hl,label,cls,mode){
  var N=[X.text(id+'l',40,y-9,label,'t')];
  for(var o=0;o<4;o++){
    var b=bits(oct[o]);
    for(var i=0;i<8;i++){var idx=o*8+i,x=40+idx*18+o*10;
      var c=mode==='and'?(idx<hl?'a':'n'):(idx<hl?'a':'n');
      N.push(X.box(id+idx,x,y,17,26,b[i],(cls&&cls[idx])||c));}
    N.push(X.text(id+'d'+o,40+o*(8*18+10)+72,y+44,String(oct[o]),'b','middle'));
  }
  return N;
}
function seg(){return []}
var S=[
{cmd:'192.168.10.37/26',title:'O endereço e o prefixo',text:'<p>O endereço IPv4 tem 32 bits, escritos em 4 grupos de 8 (os octetos). O <code>/26</code> diz que os <b>26 primeiros bits</b> identificam a rede; os 6 restantes identificam o host dentro dela. Os bits destacados são os da rede.</p>',scene:function(){return row('ip',70,IP,26,'Endereço IP','','x')}},
{cmd:'máscara /26 = 255.255.255.192',title:'A máscara de sub-rede',text:'<p>A máscara é só o prefixo escrito em bits: 26 bits <b>1</b> seguidos de 6 bits <b>0</b>. Em decimal, o último octeto <code>11000000</code> vale 128 + 64 = <b>192</b>.</p>',scene:function(){return row('ip',60,IP,26,'Endereço IP','','x').concat(row('mk',150,MASK,26,'Máscara','',null))}},
{cmd:'IP E máscara',title:'AND bit a bit: o endereço da rede',text:'<p>Aplicando um <b>E lógico</b> (1 só se os dois bits forem 1), os bits de host viram zero. Resultado: <code>192.168.10.0</code>. Esse é o endereço de rede: o primeiro da faixa, reservado.</p>',scene:function(){return row('ip',40,IP,26,'Endereço IP','','x').concat(row('mk',120,MASK,26,'Máscara','',null)).concat(row('nt',200,NET,26,'Rede = IP E máscara','',null)).concat([X.text('hint',40,290,'192.168.10.37  E  255.255.255.192  =  192.168.10.0','t')])}},
{cmd:'host bits = 1',title:'O broadcast',text:'<p>Colocando <b>todos os bits de host em 1</b> obtemos o endereço de broadcast: <code>192.168.10.63</code>. Um pacote enviado a ele chega a todos da rede.</p>',scene:function(){return row('nt',60,NET,26,'Rede','','x').concat(row('bc',150,BC,26,'Broadcast (host bits = 1)','',null))}},
{cmd:'hosts válidos',title:'A faixa utilizável',text:'<p>Restam 6 bits de host: 2<sup>6</sup> = 64 endereços. Tirando rede (.0) e broadcast (.63) sobram <b>62 hosts</b>, de <code>.1</code> a <code>.62</code>. Fórmula geral: 2<sup>(32 − prefixo)</sup> − 2.</p>',scene:function(){return [X.box('r0',40,70,80,50,'.0','m','rede'),X.box('rm',130,70,420,50,'.1  até  .62','a','62 hosts utilizáveis'),X.box('r63',560,70,80,50,'.63','m','broadcast'),X.text('f',40,170,'2^6 = 64 endereços  menos 2 = 62 hosts','t')]}},
{cmd:'/24 dividido em /26',title:'Dividir uma rede em quatro',text:'<p>Pegar 2 bits emprestados dos hosts de uma <code>/24</code> cria <b>4 sub-redes</b> <code>/26</code>, cada uma com 64 endereços: <code>.0</code>, <code>.64</code>, <code>.128</code> e <code>.192</code>. O <b>salto</b> entre elas é 256 − 192 = 64.</p>',scene:function(){var N=[X.text('t',40,50,'192.168.10.0/24','t')];[0,64,128,192].forEach(function(b,i){N.push(X.box('s'+i,40+i*160,70,152,70,'192.168.10.'+b+'/26',i===0?'a':'n','hosts .'+(b+1)+' a .'+(b+62)+'\nbroadcast .'+(b+63)))});return N}},
{cmd:'192.168.10.37 e 192.168.10.70',title:'Dois hosts estão na mesma rede?',text:'<p>Aplique a máscara aos dois: <code>.37 E 192</code> = <b>0</b> e <code>.70 E 192</code> = <b>64</b>. Redes diferentes (<code>.0/26</code> e <code>.64/26</code>). Para conversar, o tráfego precisa passar por um <b>roteador</b>, mesmo que os dois endereços pareçam vizinhos.</p>',scene:function(){return [X.box('a',40,70,300,100,'192.168.10.0/26','a','host 192.168.10.37'),X.box('b',380,70,300,100,'192.168.10.64/26','n','host 192.168.10.70'),X.text('x',360,215,'0  ≠  64  →  redes diferentes','b','middle'),X.text('x2',360,245,'precisa de gateway','t','middle')]}}
];
K.explain({w:720,h:300,steps:S,alt:'Cálculo de rede e broadcast com bits'});
})();
