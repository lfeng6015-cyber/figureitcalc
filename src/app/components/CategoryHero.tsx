import { getCategoryContent } from "../data/categoryContent";

interface CategoryHeroProps {
  categoryId: string;
  toolCount: number;
}

export function CategoryHero({ categoryId, toolCount }: CategoryHeroProps) {
  const content = getCategoryContent(categoryId);
  if (!content) return null;

  return (
    <div className="space-y-4 mb-6">
      {/* Header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h1 className="text-foreground text-xl font-semibold mb-2">{content.title}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">{content.intro}</p>
        <p className="text-xs text-muted-foreground mt-3">{toolCount} free online tools — no signup, instant results, 100% client-side processing</p>
      </div>

      {/* Key Concepts */}
      {content.concepts && content.concepts.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-foreground text-base font-semibold mb-3">{content.conceptsTitle || "Key Concepts & Knowledge"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {content.concepts.map((c, i) => (
              <div key={i} className="flex gap-2.5 p-3 rounded-lg bg-accent/20 border border-border/40">
                <span className="text-lg flex-shrink-0">{c.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
