import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Lightbulb, AlertTriangle, Info } from "lucide-react";
import type { ContentPageMeta, ContentSection } from "../data/seoContent";
import { TYPE_LABELS } from "../data/seoContent";
import { AdBanner } from "./AdBanner";

interface ContentPageProps {
  data: ContentPageMeta;
  onBack: () => void;
  onNavigateToTool: (toolId: string) => void;
}

const calloutIcons = { tip: Lightbulb, warning: AlertTriangle, info: Info };
const calloutColors = {
  tip: "border-l-green-500 bg-green-50",
  warning: "border-l-amber-500 bg-amber-50",
  info: "border-l-blue-500 bg-blue-50",
};

function SectionBlock({ section }: { section: ContentSection }) {
  switch (section.type) {
    case "bullet-list":
      return (
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {section.items?.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      );
    case "numbered-list":
      return (
        <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
          {section.items?.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ol>
      );
    case "callout": {
      const Icon = calloutIcons[section.calloutType || "info"];
      return (
        <div className={`border-l-4 rounded-r-lg p-4 ${calloutColors[section.calloutType || "info"]}`}>
          <div className="flex items-start gap-2">
            <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              {section.body && <p className="text-sm text-foreground leading-relaxed">{section.body}</p>}
              {section.items && (
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                  {section.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>
      );
    }
    default:
      return section.body ? (
        <p className="text-muted-foreground leading-relaxed">{section.body}</p>
      ) : null;
  }
}

export function ContentPage({ data, onBack, onNavigateToTool }: ContentPageProps) {
  const typeLabel = TYPE_LABELS[data.type] || "Guides";
  const canonicalPath = `/${data.type === "scenario" ? "scenarios" : data.type === "compare" ? "compare" : "learn"}/${data.slug}`;

  return (
    <div className="min-h-full bg-background">
      {/* SEO Metadata */}
      <Helmet>
        <title>{data.title} | figureitcalc</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.figureitcalc.com${canonicalPath}`} />
        <meta property="og:title" content={`${data.title} | figureitcalc`} />
        <meta property="og:description" content={data.description} />
        <meta property="og:type" content="article" />
        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.figureitcalc.com/" },
              { "@type": "ListItem", "position": 2, "name": typeLabel, "item": `https://www.figureitcalc.com${canonicalPath}` }
            ]
          })}
        </script>
        {/* FAQPage Schema */}
        {data.faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": data.faq.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
              }))
            })}
          </script>
        )}
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-10 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={onBack} className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </button>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground font-medium">{typeLabel}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">{data.title}</h1>
          <p className="text-muted-foreground leading-relaxed text-base">{data.intro}</p>
        </header>

        {/* Content Sections */}
        <div className="space-y-6 mb-10">
          {data.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-foreground mb-3">{section.title}</h2>
              <SectionBlock section={section} />
            </section>
          ))}
        </div>

        {/* Ad Banner */}
        <div className="mb-10">
          <AdBanner />
        </div>

        {/* Related Tools */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">Free Tools to Help You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.relatedTools.map((rt, i) => (
              <button
                key={i}
                onClick={() => onNavigateToTool(rt.toolId)}
                className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-accent/30 transition-all text-left group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{rt.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rt.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary mt-2 group-hover:underline">
                    {rt.cta} <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ */}
        {data.faq.length > 0 && (
          <section className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {data.faq.map((f, i) => (
                <details key={i} className="group">
                  <summary className="text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors py-1">
                    {f.q}
                  </summary>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed pl-2 border-l-2 border-border ml-1">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
