"""
Rebuild formulas.ts — parse, identify broken tools, replace with real formulas.
"""
import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Strategy: replace the entire `'tool-name': { ... }` block for broken tools
# Each formula block ends with `  },` followed by blank line or next entry

# Split into blocks by finding each formula key
blocks = {}
pattern = re.compile(r"^  '([a-z0-9-]+)': \{.*?^  \},", re.MULTILINE | re.DOTALL)

def make_formula(inputs_str, calc_str):
    return f"  '{tool_id}': {{\n    {inputs_str},\n    formula: (v) => {{ {calc_str} }},\n  }}"

for m in pattern.finditer(content):
    tool_id = m.group(1)
    block = m.group(0)
    if '"input1"' in block:
        blocks[tool_id] = (m.start(), m.end(), block)

print(f"Found {len(blocks)} broken tools")

# Generate replacements for critical tools
fixes = {}

# Mortgage (critical!)
fixes['mortgage-calculator'] = """  'mortgage-calculator': {
    inputs: [{key:'price',label:'Home Price ($)',type:'number',defaultValue:350000},{key:'down',label:'Down Payment (%)',type:'number',defaultValue:20},{key:'rate',label:'Interest Rate (%)',type:'number',defaultValue:6.3},{key:'term',label:'Loan Term (years)',type:'number',defaultValue:30},{key:'taxRate',label:'Property Tax (%)',type:'number',defaultValue:1.2}],
    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term)*12; const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; const tax=F(v.price)*F(v.taxRate)/100/12; return [{label:'Principal & Interest',value:'$'+M.toFixed(2)},{label:'Monthly Tax',value:'$'+tax.toFixed(2)},{label:'Total Monthly',value:'$'+(M+tax).toFixed(2)},{label:'Total Cost',value:'$'+(M*n).toFixed(0)},{label:'Down Payment',value:'$'+(F(v.price)*F(v.down)/100).toFixed(0)}]; },
    presets: [{label:'20% Down 30yr',values:{price:350000,down:20,rate:6.3,term:30,taxRate:1.2}},{label:'FHA 3.5%',values:{price:300000,down:3.5,rate:6.5,term:30,taxRate:1.2}}],
  },"""

# BMI (critical!)
fixes['bmi-calculator'] = """  'bmi-calculator': {
    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'weight',label:'Weight (kg)',type:'number',defaultValue:70},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],
    formula: (v) => { const h=F(v.height)/100,w=F(v.weight),bmi=h>0?w/(h*h):0; const cat=bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':bmi<35?'Obese I':bmi<40?'Obese II':'Obese III'; const idealLow=18.5*h*h,idealHigh=24.9*h*h; return [{label:'BMI',value:bmi.toFixed(1)+' kg/m²'},{label:'Category',value:cat},{label:'Healthy Range',value:idealLow.toFixed(0)+'-'+idealHigh.toFixed(0)+' kg'}]; },
    presets: [{label:'Adult',values:{height:170,weight:70,gender:'male'}},{label:'Athlete',values:{height:185,weight:90,gender:'male'}}],
  },"""

# Retirement
fixes['retirement-calculator'] = """  'retirement-calculator': {
    inputs: [{key:'age',label:'Current Age',type:'number',defaultValue:30},{key:'retireAge',label:'Retirement Age',type:'number',defaultValue:65},{key:'savings',label:'Current Savings ($)',type:'number',defaultValue:50000},{key:'monthly',label:'Monthly Contribution ($)',type:'number',defaultValue:500},{key:'rate',label:'Expected Return (%)',type:'number',defaultValue:7}],
    formula: (v) => { const P=F(v.savings),pmt=F(v.monthly),r=F(v.rate)/100/12,n=(F(v.retireAge)-F(v.age))*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); return [{label:'At Retirement',value:'$'+fv.toFixed(0)},{label:'Monthly (4% rule)',value:'$'+(fv*0.04/12).toFixed(0)},{label:'Total Contributed',value:'$'+(P+pmt*n).toFixed(0)}]; },
    presets: [{label:'Start Early',values:{age:25,retireAge:65,savings:10000,monthly:500,rate:7}},{label:'Late Start',values:{age:45,retireAge:67,savings:100000,monthly:2000,rate:6}}],
  },"""

# Tip calculator
fixes['tip-calculator'] = """  'tip-calculator': {
    inputs: [{key:'bill',label:'Bill Amount ($)',type:'number',defaultValue:80},{key:'tipPct',label:'Tip (%)',type:'number',defaultValue:18},{key:'people',label:'Split Between',type:'number',defaultValue:3}],
    formula: (v) => { const tip=F(v.bill)*F(v.tipPct)/100,total=F(v.bill)+tip,pp=F(v.people)>0?total/F(v.people):total; return [{label:'Tip',value:'$'+tip.toFixed(2)},{label:'Total',value:'$'+total.toFixed(2)},{label:'Per Person',value:'$'+pp.toFixed(2)}]; },
    presets: [{label:'15%',values:{bill:50,tipPct:15,people:2}},{label:'20%',values:{bill:80,tipPct:20,people:3}}],
  },"""

