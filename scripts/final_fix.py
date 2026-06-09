"""
Final fix: generate compact real formulas for all broken tools and replace inline.
Each broken block (with input1/input2) gets replaced with a compact, functional formula.
"""
import re

with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Comprehensive replacements: {tool_id: compact_formula_ts_code}
R = {}

def fmt(inp_str, calc_str):
    """Create a compact formula entry"""
    return inp_str.strip() + "\n    formula: (v) => { " + calc_str.strip() + " },"

# === FINANCE ===
R['annuity-calculator'] = """  'annuity-calculator': {
    inputs: [{key:'payment',label:'Periodic Payment ($)',type:'number',defaultValue:1000},{key:'rate',label:'Annual Interest (%)',type:'number',defaultValue:6},{key:'periods',label:'Years',type:'number',defaultValue:20}],
    formula: (v) => { const pmt=F(v.payment),r=F(v.rate)/100,n=F(v.periods); const fv=r>0?pmt*((Math.pow(1+r,n)-1)/r):pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+(pmt*n).toFixed(0)},{label:'Interest',value:'$'+(fv-pmt*n).toFixed(0)}]; },
  },"""

R['break-even-calculator'] = """  'break-even-calculator': {
    inputs: [{key:'fixedCosts',label:'Fixed Costs ($)',type:'number',defaultValue:10000},{key:'price',label:'Price/Unit ($)',type:'number',defaultValue:50},{key:'variableCost',label:'Variable Cost/Unit ($)',type:'number',defaultValue:30}],
    formula: (v) => { const fc=F(v.fixedCosts),p=F(v.price),vc=F(v.variableCost),cm=p-vc,be=cm>0?Math.ceil(fc/cm):0; return [{label:'Break-Even Units',value:String(be)},{label:'Revenue at BE',value:'$'+(be*p).toFixed(0)},{label:'Margin/Unit',value:'$'+cm.toFixed(2)}]; },
  },"""

R['car-depreciation-calculator'] = """  'car-depreciation-calculator': {
    inputs: [{key:'price',label:'Purchase Price ($)',type:'number',defaultValue:35000},{key:'years',label:'Years Owned',type:'number',defaultValue:5}],
    formula: (v) => { let val=F(v.price); for(let i=0;i<F(v.years);i++)val*=i===0?0.78:i===1?0.85:i===2?0.88:0.90; return [{label:'Current Value',value:'$'+val.toFixed(0)},{label:'Depreciation',value:'$'+(F(v.price)-val).toFixed(0)},{label:'Value Lost',value:((1-val/F(v.price))*100).toFixed(0)+'%'}]; },
  },"""

R['car-loan-calculator'] = """  'car-loan-calculator': {
    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'down',label:'Down Payment (%)',type:'number',defaultValue:20},{key:'rate',label:'APR (%)',type:'number',defaultValue:6},{key:'term',label:'Term (months)',type:'number',defaultValue:60}],
    formula: (v) => { const P=F(v.price)*(1-F(v.down)/100),r=F(v.rate)/100/12,n=F(v.term); const M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly Payment',value:'$'+M.toFixed(2)},{label:'Total Interest',value:'$'+(M*n-P).toFixed(0)}]; },
  },"""

R['car-tax-calculator'] = """  'car-tax-calculator': {
    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'tradeIn',label:'Trade-In ($)',type:'number',defaultValue:10000},{key:'taxRate',label:'Sales Tax (%)',type:'number',defaultValue:7}],
    formula: (v) => { const taxable=Math.max(0,F(v.price)-F(v.tradeIn)),tax=taxable*F(v.taxRate)/100; return [{label:'Taxable Amount',value:'$'+taxable.toFixed(0)},{label:'Sales Tax',value:'$'+tax.toFixed(2)},{label:'Total',value:'$'+(taxable+tax).toFixed(0)}]; },
  },"""

R['carbon-footprint-calculator'] = """  'carbon-footprint-calculator': {
    inputs: [{key:'miles',label:'Annual Miles',type:'number',defaultValue:12000},{key:'flights',label:'Flights/Year',type:'number',defaultValue:2},{key:'kwh',label:'Monthly kWh',type:'number',defaultValue:500},{key:'meat',label:'Meat Meals/Week',type:'number',defaultValue:5}],
    formula: (v) => { const co2=F(v.miles)*0.0004+F(v.flights)*0.25+F(v.kwh)*12*0.00092+F(v.meat)*52*0.007; return [{label:'Annual CO2',value:co2.toFixed(1)+' tons'},{label:'US Average',value:'16 tons'},{label:'Global Avg',value:'4 tons'}]; },
  },"""

