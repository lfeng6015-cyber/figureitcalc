// Robust generator: read all 189 IT-Tools and generate tools.ts
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const itToolsDir = join(__dirname, '..', '..', 'it-tools', 'src', 'tools');
const outputFile = join(__dirname, '..', 'src', 'app', 'data', 'tools.ts');

// Category by directory name pattern
function getCategory(dir) {
  const cats = [
    ['trade', /^(landed-cost|import-duty|fob-cif|tariff-impact|currency-hedge)/],
    ['finance', /^(compound|retirement|roi|stock|inflation|annuity|fire|net-worth|savings|emi|crypto|dividend|loan|early-payoff)/],
    ['real-estate', /^(mortgage|rent|home-equity|property-tax|down-payment|renovation|loan-comparison)/],
    ['health', /^(bmi|ideal-weight|body-fat|tdee|macro|heart-rate|steps|water-intake|sleep|bsa)/],
    ['construction', /^(concrete|flooring|paint|roofing|lumber|beam|hvac)/],
    ['education', /^(scientific|gpa|grade|probability|statistics|graphing|math|roman)/],
    ['cooking', /^(recipe|cooking|ingredient|bakers|food|coffee)/],
    ['travel', /^(fuel|mileage|travel|tip|time-zone|timezone)/],
    ['environment', /^(carbon|electricity|solar|water-footprint)/],
    ['pets', /^(dog|cat|pet)/],
    ['photography', /^(depth|ppi|photo|golden-ratio)/],
    ['automotive', /^(car|tire|lease|fuel-economy)/],
    ['business', /^(profit|discount|cpm|sales-tax|break-even|invoice|percentage)/],
    ['pregnancy', /^(due-date|ovulation|baby|child-cost)/],
    ['electrical', /^(ohms|resistor|led|wire)/],
    ['gaming', /^(dice|poker|fps|elo)/],
    ['wedding', /^(wedding|party|seating|drink)/],
    ['productivity', /^(pomodoro|countdown|stopwatch|habit|wheel|meme|image-color)/],
    ['developer', /./], // catch-all
  ];
  for (const [cat, re] of cats) {
    if (re.test(dir)) return cat;
  }
  return 'developer';
}

// Tabler icon → lucide-react map
const iconMap = {
  'TrendingUp': 'TrendingUp','PigMoney': 'Wallet','ChartBar': 'BarChart2','ChartCandle': 'BarChart2',
  'CalendarDollar': 'Clock','Flame': 'Flame','Wallet': 'Wallet','Target': 'Target',
  'Receipt': 'FileJson','CurrencyBitcoin': 'Bitcoin','Cash': 'Wallet',
  'Home': 'Home','HomeQuestion': 'Home','HomeDollar': 'Home','BuildingTax': 'Building',
  'CashBanknote': 'Wallet','ArrowsSplit': 'Shuffle','Bolt': 'Bolt','Tool': 'Wrench',
  'Scale': 'Scale','Weight': 'Scale','BodyScan': 'Heart','HeartRateMonitor': 'Heart',
  'Walk': 'TrendingUp','Glass': 'Coffee','Moon': 'Moon','Rectangle': 'Square',
  'Cube': 'Box','Square': 'Square','Paint': 'Palette','HomeRoof': 'Home','Tree': 'Leaf',
  'Girder': 'Building','BrickWall': 'Building','AirConditioning': 'Wind','MathFunction': 'Calculator',
  'School': 'GraduationCap','Certificate': 'Award','Dice': 'Dice5','ChartLine': 'BarChart2',
  'ChefHat': 'ChefHat','Clock': 'Clock','Egg': 'Egg','Bread': 'Utensils','Salad': 'Leaf',
  'Coffee': 'Coffee','GasStation': 'Fuel','World': 'Globe','CurrencyDollar': 'DollarSign',
  'Car': 'Car','Plane': 'Plane','Leaf': 'Leaf','Sun': 'Sun','Droplet': 'Droplets',
  'Dog': 'Dog','Cat': 'Cat','Bowl': 'Coffee','Paw': 'Paw','Camera': 'Camera',
  'Display': 'Monitor','Photo': 'Image','Spiral': 'Circle','Gauge': 'Gauge',
  'TrendingDown': 'TrendingDown','ReceiptTax': 'Receipt','Circle': 'Circle',
  'ChartPie': 'BarChart2','Discount': 'Percent','Ad': 'Monitor','Equal': 'Equal',
  'FileInvoice': 'FileJson','BabyCarriage': 'Baby','Heart': 'Heart',
  'RulerMeasure': 'Ruler','Moneybag': 'Wallet','CircuitAmmeter': 'Bolt',
  'Resistor': 'Cpu','Bulb': 'Lightbulb','Cable': 'Plug','Cards': 'Dice5',
  'DeviceGamepad': 'Gamepad2','Trophy': 'Trophy','HeartHandshake': 'Heart',
  'GlassCocktail': 'GlassWater','Table': 'Table','Confetti': 'PartyPopper',
  'Apple': 'Apple','ChartInfographic': 'BarChart2','PasswordRound': 'Key',
  'SpeedFilled': 'Gauge','TimerOutlined': 'Timer','ShortTextRound': 'Type',
  'HttpRound': 'Globe','Bank': 'Building','UnfoldMoreOutlined': 'ChevronsUpDown',
  'RouterOutlined': 'Wifi','CompareArrowsRound': 'Diff','AbcRound': 'Type',
  'ImageOutlined': 'Image','BracketIcon': 'Braces','PasswordIcon': 'Key',
  'FileCertIcon': 'Shield','n7mIcon': 'Shield','ArrowsShuffle': 'Shuffle',
  'PlayerPlay': 'Play','Palette': 'Palette','Check': 'CircleDot','CircleDot': 'CircleDot',
  'ClockHour3': 'Clock',
};