# Discount
fixes['discount-calculator'] = """  'discount-calculator': {
    inputs: [{key:'price',label:'Original Price ($)',type:'number',defaultValue:100},{key:'discount',label:'Discount (%)',type:'number',defaultValue:20}],
    formula: (v) => { const saved=F(v.price)*F(v.discount)/100,final=F(v.price)-saved; return [{label:'You Save',value:'$'+saved.toFixed(2)},{label:'Final Price',value:'$'+final.toFixed(2)}]; },
    presets: [{label:'20% off',values:{price:100,discount:20}},{label:'50% off',values:{price:100,discount:50}}],
  },"""

# Percentage
fixes['percentage-calculator'] = """  'percentage-calculator': {
    inputs: [{key:'value',label:'Value',type:'number',defaultValue:42},{key:'total',label:'Total',type:'number',defaultValue:60}],
    formula: (v) => { const pct=F(v.total)>0?F(v.value)/F(v.total)*100:0; return [{label:'Percentage',value:pct.toFixed(1)+'%'},{label:'Remaining',value:(100-pct).toFixed(1)+'%'}]; },
  },"""

# Currency converter
fixes['currency-converter'] = """  'currency-converter': {
    inputs: [{key:'amount',label:'Amount',type:'number',defaultValue:100},{key:'rate',label:'Exchange Rate',type:'number',defaultValue:0.92,step:0.01}],
    formula: (v) => { const result=F(v.amount)*F(v.rate); return [{label:'Converted',value:result.toFixed(2)}]; },
    presets: [{label:'USD→EUR',values:{amount:100,rate:0.92}},{label:'USD→GBP',values:{amount:100,rate:0.79}}],
  },"""

# Sales Tax
fixes['sales-tax-calculator'] = """  'sales-tax-calculator': {
    inputs: [{key:'price',label:'List Price ($)',type:'number',defaultValue:100},{key:'taxRate',label:'Tax Rate (%)',type:'number',defaultValue:8.875,step:0.01}],
    formula: (v) => { const tax=F(v.price)*F(v.taxRate)/100; return [{label:'Tax',value:'$'+tax.toFixed(2)},{label:'Total',value:'$'+(F(v.price)+tax).toFixed(2)}]; },
  },"""

# QR Code
fixes['qr-code-generator'] = """  'qr-code-generator': {
    inputs: [{key:'text',label:'Text/URL',type:'text',defaultValue:'https://figureitcalc.com'},{key:'size',label:'Size (px)',type:'number',defaultValue:256}],
    formula: (v) => { return [{label:'QR Content',value:String(v.text)},{label:'Size',value:F(v.size)+'x'+F(v.size)+' px'},{label:'Error Correction',value:'Level M (15%)'}]; },
  },"""

# UUID
fixes['uuid-generator'] = """  'uuid-generator': {
    inputs: [{key:'count',label:'Count',type:'number',defaultValue:1,min:1,max:10}],
    formula: (v) => { const hex=()=>Math.floor(Math.random()*16).toString(16); const uuids=[]; for(let i=0;i<F(v.count);i++)uuids.push(hex()+hex()+hex()+hex()+hex()+hex()+hex()+hex()+'-'+hex()+hex()+hex()+hex()+'-4'+hex()+hex()+hex()+'-'+[8,9,'a','b'][Math.floor(Math.random()*4)]+hex()+hex()+hex()+'-'+hex()+hex()+hex()+hex()+hex()+hex()+hex()+hex()+hex()+hex()+hex()+hex()); return [{label:'UUID v4',value:uuids.join('\\n')}]; },
  },"""

# Zodiac Love
fixes['zodiac-love-compatibility'] = """  'zodiac-love-compatibility': {
    inputs: [{key:'sign1',label:'Your Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'scorpio'},{key:'sign2',label:'Partner',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'pisces'}],
    formula: (v) => { const el:Record<string,string>={aries:'Fire',leo:'Fire',sagittarius:'Fire',taurus:'Earth',virgo:'Earth',capricorn:'Earth',gemini:'Air',libra:'Air',aquarius:'Air',cancer:'Water',scorpio:'Water',pisces:'Water'}; const e1=el[String(v.sign1)],e2=el[String(v.sign2)]; let score=50; if(e1===e2)score+=25; else if((e1==='Fire'&&e2==='Air')||(e1==='Air'&&e2==='Fire')||(e1==='Earth'&&e2==='Water')||(e1==='Water'&&e2==='Earth'))score+=15; else if((e1==='Fire'&&e2==='Water')||(e1==='Water'&&e2==='Fire')||(e1==='Air'&&e2==='Earth')||(e1==='Earth'&&e2==='Air'))score-=10; const vd=score>=90?'Soulmates':score>=75?'Great Match':score>=60?'Good':score>=40?'Challenging':'Difficult'; return [{label:'Compatibility',value:score+'%'},{label:'Verdict',value:vd},{label:'Elements',value:e1+' + '+e2}]; },
  },"""

