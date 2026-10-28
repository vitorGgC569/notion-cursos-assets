/* Plugin "docker" para o terminal simulado: run, ps, stop, rm, logs, exec, images, volume, network, build (modelo simplificado). */
(function(){
'use strict';
var K=window.K,Term=K.Term;
var IMG={nginx:{cmd:'"/docker-entrypoint.…"',srv:true,log:'/docker-entrypoint.sh: Configuration complete; ready for start up\n2026/10/27 13:00:01 [notice] 1#1: nginx/1.27.2\n2026/10/27 13:00:01 [notice] 1#1: start worker processes',port:80},
 httpd:{cmd:'"httpd-foreground"',srv:true,log:'AH00558: httpd: Could not reliably determine the server\'s fully qualified domain name\n[mpm_event:notice] [pid 1] AH00489: Apache/2.4.62 (Unix) configured -- resuming normal operations',port:80},
 redis:{cmd:'"docker-entrypoint.s…"',srv:true,log:'1:M 27 Oct 2026 13:00:01.000 * Ready to accept connections tcp',port:6379},
 postgres:{cmd:'"docker-entrypoint.s…"',srv:true,log:'PostgreSQL init process complete; ready for start up.\nLOG:  database system is ready to accept connections',port:5432,env:['POSTGRES_PASSWORD']},
 mysql:{cmd:'"docker-entrypoint.s…"',srv:true,log:'[Server] /usr/sbin/mysqld: ready for connections. Version: \'8.4.2\'  port: 3306',port:3306,env:['MYSQL_ROOT_PASSWORD']},
 alpine:{cmd:'"/bin/sh"',srv:false},busybox:{cmd:'"sh"',srv:false},ubuntu:{cmd:'"/bin/bash"',srv:false},'hello-world':{cmd:'"/hello"',srv:false,hello:true},
 python:{cmd:'"python3"',srv:false},node:{cmd:'"docker-entrypoint.s…"',srv:false},'nicolaka/netshoot':{cmd:'"zsh"',srv:false}};
function D(T){if(!T.state.docker)T.state.docker={c:[],imgs:{},vol:{},net:{bridge:{id:'a1b2c3d4e5f6',driver:'bridge',user:false},host:{id:'b2c3d4e5f6a1',driver:'host',user:false},none:{id:'c3d4e5f6a1b2',driver:'null',user:false}},n:0,ip:2};return T.state.docker}
function rid(d){d.n++;var s='';var h=2166136261;for(var i=0;i<12;i++){h=Math.imul(h^(d.n*31+i),16777619)>>>0;s+=(h&15).toString(16)}return s}
function norm(i){var n=i.split(':');return n.length>1&&n[n.length-1].indexOf('/')<0?i:i+':latest'}
function repo(i){return i.replace(/:[^:/]*$/,'')}
function find(d,ref){return d.c.filter(function(c){return c.name===ref||c.id===ref||c.id.indexOf(ref)===0})[0]}
function ago(){return 'About a minute ago'}
function table(rows){var w=[];rows.forEach(function(r){r.forEach(function(c,i){w[i]=Math.max(w[i]||0,String(c).length)})});return rows.map(function(r){return r.map(function(c,i){return i===r.length-1?c:String(c).padEnd(w[i]+3)}).join('')}).join('\n')+'\n'}
function pull(d,image){
  var r=repo(image),base=r.split('/').pop(),n=norm(image);
  if(d.imgs[n])return '';
  if(!IMG[r]&&!IMG[base]&&!d.built||false){}
  if(!IMG[r]&&!(d.local&&d.local[n]))return null;
  d.imgs[n]={id:rid(d).slice(0,12),size:IMG[r]&&IMG[r].srv?'192MB':'8.31MB'};
  return "Unable to find image '"+n+"' locally\n"+n.split(':')[1]+': Pulling from '+(r.indexOf('/')>-1?r:'library/'+r)+'\nDigest: sha256:'+rid(d)+rid(d)+rid(d).slice(0,4)+'\nStatus: Downloaded newer image for '+n+'\n';
}
Term.register('docker',function(T,a){
  var d=D(T),sub=a[0],rest=a.slice(1);
  if(!sub)return {out:'Usage:  docker [OPTIONS] COMMAND\nComandos neste simulador: run, ps, stop, start, restart, rm, logs, exec, images, pull, rmi, inspect, volume, network, build\n'};
  if(sub==='--version'||sub==='version')return {out:'Docker version 27.3.1, build ce12230\n'};
  if(sub==='pull'){var im=rest[0];if(!im)return {err:'"docker pull" requires exactly 1 argument.\n',code:1};var o=pull(d,im);if(o===null)return {err:"Error response from daemon: pull access denied for "+repo(im)+", repository does not exist or may require 'docker login'\n",code:1};if(!o)return {out:norm(im).split(':')[1]+': Pulling from library/'+repo(im)+'\nStatus: Image is up to date for '+norm(im)+'\n'};return {out:o.split('\n').slice(1).join('\n')}}
  if(sub==='images'||sub==='image'&&rest[0]==='ls'){var rows=[['REPOSITORY','TAG','IMAGE ID','CREATED','SIZE']];Object.keys(d.imgs).forEach(function(k){var p=k.split(':');rows.push([p[0],p[1],d.imgs[k].id,'2 weeks ago',d.imgs[k].size])});return {out:table(rows)}}
  if(sub==='rmi'){var e='',o2='';rest.forEach(function(r){var n=norm(r);if(!d.imgs[n]){e+='Error response from daemon: No such image: '+r+'\n';return}if(d.c.some(function(c){return c.image===n})){e+='Error response from daemon: conflict: unable to remove repository reference "'+r+'" (must force) - container '+d.c.filter(function(c){return c.image===n})[0].id+' is using its referenced image\n';return}delete d.imgs[n];o2+='Untagged: '+n+'\n'});return {out:o2,err:e}}
  if(sub==='build'){
    var tag=null,ctx='.';for(var i=0;i<rest.length;i++){if(rest[i]==='-t'||rest[i]==='--tag')tag=rest[++i];else if(rest[i][0]!=='-')ctx=rest[i]}
    var df=T.get(ctx+'/Dockerfile');if(!df)return {err:'ERROR: failed to solve: failed to read dockerfile: open Dockerfile: no such file or directory\n',code:1};
    var L=df.d.split('\n').filter(function(l){return l.trim()&&l.trim()[0]!=='#'});if(!/^FROM\s/i.test(L[0]||''))return {err:'ERROR: failed to solve: dockerfile parse error: file with no instructions\n',code:1};
    var out='#0 building with "default" instance using docker driver\n';L.forEach(function(l,i){out+='#'+(i+1)+' [step '+(i+1)+'/'+L.length+'] '+l.trim()+'\n'});
    var nt=norm(tag||'<none>:latest');d.local=d.local||{};d.local[nt]=1;d.imgs[nt]={id:rid(d).slice(0,12),size:'12.4MB'};return {out:out+'#'+(L.length+1)+' naming to docker.io/library/'+nt+' done\n'};
  }
  if(sub==='run'||sub==='create'){
    var o={name:null,ports:[],vols:[],env:[],net:'bridge',det:false,rm:false,mem:null,restart:null},i2=0;
    for(;i2<rest.length;i2++){
      var x=rest[i2];
      if(x[0]!=='-')break;
      if(x==='-d'||x==='--detach')o.det=true;else if(x==='--rm')o.rm=true;else if(x==='-it'||x==='-i'||x==='-t'||x==='-ti')o.it=true;
      else if(x==='--name')o.name=rest[++i2];else if(x.indexOf('--name=')===0)o.name=x.slice(7);
      else if(x==='-p'||x==='--publish')o.ports.push(rest[++i2]);else if(x==='-v'||x==='--volume')o.vols.push(rest[++i2]);
      else if(x==='-e'||x==='--env')o.env.push(rest[++i2]);else if(x==='--network'||x==='--net')o.net=rest[++i2];
      else if(x==='-m'||x==='--memory')o.mem=rest[++i2];else if(x==='--restart')o.restart=rest[++i2];else if(x==='-P')o.P=true;
      else if(x==='-w'||x==='-u'||x==='--user'||x==='--cpus'||x==='--hostname'||x==='-h')i2++;
      else if(/^--(memory|network|name|restart)=/.test(x)){var kv=x.slice(2).split('=');if(kv[0]==='memory')o.mem=kv[1];if(kv[0]==='network')o.net=kv[1];if(kv[0]==='restart')o.restart=kv[1]}
    }
    var image=rest[i2],cmd=rest.slice(i2+1);
    if(!image)return {err:'docker: "run" requires at least 1 argument.\n',code:125};
    var out2=pull(d,image);if(out2===null)return {err:"Unable to find image '"+norm(image)+"' locally\ndocker: Error response from daemon: pull access denied for "+repo(image)+", repository does not exist or may require 'docker login': denied: requested access to the resource is denied.\n",code:125};
    var n=norm(image),r=repo(image),spec=IMG[r]||{cmd:'"/app"',srv:false};
    if(o.name&&d.c.some(function(c){return c.name===o.name}))return {err:'docker: Error response from daemon: Conflict. The container name "/'+o.name+'" is already in use by container "'+d.c.filter(function(c){return c.name===o.name})[0].id+'". You have to remove (or rename) that container to be able to reuse that name.\n',code:125};
    var net=o.net;if(!d.net[net])return {err:'docker: Error response from daemon: network '+net+' not found.\n',code:125};
    var ports=[];for(var pi=0;pi<o.ports.length;pi++){var pp=o.ports[pi].split(':'),host,cp;if(pp.length===3){host=pp[1];cp=pp[2]}else if(pp.length===2){host=pp[0];cp=pp[1]}else{host=String(30000+d.n);cp=pp[0]}
      if(d.c.some(function(c){return c.running&&c.ports.some(function(q){return q.host===host})}))return {err:'docker: Error response from daemon: driver failed programming external connectivity on endpoint '+(o.name||'container')+': Bind for 0.0.0.0:'+host+' failed: port is already allocated.\n',code:125};
      ports.push({host:host,cont:cp.replace('/tcp',''),bind:pp.length===3?pp[0]:'0.0.0.0'})}
    var missing=(spec.env||[]).filter(function(k){return !o.env.some(function(e){return e.indexOf(k+'=')===0})});
    var mnames=['elegant_turing','brave_curie','quirky_hopper','eager_lovelace','kind_ritchie'];
    var c={id:rid(d),name:o.name||mnames[d.n%mnames.length],image:n,cmd:cmd.length?'"'+cmd.join(' ')+'"':spec.cmd,ports:ports,vols:o.vols,env:o.env,net:net,mem:o.mem,restart:o.restart,running:false,exit:0,ip:'172.17.0.'+(d.ip++),rm:o.rm,log:''};
    if(o.vols.length){for(var vi=0;vi<o.vols.length;vi++){var src=o.vols[vi].split(':')[0];if(src&&src[0]!=='/'&&src[0]!=='.'&&src[0]!=='~'&&!d.vol[src])d.vol[src]={name:src,driver:'local'}}}
    if(sub==='create'){d.c.push(c);return {out:c.id+'\n'}}
    var out3=(out2||'');
    if(missing.length&&spec.srv){c.exit=1;c.log='Error: Database is uninitialized and superuser password is not specified.\n       You must specify '+missing[0]+' to a non-empty value for the superuser.';d.c.push(c);if(o.det)return {out:out3+c.id+'\n'};return {out:out3+c.log+'\n',code:1}}
    if(spec.hello){c.exit=0;c.log='Hello from Docker!\nThis message shows that your installation appears to be working correctly.';if(!o.rm)d.c.push(c);return {out:out3+'\n'+c.log+'\n'}}
    if(spec.srv){c.running=true;c.log=spec.log;d.c.push(c);if(o.det)return {out:out3+c.id+'\n'};c.running=false;c.exit=130;return {out:out3+spec.log+'\n(servidor em primeiro plano: no terminal real ele continuaria rodando até Ctrl+C; aqui ele foi interrompido)\n'}}
    // comando de curta duração
    var res='';if(cmd.length){var sub2=T.run_inner(cmd.join(' '));res=sub2;if(cmd[0]==='echo'){}}
    if(o.it&&!cmd.length){c.running=!o.rm&&o.det;}
    c.exit=0;c.log=res.replace(/\n$/,'');if(o.det&&!cmd.length){c.running=true}
    if(!o.rm)d.c.push(c);
    return {out:out3+(o.det?c.id+'\n':res)};
  }
  if(sub==='ps'||sub==='container'&&rest[0]==='ls'){
    var all=rest.indexOf('-a')>-1||rest.indexOf('--all')>-1,q=rest.indexOf('-q')>-1;
    var list=d.c.filter(function(c){return all||c.running}).slice().reverse();
    if(q)return {out:list.map(function(c){return c.id.slice(0,12)}).join('\n')+(list.length?'\n':'')};
    var fi=rest.indexOf('--format');if(fi>-1&&rest[fi+1]){var tpl=rest[fi+1];return {out:list.map(function(c){return tpl.replace(/\{\{\.(\w+)\}\}/g,function(_,k){return k==='Names'?c.name:k==='Image'?c.image.replace(':latest',''):k==='ID'?c.id.slice(0,12):k==='Status'?(c.running?'Up About a minute':'Exited ('+c.exit+') 1 minute ago'):k==='Ports'?c.ports.map(function(p){return p.bind+':'+p.host+'->'+p.cont+'/tcp'}).join(', '):''})}).join('\n')+(list.length?'\n':'')}}
    var rows=[['CONTAINER ID','IMAGE','COMMAND','CREATED','STATUS','PORTS','NAMES']];
    list.forEach(function(c){rows.push([c.id.slice(0,12),c.image.replace(':latest',''),c.cmd,ago(),c.running?'Up About a minute':'Exited ('+c.exit+') 1 minute ago',c.ports.map(function(p){return p.bind+':'+p.host+'->'+p.cont+'/tcp'}).join(', '),c.name])});
    return {out:table(rows)};
  }
  if(['stop','start','restart','kill','rm'].indexOf(sub)>-1||sub==='container'&&['stop','start','rm'].indexOf(rest[0])>-1){
    var sb=sub==='container'?rest[0]:sub,refs=(sub==='container'?rest.slice(1):rest).filter(function(x){return x[0]!=='-'}),force=rest.indexOf('-f')>-1,o4='',e4='';
    if(!refs.length)return {err:'"docker '+sb+'" requires at least 1 argument.\n',code:1};
    refs.forEach(function(r){var c=find(d,r);if(!c){e4+='Error response from daemon: No such container: '+r+'\n'+(sb==='rm'?'':'');return}
      if(sb==='stop'||sb==='kill'){c.running=false;c.exit=sb==='kill'?137:(IMG[repo(c.image)]&&IMG[repo(c.image)].srv?0:137)}
      if(sb==='start'||sb==='restart'){var p=c.ports.filter(function(q){return d.c.some(function(z){return z!==c&&z.running&&z.ports.some(function(w){return w.host===q.host})})})[0];if(p){e4+='Error response from daemon: driver failed programming external connectivity on endpoint '+c.name+': Bind for 0.0.0.0:'+p.host+' failed: port is already allocated\n';return}c.running=true}
      if(sb==='rm'){if(c.running&&!force){e4+='Error response from daemon: cannot remove container "/'+c.name+'": container is running: stop the container before removing or force remove\n';return}d.c.splice(d.c.indexOf(c),1)}
      o4+=r+'\n'});
    return {out:o4,err:e4,code:e4?1:0};
  }
  if(sub==='logs'){var c2=find(d,rest.filter(function(x){return x[0]!=='-'})[0]||'');if(!c2)return {err:'Error response from daemon: No such container: '+(rest[rest.length-1]||'')+'\n',code:1};return {out:c2.log?c2.log+'\n':''}}
  if(sub==='exec'){
    var ar=rest.filter(function(x){return x[0]!=='-'}),c3=find(d,ar[0]||'');
    if(!c3)return {err:'Error response from daemon: No such container: '+(ar[0]||'')+'\n',code:1};
    if(!c3.running)return {err:'Error response from daemon: container '+c3.id+' is not running\n',code:1};
    var ci=rest.indexOf(ar[0]);var cm=rest.slice(ci+1);if(!cm.length)return {err:'docker: "exec" requires at least 2 arguments.\n',code:1};
    if(cm[0]==='hostname')return {out:c3.id.slice(0,12)+'\n'};
    if(cm[0]==='ping'){var tg=cm[cm.length-1],t2=d.c.filter(function(z){return z.running&&(z.name===tg||z.ip===tg)})[0];
      var byName=t2&&t2.name===tg;
      if(!t2||(byName&&(c3.net==='bridge'||t2.net!==c3.net)))return {err:'ping: bad address \''+tg+'\'\n',code:1};
      if(t2.net!==c3.net)return {err:'ping: sendto: Network unreachable\n',code:1};
      return {out:'PING '+tg+' ('+t2.ip+'): 56 data bytes\n64 bytes from '+t2.ip+': seq=0 ttl=64 time=0.089 ms\n\n--- '+tg+' ping statistics ---\n1 packets transmitted, 1 packets received, 0% packet loss\n'}}
    if(cm[0]==='env'||cm[0]==='printenv')return {out:'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nHOSTNAME='+c3.id.slice(0,12)+'\n'+c3.env.join('\n')+(c3.env.length?'\n':'')};
    if(cm[0]==='whoami')return {out:'root\n'};
    if(cm[0]==='pwd')return {out:'/\n'};
    if(cm[0]==='ls'&&cm.length===1)return {out:'bin\ndev\netc\nhome\nproc\nroot\nsys\ntmp\nusr\nvar\n'};
    if(cm[0]==='echo')return {out:cm.slice(1).join(' ')+'\n'};
    if(cm[0]==='ls'&&c3.vols.length){var tgt=cm[cm.length-1];var m=c3.vols.filter(function(v){return v.split(':')[1]===tgt})[0];if(m){var fl=d.volfiles&&d.volfiles[m.split(':')[0]]||[];return {out:fl.join('\n')+(fl.length?'\n':'')}}}
    if(cm[0]==='sh'||cm[0]==='bash'){if(cm[1]==='-c'&&cm[2]){var mm=/^echo\s+(.*?)\s*>\s*(\S+)$/.exec(cm[2]);if(mm){var vol=c3.vols.filter(function(v){return mm[2].indexOf(v.split(':')[1])===0})[0];if(vol){var vn=vol.split(':')[0];d.volfiles=d.volfiles||{};d.volfiles[vn]=d.volfiles[vn]||[];var fn=mm[2].split('/').pop();if(d.volfiles[vn].indexOf(fn)<0)d.volfiles[vn].push(fn);d.volfiles[vn+'::'+fn]=mm[1].replace(/^['"]|['"]$/g,'');return {out:''}}}return {out:cm[2].replace(/^echo\s+/,'')+'\n'}}return {err:'(terminal interativo não disponível neste simulador; use "docker exec NOME comando")\n',code:1}}
    if(cm[0]==='cat'){var key=cm[1];var v2=c3.vols.filter(function(v){return key.indexOf(v.split(':')[1]+'/')===0})[0];if(v2){var f=key.split('/').pop(),val=d.volfiles&&d.volfiles[v2.split(':')[0]+'::'+f];if(val!=null)return {out:val+'\n'};return {err:'cat: can\'t open \''+key+'\': No such file or directory\n',code:1}}}
    return {err:'OCI runtime exec failed: exec failed: unable to start container process: exec: "'+cm[0]+'": executable file not found in $PATH: unknown\n',code:126};
  }
  if(sub==='inspect'){var c4=find(d,rest[rest.length-1]);if(!c4)return {err:'Error: No such object: '+rest[rest.length-1]+'\n',code:1};
    return {out:'[\n    {\n        "Id": "'+c4.id+rid(d).slice(0,0)+'",\n        "Name": "/'+c4.name+'",\n        "State": {\n            "Status": "'+(c4.running?'running':'exited')+'",\n            "Running": '+c4.running+',\n            "ExitCode": '+c4.exit+'\n        },\n        "HostConfig": {\n            "NetworkMode": "'+c4.net+'",\n            "Memory": '+(c4.mem?'"'+c4.mem+'"':0)+',\n            "RestartPolicy": {"Name": "'+(c4.restart||'no')+'"}\n        },\n        "NetworkSettings": {"IPAddress": "'+c4.ip+'"}\n    }\n]\n'}}
  if(sub==='volume'){
    var vs=rest[0],va=rest.slice(1).filter(function(x){return x[0]!=='-'});
    if(vs==='create'){var nm=va[0]||rid(d);if(!d.vol[nm])d.vol[nm]={name:nm,driver:'local'};return {out:nm+'\n'}}
    if(vs==='ls'){var rows2=[['DRIVER','VOLUME NAME']];Object.keys(d.vol).forEach(function(k){rows2.push(['local',k])});return {out:table(rows2)}}
    if(vs==='rm'){var e5='',o5='';va.forEach(function(v){if(!d.vol[v]){e5+='Error response from daemon: get '+v+': no such volume\n';return}var u=d.c.filter(function(c){return c.vols.some(function(x){return x.split(':')[0]===v})})[0];if(u){e5+='Error response from daemon: remove '+v+': volume is in use - ['+u.id+']\n';return}delete d.vol[v];o5+=v+'\n'});return {out:o5,err:e5,code:e5?1:0}}
    if(vs==='inspect'){var vv=d.vol[va[0]];if(!vv)return {err:'Error response from daemon: get '+va[0]+': no such volume\n',code:1};return {out:'[\n    {\n        "CreatedAt": "2026-10-27T13:00:00Z",\n        "Driver": "local",\n        "Mountpoint": "/var/lib/docker/volumes/'+va[0]+'/_data",\n        "Name": "'+va[0]+'",\n        "Scope": "local"\n    }\n]\n'}}
    if(vs==='prune'){return {out:'Total reclaimed space: 0B\n'}}
    return {err:'docker volume: comando desconhecido\n',code:1};
  }
  if(sub==='network'){
    var ns=rest[0],na=rest.slice(1).filter(function(x){return x[0]!=='-'});
    if(ns==='create'){var nm2=na[na.length-1];if(d.net[nm2])return {err:'Error response from daemon: network with name '+nm2+' already exists\n',code:1};d.net[nm2]={id:rid(d).slice(0,12),driver:'bridge',user:true};return {out:rid(d)+rid(d).slice(0,52)+'\n'}}
    if(ns==='ls'){var rows3=[['NETWORK ID','NAME','DRIVER','SCOPE']];Object.keys(d.net).forEach(function(k){rows3.push([d.net[k].id,k,d.net[k].driver,'local'])});return {out:table(rows3)}}
    if(ns==='rm'){var e6='',o6='';na.forEach(function(n){if(['bridge','host','none'].indexOf(n)>-1){e6+='Error response from daemon: '+n+' is a pre-defined network and cannot be removed\n';return}if(!d.net[n]){e6+='Error response from daemon: network '+n+' not found\n';return}var u=d.c.filter(function(c){return c.net===n})[0];if(u){e6+='Error response from daemon: error while removing network: network '+n+' id '+d.net[n].id+' has active endpoints\n';return}delete d.net[n];o6+=n+'\n'});return {out:o6,err:e6,code:e6?1:0}}
    if(ns==='inspect'){var nn=d.net[na[0]];if(!nn)return {err:'Error response from daemon: network '+na[0]+' not found\n',code:1};return {out:'[\n    {\n        "Name": "'+na[0]+'",\n        "Driver": "'+nn.driver+'",\n        "Containers": {'+d.c.filter(function(c){return c.net===na[0]&&c.running}).map(function(c){return '\n            "'+c.id+'": {"Name": "'+c.name+'", "IPv4Address": "'+c.ip+'/16"}'}).join(',')+'\n        }\n    }\n]\n'}}
    return {err:'docker network: comando desconhecido\n',code:1};
  }
  return {err:"docker: '"+sub+"' não é suportado neste simulador.\n",code:1};
});
})();
