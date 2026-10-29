# -*- coding: utf-8 -*-
# Citacoes literais em ingles usadas na Teoria e nas questoes do Modulo 14.
# Cada chave aponta para um arquivo da pasta fontes/ e para o trecho literal esperado.
# get(chave) devolve o trecho SOMENTE se ele existir no arquivo (espacos normalizados).
import os,re
HERE=os.path.dirname(os.path.abspath(__file__))
FONTES=os.path.join(HERE,'fontes')
def norm(s):
    s=s.replace('\u2019',"'").replace('\u2018',"'").replace('\u201c','"').replace('\u201d','"').replace('\xa0',' ')
    return re.sub(r'\s+',' ',s).strip()
Q={
 'rfc2119_must':('rfc2119.txt','This word, or the terms "REQUIRED" or "SHALL", mean that the definition is an absolute requirement of the specification.'),
 'rfc2119_mustnot':('rfc2119.txt','This phrase, or the phrase "SHALL NOT", mean that the definition is an absolute prohibition of the specification.'),
 'rfc2119_should':('rfc2119.txt','This word, or the adjective "RECOMMENDED", mean that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.'),
 'rfc2119_may':('rfc2119.txt','This word, or the adjective "OPTIONAL", mean that an item is truly optional.'),
 'rfc9110_safe':('rfc9110.txt','Request methods are considered "safe" if their defined semantics are essentially read-only; i.e., the client does not request, and does not expect, any state change on the origin server as a result of applying a safe method to a target resource.'),
 'rfc9110_idem':('rfc9110.txt','A request method is considered "idempotent" if the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request.'),
 'rfc9110_idem2':('rfc9110.txt','Of the request methods defined by this specification, PUT, DELETE, and safe request methods are idempotent.'),
 'mdn_classes':('mdn_status.clean.txt','Responses are grouped in five classes:'),
 'mdn_201':('mdn_status.clean.txt','The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.'),
 'mdn_401':('mdn_status.clean.txt','Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".'),
 'mdn_403':('mdn_status.clean.txt','The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.'),
 'mdn_404':('mdn_status.clean.txt','The server cannot find the requested resource.'),
 'mdn_429':('mdn_status.clean.txt','The user has sent too many requests in a given amount of time (rate limiting).'),
 'mdn_503':('mdn_status.clean.txt','The server is not ready to handle the request.'),
 'mdn_500':('mdn_status.clean.txt','The server has encountered a situation it does not know how to handle.'),
 'mdn_301':('mdn_status.clean.txt','The URL of the requested resource has been changed permanently. The new URL is given in the response.'),
 'mdn_400':('mdn_status.clean.txt','The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).'),
 'mdn_102':('mdn_status.clean.txt','The response code has been deprecated and it is no longer used.'),
 'sem_patch':('semver.clean.txt','Patch version Z (x.y.Z | x > 0) MUST be incremented if only backward compatible bug fixes are introduced.'),
 'sem_minor':('semver.clean.txt','Minor version Y (x.Y.z | x > 0) MUST be incremented if new, backward compatible functionality is introduced to the public API. It MUST be incremented if any public API functionality is marked as deprecated.'),
 'sem_major':('semver.clean.txt','Major version X (X.y.z | X > 0) MUST be incremented if any backward incompatible changes are introduced to the public API.'),
 'sem_zero':('semver.clean.txt','Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.'),
 'sem_pre':('semver.clean.txt','A pre-release version indicates that the version is unstable and might not satisfy the intended compatibility requirements as denoted by its associated normal version.'),
 'venv_intro':('py_venv.clean.txt','Python applications will often use packages and modules that don\u2019t come as part of the standard library. Applications will sometimes need a specific version of a library, because the application may require that a particular bug has been fixed or the application may be written using an obsolete version of the library\u2019s interface.'),
 'venv_solution':('py_venv.clean.txt','The solution for this problem is to create a virtual environment, a self-contained directory tree that contains a Python installation for a particular version of Python, plus a number of additional packages.'),
 'pg_advantage':('pg_backup.clean.txt','An important advantage of pg_dump over the other backup methods described later is that pg_dump\'s output can generally be re-loaded into newer versions of PostgreSQL, whereas file-level backups and continuous archiving are both extremely server-version-specific.'),
 'pg_perm':('pg_backup.clean.txt','pg_dump does not operate with special permissions. In particular, it must have read access to all tables that you want to back up, so in order to back up the entire database you almost always have to run it as a database superuser.'),
 'git_title':('git_commit.clean.txt','The text up to the first blank line in a commit message is treated as the commit title, and that title is used throughout Git.'),
 'git_desc':('git_commit.clean.txt','Create a new commit containing the current contents of the index and the given log message describing the changes.'),
 'kac_what':('keepachangelog.clean.txt','A changelog is a file which contains a curated, chronologically ordered list of notable changes for each version of a project.'),
 'kac_why':('keepachangelog.clean.txt','To make it easier for users and contributors to see precisely what notable changes have been made between each release (or version) of the project.'),
 'oas_intro':('openapi.clean.txt','The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.'),
 'oas_guess':('openapi.clean.txt','Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.'),
 'curl_desc':('man_curl.clean.txt','curl is a tool for transferring data from or to a server using URLs.'),
 'kac_added':('keepachangelog.clean.txt','Added for new features.'),
 'kac_changed':('keepachangelog.clean.txt','Changed for changes in existing functionality.'),
 'kac_dep':('keepachangelog.clean.txt','Deprecated for soon-to-be removed features.'),
 'kac_rem':('keepachangelog.clean.txt','Removed for now removed features.'),
 'kac_fixed':('keepachangelog.clean.txt','Fixed for any bug fixes.'),
 'kac_sec':('keepachangelog.clean.txt','Security in case of vulnerabilities.'),
 'sem_summary':('semver.clean.txt','Given a version number MAJOR.MINOR.PATCH, increment the: MAJOR version when you make incompatible API changes MINOR version when you add functionality in a backward compatible manner PATCH version when you make backward compatible bug fixes'),
 'mdn_4xx':('mdn_status.clean.txt','Client error responses (400 \u2013 499)'),
 'mdn_5xx':('mdn_status.clean.txt','Server error responses (500 \u2013 599)'),
 'mdn_2xx':('mdn_status.clean.txt','Successful responses (200 \u2013 299)'),
 'mdn_3xx':('mdn_status.clean.txt','Redirection messages (300 \u2013 399)'),
 'mdn_1xx':('mdn_status.clean.txt','Informational responses (100 \u2013 199)'),
}
_cache={}
def _file(f):
    if f not in _cache: _cache[f]=norm(open(os.path.join(FONTES,f),encoding='utf-8',errors='ignore').read())
    return _cache[f]
def check(k):
    f,t=Q[k]; return norm(t) in _file(f)
def get(k):
    f,t=Q[k]
    if not check(k): raise KeyError('citacao NAO encontrada: '+k)
    return norm(t)
