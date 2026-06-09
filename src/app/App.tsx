import { useState, Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import {
  Search, Zap, ChevronRight, ChevronsUpDown, Flame, Sparkles, Menu, X,
  Braces, Lock, Hash, Shuffle, Type, Code2, Globe, Calculator, Image, Video,
  Palette as PaletteIcon, QrCode, Link2, Clock, BarChart2,
  Download, Diff, AlignLeft, Regex, Database, Star, Copy,
  Key, Wallet, TrendingUp, TrendingDown, PiggyBank, Home, Scale, Heart, Car, Plane,
  Camera, Dog, Cat, Ruler, Coffee, Leaf, Sun, Moon, Bolt, Lightbulb, Trophy,
  Dice5, Briefcase, Baby, Building, ChefHat, GraduationCap, Timer, CircleDot, Circle,
  FileJson, Ship, Apple, Award, Bitcoin, DollarSign, Droplets, Egg, Equal,
  Fuel, Gamepad2, Gauge, Monitor, PartyPopper, Percent, Play, Receipt,
  Square, Table, Target, Utensils, Wifi, Wrench, PawPrint,
  type LucideIcon,
} from "lucide-react";
import { ToolCard } from "./components/ToolCard";
import { ToolPage } from "./components/ToolPage";
import {
  TOOLS, CATEGORIES, getToolsByCategory, getToolById,
  getRelatedTools, getHotTools, getNewTools,
  type ToolMeta,
} from "./data/tools";
import { getFormula } from "./data/formulas";
import { ToolContent } from "./components/ToolContent";
import { getContent } from "./data/content";
import { CategoryHero } from "./components/CategoryHero";
import { getCategoryContent } from "./data/categoryContent";
import { StaticPage } from "./components/StaticPage";
import { AdBanner } from "./components/AdBanner";

// Lazy-load tool components
const toolComponentMap: Record<string, React.ComponentType> = {
  json: lazy(() => import("./components/tools/JsonFormatter").then(m => ({default: m.JsonFormatter}))),
  base64: lazy(() => import("./components/tools/Base64Tool").then(m => ({default: m.Base64Tool}))),
  md5: lazy(() => import("./components/tools/Md5Tool").then(m => ({default: m.Md5Tool}))),
  timestamp: lazy(() => import("./components/tools/TimestampTool").then(m => ({default: m.TimestampTool}))),
  url: lazy(() => import("./components/tools/UrlTool").then(m => ({default: m.UrlTool}))),
  color: lazy(() => import("./components/tools/ColorTool").then(m => ({default: m.ColorTool}))),
  diff: lazy(() => import("./components/tools/TextDiff").then(m => ({default: m.TextDiff}))),
  bmi: lazy(() => import("./components/tools/BMICalculator").then(m => ({default: m.BMICalculator}))),
  mortgage: lazy(() => import("./components/tools/MortgageCalculator").then(m => ({default: m.MortgageCalculator}))),
  "compound-interest": lazy(() => import("./components/tools/StandardCalculators").then(m => ({default: m.CompoundInterestCalculator}))),
  tip: lazy(() => import("./components/tools/StandardCalculators").then(m => ({default: m.TipCalculator}))),
  discount: lazy(() => import("./components/tools/StandardCalculators").then(m => ({default: m.DiscountCalculator}))),

// JWT & Regex tools
  jwt: lazy(() => import("./components/tools/JwtParser").then(m => ({default: m.JwtParser}))),
  regex: lazy(() => import("./components/tools/RegexTester").then(m => ({default: m.RegexTester}))),
  "regex-cheatsheet": lazy(() => import("./components/tools/RegexCheatsheet").then(m => ({default: m.RegexCheatsheet}))),
  calculator: lazy(() => import("./components/tools/CalculatorTool").then(m => ({default: m.CalculatorTool}))),
};

// Map tool IDs to components
function resolveComponent(tool: ToolMeta): React.ComponentType | null {
  if (tool.component && toolComponentMap[tool.component]) {
    // For generic calculator, wrap with formula from registry
    if (tool.component === "calculator") {
      const config = getFormula(tool.id);
      const CalcComp = toolComponentMap["calculator"];
      // Return a component that passes the right props
      return () => <CalcComp
        description={tool.description}
        inputs={config?.inputs || [{ key: "input1", label: "Input 1", type: "number" as const, defaultValue: 0 }, { key: "input2", label: "Input 2", type: "number" as const, defaultValue: 0 }]}
        formula={config?.formula || ((v: Record<string, number | string>) => [{ label: "Result", value: String(Number(v.input1||0) + Number(v.input2||0)) }])}
        presets={config?.presets}
      />;
    }
    return toolComponentMap[tool.component];
  }
  return null;
}

// Generic calculator wrapper using formula registry
function GenericCalcWrapper({ tool }: { tool: ToolMeta }) {
  const CalculatorToolComp = toolComponentMap["calculator"];
  if (!CalculatorToolComp) return <ComingSoon name={tool.name} />;
  const config = getFormula(tool.id);
  if (config) {
    return <CalculatorToolComp description={tool.description} inputs={config.inputs} formula={config.formula} presets={config.presets} />;
  }
  // Fallback: use tool name to guess formula
  return <CalculatorToolComp
    description={tool.description}
    inputs={[
      { key: "input1", label: "Input 1", type: "number" as const, defaultValue: 0 },
      { key: "input2", label: "Input 2", type: "number" as const, defaultValue: 0 },
    ]}
    formula={(v: Record<string, number | string>) => {
      const a = Number(v.input1) || 0;
      const b = Number(v.input2) || 0;
      return [
        { label: "Result (A+B)", value: String(a + b) },
        { label: "A x B", value: String(a * b) },
        { label: "A/B", value: b !== 0 ? (a / b).toFixed(4) : "N/A" },
      ];
    }}
  />;
}

// Map string icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Braces, Lock, Hash, Shuffle, Type, Code2, Globe, Calculator, Image, Video,
  PaletteIcon, QrCode, Link2, Clock, BarChart2, Search, Regex, AlignLeft,
  Download, Star, Database, Diff, Copy, Key, Wallet,
  TrendingUp, TrendingDown, PiggyBank, Home, Scale, Heart, Car, Plane,
  Camera, Dog, Cat, Ruler, Coffee, Leaf, Sun, Moon, Bolt, Lightbulb, Trophy,
  Dice5, Briefcase, Baby, Building, ChefHat, GraduationCap, Timer, CircleDot, Circle,
  Sparkles, FileJson, Flame, Zap, Ship,
  Apple, Award, Bitcoin, DollarSign, Droplets, Egg, Equal,
  Fuel, Gamepad2, Gauge, Monitor, PartyPopper, Percent, Play, Receipt,
  Square, Table, Target, Utensils, Wifi, Wrench,
  Palette: PaletteIcon, Crop: Image, FileText: FileJson,
  Music: Star, Paw: PawPrint, Bulb: Lightbulb,
  ChevronsUpDown, PawPrint: PawPrint,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Zap;
}

