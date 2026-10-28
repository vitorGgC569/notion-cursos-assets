/* Modelo didatico do Git (Modulo 8). Nao e o Git: cobre init, add, commit, status, branch, switch/checkout,
   merge (ff, --no-ff, tres vias, conflito), rebase linear, reset, revert, stash, tag, log. Arquivos de uma linha. */
(function(root){
'use strict';
function Repo(){this.reset0()}
Repo.prototype.reset0=function(){
  this.c={};this.n=0;this.br={};this.head={b:'main',id:null};this.tags={};this.wt={};this.idx={};this.merging=null;this.stash=[];this.init=false;
};
function cp(o){var r={},k;for(k in o)r[k]=o[k];return r}
function same(a,b){var k;for(k in a)if(a[k]!==b[k])return false;for(k in b)if(!(k in a))return false;return true}
function hash(s){var h=5381,i,x='';for(i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;
  var a=h.toString(16);while(a.length<8)a='0'+a;var h2=2166136261;for(i=0;i<s.length;i++){h2^=s.charCodeAt(i);h2=Math.imul(h2,16777619)>>>0}
  return (a+h2.toString(16)+'00000000').slice(0,7)}
Repo.prototype.tip=function(){return this.head.b?this.br[this.head.b]||null:this.head.id};
Repo.prototype.tree=function(id){return id?this.c[id].tree:{}};
Repo.prototype.anc=function(id){var s={},st=id?[id]:[],x;while(st.length){x=st.pop();if(s[x])continue;s[x]=1;this.c[x].p.forEach(function(p){st.push(p)})}return s};
Repo.prototype.mk=function(msg,parents,tree){
  this.n++;var id=hash(msg+'|'+parents.join(',')+'|'+JSON.stringify(tree)+'|'+this.n);
  this.c[id]={id:id,msg:msg,p:parents,tree:cp(tree),n:this.n};return id};
Repo.prototype.resolve=function(ref){
  var m,base,k=0,id;if(ref==null||ref==='')return null;
  m=ref.match(/^(.*?)((?:~\d*|\^)*)$/);base=m[1]||'HEAD';var suf=m[2];
  if(base==='HEAD')id=this.tip();else if(this.br[base])id=this.br[base];else if(this.tags[base])id=this.tags[base];
  else{var hit=Object.keys(this.c).filter(function(h){return h.indexOf(base)===0});if(hit.length===1)id=hit[0];else return undefined}
  var re=/~(\d*)|\^/g,t;while((t=re.exec(suf))){var cnt=t[0]==='^'?1:(t[1]===''?1:parseInt(t[1],10));
    while(cnt-->0){if(!id||!this.c[id].p.length)return undefined;id=this.c[id].p[0]}}
  return id};
function lines(a){return a.join('\n')}
Repo.prototype.statusEntries=function(){
  var self=this,h=this.tree(this.tip()),out=[],names={},k;
  [h,this.idx,this.wt].forEach(function(t){for(k in t)names[k]=1});
  var tracked=cp(h);for(k in this.idx)tracked[k]=1;
  Object.keys(names).sort().forEach(function(f){
    var inH=f in h,inI=f in self.idx,inW=f in self.wt;
    if(self.merging&&self.merging.conf[f]){out.push('UU '+f);return}
    if(!inH&&!inI&&inW){return}
    var x=' ',y=' ';
    if(inI&&!inH)x='A';else if(inH&&!inI)x='D';else if(inH&&inI&&h[f]!==self.idx[f])x='M';
    if(inI&&!inW)y='D';else if(inI&&inW&&self.idx[f]!==self.wt[f])y='M';
    if(x!==' '||y!==' ')out.push(x+y+' '+f)});
  Object.keys(this.wt).sort().forEach(function(f){if(!(f in h)&&!(f in self.idx))out.push('?? '+f)});
  return out};
Repo.prototype.clean=function(){return this.statusEntries().filter(function(l){return l.indexOf('??')!==0}).length===0};
Repo.prototype.decor=function(id){
  var d=[],self=this,tip=this.tip();
  if(id===tip){d.push(this.head.b?'HEAD -> '+this.head.b:'HEAD')}
  Object.keys(this.br).sort().forEach(function(b){if(self.br[b]===id&&!(self.head.b===b&&id===tip))d.push(b)});
  Object.keys(this.tags).sort().forEach(function(t){if(self.tags[t]===id)d.push('tag: '+t)});
  return d.length?' ('+d.join(', ')+')':''};
Repo.prototype.order=function(starts){
  var seen={},list=[],st=starts.slice(),self=this;
  while(st.length){var x=st.pop();if(!x||seen[x])continue;seen[x]=1;list.push(x);self.c[x].p.forEach(function(p){st.push(p)})}
  return list.sort(function(a,b){return self.c[b].n-self.c[a].n})};
Repo.prototype.log=function(opt,ref){
  var self=this,starts;
  if(opt.all)starts=Object.keys(this.br).map(function(b){return self.br[b]}).concat([this.tip()]);
  else{var r=ref?this.resolve(ref):this.tip();if(r===undefined)return {err:"fatal: ambiguous argument '"+ref+"': unknown revision or path not in the working tree."};starts=[r]}
  starts=starts.filter(Boolean);
  if(!starts.length)return {err:"fatal: your current branch '"+this.head.b+"' does not have any commits yet"};
  var ord=this.order(starts),out=[],cols=[];
  function toks(){return cols.map(function(c){return c?'|':' '})}
  ord.forEach(function(id){
    var c=self.c[id],label=(opt.oneline?id+self.decor(id)+' '+c.msg:'');
    if(!opt.graph){
      if(opt.oneline)out.push(label);
      else{out.push('commit '+id+self.decor(id));if(c.p.length>1)out.push('Merge: '+c.p.map(function(p){return p.slice(0,7)}).join(' '));out.push('Author: Ana Dev <ana@exemplo.dev>');out.push('');out.push('    '+c.msg);out.push('')}
      return}
    var idxs=[];cols.forEach(function(x,j){if(x===id)idxs.push(j)});
    while(idxs.length>1){var kk=idxs.pop();out.push(toks().slice(0,kk).join(' ')+'/');cols.splice(kk,1)}
    var i;if(!idxs.length){cols.push(id);i=cols.length-1}else i=idxs[0];
    var t=toks();t[i]='*';out.push(t.join(' ')+' '+label);
    cols[i]=c.p[0]||null;
    if(c.p.length>1){var seenp=cols.indexOf(c.p[1]);
      if(seenp<0){cols.splice(i+1,0,c.p[1]);var row=toks();var left=row.slice(0,i+1).join(' ')+'\\';var right=row.slice(i+2).map(function(){return '|'}).join(' ');out.push((left+(right?' '+right:'')).replace(/\s+$/,''))}
    }
    while(cols.length&&!cols[cols.length-1])cols.pop()});
  return {out:lines(out)}};
/* ---- merge de arvores (arquivos de uma linha) ---- */
function merge3(base,o,t){var res={},conf={},names={},k;[base,o,t].forEach(function(x){for(k in x)names[k]=1});
  Object.keys(names).forEach(function(f){var b=base[f],a=o[f],c=t[f];
    if(a===c){if(a!==undefined)res[f]=a;return}
    if(a===b){if(c!==undefined)res[f]=c;return}
    if(c===b){if(a!==undefined)res[f]=a;return}
    conf[f]=1;res[f]='<<<<<<< HEAD\n'+(a===undefined?'':a)+'\n=======\n'+(c===undefined?'':c)+'\n>>>>>>> THEIRS'});
  return {tree:res,conf:conf}}
Repo.prototype.mergeBase=function(a,b){
  var A=this.anc(a),B=this.anc(b),best=null,k;for(k in A)if(B[k]&&(!best||this.c[k].n>this.c[best].n))best=k;return best};
function diff(from,to){var d={},k;for(k in from)if(to[k]!==from[k])d[k]=[from[k],to[k]];for(k in to)if(!(k in from))d[k]=[undefined,to[k]];return d}
Repo.prototype.apply=function(cur,from,to){var r=cp(cur),d=diff(from,to),f,bad=null;
  for(f in d){if(cur[f]!==d[f][0]&&cur[f]!==d[f][1]){bad=f;break}if(d[f][1]===undefined)delete r[f];else r[f]=d[f][1]}
  return bad?{bad:bad}:{tree:r}};
Repo.prototype.setTree=function(t){this.idx=cp(t);this.wt=cp(t)};
Repo.prototype.commitNow=function(msg,extra){
  var tip=this.tip(),parents=tip?[tip]:[];if(extra)parents=parents.concat(extra);
  var id=this.mk(msg,parents,this.idx);if(this.head.b)this.br[this.head.b]=id;else this.head.id=id;return id};
Repo.prototype.exists=function(f){return f in this.wt};
function ok(o){return {out:o||''}}function er(e){return {err:e}}
var SHORT=function(id){return id.slice(0,7)};
/* ---- shell + git ---- */
Repo.prototype.exec=function(line){
  line=line.trim();if(!line)return ok();
  var m,self=this;
  if(m=line.match(/^echo\s+(?:"([^"]*)"|'([^']*)'|(\S+))\s*(>>?)\s*(\S+)$/)){
    var txt=m[1]!==undefined?m[1]:m[2]!==undefined?m[2]:m[3];var f=m[5];
    if(m[4]==='>>'&&f in this.wt)this.wt[f]=this.wt[f]+'\n'+txt;else this.wt[f]=txt;return ok()}
  if(m=line.match(/^touch\s+(\S+)$/)){if(!(m[1] in this.wt))this.wt[m[1]]='';return ok()}
  if(m=line.match(/^rm\s+(\S+)$/)){if(!(m[1] in this.wt))return er("rm: cannot remove '"+m[1]+"': No such file or directory");delete this.wt[m[1]];return ok()}
  if(m=line.match(/^cat\s+(\S+)$/)){if(!(m[1] in this.wt))return er('cat: '+m[1]+': No such file or directory');return ok(this.wt[m[1]])}
  if(line==='ls'){return ok(Object.keys(this.wt).sort().join('\n'))}
  if(line==='clear')return {clear:true};
  if(line==='help')return ok('Comandos de shell: echo "texto" > arq, echo "texto" >> arq, touch arq, rm arq, cat arq, ls, clear.\nGit: init, add, commit -m, status [-s], branch, switch, checkout, merge [--no-ff], rebase, reset, revert, stash, tag, log [--oneline] [--graph] [--all].');
  if(!/^git(\s|$)/.test(line))return er('bash: '+line.split(/\s+/)[0]+': command not found (este simulador entende só echo, touch, rm, cat, ls e git)');
  var args=(line.match(/"[^"]*"|'[^']*'|\S+/g)||[]).slice(1).map(function(a){return a.replace(/^["']|["']$/g,'')});
  var cmd=args.shift();if(!cmd)return ok('usage: git <command> [<args>]');
  if(cmd==='init'){if(this.init)return ok('Reinitialized existing Git repository');this.init=true;return ok('Initialized empty Git repository in /projeto/.git/\nhint: a branch inicial é main (init.defaultBranch)')}
  if(!this.init)return er('fatal: not a git repository (or any of the parent directories): .git');
  var fn=this['g_'+cmd.replace(/-/g,'_')];if(!fn)return er("git: '"+cmd+"' is not a git command neste simulador. Veja 'help'.");
  return fn.call(this,args)};
