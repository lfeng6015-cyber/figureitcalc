"""
SEO Description Optimizer — enhances tool descriptions with long-tail keyword patterns
based on researched high-CPC and high-volume keyword clusters.
"""
import re, sys

path = sys.argv[1] if len(sys.argv) > 1 else "src/app/data/tools.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Long-tail description templates by category
# Each adds natural keyword inclusion without keyword stuffing
category_templates = {
    "finance": " — Free online financial calculator with instant results and detailed formulas. No signup required.",
    "health": " — Free online health calculator with evidence-based formulas. Instant, private, no registration needed.",
    "developer": " — Free online developer tool with client-side processing. Your data stays private, no signup required.",
    "trade": " — Free international trade calculator with 2026 tariff rates. Instant results, no registration.",
    "education": " — Free academic calculator for students and teachers. Instant calculations with step-by-step explanations.",
    "cooking": " — Free kitchen calculator for home cooks and bakers. Convert, scale, and calculate with ease — no signup.",
    "travel": " — Free travel planning tool. Budget your trip, calculate costs, and plan smarter — no registration.",
    "real-estate": " — Free real estate calculator with 2026 mortgage rates and tax data. Instant, accurate, no signup needed.",
    "construction": " — Free construction material estimator. Calculate concrete, paint, flooring, and more — no registration.",
    "business": " — Free business calculator for entrepreneurs and freelancers. Make data-driven decisions, no signup.",
    "productivity": " — Free productivity tool to boost focus and track habits. Works in your browser, no account needed.",
    "photography": " — Free photography calculator for photographers. Calculate DOF, print sizes, and more — instant results.",
    "environment": " — Free environmental impact calculator. Measure your carbon and water footprint, evaluate solar ROI.",
    "electrical": " — Free electrical engineering calculator. Apply Ohm's Law, size wires, decode resistors — no signup.",
    "pets": " — Free pet calculator for dog and cat owners. Calculate age, calories, and breed traits — instant results.",
    "automotive": " — Free automotive calculator. Compare fuel economy, size tires, calculate depreciation — no registration.",
    "gaming": " — Free gaming calculator. Calculate poker odds, Elo ratings, dice probabilities — instant results.",
    "wedding": " — Free wedding planning tool. Budget your big day, track the countdown, arrange seating — no signup.",
    "pregnancy": " — Free pregnancy calculator. Track due dates, fertility windows, and baby growth — private and instant.",
    "fortune": " — Free fortune telling and love compatibility calculator. Fun, entertaining, and instantly shareable — for entertainment purposes only.",
}

# Tool-specific long-tail enhancements for high-volume tools
tool_specific = {
    "bmi-calculator": " Calculate your Body Mass Index instantly with WHO classification. Check if you are underweight, normal weight, overweight, or obese. Used by fitness trainers and health professionals worldwide.",
    "mortgage-calculator": " Estimate your monthly mortgage payment including PITI (Principal, Interest, Taxes, Insurance). Compare 15-year vs 30-year terms and see total interest costs. 2026 mortgage rates included.",
    "compound-interest-calculator": " See how your money grows with the power of compound interest. Model monthly contributions, different compounding frequencies, and project your wealth over decades. The eighth wonder of the world — in calculator form.",
    "tip-calculator": " Calculate the right tip for restaurants, bars, salons, and delivery. Split the bill among friends. Never awkwardly guess a tip again — 15%, 18%, 20%, or custom percentage.",
    "retirement-calculator": " Find out if you are on track for a comfortable retirement. Project your 401(k) and IRA growth, estimate Social Security benefits, and see your retirement income. 2026 contribution limits included.",
    "currency-converter": " Convert between 50+ world currencies with real-time exchange rates. Perfect for travelers, international shoppers, freelancers, and businesses. USD, EUR, GBP, JPY, CNY, INR and more.",
    "fuel-cost-calculator": " Calculate exactly how much gas money you need for any road trip. Compare fuel costs between vehicles, split with carpool buddies, and budget smarter. Based on real-time fuel prices and your vehicle MPG.",
    "qr-code-generator": " Create scannable QR codes for URLs, WiFi networks, contact cards, and text — instantly. Download as PNG or SVG. Perfect for restaurant menus, business cards, event tickets, and marketing materials.",
    "json-formatter": " Format, validate, and beautify JSON data instantly. Tree view for exploring nested structures, error highlighting, and minify option. Every developer's daily tool — 100% client-side.",
    "percentage-calculator": " Calculate percentages instantly — find what percent one number is of another, calculate percentage increase/decrease, or find the original price before discount. The most commonly searched math tool online.",
    "discount-calculator": " See exactly how much you save during sales. Calculate final price after discounts, compare percentage-off vs dollar-off deals, and never get tricked by stacking discounts. Perfect for Black Friday shopping.",
    "zodiac-love-compatibility": " Find out how compatible you are with your crush using 5-dimensional zodiac analysis. Elemental affinity, romantic chemistry, modality harmony, communication style, and moon sign compatibility. Fun, detailed, and instantly shareable.",
    "sheng-xiao-compatibility": " Check your love match using the 12 Sheng Xiao animal signs. Based on the traditional Three Harmonies (三合) and Six Clashes (六冲) with Five Elements and Yin-Yang balance analysis. Ancient wisdom meets modern fun.",
    "numerology-calculator": " Discover your Life Path, Destiny, and Soul Urge numbers based on Pythagorean numerology. Learn what your birth date reveals about your personality, strengths, and life purpose. Includes Master Number 11, 22, 33 detection.",
    "love-calculator": " The classic love calculator — enter two names and get your love percentage! Uses 5 different algorithms: classic internet hash, vowel harmony, consonant resonance, name length match, and alphabet numerology. Pure nostalgic fun.",
    "soulmate-finder": " Find out if you and your partner are soulmates. Multi-dimensional analysis combining Life Path numbers, birth season affinity, karmic numbers, and biorhythm alignment. Deeper than a standard love calculator.",
}

count = 0
for tool_id, suffix in tool_specific.items():
    # Find this tool's description in the file
    pattern = rf'("id": "{re.escape(tool_id)}".*?"description":\s*)"([^"]+)"'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        old_desc = match.group(2)
        # Only enhance if the description is short (< 80 chars) and doesn't already have the suffix
        if len(old_desc) < 80 and suffix[:20] not in old_desc:
            new_desc = old_desc + suffix
            content = content.replace(f'"description": "{old_desc}"', f'"description": "{new_desc}"', 1)
            count += 1

print(f"Enhanced {count} tool descriptions with long-tail SEO content")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
