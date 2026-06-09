import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Find all tool keys
keys = re.findall(r"'([a-z0-9-]+)':\s*\{", content)
print(f"Total tools found: {len(keys)}")
# For each key, extract body until next key or end
bodies = {}
for i, key in enumerate(keys):
    start = content.find(f"'{key}': {{")
    if start < 0: continue
    # Find end: next key or end of registry
    next_key_idx = len(content)
    for k in keys[i+1:]:
        nk = content.find(f"'{k}': {{", start + 10)
        if nk > 0:
            next_key_idx = min(next_key_idx, nk)
            break
    bodies[key] = content[start:next_key_idx]

matches = [(k, v) for k, v in bodies.items()]

issues = []
ok = []

for tid, body in matches:
    body = body.strip()
    if 'formula:' not in body:
        continue

    # Only check the formula body (after 'formula:')
    formula_start = body.find('formula:')
    fb = body[formula_start:] if formula_start > 0 else body

    has_math = bool(re.search(r'[\+\-\*\/]\s*F\(|Math\.(?!random)', fb))
    has_rand = bool(re.search(r'Math\.random|Math\.floor.*random|\.getRandomValues', fb))
    has_str = bool(re.search(r'\.replace\(|\.split\(|\.join\(|\.map\(|btoa|atob|encodeURI|new RegExp|\.match\(|JSON\.parse|JSON\.stringify|new Date|new URL|\.forEach|new Function|eval', fb))
    has_encode = bool(re.search(r'btoa|atob|encodeURI|\.toString\(16\)|\.toString\(2\)|\.padStart', fb))

    # Extract only formula return labels (after 'return')
    return_start = fb.find('return')
    if return_start > 0:
        labels = re.findall(r"label:\s*'([^']+)'", fb[return_start:])
    else:
        labels = []
    label_text = '; '.join(labels[:6]) if labels else 'none'

    # Check for static placeholder outputs
    static_words = ['Ready', 'Scan with', 'Press any', 'Grant', 'Enter valid', 'Type both', 'Click', 'Testing only', 'Look up']
    is_static = any(w.lower() in label_text.lower() for w in static_words)

    if is_static and not has_str and not has_rand and not has_math:
        issues.append(f"[STATIC] {tid}: {label_text}")
    elif not has_math and not has_str and not has_rand:
        issues.append(f"[NO-COMPUTE] {tid}: {label_text}")
    else:
        ok.append(f"{tid}: {label_text}")

print(f"OK: {len(ok)} tools")
print(f"ISSUES: {len(issues)} tools")
for i in issues:
    print(f"  {i}")
