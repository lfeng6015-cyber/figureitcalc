/**
 * Full Static Renderer — generates complete, visible HTML pages.
 * Every page includes styled content: H1, intro, What Is, How To, formula,
 * use cases, tips, FAQ — all directly in the HTML source, fully visible.
 * The React SPA mounts inside #tool-app for the interactive calculator only.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const distDir = 'dist';
const toolsTs = readFileSync('src/app/data/tools.ts', 'utf-8');
const contentTs = readFileSync('src/app/data/content.ts', 'utf-8');
const catContentTs = readFileSync('src/app/data/categoryContent.ts', 'utf-8');

function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escAttr(s) { return String(s||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

// Extract data with robust indexOf-based parsing
function getToolMeta(toolId) {
  const idx = toolsTs.indexOf(`"id": "${toolId}"`);
  if (idx < 0) return null;
  const c = toolsTs.slice(idx, idx + 2500);
  return {
    name: (c.match(/"name":\s*"([^"]+)"/)||[])[1]||toolId,
    cat: (c.match(/"category":\s*"([^"]+)"/)||[])[1]||'other',
    seoTitle: (c.match(/"seo":\s*\{[^}]*?"title":\s*"([^"]+)"/)||[])[1]||'',
    seoDesc: (c.match(/"seo":\s*\{[^}]*?"description":\s*"([^"]+)"/)||[])[1]||'',
    seoKw: (c.match(/"seo":\s*\{[^}]*?"keywords":\s*"([^"]+)"/)||[])[1]||'',
    h1: (c.match(/"seo":\s*\{[^}]*?"h1":\s*"([^"]+)"/)||[])[1]||'',
    intro: (c.match(/"seo":\s*\{[^}]*?"intro":\s*"([^"]+)"/)||[])[1]||'',
    howTo: [...(c.match(/"howTo":\s*\[([^\]]*)\]/)||[])[1]?.matchAll(/"([^"]+)"/g)||[]].map(m=>m[1]),
  };
}

function getToolContent(toolId) {
  const idx = contentTs.indexOf(`'${toolId}':`);
  if (idx < 0) return null;
  // Find the end of this tool's block (start of next tool or end of registry)
  const nextIdx = contentTs.indexOf(`\n  '`, idx + 10);
  const endIdx = nextIdx > 0 ? nextIdx : idx + 6000;
  const c = contentTs.slice(idx, endIdx);
  const faq = [];
  const faqIdx = c.indexOf('faq:');
  if (faqIdx > 0) {
    const fc = c.slice(faqIdx, c.indexOf('\n  }', faqIdx) > 0 ? c.indexOf('\n  }', faqIdx) : c.length);
    for (const m of fc.matchAll(/\{\s*q:\s*"([^"]+)"\s*,\s*a:\s*"([^"]+)"\s*\}/g)) {
      faq.push({q:m[1],a:m[2]});
      if (faq.length >= 6) break;
    }
  }
  const tips = [];
  const tipsIdx = c.indexOf('tips:');
  if (tipsIdx > 0) {
    const tc = c.slice(tipsIdx, c.indexOf('\n  }', tipsIdx) > 0 ? c.indexOf('\n  }', tipsIdx) : c.length);
    for (const m of tc.matchAll(/"([^"]{15,300})"/g)) {
      tips.push(m[1]);
      if (tips.length >= 6) break;
    }
  }
  const useCases = [];
  const ucIdx = c.indexOf('useCases:');
  if (ucIdx > 0) {
    const uc = c.slice(ucIdx, c.indexOf('\n  ]', ucIdx) > 0 ? c.indexOf('\n  ]', ucIdx) : c.length);
    for (const m of uc.matchAll(/"([^"]+)"/g)) {
      useCases.push(m[1]);
      if (useCases.length >= 5) break;
    }
  }
  return {
    whatIs: (c.match(/whatIs:\s*"([^"]+)"/)||[])[1]||'',
    howItWorks: (c.match(/howItWorks:\s*"([^"]+)"/)||[])[1]||'',
    formula: (c.match(/formula:\s*"([^"]+)"/)||[])[1]||'',
    useCases, tips, faq,
  };
}

function getCategoryContent(catId) {
  let idx = catContentTs.indexOf(`'${catId}':`);
  if (idx < 0) idx = catContentTs.indexOf(`${catId}:`);
  if (idx < 0) return null;
  const nextIdx = catContentTs.indexOf(`\n  `, idx + 10);
  const endIdx = nextIdx > 0 && nextIdx < idx + 15000 ? nextIdx : idx + 8000;
  const c = catContentTs.slice(idx, endIdx);
  const concepts = [];
  const ci = c.indexOf('concepts:');
  if (ci > 0) { const cc = c.slice(ci, c.indexOf('\n  ]', ci) > 0 ? c.indexOf('\n  ]', ci) + 4 : c.length);
    for (const m of cc.matchAll(/\{\s*emoji:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,\s*desc:\s*"([^"]+)"\s*\}/g)) { concepts.push({e:m[1],t:m[2],d:m[3]}); if (concepts.length>=8) break; } }
  const tutorial = [];
  const ti = c.indexOf('tutorial:');
  if (ti > 0) { const tc = c.slice(ti, c.indexOf('\n  ]', ti) > 0 ? c.indexOf('\n  ]', ti) + 4 : c.length);
    for (const m of tc.matchAll(/\{\s*title:\s*"([^"]+)"\s*,\s*desc:\s*"([^"]+)"\s*\}/g)) { tutorial.push({t:m[1],d:m[2]}); if (tutorial.length>=6) break; } }
  const tips = [];
  const psi = c.indexOf('tips:');
  if (psi > 0) { const pc = c.slice(psi, c.indexOf('\n  ]', psi) > 0 ? c.indexOf('\n  ]', psi) + 4 : c.length);
    for (const m of pc.matchAll(/"([^"]{15,300})"/g)) { tips.push(m[1]); if (tips.length>=6) break; } }
  const faq = [];
  const fi = c.indexOf('faq:');
  if (fi > 0) { const fc = c.slice(fi, c.indexOf('\n  }', fi) > 0 ? c.indexOf('\n  }', fi) : c.length);
    for (const m of fc.matchAll(/\{\s*q:\s*"([^"]+)"\s*,\s*a:\s*"([^"]+)"\s*\}/g)) { faq.push({q:m[1],a:m[2]}); if (faq.length>=6) break; } }
  return {
    title: (c.match(/title:\s*"([^"]+)"/)||[])[1]||'',
    intro: (c.match(/intro:\s*"([^"]+)"/)||[])[1]||'',
    concepts, tutorial, tips, faq,
  };
}

// CSS for static content — clean, readable, mobile-friendly
const STATIC_CSS = `
:root { --bg:#fafafa; --card:#fff; --text:#1a1a2e; --muted:#555; --primary:#4f46e5; --border:#e5e7eb; --accent:#f0f4ff; }
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:var(--bg); color:var(--text); line-height:1.7; }
.static-page { max-width:900px; margin:0 auto; padding:20px 16px 60px; }
.static-page h1 { font-size:2rem; margin:24px 0 12px; color:#111; }
.static-page h2 { font-size:1.35rem; margin:32px 0 12px; color:#222; border-bottom:2px solid var(--primary); padding-bottom:6px; }
.static-page h3 { font-size:1.1rem; margin:20px 0 8px; color:#333; }
.static-page p { margin:8px 0 16px; color:var(--muted); }
.static-page ul, .static-page ol { margin:8px 0 16px 24px; }
.static-page li { margin:6px 0; color:var(--muted); }
.static-page pre { background:#1e1e2e; color:#cdd6f4; padding:16px; border-radius:10px; overflow-x:auto; font-size:0.85rem; line-height:1.5; margin:12px 0; }
.static-page .card { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:20px; margin:16px 0; }
.static-page .badge { display:inline-block; background:var(--accent); color:var(--primary); padding:4px 12px; border-radius:20px; font-size:0.8rem; font-weight:600; margin:4px 4px 4px 0; }
.static-page .tool-app { background:var(--card); border:2px dashed var(--border); border-radius:12px; padding:20px; margin:24px 0; text-align:center; }
.static-page .tool-app p { color:var(--muted); font-size:0.9rem; }
.static-page details { margin:8px 0; border:1px solid var(--border); border-radius:8px; }
.static-page summary { padding:12px 16px; font-weight:600; cursor:pointer; background:var(--accent); border-radius:8px; }
.static-page details[open] summary { border-radius:8px 8px 0 0; }
.static-page details p { padding:12px 16px; }
.static-page header.static-header { text-align:center; padding:40px 0 24px; }
.static-page header.static-header h1 { font-size:2.4rem; margin-bottom:8px; }
.static-page header.static-header p { font-size:1.1rem; max-width:700px; margin:0 auto; }
.static-page footer.static-footer { margin-top:48px; padding:24px 0; border-top:1px solid var(--border); text-align:center; color:var(--muted); font-size:0.85rem; }
.static-page .concept-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:12px; margin:16px 0; }
.static-page .concept-card { background:var(--accent); border:1px solid var(--border); border-radius:10px; padding:14px; }
.static-page .concept-card strong { display:block; margin-bottom:4px; }
.static-page .step-list { counter-reset:step; }
.static-page .step-list li { counter-increment:step; display:flex; gap:12px; align-items:baseline; }
.static-page .step-list li::before { content:counter(step); background:var(--primary); color:#fff; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:bold; flex-shrink:0; }
.static-page .tip { padding:10px 14px; background:#fefce8; border-left:3px solid #eab308; border-radius:0 8px 8px 0; margin:8px 0; }
.static-page .faq-section details { margin:6px 0; }
.static-page .nav-links { display:flex; flex-wrap:wrap; gap:8px; margin:12px 0; }
.static-page .nav-links a { color:var(--primary); text-decoration:none; font-weight:500; }
.static-page .nav-links a:hover { text-decoration:underline; }
@media(max-width:600px){ .static-page h1{font-size:1.5rem;} .static-page h2{font-size:1.15rem;} .concept-grid{grid-template-columns:1fr;} }
`;

// Build a complete HTML page
function buildPage(title, desc, keywords, canonicalPath, bodyHTML, faqData) {
  const faqJSON = faqData?.length ? JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":faqData.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))
  }) : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${escAttr(desc).substring(0,300)}">
<meta name="keywords" content="${escAttr(keywords)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://figureitcalc.com${canonicalPath}">
<meta property="og:title" content="${escAttr(title)}">
<meta property="og:description" content="${escAttr(desc).substring(0,200)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escAttr(title)}">
<meta name="twitter:description" content="${escAttr(desc).substring(0,200)}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6044600625597443" crossorigin="anonymous"></script>
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#ffffff">
${faqJSON ? `<script type="application/ld+json">${faqJSON}</script>` : ''}
<style>${STATIC_CSS}</style>
</head>
<body>
<div class="static-page">
${bodyHTML}
<footer class="static-footer">
  <p>&copy; 2026 figureitcalc · <a href="/">Home</a> · <a href="/about.html">About</a> · <a href="/privacy.html">Privacy</a> · <a href="/contact.html">Contact</a></p>
</footer>
</div>
</body>
</html>`;
}

function writePage(filePath, html) {
  const outDir = join(distDir, dirname(filePath));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(distDir, filePath), html);
}

// ===== HOMEPAGE =====
const allIds = [...new Set([...toolsTs.matchAll(/"id":\s*"([a-z0-9-]+)"/g)].map(m=>m[1]))];
const catIds = ['developer','finance','trade','health','education','cooking','travel','real-estate','construction','pets','automotive','business','productivity','photography','environment','electrical','pregnancy','gaming','wedding','fortune'];
const catLabels = {developer:'Developer Tools',finance:'Financial Calculators',trade:'Trade & Tariff',health:'Health & Fitness',education:'Education',cooking:'Cooking',travel:'Travel','real-estate':'Real Estate',construction:'Construction',pets:'Pets',automotive:'Automotive',business:'Business',productivity:'Productivity',photography:'Photography',environment:'Environment',electrical:'Electrical',pregnancy:'Pregnancy',gaming:'Gaming',wedding:'Wedding',fortune:'Fortune & Love'};

let hp = `<header class="static-header"><h1>Free Online Tools</h1><p>206+ calculators, converters & generators — all free, no signup, 100% client-side.</p></header>`;
hp += `<div class="card"><h2>Popular Tools</h2><div class="nav-links">`;
const popular = ['bmi-calculator','mortgage-calculator','compound-interest-calculator','tip-calculator','discount-calculator','percentage-calculator','retirement-calculator','currency-converter','fuel-cost-calculator','sales-tax-calculator','json-formatter','base64-string-converter','qr-code-generator','temperature-converter','zodiac-love-compatibility','love-calculator','numerology-calculator'];
for (const id of popular) {
  const meta = getToolMeta(id);
  if (meta) hp += `<a href="/tools/${id}.html">${esc(meta.name)}</a> · `;
}
hp += `</div></div>`;
hp += `<h2>All Categories</h2><div class="concept-grid">`;
for (const catId of catIds) {
  const count = [...toolsTs.matchAll(new RegExp(`"category":\\s*"${catId}"`,'g'))].length;
  hp += `<div class="concept-card"><a href="/category/${catId}.html" style="font-size:1.1rem;font-weight:600;text-decoration:none;color:var(--primary)">${catLabels[catId]||catId}</a><p style="margin-top:4px">${count} tools</p></div>`;
}
hp += `</div><p style="text-align:center;margin-top:24px">All ${allIds.length} tools are free. No signup. Your data never leaves your browser.</p>`;

writePage('index.html', buildPage('Free Online Tools — 206+ Calculators & Converters | figureitcalc','206+ free online calculators and tools: BMI, mortgage, JSON, Base64, zodiac, numerology, QR code. No signup, client-side.','free online tools, calculator, converter, generator, BMI, mortgage, JSON, Base64, QR code','/',hp));

// ===== CATEGORIES =====
for (const catId of catIds) {
  const cc = getCategoryContent(catId);
  const count = [...toolsTs.matchAll(new RegExp(`"category":\\s*"${catId}"`,'g'))].length;
  const label = catLabels[catId]||catId;
  let b = `<header class="static-header"><h1>${esc(cc?.title||label)}</h1><p>${esc(cc?.intro||'')}</p><p><strong>${count} free tools</strong> — no signup, instant results</p></header>`;
  if (cc?.concepts?.length) {
    b += `<h2>Key Concepts</h2><div class="concept-grid">`;
    for (const c of cc.concepts) b += `<div class="concept-card"><strong>${esc(c.e)} ${esc(c.t)}</strong><p>${esc(c.d)}</p></div>`;
    b += `</div>`;
  }
  if (cc?.tutorial?.length) {
    b += `<h2>Step-by-Step Guide</h2><ol class="step-list">`;
    for (const t of cc.tutorial) b += `<li><span><strong>${esc(t.t)}</strong><br>${esc(t.d)}</span></li>`;
    b += `</ol>`;
  }
  if (cc?.tips?.length) {
    b += `<h2>Expert Tips</h2>`;
    for (const t of cc.tips) b += `<div class="tip">${esc(t)}</div>`;
  }
  if (cc?.faq?.length) {
    b += `<h2>Frequently Asked Questions</h2><div class="faq-section">`;
    for (const f of cc.faq) b += `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`;
    b += `</div>`;
  }
  writePage(`category/${catId}.html`, buildPage(cc?.title||label,cc?.intro?.substring(0,300)||'',catId,`/category/${catId}`,b,cc?.faq));
}

// ===== TOOLS =====
for (const toolId of allIds) {
  const meta = getToolMeta(toolId);
  if (!meta) continue;
  const content = getToolContent(toolId);

  let b = `<header class="static-header"><h1>${esc(meta.h1||meta.name)}</h1><p>${esc(meta.intro)}</p></header>`;

  // Calculator app placeholder
  b += `<div class="tool-app" id="tool-app"><p>⚡ Interactive calculator loading...</p><noscript><p>JavaScript is required for the interactive calculator. All information below is fully readable.</p></noscript></div>`;

  if (meta.howTo?.length) {
    b += `<h2>How to Use</h2><ol class="step-list">`;
    for (const s of meta.howTo) b += `<li><span>${esc(s)}</span></li>`;
    b += `</ol>`;
  }
  if (content?.whatIs) b += `<h2>What is a ${esc(meta.name)}?</h2><p>${esc(content.whatIs)}</p>`;
  if (content?.howItWorks) {
    b += `<h2>How It Works</h2><p>${esc(content.howItWorks)}</p>`;
    if (content?.formula) b += `<pre><code>${esc(content.formula)}</code></pre>`;
  }
  if (content?.useCases?.length) {
    b += `<h2>Who Uses This Tool?</h2><ul>`;
    for (const u of content.useCases) b += `<li>${esc(u)}</li>`;
    b += `</ul>`;
  }
  if (content?.tips?.length) {
    b += `<h2>Pro Tips</h2>`;
    for (const t of content.tips) b += `<div class="tip">${esc(t)}</div>`;
  }
  if (content?.faq?.length) {
    b += `<h2>Frequently Asked Questions</h2><div class="faq-section">`;
    for (const f of content.faq) b += `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`;
    b += `</div>`;
  }
  b += `<p style="margin-top:24px;color:var(--muted);font-size:0.9rem"><em>Free online ${esc(meta.name)} — 100% client-side processing. No signup required. All data stays in your browser.</em></p>`;

  writePage(`tools/${toolId}.html`, buildPage(meta.seoTitle||meta.name,meta.seoDesc,meta.seoKw,`/tools/${toolId}`,b,content?.faq));
}

// ===== INFO PAGES =====
writePage('about.html', buildPage('About figureitcalc','figureitcalc offers 206+ free online tools. All client-side, no signup.','about','/about',
  `<header class="static-header"><h1>About figureitcalc</h1></header>
  <div class="card"><h2>Our Mission</h2><p>206+ free online calculators, converters, and utilities — all running entirely in your browser. No signup, no downloads, no server uploads.</p></div>
  <h2>Why figureitcalc?</h2><p>We believe useful tools should be free, fast, and private. Every tool processes data <strong>100% client-side</strong>.</p>
  <h2>21 Categories</h2><p>Finance, Health, Developer, Cooking, Travel, Real Estate, Construction, Fortune & Love, and more.</p>
  <h2>Sustainability</h2><p>Free thanks to display advertising (Google AdSense). We never sell your data or lock features behind paywalls.</p>`));

writePage('privacy.html', buildPage('Privacy Policy | figureitcalc','All tools process data client-side. No account, no tracking.','privacy','/privacy',
  `<header class="static-header"><h1>Privacy Policy</h1></header>
  <div class="card"><h2>Our Promise</h2><p>Your data never leaves your device. All tools run <strong>100% client-side</strong> in your browser. We cannot see, access, or store what you type.</p></div>
  <h2>No Account Required</h2><p>No signup. No tracking. Your tool preferences are saved only in your browser localStorage.</p>
  <h2>Third Parties</h2><p>Google AdSense (ads) and Google Analytics (anonymous stats). These services may set cookies per their policies.</p>`));

writePage('contact.html', buildPage('Contact figureitcalc','Contact us for bugs, suggestions, ads, security.','contact','/contact',
  `<header class="static-header"><h1>Contact Us</h1></header>
  <div class="card"><h2>Email</h2><p><strong>hello@figureitcalc.com</strong> — we respond within 24-48 hours.</p></div>
  <h2>Topics</h2><ul><li><strong>Bug Report</strong> — Which tool, what happened</li><li><strong>Tool Suggestion</strong> — What tool do you need?</li><li><strong>Advertising</strong> — Beyond AdSense partnerships</li><li><strong>Security</strong> — Report vulnerabilities confidentially</li></ul>`));

console.log(`Generated: ${1+catIds.length+allIds.length+3} static pages with full visible content`);
