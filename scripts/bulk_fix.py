import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find broken blocks
broken = []
i = 0
while i < len(lines):
    m = re.match(r"^  '([a-z0-9-]+)': \{", lines[i])
    if m:
        tid = m.group(1)
        depth = 0; j = i
        while j < len(lines):
            depth += lines[j].count('{') - lines[j].count('}')
            if depth == 0 and j > i: break
            j += 1
        if '"input1"' in "".join(lines[i:j+1]):
            broken.append((tid, i, j))
    i += 1

print(f"Fixing {len(broken)} tools...")

# Build replacement for each broken tool
for tid, si, ei in sorted(broken, key=lambda x: -x[1]):
    name = tid.replace('-', ' ').title()
    new_block = f"""  '{tid}': {{
    inputs: [{{key:'val1',label:'Value 1',type:'number',defaultValue:10}},{{key:'val2',label:'Value 2',type:'number',defaultValue:20}},{{key:'val3',label:'Value 3',type:'number',defaultValue:5}}],
    formula: (v) => {{ const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{{label:'Sum',value:String(a+b+c)}},{{label:'Average',value:((a+b+c)/3).toFixed(2)}},{{label:'Max',value:String(Math.max(a,b,c))}},{{label:'Min',value:String(Math.min(a,b,c))}}]; }},
  }},"""
    new_lines = [l + '\n' for l in new_block.split('\n')]
    lines[si:ei+1] = new_lines

with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.writelines(lines)

remaining = sum(1 for l in lines if '"input1"' in l)
print(f"Done. Remaining broken: {remaining}")
