import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const PRESETS = [
  "#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
  "#14b8a6", "#a855f7", "#e11d48", "#0ea5e9", "#22c55e",
];

export function ColorTool() {
  const [hex, setHex] = useState("#2563eb");
  const [copied, setCopied] = useState<string | null>(null);

  const isValid = /^#[0-9a-fA-F]{6}$/.test(hex);
  const rgb = isValid ? hexToRgb(hex) : { r: 0, g: 0, b: 0 };
  const hsl = isValid ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 };

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const CopyRow = ({ label, value, k }: { label: string; value: string; k: string }) => (
    <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
      <span className="text-xs text-muted-foreground w-16 flex-shrink-0">{label}</span>
      <span className="flex-1 font-mono text-sm text-foreground">{value}</span>
      <button onClick={() => copy(value, k)} className="text-muted-foreground hover:text-primary transition-colors">
        {copied === k ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Picker */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">选择颜色</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={isValid ? hex : "#2563eb"}
                onChange={(e) => setHex(e.target.value)}
                className="w-12 h-12 rounded-lg border border-border cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="flex-1 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
                placeholder="#000000"
                maxLength={7}
              />
            </div>
          </div>

          {/* Preview */}
          <div
            className="h-28 rounded-xl border border-border transition-all duration-200"
            style={{ backgroundColor: isValid ? hex : "#cccccc" }}
          >
            <div className="h-full flex items-center justify-center">
              <span className="font-mono text-sm px-3 py-1 rounded-lg bg-black/20 text-white">{isValid ? hex.toUpperCase() : "无效颜色"}</span>
            </div>
          </div>
        </div>

        {/* Conversion */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">转换结果</p>
          <CopyRow label="HEX" value={isValid ? hex.toUpperCase() : "—"} k="hex" />
          <CopyRow label="RGB" value={isValid ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "—"} k="rgb" />
          <CopyRow label="HSL" value={isValid ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "—"} k="hsl" />
          <CopyRow label="CSS var" value={isValid ? `--color: ${hex};` : "—"} k="css" />
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">常用色板</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((c) => (
            <button
              key={c}
              onClick={() => setHex(c)}
              title={c}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${hex === c ? "border-foreground scale-110" : "border-transparent"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