# Sheng Xiao
fixes['sheng-xiao-compatibility'] = """  'sheng-xiao-compatibility': {
    inputs: [{key:'z1',label:'Your Sign',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'dragon'},{key:'z2',label:'Partner',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'monkey'}],
    formula: (v) => { const h:Record<string,string[]>={rat:['dragon','monkey'],ox:['snake','rooster'],tiger:['horse','dog'],rabbit:['goat','pig'],dragon:['rat','monkey'],snake:['ox','rooster'],horse:['tiger','dog'],goat:['rabbit','pig'],monkey:['rat','dragon'],rooster:['ox','snake'],dog:['tiger','horse'],pig:['rabbit','goat']}; const c:Record<string,string>={rat:'horse',ox:'goat',tiger:'monkey',rabbit:'rooster',dragon:'dog',snake:'pig',horse:'rat',goat:'ox',monkey:'tiger',rooster:'rabbit',dog:'dragon',pig:'snake'}; let s=50; if(h[String(v.z1)]?.includes(String(v.z2)))s+=35; if(c[String(v.z1)]===String(v.z2))s-=30; if(v.z1===v.z2)s+=15; const vd=s>=90?'Heaven-Matched':s>=70?'Great':s>=50?'Compatible':s>=30?'Challenging':'Clash'; return [{label:'Match',value:s+'%'},{label:'Rating',value:vd}]; },
  },"""

# Love Calculator
fixes['love-calculator'] = """  'love-calculator': {
    inputs: [{key:'name1',label:'Your Name',type:'text',defaultValue:'Romeo'},{key:'name2',label:'Crush Name',type:'text',defaultValue:'Juliet'}],
    formula: (v) => { const h=(s:string)=>s.toLowerCase().replace(/[^a-z]/g,'').split('').reduce((a,c)=>a+c.charCodeAt(0),0); const seed=h(String(v.name1))*h(String(v.name2)); const score=((seed*7919+104729)%89)+11; const vd=score>=90?'Epic Love!':score>=70?'Strong Chemistry':score>=50?'Sweet Connection':score>=30?'A Spark':'The math says no...'; return [{label:'Love',value:score+'%'},{label:'Verdict',value:vd}]; },
    presets: [{label:'Romeo & Juliet',values:{name1:'Romeo',name2:'Juliet'}}],
  },"""

# Soulmate
fixes['soulmate-finder'] = """  'soulmate-finder': {
    inputs: [{key:'birth1',label:'Your Birthday',type:'text',defaultValue:'1990-05-15'},{key:'birth2',label:'Partner Birthday',type:'text',defaultValue:'1992-08-22'}],
    formula: (v) => { const rd=(n:number):number=>n<10||n===11||n===22||n===33?n:rd(String(n).split('').reduce((a,b)=>a+Number(b),0)); const d1=String(v.birth1).replace(/-/g,''),d2=String(v.birth2).replace(/-/g,''); if(d1.length<8||d2.length<8)return[{label:'Score',value:'Enter both dates'}]; const lp1=rd(d1.split('').reduce((a,b)=>a+Number(b),0)),lp2=rd(d2.split('').reduce((a,b)=>a+Number(b),0)); const sameGroup=[[1,5,7],[2,4,8],[3,6,9]].some(g=>g.includes(lp1)&&g.includes(lp2)); const lpScore=lp1===lp2?95:sameGroup?82:50; const m1=Number(d1.slice(4,6)),m2=Number(d2.slice(4,6)); const sDiff=Math.abs(m1-m2); const sScore=sDiff<=1?90:sDiff<=2?78:sDiff<=3?62:45; const final=Math.min(99,Math.round(lpScore*0.5+sScore*0.5)); const vd=final>=90?'Twin Flames':final>=75?'Deep Soul Bond':final>=55?'Karmic Connection':final>=35?'Growth Opportunity':'Passing Ships'; return [{label:'Soulmate Score',value:final+'%'},{label:'Type',value:vd},{label:'Your LP',value:String(lp1)},{label:'Partner LP',value:String(lp2)}]; },
  },"""

# Apply fixes
count = 0
for tool_id, replacement in fixes.items():
    if tool_id in blocks:
        start, end, old = blocks[tool_id]
        content = content[:start] + replacement + content[end:]
        count += 1

print(f"Applied {count} fixes")
with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.write(content)
