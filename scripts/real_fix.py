"""Fix formulas with REAL calculations matching real input labels."""
import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find all blocks (broken or not)
blocks = {}
i = 0
while i < len(lines):
    m = re.match(r"^  '([a-z0-9-]+)': \{", lines[i])
    if m:
        tid = m.group(1)
        depth = 0; j = i
        while j < len(lines):
            depth += lines[j].count('{') - lines[j].count('}')
            if depth == 0 and j > i: break
            j += 1
        blocks[tid] = (i, j)
        i = j + 1
    else:
        i += 1

# Real formulas: tool_id -> complete replacement block
F = {}

F['bmi-calculator'] = "  'bmi-calculator': {\n    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'weight',label:'Weight (kg)',type:'number',defaultValue:70},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],\n    formula: (v) => { const h=F(v.height)/100,w=F(v.weight),bmi=h>0?w/(h*h):0; const cat=bmi<18.5?'Underweight':bmi<25?'Normal Weight':bmi<30?'Overweight':bmi<35?'Obese I':bmi<40?'Obese II':'Obese III'; const low=18.5*h*h,high=24.9*h*h; return [{label:'Your BMI',value:bmi.toFixed(1)+' kg/m²'},{label:'Category',value:cat},{label:'Healthy Weight Range',value:low.toFixed(0)+' - '+high.toFixed(0)+' kg'}]; },\n    presets: [{label:'Adult (170cm/70kg)',values:{height:170,weight:70,gender:'male'}}],\n  },"

F['mortgage-calculator'] = "  'mortgage-calculator': {\n    inputs: [{key:'price',label:'Home Price ($)',type:'number',defaultValue:350000},{key:'down',label:'Down Payment (%)',type:'number',defaultValue:20},{key:'rate',label:'Interest Rate (%)',type:'number',defaultValue:6.3},{key:'term',label:'Loan Term (years)',type:'number',defaultValue:30}],\n    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term)*12; const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly Payment',value:'$'+M.toFixed(2)},{label:'Total Cost',value:'$'+(M*n).toFixed(0)},{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)},{label:'Down Payment',value:'$'+(F(v.price)*F(v.down)/100).toFixed(0)}]; },\n    presets: [{label:'20% Down 30yr',values:{price:350000,down:20,rate:6.3,term:30}},{label:'FHA 3.5%',values:{price:300000,down:3.5,rate:6.5,term:30}}],\n  },"

F['tip-calculator'] = "  'tip-calculator': {\n    inputs: [{key:'bill',label:'Bill Amount ($)',type:'number',defaultValue:80},{key:'tipPct',label:'Tip Percentage (%)',type:'number',defaultValue:18},{key:'people',label:'Split Among (people)',type:'number',defaultValue:3}],\n    formula: (v) => { const tip=F(v.bill)*F(v.tipPct)/100,total=F(v.bill)+tip,pp=F(v.people)>0?total/F(v.people):total; return [{label:'Tip Amount',value:'$'+tip.toFixed(2)},{label:'Total Bill',value:'$'+total.toFixed(2)},{label:'Per Person',value:'$'+pp.toFixed(2)}]; },\n    presets: [{label:'15% Tip',values:{bill:50,tipPct:15,people:2}},{label:'20% Good Service',values:{bill:80,tipPct:20,people:3}}],\n  },"

F['compound-interest-calculator'] = "  'compound-interest-calculator': {\n    inputs: [{key:'principal',label:'Initial Investment ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly Addition ($)',type:'number',defaultValue:200},{key:'rate',label:'Annual Return (%)',type:'number',defaultValue:7},{key:'years',label:'Years',type:'number',defaultValue:20}],\n    formula: (v) => { const P=F(v.principal),pmt=F(v.monthly),r=F(v.rate)/100/12,n=F(v.years)*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); const inv=P+pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+inv.toFixed(2)},{label:'Interest Earned',value:'$'+(fv-inv).toFixed(2)}]; },\n    presets: [{label:'Retire 30yr',values:{principal:50000,monthly:500,rate:7,years:30}}],\n  },"

F['discount-calculator'] = "  'discount-calculator': {\n    inputs: [{key:'price',label:'Original Price ($)',type:'number',defaultValue:100},{key:'discount',label:'Discount (%)',type:'number',defaultValue:20},{key:'quantity',label:'Quantity',type:'number',defaultValue:1}],\n    formula: (v) => { const saved=F(v.price)*F(v.discount)/100*F(v.quantity),final=(F(v.price)-F(v.price)*F(v.discount)/100)*F(v.quantity); return [{label:'You Save',value:'$'+saved.toFixed(2)},{label:'Final Price',value:'$'+final.toFixed(2)},{label:'Per Item',value:'$'+(final/F(v.quantity)).toFixed(2)}]; },\n    presets: [{label:'20% off $100',values:{price:100,discount:20,quantity:1}},{label:'50% off 3 items',values:{price:50,discount:50,quantity:3}}],\n  },"

