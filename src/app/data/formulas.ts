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
    inputs: [{key:'payment',label:'Periodic Payment ($)',type:'number',defaultValue:1000},{key:'rate',label:'Annual Interest (%)',type:'number',defaultValue:6},{key:'periods',label:'Number of Years',type:'number',defaultValue:20}],
    formula: (v) => { const pmt=F(v.payment),r=F(v.rate)/100,n=F(v.periods); const fv=r>0?pmt*((Math.pow(1+r,n)-1)/r):pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+(pmt*n).toFixed(0)},{label:'Interest Earned',value:'$'+(fv-pmt*n).toFixed(0)}]; },
  },
  'ascii-text-drawer': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'baby-growth-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'bakers-percentage-calculator': {
    inputs: [{key:'flour',label:'Flour (g)',type:'number',defaultValue:500},{key:'water',label:'Water (g)',type:'number',defaultValue:350},{key:'salt',label:'Salt (g)',type:'number',defaultValue:10},{key:'yeast',label:'Yeast (g)',type:'number',defaultValue:5}],
    formula: (v) => { const f=F(v.flour); return [{label:'Hydration',value:(F(v.water)/f*100).toFixed(0)+'%'},{label:'Salt',value:(F(v.salt)/f*100).toFixed(1)+'%'},{label:'Yeast',value:(F(v.yeast)/f*100).toFixed(1)+'%'}]; },
  },
  'base64-file-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'base64-string-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'basic-auth-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'bcrypt': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'beam-load-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'benchmark-builder': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'bip39-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'bmi-calculator': {
    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'weight',label:'Weight (kg)',type:'number',defaultValue:70},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],
    formula: (v) => { const h=F(v.height)/100,w=F(v.weight),bmi=h>0?w/(h*h):0; const cat=bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':bmi<35?'Obese I':bmi<40?'Obese II':'Obese III'; const low=18.5*h*h,high=24.9*h*h; return [{label:'BMI',value:bmi.toFixed(1)+' kg/m2'},{label:'Category',value:cat},{label:'Healthy Range',value:low.toFixed(0)+'-'+high.toFixed(0)+' kg'}]; },
    presets: [{label:'Adult',values:{height:170,weight:70,gender:'male'}}],
  },
    'body-fat-calculator': {
    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:175},{key:'neck',label:'Neck (cm)',type:'number',defaultValue:38},{key:'waist',label:'Waist (cm)',type:'number',defaultValue:85},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],
    formula: (v) => { const h=F(v.height),n=F(v.neck),w=F(v.waist); let bf=v.gender==='male'?86.010*Math.log10(Math.max(1,w-n))-70.041*Math.log10(h)+36.76:163.205*Math.log10(Math.max(1,w+n-h))-97.684*Math.log10(h)-78.387; bf=Math.max(3,Math.abs(bf)); const cat=bf<6?'Essential':bf<14?'Athlete':bf<18?'Fitness':bf<25?'Average':bf<32?'Overfat':'Obese'; return [{label:'Body Fat',value:bf.toFixed(1)+'%'},{label:'Category',value:cat}]; },
  },
  'break-even-calculator': {
    inputs: [{key:'fixedCosts',label:'Fixed Costs ($)',type:'number',defaultValue:10000},{key:'price',label:'Price per Unit ($)',type:'number',defaultValue:50},{key:'variableCost',label:'Variable Cost/Unit ($)',type:'number',defaultValue:30}],
    formula: (v) => { const fc=F(v.fixedCosts),p=F(v.price),vc=F(v.variableCost),cm=p-vc,be=cm>0?Math.ceil(fc/cm):0; return [{label:'Break-Even Units',value:String(be)},{label:'Revenue at BE',value:'$'+(be*p).toFixed(0)},{label:'Margin/Unit',value:'$'+cm.toFixed(2)}]; },
  },
  'bsa-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'camera-recorder': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'car-depreciation-calculator': {
    inputs: [
      {
            "key": "price",
            "label": "Vehicle Price ($)",
            "type": "number",
            "defaultValue": 35000
      },
      {
            "key": "residual",
            "label": "Residual (%)",
            "type": "number",
            "defaultValue": 55
      },
      {
            "key": "rate",
            "label": "Money Factor",
            "type": "number",
            "defaultValue": 0.0025,
            "step": 0.0001
      },
      {
            "key": "months",
            "label": "Lease Term (months)",
            "type": "number",
            "defaultValue": 36
      }
],
    formula: (v) => { const net = F(v.price) * (1 - F(v.residual)/100); const dep = net / F(v.months); const fee = (F(v.price) + F(v.price) * F(v.residual)/100) * F(v.rate); return [{ label: 'Monthly Payment', value: '$' + (dep + fee).toFixed(2) }]; },
  },
    'car-loan-calculator': {
    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'down',label:'Down (%)',type:'number',defaultValue:20},{key:'rate',label:'APR (%)',type:'number',defaultValue:6},{key:'term',label:'Term (months)',type:'number',defaultValue:60}],
    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term); const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly',value:'$'+M.toFixed(2)},{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)}]; },
  },
  'car-tax-calculator': {
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
  'carbon-footprint-calculator': {
    inputs: [
      {
            "key": "price",
            "label": "Vehicle Price ($)",
            "type": "number",
            "defaultValue": 35000
      },
      {
            "key": "residual",
            "label": "Residual (%)",
            "type": "number",
            "defaultValue": 55
      },
      {
            "key": "rate",
            "label": "Money Factor",
            "type": "number",
            "defaultValue": 0.0025,
            "step": 0.0001
      },
      {
            "key": "months",
            "label": "Lease Term (months)",
            "type": "number",
            "defaultValue": 36
      }
],
    formula: (v) => { const net = F(v.price) * (1 - F(v.residual)/100); const dep = net / F(v.months); const fee = (F(v.price) + F(v.price) * F(v.residual)/100) * F(v.rate); return [{ label: 'Monthly Payment', value: '$' + (dep + fee).toFixed(2) }]; },
  },
  'case-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'cat-age-calculator': {
    inputs: [{key:'age',label:'Cat Age (years)',type:'number',defaultValue:3}],
    formula: (v) => { const a=F(v.age); let h=a<=1?15:a<=2?24:24+(a-2)*4; return [{label:'Human Age',value:Math.round(h)+' yrs'},{label:'Stage',value:a<0.5?'Kitten':a<2?'Junior':a<6?'Prime':a<10?'Mature':a<14?'Senior':'Geriatric'}]; },
  },
  'child-cost-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'chmod-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'chronometer': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'coffee-ratio-calculator': {
    inputs: [{key:'coffee',label:'Coffee (g)',type:'number',defaultValue:20},{key:'ratio',label:'Water Ratio (1:X)',type:'number',defaultValue:16}],
    formula: (v) => { const w=F(v.coffee)*F(v.ratio),cups=w/240; return [{label:'Water',value:w.toFixed(0)+' ml'},{label:'Cups',value:cups.toFixed(1)+' cups'},{label:'Strong(1:14)',value:(F(v.coffee)*14)+' ml'},{label:'Light(1:18)',value:(F(v.coffee)*18)+' ml'}]; },
    presets: [{label:'Pour-Over',values:{coffee:20,ratio:16}}],
  },
  'color-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'compound-interest-calculator': {
    inputs: [{key:'principal',label:'Initial Invest ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly Add ($)',type:'number',defaultValue:200},{key:'rate',label:'Return (%)',type:'number',defaultValue:7},{key:'years',label:'Years',type:'number',defaultValue:20}],
    formula: (v) => { const P=F(v.principal),pmt=F(v.monthly),r=F(v.rate)/100/12,n=F(v.years)*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); const inv=P+pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+inv.toFixed(0)},{label:'Interest',value:'$'+(fv-inv).toFixed(0)}]; },
    presets: [{label:'30yr Retire',values:{principal:50000,monthly:500,rate:7,years:30}}],
  },
  'concrete-block-calculator': {
    inputs: [
      {
            "key": "length",
            "label": "Length (ft)",
            "type": "number",
            "defaultValue": 20
      },
      {
            "key": "width",
            "label": "Width (ft)",
            "type": "number",
            "defaultValue": 15
      }
],
    formula: (v) => { const area = F(v.length) * F(v.width); return [{ label: 'Area', value: area.toFixed(0) + ' sq ft' }]; },
  },
  'concrete-calculator': {
    inputs: [
      {
            "key": "length",
            "label": "Length (ft)",
            "type": "number",
            "defaultValue": 20
      },
      {
            "key": "width",
            "label": "Width (ft)",
            "type": "number",
            "defaultValue": 15
      }
],
    formula: (v) => { const area = F(v.length) * F(v.width); return [{ label: 'Area', value: area.toFixed(0) + ' sq ft' }]; },
  },
    'cooking-time-calculator': {
    inputs: [{key:'weight',label:'Weight (lbs)',type:'number',defaultValue:12},{key:'type',label:'Meat',type:'select',options:[{label:'Turkey',value:'turkey'},{label:'Chicken',value:'chicken'},{label:'Beef',value:'beef'},{label:'Pork',value:'pork'}],defaultValue:'turkey'}],
    formula: (v) => { const r={turkey:15,chicken:20,beef:18,pork:25}; const m=F(v.weight)*r[String(v.type)]; return [{label:'Cook Time',value:Math.round(m)+' min ('+(m/60).toFixed(1)+' hrs)'},{label:'Rest Time',value:Math.round(m*0.15)+' min'},{label:'Internal',value:'165 F (poultry)/145 F (beef/pork)'}]; },
  },
  'countdown-timer': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'cpm-calculator': {
    inputs: [{key:'cost',label:'Ad Cost ($)',type:'number',defaultValue:500},{key:'impressions',label:'Impressions',type:'number',defaultValue:100000}],
    formula: (v) => { const cpm=F(v.impressions)>0?F(v.cost)/F(v.impressions)*1000:0; return [{label:'CPM',value:'$'+cpm.toFixed(2)},{label:'CPC (2% CTR)',value:'$'+(cpm/20).toFixed(2)}]; },
  },
  'crontab-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'crypto-profit-calculator': {
    inputs: [
      {
            "key": "revenue",
            "label": "Revenue ($)",
            "type": "number",
            "defaultValue": 10000
      },
      {
            "key": "cost",
            "label": "Cost ($)",
            "type": "number",
            "defaultValue": 7000
      }
],
    formula: (v) => { const p = F(v.revenue) - F(v.cost); const m = F(v.revenue) > 0 ? p / F(v.revenue) * 100 : 0; return [{ label: 'Profit', value: '$' + p.toFixed(2) }, { label: 'Margin', value: m.toFixed(1) + '%' }]; },
  },
    'currency-converter': {
    inputs: [{key:'amount',label:'Amount',type:'number',defaultValue:100},{key:'rate',label:'Exchange Rate',type:'number',defaultValue:0.92,step:0.01}],
    formula: (v) => { const r=F(v.amount)*F(v.rate); return [{label:'Converted',value:r.toFixed(2)},{label:'Inverse',value:(1/F(v.rate)).toFixed(4)}]; },
    presets: [{label:'USD-EUR',values:{amount:100,rate:0.92}},{label:'USD-GBP',values:{amount:100,rate:0.79}}],
  },
  'currency-hedge-calculator': {
    inputs: [
      {
            "key": "amount",
            "label": "Amount",
            "type": "number",
            "defaultValue": 100
      },
      {
            "key": "rate",
            "label": "Exchange Rate",
            "type": "number",
            "defaultValue": 0.92,
            "step": 0.01
      }
],
    formula: (v) => { return [{ label: 'Converted', value: (F(v.amount) * F(v.rate)).toFixed(2) }]; },
  },
  'date-time-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'depth-of-field-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'device-information': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'dice-probability-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'discount-calculator': {
    inputs: [{key:'price',label:'Original Price ($)',type:'number',defaultValue:100},{key:'discount',label:'Discount (%)',type:'number',defaultValue:20}],
    formula: (v) => { const s=F(v.price)*F(v.discount)/100; return [{label:'You Save',value:'$'+s.toFixed(2)},{label:'Final Price',value:'$'+(F(v.price)-s).toFixed(2)}]; },
    presets: [{label:'20pct off',values:{price:100,discount:20}},{label:'50pct off',values:{price:80,discount:50}}],
  },
  'dividend-yield-calculator': {
    inputs: [{key:'div',label:'Annual Dividend ($)',type:'number',defaultValue:2.50},{key:'price',label:'Stock Price ($)',type:'number',defaultValue:50}],
    formula: (v) => { const y=F(v.price)>0?F(v.div)/F(v.price)*100:0; return [{label:'Dividend Yield',value:y.toFixed(2)+'%'},{label:'Monthly/Share',value:'$'+(F(v.div)/12).toFixed(3)}]; },
  },
  'docker-run-to-docker-compose-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'dog-age-calculator': {
    inputs: [{key:'age',label:'Dog Age (years)',type:'number',defaultValue:3},{key:'size',label:'Breed Size',type:'select',options:[{label:'Small (<9kg)',value:'small'},{label:'Medium',value:'medium'},{label:'Large (>23kg)',value:'large'}],defaultValue:'medium'}],
    formula: (v) => { const a=F(v.age); let h=16*Math.log(a)+31; if(v.size==='large')h*=1.15; if(v.size==='small')h*=0.85; return [{label:'Human Age',value:Math.round(h)+' yrs'},{label:'Stage',value:a<1?'Puppy':a<2?'Adolescent':a<7?'Adult':a<10?'Senior':'Geriatric'}]; },
  },
  'down-payment-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'due-date-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'early-payoff-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'electricity-bill-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'elo-rating-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'email-normalizer': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'emi-calculator': {
    inputs: [{key:'loan',label:'Loan ($)',type:'number',defaultValue:20000},{key:'rate',label:'Rate (%)',type:'number',defaultValue:8},{key:'months',label:'Tenure (mo)',type:'number',defaultValue:36}],
    formula: (v) => { const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.months),emi=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'EMI',value:'$'+emi.toFixed(2)},{label:'Total',value:'$'+(emi*n).toFixed(0)},{label:'Interest',value:'$'+(emi*n-P).toFixed(0)}]; },
  },
  'emoji-picker': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'encryption': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'eta-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'fire-calculator': {
    inputs: [
      {
            "key": "currentAge",
            "label": "Current Age",
            "type": "number",
            "defaultValue": 30,
            "min": 18
      },
      {
            "key": "retireAge",
            "label": "Retirement Age",
            "type": "number",
            "defaultValue": 65,
            "min": 40
      },
      {
            "key": "savings",
            "label": "Current Savings ($)",
            "type": "number",
            "defaultValue": 50000
      },
      {
            "key": "monthly",
            "label": "Monthly Contribution ($)",
            "type": "number",
            "defaultValue": 500
      },
      {
            "key": "rate",
            "label": "Expected Return (%)",
            "type": "number",
            "defaultValue": 7,
            "step": 0.1
      }
],
    formula: (v) => { const yrs=F(v.retireAge)-F(v.currentAge); const r=F(v.rate)/100/12; const n=yrs*12; const fv=r>0?F(v.savings)*Math.pow(1+r,n)+F(v.monthly)*((Math.pow(1+r,n)-1)/r):F(v.savings)+F(v.monthly)*n; return [{ label: 'At Retirement', value: '$'+Math.round(fv).toLocaleString() }]; },
  },
  'flooring-calculator': {
    inputs: [
      {
            "key": "length",
            "label": "Length (ft)",
            "type": "number",
            "defaultValue": 20
      },
      {
            "key": "width",
            "label": "Width (ft)",
            "type": "number",
            "defaultValue": 15
      }
],
    formula: (v) => { const area = F(v.length) * F(v.width); return [{ label: 'Area', value: area.toFixed(0) + ' sq ft' }]; },
  },
  'fob-cif-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'food-calorie-calculator': {
    inputs: [
      {
            "key": "weight",
            "label": "Weight (kg)",
            "type": "number",
            "defaultValue": 75
      },
      {
            "key": "height",
            "label": "Height (cm)",
            "type": "number",
            "defaultValue": 175
      },
      {
            "key": "age",
            "label": "Age",
            "type": "number",
            "defaultValue": 30
      },
      {
            "key": "activity",
            "label": "Activity",
            "type": "select",
            "options": [
                  {
                        "label": "Sedentary",
                        "value": "1.2"
                  },
                  {
                        "label": "Light",
                        "value": "1.375"
                  },
                  {
                        "label": "Moderate",
                        "value": "1.55"
                  },
                  {
                        "label": "Active",
                        "value": "1.725"
                  }
            ],
            "defaultValue": "1.55"
      }
],
    formula: (v) => { const bmr = 10*F(v.weight) + 6.25*F(v.height) - 5*F(v.age) + 5; return [{ label: 'BMR', value: Math.round(bmr) + ' kcal' }, { label: 'TDEE', value: Math.round(bmr * F(v.activity)) + ' kcal' }]; },
  },
  'fps-bottleneck-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'fuel-cost-calculator': {
    inputs: [{key:'distance',label:'Distance (miles)',type:'number',defaultValue:300},{key:'mpg',label:'Fuel Econ (MPG)',type:'number',defaultValue:25},{key:'fuelPrice',label:'Fuel Price ($/gal)',type:'number',defaultValue:3.50}],
    formula: (v) => { const gal=F(v.distance)/F(v.mpg),cost=gal*F(v.fuelPrice); return [{label:'Fuel Needed',value:gal.toFixed(1)+' gal'},{label:'Trip Cost',value:'$'+cost.toFixed(2)},{label:'$/Mile',value:'$'+(F(v.fuelPrice)/F(v.mpg)).toFixed(3)}]; },
    presets: [{label:'300mi Trip',values:{distance:300,mpg:25,fuelPrice:3.50}}],
  },
  'fuel-economy-calculator': {
    inputs: [
      {
            "key": "distance",
            "label": "Distance (miles)",
            "type": "number",
            "defaultValue": 300
      },
      {
            "key": "mpg",
            "label": "Fuel Economy (MPG)",
            "type": "number",
            "defaultValue": 25
      },
      {
            "key": "price",
            "label": "Price per Gallon ($)",
            "type": "number",
            "defaultValue": 3.5,
            "step": 0.01
      }
],
    formula: (v) => { const gal=F(v.distance)/(F(v.mpg)||1); return [{ label: 'Fuel Needed', value: gal.toFixed(1)+' gal' }, { label: 'Total Cost', value: '$'+(gal*F(v.price)).toFixed(2) }]; },
  },
  'git-memo': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'golden-ratio-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'gpa-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'grade-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'graphing-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'habit-tracker': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'hash-text': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'heart-rate-zone-calculator': {
    inputs: [{key:'age',label:'Age',type:'number',defaultValue:30},{key:'restingHR',label:'Resting HR (bpm)',type:'number',defaultValue:65}],
    formula: (v) => { const mx=208-0.7*F(v.age),hrr=mx-F(v.restingHR); return [{label:'Max HR',value:Math.round(mx)+' bpm'},{label:'Zone 2 FatBurn',value:Math.round(F(v.restingHR)+hrr*0.5)+'-'+Math.round(F(v.restingHR)+hrr*0.6)+' bpm'},{label:'Zone 4 Threshold',value:Math.round(F(v.restingHR)+hrr*0.7)+'-'+Math.round(F(v.restingHR)+hrr*0.8)+' bpm'},{label:'Zone 5 Max',value:Math.round(F(v.restingHR)+hrr*0.8)+'-'+Math.round(mx)+' bpm'}]; },
  },
  'hmac-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'home-equity-calculator': {
    inputs: [{key:'value',label:'Home Value ($)',type:'number',defaultValue:350000},{key:'mortgage',label:'Mortgage ($)',type:'number',defaultValue:200000}],
    formula: (v) => { const e=F(v.value)-F(v.mortgage),p=F(v.value)>0?e/F(v.value)*100:0; return [{label:'Equity',value:'$'+e.toLocaleString()},{label:'Equity %',value:p.toFixed(1)+'%'},{label:'LTV',value:(100-p).toFixed(1)+'%'}]; },
  },
  'html-entities': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'html-wysiwyg-editor': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'http-status-codes': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'hvac-btu-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'iban-validator-and-parser': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'ideal-weight-calculator': {
    inputs: [{key:'height',label:'Height (cm)',type:'number',defaultValue:170},{key:'gender',label:'Gender',type:'select',options:[{label:'Male',value:'male'},{label:'Female',value:'female'}],defaultValue:'male'}],
    formula: (v) => { const h=F(v.height); const rob=v.gender==='male'?52+1.9*(h-152.4)/2.54:49+1.7*(h-152.4)/2.54; const mill=v.gender==='male'?56.2+1.41*(h-152.4)/2.54:53.1+1.36*(h-152.4)/2.54; const low=18.5*(h/100)*(h/100),high=24.9*(h/100)*(h/100); return [{label:'BMI Range',value:low.toFixed(0)+'-'+high.toFixed(0)+' kg'},{label:'Robinson',value:rob.toFixed(1)+' kg'},{label:'Miller',value:mill.toFixed(1)+' kg'}]; },
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
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'inflation-calculator': {
    inputs: [{key:'amount',label:'Amount ($)',type:'number',defaultValue:10000},{key:'rate',label:'Inflation (%)',type:'number',defaultValue:3},{key:'years',label:'Years',type:'number',defaultValue:10}],
    formula: (v) => { const f=F(v.amount)*Math.pow(1+F(v.rate)/100,F(v.years)),t=F(v.amount)/Math.pow(1+F(v.rate)/100,F(v.years)); return [{label:'Future Cost',value:'$'+f.toFixed(2)},{label:'Today Worth',value:'$'+t.toFixed(2)}]; },
  },
  'ingredient-substitution-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'integer-base-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'invoice-hours-calculator': {
    inputs: [{key:'hours',label:'Hours Worked',type:'number',defaultValue:40,step:0.5},{key:'rate',label:'Hourly Rate ($)',type:'number',defaultValue:75}],
    formula: (v) => { const s=F(v.hours)*F(v.rate); return [{label:'Subtotal',value:'$'+s.toFixed(2)},{label:'Tax (15%)',value:'$'+(s*0.15).toFixed(2)},{label:'Total',value:'$'+(s*1.15).toFixed(2)}]; },
  },
  'ipv4-address-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'ipv4-range-expander': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'ipv4-subnet-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'ipv6-ula-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'json-diff': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'json-minify': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'json-to-csv': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'json-to-toml': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'json-to-xml': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'json-to-yaml-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'json-viewer': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'jwt-parser': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'keycode-info': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'landed-cost-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'lease-vs-buy-car-calculator': {
    inputs: [
      {
            "key": "price",
            "label": "Vehicle Price ($)",
            "type": "number",
            "defaultValue": 35000
      },
      {
            "key": "residual",
            "label": "Residual (%)",
            "type": "number",
            "defaultValue": 55
      },
      {
            "key": "rate",
            "label": "Money Factor",
            "type": "number",
            "defaultValue": 0.0025,
            "step": 0.0001
      },
      {
            "key": "months",
            "label": "Lease Term (months)",
            "type": "number",
            "defaultValue": 36
      }
],
    formula: (v) => { const net = F(v.price) * (1 - F(v.residual)/100); const dep = net / F(v.months); const fee = (F(v.price) + F(v.price) * F(v.residual)/100) * F(v.rate); return [{ label: 'Monthly Payment', value: '$' + (dep + fee).toFixed(2) }]; },
  },
  'led-resistor-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'list-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'loan-comparison-calculator': {
    inputs: [
      {
            "key": "amount",
            "label": "Loan Amount ($)",
            "type": "number",
            "defaultValue": 20000
      },
      {
            "key": "rate",
            "label": "Interest Rate (%)",
            "type": "number",
            "defaultValue": 8,
            "step": 0.1
      },
      {
            "key": "years",
            "label": "Term (years)",
            "type": "number",
            "defaultValue": 5
      }
],
    formula: (v) => { const r=F(v.rate)/100/12; const n=F(v.years)*12; const P=F(v.amount); const M=r>0?P*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1):P/n; return [{ label: 'Monthly', value: '$'+M.toFixed(2) }, { label: 'Total Interest', value: '$'+(M*n-P).toFixed(2) }]; },
  },
  'lorem-ipsum-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'lumber-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'mac-address-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'mac-address-lookup': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'macro-calculator': {
    inputs: [{key:'calories',label:'Daily Calories',type:'number',defaultValue:2000},{key:'protein',label:'Protein (%)',type:'number',defaultValue:30},{key:'fat',label:'Fat (%)',type:'number',defaultValue:25}],
    formula: (v) => { const cal=F(v.calories),p=F(v.protein),f=F(v.fat),c=100-p-f; return [{label:'Protein',value:Math.round(cal*p/100/4)+'g'},{label:'Carbs',value:Math.round(cal*c/100/4)+'g'},{label:'Fat',value:Math.round(cal*f/100/9)+'g'}]; },
    presets: [{label:'Balanced',values:{calories:2000,protein:30,fat:25}},{label:'Keto',values:{calories:2000,protein:25,fat:70}}],
  },
  'markdown-to-html': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'math-evaluator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'meme-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'meta-tag-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'mileage-calculator': {
    inputs: [
      {
            "key": "distance",
            "label": "Distance (miles)",
            "type": "number",
            "defaultValue": 300
      },
      {
            "key": "mpg",
            "label": "Fuel Economy (MPG)",
            "type": "number",
            "defaultValue": 25
      },
      {
            "key": "price",
            "label": "Price per Gallon ($)",
            "type": "number",
            "defaultValue": 3.5,
            "step": 0.01
      }
],
    formula: (v) => { const gal=F(v.distance)/(F(v.mpg)||1); return [{ label: 'Fuel Needed', value: gal.toFixed(1)+' gal' }, { label: 'Total Cost', value: '$'+(gal*F(v.price)).toFixed(2) }]; },
  },
  'mime-types': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
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
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'ohms-law-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'otp-code-generator-and-validator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'ovulation-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'paint-calculator': {
    inputs: [
      {
            "key": "length",
            "label": "Length (ft)",
            "type": "number",
            "defaultValue": 20
      },
      {
            "key": "width",
            "label": "Width (ft)",
            "type": "number",
            "defaultValue": 15
      }
],
    formula: (v) => { const area = F(v.length) * F(v.width); return [{ label: 'Area', value: area.toFixed(0) + ' sq ft' }]; },
  },
  'party-drink-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'password-strength-analyser': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'pdf-signature-checker': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'percentage-calculator': {
    inputs: [{key:'value',label:'Part Value',type:'number',defaultValue:42},{key:'total',label:'Total Value',type:'number',defaultValue:60}],
    formula: (v) => { const p=F(v.total)>0?F(v.value)/F(v.total)*100:0; return [{label:'Percentage',value:p.toFixed(2)+'%'},{label:'Remaining',value:(100-p).toFixed(2)+'%'}]; },
    presets: [{label:'42/60',values:{value:42,total:60}},{label:'85/100',values:{value:85,total:100}}],
  },
  'pet-breed-mix-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'pet-calorie-calculator': {
    inputs: [
      {
            "key": "weight",
            "label": "Weight (kg)",
            "type": "number",
            "defaultValue": 75
      },
      {
            "key": "height",
            "label": "Height (cm)",
            "type": "number",
            "defaultValue": 175
      },
      {
            "key": "age",
            "label": "Age",
            "type": "number",
            "defaultValue": 30
      },
      {
            "key": "activity",
            "label": "Activity",
            "type": "select",
            "options": [
                  {
                        "label": "Sedentary",
                        "value": "1.2"
                  },
                  {
                        "label": "Light",
                        "value": "1.375"
                  },
                  {
                        "label": "Moderate",
                        "value": "1.55"
                  },
                  {
                        "label": "Active",
                        "value": "1.725"
                  }
            ],
            "defaultValue": "1.55"
      }
],
    formula: (v) => { const bmr = 10*F(v.weight) + 6.25*F(v.height) - 5*F(v.age) + 5; return [{ label: 'BMR', value: Math.round(bmr) + ' kcal' }, { label: 'TDEE', value: Math.round(bmr * F(v.activity)) + ' kcal' }]; },
  },
  'phone-parser-and-formatter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'photo-print-size-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'poker-odds-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'pomodoro-timer': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'ppi-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'probability-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'profit-margin-calculator': {
    inputs: [{key:'price',label:'Selling Price ($)',type:'number',defaultValue:100},{key:'cost',label:'COGS ($)',type:'number',defaultValue:60}],
    formula: (v) => { const p=F(v.price)-F(v.cost),m=F(v.price)>0?p/F(v.price)*100:0,mu=F(v.cost)>0?p/F(v.cost)*100:0; return [{label:'Profit',value:'$'+p.toFixed(2)},{label:'Margin',value:m.toFixed(1)+'%'},{label:'Markup',value:mu.toFixed(1)+'%'}]; },
  },
  'property-tax-calculator': {
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
  'qr-code-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'random-port-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'recipe-converter': {
    inputs: [
      {
            "key": "servings",
            "label": "Recipe Servings",
            "type": "number",
            "defaultValue": 4
      },
      {
            "key": "desired",
            "label": "Desired Servings",
            "type": "number",
            "defaultValue": 6
      }
],
    formula: (v) => { const ratio = F(v.desired) / (F(v.servings) || 1); return [{ label: 'Scale Factor', value: ratio.toFixed(2) + 'x' }]; },
  },
  'regex-memo': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'regex-tester': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'renovation-cost-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'rent-vs-buy-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'resistor-color-code-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
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
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'roofing-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'rsa-key-pair-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'safelink-decoder': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
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
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'seating-chart-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'sleep-cycle-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'slugify-string': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'solar-roi-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'sql-prettify': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'statistics-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'steps-to-miles-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'stock-return-calculator': {
    inputs: [{key:'buy',label:'Buy Price ($)',type:'number',defaultValue:100},{key:'sell',label:'Sell Price ($)',type:'number',defaultValue:130},{key:'shares',label:'Shares',type:'number',defaultValue:10}],
    formula: (v) => { const p=(F(v.sell)-F(v.buy))*F(v.shares),pct=F(v.buy)>0?(F(v.sell)-F(v.buy))/F(v.buy)*100:0; return [{label:'P&L',value:'$'+p.toFixed(2)},{label:'Return',value:pct.toFixed(2)+'%'}]; },
  },
  'stopwatch': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'string-obfuscator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'svg-placeholder-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'tariff-impact-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'tdee-calculator': {
    inputs: [
      {
            "key": "weight",
            "label": "Weight (kg)",
            "type": "number",
            "defaultValue": 75
      },
      {
            "key": "height",
            "label": "Height (cm)",
            "type": "number",
            "defaultValue": 175
      },
      {
            "key": "age",
            "label": "Age",
            "type": "number",
            "defaultValue": 30
      },
      {
            "key": "activity",
            "label": "Activity",
            "type": "select",
            "options": [
                  {
                        "label": "Sedentary",
                        "value": "1.2"
                  },
                  {
                        "label": "Light",
                        "value": "1.375"
                  },
                  {
                        "label": "Moderate",
                        "value": "1.55"
                  },
                  {
                        "label": "Active",
                        "value": "1.725"
                  }
            ],
            "defaultValue": "1.55"
      }
],
    formula: (v) => { const bmr = 10*F(v.weight) + 6.25*F(v.height) - 5*F(v.age) + 5; return [{ label: 'BMR', value: Math.round(bmr) + ' kcal' }, { label: 'TDEE', value: Math.round(bmr * F(v.activity)) + ' kcal' }]; },
  },
    'temperature-converter': {
    inputs: [{key:'celsius',label:'Celsius',type:'number',defaultValue:20},{key:'toUnit',label:'Convert To',type:'select',options:[{label:'Fahrenheit',value:'f'},{label:'Kelvin',value:'k'},{label:'Both',value:'both'}],defaultValue:'both'}],
    formula: (v) => { const c=F(v.celsius),f=c*9/5+32,k=c+273.15; const r=[]; if(v.toUnit==='f'||v.toUnit==='both')r.push({label:'Fahrenheit',value:f.toFixed(1)+' degF'}); if(v.toUnit==='k'||v.toUnit==='both')r.push({label:'Kelvin',value:k.toFixed(1)+' K'}); r.push({label:'Celsius',value:c.toFixed(1)+' degC'}); return r; },
    presets: [{label:'Freezing',values:{celsius:0,toUnit:'both'}},{label:'Body',values:{celsius:37,toUnit:'both'}},{label:'Boiling',values:{celsius:100,toUnit:'both'}}],
  },
  'text-diff': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'text-statistics': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'text-to-binary': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'text-to-nato-alphabet': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'text-to-unicode': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'time-zone-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'tip-calculator': {
    inputs: [{key:'bill',label:'Bill Amount ($)',type:'number',defaultValue:80},{key:'tipPct',label:'Tip (%)',type:'number',defaultValue:18},{key:'people',label:'Split Among',type:'number',defaultValue:3}],
    formula: (v) => { const tip=F(v.bill)*F(v.tipPct)/100,total=F(v.bill)+tip,pp=F(v.people)>0?total/F(v.people):total; return [{label:'Tip',value:'$'+tip.toFixed(2)},{label:'Total',value:'$'+total.toFixed(2)},{label:'Per Person',value:'$'+pp.toFixed(2)}]; },
    presets: [{label:'15pct',values:{bill:50,tipPct:15,people:2}},{label:'20pct',values:{bill:80,tipPct:20,people:3}}],
  },
  'tire-size-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'token-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'toml-to-json': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'toml-to-yaml': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'travel-budget-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'ulid-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'url-encoder': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'url-parser': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
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
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'water-footprint-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
    'water-intake-calculator': {
    inputs: [{key:'weight',label:'Weight (lbs)',type:'number',defaultValue:150},{key:'activity',label:'Activity',type:'select',options:[{label:'Sedentary',value:'1'},{label:'Moderate',value:'1.2'},{label:'Active',value:'1.4'}],defaultValue:'1'}],
    formula: (v) => { const b=F(v.weight)*0.67*F(v.activity); return [{label:'Daily Water',value:b.toFixed(0)+' oz'},{label:'Liters',value:(b/33.8).toFixed(1)+' L'},{label:'8oz Glasses',value:Math.round(b/8)+' glasses'}]; },
  },
  'wedding-budget-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'wedding-countdown-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'wheel-spinner': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'wifi-qr-code-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'wire-size-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'xml-formatter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'xml-to-json': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'yaml-to-json-converter': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'yaml-to-toml': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'yaml-viewer': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'zodiac-love-compatibility': {
    inputs: [{key:'s1',label:'Your Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'scorpio'},{key:'s2',label:'Partner Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'pisces'}],
    formula: (v) => { const el:Record<string,string>={aries:'Fire',leo:'Fire',sagittarius:'Fire',taurus:'Earth',virgo:'Earth',capricorn:'Earth',gemini:'Air',libra:'Air',aquarius:'Air',cancer:'Water',scorpio:'Water',pisces:'Water'}; const e1=el[String(v.s1)],e2=el[String(v.s2)]; let sc=50; if(e1===e2)sc+=25; else if((e1==='Fire'&&e2==='Air')||(e1==='Air'&&e2==='Fire')||(e1==='Earth'&&e2==='Water')||(e1==='Water'&&e2==='Earth'))sc+=15; else if((e1==='Fire'&&e2==='Water')||(e1==='Water'&&e2==='Fire')||(e1==='Air'&&e2==='Earth')||(e1==='Earth'&&e2==='Air'))sc-=10; const vd=sc>=90?'Soulmates!':sc>=75?'Great Match':sc>=60?'Good':sc>=40?'Challenging':'Difficult'; return [{label:'Compatibility',value:sc+'%'},{label:'Verdict',value:vd},{label:'Elements',value:e1+' + '+e2}]; },
  },
    'sheng-xiao-compatibility': {
    inputs: [{key:'z1',label:'Your Sign',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'dragon'},{key:'z2',label:'Partner',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'monkey'}],
    formula: (v) => { const h={rat:['dragon','monkey'],ox:['snake','rooster'],tiger:['horse','dog'],rabbit:['goat','pig'],dragon:['rat','monkey'],snake:['ox','rooster'],horse:['tiger','dog'],goat:['rabbit','pig'],monkey:['rat','dragon'],rooster:['ox','snake'],dog:['tiger','horse'],pig:['rabbit','goat']}; const c={rat:'horse',ox:'goat',tiger:'monkey',rabbit:'rooster',dragon:'dog',snake:'pig',horse:'rat',goat:'ox',monkey:'tiger',rooster:'rabbit',dog:'dragon',pig:'snake'}; let s=50; if(h[v.z1]&&h[v.z1].includes(v.z2))s+=35; if(c[v.z1]===v.z2)s-=30; if(v.z1===v.z2)s+=15; return [{label:'Match',value:s+'%'},{label:'Rating',value:s>=90?'Heaven-Matched':s>=70?'Great':s>=50?'OK':s>=30?'Challenging':'Clash'}]; },
  },
    'numerology-calculator': {
    inputs: [{key:'birthDate',label:'Birth Date',type:'text',defaultValue:'1990-05-15'}],
    formula: (v) => { const rd=(n)=>{while(n>9&&n!==11&&n!==22&&n!==33)n=String(n).split('').reduce((a,b)=>a+Number(b),0);return n;}; const s=String(v.birthDate).replace(/-/g,''); if(s.length<8)return[{label:'LP',value:'Enter date'}]; const lp=rd(s.split('').reduce((a,b)=>a+Number(b),0)); const names={1:'Leader',2:'Diplomat',3:'Creator',4:'Builder',5:'Adventurer',6:'Nurturer',7:'Thinker',8:'Achiever',9:'Humanitarian',11:'Master Intuitive',22:'Master Builder',33:'Master Teacher'}; return [{label:'Life Path',value:String(lp)+(lp>9?' (Master!)':'')},{label:'Archetype',value:names[lp]||'Unknown'}]; },
  },
  'ba-zi-calculator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'i-ching-divination': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'tarot-reading': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'past-life-finder': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'name-compatibility': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'love-calculator': {
    inputs: [{key:'name1',label:'Your Name',type:'text',defaultValue:'Romeo'},{key:'name2',label:'Crush Name',type:'text',defaultValue:'Juliet'}],
    formula: (v) => { const h=(s:string)=>s.toLowerCase().replace(/[^a-z]/g,'').split('').reduce((a,c)=>a+c.charCodeAt(0),0); const seed=h(String(v.name1))*h(String(v.name2)); const score=((seed*7919+104729)%89)+11; return [{label:'Love',value:score+'%'},{label:'Verdict',value:score>=80?'Epic!':score>=60?'Sweet':score>=40?'Cute':'Hmm...'}]; },
  },
    'soulmate-finder': {
    inputs: [{key:'b1',label:'Your Birthday',type:'text',defaultValue:'1990-05-15'},{key:'b2',label:'Partner Birthday',type:'text',defaultValue:'1992-08-22'}],
    formula: (v) => { const rd=(n)=>{while(n>9&&n!==11&&n!==22&&n!==33)n=String(n).split('').reduce((a,b)=>a+Number(b),0);return n;}; const d1=String(v.b1).replace(/-/g,''),d2=String(v.b2).replace(/-/g,''); if(d1.length<8||d2.length<8)return[{label:'Score',value:'Enter both dates'}]; const lp1=rd(d1.split('').reduce((a,b)=>a+Number(b),0)),lp2=rd(d2.split('').reduce((a,b)=>a+Number(b),0)); const grps=[[1,5,7],[2,4,8],[3,6,9]]; const sg=grps.some(g=>g.includes(lp1)&&g.includes(lp2)); const lps=lp1===lp2?95:sg?82:50; const m1=Number(d1.slice(4,6)),m2=Number(d2.slice(4,6)),sd=Math.abs(m1-m2),ss=sd<=1?90:sd<=2?78:45; const f=Math.min(99,Math.round(lps*0.5+ss*0.5)); return [{label:'Soulmate',value:f+'%'},{label:'Type',value:f>=90?'Twin Flames':f>=75?'Deep Bond':f>=55?'Karmic':f>=35?'Growth':'Passing'},{label:'Your LP',value:String(lp1)},{label:'Partner LP',value:String(lp2)}]; },
  },
  'daily-fortune': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  },
  'lucky-number-generator': {
    inputs: [
      {
            "key": "input1",
            "label": "Input 1",
            "type": "number",
            "defaultValue": 0
      },
      {
            "key": "input2",
            "label": "Input 2",
            "type": "number",
            "defaultValue": 0
      }
],
    formula: (v) => { const a = F(v.input1) || 0; const b = F(v.input2) || 0; return [{ label: 'Sum', value: String(a + b) }, { label: 'Product', value: String(a * b) }]; },
  }
};

export function getFormula(id: string): FormulaConfig | undefined {
  return formulaRegistry[id];
}
