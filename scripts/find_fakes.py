import re, json

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Find all formula keys and their formula function bodies
pattern = r"'([a-z0-9-]+)':\s*\{[^}]*?formula:\s*\([^)]*\)\s*=>\s*\[([^\]]*)\]"
blocks = re.findall(pattern, content, re.DOTALL)

fake = []
for tool_id, results in blocks:
    rlower = results.lower()
    if any(w in rlower for w in [
        'generated in preview', 'upload a file', 'upload an image',
        'click generate', 'click record', 'click to spin',
        'enter url', 'enter both', 'rendered as',
        'type in the editor', 'press any key',
        'computed client-side', 'parsed in',
        'check iban', 'run to see', 'compared in preview',
        'converted in preview', 'plotted in preview',
        'compressed in preview', 'get your daily',
        'cast coins', 'instructions', '??',
        'enter a url', 'type both names',
    ]):
        fake.append(tool_id)

print(f"Found {len(fake)} non-functional tools:")
for t in fake:
    print(f"  {t}")

# Also check for tools that don't use input values
fake2 = []
for tool_id, results in blocks:
    if 'F(v.' not in results and 'v.' not in results and '_v' in results:
        fake2.append(tool_id)

print(f"\nTools that ignore all inputs (separate check): {len(fake2)}")
for t in fake2:
    print(f"  {t}")
