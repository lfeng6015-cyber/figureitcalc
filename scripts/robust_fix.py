"""Robust formula enhancer: finds formulas by brace counting, not whitespace matching."""
import re

with open('src/app/data/formulas.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def find_formula_range(tool_id):
    """Find (start, end) of the formula function body for a tool."""
    # Find tool entry
    idx = content.find("'" + tool_id + "':")
    if idx < 0:
        idx = content.find('"' + tool_id + '":')
    if idx < 0:
        return None

    # Find 'formula:' within next 500 chars
    search_start = idx
    formula_idx = content.find('formula:', search_start)
    if formula_idx < 0 or formula_idx > search_start + 500:
        return None

    # Find '=>' to locate arrow function start
    arrow_idx = content.find('=>', formula_idx)
    if arrow_idx < 0 or arrow_idx > formula_idx + 200:
        return None

    # Find the opening brace of the function body after '=>'
    brace_start = content.find('{', arrow_idx)
    if brace_start < 0 or brace_start > arrow_idx + 5:
        return None

    # Count braces to find matching closing brace
    depth = 0
    for i in range(brace_start, min(brace_start + 1000, len(content))):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                return (brace_start, i + 1)

    return None

def replace_formula_body(tool_id, new_body):
    """Replace just the inner body of a formula function."""
    global content
    r = find_formula_range(tool_id)
    if not r:
        print(f'  FAILED: {tool_id} - could not find formula range')
        return False

    start, end = r
    old_body = content[start:end]
    new = '{' + new_body + '}'
    content = content[:start] + new + content[end:]
    print(f'  Fixed: {tool_id} ({len(old_body)} -> {len(new)} chars)')
    return True

applied = 0

# === Apply fixes ===

# Food Calorie - add macro split %
if replace_formula_body('food-calorie-calculator',
    ' const p=F(v.pro)*4,c=F(v.carbs)*4,f=F(v.fats)*9; const tot=p+c+f; const pPct=tot>0?p/tot*100:0,cPct=tot>0?c/tot*100:0,fPct=tot>0?f/tot*100:0; return [{label:"Total",value:tot.toFixed(0)+" kcal",emphasis:true,insight:"Macro: "+pPct.toFixed(0)+"%P / "+cPct.toFixed(0)+"%C / "+fPct.toFixed(0)+"%F. Balanced=30/40/30, Keto=20/5/75, Bodybuilding=40/40/20."},{label:"Protein ("+pPct.toFixed(0)+"%)",value:p.toFixed(0)+" kcal ("+F(v.pro).toFixed(0)+"g)"},{label:"Carbs ("+cPct.toFixed(0)+"%)",value:c.toFixed(0)+" kcal ("+F(v.carbs).toFixed(0)+"g)"},{label:"Fats ("+fPct.toFixed(0)+"%)",value:f.toFixed(0)+" kcal ("+F(v.fats).toFixed(0)+"g)"}] '):
    applied += 1

# Water Footprint - behavioral note
if replace_formula_body('water-footprint-calculator',
    ' const d=F(v.showers)*65+F(v.laundry)*40+F(v.dishes)*15+F(v.drink)*2; const avg=3000; return [{label:"Daily",value:d.toFixed(0)+" L",insight:"Avg person: ~3000 L/day (incl virtual water in food/clothing). You use "+(d/avg*100).toFixed(0)+"% of avg. Biggest saving: eat less beef (1kg = 15,000L water)."},{label:"Monthly",value:(d*30).toFixed(0)+" L"},{label:"Yearly",value:Math.round(d*365)+" L"}] '):
    applied += 1

# Countdown Timer - event note
if replace_formula_body('countdown-timer',
    ' var d=new Date(String(v.date)).getTime(),n=Date.now(),diff=Math.max(0,d-n); var days=Math.floor(diff/86400000),hrs=Math.floor((diff%86400000)/3600000),mins=Math.floor((diff%3600000)/60000),secs=Math.floor((diff%60000)/1000); return [{label:"Countdown",value:days+"d "+hrs+"h "+mins+"m",insight:"Until "+String(v.date)+". For recurring events, use next occurrence date."},{label:"Seconds",value:secs+"s"},{label:"Weeks",value:(days/7).toFixed(1)+" weeks"}] '):
    applied += 1

# ETA - traffic factor
if replace_formula_body('eta-calculator',
    ' var d=F(v.dist),s=Math.max(1,F(v.speed)),h=d/s; var hh=Math.floor(h),mm=Math.round((h-hh)*60); return [{label:"Travel Time",value:hh+"h "+mm+"m",insight:"At "+s.toFixed(0)+" mph. Traffic: +20% city/rush = ~"+(h*1.2).toFixed(1)+"h. +50% congestion = ~"+(h*1.5).toFixed(1)+"h."},{label:"With Traffic (+20%)",value:Math.floor(h*1.2)+"h "+Math.round((h*1.2-Math.floor(h*1.2))*60)+"m"}] '):
    applied += 1

# Fuel Cost - route optimization note
if replace_formula_body('fuel-cost-calculator',
    ' var d=F(v.dist),mpg=Math.max(1,F(v.mpg)),price=F(v.price),gal=d/mpg,cost=gal*price; return [{label:"Fuel",value:gal.toFixed(1)+" gal",insight:"Multi-stop trips: add 5-10% for city. Highway MPG 20-30% higher than city."},{label:"Cost",value:"$"+cost.toFixed(2)},{label:"Per Mile",value:"$"+(price/mpg).toFixed(3)}] '):
    applied += 1

# Travel Budget - buffer
if replace_formula_body('travel-budget-calculator',
    ' var t=F(v.flight)+F(v.hotel)*F(v.days)+F(v.food)*F(v.days),daily=t/F(v.days); return [{label:"Total",value:"$"+t.toFixed(0),insight:"Add 15-20% buffer = ~$"+(t*1.15).toFixed(0)+". Flight: $"+F(v.flight).toFixed(0)+", Hotel: $"+F(v.hotel).toFixed(0)+"/night."},{label:"Per Day",value:"$"+daily.toFixed(0)},{label:"With 20% Buffer",value:"$"+(t*1.2).toFixed(0)}] '):
    applied += 1

# LED Resistor - circuit safety
if replace_formula_body('led-resistor-calculator',
    ' var Vs=F(v.vs)||12,Vf=F(v.vf)||2,I=F(v.i)||20; var R=(Vs-Vf)/(I/1000),P=(Vs-Vf)*(I/1000); var warn=R<0?" WARNING: supply voltage ("+Vs.toFixed(0)+"V) less than LED Vf ("+Vf.toFixed(0)+"V).":""; return [{label:"Resistor",value:R.toFixed(0)+" ohm",insight:"Use next standard value up. Power rating: "+(P*2).toFixed(2)+"W min (2x safety factor)."+warn},{label:"Power",value:P.toFixed(3)+" W"}] '):
    applied += 1

# HVAC BTU - climate zone
if replace_formula_body('hvac-btu-calculator',
    ' var a=F(v.sqft)||1500,btu=a*35,tons=btu/12000; return [{label:"Cooling",value:btu.toFixed(0)+" BTU/h",insight:"Est: 35 BTU/sqft moderate. +20% hot/sunny = "+(btu*1.2).toFixed(0)+" BTU. Oversized AC short-cycles and doesnt dehumidify."},{label:"Tons",value:tons.toFixed(1)+" tons (1 ton = 12,000 BTU)"}] '):
    applied += 1

# Tire Size - speedometer error
if replace_formula_body('tire-size-calculator',
    ' var w=F(v.width)||225,ar=F(v.ratio)||55,d=F(v.dia)||17; var sh=(w*ar/100)/25.4,od=sh*2+d,circ=od*Math.PI,rpm=63360/circ; return [{label:"Diameter",value:od.toFixed(1)+" in",insight:"Stay within 3% of OEM diameter to avoid ABS/TC issues. Larger tires = speedometer reads low."},{label:"Sidewall",value:sh.toFixed(1)+" in"},{label:"Rev/Mile",value:Math.round(rpm)+" revs"}] '):
    applied += 1

# Integer Base - large number note
if replace_formula_body('integer-base-converter',
    ' var n=parseInt(String(v.num)||"0"),fromBase=F(v.from)||10,toBase=F(v.to)||2; if(isNaN(n))return[{label:"Error",value:"Invalid number"}]; var dec=parseInt(String(v.num),fromBase); if(isNaN(dec))return[{label:"Error",value:"Invalid for base "+fromBase.toFixed(0)}]; return [{label:"Base "+toBase.toFixed(0),value:dec.toString(toBase).toUpperCase(),insight:"From base "+fromBase.toFixed(0)+" to base "+toBase.toFixed(0)+". Max safe integer: 2^53-1. For larger numbers, use BigInt."}] '):
    applied += 1

# Dice Probability - simulation note
if replace_formula_body('dice-probability-calculator',
    ' var n=Math.min(F(v.dice)||1,10),s=F(v.sides)||6,target=F(v.target)||7; return [{label:"Probability",value:(1/s*100).toFixed(1)+"% per face",insight:"For "+n.toFixed(0)+"d"+s.toFixed(0)+": total outcomes = "+s.toFixed(0)+"^"+n.toFixed(0)+". Exact probability requires combinatorial calculation. For large N, Monte Carlo simulation is recommended."},{label:"Expected Sum",value:((1+s)/2*n).toFixed(1),insight:"Mean of uniform distribution * number of dice."}] '):
    applied += 1

# Zodiac - entertainment disclaimer
if replace_formula_body('zodiac-love-compatibility',
    ' return [{label:"Compatibility",value:v+"%",insight:"For entertainment only. Based on traditional zodiac pairings. Individual compatibility depends on personality, communication, and shared values - not birth dates."}] '):
    applied += 1

# Tarot - story mode disclaimer
if replace_formula_body('tarot-reading',
    ' var M=["The Fool: New beginnings","The Magician: Skill,power","The High Priestess: Intuition","The Empress: Abundance","The Emperor: Authority","The Lovers: Harmony","The Chariot: Willpower","Strength: Courage","The Hermit: Wisdom","Wheel of Fortune: Destiny","Justice: Fairness","The Hanged Man: Perspective","Death: Transformation","Temperance: Balance","The Star: Hope","The Moon: Illusion","The Sun: Joy","The World: Completion"]; var c1=M[Math.floor(Math.random()*M.length)],c2=M[Math.floor(Math.random()*M.length)],c3=M[Math.floor(Math.random()*M.length)]; if(v.spread==="1")return[{label:"Your Card",value:c1,insight:"For entertainment only. Tarot prompts self-reflection - it does not predict the future. You make your own choices."}]; return [{label:"Past",value:c1},{label:"Present",value:c2},{label:"Future",value:c3,insight:"Entertainment only. The cards offer perspectives to consider."}] '):
    applied += 1

# Steps to Miles - auto stride
if replace_formula_body('steps-to-miles-calculator',
    ' var stride=F(v.stride)||30,m=F(v.steps)*stride/63360,km=m*1.609; var stepsPerMile=63360/stride; return [{label:"Distance",value:m.toFixed(2)+" mi ("+km.toFixed(2)+" km)",insight:"Stride ~"+stride.toFixed(0)+"in. ~"+Math.round(stepsPerMile)+" steps/mile. ~2000 steps = 1 mile avg. 10,000 steps = ~5 miles."},{label:"Calories (150lb)",value:Math.round(m*80)+" kcal",insight:"~80 kcal/mile at 150lbs."},{label:"Steps per Mile",value:Math.round(stepsPerMile)+" steps"}] '):
    applied += 1

print(f'\nTotal applied: {applied}')

# Save
with open('src/app/data/formulas.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('File saved.')
