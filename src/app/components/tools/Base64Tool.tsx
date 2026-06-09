import { useState } from "react";
import { Copy, CheckCircle, ArrowUpDown } from "lucide-react";

export function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello, 工具箱！这是一段中文测试文本。");
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
      setError("无效的 Base64 字符串");
    }
  };

  const swap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setError("");
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
            {m === "encode" ? "编码（文本 → Base64）" : "解码（Base64 → 文本）"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">{mode === "encode" ? "原始文本" : "Base64 字符串"}</span>
          <textarea
            className="w-full h-60 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            placeholder={mode === "encode" ? "输入要编码的文本..." : "输入 Base64 字符串..."}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{mode === "encode" ? "Base64 编码结果" : "解码文本"}</span>
            <button onClick={copy} disabled={!output} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors disabled:opacity-40">
              {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "已复制" : "复制"}
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
              placeholder="结果显示在此..."
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
        将结果作为输入（反转）
      </button>
    </div>
  );
}