F['currency-converter'] = "  'currency-converter': {\n    inputs: [{key:'amount',label:'Amount',type:'number',defaultValue:100},{key:'rate',label:'Exchange Rate (1 from = X to)',type:'number',defaultValue:0.92,step:0.01},{key:'fee',label:'Conversion Fee (%)',type:'number',defaultValue:0}],\n    formula: (v) => { const converted=F(v.amount)*F(v.rate)*(1-F(v.fee)/100); return [{label:'Converted Amount',value:converted.toFixed(2)},{label:'Fee Amount',value:(F(v.amount)*F(v.rate)*F(v.fee)/100).toFixed(2)},{label:'Effective Rate',value:(F(v.rate)*(1-F(v.fee)/100)).toFixed(4)}]; },\n    presets: [{label:'USD to EUR',values:{amount:100,rate:0.92,fee:0}},{label:'USD to GBP',values:{amount:100,rate:0.79,fee:1}}],\n  },"

F['retirement-calculator'] = "  'retirement-calculator': {\n    inputs: [{key:'age',label:'Current Age',type:'number',defaultValue:30},{key:'retireAge',label:'Retirement Age',type:'number',defaultValue:65},{key:'savings',label:'Current Savings ($)',type:'number',defaultValue:50000},{key:'monthly',label:'Monthly Contribution ($)',type:'number',defaultValue:500},{key:'rate',label:'Expected Return (%)',type:'number',defaultValue:7}],\n    formula: (v) => { const P=F(v.savings),pmt=F(v.monthly),r=F(v.rate)/100/12,n=(F(v.retireAge)-F(v.age))*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); return [{label:'At Retirement',value:'$'+fv.toFixed(0)},{label:'Monthly Income (4%)',value:'$'+(fv*0.04/12).toFixed(0)},{label:'Total Contributed',value:'$'+(P+pmt*n).toFixed(0)}]; },\n    presets: [{label:'Start Age 25',values:{age:25,retireAge:65,savings:10000,monthly:500,rate:7}}],\n  },"

F['percentage-calculator'] = "  'percentage-calculator': {\n    inputs: [{key:'value',label:'Part Value',type:'number',defaultValue:42},{key:'total',label:'Total Value',type:'number',defaultValue:60}],\n    formula: (v) => { const pct=F(v.total)>0?F(v.value)/F(v.total)*100:0; return [{label:'Percentage',value:pct.toFixed(2)+'%'},{label:'Remaining',value:(100-pct).toFixed(2)+'%'},{label:'Fraction',value:'~'+Math.round(pct)+'/100'}]; },\n  },"

F['temperature-converter'] = "  'temperature-converter': {\n    inputs: [{key:'celsius',label:'Celsius (°C)',type:'number',defaultValue:20},{key:'toUnit',label:'Convert To',type:'select',options:[{label:'Fahrenheit (°F)',value:'f'},{label:'Kelvin (K)',value:'k'},{label:'Both',value:'both'}],defaultValue:'both'}],\n    formula: (v) => { const c=F(v.celsius),f=c*9/5+32,k=c+273.15; const u=v.toUnit; const results=[]; if(u==='f'||u==='both')results.push({label:'Fahrenheit',value:f.toFixed(1)+' °F'}); if(u==='k'||u==='both')results.push({label:'Kelvin',value:k.toFixed(1)+' K'}); results.push({label:'Celsius',value:c.toFixed(1)+' °C'}); return results; },\n    presets: [{label:'Freezing',values:{celsius:0,toUnit:'both'}},{label:'Body Temp',values:{celsius:37,toUnit:'both'}},{label:'Boiling',values:{celsius:100,toUnit:'both'}}],\n  },"

F['fuel-cost-calculator'] = "  'fuel-cost-calculator': {\n    inputs: [{key:'distance',label:'Trip Distance (miles)',type:'number',defaultValue:300},{key:'mpg',label:'Fuel Economy (MPG)',type:'number',defaultValue:25},{key:'fuelPrice',label:'Fuel Price ($/gallon)',type:'number',defaultValue:3.50}],\n    formula: (v) => { const gal=F(v.distance)/F(v.mpg),cost=gal*F(v.fuelPrice); return [{label:'Fuel Needed',value:gal.toFixed(1)+' gallons'},{label:'Trip Cost',value:'$'+cost.toFixed(2)},{label:'Cost per Mile',value:'$'+(F(v.fuelPrice)/F(v.mpg)).toFixed(3)}]; },\n    presets: [{label:'Road Trip 300mi',values:{distance:300,mpg:25,fuelPrice:3.50}}],\n  },"

F['sales-tax-calculator'] = "  'sales-tax-calculator': {\n    inputs: [{key:'price',label:'List Price ($)',type:'number',defaultValue:100},{key:'taxRate',label:'Sales Tax Rate (%)',type:'number',defaultValue:8.875,step:0.01}],\n    formula: (v) => { const tax=F(v.price)*F(v.taxRate)/100; return [{label:'Sales Tax',value:'$'+tax.toFixed(2)},{label:'Total Price',value:'$'+(F(v.price)+tax).toFixed(2)}]; },\n  },"

