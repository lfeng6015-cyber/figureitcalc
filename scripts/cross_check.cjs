const fs = require('fs');
const c = fs.readFileSync('src/app/data/formulas.ts', 'utf8');

const checklist = [
  ['bcrypt','codeNode','Node.js/Python/C# code examples'],
  ['bip39-generator','CLIENT-SIDE','Privacy notice bold statement'],
  ['chmod-calculator','Quick Reference','chmod quick reference table'],
  ['crontab-generator','Next 5','Next 5 execution times'],
  ['docker-run-to-docker-compose-converter','volumes','volumes/env/restart support'],
  ['email-normalizer','gmail.com','Gmail/Outlook/Yahoo providers'],
  ['encryption','mode','encrypt/decrypt modes'],
  ['hash-text','MD5','multi-hash simultaneous'],
  ['hmac-generator','kfmt','key format + algorithm selection'],
  ['html-entities','decode','encode AND decode modes'],
  ['http-status-codes','Troubleshooting','search + troubleshooting'],
  ['integer-base-converter','from','base selection dropdown'],
  ['ipv4-address-converter','dec','IP-to-Integer bidirectional'],
  ['ipv4-range-expander','Broadcast','CIDR + subnet details'],
  ['ipv4-subnet-calculator','Visualization','visual subnet diagram'],
  ['ipv6-ula-generator','RFC 4193','RFC explanation + custom ID'],
  ['json-diff','Differences','line-by-line diff'],
  ['json-minify','Saved','compression ratio'],
  ['json-to-csv','flatten','nested object flatten'],
  ['json-to-toml','Warnings','incompatibility warnings'],
  ['json-to-xml','rootTag','custom root tag'],
  ['json-to-yaml-converter','indent','indent config'],
  ['json-viewer','Formatted','pretty/compact modes'],
  ['jwt-parser','padB64','timestamp + base64url + Bearer'],
  ['mac-address-generator','oui','custom OUI + case/separator'],
  ['mac-address-lookup','IEEE','extended vendor database'],
  ['markdown-to-html','checkbox','tables + task lists'],
  ['mime-types','mode','bidirectional search'],
  ['numeronym-generator','i18n','explanation + top 10'],
  ['otp-code-generator-and-validator','secret','countdown timer'],
  ['password-strength-analyser','gpu','GPU crack time estimate'],
  ['random-port-generator','Conflict','known port avoidance'],
  ['regex-memo','Email Validation','categorized cheatsheet'],
  ['regex-tester','backtrack','match highlighting + backtracking'],
  ['slugify-string','sep','language transliteration + separator'],
  ['sql-prettify','dialect','SQL dialect + case options'],
  ['string-obfuscator','Hex','purpose explanation'],
  ['svg-placeholder-generator','Data URI','custom params + preview'],
  ['text-diff','word','word/line/char modes'],
  ['text-statistics','Top Words','paragraphs + word frequency'],
  ['text-to-binary','enc','encoding selection'],
  ['text-to-nato-alphabet','AL-fah','pronunciation guides'],
  ['text-to-unicode','HTML','JS/HTML/CSS formats'],
  ['token-generator','type','charset + hex/base64'],
  ['toml-to-json','JSON','nested table support'],
  ['toml-to-yaml','indent','comments + YAML indent'],
  ['ulid-generator','ULID vs UUID','ULID vs UUID comparison'],
  ['url-encoder','urlsafe','full vs component encoding'],
  ['url-parser','Query Parameters','detailed URL breakdown'],
  ['user-agent-parser','Browser','live UA detection'],
  ['uuid-generator','version','v1 + v4 + formats'],
  ['mortgage-calculator','tax','property tax + insurance + HOA'],
  ['compound-interest-calculator','scenario','scenario compare'],
  ['retirement-calculator','Monte Carlo','Monte Carlo simulation'],
  ['roi-calculator','Cash-on-Cash','cash-on-cash + break-even'],
  ['stock-return-calculator','fee','commissions + dividends'],
  ['fire-calculator','Lean FIRE','lean/barista/fat FIRE modes'],
  ['car-loan-calculator','insurance','total ownership cost'],
  ['lease-vs-buy-car-calculator','residual','residual + maintenance'],
  ['rent-vs-buy-calculator','apprec','appreciation + rent growth'],
  ['annuity-calculator','infl','inflation adjustment'],
  ['profit-margin-calculator','overhead','gross/net + tax'],
  ['down-payment-calculator','PMI','PMI impact'],
  ['home-equity-calculator','HELOC','HELOC + refinance'],
  ['dividend-yield-calculator','tax','after-tax dividend'],
  ['savings-goal-calculator','infl','real purchasing power'],
  ['body-fat-calculator','ymca','Navy/YMCA switch'],
  ['tdee-calculator','Sedentary','lifestyle examples'],
  ['beam-load-calculator','DISCLAIMER','extreme values + disclaimer'],
  ['flooring-calculator','Herringbone','pattern waste factors'],
  ['led-resistor-calculator','Tolerance','standard values + tolerance'],
  ['electricity-bill-calculator','region','regional rates'],
  ['depth-of-field-calculator','camera','camera presets'],
  ['golden-ratio-calculator','phi','golden ratio calculator'],
  ['hvac-btu-calculator','zone','climate zone + insulation'],
  ['ideal-weight-calculator','Devine','4-formula comparison'],
  ['loan-comparison-calculator','Loan A','side-by-side comparison'],
  ['ohms-law-calculator','mode','solve-for selector'],
  ['pet-calorie-calculator','rer','species/age/activity RER'],
  ['pet-breed-mix-calculator','ENTERTAINMENT','disclaimer'],
  ['photo-print-size-calculator','dpi','DPI-based size'],
  ['water-footprint-calculator','beef','virtual water data'],
  ['emi-calculator','Equal Principal','equal principal mode'],
  ['base64-string-converter','URL-safe','URL-safe mode'],
  ['currency-converter','Mid-Market','rate timestamp note'],
  ['import-duty-calculator','country','country selection + HS code'],
  ['tariff-impact-calculator','cif','FOB/CIF + VAT'],
  ['tire-size-calculator','od2','old/new comparison'],
  ['ovulation-calculator','irregular','irregular cycle warning'],
];

let pass = 0, fail = 0;
const failed = [];

checklist.forEach(([tool, feature, desc]) => {
    const idx = c.indexOf("'" + tool + "': {");
    if (idx < 0) { failed.push('MISSING: ' + tool + ' - ' + desc); fail++; return; }
    const block = c.slice(idx, Math.min(idx + 3000, c.length));
    if (block.includes(feature)) { pass++; }
    else { failed.push('FEATURE NOT FOUND: ' + tool + ' - ' + desc); fail++; }
});

console.log('=== CROSS-CHECK RESULTS ===');
console.log('PASS: ' + pass + ' | FAIL: ' + fail + ' | TOTAL: ' + checklist.length);
if (failed.length) {
    console.log('\n=== FAILED ITEMS ===');
    failed.forEach(f => console.log('  ' + f));
} else {
    console.log('\nALL ITEMS PASSED!');
}
