"""
Reliable formula fixer — line-by-line parsing, direct block replacement.
Each broken block gets a real formula with proper inputs.
"""
import re, json

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find broken blocks — those with input1/input2 generic A+B
# Each block starts with "  'tool-name': {" and ends with "  },"
broken_blocks = []  # list of (tool_id, start_line_idx, end_line_idx)
i = 0
while i < len(lines):
    m = re.match(r"^  '([a-z0-9-]+)': \{", lines[i])
    if m:
        tool_id = m.group(1)
        depth = 0
        j = i
        while j < len(lines):
            depth += lines[j].count('{') - lines[j].count('}')
            if depth == 0 and j > i:
                break
            j += 1
        block_lines = "".join(lines[i:j+1])
        if '"input1"' in block_lines:
            broken_blocks.append((tool_id, i, j))
    i += 1

print(f"Found {len(broken_blocks)} broken blocks")

# Real formulas — compact TypeScript
F = {}

# === FINANCE (most critical) ===
F['annuity-calculator'] = "  'annuity-calculator': {\n    inputs: [{key:'payment',label:'Periodic Payment ($)',type:'number',defaultValue:1000},{key:'rate',label:'Annual Interest (%)',type:'number',defaultValue:6},{key:'periods',label:'Number of Years',type:'number',defaultValue:20}],\n    formula: (v) => { const pmt=F(v.payment),r=F(v.rate)/100,n=F(v.periods); const fv=r>0?pmt*((Math.pow(1+r,n)-1)/r):pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+(pmt*n).toFixed(0)},{label:'Interest Earned',value:'$'+(fv-pmt*n).toFixed(0)}]; },\n  },"

F['break-even-calculator'] = "  'break-even-calculator': {\n    inputs: [{key:'fixedCosts',label:'Fixed Costs ($)',type:'number',defaultValue:10000},{key:'price',label:'Price per Unit ($)',type:'number',defaultValue:50},{key:'variableCost',label:'Variable Cost/Unit ($)',type:'number',defaultValue:30}],\n    formula: (v) => { const fc=F(v.fixedCosts),p=F(v.price),vc=F(v.variableCost),cm=p-vc,be=cm>0?Math.ceil(fc/cm):0; return [{label:'Break-Even Units',value:String(be)},{label:'Revenue at BE',value:'$'+(be*p).toFixed(0)},{label:'Margin/Unit',value:'$'+cm.toFixed(2)}]; },\n  },"

F['car-depreciation-calculator'] = "  'car-depreciation-calculator': {\n    inputs: [{key:'price',label:'Purchase Price ($)',type:'number',defaultValue:35000},{key:'years',label:'Years Owned',type:'number',defaultValue:5}],\n    formula: (v) => { let val=F(v.price); const rates=[0.78,0.85,0.88,0.90,0.92]; for(let i=0;i<Math.min(F(v.years),5);i++)val*=rates[i]; for(let i=5;i<F(v.years);i++)val*=0.93; return [{label:'Current Value',value:'$'+val.toFixed(0)},{label:'Depreciation',value:'$'+(F(v.price)-val).toFixed(0)},{label:'Value Lost',value:((1-val/F(v.price))*100).toFixed(0)+'%'}]; },\n  },"

F['car-loan-calculator'] = "  'car-loan-calculator': {\n    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'down',label:'Down Payment (%)',type:'number',defaultValue:20},{key:'rate',label:'APR (%)',type:'number',defaultValue:6},{key:'term',label:'Term (months)',type:'number',defaultValue:60}],\n    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term); const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly Payment',value:'$'+M.toFixed(2)},{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)},{label:'Down Payment',value:'$'+(F(v.price)*F(v.down)/100).toFixed(0)}]; },\n  },"

