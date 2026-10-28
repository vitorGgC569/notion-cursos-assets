(function(){
var K=window.K,X=K.X;
function base(){return [X.box('c',30,30,170,56,'Cliente','n','sem endereço IP'),X.box('s',520,30,170,56,'Servidor DHCP','n','tem o escopo'),X.line('lc',115,86,115,320,''),X.line('ls',605,86,605,320,'')]}
function arrow(id,y,fromLeft,t,sub,c){var x1=fromLeft?115:605,x2=fromLeft?605:115;return [X.line(id,x1,y,x2,y+16,c||'a',true),X.text(id+'t',360,y-8,t,'t','middle'),X.text(id+'s',360,y+30,sub||'','t','middle')]}
var S=[
{label:'0. Sem IP',title:'O cliente liga e não tem endereço',text:'<p>Sem endereço, o cliente usa <b>0.0.0.0</b> como origem. O DHCP usa <b>UDP</b>: o servidor escuta na porta <b>67</b> e o cliente, na <b>68</b>. O processo tem quatro mensagens, a sigla <b>DORA</b>.</p>',
 scene:function(){return base().concat([X.text('t',360,200,'D · O · R · A','t','middle')])}},
{label:'1. Discover',title:'D, DHCPDISCOVER: "tem algum servidor aí?"',text:'<p>O cliente envia um <b>broadcast</b> (destino 255.255.255.255, MAC FF:FF:FF:FF:FF:FF) procurando servidores DHCP. Como broadcast não atravessa roteadores, em redes com vários segmentos usa-se um <b>agente de retransmissão (relay)</b>.</p>',
 scene:function(){return base().concat(arrow('m1',120,true,'DHCPDISCOVER (broadcast)','origem 0.0.0.0, porta 68 → 67','a'))}},
{label:'2. Offer',title:'O, DHCPOFFER: o servidor oferece um endereço',text:'<p>O servidor reserva um endereço livre do <b>escopo</b> e o oferece junto com máscara, gateway, servidores DNS e o <b>tempo de concessão (lease)</b>. Mais de um servidor pode responder.</p>',
 scene:function(){return base().concat(arrow('m1',120,true,'DHCPDISCOVER','','n'),arrow('m2',190,false,'DHCPOFFER','oferta: 192.168.10.50 /24, gw .1, DNS, lease 8 h','a'))}},
{label:'3. Request',title:'R, DHCPREQUEST: o cliente escolhe e pede',text:'<p>O cliente aceita uma oferta e envia <b>DHCPREQUEST</b>, também em broadcast, citando o servidor escolhido. Assim os outros servidores sabem que sua oferta foi recusada e devolvem o endereço ao escopo.</p>',
 scene:function(){return base().concat(arrow('m2',120,false,'DHCPOFFER','','n'),arrow('m3',190,true,'DHCPREQUEST (broadcast)','aceito 192.168.10.50 do servidor X','a'))}},
{label:'4. Ack',title:'A, DHCPACK: o servidor confirma',text:'<p>O servidor confirma com <b>DHCPACK</b>, e o cliente passa a usar o endereço. Antes, costuma verificar conflito com ARP. Se o servidor não puder atender, envia <b>DHCPNAK</b>.</p>',
 scene:function(){return base().concat(arrow('m3',120,true,'DHCPREQUEST','','n'),arrow('m4',190,false,'DHCPACK','concessão confirmada (lease 8 h)','a'),X.box('ok',250,270,220,44,'192.168.10.50 em uso','a'))}},
{label:'5. Renovação',title:'Concessão tem prazo: renovação',text:'<p>Com 50% do lease (T1) o cliente pede renovação por <b>unicast</b> ao mesmo servidor. Com 87,5% (T2), tenta qualquer servidor. Se expirar, volta ao Discover. A <b>reserva por MAC</b> garante sempre o mesmo IP a um equipamento (servidores e impressoras).</p>',
 scene:function(){return [X.zone('z',16,16,688,300,'Tempos da concessão (lease de 8 horas)'),X.box('t1',40,70,200,56,'T1 = 50%','a','4 h: renova com o servidor'),X.box('t2',260,70,200,56,'T2 = 87,5%','n','7 h: tenta qualquer servidor'),X.box('t3',480,70,200,56,'100%','m','8 h: expira, Discover'),X.text('t',40,180,'Fora da faixa DHCP: IPs fixos (servidores, roteadores).','t'),X.text('t2',40,206,'Sem DHCP e sem resposta: o Windows usa 169.254.0.0/16 (APIPA).','t')]}}
];
K.explain({w:720,h:330,steps:S,alt:'Animação das quatro mensagens do DHCP, DORA'});
})();