Repo.prototype.g_add=function(a){
  var self=this,h=this.tree(this.tip());if(!a.length)return er("Nothing specified, nothing added.");
  var files=a.indexOf('.')>=0||a.indexOf('-A')>=0||a.indexOf('--all')>=0?Object.keys(this.wt).concat(Object.keys(this.idx)).filter(function(x,i,s){return s.indexOf(x)===i}):a;
  for(var i=0;i<files.length;i++){var f=files[i];
    if(!(f in this.wt)&&!(f in this.idx))return er("fatal: pathspec '"+f+"' did not match any files");
    if(f in this.wt)this.idx[f]=this.wt[f];else delete this.idx[f];
    if(this.merging&&this.merging.conf[f])delete this.merging.conf[f]}
  return ok()};
Repo.prototype.g_rm=function(a){var f=a.filter(function(x){return x[0]!=='-'})[0];if(!(f in this.idx))return er("fatal: pathspec '"+f+"' did not match any files");
  delete this.idx[f];if(a.indexOf('--cached')<0)delete this.wt[f];return ok("rm '"+f+"'")};
Repo.prototype.g_status=function(a){
  var e=this.statusEntries(),short=a.indexOf('-s')>=0||a.indexOf('--short')>=0||a.indexOf('-sb')>=0;
  if(short)return ok(e.join('\n'));
  var o=[this.head.b?'On branch '+this.head.b:'HEAD detached at '+SHORT(this.head.id)];
  if(!this.tip())o.push('\nNo commits yet');
  if(this.merging){o.push('You have unmerged paths.\n  (fix conflicts and run "git commit")')}
  var st=e.filter(function(l){return /^[AMD]/.test(l)}),ns=e.filter(function(l){return /^.[MD]/.test(l)&&!/^UU/.test(l)}),un=e.filter(function(l){return l.indexOf('??')===0}),cf=e.filter(function(l){return l.indexOf('UU')===0});
  var N={A:'new file:   ',M:'modified:   ',D:'deleted:    '};
  if(st.length){o.push('\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)');st.forEach(function(l){o.push('\t'+N[l[0]]+l.slice(3))})}
  if(cf.length){o.push('\nUnmerged paths:');cf.forEach(function(l){o.push('\tboth modified:   '+l.slice(3))})}
  if(ns.length){o.push('\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)');ns.forEach(function(l){o.push('\t'+N[l[1]]+l.slice(3))})}
  if(un.length){o.push('\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)');un.forEach(function(l){o.push('\t'+l.slice(3))})}
  if(!e.length)o.push(this.tip()?'nothing to commit, working tree clean':'nothing to commit (create/copy files and use "git add" to track)');
  else if(!st.length&&!cf.length)o.push('\nno changes added to commit (use "git add" and/or "git commit -a")');
  return ok(o.join('\n'))};
