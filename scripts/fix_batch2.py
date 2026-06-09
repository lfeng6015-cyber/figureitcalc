import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

F = {}

# === HEALTH ===
F['ideal-weight-calculator'] = "  'ideal-weight-calculator': {\n    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],\n    formula: (v) => { const h=F(v.height); const rob=v.gender==='male'?52+1.9*(h-152.4)/2.54:49+1.7*(h-152.4)/2.54; const mill=v.gender==='male'?56.2+1.41*(h-152.4)/2.54:53.1+1.36*(h-152.4)/2.54; const low=18.5*(h/100)*(h/100),high=24.9*(h/100)*(h/100); return [{label:'BMI Range',value:low.toFixed(0)+'-'+high.toFixed(0)+' kg'},{label:'Robinson',value:rob.toFixed(1)+' kg'},{label:'Miller',value:mill.toFixed(1)+' kg'}]; },\n  },"

F['macro-calculator'] = "  'macro-calculator': {\n    inputs: [{key:'calories',label:'Daily Calories',type:'number',defaultValue:2000},{key:'protein',label:'Protein (%)',type:'number',defaultValue:30},{key:'fat',label:'Fat (%)',type:'number',defaultValue:25}],\n    formula: (v) => { const cal=F(v.calories),p=F(v.protein),f=F(v.fat),c=100-p-f; return [{label:'Protein',value:Math.round(cal*p/100/4)+'g'},{label:'Carbs',value:Math.round(cal*c/100/4)+'g'},{label:'Fat',value:Math.round(cal*f/100/9)+'g'}]; },\n    presets: [{label:'Balanced',values:{calories:2000,protein:30,fat:25}},{label:'Keto',values:{calories:2000,protein:25,fat:70}}],\n  },"

F['water-intake-calculator'] = "  'water-intake-calculator': {\n    inputs: [{key:'weight',label:'Weight (lbs)',type:'number',defaultValue:150},{key:'activity',label:'Activity',type:'select',options:[{label:'Sedentary',value:'1'},{label:'Moderate',value:'1.2'},{label:'Active',value:'1.4'}],defaultValue:'1'}],\n    formula: (v) => { const b=F(v.weight)*0.67*F(v.activity); return [{label:'Daily Water',value:b.toFixed(0)+' oz'},{label:'Liters',value:(b/33.8).toFixed(1)+' L'},{label:'8oz Glasses',value:Math.round(b/8)+' glasses'}]; },\n  },"

F['body-fat-calculator'] = "  'body-fat-calculator': {\n    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:175},{key:'neck',label:'Neck (cm)',type:'number',defaultValue:38},{key:'waist',label:'Waist (cm)',type:'number',defaultValue:85},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],\n    formula: (v) => { const h=F(v.height),n=F(v.neck),w=F(v.waist); let bf=v.gender==='male'?86.010*Math.log10(Math.max(1,w-n))-70.041*Math.log10(h)+36.76:163.205*Math.log10(Math.max(1,w+n-h))-97.684*Math.log10(h)-78.387; bf=Math.max(3,Math.abs(bf)); const cat=bf<6?'Essential':bf<14?'Athlete':bf<18?'Fitness':bf<25?'Average':bf<32?'Overfat':'Obese'; return [{label:'Body Fat',value:bf.toFixed(1)+'%'},{label:'Category',value:cat}]; },\n  },"

F['heart-rate-zone-calculator'] = "  'heart-rate-zone-calculator': {\n    inputs: [{key:'age',label:'Age',type:'number',defaultValue:30},{key:'restingHR',label:'Resting HR (bpm)',type:'number',defaultValue:65}],\n    formula: (v) => { const mx=208-0.7*F(v.age),hrr=mx-F(v.restingHR); return [{label:'Max HR',value:Math.round(mx)+' bpm'},{label:'Zone 2 FatBurn',value:Math.round(F(v.restingHR)+hrr*0.5)+'-'+Math.round(F(v.restingHR)+hrr*0.6)+' bpm'},{label:'Zone 4 Threshold',value:Math.round(F(v.restingHR)+hrr*0.7)+'-'+Math.round(F(v.restingHR)+hrr*0.8)+' bpm'},{label:'Zone 5 Max',value:Math.round(F(v.restingHR)+hrr*0.8)+'-'+Math.round(mx)+' bpm'}]; },\n  },"

