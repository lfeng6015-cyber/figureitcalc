"""
Complete formula generator — creates real formulas for ALL tools that have generic input1/input2.
Reads the current formulas.ts, identifies broken entries, and replaces them inline.
"""
import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Dictionary: tool_id -> compact formula string (no leading spaces, no trailing comma)
FORMULAS = {}

# Template for simple number tools
def simple_inputs(*args):
    """args: alternating key, label, default"""
    parts = []
    for i in range(0, len(args), 3):
        k, lbl, dflt = args[i], args[i+1], args[i+2]
        parts.append(f"{{ key: '{k}', label: '{lbl}', type: 'number', defaultValue: {dflt} }}")
    return "inputs: [" + ", ".join(parts) + "]"

def text_input(key, label, default):
    return f"{{ key: '{key}', label: '{label}', type: 'text', defaultValue: '{default}' }}"

def select_input(key, label, options_list, default):
    opts = ", ".join(f"{{ label: '{l}', value: '{v}' }}" for l, v in options_list)
    return f"{{ key: '{key}', label: '{label}', type: 'select', options: [{opts}], defaultValue: '{default}' }}"

# ============== FINANCE ==============
FORMULAS['annuity-calculator'] = f"""
  'annuity-calculator': {{
    {simple_inputs('payment','Periodic Payment ($)',1000, 'rate','Annual Interest Rate (%)',6, 'periods','Number of Periods (years)',20)},
    formula: (v) => {{ const pmt=F(v.payment),r=F(v.rate)/100,n=F(v.periods); const fv=r>0?pmt*((Math.pow(1+r,n)-1)/r):pmt*n; return [{{label:'Future Value',value:'$'+fv.toFixed(2)}},{{label:'Total Invested',value:'$'+(pmt*n).toFixed(0)}},{{label:'Interest Earned',value:'$'+(fv-pmt*n).toFixed(0)}}]; }},
    presets: [{{label:'Retire 20yr',values:{{payment:1000,rate:6,periods:20}}}}],
  }},"""

FORMULAS['break-even-calculator'] = f"""
  'break-even-calculator': {{
    {simple_inputs('fixedCosts','Fixed Costs ($)',10000, 'pricePerUnit','Price per Unit ($)',50, 'variableCost','Variable Cost per Unit ($)',30)},
    formula: (v) => {{ const fc=F(v.fixedCosts),p=F(v.pricePerUnit),vc=F(v.variableCost),cm=p-vc; const be=cm>0?Math.ceil(fc/cm):0; return [{{label:'Break-Even Units',value:String(be)}},{{label:'Break-Even Revenue',value:'$'+(be*p).toFixed(0)}},{{label:'Contribution Margin/Unit',value:'$'+cm.toFixed(2)}}]; }},
  }},"""

FORMULAS['car-depreciation-calculator'] = f"""
  'car-depreciation-calculator': {{
    {simple_inputs('purchasePrice','Purchase Price ($)',35000, 'years','Years Owned',5)},
    formula: (v) => {{ const p=F(v.purchasePrice),y=F(v.years); let val=p; for(let i=0;i<y;i++)val*=(i===0?0.78:i===1?0.85:i===2?0.88:0.90); return [{{label:'Current Value',value:'$'+val.toFixed(0)}},{{label:'Total Depreciation',value:'$'+(p-val).toFixed(0)}},{{label:'Depreciation %',value:((1-val/p)*100).toFixed(0)+'%'}}]; }},
  }},"""

FORMULAS['car-loan-calculator'] = f"""
  'car-loan-calculator': {{
    {simple_inputs('carPrice','Car Price ($)',35000, 'downPct','Down Payment (%)',20, 'rate','APR (%)',6, 'term','Loan Term (months)',60)},
    formula: (v) => {{ const P=F(v.carPrice)*(1-F(v.downPct)/100),r=F(v.rate)/100/12,n=F(v.term); const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{{label:'Monthly Payment',value:'$'+M.toFixed(2)}},{{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)}},{{label:'Down Payment',value:'$'+(F(v.carPrice)*F(v.downPct)/100).toFixed(0)}}]; }},
    presets: [{{label:'New Car 60mo',values:{{carPrice:35000,downPct:20,rate:6,term:60}}}}],
  }},"""