Repo.prototype.g_commit=function(a){
  var msg=null,i,all=false,amend=false;
  for(i=0;i<a.length;i++){if(a[i]==='-m')msg=a[++i];else if(a[i]==='-a'||a[i]==='-am'){all=true;if(a[i]==='-am')msg=a[++i]}else if(a[i]==='--amend')amend=true}
  if(all)for(var f in this.idx){if(f in this.wt)this.idx[f]=this.wt[f];else delete this.idx[f]}
  if(this.merging&&Object.keys(this.merging.conf).length)return er('error: Committing is not possible because you have unmerged files.');
  if(this.merging){var mg=this.merging;msg=msg||"Merge branch '"+mg.name+"'";var id=this.commitNow(msg,[mg.other]);this.merging=null;return ok('['+(this.head.b||'HEAD')+' '+SHORT(id)+'] '+msg)}
  if(amend){var tip=this.tip();if(!tip)return er('fatal: You have nothing to amend.');var c=this.c[tip];var nid=this.mk(msg||c.msg,c.p,this.idx);if(this.head.b)this.br[this.head.b]=nid;else this.head.id=nid;return ok('['+this.head.b+' '+SHORT(nid)+'] '+(msg||c.msg))}
  if(!msg)return er('Aborting commit due to empty commit message. Use: git commit -m "mensagem"');
  var h=this.tree(this.tip());
  if(same(h,this.idx))return ok('On branch '+this.head.b+'\n'+(this.statusEntries().length?'no changes added to commit':'nothing to commit, working tree clean'));
  var d=Object.keys(diff(h,this.idx)).length,first=!this.tip();
  var id2=this.commitNow(msg);return ok('['+this.head.b+(first?' (root-commit)':'')+' '+SHORT(id2)+'] '+msg+'\n '+d+' file'+(d>1?'s':'')+' changed')};
