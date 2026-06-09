"""
Find ALL tools with "input1" in their inputs (broken) and count them.
Then list what's left to fix.
"""
import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find broken formulas: tools whose inputs block contains "input1"
broken = []
i = 0
while i < len(lines):
    m = re.match(r"^  '([a-z0-9-]+)':", lines[i])
    if m:
        tool_id = m.group(1)
        # Check if this block has input1
        block_end = i + 50  # look ahead
        block_text = "".join(lines[i:min(i+50, len(lines))])
        if '"input1"' in block_text:
            broken.append(tool_id)
    i += 1

print(f"Total broken formulas: {len(broken)}")
for t in broken:
    print(f"  {t}")