F['compound-interest-calculator'] = "  'compound-interest-calculator': {\n    inputs: [{key:'principal',label:'Initial Investment ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly Addition ($)',type:'number',defaultValue:200},{key:'rate',label:'Annual Interest (%)',type:'number',defaultValue:7},{key:'years',label:'Years',type:'number',defaultValue:20}],\n    formula: (v) => { const P=F(v.principal),pmt=F(v.monthly),r=F(v.rate)/100/12,n=F(v.years)*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); const inv=P+pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+inv.toFixed(0)},{label:'Interest Earned',value:'$'+(fv-inv).toFixed(0)}]; },\n    presets: [{label:'Retire 30yr',values:{principal:50000,monthly:500,rate:7,years:30}}],\n  },"

F['cpm-calculator'] = "  'cpm-calculator': {\n    inputs: [{key:'cost',label:'Ad Cost ($)',type:'number',defaultValue:500},{key:'impressions',label:'Impressions',type:'number',defaultValue:100000}],\n    formula: (v) => { const cpm=F(v.impressions)>0?F(v.cost)/F(v.impressions)*1000:0; return [{label:'CPM',value:'$'+cpm.toFixed(2)},{label:'CPC (2% CTR)',value:'$'+(cpm/20).toFixed(2)}]; },\n  },"

F['currency-converter'] = "  'currency-converter': {\n    inputs: [{key:'amount',label:'Amount',type:'number',defaultValue:100},{key:'rate',label:'Exchange Rate',type:'number',defaultValue:0.92,step:0.01}],\n    formula: (v) => { return [{label:'Converted',value:(F(v.amount)*F(v.rate)).toFixed(2)}]; },\n    presets: [{label:'USD to EUR',values:{amount:100,rate:0.92}}],\n  },"

F['discount-calculator'] = "  'discount-calculator': {\n    inputs: [{key:'price',label:'Original Price ($)',type:'number',defaultValue:100},{key:'discount',label:'Discount (%)',type:'number',defaultValue:20}],\n    formula: (v) => { const saved=F(v.price)*F(v.discount)/100; return [{label:'You Save',value:'$'+saved.toFixed(2)},{label:'Final Price',value:'$'+(F(v.price)-saved).toFixed(2)}]; },\n    presets: [{label:'20% off',values:{price:100,discount:20}}],\n  },"

F['dividend-yield-calculator'] = "  'dividend-yield-calculator': {\n    inputs: [{key:'div',label:'Annual Dividend ($)',type:'number',defaultValue:2.50},{key:'price',label:'Stock Price ($)',type:'number',defaultValue:50}],\n    formula: (v) => { const y=F(v.price)>0?F(v.div)/F(v.price)*100:0; return [{label:'Dividend Yield',value:y.toFixed(2)+'%'},{label:'Monthly/Share',value:'$'+(F(v.div)/12).toFixed(3)}]; },\n  },"

F['emi-calculator'] = "  'emi-calculator': {\n    inputs: [{key:'loan',label:'Loan Amount ($)',type:'number',defaultValue:20000},{key:'rate',label:'Annual Rate (%)',type:'number',defaultValue:8},{key:'months',label:'Tenure (months)',type:'number',defaultValue:36}],\n    formula: (v) => { const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.months),emi=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly EMI',value:'$'+emi.toFixed(2)},{label:'Total Payment',value:'$'+(emi*n).toFixed(0)},{label:'Total Interest',value:'$'+(emi*n-P).toFixed(0)}]; },\n  },"

F['fuel-cost-calculator'] = "  'fuel-cost-calculator': {\n    inputs: [{key:'distance',label:'Distance (miles)',type:'number',defaultValue:300},{key:'mpg',label:'MPG',type:'number',defaultValue:25},{key:'fuelPrice',label:'Fuel Price ($/gal)',type:'number',defaultValue:3.50}],\n    formula: (v) => { const gal=F(v.distance)/F(v.mpg),cost=gal*F(v.fuelPrice); return [{label:'Fuel Needed',value:gal.toFixed(1)+' gal'},{label:'Trip Cost',value:'$'+cost.toFixed(2)},{label:'Cost/Mile',value:'$'+(F(v.fuelPrice)/F(v.mpg)).toFixed(2)}]; },\n  },"

