const fs=require("fs");let c=fs.readFileSync("src/app/data/formulas.ts","utf8");
const all=["concrete-calculator","concrete-block-calculator","roofing-calculator","led-resistor-calculator","flooring-calculator","lumber-calculator","solar-roi-calculator","paint-calculator","hvac-btu-calculator","car-loan-calculator","lease-vs-buy-car-calculator","rent-vs-buy-calculator","profit-margin-calculator","down-payment-calculator","home-equity-calculator","currency-hedge-calculator","crypto-profit-calculator","dividend-yield-calculator","savings-goal-calculator","emi-calculator","sales-tax-calculator","tariff-impact-calculator","landed-cost-calculator","fob-cif-converter","property-tax-calculator","invoice-hours-calculator","early-payoff-calculator","car-depreciation-calculator","car-tax-calculator","ideal-weight-calculator","food-calorie-calculator","sleep-cycle-calculator","cat-age-calculator","dog-age-calculator","child-cost-calculator","pet-calorie-calculator","macro-calculator"];
let ok=[];
all.forEach(t=>{
  const i=c.indexOf("'"+t+"': {");
  if(i<0)return;
  const block=c.slice(i,i+3000);
  if(block.includes("Disclaimer"))return;
  const pos=block.lastIndexOf("}] },");
  if(pos<0)return;
  const after=block.slice(pos+5,pos+200).trim();
  if(after.startsWith("},")||after.startsWith("'")){
    ok.push(t);
  }
});
console.log("Safe for disclaimers: "+ok.length);
ok.forEach(t=>console.log("  "+t));
