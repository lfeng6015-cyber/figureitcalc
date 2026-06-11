const fs = require('fs');
let content = fs.readFileSync('src/app/data/formulas.ts', 'utf8');

// Find all existing formula keys and their ending positions
const formulaEnds = {};
const lines = content.split('\n');
let currentKey = null;
let braceDepth = 0;
let startLine = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const keyMatch = line.match(/^\s*'([a-z0-9-]+)':\s*\{/);
    if (keyMatch && braceDepth === 0) {
        currentKey = keyMatch[1];
        startLine = i;
    }
    braceDepth += (line.match(/\{/g) || []).length;
    braceDepth -= (line.match(/\}/g) || []).length;
    if (braceDepth === 0 && currentKey && i > startLine) {
        formulaEnds[currentKey] = i;
        currentKey = null;
    }
}

const sortedKeys = Object.keys(formulaEnds).sort();

const newFormulas = [
    {
        key: 'carbon-footprint-calculator',
        after: 'bsa-calculator',
        text: `    'carbon-footprint-calculator': {
    inputs: [{key:'miles',label:'Annual Miles',type:'number',defaultValue:12000},{key:'flights',label:'Flights/Yr',type:'number',defaultValue:2},{key:'kwh',label:'Monthly kWh',type:'number',defaultValue:500},{key:'meat',label:'Meat meals/wk',type:'number',defaultValue:5},{key:'source',label:'Data Source',type:'select',options:[{label:'EPA (US avg 16 tons)',value:'epa'},{label:'IPCC (global avg 4.8t)',value:'ipcc'}],defaultValue:'epa'}],
    formula: (v) => { var co2=F(v.miles)*0.0004+F(v.flights)*0.25+F(v.kwh)*12*0.00092+F(v.meat)*52*0.007; var avgRef={epa:16,ipcc:4.8}[String(v.source)]||16; var pct=avgRef>0?co2/avgRef*100:0; var tips=[]; if(F(v.miles)>10000)tips.push('Drive less: -1 ton/yr per 2,500 fewer miles'); if(F(v.flights)>1)tips.push('One fewer flight: -0.25 tons/yr'); if(F(v.meat)>3)tips.push('Eat less beef: -0.5 ton/yr per 3 fewer meat meals/wk'); return [{label:'Annual CO2',value:co2.toFixed(1)+' tons',emphasis:true,insight:'Source: '+String(v.source).toUpperCase()+'. US avg: 16t/person. Global: 4.8t. Paris target: 2t by 2050.'},{label:'vs Average',value:pct.toFixed(0)+'% of '+String(v.source)+' avg',insight:pct>100?'Above average - focus on transport + diet.':pct<50?'Well below average! Great job.':'Near average. Room for improvement.'},{label:'Top Reduction Tips',value:tips.join('; ')||'Your footprint is already low!'}]; },
  },`
    },
    {
        key: 'depth-of-field-calculator',
        after: 'date-time-converter',
        text: `    'depth-of-field-calculator': {
    inputs: [{key:'camera',label:'Camera',type:'select',options:[{label:'Full Frame (35mm)',value:'ff'},{label:'APS-C (1.5x crop)',value:'apsc'},{label:'Micro 4/3 (2x crop)',value:'m43'}],defaultValue:'ff'},{key:'f',label:'Focal Length (mm)',type:'number',defaultValue:50},{key:'a',label:'Aperture (f-stop)',type:'number',defaultValue:5.6,step:0.1},{key:'d',label:'Focus Distance (ft)',type:'number',defaultValue:10}],
    formula: (v) => { var coc={ff:0.03,apsc:0.02,m43:0.015}[String(v.camera)]||0.03; var f=F(v.f),a=F(v.a),d=F(v.d)*304.8,H=f*f/(a*coc); var near=(H*d)/(H+(d-f)),far=(H*d)/(H-(d-f)); var dof=far<0?Infinity:(far-near)/304.8; return [{label:'Hyperfocal',value:(H/304.8).toFixed(1)+' ft',insight:'Focus here for max DOF. Half this distance to infinity will be sharp.'},{label:'Near Limit',value:(near/304.8).toFixed(1)+' ft'},{label:'Far Limit',value:far<0?'Infinity':(far/304.8).toFixed(1)+' ft'},{label:'Total DOF',value:dof===Infinity?'Infinite':dof.toFixed(2)+' ft',insight:'On '+String(v.camera).toUpperCase()+' sensor. Wider aperture = shallower DOF.'}]; },
  },`
    },
    {
        key: 'golden-ratio-calculator',
        after: 'fps-bottleneck-calculator',
        text: `    'golden-ratio-calculator': {
    inputs: [{key:'val',label:'Input Value',type:'number',defaultValue:100},{key:'mode',label:'Calculate',type:'select',options:[{label:'Long Side (x phi)',value:'long'},{label:'Short Side (/ phi)',value:'short'},{label:'Both',value:'both'}],defaultValue:'both'}],
    formula: (v) => { var val=F(v.val),phi=1.618033988749895,long=val*phi,short=val/phi; var results=[{label:'Golden Ratio (phi)',value:'1.6180339887...',insight:'phi = (1+sqrt(5))/2. Found in nature, art, architecture. The ratio where (a+b)/a = a/b.'}]; if(v.mode==='long'||v.mode==='both')results.push({label:'Long Side',value:long.toFixed(2)}); if(v.mode==='short'||v.mode==='both')results.push({label:'Short Side',value:short.toFixed(2)}); return results; },
  },`
    },
    {
        key: 'hvac-btu-calculator',
        after: 'home-equity-calculator',
        text: `    'hvac-btu-calculator': {
    inputs: [{key:'sqft',label:'Area (sqft)',type:'number',defaultValue:1500},{key:'zone',label:'Climate Zone',type:'select',options:[{label:'Zone 1 Hot (Miami)',value:'1'},{label:'Zone 2-3 Warm (Atlanta)',value:'2'},{label:'Zone 4 Mixed (NYC)',value:'4'},{label:'Zone 5-6 Cold (Chicago)',value:'5'},{label:'Zone 7-8 V.Cold (Alaska)',value:'7'}],defaultValue:'4'},{key:'insul',label:'Insulation',type:'select',options:[{label:'Good (R-30+)',value:'good'},{label:'Average (R-13-19)',value:'avg'},{label:'Poor (little/none)',value:'poor'}],defaultValue:'avg'}],
    formula: (v) => { var sqft=F(v.sqft),zone=parseInt(String(v.zone)); var btuPerSqft={1:25,2:30,4:40,5:50,7:60}[zone]||40; var insulMul={good:0.85,avg:1,poor:1.3}[String(v.insul)]||1; var btu=sqft*btuPerSqft*insulMul; var tons=btu/12000; return [{label:'Required BTU/hr',value:btu.toFixed(0)+' BTU',emphasis:true},{label:'AC Size',value:tons.toFixed(1)+' tons',insight:'1 ton = 12,000 BTU/hr. Residential: 1.5-5 tons. Oversized = short cycles + humidity issues.'},{label:'Climate Factor',value:btuPerSqft.toFixed(0)+' BTU/sqft for Zone '+v.zone,insight:'Zone 1 (hot): 25 BTU/sqft. Zone 7 (very cold): 60 BTU/sqft. Cooling load is typically 20-25% less than heating.'}]; },
  },`
    },
    {
        key: 'ideal-weight-calculator',
        after: 'http-status-codes',
        text: `    'ideal-weight-calculator': {
    inputs: [{key:'ht',label:'Height (cm)',type:'number',defaultValue:175},{key:'gen',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],
    formula: (v) => { var h=F(v.ht),isM=v.gen==='male'; var hIn=h/2.54-60; var devine=isM?50+2.3*hIn:45.5+2.3*hIn; var hamwi=isM?48+2.7*hIn:45.5+2.2*hIn; var robinson=isM?52+1.9*hIn:49+1.7*hIn; var miller=isM?56.2+1.41*hIn:53.1+1.36*hIn; var avg=(devine+hamwi+robinson+miller)/4; var lo=avg*0.9,hi=avg*1.1; return [{label:'Ideal Weight (avg 4 formulas)',value:avg.toFixed(1)+' kg ('+(avg*2.2046).toFixed(0)+' lbs)',emphasis:true,insight:'Healthy range: '+lo.toFixed(0)+'-'+hi.toFixed(0)+' kg. This is a statistical estimate. Individual healthy weight varies by muscle mass, bone structure, and body composition.'},{label:'Devine',value:devine.toFixed(1)+' kg'},{label:'Hamwi',value:hamwi.toFixed(1)+' kg'},{label:'Robinson',value:robinson.toFixed(1)+' kg'},{label:'Miller',value:miller.toFixed(1)+' kg'}]; },
  },`
    },
    {
        key: 'loan-comparison-calculator',
        after: 'list-converter',
        text: `    'loan-comparison-calculator': {
    inputs: [{key:'p1',label:'Loan A Principal ($)',type:'number',defaultValue:300000},{key:'r1',label:'Loan A Rate (%)',type:'number',defaultValue:6.5},{key:'n1',label:'Loan A Term (yr)',type:'number',defaultValue:30},{key:'p2',label:'Loan B Principal ($)',type:'number',defaultValue:300000},{key:'r2',label:'Loan B Rate (%)',type:'number',defaultValue:5.5},{key:'n2',label:'Loan B Term (yr)',type:'number',defaultValue:15}],
    formula: (v) => { var p1=F(v.p1),r1=F(v.r1)/100/12,n1=F(v.n1)*12; var p2=F(v.p2),r2=F(v.r2)/100/12,n2=F(v.n2)*12; var m1=r1>0?p1*r1*Math.pow(1+r1,n1)/(Math.pow(1+r1,n1)-1):p1/n1; var m2=r2>0?p2*r2*Math.pow(1+r2,n2)/(Math.pow(1+r2,n2)-1):p2/n2; var t1=m1*n1,t2=m2*n2,i1=t1-p1,i2=t2-p2; var best=t1<t2?'Loan A saves $'+(t2-t1).toLocaleString()+' (lower total cost)':t2<t1?'Loan B saves $'+(t1-t2).toLocaleString()+' (lower total cost)':'Same total cost'; return [{label:'Loan A ('+F(v.n1).toFixed(0)+'yr @ '+F(v.r1).toFixed(1)+'%)',value:'$'+m1.toFixed(0)+'/mo | Total: $'+t1.toLocaleString()+' | Interest: $'+i1.toLocaleString()},{label:'Loan B ('+F(v.n2).toFixed(0)+'yr @ '+F(v.r2).toFixed(1)+'%)',value:'$'+m2.toFixed(0)+'/mo | Total: $'+t2.toLocaleString()+' | Interest: $'+i2.toLocaleString()},{label:'Best Option',value:best,emphasis:true,insight:'Monthly diff: $'+Math.abs(m1-m2).toFixed(0)+'. Total savings: $'+Math.abs(t1-t2).toLocaleString()+'. Lower rate + shorter term = least total cost.'}]; },
  },`
    },
    {
        key: 'ohms-law-calculator',
        after: 'numeronym-generator',
        text: `    'ohms-law-calculator': {
    inputs: [{key:'mode',label:'Solve For',type:'select',options:[{label:'Current (I = V/R)',value:'I'},{label:'Voltage (V = I*R)',value:'V'},{label:'Resistance (R = V/I)',value:'R'},{label:'Power (P = V*I)',value:'P'}],defaultValue:'I'},{key:'v',label:'Voltage (V)',type:'number',defaultValue:12},{key:'r',label:'Resistance (ohm)',type:'number',defaultValue:100},{key:'i',label:'Current (A)',type:'number',defaultValue:0.5}],
    formula: (v) => { var V=F(v.v),R=F(v.r),I=F(v.i),results=[]; if(v.mode==='I'&&R>0){var i=V/R;results.push({label:'Current',value:i.toFixed(3)+' A ('+(i*1000).toFixed(0)+' mA)'},{label:'Power',value:(V*i).toFixed(1)+' W'});} else if(v.mode==='V'){var volt=I*R;results.push({label:'Voltage',value:volt.toFixed(2)+' V'},{label:'Power',value:(volt*I).toFixed(1)+' W'});} else if(v.mode==='R'&&I>0){results.push({label:'Resistance',value:(V/I).toFixed(2)+' ohm'},{label:'Power',value:(V*I).toFixed(1)+' W'});} else if(v.mode==='P'){results.push({label:'Power',value:(V*I).toFixed(1)+' W ('+(V*I/1000).toFixed(3)+' kW)'},{label:'Current',value:I.toFixed(3)+' A'},{label:'Resistance',value:I>0?(V/I).toFixed(2)+' ohm':'infinite'});} results.push({label:'Ohms Law',value:'V = I * R  |  P = V * I',insight:'All units auto-convert. For AC circuits, use RMS values. Power triangle: P(W) = V * I * cos(phi).'}); return results; },
  },`
    },
    {
        key: 'percentage-calculator',
        after: 'pdf-signature-checker',
        text: `    'percentage-calculator': {
    inputs: [{key:'mode',label:'What do you need?',type:'select',options:[{label:'X is what % of Y?',value:'pct'},{label:'What is X% of Y?',value:'part'},{label:'X is Y% of what?',value:'total'},{label:'% Increase/Decrease',value:'change'},{label:'Business: Margin & Markup',value:'biz'}],defaultValue:'pct'},{key:'value1',label:'Value 1',type:'number',defaultValue:42},{key:'value2',label:'Value 2',type:'number',defaultValue:60}],
    formula: (v) => { var v1=F(v.value1),v2=F(v.value2); if(v.mode==='pct'){return [{label:'Result',value:v1+' is '+(v2>0?v1/v2*100:0).toFixed(2)+'% of '+v2}]} if(v.mode==='part'){return [{label:'Result',value:v2.toFixed(1)+'% of '+v1+' = '+(v1*v2/100).toFixed(2)}]} if(v.mode==='total'){return [{label:'Result',value:v1+' is '+v2.toFixed(1)+'% of '+(v2>0?v1/v2*100:0).toFixed(2)}]} if(v.mode==='change'){var chg=(v2-v1)/Math.abs(v1||1)*100;return [{label:'Change',value:(chg>=0?'+':'')+chg.toFixed(2)+'%',insight:'From '+v1+' to '+v2+'. '+(chg>=0?'Increased':'Decreased')+' by '+Math.abs(v2-v1).toFixed(2)+'.'}]} var margin=v1>0?(v1-v2)/v1*100:0,markup=v2>0?(v1-v2)/v2*100:0; return [{label:'Gross Margin (sell $'+v1+', cost $'+v2+')',value:margin.toFixed(1)+'%',insight:'Margin = Profit/Price. $'+(v1-v2).toFixed(2)+' profit per item.'},{label:'Markup',value:markup.toFixed(1)+'%',insight:'Markup = Profit/Cost. '+margin.toFixed(0)+'% margin needs '+markup.toFixed(0)+'% markup.'}]; },
  },`
    },
    {
        key: 'pet-calorie-calculator',
        after: 'party-drink-calculator',
        text: `    'pet-calorie-calculator': {
    inputs: [{key:'wt',label:'Weight (kg)',type:'number',defaultValue:10},{key:'species',label:'Species',type:'select',options:[{label:'Dog',value:'dog'},{label:'Cat',value:'cat'}],defaultValue:'dog'},{key:'age',label:'Life Stage',type:'select',options:[{label:'Adult (1-7yr)',value:'adult'},{label:'Puppy/Kitten (<1yr)',value:'young'},{label:'Senior (7+yr)',value:'senior'}],defaultValue:'adult'},{key:'fixed',label:'Spayed/Neutered?',type:'select',options:[{label:'Yes',value:'yes'},{label:'No (intact)',value:'no'}],defaultValue:'yes'},{key:'activity',label:'Activity',type:'select',options:[{label:'Low (couch potato)',value:'low'},{label:'Moderate (daily walk)',value:'mod'},{label:'High (working/sport)',value:'high'}],defaultValue:'mod'}],
    formula: (v) => { var wt=F(v.wt),rer=70*Math.pow(Math.max(1,wt),0.75); var factors={dog:{adult:{yes:{low:1.4,mod:1.6,high:2.0},no:{low:1.6,mod:1.8,high:2.5}},young:{yes:{low:2.0,mod:2.5,high:3.0},no:{low:2.5,mod:3.0,high:3.5}},senior:{yes:{low:1.2,mod:1.4,high:1.6},no:{low:1.4,mod:1.6,high:1.8}}},cat:{adult:{yes:{low:1.0,mod:1.2,high:1.4},no:{low:1.2,mod:1.4,high:1.6}},young:{yes:{low:2.0,mod:2.5,high:3.0},no:{low:2.5,mod:3.0,high:3.5}},senior:{yes:{low:0.8,mod:1.0,high:1.2},no:{low:1.0,mod:1.2,high:1.4}}}}; var factor=factors[v.species]?.[v.age]?.[v.fixed]?.[v.activity]||1.6; var cal=rer*factor; return [{label:'RER (Resting Energy)',value:rer.toFixed(0)+' kcal/day',insight:'RER = 70 x weight^0.75. Basal metabolic needs at rest.'},{label:'Daily Calories',value:cal.toFixed(0)+' kcal/day',emphasis:true,insight:'Factor: '+factor.toFixed(1)+'x RER. Adjust based on body condition score (BCS 1-9). Reduce 10-20% if overweight.'},{label:'Food Amount',value:(cal/350).toFixed(1)+' cups/day (@350 kcal/cup)',insight:'Check pet food label for exact kcal/cup. Wet food: ~100 kcal/3oz can. Treats <10% of calories.'}]; },
  },`
    },
    {
        key: 'pet-breed-mix-calculator',
        after: 'pet-calorie-calculator',
        text: `    'pet-breed-mix-calculator': {
    inputs: [{key:'size',label:'Size',type:'select',options:[{label:'Small (<10kg)',value:'small'},{label:'Medium (10-25kg)',value:'medium'},{label:'Large (25-45kg)',value:'large'}],defaultValue:'medium'},{key:'coat',label:'Coat',type:'select',options:[{label:'Short',value:'short'},{label:'Long',value:'long'},{label:'Curly/Wiry',value:'curly'}],defaultValue:'short'}],
    formula: (v) => { var traits={small:{short:'Terrier/Chihuahua mix: energetic, long-lived (15+yr). Watch for dental issues.',long:'Shih Tzu/Pom mix: friendly, needs grooming. Good apartment dogs.',curly:'Mini Poodle/Maltese: hypoallergenic, smart. Needs regular grooming.'},medium:{short:'Lab/Pit mix: loyal, high energy. 50-70lbs. Needs daily exercise.',long:'Border Collie/Aussie mix: very smart, needs mental stimulation.',curly:'Goldendoodle: friendly, low-shed. 40-60lbs. Popular family dogs.'},large:{short:'Shepherd/Rottie mix: protective, needs training. 70-100lbs.',long:'Great Pyrenees mix: gentle giants, independent. Night barkers.',curly:'Standard Poodle mix: athletic, hypoallergenic. 1hr+ exercise daily.'}}; var result=traits[v.size]?.[v.coat]||'Mixed breed = unique! Adopt, dont shop. Every dog is one of a kind.'; return [{label:'Typical Traits',value:result},{label:'DISCLAIMER',value:'FOR ENTERTAINMENT ONLY. Real genetics are complex - phenotype does not equal breed mix. Results may vary significantly. For accurate breed ID, use Embark or Wisdom Panel DNA tests. This tool simulates basic Mendelian trait combinations for fun.'}]; },
  },`
    },
    {
        key: 'photo-print-size-calculator',
        after: 'phone-parser-and-formatter',
        text: `    'photo-print-size-calculator': {
    inputs: [{key:'w',label:'Width (px)',type:'number',defaultValue:4000},{key:'h',label:'Height (px)',type:'number',defaultValue:3000},{key:'dpi',label:'DPI',type:'select',options:[{label:'300 DPI (photo lab)',value:'300'},{label:'200 DPI (good poster)',value:'200'},{label:'150 DPI (large format)',value:'150'}],defaultValue:'300'}],
    formula: (v) => { var w=F(v.w),h=F(v.h),dpi=parseInt(String(v.dpi)); var wIn=w/dpi,hIn=h/dpi; var mp=w*h/1e6; return [{label:'Print Size @ '+v.dpi+' DPI',value:wIn.toFixed(1)+'x'+hIn.toFixed(1)+' inches ('+(wIn*2.54).toFixed(0)+'x'+(hIn*2.54).toFixed(0)+' cm)',emphasis:true},{label:'Megapixels',value:mp.toFixed(1)+' MP',insight:mp>=12?'Great for 300 DPI up to 13x19!':mp>=6?'Good for 8x10 at 300 DPI':'Low - best for web/small prints'},{label:'DPI Guide',value:'300=photo lab (8x10 needs 7.2MP). 200=poster. 150=banner. Minimum: print size x DPI = pixels needed.'}]; },
  },`
    },
    {
        key: 'water-footprint-calculator',
        after: 'wedding-budget-calculator',
        text: `    'water-footprint-calculator': {
    inputs: [{key:'shower',label:'Showers/Wk',type:'number',defaultValue:7},{key:'meat',label:'Meat meals/Wk',type:'number',defaultValue:5},{key:'laundry',label:'Laundry/Wk',type:'number',defaultValue:3},{key:'coffee',label:'Coffee cups/day',type:'number',defaultValue:2}],
    formula: (v) => { var d=F(v.shower)*65+F(v.laundry)*40+F(v.coffee)*130+F(v.meat)*1800; var avg=3400; return [{label:'Daily Water Footprint',value:d.toFixed(0)+' L',insight:'Global avg: 3,400 L/day (incl virtual water in food/products). 1kg beef = 15,000L. 1 shirt = 2,700L. 1 cup coffee = 130L.'},{label:'Monthly',value:(d*30).toFixed(0)+' L'},{label:'Yearly',value:(d*365).toLocaleString()+' L'},{label:'Biggest Impact',value:F(v.meat)>4?'Meat: ~'+(F(v.meat)*1800).toFixed(0)+' L/day. Halving saves '+(F(v.meat)*900).toFixed(0)+' L/day.':F(v.shower)>5?'Showers: '+(F(v.shower)*65).toFixed(0)+' L/day. Shorter showers help.':'Moderate footprint.'},{label:'Data Source',value:'Water Footprint Network (WFN), UNESCO-IHE. Global averages - virtual water varies by country of origin.'}]; },
  },`
    },
];

// Sort by insertion point and insert
let result = content;
let offset = 0;

// Sort by insertion order (after key position)
newFormulas.sort((a, b) => (formulaEnds[b.after] || 0) - (formulaEnds[a.after] || 0));

for (const nf of newFormulas) {
    const endLine = formulaEnds[nf.after];
    if (!endLine) { console.log('SKIP: ' + nf.key + ' (after ' + nf.after + ' not found)'); continue; }
    const insertPos = content.split('\n').slice(0, endLine + 1).join('\n').length;
    result = result.slice(0, insertPos) + '\n' + nf.text + result.slice(insertPos);
    console.log('ADDED: ' + nf.key + ' after ' + nf.after);
}

fs.writeFileSync('src/app/data/formulas.ts', result, 'utf8');
console.log('Done. Added ' + newFormulas.length + ' formulas.');
