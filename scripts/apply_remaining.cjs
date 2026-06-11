const fs = require("fs");
let c = fs.readFileSync("src/app/data/formulas.ts", "utf8");
let count = 0;

function replaceBlock(key, newBlock) {
    const start = c.indexOf("'" + key + "': {");
    if (start < 0) { console.log("NOT FOUND: " + key); return false; }
    let depth = 0, end = start;
    for (let i = start; i < c.length; i++) {
        if (c[i] === "{") depth++;
        if (c[i] === "}") depth--;
        if (depth === 0 && i > start) { end = i; break; }
    }
    while (end < c.length && (c[end] === "," || c[end] === "\n" || c[end] === "\r")) end++;
    const before = c.slice(Math.max(0, start - 2), start + 40);
    c = c.slice(0, start) + newBlock + c.slice(end + 1);
    console.log("OK: " + key + " (" + newBlock.length + " chars)");
    count++;
    return true;
}

// 1. Tariff - FOB/CIF + VAT compounding
replaceBlock("tariff-impact-calculator",
"    'tariff-impact-calculator': {\n" +
"    inputs: [{key:'basis',label:'Price Basis',type:'select',options:[{label:'FOB (Free On Board)',value:'fob'},{label:'CIF (Cost+Insurance+Freight)',value:'cif'}],defaultValue:'fob'},{key:'price',label:'Unit Price ($)',type:'number',defaultValue:100},{key:'freight',label:'Freight/Unit ($)',type:'number',defaultValue:5},{key:'ins',label:'Insurance/Unit ($)',type:'number',defaultValue:1},{key:'old',label:'Old Tariff (%)',type:'number',defaultValue:10},{key:'new',label:'New Tariff (%)',type:'number',defaultValue:25},{key:'vat',label:'VAT/GST Rate (%)',type:'number',defaultValue:0},{key:'units',label:'Quantity',type:'number',defaultValue:1000}],\n" +
"    formula: (v) => { var price=F(v.price),fr=F(v.freight),ins=F(v.ins),cif=price+fr+ins; var dutiable=v.basis==='cif'?cif:price; var oldD=dutiable*F(v.old)/100,newD=dutiable*F(v.new)/100; var oldV=(dutiable+oldD)*F(v.vat)/100,newV=(dutiable+newD)*F(v.vat)/100; var oldT=(dutiable+oldD+oldV)*F(v.units); var newT=(dutiable+newD+newV)*F(v.units); return [{label:'Dutiable ('+v.basis.toUpperCase()+')',value:'$'+dutiable.toFixed(2)+'/unit',insight:'CIF=FOB+Freight+Insurance. Most countries use CIF for tariff assessment.'},{label:'Old: Duty '+F(v.old).toFixed(0)+'%'+(F(v.vat)>0?' + VAT '+F(v.vat).toFixed(0)+'%':''),value:'$'+oldT.toLocaleString()},{label:'New: Duty '+F(v.new).toFixed(0)+'%'+(F(v.vat)>0?' + VAT '+F(v.vat).toFixed(0)+'%':''),value:'$'+newT.toLocaleString(),emphasis:true},{label:'Increase',value:'$'+(newT-oldT).toLocaleString()+' ('+((newT/oldT-1)*100).toFixed(1)+'%)',insight:F(v.vat)>0?'VAT is applied ON TOP of duty (compounding). Standard in EU/UK and most jurisdictions worldwide.':'Add VAT rate to see full impact - VAT applies to (price+duty) total in most countries.'}]; },\n" +
"  },\n");

