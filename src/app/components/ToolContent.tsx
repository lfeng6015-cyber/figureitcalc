import { Share2, Bookmark, ExternalLink } from "lucide-react";

interface ContentBlock {
  title: string;
  body: string;
  type?: "text" | "formula" | "list" | "table";
  items?: string[];
  tableData?: { label: string; value: string }[];
}

interface RelatedTool {
  id: string;
  name: string;
  desc: string;
}

interface ToolContentProps {
  toolName: string;
  intro: string;
  whatIs: string;       // "What is X?" section
  howItWorks: string;    // "How it works" section
  formula?: string;      // Math formula (rendered as code)
  useCases: string[];    // Who uses this / use cases
  tips?: string[];       // Pro tips
  faq: { q: string; a: string }[];
  relatedTools?: RelatedTool[];
}

export function ToolContent({
  toolName, intro, whatIs, howItWorks, formula, useCases, tips, faq, relatedTools,
}: ToolContentProps) {
  return (
    <div className="space-y-5">
      {/* Intro under H1 */}
      <section className="bg-card rounded-xl border border-border p-5">
        <p className="text-foreground leading-relaxed">{intro}</p>
      </section>

      {/* What is this tool? */}
      <section className="bg-card rounded-xl border border-border p-5">
        <h2 className="text-foreground text-lg font-semibold mb-3">What is a {toolName}?</h2>
        <p className="text-muted-foreground leading-relaxed">{whatIs}</p>
      </section>

      {/* How it Works */}
      <section className="bg-card rounded-xl border border-border p-5">
        <h2 className="text-foreground text-lg font-semibold mb-3">How Does the {toolName} Work?</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">{howItWorks}</p>
        {formula && (
          <div className="bg-accent/50 rounded-lg p-4 font-mono text-sm text-foreground overflow-x-auto">
            {formula}
          </div>
        )}
      </section>

      {/* Use Cases */}
      {useCases.length > 0 && (
        <section className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-foreground text-lg font-semibold mb-3">Who Uses This Tool?</h2>
          <ul className="space-y-2">
            {useCases.map((uc, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-primary">▸</span> {uc}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Pro Tips */}
      {tips && tips.length > 0 && (
        <section className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-foreground text-lg font-semibold mb-3">Pro Tips</h2>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-amber-500">💡</span> {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-foreground text-lg font-semibold mb-3">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faq.map((item, i) => (
              <details key={i} className="group border border-border rounded-lg">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {item.q}
                </summary>
                <p className="px-4 pb-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-foreground text-lg font-semibold mb-3">Related Tools You Might Need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {relatedTools.map((rt, i) => (
              <a key={i} href={`#/tools/${rt.id}`} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent transition-colors group">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{rt.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{rt.desc}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
