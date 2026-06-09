import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

export function UrlTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("https://example.com/search?q=你好 世界&page=1&sort=desc");
  const [copied, setCopied] = useState(false);

  let output = "";
  let error = "";
  try {
    if (input) output = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
  } catch {
    error = "无效的 URL 编码字符串";
  }

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-all ${mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {m === "encode" ? "URL 编码" : "URL 解码"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">输入</span>
          <textarea
            className="w-full h-52 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "输入需要编码的 URL 或文本..." : "输入需要解码的字符串..."}
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">结果</span>
            <button onClick={copy} disabled={!output} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors disabled:opacity-40">
              {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          {error ? (
            <div className="h-52 p-3 rounded-lg border border-destructive/40 bg-destructive/5 text-destructive text-sm font-mono">❌ {error}</div>
          ) : (
            <textarea readOnly className="w-full h-52 p-3 rounded-lg border border-border bg-muted text-foreground text-sm font-mono resize-none focus:outline-none"
              value={output} placeholder="结果显示在此..." />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[["空格", " ", "%20"], ["中文", "你好", "%E4%BD%A0%E5%A5%BD"], ["&", "&", "%26"], ["=", "=", "%3D"]].map(([label, raw, enc]) => (
          <div key={label} className="p-2 bg-muted rounded-lg text-xs text-center border border-border">
            <p className="text-muted-foreground mb-1">{label}</p>
            <p className="font-mono text-foreground">{raw} → {enc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