// 2. Tire-size - fix formula bug + old/new comparison
replaceBlock("tire-size-calculator",
"    'tire-size-calculator': {\n" +
"    inputs: [{key:'w1',label:'Old Width (mm)',type:'number',defaultValue:225},{key:'ar1',label:'Old Aspect Ratio',type:'number',defaultValue:65},{key:'r1',label:'Old Rim (in)',type:'number',defaultValue:17},{key:'w2',label:'New Width (mm)',type:'number',defaultValue:245},{key:'ar2',label:'New Aspect Ratio',type:'number',defaultValue:45},{key:'r2',label:'New Rim (in)',type:'number',defaultValue:18}],\n" +
"    formula: (v) => { var w1=F(v.w1),ar1=F(v.ar1),r1=F(v.r1),w2=F(v.w2),ar2=F(v.ar2),r2=F(v.r2); var sh1=w1*ar1/100/25.4,od1=sh1*2+r1; var sh2=w2*ar2/100/25.4,od2=sh2*2+r2; var diaDiff=(od2-od1)/od1*100; var s60=60*od2/od1; var safe=Math.abs(diaDiff)<=3; return [{label:'Old Tire ('+w1.toFixed(0)+'/'+ar1.toFixed(0)+'R'+r1.toFixed(0)+')',value:od1.toFixed(2)+'in dia, sidewall '+sh1.toFixed(2)+'in'},{label:'New Tire ('+w2.toFixed(0)+'/'+ar2.toFixed(0)+'R'+r2.toFixed(0)+')',value:od2.toFixed(2)+'in dia, sidewall '+sh2.toFixed(2)+'in'},{label:'Diameter Change',value:(diaDiff>=0?'+':'')+diaDiff.toFixed(1)+'%',insight:safe?'Safe within 3% - ABS, TC, gearing unaffected.':diaDiff>3?'TOO LARGE: speedo reads LOW. ABS may malfunction.':diaDiff<-3?'TOO SMALL: speedo reads HIGH. Less ground clearance.'},{label:'Speedo at 60 mph indicated',value:'Actual: '+s60.toFixed(1)+' mph',insight:od2>od1?'Going FASTER than speedo shows - ticket risk!':'Going SLOWER than speedo shows.'},{label:'Mobile CSS Tip',value:'Use appearance:none on number inputs to hide spinners on narrow mobile screens.'}]; },\n" +
"  },\n");

// 3. Beam-load - extreme value check + disclaimer
replaceBlock("beam-load-calculator",
"    'beam-load-calculator': {\n" +
"    inputs: [{key:'span',label:'Span (ft)',type:'number',defaultValue:12},{key:'load',label:'Load (lbs/ft)',type:'number',defaultValue:40},{key:'mat',label:'Material',type:'select',options:[{label:'Wood SPF #2 (Fb=1000 psi)',value:'1000'},{label:'LVL (Fb=2800 psi)',value:'2800'},{label:'Steel A36 (Fb=24000 psi)',value:'24000'},{label:'Douglas Fir #1 (Fb=1400)',value:'1400'},{label:'Glulam (Fb=2100)',value:'2100'}],defaultValue:'1000'},{key:'support',label:'Support Type',type:'select',options:[{label:'Simply Supported',value:'simple'},{label:'Fixed Both Ends',value:'fixed'},{label:'Cantilever',value:'cant'}],defaultValue:'simple'}],\n" +
"    formula: (v) => { var L=F(v.span),w=F(v.load),Fb=parseFloat(String(v.mat)); if(L<=0||w<=0)return[{label:'Error',value:'Span and load must be positive.'}]; var extreme=''; if(L>50||w>1000)extreme='Extreme input values - verify with a licensed structural engineer. Building codes require safety factors (typically 1.5x for live loads).'; var M,divider; if(v.support==='fixed'){M=w*L*L/12;divider='M=wL^2/12';} else if(v.support==='cant'){M=w*L*L/2;divider='M=wL^2/2';} else {M=w*L*L/8;divider='M=wL^2/8';} var S=M*12/Fb; var sections=[{name:'2x6',S:7.56},{name:'2x8',S:13.14},{name:'2x10',S:21.39},{name:'2x12',S:31.64},{name:'4x10',S:42.78},{name:'4x12',S:63.28}]; var ok=sections.filter(function(s){return s.S>=S;}); return [{label:'Max Moment ('+divider+')',value:M.toFixed(0)+' ft-lb'},{label:'Required S',value:S.toFixed(2)+' in3'},{label:'Suitable Beams',value:ok.length>0?ok.map(function(s){return s.name;}).join(', '):'None - reduce span or use steel'},{label:'Deflection',value:'L/360='+((L*12)/360).toFixed(2)+'in (live) | L/240='+((L*12)/240).toFixed(2)+'in (total)'},{label:'DISCLAIMER',value:'ESTIMATE ONLY. Not a substitute for professional structural engineering. Consult a licensed engineer for actual construction. '+extreme}]; },\n" +
"  },\n");