FORMULAS['car-tax-calculator'] = f"""
  'car-tax-calculator': {{
    {simple_inputs('carPrice','Car Price ($)',35000, 'tradeIn','Trade-In Value ($)',10000, 'taxRate','Sales Tax Rate (%)',7)},
    formula: (v) => {{ const taxable=Math.max(0,F(v.carPrice)-F(v.tradeIn)); const tax=taxable*F(v.taxRate)/100; return [{{label:'Taxable Amount',value:'$'+taxable.toFixed(0)}},{{label:'Sales Tax',value:'$'+tax.toFixed(2)}},{{label:'Total with Tax',value:'$'+(taxable+tax).toFixed(0)}}]; }},
  }},"""

FORMULAS['carbon-footprint-calculator'] = f"""
  'carbon-footprint-calculator': {{
    {simple_inputs('carMiles','Annual Car Miles',12000, 'flights','Flights per Year',2, 'electricity','Monthly kWh',500, 'meat','Meat Meals per Week',5)},
    formula: (v) => {{ const co2=F(v.carMiles)*0.000404+F(v.flights)*0.25+F(v.electricity)*12*0.00092+F(v.meat)*52*0.007; return [{{label:'Annual CO2',value:co2.toFixed(1)+' metric tons'}},{{label:'US Average',value:'16 tons'}},{{label:'Global Average',value:'4 tons'}}]; }},
  }},"""

FORMULAS['child-cost-calculator'] = f"""
  'child-cost-calculator': {{
    {simple_inputs('childcare','Monthly Childcare ($)',1200, 'food','Monthly Food ($)',300, 'clothing','Monthly Clothing ($)',100)},
    formula: (v) => {{ const monthly=F(v.childcare)+F(v.food)+F(v.clothing); const annual=monthly*12; const to18=annual*18; return [{{label:'Monthly Cost',value:'$'+monthly.toFixed(0)}},{{label:'Annual Cost',value:'$'+annual.toFixed(0)}},{{label:'0-18 Years Total',value:'$'+to18.toFixed(0)}}]; }},
  }},"""

FORMULAS['compound-interest-calculator'] = f"""
  'compound-interest-calculator': {{
    {simple_inputs('principal','Initial Investment ($)',10000, 'monthly','Monthly Addition ($)',200, 'rate','Annual Return (%)',7, 'years','Investment Period (years)',20)},
    formula: (v) => {{ const P=F(v.principal),pmt=F(v.monthly),r=F(v.rate)/100/12,n=F(v.years)*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); const inv=P+pmt*n; return [{{label:'Future Value',value:'$'+fv.toFixed(2)}},{{label:'Total Invested',value:'$'+inv.toFixed(2)}},{{label:'Interest Earned',value:'$'+(fv-inv).toFixed(2)}}]; }},
    presets: [{{label:'Retire 30yr',values:{{principal:50000,monthly:500,rate:7,years:30}}}},{{label:'College 18yr',values:{{principal:10000,monthly:300,rate:6,years:18}}}}],
  }},"""

FORMULAS['cpm-calculator'] = f"""
  'cpm-calculator': {{
    {simple_inputs('cost','Ad Campaign Cost ($)',500, 'impressions','Total Impressions',100000)},
    formula: (v) => {{ const cpm=F(v.impressions)>0?F(v.cost)/F(v.impressions)*1000:0; return [{{label:'CPM',value:'$'+cpm.toFixed(2)}},{{label:'Cost per 1000 Views',value:'$'+cpm.toFixed(2)}}]; }},
    presets: [{{label:'Display Ads',values:{{cost:500,impressions:100000}}}},{{label:'Video Ads',values:{{cost:2000,impressions:50000}}}}],
  }},"""

FORMULAS['crypto-profit-calculator'] = f"""
  'crypto-profit-calculator': {{
    {simple_inputs('buyPrice','Buy Price ($)',40000, 'sellPrice','Sell Price ($)',50000, 'amount','Amount (coins)',0.1)},
    formula: (v) => {{ const gross=(F(v.sellPrice)-F(v.buyPrice))*F(v.amount); return [{{label:'Net Profit',value:'$'+gross.toFixed(2)}},{{label:'ROI',value:(gross/(F(v.buyPrice)*F(v.amount))*100).toFixed(1)+'%'}}]; }},
  }},"""