Repo.prototype.g_branch=function(a){
  var self=this,del=a.indexOf('-d')>=0||a.indexOf('-D')>=0,rest=a.filter(function(x){return x[0]!=='-'});
  if(del){var b=rest[0];if(!(b in this.br))return er("error: branch '"+b+"' not found.");if(b===this.head.b)return er("error: cannot delete branch '"+b+"' used by worktree");
    if(a.indexOf('-d')>=0&&!this.anc(this.tip())[this.br[b]])return er("error: the branch '"+b+"' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D "+b+"'.");
    var id=this.br[b];delete this.br[b];return ok('Deleted branch '+b+' (was '+SHORT(id)+').')}
  if(!rest.length){return ok(Object.keys(this.br).sort().map(function(b){return (b===self.head.b?'* ':'  ')+b}).join('\n'))}
  if(!this.tip())return er("fatal: not a valid object name: '"+this.head.b+"'.");
  if(rest[0] in this.br)return er("fatal: a branch named '"+rest[0]+"' already exists");
  var from=rest[1]?this.resolve(rest[1]):this.tip();if(!from)return er("fatal: not a valid object name: '"+rest[1]+"'");
  this.br[rest[0]]=from;return ok()};
Repo.prototype.switchTo=function(name,create,start){
  var self=this;
  if(create){if(name in this.br)return er("fatal: a branch named '"+name+"' already exists");var s=start?this.resolve(start):this.tip();if(!s)return er('fatal: invalid reference');this.br[name]=s;
    this.head={b:name,id:null};return ok("Switched to a new branch '"+name+"'")}
  var target=this.br[name],detach=false;
  if(!target){var r=this.resolve(name);if(r)target=r,detach=true;else return er("fatal: invalid reference: "+name)}
  if(this.merging)return er('error: you need to resolve your current index first');
  var h=this.tree(this.tip()),t=this.tree(target),f;
  for(f in diff(h,t)){if(this.wt[f]!==this.idx[f]||this.idx[f]!==h[f])return er('error: Your local changes to the following files would be overwritten by checkout:\n\t'+f+'\nPlease commit your changes or stash them before you switch branches.')}
  var oldI=this.idx,nw={},ni=cp(t);
  for(f in t){nw[f]=(this.wt[f]===oldI[f]||!(f in this.wt))?t[f]:this.wt[f]}
  for(f in this.wt){if(!(f in t)&&!(f in h)&&!(f in oldI))nw[f]=this.wt[f];else if(!(f in t)&&f in h&&this.wt[f]!==h[f])nw[f]=this.wt[f]}
  for(f in oldI){if(oldI[f]!==h[f]&&(f in t)&&t[f]===h[f])ni[f]=oldI[f]}
  this.idx=ni;this.wt=nw;
  if(detach){this.head={b:null,id:target};return ok("Note: switching to '"+name+"'.\nYou are in 'detached HEAD' state.")}
  var same0=this.head.b===name;this.head={b:name,id:null};
  return ok(same0?"Already on '"+name+"'":"Switched to branch '"+name+"'")};
