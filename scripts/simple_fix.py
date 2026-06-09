import re, json

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Simple fixes: replace generic formula with real one for critical tools
FIXES = {}

# BMI - real formula
FIXES['bmi-calculator'] = (
    "  'bmi-calculator': {\n"
    "    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'weight',label:'Weight (kg)',type:'number',defaultValue:70},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],\n"
    "    formula: (v) => { const h=F(v.height)/100,w=F(v.weight),bmi=h>0?w/(h*h):0; const cat=bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':bmi<35?'Obese I':bmi<40?'Obese II':'Obese III'; const low=18.5*h*h,high=24.9*h*h; return [{label:'BMI',value:bmi.toFixed(1)+' kg/m2'},{label:'Category',value:cat},{label:'Healthy Range',value:low.toFixed(0)+'-'+high.toFixed(0)+' kg'}]; },\n"
    "    presets: [{label:'Adult',values:{height:170,weight:70,gender:'male'}}],\n"
    "  },"
)

# Find and replace blocks
count = 0
for tid, replacement in FIXES.items():
    # Find the block
    start = content.find("'"+tid+"': {")
    if start < 0: continue
    # Find the matching closing
    depth = 0
    end = start
    for i in range(start, len(content)):
        if content[i] == '{': depth += 1
        if content[i] == '}': depth -= 1
        if depth == 0 and content[i] == '}':
            # Check for trailing comma
            end = i + 1
            if end < len(content) and content[end] == ',': end += 1
            break
    old = content[start:end]
    content = content.replace(old, replacement, 1)
    count += 1

with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.write(content)

print(f"Fixed {count} formulas")
remaining = content.count('"input1"')
print(f"Remaining broken: {remaining}")
