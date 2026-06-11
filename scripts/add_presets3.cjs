const fs=require("fs");let c=fs.readFileSync("src/app/data/formulas.ts","utf8");
const adds={
  "countdown-timer":",presets: [{label:'New Year 2027',values:{date:'2027-01-01'}},{label:'Christmas 2026',values:{date:'2026-12-25'}},{label:'30 Days from now',values:{date:new Date(Date.now()+30*86400000).toISOString().slice(0,10)}}]",
  "encryption":",presets: [{label:'Encrypt message',values:{mode:'enc',text:'Secret message',key:'my-key-123'}},{label:'Decrypt demo',values:{mode:'dec',text:'',key:'my-key-123'}}]",
  "eta-calculator":",presets: [{label:'LA to SF (380mi)',values:{dist:380,speed:65,stops:1,stopMin:15}},{label:'Road Trip (600mi)',values:{dist:600,speed:70,stops:3,stopMin:20}}]",
  "statistics-calculator":",presets: [{label:'Test Scores',values:{data:'85,92,78,95,88,76,90,82,94,88'}},{label:'Daily Steps',values:{data:'8500,12000,7800,15000,9200,11000,6500,9800'}}]",
  "steps-to-miles-calculator":",presets: [{label:'10k Steps (avg)',values:{steps:10000,stride:30}},{label:'Sedentary Day',values:{steps:3000,stride:28}},{label:'Marathon Training',values:{steps:25000,stride:32}}]",
  "toml-to-json":",presets: [{label:'Config file',values:{toml:'name = \"myapp\"\\nversion = \"2.0\"\\n\\n[owner]\\nname = \"John\"'}}]",
  "toml-to-yaml":",presets: [{label:'Config file',values:{toml:'name = \"app\"\\nversion = \"1.0\"\\n\\n[database]\\nhost = \"localhost\"\\nport = 5432'}}]",
  "travel-budget-calculator":",presets: [{label:'Week in Paris',values:{days:7,flight:800,hotel:200,food:60}},{label:'Weekend NYC',values:{days:3,flight:300,hotel:250,food:80}},{label:'Backpacking SEA 30d',values:{days:30,flight:1200,hotel:30,food:15}}]",
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
