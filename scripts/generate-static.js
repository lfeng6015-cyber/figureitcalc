/**
 * Static HTML Generator with SEO Body Content
 * Embeds What Is, How It Works, Use Cases, Tips, FAQ directly into each tool page.
 * Category pages get concepts, tutorial, tips, FAQ.
 * Homepage and info pages get descriptive content.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const distDir = 'dist';
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');
const toolsTs = readFileSync('src/app/data/tools.ts', 'utf-8');
const contentTs = readFileSync('src/app/data/content.ts', 'utf-8');
const catContentTs = readFileSync('src/app/data/categoryContent.ts', 'utf-8');
const formulasTs = readFileSync('src/app/data/formulas.ts', 'utf-8');

// Helpers
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function escAttr(s) { return String(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

// Extract all tool IDs
const idRegex = /"id":\s*"([a-z0-9-]+)"/g;
const toolIds = new Set();
let m;
while ((m = idRegex.exec(toolsTs)) !== null) toolIds.add(m[1]);
const uniqueIds = [...toolIds];
console.log(`Found ${uniqueIds.length} tools`);

// Extract regex helpers
function getToolMeta(toolId) {
  const idIdx = toolsTs.indexOf(`"id": "${toolId}"`);
  if (idIdx < 0) return null;
  const chunk = toolsTs.slice(idIdx, idIdx + 2000);
  const name = (chunk.match(/"name":\s*"([^"]+)"/)||[])[1]||toolId;
  const cat = (chunk.match(/"category":\s*"([^"]+)"/)||[])[1]||'other';
  const seoTitle = (chunk.match(/"seo":\s*\{[^}]*?"title":\s*"([^"]+)"/)||[])[1]||name;
  const seoDesc = (chunk.match(/"seo":\s*\{[^}]*?"description":\s*"([^"]+)"/)||[])[1]||'';
  const seoKw = (chunk.match(/"seo":\s*\{[^}]*?"keywords":\s*"([^"]+)"/)||[])[1]||'';
  const h1 = (chunk.match(/"seo":\s*\{[^}]*?"h1":\s*"([^"]+)"/)||[])[1]||name;
  const intro = (chunk.match(/"seo":\s*\{[^}]*?"intro":\s*"([^"]+)"/)||[])[1]||'';
  const howTo = [];
  const howToStr = (chunk.match(/"howTo":\s*\[([^\]]*)\]/)||[])[1];
  if (howToStr) {
    const stepMatches = howToStr.matchAll(/"([^"]+)"/g);
    for (const sm of stepMatches) howTo.push(sm[1]);
  }
  return { name, cat, seoTitle, seoDesc, seoKw, h1, intro, howTo };
}

function getToolContent(toolId) {
  const keyIdx = contentTs.indexOf(`'${toolId}':`);
  if (keyIdx < 0) return null;
  const chunk = contentTs.slice(keyIdx, keyIdx + 5000);
  const whatIs = (chunk.match(/whatIs:\s*"([^"]+)"/)||[])[1]||'';
  const howItWorks = (chunk.match(/howItWorks:\s*"([^"]+)"/)||[])[1]||'';
  const formula = (chunk.match(/formula:\s*"([^"]+)"/)||[])[1]||'';
  const useCases = [];
  const ucStr = (chunk.match(/useCases:\s*\[([^\]]*)\]/)||[])[1];
  if (ucStr) {
    const ucMatches = ucStr.matchAll(/"([^"]+)"/g);
    for (const um of ucMatches) useCases.push(um[1]);
  }
  const tips = [];
  const tipStr = (chunk.match(/tips:\s*\[([^\]]*)\]/)||[])[1];
  if (tipStr) {
    const tipMatches = tipStr.matchAll(/"([^"]+)"/g);
    for (const tm of tipMatches) tips.push(tm[1]);
  }
  const faq = [];
  const faqStr = (chunk.match(/faq:\s*\[([^\]]*(?:\{[^}]*\}[^\]]*)*)\]/)||[])[1];
  if (faqStr) {
    const qaMatches = faqStr.matchAll(/\{\s*q:\s*"([^"]+)"\s*,\s*a:\s*"([^"]+)"\s*\}/g);
    for (const qam of qaMatches) faq.push({ q: qam[1], a: qam[2] });
  }
  return { whatIs, howItWorks, formula, useCases, tips, faq };
}

function getFormulaPreview(toolId) {
  const keyIdx = formulasTs.indexOf(`'${toolId}':`);
  if (keyIdx < 0) return '';
  const chunk = formulasTs.slice(keyIdx, keyIdx + 2000);
  const fb = (chunk.match(/formula:\s*\(v\)\s*=>\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/)||[])[1];
  if (!fb) return '';
  // Extract formula string if present
  const f = (chunk.match(/formula.*?return\s*\[([^\]]*)\]/)||[])[1];
  if (!f) return '';
  const labels = f.match(/label:\s*'([^']+)'/g)||[];
  const values = f.match(/value:\s*([^,}]+)/g)||[];
  return { raw: fb.slice(0,200), labels: labels.map(l=>l.slice(8,-1)), values: values.map(v=>v.slice(7)) };
}

function getCategoryContent(catId) {
  let keyIdx = catContentTs.indexOf(`'${catId}':`);
  if (keyIdx < 0) keyIdx = catContentTs.indexOf(`${catId}:`);
  if (keyIdx < 0) return null;
  const chunk = catContentTs.slice(keyIdx, keyIdx + 8000);
  const title = (chunk.match(/title:\s*"([^"]+)"/)||[])[1]||'';
  const intro = (chunk.match(/intro:\s*"([^"]+)"/)||[])[1]||'';
  const concepts = [];
  const conceptsStart = chunk.indexOf('concepts:');
  if (conceptsStart > 0) {
    const cChunk = chunk.slice(conceptsStart);
    const cMatches = cChunk.matchAll(/\{\s*emoji:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,\s*desc:\s*"([^"]+)"\s*\}/g);
    for (const cm of cMatches) {
      concepts.push({ emoji: cm[1], title: cm[2], desc: cm[3] });
      if (concepts.length >= 8) break;
    }
  }
  const tutorial = [];
  const tutStart = chunk.indexOf('tutorial:');
  if (tutStart > 0) {
    const tChunk = chunk.slice(tutStart);
    const tMatches = tChunk.matchAll(/\{\s*title:\s*"([^"]+)"\s*,\s*desc:\s*"([^"]+)"\s*\}/g);
    for (const tm of tMatches) {
      tutorial.push({ title: tm[1], desc: tm[2] });
      if (tutorial.length >= 6) break;
    }
  }
  const tips = [];
  const tipsStart = chunk.indexOf('tips:');
  if (tipsStart > 0) {
    const tpChunk = chunk.slice(tipsStart);
    const tipMatches = tpChunk.matchAll(/"([^"]{10,200})"/g);
    for (const tm of tipMatches) {
      tips.push(tm[1]);
      if (tips.length >= 6) break;
    }
  }
  const faq = [];
  const faqStart = chunk.indexOf('faq:');
  if (faqStart > 0) {
    const fChunk = chunk.slice(faqStart);
    const qaMatches = fChunk.matchAll(/\{\s*q:\s*"([^"]+)"\s*,\s*a:\s*"([^"]+)"\s*\}/g);
    for (const qam of qaMatches) {
      faq.push({ q: qam[1], a: qam[2] });
      if (faq.length >= 6) break;
    }
  }
  return { title, intro, concepts, tutorial, tips, faq };
}

// Build page
function buildPage(metaTitle, metaDesc, metaKeywords, canonicalPath, bodyContent, faqData) {
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(metaTitle)}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/,
    `<meta name="description" content="${escAttr(metaDesc).substring(0,300)}">`);
  html = html.replace(/<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escAttr(metaTitle)}">`);
  html = html.replace(/<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${escAttr(metaDesc).substring(0,200)}">`);
  html = html.replace(/<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="https://figureitcalc.com${canonicalPath}">`);
  if (!html.includes('name="keywords"')) {
    html = html.replace('</head>', `<meta name="keywords" content="${escAttr(metaKeywords)}">\n</head>`);
  } else {
    html = html.replace(/<meta name="keywords"[^>]*>/,
      `<meta name="keywords" content="${escAttr(metaKeywords)}">`);
  }

  // Add JSON-LD FAQ schema if present
  if (faqData && faqData.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    };
    html = html.replace('</head>',
      `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n</head>`);
  }

  // Inject visible SEO content directly on the page — fully crawlable
  html = html.replace('<div id="root"></div>',
    `<div id="root">
<section class="seo-content" style="max-width:900px;margin:40px auto;padding:20px 16px;font-family:system-ui,sans-serif;line-height:1.8;color:#333;background:#fff;border-top:1px solid #eee">
  ${bodyContent}
</section>`);

  // Output
  const filePath = canonicalPath === '/' ? 'index.html' : canonicalPath.slice(1) + '.html';
  const outDir = join(distDir, dirname(filePath));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(distDir, filePath), html);
}

// ====== HOMEPAGE ======
buildPage(
  'Free Online Tools — 206+ Calculators, Converters & Generators | figureitcalc',
  '206+ free online tools: BMI calculator, mortgage calculator, JSON formatter, Base64 encoder, zodiac compatibility, numerology, QR code generator, compound interest calculator, and more. No signup, all client-side processing.',
  'free online tools, online calculator, BMI, mortgage, JSON, Base64, QR code, zodiac, numerology, converters, generators',
  '/',
  `
    <h1>Free Online Tools — 206+ Calculators & Converters</h1>
    <p>figureitcalc offers 206+ free online tools across 21 categories: Finance, Health & Fitness, Developer Tools, Cooking, Travel, Real Estate, Construction, Fortune & Love, and more. All tools run 100% client-side — your data never leaves your browser. No signup required. Free forever.</p>
    <h2>Popular Tools</h2>
    <ul>
      <li><a href="/tools/bmi-calculator.html">BMI Calculator</a> — Check your body mass index with WHO categories</li>
      <li><a href="/tools/mortgage-calculator.html">Mortgage Calculator</a> — Estimate monthly payments with taxes and PMI</li>
      <li><a href="/tools/compound-interest-calculator.html">Compound Interest Calculator</a> — Project your investments with monthly contributions</li>
      <li><a href="/tools/tip-calculator.html">Tip Calculator</a> — Split restaurant bills among friends</li>
      <li><a href="/tools/zodiac-love-compatibility.html">Zodiac Love Compatibility</a> — Find your astrological match</li>
      <li><a href="/tools/love-calculator.html">Love Calculator</a> — Classic name love percentage</li>
      <li><a href="/tools/qr-code-generator.html">QR Code Generator</a> — Create scannable QR codes</li>
      <li><a href="/tools/json-formatter.html">JSON Formatter</a> — Beautify and validate JSON</li>
    </ul>
    <h2>Categories</h2>
    <ul>
      <li>Finance — Loan, mortgage, retirement, investment calculators</li>
      <li>Health & Fitness — BMI, TDEE, body fat, heart rate zone calculators</li>
      <li>Developer Tools — JSON, Base64, UUID, regex, hash, encoding tools</li>
      <li>Fortune & Love — Zodiac, numerology, I Ching, tarot, love compatibility</li>
      <li>Cooking — Recipe converter, baker's percentage, coffee ratio</li>
      <li>Travel — Fuel cost, mileage, time zone converter</li>
      <li>Construction — Concrete, paint, flooring, roofing calculators</li>
      <li>And 14 more categories...</li>
    </ul>
  </div>`,
  null
);

// ====== CATEGORY PAGES ======
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

for (const catId of catIds) {
  const catContent = getCategoryContent(catId);
  const label = catLabels[catId] || catId;
  const catToolCount = (toolsTs.match(new RegExp(`"category":\\s*"${catId}"`, 'g'))||[]).length;
  const title = catContent?.title || `${label} — Free Online Tools | figureitcalc`;
  const intro = catContent?.intro || `${label} — ${catToolCount}+ free online tools. No signup, all client-side.`;

  let body = `\n<h1>${esc(title)}</h1>\n<p>${esc(intro)}</p>\n`;

  if (catContent?.concepts?.length) {
    body += `<h2>Key Concepts</h2>\n<ul>\n`;
    for (const c of catContent.concepts) body += `<li><strong>${esc(c.emoji)} ${esc(c.title)}</strong>: ${esc(c.desc)}</li>\n`;
    body += `</ul>\n`;
  }

  if (catContent?.tutorial?.length) {
    body += `<h2>Step-by-Step Guide</h2>\n<ol>\n`;
    for (const t of catContent.tutorial) body += `<li><strong>${esc(t.title)}</strong> — ${esc(t.desc)}</li>\n`;
    body += `</ol>\n`;
  }

  if (catContent?.tips?.length) {
    body += `<h2>Expert Tips</h2>\n<ul>\n`;
    for (const t of catContent.tips) body += `<li>${esc(t)}</li>\n`;
    body += `</ul>\n`;
  }

  if (catContent?.faq?.length) {
    body += `<h2>Frequently Asked Questions</h2>\n`;
    for (const f of catContent.faq) body += `<h3>${esc(f.q)}</h3>\n<p>${esc(f.a)}</p>\n`;
  }

  body += `<p><strong>${catToolCount} free tools</strong> in this category. No signup required, all processing client-side.</p>\n`;
  body += `</div>`;

  let faqData = null;
  if (catContent?.faq?.length) faqData = catContent.faq;

  buildPage(
    title,
    intro.substring(0, 300),
    `${catId}, free ${catId} tools, online ${catId} calculator, ${catId} converter`,
    `/category/${catId}`,
    body,
    faqData
  );
}

// ====== TOOL PAGES ======
let toolCount = 0;
for (const toolId of uniqueIds) {
  const meta = getToolMeta(toolId);
  if (!meta) continue;
  const content = getToolContent(toolId);

  let body = `\n`;
  body += `<h1>${esc(meta.h1 || meta.name)}</h1>\n`;
  body += `<p><strong>${esc(meta.intro)}</strong></p>\n`;

  // How to Use
  if (meta.howTo?.length) {
    body += `<h2>How to Use the ${esc(meta.name)}</h2>\n<ol>\n`;
    for (const step of meta.howTo) body += `<li>${esc(step)}</li>\n`;
    body += `</ol>\n`;
  }

  // What Is
  if (content?.whatIs) {
    body += `<h2>What is a ${esc(meta.name)}?</h2>\n<p>${esc(content.whatIs)}</p>\n`;
  }

  // How It Works
  if (content?.howItWorks) {
    body += `<h2>How Does It Work?</h2>\n<p>${esc(content.howItWorks)}</p>\n`;
  }

  // Formula
  if (content?.formula) {
    body += `<h2>Formula</h2>\n<pre>${esc(content.formula)}</pre>\n`;
  }

  // Use Cases
  if (content?.useCases?.length) {
    body += `<h2>Who Uses This Tool?</h2>\n<ul>\n`;
    for (const uc of content.useCases) body += `<li>${esc(uc)}</li>\n`;
    body += `</ul>\n`;
  }

  // Pro Tips
  if (content?.tips?.length) {
    body += `<h2>Pro Tips</h2>\n<ul>\n`;
    for (const tip of content.tips) body += `<li>${esc(tip)}</li>\n`;
    body += `</ul>\n`;
  }

  // FAQ
  if (content?.faq?.length) {
    body += `<h2>Frequently Asked Questions about ${esc(meta.name)}</h2>\n`;
    for (const f of content.faq) body += `<h3>${esc(f.q)}</h3>\n<p>${esc(f.a)}</p>\n`;
  }

  body += `<p><em>Free online ${esc(meta.name)} — no signup, 100% client-side processing. All data stays in your browser.</em></p>\n`;
  body += `</div>`;

  buildPage(
    meta.seoTitle,
    meta.seoDesc.substring(0, 300),
    meta.seoKw,
    `/tools/${toolId}`,
    body,
    content?.faq?.length ? content.faq : null
  );

  toolCount++;
  if (toolCount % 50 === 0) console.log(`  ...${toolCount}/${uniqueIds.length} tools`);
}

// ====== INFO PAGES ======
buildPage(
  'About figureitcalc — Free Online Tools Platform',
  'figureitcalc offers 206+ free online calculators, converters, and tools. All client-side, no signup. Learn about our mission, technology, and how we sustain free tools.',
  'about figureitcalc, free tools, online calculators',
  '/about',
  `
    <h1>About figureitcalc</h1>
    <p>figureitcalc is a free online tools platform offering <strong>206+ calculators, converters, generators, and utilities</strong> — all running entirely in your browser. No signup, no downloads, no server uploads. Just open the page and use the tool.</p>
    <h2>Why figureitcalc?</h2>
    <p>We believe useful tools should be free, fast, and private. Every tool processes data <strong>100% client-side</strong> — your information never leaves your device.</p>
    <h2>Our Tools</h2>
    <p>21 categories: Finance, Health & Fitness, Developer Utilities, Cooking, Travel, Real Estate, Construction, Fortune & Love, and more. Each tool includes detailed explanations, formulas, use cases, pro tips, and FAQs.</p>
    <h2>How We Sustain</h2>
    <p>figureitcalc is free thanks to display advertising. We never sell your data, require accounts, or lock features behind paywalls.</p>
  </div>`,
  null
);

buildPage(
  'Privacy Policy — figureitcalc',
  'Our privacy policy: all tools are client-side, your data never leaves your device. No account creation required. Learn about our data handling practices.',
  'privacy policy, data protection, client-side processing, no tracking',
  '/privacy',
  `
    <h1>Privacy Policy</h1>
    <p>figureitcalc is designed with privacy as a core principle. The vast majority of our tools process data <strong>entirely in your browser</strong> using client-side JavaScript.</p>
    <h2>What We Don't Do</h2>
    <ul><li>We don't collect, store, or access any data you enter into our tools</li><li>We don't require account creation</li><li>We don't track individual users</li></ul>
    <h2>Third-Party Services</h2>
    <p>We use Google AdSense for advertisements and Google Analytics for anonymous usage statistics. These services may set cookies governed by their respective privacy policies.</p>
  </div>`,
  null
);

buildPage(
  'Contact Us — figureitcalc',
  'Contact figureitcalc for bug reports, tool suggestions, advertising inquiries, or security concerns. We respond within 24-48 hours.',
  'contact, support, bug report, advertising, figureitcalc',
  '/contact',
  `
    <h1>Contact Us</h1>
    <p>Email: <strong>hello@figureitcalc.com</strong></p>
    <p>We typically respond within 24-48 hours on business days.</p>
    <h2>Common Topics</h2>
    <ul><li>Bug Report — Tell us which tool, what happened, and what you expected</li><li>Tool Suggestion — We're always adding new tools</li><li>Advertising / Partnership — Beyond AdSense</li><li>Security Concern — Please email us directly</li></ul>
  </div>`,
  null
);

console.log(`Generated: 1 homepage + ${catIds.length} categories + ${toolCount} tools + 3 info pages`);
console.log(`Total: ${1 + catIds.length + toolCount + 3} static pages with embedded content`);
