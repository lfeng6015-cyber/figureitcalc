"""
Bulk SEO description updater — updates both top-level and SEO descriptions
for all tools with enhanced long-tail keyword content.
"""
import re

path = "src/app/data/tools.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Map tool IDs to enhanced descriptions (top-level + SEO)
enhancements = {
    "bmi-calculator": "Calculate your Body Mass Index (BMI) instantly with WHO weight categories. Free BMI calculator with formula — check if you are underweight, normal, overweight, or obese. Used by fitness trainers, doctors, and health-conscious individuals worldwide.",
    "mortgage-calculator": "Free mortgage calculator with PITI breakdown. Estimate monthly payments including principal, interest, property tax, and insurance. Compare 15-year vs 30-year terms. 2026 mortgage rates — no signup required.",
    "compound-interest-calculator": "Free compound interest calculator with monthly contributions. See how your investments grow with daily, monthly, or annual compounding. Model retirement savings, college funds, or any long-term financial goal. Includes Rule of 72.",
    "tip-calculator": "Free tip calculator with bill splitting. Calculate 15%, 18%, 20% or custom tip amounts. Split restaurant bills among friends. Tip on pre-tax or total amount. No signup — instant results.",
    "percentage-calculator": "Free online percentage calculator — find what percent one number is of another, calculate percentage increase/decrease, find the original number. The most commonly searched math tool. Instant results, no signup.",
    "discount-calculator": "Free discount calculator — see exactly how much you save during sales. Calculate final price after percentage discounts, compare deals, and avoid being tricked by stacking discounts. Perfect for Black Friday, holiday sales, and everyday shopping.",
    "retirement-calculator": "Free retirement calculator — find out if you are on track to retire comfortably. Project 401(k) and IRA growth with 2026 contribution limits. Estimate Social Security benefits and sustainable withdrawal rates. No signup.",
    "currency-converter": "Free online currency converter with real-time exchange rates. Convert between USD, EUR, GBP, JPY, CNY, INR and 50+ world currencies. Perfect for travelers, online shoppers, freelancers, and international business. No signup.",
    "fuel-cost-calculator": "Free fuel cost calculator for road trips. Calculate gas expenses by distance, MPG, and fuel price. Compare vehicle fuel costs and split expenses among carpoolers. Plan your trip budget — no signup.",
    "sales-tax-calculator": "Free sales tax calculator by state. Calculate total price including state and local sales tax. Reverse-calculate pre-tax price from total. 2026 US tax rates for all states. Instant — no signup.",
    "car-loan-calculator": "Free auto loan calculator with amortization schedule. Calculate monthly car payments with trade-in, down payment, and sales tax. Compare financing offers. 2026 auto loan rates — no signup required.",
    "roi-calculator": "Free ROI calculator — calculate return on investment with annualized returns. Compare investment performance, evaluate business opportunities, and make data-driven decisions. Includes real (inflation-adjusted) return calculation.",
    "profit-margin-calculator": "Free profit margin calculator for businesses. Calculate gross margin, net margin, and markup percentages. Set optimal pricing, evaluate supplier costs, and understand discount impacts on your bottom line. No signup.",
    "qr-code-generator": "Free QR code generator — create scannable QR codes for URLs, WiFi networks, vCards, and text. Download as high-resolution PNG or scalable SVG. Perfect for restaurant menus, business cards, event tickets, and marketing. No signup.",
    "json-formatter": "Free JSON formatter and validator — beautify, validate, and explore JSON data in a tree view. Format minified JSON, detect syntax errors, and navigate complex nested structures. Every developer's essential daily tool. 100% client-side.",
    "base64-string-converter": "Free Base64 encoder and decoder — convert text to Base64 and decode Base64 strings back to readable text. Supports standard and URL-safe Base64. Essential for API development, data URIs, and HTTP authentication. Client-side only.",
    "hash-text": "Free SHA-256, MD5, SHA-1 hash generator — create cryptographic hash digests from any text input. Verify file integrity, check checksums, and understand hash functions. All processing done in your browser — data never uploaded.",
    "url-encoder": "Free URL encoder and decoder — convert text to URL-safe percent-encoding and decode percent-encoded URLs back to readable text. Essential for web development, API parameters, and SEO-friendly URL construction. Instant, client-side.",
    "uuid-generator": "Free UUID generator — create UUID v4 (random) and v7 (time-sorted) identifiers. Generate up to 100 UUIDs at once. Perfect for database primary keys, distributed systems, and API development. Instant, no signup.",
    "password-strength-analyser": "Free password strength checker — test how strong your password is against brute-force attacks. Analyzes entropy, length, character diversity, and dictionary resistance. Checks against known breach databases. All analysis is client-side — your password never leaves your device.",
    "temperature-converter": "Free temperature converter — convert between Celsius, Fahrenheit, and Kelvin instantly. Includes freezing point, boiling point, body temperature, and absolute zero references. Perfect for cooking, travel, science, and weather. No signup.",
    "age-calculator": "Free age calculator — find your exact age in years, months, and days. Calculate age difference between two dates, find the day of the week you were born, and see your next birthday countdown. Instant, free, no signup.",
    "zodiac-love-compatibility": "Free zodiac love compatibility calculator — 5-dimensional analysis using elemental affinity, romantic chemistry, modality harmony, communication style, and moon signs. Fun, detailed compatibility reports. For entertainment purposes.",
    "sheng-xiao-compatibility": "Free Sheng Xiao love match calculator — check compatibility using the 12 animal signs with Five Elements and Yin-Yang balance. Based on Three Harmonies (三合) and Six Clashes (六冲) traditions. Fun, detailed, shareable.",
    "numerology-calculator": "Free numerology Life Path calculator — discover your Life Path, Destiny, and Soul Urge numbers based on Pythagorean numerology. Includes Master Numbers 11, 22, 33. Learn what your birth date reveals about you.",
    "love-calculator": "Free love calculator — enter two names and get your love percentage! Uses 5 fun algorithms: classic hash, vowel harmony, consonant resonance, length match, and alphabet numerology. Nostalgic fun — share with your crush!",
    "soulmate-finder": "Free soulmate birthday match calculator — 5-dimension compatibility analysis: Life Path harmony, birth season affinity, day number matching, year path crossing, and karmic numbers. For entertainment purposes.",
    "tarot-reading": "Free virtual tarot card reading — draw from a full 78-card deck. Choose single card, three-card, or love cross spreads. Detailed card interpretations for love, career, and personal growth. For entertainment and self-reflection.",
    "i-ching-divination": "Free I Ching coin divination — cast virtual coins to receive one of 64 hexagrams with detailed interpretations from the ancient Book of Changes. Use for reflection and gaining new perspectives. For entertainment purposes.",
    "ba-zi-calculator": "Free Ba Zi Eight Characters birth chart calculator — generate your Four Pillars of Destiny including Heavenly Stems, Earthly Branches, and Five Elements balance. Discover your Day Master element and personality archetype.",
}

count = 0
for tool_id, new_desc in enhancements.items():
    # Find the tool's SEO description (inside the seo object)
    # Pattern: within the tool's seo block, find "description": "..."
    tool_start = content.find(f'"id": "{tool_id}"')
    if tool_start == -1:
        continue

    # Find the seo description within this tool's block (after tool_start)
    seo_search_start = tool_start
    seo_desc_match = re.search(r'"seo":\s*\{[^}]*?"description":\s*"([^"]+)"', content[seo_search_start:seo_search_start+2000], re.DOTALL)
    if seo_desc_match:
        old_seo_desc = seo_desc_match.group(1)
        full_match = f'"description": "{old_seo_desc}"'
        full_replace = f'"description": "{new_desc}"'
        if full_match in content:
            content = content.replace(full_match, full_replace, 1)
            count += 1

print(f"Updated {count} tool SEO descriptions with keyword-rich content")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
