"""Fix pending formulas by line number with simple string replacements."""
with open('src/app/data/formulas.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Each fix: (line_0indexed, [(old_snippet, new_snippet), ...])
fixes = [
    # countdown-timer line 173 (0-indexed: 172)
    (174, [
        ("value:days+'d '+hrs+'h '+mins+'m'}",
         "value:days+'d '+hrs+'h '+mins+'m',insight:'Until '+String(v.date)+'. For recurring events, use next occurrence date.'}")
    ]),
    # fuel-cost-calculator line 292 (0-indexed: 291)
    (292, [
        ("value:'$'+cost.toFixed(2)},{label:'Per Mile'",
         "value:'$'+cost.toFixed(2),insight:'Multi-stop: add 5-10% for city. Highway MPG 20-30% higher than city.'},{label:'Per Mile'")
    ]),
    # hvac-btu-calculator line 354 (0-indexed: 353)
    (354, [
        ("value:btu.toFixed(0)+' BTU/h'}",
         "value:btu.toFixed(0)+' BTU/h',insight:'Est: 35 BTU/sqft moderate. +20% hot/sunny. Oversized = poor dehumidification.'}")
    ]),
    # tire-size-calculator line 774 (0-indexed: 773)
    (774, [
        ("value:od.toFixed(1)+' in'}",
         "value:od.toFixed(1)+' in',insight:'Changing tire size affects speedometer. Stay within 3% of OEM to avoid ABS/TC issues.'}")
    ]),
    # travel-budget-calculator line 790 (0-indexed: 789)
    (790, [
        ("value:'$'+t.toFixed(0)}",
         "value:'$'+t.toFixed(0),insight:'Add 15-20% buffer for unexpected costs = ~$'+(t*1.15).toFixed(0)+'. Flight: $'+F(v.flight).toFixed(0)+', Hotel: $'+F(v.hotel).toFixed(0)+'/night.'}")
    ]),
    # water-footprint-calculator line 823 (0-indexed: 822)
    (823, [
        ("value:d.toFixed(0)+' L'}",
         "value:d.toFixed(0)+' L',insight:'Avg person: ~3000 L/day (incl virtual water). Biggest saving: eat less beef (1kg = 15,000L water).'}")
    ]),
    # eta-calculator line 268 (0-indexed: 267)
    (268, [
        ("value:Math.round(h*60)+' min'}",
         "value:Math.round(h*60)+' min',insight:'At '+s.toFixed(0)+' mph. Traffic: +20% city = ~'+Math.round(h*1.2*60)+' min. +50% congestion = ~'+Math.round(h*1.5*60)+' min.'}")
    ]),
]

applied = 0
for line_idx, replacements in fixes:
    line = lines[line_idx]
    original = line
    for old_str, new_str in replacements:
        if old_str in line:
            line = line.replace(old_str, new_str, 1)
            applied += 1
        else:
            print(f'FAILED line {line_idx+1}: snippet not found')
            print(f'  Looking for: {old_str[:60]}...')
            print(f'  In line: {line.strip()[:80]}...')
    lines[line_idx] = line

with open('src/app/data/formulas.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f'\nApplied {applied} fixes')
