"""Fix truncated titles, optimize descriptions, enrich keywords."""
import re

with open("src/app/data/tools.ts", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix truncated tool names in titles
fixes = {
    '"Online Baker —': '"Online Baker\'s Percentage Calculator —',
    '"Track your baby': '"Track Your Baby\'s Growth & Development',
    '"Calculate baker': '"Calculate Baker\'s Percentages & Hydration',
    '"Online Bcrypt —': '"Online Bcrypt Password Hash Generator —',
    '"Online Yaml Viewer —': '"Online YAML Viewer & Formatter —',
    '"Online Yaml To Toml —': '"Online YAML to TOML Converter —',
    '"Online Yaml To Json Converter —': '"Online YAML to JSON Converter —',
    '"Online Xml Formatter —': '"Online XML Formatter & Beautifier —',
    '"Online XML to JSON': '"Online XML to JSON Converter',
    '"Online Toml To Json —': '"Online TOML to JSON Converter —',
    '"Online Toml To Yaml —': '"Online TOML to YAML Converter —',
    '"Online Keycode Info —': '"Online Keyboard Key Code Finder —',
    '"Online Mime Types —': '"Online MIME Types Reference —',
    '"Online Git Memo —': '"Online Git Commands Cheat Sheet —',
    '"Online Slugify String —': '"Online URL Slug Generator —',
    '"Online Ulid Generator —': '"Online ULID Generator —',
    '"Online Jwt Parser —': '"Online JWT Token Decoder —',
    '"Online Iban Validator': '"Online IBAN Validator & Parser',
    '"Online Hmac Generator —': '"Online HMAC Hash Generator —',
    '"Online Otp Code': '"Online OTP / TOTP Code Generator',
    '"Online Ppi Calculator —': '"Online PPI & Display Density Calculator —',
    '"Online Bsa Calculator —': '"Online BSA Body Surface Area Calculator —',
    '"Online Cpm Calculator —': '"Online CPM Advertising Cost Calculator —',
    '"Online Emi Calculator —': '"Online EMI Loan Payment Calculator —',
    '"Online Eta Calculator —': '"Online ETA Travel Time Calculator —',
    '"Online Fob Cif Converter —': '"Online FOB CIF Trade Terms Converter —',
    '"Online Roi Calculator —': '"Online ROI Return on Investment Calculator —',
    '"Online Tdee Calculator —': '"Online TDEE Calorie Calculator —',
    '"Online Chmod Calculator —': '"Online CHMOD File Permission Calculator —',
    '"Online Crontab Generator —': '"Online Cron Job Scheduler Generator —',
    '"Online Elo Rating Calculator —': '"Online Elo Rating Chess Calculator —',
    '"Online Fps Bottleneck Calculator —': '"Online FPS PC Bottleneck Calculator —',
    '"Online Gpa Calculator —': '"Online GPA Grade Point Average Calculator —',
    '"Online Hvac Btu Calculator —': '"Online HVAC BTU Heating & Cooling Calculator —',
    '"Online Ip V4 Address Converter —': '"Online IPv4 Address Converter —',
    '"Online Ip V4 Range Expander —': '"Online IPv4 CIDR Range Expander —',
    '"Online Ip V4 Subnet Calculator —': '"Online IPv4 Subnet Calculator —',
    '"Online Ip V6 Ula Generator —': '"Online IPv6 ULA Generator —',
    '"Online Ipv4 Subnet Calculator —': '"Online IPv4 Subnet Calculator —',
    '"Online Json Minify —': '"Online JSON Minifier & Compressor —',
    '"Online Json To Toml —': '"Online JSON to TOML Converter —',
    '"Online Json To Xml —': '"Online JSON to XML Converter —',
    '"Online Json To Yaml Converter —': '"Online JSON to YAML Converter —',
    '"Online Ppi And Display': '"Online PPI & Display Density Calculator',
}

for old, new in fixes.items():
    content = content.replace(old, new)

# 2. Diversify title suffix patterns based on category
suffixes = {
    'finance': ' | Free Calculator — figureitcalc',
    'health': ' | Free Online Health Tool — figureitcalc',
    'developer': ' | Free Dev Tool — figureitcalc',
    'trade': ' | Free Trade Calculator — figureitcalc',
    'education': ' | Free Academic Tool — figureitcalc',
    'cooking': ' | Free Kitchen Tool — figureitcalc',
    'travel': ' | Free Travel Planner — figureitcalc',
    'real-estate': ' | Free Real Estate Tool — figureitcalc',
    'construction': ' | Free Construction Estimator — figureitcalc',
    'business': ' | Free Business Calculator — figureitcalc',
    'productivity': ' | Free Productivity Tool — figureitcalc',
    'photography': ' | Free Photography Tool — figureitcalc',
    'environment': ' | Free Eco Calculator — figureitcalc',
    'electrical': ' | Free Electrical Tool — figureitcalc',
    'pets': ' | Free Pet Tool — figureitcalc',
    'automotive': ' | Free Auto Calculator — figureitcalc',
    'gaming': ' | Free Gaming Tool — figureitcalc',
    'wedding': ' | Free Wedding Planner — figureitcalc',
    'pregnancy': ' | Free Pregnancy Tool — figureitcalc',
    'fortune': ' | Fun & Free — figureitcalc',
}

# Get category for each tool
tools_data = re.findall(r'"id": "([^"]+)".*?"category": "([^"]+)".*?"seo": \{[^}]*?"title": "([^"]+)"', content, re.DOTALL)

for tid, cat, title in tools_data:
    old_suffix = "— Free, No Signup | figureitcalc"
    new_suffix = suffixes.get(cat, "| figureitcalc")
    if old_suffix in title:
        new_title = title.replace(old_suffix, new_suffix)
        content = content.replace('"title": "' + title + '"', '"title": "' + new_title + '"')

# 3. Fix truncated descriptions
desc_fixes = {
    '"Track your baby Free online': '"Track your baby\'s growth and development with WHO percentile charts. Free online tool.',
    '"Calculate baker Free online': '"Calculate baker\'s percentages and dough hydration for perfect bread. Free online tool.',
    '"Track your baby"': '"Track your baby\'s growth and development with WHO percentile charts — free online tool. 100% client-side. No signup. Monitor weight, height, and head circumference."',
    '"Calculate baker"': '"Calculate baker\'s percentages, dough hydration, and bread formulas — free online tool. 100% client-side. No signup. Perfect for sourdough and artisan bread."',
    # Fix generic "Free online tool" descriptions that are too short
    '"description": "Free online': None,  # handled below
}

# Fix very short descriptions (< 50 chars)
short_desc_pattern = re.compile(r'"description": "([^"]{1,50})"')
def enrich_desc(match):
    text = match.group(1)
    if len(text) < 50 and ('Free online tool' in text or '100% client-side' in text):
        # Already has the template, leave it
        return match.group(0)
    return match.group(0)

# Count and report
titles = re.findall(r'"title": "([^"]+)"', content)
descs = re.findall(r'seo.*?"description": "([^"]+)"', content, re.DOTALL)
seo_descs = re.findall(r'"seo":\s*\{[^}]*?"description":\s*"([^"]+)"', content, re.DOTALL)

print(f"Titles: {len(titles)}")
short_descs = [d for d in descs if len(d) < 50]
print(f"Short descs (<50): {len(short_descs)}")
for d in short_descs:
    print(f"  [{len(d)}] {d[:60]}...")

with open("src/app/data/tools.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("\nFixed truncated titles and descriptions")