Repo.prototype.g_switch=function(a){var c=a.indexOf('-c')>=0,rest=a.filter(function(x){return x[0]!=='-'});if(!rest.length)return er('fatal: missing branch name');return this.switchTo(rest[0],c,rest[1])};
Repo.prototype.g_checkout=function(a){var c=a.indexOf('-b')>=0,rest=a.filter(function(x){return x[0]!=='-'});if(!rest.length)return er('fatal: missing branch name');return this.switchTo(rest[0],c,rest[1])};
Repo.prototype.g_merge=function(a){
  var noff=a.indexOf('--no-ff')>=0,rest=a.filter(function(x){return x[0]!=='-'}),name=rest[0];
  if(!name)return er('fatal: No remote for the current branch.');
  var other=this.br[name]||this.resolve(name);if(!other)return er(name+' - not something we can merge');
  if(!this.clean())return er('error: Your local changes would be overwritten by merge.\nPlease commit your changes or stash them before you merge.');
  var cur=this.tip();if(!cur){return er('fatal: não há commit nesta branch')}
  if(this.anc(cur)[other])return ok('Already up to date.');
  var base=this.mergeBase(cur,other);
  if(base===cur&&!noff){this.setTree(this.tree(other));if(this.head.b)this.br[this.head.b]=other;else this.head.id=other;
    return ok('Updating '+SHORT(cur)+'..'+SHORT(other)+'\nFast-forward')}
  var r=merge3(this.tree(base),this.tree(cur),this.tree(other));
  this.wt=cp(r.tree);this.idx=cp(r.tree);var self=this,cf=Object.keys(r.conf);
  if(cf.length){cf.forEach(function(f){self.idx[f]=self.tree(cur)[f]!==undefined?self.tree(cur)[f]:self.tree(other)[f]});
    this.merging={other:other,name:name,conf:r.conf};
    return {out:cf.map(function(f){return 'CONFLICT (content): Merge conflict in '+f}).join('\n')+'\nAutomatic merge failed; fix conflicts and then commit the result.',err:null}}
  var msg="Merge branch '"+name+"'"+(this.head.b&&this.head.b!=='main'?" into "+this.head.b:'');
  var id=this.commitNow(msg,[other]);return ok("Merge made by the 'ort' strategy. ("+SHORT(id)+')')};