FORMULAS['currency-hedge-calculator'] = f"""
  'currency-hedge-calculator': {{
    {simple_inputs('amount','Transaction Amount ($)',100000, 'currentRate','Current Exchange Rate',1.10, 'forwardRate','Forward Rate',1.08)},
    formula: (v) => {{ const hedged=F(v.amount)*F(v.forwardRate); const unhedged=F(v.amount)*F(v.currentRate); return [{{label:'Hedged Value',value:'$'+hedged.toFixed(0)}},{{label:'Unhedged (est)',value:'$'+unhedged.toFixed(0)}},{{label:'Difference',value:'$'+(hedged-unhedged).toFixed(0)}}]; }},
  }},"""

FORMULAS['dividend-yield-calculator'] = f"""
  'dividend-yield-calculator': {{
    {simple_inputs('annualDiv','Annual Dividend/Share ($)',2.50, 'stockPrice','Stock Price ($)',50)},
    formula: (v) => {{ const y=F(v.stockPrice)>0?F(v.annualDiv)/F(v.stockPrice)*100:0; return [{{label:'Dividend Yield',value:y.toFixed(2)+'%'}},{{label:'Monthly/Share',value:'$'+(F(v.annualDiv)/12).toFixed(3)}},{{label:'Payout Ratio Check',value:y>8?'High — investigate':'Healthy range'}}]; }},
  }},"""

FORMULAS['down-payment-calculator'] = f"""
  'down-payment-calculator': {{
    {simple_inputs('homePrice','Home Price ($)',300000, 'targetPct','Target Down (%)',20, 'currentSavings','Current Savings ($)',30000, 'monthlySaving','Monthly Savings ($)',1000)},
    formula: (v) => {{ const target=F(v.homePrice)*F(v.targetPct)/100; const needed=Math.max(0,target-F(v.currentSavings)); const months=F(v.monthlySaving)>0?Math.ceil(needed/F(v.monthlySaving)):999; return [{{label:'Down Payment Needed',value:'$'+target.toLocaleString()}},{{label:'Remaining',value:'$'+needed.toLocaleString()}},{{label:'Months to Save',value:months>=999?'N/A':String(months)}}]; }},
  }},"""

FORMULAS['early-payoff-calculator'] = f"""
  'early-payoff-calculator': {{
    {simple_inputs('loan','Loan Balance ($)',200000, 'rate','Interest Rate (%)',6, 'remainingMonths','Remaining Months',300, 'extraPayment','Extra per Month ($)',200)},
    formula: (v) => {{ const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.remainingMonths); const normal=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); let bal=P,mo=0,pmt=normal+F(v.extraPayment); while(bal>0&&mo<1500){{bal=bal*(1+r)-pmt;mo++;}} const saved=normal*n-pmt*mo; return [{{label:'Payoff in',value:mo+' months'}},{{label:'Interest Saved',value:'$'+Math.max(0,saved).toFixed(0)}}]; }},
  }},"""

FORMULAS['electricity-bill-calculator'] = f"""
  'electricity-bill-calculator': {{
    {simple_inputs('kwh','Monthly kWh Usage',900, 'rate','Electricity Rate ($/kWh)',0.17)},
    formula: (v) => {{ const bill=F(v.kwh)*F(v.rate); return [{{label:'Monthly Bill',value:'$'+bill.toFixed(2)}},{{label:'Annual Cost',value:'$'+(bill*12).toFixed(0)}},{{label:'Daily Cost',value:'$'+(bill/30).toFixed(2)}}]; }},
  }},"""

FORMULAS['emi-calculator'] = f"""
  'emi-calculator': {{
    {simple_inputs('loan','Loan Amount ($)',20000, 'rate','Annual Interest Rate (%)',8, 'tenure','Tenure (months)',36)},
    formula: (v) => {{ const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.tenure); const emi=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{{label:'Monthly EMI',value:'$'+emi.toFixed(2)}},{{label:'Total Payment',value:'$'+(emi*n).toFixed(0)}},{{label:'Total Interest',value:'$'+(emi*n-P).toFixed(0)}}]; }},
  }},"""

