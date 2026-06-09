import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Get tool names from tools.ts
with open("src/app/data/tools.ts", "r", encoding="utf-8") as f:
    tools_ts = f.read()

tool_names = {}
for m in re.finditer(r'"id":\s*"([^"]+)"[^}]*?"name":\s*"([^"]+)"', tools_ts):
    tool_names[m.group(1)] = m.group(2)

# Find each tool's formula
keys = re.findall(r"'([a-z0-9-]+)':\s*\{", content)
print(f"Checking {len(keys)} tools...\n")

broken = []
for i, key in enumerate(keys):
    start = content.find(f"'{key}': {{")
    if start < 0: continue
    # Find end
    next_end = len(content)
    for k in keys[i+1:]:
        nk = content.find(f"'{k}': {{", start + 10)
        if nk > 0: next_end = min(next_end, nk); break
    body = content[start:next_end]
    
    # Find formula section
    fstart = body.find('formula:')
    if fstart < 0: continue
    fb = body[fstart:]
    
    # Count actual computation
    fvcalls = len(re.findall(r'F\(v\.\w+\)', fb))
    mathops = len(re.findall(r'[+\-*/]\s*(F\(|Math\.|\d)', fb))
    strfns = len(re.findall(r'btoa|atob|encodeURI|\.replace\(|\.split\(|\.join\(|\.map\(|\.forEach\(|new RegExp|JSON\.parse|JSON\.stringify|new Date|new URL|\.toString\(', fb))
    randomc = len(re.findall(r'Math\.random|Math\.floor.*random', fb))
    navigator = len(re.findall(r'navigator\.|screen\.|window\.', fb))
    
    total_ops = fvcalls + mathops + strfns + randomc + navigator
    
    # Extract output labels
    ret = fb.find('return')
    labels = re.findall(r"label:\s*'([^']+)'", fb[ret:]) if ret > 0 else []
    
    name = tool_names.get(key, key)
    
    # Classify
    if total_ops == 0:
        broken.append(f"[DEAD] {key}: {name} — absolutely no computation")
    elif total_ops <= 1 and randomc == 0 and fvcalls == 0:
        broken.append(f"[MINIMAL] {key}: {name} — nearly no computation, outputs: {labels[:3]}")

print(f"Issues found: {len(broken)}")
for b in broken:
    print(f"  {b}")
