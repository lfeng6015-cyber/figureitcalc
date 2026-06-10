import { useState, useCallback } from "react";
import { Copy, Trash2, CheckCircle } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState('{"name":"figureitcalc","version":"1.0","features":["format","minify","validate"]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"format" | "minify">("format");

  const process = useCallback((text: string, m: "format" | "minify") => {
    if (!text.trim()) { setOutput(""); setError(""); return; }
    try {
      const parsed = JSON.parse(text);
      setOutput(m === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }, []);

  const handleInput = (val: string) => {
    setInput(val);
    process(val, mode);
  };

  const switchMode = (m: "format" | "minify") => {
    setMode(m);
    process(input, m);
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
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      {/* Mode Tabs */}
      <div className="flex gap-2">
        {(["format", "minify"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
              mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "format" ? "Format / Beautify" : "Minify / Compact"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Input JSON</span>
            <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <textarea
            className="w-full h-72 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Output</span>
            <button onClick={copy} disabled={!output} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors disabled:opacity-40">
              {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {error ? (
            <div className="h-72 p-3 rounded-lg border border-destructive/40 bg-destructive/5 text-destructive text-sm font-mono flex items-start">
              <span>❌ {error}</span>
            </div>
          ) : (
            <textarea
              readOnly
              className="w-full h-72 p-3 rounded-lg border border-border bg-muted text-foreground text-sm font-mono resize-none focus:outline-none"
              value={output}
              placeholder="Formatted result will appear here..."
            />
          )}
        </div>
      </div>
    </div>
  );
}
