import { useState } from "react";
import { Copy, CheckCircle, ArrowUpDown, Trash2 } from "lucide-react";

export function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello, this is a sample text for Base64 encoding.");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  let output = "";
  try {
    if (input) {
      output = mode === "encode"
        ? btoa(unescape(encodeURIComponent(input)))
        : decodeURIComponent(escape(atob(input)));
    }
    if (error) setError("");
  } catch {
    output = "";
  }

  const handleInput = (val: string) => {
    setInput(val);
    setError("");
    try {
      if (val && mode === "decode") atob(val);
    } catch {
      setError("Invalid Base64 string — check for non-Base64 characters or padding errors.");
    }
  };

  const swap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setError("");
  };

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
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(""); }}
            className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
              mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "encode" ? "Encode (Text → Base64)" : "Decode (Base64 → Text)"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{mode === "encode" ? "Plain Text" : "Base64 String"}</span>
            <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <textarea
            className="w-full h-60 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{mode === "encode" ? "Base64 Encoded" : "Decoded Text"}</span>
            <button onClick={copy} disabled={!output} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors disabled:opacity-40">
              {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {error ? (
            <div className="h-60 p-3 rounded-lg border border-destructive/40 bg-destructive/5 text-destructive text-sm font-mono flex items-start">
              ❌ {error}
            </div>
          ) : (
            <textarea
              readOnly
              className="w-full h-60 p-3 rounded-lg border border-border bg-muted text-foreground text-sm font-mono resize-none focus:outline-none"
              value={output}
              placeholder="Result will appear here..."
            />
          )}
        </div>
      </div>

      <button
        onClick={swap}
        disabled={!output}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all disabled:opacity-40"
      >
        <ArrowUpDown className="w-4 h-4" />
        Swap — use output as new input
      </button>
    </div>
  );
}