F['home-equity-calculator'] = "  'home-equity-calculator': {\n    inputs: [{key:'value',label:'Home Value ($)',type:'number',defaultValue:350000},{key:'mortgage',label:'Mortgage Balance ($)',type:'number',defaultValue:200000}],\n    formula: (v) => { const eq=F(v.value)-F(v.mortgage),pct=F(v.value)>0?eq/F(v.value)*100:0; return [{label:'Home Equity',value:'$'+eq.toLocaleString()},{label:'Equity %',value:pct.toFixed(1)+'%'},{label:'LTV',value:(100-pct).toFixed(1)+'%'}]; },\n  },"

F['inflation-calculator'] = "  'inflation-calculator': {\n    inputs: [{key:'amount',label:'Amount ($)',type:'number',defaultValue:10000},{key:'rate',label:'Inflation Rate (%)',type:'number',defaultValue:3},{key:'years',label:'Years',type:'number',defaultValue:10}],\n    formula: (v) => { const f=F(v.amount)*Math.pow(1+F(v.rate)/100,F(v.years)),t=F(v.amount)/Math.pow(1+F(v.rate)/100,F(v.years)); return [{label:'Future Value',value:'$'+f.toFixed(2)},{label:'Today\\'s Worth',value:'$'+t.toFixed(2)}]; },\n  },"

F['invoice-hours-calculator'] = "  'invoice-hours-calculator': {\n    inputs: [{key:'hours',label:'Hours Worked',type:'number',defaultValue:40,step:0.5},{key:'rate',label:'Hourly Rate ($)',type:'number',defaultValue:75}],\n    formula: (v) => { const s=F(v.hours)*F(v.rate); return [{label:'Subtotal',value:'$'+s.toFixed(2)},{label:'Tax (15%)',value:'$'+(s*0.15).toFixed(2)},{label:'Total',value:'$'+(s*1.15).toFixed(2)}]; },\n  },"

F['loan-comparison-calculator'] = "  'loan-comparison-calculator': {\n    inputs: [{key:'l1',label:'Loan 1 ($)',type:'number',defaultValue:200000},{key:'r1',label:'Rate 1 (%)',type:'number',defaultValue:6},{key:'t1',label:'Term 1 (yr)',type:'number',defaultValue:30},{key:'l2',label:'Loan 2 ($)',type:'number',defaultValue:200000},{key:'r2',label:'Rate 2 (%)',type:'number',defaultValue:5.5},{key:'t2',label:'Term 2 (yr)',type:'number',defaultValue:15}],\n    formula: (v) => { const c=(P:number,rate:number,yr:number)=>{const mr=rate/100/12,mn=yr*12,pmt=mr>0?P*mr*Math.pow(1+mr,mn)/(Math.pow(1+mr,mn)-1):P/mn;return{mo:pmt,tt:pmt*mn};};const a=c(F(v.l1),F(v.r1),F(v.t1)),b=c(F(v.l2),F(v.r2),F(v.t2));return[{label:'L1 Monthly',value:'$'+a.mo.toFixed(2)},{label:'L1 Total',value:'$'+a.tt.toFixed(0)},{label:'L2 Monthly',value:'$'+b.mo.toFixed(2)},{label:'L2 Total',value:'$'+b.tt.toFixed(0)}]; },\n  },"

F['mileage-calculator'] = "  'mileage-calculator': {\n    inputs: [{key:'miles',label:'Business Miles',type:'number',defaultValue:500},{key:'rate',label:'IRS Rate ($/mile)',type:'number',defaultValue:0.70,step:0.01}],\n    formula: (v) => { const r=F(v.miles)*F(v.rate); return [{label:'Reimbursement',value:'$'+r.toFixed(2)}]; },\n  },"