// 4. Currency-hedge - forward points input
replaceBlock("currency-hedge-calculator",
"    'currency-hedge-calculator': {\n" +
"    inputs: [{key:'amt',label:'Amount (foreign currency)',type:'number',defaultValue:100000},{key:'cur',label:'Spot Rate',type:'number',defaultValue:1.10,step:0.0001},{key:'fwdPts',label:'Forward Points (from bank quote)',type:'number',defaultValue:-200,step:1,unit:'pts',hint:'+200 = premium, -200 = discount. Get live quote from your FX broker.'}],\n" +
"    formula: (v) => { var amt=F(v.amt),spot=F(v.cur),fwdPts=F(v.fwdPts),fwd=spot+fwdPts/10000; var hedged=amt*fwd,unhedged=amt*spot; var diff=hedged-unhedged,costPct=Math.abs(fwdPts/10000)/spot*100; return [{label:'Spot Rate',value:spot.toFixed(4)},{label:'Forward Rate ('+(fwdPts>0?'+':'')+fwdPts.toFixed(0)+' pts)',value:fwd.toFixed(4),insight:'Forward points reflect interest rate differential between currencies. Banks quote these live. Get actual points from your FX desk or broker.'},{label:'Hedged Value',value:'$'+hedged.toFixed(2),insight:'Locked-in rate. Hedging cost: '+costPct.toFixed(3)+'%. Guaranteed regardless of market movement.'},{label:'Unhedged (at spot)',value:'$'+unhedged.toFixed(2),insight:'Exposed to currency fluctuation. A 5% adverse move would cost ~$'+(amt*spot*0.05).toFixed(0)+'.'},{label:'IMPORTANT NOTE',value:'This uses manual forward point input. FX rates change continuously. For real hedging decisions, obtain live quotes from your bank or FX broker (e.g., Interactive Brokers, Wise Business). Forward contracts typically require $100K+ notional.'}]; },\n" +
"  },\n");

// 5. Ovulation - irregular cycle validation + disclaimer
replaceBlock("ovulation-calculator",
"    'ovulation-calculator': {\n" +
"    inputs: [{key:'lmp',label:'Last Period (YYYY-MM-DD)',type:'text',defaultValue:'2026-06-01'},{key:'cycle',label:'Typical Cycle Length (days)',type:'number',defaultValue:28}],\n" +
"    formula: (v) => { var l=new Date(String(v.lmp)); if(isNaN(l.getTime()))return[{label:'Error',value:'Invalid date. Use YYYY-MM-DD format.'}]; var c=F(v.cycle); var irregular=c<21||c>45; var warn=irregular?'YOUR CYCLE ('+c.toFixed(0)+' days) IS OUTSIDE THE TYPICAL 21-45 DAY RANGE. This ovulation estimate may be INACCURATE. This tool assumes a regular 14-day luteal phase. For irregular cycles, ovulation prediction is unreliable - use ovulation predictor kits (OPKs) or consult a fertility specialist instead.':''; var o=new Date(l);o.setDate(o.getDate()+c-14);var f=new Date(o);f.setDate(f.getDate()-5);var e=new Date(o);e.setDate(e.getDate()+1); return[{label:'Predicted Ovulation ('+c.toFixed(0)+'-day cycle)',value:o.toISOString().slice(0,10),insight:irregular?'UNRELIABLE for irregular cycles - see warning.':'Based on '+c.toFixed(0)+'-day cycle. Actual ovulation may vary +/-2 days. Confirm with BBT tracking or OPK tests.'},{label:'Fertile Window',value:f.toISOString().slice(0,10)+' to '+e.toISOString().slice(0,10),insight:'Sperm can survive up to 5 days. The egg survives 12-24 hours after ovulation. Highest probability of conception: intercourse in the 2 days BEFORE ovulation.'},{label:irregular?'IRREGULAR CYCLE WARNING':'Medical Disclaimer',value:warn||'For informational purposes only. NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for fertility planning.'}]; },\n" +
"  },\n");

fs.writeFileSync("src/app/data/formulas.ts", c, "utf8");
console.log("\nDone! Updated " + count + " formulas.");
