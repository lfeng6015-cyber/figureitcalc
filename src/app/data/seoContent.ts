/**
 * SEO Content Pages — TypeScript wrapper for seo-content-data.json.
 * Provides typed access to scenario, comparison, and explainer pages.
 */
import contentData from "./seo-content-data.json";

export interface ContentSection {
  title: string;
  body?: string;
  type?: "text" | "bullet-list" | "numbered-list" | "callout" | "comparison-table";
  items?: string[];
  calloutType?: "tip" | "warning" | "info";
}

export interface RelatedToolLink {
  toolId: string;
  name: string;
  description: string;
  cta: string;
}

export interface ContentPageMeta {
  slug: string;
  type: "scenario" | "compare" | "learn";
  title: string;
  description: string;
  keywords: string;
  intro: string;
  icon: string;
  sections: ContentSection[];
  relatedTools: RelatedToolLink[];
  faq: { q: string; a: string }[];
}

/** All content pages from the JSON registry */
export const CONTENT_PAGES: ContentPageMeta[] = contentData.pages as ContentPageMeta[];

/** Build an inverted index: toolId → content pages that reference it */
const toolContentIndex: Record<string, ContentPageMeta[]> = {};
CONTENT_PAGES.forEach((page) => {
  page.relatedTools.forEach((rt) => {
    if (!toolContentIndex[rt.toolId]) {
      toolContentIndex[rt.toolId] = [];
    }
    toolContentIndex[rt.toolId].push(page);
  });
});

/** Get content pages that reference a given tool */
export function getContentPagesForTool(toolId: string): ContentPageMeta[] {
  return toolContentIndex[toolId] || [];
}

/** Lookup a single content page by type and slug */
export function getContentPage(type: string, slug: string): ContentPageMeta | undefined {
  return CONTENT_PAGES.find((p) => p.type === type && p.slug === slug);
}

/** Type display labels */
export const TYPE_LABELS: Record<string, string> = {
  scenario: "Scenarios",
  compare: "Comparisons",
  learn: "Learn",
};
