with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

F = {}

F['mortgage-calculator'] = "  'mortgage-calculator': {\n    inputs: [{key:'price',label:'Home Price ($)',type:'number',defaultValue:350000},{key:'down',label:'Down Payment (%)',type:'number',defaultValue:20},{key:'rate',label:'Interest Rate (%)',type:'number',defaultValue:6.3},{key:'term',label:'Loan Term (years)',type:'number',defaultValue:30}],\n    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term)*12; const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'P&I Payment',value:'$'+M.toFixed(2)},{label:'Total Cost',value:'$'+(M*n).toFixed(0)},{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)},{label:'Down Payment',value:'$'+(F(v.price)*F(v.down)/100).toFixed(0)}]; },\n    presets: [{label:'20%Down 30yr',values:{price:350000,down:20,rate:6.3,term:30}},{label:'FHA 3.5%',values:{price:300000,down:3.5,rate:6.5,term:30}}],\n  },"

F['tip-calculator'] = "  'tip-calculator': {\n    inputs: [{key:'bill',label:'Bill Amount ($)',type:'number',defaultValue:80},{key:'tipPct',label:'Tip (%)',type:'number',defaultValue:18},{key:'people',label:'Split Among',type:'number',defaultValue:3}],\n    formula: (v) => { const tip=F(v.bill)*F(v.tipPct)/100,total=F(v.bill)+tip,pp=F(v.people)>0?total/F(v.people):total; return [{label:'Tip',value:'$'+tip.toFixed(2)},{label:'Total',value:'$'+total.toFixed(2)},{label:'Per Person',value:'$'+pp.toFixed(2)}]; },\n    presets: [{label:'15pct',values:{bill:50,tipPct:15,people:2}},{label:'20pct',values:{bill:80,tipPct:20,people:3}}],\n  },"

F['discount-calculator'] = "  'discount-calculator': {\n    inputs: [{key:'price',label:'Original Price ($)',type:'number',defaultValue:100},{key:'discount',label:'Discount (%)',type:'number',defaultValue:20}],\n    formula: (v) => { const s=F(v.price)*F(v.discount)/100; return [{label:'You Save',value:'$'+s.toFixed(2)},{label:'Final Price',value:'$'+(F(v.price)-s).toFixed(2)}]; },\n    presets: [{label:'20pct off',values:{price:100,discount:20}},{label:'50pct off',values:{price:80,discount:50}}],\n  },"

F['compound-interest-calculator'] = "  'compound-interest-calculator': {\n    inputs: [{key:'principal',label:'Initial Invest ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly Add ($)',type:'number',defaultValue:200},{key:'rate',label:'Return (%)',type:'number',defaultValue:7},{key:'years',label:'Years',type:'number',defaultValue:20}],\n    formula: (v) => { const P=F(v.principal),pmt=F(v.monthly),r=F(v.rate)/100/12,n=F(v.years)*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); const inv=P+pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+inv.toFixed(0)},{label:'Interest',value:'$'+(fv-inv).toFixed(0)}]; },\n    presets: [{label:'30yr Retire',values:{principal:50000,monthly:500,rate:7,years:30}}],\n  },"

F['retirement-calculator'] = "  'retirement-calculator': {\n    inputs: [{key:'age',label:'Current Age',type:'number',defaultValue:30},{key:'retireAge',label:'Retire Age',type:'number',defaultValue:65},{key:'savings',label:'Savings ($)',type:'number',defaultValue:50000},{key:'monthly',label:'Monthly ($)',type:'number',defaultValue:500},{key:'rate',label:'Return (%)',type:'number',defaultValue:7}],\n    formula: (v) => { const P=F(v.savings),pmt=F(v.monthly),r=F(v.rate)/100/12,n=(F(v.retireAge)-F(v.age))*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); return [{label:'Retirement Nest Egg',value:'$'+fv.toFixed(0)},{label:'Monthly (4%)',value:'$'+(fv*0.04/12).toFixed(0)},{label:'Contributed',value:'$'+(P+pmt*n).toFixed(0)}]; },\n    presets: [{label:'Start at 25',values:{age:25,retireAge:65,savings:10000,monthly:500,rate:7}}],\n  },"