R['child-cost-calculator'] = """  'child-cost-calculator': {
    inputs: [{key:'childcare',label:'Monthly Childcare ($)',type:'number',defaultValue:1200},{key:'food',label:'Monthly Food ($)',type:'number',defaultValue:300},{key:'other',label:'Other Monthly ($)',type:'number',defaultValue:200}],
    formula: (v) => { const m=F(v.childcare)+F(v.food)+F(v.other); return [{label:'Monthly Cost',value:'$'+m.toFixed(0)},{label:'Annual',value:'$'+(m*12).toFixed(0)},{label:'0-18 Years',value:'$'+(m*12*18).toFixed(0)}]; },
  },"""

R['compound-interest-calculator'] = """  'compound-interest-calculator': {
    inputs: [{key:'principal',label:'Initial ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly ($)',type:'number',defaultValue:200},{key:'rate',label:'Return (%)',type:'number',defaultValue:7},{key:'years',label:'Years',type:'number',defaultValue:20}],
    formula: (v) => { const P=F(v.principal),pmt=F(v.monthly),r=F(v.rate)/100/12,n=F(v.years)*12; const fv=P*Math.pow(1+r,n)+(r>0?pmt*(Math.pow(1+r,n)-1)/r:pmt*n); const inv=P+pmt*n; return [{label:'Future Value',value:'$'+fv.toFixed(2)},{label:'Total Invested',value:'$'+inv.toFixed(0)},{label:'Interest',value:'$'+(fv-inv).toFixed(0)}]; },
    presets: [{label:'30yr Retirement',values:{principal:50000,monthly:500,rate:7,years:30}}],
  },"""

R['cpm-calculator'] = """  'cpm-calculator': {
    inputs: [{key:'cost',label:'Ad Cost ($)',type:'number',defaultValue:500},{key:'impressions',label:'Impressions',type:'number',defaultValue:100000}],
    formula: (v) => { const cpm=F(v.impressions)>0?F(v.cost)/F(v.impressions)*1000:0; return [{label:'CPM',value:'$'+cpm.toFixed(2)},{label:'CPC (2% CTR)',value:'$'+(cpm/20).toFixed(2)}]; },
  },"""

R['crypto-profit-calculator'] = """  'crypto-profit-calculator': {
    inputs: [{key:'buy',label:'Buy Price ($)',type:'number',defaultValue:40000},{key:'sell',label:'Sell Price ($)',type:'number',defaultValue:50000},{key:'amount',label:'Amount',type:'number',defaultValue:0.1,step:0.01}],
    formula: (v) => { const g=(F(v.sell)-F(v.buy))*F(v.amount),roi=F(v.buy)>0?g/(F(v.buy)*F(v.amount))*100:0; return [{label:'P&L',value:'$'+g.toFixed(2)},{label:'ROI',value:roi.toFixed(1)+'%'}]; },
  },"""

R['currency-hedge-calculator'] = """  'currency-hedge-calculator': {
    inputs: [{key:'amount',label:'Amount',type:'number',defaultValue:100000},{key:'current',label:'Current Rate',type:'number',defaultValue:1.10,step:0.01},{key:'forward',label:'Forward Rate',type:'number',defaultValue:1.08,step:0.01}],
    formula: (v) => { const h=F(v.amount)*F(v.forward),u=F(v.amount)*F(v.current); return [{label:'Hedged Value',value:'$'+h.toFixed(0)},{label:'Unhedged',value:'$'+u.toFixed(0)},{label:'Diff',value:'$'+(h-u).toFixed(0)}]; },
  },"""

R['dividend-yield-calculator'] = """  'dividend-yield-calculator': {
    inputs: [{key:'div',label:'Annual Dividend/Share ($)',type:'number',defaultValue:2.50},{key:'price',label:'Stock Price ($)',type:'number',defaultValue:50}],
    formula: (v) => { const y=F(v.price)>0?F(v.div)/F(v.price)*100:0; return [{label:'Dividend Yield',value:y.toFixed(2)+'%'},{label:'Monthly/Share',value:'$'+(F(v.div)/12).toFixed(3)}]; },
  },"""