F['mortgage-calculator'] = "  'mortgage-calculator': {\n    inputs: [{key:'price',label:'Home Price ($)',type:'number',defaultValue:350000},{key:'down',label:'Down Payment (%)',type:'number',defaultValue:20},{key:'rate',label:'Interest Rate (%)',type:'number',defaultValue:6.3},{key:'term',label:'Loan Term (years)',type:'number',defaultValue:30},{key:'taxRate',label:'Property Tax (%)',type:'number',defaultValue:1.2}],\n    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term)*12; const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; const tax=F(v.price)*F(v.taxRate)/100/12; return [{label:'Principal & Interest',value:'$'+M.toFixed(2)},{label:'Monthly Tax',value:'$'+tax.toFixed(2)},{label:'Total Monthly',value:'$'+(M+tax).toFixed(2)},{label:'Total Cost',value:'$'+(M*n).toFixed(0)}]; },\n    presets: [{label:'20% Down 30yr',values:{price:350000,down:20,rate:6.3,term:30,taxRate:1.2}}],\n  },"

F['net-worth-calculator'] = "  'net-worth-calculator': {\n    inputs: [{key:'cash',label:'Cash & Bank ($)',type:'number',defaultValue:10000},{key:'investments',label:'Investments ($)',type:'number',defaultValue:50000},{key:'property',label:'Property ($)',type:'number',defaultValue:300000},{key:'debt',label:'Total Debt ($)',type:'number',defaultValue:200000}],\n    formula: (v) => { const a=F(v.cash)+F(v.investments)+F(v.property),d=F(v.debt); return [{label:'Total Assets',value:'$'+a.toLocaleString()},{label:'Total Liabilities',value:'$'+d.toLocaleString()},{label:'Net Worth',value:'$'+(a-d).toLocaleString()}]; },\n  },"

F['percentage-calculator'] = "  'percentage-calculator': {\n    inputs: [{key:'value',label:'Value',type:'number',defaultValue:42},{key:'total',label:'Total',type:'number',defaultValue:60}],\n    formula: (v) => { const pct=F(v.total)>0?F(v.value)/F(v.total)*100:0; return [{label:'Percentage',value:pct.toFixed(1)+'%'},{label:'Remaining',value:(100-pct).toFixed(1)+'%'}]; },\n  },"

F['roi-calculator'] = "  'roi-calculator': {\n    inputs: [{key:'invested',label:'Invested ($)',type:'number',defaultValue:10000},{key:'returned',label:'Returned ($)',type:'number',defaultValue:12000}],\n    formula: (v) => { const roi=F(v.invested)>0?(F(v.returned)-F(v.invested))/F(v.invested)*100:0; return [{label:'ROI',value:roi.toFixed(2)+'%'},{label:'Gain/Loss',value:'$'+(F(v.returned)-F(v.invested)).toFixed(2)}]; },\n  },"

F['sales-tax-calculator'] = "  'sales-tax-calculator': {\n    inputs: [{key:'price',label:'List Price ($)',type:'number',defaultValue:100},{key:'taxRate',label:'Tax Rate (%)',type:'number',defaultValue:8.875,step:0.01}],\n    formula: (v) => { const tax=F(v.price)*F(v.taxRate)/100; return [{label:'Sales Tax',value:'$'+tax.toFixed(2)},{label:'Total',value:'$'+(F(v.price)+tax).toFixed(2)}]; },\n  },"

F['savings-goal-calculator'] = "  'savings-goal-calculator': {\n    inputs: [{key:'goal',label:'Goal ($)',type:'number',defaultValue:100000},{key:'saved',label:'Current Savings ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly ($)',type:'number',defaultValue:500},{key:'rate',label:'Return (%)',type:'number',defaultValue:5}],\n    formula: (v) => { const r=F(v.rate)/100/12; let b=F(v.saved),mo=0; while(b<F(v.goal)&&mo<1200){b=b*(1+r)+F(v.monthly);mo++;} return [{label:'Months to Goal',value:String(mo)},{label:'Years',value:(mo/12).toFixed(1)}]; },\n  },"

