"""Batch enhance remaining formulas per 修改建议.txt"""
import re

with open('src/app/data/formulas.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacements: (old_snippet_start, old_snippet_end, new_text)
# Each entry uniquely identifies a formula and its replacement
replacements = []

# Helper: find and replace a formula by matching its unique input pattern
def replace_formula(tool_id, new_formula_body):
    """Replace formula for a given tool_id by matching its unique key."""
    # Find the tool entry
    pattern = re.compile(
        r"('" + tool_id + r"':\s*\{[^}]*?formula:\s*\(v\)\s*=>\s*\{)([^}]*(?:\{[^}]*\}[^}]*)*)\}(\s*,\s*\})",
        re.DOTALL
    )
    m = pattern.search(content)
    if m:
        return m.start(2), m.end(2), new_formula_body
    return None

# === Item 16: Food Calorie - meal composition ===
r = replace_formula('food-calorie-calculator',
    ' const p=F(v.pro)*4,c=F(v.carbs)*4,f=F(v.fats)*9; const tot=p+c+f; const pPct=tot>0?p/tot*100:0,cPct=tot>0?c/tot*100:0,fPct=tot>0?f/tot*100:0; return [{label:"Total",value:tot.toFixed(0)+" kcal",emphasis:true,insight:"Macro: "+pPct.toFixed(0)+"%P / "+cPct.toFixed(0)+"%C / "+fPct.toFixed(0)+"%F. Balanced=30/40/30, Keto=20/5/75, Bodybuilding=40/40/20."},{label:"Protein ("+pPct.toFixed(0)+"%)",value:p.toFixed(0)+" kcal ("+F(v.pro).toFixed(0)+"g)"},{label:"Carbs ("+cPct.toFixed(0)+"%)",value:c.toFixed(0)+" kcal ("+F(v.carbs).toFixed(0)+"g)"},{label:"Fats ("+fPct.toFixed(0)+"%)",value:f.toFixed(0)+" kcal ("+F(v.fats).toFixed(0)+"g)"}]')
if r: replacements.append(('food-calorie-calculator', r[0], r[1], r[2]))

# === Item 21: Water Footprint ===
r = replace_formula('water-footprint-calculator',
    ' const d=F(v.showers)*65+F(v.laundry)*40+F(v.dishes)*15+F(v.drink)*2; const avg=3000; return [{label:"Daily",value:d.toFixed(0)+" L",insight:"Average person: ~3000 L/day (including virtual water in food/clothing). You use "+(d/avg*100).toFixed(0)+"% of average. Largest savings: reduce meat (1kg beef = 15,000L water)."},{label:"Monthly",value:(d*30).toFixed(0)+" L"},{label:"Yearly",value:(d*365).toFixed(0)+" L"}]')
if r: replacements.append(('water-footprint-calculator', r[0], r[1], r[2]))

# === Item 27: Dice Probability ===
r = replace_formula('dice-probability-calculator',
    ' var n=F(v.dice)||1,s=F(v.sides)||6,target=F(v.target)||7; if(n>10)return[{label:"Info",value:"Max 10 dice for performance"},{label:"Monte Carlo",value:"For large N, use simulation: expected ~"+(target/s/n*100).toFixed(1)+"%"+" per roll"},{label:"Central Limit",value:"Sum of >30 dice approximates normal distribution"}]')
if r: replacements.append(('dice-probability-calculator', r[0], r[1], r[2]))

# === Item 30: Countdown Timer ===
r = replace_formula('countdown-timer',
    ' var d=new Date(String(v.date)).getTime(); var n=Date.now(); var diff=Math.max(0,d-n); var days=Math.floor(diff/86400000); var hrs=Math.floor((diff%86400000)/3600000); var mins=Math.floor((diff%3600000)/60000); var secs=Math.floor((diff%60000)/1000); return [{label:"Remaining",value:days+"d "+hrs+"h "+mins+"m "+secs+"s",insight:"Until "+String(v.date)+". Add event name for context. For recurring events (birthdays/anniversaries), use next occurrence date."}]')
if r: replacements.append(('countdown-timer', r[0], r[1], r[2]))

# === Item 33: ETA ===
r = replace_formula('eta-calculator',
    ' var d=F(v.dist),s=Math.max(1,F(v.speed)); var h=d/s; var traffic=1.0; var hh=Math.floor(h),mm=Math.round((h-hh)*60); return [{label:"Pure Travel Time",value:hh+"h "+mm+"m",insight:"At "+s.toFixed(0)+" mph/kph. Add traffic buffer: +20% for city/rush hour = ~"+(h*1.2).toFixed(1)+"h. +50% for major congestion."},{label:"With Traffic (+15%)",value:Math.floor(h*1.15)+"h "+Math.round((h*1.15-Math.floor(h*1.15))*60)+"m"}]')
if r: replacements.append(('eta-calculator', r[0], r[1], r[2]))

# === Item 54: Fuel Cost ===
r = replace_formula('fuel-cost-calculator',
    ' var d=F(v.dist),mpg=Math.max(1,F(v.mpg)),price=F(v.price); var gal=d/mpg,cost=gal*price; return [{label:"Fuel Needed",value:gal.toFixed(1)+" gal",insight:"For multi-stop trips, add 5-10% for city driving detours. Highway vs city MPG can differ 20-30%."},{label:"Total Cost",value:"$"+cost.toFixed(2)},{label:"Per Mile",value:"$"+(price/mpg).toFixed(3)}]')
if r: replacements.append(('fuel-cost-calculator', r[0], r[1], r[2]))

# === Item 56: Travel Budget ===
r = replace_formula('travel-budget-calculator',
    ' var t=F(v.flight)+F(v.hotel)*F(v.days)+F(v.food)*F(v.days)+F(v.activities||0); var daily=t/F(v.days); return [{label:"Total",value:"$"+t.toFixed(0),insight:"Budget breakdown: "+F(v.flight).toFixed(0)+" flight + "+F(v.hotel).toFixed(0)+"/night + "+F(v.food).toFixed(0)+"/day. Add 15-20% buffer for unexpected costs = ~$"+(t*1.15).toFixed(0)+"."},{label:"Per Day",value:"$"+daily.toFixed(0)},{label:"With 20% Buffer",value:"$"+(t*1.2).toFixed(0)}]')
if r: replacements.append(('travel-budget-calculator', r[0], r[1], r[2]))

# === Item 37: Integer Base Converter ===
r = replace_formula('integer-base-converter',
    ' var n=parseInt(String(v.num)||"0"),fromBase=F(v.from)||10,toBase=F(v.to)||2; if(isNaN(n))return[{label:"Error",value:"Invalid number"}]; var dec=parseInt(String(v.num),fromBase); if(isNaN(dec))return[{label:"Error",value:"Invalid for base "+fromBase}]; return [{label:"Base "+toBase,value:dec.toString(toBase).toUpperCase(),insight:"From base "+fromBase+" to base "+toBase+". Valid digits for base "+fromBase+": 0-"+(fromBase<=10?String(fromBase-1):"9,A-"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[fromBase-11])+". Max safe integer: 2^53-1."}]')
if r: replacements.append(('integer-base-converter', r[0], r[1], r[2]))

# === Item 40: LED Resistor ===
r = replace_formula('led-resistor-calculator',
    ' var Vs=F(v.vs)||12,Vf=F(v.vf)||2,I=F(v.i)||20; var R=(Vs-Vf)/(I/1000); var P=(Vs-Vf)*(I/1000); return [{label:"Resistor",value:R.toFixed(0)+" ohm",insight:"Use next standard value up (e.g. E12 series). Power rating needed: "+P.toFixed(2)+"W. Safety: choose resistor rated 2x calculated power = "+(P*2).toFixed(2)+"W minimum."},{label:"Power Dissipation",value:P.toFixed(3)+" W",insight:"If R < 0, supply voltage ("+Vs.toFixed(0)+"V) is less than LED forward voltage ("+Vf.toFixed(0)+"V). LED may not light."}]')
if r: replacements.append(('led-resistor-calculator', r[0], r[1], r[2]))

# === Item 42: HVAC BTU ===
r = replace_formula('hvac-btu-calculator',
    ' var a=F(v.area)||500; var btu=a*35; var tons=btu/12000; return [{label:"Cooling BTU",value:btu.toFixed(0)+" BTU/h",insight:"Estimate: 35 BTU/sqft (moderate climate). Adjust: +20% for hot/sunny (south/west exposure) = "+(btu*1.2).toFixed(0)+" BTU. -10% for cool/shaded. Proper sizing matters: oversized AC short-cycles and doesnt dehumidify."},{label:"Tons",value:tons.toFixed(1)+" tons (1 ton = 12,000 BTU)",insight:"Typical residential: 1.5-5 tons. This estimate = "+tons.toFixed(1)+" tons."}]')
if r: replacements.append(('hvac-btu-calculator', r[0], r[1], r[2]))

# === Item 43: Tire Size ===
r = replace_formula('tire-size-calculator',
    ' var w=F(v.width)||225,ar=F(v.ratio)||55,d=F(v.dia)||17; var sh=(w*ar/100)/25.4; var od=sh*2+d; var circ=od*Math.PI; var rpm=63360/circ; return [{label:"Diameter",value:od.toFixed(1)+" in",insight:"Overall tire diameter. Changing tire size affects speedometer: larger diameter = speedo reads lower than actual. For this size: ~"+(63360/rpm*60/88).toFixed(0)+" revs/mile."},{label:"Sidewall",value:sh.toFixed(1)+" in"},{label:"Rev/Mile",value:Math.round(rpm)+" revs",insight:"+1 inch rim = ~3% speedometer error. Stay within 3% of OEM diameter to avoid ABS/TC issues."}]')
if r: replacements.append(('tire-size-calculator', r[0], r[1], r[2]))

# === Fun items 57-60: disclaimers ===
# Love Calculator
r = replace_formula('love-calculator',
    ' const h=function(s){return String(s).toLowerCase().replace(/[^a-z]/g,"").split("").reduce(function(a,c){return a+c.charCodeAt(0)},0)}; const seed=h(String(v.name1))*h(String(v.name2)); const score=((seed*7919+104729)%89)+11; return [{label:"Love Score",value:score+"%",insight:"For entertainment purposes only. Based on name numerology - not a scientific compatibility measure. Real relationships depend on communication, shared values, and mutual respect."},{label:"Verdict",value:score>=80?"Epic Match!":score>=60?"Sweet Connection":score>=40?"Cute Potential":"Just Friends?"}]')
if r: replacements.append(('love-calculator', r[0], r[1], r[2]))

# Zodiac
r = replace_formula('zodiac-love-compatibility',
    ' return [{label:"Compatibility",value:v+"%",insight:"For entertainment purposes only. Based on traditional zodiac pairings. Individual compatibility depends on personality, communication, and shared life goals - not birth dates."}]')
if r: replacements.append(('zodiac-love-compatibility', r[0], r[1], r[2]))

# Tarot
r = replace_formula('tarot-reading',
    ' var M=["The Fool: New beginnings, leap of faith","The Magician: Skill, manifestation, power","The High Priestess: Intuition, mystery, wisdom","The Empress: Abundance, nurturing, fertility","The Emperor: Authority, structure, control","The Lovers: Love, harmony, choices","The Chariot: Willpower, victory, determination","Strength: Courage, inner power, patience","The Hermit: Soul-searching, solitude, guidance","Wheel of Fortune: Destiny, turning point, cycles","Justice: Fairness, truth, consequences","The Hanged Man: Surrender, new perspective, pause","Death: Transformation, endings, rebirth","Temperance: Balance, moderation, harmony","The Star: Hope, renewal, inspiration","The Moon: Subconscious, illusion, fear","The Sun: Joy, success, vitality","The World: Completion, achievement, wholeness"]; var c1=M[Math.floor(Math.random()*M.length)]; var c2=M[Math.floor(Math.random()*M.length)]; var c3=M[Math.floor(Math.random()*M.length)]; if(v.spread==="1")return[{label:"Your Card",value:c1,insight:"For entertainment purposes only. Tarot is a tool for self-reflection, not prediction. Use this reading as a prompt for introspection about your situation."}]; return [{label:"Past",value:c1},{label:"Present",value:c2},{label:"Future",value:c3,insight:"Entertainment only. The cards offer perspectives to consider - you make your own choices."}]')
if r: replacements.append(('tarot-reading', r[0], r[1], r[2]))

# Lucky Number
r = replace_formula('lucky-number-generator',
    ' var s=String(v.bday).replace(/-/g,"").split("").reduce(function(a,b){return a+Number(b)},0); var nums=[]; for(var i=0;i<F(v.count);i++){var n=((s*(i*7+3)+(i*13+5)+2026*(i+1))%F(v.max))+1; nums.push(n);} nums.sort(function(a,b){return a-b}); return [{label:"Lucky Numbers",value:nums.join(", "),insight:"Generated from your birth date using a deterministic algorithm. For entertainment purposes only. These are not gambling or lottery predictions."},{label:"Life Path (numerology)",value:String(s%9||9)}]')
if r: replacements.append(('lucky-number-generator', r[0], r[1], r[2]))

# === Apply all replacements (reverse order to preserve positions) ===
applied = 0
for tool_id, start, end, new_text in sorted(replacements, key=lambda x: x[1], reverse=True):
    content = content[:start] + new_text + content[end:]
    applied += 1
    print(f'  Fixed: {tool_id}')

with open('src/app/data/formulas.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'\nApplied {applied} replacements')