Repo.prototype.g_rebase=function(a){
  var name=a.filter(function(x){return x[0]!=='-'})[0];if(!name)return er('fatal: faltou a branch de destino');
  var onto=this.br[name]||this.resolve(name);if(!onto)return er("fatal: invalid upstream '"+name+"'");
  if(!this.head.b)return er('fatal: não é possível fazer rebase com HEAD destacado neste simulador');
  if(!this.clean())return er('error: cannot rebase: You have unstaged changes.');
  var cur=this.tip();if(this.anc(cur)[onto])return ok('Current branch '+this.head.b+' is up to date.');
  var ancO=this.anc(onto),todo=[],self=this;
  this.order([cur]).forEach(function(id){if(!ancO[id]&&self.c[id].p.length<2)todo.push(id)});todo.reverse();
  if(this.anc(onto)[cur]===undefined&&this.mergeBase(cur,onto)===cur){this.setTree(this.tree(onto));this.br[this.head.b]=onto;return ok('Successfully rebased and updated refs/heads/'+this.head.b+'.')}
  var tip=onto,tree=cp(this.tree(onto));
  for(var i=0;i<todo.length;i++){var c=this.c[todo[i]],par=this.tree(c.p[0]);var r=this.apply(tree,par,c.tree);
    if(r.bad)return er('CONFLICT (content): Merge conflict in '+r.bad+'\nerror: este simulador não continua rebases com conflito; nada foi alterado.');
    tree=r.tree;tip=this.mk(c.msg,[tip],tree)}
  this.br[this.head.b]=tip;this.setTree(tree);return ok('Successfully rebased and updated refs/heads/'+this.head.b+'.')};
Repo.prototype.g_reset=function(a){
  var mode='mixed',rest=[];a.forEach(function(x){if(x==='--soft')mode='soft';else if(x==='--hard')mode='hard';else if(x==='--mixed')mode='mixed';else rest.push(x)});
  var tipId=this.tip();
  if(rest.length&&(rest[0] in this.wt||rest[0] in this.idx)&&this.resolve(rest[0])===undefined){delete this.idx[rest[0]];var h0=this.tree(tipId);if(rest[0] in h0)this.idx[rest[0]]=h0[rest[0]];return ok()}
  var t=this.resolve(rest[0]||'HEAD');if(!t)return er("fatal: ambiguous argument '"+rest[0]+"': unknown revision or path not in the working tree.");
  if(this.head.b)this.br[this.head.b]=t;else this.head.id=t;
  var tr=this.tree(t);
  if(mode==='mixed')this.idx=cp(tr);
  if(mode==='hard'){var un={},f;for(f in this.wt)if(!(f in this.idx)&&!(f in this.tree(tipId)))un[f]=this.wt[f];this.idx=cp(tr);this.wt=cp(tr);for(f in un)this.wt[f]=un[f];
    return ok('HEAD is now at '+SHORT(t)+' '+this.c[t].msg)}
  return ok(mode==='mixed'?(this.statusEntries().length?'Unstaged changes after reset:\n'+this.statusEntries().filter(function(l){return /^.M|^.D/.test(l)}).map(function(l){return l.slice(1,2)+'\t'+l.slice(3)}).join('\n'):''):'')};
Repo.prototype.g_revert=function(a){
  var ref=a.filter(function(x){return x[0]!=='-'})[0],id=this.resolve(ref);if(!id)return er("fatal: bad revision '"+ref+"'");
  if(!this.clean())return er('error: your local changes would be overwritten by revert.');
  var c=this.c[id];if(c.p.length>1)return er('error: commit '+id+' is a merge but no -m option was given.');
  var cur=this.tree(this.tip()),r=this.apply(cur,c.tree,this.tree(c.p[0]));
  if(r.bad)return er('CONFLICT (content): Merge conflict in '+r.bad+'\nerror: could not revert '+SHORT(id)+'... '+c.msg);
  this.idx=cp(r.tree);this.wt=cp(r.tree);var nid=this.commitNow('Revert "'+c.msg+'"');
  return ok('['+this.head.b+' '+SHORT(nid)+'] Revert "'+c.msg+'"')};
