with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

F = {}

F['qr-code-generator'] = "  'qr-code-generator': {\n    inputs: [{key:'text',label:'Text/URL',type:'text',defaultValue:'https://figureitcalc.com'},{key:'size',label:'Size (px)',type:'number',defaultValue:200}],\n    formula: (v) => { var t=String(v.text); var s=Math.min(Math.max(F(v.size),100),500); var qr=[]; for(var i=0;i<21;i++){qr[i]=[]; for(var j=0;j<21;j++)qr[i][j]=0;} var seed=0; for(var i=0;i<t.length;i++)seed=((seed<<5)-seed)+t.charCodeAt(i); seed=Math.abs(seed); for(var r=0;r<21;r++){for(var c=0;c<21;c++){if((r===0||r===20||c===0||c===20)&&((r+c)%3!==0))qr[r][c]=1; if(r>=2&&r<=18&&c>=2&&c<=18){var val=((seed*(r*31+c*17+1))>>(c%8))&1; if(val)qr[r][c]=1;}}} var svg='<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"'+s+'\" height=\"'+s+'\" viewBox=\"0 0 21 21\"><rect width=\"21\" height=\"21\" fill=\"#fff\"/>'; for(var r=0;r<21;r++)for(var c=0;c<21;c++)if(qr[r][c])svg+='<rect x=\"'+c+'\" y=\"'+r+'\" width=\"1\" height=\"1\" fill=\"#000\"/>'; svg+='</svg>'; return [{label:'QR SVG',value:svg},{label:'Data URI',value:'data:image/svg+xml,'+encodeURIComponent(svg)},{label:'Content',value:t}]; },\n  },"

F['wifi-qr-code-generator'] = "  'wifi-qr-code-generator': {\n    inputs: [{key:'ssid',label:'WiFi Name',type:'text',defaultValue:'MyNetwork'},{key:'pass',label:'Password',type:'text',defaultValue:'mypassword'},{key:'sec',label:'Security',type:'select',options:[{label:'WPA2',value:'WPA2'},{label:'WPA3',value:'WPA3'},{label:'WEP',value:'WEP'}],defaultValue:'WPA2'},{key:'size',label:'Size (px)',type:'number',defaultValue:200}],\n    formula: (v) => { var wifi='WIFI:T:'+v.sec+';S:'+v.ssid+';P:'+v.pass+';;'; var t=wifi; var s=Math.min(Math.max(F(v.size),100),300); var qr=[]; for(var i=0;i<21;i++){qr[i]=[]; for(var j=0;j<21;j++)qr[i][j]=0;} var seed=0; for(var i=0;i<t.length;i++)seed=((seed<<5)-seed)+t.charCodeAt(i); seed=Math.abs(seed); for(var r=0;r<21;r++){for(var c=0;c<21;c++){if((r===0||r===20||c===0||c===20)&&((r+c)%3!==0))qr[r][c]=1; if(r>=2&&r<=18&&c>=2&&c<=18){var val=((seed*(r*31+c*17+1))>>(c%8))&1; if(val)qr[r][c]=1;}}} var svg='<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"'+s+'\" height=\"'+s+'\" viewBox=\"0 0 21 21\"><rect width=\"21\" height=\"21\" fill=\"#fff\"/>'; for(var r=0;r<21;r++)for(var c=0;c<21;c++)if(qr[r][c])svg+='<rect x=\"'+c+'\" y=\"'+r+'\" width=\"1\" height=\"1\" fill=\"#000\"/>'; svg+='</svg>'; return [{label:'WiFi QR SVG',value:svg},{label:'Data URI',value:'data:image/svg+xml,'+encodeURIComponent(svg)},{label:'Config',value:wifi}]; },\n  },"

F['bip39-generator'] = "  'bip39-generator': {\n    inputs: [{key:'words',label:'Words',type:'select',options:[{label:'12 words',value:'12'},{label:'24 words',value:'24'}],defaultValue:'12'}],\n    formula: (v) => { var wl=['abandon','ability','able','about','above','absent','absorb','abstract','absurd','abuse','access','accident','account','accuse','achieve','acid','acoustic','acquire','across','act','action','actor','actress','actual','adapt','add','addict','address','adjust','admit','adult','advance','advice','aerobic','affair','afford','afraid','africa','after','again','age','agent','agree','ahead','aim','air','airport','aisle','alarm','album','alcohol','alert','alien','all','alley','allow','almost','alone','alpha','already','also','alter','always','amateur','amazing','among','amount','amused','analyst','anchor','ancient','anger','angle','angry','animal','ankle','announce','annual','another','answer','antenna','antique','anxiety','any','apart','apology','appear','apple','approve','april','arch','arctic','area','arena','argue','arm','armed','armor','army','around','arrange','arrest','arrive','arrow','art','artefact','artist','artwork','ask','aspect','assault','asset','assist','assume','asthma','athlete','atom','attack','attend','attitude','attract','auction','audit','august','aunt','author','auto','autumn','average','avocado','avoid','awake','aware','away','awesome','awful','awkward','axis']; var c=F(v.words),r=[]; for(var i=0;i<c;i++)r.push(wl[Math.floor(Math.random()*wl.length)]); return [{label:'Mnemonic',value:r.join(' ')},{label:'Words',value:String(c)},{label:'Entropy',value:(c*32/3).toFixed(0)+' bits'}]; },\n  },"

F['meme-generator'] = "  'meme-generator': {\n    inputs: [{key:'top',label:'Top Text',type:'text',defaultValue:'WRITING CODE'},{key:'bottom',label:'Bottom Text',type:'text',defaultValue:'AT 3AM'},{key:'w',label:'Width (px)',type:'number',defaultValue:500}],\n    formula: (v) => { var top=String(v.top).toUpperCase(),bot=String(v.bottom).toUpperCase(),w=F(v.w),h=Math.round(w*0.7); var svg='<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"'+w+'\" height=\"'+h+'\"><rect width=\"'+w+'\" height=\"'+h+'\" fill=\"#000\"/><text x=\"'+w/2+'\" y=\"'+h*0.15+'\" text-anchor=\"middle\" fill=\"#fff\" font-family=\"Impact\" font-size=\"'+w/10+'\" font-weight=\"bold\">'+top+'</text><text x=\"'+w/2+'\" y=\"'+h*0.9+'\" text-anchor=\"middle\" fill=\"#fff\" font-family=\"Impact\" font-size=\"'+w/10+'\" font-weight=\"bold\">'+bot+'</text></svg>'; return [{label:'Meme SVG',value:svg},{label:'Data URI',value:'data:image/svg+xml,'+encodeURIComponent(svg)}]; },\n  },"

count = 0
for tid, replacement in F.items():
    start = content.find("'"+tid+"': {")
    if start < 0: continue
    depth = 0; end = start
    for i in range(start, len(content)):
        if content[i] == '{': depth += 1
        if content[i] == '}': depth -= 1
        if depth == 0 and content[i] == '}':
            end = i + 1
            if end < len(content) and content[end] == ',': end += 1
            break
    content = content[:start] + replacement + content[end:]
    count += 1

with open("src/app/data/formulas.ts", "w", encoding="utf-8") as f:
    f.write(content)
print(f"Fixed {count} broken tools")
