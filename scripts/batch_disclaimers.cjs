const fs = require("fs");
let c = fs.readFileSync("src/app/data/formulas.ts", "utf8");

const fin = ",{label:'Financial Disclaimer',value:'Estimates only. Actual results depend on fees, taxes, market conditions, and individual circumstances. Not financial advice. Consult a qualified professional.'}";
const med = ",{label:'Medical Disclaimer',value:'For informational purposes only. NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider.'}";
const eng = ",{label:'Engineering Disclaimer',value:'ESTIMATE ONLY. Not a substitute for professional engineering. Consult a licensed engineer for actual construction. Verify all calculations before use.'}";

const needs = [
  ["car-loan-calculator",fin],["lease-vs-buy-car-calculator",fin],["rent-vs-buy-calculator",fin],
  ["profit-margin-calculator",fin],["down-payment-calculator",fin],["home-equity-calculator",fin],
  ["ideal-weight-calculator",med],["food-calorie-calculator",med],["sleep-cycle-calculator",med],
  ["cat-age-calculator",med],["dog-age-calculator",med],["child-cost-calculator",med],
  ["pet-calorie-calculator",med],["macro-calculator",med],
  ["concrete-calculator",eng],["concrete-block-calculator",eng],["roofing-calculator",eng],
  ["led-resistor-calculator",eng],["paint-calculator",eng],["lumber-calculator",eng],
  ["electricity-bill-calculator",eng],["solar-roi-calculator",eng]
];

let added = 0, skipped = 0;
for (const [tool, disc] of needs) {
    const idx = c.indexOf("'" + tool + "': {");
    if (idx < 0) { console.log("MISSING: " + tool); continue; }
    const block = c.slice(idx, idx + 3000);
    if (block.includes("Disclaimer")) { skipped++; continue; }
    const pos = block.lastIndexOf("}] },");
    if (pos < 0) { console.log("NO END: " + tool); continue; }
    c = c.slice(0, idx + pos) + disc + c.slice(idx + pos);
    added++;
}

fs.writeFileSync("src/app/data/formulas.ts", c, "utf8");
console.log("Added: " + added + " | Skipped (already has): " + skipped);