F['stock-return-calculator'] = "  'stock-return-calculator': {\n    inputs: [{key:'buy',label:'Buy Price ($)',type:'number',defaultValue:100},{key:'sell',label:'Sell Price ($)',type:'number',defaultValue:130},{key:'shares',label:'Shares',type:'number',defaultValue:10}],\n    formula: (v) => { const p=(F(v.sell)-F(v.buy))*F(v.shares),pct=F(v.buy)>0?(F(v.sell)-F(v.buy))/F(v.buy)*100:0; return [{label:'Profit/Loss',value:'$'+p.toFixed(2)},{label:'Return %',value:pct.toFixed(2)+'%'}]; },\n  },"

F['tip-calculator'] = "  'tip-calculator': {\n    inputs: [{key:'bill',label:'Bill ($)',type:'number',defaultValue:80},{key:'tipPct',label:'Tip (%)',type:'number',defaultValue:18},{key:'people',label:'Split',type:'number',defaultValue:3}],\n    formula: (v) => { const tip=F(v.bill)*F(v.tipPct)/100,total=F(v.bill)+tip,pp=F(v.people)>0?total/F(v.people):total; return [{label:'Tip',value:'$'+tip.toFixed(2)},{label:'Total',value:'$'+total.toFixed(2)},{label:'Per Person',value:'$'+pp.toFixed(2)}]; },\n    presets: [{label:'15%',values:{bill:50,tipPct:15,people:2}},{label:'20%',values:{bill:80,tipPct:20,people:3}}],\n  },"

F['retirement-calculator'] = "  'retirement-calculator': {\n    inputs: [{key:'age',label:'Current Age',type:'number',defaultValue:30},{key:'retireAge',label:'Retirement Age',type:'number',defaultValue:65},{key:'savings',label:'Current Savings ($)',type:'number',defaultValue:50000},{key:'monthly',label:'Monthly ($)',type:'number',defaultValue:500},{key:'rate',label:'Return (%)',type:'number',defaultValue:7}],\n    formula: (v) => { const P=F(v.savings),pmt=F(v.monthly),r=F(v.rate)/100/12,n=(F(v.retireAge)-F(v.age))*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); return [{label:'At Retirement',value:'$'+fv.toFixed(0)},{label:'Monthly (4%)',value:'$'+(fv*0.04/12).toFixed(0)},{label:'Contributed',value:'$'+(P+pmt*n).toFixed(0)}]; },\n    presets: [{label:'Early Start',values:{age:25,retireAge:65,savings:10000,monthly:500,rate:7}}],\n  },"

# === FORTUNE (high engagement) ===
F['zodiac-love-compatibility'] = "  'zodiac-love-compatibility': {\n    inputs: [{key:'s1',label:'Your Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'scorpio'},{key:'s2',label:'Partner Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'pisces'}],\n    formula: (v) => { const el:Record<string,string>={aries:'Fire',leo:'Fire',sagittarius:'Fire',taurus:'Earth',virgo:'Earth',capricorn:'Earth',gemini:'Air',libra:'Air',aquarius:'Air',cancer:'Water',scorpio:'Water',pisces:'Water'}; const e1=el[String(v.s1)],e2=el[String(v.s2)]; let sc=50; if(e1===e2)sc+=25; else if((e1==='Fire'&&e2==='Air')||(e1==='Air'&&e2==='Fire')||(e1==='Earth'&&e2==='Water')||(e1==='Water'&&e2==='Earth'))sc+=15; else if((e1==='Fire'&&e2==='Water')||(e1==='Water'&&e2==='Fire')||(e1==='Air'&&e2==='Earth')||(e1==='Earth'&&e2==='Air'))sc-=10; const vd=sc>=90?'Soulmates!':sc>=75?'Great Match':sc>=60?'Good':sc>=40?'Challenging':'Difficult'; return [{label:'Compatibility',value:sc+'%'},{label:'Verdict',value:vd},{label:'Elements',value:e1+' + '+e2}]; },\n  },"