R['down-payment-calculator'] = """  'down-payment-calculator': {
    inputs: [{key:'price',label:'Home Price ($)',type:'number',defaultValue:300000},{key:'pct',label:'Target Down (%)',type:'number',defaultValue:20},{key:'saved',label:'Saved ($)',type:'number',defaultValue:30000},{key:'monthly',label:'Save/Month ($)',type:'number',defaultValue:1000}],
    formula: (v) => { const t=F(v.price)*F(v.pct)/100,n=Math.max(0,t-F(v.saved)),m=F(v.monthly)>0?Math.ceil(n/F(v.monthly)):999; return [{label:'Down Payment',value:'$'+t.toFixed(0)},{label:'Remaining',value:'$'+n.toFixed(0)},{label:'Months',value:m>900?'N/A':String(m)}]; },
  },"""

R['early-payoff-calculator'] = """  'early-payoff-calculator': {
    inputs: [{key:'loan',label:'Balance ($)',type:'number',defaultValue:200000},{key:'rate',label:'Rate (%)',type:'number',defaultValue:6},{key:'months',label:'Remaining Months',type:'number',defaultValue:300},{key:'extra',label:'Extra/Month ($)',type:'number',defaultValue:200}],
    formula: (v) => { const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.months),norm=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); let bal=P,mo=0,pmt=norm+F(v.extra); while(bal>0&&mo<1500){bal=bal*(1+r)-pmt;mo++;} return [{label:'Payoff',value:mo+' mo'},{label:'Saved',value:'$'+Math.max(0,norm*n-pmt*mo).toFixed(0)}]; },
  },"""

R['electricity-bill-calculator'] = """  'electricity-bill-calculator': {
    inputs: [{key:'kwh',label:'Monthly kWh',type:'number',defaultValue:900},{key:'rate',label:'$/kWh',type:'number',defaultValue:0.17,step:0.01}],
    formula: (v) => { const b=F(v.kwh)*F(v.rate); return [{label:'Monthly Bill',value:'$'+b.toFixed(2)},{label:'Annual',value:'$'+(b*12).toFixed(0)},{label:'Daily',value:'$'+(b/30).toFixed(2)}]; },
  },"""

R['emi-calculator'] = """  'emi-calculator': {
    inputs: [{key:'loan',label:'Loan ($)',type:'number',defaultValue:20000},{key:'rate',label:'Rate (%)',type:'number',defaultValue:8},{key:'months',label:'Tenure (mo)',type:'number',defaultValue:36}],
    formula: (v) => { const P=F(v.loan),r=F(v.rate)/100/12,n=F(v.months),emi=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n; return [{label:'Monthly EMI',value:'$'+emi.toFixed(2)},{label:'Total',value:'$'+(emi*n).toFixed(0)},{label:'Interest',value:'$'+(emi*n-P).toFixed(0)}]; },
  },"""

R['fire-calculator'] = """  'fire-calculator': {
    inputs: [{key:'expenses',label:'Annual Expenses ($)',type:'number',defaultValue:40000},{key:'savings',label:'Saved ($)',type:'number',defaultValue:100000},{key:'monthly',label:'Save/Month ($)',type:'number',defaultValue:3000},{key:'rate',label:'Return (%)',type:'number',defaultValue:7}],
    formula: (v) => { const fi=F(v.expenses)*25,r=F(v.rate)/100/12; let bal=F(v.savings),yrs=0; while(bal<fi&&yrs<80){for(let m=0;m<12;m++)bal=bal*(1+r)+F(v.monthly);yrs++;} return [{label:'FI Number',value:'$'+fi.toLocaleString()},{label:'Years to FI',value:String(yrs)},{label:'Monthly (4%)',value:'$'+(fi*0.04/12).toFixed(0)}]; },
  },"""

R['fob-cif-converter'] = """  'fob-cif-converter': {
    inputs: [{key:'fob',label:'FOB ($)',type:'number',defaultValue:10000},{key:'freight',label:'Freight ($)',type:'number',defaultValue:2000},{key:'insurance',label:'Insurance ($)',type:'number',defaultValue:100}],
    formula: (v) => { const cif=F(v.fob)+F(v.freight)+F(v.insurance); return [{label:'CIF Value',value:'$'+cif.toFixed(2)},{label:'Insurance Rate',value:(F(v.insurance)/cif*100).toFixed(2)+'%'}]; },
  },"""

