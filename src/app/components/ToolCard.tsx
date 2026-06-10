import { LucideIcon, Sparkles, Flame, ArrowRight } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  tag?: string;
  tagColor?: string;
  isNew?: boolean;
  isHot?: boolean;
  keywords?: string;
  onClick?: () => void;
}

// Extract a few meaningful short keywords for display
function keywordTags(kw?: string): string[] {
  if (!kw) return [];
  return kw.split(",").map(k => k.trim()).filter(k => k.length > 0 && k.length < 35).slice(0, 3);
}

export function ToolCard({
  icon: Icon, name, description, tag, tagColor, isNew, isHot, keywords, onClick,
}: ToolCardProps) {
  const tags = keywordTags(keywords);

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 cursor-pointer hover:shadow-lg hover:border-primary/40 hover:-translate-y-0.5 hover:relative hover:z-10 transition-all duration-200 group"
    >
      {/* Top: Icon + Title + Badges */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-card-foreground font-semibold truncate text-base">{name}</span>
            {isHot && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700 flex-shrink-0 flex items-center gap-0.5">
                <Flame className="w-3 h-3" /> HOT
              </span>
            )}
            {isNew && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 flex-shrink-0 flex items-center gap-0.5">
                <Sparkles className="w-3 h-3" /> NEW
              </span>
            )}
          </div>
          {/* Description — 2 lines */}
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Keyword tags as features */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-md bg-accent/60 text-muted-foreground border border-border/50">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Bottom: Category tag + CTA */}
      <div className="flex items-center justify-between mt-auto pt-1">
        {tag ? (
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/20">{tag}</span>
        ) : <span />}
        <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          Open tool <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
