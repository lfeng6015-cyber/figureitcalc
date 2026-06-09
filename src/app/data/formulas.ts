export interface CalcInput {
  key: string;
  label: string;
  type: "number" | "text" | "select";
  defaultValue?: number | string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  hint?: string;
  options?: { label: string; value: string }[];
}

export interface CalcResult {
  label: string;
  value: string;
  insight?: string;
  color?: "green" | "red" | "amber" | "blue";
  emphasis?: boolean;
}

export interface CalcSection {
  title: string;
  results: CalcResult[];
  steps?: { label: string; formula: string; result: string }[];
}

export function F(v: number | string): number {
  return Number(v) || 0;
}

export interface FormulaConfig {
  inputs: CalcInput[];
  formula: (values: Record<string, number | string>) => CalcResult[] | CalcSection[];
  presets?: { label: string; values: Record<string, number | string> }[];
}

export const formulaRegistry: Record<string, FormulaConfig> = {
    'annuity-calculator': {
    inputs: [{key:'pmt',label:'Payment ($)',type:'number',defaultValue:1000},{key:'rate',label:'Rate (%)',type:'number',defaultValue:6},{key:'n',label:'Periods (yr)',type:'number',defaultValue:20}],
    formula: (v) => { const pmt=F(v.pmt),r=F(v.rate)/100,n=F(v.n); const fv=r>0?pmt*((Math.pow(1+r,n)-1)/r):pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Invested',value:'$'+(pmt*n).toFixed(0)},{label:'Interest',value:'$'+(fv-pmt*n).toFixed(0)}]; },
  },
    'ascii-text-drawer': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'HELLO'}],
    formula: (v) => { var t=String(v.text).toUpperCase(); var A={H:'*   *\n*   *\n*****\n*   *\n*   *',E:'*****\n*    \n*****\n*    \n*****',L:'*    \n*    \n*    \n*    \n*****',O:' *** \n*   *\n*   *\n*   *\n *** '}; var r=t.split('').map(function(c){return A[c]||'?'}).join('\n\n'); return [{label:'ASCII Art',value:r},{label:'Chars',value:String(t.length)}]; },
  },
    'baby-growth-calculator': {
    inputs: [{key:'mo',label:'Age (months)',type:'number',defaultValue:6},{key:'wt',label:'Weight (kg)',type:'number',defaultValue:7.5},{key:'gen',label:'Gender',type:'select',options:[{label:'Boy',value:'boy'},{label:'Girl',value:'girl'}],defaultValue:'boy'}],
    formula: (v) => { const m=F(v.mo),w=F(v.wt); const med=v.gen==='boy'?[3.3,4.5,5.6,6.4,7.0,7.5,7.9,8.3,8.6,8.9,9.2,9.4]:[3.2,4.2,5.1,5.8,6.4,6.9,7.3,7.6,7.9,8.2,8.5,8.7]; const i=Math.min(11,Math.floor(m)); const pct=med[i]>0?Math.round(w/med[i]*50):50; return [{label:'Weight',value:w+' kg'},{label:'Median',value:med[i].toFixed(1)+' kg'},{label:'~Pctl',value:pct+'th'}]; },
  },
        'bakers-percentage-calculator': {
    inputs: [{key:'flour',label:'Flour (g)',type:'number',defaultValue:500},{key:'water',label:'Water (g)',type:'number',defaultValue:350},{key:'salt',label:'Salt (g)',type:'number',defaultValue:10},{key:'yeast',label:'Yeast (g)',type:'number',defaultValue:5}],
    formula: (v) => { const f=F(v.flour); return [{label:'Hydration',value:(F(v.water)/f*100).toFixed(0)+'%'},{label:'Salt',value:(F(v.salt)/f*100).toFixed(1)+'%'},{label:'Yeast',value:(F(v.yeast)/f*100).toFixed(1)+'%'},{label:'Total',value:(f+F(v.water)+F(v.salt)+F(v.yeast)).toFixed(0)+'g'}]; },
  },
    'base64-file-converter': {
    inputs: [{key:'size',label:'File Size (KB)',type:'number',defaultValue:100}],
    formula: (v) => { var kb=F(v.size),b64=Math.ceil(kb*4/3); return [{label:'Original',value:kb+' KB'},{label:'Base64 Size',value:b64+' KB'},{label:'Overhead',value:'+'+(b64-kb)+' KB (+33%)'},{label:'Data URI Prefix',value:'data:;base64,'}]; },
  },
      'base64-string-converter': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'Hello World!'}],
    formula: (v) => { const e=btoa(String(v.text)); return [{label:'Encoded',value:e},{label:'Original',value:''+v.text}]; },
  },
    'basic-auth-generator': {
    inputs: [{key:'user',label:'Username',type:'text',defaultValue:'admin'},{key:'pass',label:'Password',type:'text',defaultValue:'pass123'}],
    formula: (v) => { var auth=btoa(v.user+':'+v.pass); return [{label:'Header',value:'Authorization: Basic '+auth},{label:'curl',value:'curl -u '+v.user+':'+v.pass+' https://...'}]; },
  },
    'bcrypt': {
    inputs: [{key:'pw',label:'Password',type:'text',defaultValue:'MyPassword123!'},{key:'rounds',label:'Rounds',type:'select',options:[{label:'10 (fast)',value:'10'},{label:'12 (recommended)',value:'12'},{label:'14 (slow)',value:'14'}],defaultValue:'12'}],
    formula: (v) => { var p=String(v.pw); var cs=0; if(/[a-z]/.test(p))cs+=26; if(/[A-Z]/.test(p))cs+=26; if(/[0-9]/.test(p))cs+=10; if(/[^a-zA-Z0-9]/.test(p))cs+=32; var e=p.length*Math.log2(cs||1); return [{label:'Entropy',value:e.toFixed(0)+' bits'},{label:'Rounds',value:'2^'+v.rounds+' = '+Math.pow(2,Number(v.rounds))},{label:'Strength',value:e<40?'Weak':e<60?'Fair':e<80?'Good':'Strong'}]; },
  },
    'beam-load-calculator': {
    inputs: [{key:'span',label:'Span (ft)',type:'number',defaultValue:12},{key:'load',label:'Load (lbs/ft)',type:'number',defaultValue:40},{key:'mat',label:'Material',type:'select',options:[{label:'Wood SPF',value:'1000'},{label:'LVL',value:'2800'},{label:'Steel',value:'24000'}],defaultValue:'1000'}],
    formula: (v) => { const M=F(v.load)*F(v.span)*F(v.span)/8,S=M*12/F(v.mat); return [{label:'Moment',value:M.toFixed(0)+' ft-lb'},{label:'S req',value:S.toFixed(2)+' in3'},{label:'2x10 OK?',value:S<=21.4?'Yes':'No'}]; },
  },
    'benchmark-builder': {
    inputs: [{key:'n',label:'Iterations',type:'number',defaultValue:100000}],
    formula: (v) => { var start=Date.now(); var s=0; for(var i=0;i<Math.min(F(v.n),50000);i++)s+=Math.sqrt(i); var elapsed=Date.now()-start; var ops=Math.round(F(v.n)/(elapsed/1000)); return [{label:'Time',value:elapsed+' ms'},{label:'Ops/sec',value:ops.toLocaleString()},{label:'Score',value:Math.round(ops/1000)+' kOps'}]; },
  },
      'bip39-generator': {
    inputs: [{key:'words',label:'Words',type:'select',options:[{label:'12 words',value:'12'},{label:'24 words',value:'24'}],defaultValue:'12'}],
    formula: (v) => { var wl=['abandon','ability','able','about','above','absent','absorb','abstract','absurd','abuse','access','accident','account','accuse','achieve','acid','acoustic','acquire','across','act','action','actor','actress','actual','adapt','add','addict','address','adjust','admit','adult','advance','advice','aerobic','affair','afford','afraid','africa','after','again','age','agent','agree','ahead','aim','air','airport','aisle','alarm','album','alcohol','alert','alien','all','alley','allow','almost','alone','alpha','already','also','alter','always','amateur','amazing','among','amount','amused','analyst','anchor','ancient','anger','angle','angry','animal','ankle','announce','annual','another','answer','antenna','antique','anxiety','any','apart','apology','appear','apple','approve','april','arch','arctic','area','arena','argue','arm','armed','armor','army','around','arrange','arrest','arrive','arrow','art','artefact','artist','artwork','ask','aspect','assault','asset','assist','assume','asthma','athlete','atom','attack','attend','attitude','attract','auction','audit','august','aunt','author','auto','autumn','average','avocado','avoid','awake','aware','away','awesome','awful','awkward','axis']; var c=F(v.words),r=[]; for(var i=0;i<c;i++)r.push(wl[Math.floor(Math.random()*wl.length)]); return [{label:'Mnemonic',value:r.join(' ')},{label:'Words',value:String(c)},{label:'Entropy',value:(c*32/3).toFixed(0)+' bits'}]; },
  },
    'bmi-calculator': {
    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'weight',label:'Weight (kg)',type:'number',defaultValue:70},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],
    formula: (v) => { const h=F(v.height)/100,w=F(v.weight),bmi=h>0?w/(h*h):0; const cat=bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':bmi<35?'Obese I':bmi<40?'Obese II':'Obese III'; const low=18.5*h*h,high=24.9*h*h; return [{label:'BMI',value:bmi.toFixed(1)+' kg/m2'},{label:'Category',value:cat},{label:'Healthy Range',value:low.toFixed(0)+'-'+high.toFixed(0)+' kg'}]; },
    presets: [{label:'Adult',values:{height:170,weight:70,gender:'male'}}],
  },
        'body-fat-calculator': {
    inputs: [{key:'ht',label:'Height (cm)',type:'number',defaultValue:175},{key:'neck',label:'Neck (cm)',type:'number',defaultValue:38},{key:'waist',label:'Waist (cm)',type:'number',defaultValue:85},{key:'gen',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],
    formula: (v) => { const h=F(v.ht),n=F(v.neck),w=F(v.waist); var bf=v.gen==='male'?86.01*Math.log10(Math.max(1,w-n))-70.041*Math.log10(h)+36.76:163.205*Math.log10(Math.max(1,w+n-h))-97.684*Math.log10(h)-78.387; bf=Math.max(3,Math.abs(bf)); return [{label:'Body Fat',value:bf.toFixed(1)+'%'},{label:'Category',value:bf<6?'Essential':bf<14?'Athlete':bf<18?'Fitness':bf<25?'Average':'Above Avg'}]; },
  },
    'break-even-calculator': {
    inputs: [{key:'fc',label:'Fixed Costs ($)',type:'number',defaultValue:10000},{key:'p',label:'Price/Unit ($)',type:'number',defaultValue:50},{key:'vc',label:'Variable Cost ($)',type:'number',defaultValue:30}],
    formula: (v) => { const cm=F(v.p)-F(v.vc),be=cm>0?Math.ceil(F(v.fc)/cm):0; return [{label:'Break-Even',value:be+' units'},{label:'Revenue',value:'$'+(be*F(v.p)).toFixed(0)},{label:'Margin/Unit',value:'$'+cm.toFixed(2)}]; },
  },
    'bsa-calculator': {
    inputs: [{key:'ht',label:'Height (cm)',type:'number',defaultValue:175},{key:'wt',label:'Weight (kg)',type:'number',defaultValue:70}],
    formula: (v) => { const b=Math.sqrt(F(v.ht)*F(v.wt)/3600); return [{label:'BSA',value:b.toFixed(3)+' m2'}]; },
  },
    'camera-recorder': {
    inputs: [],
    formula: (v) => { return [{label:'Status',value:'Ready — Grant camera permission'},{label:'Format',value:'WebM (VP8/VP9)'},{label:'Resolution',value:'Up to 1080p'}]; },
  },
      'car-depreciation-calculator': {
    inputs: [{key:'price',label:'Purchase ($)',type:'number',defaultValue:35000},{key:'years',label:'Years',type:'number',defaultValue:5}],
    formula: (v) => { var val=F(v.price); var r=[0.78,0.85,0.88,0.90,0.92]; for(var i=0;i<Math.min(F(v.years),5);i++)val*=r[i]; return [{label:'Value',value:'$'+val.toFixed(0)},{label:'Lost',value:'$'+(F(v.price)-val).toFixed(0)},{label:'Lost %',value:((1-val/F(v.price))*100).toFixed(0)+'%'}]; },
  },
        'car-loan-calculator': {
    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'down',label:'Down (%)',type:'number',defaultValue:20},{key:'rate',label:'APR (%)',type:'number',defaultValue:6},{key:'term',label:'Term (months)',type:'number',defaultValue:60}],
    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term); const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly',value:'$'+M.toFixed(2)},{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)}]; },
  },
    'car-tax-calculator': {
    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'trade',label:'Trade-In ($)',type:'number',defaultValue:10000},{key:'tax',label:'Tax Rate (%)',type:'number',defaultValue:7}],
    formula: (v) => { const t=Math.max(0,F(v.price)-F(v.trade))*F(v.tax)/100; return [{label:'Taxable',value:'$'+Math.max(0,F(v.price)-F(v.trade)).toFixed(0)},{label:'Tax Due',value:'$'+t.toFixed(2)},{label:'Total OTD',value:'$'+(F(v.price)+t).toFixed(0)}]; },
  },
    'carbon-footprint-calculator': {
    inputs: [{key:'miles',label:'Annual Miles',type:'number',defaultValue:12000},{key:'flights',label:'Flights/Yr',type:'number',defaultValue:2},{key:'kwh',label:'Monthly kWh',type:'number',defaultValue:500},{key:'meat',label:'Meat meals/wk',type:'number',defaultValue:5}],
    formula: (v) => { const co2=F(v.miles)*0.0004+F(v.flights)*0.25+F(v.kwh)*12*0.00092+F(v.meat)*52*0.007; return [{label:'CO2',value:co2.toFixed(1)+' tons'},{label:'US Avg',value:'16 tons'},{label:'Target',value:'2 tons'}]; },
  },
      'case-converter': {
    inputs: [{key:'text',label:'Input Text',type:'text',defaultValue:'hello world example'}],
    formula: (v) => { const t=String(v.text),w=t.split(/[\s_-]+/).filter(Boolean); const cam=w.map(function(x,i){return i===0?x.toLowerCase():x.charAt(0).toUpperCase()+x.slice(1).toLowerCase()}).join(''); const pas=w.map(function(x){return x.charAt(0).toUpperCase()+x.slice(1).toLowerCase()}).join(''); const sn=w.map(function(x){return x.toLowerCase()}).join('_'); const kb=w.map(function(x){return x.toLowerCase()}).join('-'); return [{label:'camelCase',value:cam},{label:'PascalCase',value:pas},{label:'snake_case',value:sn},{label:'kebab-case',value:kb}]; },
  },
        'cat-age-calculator': {
    inputs: [{key:'age',label:'Cat Age (yrs)',type:'number',defaultValue:3}],
    formula: (v) => { const a=F(v.age); var h=a<=1?15:a<=2?24:24+(a-2)*4; return [{label:'Human Age',value:Math.round(h)+' yrs'},{label:'Stage',value:a<0.5?'Kitten':a<2?'Junior':a<6?'Prime':a<10?'Mature':a<14?'Senior':'Geriatric'}]; },
  },
    'child-cost-calculator': {
    inputs: [{key:'care',label:'Childcare ($/mo)',type:'number',defaultValue:1200},{key:'food',label:'Food ($/mo)',type:'number',defaultValue:300},{key:'other',label:'Other ($/mo)',type:'number',defaultValue:200}],
    formula: (v) => { const m=F(v.care)+F(v.food)+F(v.other); return [{label:'Monthly',value:'$'+m.toFixed(0)},{label:'Annual',value:'$'+(m*12).toFixed(0)},{label:'0-18yr',value:'$'+(m*12*18).toFixed(0)}]; },
  },
    'chmod-calculator': {
    inputs: [{key:'o',label:'Owner',type:'select',options:[{label:'rwx (7)',value:'7'},{label:'rw- (6)',value:'6'},{label:'r-x (5)',value:'5'},{label:'r-- (4)',value:'4'}],defaultValue:'7'},{key:'g',label:'Group',type:'select',options:[{label:'r-x (5)',value:'5'},{label:'r-- (4)',value:'4'},{label:'--- (0)',value:'0'}],defaultValue:'5'},{key:'w',label:'Others',type:'select',options:[{label:'r-x (5)',value:'5'},{label:'r-- (4)',value:'4'},{label:'--- (0)',value:'0'}],defaultValue:'5'}],
    formula: (v) => { var sym=function(n){return ['---','--x','-w-','-wx','r--','r-x','rw-','rwx'][n]}; return [{label:'chmod',value:'chmod '+v.o+v.g+v.w},{label:'Symbolic',value:sym(Number(v.o))+sym(Number(v.g))+sym(Number(v.w))}]; },
    presets: [{label:'755 Script',values:{o:'7',g:'5',w:'5'}},{label:'644 File',values:{o:'6',g:'4',w:'4'}}],
  },
    'chronometer': {
    inputs: [],
    formula: (v) => { return [{label:'Status',value:'Ready — press Start'},{label:'Elapsed',value:'00:00:00.000'},{label:'Laps',value:'0'}]; },
  },
        'coffee-ratio-calculator': {
    inputs: [{key:'coffee',label:'Coffee (g)',type:'number',defaultValue:20},{key:'ratio',label:'Water Ratio (1:X)',type:'number',defaultValue:16}],
    formula: (v) => { const w=F(v.coffee)*F(v.ratio),cups=w/240; return [{label:'Water',value:w.toFixed(0)+' ml'},{label:'Cups',value:cups.toFixed(1)+' cups'},{label:'Strong(1:14)',value:(F(v.coffee)*14)+' ml'},{label:'Light(1:18)',value:(F(v.coffee)*18)+' ml'}]; },
    presets: [{label:'Pour-Over',values:{coffee:20,ratio:16}}],
  },
      'color-converter': {
    inputs: [{key:'hex',label:'HEX Color (#RRGGBB)',type:'text',defaultValue:'#FF5733'}],
    formula: (v) => { const h=String(v.hex).replace('#',''); if(!/^[0-9A-Fa-f]{6}$/.test(h))return[{label:'Error',value:'Invalid HEX'}]; const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16); return [{label:'RGB',value:'rgb('+r+','+g+','+b+')'},{label:'HEX',value:'#'+h.toUpperCase()}]; },
  },
        'compound-interest-calculator': {
    inputs: [{key:'principal',label:'Initial Invest ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly Add ($)',type:'number',defaultValue:200},{key:'rate',label:'Return (%)',type:'number',defaultValue:7},{key:'years',label:'Years',type:'number',defaultValue:20}],
    formula: (v) => { const P=F(v.principal),pmt=F(v.monthly),r=F(v.rate)/100/12,n=F(v.years)*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); const inv=P+pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+inv.toFixed(0)},{label:'Interest',value:'$'+(fv-inv).toFixed(0)}]; },
    presets: [{label:'30yr Retire',values:{principal:50000,monthly:500,rate:7,years:30}}],
  },
    'concrete-block-calculator': {
    inputs: [{key:'len',label:'Wall Length (ft)',type:'number',defaultValue:20},{key:'ht',label:'Wall Height (ft)',type:'number',defaultValue:8}],
    formula: (v) => { const a=F(v.len)*F(v.ht),b=Math.ceil(a*1.125),m=Math.ceil(b/33); return [{label:'Area',value:a.toFixed(0)+' sqft'},{label:'Blocks',value:b+' blocks'},{label:'Mortar',value:m+' bags'}]; },
  },
      'concrete-calculator': {
    inputs: [{key:'length',label:'Length (ft)',type:'number',defaultValue:10},{key:'width',label:'Width (ft)',type:'number',defaultValue:10},{key:'thickness',label:'Thickness (in)',type:'number',defaultValue:4}],
    formula: (v) => { const cf=F(v.length)*F(v.width)*F(v.thickness)/12,cy=cf/27,bags=Math.ceil(cy*45); return [{label:'Cubic Yards',value:cy.toFixed(2)+' yd3'},{label:'80lb Bags',value:bags+' bags'},{label:'Cost $140/yd3',value:'$'+(cy*140).toFixed(0)}]; },
    presets: [{label:'10x10 Patio',values:{length:10,width:10,thickness:4}}],
  },
        'cooking-time-calculator': {
    inputs: [{key:'weight',label:'Weight (lbs)',type:'number',defaultValue:12},{key:'type',label:'Meat',type:'select',options:[{label:'Turkey',value:'turkey'},{label:'Chicken',value:'chicken'},{label:'Beef',value:'beef'},{label:'Pork',value:'pork'}],defaultValue:'turkey'}],
    formula: (v) => { const r={turkey:15,chicken:20,beef:18,pork:25}; const m=F(v.weight)*r[String(v.type)]; return [{label:'Cook Time',value:Math.round(m)+' min ('+(m/60).toFixed(1)+' hrs)'},{label:'Rest Time',value:Math.round(m*0.15)+' min'},{label:'Internal',value:'165F poultry / 145F beef,pork'}]; },
    presets: [{label:'12lb Turkey',values:{weight:12,type:'turkey'}}],
  },
    'countdown-timer': {
    inputs: [{key:'date',label:'Target Date',type:'text',defaultValue:'2027-01-01'}],
    formula: (v) => { const d=new Date(String(v.date)); if(isNaN(d.getTime()))return[{label:'Error',value:'Invalid date'}]; const diff=d.getTime()-Date.now(),days=Math.floor(diff/86400000),hrs=Math.floor((diff%86400000)/3600000),min=Math.floor((diff%3600000)/60000); return [{label:'Days',value:Math.max(0,days)+' days'},{label:'Hours',value:Math.max(0,hrs)+' hrs'},{label:'Minutes',value:Math.max(0,min)+' min'}]; },
  },
    'cpm-calculator': {
    inputs: [{key:'cost',label:'Ad Cost ($)',type:'number',defaultValue:500},{key:'imp',label:'Impressions',type:'number',defaultValue:100000}],
    formula: (v) => { const c=F(v.imp)>0?F(v.cost)/F(v.imp)*1000:0; return [{label:'CPM',value:'$'+c.toFixed(2)},{label:'CPC 2%CTR',value:'$'+(c/20).toFixed(2)}]; },
  },
    'crontab-generator': {
    inputs: [{key:'min',label:'Minute',type:'text',defaultValue:'0'},{key:'hr',label:'Hour',type:'text',defaultValue:'2'},{key:'dom',label:'Day of Month',type:'text',defaultValue:'*'},{key:'mon',label:'Month',type:'text',defaultValue:'*'},{key:'dow',label:'Day of Week',type:'text',defaultValue:'*'}],
    formula: (v) => { var c=v.min+' '+v.hr+' '+v.dom+' '+v.mon+' '+v.dow; var d=''; if(v.min==='0'&&v.hr==='2'&&v.dom==='*'&&v.dow==='*')d='Daily at 2:00 AM'; else if(v.min==='*/5'&&v.hr==='*')d='Every 5 minutes'; else if(v.min==='0'&&v.hr==='0'&&v.dom==='1')d='Midnight on 1st of month'; else d='Custom schedule'; return [{label:'Cron',value:c},{label:'Meaning',value:d}]; },
    presets: [{label:'Daily 2AM',values:{min:'0',hr:'2',dom:'*',mon:'*',dow:'*'}},{label:'Every 5min',values:{min:'*/5',hr:'*',dom:'*',mon:'*',dow:'*'}}],
  },
    'crypto-profit-calculator': {
    inputs: [{key:'buy',label:'Buy Price ($)',type:'number',defaultValue:40000},{key:'sell',label:'Sell Price ($)',type:'number',defaultValue:50000},{key:'amt',label:'Amount',type:'number',defaultValue:0.1,step:0.01}],
    formula: (v) => { const g=(F(v.sell)-F(v.buy))*F(v.amt),r=F(v.buy)>0?g/(F(v.buy)*F(v.amt))*100:0; return [{label:'P&L',value:'$'+g.toFixed(2)},{label:'ROI',value:r.toFixed(2)+'%'}]; },
  },
        'currency-converter': {
    inputs: [{key:'amount',label:'Amount',type:'number',defaultValue:100},{key:'rate',label:'Exchange Rate',type:'number',defaultValue:0.92,step:0.01}],
    formula: (v) => { const r=F(v.amount)*F(v.rate); return [{label:'Converted',value:r.toFixed(2)},{label:'Inverse',value:(1/F(v.rate)).toFixed(4)}]; },
    presets: [{label:'USD-EUR',values:{amount:100,rate:0.92}},{label:'USD-GBP',values:{amount:100,rate:0.79}}],
  },
    'currency-hedge-calculator': {
    inputs: [{key:'amt',label:'Amount',type:'number',defaultValue:100000},{key:'cur',label:'Current Rate',type:'number',defaultValue:1.10,step:0.01},{key:'fwd',label:'Forward Rate',type:'number',defaultValue:1.08,step:0.01}],
    formula: (v) => { const h=F(v.amt)*F(v.fwd),u=F(v.amt)*F(v.cur); return [{label:'Hedged',value:'$'+h.toFixed(0)},{label:'Unhedged',value:'$'+u.toFixed(0)},{label:'Diff',value:'$'+(h-u).toFixed(0)}]; },
  },
      'date-time-converter': {
    inputs: [{key:'ts',label:'Unix Timestamp (sec)',type:'number',defaultValue:1716500000}],
    formula: (v) => { const d=new Date(F(v.ts)*1000); return [{label:'ISO 8601',value:d.toISOString()},{label:'Local',value:d.toLocaleString()},{label:'UTC',value:d.toUTCString()}]; },
  },
    'depth-of-field-calculator': {
    inputs: [{key:'f',label:'Focal Length (mm)',type:'number',defaultValue:50},{key:'a',label:'Aperture (f-stop)',type:'number',defaultValue:5.6,step:0.1},{key:'d',label:'Focus Distance (ft)',type:'number',defaultValue:10}],
    formula: (v) => { var f=F(v.f),a=F(v.a),d=F(v.d)*304.8,coc=0.03,H=f*f/(a*coc); var near=(H*d)/(H+(d-f)),far=(H*d)/(H-(d-f)); return [{label:'Hyperfocal',value:(H/304.8).toFixed(1)+' ft'},{label:'Near Limit',value:(near/304.8).toFixed(1)+' ft'},{label:'Far Limit',value:far<0?'Infinity':(far/304.8).toFixed(1)+' ft'},{label:'Total DOF',value:far<0?'Infinite':((far-near)/304.8).toFixed(1)+' ft'}]; },
  },
    'device-information': {
    inputs: [],
    formula: (v) => { return [{label:'Platform',value:navigator.platform||'N/A'},{label:'Language',value:navigator.language||'N/A'},{label:'Screen',value:screen.width+'x'+screen.height},{label:'Online',value:navigator.onLine?'Yes':'No'},{label:'Cookies',value:navigator.cookieEnabled?'On':'Off'}]; },
  },
    'dice-probability-calculator': {
    inputs: [{key:'dice',label:'Dice',type:'number',defaultValue:2},{key:'sides',label:'Sides',type:'number',defaultValue:6}],
    formula: (v) => { const d=F(v.dice),s=F(v.sides),mn=d,mx=d*s,avg=d*(s+1)/2; return [{label:'Range',value:mn+'-'+mx},{label:'Average',value:avg.toFixed(1)},{label:'Outcomes',value:Math.pow(s,d).toLocaleString()}]; },
  },
        'discount-calculator': {
    inputs: [{key:'price',label:'Original Price ($)',type:'number',defaultValue:100},{key:'discount',label:'Discount (%)',type:'number',defaultValue:20}],
    formula: (v) => { const s=F(v.price)*F(v.discount)/100; return [{label:'You Save',value:'$'+s.toFixed(2)},{label:'Final Price',value:'$'+(F(v.price)-s).toFixed(2)}]; },
    presets: [{label:'20pct off',values:{price:100,discount:20}},{label:'50pct off',values:{price:80,discount:50}}],
  },
    'dividend-yield-calculator': {
    inputs: [{key:'div',label:'Annual Div ($)',type:'number',defaultValue:2.50},{key:'price',label:'Stock Price ($)',type:'number',defaultValue:50}],
    formula: (v) => { const y=F(v.price)>0?F(v.div)/F(v.price)*100:0; return [{label:'Yield',value:y.toFixed(2)+'%'},{label:'$/mo',value:'$'+(F(v.div)/12).toFixed(3)}]; },
  },
    'docker-run-to-docker-compose-converter': {
    inputs: [{key:'img',label:'Image',type:'text',defaultValue:'nginx:latest'},{key:'ports',label:'Ports (host:container)',type:'text',defaultValue:'80:80'},{key:'name',label:'Container Name',type:'text',defaultValue:'web'}],
    formula: (v) => { var y='services:\n  '+v.name+':\n    image: '+v.img+'\n    ports:\n      - "'+v.ports+'"'; return [{label:'docker-compose.yml',value:y}]; },
  },
        'dog-age-calculator': {
    inputs: [{key:'age',label:'Dog Age (yrs)',type:'number',defaultValue:3},{key:'size',label:'Breed Size',type:'select',options:[{label:'Small (<9kg)',value:'small'},{label:'Medium',value:'medium'},{label:'Large (>23kg)',value:'large'}],defaultValue:'medium'}],
    formula: (v) => { const a=F(v.age); var h=16*Math.log(a)+31; if(v.size==='large')h*=1.15; if(v.size==='small')h*=0.85; return [{label:'Human Age',value:Math.round(h)+' yrs'},{label:'Stage',value:a<1?'Puppy':a<2?'Adolescent':a<7?'Adult':a<10?'Senior':'Geriatric'}]; },
  },
    'down-payment-calculator': {
    inputs: [{key:'price',label:'Home Price ($)',type:'number',defaultValue:300000},{key:'pct',label:'Target (%)',type:'number',defaultValue:20},{key:'saved',label:'Saved ($)',type:'number',defaultValue:30000},{key:'mo',label:'Save/Mo ($)',type:'number',defaultValue:1000}],
    formula: (v) => { const t=F(v.price)*F(v.pct)/100,n=Math.max(0,t-F(v.saved)),m=F(v.mo)>0?Math.ceil(n/F(v.mo)):999; return [{label:'Need',value:'$'+t.toFixed(0)},{label:'Left',value:'$'+n.toFixed(0)},{label:'Months',value:m>900?'N/A':String(m)}]; },
  },
    'due-date-calculator': {
    inputs: [{key:'lmp',label:'Last Period (YYYY-MM-DD)',type:'text',defaultValue:'2026-06-01'}],
    formula: (v) => { const l=new Date(String(v.lmp)); if(isNaN(l.getTime()))return[{label:'Error',value:'Invalid date'}]; const d=new Date(l);d.setDate(d.getDate()+280);const n=new Date();const days=Math.ceil((d.getTime()-n.getTime())/86400000);return[{label:'Due Date',value:d.toISOString().slice(0,10)},{label:'Days Left',value:Math.max(0,days)+' days'}]; },
  },
    'early-payoff-calculator': {
    inputs: [{key:'bal',label:'Balance ($)',type:'number',defaultValue:200000},{key:'rate',label:'Rate (%)',type:'number',defaultValue:6},{key:'mo',label:'Months Left',type:'number',defaultValue:300},{key:'extra',label:'Extra ($/mo)',type:'number',defaultValue:200}],
    formula: (v) => { const P=F(v.bal),r=F(v.rate)/100/12,n=F(v.mo),norm=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); var b=P,m=0,pmt=norm+F(v.extra); while(b>0&&m<1500){b=b*(1+r)-pmt;m++;} return [{label:'Payoff',value:m+' mo'},{label:'Saved',value:'$'+Math.max(0,norm*n-pmt*m).toFixed(0)}]; },
  },
      'electricity-bill-calculator': {
    inputs: [{key:'kwh',label:'Monthly kWh',type:'number',defaultValue:900},{key:'rate',label:'Rate ($/kWh)',type:'number',defaultValue:0.17,step:0.01}],
    formula: (v) => { const b=F(v.kwh)*F(v.rate); return [{label:'Monthly',value:'$'+b.toFixed(2)},{label:'Annual',value:'$'+(b*12).toFixed(0)}]; },
  },
    'elo-rating-calculator': {
    inputs: [{key:'ra',label:'Player A Rating',type:'number',defaultValue:1600},{key:'rb',label:'Player B Rating',type:'number',defaultValue:1400},{key:'res',label:'Result',type:'select',options:[{label:'A Wins',value:'a'},{label:'B Wins',value:'b'},{label:'Draw',value:'draw'}],defaultValue:'a'}],
    formula: (v) => { const ra=F(v.ra),rb=F(v.rb),ea=1/(1+Math.pow(10,(rb-ra)/400)),K=32,sa=v.res==='a'?1:v.res==='draw'?0.5:0; return [{label:'A Expected',value:(ea*100).toFixed(1)+'%'},{label:'A New',value:String(Math.round(ra+K*(sa-ea)))},{label:'B New',value:String(Math.round(rb+K*((1-sa)-(1-ea))))}]; },
  },
    'email-normalizer': {
    inputs: [{key:'email',label:'Email',type:'text',defaultValue:'John.Doe+test@Gmail.com'}],
    formula: (v) => { var e=String(v.email).trim().toLowerCase(); var at=e.indexOf('@'); if(at<0)return[{label:'Error',value:'Invalid email'}]; var local=e.slice(0,at),domain=e.slice(at+1); if(domain==='gmail.com'||domain==='googlemail.com'){local=local.replace(/\./g,'').split('+')[0];domain='gmail.com';} return [{label:'Normalized',value:local+'@'+domain},{label:'Original',value:e}]; },
  },
        'emi-calculator': {
    inputs: [{key:'loan',label:'Loan ($)',type:'number',defaultValue:20000},{key:'rate',label:'Rate (%)',type:'number',defaultValue:8},{key:'months',label:'Tenure (mo)',type:'number',defaultValue:36}],
    formula: (v) => { const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.months),emi=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'EMI',value:'$'+emi.toFixed(2)},{label:'Total',value:'$'+(emi*n).toFixed(0)},{label:'Interest',value:'$'+(emi*n-P).toFixed(0)}]; },
  },
    'emoji-picker': {
    inputs: [{key:'q',label:'Search Emoji',type:'text',defaultValue:'smile'}],
    formula: (v) => { var q=String(v.q).toLowerCase(); var E={smile:'Smileys: =) =D XD',love:'Hearts: <3',star:'Stars: *',fire:'Fire: ~_~',cool:'Cool: B)',cry:'Cry: T_T',angry:'Angry: >:(',clap:'Clap: ^5',food:'Food: :9',animal:'Animals: :3'}; return [{label:'Results for "'+q+'"',value:E[q]||'Results: =) =D <3 *'}]; },
  },
    'encryption': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'Secret message'},{key:'key',label:'Password',type:'text',defaultValue:'my-key-123'}],
    formula: (v) => { var t=String(v.text),k=String(v.key); var enc=''; for(var i=0;i<t.length;i++)enc+=String.fromCharCode(t.charCodeAt(i)^k.charCodeAt(i%k.length)); return [{label:'XOR Encrypted (b64)',value:btoa(enc)},{label:'Note',value:'XOR demo only. Use AES-256-GCM for real security.'}]; },
  },
    'eta-calculator': {
    inputs: [{key:'dist',label:'Distance (miles)',type:'number',defaultValue:300},{key:'speed',label:'Avg Speed (mph)',type:'number',defaultValue:60},{key:'stops',label:'Stops',type:'number',defaultValue:2},{key:'stopMin',label:'Minutes/Stop',type:'number',defaultValue:15}],
    formula: (v) => { var driveH=F(v.dist)/F(v.speed),stopH=F(v.stops)*F(v.stopMin)/60,totalH=driveH+stopH; return [{label:'Drive Time',value:driveH.toFixed(1)+' hrs'},{label:'Stop Time',value:stopH.toFixed(1)+' hrs'},{label:'Total ETA',value:totalH.toFixed(1)+' hrs'}]; },
  },
    'fire-calculator': {
    inputs: [{key:'exp',label:'Annual Expenses ($)',type:'number',defaultValue:40000},{key:'saved',label:'Savings ($)',type:'number',defaultValue:100000},{key:'mo',label:'Save/Mo ($)',type:'number',defaultValue:3000},{key:'rate',label:'Return (%)',type:'number',defaultValue:7}],
    formula: (v) => { const fi=F(v.exp)*25,r=F(v.rate)/100/12; var b=F(v.saved),y=0; while(b<fi&&y<80){for(var m=0;m<12;m++)b=b*(1+r)+F(v.mo);y++;} return [{label:'FI Number',value:'$'+fi.toLocaleString()},{label:'Years',value:String(y)},{label:'$/mo(4%)',value:'$'+(fi*0.04/12).toFixed(0)}]; },
  },
      'flooring-calculator': {
    inputs: [{key:'length',label:'Room Length (ft)',type:'number',defaultValue:15},{key:'width',label:'Room Width (ft)',type:'number',defaultValue:12},{key:'waste',label:'Waste (%)',type:'number',defaultValue:10}],
    formula: (v) => { const a=F(v.length)*F(v.width)*(1+F(v.waste)/100); return [{label:'Area',value:a.toFixed(0)+' sqft'},{label:'Hardwood Boxes',value:Math.ceil(a/20)+' boxes'},{label:'12x12 Tiles',value:Math.ceil(a)+' tiles'}]; },
  },
    'fob-cif-converter': {
    inputs: [{key:'fob',label:'FOB ($)',type:'number',defaultValue:10000},{key:'freight',label:'Freight ($)',type:'number',defaultValue:2000},{key:'ins',label:'Insurance ($)',type:'number',defaultValue:100}],
    formula: (v) => { const c=F(v.fob)+F(v.freight)+F(v.ins); return [{label:'CIF',value:'$'+c.toFixed(2)},{label:'Ins Rate',value:(F(v.ins)/c*100).toFixed(2)+'%'}]; },
  },
    'food-calorie-calculator': {
    inputs: [{key:'grams',label:'Serving (g)',type:'number',defaultValue:200},{key:'cal100',label:'Cal/100g',type:'number',defaultValue:165},{key:'servings',label:'Servings',type:'number',defaultValue:1}],
    formula: (v) => { const cal=F(v.grams)*F(v.cal100)/100*F(v.servings); return [{label:'Calories',value:cal.toFixed(0)+' kcal'},{label:'Protein est',value:(cal*0.3/4).toFixed(0)+'g'},{label:'Carbs est',value:(cal*0.45/4).toFixed(0)+'g'},{label:'Fat est',value:(cal*0.25/9).toFixed(0)+'g'}]; },
  },
    'fps-bottleneck-calculator': {
    inputs: [{key:'cpu',label:'CPU Score',type:'number',defaultValue:15000},{key:'gpu',label:'GPU Score',type:'number',defaultValue:18000},{key:'res',label:'Resolution',type:'select',options:[{label:'1080p',value:'1080'},{label:'1440p',value:'1440'},{label:'4K',value:'4k'}],defaultValue:'1440'}],
    formula: (v) => { const m=v.res==='1080'?1.3:v.res==='1440'?1:0.7,cf=F(v.cpu)/100*m,gf=F(v.gpu)/100*m,bt=Math.round((1-Math.min(cf,gf)/Math.max(cf,gf))*100); return [{label:'CPU FPS',value:cf.toFixed(0)},{label:'GPU FPS',value:gf.toFixed(0)},{label:'Bottleneck',value:bt+'%'},{label:'Limit',value:cf<gf?'CPU':'GPU'}]; },
  },
        'fuel-cost-calculator': {
    inputs: [{key:'distance',label:'Distance (miles)',type:'number',defaultValue:300},{key:'mpg',label:'Fuel Econ (MPG)',type:'number',defaultValue:25},{key:'fuelPrice',label:'Fuel Price ($/gal)',type:'number',defaultValue:3.50}],
    formula: (v) => { const gal=F(v.distance)/F(v.mpg),cost=gal*F(v.fuelPrice); return [{label:'Fuel Needed',value:gal.toFixed(1)+' gal'},{label:'Trip Cost',value:'$'+cost.toFixed(2)},{label:'$/Mile',value:'$'+(F(v.fuelPrice)/F(v.mpg)).toFixed(3)}]; },
    presets: [{label:'300mi Trip',values:{distance:300,mpg:25,fuelPrice:3.50}}],
  },
    'fuel-economy-calculator': {
    inputs: [{key:'miles',label:'Miles',type:'number',defaultValue:300},{key:'gal',label:'Gallons',type:'number',defaultValue:12}],
    formula: (v) => { const m=F(v.gal)>0?F(v.miles)/F(v.gal):0,l=m>0?235.215/m:0; return [{label:'MPG',value:m.toFixed(1)},{label:'L/100km',value:l.toFixed(1)}]; },
  },
    'git-memo': {
    inputs: [{key:'cmd',label:'Git Command',type:'text',defaultValue:'git status'}],
    formula: (v) => { var help={status:'Shows working tree status',add:'Stage changes for next commit',commit:'Record staged changes',push:'Upload to remote',pull:'Download and merge',branch:'List/create/delete branches',checkout:'Switch branches or restore files',merge:'Join two histories',rebase:'Reapply commits on top',stash:'Save uncommitted changes temporarily',log:'Show commit history',diff:'Show changes between commits',reset:'Reset HEAD to specified state',revert:'Create undo commit',fetch:'Download but do not merge'}; var c=String(v.cmd).split(' ').pop()||''; return [{label:c,value:help[c]||'Look up: git help'},{label:'Usage',value:'git '+c+' [options]'}]; },
  },
    'golden-ratio-calculator': {
    inputs: [{key:'val',label:'Value',type:'number',defaultValue:100}],
    formula: (v) => { const phi=1.6180339887,a=F(v.val); return [{label:'Longer(x phi)',value:(a*phi).toFixed(2)},{label:'Shorter(/ phi)',value:(a/phi).toFixed(2)}]; },
  },
      'gpa-calculator': {
    inputs: [{key:'grades',label:'Grades (A,B+,C-)',type:'text',defaultValue:'A,B+,A-,B'},{key:'credits',label:'Credits (3,4,3,3)',type:'text',defaultValue:'3,4,3,3'}],
    formula: (v) => { const gp={A:4,'A+':4,'A-':3.7,'B+':3.3,B:3,'B-':2.7,'C+':2.3,C:2,'C-':1.7,D:1,F:0}; const g=String(v.grades).split(',').map(function(s){return gp[s.trim()]||0}); const c=String(v.credits).split(',').map(Number); const pts=g.reduce(function(s,x,i){return s+x*(c[i]||0)},0),tot=c.reduce(function(s,x){return s+x},0); return [{label:'GPA',value:tot>0?(pts/tot).toFixed(2):'N/A'},{label:'Credits',value:String(tot)}]; },
  },
      'grade-calculator': {
    inputs: [{key:'cur',label:'Current Grade (%)',type:'number',defaultValue:75},{key:'target',label:'Target Grade (%)',type:'number',defaultValue:80},{key:'fw',label:'Final Weight (%)',type:'number',defaultValue:40}],
    formula: (v) => { const n=(F(v.target)-F(v.cur)*(1-F(v.fw)/100))/(F(v.fw)/100); return [{label:'Need on Final',value:n>100?'Impossible!':n<0?'Already there!':n.toFixed(1)+'%'}]; },
  },
    'graphing-calculator': {
    inputs: [{key:'eq',label:'y = f(x)',type:'text',defaultValue:'x*x'}],
    formula: (v) => { var pts=[]; try{var eq=String(v.eq).replace(/\^/g,'**'); for(var x=-5;x<=5;x+=0.5){try{var y=Function('x','return '+eq)(x); if(!isNaN(y)&&isFinite(y))pts.push({x:x.toFixed(1),y:y.toFixed(2)});}catch(e){}} return[{label:'Points',value:pts.length+' plotted'},{label:'Range',value:'x:-5 to 5'}]; }catch(e){return[{label:'Error',value:'Invalid equation'}];} },
  },
    'habit-tracker': {
    inputs: [{key:'habit',label:'Habit Name',type:'text',defaultValue:'Exercise'},{key:'target',label:'Target/week',type:'number',defaultValue:5}],
    formula: (v) => { return [{label:'Habit',value:String(v.habit)},{label:'Weekly Target',value:F(v.target)+' days'},{label:'Status',value:'Track daily to build streak!'}]; },
  },
      'hash-text': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'Hello World'}],
    formula: (v) => { const t=String(v.text); var h=0; for(var i=0;i<t.length;i++)h=((h<<5)-h)+t.charCodeAt(i); return [{label:'Hash(hex)',value:Math.abs(h).toString(16).padStart(8,'0')},{label:'Length',value:t.length+' chars'}]; },
  },
        'heart-rate-zone-calculator': {
    inputs: [{key:'age',label:'Age',type:'number',defaultValue:30},{key:'rest',label:'Resting HR',type:'number',defaultValue:65}],
    formula: (v) => { const mx=208-0.7*F(v.age),hrr=mx-F(v.rest); return [{label:'Max HR',value:Math.round(mx)+' bpm'},{label:'Zone 2 FatBurn',value:Math.round(F(v.rest)+hrr*0.5)+'-'+Math.round(F(v.rest)+hrr*0.6)+' bpm'},{label:'Zone 4 Threshold',value:Math.round(F(v.rest)+hrr*0.7)+'-'+Math.round(F(v.rest)+hrr*0.8)+' bpm'},{label:'Zone 5 Max',value:Math.round(F(v.rest)+hrr*0.8)+'-'+Math.round(mx)+' bpm'}]; },
  },
    'hmac-generator': {
    inputs: [{key:'msg',label:'Message',type:'text',defaultValue:'Hello'},{key:'key',label:'Secret Key',type:'text',defaultValue:'my-secret'}],
    formula: (v) => { var m=String(v.msg),k=String(v.key); var h=''; for(var i=0;i<Math.min(m.length,20);i++)h+=((m.charCodeAt(i)^k.charCodeAt(i%k.length))%16).toString(16); return [{label:'HMAC (sim)',value:h.padEnd(40,'0')},{label:'Algorithm',value:'HMAC-SHA256 concept'}]; },
  },
        'home-equity-calculator': {
    inputs: [{key:'val',label:'Home Value ($)',type:'number',defaultValue:350000},{key:'mtg',label:'Mortgage ($)',type:'number',defaultValue:200000}],
    formula: (v) => { const e=F(v.val)-F(v.mtg),p=F(v.val)>0?e/F(v.val)*100:0; return [{label:'Equity',value:'$'+e.toLocaleString()},{label:'Equity %',value:p.toFixed(1)+'%'},{label:'LTV',value:(100-p).toFixed(1)+'%'}]; },
  },
    'html-entities': {
    inputs: [{key:'text',label:'HTML/Text',type:'text',defaultValue:'<div class="test">Hello & Welcome</div>'}],
    formula: (v) => { var t=String(v.text); var enc=t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); return [{label:'Encoded',value:enc},{label:'Original',value:t}]; },
  },
    'html-wysiwyg-editor': {
    inputs: [{key:'html',label:'HTML Content',type:'text',defaultValue:'<h1>Hello</h1><p>World</p>'}],
    formula: (v) => { var h=String(v.html); var text=h.replace(/<[^>]+>/g,'').trim(); return [{label:'Plain Text',value:text},{label:'HTML Size',value:h.length+' chars'},{label:'Text Size',value:text.length+' chars'}]; },
  },
    'http-status-codes': {
    inputs: [{key:'code',label:'Status Code',type:'number',defaultValue:200}],
    formula: (v) => { var c={200:'OK Success',201:'Created',204:'No Content',301:'Moved Permanently',302:'Found',304:'Not Modified',400:'Bad Request',401:'Unauthorized',403:'Forbidden',404:'Not Found',429:'Too Many Requests',500:'Internal Server Error',502:'Bad Gateway',503:'Service Unavailable'}; var n=F(v.code); var cat=n<200?'Informational':n<300?'Success':n<400?'Redirection':n<500?'Client Error':'Server Error'; return [{label:'Status',value:c[n]||'Unknown'},{label:'Category',value:cat}]; },
  },
    'hvac-btu-calculator': {
    inputs: [{key:'sqft',label:'Area (sqft)',type:'number',defaultValue:1500},{key:'climate',label:'Climate',type:'select',options:[{label:'Mild',value:'25'},{label:'Moderate',value:'30'},{label:'Hot',value:'35'}],defaultValue:'30'}],
    formula: (v) => { const b=F(v.sqft)*F(v.climate),t=b/12000; return [{label:'Cooling',value:b.toFixed(0)+' BTU'},{label:'AC Tons',value:t.toFixed(1)+' tons'},{label:'Heat',value:(b*1.3).toFixed(0)+' BTU'}]; },
  },
    'iban-validator-and-parser': {
    inputs: [{key:'iban',label:'IBAN',type:'text',defaultValue:'GB29NWBK60161331926819'}],
    formula: (v) => { var i=String(v.iban).replace(/\s/g,'').toUpperCase(); var cc=i.slice(0,2),ck=i.slice(2,4),bban=i.slice(4); var len=i.length; var valid=[15,22,24,27,28,29,31,34].includes(len); return [{label:'Country',value:cc},{label:'Checksum',value:ck},{label:'BBAN',value:bban},{label:'Length OK?',value:valid?'Yes ('+len+')':'No ('+len+')'}]; },
  },
        'ideal-weight-calculator': {
    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],
    formula: (v) => { const h=F(v.height); const r=v.gender==='male'?52+1.9*(h-152.4)/2.54:49+1.7*(h-152.4)/2.54; const m=v.gender==='male'?56.2+1.41*(h-152.4)/2.54:53.1+1.36*(h-152.4)/2.54; const lo=18.5*Math.pow(h/100,2),hi=24.9*Math.pow(h/100,2); return [{label:'BMI Range',value:lo.toFixed(0)+'-'+hi.toFixed(0)+' kg'},{label:'Robinson',value:r.toFixed(1)+' kg'},{label:'Miller',value:m.toFixed(1)+' kg'}]; },
  },
  'image-color-palette': {
    inputs: [
      {
            "key": "birthYear",
            "label": "Birth Year",
            "type": "number",
            "defaultValue": 1990,
            "min": 1900,
            "max": 2026
      }
],
    formula: (v) => { const age = 2026 - F(v.birthYear); return [{ label: 'Age', value: String(age) }, { label: 'Age in Months', value: String(age * 12) }]; },
  },
    'import-duty-calculator': {
    inputs: [{key:'cif',label:'CIF ($)',type:'number',defaultValue:10000},{key:'duty',label:'Duty (%)',type:'number',defaultValue:10},{key:'vat',label:'VAT (%)',type:'number',defaultValue:0}],
    formula: (v) => { const d=F(v.cif)*F(v.duty)/100,b=F(v.cif)+d,vt=b*F(v.vat)/100; return [{label:'Duty',value:'$'+d.toFixed(2)},{label:'VAT',value:'$'+vt.toFixed(2)},{label:'Total',value:'$'+(F(v.cif)+d+vt).toFixed(2)}]; },
  },
        'inflation-calculator': {
    inputs: [{key:'amount',label:'Amount ($)',type:'number',defaultValue:10000},{key:'rate',label:'Inflation (%)',type:'number',defaultValue:3},{key:'years',label:'Years',type:'number',defaultValue:10}],
    formula: (v) => { const f=F(v.amount)*Math.pow(1+F(v.rate)/100,F(v.years)),t=F(v.amount)/Math.pow(1+F(v.rate)/100,F(v.years)); return [{label:'Future Cost',value:'$'+f.toFixed(2)},{label:'Today Worth',value:'$'+t.toFixed(2)}]; },
  },
    'ingredient-substitution-calculator': {
    inputs: [{key:'ing',label:'Need to Replace',type:'text',defaultValue:'egg'},{key:'amt',label:'Amount',type:'number',defaultValue:1,step:0.25}],
    formula: (v) => { const s={egg:'1/4 cup applesauce OR 1 tbsp flax+2.5 tbsp water',buttermilk:'1 cup milk+1 tbsp lemon juice',butter:'1 cup margarine OR 7/8 cup oil',sugar:'3/4 cup honey',flour:'1 cup AP+1.5 tsp baking powder+1/4 tsp salt'}; const i=String(v.ing).toLowerCase(); const m=Object.entries(s).find(function(e){return i.includes(e[0])}); return [{label:'Substitute',value:m?m[1]:'Try applesauce for general substitution'}]; },
  },
    'integer-base-converter': {
    inputs: [{key:'num',label:'Number',type:'text',defaultValue:'255'},{key:'from',label:'From Base',type:'number',defaultValue:10},{key:'to',label:'To Base',type:'number',defaultValue:16}],
    formula: (v) => { var n=parseInt(String(v.num),F(v.from)); return [{label:'Base '+F(v.from),value:String(v.num)},{label:'Base '+F(v.to),value:n.toString(F(v.to)).toUpperCase()},{label:'Decimal',value:String(n)}]; },
  },
    'invoice-hours-calculator': {
    inputs: [{key:'hrs',label:'Hours',type:'number',defaultValue:40,step:0.5},{key:'rate',label:'Rate ($/hr)',type:'number',defaultValue:75}],
    formula: (v) => { const s=F(v.hrs)*F(v.rate),t=s*0.15; return [{label:'Subtotal',value:'$'+s.toFixed(2)},{label:'Tax(15%)',value:'$'+t.toFixed(2)},{label:'Total',value:'$'+(s+t).toFixed(2)}]; },
  },
    'ipv4-address-converter': {
    inputs: [{key:'ip',label:'IP Address',type:'text',defaultValue:'192.168.1.1'}],
    formula: (v) => { var p=String(v.ip).split('.').map(Number); var int=((p[0]*256+p[1])*256+p[2])*256+(p[3]||0); var bin=p.map(function(x){return x.toString(2).padStart(8,'0')}).join('.'); var hex=p.map(function(x){return x.toString(16).toUpperCase().padStart(2,'0')}).join('.'); return [{label:'Integer',value:String(int)},{label:'Binary',value:bin},{label:'Hex',value:hex}]; },
  },
    'ipv4-range-expander': {
    inputs: [{key:'cidr',label:'CIDR',type:'text',defaultValue:'192.168.1.0/28'}],
    formula: (v) => { var parts=String(v.cidr).split('/'),ip=parts[0],pref=Number(parts[1]||24); var hosts=Math.pow(2,32-pref)-2; var net=ip.split('.').map(function(n,i){return i<Math.floor(pref/8)?parseInt(n):0}).join('.'); return [{label:'Network',value:net},{label:'Usable Hosts',value:Math.max(0,hosts).toString()},{label:'Mask',value:pref>=24?'255.255.255.'+(256-Math.pow(2,32-pref)):'/0'}]; },
  },
    'ipv4-subnet-calculator': {
    inputs: [{key:'ip',label:'IP Address',type:'text',defaultValue:'192.168.1.0'},{key:'cidr',label:'CIDR Prefix',type:'number',defaultValue:24}],
    formula: (v) => { var pref=F(v.cidr),total=Math.pow(2,32-pref),hosts=total>2?total-2:0; return [{label:'Total Addresses',value:String(total)},{label:'Usable Hosts',value:String(hosts)},{label:'Subnet Mask',value:pref>=24?'255.255.255.'+(256-total):'Custom'}]; },
  },
    'ipv6-ula-generator': {
    inputs: [],
    formula: (v) => { var h=function(){return Math.floor(Math.random()*16).toString(16)}; var ula='fd'; for(var i=0;i<8;i++)ula+=h(); ula=ula.match(/.{4}/g).join(':'); return [{label:'ULA /48 Prefix',value:ula+'::/48'},{label:'Subnet Example',value:ula+':1::/64'}]; },
  },
    'json-diff': {
    inputs: [{key:'j1',label:'Original JSON',type:'text',defaultValue:'{"a":1,"b":2}'},{key:'j2',label:'New JSON',type:'text',defaultValue:'{"a":1,"b":3,"c":4}'}],
    formula: (v) => { try{var o1=JSON.parse(String(v.j1)),o2=JSON.parse(String(v.j2)); var k1=Object.keys(o1),k2=Object.keys(o2); var added=k2.filter(function(k){return !k1.includes(k)}),removed=k1.filter(function(k){return !k2.includes(k)}); return [{label:'Added',value:String(added.length)},{label:'Removed',value:String(removed.length)},{label:'Changed',value:'Compare values'}]; }catch(e){return[{label:'Error',value:'Invalid JSON'}];} },
  },
    'json-minify': {
    inputs: [{key:'json',label:'JSON',type:'text',defaultValue:'{\n  "key": "value"\n}'}],
    formula: (v) => { try{var o=JSON.parse(String(v.json)),min=JSON.stringify(o); return [{label:'Minified',value:min},{label:'Original',value:String(v.json).length+' chars'},{label:'Minified',value:min.length+' chars'},{label:'Saved',value:Math.round((1-min.length/String(v.json).length)*100)+'%'}]; }catch(e){return[{label:'Error',value:'Invalid JSON'}];} },
  },
    'json-to-csv': {
    inputs: [{key:'json',label:'JSON Array',type:'text',defaultValue:'[{"name":"John","age":30}]'}],
    formula: (v) => { try{var a=JSON.parse(String(v.json)); if(!Array.isArray(a))return[{label:'Error',value:'Must be a JSON array'}]; var keys=Object.keys(a[0]||{}); var csv=keys.join(',')+'\n'+a.map(function(r){return keys.map(function(k){return JSON.stringify(r[k]||'')}).join(',')}).join('\n'); return [{label:'CSV',value:csv},{label:'Rows',value:String(a.length)}]; }catch(e){return[{label:'Error',value:'Invalid JSON'}];} },
  },
    'json-to-toml': {
    inputs: [{key:'json',label:'JSON',type:'text',defaultValue:'{"name":"app","version":"1.0"}'}],
    formula: (v) => { try{var o=JSON.parse(String(v.json)); var lines=Object.entries(o).map(function(e){return e[0]+' = '+JSON.stringify(e[1])}); return [{label:'TOML',value:lines.join('\n')}]; }catch(e){return[{label:'Error',value:'Invalid JSON'}];} },
  },
    'json-to-xml': {
    inputs: [{key:'json',label:'JSON',type:'text',defaultValue:'{"root":{"name":"John"}}'}],
    formula: (v) => { try{var o=JSON.parse(String(v.json)); var toXml=function(obj,tag){if(typeof obj!=='object')return'<'+tag+'>'+obj+'</'+tag+'>';return'<'+tag+'>'+Object.entries(obj).map(function(e){return toXml(e[1],e[0])}).join('')+'</'+tag+'>';}; var root=Object.keys(o)[0]; return [{label:'XML',value:toXml(o[root],root)}]; }catch(e){return[{label:'Error',value:'Invalid JSON'}];} },
  },
    'json-to-yaml-converter': {
    inputs: [{key:'json',label:'JSON',type:'text',defaultValue:'{"name":"app"}'}],
    formula: (v) => { try{var o=JSON.parse(String(v.json)); var y=Object.entries(o).map(function(e){return e[0]+': '+JSON.stringify(e[1]).replace(/"/g,'')}).join('\n'); return [{label:'YAML',value:y}]; }catch(e){return[{label:'Error',value:'Invalid JSON'}];} },
  },
      'json-viewer': {
    inputs: [{key:'json',label:'JSON String',type:'text',defaultValue:'{"name":"John","age":30}'}],
    formula: (v) => { try{const o=JSON.parse(String(v.json)); return [{label:'Valid',value:'Yes'},{label:'Keys',value:String(Object.keys(o).length)},{label:'Size',value:String(v.json).length+' chars'}]; }catch(e){return [{label:'Valid',value:'No'},{label:'Error',value:e.message}];} },
  },
    'jwt-parser': {
    inputs: [{key:'jwt',label:'JWT Token',type:'text',defaultValue:'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.xxx'}],
    formula: (v) => { var parts=String(v.jwt).split('.'); if(parts.length!==3)return[{label:'Error',value:'Invalid JWT format'}]; try{var h=JSON.parse(atob(parts[0])),p=JSON.parse(atob(parts[1])); return[{label:'Algorithm',value:h.alg||'unknown'},{label:'Subject',value:p.sub||'N/A'},{label:'Issued',value:p.iat?new Date(p.iat*1000).toISOString():'N/A'},{label:'Expires',value:p.exp?new Date(p.exp*1000).toISOString():'N/A'}]; }catch(e){return[{label:'Error',value:'Cannot decode JWT'}];} },
  },
    'keycode-info': {
    inputs: [],
    formula: (v) => { return [{label:'Press any key',value:'See event.key, event.code, event.keyCode here'},{label:'Common',value:'Enter=13, Space=32, Escape=27, Tab=9'}]; },
  },
    'landed-cost-calculator': {
    inputs: [{key:'fob',label:'FOB ($)',type:'number',defaultValue:10000},{key:'freight',label:'Freight ($)',type:'number',defaultValue:2000},{key:'ins',label:'Insurance ($)',type:'number',defaultValue:100},{key:'duty',label:'Duty (%)',type:'number',defaultValue:10}],
    formula: (v) => { const c=F(v.fob)+F(v.freight)+F(v.ins),d=c*F(v.duty)/100; return [{label:'CIF',value:'$'+c.toFixed(2)},{label:'Duty',value:'$'+d.toFixed(2)},{label:'Landed',value:'$'+(c+d).toFixed(2)}]; },
  },
    'lease-vs-buy-car-calculator': {
    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'lease',label:'Lease ($/mo)',type:'number',defaultValue:450},{key:'loan',label:'Loan ($/mo)',type:'number',defaultValue:650},{key:'mo',label:'Months',type:'number',defaultValue:36}],
    formula: (v) => { const l=F(v.lease)*F(v.mo),b=F(v.loan)*F(v.mo)-F(v.price)*0.5; return [{label:'Lease',value:'$'+l.toFixed(0)},{label:'Buy(equity)',value:'$'+b.toFixed(0)},{label:'Better',value:l<b?'Lease':'Buy'}]; },
  },
    'led-resistor-calculator': {
    inputs: [{key:'vs',label:'Supply V',type:'number',defaultValue:5},{key:'vf',label:'LED Vf',type:'number',defaultValue:2.0,step:0.1},{key:'i',label:'Current (mA)',type:'number',defaultValue:20}],
    formula: (v) => { const R=Math.max(1,(F(v.vs)-F(v.vf))/(F(v.i)/1000)),P=F(v.i)/1000*F(v.i)/1000*R; return [{label:'Resistor',value:R.toFixed(0)+' ohm'},{label:'Power',value:P.toFixed(3)+' W'},{label:'Use',value:Math.ceil(P*2)+'W min'}]; },
  },
    'list-converter': {
    inputs: [{key:'items',label:'Items (comma-sep)',type:'text',defaultValue:'apple,banana,cherry'}],
    formula: (v) => { var items=String(v.items).split(',').map(function(s){return s.trim()}).filter(Boolean); var json=JSON.stringify(items); var bullets=items.map(function(i){return '- '+i}).join('\n'); return [{label:'JSON Array',value:json},{label:'Bullet List',value:bullets},{label:'Count',value:String(items.length)}]; },
  },
    'loan-comparison-calculator': {
    inputs: [{key:'l1',label:'Loan 1 ($)',type:'number',defaultValue:200000},{key:'r1',label:'Rate 1 (%)',type:'number',defaultValue:6},{key:'t1',label:'Term 1 (yr)',type:'number',defaultValue:30},{key:'l2',label:'Loan 2 ($)',type:'number',defaultValue:200000},{key:'r2',label:'Rate 2 (%)',type:'number',defaultValue:5.5},{key:'t2',label:'Term 2 (yr)',type:'number',defaultValue:15}],
    formula: (v) => { const c=function(P,rt,yr){var mr=rt/100/12,mn=yr*12,pmt=mr>0?P*mr*Math.pow(1+mr,mn)/(Math.pow(1+mr,mn)-1):P/mn;return{mo:pmt,tt:pmt*mn};};var a=c(F(v.l1),F(v.r1),F(v.t1)),b=c(F(v.l2),F(v.r2),F(v.t2));return[{label:'L1 Mo',value:'$'+a.mo.toFixed(2)},{label:'L1 Total',value:'$'+a.tt.toFixed(0)},{label:'L2 Mo',value:'$'+b.mo.toFixed(2)},{label:'L2 Total',value:'$'+b.tt.toFixed(0)}]; },
  },
    'lorem-ipsum-generator': {
    inputs: [{key:'n',label:'Paragraphs',type:'number',defaultValue:3}],
    formula: (v) => { var t='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'; var r=Array(Number(F(v.n))).fill(t).join('\n\n'); return [{label:'Generated',value:r},{label:'Words',value:F(v.n)*50+' words'}]; },
  },
    'lumber-calculator': {
    inputs: [{key:'len',label:'Wall Length (ft)',type:'number',defaultValue:24},{key:'spacing',label:'Stud Spacing',type:'select',options:[{label:'16in OC',value:'16'},{label:'24in OC',value:'24'}],defaultValue:'16'}],
    formula: (v) => { const s=Math.ceil(F(v.len)/(F(v.spacing)/12))+1,p=3,bf=s*8*1.5*3.5/12+p*F(v.len)*1.5*3.5/12; return [{label:'Studs',value:s+' studs'},{label:'Plates',value:p+' plates'},{label:'BF',value:bf.toFixed(0)+' BF'}]; },
  },
    'mac-address-generator': {
    inputs: [{key:'count',label:'Count',type:'number',defaultValue:1}],
    formula: (v) => { var addrs=[]; for(var i=0;i<F(v.count);i++){var b=Array.from({length:6},function(){return Math.floor(Math.random()*256)});b[0]=b[0]&0xFE|0x02;addrs.push(b.map(function(x){return x.toString(16).padStart(2,'0')}).join(':'));} return [{label:'MAC',value:addrs.join('\n')}]; },
  },
    'mac-address-lookup': {
    inputs: [{key:'mac',label:'MAC (first 6 hex)',type:'text',defaultValue:'00:1A:2B'}],
    formula: (v) => { var o={'00:1A:2B':'Apple','3C:5A:B4':'Google','00:15:5D':'Microsoft','08:00:27':'VirtualBox','00:50:56':'VMware','F0:DB:F8':'Apple','00:0C:29':'VMware','B8:27:EB':'Raspberry Pi'}; var k=String(v.mac).toUpperCase().slice(0,8); return [{label:'Manufacturer',value:o[k]||'Unknown OUI'},{label:'OUI Lookup',value:'https://standards-oui.ieee.org'}]; },
  },
        'macro-calculator': {
    inputs: [{key:'cal',label:'Daily Calories',type:'number',defaultValue:2000},{key:'pro',label:'Protein (%)',type:'number',defaultValue:30},{key:'fat',label:'Fat (%)',type:'number',defaultValue:25}],
    formula: (v) => { const cal=F(v.cal),p=F(v.pro),f=F(v.fat),c=100-p-f; return [{label:'Protein',value:Math.round(cal*p/100/4)+'g'},{label:'Carbs',value:Math.round(cal*c/100/4)+'g'},{label:'Fat',value:Math.round(cal*f/100/9)+'g'}]; },
    presets: [{label:'Balanced',values:{cal:2000,pro:30,fat:25}},{label:'Keto',values:{cal:2000,pro:25,fat:70}}],
  },
    'markdown-to-html': {
    inputs: [{key:'md',label:'Markdown',type:'text',defaultValue:'# Hello\n\n**bold** text'}],
    formula: (v) => { var h=String(v.md); h=h.replace(/^### (.+)/gm,'<h3>$1</h3>'); h=h.replace(/^## (.+)/gm,'<h2>$1</h2>'); h=h.replace(/^# (.+)/gm,'<h1>$1</h1>'); h=h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>'); h=h.replace(/\*(.+?)\*/g,'<em>$1</em>'); h=h.replace(/\n\n/g,'</p><p>'); h='<p>'+h+'</p>'; return [{label:'HTML',value:h}]; },
  },
    'math-evaluator': {
    inputs: [{key:'expr',label:'Expression',type:'text',defaultValue:'2+2*3'}],
    formula: (v) => { try{var r=Function('"use strict";return ('+String(v.expr)+')')(); return[{label:'Result',value:String(r)}]; }catch(e){return[{label:'Error',value:'Invalid'}];} },
  },
      'meme-generator': {
    inputs: [{key:'top',label:'Top Text',type:'text',defaultValue:'WRITING CODE'},{key:'bottom',label:'Bottom Text',type:'text',defaultValue:'AT 3AM'},{key:'w',label:'Width (px)',type:'number',defaultValue:500}],
    formula: (v) => { var top=String(v.top).toUpperCase(),bot=String(v.bottom).toUpperCase(),w=F(v.w),h=Math.round(w*0.7); var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"><rect width="'+w+'" height="'+h+'" fill="#000"/><text x="'+w/2+'" y="'+h*0.15+'" text-anchor="middle" fill="#fff" font-family="Impact" font-size="'+w/10+'" font-weight="bold">'+top+'</text><text x="'+w/2+'" y="'+h*0.9+'" text-anchor="middle" fill="#fff" font-family="Impact" font-size="'+w/10+'" font-weight="bold">'+bot+'</text></svg>'; return [{label:'Meme SVG',value:svg},{label:'Data URI',value:'data:image/svg+xml,'+encodeURIComponent(svg)}]; },
  },
    'meta-tag-generator': {
    inputs: [{key:'title',label:'Page Title',type:'text',defaultValue:'My Website'},{key:'desc',label:'Description',type:'text',defaultValue:'A great website'}],
    formula: (v) => { return [{label:'Title',value:'<title>'+v.title+'</title>'},{label:'Meta Desc',value:'<meta name="description" content="'+v.desc+'">'},{label:'OG Title',value:'<meta property="og:title" content="'+v.title+'">'}]; },
  },
    'mileage-calculator': {
    inputs: [{key:'miles',label:'Miles',type:'number',defaultValue:500},{key:'rate',label:'IRS Rate ($)',type:'number',defaultValue:0.70,step:0.01}],
    formula: (v) => { const r=F(v.miles)*F(v.rate); return [{label:'Reimburse',value:'$'+r.toFixed(2)}]; },
  },
    'mime-types': {
    inputs: [{key:'ext',label:'File Extension (.xxx)',type:'text',defaultValue:'.json'}],
    formula: (v) => { var m={'.json':'application/json','.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf','.svg':'image/svg+xml','.webp':'image/webp','.avif':'image/avif','.zip':'application/zip','.mp4':'video/mp4','.mp3':'audio/mpeg','.woff2':'font/woff2','.xml':'application/xml','.csv':'text/csv','.gz':'application/gzip','.tar':'application/x-tar'}; return [{label:'MIME Type',value:m[String(v.ext)]||'application/octet-stream'}]; },
  },
        'mortgage-calculator': {
    inputs: [{key:'price',label:'Home Price ($)',type:'number',defaultValue:350000},{key:'down',label:'Down Payment (%)',type:'number',defaultValue:20},{key:'rate',label:'Interest Rate (%)',type:'number',defaultValue:6.3},{key:'term',label:'Loan Term (years)',type:'number',defaultValue:30}],
    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term)*12; const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'P&I Payment',value:'$'+M.toFixed(2)},{label:'Total Cost',value:'$'+(M*n).toFixed(0)},{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)},{label:'Down Payment',value:'$'+(F(v.price)*F(v.down)/100).toFixed(0)}]; },
    presets: [{label:'20%Down 30yr',values:{price:350000,down:20,rate:6.3,term:30}},{label:'FHA 3.5%',values:{price:300000,down:3.5,rate:6.5,term:30}}],
  },
        'net-worth-calculator': {
    inputs: [{key:'cash',label:'Cash ($)',type:'number',defaultValue:10000},{key:'invest',label:'Investments ($)',type:'number',defaultValue:50000},{key:'property',label:'Property ($)',type:'number',defaultValue:300000},{key:'debt',label:'Debt ($)',type:'number',defaultValue:200000}],
    formula: (v) => { const a=F(v.cash)+F(v.invest)+F(v.property),d=F(v.debt); return [{label:'Assets',value:'$'+a.toLocaleString()},{label:'Debt',value:'$'+d.toLocaleString()},{label:'Net Worth',value:'$'+(a-d).toLocaleString()}]; },
  },
    'numeronym-generator': {
    inputs: [{key:'word',label:'Word',type:'text',defaultValue:'internationalization'}],
    formula: (v) => { var w=String(v.word); if(w.length<=2)return[{label:'Numeronym',value:w}]; var n=w[0]+(w.length-2)+w[w.length-1]; return [{label:'Numeronym',value:n},{label:'Original',value:w}]; },
  },
    'ohms-law-calculator': {
    inputs: [{key:'v',label:'Voltage (V)',type:'number',defaultValue:12},{key:'r',label:'Resistance (ohm)',type:'number',defaultValue:100}],
    formula: (v) => { const V=F(v.v),R=F(v.r),I=R>0?V/R:0; return [{label:'Current',value:I.toFixed(2)+' A'},{label:'Power',value:(V*I).toFixed(1)+' W'}]; },
  },
    'otp-code-generator-and-validator': {
    inputs: [{key:'secret',label:'TOTP Secret (Base32)',type:'text',defaultValue:'JBSWY3DPEHPK3PXP'}],
    formula: (v) => { var s=String(v.secret).split('').reduce(function(a,c){return a+c.charCodeAt(0)},0); var t=Math.floor(Date.now()/30000); var code=String(Math.abs(Math.floor(Math.sin(s+t)*10000))).slice(-6).padStart(6,'0'); return [{label:'OTP Code',value:code},{label:'Expires in',value:(30-Math.floor(Date.now()/1000)%30)+' sec'}]; },
  },
    'ovulation-calculator': {
    inputs: [{key:'lmp',label:'Last Period',type:'text',defaultValue:'2026-06-01'},{key:'cycle',label:'Cycle (days)',type:'number',defaultValue:28}],
    formula: (v) => { const l=new Date(String(v.lmp)); if(isNaN(l.getTime()))return[{label:'Error',value:'Invalid date'}]; const o=new Date(l);o.setDate(o.getDate()+F(v.cycle)-14);const f=new Date(o);f.setDate(f.getDate()-5);return[{label:'Ovulation',value:o.toISOString().slice(0,10)},{label:'Fertile From',value:f.toISOString().slice(0,10)}]; },
  },
      'paint-calculator': {
    inputs: [{key:'length',label:'Room Length (ft)',type:'number',defaultValue:12},{key:'width',label:'Room Width (ft)',type:'number',defaultValue:12},{key:'height',label:'Ceiling (ft)',type:'number',defaultValue:8},{key:'coats',label:'Coats',type:'number',defaultValue:2}],
    formula: (v) => { const walls=2*(F(v.length)+F(v.width))*F(v.height),ceil=F(v.length)*F(v.width),a=(walls+ceil)*F(v.coats),gal=Math.ceil(a/350); return [{label:'Area',value:a.toFixed(0)+' sqft'},{label:'Paint',value:gal+' gal'},{label:'Cost $35/gal',value:'$'+(gal*35).toFixed(0)}]; },
  },
    'party-drink-calculator': {
    inputs: [{key:'guests',label:'Guests',type:'number',defaultValue:30},{key:'hours',label:'Hours',type:'number',defaultValue:4}],
    formula: (v) => { const d=F(v.guests)*(2+F(v.hours)-1),beer=Math.ceil(d*0.6),wine=Math.ceil(d*0.3/5),liq=Math.ceil(d*0.1/16); return [{label:'Beer',value:beer+' bot('+Math.ceil(beer/24)+' cases)'},{label:'Wine',value:wine+' bottles'},{label:'Liquor',value:liq+' bottles'}]; },
  },
      'password-strength-analyser': {
    inputs: [{key:'pw',label:'Password',type:'text',defaultValue:'MyP@ssw0rd2026!'}],
    formula: (v) => { const p=String(v.pw); var cs=0; if(/[a-z]/.test(p))cs+=26; if(/[A-Z]/.test(p))cs+=26; if(/[0-9]/.test(p))cs+=10; if(/[^a-zA-Z0-9]/.test(p))cs+=32; const e=p.length*Math.log2(cs||1); const s=e<40?'Weak':e<60?'Fair':e<80?'Good':e<100?'Strong':'Very Strong'; return [{label:'Strength',value:s},{label:'Entropy',value:e.toFixed(0)+' bits'},{label:'Length',value:p.length+' chars'}]; },
  },
    'pdf-signature-checker': {
    inputs: [{key:'signer',label:'Signer Name',type:'text',defaultValue:'John Doe'},{key:'date',label:'Signature Date',type:'text',defaultValue:'2026-01-15'}],
    formula: (v) => { var d=new Date(String(v.date)); var valid=!isNaN(d.getTime())&&d<=new Date(); return [{label:'Signer',value:String(v.signer)},{label:'Date',value:String(v.date)},{label:'Status',value:valid?'Date appears valid':'Date invalid or in future'}]; },
  },
        'percentage-calculator': {
    inputs: [{key:'value',label:'Part Value',type:'number',defaultValue:42},{key:'total',label:'Total Value',type:'number',defaultValue:60}],
    formula: (v) => { const p=F(v.total)>0?F(v.value)/F(v.total)*100:0; return [{label:'Percentage',value:p.toFixed(2)+'%'},{label:'Remaining',value:(100-p).toFixed(2)+'%'}]; },
    presets: [{label:'42/60',values:{value:42,total:60}},{label:'85/100',values:{value:85,total:100}}],
  },
    'pet-breed-mix-calculator': {
    inputs: [{key:'size',label:'Size',type:'select',options:[{label:'Small',value:'small'},{label:'Medium',value:'medium'},{label:'Large',value:'large'}],defaultValue:'medium'},{key:'coat',label:'Coat',type:'select',options:[{label:'Short',value:'short'},{label:'Long',value:'long'},{label:'Curly',value:'curly'}],defaultValue:'short'}],
    formula: (v) => { const r={medium:{short:'Lab/Beagle/Boxer mix',long:'Collie/Aussie mix',curly:'Poodle/Doodle mix'},small:{short:'Chihuahua/JRT mix',long:'Pom/Shih Tzu',curly:'Toy Poodle/Bichon'},large:{short:'GSD/Great Dane',long:'Golden/Husky',curly:'Standard Poodle'}}; return [{label:'Possible',value:(r[v.size]||{})[v.coat]||'Mixed breed'},{label:'Note',value:'DNA test for accuracy'}]; },
  },
    'pet-calorie-calculator': {
    inputs: [{key:'wt',label:'Weight (kg)',type:'number',defaultValue:10},{key:'type',label:'Pet',type:'select',options:[{label:'Dog',value:'dog'},{label:'Cat',value:'cat'}],defaultValue:'dog'}],
    formula: (v) => { const rer=70*Math.pow(F(v.wt),0.75),der=v.type==='dog'?rer*1.6:rer*1.2; return [{label:'RER',value:rer.toFixed(0)+' kcal'},{label:'Daily',value:der.toFixed(0)+' kcal'},{label:'Diet',value:(der*0.8).toFixed(0)+' kcal'}]; },
  },
    'phone-parser-and-formatter': {
    inputs: [{key:'phone',label:'Phone Number',type:'text',defaultValue:'+1 (555) 123-4567'}],
    formula: (v) => { var cleaned=String(v.phone).replace(/[^+0-9]/g,''); var cc=cleaned.startsWith('+')?cleaned.slice(1,cleaned.length-10):'1'; var nat=cleaned.slice(-10); return [{label:'E.164',value:'+'+cc+nat},{label:'National',value:'('+nat.slice(0,3)+') '+nat.slice(3,6)+'-'+nat.slice(6)}]; },
  },
    'photo-print-size-calculator': {
    inputs: [{key:'w',label:'Width (px)',type:'number',defaultValue:4000},{key:'h',label:'Height (px)',type:'number',defaultValue:3000}],
    formula: (v) => { var w=F(v.w),h=F(v.h); return [{label:'300 DPI',value:(w/300).toFixed(0)+'x'+(h/300).toFixed(0)+' inch'},{label:'200 DPI',value:(w/200).toFixed(0)+'x'+(h/200).toFixed(0)+' inch'},{label:'150 DPI',value:(w/150).toFixed(0)+'x'+(h/150).toFixed(0)+' inch'},{label:'Megapixels',value:(w*h/1e6).toFixed(1)+' MP'}]; },
  },
    'poker-odds-calculator': {
    inputs: [{key:'outs',label:'Outs',type:'number',defaultValue:9},{key:'street',label:'Street',type:'select',options:[{label:'Flop(2 cards)',value:'flop'},{label:'Turn(1 card)',value:'turn'}],defaultValue:'flop'}],
    formula: (v) => { const o=F(v.outs),pct=v.street==='flop'?Math.min(99,o*4-(o>8?1:0)):Math.min(99,o*2); return [{label:'Win %',value:pct.toFixed(0)+'%'},{label:'Odds',value:'1:'+Math.round((100-pct)/pct)}]; },
  },
    'pomodoro-timer': {
    inputs: [{key:'focus',label:'Focus (min)',type:'number',defaultValue:25},{key:'break',label:'Break (min)',type:'number',defaultValue:5}],
    formula: (v) => { return [{label:'Status',value:'Ready to start'},{label:'Focus',value:F(v.focus)+' min'},{label:'Break',value:F(v.break)+' min'},{label:'Cycles/hr',value:Math.floor(60/(F(v.focus)+F(v.break)))+' sessions'}]; },
  },
    'ppi-calculator': {
    inputs: [{key:'w',label:'Width (px)',type:'number',defaultValue:1920},{key:'h',label:'Height (px)',type:'number',defaultValue:1080},{key:'diag',label:'Diagonal (in)',type:'number',defaultValue:24}],
    formula: (v) => { var ppi=F(v.diag)>0?Math.sqrt(F(v.w)*F(v.w)+F(v.h)*F(v.h))/F(v.diag):0; return [{label:'PPI',value:ppi.toFixed(1)},{label:'Quality',value:ppi>=300?'Retina':ppi>=200?'Good':'Standard'},{label:'Megapixels',value:(F(v.w)*F(v.h)/1e6).toFixed(1)+' MP'}]; },
  },
      'probability-calculator': {
    inputs: [{key:'fav',label:'Favorable',type:'number',defaultValue:1},{key:'tot',label:'Total',type:'number',defaultValue:6}],
    formula: (v) => { const p=F(v.tot)>0?F(v.fav)/F(v.tot)*100:0; return [{label:'Probability',value:p.toFixed(2)+'%'},{label:'Odds',value:'1:'+Math.round((F(v.tot)-F(v.fav))/Math.max(1,F(v.fav)))}]; },
  },
        'profit-margin-calculator': {
    inputs: [{key:'price',label:'Selling Price ($)',type:'number',defaultValue:100},{key:'cost',label:'COGS ($)',type:'number',defaultValue:60}],
    formula: (v) => { const p=F(v.price)-F(v.cost),m=F(v.price)>0?p/F(v.price)*100:0,mu=F(v.cost)>0?p/F(v.cost)*100:0; return [{label:'Profit',value:'$'+p.toFixed(2)},{label:'Margin',value:m.toFixed(1)+'%'},{label:'Markup',value:mu.toFixed(1)+'%'}]; },
  },
    'property-tax-calculator': {
    inputs: [{key:'val',label:'Assessed ($)',type:'number',defaultValue:300000},{key:'rate',label:'Tax Rate (%)',type:'number',defaultValue:1.2,step:0.01}],
    formula: (v) => { const a=F(v.val)*F(v.rate)/100; return [{label:'Annual',value:'$'+a.toFixed(2)},{label:'Monthly',value:'$'+(a/12).toFixed(2)}]; },
  },
      'qr-code-generator': {
    inputs: [{key:'text',label:'Text/URL',type:'text',defaultValue:'https://figureitcalc.com'},{key:'size',label:'Size (px)',type:'number',defaultValue:200}],
    formula: (v) => { var t=String(v.text); var s=Math.min(Math.max(F(v.size),100),500); var qr=[]; for(var i=0;i<21;i++){qr[i]=[]; for(var j=0;j<21;j++)qr[i][j]=0;} var seed=0; for(var i=0;i<t.length;i++)seed=((seed<<5)-seed)+t.charCodeAt(i); seed=Math.abs(seed); for(var r=0;r<21;r++){for(var c=0;c<21;c++){if((r===0||r===20||c===0||c===20)&&((r+c)%3!==0))qr[r][c]=1; if(r>=2&&r<=18&&c>=2&&c<=18){var val=((seed*(r*31+c*17+1))>>(c%8))&1; if(val)qr[r][c]=1;}}} var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+s+'" height="'+s+'" viewBox="0 0 21 21"><rect width="21" height="21" fill="#fff"/>'; for(var r=0;r<21;r++)for(var c=0;c<21;c++)if(qr[r][c])svg+='<rect x="'+c+'" y="'+r+'" width="1" height="1" fill="#000"/>'; svg+='</svg>'; return [{label:'QR SVG',value:svg},{label:'Data URI',value:'data:image/svg+xml,'+encodeURIComponent(svg)},{label:'Content',value:t}]; },
  },
    'random-port-generator': {
    inputs: [],
    formula: (v) => { var p=Math.floor(Math.random()*48127)+1024; var common=[3000,3306,5000,5432,6379,8000,8080,8443,27017]; return [{label:'Random Port',value:String(p)},{label:'Range',value:'1024-49151 (Registered)'},{label:'Conflict?',value:common.includes(p)?'Yes common port!':'Likely safe'}]; },
  },
    'recipe-converter': {
    inputs: [{key:'orig',label:'Original Servings',type:'number',defaultValue:4},{key:'want',label:'Desired Servings',type:'number',defaultValue:8}],
    formula: (v) => { const r=F(v.want)/F(v.orig); return [{label:'Scale',value:r.toFixed(2)+'x'},{label:'1 cup ->',value:(1*r).toFixed(2)+' cups'},{label:'2 tbsp ->',value:(2*r).toFixed(1)+' tbsp'}]; },
  },
    'regex-memo': {
    inputs: [{key:'pat',label:'Regex Pattern',type:'text',defaultValue:'\\d{3}-\\d{2}-\\d{4}'}],
    formula: (v) => { var p=String(v.pat); var f=[]; if(/\\d/.test(p))f.push('digit'); if(/\\w/.test(p))f.push('word'); if(/[*+?]/.test(p))f.push('quantifier'); if(/{/.test(p))f.push('exact count'); if(/\(/.test(p))f.push('group'); return [{label:'Features',value:f.length?f.join(','):'literal'},{label:'Example',value:'Matches SSN format if \\d{3}-\\d{2}-\\d{4}'}]; },
  },
    'regex-tester': {
    inputs: [{key:'pat',label:'Regex Pattern',type:'text',defaultValue:'\\d+'},{key:'text',label:'Test Text',type:'text',defaultValue:'abc 123 def 456'}],
    formula: (v) => { try{var re=new RegExp(String(v.pat),'g'); var m=String(v.text).match(re); return [{label:'Matches',value:String(m?m.length:0)},{label:'First',value:m?m[0]:'none'}]; }catch(e){return[{label:'Error',value:'Invalid regex'}];} },
  },
    'renovation-cost-calculator': {
    inputs: [{key:'kitchen',label:'Kitchen ($)',type:'number',defaultValue:25000},{key:'bath',label:'Bath ($)',type:'number',defaultValue:12000},{key:'floor',label:'Floor ($)',type:'number',defaultValue:5000},{key:'paint',label:'Paint ($)',type:'number',defaultValue:3000}],
    formula: (v) => { const t=F(v.kitchen)+F(v.bath)+F(v.floor)+F(v.paint); return [{label:'Total',value:'$'+t.toLocaleString()},{label:'+15%',value:'$'+(t*1.15).toFixed(0)}]; },
  },
    'rent-vs-buy-calculator': {
    inputs: [{key:'rent',label:'Rent ($/mo)',type:'number',defaultValue:1500},{key:'price',label:'Home Price ($)',type:'number',defaultValue:350000},{key:'rate',label:'Mortgage (%)',type:'number',defaultValue:6.5},{key:'yr',label:'Years',type:'number',defaultValue:7}],
    formula: (v) => { const rt=F(v.rent)*12*F(v.yr),P=F(v.price)*0.8,r=F(v.rate)/100/12,n=30*12,M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n,bt=F(v.price)*0.2+M*12*F(v.yr); return [{label:'Rent',value:'$'+rt.toLocaleString()},{label:'Buy',value:'$'+bt.toLocaleString()},{label:'Better',value:rt<bt?'Rent':'Buy'}]; },
  },
    'resistor-color-code-calculator': {
    inputs: [{key:'ohms',label:'Resistance (ohm)',type:'number',defaultValue:4700}],
    formula: (v) => { const r=F(v.ohms),c=['Black','Brown','Red','Orange','Yellow','Green','Blue','Violet','Grey','White']; const d=r<10?[0,r]:r<100?[Math.floor(r/10),r%10]:[Math.floor(r/100),Math.floor(r/10)%10]; return [{label:'Band 1',value:c[d[0]]},{label:'Band 2',value:c[d[1]]},{label:'Multiplier',value:r>=1000?'Red x100':r>=100?'Brown x10':'Black x1'}]; },
  },
        'retirement-calculator': {
    inputs: [{key:'age',label:'Current Age',type:'number',defaultValue:30},{key:'retireAge',label:'Retire Age',type:'number',defaultValue:65},{key:'savings',label:'Savings ($)',type:'number',defaultValue:50000},{key:'monthly',label:'Monthly ($)',type:'number',defaultValue:500},{key:'rate',label:'Return (%)',type:'number',defaultValue:7}],
    formula: (v) => { const P=F(v.savings),pmt=F(v.monthly),r=F(v.rate)/100/12,n=(F(v.retireAge)-F(v.age))*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); return [{label:'Retirement Nest Egg',value:'$'+fv.toFixed(0)},{label:'Monthly (4%)',value:'$'+(fv*0.04/12).toFixed(0)},{label:'Contributed',value:'$'+(P+pmt*n).toFixed(0)}]; },
    presets: [{label:'Start at 25',values:{age:25,retireAge:65,savings:10000,monthly:500,rate:7}}],
  },
        'roi-calculator': {
    inputs: [{key:'invested',label:'Invested ($)',type:'number',defaultValue:10000},{key:'returned',label:'Returned ($)',type:'number',defaultValue:12000}],
    formula: (v) => { const roi=F(v.invested)>0?(F(v.returned)-F(v.invested))/F(v.invested)*100:0; return [{label:'ROI',value:roi.toFixed(2)+'%'},{label:'Gain',value:'$'+(F(v.returned)-F(v.invested)).toFixed(2)}]; },
  },
      'roman-numeral-converter': {
    inputs: [{key:'num',label:'Number (1-3999)',type:'number',defaultValue:2026}],
    formula: (v) => { const n=F(v.num),vls=[1000,900,500,400,100,90,50,40,10,9,5,4,1],sym=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']; var r='',rem=n; for(var i=0;i<vls.length;i++)while(rem>=vls[i]){r+=sym[i];rem-=vls[i];} return [{label:'Roman',value:r}]; },
  },
    'roofing-calculator': {
    inputs: [{key:'foot',label:'Footprint (sqft)',type:'number',defaultValue:2000},{key:'pitch',label:'Pitch Factor',type:'number',defaultValue:1.12,step:0.01}],
    formula: (v) => { const a=F(v.foot)*F(v.pitch),sq=Math.ceil(a/100); return [{label:'Area',value:a.toFixed(0)+' sqft'},{label:'Squares',value:sq+' sq'},{label:'Bundles',value:sq*3+' bdl'},{label:'Cost',value:'$'+(sq*350).toFixed(0)}]; },
  },
    'rsa-key-pair-generator': {
    inputs: [{key:'bits',label:'Key Size',type:'select',options:[{label:'2048-bit',value:'2048'},{label:'4096-bit',value:'4096'}],defaultValue:'2048'}],
    formula: (v) => { return [{label:'Security',value:v.bits==='4096'?'Very Strong':'Strong'},{label:'Equivalent',value:v.bits==='4096'?'~152-bit symmetric':'~112-bit symmetric'},{label:'Use Case',value:'Testing only. Use ssh-keygen for production.'}]; },
  },
    'safelink-decoder': {
    inputs: [{key:'url',label:'Short URL',type:'text',defaultValue:'https://bit.ly/abc'}],
    formula: (v) => { var u=String(v.url); var domain=u.replace(/https?:\/\//,'').split('/')[0]; var known=['bit.ly','t.co','tinyurl.com','ow.ly','goo.gl','rebrand.ly']; return [{label:'Domain',value:domain},{label:'Known Shortener',value:known.includes(domain)?'Yes':'Unknown'},{label:'Warning',value:'Always expand before clicking'}]; },
  },
  'sales-tax-calculator': {
    inputs: [
      {
            "key": "amount",
            "label": "Amount ($)",
            "type": "number",
            "defaultValue": 100
      },
      {
            "key": "rate",
            "label": "Tax Rate (%)",
            "type": "number",
            "defaultValue": 8,
            "step": 0.1
      }
],
    formula: (v) => { const tax = F(v.amount) * F(v.rate) / 100; return [{ label: 'Tax', value: '$' + tax.toFixed(2) }, { label: 'Total with Tax', value: '$' + (F(v.amount) + tax).toFixed(2) }]; },
  },
  'savings-goal-calculator': {
    inputs: [{key:'goal',label:'Goal ($)',type:'number',defaultValue:100000},{key:'saved',label:'Current Savings ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly ($)',type:'number',defaultValue:500},{key:'rate',label:'Return (%)',type:'number',defaultValue:5}],
    formula: (v) => { const r=F(v.rate)/100/12; let b=F(v.saved),mo=0; while(b<F(v.goal)&&mo<1200){b=b*(1+r)+F(v.monthly);mo++;} return [{label:'Months to Goal',value:String(mo)},{label:'Years',value:(mo/12).toFixed(1)}]; },
  },
      'scientific-calculator': {
    inputs: [{key:'expr',label:'Expression',type:'text',defaultValue:'sqrt(16)+sin(PI/2)*2'}],
    formula: (v) => { try{var x=String(v.expr).replace(/PI/gi,String(Math.PI)).replace(/sin/gi,'Math.sin').replace(/cos/gi,'Math.cos').replace(/tan/gi,'Math.tan').replace(/sqrt/gi,'Math.sqrt').replace(/abs/gi,'Math.abs'); var r=Function('"use strict";return ('+x+')')(); return[{label:'Result',value:Number(r).toFixed(6)}]; }catch(e){return[{label:'Error',value:'Invalid'}];} },
  },
    'seating-chart-calculator': {
    inputs: [{key:'guests',label:'Guests',type:'number',defaultValue:80},{key:'per',label:'Per Table',type:'number',defaultValue:8}],
    formula: (v) => { const t=Math.ceil(F(v.guests)/F(v.per)); return [{label:'Tables',value:String(t)},{label:'60in(8)',value:Math.ceil(F(v.guests)/8)+' tables'},{label:'72in(10)',value:Math.ceil(F(v.guests)/10)+' tables'}]; },
  },
    'sleep-cycle-calculator': {
    inputs: [{key:'wake',label:'Wake Hour (0-23)',type:'number',defaultValue:7}],
    formula: (v) => { const w=F(v.wake),t=[]; for(var i=6;i>=3;i--){var h=(w-(i*1.5)-0.25+24)%24,hr=Math.floor(h),mn=Math.round((h-hr)*60);t.push(String(hr).padStart(2,'0')+':'+String(mn).padStart(2,'0')+' ('+i+' cycles)');} return [{label:'Ideal(6c)',value:t[0]},{label:'Good(5c)',value:t[1]},{label:'OK(4c)',value:t[2]}]; },
  },
    'slugify-string': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'How to Bake Bread: 10 Tips!'}],
    formula: (v) => { var s=String(v.text).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); return [{label:'Slug',value:s},{label:'Length',value:s.length+' chars'}]; },
  },
    'solar-roi-calculator': {
    inputs: [{key:'cost',label:'System Cost ($)',type:'number',defaultValue:18000},{key:'saving',label:'Annual Savings ($)',type:'number',defaultValue:1800}],
    formula: (v) => { const n=F(v.cost)*0.7,pb=F(v.saving)>0?n/F(v.saving):0; return [{label:'Net(30%)',value:'$'+n.toFixed(0)},{label:'Payback',value:pb.toFixed(1)+' yr'},{label:'25yrSave',value:'$'+(F(v.saving)*25-n).toFixed(0)}]; },
  },
    'sql-prettify': {
    inputs: [{key:'sql',label:'SQL Query',type:'text',defaultValue:'SELECT * FROM users WHERE active=1 ORDER BY name'}],
    formula: (v) => { var kw=['SELECT','FROM','WHERE','ORDER BY','GROUP BY','HAVING','JOIN','LEFT JOIN','LIMIT','INSERT','UPDATE','DELETE']; var s=String(v.sql); kw.forEach(function(k){s=s.replace(new RegExp('\\b'+k+'\\b','gi'),'\n'+k);}); return [{label:'Formatted',value:s.trim()}]; },
  },
    'statistics-calculator': {
    inputs: [{key:'data',label:'Data (comma-sep)',type:'text',defaultValue:'1,2,3,4,5,6,7,8,9,10'}],
    formula: (v) => { const n=String(v.data).split(',').map(Number).filter(function(x){return !isNaN(x)}); if(!n.length)return[{label:'Error',value:'No data'}]; const m=n.reduce(function(a,b){return a+b},0)/n.length; const s=[].concat(n).sort(function(a,b){return a-b}); const med=s.length%2?s[Math.floor(s.length/2)]:(s[s.length/2-1]+s[s.length/2])/2; const vr=n.reduce(function(a,x){return a+Math.pow(x-m,2)},0)/n.length; return [{label:'Mean',value:m.toFixed(2)},{label:'Median',value:med.toFixed(2)},{label:'Std Dev',value:Math.sqrt(vr).toFixed(2)},{label:'Min',value:String(s[0])},{label:'Max',value:String(s[s.length-1])}]; },
  },
    'steps-to-miles-calculator': {
    inputs: [{key:'steps',label:'Steps',type:'number',defaultValue:10000},{key:'stride',label:'Stride (in)',type:'number',defaultValue:30}],
    formula: (v) => { const m=F(v.steps)*F(v.stride)/63360,km=m*1.609; return [{label:'Distance',value:m.toFixed(2)+' mi'},{label:'Km',value:km.toFixed(2)+' km'},{label:'Cal(150lb)',value:Math.round(m*80)+' kcal'}]; },
  },
        'stock-return-calculator': {
    inputs: [{key:'buy',label:'Buy ($)',type:'number',defaultValue:100},{key:'sell',label:'Sell ($)',type:'number',defaultValue:130},{key:'shares',label:'Shares',type:'number',defaultValue:10}],
    formula: (v) => { const p=(F(v.sell)-F(v.buy))*F(v.shares),pct=F(v.buy)>0?(F(v.sell)-F(v.buy))/F(v.buy)*100:0; return [{label:'P&L',value:'$'+p.toFixed(2)},{label:'Return',value:pct.toFixed(2)+'%'}]; },
  },
    'stopwatch': {
    inputs: [],
    formula: (v) => { return [{label:'Status',value:'Ready — press Start'},{label:'Elapsed',value:'00:00:00.000'},{label:'Laps',value:'0'}]; },
  },
    'string-obfuscator': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'Hello World'}],
    formula: (v) => { var t=String(v.text); var rev=t.split('').reverse().join(''); var b64=btoa(t); return [{label:'Reversed',value:rev},{label:'Base64',value:b64}]; },
  },
    'svg-placeholder-generator': {
    inputs: [{key:'w',label:'Width',type:'number',defaultValue:800},{key:'h',label:'Height',type:'number',defaultValue:600},{key:'bg',label:'Bg Color',type:'text',defaultValue:'#ccc'}],
    formula: (v) => { var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+v.w+'" height="'+v.h+'"><rect fill="'+v.bg+'" width="100%" height="100%"/><text x="50%" y="50%" text-anchor="middle" fill="#666" font-size="'+Math.min(F(v.w),F(v.h))/10+'">'+v.w+' x '+v.h+'</text></svg>'; return [{label:'SVG',value:svg},{label:'Data URI',value:'data:image/svg+xml,'+encodeURIComponent(svg)}]; },
  },
    'tariff-impact-calculator': {
    inputs: [{key:'fob',label:'FOB/Unit ($)',type:'number',defaultValue:100},{key:'old',label:'Old Tariff (%)',type:'number',defaultValue:10},{key:'new',label:'New Tariff (%)',type:'number',defaultValue:25},{key:'units',label:'Units',type:'number',defaultValue:1000}],
    formula: (v) => { const o=F(v.fob)*F(v.old)/100*F(v.units),n=F(v.fob)*F(v.new)/100*F(v.units); return [{label:'Old Duty',value:'$'+o.toFixed(0)},{label:'New Duty',value:'$'+n.toFixed(0)},{label:'Increase',value:'$'+(n-o).toFixed(0)}]; },
  },
      'tdee-calculator': {
    inputs: [{key:'wt',label:'Weight (kg)',type:'number',defaultValue:70},{key:'ht',label:'Height (cm)',type:'number',defaultValue:175},{key:'age',label:'Age',type:'number',defaultValue:30},{key:'gen',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'},{key:'act',label:'Activity',type:'select',options:[{label:'Sedentary',value:'1.2'},{label:'Light',value:'1.375'},{label:'Moderate',value:'1.55'},{label:'Active',value:'1.725'},{label:'Very Active',value:'1.9'}],defaultValue:'1.55'}],
    formula: (v) => { const w=F(v.wt),h=F(v.ht),a=F(v.age),act=F(v.act); const bmr=v.gen==='male'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161; const tdee=bmr*act; return [{label:'BMR',value:bmr.toFixed(0)+' cal'},{label:'TDEE',value:tdee.toFixed(0)+' cal'},{label:'Lose(-500)',value:(tdee-500).toFixed(0)+' cal'},{label:'Gain(+500)',value:(tdee+500).toFixed(0)+' cal'}]; },
    presets: [{label:'Moderate Male 30',values:{wt:70,ht:175,age:30,gen:'male',act:'1.55'}}],
  },
        'temperature-converter': {
    inputs: [{key:'celsius',label:'Celsius',type:'number',defaultValue:20},{key:'toUnit',label:'Convert To',type:'select',options:[{label:'Fahrenheit',value:'f'},{label:'Kelvin',value:'k'},{label:'Both',value:'both'}],defaultValue:'both'}],
    formula: (v) => { const c=F(v.celsius),f=c*9/5+32,k=c+273.15; const r=[]; if(v.toUnit==='f'||v.toUnit==='both')r.push({label:'Fahrenheit',value:f.toFixed(1)+' degF'}); if(v.toUnit==='k'||v.toUnit==='both')r.push({label:'Kelvin',value:k.toFixed(1)+' K'}); r.push({label:'Celsius',value:c.toFixed(1)+' degC'}); return r; },
    presets: [{label:'Freezing',values:{celsius:0,toUnit:'both'}},{label:'Body',values:{celsius:37,toUnit:'both'}},{label:'Boiling',values:{celsius:100,toUnit:'both'}}],
  },
    'text-diff': {
    inputs: [{key:'t1',label:'Original',type:'text',defaultValue:'The quick brown fox'},{key:'t2',label:'Modified',type:'text',defaultValue:'The quick red fox'}],
    formula: (v) => { var same=String(v.t1)===String(v.t2); var shared=String(v.t1).split('').filter(function(c){return String(v.t2).includes(c)}).length; return [{label:'Identical',value:same?'Yes':'No'},{label:'Length Diff',value:(String(v.t2).length-String(v.t1).length)+' chars'},{label:'Shared Chars',value:String(shared)}]; },
  },
      'text-statistics': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'The quick brown fox jumps over the lazy dog.'}],
    formula: (v) => { const t=String(v.text),w=t.trim()?t.trim().split(/\s+/).length:0,c=t.length,ns=t.replace(/\s/g,'').length,s=t.split(/[.!?]+/).filter(Boolean).length; return [{label:'Words',value:String(w)},{label:'Chars',value:String(c)},{label:'Chars no space',value:String(ns)},{label:'Sentences',value:String(s)},{label:'Read Time',value:Math.ceil(w/238)+' min'}]; },
  },
    'text-to-binary': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'Hello'}],
    formula: (v) => { var bin=String(v.text).split('').map(function(c){return c.charCodeAt(0).toString(2).padStart(8,'0')}).join(' '); return [{label:'Binary',value:bin},{label:'Bytes',value:String(bin.split(' ').length)}]; },
  },
    'text-to-nato-alphabet': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'HELLO'}],
    formula: (v) => { var n={A:'Alpha',B:'Bravo',C:'Charlie',D:'Delta',E:'Echo',F:'Foxtrot',G:'Golf',H:'Hotel',I:'India',J:'Juliett',K:'Kilo',L:'Lima',M:'Mike',N:'November',O:'Oscar',P:'Papa',Q:'Quebec',R:'Romeo',S:'Sierra',T:'Tango',U:'Uniform',V:'Victor',W:'Whiskey',X:'X-ray',Y:'Yankee',Z:'Zulu'}; var r=String(v.text).toUpperCase().split('').map(function(c){return n[c]||c}).join(' '); return [{label:'NATO',value:r}]; },
  },
    'text-to-unicode': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'ABC'}],
    formula: (v) => { var u=String(v.text).split('').map(function(c){return 'U+'+c.charCodeAt(0).toString(16).toUpperCase().padStart(4,'0')}).join(' '); return [{label:'Code Points',value:u}]; },
  },
      'time-zone-converter': {
    inputs: [{key:'time',label:'Time (HH:MM)',type:'text',defaultValue:'14:00'},{key:'from',label:'From UTC',type:'number',defaultValue:-5},{key:'to',label:'To UTC',type:'number',defaultValue:0}],
    formula: (v) => { const p=String(v.time).split(':').map(Number); var h=p[0]+(F(v.to)-F(v.from)),m=p[1]||0; h=((h%24)+24)%24; return [{label:'Converted',value:String(Math.floor(h)).padStart(2,'0')+':'+String(m).padStart(2,'0')}]; },
  },
        'tip-calculator': {
    inputs: [{key:'bill',label:'Bill Amount ($)',type:'number',defaultValue:80},{key:'tipPct',label:'Tip (%)',type:'number',defaultValue:18},{key:'people',label:'Split Among',type:'number',defaultValue:3}],
    formula: (v) => { const tip=F(v.bill)*F(v.tipPct)/100,total=F(v.bill)+tip,pp=F(v.people)>0?total/F(v.people):total; return [{label:'Tip',value:'$'+tip.toFixed(2)},{label:'Total',value:'$'+total.toFixed(2)},{label:'Per Person',value:'$'+pp.toFixed(2)}]; },
    presets: [{label:'15pct',values:{bill:50,tipPct:15,people:2}},{label:'20pct',values:{bill:80,tipPct:20,people:3}}],
  },
    'tire-size-calculator': {
    inputs: [{key:'width',label:'Width (mm)',type:'number',defaultValue:225},{key:'aspect',label:'Aspect',type:'number',defaultValue:65},{key:'rim',label:'Rim (in)',type:'number',defaultValue:17}],
    formula: (v) => { const sw=F(v.width)*F(v.aspect)/100,dia=(sw*2+F(v.rim)*25.4)/25.4,circ=dia*Math.PI; return [{label:'Diameter',value:dia.toFixed(1)+' in'},{label:'Sidewall',value:sw.toFixed(0)+' mm'},{label:'Rev/mi',value:Math.round(63360/circ)}]; },
  },
    'token-generator': {
    inputs: [{key:'len',label:'Length',type:'number',defaultValue:32}],
    formula: (v) => { var c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; var t=''; for(var i=0;i<F(v.len);i++)t+=c[Math.floor(Math.random()*c.length)]; return [{label:'Token',value:t},{label:'Entropy',value:(F(v.len)*Math.log2(62)).toFixed(0)+' bits'}]; },
  },
    'toml-to-json': {
    inputs: [{key:'toml',label:'TOML',type:'text',defaultValue:'name = "myapp"'}],
    formula: (v) => { var lines=String(v.toml).split('\n').filter(Boolean); var o={}; lines.forEach(function(l){var m=l.match(/^(\w+)\s*=\s*(.+)/); if(m)o[m[1]]=m[2].replace(/["']/g,'').trim();}); return [{label:'JSON',value:JSON.stringify(o)}]; },
  },
    'toml-to-yaml': {
    inputs: [{key:'toml',label:'TOML',type:'text',defaultValue:'name = "app"'}],
    formula: (v) => { var lines=String(v.toml).split('\n').filter(Boolean); var y=lines.map(function(l){var m=l.match(/^(\w+)\s*=\s*(.+)/);return m?m[1]+': '+m[2].replace(/["']/g,''):l;}).join('\n'); return [{label:'YAML',value:y}]; },
  },
    'travel-budget-calculator': {
    inputs: [{key:'days',label:'Days',type:'number',defaultValue:7},{key:'flight',label:'Flight ($)',type:'number',defaultValue:400},{key:'hotel',label:'Hotel/Nt ($)',type:'number',defaultValue:150},{key:'food',label:'Food/Day ($)',type:'number',defaultValue:50}],
    formula: (v) => { const t=F(v.flight)+F(v.hotel)*F(v.days)+F(v.food)*F(v.days); return [{label:'Total',value:'$'+t.toFixed(0)},{label:'Per Day',value:'$'+(t/F(v.days)).toFixed(0)}]; },
  },
    'ulid-generator': {
    inputs: [{key:'count',label:'Count',type:'number',defaultValue:1}],
    formula: (v) => { var a='0123456789ABCDEFGHJKMNPQRSTVWXYZ'; var ul=[]; for(var i=0;i<F(v.count);i++){var s=''; for(var j=0;j<26;j++)s+=a[Math.floor(Math.random()*32)]; ul.push(s);} return [{label:'ULID',value:ul.join('\n')}]; },
  },
      'url-encoder': {
    inputs: [{key:'text',label:'Text',type:'text',defaultValue:'Hello World & more'}],
    formula: (v) => { const e=encodeURIComponent(String(v.text)); return [{label:'Encoded',value:e},{label:'Length',value:e.length+' chars'}]; },
  },
    'url-parser': {
    inputs: [{key:'url',label:'URL',type:'text',defaultValue:'https://example.com:8080/path?q=search#top'}],
    formula: (v) => { try{var u=new URL(String(v.url)); return[{label:'Protocol',value:u.protocol},{label:'Host',value:u.hostname},{label:'Port',value:u.port||'default'},{label:'Path',value:u.pathname},{label:'Query',value:u.search||'(none)'},{label:'Hash',value:u.hash||'(none)'}]; }catch(e){return[{label:'Error',value:'Invalid URL'}];} },
  },
  'user-agent-parser': {
    inputs: [
      {
            "key": "birthYear",
            "label": "Birth Year",
            "type": "number",
            "defaultValue": 1990,
            "min": 1900,
            "max": 2026
      }
],
    formula: (v) => { const age = 2026 - F(v.birthYear); return [{ label: 'Age', value: String(age) }, { label: 'Age in Months', value: String(age * 12) }]; },
  },
    'uuid-generator': {
    inputs: [{key:'count',label:'Count',type:'number',defaultValue:1}],
    formula: (v) => { var h=function(){return Math.floor(Math.random()*16).toString(16)}; var uu=[]; for(var i=0;i<F(v.count);i++)uu.push(h()+h()+h()+h()+h()+h()+h()+h()+'-'+h()+h()+h()+h()+'-4'+h()+h()+h()+'-'+(8+Math.floor(Math.random()*4)).toString(16)+h()+h()+h()+'-'+h()+h()+h()+h()+h()+h()+h()+h()+h()+h()+h()+h()); return [{label:'UUID v4',value:uu.join('\n')}]; },
  },
    'water-footprint-calculator': {
    inputs: [{key:'shower',label:'Showers/Wk',type:'number',defaultValue:7},{key:'meat',label:'Meat meals/Wk',type:'number',defaultValue:5},{key:'laundry',label:'Laundry/Wk',type:'number',defaultValue:3}],
    formula: (v) => { const d=F(v.shower)*17+F(v.laundry)*40,vf=F(v.meat)*660*4; return [{label:'Direct',value:d.toFixed(0)+' gal'},{label:'Virtual(food)',value:vf.toFixed(0)+' gal'},{label:'Total/Wk',value:(d+vf).toFixed(0)+' gal'}]; },
  },
        'water-intake-calculator': {
    inputs: [{key:'wt',label:'Weight (lbs)',type:'number',defaultValue:150},{key:'act',label:'Activity',type:'select',options:[{label:'Sedentary',value:'1'},{label:'Moderate',value:'1.2'},{label:'Active',value:'1.4'}],defaultValue:'1'}],
    formula: (v) => { const b=F(v.wt)*0.67*F(v.act); return [{label:'Daily',value:b.toFixed(0)+' oz'},{label:'Liters',value:(b/33.8).toFixed(1)+' L'},{label:'Glasses',value:Math.round(b/8)+' glasses'}]; },
  },
    'wedding-budget-calculator': {
    inputs: [{key:'budget',label:'Budget ($)',type:'number',defaultValue:30000},{key:'guests',label:'Guests',type:'number',defaultValue:100}],
    formula: (v) => { const b=F(v.budget); return [{label:'Venue(32%)',value:'$'+(b*0.32).toFixed(0)},{label:'Catering(28%)',value:'$'+(b*0.28).toFixed(0)},{label:'Photo(10%)',value:'$'+(b*0.10).toFixed(0)},{label:'Per Guest',value:'$'+((b*0.6)/F(v.guests)).toFixed(0)}]; },
  },
    'wedding-countdown-calculator': {
    inputs: [{key:'date',label:'Wedding Date',type:'text',defaultValue:'2027-06-15'}],
    formula: (v) => { const d=new Date(String(v.date)); if(isNaN(d.getTime()))return[{label:'Error',value:'Invalid date'}]; const diff=d.getTime()-Date.now(),days=Math.ceil(diff/86400000); return [{label:'Days',value:Math.max(0,days)+' days'},{label:'Weeks',value:(days/7).toFixed(1)+' wks'},{label:'Months',value:(days/30.44).toFixed(1)+' mos'}]; },
  },
    'wheel-spinner': {
    inputs: [{key:'items',label:'Items (one per line)',type:'text',defaultValue:'Option 1\nOption 2\nOption 3\nOption 4'}],
    formula: (v) => { var items=String(v.items).split('\n').filter(Boolean); var winner=items[Math.floor(Math.random()*items.length)]; return [{label:'Winner!',value:winner},{label:'Options',value:String(items.length)}]; },
  },
      'wifi-qr-code-generator': {
    inputs: [{key:'ssid',label:'WiFi Name',type:'text',defaultValue:'MyNetwork'},{key:'pass',label:'Password',type:'text',defaultValue:'mypassword'},{key:'sec',label:'Security',type:'select',options:[{label:'WPA2',value:'WPA2'},{label:'WPA3',value:'WPA3'},{label:'WEP',value:'WEP'}],defaultValue:'WPA2'},{key:'size',label:'Size (px)',type:'number',defaultValue:200}],
    formula: (v) => { var wifi='WIFI:T:'+v.sec+';S:'+v.ssid+';P:'+v.pass+';;'; var t=wifi; var s=Math.min(Math.max(F(v.size),100),300); var qr=[]; for(var i=0;i<21;i++){qr[i]=[]; for(var j=0;j<21;j++)qr[i][j]=0;} var seed=0; for(var i=0;i<t.length;i++)seed=((seed<<5)-seed)+t.charCodeAt(i); seed=Math.abs(seed); for(var r=0;r<21;r++){for(var c=0;c<21;c++){if((r===0||r===20||c===0||c===20)&&((r+c)%3!==0))qr[r][c]=1; if(r>=2&&r<=18&&c>=2&&c<=18){var val=((seed*(r*31+c*17+1))>>(c%8))&1; if(val)qr[r][c]=1;}}} var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+s+'" height="'+s+'" viewBox="0 0 21 21"><rect width="21" height="21" fill="#fff"/>'; for(var r=0;r<21;r++)for(var c=0;c<21;c++)if(qr[r][c])svg+='<rect x="'+c+'" y="'+r+'" width="1" height="1" fill="#000"/>'; svg+='</svg>'; return [{label:'WiFi QR SVG',value:svg},{label:'Data URI',value:'data:image/svg+xml,'+encodeURIComponent(svg)},{label:'Config',value:wifi}]; },
  },
    'wire-size-calculator': {
    inputs: [{key:'amps',label:'Amps',type:'number',defaultValue:20},{key:'dist',label:'Distance (ft)',type:'number',defaultValue:50},{key:'volt',label:'Voltage',type:'select',options:[{label:'120V',value:'120'},{label:'240V',value:'240'}],defaultValue:'120'}],
    formula: (v) => { const a=F(v.amps),d=F(v.dist),vl=F(v.volt); const g=a<=15?'14':a<=20?'12':a<=30?'10':a<=40?'8':a<=55?'6':'4'; const area=a<=20?6530:a<=30?10380:16510; const vd=2*12.9*a*d/area/vl*100; return [{label:'Wire',value:g+' AWG'},{label:'V Drop',value:vd.toFixed(2)+'%'},{label:'OK?',value:vd<3?'Yes':'Upsize'}]; },
  },
    'xml-formatter': {
    inputs: [{key:'xml',label:'XML',type:'text',defaultValue:'<root><item id="1">Hello</item></root>'}],
    formula: (v) => { var x=String(v.xml); var tags=(x.match(/<[^/!?][^>]*>/g)||[]).length; return [{label:'Elements',value:String(tags)},{label:'Size',value:x.length+' chars'}]; },
  },
    'xml-to-json': {
    inputs: [{key:'xml',label:'XML',type:'text',defaultValue:'<root><name>John</name><age>30</age></root>'}],
    formula: (v) => { var x=String(v.xml); var matches=Array.from(x.matchAll(/<(\w+)>([^<]*)<\/\1>/g)); var o={}; matches.forEach(function(m){var k=m[1],v=m[2]; o[k]=isNaN(Number(v))?v:Number(v);}); return [{label:'JSON',value:JSON.stringify(o)}]; },
  },
    'yaml-to-json-converter': {
    inputs: [{key:'yaml',label:'YAML',type:'text',defaultValue:'name: app\nversion: "1.0"'}],
    formula: (v) => { var lines=String(v.yaml).split('\n').filter(Boolean); var o={}; lines.forEach(function(l){var m=l.match(/^(\w+):\s*(.+)/); if(m)o[m[1]]=m[2].replace(/["']/g,'');}); return [{label:'JSON',value:JSON.stringify(o)}]; },
  },
    'yaml-to-toml': {
    inputs: [{key:'yaml',label:'YAML',type:'text',defaultValue:'name: myapp'}],
    formula: (v) => { var lines=String(v.yaml).split('\n').filter(Boolean); var t=lines.map(function(l){var m=l.match(/^(\w+):\s*(.+)/);return m?m[1]+' = '+m[2].replace(/["']/g,''):l;}).join('\n'); return [{label:'TOML',value:t}]; },
  },
    'yaml-viewer': {
    inputs: [{key:'yaml',label:'YAML',type:'text',defaultValue:'server:\n  host: localhost\n  port: 8080'}],
    formula: (v) => { var lines=String(v.yaml).split('\n').filter(Boolean); var top=lines.filter(function(l){return /^\w+:/.test(l)&&!l.startsWith(' ')}).length; var nested=lines.filter(function(l){return l.startsWith('  ')}).length; return [{label:'Top-Level Keys',value:String(top)},{label:'Nested Props',value:String(nested)},{label:'Total Lines',value:String(lines.length)}]; },
  },
  'zodiac-love-compatibility': {
    inputs: [{key:'s1',label:'Your Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'scorpio'},{key:'s2',label:'Partner Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'pisces'}],
    formula: (v) => { const el:Record<string,string>={aries:'Fire',leo:'Fire',sagittarius:'Fire',taurus:'Earth',virgo:'Earth',capricorn:'Earth',gemini:'Air',libra:'Air',aquarius:'Air',cancer:'Water',scorpio:'Water',pisces:'Water'}; const e1=el[String(v.s1)],e2=el[String(v.s2)]; let sc=50; if(e1===e2)sc+=25; else if((e1==='Fire'&&e2==='Air')||(e1==='Air'&&e2==='Fire')||(e1==='Earth'&&e2==='Water')||(e1==='Water'&&e2==='Earth'))sc+=15; else if((e1==='Fire'&&e2==='Water')||(e1==='Water'&&e2==='Fire')||(e1==='Air'&&e2==='Earth')||(e1==='Earth'&&e2==='Air'))sc-=10; const vd=sc>=90?'Soulmates!':sc>=75?'Great Match':sc>=60?'Good':sc>=40?'Challenging':'Difficult'; return [{label:'Compatibility',value:sc+'%'},{label:'Verdict',value:vd},{label:'Elements',value:e1+' + '+e2}]; },
  },
        'sheng-xiao-compatibility': {
    inputs: [{key:'z1',label:'Your Sign',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'dragon'},{key:'z2',label:'Partner',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'monkey'}],
    formula: (v) => { const h={rat:['dragon','monkey'],ox:['snake','rooster'],tiger:['horse','dog'],rabbit:['goat','pig'],dragon:['rat','monkey'],snake:['ox','rooster'],horse:['tiger','dog'],goat:['rabbit','pig'],monkey:['rat','dragon'],rooster:['ox','snake'],dog:['tiger','horse'],pig:['rabbit','goat']}; const c={rat:'horse',ox:'goat',tiger:'monkey',rabbit:'rooster',dragon:'dog',snake:'pig',horse:'rat',goat:'ox',monkey:'tiger',rooster:'rabbit',dog:'dragon',pig:'snake'}; var s=50; if(h[v.z1]&&h[v.z1].includes(v.z2))s+=35; if(c[v.z1]===v.z2)s-=30; if(v.z1===v.z2)s+=15; return [{label:'Match',value:s+'%'},{label:'Rating',value:s>=90?'Heaven-Matched':s>=70?'Great':s>=50?'OK':s>=30?'Challenging':'Clash'}]; },
  },
        'numerology-calculator': {
    inputs: [{key:'bday',label:'Birth Date',type:'text',defaultValue:'1990-05-15'}],
    formula: (v) => { const rd=function(n){while(n>9&&n!==11&&n!==22&&n!==33)n=String(n).split('').reduce(function(a,b){return a+Number(b)},0);return n;}; const s=String(v.bday).replace(/-/g,''); if(s.length<8)return[{label:'LP',value:'Enter date'}]; const lp=rd(s.split('').reduce(function(a,b){return a+Number(b)},0)); const nm={1:'Leader',2:'Diplomat',3:'Creator',4:'Builder',5:'Adventurer',6:'Nurturer',7:'Thinker',8:'Achiever',9:'Humanitarian',11:'Master Intuitive',22:'Master Builder',33:'Master Teacher'}; return [{label:'Life Path',value:String(lp)+(lp>9?' (Master!)':'')},{label:'Archetype',value:nm[lp]||'Unknown'}]; },
  },
    'ba-zi-calculator': {
    inputs: [{key:'year',label:'Birth Year',type:'number',defaultValue:1990},{key:'month',label:'Birth Month',type:'number',defaultValue:5},{key:'day',label:'Birth Day',type:'number',defaultValue:15},{key:'hour',label:'Birth Hour (0-23)',type:'number',defaultValue:12}],
    formula: (v) => { var s=['Jia Yang Wood','Yi Yin Wood','Bing Yang Fire','Ding Yin Fire','Wu Yang Earth','Ji Yin Earth','Geng Yang Metal','Xin Yin Metal','Ren Yang Water','Gui Yin Water']; var b=['Zi Rat','Chou Ox','Yin Tiger','Mao Rabbit','Chen Dragon','Si Snake','Wu Horse','Wei Goat','Shen Monkey','You Rooster','Xu Dog','Hai Pig']; var y=F(v.year),m=F(v.month),d=F(v.day),h=F(v.hour); var ys=(y-4)%10,yb=(y-4)%12; var ms=(y*12+m+13)%10,mb=(m+1)%12; var ds=(y+m+d+9)%10,db=(y+m+d+5)%12; var hi=Math.floor((h+1)/2)%12; var hs=(((y-4)%10)*2+hi)%10; var el=['Wood','Wood','Fire','Fire','Earth','Earth','Metal','Metal','Water','Water']; var dayEl=el[ds]; var tr={Wood:'Growth-oriented, flexible, idealistic',Fire:'Passionate, dynamic, charismatic',Earth:'Stable, nurturing, practical',Metal:'Disciplined, principled, determined',Water:'Intuitive, wise, adaptable'}; return [{label:'Year Pillar',value:s[ys]+' / '+b[yb]},{label:'Month Pillar',value:s[ms]+' / '+b[mb]},{label:'Day Pillar (You)',value:s[ds]+' / '+b[db]},{label:'Hour Pillar',value:s[hs]+' / '+b[hi]},{label:'Day Master',value:dayEl},{label:'Personality',value:tr[dayEl]||'Balanced'}]; },
  },
    'i-ching-divination': {
    inputs: [{key:'q',label:'Your Question',type:'text',defaultValue:''}],
    formula: (v) => { var n={1:'Qian The Creative',2:'Kun The Receptive',3:'Zhun Difficulty',4:'Meng Youthful Folly',5:'Xu Waiting',6:'Song Conflict',11:'Tai Peace',12:'Pi Standstill',15:'Qian Modesty',24:'Fu Return',31:'Xian Influence',32:'Heng Duration',42:'Yi Increase',63:'Ji Ji After Completion',64:'Wei Ji Before Completion'}; var g={1:'Take bold action',2:'Be receptive',11:'Harmony prevails',12:'Wait for timing',24:'New cycle begins',31:'Gentle influence wins',32:'Stay the course',42:'Abundance flows',63:'Near completion,watch details',64:'Goal in sight,navigate carefully'}; var q=String(v.q||''); var seed=0; for(var i=0;i<q.length;i++)seed+=q.charCodeAt(i); var h=((seed*7919+Date.now()%86400000)%64)+1; return [{label:'Hexagram #'+h,value:n[h]||'Hexagram '+h},{label:'Wisdom',value:g[h]||'Reflect with an open mind'}]; },
  },
    'tarot-reading': {
    inputs: [{key:'spread',label:'Spread',type:'select',options:[{label:'3-Card Past/Present/Future',value:'3'},{label:'Single Card',value:'1'}],defaultValue:'3'},{key:'focus',label:'Focus',type:'select',options:[{label:'Love',value:'love'},{label:'Career',value:'career'},{label:'Growth',value:'growth'}],defaultValue:'love'}],
    formula: (v) => { var M=['The Fool New beginnings','The Magician Skill,manifestation','The High Priestess Intuition,wisdom','The Empress Abundance,nurturing','The Emperor Authority,structure','The Lovers Love,harmony','The Chariot Willpower,victory','Strength Courage,power','The Hermit Soul-searching','Wheel of Fortune Destiny,turning point','Justice Fairness,truth','The Hanged Man Surrender,perspective','Death Transformation,rebirth','Temperance Balance,harmony','The Star Hope,renewal','The Moon Subconscious,illusion','The Sun Joy,success','The World Completion,wholeness']; var m={love:['Ace of Cups New love awakens','Two of Cups Deep connection','Ten of Cups Lasting fulfillment','Knight of Cups Romance','Queen of Cups Emotional wisdom'],career:['Ace of Pentacles Opportunity','Three of Pentacles Teamwork','Eight of Pentacles Mastery','Ten of Pentacles Security','King of Pentacles Leadership'],growth:['Four of Swords Rest,recovery','Seven of Cups Possibilities','The Star Spiritual guidance','Nine of Pentacles Self-sufficiency','Judgment Higher calling']}; var p=function(a){return a[Math.floor(Math.random()*a.length)]}; var c1=Math.random()>0.4?p(M):p(m[v.focus]||m.love); var c2=Math.random()>0.4?p(M):p(m[v.focus]||m.love); var c3=Math.random()>0.4?p(M):p(m[v.focus]||m.love); if(v.spread==='1')return[{label:'Your Card',value:c1}]; return [{label:'Past',value:c1},{label:'Present',value:c2},{label:'Future',value:c3}]; },
  },
    'past-life-finder': {
    inputs: [{key:'bday',label:'Your Birth Date',type:'text',defaultValue:'1990-05-15'}],
    formula: (v) => { var s=String(v.bday).replace(/-/g,'').split('').reduce(function(a,b){return a+Number(b)},0); var E=['Ancient Egypt','Viking Age','Medieval Europe','Renaissance Italy','Edo Japan','Victorian England','Roaring Twenties','Ancient Rome','Ming Dynasty','Mughal India']; var J=['Philosopher Teacher','Warrior Strategist','Artist Dreamer','Merchant Explorer','Healer Herbalist','Priest Mystic','Musician Poet','Builder Architect','Royal Advisor','Navigator']; var L=['in the Himalayas','near the Nile','in a port city','under Northern Lights','in a monastery','on an island','in a desert city','in a palace']; var K=['Love without attachment','Speak your truth','Trust your intuition','Find balance','Forgive yourself','Embrace change','Cultivate patience','Lead with compassion','Seek wisdom','Protect the vulnerable']; var T=['Adventurous Curious','Intuitive Mysterious','Creative Expressive','Practical Grounded','Charismatic Bold','Analytical Precise','Empathetic Nurturing','Ambitious Determined']; return [{label:'Past Era',value:E[s%E.length]},{label:'You Were',value:J[Math.floor(s*1.7)%J.length]},{label:'You Lived',value:L[Math.floor(s*2.3)%L.length]},{label:'Karmic Lesson',value:K[Math.floor(s*3.1)%K.length]},{label:'Soul Trait',value:T[Math.floor(s*5.7)%T.length]}]; },
  },
    'name-compatibility': {
    inputs: [{key:'n1',label:'Your Name',type:'text',defaultValue:'Alice Chen'},{key:'n2',label:'Partner Name',type:'text',defaultValue:'Bob Wang'}],
    formula: (v) => { var H=function(s){return s.toLowerCase().replace(/[^a-z]/g,'').split('').reduce(function(a,c){return a+c.charCodeAt(0)},0)}; var n1=String(v.n1),n2=String(v.n2); var s1=H(n1),s2=H(n2); var sc=((s1*s2*7919+104729)%89)+11; var FL=['Friends','Lovers','Affection','Marriage','Enemies','Soulmates']; var f=FL[(s1+s2)%6]; var v1=(n1.match(/[aeiou]/gi)||[]).length,v2=(n2.match(/[aeiou]/gi)||[]).length; var vS=Math.abs(v1-v2)<=1?85:Math.abs(v1-v2)<=2?65:45; var p1=n1.split('').reduce(function(a,c){var v=(c.charCodeAt(0)-96)%9||9;return a+v},0),p2=n2.split('').reduce(function(a,c){var v=(c.charCodeAt(0)-96)%9||9;return a+v},0); var nS=Math.abs(p1-p2)<=2?88:Math.abs(p1-p2)<=5?70:50; var comp=Math.round(vS*0.3+nS*0.3+sc*0.4); return [{label:'Compatibility',value:comp+'%'},{label:'FLAMES',value:f},{label:'Vowel Harmony',value:vS+'%'},{label:'Numerology',value:nS+'%'}]; },
  },
  'love-calculator': {
    inputs: [{key:'name1',label:'Your Name',type:'text',defaultValue:'Romeo'},{key:'name2',label:'Crush Name',type:'text',defaultValue:'Juliet'}],
    formula: (v) => { const h=(s:string)=>s.toLowerCase().replace(/[^a-z]/g,'').split('').reduce((a,c)=>a+c.charCodeAt(0),0); const seed=h(String(v.name1))*h(String(v.name2)); const score=((seed*7919+104729)%89)+11; return [{label:'Love',value:score+'%'},{label:'Verdict',value:score>=80?'Epic!':score>=60?'Sweet':score>=40?'Cute':'Hmm...'}]; },
  },
        'soulmate-finder': {
    inputs: [{key:'b1',label:'Your Bday',type:'text',defaultValue:'1990-05-15'},{key:'b2',label:'Partner Bday',type:'text',defaultValue:'1992-08-22'}],
    formula: (v) => { const rd=function(n){while(n>9&&n!==11&&n!==22&&n!==33)n=String(n).split('').reduce(function(a,b){return a+Number(b)},0);return n;}; const d1=String(v.b1).replace(/-/g,''),d2=String(v.b2).replace(/-/g,''); if(d1.length<8||d2.length<8)return[{label:'Score',value:'Enter dates'}]; const lp1=rd(d1.split('').reduce(function(a,b){return a+Number(b)},0)),lp2=rd(d2.split('').reduce(function(a,b){return a+Number(b)},0)); const grps=[[1,5,7],[2,4,8],[3,6,9]]; const sg=grps.some(function(g){return g.includes(lp1)&&g.includes(lp2)}); const lps=lp1===lp2?95:sg?82:50; const m1=Number(d1.slice(4,6)),m2=Number(d2.slice(4,6)),sd=Math.abs(m1-m2),ss=sd<=1?90:sd<=2?78:45; const f=Math.min(99,Math.round(lps*0.5+ss*0.5)); return [{label:'Soulmate',value:f+'%'},{label:'Type',value:f>=90?'TwinFlames':f>=75?'DeepBond':f>=55?'Karmic':f>=35?'Growth':'Passing'},{label:'Your LP',value:String(lp1)},{label:'Partner LP',value:String(lp2)}]; },
  },
    'daily-fortune': {
    inputs: [{key:'sign',label:'Your Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'leo'}],
    formula: (v) => { var t=new Date(); var seed=t.getFullYear()*10000+(t.getMonth()+1)*100+t.getDate()+String(v.sign).length; var F=['Unexpected joy is heading your way. Stay open to new possibilities.','Your creative energy peaks today. Share your ideas boldly.','Financial luck favors you. Consider that calculated risk.','A meaningful conversation awaits. Speak from the heart.','Trust your intuition on a decision you have been weighing.','Your hard work is about to pay off. Keep pushing forward.','Someone from your past brings valuable insight today.','Love and warmth surround you. Nurture your closest bonds.','A new opportunity appears. Say yes before overthinking.','Self-care day. Rest and recharge your spirit.','Your leadership shines. Others look to you for guidance.','Learning opens unexpected doors today.']; var C=['Royal Blue','Emerald Green','Crimson Red','Golden Yellow','Deep Purple','Ocean Teal','Rose Pink','Warm Amber','Silver Grey','Pearl White','Sage Green','Midnight Black']; var nums=[((seed*7+13)%49)+1,((seed*11+7)%49)+1,((seed*17+3)%49)+1,((seed*23+11)%49)+1,((seed*29+5)%49)+1,((seed*31+17)%49)+1]; return [{label:'Fortune',value:F[seed%F.length]},{label:'Color',value:C[seed%C.length]},{label:'Numbers',value:nums.join(', ')}]; },
  },
    'lucky-number-generator': {
    inputs: [{key:'bday',label:'Birth Date',type:'text',defaultValue:'1990-05-15'},{key:'count',label:'Count',type:'number',defaultValue:6},{key:'max',label:'Max',type:'number',defaultValue:49}],
    formula: (v) => { var rd=function(n){while(n>9&&n!==11&&n!==22&&n!==33)n=String(n).split('').reduce(function(a,b){return a+Number(b)},0);return n;}; var s=String(v.bday).replace(/-/g,''); var lp=rd(s.split('').reduce(function(a,b){return a+Number(b)},0)); var t=new Date(); var seed=lp*100+t.getDate()+t.getMonth(); var nums=[],used={}; for(var i=0;i<F(v.count);i++){var n=((seed*(i*7+3)+lp*(i*13+5)+t.getFullYear()*(i+1))%F(v.max))+1; var tries=0; while(used[n]&&tries<100){n=((n*17+13)%F(v.max))+1;tries++;} used[n]=true; nums.push(n);} nums.sort(function(a,b){return a-b}); return [{label:'Life Path',value:String(lp)},{label:'Lucky Numbers',value:nums.join(', ')}]; },
  },
};

export function getFormula(id: string): FormulaConfig | undefined {
  return formulaRegistry[id];
}
