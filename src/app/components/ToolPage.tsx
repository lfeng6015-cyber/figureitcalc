import { ReactNode, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Bookmark, Share2, LucideIcon, ExternalLink } from "lucide-react";

interface RelatedTool {
  id: string | number;
  icon: LucideIcon;
  name: string;
  description: string;
  category?: string;
}

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  intro: string;
  howTo: string[];
  faq: { q: string; a: string }[];
}

interface ToolPageProps {
  icon: LucideIcon;
  name: string;
  description: string;
  tag: string;
  tagColor: string;
  toolId?: string;
  categoryId?: string;
  seo?: SeoData;
  children: ReactNode;
  richContent?: ReactNode;
  related?: RelatedTool[];
  relatedContent?: { type: string; slug: string; title: string }[];
  onBack: () => void;
  onNavigate?: (id: string | number) => void;
  onNavigateToCategory?: (categoryId: string) => void;
  onNavigateToContent?: (type: string, slug: string) => void;
}

export function ToolPage({
  icon: Icon, name, description, tag, tagColor, toolId, categoryId,
  seo, children, richContent, related = [], relatedContent = [],
  onBack, onNavigate, onNavigateToCategory, onNavigateToContent,
}: ToolPageProps) {
  const [showShare, setShowShare] = useState(false);

  const handleBookmark = () => {
    if (window.navigator.userAgent.includes('Mac')) {
      alert('Press ⌘+D to bookmark this page');
    } else {
      alert('Press Ctrl+D to bookmark this page');
    }
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(`${name} — Free Online Tool | figureitcalc`);
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    reddit: `https://www.reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
    email: `mailto:?subject=${shareTitle}&body=${shareUrl}`,
  };
  return (
    <div className="min-h-full bg-background">
      {/* Dynamic SEO Meta */}
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:type" content="website" />
          <link rel="canonical" href={`https://www.figureitcalc.com/tools/${toolId}.html`} />
          {/* FAQPage Schema */}
          {seo.faq.length > 0 && (
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": seo.faq.map(f => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
              })}
            </script>
          )}
          {/* BreadcrumbList Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.figureitcalc.com/" },
                { "@type": "ListItem", "position": 2, "name": tag, "item": `https://www.figureitcalc.com/category/${categoryId || ""}.html` },
                { "@type": "ListItem", "position": 3, "name": seo.h1 || name }
              ]
            })}
          </script>
          {/* WebApplication Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": seo.h1 || name,
              "url": `https://www.figureitcalc.com/tools/${toolId}.html`,
              "description": seo.description,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "browserRequirements": "Requires JavaScript"
            })}
          </script>
        </Helmet>
      )}

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={onBack} className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </button>
          <span className="text-muted-foreground/40">/</span>
          {categoryId && onNavigateToCategory ? (
            <button
              onClick={() => { onNavigateToCategory(categoryId); onBack(); }}
              className={`px-2 py-0.5 rounded-full text-xs ${tagColor} hover:underline cursor-pointer`}
            >
              {tag}
            </button>
          ) : (
            <span className={`px-2 py-0.5 rounded-full text-xs ${tagColor}`}>{tag}</span>
          )}
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground font-medium">{name}</span>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex gap-5">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Tool Header with SEO H1 */}
            <header className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-foreground text-xl font-semibold">{seo?.h1 || name}</h1>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{seo?.intro || description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 relative">
                  <button
                    onClick={handleBookmark}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                    title="Bookmark this page (Ctrl+D)"
                  >
                    <Bookmark className="w-3.5 h-3.5" /> Bookmark
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShare(!showShare)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                    {showShare && (
                      <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg p-2 z-50 w-48">
                        <a href={shareLinks.facebook} target="_blank" rel="noopener" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors" onClick={() => setShowShare(false)}>
                          📘 Facebook
                        </a>
                        <a href={shareLinks.twitter} target="_blank" rel="noopener" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors" onClick={() => setShowShare(false)}>
                          🐦 X / Twitter
                        </a>
                        <a href={shareLinks.reddit} target="_blank" rel="noopener" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors" onClick={() => setShowShare(false)}>
                          👽 Reddit
                        </a>
                        <a href={shareLinks.linkedin} target="_blank" rel="noopener" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors" onClick={() => setShowShare(false)}>
                          💼 LinkedIn
                        </a>
                        <a href={shareLinks.whatsapp} target="_blank" rel="noopener" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors" onClick={() => setShowShare(false)}>
                          📱 WhatsApp
                        </a>
                        <a href={shareLinks.email} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors" onClick={() => setShowShare(false)}>
                          ✉️ Email
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Tool Interactive Area */}
            <section className="bg-card rounded-xl border border-border p-5" aria-label="Tool interface">
              {children}
            </section>

            {/* Rich Educational Content */}
            {richContent}

            {/* SEO Content Sections */}
            {seo && (
              <>
                {seo.howTo.length > 0 && (
                  <section className="bg-card rounded-xl border border-border p-5" aria-labelledby="how-to-heading">
                    <h2 id="how-to-heading" className="text-foreground text-lg font-semibold mb-3">How to Use the {name}</h2>
                    <ol className="space-y-2">
                      {seo.howTo.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">{i + 1}</span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

              </>
            )}

            {/* SEO Content Cross-links */}
            {relatedContent.length > 0 && onNavigateToContent && (
              <section className="bg-card rounded-xl border border-border p-5" aria-labelledby="guides-heading">
                <h2 id="guides-heading" className="text-foreground text-lg font-semibold mb-3">Learn More</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {relatedContent.map((rc) => (
                    <button
                      key={rc.slug}
                      onClick={() => onNavigateToContent(rc.type, rc.slug)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left group border border-border hover:border-primary/30"
                    >
                      <span className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">{rc.title}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Related Tools */}
            {related.length > 0 && (
              <section className="bg-card rounded-xl border border-border p-5" aria-labelledby="related-heading">
                <h2 id="related-heading" className="text-foreground text-lg font-semibold mb-3">Related Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {related.map((tool) => {
                    const RIcon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => onNavigate?.(tool.id)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left group border border-border hover:border-primary/30"
                      >
                        <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                          <RIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground font-medium truncate">{tool.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:flex flex-col gap-4 w-56 flex-shrink-0">
            {related.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-4 sticky top-32">
                <h3 className="text-sm font-medium text-foreground mb-3">Related Tools</h3>
                <div className="space-y-1">
                  {related.map((tool) => {
                    const RIcon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => onNavigate?.(tool.id)}
                        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors text-left group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                          <RIcon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground font-medium truncate">{tool.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>
    </div>
  );
}