function getIcon(tablerName) {
  return iconMap[tablerName] || 'Zap';
}

// Known default/hot tools
const hotTools = new Set([
  'bmi-calculator','mortgage-calculator','compound-interest-calculator',
  'tip-calculator','discount-calculator','json-viewer','base64-string-converter',
  'qr-code-generator','password-strength-analyser','text-diff',
  'jwt-parser','hash-text','url-encoder','color-converter','pomodoro-timer',
]);

function main() {
  const dirs = readdirSync(itToolsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const tools = [];
  let id = 0;

  for (const dir of dirs) {
    const indexPath = join(itToolsDir, dir, 'index.ts');
    const toolId = dir; // Use directory name as ID for formula matching
    if (!existsSync(indexPath)) { console.log(`SKIP (no index.ts): ${dir}`); continue; }

    let content;
    try { content = readFileSync(indexPath, 'utf8'); } catch(e) { continue; }

    // Extract name
    let name = dir.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const nm = content.match(/name:\s*['"](.+?)['"]/);
    if (nm) name = nm[1];

    // Extract description
    let desc = '';
    const dm = content.match(/description:\s*['"](.+?)['"]/);
    if (dm) desc = dm[1];

    // Extract icon
    let icon = 'Zap';
    const im = content.match(/import \{ (\w+) \} from '@vicons\/(tabler|material)'/);
    if (im) icon = getIcon(im[1]);

    // Extract keywords
    let keywords = name.toLowerCase();
    const km = content.match(/keywords:\s*\[([^\]]*)\]/);
    if (km) {
      keywords = km[1].split(',').map(k => k.trim().replace(/['"]/g, '')).join(', ');
    }

    const category = getCategory(dir);

    tools.push({
      id: toolId,
      name,
      description: desc || `${name} — free online tool.`,
      category,
      icon,
      isHot: hotTools.has(dir),
      isNew: false,
      component: 'coming-soon',
      seo: {
        title: `Online ${name} — Free, No Signup | ToolSite`,
        description: desc ? `${desc} Free online tool. 100% client-side — no uploads, no signup.` : `${name} — free online tool. No signup, client-side processing.`,
        keywords: keywords || name.toLowerCase(),
        h1: name,
        intro: desc ? `${desc} This tool processes all data locally in your browser. No information is ever sent to any server. Completely free, no registration required.` : `Free online tool. All processing is client-side. No signup needed.`,
        howTo: ["Enter your input values above", "Results update automatically", "Copy or download the output"],
        faq: [{ q: `Is this ${name} free?`, a: "Yes, 100% free. No signup, no registration." }, { q: "Is my data secure?", a: "Yes — all processing is client-side. Nothing is uploaded." }],
      },
    });
  }

  console.log(`Generated ${tools.length} tools`);

  // Write tools.ts
  const output = `// Auto-generated — ${tools.length} tools with full SEO metadata
import type { LucideIcon } from "lucide-react";

export interface ToolMeta {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isNew?: boolean;
  isHot?: boolean;
  component?: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    h1: string;
    intro: string;
    howTo: string[];
    faq: { q: string; a: string }[];
  };
}

export const CATEGORIES = [
  { id: "all", label: "All Tools", icon: "Zap" },
  { id: "developer", label: "Developer", icon: "Code2" },
  { id: "finance", label: "Finance", icon: "Wallet" },
  { id: "trade", label: "Trade & Tariff", icon: "Ship" },
  { id: "health", label: "Health & Fitness", icon: "Heart" },
  { id: "education", label: "Education", icon: "GraduationCap" },
  { id: "cooking", label: "Cooking", icon: "ChefHat" },
  { id: "travel", label: "Travel", icon: "Plane" },
  { id: "real-estate", label: "Real Estate", icon: "Home" },
  { id: "construction", label: "Construction", icon: "Building" },
  { id: "pets", label: "Pets", icon: "Dog" },
  { id: "automotive", label: "Automotive", icon: "Car" },
  { id: "business", label: "Business", icon: "Briefcase" },
  { id: "productivity", label: "Productivity", icon: "Timer" },
  { id: "photography", label: "Photography", icon: "Camera" },
  { id: "environment", label: "Environment", icon: "Leaf" },
  { id: "electrical", label: "Electrical", icon: "Bolt" },
  { id: "pregnancy", label: "Pregnancy", icon: "Baby" },
  { id: "gaming", label: "Gaming", icon: "Dice5" },
  { id: "wedding", label: "Wedding", icon: "Heart" },
];

export type CategoryId = typeof CATEGORIES[number]["id"];

export const TOOLS: ToolMeta[] = ${JSON.stringify(tools, null, 2)};

export function getToolsByCategory(category: string): ToolMeta[] {
  if (category === "all") return TOOLS;
  return TOOLS.filter((t) => t.category === category);
}

export function getToolById(id: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.id === id);
}

export function getRelatedTools(tool: ToolMeta, limit = 5): ToolMeta[] {
  return TOOLS.filter((t) => t.id !== tool.id && t.category === tool.category).slice(0, limit);
}

export function getHotTools(limit = 6): ToolMeta[] {
  return TOOLS.filter((t) => t.isHot).slice(0, limit);
}

export function getNewTools(limit = 4): ToolMeta[] {
  return TOOLS.filter((t) => t.isNew).slice(0, limit);
}
`;

  writeFileSync(outputFile, output.trim());
  console.log(`Written to ${outputFile}`);
}

main();
