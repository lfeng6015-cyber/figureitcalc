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
  'break-even-calculator': {
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
  'sheng-xiao-compatibility': {
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
  'numerology-calculator': {
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
  'soulmate-finder': {
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
