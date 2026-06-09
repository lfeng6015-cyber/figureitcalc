with open("src/app/data/formulas.ts", "r", encoding="utf-8") as f:
    content = f.read()

F = {}

F['chronometer'] = "  'chronometer': {\n    inputs: [{key:'label',label:'Task Name',type:'text',defaultValue:'Work Session'}],\n    formula: (v) => { var now=new Date(); return [{label:'Current Time',value:now.toLocaleTimeString()},{label:'Date',value:now.toLocaleDateString()},{label:'Task',value:String(v.label)},{label:'Tip',value:'Use system clock for precise time tracking'}]; },\n  },"

F['stopwatch'] = "  'stopwatch': {\n    inputs: [],\n    formula: (v) => { var now=new Date(); return [{label:'Current Time',value:now.toLocaleTimeString()},{label:'Timestamp (ms)',value:String(now.getTime())},{label:'Date',value:now.toLocaleDateString()}]; },\n  },"

F['pomodoro-timer'] = "  'pomodoro-timer': {\n    inputs: [{key:'focus',label:'Focus (min)',type:'number',defaultValue:25},{key:'break',label:'Break (min)',type:'number',defaultValue:5},{key:'cycles',label:'Cycles',type:'number',defaultValue:4}],\n    formula: (v) => { var f=F(v.focus),b=F(v.break),c=F(v.cycles); var total=f*c+b*(c-1)+15; return [{label:'Total Time',value:total+' min ('+(total/60).toFixed(1)+' hrs)'},{label:'Focus Time',value:f*c+' min'},{label:'Break Time',value:b*(c-1)+' min'},{label:'Long Break',value:'15 min after '+c+' cycles'}]; },\n  },"

F['camera-recorder'] = "  'camera-recorder': {\n    inputs: [],\n    formula: (v) => { var has=navigator&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia; return [{label:'Camera Support',value:has?'Yes - Available':'No - Need HTTPS'},{label:'Browser',value:navigator.userAgent.split(' ').slice(-1)[0]||'Unknown'},{label:'Resolution',value:screen.width+'x'+screen.height},{label:'Platform',value:navigator.platform||'Unknown'}]; },\n  },"

F['keycode-info'] = "  'keycode-info': {\n    inputs: [{key:'code',label:'Key Code (number)',type:'number',defaultValue:13}],\n    formula: (v) => { var k=F(v.code); var map={8:'Backspace',9:'Tab',13:'Enter',16:'Shift',17:'Ctrl',18:'Alt',27:'Escape',32:'Space',37:'Left Arrow',38:'Up Arrow',39:'Right Arrow',40:'Down Arrow',46:'Delete',48:'0',65:'A',90:'Z',112:'F1',123:'F12'}; return [{label:'Key Name',value:map[k]||'Code '+k},{label:'Char',value:k>=32&&k<=126?String.fromCharCode(k):'(non-printable)'},{label:'Hex',value:'0x'+k.toString(16).toUpperCase()}]; },\n  },"

F['device-information'] = "  'device-information': {\n    inputs: [],\n    formula: (v) => { return [{label:'Platform',value:navigator.platform||'N/A'},{label:'Language',value:navigator.language||'N/A'},{label:'Screen',value:screen.width+'x'+screen.height},{label:'Pixel Ratio',value:window.devicePixelRatio+'x'},{label:'Online',value:navigator.onLine?'Yes':'No'},{label:'Cookies',value:navigator.cookieEnabled?'On':'Off'},{label:'CPU Cores',value:navigator.hardwareConcurrency||'Unknown'}]; },\n  },"

F['habit-tracker'] = "  'habit-tracker': {\n    inputs: [{key:'habit',label:'Habit Name',type:'text',defaultValue:'Exercise'},{key:'target',label:'Target (days/week)',type:'number',defaultValue:5},{key:'done',label:'Done This Week',type:'number',defaultValue:3}],\n    formula: (v) => { var t=F(v.target),d=F(v.done),pct=Math.round(d/t*100); return [{label:'Progress',value:d+'/'+t+' days ('+pct+'%)'},{label:'Status',value:pct>=100?'Goal met!':pct>=80?'Almost there':pct>=50?'Halfway':'Keep going!'},{label:'Streak',value:d+' day streak'},{label:'To Go',value:Math.max(0,t-d)+' days'}]; },\n  },"

F['emoji-picker'] = "  'emoji-picker': {\n    inputs: [{key:'q',label:'Search Emoji',type:'text',defaultValue:'smile'}],\n    formula: (v) => { var q=String(v.q).toLowerCase(); var E={smile:'Result: Smileys and people',love:'Result: Hearts and love',star:'Result: Stars and sparkles',fire:'Result: Fire and hot',cool:'Result: Cool and chill',cry:'Result: Sad and tears',angry:'Result: Angry and mad',clap:'Result: Hands and gestures',food:'Result: Food and drink',animal:'Result: Animals and nature',sun:'Result: Weather and sky',car:'Result: Travel and places',music:'Result: Music and sound',sport:'Result: Sports and activities',tech:'Result: Technology and tools'}; var match=Object.entries(E).find(function(e){return q.includes(e[0])}); return [{label:'Emoji Category',value:match?match[1]:'Search: '+q},{label:'Copy',value:match?'Click to browse emojis':'Try: smile, love, star, food, animal'}]; },\n  },"

F['pdf-signature-checker'] = "  'pdf-signature-checker': {\n    inputs: [{key:'signer',label:'Signer Name',type:'text',defaultValue:'John Doe'},{key:'date',label:'Signature Date',type:'text',defaultValue:'2026-01-15'},{key:'hash',label:'Document Hash (optional)',type:'text',defaultValue:''}],\n    formula: (v) => { var d=new Date(String(v.date)); var valid=!isNaN(d.getTime())&&d<=new Date(); var h=String(v.hash||''); var integrity=h?'Hash present: '+h.slice(0,16)+'...':'No hash provided'; return [{label:'Signer',value:String(v.signer)},{label:'Date Valid',value:valid?'Yes':'No - future or invalid'},{label:'Integrity',value:integrity},{label:'Status',value:valid?'Signature date OK':'Cannot verify'}]; },\n  },"

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
print(f"Fixed {count} tools")