FORMULAS['fob-cif-converter'] = f"""
  'fob-cif-converter': {{
    {simple_inputs('fob','FOB Price ($)',10000, 'freight','Freight Cost ($)',2000, 'insurance','Insurance ($)',100)},
    formula: (v) => {{ const cif=F(v.fob)+F(v.freight)+F(v.insurance); return [{{label:'CIF Value',value:'$'+cif.toFixed(2)}},{{label:'Freight + Insurance',value:'$'+(F(v.freight)+F(v.insurance)).toFixed(2)}},{{label:'Insurance Rate',value:(F(v.insurance)/cif*100).toFixed(2)+'%'}}]; }},
  }},"""

FORMULAS['food-calorie-calculator'] = f"""
  'food-calorie-calculator': {{
    inputs: [{text_input('food','Food Item','chicken breast')}, {{ key: 'grams', label: 'Serving (g)', type: 'number', defaultValue: 200 }}],
    formula: (v) => {{ const calPer100g:Record<string,number>={{'chicken breast':165,'rice':130,'bread':265,'egg':155,'apple':52,'banana':89,'salmon':208,'pasta':131,'potato':77,'broccoli':34}}; const food=String(v.food).toLowerCase(); const cal=Object.entries(calPer100g).find(([k])=>food.includes(k)); const per100=cal?cal[1]:150; const total=per100*F(v.grams)/100; return [{{label:'Calories',value:total.toFixed(0)+' kcal'}},{{label:'Per 100g',value:per100+' kcal'}},{{label:'Protein (est)',value:(total*0.25).toFixed(0)+'g'}}]; }},
  }},"""

FORMULAS['fuel-cost-calculator'] = f"""
  'fuel-cost-calculator': {{
    {simple_inputs('distance','Trip Distance (miles)',300, 'mpg','Vehicle MPG',25, 'fuelPrice','Fuel Price ($/gal)',3.50)},
    formula: (v) => {{ const gal=F(v.distance)/F(v.mpg); const cost=gal*F(v.fuelPrice); return [{{label:'Fuel Needed',value:gal.toFixed(1)+' gallons'}},{{label:'Trip Cost',value:'$'+cost.toFixed(2)}},{{label:'Cost per Mile',value:'$'+(F(v.fuelPrice)/F(v.mpg)).toFixed(2)}}]; }},
  }},"""

FORMULAS['fuel-economy-calculator'] = f"""
  'fuel-economy-calculator': {{
    {simple_inputs('miles','Miles Driven',300, 'gallons','Gallons Used',12)},
    formula: (v) => {{ const mpg=F(v.gallons)>0?F(v.miles)/F(v.gallons):0; const l100km=mpg>0?235.215/mpg:0; return [{{label:'MPG',value:mpg.toFixed(1)}},{{label:'L/100km',value:l100km.toFixed(1)}},{{label:'Cost at $3.50/gal',value:'$'+(F(v.gallons)*3.5).toFixed(2)}}]; }},
  }},"""

FORMULAS['home-equity-calculator'] = f"""
  'home-equity-calculator': {{
    {simple_inputs('homeValue','Home Value ($)',350000, 'mortgageBalance','Mortgage Balance ($)',200000)},
    formula: (v) => {{ const eq=F(v.homeValue)-F(v.mortgageBalance); const pct=F(v.homeValue)>0?eq/F(v.homeValue)*100:0; return [{{label:'Home Equity',value:'$'+eq.toLocaleString()}},{{label:'Equity %',value:pct.toFixed(1)+'%'}},{{label:'LTV',value:(100-pct).toFixed(1)+'%'}}]; }},
  }},"""

FORMULAS['import-duty-calculator'] = f"""
  'import-duty-calculator': {{
    {simple_inputs('cif','CIF Value ($)',10000, 'dutyRate','Duty Rate (%)',10, 'vatRate','VAT/GST (%)',0)},
    formula: (v) => {{ const duty=F(v.cif)*F(v.dutyRate)/100; const vat=(F(v.cif)+duty)*F(v.vatRate)/100; return [{{label:'Duty',value:'$'+duty.toFixed(2)}},{{label:'VAT/GST',value:'$'+vat.toFixed(2)}},{{label:'Total Import Cost',value:'$'+(F(v.cif)+duty+vat).toFixed(2)}}]; }},
  }},"""

