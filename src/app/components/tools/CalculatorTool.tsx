import { useState, useCallback, useMemo, useEffect } from "react";
import { ChevronDown, ChevronRight, Lightbulb, Calculator, Copy, CheckCircle, Share2 } from "lucide-react";
import type { CalcInput, CalcResult, CalcStep, CalcSection } from "../../data/formulas";

interface CalculatorToolProps {
  inputs: CalcInput[];
  formula: (values: Record<string, number | string>) => CalcResult[] | CalcSection[];
  presets?: { label: string; values: Record<string, number | string> }[];
  description?: string;
}

const colorMap: Record<string, string> = {
  green: "text-green-600 bg-green-50 border-green-200",
  red: "text-red-600 bg-red-50 border-red-200",
  amber: "text-amber-600 bg-amber-50 border-amber-200",
  blue: "text-blue-600 bg-blue-50 border-blue-200",
};

function isCalcSection(r: CalcResult | CalcSection): r is CalcSection {
  return "title" in r && "results" in r;
}

/** Sanitize a numeric input: trim, strip non-numeric chars (keep first dot), clamp */
function sanitizeNumber(raw: string, min?: number, max?: number, fallback: number = 0): number {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/[^0-9.\-]/g, "");       // strip non-numeric except dot and minus
  // Keep only first dot
  const firstDot = cleaned.indexOf(".");
  if (firstDot >= 0) {
    cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
  }
  // Keep minus only if at start
  if (cleaned.indexOf("-") > 0) {
    cleaned = cleaned.replace(/-/g, "");
  }
  const num = parseFloat(cleaned);
  if (isNaN(num)) return fallback;
  let result = num;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
}

/** Read initial values from URL query string, falling back to defaults */
function readInitialValues(inputs: CalcInput[]): Record<string, number | string> {
  const params = new URLSearchParams(window.location.search);
  const init: Record<string, number | string> = {};
  inputs.forEach((inp) => {
    const fromUrl = params.get(inp.key);
    if (fromUrl !== null) {
      if (inp.type === "number") {
        init[inp.key] = sanitizeNumber(fromUrl, inp.min, inp.max, Number(inp.defaultValue ?? 0));
      } else {
        init[inp.key] = decodeURIComponent(fromUrl);
      }
    } else {
      init[inp.key] = inp.defaultValue ?? (inp.type === "number" ? 0 : "");
    }
  });
  return init;
}

/** Build a shareable text summary of all results */
function buildResultText(output: CalcResult[] | CalcSection[]): string {
  const lines: string[] = [];
  const first = output[0];
  if (first && isCalcSection(first)) {
    (output as CalcSection[]).forEach(section => {
      lines.push(`${section.title}:`);
      section.results.forEach(r => lines.push(`  ${r.label}: ${r.value}`));
    });
  } else {
    (output as CalcResult[]).forEach(r => lines.push(`${r.label}: ${r.value}`));
  }
  return lines.join("\n");
}

