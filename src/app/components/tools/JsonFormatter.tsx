import { useState } from "react";
import { Copy, Trash2, ArrowLeftRight, CheckCircle } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState('{"name":"工具箱","version":"1.0","features":["格式化","压缩","校验"]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"format" | "minify">("format");

  const process = (text: string, m: "format" | "minify") => {
    if (!text.trim()) { setOutput(""); setError(""); return; }
    try {
      const parsed = JSON.parse(text);
      setOutput(m === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const handleInput = (val: string) => {
    setInput(val);
    process(val, mode);
  };

  const switchMode = (m: "format" | "minify") => {
    setMode(m);
    process(input, m);
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
            {m === "format" ? "格式化 / 美化" : "压缩 / 最小化"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">输入 JSON</span>
            <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <Trash2 className="w-3 h-3" /> 清空
            </button>
          </div>
          <textarea
            className="w-full h-72 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            placeholder='输入 JSON 字符串...'
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">输出结果</span>
            <button onClick={copy} disabled={!output} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors disabled:opacity-40">
              {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "已复制" : "复制"}
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
              placeholder="处理结果将显示在这里..."
            />
          )}
        </div>
      </div>

      <button
        onClick={() => process(input, mode)}
        className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
      >
        <ArrowLeftRight className="w-4 h-4" />
        {mode === "format" ? "立即格式化" : "立即压缩"}
      </button>
    </div>
  );
}