F['dog-age-calculator'] = "  'dog-age-calculator': {\n    inputs: [{key:'age',label:'Dog Age (years)',type:'number',defaultValue:3},{key:'size',label:'Breed Size',type:'select',options:[{label:'Small (<9kg)',value:'small'},{label:'Medium',value:'medium'},{label:'Large (>23kg)',value:'large'}],defaultValue:'medium'}],\n    formula: (v) => { const a=F(v.age); let h=16*Math.log(a)+31; if(v.size==='large')h*=1.15; if(v.size==='small')h*=0.85; return [{label:'Human Age',value:Math.round(h)+' yrs'},{label:'Stage',value:a<1?'Puppy':a<2?'Adolescent':a<7?'Adult':a<10?'Senior':'Geriatric'}]; },\n  },"

F['cat-age-calculator'] = "  'cat-age-calculator': {\n    inputs: [{key:'age',label:'Cat Age (years)',type:'number',defaultValue:3}],\n    formula: (v) => { const a=F(v.age); let h=a<=1?15:a<=2?24:24+(a-2)*4; return [{label:'Human Age',value:Math.round(h)+' yrs'},{label:'Stage',value:a<0.5?'Kitten':a<2?'Junior':a<6?'Prime':a<10?'Mature':a<14?'Senior':'Geriatric'}]; },\n  },"

# === FINANCE ===
F['roi-calculator'] = "  'roi-calculator': {\n    inputs: [{key:'invested',label:'Invested ($)',type:'number',defaultValue:10000},{key:'returned',label:'Returned ($)',type:'number',defaultValue:12000}],\n    formula: (v) => { const roi=F(v.invested)>0?(F(v.returned)-F(v.invested))/F(v.invested)*100:0; return [{label:'ROI',value:roi.toFixed(2)+'%'},{label:'Gain',value:'$'+(F(v.returned)-F(v.invested)).toFixed(2)}]; },\n  },"

F['car-loan-calculator'] = "  'car-loan-calculator': {\n    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'down',label:'Down (%)',type:'number',defaultValue:20},{key:'rate',label:'APR (%)',type:'number',defaultValue:6},{key:'term',label:'Term (months)',type:'number',defaultValue:60}],\n    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term); const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly',value:'$'+M.toFixed(2)},{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)}]; },\n  },"

F['emi-calculator'] = "  'emi-calculator': {\n    inputs: [{key:'loan',label:'Loan ($)',type:'number',defaultValue:20000},{key:'rate',label:'Rate (%)',type:'number',defaultValue:8},{key:'months',label:'Tenure (mo)',type:'number',defaultValue:36}],\n    formula: (v) => { const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.months),emi=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'EMI',value:'$'+emi.toFixed(2)},{label:'Total',value:'$'+(emi*n).toFixed(0)},{label:'Interest',value:'$'+(emi*n-P).toFixed(0)}]; },\n  },"

F['inflation-calculator'] = "  'inflation-calculator': {\n    inputs: [{key:'amount',label:'Amount ($)',type:'number',defaultValue:10000},{key:'rate',label:'Inflation (%)',type:'number',defaultValue:3},{key:'years',label:'Years',type:'number',defaultValue:10}],\n    formula: (v) => { const f=F(v.amount)*Math.pow(1+F(v.rate)/100,F(v.years)),t=F(v.amount)/Math.pow(1+F(v.rate)/100,F(v.years)); return [{label:'Future Cost',value:'$'+f.toFixed(2)},{label:'Today Worth',value:'$'+t.toFixed(2)}]; },\n  },"

F['profit-margin-calculator'] = "  'profit-margin-calculator': {\n    inputs: [{key:'price',label:'Selling Price ($)',type:'number',defaultValue:100},{key:'cost',label:'COGS ($)',type:'number',defaultValue:60}],\n    formula: (v) => { const p=F(v.price)-F(v.cost),m=F(v.price)>0?p/F(v.price)*100:0,mu=F(v.cost)>0?p/F(v.cost)*100:0; return [{label:'Profit',value:'$'+p.toFixed(2)},{label:'Margin',value:m.toFixed(1)+'%'},{label:'Markup',value:mu.toFixed(1)+'%'}]; },\n  },"

