const fs=require("fs");let c=fs.readFileSync("src/app/data/formulas.ts","utf8");
const adds={
  "roofing-calculator":",presets: [{label:'Standard Gable 4/12',values:{foot:2000,pitch:1.05}},{label:'Steep Roof 8/12',values:{foot:2000,pitch:1.20}},{label:'Flat Roof 2/12',values:{foot:2000,pitch:1.01}}]",
  "lumber-calculator":",presets: [{label:'Wall 16in OC 24ft',values:{mode:'wall',len:24,spacing:'16',qty:10,thick:2,width:4}},{label:'Board Feet 2x4x8 10pcs',values:{mode:'bf',len:8,qty:10,thick:2,width:4,spacing:'16'}}]",
  "solar-roi-calculator":",presets: [{label:'US Southwest 6kW',values:{cost:18000,size:6,sunHours:6,rate:0.17,subsidy:'30'}},{label:'US Northeast 6kW',values:{cost:20000,size:6,sunHours:4,rate:0.22,subsidy:'30'}},{label:'Germany 5kW',values:{cost:12000,size:5,sunHours:3.5,rate:0.40,subsidy:'20'}}]",
  "emi-calculator":",presets: [{label:'Car Loan 20k 8pct 3yr',values:{loan:20000,rate:8,months:36,mode:'emi',prepay:0}},{label:'Personal Loan 10k 12pct 2yr',values:{loan:10000,rate:12,months:24,mode:'emi',prepay:0}},{label:'Equal Principal 20k 8pct 3yr',values:{loan:20000,rate:8,months:36,mode:'ep',prepay:0}}]",
  "stock-return-calculator":",presets: [{label:'10pct Gain 100sh',values:{buy:100,sell:110,shares:100,fee:0,div:0}},{label:'With Dividends 100sh',values:{buy:100,sell:130,shares:100,fee:0,div:50}},{label:'Active Trader 200sh',values:{buy:50,sell:55,shares:200,fee:5,div:0}}]",
};
let n=0;
for(const [tool,presets] of Object.entries(adds)){
  const start=c.indexOf("'"+tool+"': {");
  if(start<0){console.log("NF: "+tool);continue;}
  const block=c.slice(start,start+3000);
  const pos=block.lastIndexOf("}] },");
  if(pos<0){console.log("NE: "+tool);continue;}
  c=c.slice(0,start+pos)+presets+c.slice(start+pos);
  console.log("OK: "+tool);n++;
}
fs.writeFileSync("src/app/data/formulas.ts",c,"utf8");
console.log("Added presets to "+n+" tools");