Repo.prototype.g_cherry_pick=function(a){
  var ref=a.filter(function(x){return x[0]!=='-'})[0],id=this.resolve(ref);if(!id)return er("fatal: bad revision '"+ref+"'");
  if(!this.clean())return er('error: your local changes would be overwritten by cherry-pick.');
  var c=this.c[id],cur=this.tree(this.tip()),r=this.apply(cur,this.tree(c.p[0]),c.tree);
  if(r.bad)return er('CONFLICT (content): Merge conflict in '+r.bad);
  this.idx=cp(r.tree);this.wt=cp(r.tree);var nid=this.commitNow(c.msg);return ok('['+this.head.b+' '+SHORT(nid)+'] '+c.msg)};
Repo.prototype.g_stash=function(a){
  var sub=a[0]||'push',h=this.tree(this.tip());
  if(sub==='push'||sub==='-u'||sub==='save'){var ch=this.statusEntries().filter(function(l){return l.indexOf('??')!==0});
    if(!ch.length)return ok('No local changes to save');this.stash.push({idx:cp(this.idx),wt:cp(this.wt)});
    var un={},f;for(f in this.wt)if(!(f in h)&&!(f in this.idx))un[f]=this.wt[f];this.idx=cp(h);this.wt=cp(h);for(f in un)this.wt[f]=un[f];
    return ok('Saved working directory and index state WIP on '+(this.head.b||'HEAD')+': '+SHORT(this.tip())+' '+this.c[this.tip()].msg)}
  if(sub==='list')return ok(this.stash.map(function(s,i){return 'stash@{'+(this.stash.length-1-i)+'}: WIP'}.bind(this)).reverse().join('\n'));
  if(sub==='pop'||sub==='apply'){if(!this.stash.length)return er('No stash entries found.');var s=sub==='pop'?this.stash.pop():this.stash[this.stash.length-1];
    this.idx=cp(s.idx);this.wt=cp(s.wt);return ok('Dropped refs/stash@{0}')}
  return er("git stash: subcomando não suportado")};
Repo.prototype.g_tag=function(a){
  var rest=a.filter(function(x){return x[0]!=='-'});
  if(!rest.length)return ok(Object.keys(this.tags).sort().join('\n'));
  if(rest[0] in this.tags)return er("fatal: tag '"+rest[0]+"' already exists");
  var t=rest[1]?this.resolve(rest[1]):this.tip();if(!t)return er('fatal: Failed to resolve');this.tags[rest[0]]=t;return ok()};
Repo.prototype.g_log=function(a){
  var opt={oneline:a.indexOf('--oneline')>=0,graph:a.indexOf('--graph')>=0,all:a.indexOf('--all')>=0};
  var ref=a.filter(function(x){return x[0]!=='-'})[0];if(opt.graph&&!opt.oneline)opt.oneline=true;
  return this.log(opt,ref)};
Repo.prototype.g_reflog=function(){return er('git reflog: não registrado neste simulador (veja o Laboratório L1, seção do reflog)')};
Repo.prototype.g_diff=function(a){
  var staged=a.indexOf('--staged')>=0||a.indexOf('--cached')>=0,from=staged?this.tree(this.tip()):this.idx,to=staged?this.idx:this.wt,d=diff(from,to),o=[];
  Object.keys(d).sort().forEach(function(f){o.push('diff --git a/'+f+' b/'+f);o.push('--- '+(d[f][0]===undefined?'/dev/null':'a/'+f));o.push('+++ '+(d[f][1]===undefined?'/dev/null':'b/'+f));
    if(d[f][0]!==undefined)o.push('-'+d[f][0]);if(d[f][1]!==undefined)o.push('+'+d[f][1])});return ok(o.join('\n'))};
/* ---- DAG para desenho ---- */
Repo.prototype.dag=function(){
  var self=this,ids=Object.keys(this.c).sort(function(a,b){return self.c[a].n-self.c[b].n}),lane={},names=Object.keys(this.br).sort(function(a,b){return a==='main'?-1:b==='main'?1:a<b?-1:1});
  var lanes=0;names.concat(this.head.b?[]:['HEAD']).forEach(function(b){var id=b==='HEAD'?self.head.id:self.br[b];while(id&&!(id in lane)){lane[id]=lanes;id=self.c[id].p[0]}lanes++});
  ids.forEach(function(id){if(!(id in lane))lane[id]=lanes});
  return {ids:ids,lane:lane,lanes:lanes+1}};
root.GitSim=Repo;
if(typeof module!=='undefined')module.exports=Repo;
})(typeof window!=='undefined'?window:globalThis);
