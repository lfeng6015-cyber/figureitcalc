import re, sys

path = sys.argv[1] if len(sys.argv) > 1 else "src/app/data/tools.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

def enhance_keywords(tool_id, tool_name, current_kw):
    base = current_kw.strip().rstrip(",")
    name_lower = tool_name.lower()

    additions = [
        f"free {name_lower} online",
        f"{name_lower} no signup",
    ]

    if "calculator" in name_lower:
        words = name_lower.replace("calculator", "").strip()
        if words:
            additions.append(f"how to calculate {words}")
            additions.append(f"{words} calculator with formula")
    elif "converter" in name_lower:
        words = name_lower.replace("converter", "").strip()
        if words:
            additions.append(f"convert {words} online free")
            additions.append(f"{words} conversion tool")
    elif "generator" in name_lower:
        words = name_lower.replace("generator", "").strip()
        if words:
            additions.append(f"create {words} free online")
            additions.append(f"{words} maker no signup")

    enhanced = base + ", " + ", ".join(additions)
    return enhanced

count = 0
tools_data = re.findall(r'"id": "([^"]+)"\s*,\s*"name": "([^"]+)"[^}]*?"keywords": "([^"]+)"', content, re.DOTALL)

for tool_id, tool_name, current_kw in tools_data:
    if current_kw.count(',') > 8:
        continue

    enhanced = enhance_keywords(tool_id, tool_name, current_kw)
    old_str = '"keywords": "' + current_kw + '"'
    new_str = '"keywords": "' + enhanced + '"'

    if old_str in content:
        content = content.replace(old_str, new_str, 1)
        count += 1

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Enhanced {count} tool keywords with long-tail variations")