// Category icon mapping
const catIconMap: Record<string, LucideIcon> = {
  Zap, Code2, Wallet, Heart, GraduationCap, ChefHat, Plane,
  Home, Building, Dog, Car, Briefcase, Timer, Camera, Leaf,
  Bolt, Baby, Dice5, Ship, Sparkles,
};

function CategoryIcon({ icon }: { icon: string }) {
  const Icon = catIconMap[icon] || Zap;
  return <Icon className="w-3.5 h-3.5" />;
}

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="py-16 text-center space-y-3">
      <div className="w-16 h-16 rounded-2xl bg-accent mx-auto flex items-center justify-center">
        <Zap className="w-8 h-8 text-primary opacity-40" />
      </div>
      <p className="text-foreground" style={{ fontWeight: 500 }}>{name} — Coming Soon</p>
      <p className="text-muted-foreground text-sm">This tool is under development. Check back soon!</p>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [staticPage, setStaticPage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentTool = activeToolId ? getToolById(activeToolId) : null;

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch = !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.seo.keywords.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const hotTools = getHotTools(6);
  const newTools = getNewTools(4);

  const openTool = (id: string) => {
    setActiveToolId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeTool = () => {
    setActiveToolId(null);
    setStaticPage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO */}
      <Helmet>
        <title>Free Online Tools — Developer Tools, Calculators & More | figureitcalc</title>
        <meta name="description" content="Free online tools for developers and everyone. JSON formatter, Base64 encoder, BMI calculator, mortgage calculator, and 189+ more. All client-side, no signup needed." />
        <meta name="keywords" content="online tools, free tools, developer tools, calculator, JSON formatter, Base64, BMI calculator, mortgage calculator" />
      </Helmet>

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <button onClick={closeTool} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-foreground hidden sm:inline" style={{ fontWeight: 600, fontSize: "1.1rem" }}>figureitcalc</span>
          </button>

          <div className="flex-1 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search 206+ free tools..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value) { setActiveToolId(null); setActiveCategory("all"); } }}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all text-sm"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <a href="/" className="px-3 py-1.5 rounded hover:text-foreground hover:bg-accent transition-colors">Home</a>
            <button onClick={() => { setStaticPage("about"); setActiveToolId(null); }} className="px-3 py-1.5 rounded hover:text-foreground hover:bg-accent transition-colors">About</button>
            <button onClick={() => { setStaticPage("privacy"); setActiveToolId(null); }} className="px-3 py-1.5 rounded hover:text-foreground hover:bg-accent transition-colors">Privacy</button>
          </nav>
          <button className="md:hidden p-1.5 rounded-lg hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-2 flex gap-2">
            {[
              { label: "Home", action: () => { setStaticPage(null); setActiveToolId(null); setActiveCategory("all"); setMobileMenuOpen(false); } },
              { label: "About", action: () => { setStaticPage("about"); setActiveToolId(null); setMobileMenuOpen(false); } },
              { label: "Privacy", action: () => { setStaticPage("privacy"); setActiveToolId(null); setMobileMenuOpen(false); } },
            ].map(({ label, action }) => (
              <button key={label} onClick={action} className="px-3 py-1.5 text-sm text-muted-foreground rounded hover:text-foreground hover:bg-accent transition-colors">{label}</button>
            ))}
          </div>
        )}
      </header>

      {/* Static Pages (About, Privacy, Contact) */}
      {staticPage && !currentTool && (
        <StaticPage page={staticPage as "about" | "privacy" | "contact"} onBack={closeTool} />
      )}

      {/* Tool Detail Page */}
      {!staticPage && currentTool && (
        <>
          {/* Category Bar */}
          <div className="bg-card border-b border-border sticky top-14 z-40">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-wrap items-center gap-1 py-2">
                {CATEGORIES.filter(c => c.id !== "all").map((cat) => {
                  const isActive = currentTool.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setActiveToolId(null); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all flex-shrink-0 ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
                      style={{ fontWeight: isActive ? 500 : 400 }}
                    >
                      <CategoryIcon icon={cat.icon} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tool page with SEO */}
          <ToolPage
            toolId={currentTool.id}
            icon={getIcon(currentTool.icon)}
            name={currentTool.name}
            description={currentTool.seo.intro}
            tag={CATEGORIES.find(c => c.id === currentTool.category)?.label || currentTool.category}
            tagColor="bg-blue-100 text-blue-700"
            seo={currentTool.seo}
            related={getRelatedTools(currentTool).map(t => ({
              id: t.id,
              icon: getIcon(t.icon),
              name: t.name,
              description: t.description,
              category: t.category,
            }))}
            onBack={closeTool}
            onNavigate={(id) => openTool(id as string)}
            richContent={(() => {
              const c = getContent(currentTool.id);
              if (!c) return null;
              return <ToolContent toolName={currentTool.name} intro={currentTool.seo.intro} whatIs={c.whatIs} howItWorks={c.howItWorks} formula={c.formula} useCases={c.useCases} tips={c.tips} faq={c.faq} />;
            })()}
          >
            <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Loading tool...</div>}>
              {(() => {
                const C = resolveComponent(currentTool);
                if (C) return <C />;
                return <ComingSoon name={currentTool.name} />;
              })()}
            </Suspense>
          </ToolPage>
        </>
      )}

      {/* Home Page */}
      {!currentTool && !staticPage && (
        <>
          {/* Category Tabs */}
          <div className="bg-card border-b border-border sticky top-14 z-40">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-wrap items-center gap-1 py-2">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setSearchQuery(""); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all flex-shrink-0 ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
                      style={{ fontWeight: isActive ? 500 : 400 }}
                    >
                      <CategoryIcon icon={cat.icon} />{cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex-1 min-w-0">
              {activeCategory === "all" && !searchQuery && (
                <div className="space-y-6">
                  {hotTools.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <Flame className="w-4 h-4 text-red-500" />
                        <span className="text-foreground" style={{ fontWeight: 600 }}>Hot Tools</span>
                        <span className="text-xs text-muted-foreground">路 Most popular</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {hotTools.map((tool) => <ToolCard key={tool.id} icon={getIcon(tool.icon)} name={tool.name} description={tool.description} tag={CATEGORIES.find(c => c.id === tool.category)?.label} isNew={tool.isNew} isHot={tool.isHot} keywords={tool.seo.keywords} onClick={() => openTool(tool.id)} />)}
                      </div>
                    </section>
                  )}

                  {newTools.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-foreground" style={{ fontWeight: 600 }}>Recently Added</span>
                        <span className="text-xs text-muted-foreground">路 New tools</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {newTools.map((tool) => <ToolCard key={tool.id} icon={getIcon(tool.icon)} name={tool.name} description={tool.description} tag={CATEGORIES.find(c => c.id === tool.category)?.label} isNew={tool.isNew} keywords={tool.seo.keywords} onClick={() => openTool(tool.id)} />)}
                      </div>
                    </section>
                  )}

                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-foreground" style={{ fontWeight: 600 }}>All Tools</span>
                      <span className="text-xs text-muted-foreground">路 {TOOLS.length} tools</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {TOOLS.map((tool) => <ToolCard key={tool.id} icon={getIcon(tool.icon)} name={tool.name} description={tool.description} tag={CATEGORIES.find(c => c.id === tool.category)?.label} isNew={tool.isNew} isHot={tool.isHot} keywords={tool.seo.keywords} onClick={() => openTool(tool.id)} />)}
                    </div>
                  </section>
                </div>
              )}

              {/* Category SEO Hero */}
              {activeCategory !== "all" && !searchQuery && (
                <>
                  <CategoryHero categoryId={activeCategory} toolCount={filteredTools.length} />
                </>
              )}

              {(activeCategory !== "all" || searchQuery) && (
                <section>
                  {!searchQuery ? (
                    <>
                      {/* Tools grid directly (CategoryHero already provides header) */}
                      {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {filteredTools.map((tool) => <ToolCard key={tool.id} icon={getIcon(tool.icon)} name={tool.name} description={tool.description} tag={CATEGORIES.find(c => c.id === tool.category)?.label} isNew={tool.isNew} isHot={tool.isHot} keywords={tool.seo.keywords} onClick={() => openTool(tool.id)} />)}
                        </div>
                      ) : (
                        <div className="py-16 text-center text-muted-foreground">
                          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                          <p>No tools found in this category</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground" style={{ fontWeight: 600 }}>Search "{searchQuery}"</span>
                          <span className="text-xs text-muted-foreground">路 {filteredTools.length} results</span>
                        </div>
                        <button onClick={() => setSearchQuery("")} className="text-xs text-primary flex items-center gap-1 hover:underline">
                          Clear search <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                      {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {filteredTools.map((tool) => <ToolCard key={tool.id} icon={getIcon(tool.icon)} name={tool.name} description={tool.description} tag={CATEGORIES.find(c => c.id === tool.category)?.label} isNew={tool.isNew} isHot={tool.isHot} keywords={tool.seo.keywords} onClick={() => openTool(tool.id)} />)}
                        </div>
                      ) : (
                        <div className="py-16 text-center text-muted-foreground">
                          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                          <p>No tools found</p>
                          <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="mt-3 text-primary text-sm hover:underline">Clear search</button>
                        </div>
                      )}
                    </>
                  )}
                </section>
              )}

              {/* Category SEO Footer — tutorial, tips, FAQ below the tool grid */}
              {activeCategory !== "all" && !searchQuery && (() => {
                const cat = getCategoryContent(activeCategory);
                if (!cat) return null;
                return (
                  <div className="mt-8 space-y-4">
                    {/* Tutorial Steps */}
                    {cat.tutorial && cat.tutorial.length > 0 && (
                      <section className="bg-card rounded-xl border border-border p-5">
                        <h2 className="text-foreground text-lg font-semibold mb-4">
                          {cat.tutorialTitle || "How to Use These Tools — Step by Step Guide"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {cat.tutorial.map((step, i) => (
                            <div key={i} className="flex gap-3 p-4 rounded-lg bg-accent/20 border border-border/40">
                              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                {i + 1}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Tips */}
                    {cat.tips && cat.tips.length > 0 && (
                      <section className="bg-card rounded-xl border border-border p-5">
                        <h2 className="text-foreground text-lg font-semibold mb-3">馃挕 Expert Tips — Get the Most From These Tools</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {cat.tips.map((tip, i) => (
                            <div key={i} className="flex gap-2.5 p-3 rounded-lg bg-accent/20">
                              <span className="text-primary font-bold flex-shrink-0 text-sm">#{i + 1}</span>
                              <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* FAQ */}
                    {cat.faq && cat.faq.length > 0 && (
                      <section className="bg-card rounded-xl border border-border p-5">
                        <h2 className="text-foreground text-lg font-semibold mb-3">
                          Frequently Asked Questions About {CATEGORIES.find(c => c.id === activeCategory)?.label} Tools
                        </h2>
                        <div className="space-y-2">
                          {cat.faq.map((item, i) => (
                            <details key={i} className="group border border-border rounded-lg">
                              <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
                                {item.q}
                              </summary>
                              <div className="px-4 pb-3 text-sm text-muted-foreground leading-relaxed space-y-2">
                                <p>{item.a}</p>
                              </div>
                            </details>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span>figureitcalc · Free Online Tools</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => { setStaticPage("about"); setActiveToolId(null); setActiveCategory("all"); window.scrollTo({top:0,behavior:"smooth"}); }} className="hover:text-foreground transition-colors">About</button>
            <button onClick={() => { setStaticPage("privacy"); setActiveToolId(null); setActiveCategory("all"); window.scrollTo({top:0,behavior:"smooth"}); }} className="hover:text-foreground transition-colors">Privacy Policy</button>
            <button onClick={() => { setStaticPage("contact"); setActiveToolId(null); setActiveCategory("all"); window.scrollTo({top:0,behavior:"smooth"}); }} className="hover:text-foreground transition-colors">Contact</button>
          </div>
          <span>© 2026 figureitcalc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}




