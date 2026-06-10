import { useState, useEffect } from "react";
import { RefreshCw, Copy, CheckCircle } from "lucide-react";

export function TimestampTool() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 19).replace("T", " ");
  });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  const tsToDate = (ts: string) => {
    const n = parseInt(ts);
    if (isNaN(n)) return "Invalid timestamp";
    const d = new Date(n * (ts.length <= 10 ? 1000 : 1));
    if (isNaN(d.getTime())) return "Invalid timestamp";
    return d.toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  };

  const dateToTs = (dateStr: string) => {
    const d = new Date(dateStr.replace(" ", "T"));
    if (isNaN(d.getTime())) return "Invalid date";
    return String(Math.floor(d.getTime() / 1000));
  };

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const CopyBtn = ({ val, k }: { val: string; k: string }) => (
    <button onClick={() => copy(val, k)} className="text-muted-foreground hover:text-primary transition-colors">
      {copied === k ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Live Clock */}
      <div className="p-4 bg-accent rounded-xl border border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current Unix Timestamp (seconds)</p>
            <p className="font-mono text-2xl text-foreground" style={{ fontWeight: 600 }}>{now}</p>
            <p className="text-sm text-muted-foreground mt-1">{new Date(now * 1000).toLocaleString("en-US")}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => copy(String(now), "live")} className="text-muted-foreground hover:text-primary transition-colors">
              {copied === "live" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <RefreshCw className="w-4 h-4 text-muted-foreground animate-spin" style={{ animationDuration: "2s" }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timestamp → Date */}
        <div className="space-y-3">
          <h3 className="text-foreground" style={{ fontWeight: 500 }}>Timestamp → Date & Time</h3>
          <input
            type="text"
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            placeholder="Enter timestamp (seconds or milliseconds)"
          />
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
            <span className="flex-1 font-mono text-sm text-foreground">{tsToDate(tsInput)}</span>
            <CopyBtn val={tsToDate(tsInput)} k="ts2date" />
          </div>
          <button onClick={() => setTsInput(String(now))} className="text-xs text-primary hover:underline">
            Use current timestamp
          </button>
        </div>

        {/* Date → Timestamp */}
        <div className="space-y-3">
          <h3 className="text-foreground" style={{ fontWeight: 500 }}>Date & Time → Timestamp</h3>
          <input
            type="text"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            placeholder="YYYY-MM-DD HH:mm:ss"
          />
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
            <span className="flex-1 font-mono text-sm text-foreground">{dateToTs(dateInput)}</span>
            <CopyBtn val={dateToTs(dateInput)} k="date2ts" />
          </div>
          <button onClick={() => {
            const d = new Date();
            setDateInput(d.toISOString().slice(0, 19).replace("T", " "));
          }} className="text-xs text-primary hover:underline">
            Use current time
          </button>
        </div>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-1 border border-border">
        <p className="text-foreground" style={{ fontWeight: 500 }}>Timestamp Formats</p>
        <p>Seconds: 10-digit number, e.g. <code className="bg-muted px-1 rounded">1749340800</code></p>
        <p>Milliseconds: 13-digit number, e.g. <code className="bg-muted px-1 rounded">1749340800000</code></p>
      </div>
    </div>
  );
}
