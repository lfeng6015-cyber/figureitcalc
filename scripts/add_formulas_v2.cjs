const fs = require('fs');
let lines = fs.readFileSync('src/app/data/formulas.ts', 'utf8').split('\n');

// Closing line numbers (0-indexed) for each insertion point key
const closeLines = {
    'date-time-converter': 201,
    'fps-bottleneck-calculator': 292,
    'home-equity-calculator': 342,
    'http-status-codes': 354,
    'list-converter': 467,
    'numeronym-generator': 529,
    'party-drink-calculator': 549,
    'phone-parser-and-formatter': 574,
};

// Each formula as array of lines to insert
const additions = [
  { after: 'date-time-converter', lines: [
    "    'depth-of-field-calculator': {",
    "    inputs: [{key:'camera',label:'Camera',type:'select',options:[{label:'Full Frame (35mm)',value:'ff'},{label:'APS-C (1.5x crop)',value:'apsc'},{label:'Micro 4/3 (2x crop)',value:'m43'}],defaultValue:'ff'},{key:'f',label:'Focal Length (mm)',type:'number',defaultValue:50},{key:'a',label:'Aperture (f-stop)',type:'number',defaultValue:5.6,step:0.1},{key:'d',label:'Focus Distance (ft)',type:'number',defaultValue:10}],",
    "    formula: (v) => { var coc={ff:0.03,apsc:0.02,m43:0.015}[String(v.camera)]||0.03; var f=F(v.f),a=F(v.a),d=F(v.d)*304.8,H=f*f/(a*coc); var near=(H*d)/(H+(d-f)),far=(H*d)/(H-(d-f)); var dof=far<0?Infinity:(far-near)/304.8; return [{label:'Hyperfocal Distance',value:(H/304.8).toFixed(1)+' ft',insight:'Focus here for maximum depth of field. Everything from half this distance to infinity will be acceptably sharp.'},{label:'Near Limit',value:(near/304.8).toFixed(1)+' ft'},{label:'Far Limit',value:far<0?'Infinity':(far/304.8).toFixed(1)+' ft'},{label:'Total DOF',value:dof===Infinity?'Infinite':dof.toFixed(2)+' ft',insight:'On '+String(v.camera).toUpperCase()+' sensor. Wider aperture = shallower DOF. Closer focus = shallower DOF.'}]; },",
    "  },",
  ]},
  { after: 'fps-bottleneck-calculator', lines: [
    "    'golden-ratio-calculator': {",
    "    inputs: [{key:'val',label:'Input Value',type:'number',defaultValue:100},{key:'mode',label:'Calculate',type:'select',options:[{label:'Long Side (x phi)',value:'long'},{label:'Short Side (/ phi)',value:'short'},{label:'Both Sides',value:'both'}],defaultValue:'both'}],",
    "    formula: (v) => { var val=F(v.val),phi=1.618033988749895,long=val*phi,short=val/phi; var results=[{label:'Golden Ratio (phi)',value:'1.6180339887...',insight:'phi = (1+sqrt(5))/2 = 1.618... Found in nature (sunflowers, nautilus shells), art (Mona Lisa, Vitruvian Man), and architecture (Parthenon, Notre Dame). The unique ratio where (a+b)/a = a/b.'}]; if(v.mode==='long'||v.mode==='both')results.push({label:'Long Side (x phi)',value:long.toFixed(2)}); if(v.mode==='short'||v.mode==='both')results.push({label:'Short Side (/ phi)',value:short.toFixed(2)}); return results; },",
    "  },",
  ]},
  { after: 'home-equity-calculator', lines: [
    "    'hvac-btu-calculator': {",
    "    inputs: [{key:'sqft',label:'Area (sqft)',type:'number',defaultValue:1500},{key:'zone',label:'Climate Zone',type:'select',options:[{label:'Zone 1 Hot (Miami)',value:'1'},{label:'Zone 2-3 Warm (Atlanta)',value:'2'},{label:'Zone 4 Mixed (NYC)',value:'4'},{label:'Zone 5-6 Cold (Chicago)',value:'5'},{label:'Zone 7-8 V.Cold (Alaska)',value:'7'}],defaultValue:'4'},{key:'insul',label:'Insulation',type:'select',options:[{label:'Good (R-30+)',value:'good'},{label:'Average (R-13-19)',value:'avg'},{label:'Poor (little/none)',value:'poor'}],defaultValue:'avg'}],",
    "    formula: (v) => { var sqft=F(v.sqft),zone=parseInt(String(v.zone)); var btuPerSqft={1:25,2:30,4:40,5:50,7:60}[zone]||40; var insulMul={good:0.85,avg:1,poor:1.3}[String(v.insul)]||1; var btu=sqft*btuPerSqft*insulMul; var tons=btu/12000; return [{label:'Required BTU/hr',value:btu.toFixed(0)+' BTU',emphasis:true},{label:'AC Size (tons)',value:tons.toFixed(1)+' tons',insight:'1 ton = 12,000 BTU/hr. Residential: 1.5-5 tons. Undersized = insufficient cooling. Oversized = short cycles + poor dehumidification.'},{label:'Climate Factor',value:btuPerSqft.toFixed(0)+' BTU/sqft (Zone '+v.zone+')',insight:'Zone 1 (hot): 25 BTU/sqft. Zone 7 (very cold): 60 BTU/sqft. Cooling load is typically 20-25% less than heating load.'}]; },",
    "  },",
  ]},
  { after: 'http-status-codes', lines: [
    "    'ideal-weight-calculator': {",
    "    inputs: [{key:'ht',label:'Height (cm)',type:'number',defaultValue:175},{key:'gen',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],",
    "    formula: (v) => { var h=F(v.ht),isM=v.gen==='male'; var hIn=h/2.54-60; var devine=isM?50+2.3*hIn:45.5+2.3*hIn; var hamwi=isM?48+2.7*hIn:45.5+2.2*hIn; var robinson=isM?52+1.9*hIn:49+1.7*hIn; var miller=isM?56.2+1.41*hIn:53.1+1.36*hIn; var avg=(devine+hamwi+robinson+miller)/4; var lo=avg*0.9,hi=avg*1.1; return [{label:'Ideal Weight (avg of 4 formulas)',value:avg.toFixed(1)+' kg ('+(avg*2.2046).toFixed(0)+' lbs)',emphasis:true,insight:'Healthy weight range: '+lo.toFixed(0)+' to '+hi.toFixed(0)+' kg. This is a statistical estimate based on population averages. Individual healthy weight varies significantly by muscle mass, bone structure, and body composition.'},{label:'Devine Formula (1974)',value:devine.toFixed(1)+' kg',insight:'Most commonly used in clinical settings.'},{label:'Hamwi Formula (1964)',value:hamwi.toFixed(1)+' kg'},{label:'Robinson Formula (1983)',value:robinson.toFixed(1)+' kg'},{label:'Miller Formula (1983)',value:miller.toFixed(1)+' kg'}]; },",
    "  },",
  ]},
  { after: 'list-converter', lines: [
    "    'loan-comparison-calculator': {",
    "    inputs: [{key:'p1',label:'Loan A: Principal ($)',type:'number',defaultValue:300000},{key:'r1',label:'Loan A: Rate (%)',type:'number',defaultValue:6.5},{key:'n1',label:'Loan A: Term (yr)',type:'number',defaultValue:30},{key:'p2',label:'Loan B: Principal ($)',type:'number',defaultValue:300000},{key:'r2',label:'Loan B: Rate (%)',type:'number',defaultValue:5.5},{key:'n2',label:'Loan B: Term (yr)',type:'number',defaultValue:15}],",
    "    formula: (v) => { var p1=F(v.p1),r1=F(v.r1)/100/12,n1=F(v.n1)*12; var p2=F(v.p2),r2=F(v.r2)/100/12,n2=F(v.n2)*12; var m1=r1>0?p1*r1*Math.pow(1+r1,n1)/(Math.pow(1+r1,n1)-1):p1/n1; var m2=r2>0?p2*r2*Math.pow(1+r2,n2)/(Math.pow(1+r2,n2)-1):p2/n2; var t1=m1*n1,t2=m2*n2,i1=t1-p1,i2=t2-p2; var best=t1<t2?'Loan A saves $'+(t2-t1).toLocaleString()+' total':t2<t1?'Loan B saves $'+(t1-t2).toLocaleString()+' total':'Same total cost'; return [{label:'Loan A ('+F(v.n1).toFixed(0)+'yr @ '+F(v.r1).toFixed(1)+'%)',value:'$'+m1.toFixed(0)+'/mo | Total $'+t1.toLocaleString()+' | Interest $'+i1.toLocaleString()},{label:'Loan B ('+F(v.n2).toFixed(0)+'yr @ '+F(v.r2).toFixed(1)+'%)',value:'$'+m2.toFixed(0)+'/mo | Total $'+t2.toLocaleString()+' | Interest $'+i2.toLocaleString()},{label:'Best Option',value:best,emphasis:true,insight:'Monthly difference: $'+Math.abs(m1-m2).toFixed(0)+'. Total savings: $'+Math.abs(t1-t2).toLocaleString()+'. Lower rate + shorter term = least total cost.'}]; },",
    "  },",
  ]},
  { after: 'numeronym-generator', lines: [
    "    'ohms-law-calculator': {",
    "    inputs: [{key:'mode',label:'Solve For',type:'select',options:[{label:'Current (I = V/R)',value:'I'},{label:'Voltage (V = I*R)',value:'V'},{label:'Resistance (R = V/I)',value:'R'},{label:'Power (P = V*I)',value:'P'}],defaultValue:'I'},{key:'v',label:'Voltage (V)',type:'number',defaultValue:12},{key:'r',label:'Resistance (ohm)',type:'number',defaultValue:100},{key:'i',label:'Current (A)',type:'number',defaultValue:0.5}],",
    "    formula: (v) => { var V=F(v.v),R=F(v.r),I=F(v.i),results=[]; if(v.mode==='I'&&R>0){var i=V/R;results.push({label:'Current',value:i.toFixed(3)+' A ('+(i*1000).toFixed(0)+' mA)'},{label:'Power',value:(V*i).toFixed(1)+' W'});} else if(v.mode==='V'){var volt=I*R;results.push({label:'Voltage',value:volt.toFixed(2)+' V'},{label:'Power',value:(volt*I).toFixed(1)+' W'});} else if(v.mode==='R'&&I>0){results.push({label:'Resistance',value:(V/I).toFixed(2)+' ohm'},{label:'Power',value:(V*I).toFixed(1)+' W'});} else if(v.mode==='P'){results.push({label:'Power',value:(V*I).toFixed(1)+' W ('+(V*I/1000).toFixed(3)+' kW)'},{label:'Current',value:I.toFixed(3)+' A'},{label:'Resistance',value:I>0?(V/I).toFixed(2)+' ohm':'infinite'});} results.push({label:'Ohms Law',value:'V = I x R  |  P = V x I',insight:'All units auto-convert. For AC circuits, use RMS values. Power triangle: P = V x I x cos(phi) where cos(phi) is the power factor.'}); return results; },",
    "  },",
  ]},
  { after: 'party-drink-calculator', lines: [
    "    'pet-calorie-calculator': {",
    "    inputs: [{key:'wt',label:'Weight (kg)',type:'number',defaultValue:10},{key:'species',label:'Species',type:'select',options:[{label:'Dog',value:'dog'},{label:'Cat',value:'cat'}],defaultValue:'dog'},{key:'age',label:'Life Stage',type:'select',options:[{label:'Adult (1-7yr)',value:'adult'},{label:'Puppy/Kitten (<1yr)',value:'young'},{label:'Senior (7+yr)',value:'senior'}],defaultValue:'adult'},{key:'fixed',label:'Spayed/Neutered?',type:'select',options:[{label:'Yes',value:'yes'},{label:'No (intact)',value:'no'}],defaultValue:'yes'},{key:'activity',label:'Activity Level',type:'select',options:[{label:'Low (couch potato)',value:'low'},{label:'Moderate (daily walk)',value:'mod'},{label:'High (working/sport)',value:'high'}],defaultValue:'mod'}],",
    "    formula: (v) => { var wt=F(v.wt),rer=70*Math.pow(Math.max(1,wt),0.75); var factors={dog:{adult:{yes:{low:1.4,mod:1.6,high:2.0},no:{low:1.6,mod:1.8,high:2.5}},young:{yes:{low:2.0,mod:2.5,high:3.0},no:{low:2.5,mod:3.0,high:3.5}},senior:{yes:{low:1.2,mod:1.4,high:1.6},no:{low:1.4,mod:1.6,high:1.8}}},cat:{adult:{yes:{low:1.0,mod:1.2,high:1.4},no:{low:1.2,mod:1.4,high:1.6}},young:{yes:{low:2.0,mod:2.5,high:3.0},no:{low:2.5,mod:3.0,high:3.5}},senior:{yes:{low:0.8,mod:1.0,high:1.2},no:{low:1.0,mod:1.2,high:1.4}}}}; var factor=factors[v.species]?.[v.age]?.[v.fixed]?.[v.activity]||1.6; var cal=rer*factor; return [{label:'RER (Resting Energy Requirement)',value:rer.toFixed(0)+' kcal/day',insight:'RER = 70 x weight(kg)^0.75. Basal metabolic needs at complete rest.'},{label:'Daily Calorie Needs',value:cal.toFixed(0)+' kcal/day',emphasis:true,insight:'Factor: '+factor.toFixed(1)+'x RER based on species, age, spay/neuter status, and activity. Adjust based on body condition score (BCS 1-9). Reduce by 10-20% if overweight.'},{label:'Food Amount (@350 kcal/cup)',value:(cal/350).toFixed(1)+' cups/day',insight:'Check your pet food label for exact kcal/cup. Wet food: ~100 kcal per 3oz can. Treats should be less than 10% of daily calories.'}]; },",
    "  },",
  ]},
  { after: 'pet-calorie-calculator', lines: [
    "    'pet-breed-mix-calculator': {",
    "    inputs: [{key:'size',label:'Size',type:'select',options:[{label:'Small (<10kg)',value:'small'},{label:'Medium (10-25kg)',value:'medium'},{label:'Large (25-45kg)',value:'large'}],defaultValue:'medium'},{key:'coat',label:'Coat Type',type:'select',options:[{label:'Short',value:'short'},{label:'Long',value:'long'},{label:'Curly/Wiry',value:'curly'}],defaultValue:'short'}],",
    "    formula: (v) => { var traits={small:{short:'Terrier/Chihuahua mix: energetic, long-lived (15+ years). Watch for dental issues.',long:'Shih Tzu/Pomeranian mix: friendly, needs regular grooming. Great apartment dogs.',curly:'Mini Poodle/Maltese: hypoallergenic, highly intelligent. Needs regular professional grooming.'},medium:{short:'Labrador/Pit Bull mix: loyal, high energy. 50-70 lbs. Needs 1hr+ daily exercise.',long:'Border Collie/Australian Shepherd mix: extremely smart, needs mental stimulation. Strong herding instincts.',curly:'Goldendoodle/Labradoodle: friendly, low-shedding. 40-60 lbs. Excellent family dogs.'},large:{short:'German Shepherd/Rottweiler mix: protective, needs firm consistent training. 70-100 lbs.',long:'Great Pyrenees mix: gentle giants, independent thinkers. May bark at night.',curly:'Standard Poodle mix: athletic, hypoallergenic. Needs 1hr+ vigorous exercise daily.'}}; var result=traits[v.size]?.[v.coat]||'Mixed breed = unique! Every dog is one of a kind. Adopt, dont shop.'; return [{label:'Typical Personality & Traits',value:result},{label:'! IMPORTANT DISCLAIMER',value:'FOR ENTERTAINMENT PURPOSES ONLY. Real canine genetics are far more complex than simple Mendelian inheritance models. Phenotype (physical appearance) does not reliably indicate breed mix. Actual results may vary dramatically from these estimates. For accurate breed identification, use Embark or Wisdom Panel DNA testing. This simulator is provided for fun and educational exploration only.'}]; },",
    "  },",
  ]},
  { after: 'phone-parser-and-formatter', lines: [
    "    'photo-print-size-calculator': {",
    "    inputs: [{key:'w',label:'Width (px)',type:'number',defaultValue:4000},{key:'h',label:'Height (px)',type:'number',defaultValue:3000},{key:'dpi',label:'Print Quality',type:'select',options:[{label:'300 DPI (photo lab quality)',value:'300'},{label:'200 DPI (good poster)',value:'200'},{label:'150 DPI (large format/banner)',value:'150'}],defaultValue:'300'}],",
    "    formula: (v) => { var w=F(v.w),h=F(v.h),dpi=parseInt(String(v.dpi)); var wIn=w/dpi,hIn=h/dpi; var mp=w*h/1e6; return [{label:'Print Size at '+v.dpi+' DPI',value:wIn.toFixed(1)+' x '+hIn.toFixed(1)+' inches ('+(wIn*2.54).toFixed(0)+' x '+(hIn*2.54).toFixed(0)+' cm)',emphasis:true},{label:'Megapixels',value:mp.toFixed(1)+' MP',insight:mp>=12?'Excellent quality! Suitable for 300 DPI prints up to 13x19 inches.':mp>=6?'Good quality. Supports 8x10 inch prints at 300 DPI.':'Low resolution. Best for web display or small prints only.'},{label:'DPI Reference Guide',value:'300 DPI = professional photo lab quality (8x10 requires 7.2 MP). 200 DPI = good quality poster. 150 DPI = large format banner. Formula: pixels / DPI = printable inches.'}]; },",
    "  },",
  ]},
];

// Insert in reverse order to maintain correct line numbers
additions.sort((a, b) => (closeLines[b.after] || 0) - (closeLines[a.after] || 0));

for (const item of additions) {
    const insertLine = closeLines[item.after];
    if (insertLine === undefined) {
        console.log('SKIP: ' + item.after + ' not found in closeLines');
        continue;
    }
    // Insert after the closing line
    lines.splice(insertLine + 1, 0, ...item.lines);
    console.log('ADDED after ' + item.after + ' (line ' + insertLine + '): ' + item.lines.length + ' lines');

    // Update closeLines for subsequent insertions
    const added = item.lines.length;
    for (const [k, v] of Object.entries(closeLines)) {
        if (v > insertLine) closeLines[k] += added;
    }
}

fs.writeFileSync('src/app/data/formulas.ts', lines.join('\n'), 'utf8');
console.log('\nDone! Added ' + additions.length + ' formula blocks.');
