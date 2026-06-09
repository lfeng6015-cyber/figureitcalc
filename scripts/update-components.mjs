import { readFileSync, writeFileSync } from 'fs';

let t = readFileSync('src/app/data/tools.ts', 'utf8');

const map = {
  'bmi-calculator': 'bmi', 'mortgage-calculator': 'mortgage',
  'compound-interest-calculator': 'compound-interest',
  'tip-calculator': 'tip', 'discount-calculator': 'discount',
  'json-viewer': 'json', 'base64-string-converter': 'base64',
  'base64-file-converter': 'base64', 'hash-text': 'md5',
  'date-time-converter': 'timestamp', 'url-encoder': 'url',
  'color-converter': 'color', 'text-diff': 'diff',
  'jwt-parser': 'jwt', 'regex-tester': 'regex',
  'percentage-calculator': 'calculator',
};

for (const [id, comp] of Object.entries(map)) {
  // Find tool by id field (which is now numeric) — match by name instead
  // Actually find tools by matching name fields derived from the id pattern
  // Better: just search for "component": "coming-soon" near the right tool name
  // Simplest: find all "coming-soon" and check surrounding context
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match: "id": "X", ... "component": "coming-soon" where the tool has a name matching our id
  const pattern = new RegExp(`("id": "\\d+"[\\s\\S]*?"name": "[^"]*${escapedId.split('-')[0]}[^"]*"[\\s\\S]*?"component": )"coming-soon"`, 'i');
  if (pattern.test(t)) {
    t = t.replace(pattern, `$1"${comp}"`);
    console.log(`Fixed: ${id} → ${comp}`);
  } else {
    console.log(`Not found: ${id}`);
  }
}

writeFileSync('src/app/data/tools.ts', t);
console.log('Done');