FORMULAS['inflation-calculator'] = f"""
  'inflation-calculator': {{
    {simple_inputs('amount','Current Amount ($)',10000, 'rate','Inflation Rate (%)',3, 'years','Years',10)},
    formula: (v) => {{ const future=F(v.amount)*Math.pow(1+F(v.rate)/100,F(v.years)); const today=F(v.amount)/Math.pow(1+F(v.rate)/100,F(v.years)); return [{{label:'Future Value Needed',value:'$'+future.toFixed(2)}},{{label:'Today\\'s Purchasing Power',value:'$'+today.toFixed(2)}},{{label:'Value Lost',value:((1-today/F(v.amount))*100).toFixed(1)+'%'}}]; }},
  }},"""

FORMULAS['invoice-hours-calculator'] = f"""
  'invoice-hours-calculator': {{
    {simple_inputs('hours','Hours Worked',40, 'rate','Hourly Rate ($)',75)},
    formula: (v) => {{ const subtotal=F(v.hours)*F(v.rate); const tax=subtotal*0.15; return [{{label:'Subtotal',value:'$'+subtotal.toFixed(2)}},{{label:'Tax (15%)',value:'$'+tax.toFixed(2)}},{{label:'Total Due',value:'$'+(subtotal+tax).toFixed(2)}}]; }},
  }},"""

FORMULAS['landed-cost-calculator'] = f"""
  'landed-cost-calculator': {{
    {simple_inputs('fob','FOB Price ($)',10000, 'freight','Freight ($)',2000, 'insurance','Insurance ($)',100, 'dutyRate','Duty Rate (%)',10)},
    formula: (v) => {{ const cif=F(v.fob)+F(v.freight)+F(v.insurance); const duty=cif*F(v.dutyRate)/100; return [{{label:'CIF Value',value:'$'+cif.toFixed(2)}},{{label:'Duty',value:'$'+duty.toFixed(2)}},{{label:'Landed Cost',value:'$'+(cif+duty).toFixed(2)}}]; }},
  }},"""

FORMULAS['lease-vs-buy-car-calculator'] = f"""
  'lease-vs-buy-car-calculator': {{
    {simple_inputs('carPrice','Car Price ($)',35000, 'leasePayment','Lease Payment ($/mo)',450, 'loanPayment','Loan Payment ($/mo)',650, 'months','Months',36)},
    formula: (v) => {{ const lease=F(v.leasePayment)*F(v.months); const buy=F(v.loanPayment)*F(v.months)-F(v.carPrice)*0.5; return [{{label:'Total Lease Cost',value:'$'+lease.toFixed(0)}},{{label:'Total Buy Cost',value:'$'+buy.toFixed(0)}},{{label:'Better',value:lease<buy?'Lease cheaper':'Buy cheaper'}}]; }},
  }},"""

FORMULAS['loan-comparison-calculator'] = f"""
  'loan-comparison-calculator': {{
    {simple_inputs('loan1','Loan 1 Amount ($)',200000, 'rate1','Loan 1 Rate (%)',6, 'term1','Loan 1 Term (years)',30, 'loan2','Loan 2 Amount ($)',200000, 'rate2','Loan 2 Rate (%)',5.5, 'term2','Loan 2 Term (years)',15)},
    formula: (v) => {{ const calc=(P:number,rate:number,yrs:number)=>{{const mr=rate/100/12,mn=yrs*12;const pmt=mr>0?P*mr*Math.pow(1+mr,mn)/(Math.pow(1+mr,mn)-1):P/mn;return{{monthly:pmt,total:pmt*mn}};}};const l1=calc(F(v.loan1),F(v.rate1),F(v.term1)),l2=calc(F(v.loan2),F(v.rate2),F(v.term2));return[{{label:'Loan 1 Monthly',value:'$'+l1.monthly.toFixed(2)}},{{label:'Loan 1 Total',value:'$'+l1.total.toFixed(0)}},{{label:'Loan 2 Monthly',value:'$'+l2.monthly.toFixed(2)}},{{label:'Loan 2 Total',value:'$'+l2.total.toFixed(0)}},{{label:'Savings',value:'$'+Math.abs(l1.total-l2.total).toFixed(0)}}]; }},
  }},"""

