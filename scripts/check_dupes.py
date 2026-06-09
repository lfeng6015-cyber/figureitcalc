import re
from collections import Counter

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

keys = re.findall(r"^  '([a-z0-9-]+)':", content, re.MULTILINE)
counts = Counter(keys)
dupes = {k: v for k, v in counts.items() if v > 1}

print(f"Total formulas: {len(keys)}")
print(f"Unique keys: {len(set(keys))}")
print(f"Duplicates: {len(dupes)}")

if dupes:
    for k, v in dupes.items():
        print(f"  {k}: {v}x")
