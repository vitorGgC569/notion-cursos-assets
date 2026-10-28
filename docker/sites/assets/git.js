/* Plugin "git" para o terminal simulado: subconjunto fiel do Git (init, add, commit, status, log, branch, switch, merge...). */
(function(){
'use strict';
var K=window.K,Term=K.Term;
function hash(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}var o='';for(var k=0;k<5;k++){h=Math.imul(h^(h>>>13),2246822519)>>>0;o+=('00000000'+h.toString(16)).slice(-8)}return o}
function G(T){return T.state.git}
function root(T){return G(T).root}
function relOf(T,p){var r=root(T),a=T.abs(p);if(a===r)return '';if(a.indexOf(r+'/')===0)return a.slice(r.length+1);return null}
function ignored(T,rel){
  var g=T.get(root(T)+'/.gitignore');if(!g)return false;
  return g.d.split('\n').map(function(s){return s.trim()}).filter(function(s){return s&&s[0]!=='#'}).some(function(p){
    var dir=p.slice(-1)==='/';p=p.replace(/\/$/,'');
    var re=new RegExp('^'+p.replace(/[.+^${}()|\\[\]]/g,'\\$&').replace(/\*/g,'[^/]*').replace(/\?/g,'.')+'$');
    return rel.split('/').some(function(seg,i,a){return re.test(seg)&&(!dir||i<a.length-1)});
  });
}
function work(T){
  var out={};
  (function walk(n,p){
    Object.keys(n.c).forEach(function(k){
      if(k==='.git'&&p==='')return;var rel=p?p+'/'+k:k,c=n.c[k];
      if(c.t==='d')walk(c,rel);else if(!ignored(T,rel))out[rel]=c.d;
    });
  })(T.get(root(T)),'');
  return out;
}
function headTree(T){var g=G(T);return g.head?g.commits[g.head].tree:{}}
function treeEq(a,b){var k=Object.keys(a),l=Object.keys(b);if(k.length!==l.length)return false;return k.every(function(x){return a[x]===b[x]})}
function writeTree(T,tree,old){
  var r=root(T),rn=T.get(r);
  Object.keys(old||{}).forEach(function(p){if(!(p in tree)){var parts=p.split('/'),n=rn;for(var i=0;i<parts.length-1;i++){n=n&&n.c[parts[i]]}if(n&&n.c)delete n.c[parts[parts.length-1]]}});
  Object.keys(tree).forEach(function(p){
    var parts=p.split('/'),n=rn;
    for(var i=0;i<parts.length-1;i++){if(!n.c[parts[i]])n.c[parts[i]]={t:'d',c:{},m:0o755,o:T.user,g:T.user};n=n.c[parts[i]]}
    var f=n.c[parts[parts.length-1]];if(f&&f.t==='f')f.d=tree[p];else n.c[parts[parts.length-1]]={t:'f',d:tree[p],m:0o644,o:T.user,g:T.user};
  });
}
function ancestors(g,id){var seen={},q=[id];while(q.length){var c=q.shift();if(!c||seen[c])continue;seen[c]=1;var o=g.commits[c];if(o){q.push(o.p);if(o.p2)q.push(o.p2)}}return seen}
function lcsDiff(a,b){
  var n=a.length,m=b.length,L=[];for(var i=0;i<=n;i++){L.push(new Array(m+1).fill(0))}
  for(i=n-1;i>=0;i--)for(var j=m-1;j>=0;j--)L[i][j]=a[i]===b[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  var out=[];i=0;j=0;while(i<n&&j<m){if(a[i]===b[j]){out.push(' '+a[i]);i++;j++}else if(L[i+1][j]>=L[i][j+1]){out.push('-'+a[i]);i++}else{out.push('+'+b[j]);j++}}
  while(i<n)out.push('-'+a[i++]);while(j<m)out.push('+'+b[j++]);return out;
}
function split(s){if(s==='')return [];var l=s.split('\n');if(l[l.length-1]==='')l.pop();return l}
function status(T){
  var g=G(T),h=headTree(T),idx=g.index,w=work(T),staged=[],unstaged=[],untracked=[];
  var all={};Object.keys(h).concat(Object.keys(idx),Object.keys(w)).forEach(function(k){all[k]=1});
  Object.keys(all).sort().forEach(function(p){
    var inH=p in h,inI=p in idx,inW=p in w,x=' ',y=' ';
    if(inI&&!inH)x='A';else if(inI&&inH&&idx[p]!==h[p])x='M';else if(!inI&&inH)x='D';
    if(inI&&inW&&w[p]!==idx[p])y='M';else if(inI&&!inW)y='D';
    if(!inI&&inW&&!inH){untracked.push(p);return}
    if(!inI&&inW&&inH){/* removido do índice, existe no working: untracked após git rm --cached; ignora */}
    if(x!==' ')staged.push([x,p]);if(y!==' ')unstaged.push([y,p]);
  });
  return {staged:staged,unstaged:unstaged,untracked:untracked,conflicts:g.conflicts||[]};
}
function short(id){return id.slice(0,7)}
function commitMsgFromArgs(a){var i=a.indexOf('-m');if(i>-1)return a[i+1];for(var k=0;k<a.length;k++){if(/^-[a-z]*m$/.test(a[k]))return a[k+1];if(a[k].indexOf('--message=')===0)return a[k].slice(10)}return null}
Term.register('git',function(T,a){
  var sub=a[0],rest=a.slice(1),g=G(T);
  if(!sub||sub==='--help'||sub==='help')return {out:'uso: git [--version] <comando> [<args>]\nComandos neste simulador: config, init, status, add, commit, log, branch, switch, checkout, merge, diff, restore\n'};
  if(sub==='--version')return {out:'git version 2.43.0\n'};
  if(sub==='config'){T.state.gcfg=T.state.gcfg||{};
    if(rest.indexOf('--list')>-1||rest.indexOf('-l')>-1)return {out:Object.keys(T.state.gcfg).map(function(k){return k+'='+T.state.gcfg[k]}).join('\n')+'\n'};
    var args=rest.filter(function(x){return x.indexOf('--')!==0});
    if(args.length>=2)T.state.gcfg[args[0]]=args[1];else if(args.length===1)return {out:(T.state.gcfg[args[0]]||'')+(T.state.gcfg[args[0]]?'\n':''),code:T.state.gcfg[args[0]]?0:1};
    return {out:''};}
  if(sub==='init'){
    if(g)return {out:'Reinitialized existing Git repository in '+root(T)+'/.git/\n'};
    var r=T.cwd;T.state.git={root:r,branch:'main',head:null,commits:{},branches:{},index:{},merging:null,conflicts:[],n:0};
    var n=T.get(r);if(!n.c['.git'])n.c['.git']={t:'d',c:{HEAD:{t:'f',d:'ref: refs/heads/main\n',m:0o644,o:T.user,g:T.user}},m:0o755,o:T.user,g:T.user};
    return {out:'Initialized empty Git repository in '+r+'/.git/\n'};
  }
  if(!g)return {err:'fatal: not a git repository (or any of the parent directories): .git\n',code:128};
  if(sub==='status'){
    var s=status(T),sh=rest.indexOf('-s')>-1||rest.indexOf('--short')>-1;
    if(sh){var out='';var m={};s.staged.forEach(function(x){m[x[1]]=[x[0],' ']});s.unstaged.forEach(function(x){m[x[1]]=[(m[x[1]]||[' '])[0],x[0]]});
      Object.keys(m).sort().forEach(function(p){out+=m[p][0]+m[p][1]+' '+p+'\n'});s.untracked.forEach(function(p){out+='?? '+p+'\n'});
      s.conflicts.forEach(function(p){out+='UU '+p+'\n'});return {out:out}}
    var o='On branch '+g.branch+'\n';if(!g.head)o+='\nNo commits yet\n';
    if(g.merging)o+='You have unmerged paths.\n  (fix conflicts and run "git commit")\n';
    if(s.conflicts.length){o+='\nUnmerged paths:\n'+s.conflicts.map(function(p){return '\tboth modified:   '+p}).join('\n')+'\n'}
    if(s.staged.length)o+='\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n'+s.staged.map(function(x){return '\t'+({A:'new file:   ',M:'modified:   ',D:'deleted:    '}[x[0]])+x[1]}).join('\n')+'\n';
    if(s.unstaged.length&&!s.conflicts.length)o+='\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n'+s.unstaged.map(function(x){return '\t'+(x[0]==='M'?'modified:   ':'deleted:    ')+x[1]}).join('\n')+'\n';
    if(s.untracked.length)o+='\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n'+s.untracked.map(function(p){return '\t'+p}).join('\n')+'\n';
    if(!s.staged.length&&!s.unstaged.length&&!s.untracked.length&&!s.conflicts.length)o+=g.head?'\nnothing to commit, working tree clean\n':'\nnothing to commit (create/copy files and use "git add" to track)\n';
    else if(!s.staged.length&&!s.conflicts.length)o+=s.untracked.length&&!s.unstaged.length?'\nnothing added to commit but untracked files present (use "git add" to track)\n':'\nno changes added to commit (use "git add" and/or "git commit -a")\n';
    return {out:o};
  }
  if(sub==='add'){
    if(!rest.length)return {out:'Nothing specified, nothing added.\n'};
    var w=work(T),err='';
    rest.forEach(function(p){
      if(p==='-A'||p==='--all'||p==='.'&&relOf(T,'.')===''){Object.keys(w).forEach(function(k){g.index[k]=w[k]});Object.keys(g.index).forEach(function(k){if(!(k in w))delete g.index[k]});return}
      var rel=relOf(T,p);if(rel===null){err+="fatal: "+p+": 'fora do repositório'\n";return}
      var hit=false;Object.keys(w).forEach(function(k){if(k===rel||rel===''||k.indexOf(rel+'/')===0||(p==='.'&&(k===rel||k.indexOf(rel?rel+'/':'')===0))){g.index[k]=w[k];hit=true}});
      Object.keys(g.index).forEach(function(k){if(!(k in w)&&(k===rel||k.indexOf(rel+'/')===0)){delete g.index[k];hit=true}});
      if(!hit&&!T.get(p))err+="fatal: pathspec '"+p+"' did not match any files\n";
    });
    g.conflicts=g.conflicts.filter(function(c){return !(c in g.index)||work(T)[c].indexOf('<<<<<<<')>-1});
    return {err:err,code:err?128:0};
  }
  if(sub==='commit'){
    var all=rest.some(function(x){return /^-[a-z]*a/.test(x)&&x.indexOf('--')!==0&&x!=='-m'}),msg=commitMsgFromArgs(rest);
    if(all){var w2=work(T),h0=headTree(T);Object.keys(w2).forEach(function(k){if(k in g.index||k in h0)g.index[k]=w2[k]});Object.keys(g.index).forEach(function(k){if(!(k in w2))delete g.index[k]})}
    if(g.merging&&(g.conflicts.length)){return {err:'error: Committing is not possible because you have unmerged files.\nhint: Fix them up in the work tree, and then use \'git add/rm <file>\'\nfatal: Exiting because of an unresolved conflict.\n',code:128}}
    if(!msg&&g.merging&&(rest.indexOf('--no-edit')>-1||true))msg="Merge branch '"+g.merging.name+"'";
    if(!msg)return {err:'Aborting commit due to empty commit message.\n',code:1};
    var h=headTree(T);
    if(treeEq(h,g.index)&&!g.merging){var s2=status(T);return {out:'On branch '+g.branch+'\n'+(s2.unstaged.length||s2.untracked.length?(s2.untracked.length&&!s2.unstaged.length?'nothing added to commit but untracked files present (use "git add" to track)\n':'no changes added to commit (use "git add" and/or "git commit -a")\n'):'nothing to commit, working tree clean\n'),code:1}}
    var tree=JSON.parse(JSON.stringify(g.index)),id=hash(JSON.stringify([tree,msg,g.head,g.n++]));
    g.commits[id]={id:id,msg:msg,p:g.head,p2:g.merging?g.merging.id:null,tree:tree,n:g.n};
    var first=!g.head;g.head=id;g.branches[g.branch]=id;g.merging=null;g.conflicts=[];
    var added=0,del=0,files=0;Object.keys(tree).forEach(function(k){if(h[k]!==tree[k]){files++;var d=lcsDiff(split(h[k]||''),split(tree[k]));d.forEach(function(x){if(x[0]==='+')added++;if(x[0]==='-')del++})}});Object.keys(h).forEach(function(k){if(!(k in tree)){files++;del+=split(h[k]).length}});
    return {out:'['+g.branch+(first?' (root-commit)':'')+' '+short(id)+'] '+msg.split('\n')[0]+'\n '+files+' file'+(files===1?'':'s')+' changed'+(added?', '+added+' insertion'+(added===1?'':'s')+'(+)':'')+(del?', '+del+' deletion'+(del===1?'':'s')+'(-)':'')+'\n'};
  }
  if(sub==='log'){
    if(!g.head)return {err:"fatal: your current branch '"+g.branch+"' does not have any commits yet\n",code:128};
    var one=rest.indexOf('--oneline')>-1,lim=Infinity;rest.forEach(function(x){var m=/^-(\d+)$/.exec(x);if(m)lim=+m[1];if(x==='-n')lim=+rest[rest.indexOf(x)+1]});
    var all2=rest.indexOf('--all')>-1,gr=rest.indexOf('--graph')>-1;
    var tips=all2?Object.keys(g.branches).map(function(b){return g.branches[b]}):[g.head],seen={},list=[];
    tips.forEach(function(t){var an=ancestors(g,t);Object.keys(an).forEach(function(k){if(!seen[k]){seen[k]=1;list.push(g.commits[k])}})});
    list.sort(function(x,y){return y.n-x.n});list=list.slice(0,lim);
    function dec(c){var d=[];if(c.id===g.head)d.push('HEAD -> '+g.branch);Object.keys(g.branches).forEach(function(b){if(g.branches[b]===c.id&&!(c.id===g.head&&b===g.branch))d.push(b)});return d.length?' ('+d.join(', ')+')':''}
    if(one)return {out:list.map(function(c){return (gr?'* ':'')+short(c.id)+dec(c)+' '+c.msg.split('\n')[0]}).join('\n')+'\n'};
    return {out:list.map(function(c){return 'commit '+c.id+dec(c)+(c.p2?'\nMerge: '+short(c.p)+' '+short(c.p2):'')+'\nAuthor: '+((T.state.gcfg||{})['user.name']||'Aluno')+' <'+((T.state.gcfg||{})['user.email']||'aluno@exemplo.com')+'>\nDate:   Tue Oct 27 10:00:00 2026 -0300\n\n    '+c.msg+'\n'}).join('\n')};
  }
  if(sub==='branch'){
    var args2=rest.filter(function(x){return x[0]!=='-'}),del2=rest.indexOf('-d')>-1||rest.indexOf('-D')>-1;
    if(del2){var b=args2[0];if(b===g.branch)return {err:"error: Cannot delete branch '"+b+"' checked out at '"+g.root+"'\n",code:1};if(!g.branches[b])return {err:"error: branch '"+b+"' not found.\n",code:1};
      if(rest.indexOf('-D')<0&&!ancestors(g,g.head)[g.branches[b]])return {err:"error: the branch '"+b+"' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D "+b+"'.\n",code:1};
      var oldid=g.branches[b];delete g.branches[b];return {out:'Deleted branch '+b+' (was '+short(oldid)+').\n'}}
    if(args2.length){if(!g.head)return {err:'fatal: not a valid object name: \''+g.branch+'\'\n',code:128};if(g.branches[args2[0]])return {err:"fatal: a branch named '"+args2[0]+"' already exists\n",code:128};g.branches[args2[0]]=g.head;return {out:''}}
    var names=Object.keys(g.branches);if(!names.indexOf(g.branch)<0&&names.indexOf(g.branch)<0)names.push(g.branch);
    return {out:names.sort().map(function(n){return (n===g.branch?'* ':'  ')+n}).join('\n')+'\n'};
  }
  if(sub==='switch'||sub==='checkout'){
    var create=rest.indexOf('-c')>-1||rest.indexOf('-b')>-1||rest.indexOf('-C')>-1,tgt=rest.filter(function(x){return x[0]!=='-'}),name=tgt[0];
    if(sub==='checkout'&&name&&!g.branches[name]&&!create&&(rest.indexOf('--')>-1||T.get(name)))return T.exec(['git','restore'].concat(tgt),null);
    if(!name)return {err:'fatal: missing branch name\n',code:128};
    if(create){if(g.branches[name])return {err:"fatal: a branch named '"+name+"' already exists\n",code:128};if(!g.head){g.branch=name;return {out:"Switched to a new branch '"+name+"'\n"}}g.branches[name]=g.head;}
    if(!g.branches[name]&&!(name===g.branch&&!g.head))return {err:sub==='switch'?"fatal: invalid reference: "+name+"\n":"error: pathspec '"+name+"' did not match any file(s) known to git\n",code:sub==='switch'?128:1};
    if(name===g.branch)return {out:"Already on '"+name+"'\n"};
    var cur=headTree(T),tr=g.commits[g.branches[name]].tree,w3=work(T),blocked=[];
    Object.keys(w3).forEach(function(p){if(p in cur&&w3[p]!==cur[p]&&cur[p]!==tr[p])blocked.push(p);if(p in g.index&&g.index[p]!==cur[p]&&cur[p]!==tr[p]&&blocked.indexOf(p)<0)blocked.push(p)});
    if(blocked.length){if(create)delete g.branches[name];return {err:'error: Your local changes to the following files would be overwritten by checkout:\n'+blocked.map(function(p){return '\t'+p}).join('\n')+'\nPlease commit your changes or stash them before you switch branches.\nAborting\n',code:1}}
    writeTree(T,tr,cur);g.branch=name;g.head=g.branches[name];g.index=JSON.parse(JSON.stringify(tr));
    return {out:(create?"Switched to a new branch '":"Switched to branch '")+name+"'\n"};
  }
  if(sub==='merge'){
    var name2=rest.filter(function(x){return x[0]!=='-'})[0];if(!name2)return {err:'fatal: No remote for the current branch.\n',code:128};
    if(!g.branches[name2])return {err:name2+' - not something we can merge\n',code:1};
    var their=g.branches[name2],ours=g.head,anc=ancestors(g,ours);
    if(anc[their])return {out:'Already up to date.\n'};
    var st=status(T);if(st.staged.length||st.unstaged.length)return {err:'error: Your local changes to the following files would be overwritten by merge.\nPlease commit your changes or stash them before you merge.\nAborting\n',code:1};
    var theirAnc=ancestors(g,their);
    if(theirAnc[ours]&&rest.indexOf('--no-ff')<0){
      var old=headTree(T),nt=g.commits[their].tree;writeTree(T,nt,old);g.head=their;g.branches[g.branch]=their;g.index=JSON.parse(JSON.stringify(nt));
      var ch=Object.keys(nt).filter(function(p){return old[p]!==nt[p]});
      return {out:'Updating '+short(ours)+'..'+short(their)+'\nFast-forward\n'+ch.map(function(p){return ' '+p+' | '+(Math.abs(split(nt[p]).length-split(old[p]||'').length)||1)+' '+(old[p]==null?'+':'+-')}).join('\n')+'\n '+ch.length+' file'+(ch.length===1?'':'s')+' changed\n'};
    }
    // 3-way: base = ancestral comum mais recente
    var base=null,bn=-1;Object.keys(anc).forEach(function(k){if(theirAnc[k]&&g.commits[k].n>bn){bn=g.commits[k].n;base=k}});
    var bt=base?g.commits[base].tree:{},ot=headTree(T),tt=g.commits[their].tree,res={},conf=[],paths={};
    [bt,ot,tt].forEach(function(t){Object.keys(t).forEach(function(k){paths[k]=1})});
    Object.keys(paths).forEach(function(p){
      var B=bt[p],O=ot[p],Tt=tt[p];
      if(O===Tt){if(O!=null)res[p]=O}
      else if(O===B){if(Tt!=null)res[p]=Tt}
      else if(Tt===B){if(O!=null)res[p]=O}
      else{conf.push(p);res[p]='<<<<<<< HEAD\n'+(O||'')+(O&&O.slice(-1)!=='\n'?'\n':'')+'=======\n'+(Tt||'')+(Tt&&Tt.slice(-1)!=='\n'?'\n':'')+'>>>>>>> '+name2+'\n'}
    });
    writeTree(T,res,ot);
    if(conf.length){g.merging={id:their,name:name2};g.conflicts=conf;Object.keys(res).forEach(function(p){if(conf.indexOf(p)<0)g.index[p]=res[p]});
      return {out:conf.map(function(p){return 'Auto-merging '+p+'\nCONFLICT (content): Merge conflict in '+p}).join('\n')+'\nAutomatic merge failed; fix conflicts and then commit the result.\n',code:1}}
    g.index=JSON.parse(JSON.stringify(res));var mid=hash(JSON.stringify([res,their,ours,g.n++]));
    g.commits[mid]={id:mid,msg:"Merge branch '"+name2+"'",p:ours,p2:their,tree:JSON.parse(JSON.stringify(res)),n:g.n};g.head=mid;g.branches[g.branch]=mid;
    return {out:"Merge made by the 'ort' strategy.\n"};
  }
  if(sub==='diff'){
    var staged=rest.indexOf('--staged')>-1||rest.indexOf('--cached')>-1,A=staged?headTree(T):g.index,B=staged?g.index:work(T),out2='';
    Object.keys(B).sort().forEach(function(p){if(B[p]!==A[p]&&(p in A||staged)){out2+='diff --git a/'+p+' b/'+p+'\n--- a/'+p+'\n+++ b/'+p+'\n'+lcsDiff(split(A[p]||''),split(B[p])).map(function(l){return l[0]===' '?l:l}).join('\n')+'\n'}});
    return {out:out2};
  }
  if(sub==='restore'){
    var stg=rest.indexOf('--staged')>-1,fs=rest.filter(function(x){return x[0]!=='-'});
    fs.forEach(function(p){var rel=relOf(T,p);if(stg){var ht=headTree(T);if(rel in ht)g.index[rel]=ht[rel];else delete g.index[rel]}else if(rel in g.index){writeTree(T,(function(){var o={};o[rel]=g.index[rel];return o})(),{})}});
    return {out:''};
  }
  return {err:"git: '"+sub+"' não é suportado neste simulador (veja `git help`).\n",code:1};
});
})();
