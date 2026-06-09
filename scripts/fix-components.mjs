import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/app/data/tools.ts', 'utf8');

// Extract the TOOLS array
const start = content.indexOf('export const TOOLS: ToolMeta[] = [');
const end = content.lastIndexOf('];');
const before = content.slice(0, start);
const toolsJson = content.slice(start + 'export const TOOLS: ToolMeta[] = '.length, end + 1);
const after = content.slice(end + 1);

// Parse
const tools = JSON.parse(toolsJson);

// Map name patterns to components
const componentMap = [
  { pattern: /bmi/i, comp: 'bmi' },
  { pattern: /mortgage/i, comp: 'mortgage' },
  { pattern: /compound interest/i, comp: 'compound-interest' },
  { pattern: /tip calculator/i, comp: 'tip' },
  { pattern: /discount/i, comp: 'discount' },
  { pattern: /json viewer|json format/i, comp: 'json' },
  { pattern: /base64/i, comp: 'base64' },
  { pattern: /hash|md5|sha/i, comp: 'md5' },
  { pattern: /timestamp|date.time/i, comp: 'timestamp' },
  { pattern: /url encod/i, comp: 'url' },
  { pattern: /color convert/i, comp: 'color' },
  { pattern: /text diff/i, comp: 'diff' },
  { pattern: /jwt/i, comp: 'jwt' },
  { pattern: /regex/i, comp: 'regex' },
  { pattern: /percentage calc/i, comp: 'calculator' },
  { pattern: /profit margin/i, comp: 'calculator' },
  { pattern: /roi calc/i, comp: 'calculator' },
  { pattern: /sales tax/i, comp: 'calculator' },
  { pattern: /fuel/i, comp: 'calculator' },
  { pattern: /loan|emi|down payment|early payoff|car loan|auto loan/i, comp: 'calculator' },
  { pattern: /retirement|annuity|fire|savings|net.worth|inflation|stock|crypto|dividend/i, comp: 'calculator' },
  { pattern: /tdee|body fat|ideal weight|bsa|heart rate|steps|water intake|sleep cycle|macro/i, comp: 'calculator' },
  { pattern: /concrete|flooring|paint|roofing|lumber|beam|hvac/i, comp: 'calculator' },
  { pattern: /gpa|grade calc|probability|statistic/i, comp: 'calculator' },
  { pattern: /recipe|baker|cooking|coffee|food|ingredient/i, comp: 'calculator' },
  { pattern: /fuel cost|mileage|travel budget|currency|time.zone|timezone/i, comp: 'calculator' },
  { pattern: /carbon|electricity|solar|water footprint/i, comp: 'calculator' },
  { pattern: /dog|cat|pet/i, comp: 'calculator' },
  { pattern: /depth|ppi|photo|golden ratio/i, comp: 'calculator' },
  { pattern: /tire|lease|car depreciation|car tax|fuel economy/i, comp: 'calculator' },
  { pattern: /break.even|cpm|invoice/i, comp: 'calculator' },
  { pattern: /due date|ovulation|baby|child cost/i, comp: 'calculator' },
  { pattern: /ohm|resistor|led|wire/i, comp: 'calculator' },
  { pattern: /dice|poker|elo|fps/i, comp: 'calculator' },
  { pattern: /wedding|party|seating|drink|countdown/i, comp: 'calculator' },
  { pattern: /pomodoro|stopwatch|habit|wheel|meme|palette/i, comp: 'calculator' },
  // ===== Catch remaining developer utilities =====
  { pattern: /home.equity|property.tax|renovation|rent.vs.buy|child.cost/i, comp: 'calculator' },
  { pattern: /scientific.calc|graphing.calc|math.eval|roman.numeral|integer.base|temperature.conv/i, comp: 'calculator' },
  { pattern: /text.to.binary|text.to.unicode|text.to.nato|slugify|case.conv|list.conv/i, comp: 'calculator' },
  { pattern: /token.gen|uuid.gen|ulid.gen|random.port|password.strength|lorem.ipsum|otp/i, comp: 'calculator' },
  { pattern: /qr.code|wifi.qr|svg.placeholder|meme/i, comp: 'calculator' },
  { pattern: /json.to.csv|json.to.xml|json.to.toml|json.to.yaml|xml.to.json|yaml.to.json|toml.to.json|yaml.to.toml|json.diff|json.minify/i, comp: 'calculator' },
  { pattern: /markdown.to.html|html.entities|sql.prettify|xml.format|yaml.viewer/i, comp: 'calculator' },
  { pattern: /base64|bcrypt|hmac|encryption|rsa|bip39|basic.auth|jwt|safelink/i, comp: 'calculator' },
  { pattern: /ipv4|ipv6|mac.address|url.parser|http.status|user.agent|device.info|keycode|mime.types|phone.parser|iban|email.normal/i, comp: 'calculator' },
  { pattern: /crontab|chmod|docker.run|eta.calc|chronometer|benchmark|camera.recorder|emoji.picker|git.memo|ascii/i, comp: 'calculator' },
  { pattern: /pdf.signature|html.wysiwyg|meta.tag|numeronym/i, comp: 'calculator' },
];

let updated = 0;
for (const tool of tools) {
  if (tool.component !== 'coming-soon') continue;
  for (const { pattern, comp } of componentMap) {
    if (pattern.test(tool.name)) {
      tool.component = comp;
      updated++;
      break;
    }
  }
}

console.log(`Updated ${updated} tools from coming-soon to functional`);
console.log(`Still coming-soon: ${tools.filter(t => t.component === 'coming-soon').length}`);

// Write back
const newToolsJson = JSON.stringify(tools, null, 2);
const output = before + 'export const TOOLS: ToolMeta[] = ' + newToolsJson + after;
writeFileSync('src/app/data/tools.ts', output);
console.log('Done');
