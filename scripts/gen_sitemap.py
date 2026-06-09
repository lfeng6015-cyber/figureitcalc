import re, datetime

with open("src/app/data/tools.ts", "r", encoding="utf-8") as f:
    content = f.read()

tools = re.findall(r'"id": "([a-z0-9-]+)"', content)
cats = ["developer","finance","trade","health","education","cooking","travel",
        "real-estate","construction","pets","automotive","business","productivity",
        "photography","environment","electrical","pregnancy","gaming","wedding","fortune"]
static = ["about","privacy","contact"]
base = "https://figureitcalc.com"

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

lines.append(f'  <url><loc>{base}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>')

for cat in cats:
    lines.append(f'  <url><loc>{base}/#/category/{cat}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>')

for page in static:
    lines.append(f'  <url><loc>{base}/#/{page}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>')

for tool in tools:
    lines.append(f'  <url><loc>{base}/#/tools/{tool}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>')

lines.append('</urlset>')

with open("public/sitemap.xml", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Generated sitemap: {len(tools)} tools, {len(cats)} categories, {len(static)} pages")
print(f"Total URLs: {len(lines)-2}")
