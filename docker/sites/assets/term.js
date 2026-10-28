/* Terminal Linux simulado (sistema de arquivos virtual) + painel de tarefas. Vanilla JS. */
(function(){
'use strict';
var K=window.K;
var DATE='out 27 10:00';

function mk(spec,owner,group){
  // spec: string => arquivo; objeto => pasta; {__f:'conteudo',__m:0o600,__o:'root'} => arquivo com atributos
  function build(v,dm,o,g){
    if(typeof v==='string')return {t:'f',d:v,m:0o644,o:o,g:g};
    if(v&&v.__f!=null)return {t:'f',d:v.__f,m:v.__m!=null?v.__m:0o644,o:v.__o||o,g:v.__g||v.__o||g};
    var n={t:'d',c:{},m:(v&&v.__m!=null)?v.__m:dm,o:(v&&v.__o)||o,g:(v&&v.__g)||(v&&v.__o)||g};
    for(var k in v){if(k.indexOf('__')===0)continue;n.c[k]=build(v[k],0o755,n.o,n.g)}
    return n;
  }
  return build(spec,0o755,owner||'aluno',group||owner||'aluno');
}
function clone(n){return JSON.parse(JSON.stringify(n))}

function Term(opts){
  var T=this;
  T.cfg=opts;
  T.user=opts.user||'aluno'; T.groups=opts.groups||['aluno','sudo'];
  T.host=opts.host||'docker-lab';
  T.sudoOK=opts.sudo!==false;
  T.home='/home/'+T.user;
  T.reset();
}
Term.cmds={};
Term.register=function(name,fn){Term.cmds[name]=fn};
Term.prototype.reset=function(){
  var T=this;
  T.fs=mk(JSON.parse(JSON.stringify(T.cfg.fs)),'root','root');
  // dono padrão do home
  T.cwd=T.cfg.cwd||T.home; T.hist=[]; T.outs=[]; T.vars={HOME:T.home,USER:T.user,PWD:T.cwd,SHELL:'/bin/bash'}; T.last=0; T.eff=T.user; T.state={};
  if(T.cfg.init)T.cfg.init(T);
};
/* ---------- caminhos ---------- */
Term.prototype.parts=function(p){
  var T=this; if(p==='~'||p.indexOf('~/')===0)p=T.home+p.slice(1);
  var base=p.charAt(0)==='/'?[]:T.cwd.split('/').filter(Boolean);
  p.split('/').forEach(function(s){if(!s||s==='.')return;if(s==='..')base.pop();else base.push(s)});
  return base;
};
Term.prototype.abs=function(p){return '/'+this.parts(p).join('/')};
Term.prototype.get=function(p){
  var n=this.fs,ps=this.parts(p);
  for(var i=0;i<ps.length;i++){if(n.t!=='d'||!n.c[ps[i]])return null;n=n.c[ps[i]]}
  return n;
};
Term.prototype.parent=function(p){
  var ps=this.parts(p); if(!ps.length)return null; var name=ps.pop(); var n=this.fs;
  for(var i=0;i<ps.length;i++){if(n.t!=='d'||!n.c[ps[i]])return null;n=n.c[ps[i]]}
  return n.t==='d'?{dir:n,name:name}:null;
};
Term.prototype.can=function(n,mode){
  var u=this.eff; if(u==='root')return mode!=='x'||n.t==='d'||(n.m&0o111)>0;
  var bit=mode==='r'?4:mode==='w'?2:1, sh;
  if(n.o===u)sh=6;else if(this.groups.indexOf(n.g)>-1)sh=3;else sh=0;
  return ((n.m>>sh)&bit)>0;
};
Term.prototype.modeStr=function(n){
  var s=n.t==='d'?'d':'-',m=n.m;
  for(var i=2;i>=0;i--){var b=(m>>(i*3))&7;s+=(b&4?'r':'-')+(b&2?'w':'-')+(b&1?'x':'-')}
  return s;
};
/* ---------- tokenização e execução ---------- */
Term.prototype.tokenize=function(line){
  var toks=[],i=0,cur='',has=false,q=false;
  function push(){if(has){toks.push({s:cur,q:q});cur='';has=false;q=false}}
  var T=this;
  function expand(s){return s.replace(/\$\{?([A-Za-z_][A-Za-z0-9_]*|\?)\}?/g,function(_,v){return '\u0001'+v+'\u0002'}).replace(/\$\(([^()]*)\)|`([^`]*)`/g,function(_,a,b){return '\u0003'+(a||b)+'\u0004'})}
  while(i<line.length){
    var c=line[i];
    if(c==='\\'&&i+1<line.length){cur+=line[i+1];has=true;q=true;i+=2;continue}
    if(c==="'"){var j=line.indexOf("'",i+1);if(j<0)throw new Error("aspas simples não fechadas");cur+=line.slice(i+1,j);has=true;q=true;i=j+1;continue}
    if(c==='"'){var j2=i+1,buf='';while(j2<line.length&&line[j2]!=='"'){if(line[j2]==='\\'&&j2+1<line.length&&'"\\$`'.indexOf(line[j2+1])>-1){buf+=line[j2+1];j2+=2}else{buf+=line[j2];j2++}}
      if(j2>=line.length)throw new Error("aspas duplas não fechadas");cur+=expand(buf);has=true;q=true;i=j2+1;continue}
    if(c===' '||c==='\t'){push();i++;continue}
    if(c==='#'&&!has){break}
    if(c==='2'&&!has&&line[i+1]==='>'){if(line.slice(i,i+4)==='2>&1'){toks.push({op:'2>&1'});i+=4;continue}var ap=line[i+2]==='>';toks.push({op:ap?'2>>':'2>'});i+=ap?3:2;continue}
    if(c==='|'||c==='&'||c===';'||c==='>'||c==='<'){
      push();var op=c;
      if((c==='|'||c==='&'||c==='>')&&line[i+1]===c){op=c+c;i++}
      toks.push({op:op});i++;continue;
    }
    if(c==='$'||c==='`'){var m=/^(\$\{?([A-Za-z_][A-Za-z0-9_]*|\?)\}?|\$\([^()]*\)|`[^`]*`)/.exec(line.slice(i));if(m){cur+=expand(m[0]);has=true;i+=m[0].length;continue}}
    if(c==='~'&&!has&&(i+1>=line.length||line[i+1]==='/'||line[i+1]===' ')){cur+='\u0001HOME\u0002';has=true;i++;continue}
    cur+=c;has=true;i++;
  }
  push();return toks;
};
Term.prototype.ex=function(s){
  var T=this;if(s.indexOf('\u0001')<0&&s.indexOf('\u0003')<0)return s;
  return s.replace(/\u0003([^\u0004]*)\u0004/g,function(_,c){return T.run_inner(c).replace(/\n+$/,'').replace(/\n/g,' ')}).replace(/\u0001([^\u0002]*)\u0002/g,function(_,v){return v==='?'?String(T.last):(T.vars[v]!=null?T.vars[v]:'')});
};
Term.prototype.globs=function(tok){
  if(tok.q||!/[*?]/.test(tok.s))return [tok.s];
  var T=this,s=tok.s,slash=s.lastIndexOf('/'),dir=slash>=0?s.slice(0,slash+1):'',pat=s.slice(slash+1);
  var d=T.get(dir||'.'); if(!d||d.t!=='d')return [s];
  var re=new RegExp('^'+pat.replace(/[.+^${}()|\\[\]]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.')+'$');
  var r=Object.keys(d.c).sort().filter(function(k){return re.test(k)&&(k[0]!=='.'||pat[0]==='.')}).map(function(k){return dir+k});
  return r.length?r:[s];
};
Term.prototype.run=function(line){
  var T=this,out='';
  T.hist.push(line);
  function fin(o){return o}
  var toks;
  try{toks=T.tokenize(line)}catch(e){T.last=2;return 'bash: '+e.message+'\n'}
  if(!toks.length)return '';
  // separar em listas por ; && ||
  var lists=[],cur=[],sep=null;
  toks.forEach(function(t){
    if(t.op===';'||t.op==='&&'||t.op==='||'){lists.push({toks:cur,sep:sep});cur=[];sep=t.op}
    else if(t.op==='&'){/* segundo plano: ignora */}
    else cur.push(t);
  });
  lists.push({toks:cur,sep:sep});
  lists.forEach(function(L){
    if(L.sep==='&&'&&T.last!==0)return; if(L.sep==='||'&&T.last===0)return;
    if(!L.toks.length)return;
    out+=T.pipeline(L.toks);
  });
  T.outs.push(out);
  return out;
};
Term.prototype.pipeline=function(toks){
  var T=this,cmds=[],cur=[];
  toks.forEach(function(t){if(t.op==='|'){cmds.push(cur);cur=[]}else cur.push(t)});
  cmds.push(cur);
  var input=null,res={out:'',err:'',code:0},final='';
  for(var k=0;k<cmds.length;k++){
    var c=cmds[k],args=[],redir=null,inFile=null,eredir=null,e2o=false;
    for(var i=0;i<c.length;i++){
      var t=c[i];
      if(t.op==='>'||t.op==='>>'){redir={app:t.op==='>>',f:c[i+1]&&T.ex(c[i+1].s)};i++;continue}
      if(t.op==='2>'||t.op==='2>>'){eredir={app:t.op==='2>>',f:c[i+1]&&T.ex(c[i+1].s)};i++;continue}
      if(t.op==='2>&1'){e2o=true;continue}
      if(t.op==='<'){inFile=c[i+1]&&T.ex(c[i+1].s);i++;continue}
      if(t.op){continue}
      var tx={s:T.ex(t.s),q:t.q};
      if(args.length===0&&/^[A-Za-z_][A-Za-z0-9_]*=/.test(tx.s)&&c.length===1){var m=/^([^=]+)=(.*)$/.exec(tx.s);T.vars[m[1]]=m[2];T.last=0;args=null;break}
      T.globs(tx).forEach(function(g){args.push(g)});
    }
    if(args===null)continue;
    if(!args.length)continue;
    if(inFile){var nf=T.get(inFile);if(!nf||nf.t!=='f'){final+='bash: '+inFile+': Arquivo ou diretório inexistente\n';T.last=1;return final}input=nf.d}
    res=T.exec(args,input);
    if(e2o){res.out=(res.out||'')+(res.err||'');res.err=''}
    if(eredir&&res.err){if(eredir.f!=='/dev/null'){var er=T.writeFile(eredir.f,res.err,eredir.app);if(er)final+=er+'\n'}res.err=''}
    final+=res.err||'';
    if(redir){
      var r=T.writeFile(redir.f,res.out||'',redir.app);
      if(r){final+=r+'\n';res.code=1}
      input='';
    } else if(k<cmds.length-1){input=res.out||''}
    else final+=res.out||'';
    T.last=res.code;
  }
  return final;
};
Term.prototype.writeFile=function(path,data,app){
  var T=this,n;if(path==='/dev/null')return '';n=T.get(path);
  if(n){if(n.t==='d')return 'bash: '+path+': É um diretório';if(!T.can(n,'w'))return 'bash: '+path+': Permissão negada';n.d=app?n.d+data:data;return ''}
  var p=T.parent(path);if(!p)return 'bash: '+path+': Arquivo ou diretório inexistente';
  if(!T.can(p.dir,'w'))return 'bash: '+path+': Permissão negada';
  p.dir.c[p.name]={t:'f',d:data,m:0o644,o:T.eff,g:T.eff==='root'?'root':T.user};return '';
};
Term.prototype.exec=function(args,input){
  var T=this,name=args[0],rest=args.slice(1);
  if(name==='sudo'){
    if(!T.sudoOK)return {err:'sudo: comando não disponível neste laboratório\n',code:1};
    if(!rest.length)return {err:'uso: sudo comando\n',code:1};
    var prev=T.eff;T.eff='root';var r=T.exec(rest,input);T.eff=prev;return r;
  }
  if(name.indexOf('/')>-1||name.indexOf('./')===0){
    var n=T.get(name);
    if(!n)return {err:'bash: '+name+': Arquivo ou diretório inexistente\n',code:127};
    if(n.t==='d')return {err:'bash: '+name+': É um diretório\n',code:126};
    if(!T.can(n,'x'))return {err:'bash: '+name+': Permissão negada\n',code:126};
    var lines=n.d.split('\n').filter(function(l){return l.trim()&&l.indexOf('#!')!==0&&l.trim()[0]!=='#'});
    var out='',code=0;lines.forEach(function(l){var sub=T.run_inner(l);out+=sub});return {out:out,code:T.last};
  }
  var fn=Term.cmds[name];
  if(!fn)return {err:'bash: '+name+': comando não encontrado\n',code:127};
  var res;try{res=fn(T,rest,input)||{}}catch(e){res={err:name+': erro interno ('+e.message+')\n',code:1}}
  if(res.code==null)res.code=res.err?1:0;return res;
};
Term.prototype.run_inner=function(line){var h=this.hist.length;var o=this.run(line);this.hist.length=h;this.outs.pop();return o};

/* ---------- comandos básicos ---------- */
function opts(args,spec){ // spec: letras booleanas; retorna {f:{},a:[]}
  var f={},a=[],end=false;
  args.forEach(function(x){
    if(end||x==='-'||x[0]!=='-'||x.length<2||/^-\d/.test(x)&&!spec.num){a.push(x);return}
    if(x==='--'){end=true;return}
    if(x.indexOf('--')===0){f[x.slice(2)]=true;return}
    x.slice(1).split('').forEach(function(ch){f[ch]=true});
  });
  return {f:f,a:a};
}
var R=Term.register;
R('help',function(T){return {out:'Comandos disponíveis: '+Object.keys(Term.cmds).sort().join(', ')+'\nUse as tarefas ao lado como guia. Setas ↑ e ↓ navegam pelo histórico.\n'}});
R('clear',function(T){T.__clear=true;return {out:''}});
R('pwd',function(T){return {out:T.cwd+'\n'}});
R('whoami',function(T){return {out:T.eff+'\n'}});
R('hostname',function(T){return {out:T.host+'\n'}});
R('id',function(T){var u=T.eff;if(u==='root')return {out:'uid=0(root) gid=0(root) groups=0(root)\n'};return {out:'uid=1000('+u+') gid=1000('+u+') groups=1000('+u+'),'+T.groups.filter(function(g){return g!==u}).map(function(g){return ({sudo:27,docker:999}[g]||1001)+'('+g+')'}).join(',')+'\n'}});
R('groups',function(T){return {out:T.groups.join(' ')+'\n'}});
R('date',function(T){return {out:'ter 27 out 2026 10:00:00 -03\n'}});
R('uname',function(T,a){return {out:a.indexOf('-a')>-1?'Linux '+T.host+' 6.8.0-45-generic #45-Ubuntu SMP x86_64 GNU/Linux\n':'Linux\n'}});
R('echo',function(T,a){var n=false;if(a[0]==='-n'){n=true;a=a.slice(1)}return {out:a.join(' ')+(n?'':'\n')}});
R('cd',function(T,a){
  var p=a[0]||'~',n=T.get(p);
  if(p==='-')return {out:''};
  if(!n)return {err:'bash: cd: '+p+': Arquivo ou diretório inexistente\n',code:1};
  if(n.t!=='d')return {err:'bash: cd: '+p+': Não é um diretório\n',code:1};
  if(!T.can(n,'x'))return {err:'bash: cd: '+p+': Permissão negada\n',code:1};
  T.cwd=T.abs(p);T.vars.PWD=T.cwd;return {out:''};
});
function fmtL(T,name,n){
  var sz=n.t==='d'?4096:n.d.length;
  return T.modeStr(n)+' '+(n.t==='d'?'2':'1')+' '+n.o+' '+n.g+' '+String(sz).padStart(5)+' '+DATE+' '+name;
}
R('ls',function(T,a){
  var o=opts(a,{}),out='',err='',paths=o.a.length?o.a:['.'];
  var multi=paths.length>1;
  paths.forEach(function(p,i){
    var n=T.get(p);
    if(!n){err+="ls: não foi possível acessar '"+p+"': Arquivo ou diretório inexistente\n";return}
    if(n.t==='f'){out+=(o.f.l?fmtL(T,p,n):p)+'\n';return}
    if(!T.can(n,'r')){err+="ls: não foi possível abrir o diretório '"+p+"': Permissão negada\n";return}
    if(multi)out+=(i?'\n':'')+p+':\n';
    var names=Object.keys(n.c).sort(function(x,y){return x.replace(/^\./,'').toLowerCase()<y.replace(/^\./,'').toLowerCase()?-1:1});
    if(!o.f.a)names=names.filter(function(k){return k[0]!=='.'});
    if(o.f.l){var tot=0;names.forEach(function(k){tot+=n.c[k].t==='d'?4:Math.max(4,Math.ceil(n.c[k].d.length/1024)*4)});if(o.f.a){names.unshift('.','..')}
      out+='total '+tot+'\n';names.forEach(function(k){var c=k==='.'||k==='..'?n:n.c[k];out+=fmtL(T,k,c)+'\n'})}
    else{if(o.f.a)names.unshift('.','..');out+=names.map(function(k){return k}).join('  ')+(names.length?'\n':'')}
  });
  return {out:out,err:err,code:err?2:0};
});
R('cat',function(T,a,inp){
  if(!a.length)return {out:inp||''};
  var out='',err='';
  a.forEach(function(p){var n=T.get(p);if(!n)err+='cat: '+p+': Arquivo ou diretório inexistente\n';else if(n.t==='d')err+='cat: '+p+': É um diretório\n';else if(!T.can(n,'r'))err+='cat: '+p+': Permissão negada\n';else out+=n.d});
  return {out:out,err:err};
});
function mkd(T,p,parents){
  var ps=T.parts(p),n=T.fs,i;
  if(parents){for(i=0;i<ps.length;i++){if(!n.c[ps[i]]){if(!T.can(n,'w'))return "mkdir: não foi possível criar o diretório '"+p+"': Permissão negada";n.c[ps[i]]={t:'d',c:{},m:0o755,o:T.eff,g:T.eff==='root'?'root':T.user}}else if(n.c[ps[i]].t!=='d')return "mkdir: não foi possível criar o diretório '"+p+"': Não é um diretório";n=n.c[ps[i]]}return ''}
  var pr=T.parent(p);if(!pr)return "mkdir: não foi possível criar o diretório '"+p+"': Arquivo ou diretório inexistente";
  if(pr.dir.c[pr.name])return "mkdir: não foi possível criar o diretório '"+p+"': O arquivo já existe";
  if(!T.can(pr.dir,'w'))return "mkdir: não foi possível criar o diretório '"+p+"': Permissão negada";
  pr.dir.c[pr.name]={t:'d',c:{},m:0o755,o:T.eff,g:T.eff==='root'?'root':T.user};return '';
}
R('mkdir',function(T,a){var o=opts(a,{}),err='';if(!o.a.length)return {err:'mkdir: falta operando\n'};o.a.forEach(function(p){var e=mkd(T,p,o.f.p);if(e)err+=e+'\n'});return {err:err}});
R('touch',function(T,a){var err='';a.forEach(function(p){var n=T.get(p);if(n)return;var r=T.writeFile(p,'',false);if(r)err+="touch: não foi possível tocar '"+p+"': "+r.split(': ').pop()+'\n'});return {err:err}});
R('rmdir',function(T,a){var err='';a.forEach(function(p){var n=T.get(p),pr=T.parent(p);if(!n)err+="rmdir: falha ao remover '"+p+"': Arquivo ou diretório inexistente\n";else if(n.t!=='d')err+="rmdir: falha ao remover '"+p+"': Não é um diretório\n";else if(Object.keys(n.c).length)err+="rmdir: falha ao remover '"+p+"': O diretório não está vazio\n";else if(!T.can(pr.dir,'w'))err+="rmdir: falha ao remover '"+p+"': Permissão negada\n";else delete pr.dir.c[pr.name]});return {err:err}});
R('rm',function(T,a){
  var o=opts(a,{}),err='',r=o.f.r||o.f.R||o.f.recursive;
  o.a.forEach(function(p){
    var n=T.get(p),pr=T.parent(p);
    if(!n){if(!o.f.f)err+="rm: não foi possível remover '"+p+"': Arquivo ou diretório inexistente\n";return}
    if(!pr){err+="rm: não é possível remover '"+p+"'\n";return}
    if(n.t==='d'&&!r){err+="rm: não foi possível remover '"+p+"': É um diretório\n";return}
    if(T.abs(p)==='/'){err+="rm: é perigoso operar recursivamente em '/'\n";return}
    if(!T.can(pr.dir,'w')){err+="rm: não foi possível remover '"+p+"': Permissão negada\n";return}
    delete pr.dir.c[pr.name];
  });
  return {err:err};
});
function cpmv(T,a,move){
  var o=opts(a,{}),r=o.f.r||o.f.R,name=move?'mv':'cp';
  if(o.a.length<2)return {err:name+': falta o operando de destino\n'};
  var dst=o.a[o.a.length-1],srcs=o.a.slice(0,-1),dn=T.get(dst),err='';
  if(srcs.length>1&&(!dn||dn.t!=='d'))return {err:name+": o alvo '"+dst+"' não é um diretório\n"};
  srcs.forEach(function(s){
    var n=T.get(s);
    if(!n){err+=name+": não foi possível obter estado de '"+s+"': Arquivo ou diretório inexistente\n";return}
    if(n.t==='d'&&!r&&!move){err+=name+": -r não especificado; omitindo o diretório '"+s+"'\n";return}
    if(!T.can(n,'r')&&!move){err+=name+": não foi possível abrir '"+s+"' para leitura: Permissão negada\n";return}
    var target,tname;
    if(dn&&dn.t==='d'){target=dn;tname=T.parts(s).pop()}
    else{var pr=T.parent(dst);if(!pr){err+=name+": não foi possível criar '"+dst+"'\n";return}target=pr.dir;tname=pr.name}
    if(!T.can(target,'w')){err+=name+": não foi possível criar '"+dst+"': Permissão negada\n";return}
    var c=clone(n);if(!move){c.o=T.eff;c.g=T.eff==='root'?'root':T.user}
    if(move){var sp=T.parent(s);if(!T.can(sp.dir,'w')){err+="mv: não foi possível mover '"+s+"': Permissão negada\n";return}delete sp.dir.c[sp.name]}
    target.c[tname]=c;
  });
  return {err:err};
}
R('cp',function(T,a){return cpmv(T,a,false)});
R('mv',function(T,a){return cpmv(T,a,true)});
function lines(s){if(!s)return [];var l=s.split('\n');if(l[l.length-1]==='')l.pop();return l}
function getIn(T,a,inp,cmd){
  if(!a.length)return {txt:inp||''};
  var t='';for(var i=0;i<a.length;i++){var n=T.get(a[i]);if(!n)return {err:cmd+': '+a[i]+': Arquivo ou diretório inexistente\n'};if(n.t==='d')return {err:cmd+': '+a[i]+': É um diretório\n'};if(!T.can(n,'r'))return {err:cmd+': '+a[i]+': Permissão negada\n'};t+=n.d}return {txt:t};
}
function numOpt(a){var n=10,rest=[];for(var i=0;i<a.length;i++){if(a[i]==='-n'){n=parseInt(a[++i],10)}else if(/^-n\d+$/.test(a[i]))n=parseInt(a[i].slice(2),10);else if(/^-\d+$/.test(a[i]))n=-parseInt(a[i],10);else rest.push(a[i])}return {n:n,rest:rest}}
R('head',function(T,a,inp){var o=numOpt(a),g=getIn(T,o.rest,inp,'head');if(g.err)return g;return {out:lines(g.txt).slice(0,o.n).join('\n')+(g.txt?'\n':'')}});
R('tail',function(T,a,inp){var o=numOpt(a),g=getIn(T,o.rest,inp,'tail');if(g.err)return g;var l=lines(g.txt);return {out:l.slice(Math.max(0,l.length-o.n)).join('\n')+(l.length?'\n':'')}});
R('wc',function(T,a,inp){
  var o=opts(a,{}),g=getIn(T,o.a,inp,'wc');if(g.err)return g;var t=g.txt;
  var L=(t.match(/\n/g)||[]).length,W=(t.trim()?t.trim().split(/\s+/).length:0),C=t.length;
  var parts=[];if(o.f.l)parts.push(L);if(o.f.w)parts.push(W);if(o.f.c||o.f.m)parts.push(C);if(!parts.length)parts=[L,W,C];
  return {out:parts.join(' ')+(o.a.length?' '+o.a[0]:'')+'\n'};
});
R('grep',function(T,a,inp){
  var o=opts(a,{}),pat=o.a.shift();if(pat==null)return {err:'uso: grep [OPÇÃO]... PADRÕES [ARQUIVO]...\n',code:2};
  var g=getIn(T,o.a,inp,'grep');if(g.err)return {err:g.err.replace('grep: ','grep: '),code:2};
  var re;try{re=new RegExp(o.f.E||o.f.e?pat:pat.replace(/[+?{}()|]/g,'\\$&'),o.f.i?'i':'')}catch(e){return {err:'grep: expressão regular inválida\n',code:2}}
  var res=lines(g.txt).map(function(l,i){return {l:l,i:i+1}}).filter(function(x){return re.test(x.l)!==!!o.f.v});
  if(o.f.c)return {out:res.length+'\n',code:res.length?0:1};
  return {out:res.map(function(x){return (o.f.n?x.i+':':'')+x.l}).join('\n')+(res.length?'\n':''),code:res.length?0:1};
});
R('sort',function(T,a,inp){
  var o=opts(a,{num:1}),g=getIn(T,o.a,inp,'sort');if(g.err)return g;var l=lines(g.txt);
  var fn=o.f.n?function(x,y){return (parseFloat(x)||0)-(parseFloat(y)||0)||(x<y?-1:x>y?1:0)}:function(x,y){var X=x.toLowerCase(),Y=y.toLowerCase();return X<Y?-1:X>Y?1:(x<y?-1:x>y?1:0)};
  l.sort(fn);if(o.f.r)l.reverse();if(o.f.u)l=l.filter(function(x,i){return i===0||x!==l[i-1]});
  return {out:l.join('\n')+(l.length?'\n':'')};
});
R('uniq',function(T,a,inp){
  var o=opts(a,{}),g=getIn(T,o.a,inp,'uniq');if(g.err)return g;var out=[];
  lines(g.txt).forEach(function(l){var p=out[out.length-1];if(p&&p.l===l)p.c++;else out.push({l:l,c:1})});
  return {out:out.map(function(x){return (o.f.c?String(x.c).padStart(7)+' ':'')+x.l}).join('\n')+(out.length?'\n':'')};
});
R('cut',function(T,a,inp){
  var d='\t',f=null,rest=[];
  for(var i=0;i<a.length;i++){if(a[i]==='-d'){d=a[++i]}else if(/^-d./.test(a[i]))d=a[i].slice(2);else if(a[i]==='-f'){f=a[++i]}else if(/^-f./.test(a[i]))f=a[i].slice(2);else rest.push(a[i])}
  var g=getIn(T,rest,inp,'cut');if(g.err)return g;if(!f)return {err:'cut: você deve especificar uma lista de bytes, caracteres ou campos\n'};
  var idx=[];f.split(',').forEach(function(p){var m=/^(\d+)-(\d*)$/.exec(p);if(m){for(var k=+m[1];k<=(m[2]?+m[2]:20);k++)idx.push(k)}else idx.push(+p)});
  return {out:lines(g.txt).map(function(l){var s=l.split(d);return idx.filter(function(k){return k<=s.length}).map(function(k){return s[k-1]}).join(d)}).join('\n')+'\n'};
});
R('tr',function(T,a,inp){
  var o=opts(a,{});if(o.f.d&&o.a[0]){var re=new RegExp('['+o.a[0].replace(/[\]\\^]/g,'\\$&')+']','g');return {out:(inp||'').replace(re,'')}}
  if(o.a.length<2)return {err:'tr: falta operando\n'};
  var A=o.a[0],B=o.a[1];function ex(s){return s.replace(/a-z/g,'abcdefghijklmnopqrstuvwxyz').replace(/A-Z/g,'ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
  A=ex(A);B=ex(B);var out='';for(var i=0;i<(inp||'').length;i++){var k=A.indexOf(inp[i]);out+=k>-1?B[Math.min(k,B.length-1)]:inp[i]}return {out:out};
});
R('tee',function(T,a,inp){var o=opts(a,{});o.a.forEach(function(p){T.writeFile(p,inp||'',!!o.f.a)});return {out:inp||''}});
R('find',function(T,a){
  var start=a[0]&&a[0][0]!=='-'?a[0]:'.',name=null,type=null;
  for(var i=0;i<a.length;i++){if(a[i]==='-name')name=a[++i];if(a[i]==='-type')type=a[++i]}
  var re=name?new RegExp('^'+name.replace(/[.+^${}()|\\[\]]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.')+'$'):null,out=[];
  var root=T.get(start);if(!root)return {err:"find: '"+start+"': Arquivo ou diretório inexistente\n",code:1};
  (function walk(n,p,nm){
    var ok=(!re||re.test(nm))&&(!type||(type==='d'&&n.t==='d')||(type==='f'&&n.t==='f'));if(ok)out.push(p);
    if(n.t==='d')Object.keys(n.c).sort().forEach(function(k){walk(n.c[k],(p==='/'?'':p)+'/'+k,k)});
  })(root,start==='.'?'.':start.replace(/\/$/,''),start.split('/').pop());
  return {out:out.join('\n')+(out.length?'\n':'')};
});
R('chmod',function(T,a){
  if(a.length<2)return {err:'chmod: falta operando\n'};
  var spec=a[0],err='',o=opts(a,{});var r=o.f.R;var files=a.slice(1).filter(function(x){return x!=='-R'});spec=a.filter(function(x){return x!=='-R'})[0];files=a.filter(function(x){return x!=='-R'}).slice(1);
  files.forEach(function(p){
    var n=T.get(p);if(!n){err+="chmod: não foi possível acessar '"+p+"': Arquivo ou diretório inexistente\n";return}
    if(T.eff!=='root'&&n.o!==T.eff){err+="chmod: alterando as permissões de '"+p+"': Operação não permitida\n";return}
    function app(n){
      if(/^[0-7]{3,4}$/.test(spec))n.m=parseInt(spec.slice(-3),8);
      else{
        spec.split(',').forEach(function(cl){
          var m=/^([ugoa]*)([-+=])([rwxXst]*)$/.exec(cl);if(!m){err+="chmod: modo inválido: '"+spec+"'\n";return}
          var who=m[1]||'a',bits=0;if(m[3].indexOf('r')>-1)bits|=4;if(m[3].indexOf('w')>-1)bits|=2;if(m[3].indexOf('x')>-1||(m[3].indexOf('X')>-1&&(n.t==='d'||(n.m&0o111))))bits|=1;
          var mask=0,val=0;if(who.indexOf('a')>-1)who='ugo';
          who.split('').forEach(function(w){var sh={u:6,g:3,o:0}[w];mask|=7<<sh;val|=bits<<sh});
          if(m[2]==='+')n.m|=val;else if(m[2]==='-')n.m&=~val;else n.m=(n.m&~mask)|val;
        });
      }
      if(r&&n.t==='d')Object.keys(n.c).forEach(function(k){app(n.c[k])});
    }
    app(n);
  });
  return {err:err};
});
R('chown',function(T,a){
  if(a.length<2)return {err:'chown: falta operando\n'};if(T.eff!=='root')return {err:"chown: alterando o dono de '"+a[a.length-1]+"': Operação não permitida\n"};
  var o=opts(a,{}),spec=o.a[0],ow=spec.split(':'),err='';
  o.a.slice(1).forEach(function(p){var n=T.get(p);if(!n){err+="chown: não foi possível acessar '"+p+"': Arquivo ou diretório inexistente\n";return}
    function app(n){if(ow[0])n.o=ow[0];if(ow[1])n.g=ow[1];if(o.f.R&&n.t==='d')Object.keys(n.c).forEach(function(k){app(n.c[k])})}app(n)});
  return {err:err};
});
R('stat',function(T,a){var n=T.get(a[0]||'');if(!n)return {err:"stat: não foi possível obter estado de '"+(a[0]||'')+"': Arquivo ou diretório inexistente\n",code:1};
  return {out:'  Arquivo: '+a[0]+'\n  Tamanho: '+(n.t==='d'?4096:n.d.length)+'\tTipo: '+(n.t==='d'?'diretório':'arquivo comum')+'\nAcesso: ('+('0'+(n.m&0o777).toString(8)).slice(-4)+'/'+T.modeStr(n)+')  Uid: ('+n.o+')   Gid: ('+n.g+')\n'}});
R('umask',function(T){return {out:'0022\n'}});
R('history',function(T){return {out:T.hist.slice(0,-1).map(function(l,i){return String(i+1).padStart(5)+'  '+l}).join('\n')+'\n'}});
R('export',function(T,a){a.forEach(function(x){var m=/^([^=]+)=(.*)$/.exec(x);if(m)T.vars[m[1]]=m[2]});return {out:''}});
R('env',function(T){return {out:Object.keys(T.vars).map(function(k){return k+'='+T.vars[k]}).join('\n')+'\n'}});
R('which',function(T,a){return Term.cmds[a[0]]?{out:'/usr/bin/'+a[0]+'\n'}:{code:1}});
R('man',function(T,a){return {out:'Sem manual neste simulador. Use "'+(a[0]||'comando')+' --help" no Linux real, ou consulte o Notion do módulo.\n'}});
R('true',function(){return {out:'',code:0}});R('false',function(){return {out:'',code:1}});
R('ps',function(T){return {out:'    PID TTY          TIME CMD\n   1042 pts/0    00:00:00 bash\n   1180 pts/0    00:00:00 ps\n'}});

/* ---------- interface ---------- */
K.Term=Term;
K.termUI=function(cfg){
  var D=K.data(),key='docker:'+D.id,S=K.store.get(key,{})||{};
  var term=new Term(cfg.term);
  var box=K.$('#tbox'),inp=K.$('#tin'),ps=K.$('#tps'),taskBox=K.$('#tasks'),tasks=cfg.tasks,done=S.done||{},hi=-1;
  window.__term=term;
  function prompt(){var cw=term.cwd===term.home?'~':term.cwd.indexOf(term.home+'/')===0?'~'+term.cwd.slice(term.home.length):term.cwd;return '<span class="ps">'+term.eff+'@'+term.host+'</span>:<span class="ps">'+K.esc(cw)+'</span>'+(term.eff==='root'?'#':'$')}
  function setPs(){ps.innerHTML=prompt()}
  function print(h){var d=K.el('div',{class:'ln'},h);box.appendChild(d);box.scrollTop=box.scrollHeight}
  function check(){
    tasks.forEach(function(t,i){if(done[i])return;try{if(test(t.check))done[i]=1}catch(e){}});
    S.done=done;K.store.set(key,S);renderTasks();
  }
  function test(c){
    var T=term;
    switch(c.type){
      case 'cwd':return T.cwd===c.path;
      case 'exists':{var n=T.get(c.path);return !!n&&(!c.kind||n.t===c.kind)}
      case 'absent':return !T.get(c.path);
      case 'content':{var n2=T.get(c.path);return !!n2&&n2.t==='f'&&(c.eq!=null?n2.d.trim()===c.eq.trim():n2.d.indexOf(c.inc)>-1)}
      case 'mode':{var n3=T.get(c.path);return !!n3&&(n3.m&0o7777).toString(8)===c.mode}
      case 'owner':{var n4=T.get(c.path);return !!n4&&n4.o===c.owner&&(!c.group||n4.g===c.group)}
      case 'ran':return T.hist.some(function(h){return new RegExp(c.re).test(h.trim())});
      case 'out':return T.outs.some(function(o){return new RegExp(c.re,'m').test(o)});
      case 'js':return !!(new Function('T','S',c.code))(T,T.state);
    }
    return false;
  }
  var hintOpen={};
  function renderTasks(){
    var n=Object.keys(done).length;
    K.$('#bar').style.width=K.pct(n,tasks.length)+'%';
    K.$('#stats').innerHTML='<span><b>'+n+'</b> de '+tasks.length+' tarefas concluídas</span>'+(n===tasks.length?'<span class="pill ok">Desafio completo</span>':'');
    var first=-1;tasks.forEach(function(t,i){if(!done[i]&&first<0)first=i});
    taskBox.innerHTML=tasks.map(function(t,i){
      return '<div class="task'+(done[i]?' done':i===first?' cur':'')+'"><span class="chk">✓</span><div style="flex:1"><div>'+(i+1)+'. '+t.text+'</div>'+
        (!done[i]?'<div class="row" style="margin-top:6px"><button class="btn ghost sm" type="button" data-h="'+i+'" style="padding:2px 0;font-size:12.5px">'+(hintOpen[i]?'Esconder dica':'Dica')+'</button></div>':'')+
        (hintOpen[i]&&!done[i]?'<div class="note acc" style="margin:6px 0 0"><b>Dica:</b> '+t.hint+'</div>':'')+'</div></div>';
    }).join('');
    K.$$('[data-h]',taskBox).forEach(function(b){b.onclick=function(){var i=b.getAttribute('data-h');hintOpen[i]=!hintOpen[i];renderTasks()}});
  }
  function submit(line){
    print('<span class="ps">'+prompt()+'</span> '+K.esc(line));
    if(!line.trim()){return}
    var out=term.run(line);
    if(term.__clear){box.innerHTML='';term.__clear=false}
    if(out)print(K.esc(out.replace(/\n$/,'')).replace(/\n/g,'\n'));
    setPs();check();
  }
  var hist=[];
  inp.addEventListener('keydown',function(e){
    if(e.key==='Enter'){var l=inp.value;if(l.trim())hist.push(l);hi=hist.length;inp.value='';submit(l);e.preventDefault()}
    else if(e.key==='ArrowUp'){if(hi>0){hi--;inp.value=hist[hi]}e.preventDefault()}
    else if(e.key==='ArrowDown'){if(hi<hist.length-1){hi++;inp.value=hist[hi]}else{hi=hist.length;inp.value=''}e.preventDefault()}
    else if(e.key==='Tab'){e.preventDefault();var v=inp.value,m=/(\S*)$/.exec(v)[1],isCmd=v.trim()===m;
      var cands=[];if(isCmd&&m.indexOf('/')<0){cands=Object.keys(Term.cmds).filter(function(c){return c.indexOf(m)===0})}
      else{var sl=m.lastIndexOf('/'),d=m.slice(0,sl+1),pre=m.slice(sl+1),dn=term.get(d||'.');if(dn&&dn.t==='d')cands=Object.keys(dn.c).filter(function(k){return k.indexOf(pre)===0}).map(function(k){return d+k+(dn.c[k].t==='d'?'/':'')})}
      if(cands.length===1)inp.value=v.slice(0,v.length-m.length)+cands[0]+(cands[0].slice(-1)==='/'?'':' ');
      else if(cands.length>1){print(K.esc(cands.join('  ')))}}
  });
  box.addEventListener('click',function(){inp.focus()});
  K.$('#treset').onclick=function(){term.reset();box.innerHTML='';banner();setPs()};
  K.$('#tclear').onclick=function(){if(confirm('Zerar o progresso das tarefas?')){done={};S={};K.store.del(key);renderTasks()}};
  function banner(){print('<span class="dim">'+cfg.banner+'</span>')}
  banner();setPs();renderTasks();
  if(cfg.after)cfg.after(term,submit);
};
})();