R['food-calorie-calculator'] = """  'food-calorie-calculator': {
    inputs: [{key:'grams',label:'Serving (g)',type:'number',defaultValue:200},{key:'calPer100',label:'Calories per 100g',type:'number',defaultValue:165}],
    formula: (v) => { const cal=F(v.grams)*F(v.calPer100)/100; return [{label:'Calories',value:cal.toFixed(0)+' kcal'},{label:'Protein (est 25%)',value:(cal*0.25/4).toFixed(0)+'g'},{label:'Carbs (est 50%)',value:(cal*0.5/4).toFixed(0)+'g'},{label:'Fat (est 25%)',value:(cal*0.25/9).toFixed(0)+'g'}]; },
  },"""

R['fuel-cost-calculator'] = """  'fuel-cost-calculator': {
    inputs: [{key:'dist',label:'Distance (miles)',type:'number',defaultValue:300},{key:'mpg',label:'MPG',type:'number',defaultValue:25},{key:'price',label:'Fuel ($/gal)',type:'number',defaultValue:3.50}],
    formula: (v) => { const gal=F(v.dist)/F(v.mpg),cost=gal*F(v.price); return [{label:'Gallons',value:gal.toFixed(1)},{label:'Cost',value:'$'+cost.toFixed(2)},{label:'$/Mile',value:'$'+(F(v.price)/F(v.mpg)).toFixed(2)}]; },
    presets: [{label:'Road Trip 300mi',values:{dist:300,mpg:25,price:3.50}}],
  },"""

R['fuel-economy-calculator'] = """  'fuel-economy-calculator': {
    inputs: [{key:'miles',label:'Miles',type:'number',defaultValue:300},{key:'gallons',label:'Gallons',type:'number',defaultValue:12}],
    formula: (v) => { const mpg=F(v.gallons)>0?F(v.miles)/F(v.gallons):0,l100=mpg>0?235.215/mpg:0; return [{label:'MPG',value:mpg.toFixed(1)},{label:'L/100km',value:l100.toFixed(1)}]; },
  },"""

R['home-equity-calculator'] = """  'home-equity-calculator': {
    inputs: [{key:'value',label:'Home Value ($)',type:'number',defaultValue:350000},{key:'mortgage',label:'Mortgage ($)',type:'number',defaultValue:200000}],
    formula: (v) => { const eq=F(v.value)-F(v.mortgage),pct=F(v.value)>0?eq/F(v.value)*100:0; return [{label:'Equity',value:'$'+eq.toLocaleString()},{label:'Equity %',value:pct.toFixed(1)+'%'},{label:'LTV',value:(100-pct).toFixed(1)+'%'}]; },
  },"""

R['import-duty-calculator'] = """  'import-duty-calculator': {
    inputs: [{key:'cif',label:'CIF Value ($)',type:'number',defaultValue:10000},{key:'duty',label:'Duty Rate (%)',type:'number',defaultValue:10},{key:'vat',label:'VAT (%)',type:'number',defaultValue:0}],
    formula: (v) => { const d=F(v.cif)*F(v.duty)/100,v=F(v.cif)+d; const vat=v*F(v.vat)/100; return [{label:'Duty',value:'$'+d.toFixed(2)},{label:'VAT',value:'$'+vat.toFixed(2)},{label:'Total',value:'$'+(F(v.cif)+d+vat).toFixed(2)}]; },
  },"""

R['inflation-calculator'] = """  'inflation-calculator': {
    inputs: [{key:'amount',label:'Amount ($)',type:'number',defaultValue:10000},{key:'rate',label:'Inflation (%)',type:'number',defaultValue:3},{key:'years',label:'Years',type:'number',defaultValue:10}],
    formula: (v) => { const f=F(v.amount)*Math.pow(1+F(v.rate)/100,F(v.years)),t=F(v.amount)/Math.pow(1+F(v.rate)/100,F(v.years)); return [{label:'Future Value',value:'$'+f.toFixed(2)},{label:'Today\\'s Worth',value:'$'+t.toFixed(2)},{label:'Lost',value:((1-t/F(v.amount))*100).toFixed(1)+'%'}]; },
  },"""