F['temperature-converter'] = "  'temperature-converter': {\n    inputs: [{key:'celsius',label:'Celsius',type:'number',defaultValue:20},{key:'toUnit',label:'Convert To',type:'select',options:[{label:'Fahrenheit',value:'f'},{label:'Kelvin',value:'k'},{label:'Both',value:'both'}],defaultValue:'both'}],\n    formula: (v) => { const c=F(v.celsius),f=c*9/5+32,k=c+273.15; const r=[]; if(v.toUnit==='f'||v.toUnit==='both')r.push({label:'Fahrenheit',value:f.toFixed(1)+' degF'}); if(v.toUnit==='k'||v.toUnit==='both')r.push({label:'Kelvin',value:k.toFixed(1)+' K'}); r.push({label:'Celsius',value:c.toFixed(1)+' degC'}); return r; },\n    presets: [{label:'Freezing',values:{celsius:0,toUnit:'both'}},{label:'Body',values:{celsius:37,toUnit:'both'}},{label:'Boiling',values:{celsius:100,toUnit:'both'}}],\n  },"

F['fuel-cost-calculator'] = "  'fuel-cost-calculator': {\n    inputs: [{key:'distance',label:'Distance (miles)',type:'number',defaultValue:300},{key:'mpg',label:'Fuel Econ (MPG)',type:'number',defaultValue:25},{key:'fuelPrice',label:'Fuel Price ($/gal)',type:'number',defaultValue:3.50}],\n    formula: (v) => { const gal=F(v.distance)/F(v.mpg),cost=gal*F(v.fuelPrice); return [{label:'Fuel Needed',value:gal.toFixed(1)+' gal'},{label:'Trip Cost',value:'$'+cost.toFixed(2)},{label:'$/Mile',value:'$'+(F(v.fuelPrice)/F(v.mpg)).toFixed(3)}]; },\n    presets: [{label:'300mi Trip',values:{distance:300,mpg:25,fuelPrice:3.50}}],\n  },"

F['currency-converter'] = "  'currency-converter': {\n    inputs: [{key:'amount',label:'Amount',type:'number',defaultValue:100},{key:'rate',label:'Exchange Rate',type:'number',defaultValue:0.92,step:0.01}],\n    formula: (v) => { const r=F(v.amount)*F(v.rate); return [{label:'Converted',value:r.toFixed(2)},{label:'Inverse',value:(1/F(v.rate)).toFixed(4)}]; },\n    presets: [{label:'USD-EUR',values:{amount:100,rate:0.92}},{label:'USD-GBP',values:{amount:100,rate:0.79}}],\n  },"

F['percentage-calculator'] = "  'percentage-calculator': {\n    inputs: [{key:'value',label:'Part Value',type:'number',defaultValue:42},{key:'total',label:'Total Value',type:'number',defaultValue:60}],\n    formula: (v) => { const p=F(v.total)>0?F(v.value)/F(v.total)*100:0; return [{label:'Percentage',value:p.toFixed(2)+'%'},{label:'Remaining',value:(100-p).toFixed(2)+'%'}]; },\n    presets: [{label:'42/60',values:{value:42,total:60}},{label:'85/100',values:{value:85,total:100}}],\n  },"

# Apply
count = 0
for tid, replacement in F.items():
    start = content.find("'"+tid+"': {")
    if start < 0: continue
    depth = 0
    end = start
    for i in range(start, len(content)):
        if content[i] == '{': depth += 1
        if content[i] == '}': depth -= 1
        if depth == 0 and content[i] == '}':
            end = i + 1
            if end < len(content) and content[end] == ',': end += 1
            break
    content = content[:start] + replacement + content[end:]
    count += 1

with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.write(content)

print(f"Fixed {count} tools")
print(f"input1 remain: {content.count(chr(34)+'input1'+chr(34))}")
