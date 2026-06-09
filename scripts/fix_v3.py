"""
Direct line-based replacement of broken formulas.
"""
import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Map tool_id -> (start_line, end_line) for broken entries
broken_blocks = []
i = 0
while i < len(lines):
    m = re.match(r"^  '([a-z0-9-]+)': \{", lines[i])
    if m:
        tool_id = m.group(1)
        # Find the closing of this block
        depth = 0
        j = i
        while j < len(lines):
            depth += lines[j].count('{') - lines[j].count('}')
            if depth == 0 and j > i:
                break
            j += 1
        # Check if inputs contain input1
        block = "".join(lines[i:j+1])
        if '"input1"' in block:
            broken_blocks.append((tool_id, i, j))
    i += 1

print(f"Found {len(broken_blocks)} broken formulas")

# Show the first 10
for t, s, e in broken_blocks[:10]:
    print(f"  {t}: lines {s+1}-{e+1}")
