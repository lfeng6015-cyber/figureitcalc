import { useState } from "react";
import { Copy, CheckCircle, Search } from "lucide-react";

interface CheatEntry {
  pattern: string;
  description: string;
  example?: string;
}

const CHEAT_SHEETS: Record<string, CheatEntry[]> = {
  "Character Classes": [
    { pattern: ".", description: "Any character except newline", example: "a.c → abc, aXc" },
    { pattern: "\\d", description: "Digit [0-9]", example: "\\d\\d → 12, 99" },
    { pattern: "\\D", description: "Non-digit", example: "\\D → a, X" },
    { pattern: "\\w", description: "Word character [A-Za-z0-9_]", example: "\\w → a, 5, _" },
    { pattern: "\\W", description: "Non-word character", example: "\\W → !, @" },
    { pattern: "\\s", description: "Whitespace (space, tab, newline)", example: "a\\sb → a b" },
    { pattern: "\\S", description: "Non-whitespace", example: "\\S → x, 1" },
    { pattern: "[abc]", description: "Any of: a, b, or c", example: "[ae] → cat, pet" },
    { pattern: "[^abc]", description: "Not a, b, or c", example: "[^ae] → big, dog" },
    { pattern: "[a-z]", description: "Range: a through z", example: "[a-c] → cat, bat" },
    { pattern: "[0-9]", description: "Range: 0 through 9", example: "[2-4] → 123" },
    { pattern: "\\", description: "Escape special characters", example: "\\. → . literal" },
    { pattern: "\\t", description: "Tab character" },
    { pattern: "\\n", description: "Newline character" },
    { pattern: "\\r", description: "Carriage return" },
  ],
  "Anchors & Boundaries": [
    { pattern: "^", description: "Start of string/line", example: "^Hello → Hello world" },
    { pattern: "$", description: "End of string/line", example: "world$ → hello world" },
    { pattern: "\\b", description: "Word boundary", example: "\\bcat\\b → cat, not catalog" },
    { pattern: "\\B", description: "Not word boundary", example: "\\Bcat → catalog, not cat" },
    { pattern: "(?=...)", description: "Positive lookahead", example: "q(?=u) → q in queen" },
    { pattern: "(?!...)", description: "Negative lookahead", example: "q(?!u) → q in Iraq" },
    { pattern: "(?<=...)", description: "Positive lookbehind", example: "(?<=a)b → b in ab" },
    { pattern: "(?<!...)", description: "Negative lookbehind", example: "(?<!a)b → b in cb" },
  ],
  "Quantifiers": [
    { pattern: "*", description: "Zero or more (greedy)", example: "a* → a, aa, aaa, \"\"" },
    { pattern: "+", description: "One or more (greedy)", example: "a+ → a, aa, aaa" },
    { pattern: "?", description: "Zero or one (optional)", example: "colou?r → color, colour" },
    { pattern: "{n}", description: "Exactly n times", example: "a{3} → aaa" },
    { pattern: "{n,}", description: "n or more times", example: "a{2,} → aa, aaa" },
    { pattern: "{n,m}", description: "Between n and m times", example: "a{2,4} → aa, aaa, aaaa" },
    { pattern: "*?", description: "Zero or more (lazy)", example: "a.*?b → ab in aab" },
    { pattern: "+?", description: "One or more (lazy)", example: "a.+?b → aab in aaab" },
  ],
  "Groups & References": [
    { pattern: "(...)", description: "Capturing group", example: "(ab)+ → ab, abab" },
    { pattern: "(?:...)", description: "Non-capturing group", example: "(?:ab)+ → ab, abab" },
    { pattern: "(?<Name>...)", description: "Named capturing group", example: "(?<year>\\d{4})" },
    { pattern: "\\1, \\2", description: "Backreference to group 1, 2", example: "(\\w)\\1 → aa, bb" },
    { pattern: "\\k<Name>", description: "Named backreference", example: "(?<w>\\w)\\k<w>" },
    { pattern: "|", description: "Alternation (OR)", example: "cat|dog → cat or dog" },
  ],
  "Common Patterns": [
    { pattern: "\\d{4}-\\d{2}-\\d{2}", description: "Date (YYYY-MM-DD)", example: "2024-01-15" },
    { pattern: "[\\w.-]+@[\\w.-]+\\.\\w+", description: "Email address", example: "user@example.com" },
    { pattern: "https?://[\\w./-]+", description: "URL", example: "https://example.com" },
    { pattern: "\\d{3}[-.]?\\d{3}[-.]?\\d{4}", description: "US Phone", example: "555-123-4567" },
    { pattern: "\\d{5}(-\\d{4})?", description: "US ZIP Code", example: "90210, 12345-6789" },
    { pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", description: "IPv4 Address", example: "192.168.1.1" },
    { pattern: "#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})", description: "Hex Color", example: "#FF5733, ABC" },
    { pattern: "(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}", description: "Strong Password (8+, upper, lower, digit)" },
  ],
  "Flags / Modifiers": [
    { pattern: "g", description: "Global - find all matches" },
    { pattern: "i", description: "Case insensitive" },
    { pattern: "m", description: "Multiline - ^ and $ match line boundaries" },
    { pattern: "s", description: "DotAll - . matches newline too" },
    { pattern: "u", description: "Unicode - full unicode support" },
    { pattern: "y", description: "Sticky - match from lastIndex only" },
  ],
  "JavaScript Methods": [
    { pattern: "regex.test(str)", description: "Returns true/false if pattern matches" },
    { pattern: "regex.exec(str)", description: "Returns match array or null" },
    { pattern: "str.match(regex)", description: "Returns matches array" },
    { pattern: "str.matchAll(regex)", description: "Returns iterator of all matches" },
    { pattern: "str.replace(regex, sub)", description: "Replace matches with substitution" },
    { pattern: "str.search(regex)", description: "Returns index of first match" },
    { pattern: "str.split(regex)", description: "Split string by pattern" },
  ],
};

export function RegexCheatsheet() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filteredSheets = Object.entries(CHEAT_SHEETS).reduce(
    (acc, [category, entries]) => {
      const filtered = entries.filter(
        (e) =>
          !search ||
          e.pattern.toLowerCase().includes(search.toLowerCase()) ||
          e.description.toLowerCase().includes(search.toLowerCase()) ||
          (e.example && e.example.toLowerCase().includes(search.toLowerCase()))
      );
      if (filtered.length > 0) acc[category] = filtered;
      return acc;
    },
    {} as Record<string, CheatEntry[]>
  );

  const copyEntry = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patterns (e.g. email, digit, group...)"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
        />
      </div>

      {/* Cheat sheets */}
      <div className="space-y-4">
        {Object.entries(filteredSheets).map(([category, entries]) => (
          <section key={category} className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-accent/30 px-4 py-2.5 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
            </div>
            <div className="divide-y divide-border">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-1.5 px-4 py-3 hover:bg-accent/10 transition-colors group"
                >
                  <button
                    onClick={() => copyEntry(entry.pattern)}
                    className="flex items-center gap-1.5 self-start cursor-pointer"
                    title="Copy pattern"
                  >
                    <code className="text-sm font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded whitespace-nowrap">
                      {entry.pattern}
                    </code>
                    {copied === entry.pattern ? (
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                    ) : (
                      <Copy className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                    )}
                  </button>
                  <span className="text-sm text-muted-foreground flex-1">{entry.description}</span>
                  {entry.example && (
                    <code className="text-xs font-mono text-muted-foreground bg-accent/40 px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                      {entry.example}
                    </code>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Click any pattern to copy it. All patterns use JavaScript regex syntax.
      </p>
    </div>
  );
}
