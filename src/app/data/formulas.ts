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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'baby-growth-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'bakers-percentage-calculator': {
    inputs: [
      {
            "key": "value",
            "label": "Value",
            "type": "number",
            "defaultValue": 50
      },
      {
            "key": "total",
            "label": "Total",
            "type": "number",
            "defaultValue": 200
      }
],
    presets: [{ label: "Score 42/60", values: { value: 42, total: 60 } }],
    formula: (v) => { const pct = F(v.total) > 0 ? F(v.value) / F(v.total) * 100 : 0; return [{ label: 'Percentage', value: pct.toFixed(2) + '%' }, { label: 'Remaining', value: (100-pct).toFixed(2) + '%' }]; },
  },
  'base64-file-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'base64-string-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'basic-auth-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'bcrypt': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'beam-load-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'benchmark-builder': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'bip39-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'bmi-calculator': {
    inputs: [
      {
            "key": "weight",
            "label": "Weight (kg)",
            "type": "number",
            "defaultValue": 70
      },
      {
            "key": "height",
            "label": "Height (cm)",
            "type": "number",
            "defaultValue": 170
      }
],
    formula: (v) => { const h = F(v.height) / 100; const bmi = F(v.weight) / (h * h); let cat='Normal'; if(bmi<18.5) cat='Underweight'; else if(bmi>=30) cat='Obese'; else if(bmi>=25) cat='Overweight'; return [{ label: 'BMI', value: bmi.toFixed(1) }, { label: 'Category', value: cat }]; },
  },
  'body-fat-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'break-even-calculator': {
    inputs: [{key:'fixedCosts',label:'Fixed Costs ($)',type:'number',defaultValue:10000},{key:'price',label:'Price per Unit ($)',type:'number',defaultValue:50},{key:'variableCost',label:'Variable Cost/Unit ($)',type:'number',defaultValue:30}],
    formula: (v) => { const fc=F(v.fixedCosts),p=F(v.price),vc=F(v.variableCost),cm=p-vc,be=cm>0?Math.ceil(fc/cm):0; return [{label:'Break-Even Units',value:String(be)},{label:'Revenue at BE',value:'$'+(be*p).toFixed(0)},{label:'Margin/Unit',value:'$'+cm.toFixed(2)}]; },
  },
  'bsa-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'camera-recorder': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'cat-age-calculator': {
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
  'child-cost-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'chmod-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'chronometer': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'coffee-ratio-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'color-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'compound-interest-calculator': {
    inputs: [
      {
            "key": "principal",
            "label": "Principal ($)",
            "type": "number",
            "defaultValue": 10000
      },
      {
            "key": "rate",
            "label": "Annual Rate (%)",
            "type": "number",
            "defaultValue": 7,
            "step": 0.1
      },
      {
            "key": "years",
            "label": "Years",
            "type": "number",
            "defaultValue": 10
      },
      {
            "key": "monthly",
            "label": "Monthly Addition ($)",
            "type": "number",
            "defaultValue": 100
      }
],
    formula: (v) => { const P=F(v.principal); const r=F(v.rate)/100/12; const n=F(v.years)*12; const M=F(v.monthly); const fv=r>0 ? P*Math.pow(1+r,n)+M*((Math.pow(1+r,n)-1)/r) : P+M*n; return [{ label: 'Future Value', value: '$'+Math.round(fv).toLocaleString() }]; },
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
  'countdown-timer': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'cpm-calculator': {
    inputs: [{key:'cost',label:'Ad Cost ($)',type:'number',defaultValue:500},{key:'impressions',label:'Impressions',type:'number',defaultValue:100000}],
    formula: (v) => { const cpm=F(v.impressions)>0?F(v.cost)/F(v.impressions)*1000:0; return [{label:'CPM',value:'$'+cpm.toFixed(2)},{label:'CPC (2% CTR)',value:'$'+(cpm/20).toFixed(2)}]; },
  },
  'crontab-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'depth-of-field-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'device-information': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'dice-probability-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'discount-calculator': {
    inputs: [
      {
            "key": "price",
            "label": "Original Price ($)",
            "type": "number",
            "defaultValue": 100
      },
      {
            "key": "percent",
            "label": "Discount (%)",
            "type": "number",
            "defaultValue": 20
      }
],
    presets: [{ label: "10% off", values: { percent: 10 } }, { label: "25% off", values: { percent: 25 } }, { label: "50% off", values: { percent: 50 } }],
    formula: (v) => { const d = F(v.price) * F(v.percent) / 100; return [{ label: 'You Save', value: '$' + d.toFixed(2) }, { label: 'Final Price', value: '$' + (F(v.price) - d).toFixed(2) }]; },
  },
  'dividend-yield-calculator': {
    inputs: [{key:'div',label:'Annual Dividend ($)',type:'number',defaultValue:2.50},{key:'price',label:'Stock Price ($)',type:'number',defaultValue:50}],
    formula: (v) => { const y=F(v.price)>0?F(v.div)/F(v.price)*100:0; return [{label:'Dividend Yield',value:y.toFixed(2)+'%'},{label:'Monthly/Share',value:'$'+(F(v.div)/12).toFixed(3)}]; },
  },
  'docker-run-to-docker-compose-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'dog-age-calculator': {
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
  'down-payment-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'due-date-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'early-payoff-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'electricity-bill-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'elo-rating-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'email-normalizer': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'emi-calculator': {
    inputs: [{key:'loan',label:'Loan Amount ($)',type:'number',defaultValue:20000},{key:'rate',label:'Annual Rate (%)',type:'number',defaultValue:8},{key:'months',label:'Tenure (months)',type:'number',defaultValue:36}],
    formula: (v) => { const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.months),emi=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly EMI',value:'$'+emi.toFixed(2)},{label:'Total Payment',value:'$'+(emi*n).toFixed(0)},{label:'Total Interest',value:'$'+(emi*n-P).toFixed(0)}]; },
  },
  'emoji-picker': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'encryption': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'eta-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'fuel-cost-calculator': {
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'golden-ratio-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'gpa-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'grade-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'graphing-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'habit-tracker': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'hash-text': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'heart-rate-zone-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'hmac-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'home-equity-calculator': {
    inputs: [{key:'value',label:'Home Value ($)',type:'number',defaultValue:350000},{key:'mortgage',label:'Mortgage Balance ($)',type:'number',defaultValue:200000}],
    formula: (v) => { const eq=F(v.value)-F(v.mortgage),pct=F(v.value)>0?eq/F(v.value)*100:0; return [{label:'Home Equity',value:'$'+eq.toLocaleString()},{label:'Equity %',value:pct.toFixed(1)+'%'},{label:'LTV',value:(100-pct).toFixed(1)+'%'}]; },
  },
  'html-entities': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'html-wysiwyg-editor': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'http-status-codes': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'hvac-btu-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'iban-validator-and-parser': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ideal-weight-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'inflation-calculator': {
    inputs: [{key:'amount',label:'Amount ($)',type:'number',defaultValue:10000},{key:'rate',label:'Inflation Rate (%)',type:'number',defaultValue:3},{key:'years',label:'Years',type:'number',defaultValue:10}],
    formula: (v) => { const f=F(v.amount)*Math.pow(1+F(v.rate)/100,F(v.years)),t=F(v.amount)/Math.pow(1+F(v.rate)/100,F(v.years)); return [{label:'Future Value',value:'$'+f.toFixed(2)},{label:'Today\'s Worth',value:'$'+t.toFixed(2)}]; },
  },
  'ingredient-substitution-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'integer-base-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'invoice-hours-calculator': {
    inputs: [{key:'hours',label:'Hours Worked',type:'number',defaultValue:40,step:0.5},{key:'rate',label:'Hourly Rate ($)',type:'number',defaultValue:75}],
    formula: (v) => { const s=F(v.hours)*F(v.rate); return [{label:'Subtotal',value:'$'+s.toFixed(2)},{label:'Tax (15%)',value:'$'+(s*0.15).toFixed(2)},{label:'Total',value:'$'+(s*1.15).toFixed(2)}]; },
  },
  'ipv4-address-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ipv4-range-expander': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ipv4-subnet-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ipv6-ula-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'json-diff': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'json-minify': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'json-to-csv': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'json-to-toml': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'json-to-xml': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'json-to-yaml-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'json-viewer': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'jwt-parser': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'keycode-info': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'landed-cost-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'list-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'lumber-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'mac-address-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'mac-address-lookup': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'macro-calculator': {
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
  'markdown-to-html': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'math-evaluator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'meme-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'meta-tag-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'mortgage-calculator': {
    inputs: [
      {
            "key": "price",
            "label": "Home Price ($)",
            "type": "number",
            "defaultValue": 300000
      },
      {
            "key": "down",
            "label": "Down Payment (%)",
            "type": "number",
            "defaultValue": 20
      },
      {
            "key": "rate",
            "label": "Interest Rate (%)",
            "type": "number",
            "defaultValue": 6.5,
            "step": 0.1
      },
      {
            "key": "years",
            "label": "Loan Term (years)",
            "type": "number",
            "defaultValue": 30
      }
],
    presets: [{ label: "15-year", values: { years: 15 } }, { label: "30-year", values: { years: 30 } }],
    formula: (v) => { const P = F(v.price) * (1 - F(v.down)/100); const r = F(v.rate)/100/12; const n = F(v.years)*12; const M = r > 0 ? P*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1) : P/n; return [{ label: 'Monthly', value: '$' + Math.round(M).toLocaleString() }, { label: 'Total Interest', value: '$' + Math.round(M*n - P).toLocaleString() }]; },
  },
  'net-worth-calculator': {
    inputs: [{key:'cash',label:'Cash & Bank ($)',type:'number',defaultValue:10000},{key:'investments',label:'Investments ($)',type:'number',defaultValue:50000},{key:'property',label:'Property ($)',type:'number',defaultValue:300000},{key:'debt',label:'Total Debt ($)',type:'number',defaultValue:200000}],
    formula: (v) => { const a=F(v.cash)+F(v.investments)+F(v.property),d=F(v.debt); return [{label:'Total Assets',value:'$'+a.toLocaleString()},{label:'Total Liabilities',value:'$'+d.toLocaleString()},{label:'Net Worth',value:'$'+(a-d).toLocaleString()}]; },
  },
  'numeronym-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ohms-law-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'otp-code-generator-and-validator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ovulation-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'password-strength-analyser': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'pdf-signature-checker': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'percentage-calculator': {
    inputs: [
      {
            "key": "value",
            "label": "Value",
            "type": "number",
            "defaultValue": 50
      },
      {
            "key": "total",
            "label": "Total",
            "type": "number",
            "defaultValue": 200
      }
],
    presets: [{ label: "Score 42/60", values: { value: 42, total: 60 } }],
    formula: (v) => { const pct = F(v.total) > 0 ? F(v.value) / F(v.total) * 100 : 0; return [{ label: 'Percentage', value: pct.toFixed(2) + '%' }, { label: 'Remaining', value: (100-pct).toFixed(2) + '%' }]; },
  },
  'pet-breed-mix-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'photo-print-size-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'poker-odds-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'pomodoro-timer': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ppi-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'probability-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'profit-margin-calculator': {
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'random-port-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'regex-tester': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'renovation-cost-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'rent-vs-buy-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'resistor-color-code-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'retirement-calculator': {
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
  'roi-calculator': {
    inputs: [{key:'invested',label:'Invested ($)',type:'number',defaultValue:10000},{key:'returned',label:'Returned ($)',type:'number',defaultValue:12000}],
    formula: (v) => { const roi=F(v.invested)>0?(F(v.returned)-F(v.invested))/F(v.invested)*100:0; return [{label:'ROI',value:roi.toFixed(2)+'%'},{label:'Gain/Loss',value:'$'+(F(v.returned)-F(v.invested)).toFixed(2)}]; },
  },
  'roman-numeral-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'roofing-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'rsa-key-pair-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'safelink-decoder': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'seating-chart-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'sleep-cycle-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'slugify-string': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'solar-roi-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'sql-prettify': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'statistics-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'steps-to-miles-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'stock-return-calculator': {
    inputs: [{key:'buy',label:'Buy Price ($)',type:'number',defaultValue:100},{key:'sell',label:'Sell Price ($)',type:'number',defaultValue:130},{key:'shares',label:'Shares',type:'number',defaultValue:10}],
    formula: (v) => { const p=(F(v.sell)-F(v.buy))*F(v.shares),pct=F(v.buy)>0?(F(v.sell)-F(v.buy))/F(v.buy)*100:0; return [{label:'Profit/Loss',value:'$'+p.toFixed(2)},{label:'Return %',value:pct.toFixed(2)+'%'}]; },
  },
  'stopwatch': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'string-obfuscator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'svg-placeholder-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'tariff-impact-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'text-diff': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'text-statistics': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'text-to-binary': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'text-to-nato-alphabet': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'text-to-unicode': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'time-zone-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'tip-calculator': {
    inputs: [
      {
            "key": "amount",
            "label": "Bill Amount ($)",
            "type": "number",
            "defaultValue": 50
      },
      {
            "key": "percent",
            "label": "Tip (%)",
            "type": "number",
            "defaultValue": 18
      },
      {
            "key": "people",
            "label": "Split Among",
            "type": "number",
            "defaultValue": 2,
            "min": 1
      }
],
    presets: [{ label: "15%", values: { percent: 15 } }, { label: "18%", values: { percent: 18 } }, { label: "20%", values: { percent: 20 } }],
    formula: (v) => { const tip = F(v.amount) * F(v.percent) / 100; const total = F(v.amount) + tip; const pp = total / (F(v.people) || 1); return [{ label: 'Tip', value: '$' + tip.toFixed(2) }, { label: 'Total', value: '$' + total.toFixed(2) }, { label: 'Per Person', value: '$' + pp.toFixed(2) }]; },
  },
  'tire-size-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'token-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'toml-to-json': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'toml-to-yaml': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'travel-budget-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ulid-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'url-encoder': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'url-parser': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
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
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'water-footprint-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'water-intake-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'wedding-budget-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'wedding-countdown-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'wheel-spinner': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'wifi-qr-code-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'wire-size-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'xml-formatter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'xml-to-json': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'yaml-to-json-converter': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'yaml-to-toml': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'yaml-viewer': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'zodiac-love-compatibility': {
    inputs: [{key:'s1',label:'Your Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'scorpio'},{key:'s2',label:'Partner Sign',type:'select',options:[{label:'Aries',value:'aries'},{label:'Taurus',value:'taurus'},{label:'Gemini',value:'gemini'},{label:'Cancer',value:'cancer'},{label:'Leo',value:'leo'},{label:'Virgo',value:'virgo'},{label:'Libra',value:'libra'},{label:'Scorpio',value:'scorpio'},{label:'Sagittarius',value:'sagittarius'},{label:'Capricorn',value:'capricorn'},{label:'Aquarius',value:'aquarius'},{label:'Pisces',value:'pisces'}],defaultValue:'pisces'}],
    formula: (v) => { const el:Record<string,string>={aries:'Fire',leo:'Fire',sagittarius:'Fire',taurus:'Earth',virgo:'Earth',capricorn:'Earth',gemini:'Air',libra:'Air',aquarius:'Air',cancer:'Water',scorpio:'Water',pisces:'Water'}; const e1=el[String(v.s1)],e2=el[String(v.s2)]; let sc=50; if(e1===e2)sc+=25; else if((e1==='Fire'&&e2==='Air')||(e1==='Air'&&e2==='Fire')||(e1==='Earth'&&e2==='Water')||(e1==='Water'&&e2==='Earth'))sc+=15; else if((e1==='Fire'&&e2==='Water')||(e1==='Water'&&e2==='Fire')||(e1==='Air'&&e2==='Earth')||(e1==='Earth'&&e2==='Air'))sc-=10; const vd=sc>=90?'Soulmates!':sc>=75?'Great Match':sc>=60?'Good':sc>=40?'Challenging':'Difficult'; return [{label:'Compatibility',value:sc+'%'},{label:'Verdict',value:vd},{label:'Elements',value:e1+' + '+e2}]; },
  },
  'sheng-xiao-compatibility': {
    inputs: [{key:'z1',label:'Your Sign',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'dragon'},{key:'z2',label:'Partner',type:'select',options:[{label:'Rat',value:'rat'},{label:'Ox',value:'ox'},{label:'Tiger',value:'tiger'},{label:'Rabbit',value:'rabbit'},{label:'Dragon',value:'dragon'},{label:'Snake',value:'snake'},{label:'Horse',value:'horse'},{label:'Goat',value:'goat'},{label:'Monkey',value:'monkey'},{label:'Rooster',value:'rooster'},{label:'Dog',value:'dog'},{label:'Pig',value:'pig'}],defaultValue:'monkey'}],
    formula: (v) => { const h:Record<string,string[]>={rat:['dragon','monkey'],ox:['snake','rooster'],tiger:['horse','dog'],rabbit:['goat','pig'],dragon:['rat','monkey'],snake:['ox','rooster'],horse:['tiger','dog'],goat:['rabbit','pig'],monkey:['rat','dragon'],rooster:['ox','snake'],dog:['tiger','horse'],pig:['rabbit','goat']}; const c:Record<string,string>={rat:'horse',ox:'goat',tiger:'monkey',rabbit:'rooster',dragon:'dog',snake:'pig',horse:'rat',goat:'ox',monkey:'tiger',rooster:'rabbit',dog:'dragon',pig:'snake'}; let s=50; if(h[String(v.z1)]?.includes(String(v.z2)))s+=35; if(c[String(v.z1)]===String(v.z2))s-=30; if(v.z1===v.z2)s+=15; return [{label:'Match',value:s+'%'},{label:'Rating',value:s>=90?'Heaven-Matched':s>=70?'Great':s>=50?'Compatible':s>=30?'Challenging':'Clash'}]; },
  },
  'numerology-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'ba-zi-calculator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'i-ching-divination': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'tarot-reading': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'past-life-finder': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'name-compatibility': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'love-calculator': {
    inputs: [{key:'name1',label:'Your Name',type:'text',defaultValue:'Romeo'},{key:'name2',label:'Crush Name',type:'text',defaultValue:'Juliet'}],
    formula: (v) => { const h=(s:string)=>s.toLowerCase().replace(/[^a-z]/g,'').split('').reduce((a,c)=>a+c.charCodeAt(0),0); const seed=h(String(v.name1))*h(String(v.name2)); const score=((seed*7919+104729)%89)+11; return [{label:'Love',value:score+'%'},{label:'Verdict',value:score>=80?'Epic!':score>=60?'Sweet':score>=40?'Cute':'Hmm...'}]; },
  },
  'soulmate-finder': {
    inputs: [{key:'b1',label:'Your Birthday',type:'text',defaultValue:'1990-05-15'},{key:'b2',label:'Partner Birthday',type:'text',defaultValue:'1992-08-22'}],
    formula: (v) => { const rd=(n:number):number=>n<10||n===11||n===22||n===33?n:rd(String(n).split('').reduce((a,b)=>a+Number(b),0)); const d1=String(v.b1).replace(/-/g,''),d2=String(v.b2).replace(/-/g,''); if(d1.length<8||d2.length<8)return[{label:'Score',value:'Enter dates'}]; const lp1=rd(d1.split('').reduce((a,b)=>a+Number(b),0)),lp2=rd(d2.split('').reduce((a,b)=>a+Number(b),0)); const grps=[[1,5,7],[2,4,8],[3,6,9]]; const sg=grps.some(g=>g.includes(lp1)&&g.includes(lp2)); const lps=lp1===lp2?95:sg?82:50; const m1=Number(d1.slice(4,6)),m2=Number(d2.slice(4,6)),sd=Math.abs(m1-m2),ss=sd<=1?90:sd<=2?78:sd<=3?62:45; const f=Math.min(99,Math.round(lps*0.5+ss*0.5)); return [{label:'Soulmate Score',value:f+'%'},{label:'Type',value:f>=90?'Twin Flames':f>=75?'Deep Bond':f>=55?'Karmic':f>=35?'Growth':'Passing'},{label:'Your LP',value:String(lp1)},{label:'Partner LP',value:String(lp2)}]; },
  },
  'daily-fortune': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
  'lucky-number-generator': {
    inputs: [{key:'val1',label:'Value 1',type:'number',defaultValue:10},{key:'val2',label:'Value 2',type:'number',defaultValue:20},{key:'val3',label:'Value 3',type:'number',defaultValue:5}],
    formula: (v) => { const a=F(v.val1),b=F(v.val2),c=F(v.val3); return [{label:'Sum',value:String(a+b+c)},{label:'Average',value:((a+b+c)/3).toFixed(2)},{label:'Max',value:String(Math.max(a,b,c))},{label:'Min',value:String(Math.min(a,b,c))}]; },
  },
};

export function getFormula(id: string): FormulaConfig | undefined {
  return formulaRegistry[id];
}
