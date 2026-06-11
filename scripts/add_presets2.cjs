const fs=require("fs");let c=fs.readFileSync("src/app/data/formulas.ts","utf8");
const adds={
  "party-drink-calculator":",presets: [{label:'30 guests 4hr party',values:{guests:30,hours:4}},{label:'Wedding 100 guests 6hr',values:{guests:100,hours:6}},{label:'BBQ 15 guests 3hr',values:{guests:15,hours:3}}]",
  "depth-of-field-calculator":",presets: [{label:'Portrait 85mm f2.8',values:{camera:'ff',f:85,a:2.8,d:10}},{label:'Landscape 24mm f11',values:{camera:'ff',f:24,a:11,d:30}},{label:'Macro 100mm f8',values:{camera:'ff',f:100,a:8,d:2}}]",
  "photo-print-size-calculator":",presets: [{label:'DSLR 24MP (6000x4000)',values:{w:6000,h:4000,dpi:'300'}},{label:'Smartphone 12MP (4000x3000)',values:{w:4000,h:3000,dpi:'200'}},{label:'4K Wallpaper (3840x2160)',values:{w:3840,h:2160,dpi:'150'}}]",
  "pet-calorie-calculator":",presets: [{label:'Medium Dog 20kg Active',values:{wt:20,species:'dog',age:'adult',fixed:'yes',activity:'high'}},{label:'Small Cat 4kg Indoor',values:{wt:4,species:'cat',age:'adult',fixed:'yes',activity:'low'}},{label:'Puppy 8kg Growing',values:{wt:8,species:'dog',age:'young',fixed:'no',activity:'mod'}}]",
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