F['roi-calculator'] = "  'roi-calculator': {\n    inputs: [{key:'invested',label:'Amount Invested ($)',type:'number',defaultValue:10000},{key:'returned',label:'Amount Returned ($)',type:'number',defaultValue:12000}],\n    formula: (v) => { const roi=F(v.invested)>0?(F(v.returned)-F(v.invested))/F(v.invested)*100:0; return [{label:'ROI',value:roi.toFixed(2)+'%'},{label:'Gain/Loss',value:'$'+(F(v.returned)-F(v.invested)).toFixed(2)}]; },\n  },"

F['age-calculator'] = "  'age-calculator': {\n    inputs: [{key:'birthDate',label:'Birth Date (YYYY-MM-DD)',type:'text',defaultValue:'1990-05-15'},{key:'endDate',label:'Calculate To (YYYY-MM-DD or today)',type:'text',defaultValue:'today'}],\n    formula: (v) => { const b=new Date(String(v.birthDate)); if(isNaN(b.getTime()))return[{label:'Error',value:'Enter valid date (YYYY-MM-DD)'}]; const end=String(v.endDate)==='today'?new Date():new Date(String(v.endDate)); if(isNaN(end.getTime()))return[{label:'Error',value:'Invalid end date'}]; let yrs=end.getFullYear()-b.getFullYear(); const mDiff=end.getMonth()-b.getMonth(); if(mDiff<0||(mDiff===0&&end.getDate()<b.getDate()))yrs--; const totalDays=Math.floor((end.getTime()-b.getTime())/86400000); const totalMonths=yrs*12+(mDiff<0?12+mDiff:mDiff); return [{label:'Age',value:yrs+' years'},{label:'Total Months',value:totalMonths.toLocaleString()},{label:'Total Days',value:totalDays.toLocaleString()}]; },\n  },"

F['tdee-calculator'] = "  'tdee-calculator': {\n    inputs: [{key:'weight',label:'Weight (kg)',type:'number',defaultValue:70},{key:'height',label:'Height (cm)',type:'number',defaultValue:175},{key:'age',label:'Age',type:'number',defaultValue:30},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'},{key:'activity',label:'Activity Level',type:'select',options:[{label:'Sedentary (desk job)',value:'1.2'},{label:'Light (1-3d/wk)',value:'1.375'},{label:'Moderate (3-5d/wk)',value:'1.55'},{label:'Active (6-7d/wk)',value:'1.725'}],defaultValue:'1.55'}],\n    formula: (v) => { const w=F(v.weight),h=F(v.height),a=F(v.age),act=F(v.activity); const bmr=v.gender==='male'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161; const tdee=bmr*act; return [{label:'BMR',value:bmr.toFixed(0)+' cal/day'},{label:'TDEE',value:tdee.toFixed(0)+' cal/day'},{label:'Lose Weight (-500)',value:(tdee-500).toFixed(0)+' cal/day'},{label:'Gain Muscle (+500)',value:(tdee+500).toFixed(0)+' cal/day'}]; },\n    presets: [{label:'Moderate Male 30',values:{weight:70,height:175,age:30,gender:'male',activity:'1.55'}}],\n  },"

F['ideal-weight-calculator'] = "  'ideal-weight-calculator': {\n    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],\n    formula: (v) => { const h=F(v.height); const rob=v.gender==='male'?52+1.9*(h-152.4)/2.54:49+1.7*(h-152.4)/2.54; const mill=v.gender==='male'?56.2+1.41*(h-152.4)/2.54:53.1+1.36*(h-152.4)/2.54; const bmiLow=18.5*Math.pow(h/100,2),bmiHigh=24.9*Math.pow(h/100,2); return [{label:'Healthy Range (BMI)',value:bmiLow.toFixed(0)+' - '+bmiHigh.toFixed(0)+' kg'},{label:'Robinson Formula',value:rob.toFixed(1)+' kg'},{label:'Miller Formula',value:mill.toFixed(1)+' kg'}]; },\n  },"

F['dog-age-calculator'] = "  'dog-age-calculator': {\n    inputs: [{key:'age',label:'Dog Age (years)',type:'number',defaultValue:3},{key:'size',label:'Breed Size',type:'select',options:[{label:'Small (<9kg)',value:'small'},{label:'Medium (9-23kg)',value:'medium'},{label:'Large (>23kg)',value:'large'}],defaultValue:'medium'}],\n    formula: (v) => { const a=F(v.age); let h=16*Math.log(a)+31; if(v.size==='large'&&a>5)h*=1.15; if(v.size==='small'&&a>5)h*=0.85; return [{label:'Human Age Equivalent',value:Math.round(h)+' years'},{label:'Life Stage',value:a<1?'Puppy':a<2?'Adolescent':a<7?'Adult':a<10?'Senior':'Geriatric'}]; },\n  },"

# Now apply all fixes
count = 0
for tid in F:
    if tid in blocks:
        si, ei = blocks[tid]
        new_lines = [l + '\n' for l in F[tid].split('\n')]
        lines[si:ei+1] = new_lines
        count += 1
    else:
        print(f"SKIPPED: {tid} (not found in blocks)")

with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.writelines(lines)

print(f"\nFixed {count} formulas with REAL calculations")