R['invoice-hours-calculator'] = """  'invoice-hours-calculator': {
    inputs: [{key:'hours',label:'Hours',type:'number',defaultValue:40,step:0.5},{key:'rate',label:'Rate ($/hr)',type:'number',defaultValue:75}],
    formula: (v) => { const s=F(v.hours)*F(v.rate); return [{label:'Subtotal',value:'$'+s.toFixed(2)},{label:'Tax (15%)',value:'$'+(s*0.15).toFixed(2)},{label:'Total',value:'$'+(s*1.15).toFixed(2)}]; },
  },"""

R['landed-cost-calculator'] = """  'landed-cost-calculator': {
    inputs: [{key:'fob',label:'FOB ($)',type:'number',defaultValue:10000},{key:'freight',label:'Freight ($)',type:'number',defaultValue:2000},{key:'insurance',label:'Insurance ($)',type:'number',defaultValue:100},{key:'duty',label:'Duty (%)',type:'number',defaultValue:10}],
    formula: (v) => { const c=F(v.fob)+F(v.freight)+F(v.insurance),d=c*F(v.duty)/100; return [{label:'CIF',value:'$'+c.toFixed(2)},{label:'Duty',value:'$'+d.toFixed(2)},{label:'Landed',value:'$'+(c+d).toFixed(2)}]; },
  },"""

R['lease-vs-buy-car-calculator'] = """  'lease-vs-buy-car-calculator': {
    inputs: [{key:'price',label:'Car Price ($)',type:'number',defaultValue:35000},{key:'lease',label:'Lease ($/mo)',type:'number',defaultValue:450},{key:'loan',label:'Loan ($/mo)',type:'number',defaultValue:650},{key:'months',label:'Months',type:'number',defaultValue:36}],
    formula: (v) => { const l=F(v.lease)*F(v.months),b=F(v.loan)*F(v.months)-F(v.price)*0.5; return [{label:'Lease Total',value:'$'+l.toFixed(0)},{label:'Buy Total',value:'$'+b.toFixed(0)},{label:'Better',value:l<b?'Lease':'Buy'}]; },
  },"""

R['loan-comparison-calculator'] = """  'loan-comparison-calculator': {
    inputs: [{key:'l1',label:'Loan 1 ($)',type:'number',defaultValue:200000},{key:'r1',label:'Rate 1 (%)',type:'number',defaultValue:6},{key:'t1',label:'Term 1 (yr)',type:'number',defaultValue:30},{key:'l2',label:'Loan 2 ($)',type:'number',defaultValue:200000},{key:'r2',label:'Rate 2 (%)',type:'number',defaultValue:5.5},{key:'t2',label:'Term 2 (yr)',type:'number',defaultValue:15}],
    formula: (v) => { const c=(P:number,rt:number,yr:number)=>{const mr=rt/100/12,mn=yr*12,pmt=mr>0?P*mr*Math.pow(1+mr,mn)/(Math.pow(1+mr,mn)-1):P/mn;return{mo:pmt,tt:pmt*mn};};const a=c(F(v.l1),F(v.r1),F(v.t1)),b=c(F(v.l2),F(v.r2),F(v.t2));return[{label:'L1 Mo',value:'$'+a.mo.toFixed(2)},{label:'L1 Total',value:'$'+a.tt.toFixed(0)},{label:'L2 Mo',value:'$'+b.mo.toFixed(2)},{label:'L2 Total',value:'$'+b.tt.toFixed(0)}]; },
  },"""

R['mileage-calculator'] = """  'mileage-calculator': {
    inputs: [{key:'miles',label:'Miles',type:'number',defaultValue:500},{key:'rate',label:'IRS Rate ($/mi)',type:'number',defaultValue:0.70,step:0.01}],
    formula: (v) => { const r=F(v.miles)*F(v.rate); return [{label:'Reimbursement',value:'$'+r.toFixed(2)},{label:'Tax Deduction',value:'$'+r.toFixed(2)}]; },
  },"""

R['net-worth-calculator'] = """  'net-worth-calculator': {
    inputs: [{key:'cash',label:'Cash ($)',type:'number',defaultValue:10000},{key:'invest',label:'Investments ($)',type:'number',defaultValue:50000},{key:'property',label:'Property ($)',type:'number',defaultValue:300000},{key:'debt',label:'Total Debt ($)',type:'number',defaultValue:200000}],
    formula: (v) => { const a=F(v.cash)+F(v.invest)+F(v.property),d=F(v.debt); return [{label:'Assets',value:'$'+a.toLocaleString()},{label:'Debt',value:'$'+d.toLocaleString()},{label:'Net Worth',value:'$'+(a-d).toLocaleString()}]; },
  },"""

