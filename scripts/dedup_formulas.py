"""
Deduplicate formulas.ts — keep the LAST occurrence of each key (the enhanced version).
"""
import re

path = "src/app/data/formulas.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Find all formula keys and their positions
pattern = re.compile(r"^  '([a-z0-9-]+)':\s*\{", re.MULTILINE)
matches = list(pattern.finditer(content))

seen = {}
to_remove = []

for m in matches:
    key = m.group(1)
    if key in seen:
        # Mark previous occurrence for removal
        prev_pos = seen[key]
        # Find the block from prev_pos to the next entry or closing
        to_remove.append((prev_pos, m.start()))
    seen[key] = m.group(1)

print(f"Found {len(matches)} total formulas")
print(f"Unique keys: {len(seen)}")
print(f"Duplicates to remove: {len(to_remove)}")

# Remove duplicates (process from end to start to preserve positions)
for start, end in sorted(to_remove, reverse=True):
    # Remove from the previous entry's closing }, to just before the duplicate key
    # We need to find the exact block: from "  'key':\s*{" to the next "  '"
    block = content[start:end]
    # Remove trailing comma and whitespace
    block_stripped = block.rstrip().rstrip(',').rstrip()
    content = content[:start] + content[end:]

# Clean up any double commas or whitespace issues
with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Deduplication complete")