F['net-worth-calculator'] = "  'net-worth-calculator': {\n    inputs: [{key:'cash',label:'Cash ($)',type:'number',defaultValue:10000},{key:'invest',label:'Investments ($)',type:'number',defaultValue:50000},{key:'property',label:'Property ($)',type:'number',defaultValue:300000},{key:'debt',label:'Debt ($)',type:'number',defaultValue:200000}],\n    formula: (v) => { const a=F(v.cash)+F(v.invest)+F(v.property),d=F(v.debt); return [{label:'Assets',value:'$'+a.toLocaleString()},{label:'Debt',value:'$'+d.toLocaleString()},{label:'Net Worth',value:'$'+(a-d).toLocaleString()}]; },\n  },"

F['home-equity-calculator'] = "  'home-equity-calculator': {\n    inputs: [{key:'value',label:'Home Value ($)',type:'number',defaultValue:350000},{key:'mortgage',label:'Mortgage ($)',type:'number',defaultValue:200000}],\n    formula: (v) => { const e=F(v.value)-F(v.mortgage),p=F(v.value)>0?e/F(v.value)*100:0; return [{label:'Equity',value:'$'+e.toLocaleString()},{label:'Equity %',value:p.toFixed(1)+'%'},{label:'LTV',value:(100-p).toFixed(1)+'%'}]; },\n  },"

F['stock-return-calculator'] = "  'stock-return-calculator': {\n    inputs: [{key:'buy',label:'Buy Price ($)',type:'number',defaultValue:100},{key:'sell',label:'Sell Price ($)',type:'number',defaultValue:130},{key:'shares',label:'Shares',type:'number',defaultValue:10}],\n    formula: (v) => { const p=(F(v.sell)-F(v.buy))*F(v.shares),pct=F(v.buy)>0?(F(v.sell)-F(v.buy))/F(v.buy)*100:0; return [{label:'P&L',value:'$'+p.toFixed(2)},{label:'Return',value:pct.toFixed(2)+'%'}]; },\n  },"

# === COOKING ===
F['cooking-time-calculator'] = "  'cooking-time-calculator': {\n    inputs: [{key:'weight',label:'Weight (lbs)',type:'number',defaultValue:12},{key:'type',label:'Meat',type:'select',options:[{label:'Turkey',value:'turkey'},{label:'Chicken',value:'chicken'},{label:'Beef',value:'beef'},{label:'Pork',value:'pork'}],defaultValue:'turkey'}],\n    formula: (v) => { const r={turkey:15,chicken:20,beef:18,pork:25}; const m=F(v.weight)*r[String(v.type)]; return [{label:'Cook Time',value:Math.round(m)+' min ('+(m/60).toFixed(1)+' hrs)'},{label:'Rest Time',value:Math.round(m*0.15)+' min'},{label:'Internal',value:'165 F (poultry)/145 F (beef/pork)'}]; },\n  },"

F['bakers-percentage-calculator'] = "  'bakers-percentage-calculator': {\n    inputs: [{key:'flour',label:'Flour (g)',type:'number',defaultValue:500},{key:'water',label:'Water (g)',type:'number',defaultValue:350},{key:'salt',label:'Salt (g)',type:'number',defaultValue:10},{key:'yeast',label:'Yeast (g)',type:'number',defaultValue:5}],\n    formula: (v) => { const f=F(v.flour); return [{label:'Hydration',value:(F(v.water)/f*100).toFixed(0)+'%'},{label:'Salt',value:(F(v.salt)/f*100).toFixed(1)+'%'},{label:'Yeast',value:(F(v.yeast)/f*100).toFixed(1)+'%'}]; },\n  },"

F['coffee-ratio-calculator'] = "  'coffee-ratio-calculator': {\n    inputs: [{key:'coffee',label:'Coffee (g)',type:'number',defaultValue:20},{key:'ratio',label:'Water Ratio (1:X)',type:'number',defaultValue:16}],\n    formula: (v) => { const w=F(v.coffee)*F(v.ratio),cups=w/240; return [{label:'Water',value:w.toFixed(0)+' ml'},{label:'Cups',value:cups.toFixed(1)+' cups'},{label:'Strong(1:14)',value:(F(v.coffee)*14)+' ml'},{label:'Light(1:18)',value:(F(v.coffee)*18)+' ml'}]; },\n    presets: [{label:'Pour-Over',values:{coffee:20,ratio:16}}],\n  },"

