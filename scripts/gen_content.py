"""Generate rich SEO content for ALL 183 tools that don't have it yet."""
import re

with open("src/app/data/tools.ts", "r", encoding="utf-8") as f:
    tools_ts = f.read()
with open("src/app/data/content.ts", "r", encoding="utf-8") as f:
    content_ts = f.read()

# Get all tool IDs
all_ids = list(set(re.findall(r'"id": "([a-z0-9-]+)"', tools_ts)))
# Get tools already with content
have_content = set(re.findall(r"'([a-z0-9-]+)':\s*\{", content_ts))
missing = [tid for tid in all_ids if tid not in have_content]

print(f"Generating content for {len(missing)} tools")

# Category-specific content templates
def generate_content(tool_id, name, category):
    n = name
    n_lower = n.lower()

    whatIs = f"A {n} is a free online tool that helps you quickly calculate, convert, or determine {n_lower} results without downloading any software. Whether you are a student, professional, or casual user, this {n_lower} provides instant, accurate results right in your browser. All processing happens 100% client-side — your data never leaves your device. No signup, no registration required. Perfect for quick calculations, learning, and everyday use."

    howItWorks = f"Enter your input values into the fields above. The {n} instantly computes the result using standard mathematical formulas and displays the output below. You can adjust any input and the result updates automatically. All calculations happen locally in your browser via JavaScript — nothing is sent to any server."

    formula = "Results are computed using standard mathematical operations. Adjust the input values to see different results. All calculations are performed client-side for privacy and speed."

    # Category-specific use cases
    uc_map = {
        'finance': [f"Financial planning and budgeting using {n_lower}", f"Comparing different financial scenarios with the {n_lower}", f"Students learning financial concepts with hands-on calculations", f"Professionals needing quick {n_lower} estimates", f"Anyone wanting to understand their financial numbers better"],
        'health': [f"Tracking personal health metrics with the {n_lower}", f"Fitness professionals assessing client data", f"Healthcare students learning measurement concepts", f"Setting health goals based on {n_lower} calculations", f"Comparing your results to standard health guidelines"],
        'developer': [f"Quick calculations during software development", f"Encoding, decoding, or formatting data efficiently", f"Testing and debugging with the {n_lower}", f"Learning programming concepts with hands-on tools", f"Daily development workflow optimization"],
        'cooking': [f"Adjusting recipes with the {n_lower}", f"Scaling ingredients for different serving sizes", f"Home bakers perfecting their bread and pastries", f"Professional chefs planning menu portions", f"Learning cooking science and techniques"],
        'travel': [f"Planning trip budgets with the {n_lower}", f"Estimating travel costs before booking", f"Comparing different travel options", f"Road trip planning and fuel estimation", f"International travel currency and time conversions"],
        'construction': [f"Estimating materials for DIY projects", f"Contractors calculating job requirements", f"Homeowners planning renovation budgets", f"Architects and designers verifying dimensions", f"Learning construction math and estimation"],
        'pets': [f"Pet owners tracking their animal's health", f"Veterinarians providing quick estimates to clients", f"New pet owners learning about pet care", f"Comparing pet food and nutrition options", f"Understanding your pet's life stage and needs"],
        'fortune': [f"Fun entertainment with friends using the {n_lower}", f"Party icebreaker and conversation starter", f"Self-reflection and personal insight", f"Social media sharing and engagement", f"Exploring different divination and numerology systems"],
        'gaming': [f"Improving your gameplay with strategic calculations", f"Game developers balancing mechanics and probabilities", f"Tabletop RPG players planning encounters", f"Esports players optimizing their setup", f"Learning game theory and probability concepts"],
        'business': [f"Entrepreneurs making data-driven decisions", f"Freelancers calculating rates and invoices", f"Small business owners planning budgets", f"Marketing professionals analyzing campaign metrics", f"Business students learning practical applications"],
        'education': [f"Students checking homework and assignments", f"Teachers demonstrating concepts in class", f"Self-learners exploring new subjects", f"Parents helping children with schoolwork", f"Academic research and data analysis"],
        'photography': [f"Photographers planning shoots and settings", f"Print preparation and sizing calculations", f"Camera equipment comparison and selection", f"Photography students learning technical concepts", f"Professional workflow optimization"],
    }
    useCases = uc_map.get(category, [f"Quick {n_lower} calculations whenever needed", f"Professional use of {n_lower} for work or study", f"Learning how {n_lower} works with hands-on practice", f"Comparing different scenarios using the {n_lower}", f"Everyday use for quick reference and calculations"])

    tips = [
        f"Bookmark this {n_lower} for quick access whenever you need it",
        f"Try different input values to see how the results change",
        f"Use the preset buttons (if available) for common scenarios",
        f"All calculations are client-side — your data stays private and secure"
    ]

    faq = [
        {"q": f"Is this {n} free to use?", "a": f"Yes — completely free. No signup, no registration, no premium tiers. The {n} is free forever, supported by non-intrusive advertising."},
        {"q": f"Is my data secure when using the {n}?", "a": f"Yes. All processing happens locally in your browser via JavaScript. Your input data never leaves your device and is never sent to any server. We cannot see, access, or store your data."},
        {"q": f"How accurate is the {n}?", "a": f"The {n} uses standard mathematical formulas and algorithms. Results are accurate based on the inputs provided. For mission-critical applications, always verify results with alternative methods."},
    ]

    return {"whatIs": whatIs, "howItWorks": howItWorks, "formula": formula, "useCases": useCases, "tips": tips, "faq": faq}

# Generate content entries
entries = []
for tool_id in missing:
    # Get name and category from tools.ts
    name_match = re.search(rf'"id": "{tool_id}".*?"name": "([^"]+)"', tools_ts)
    cat_match = re.search(rf'"id": "{tool_id}".*?"category": "([^"]+)"', tools_ts)
    if not name_match: continue
    name = name_match.group(1)
    category = cat_match.group(1) if cat_match else "developer"

    c = generate_content(tool_id, name, category)

    # Format as TypeScript
    whatIs_esc = c['whatIs'].replace("'", "\\'").replace('\n', '\\n')
    howItWorks_esc = c['howItWorks'].replace("'", "\\'").replace('\n', '\\n')
    formula_esc = c['formula'].replace("'", "\\'").replace('\n', '\\n')
    useCases_str = "[" + ", ".join(f"'{uc.replace(chr(39), chr(92)+chr(39))}'" for uc in c['useCases']) + "]"
    tips_str = "[" + ", ".join(f"'{t.replace(chr(39), chr(92)+chr(39))}'" for t in c['tips']) + "]"
    faq_str = "[" + ", ".join(f"{{ q: '{f['q'].replace(chr(39), chr(92)+chr(39))}', a: '{f['a'].replace(chr(39), chr(92)+chr(39))}' }}" for f in c['faq']) + "]"

    entry = f"""  '{tool_id}': {{
    whatIs: '{whatIs_esc}',
    howItWorks: '{howItWorks_esc}',
    formula: '{formula_esc}',
    useCases: {useCases_str},
    tips: {tips_str},
    faq: {faq_str},
  }}"""
    entries.append(entry)

# Insert into content.ts before the closing };
insert_pos = content_ts.rfind('};')
new_content = content_ts[:insert_pos] + "\n  // ===== AUTO-GENERATED SEO CONTENT =====\n" + ",\n".join(entries) + "\n" + content_ts[insert_pos:]

with open("src/app/data/content.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Added {len(entries)} tool content entries")
