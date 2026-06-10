"""Comprehensive tool audit against CLAUDE.md Section 3.4 rules."""
import re, json

with open('src/app/data/tools.ts', 'r', encoding='utf-8') as f:
    content = f.read()

with open('src/app/data/formulas.ts', 'r', encoding='utf-8') as f:
    formulas_content = f.read()

valid_cats = {'developer','finance','trade','health','education','cooking','travel',
    'real-estate','construction','pets','automotive','business','productivity',
    'photography','environment','electrical','pregnancy','gaming','wedding','fortune'}

valid_comps = {'calculator','stopwatch','regex','base64','url','tip','timestamp','mortgage',
    'md5','jwt','json','emoji','discount','diff','compound-interest','color','camera','bmi','keycode','regex-cheatsheet'}

# Extract tool blocks
tool_blocks = []
idx = 0
while True:
    start = content.find('"id": "', idx)
    if start == -1:
        break
    obj_start = content.rfind('{', 0, start)
    if obj_start == -1:
        break
    depth = 0
    obj_end = obj_start
    for i in range(obj_start, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                obj_end = i + 1
                break
    if obj_end == obj_start:
        break
    tool_blocks.append(content[obj_start:obj_end])
    idx = obj_end

print(f"Total tools parsed: {len(tool_blocks)}")

issues = []
warnings = []
chinese_pattern = re.compile(r'[一-鿿]')
no_formula_tools = []

for block in tool_blocks:
    tid = re.search(r'"id":\s*"([^"]+)"', block)
    tcomp = re.search(r'"component":\s*"([^"]+)"', block)
    tcat = re.search(r'"category":\s*"([^"]+)"', block)
    tdesc = re.search(r'"description":\s*"([^"]{10,})"', block)

    tool_id = tid.group(1) if tid else 'UNKNOWN'
    comp = tcomp.group(1) if tcomp else 'MISSING'
    cat = tcat.group(1) if tcat else 'MISSING'

    # 1. Unknown component
    if comp not in valid_comps:
        issues.append(f"[BAD-COMPONENT] {tool_id}: '{comp}'")

    # 2. Unknown category
    if cat not in valid_cats:
        issues.append(f"[BAD-CATEGORY] {tool_id}: '{cat}'")

    # 3. Calculator without formula
    if comp == 'calculator':
        if "'" + tool_id + "':" not in formulas_content and '"' + tool_id + '":' not in formulas_content:
            no_formula_tools.append(tool_id)

    # 4. SEO title check
    seo = re.search(r'"seo":\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}', block)
    if seo:
        seo_block = seo.group(1)
        # title
        st = re.search(r'"title":\s*"([^"]+)"', seo_block)
        if st:
            t = st.group(1)
            if len(t) < 30:
                issues.append(f"[TITLE-SHORT] {tool_id}: {len(t)}c")
            if 'figureitcalc' not in t.lower():
                warnings.append(f"[TITLE-NO-BRAND] {tool_id}")
        else:
            issues.append(f"[NO-TITLE] {tool_id}")

        # description
        sd = re.search(r'"description":\s*"([^"]+)"', seo_block)
        if sd:
            d = sd.group(1)
            if len(d) < 100:
                issues.append(f"[DESC-SHORT] {tool_id}: {len(d)}c")
        else:
            issues.append(f"[NO-DESC] {tool_id}")

        # keywords
        sk = re.search(r'"keywords":\s*"([^"]+)"', seo_block)
        if sk:
            kw_count = len(sk.group(1).split(','))
            if kw_count < 8:
                issues.append(f"[KW-FEW] {tool_id}: {kw_count} keywords")
        else:
            issues.append(f"[NO-KW] {tool_id}")

        # intro
        si = re.search(r'"intro":\s*"([^"]+)"', seo_block)
        if si:
            wc = len(si.group(1).split())
            if wc < 80:
                warnings.append(f"[INTRO-SHORT] {tool_id}: {wc} words")
        else:
            issues.append(f"[NO-INTRO] {tool_id}")

        # Chinese check
        for field in ['h1','title','description','keywords','intro']:
            m = re.search(f'"{field}":\s*"([^"]*)"', seo_block)
            if m and chinese_pattern.search(m.group(1)):
                issues.append(f"[CHINESE] {tool_id}: Chinese in {field}")

    # 5. FAQ count
    faq_matches = re.findall(r'"q":\s*"', block)
    if len(faq_matches) < 2:
        issues.append(f"[FAQ-FEW] {tool_id}: {len(faq_matches)} FAQs")

    # 6. HowTo
    howto = re.search(r'"howTo":\s*\[([^\]]*)\]', block)
    if howto:
        steps = re.findall(r'"([^"]+)"', howto.group(1))
        if len(steps) < 3:
            issues.append(f"[HOWTO-FEW] {tool_id}: {len(steps)} steps")

print(f"\n=== CRITICAL ISSUES ({len(issues)}) ===")
for i in sorted(issues):
    print(f"  {i}")

print(f"\n=== NO FORMULA (calculator tools) ({len(no_formula_tools)}) ===")
for t in sorted(no_formula_tools):
    print(f"  {t}")

print(f"\n=== WARNINGS ({len(warnings)}) ===")
for w in sorted(warnings):
    print(f"  {w}")

# Stats
cats = {}
for block in tool_blocks:
    m = re.search(r'"category":\s*"([^"]+)"', block)
    if m:
        cats[m.group(1)] = cats.get(m.group(1), 0) + 1
print(f"\n=== SUMMARY ===")
print(f"Total tools: {sum(cats.values())}")
print(f"Critical issues: {len(issues)}")
print(f"No-formula calculators: {len(no_formula_tools)}")
print(f"Warnings: {len(warnings)}")
