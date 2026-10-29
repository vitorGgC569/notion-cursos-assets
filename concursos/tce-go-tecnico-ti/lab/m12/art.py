import re,sys
def load(f):
    t=open(f).read(); t=re.sub(r'\s+',' ',t); return t
def arts(t):
    # split on " Art. N" markers at article starts
    parts=re.split(r'(?= Art\. \d+[º°o]?(?:-[A-Z])?[ \.\-–])',t)
    d={}
    for p in parts:
        m=re.match(r' Art\. (\d+)[º°o]?(-[A-Z])?',p)
        if m:
            k=m.group(1)+(m.group(2) or '')
            d.setdefault(k,[]).append(p.strip())
    return d
if __name__=='__main__':
    f=sys.argv[1]; a=arts(load(f)); n=int(sys.argv[4]) if len(sys.argv)>4 else 400
    for k in range(int(sys.argv[2]),int(sys.argv[3])+1):
        for v in a.get(str(k),[])[:1]: print(v[:n]); 
