import { useState, useMemo, useCallback } from "react";
import { Copy, CheckCircle, AlertTriangle, Flag } from "lucide-react";

interface MatchInfo {
  match: string;
  index: number;
  groups: string[];
}

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [copied, setCopied] = useState(false);

  const { matches, error, isValid } = useMemo(() => {
    if (!pattern) return { matches: [], error: "", isValid: false };

    try {
      const regex = new RegExp(pattern, flags);
      const results: MatchInfo[] = [];
      let match: RegExpExecArray | null;

      if (flags.includes("g")) {
        while ((match = regex.exec(testText)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      return { matches: results, error: "", isValid: true };
    } catch (e) {
      return { matches: [], error: (e as Error).message, isValid: false };
    }
  }, [pattern, flags, testText]);

  const highlightedText = useMemo(() => {
    if (!isValid || matches.length === 0 || !testText) return testText;

    const parts: { text: string; highlight: boolean }[] = [];
    let lastIdx = 0;
    const sorted = [...matches].sort((a, b) => a.index - b.index);

    for (const m of sorted) {
      if (m.index > lastIdx) {
        parts.push({ text: testText.slice(lastIdx, m.index), highlight: false });
      }
      parts.push({ text: m.match, highlight: true });
      lastIdx = m.index + m.match.length;
    }
    if (lastIdx < testText.length) {
      parts.push({ text: testText.slice(lastIdx), highlight: false });
    }
    return parts;
  }, [testText, matches, isValid]);

  const copyPattern = useCallback(() => {
    if (!pattern) return;
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [pattern, flags]);

  return (
    <div className="space-y-4">
      {/* Pattern Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-foreground">Regular Expression</label>
          <button
            onClick={copyPattern}
            disabled={!pattern}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors disabled:opacity-40"
          >
            {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-lg font-mono">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g. (\w+)@(\w+\.\w+)"
            className="flex-1 p-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
            spellCheck={false}
          />
          <span className="text-muted-foreground text-lg font-mono">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g"
            className="w-20 p-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
            spellCheck={false}
          />
        </div>

        {/* Quick flags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["g", "i", "m", "s", "u", "gi", "gm", "gim"].map((f) => (
            <button
              key={f}
              onClick={() => setFlags(f)}
              className={`px-2 py-0.5 text-xs rounded font-mono transition-colors ${
                flags === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          JavaScript regex syntax. Flags: g=global, i=case insensitive, m=multiline, s=dotAll, u=unicode
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="font-mono">{error}</span>
        </div>
      )}

      {/* Test Text */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-1.5">Test Text</label>
        <textarea
          className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
          rows={6}
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Enter text to test your regex against..."
          spellCheck={false}
        />
      </div>

      {/* Highlighted Result */}
      {isValid && testText && (
        <section className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="bg-accent/30 px-4 py-2.5 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Matched Text</h3>
          </div>
          <div className="p-4">
            {Array.isArray(highlightedText) ? (
              <pre className="text-sm font-mono whitespace-pre-wrap break-all leading-relaxed">
                {highlightedText.map((part, i) =>
                  part.highlight ? (
                    <mark key={i} className="bg-yellow-200 text-foreground px-0.5 rounded">
                      {part.text}
                    </mark>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </pre>
            ) : (
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">{highlightedText || "(no match)"}</pre>
            )}
          </div>
        </section>
      )}

      {/* Matches List */}
      {matches.length > 0 && (
        <section className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="bg-accent/30 px-4 py-2.5 border-b border-border flex items-center gap-2">
            <Flag className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              {matches.length} Match{matches.length !== 1 ? "es" : ""} Found
            </h3>
          </div>
          <div className="p-3 space-y-2">
            {matches.map((m, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">
                    #{i + 1}
                  </span>
                  <span className="text-xs text-muted-foreground">Index: {m.index}</span>
                </div>
                <code className="text-sm font-mono text-foreground break-all">{m.match}</code>
                {m.groups.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {m.groups.map((g, gi) => (
                      <span key={gi} className="text-xs font-mono bg-accent px-1.5 py-0.5 rounded text-muted-foreground">
                        Group {gi + 1}: {g || "(empty)"}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