FORMULAS['mileage-calculator'] = f"""
  'mileage-calculator': {{
    {simple_inputs('miles','Business Miles',500, 'rate','IRS Rate ($/mile)',0.70)},
    formula: (v) => {{ const reimb=F(v.miles)*F(v.rate); return [{{label:'Reimbursement',value:'$'+reimb.toFixed(2)}},{{label:'Tax Deduction',value:'$'+reimb.toFixed(2)}}]; }},
  }},"""

FORMULAS['net-worth-calculator'] = f"""
  'net-worth-calculator': {{
    {simple_inputs('cash','Cash & Bank ($)',10000, 'investments','Investments ($)',50000, 'property','Property ($)',300000, 'mortgage','Mortgage ($)',200000, 'loans','Other Loans ($)',15000)},
    formula: (v) => {{ const assets=F(v.cash)+F(v.investments)+F(v.property); const liabilities=F(v.mortgage)+F(v.loans); return [{{label:'Total Assets',value:'$'+assets.toLocaleString()}},{{label:'Total Liabilities',value:'$'+liabilities.toLocaleString()}},{{label:'Net Worth',value:'$'+(assets-liabilities).toLocaleString()}}]; }},
  }},"""

FORMULAS['property-tax-calculator'] = f"""
  'property-tax-calculator': {{
    {simple_inputs('assessedValue','Assessed Value ($)',300000, 'taxRate','Tax Rate (%)',1.2)},
    formula: (v) => {{ const annual=F(v.assessedValue)*F(v.taxRate)/100; return [{{label:'Annual Tax',value:'$'+annual.toFixed(2)}},{{label:'Monthly',value:'$'+(annual/12).toFixed(2)}}]; }},
  }},"""

FORMULAS['renovation-cost-calculator'] = f"""
  'renovation-cost-calculator': {{
    {simple_inputs('kitchen','Kitchen Renovation ($)',25000, 'bathroom','Bathroom ($)',12000, 'flooring','Flooring ($)',5000, 'painting','Painting ($)',3000)},
    formula: (v) => {{ const total=F(v.kitchen)+F(v.bathroom)+F(v.flooring)+F(v.painting); return [{{label:'Total Estimate',value:'$'+total.toLocaleString()}},{{label:'With 15% Buffer',value:'$'+(total*1.15).toFixed(0)}}]; }},
  }},"""

FORMULAS['rent-vs-buy-calculator'] = f"""
  'rent-vs-buy-calculator': {{
    {simple_inputs('rent','Monthly Rent ($)',1500, 'homePrice','Home Price ($)',350000, 'rate','Mortgage Rate (%)',6.5, 'years','Years Compare',7)},
    formula: (v) => {{ const rTotal=F(v.rent)*12*F(v.years); const P=F(v.homePrice)*0.8,r=F(v.rate)/100/12,n=30*12; const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; const bTotal=F(v.homePrice)*0.2+M*12*F(v.years); return [{{label:'Rent Total',value:'$'+rTotal.toLocaleString()}},{{label:'Buy Total',value:'$'+bTotal.toLocaleString()}},{{label:'Verdict',value:rTotal<bTotal?'Renting cheaper':'Buying may be better'}}]; }},
  }},"""

FORMULAS['roi-calculator'] = f"""
  'roi-calculator': {{
    {simple_inputs('invested','Amount Invested ($)',10000, 'returned','Amount Returned ($)',12000)},
    formula: (v) => {{ const roi=F(v.invested)>0?(F(v.returned)-F(v.invested))/F(v.invested)*100:0; return [{{label:'ROI',value:roi.toFixed(2)+'%'}},{{label:'Gain/Loss',value:'$'+(F(v.returned)-F(v.invested)).toFixed(2)}}]; }},
  }},"""

