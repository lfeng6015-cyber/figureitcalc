import { useState, useRef } from "react";
import { Copy, CheckCircle, Upload, Palette } from "lucide-react";

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

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

const PRESETS = [
  "#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
  "#14b8a6", "#a855f7", "#e11d48", "#0ea5e9", "#22c55e",
];

/** Extract dominant colors from an image using k-means-like pixel sampling */
function extractPalette(imageData: ImageData, count: number = 5): string[] {
  const pixels: [number, number, number][] = [];
  const data = imageData.data;
  // Sample every 4th pixel for performance
  for (let i = 0; i < data.length; i += 16) {
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }
  if (pixels.length === 0) return ["#000000"];

  // Simple color bucket quantization
  const buckets: Map<string, number> = new Map();
  for (const [r, g, b] of pixels) {
    // Quantize to 32 levels per channel
    const qr = Math.round(r / 32) * 32;
    const qg = Math.round(g / 32) * 32;
    const qb = Math.round(b / 32) * 32;
    const key = `${qr},${qg},${qb}`;
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }

  // Sort by frequency, take top N
  const sorted = [...buckets.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count);

  return sorted.map(([key]) => {
    const [r, g, b] = key.split(",").map(Number);
    return rgbToHex(r, g, b);
  });
}

export function ColorTool() {
  const [hex, setHex] = useState("#2563eb");
  const [copied, setCopied] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isValid = /^#[0-9a-fA-F]{6}$/.test(hex);
  const rgb = isValid ? hexToRgb(hex) : { r: 0, g: 0, b: 0 };
  const hsl = isValid ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 };

  const copy = async (val: string, key: string) => {
    try {
      await navigator.clipboard.writeText(val);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = val;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const maxW = 300;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractPalette(imageData, 6);
        setPalette(colors);
        setHex(colors[0]);
      };
      img.src = reader.result as string;
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const CopyRow = ({ label, value, k }: { label: string; value: string; k: string }) => (
    <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
      <span className="text-xs text-muted-foreground w-16 flex-shrink-0">{label}</span>
      <span className="flex-1 font-mono text-sm text-foreground truncate">{value}</span>
      <button onClick={() => copy(value, k)} className="text-muted-foreground hover:text-primary transition-colors ml-2 flex-shrink-0">
        {copied === k ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Image upload for palette extraction */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" /> Extract Palette from Image
        </h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer transition-all">
            <Upload className="w-4 h-4" />
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="h-12 w-12 rounded-lg object-cover border border-border" />
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
        {palette && palette.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {palette.map((c, i) => (
              <button
                key={i}
                onClick={() => setHex(c)}
                title={c}
                className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${hex === c ? "border-foreground scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <span className="text-xs text-muted-foreground self-center ml-1">
              {palette.length} dominant colors extracted
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Picker */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Pick a Color</label>
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
              <span className="font-mono text-sm px-3 py-1 rounded-lg bg-black/20 text-white">
                {isValid ? hex.toUpperCase() : "Invalid Color"}
              </span>
            </div>
          </div>
        </div>

        {/* Conversions */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Conversions</p>
          <CopyRow label="HEX" value={isValid ? hex.toUpperCase() : "—"} k="hex" />
          <CopyRow label="RGB" value={isValid ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "—"} k="rgb" />
          <CopyRow label="HSL" value={isValid ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "—"} k="hsl" />
          <CopyRow label="CSS var" value={isValid ? `--color: ${hex};` : "—"} k="css" />
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Preset Palette</p>
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
