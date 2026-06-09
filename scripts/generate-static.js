/**
 * Static HTML Generator for figureitcalc
 * After Vite build, pre-renders all pages as static HTML for SEO.
 * Reads tools.ts, content.ts, categoryContent.ts and generates standalone HTML pages.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// Read the built index.html as template
const distDir = 'dist';
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

// Parse tools data from the built JS — since we can't import TS directly,
// extract tool IDs and metadata by reading the tools.js bundle
// Simpler approach: read the raw data files with regex

const toolsTs = readFileSync('src/app/data/tools.ts', 'utf-8');
const contentTs = readFileSync('src/app/data/content.ts', 'utf-8');
const catContentTs = readFileSync('src/app/data/categoryContent.ts', 'utf-8');

// Extract all tool entries
const toolPattern = /"id":\s*"([^"]+)"[^}]*"name":\s*"([^"]+)"[^}]*"description":\s*"([^"]+)"[^}]*"category":\s*"([^"]+)"[^}]*"seo":\s*\{[^}]*"title":\s*"([^"]+)"[^}]*"description":\s*"([^"]+)"[^}]*"keywords":\s*"([^"]+)"[^}]*"h1":\s*"([^"]+)"[^}]*"intro":\s*"([^"]+)"[^}]*"howTo":\s*\[([^\]]*)\]/gs;

// Simpler: extract just id, name, category, seo title, seo desc, seo keywords, seo h1
const toolIds = [];
const idRegex = /"id":\s*"([a-z0-9-]+)"/g;
let m;
while ((m = idRegex.exec(toolsTs)) !== null) {
  toolIds.push(m[1]);
}
// Deduplicate
const uniqueIds = [...new Set(toolIds)];
console.log(`Found ${uniqueIds.length} unique tool IDs`);

// Extract categories
const catIds = ['developer','finance','trade','health','education','cooking','travel',
  'real-estate','construction','pets','automotive','business','productivity',
  'photography','environment','electrical','pregnancy','gaming','wedding','fortune'];
const catLabels = {
  developer:'Developer Tools', finance:'Financial Calculators', trade:'Trade & Tariff',
  health:'Health & Fitness', education:'Education', cooking:'Cooking',
  travel:'Travel', 'real-estate':'Real Estate', construction:'Construction',
  pets:'Pets', automotive:'Automotive', business:'Business', productivity:'Productivity',
  photography:'Photography', environment:'Environment', electrical:'Electrical',
  pregnancy:'Pregnancy', gaming:'Gaming', wedding:'Wedding', fortune:'Fortune & Love'
};

// Generate static HTML pages
function generatePage(filename, metaTitle, metaDesc, metaKeywords, h1, bodyContent) {
  let html = template;

  // Update title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${metaTitle}</title>`);

  // Update meta description
  html = html.replace(/<meta name="description"[^>]*>/,
    `<meta name="description" content="${metaDesc.replace(/"/g, '&quot;')}" />`);

  // Add keywords if not present
  if (metaKeywords && !html.includes('name="keywords"')) {
    html = html.replace('</head>',
      `<meta name="keywords" content="${metaKeywords.replace(/"/g, '&quot;')}" />\n</head>`);
  } else if (metaKeywords) {
    html = html.replace(/<meta name="keywords"[^>]*>/,
      `<meta name="keywords" content="${metaKeywords.replace(/"/g, '&quot;')}" />`);
  }

  // Update OG title
  html = html.replace(/<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${metaTitle.replace(/"/g, '&quot;')}" />`);

  // Update OG description
  html = html.replace(/<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${metaDesc.replace(/"/g, '&quot;').substring(0, 200)}" />`);

  // Add canonical URL
  const canonicalUrl = `https://figureitcalc.com/${filename === 'index' ? '' : filename}`;
  html = html.replace(/<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonicalUrl}" />`);

  // Write file
  const outDir = filename === 'index' ? distDir : join(distDir, dirname(filename));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  writeFileSync(join(distDir, filename === 'index' ? 'index.html' : filename + '.html'), html);
}

// Generate homepage
generatePage('index',
  'Free Online Tools — 206+ Calculators, Converters & Generators | figureitcalc',
  '206+ free calculators and tools: BMI, mortgage, compound interest, JSON formatter, zodiac compatibility, numerology, QR code generator, and more. No signup, all client-side.',
  'free online tools, calculator, converter, generator, BMI, mortgage, JSON, Base64, QR code, zodiac, numerology'
);

// Generate category pages
for (const catId of catIds) {
  const label = catLabels[catId] || catId;

  // Get category content intro
  const catIntroMatch = new RegExp(`'${catId}':\\s*\\{[^}]*?intro:\\s*"([^"]+)"`, 's').exec(catContentTs);
  const catTitleMatch = new RegExp(`'${catId}':\\s*\\{[^}]*?title:\\s*"([^"]+)"`, 's').exec(catContentTs);
  const intro = catIntroMatch ? catIntroMatch[1] : `${label} — Free online tools, calculators, and utilities. No signup required.`;

  // Count tools in this category
  const catToolCount = (toolsTs.match(new RegExp(`"category":\\s*"${catId}"`, 'g')) || []).length;

  generatePage(`category/${catId}`,
    catTitleMatch ? catTitleMatch[1] : `${label} — Free Online Tools | figureitcalc`,
    `${label} — ${catToolCount}+ free online tools and calculators. ${intro.substring(0, 120)}...`,
    `${catId}, free ${catId} tools, online ${catId} calculator, ${catId} converter, free online ${catId}`,
    label,
    intro
  );

  if (Number.isInteger(Number(catId.charAt(0)))) {
    // Log every 5 categories
  }
}

// Generate ALL 206 tool pages
for (const toolId of uniqueIds) {
  // Get tool name from tools.ts
  const nameMatch = new RegExp(`"id":\\s*"${toolId}"[^}]*?"name":\\s*"([^"]+)"`, 's').exec(toolsTs);
  const seoTitleMatch = new RegExp(`"id":\\s*"${toolId}"[^}]*?"seo":\\s*\{[^}]*?"title":\\s*"([^"]+)"`, 's').exec(toolsTs);
  const seoDescMatch = new RegExp(`"id":\\s*"${toolId}"[^}]*?"seo":\\s*\{[^}]*?"description":\\s*"([^"]+)"`, 's').exec(toolsTs);
  const seoKwMatch = new RegExp(`"id":\\s*"${toolId}"[^}]*?"seo":\\s*\{[^}]*?"keywords":\\s*"([^"]+)"`, 's').exec(toolsTs);

  if (nameMatch) {
    const name = nameMatch[1];
    const title = seoTitleMatch ? seoTitleMatch[1] : `${name} — Free Online Tool | figureitcalc`;
    const desc = seoDescMatch ? seoDescMatch[1] : `${name} — free online tool. No signup, client-side processing.`;
    const kw = seoKwMatch ? seoKwMatch[1] : name.toLowerCase();

    generatePage(`tools/${toolId}`,
      title,
      desc.substring(0, 160),
      kw,
      name,
      desc
    );
  }
}

// Generate static info pages
generatePage('about',
  'About figureitcalc — Free Online Tools Platform',
  'figureitcalc offers 206+ free online calculators, converters, and tools. All client-side, no signup. Learn about our mission, technology, and how we sustain free tools.',
  'about, free tools, online calculators, figureitcalc'
);

generatePage('privacy',
  'Privacy Policy — figureitcalc Free Online Tools',
  'Our privacy policy: all tools are client-side, your data never leaves your device. No account creation required. Learn about our data handling practices.',
  'privacy, data protection, client-side, no tracking'
);

generatePage('contact',
  'Contact Us — figureitcalc Free Online Tools',
  'Contact figureitcalc for bug reports, tool suggestions, advertising inquiries, or security concerns. We respond within 24-48 hours.',
  'contact, support, bug report, advertising, figureitcalc'
);

console.log(`Generated static HTML: homepage + ${catIds.length} categories + ${uniqueIds.length} tools + 3 info pages`);
console.log(`Total: ${1 + catIds.length + uniqueIds.length + 3} static pages`);