export function CalculatorTool({ inputs, formula, presets, description }: CalculatorToolProps) {
  const [values, setValues] = useState<Record<string, number | string>>(() =>
    readInitialValues(inputs)
  );
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Sync values → URL query string on every change
  useEffect(() => {
    const params = new URLSearchParams();
    inputs.forEach((inp) => {
      const val = values[inp.key];
      if (val !== undefined && val !== "" && val !== inp.defaultValue) {
        params.set(inp.key, inp.type === "number" ? String(val) : encodeURIComponent(String(val)));
      }
    });
    const qs = params.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [values, inputs]);

  const handleChange = useCallback((key: string, rawValue: string, inp: CalcInput) => {
    if (inp.type === "number") {
      const num = sanitizeNumber(rawValue, inp.min, inp.max, Number(inp.defaultValue ?? 0));
      setValues((prev) => ({ ...prev, [key]: num }));
    } else {
      setValues((prev) => ({ ...prev, [key]: rawValue }));
    }
  }, []);

  const toggleSteps = (key: string) => {
    setExpandedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const rawOutput = useMemo(() => formula(values), [values, formula]);

  // Detect format: CalcSection[] has 'title' property, CalcResult[] doesn't
  const isSectioned = rawOutput.length > 0 && isCalcSection(rawOutput[0]);

  const copyResults = async () => {
    const text = buildResultText(rawOutput);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = window.location.href;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {description && <p className="text-sm text-muted-foreground">{description}</p>}

      {/* Presets */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center mr-1">Quick:</span>
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => setValues((prev) => ({ ...prev, ...p.values }))}
              className="px-3 py-1 text-xs rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Inputs — grouped visually */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-primary" /> Input Parameters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {inputs.map((inp) => (
            <div key={inp.key} className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">{inp.label}</label>
              {inp.type === "select" && inp.options ? (
                <select
                  value={String(values[inp.key] ?? "")}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, [inp.key]: e.target.value }));
                  }}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm"
                >
                  {inp.options.map((o) => (
                    <option key={String(o.value)} value={String(o.value)}>{o.label}</option>
                  ))}
                </select>
              ) : inp.type === "file" ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setValues((prev) => ({ ...prev, [inp.key]: String(reader.result) }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  />
                  {values[inp.key] && (
                    <img src={String(values[inp.key])} alt="preview" className="w-10 h-10 object-cover rounded border border-border" />
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <input
                    type={inp.type === "number" ? "text" : inp.type}
                    inputMode={inp.type === "number" ? "decimal" : undefined}
                    value={values[inp.key] ?? ""}
                    onChange={(e) => handleChange(inp.key, e.target.value, inp)}
                    min={inp.min}
                    max={inp.max}
                    step={inp.step}
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm font-mono"
                    placeholder={inp.label}
                  />
                  {inp.unit && <span className="text-xs text-muted-foreground whitespace-nowrap">{inp.unit}</span>}
                </div>
              )}
              {inp.hint && <p className="text-xs text-muted-foreground/70">{inp.hint}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {isSectioned ? (
          // Sectioned output (detailed)
          (rawOutput as CalcSection[]).map((section, si) => (
            <div key={si} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="bg-accent/30 px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              </div>

              {/* Results grid */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.results.map((r, ri) => (
                  <div
                    key={ri}
                    className={`flex flex-col p-3 rounded-lg ${r.color ? colorMap[r.color] + " border" : "bg-accent/20"} ${r.emphasis ? "sm:col-span-2" : ""}`}
                  >
                    <span className="text-xs text-muted-foreground mb-1">{r.label}</span>
                    {String(r.value).startsWith('<svg') || String(r.value).startsWith('data:image/svg') ? (
                      <div className="flex justify-center p-2 bg-white rounded" dangerouslySetInnerHTML={{__html: String(r.value).startsWith('data:') ? `<img src="${r.value}" alt="${r.label}" style="max-width:100%;height:auto" />` : String(r.value)}} />
                    ) : String(r.value).startsWith('data:image/') ? (
                      <img src={String(r.value)} alt={String(r.label)} style={{maxWidth:'100%',height:'auto'}} className="rounded" />
                    ) : (
                      <span className={`font-mono ${r.emphasis ? "text-xl font-bold text-foreground" : "text-lg font-semibold text-foreground"}`}>
                        {r.value}
                      </span>
                    )}
                    {r.insight && (
                      <p className="text-xs mt-1.5 text-muted-foreground flex items-start gap-1">
                        <Lightbulb className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        {r.insight}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Steps (collapsible) */}
              {section.steps && section.steps.length > 0 && (
                <div className="border-t border-border">
                  <button
                    onClick={() => toggleSteps(`${si}`)}
                    className="w-full px-4 py-2.5 flex items-center justify-between text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {expandedSteps[`${si}`] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      Calculation Steps ({section.steps.length} steps)
                    </span>
                  </button>
                  {expandedSteps[`${si}`] && (
                    <div className="px-4 pb-3 space-y-2">
                      {section.steps.map((step, sti) => (
                        <div key={sti} className="flex items-start gap-3 text-sm p-2 rounded bg-accent/20">
                          <span className="text-xs text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded flex-shrink-0">
                            {sti + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="text-foreground font-medium">{step.label}</span>
                            <div className="text-xs text-muted-foreground font-mono mt-0.5">{step.formula}</div>
                          </div>
                          <span className="text-sm font-bold text-foreground font-mono flex-shrink-0">{step.result}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          // Flat output (simple)
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-accent/30 px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Results</h3>
              <div className="flex items-center gap-1">
                {/* Copy results button */}
                <button
                  onClick={copyResults}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  title="Copy all results"
                >
                  {copied ? (
                    <><CheckCircle className="w-3 h-3 text-green-500" /> Copied!</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copy</>
                  )}
                </button>
                {/* Copy shareable link */}
                <button
                  onClick={copyShareLink}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  title="Copy link with current values"
                >
                  {linkCopied ? (
                    <><CheckCircle className="w-3 h-3 text-green-500" /> Link Copied!</>
                  ) : (
                    <><Share2 className="w-3 h-3" /> Share</>
                  )}
                </button>
              </div>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(rawOutput as CalcResult[]).filter(r => r.label && r.value !== undefined && r.value !== "").map((r, i) => (
                <div key={i} className="flex flex-col p-3 rounded-lg bg-accent/20">
                  <span className="text-xs text-muted-foreground mb-1">{r.label}</span>
                  {String(r.value).startsWith('<svg') || String(r.value).startsWith('data:image/svg') ? (
                    <div className="flex justify-center p-1 bg-white rounded" dangerouslySetInnerHTML={{__html: String(r.value).startsWith('data:') ? `<img src="${r.value}" style="max-width:100%;height:auto" />` : String(r.value)}} />
                  ) : String(r.value).startsWith('data:image/') ? (
                    <img src={String(r.value)} style={{maxWidth:'100%',height:'auto'}} className="rounded" />
                  ) : (
                    <span className="text-lg font-bold text-foreground font-mono">{r.value}</span>
                  )}
                  {r.insight && (
                    <p className="text-xs mt-1.5 text-muted-foreground flex items-start gap-1">
                      <Lightbulb className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      {r.insight}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Re-export types for use in App.tsx
export type { CalcInput, CalcResult, CalcSection };
