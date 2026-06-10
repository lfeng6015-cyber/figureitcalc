import { useState } from "react";
import { Copy, CheckCircle, Trash2 } from "lucide-react";

export function UrlTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("https://example.com/search?q=hello world&page=1&sort=desc");
  const [copied, setCopied] = useState(false);

  let output = "";
  let error = "";
  try {
    if (input) output = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
  } catch {
    error = "Invalid URL-encoded string — check for malformed percent sequences (e.g. %ZZ).";
  }

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = output;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-all ${mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {m === "encode" ? "URL Encode" : "URL Decode"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Input</span>
            <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <textarea
            className="w-full h-52 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter URL or text to encode..." : "Enter URL-encoded string to decode..."}
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Result</span>
            <button onClick={copy} disabled={!output} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors disabled:opacity-40">
              {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {error ? (
            <div className="h-52 p-3 rounded-lg border border-destructive/40 bg-destructive/5 text-destructive text-sm font-mono">❌ {error}</div>
          ) : (
            <textarea readOnly className="w-full h-52 p-3 rounded-lg border border-border bg-muted text-foreground text-sm font-mono resize-none focus:outline-none"
              value={output} placeholder="Result will appear here..." />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          ["Space", " ", "%20"],
          ["Chinese", "Hello", "%E4%BD%A0%E5%A5%BD"],
          ["Ampersand", "&", "%26"],
          ["Equals", "=", "%3D"],
        ].map(([label, raw, enc]) => (
          <div key={label} className="p-2 bg-muted rounded-lg text-xs text-center border border-border">
            <p className="text-muted-foreground mb-1">{label}</p>
            <p className="font-mono text-foreground">{raw} → {enc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
