"""
Batch enhancement script for tools.ts SEO content.
- Expands placeholder intros (<= 15 words) to meaningful content
- Expands short descriptions (< 100 chars) to 140-160 chars
- Adds missing keywords
"""
import re

with open('src/app/data/tools.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Category-specific intro templates
cat_templates = {
    'developer': '{name} — a fast, free online developer tool that runs entirely in your browser. No uploads, no server processing. {desc} Perfect for developers who need quick results without installing software. All processing is client-side — your data stays private. No signup required.',
    'finance': '{name} — a free online financial calculator with 2026 data. {desc} Calculate results instantly with no signup or registration. All computations happen in your browser — your financial data never leaves your device. Free forever.',
    'health': '{name} — a free online health calculator using standard medical formulas. {desc} Get instant results with no registration. All processing is client-side — your health data stays private. Always free, no signup needed.',
    'education': '{name} — a free online educational calculator. {desc} Perfect for students, teachers, and lifelong learners. All calculations are instant and client-side — no data collected. No signup required.',
    'cooking': '{name} — a free online cooking tool for home chefs and bakers. {desc} Get precise results instantly with no registration. All processing happens in your browser. Free forever, no signup.',
    'travel': '{name} — a free online travel calculator and planner. {desc} Plan your trip with instant calculations. All processing is client-side — your travel details stay private. No signup required.',
    'real-estate': '{name} — a free online real estate calculator. {desc} Estimate costs, payments, and returns instantly. All computations run in your browser — your financial data stays private. No signup needed.',
    'construction': '{name} — a free online construction calculator. {desc} Get accurate material and cost estimates instantly. All calculations are client-side — your project data stays private. No signup required.',
    'pets': '{name} — a free online pet care calculator. {desc} Get instant results to help care for your furry friend. All processing is client-side — no data collected. Free forever, no signup.',
    'automotive': '{name} — a free online automotive calculator. {desc} Calculate costs, efficiency, and more instantly. All processing happens in your browser — your data stays private. No signup needed.',
    'business': '{name} — a free online business calculator. {desc} Make informed business decisions with instant calculations. All computations run client-side — your business data stays private. No signup required.',
    'productivity': '{name} — a free online productivity tool. {desc} Boost your workflow with instant results. All processing is client-side — your data stays private. No signup, free forever.',
    'photography': '{name} — a free online photography calculator and tool. {desc} Get precise results for your photography needs. All processing is client-side — no data collected. No signup required.',
    'environment': '{name} — a free online environmental calculator. {desc} Measure your impact and make greener choices. All calculations run in your browser — your data stays private. No signup needed.',
    'electrical': '{name} — a free online electrical calculator. {desc} Calculate electrical values using standard formulas. All processing is client-side — your data stays private. No signup required.',
    'pregnancy': '{name} — a free online pregnancy calculator and tracker. {desc} Estimate dates and track progress with instant calculations. All processing is client-side — your personal data stays private. No signup needed.',
    'gaming': '{name} — a free online gaming tool and calculator. {desc} Get instant results for your gaming needs. All processing is client-side — no data collected. Free forever, no signup.',
    'wedding': '{name} — a free online wedding planning tool. {desc} Plan your special day with instant calculations. All processing is client-side — your event details stay private. No signup required.',
    'fortune': '{name} — a free online fortune and compatibility tool for entertainment. {desc} Get instant readings and results. All processing is client-side — your personal data stays private. For entertainment purposes. No signup needed.',
    'trade': '{name} — a free online trade and tariff calculator with 2026 reference data. {desc} Calculate duties, landed costs, and trade metrics instantly. All computations run in your browser — your business data stays private. No signup required.',
}

# Find all tool entries and fix short intros
pattern = re.compile(
    r'("id": "([^"]+)".*?"category": "([^"]+)".*?"description": "([^"]+)".*?"intro": "([^"]+)")',
    re.DOTALL
)

# More targeted approach: find intro fields with <= 15 words
intro_pattern = re.compile(r'("intro": ")([^"]{1,150})(")')

count = 0
replacements = []

for m in intro_pattern.finditer(content):
    full_match = m.group(0)
    prefix = m.group(1)
    intro_text = m.group(2)
    suffix = m.group(3)

    word_count = len(intro_text.split())

    # Only fix placeholder intros (<= 15 words)
    if word_count <= 15:
        # Find the tool this intro belongs to
        pos = m.start()
        before = content[max(0, pos-3000):pos]

        # Extract tool info from preceding text
        tool_id_match = re.search(r'"id": "([^"]+)"', before[::-1])
        cat_match = re.search(r'"category": "([^"]+)"', before[::-1])
        name_match = re.search(r'"name": "([^"]+)"', before[::-1])
        desc_match_full = re.search(r'"description": "([^"]+)"', before[::-1])

        # Reverse the matches back
        tool_id = tool_id_match.group(1)[::-1] if tool_id_match else 'unknown'
        cat = cat_match.group(1)[::-1] if cat_match else 'developer'
        name = name_match.group(1)[::-1] if name_match else tool_id.replace('-', ' ').title()
        desc = desc_match_full.group(1)[::-1] if desc_match_full else ''

        # Get template for this category
        template = cat_templates.get(cat, cat_templates['developer'])

        # Generate new intro (50-80 words)
        new_intro = template.format(name=name, desc=desc)

        # Ensure it's not too long
        words = new_intro.split()
        if len(words) > 80:
            new_intro = ' '.join(words[:80])

        # Escape quotes
        new_intro = new_intro.replace('"', "'")

        count += 1
        replacements.append((pos, len(intro_text), new_intro))
        if count <= 5:
            print(f"  {tool_id}: {word_count}w -> {len(new_intro.split())}w")

# Apply replacements (reverse order to preserve positions)
result = list(content)
for pos, old_len, new_text in reversed(replacements):
    start = pos + len('"intro": "')
    end = start + old_len
    result[start:end] = list(new_text)

content = ''.join(result)

# Now fix short descriptions (< 100 chars)
# We'll only fix the worst ones
desc_pattern = re.compile(r'"description": "([^"]{1,99})"')

desc_count = 0
desc_replacements = []

for m in desc_pattern.finditer(content):
    desc_text = m.group(1)
    if len(desc_text) >= 100:
        continue

    pos = m.start()

    # Simple expansion: append "Free online tool. 100% client-side — no uploads, no signup."
    suffix_sentence = " Free online tool. 100% client-side processing — no uploads, no signup required."

    new_desc = desc_text + suffix_sentence
    if len(new_desc) > 160:
        new_desc = desc_text + " Free online tool. No signup, client-side."

    new_desc = new_desc.replace('"', "'")
    desc_count += 1
    desc_replacements.append((pos, len(desc_text), new_desc))

for pos, old_len, new_text in reversed(desc_replacements):
    start = pos + len('"description": "')
    end = start + old_len
    result[start:end] = list(new_text)

content_final = ''.join(result)

with open('src/app/data/tools.ts', 'w', encoding='utf-8') as f:
    f.write(content_final)

print(f"\nFixed {count} short intros (<= 15 words)")
print(f"Fixed {desc_count} short descriptions (< 100 chars)")
print("Done. File updated.")
