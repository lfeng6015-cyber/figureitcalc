const fs=require("fs");let c=fs.readFileSync("src/app/data/formulas.ts","utf8");
// Only add to tools that DON'T already have presets
const adds={
  "encryption":",presets: [{label:'Encrypt message',values:{mode:'enc',text:'Secret message',key:'my-key-123'}}]",
  "statistics-calculator":",presets: [{label:'Test Scores',values:{data:'85,92,78,95,88,76,90,82,94,88'}},{label:'Daily Steps',values:{data:'8500,12000,7800,15000,9200,11000,6500,9800'}}]",
  "toml-to-json":",presets: [{label:'Config file example',values:{toml:'name = \"myapp\"\\nversion = \"2.0\"\\n\\n[owner]\\nname = \"John\"'}}]",
  "toml-to-yaml":",presets: [{label:'Config with database',values:{toml:'name = \"app\"\\nversion = \"1.0\"\\n\\n[database]\\nhost = \"localhost\"\\nport = 5432'}}]",
};
let n=0;
for(const [tool,presets] of Object.entries(adds)){
  const start=c.indexOf("'"+tool+"': {");
  if(start<0){console.log("NF: "+tool);continue;}
  const block=c.slice(start,start+2000);
  // Check if already has presets
  if(block.includes("presets:")){console.log("SKIP (has): "+tool);continue;}
  const pos=block.lastIndexOf("}] },");
  if(pos<0){console.log("NE: "+tool);continue;}
  c=c.slice(0,start+pos)+presets+c.slice(start+pos);
  console.log("OK: "+tool);n++;
}
fs.writeFileSync("src/app/data/formulas.ts",c,"utf8");
console.log("Added presets to "+n+" tools");
