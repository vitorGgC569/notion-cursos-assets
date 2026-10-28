(function(){
var K=window.K,X=K.X;
function base(k){k=k||{};return [X.zone('z',10,10,700,330,'Transferência de 100 da conta A para a conta B'),X.box('app',30,60,140,60,'Aplicação','n',k.app||'BEGIN'),X.box('buf',230,60,160,60,'Memória (buffer)',k.buf||'n',k.bufs||'A = 500, B = 200'),X.box('wal',450,60,220,60,'Log WAL (disco)',k.wal||'n',k.wals||'vazio'),X.box('dat',450,220,220,60,'Arquivos de dados (disco)',k.dat||'n',k.dats||'A = 500, B = 200')]}
var S=[
{label:'0. BEGIN',title:'A transação começa',text:'<p><code>BEGIN</code> abre a transação. As próximas operações formam uma unidade lógica: <b>ou todas valem, ou nenhuma</b>. As contas A e B começam com 500 e 200.</p>',
 scene:function(){return base().concat([X.line('l1',172,90,228,90,'a',true)])}},
{label:'1. Débito em A',title:'O débito vai para a memória e para o log',text:'<p><code>UPDATE conta SET saldo = saldo - 100 WHERE id = A</code>. A página é alterada na memória e o registro da mudança vai para o <b>WAL</b> (write-ahead log). Os arquivos de dados ainda não mudaram.</p>',
 scene:function(){return base({buf:'a',bufs:'A = 400 (alterado)',wal:'a',wals:'A: 500 → 400'}).concat([X.line('l1',172,90,228,90,'a',true),X.line('l2',392,90,448,90,'a',true)])}},
{label:'2. Falha',title:'Falha antes do COMMIT: atomicidade',text:'<p>O servidor cai antes de creditar B e de confirmar. Na reinicialização, o SGBD vê no log uma transação <b>sem COMMIT</b> e a desfaz (undo). O mesmo efeito tem um <code>ROLLBACK</code>. A atomicidade garante que nunca existirá "o débito sem o crédito".</p>',
 scene:function(){return base({buf:'d',bufs:'perdida na queda',wal:'a',wals:'sem COMMIT: desfaz',dat:'n',dats:'A = 500, B = 200'}).concat([X.text('t',40,180,'tudo ou nada','t')])}},
{label:'3. Crédito e COMMIT',title:'COMMIT: o log vai para o disco antes da resposta',text:'<p>Após creditar B, o <code>COMMIT</code> grava no WAL o registro de commit e faz o <b>flush</b> para o disco. Só então a aplicação recebe o "OK". Isso é a <b>durabilidade</b>: o dado confirmado já está em armazenamento estável, mesmo que as páginas de dados ainda não tenham sido gravadas.</p>',
 scene:function(){return base({app:'COMMIT',buf:'a',bufs:'A = 400, B = 300',wal:'a',wals:'A, B e COMMIT gravados',dat:'n',dats:'ainda A = 500, B = 200'}).concat([X.line('l1',172,90,228,90,'a',true),X.line('l2',392,90,448,90,'a',true)])}},
{label:'4. Recuperação',title:'Queda após o COMMIT: redo pelo log',text:'<p>Se o servidor cair agora, as páginas de dados estão antigas, mas o WAL tem tudo. Na volta, o SGBD <b>refaz</b> (redo) o que foi confirmado. Um <b>checkpoint</b> grava periodicamente as páginas sujas e encurta esse trabalho.</p>',
 scene:function(){return base({buf:'d',bufs:'perdida na queda',wal:'a',wals:'redo a partir do log',dat:'a',dats:'A = 400, B = 300 (refeito)'}).concat([X.line('l3',560,122,560,218,'a',true),X.text('t',590,175,'redo','t')])}},
{label:'5. Isolamento e consistência',title:'Outras transações e as restrições',text:'<p><b>Isolamento:</b> enquanto a transação não confirma, outra sessão em READ COMMITTED continua enxergando A = 500 (no PostgreSQL, por MVCC). <b>Consistência:</b> um <code>CHECK (saldo &gt;= 0)</code> faz o SGBD recusar a transação que deixe a conta negativa. Juntos: A, C, I e D.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'ACID'),X.box('a',40,70,150,80,'Atomicidade','a','tudo ou nada'),X.box('c',215,70,150,80,'Consistência','n','restrições válidas'),X.box('i',390,70,150,80,'Isolamento','n','sem parciais'),X.box('d',565,70,120,80,'Durabilidade','n','WAL no disco'),X.box('t',150,200,420,70,'Laboratório L6','d','COMMIT, ROLLBACK, SAVEPOINT e deadlock reais')]}}
];
K.explain({w:720,h:350,steps:S,alt:'Animação de uma transação: BEGIN, débito, falha, COMMIT com WAL e recuperação'});
})();