R['party-drink-calculator'] = """  'party-drink-calculator': {
    inputs: [{key:'guests',label:'Guests',type:'number',defaultValue:30},{key:'hours',label:'Hours',type:'number',defaultValue:4}],
    formula: (v) => { const d=F(v.guests)*(2+F(v.hours)-1),beer=Math.ceil(d*0.6),wine=Math.ceil(d*0.3/5),liquor=Math.ceil(d*0.1/16); return [{label:'Beer',value:beer+' bottles ('+Math.ceil(beer/24)+' cases)'},{label:'Wine',value:wine+' bottles'},{label:'Liquor',value:liquor+' bottles'}]; },
  },"""

R['pet-calorie-calculator'] = """  'pet-calorie-calculator': {
    inputs: [{key:'weight',label:'Weight (kg)',type:'number',defaultValue:10},{key:'type',label:'Pet',type:'select',options:[{label:'Dog',value:'dog'},{label:'Cat',value:'cat'}],defaultValue:'dog'}],
    formula: (v) => { const rer=70*Math.pow(F(v.weight),0.75); const der=v.type==='dog'?rer*1.6:rer*1.2; return [{label:'RER (Resting)',value:rer.toFixed(0)+' kcal'},{label:'DER (Daily)',value:der.toFixed(0)+' kcal'},{label:'Weight Loss',value:(der*0.8).toFixed(0)+' kcal'}]; },
  },"""

R['property-tax-calculator'] = """  'property-tax-calculator': {
    inputs: [{key:'value',label:'Assessed Value ($)',type:'number',defaultValue:300000},{key:'rate',label:'Tax Rate (%)',type:'number',defaultValue:1.2,step:0.01}],
    formula: (v) => { const a=F(v.value)*F(v.rate)/100; return [{label:'Annual Tax',value:'$'+a.toFixed(2)},{label:'Monthly',value:'$'+(a/12).toFixed(2)}]; },
  },"""

R['renovation-cost-calculator'] = """  'renovation-cost-calculator': {
    inputs: [{key:'kitchen',label:'Kitchen ($)',type:'number',defaultValue:25000},{key:'bath',label:'Bathroom ($)',type:'number',defaultValue:12000},{key:'floor',label:'Flooring ($)',type:'number',defaultValue:5000},{key:'paint',label:'Painting ($)',type:'number',defaultValue:3000}],
    formula: (v) => { const t=F(v.kitchen)+F(v.bath)+F(v.floor)+F(v.paint); return [{label:'Total',value:'$'+t.toLocaleString()},{label:'+15% Buffer',value:'$'+(t*1.15).toFixed(0)}]; },
  },"""

R['rent-vs-buy-calculator'] = """  'rent-vs-buy-calculator': {
    inputs: [{key:'rent',label:'Rent ($/mo)',type:'number',defaultValue:1500},{key:'price',label:'Home Price ($)',type:'number',defaultValue:350000},{key:'rate',label:'Rate (%)',type:'number',defaultValue:6.5},{key:'years',label:'Years',type:'number',defaultValue:7}],
    formula: (v) => { const rt=F(v.rent)*12*F(v.years),P=F(v.price)*0.8,r=F(v.rate)/100/12,n=30*12,M=r>0?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n,bt=F(v.price)*0.2+M*12*F(v.years); return [{label:'Rent Total',value:'$'+rt.toLocaleString()},{label:'Buy Total',value:'$'+bt.toLocaleString()},{label:'Better',value:rt<bt?'Rent':'Buy'}]; },
  },"""

R['roi-calculator'] = """  'roi-calculator': {
    inputs: [{key:'invested',label:'Invested ($)',type:'number',defaultValue:10000},{key:'returned',label:'Returned ($)',type:'number',defaultValue:12000}],
    formula: (v) => { const roi=F(v.invested)>0?(F(v.returned)-F(v.invested))/F(v.invested)*100:0; return [{label:'ROI',value:roi.toFixed(2)+'%'},{label:'Gain',value:'$'+(F(v.returned)-F(v.invested)).toFixed(2)}]; },
  },"""

