import { Shield, Mail, Info, AlertTriangle, ArrowLeft } from "lucide-react";

interface StaticPageProps {
  page: "about" | "privacy" | "contact" | "404";
  onBack?: () => void;
}

const pages = {
  about: {
    icon: Info,
    title: "About OmniTools",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground">OmniTools</strong> is a free online tools platform offering <strong className="text-foreground">206+ calculators, converters, generators, and utilities</strong> — all running entirely in your browser. No signup, no downloads, no server uploads. Just open the page and use the tool.
        </p>
        <h2 className="text-foreground text-base font-semibold mt-6">Why OmniTools?</h2>
        <p>
          We believe useful tools should be free, fast, and private. Every tool on OmniTools processes data <strong className="text-foreground">100% client-side</strong> — your information never leaves your device. Whether you're a developer formatting JSON, a homebuyer calculating mortgage payments, a fitness enthusiast tracking BMI, or just having fun with love compatibility tests — we've got you covered.
        </p>
        <h2 className="text-foreground text-base font-semibold mt-6">Our Tools</h2>
        <p>
          We offer tools across <strong className="text-foreground">21 categories</strong> including Finance, Health & Fitness, Developer Utilities, Cooking, Travel, Real Estate, Construction, Fortune & Love, and more. Each tool includes detailed explanations, formulas, use cases, pro tips, and FAQs — making them both practical and educational.
        </p>
        <h2 className="text-foreground text-base font-semibold mt-6">How We Sustain</h2>
        <p>
          OmniTools is free thanks to non-intrusive display advertising (Google AdSense). We don't sell your data, require accounts, or lock features behind paywalls. The tools will always be free.
        </p>
        <h2 className="text-foreground text-base font-semibold mt-6">Technology</h2>
        <p>
          Built with React 19, TypeScript, Tailwind CSS, and shadcn/ui components. Hosted on Cloudflare Pages for fast global delivery. Open source libraries power our tools including the Web Crypto API for secure generation and client-side processing for all data handling.
        </p>
      </div>
    ),
  },
  privacy: {
    icon: Shield,
    title: "Privacy Policy",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p><strong className="text-foreground">Last updated: June 2026</strong></p>

        <h2 className="text-foreground text-base font-semibold mt-6">Our Privacy Promise</h2>
        <p>OmniTools is designed with privacy as a core principle. The vast majority of our tools process data <strong className="text-foreground">entirely in your browser</strong> using client-side JavaScript. This means:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your input data (text, numbers, files) never leaves your device</li>
          <li>We cannot see, access, or store what you type into our tools</li>
          <li>No account creation is required — there is nothing to track</li>
          <li>Passwords, API keys, and personal data you enter stay local</li>
        </ul>

        <h2 className="text-foreground text-base font-semibold mt-6">What We Collect</h2>
        <p>We use <strong className="text-foreground">Google Analytics</strong> to understand aggregate site usage (which tools are popular, what countries visitors come from, browser types). This data is anonymized and does not identify individual users. We also use <strong className="text-foreground">Google AdSense</strong> to display advertisements, which may use cookies to serve relevant ads. You can opt out of personalized advertising via Google's Ad Settings.</p>

        <h2 className="text-foreground text-base font-semibold mt-6">Cookies</h2>
        <p>Third-party services (Google Analytics, Google AdSense) may set cookies in your browser. These are governed by the respective privacy policies of those services. OmniTools itself does not set first-party cookies for tracking purposes. We use localStorage only to save your tool preferences (recent tools, favorites) — this data stays in your browser.</p>

        <h2 className="text-foreground text-base font-semibold mt-6">Third-Party Services</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-foreground">Google AdSense</strong> — Displays advertisements. <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener">Google Privacy Policy</a></li>
          <li><strong className="text-foreground">Google Analytics</strong> — Anonymous usage analytics. You can opt out via the <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener">Google Analytics Opt-out Add-on</a></li>
        </ul>

        <h2 className="text-foreground text-base font-semibold mt-6">Contact</h2>
        <p>For privacy-related questions, contact us through the Contact page. We take privacy seriously and will respond promptly.</p>
      </div>
    ),
  },
  contact: {
    icon: Mail,
    title: "Contact Us",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>We'd love to hear from you! Whether you have a bug report, a tool suggestion, a business inquiry, or just want to say hello — here's how to reach us.</p>

        <h2 className="text-foreground text-base font-semibold mt-6">Email</h2>
        <p>📧 <strong className="text-foreground">hello@figureitcalc.com</strong></p>
        <p className="text-xs">We typically respond within 24-48 hours on business days.</p>

        <h2 className="text-foreground text-base font-semibold mt-6">Common Topics</h2>
        <div className="space-y-3">
          <div className="bg-accent/30 rounded-lg p-3">
            <p className="text-foreground font-medium text-sm">🐛 Bug Report</p>
            <p className="text-xs mt-1">Tell us which tool, what you did, what happened, and what you expected. Screenshots help!</p>
          </div>
          <div className="bg-accent/30 rounded-lg p-3">
            <p className="text-foreground font-medium text-sm">💡 Tool Suggestion</p>
            <p className="text-xs mt-1">We're always adding new tools. Tell us what you need and how you'd use it.</p>
          </div>
          <div className="bg-accent/30 rounded-lg p-3">
            <p className="text-foreground font-medium text-sm">📢 Advertising / Partnership</p>
            <p className="text-xs mt-1">Interested in advertising beyond AdSense or collaborating? Let's talk.</p>
          </div>
          <div className="bg-accent/30 rounded-lg p-3">
            <p className="text-foreground font-medium text-sm">🔒 Security Concern</p>
            <p className="text-xs mt-1">If you've found a security vulnerability, please email us directly. We take security seriously.</p>
          </div>
        </div>

        <h2 className="text-foreground text-base font-semibold mt-6">Social</h2>
        <p>Follow us for updates, new tool announcements, and tips:</p>
        <p className="flex gap-3">🐦 Twitter/X · 📘 Facebook · 📌 Pinterest</p>
      </div>
    ),
  },
  "404": {
    icon: AlertTriangle,
    title: "404 — Page Not Found",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed text-center py-8">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-lg text-foreground font-semibold">This page doesn't exist</p>
        <p>The tool or page you're looking for may have moved, been renamed, or never existed.</p>
        <p>Try browsing from the <strong className="text-foreground">All Tools</strong> view or use the search bar to find what you need.</p>
      </div>
    ),
  },
};

export function StaticPage({ page, onBack }: StaticPageProps) {
  const p = pages[page];
  if (!p) return null;
  const Icon = p.icon;

  return (
    <div className="min-h-full bg-background">
      {/* Header bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 h-10 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={onBack} className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </button>
          <span>/</span>
          <span className="text-foreground">{p.title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-foreground text-xl font-semibold">{p.title}</h1>
          </div>
          {p.content}
        </div>
      </div>
    </div>
  );
}
