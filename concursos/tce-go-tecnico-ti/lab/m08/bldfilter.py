import sys, re
steps = {}; order = []; cached = set(); ctx = []
for l in sys.stdin:
    l = l.rstrip('\n')
    m = re.match(r'#(\d+) (\[\d+/\d+\].*|\[[^\]]+\] .*)$', l)
    if m and 'FROM' not in m.group(2) and 'internal' not in m.group(2):
        steps[m.group(1)] = m.group(2); order.append(m.group(1)); continue
    m = re.match(r'#(\d+) CACHED', l)
    if m: cached.add(m.group(1)); continue
    m = re.match(r'#\d+ transferring context: ([0-9.]+ ?[kMG]?B)', l)
    if m: ctx.append(m.group(1))
    if re.match(r'#\d+ ERROR', l): print(l)
if ctx: print('contexto enviado ao daemon:', ctx[-1])
seen = set()
for k in sorted(order, key=lambda k: int(re.match(r'\[(\d+)/', steps[k]).group(1)) if re.match(r'\[(\d+)/', steps[k]) else 99):
    if k in seen: continue
    seen.add(k)
    print(('%-62s' % steps[k][:62]) + ('  CACHED' if k in cached else '  executado'))