R['savings-goal-calculator'] = """  'savings-goal-calculator': {
    inputs: [{key:'goal',label:'Goal ($)',type:'number',defaultValue:100000},{key:'saved',label:'Saved ($)',type:'number',defaultValue:10000},{key:'monthly',label:'Monthly ($)',type:'number',defaultValue:500},{key:'rate',label:'Return (%)',type:'number',defaultValue:5}],
    formula: (v) => { const r=F(v.rate)/100/12; let b=F(v.saved),mo=0; while(b<F(v.goal)&&mo<1200){b=b*(1+r)+F(v.monthly);mo++;} return [{label:'Months',value:String(mo)},{label:'Years',value:(mo/12).toFixed(1)}]; },
  },"""

R['solar-roi-calculator'] = """  'solar-roi-calculator': {
    inputs: [{key:'cost',label:'System Cost ($)',type:'number',defaultValue:18000},{key:'saving',label:'Annual Savings ($)',type:'number',defaultValue:1800}],
    formula: (v) => { const net=F(v.cost)*0.7,pb=F(v.saving)>0?net/F(v.saving):0; return [{label:'Net (30% credit)',value:'$'+net.toFixed(0)},{label:'Payback',value:pb.toFixed(1)+' yr'},{label:'25yr Savings',value:'$'+(F(v.saving)*25-net).toFixed(0)}]; },
  },"""

R['stock-return-calculator'] = """  'stock-return-calculator': {
    inputs: [{key:'buy',label:'Buy ($)',type:'number',defaultValue:100},{key:'sell',label:'Sell ($)',type:'number',defaultValue:130},{key:'shares',label:'Shares',type:'number',defaultValue:10}],
    formula: (v) => { const p=(F(v.sell)-F(v.buy))*F(v.shares),pct=F(v.buy)>0?(F(v.sell)-F(v.buy))/F(v.buy)*100:0; return [{label:'P&L',value:'$'+p.toFixed(2)},{label:'Return',value:pct.toFixed(2)+'%'}]; },
  },"""

R['tariff-impact-calculator'] = """  'tariff-impact-calculator': {
    inputs: [{key:'fob',label:'FOB/Unit ($)',type:'number',defaultValue:100},{key:'old',label:'Old Tariff (%)',type:'number',defaultValue:10},{key:'new',label:'New Tariff (%)',type:'number',defaultValue:25},{key:'units',label:'Units',type:'number',defaultValue:1000}],
    formula: (v) => { const o=F(v.fob)*F(v.old)/100*F(v.units),n=F(v.fob)*F(v.new)/100*F(v.units); return [{label:'Old Duty',value:'$'+o.toFixed(0)},{label:'New Duty',value:'$'+n.toFixed(0)},{label:'Increase',value:'$'+(n-o).toFixed(0)}]; },
  },"""

R['travel-budget-calculator'] = """  'travel-budget-calculator': {
    inputs: [{key:'days',label:'Days',type:'number',defaultValue:7},{key:'flight',label:'Flight ($)',type:'number',defaultValue:400},{key:'hotel',label:'Hotel/Night ($)',type:'number',defaultValue:150},{key:'food',label:'Food/Day ($)',type:'number',defaultValue:50}],
    formula: (v) => { const t=F(v.flight)+F(v.hotel)*F(v.days)+F(v.food)*F(v.days); return [{label:'Total',value:'$'+t.toFixed(0)},{label:'Per Day',value:'$'+(t/F(v.days)).toFixed(0)}]; },
  },"""

# Now apply replacements
count = 0
for tool_id, replacement in R.items():
    # Match from 'tool-id': { to the next 'tool-id': or end of object
    # We need to find and replace the WHOLE broken block
    pattern = rf"('{re.escape(tool_id)}':\s*\{{[^}}]*?input1[^}}]*?\}}\s*,\s*formula:[^}}]*?\}}\s*\}})"
    m = re.search(pattern, content, re.DOTALL)
    if m:
        content = content.replace(m.group(1), replacement)
        count += 1
    else:
        # Try a simpler pattern
        start = content.find(f"'{tool_id}':")
        if start > 0 and 'input1' in content[start:start+500]:
            # Find the closing }} after formula
            brace_start = content.index('{', content.index('formula:', start))
            depth = 0
            end = brace_start
            while end < len(content):
                if content[end] == '{': depth += 1
                if content[end] == '}': depth -= 1
                if depth == 0 and content[end] == '}':
                    break
                end += 1
            old_block = content[start:end+1]
            if 'input1' in old_block:
                content = content.replace(old_block, replacement.rstrip(','))
                count += 1

print(f"Fixed {count} formulas")
with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.write(content)