FORMULAS['savings-goal-calculator'] = f"""
  'savings-goal-calculator': {{
    {simple_inputs('goal','Savings Goal ($)',100000, 'current','Current Savings ($)',10000, 'monthly','Monthly Savings ($)',500, 'rate','Annual Interest (%)',5)},
    formula: (v) => {{ const r=F(v.rate)/100/12; let bal=F(v.current),mo=0; while(bal<F(v.goal)&&mo<1200){{bal=bal*(1+r)+F(v.monthly);mo++;}} return [{{label:'Months to Goal',value:String(mo)}},{{label:'Years',value:(mo/12).toFixed(1)}}]; }},
  }},"""

FORMULAS['solar-roi-calculator'] = f"""
  'solar-roi-calculator': {{
    {simple_inputs('systemCost','System Cost ($)',18000, 'annualSavings','Annual Electric Savings ($)',1800)},
    formula: (v) => {{ const net=F(v.systemCost)*0.7; const payback=F(v.annualSavings)>0?net/F(v.annualSavings):0; return [{{label:'Net Cost (after 30% credit)',value:'$'+net.toFixed(0)}},{{label:'Payback Period',value:payback.toFixed(1)+' years'}},{{label:'25-Year Savings',value:'$'+(F(v.annualSavings)*25-net).toFixed(0)}}]; }},
  }},"""

FORMULAS['stock-return-calculator'] = f"""
  'stock-return-calculator': {{
    {simple_inputs('buyPrice','Buy Price ($)',100, 'sellPrice','Sell Price ($)',130, 'shares','Number of Shares',10)},
    formula: (v) => {{ const profit=(F(v.sellPrice)-F(v.buyPrice))*F(v.shares); const pct=F(v.buyPrice)>0?(F(v.sellPrice)-F(v.buyPrice))/F(v.buyPrice)*100:0; return [{{label:'Profit/Loss',value:'$'+profit.toFixed(2)}},{{label:'Return %',value:pct.toFixed(2)+'%'}},{{label:'Total Value',value:'$'+(F(v.sellPrice)*F(v.shares)).toFixed(2)}}]; }},
  }},"""

FORMULAS['tariff-impact-calculator'] = f"""
  'tariff-impact-calculator': {{
    {simple_inputs('fob','FOB Unit Cost ($)',100, 'oldRate','Current Tariff (%)',10, 'newRate','New Tariff (%)',25, 'units','Units per Shipment',1000)},
    formula: (v) => {{ const old=F(v.fob)*F(v.oldRate)/100*F(v.units); const nw=F(v.fob)*F(v.newRate)/100*F(v.units); return [{{label:'Old Total Duty',value:'$'+old.toFixed(0)}},{{label:'New Total Duty',value:'$'+nw.toFixed(0)}},{{label:'Extra Cost',value:'$'+(nw-old).toFixed(0)}},{{label:'% Increase',value:old>0?((nw-old)/old*100).toFixed(0)+'%':'N/A'}}]; }},
  }},"""

FORMULAS['travel-budget-calculator'] = f"""
  'travel-budget-calculator': {{
    {simple_inputs('days','Trip Duration (days)',7, 'flight','Flight ($)',400, 'hotel','Hotel/Night ($)',150, 'food','Food/Day ($)',50, 'activities','Activities ($)',500)},
    formula: (v) => {{ const total=F(v.flight)+F(v.hotel)*F(v.days)+F(v.food)*F(v.days)+F(v.activities); return [{{label:'Total Cost',value:'$'+total.toFixed(0)}},{{label:'Per Day',value:'$'+(total/F(v.days)).toFixed(0)}}]; }},
  }},"""

# Count
print(f"Generated {len(FORMULAS)} formula definitions")

# Now replace broken entries
pat = re.compile(r"^  '([a-z0-9-]+)':\s*\{(?:(?!^  ').)*?formula:\s*\([^)]*\)\s*=>\s*\{[^}]*\}\s*\}", re.MULTILINE | re.DOTALL)

def replace_broken(match):
    tool_id = match.group(1)
    return FORMULAS.get(tool_id, match.group(0))

new_content = pat.sub(replace_broken, content)
fixed = len(re.findall(r"input1", content)) - len(re.findall(r"input1", new_content))
print(f"Fixed {fixed} broken formulas")

with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.write(new_content)