# === FORTUNE ===
F['sheng-xiao-compatibility'] = "  'sheng-xiao-compatibility': {\n    inputs: [{key:'z1',label:'Your Sign',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'dragon'},{key:'z2',label:'Partner',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'monkey'}],\n    formula: (v) => { const h={rat:['dragon','monkey'],ox:['snake','rooster'],tiger:['horse','dog'],rabbit:['goat','pig'],dragon:['rat','monkey'],snake:['ox','rooster'],horse:['tiger','dog'],goat:['rabbit','pig'],monkey:['rat','dragon'],rooster:['ox','snake'],dog:['tiger','horse'],pig:['rabbit','goat']}; const c={rat:'horse',ox:'goat',tiger:'monkey',rabbit:'rooster',dragon:'dog',snake:'pig',horse:'rat',goat:'ox',monkey:'tiger',rooster:'rabbit',dog:'dragon',pig:'snake'}; let s=50; if(h[v.z1]&&h[v.z1].includes(v.z2))s+=35; if(c[v.z1]===v.z2)s-=30; if(v.z1===v.z2)s+=15; return [{label:'Match',value:s+'%'},{label:'Rating',value:s>=90?'Heaven-Matched':s>=70?'Great':s>=50?'OK':s>=30?'Challenging':'Clash'}]; },\n  },"

F['soulmate-finder'] = "  'soulmate-finder': {\n    inputs: [{key:'b1',label:'Your Birthday',type:'text',defaultValue:'1990-05-15'},{key:'b2',label:'Partner Birthday',type:'text',defaultValue:'1992-08-22'}],\n    formula: (v) => { const rd=(n)=>{while(n>9&&n!==11&&n!==22&&n!==33)n=String(n).split('').reduce((a,b)=>a+Number(b),0);return n;}; const d1=String(v.b1).replace(/-/g,''),d2=String(v.b2).replace(/-/g,''); if(d1.length<8||d2.length<8)return[{label:'Score',value:'Enter both dates'}]; const lp1=rd(d1.split('').reduce((a,b)=>a+Number(b),0)),lp2=rd(d2.split('').reduce((a,b)=>a+Number(b),0)); const grps=[[1,5,7],[2,4,8],[3,6,9]]; const sg=grps.some(g=>g.includes(lp1)&&g.includes(lp2)); const lps=lp1===lp2?95:sg?82:50; const m1=Number(d1.slice(4,6)),m2=Number(d2.slice(4,6)),sd=Math.abs(m1-m2),ss=sd<=1?90:sd<=2?78:45; const f=Math.min(99,Math.round(lps*0.5+ss*0.5)); return [{label:'Soulmate',value:f+'%'},{label:'Type',value:f>=90?'Twin Flames':f>=75?'Deep Bond':f>=55?'Karmic':f>=35?'Growth':'Passing'},{label:'Your LP',value:String(lp1)},{label:'Partner LP',value:String(lp2)}]; },\n  },"

F['numerology-calculator'] = "  'numerology-calculator': {\n    inputs: [{key:'birthDate',label:'Birth Date',type:'text',defaultValue:'1990-05-15'}],\n    formula: (v) => { const rd=(n)=>{while(n>9&&n!==11&&n!==22&&n!==33)n=String(n).split('').reduce((a,b)=>a+Number(b),0);return n;}; const s=String(v.birthDate).replace(/-/g,''); if(s.length<8)return[{label:'LP',value:'Enter date'}]; const lp=rd(s.split('').reduce((a,b)=>a+Number(b),0)); const names={1:'Leader',2:'Diplomat',3:'Creator',4:'Builder',5:'Adventurer',6:'Nurturer',7:'Thinker',8:'Achiever',9:'Humanitarian',11:'Master Intuitive',22:'Master Builder',33:'Master Teacher'}; return [{label:'Life Path',value:String(lp)+(lp>9?' (Master!)':'')},{label:'Archetype',value:names[lp]||'Unknown'}]; },\n  },"

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