F['sheng-xiao-compatibility'] = "  'sheng-xiao-compatibility': {\n    inputs: [{key:'z1',label:'Your Sign',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'dragon'},{key:'z2',label:'Partner',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'monkey'}],\n    formula: (v) => { const h:Record<string,string[]>={rat:['dragon','monkey'],ox:['snake','rooster'],tiger:['horse','dog'],rabbit:['goat','pig'],dragon:['rat','monkey'],snake:['ox','rooster'],horse:['tiger','dog'],goat:['rabbit','pig'],monkey:['rat','dragon'],rooster:['ox','snake'],dog:['tiger','horse'],pig:['rabbit','goat']}; const c:Record<string,string>={rat:'horse',ox:'goat',tiger:'monkey',rabbit:'rooster',dragon:'dog',snake:'pig',horse:'rat',goat:'ox',monkey:'tiger',rooster:'rabbit',dog:'dragon',pig:'snake'}; let s=50; if(h[String(v.z1)]?.includes(String(v.z2)))s+=35; if(c[String(v.z1)]===String(v.z2))s-=30; if(v.z1===v.z2)s+=15; return [{label:'Match',value:s+'%'},{label:'Rating',value:s>=90?'Heaven-Matched':s>=70?'Great':s>=50?'Compatible':s>=30?'Challenging':'Clash'}]; },\n  },"

F['love-calculator'] = "  'love-calculator': {\n    inputs: [{key:'name1',label:'Your Name',type:'text',defaultValue:'Romeo'},{key:'name2',label:'Crush Name',type:'text',defaultValue:'Juliet'}],\n    formula: (v) => { const h=(s:string)=>s.toLowerCase().replace(/[^a-z]/g,'').split('').reduce((a,c)=>a+c.charCodeAt(0),0); const seed=h(String(v.name1))*h(String(v.name2)); const score=((seed*7919+104729)%89)+11; return [{label:'Love',value:score+'%'},{label:'Verdict',value:score>=80?'Epic!':score>=60?'Sweet':score>=40?'Cute':'Hmm...'}]; },\n  },"

F['soulmate-finder'] = "  'soulmate-finder': {\n    inputs: [{key:'b1',label:'Your Birthday',type:'text',defaultValue:'1990-05-15'},{key:'b2',label:'Partner Birthday',type:'text',defaultValue:'1992-08-22'}],\n    formula: (v) => { const rd=(n:number):number=>n<10||n===11||n===22||n===33?n:rd(String(n).split('').reduce((a,b)=>a+Number(b),0)); const d1=String(v.b1).replace(/-/g,''),d2=String(v.b2).replace(/-/g,''); if(d1.length<8||d2.length<8)return[{label:'Score',value:'Enter dates'}]; const lp1=rd(d1.split('').reduce((a,b)=>a+Number(b),0)),lp2=rd(d2.split('').reduce((a,b)=>a+Number(b),0)); const grps=[[1,5,7],[2,4,8],[3,6,9]]; const sg=grps.some(g=>g.includes(lp1)&&g.includes(lp2)); const lps=lp1===lp2?95:sg?82:50; const m1=Number(d1.slice(4,6)),m2=Number(d2.slice(4,6)),sd=Math.abs(m1-m2),ss=sd<=1?90:sd<=2?78:sd<=3?62:45; const f=Math.min(99,Math.round(lps*0.5+ss*0.5)); return [{label:'Soulmate Score',value:f+'%'},{label:'Type',value:f>=90?'Twin Flames':f>=75?'Deep Bond':f>=55?'Karmic':f>=35?'Growth':'Passing'},{label:'Your LP',value:String(lp1)},{label:'Partner LP',value:String(lp2)}]; },\n  },"

# Apply replacements from end to start to maintain line indices
count = 0
for tool_id, si, ei in sorted(broken_blocks, key=lambda x: -x[1]):
    if tool_id in F:
        new_lines = F[tool_id].split('\n')
        # Replace the block
        lines[si:ei+1] = [l + '\n' for l in new_lines]
        count += 1

print(f"Replaced {count} formulas")
remaining = sum(1 for l in lines if '"input1"' in l)
print(f"Remaining input1 refs in file: {remaining}")

with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.writelines(lines)
