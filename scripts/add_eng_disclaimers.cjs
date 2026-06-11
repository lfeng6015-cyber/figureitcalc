const fs=require("fs");let c=fs.readFileSync("src/app/data/formulas.ts","utf8");
const eng=",{label:'Engineering Disclaimer',value:'ESTIMATE ONLY. Not a substitute for professional engineering. Consult a licensed engineer for actual construction. Verify all calculations before use.'}";
const tools=["concrete-calculator","concrete-block-calculator","roofing-calculator","hvac-btu-calculator","led-resistor-calculator","flooring-calculator","lumber-calculator","solar-roi-calculator","paint-calculator"];
let n=0;
for(const t of tools){
  const start=c.indexOf("'"+t+"': {");
  if(start<0){console.log("NF: "+t);continue;}
  const block=c.slice(start,start+3000);
  if(block.includes("Engineering Disclaimer")){console.log("SKIP: "+t);continue;}
  const pos=block.lastIndexOf("}] },");
  if(pos<0){console.log("NE: "+t);continue;}
  c=c.slice(0,start+pos)+eng+c.slice(start+pos);
  console.log("OK: "+t);n++;
}
fs.writeFileSync("src/app/data/formulas.ts",c,"utf8");
console.log("Added disclaimers to "+n+" tools");
