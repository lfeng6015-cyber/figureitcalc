// Read all IT-Tools directories and generate tools.ts with SEO metadata
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const itToolsDir = join(__dirname, '..', '..', 'it-tools', 'src', 'tools');
const outputFile = join(__dirname, '..', 'src', 'app', 'data', 'tools.ts');

// Category mapping from IT-Tools categories to new categories
const catMap = {
  'Crypto': 'developer',
  'Converter': 'developer',
  'Web': 'developer',
  'Images and videos': 'developer',
  'Development': 'developer',
  'Network': 'developer',
  'Math': 'education',
  'Measurement': 'education',
  'Text': 'developer',
  'Data': 'developer',
  'Finance': 'finance',
  'Real Estate': 'real-estate',
  'Health & Fitness': 'health',
  'Construction': 'construction',
  'Education': 'education',
  'Cooking': 'cooking',
  'Travel': 'travel',
  'Environment': 'environment',
  'Pets': 'pets',
  'Photography': 'photography',
  'Automotive': 'automotive',
  'Business': 'business',
  'Pregnancy & Baby': 'pregnancy',
  'Electrical': 'electrical',
  'Gaming': 'gaming',
  'Wedding & Events': 'wedding',
  'Productivity': 'productivity',
};

// Icon mapping from IT-Tools icons to lucide-react
const iconMap = {
  'TrendingUp': 'TrendingUp', 'ChartBar': 'BarChart2', 'ChartPie': 'BarChart2',
  'ChartCandle': 'BarChart2', 'ArrowsShuffle': 'Shuffle', 'Hash': 'Hash',
  'Lock': 'Lock', 'Key': 'Key', 'Shield': 'Shield', 'Globe': 'Globe',
  'Calculator': 'Calculator', 'Scale': 'Scale', 'Heart': 'Heart',
  'Home': 'Home', 'Car': 'Car', 'Plane': 'Plane', 'Camera': 'Camera',
  'Clock': 'Clock', 'World': 'Globe', 'Dog': 'Dog', 'Cat': 'Cat',
  'Paw': 'Paw', 'Bolt': 'Bolt', 'Bulb': 'Lightbulb', 'Leaf': 'Leaf',
  'Sun': 'Sun', 'Moon': 'Moon', 'Coffee': 'Coffee', 'Flame': 'Flame',
  'Wallet': 'Wallet', 'School': 'GraduationCap', 'Dice': 'Dice5',
  'Trophy': 'Trophy', 'Briefcase': 'Briefcase', 'Building': 'Building',
  'Palette': 'Palette', 'Timer': 'Timer', 'Target': 'Target',
  'Ruler2': 'Ruler', 'Ruler': 'Ruler', 'Stethoscope': 'Heart',
  'File': 'FileJson', 'FileJson': 'FileJson', 'Photo': 'Image',
  'Image': 'Image', 'Video': 'Video', 'Music': 'Star',
  'Type': 'Type', 'Database': 'Database', 'Code2': 'Code2',
  'Braces': 'Braces', 'Regex': 'Regex', 'Diff': 'Diff',
  'AlignLeft': 'Type', 'Download': 'Download', 'Copy': 'Copy',
  'Link2': 'Link2', 'Search': 'Search', 'Zap': 'Zap',
  'Star': 'Star', 'Sparkles': 'Sparkles', 'Circle': 'CircleDot',
  'CircleDot': 'CircleDot', 'Check': 'CircleDot',
  // Fallback icons for tabler-only icons
  'PigMoney': 'Wallet', 'CalendarEvent': 'Calendar', 'Stethoscope': 'Heart',
  'Wind': 'Bolt', 'Wall': 'Building', 'Soup': 'Coffee', 'Cpu': 'Bolt',
  'Calendar': 'Clock', 'DeviceDesktop': 'Monitor', 'GlassFull': 'Coffee',
  'PlugConnected': 'Bolt', 'Cash': 'Wallet', 'Devices': 'Monitor',
  'PlayerPlay': 'Zap', 'Crop': 'Image',
  // Default fallback
  'ArrowsShuffle': 'Shuffle',
};

function getIcon(tablerIcon) {
  return iconMap[tablerIcon] || 'Zap';
}

function getCategory(toolName) {
  // Read the tool's index.ts for category info
  // We need to look at the IT-Tools toolsByCategory
  try {
    const indexContent = readFileSync(join(itToolsDir, 'index.ts'), 'utf8');
    // Find which category this tool belongs to
    for (const [catName, newCat] of Object.entries(catMap)) {
      const regex = new RegExp(`name: '${catName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[^}]*components: \\[([^\\]]+)\\]`, 's');
      const match = indexContent.match(regex);
      if (match && match[1].includes(toolName)) return newCat;
    }
  } catch(e) {}
  return 'developer'; // default
}

function generateTitle(name) {
  return `Online ${name} — Free Tool, No Signup | ToolSite`;
}

function generateDesc(name, desc) {
  return `${desc} Free online tool. 100% client-side processing — no data uploaded. No signup required.`;
}

function generateKeywords(name) {
  return `${name.toLowerCase()}, online ${name.toLowerCase()}, free ${name.toLowerCase()}, ${name.toLowerCase()} tool`;
}

function generateIntro(name, desc) {
  return `${desc} This tool runs entirely in your browser — your data never leaves your device. No signup, no registration, completely free to use.`;
}

function generateHowTo(name) {
  return [
    "Enter your values in the input fields above",
    "Results update automatically as you type",
    "Copy the output with one click",
    "No data is ever sent to any server"
  ];
}

function generateFaq(name) {
  return [
    { q: `Is this ${name} free?`, a: "Yes, completely free. No signup, no registration required." },
    { q: "Is my data secure?", a: "Absolutely. All processing happens locally in your browser. No data is ever uploaded to any server." },
  ];
}

// Main function
function main() {
  const dirs = readdirSync(itToolsDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== 'node_modules')
    .map(d => d.name);

  console.log(`Found ${dirs.length} tool directories`);

  const tools = [];
  let id = 1;

  for (const dir of dirs) {
    const indexPath = join(itToolsDir, dir, 'index.ts');
    if (!existsSync(indexPath)) continue;

    try {
      const content = readFileSync(indexPath, 'utf8');
      const nameMatch = content.match(/name:\s*['"](.+?)['"]/);
      const descMatch = content.match(/description:\s*['"](.+?)['"]/);
      const iconMatch = content.match(/import \{ (\w+) \} from '@vicons\/tabler'/);
      const keywordsMatch = content.match(/keywords:\s*\[([^\]]+)\]/);

      if (!nameMatch) continue;

      const name = nameMatch[1];
      const desc = descMatch ? descMatch[1] : '';
      const icon = iconMatch ? getIcon(iconMatch[1]) : 'Zap';
      const category = getCategory(dir);
      const keywords = keywordsMatch
        ? keywordsMatch[1].split(',').map(k => k.trim().replace(/['"]/g, '')).join(', ')
        : generateKeywords(name);

      // Determine if it's a calculator (needs number inputs) or a utility tool
      const isCalc = dir.includes('calculator') || dir.includes('converter') ||
        ['tip','discount','profit-margin','sales-tax','bmi','tdee','body-fat',
         'mortgage','compound-interest','roi','emi','fire','break-even',
         'cpm','invoice-hours','grade','gpa'].some(k => dir.includes(k));

      const componentName = dir.replace(/-./g, x => x[1].toUpperCase());

      tools.push({
        id: String(id),
        name,
        description: desc,
        category,
        icon,
        isHot: ['bmi-calculator','mortgage-calculator','compound-interest-calculator','tip-calculator','discount-calculator','json-viewer','base64-string-converter','md5-hash'].includes(dir),
        isNew: false,
        component: isCalc ? 'calculator' : (dir.includes('json-viewer') ? 'json' :
                  dir.includes('base64') ? 'base64' :
                  dir.includes('md5') || dir.includes('hash') ? 'md5' :
                  dir.includes('jwt') ? 'jwt' :
                  dir.includes('url-encoder') ? 'url' :
                  dir.includes('color') ? 'color' :
                  dir.includes('text-diff') || dir.includes('diff') ? 'diff' :
                  dir.includes('timestamp') || dir.includes('date-time') ? 'timestamp' :
                  dir.includes('regex') ? 'regex' :
                  dir.includes('qr-code') ? 'qrcode' :
                  dir.includes('markdown') ? 'markdown' :
                  dir.includes('pomodoro') ? 'pomodoro' :
                  dir.includes('meme') ? 'meme' :
                  dir.includes('wheel') ? 'wheel' :
                  dir.includes('habit') ? 'habit' :
                  dir.includes('stopwatch') ? 'stopwatch' :
                  dir.includes('countdown') ? 'countdown' :
                  dir.includes('palette') ? 'color-palette' : 'coming-soon'),
        seo: {
          title: generateTitle(name),
          description: generateDesc(name, desc),
          keywords,
          h1: name,
          intro: generateIntro(name, desc),
          howTo: generateHowTo(name),
          faq: generateFaq(name),
        },
      });

      id++;
    } catch(e) {
      console.log(`  SKIP ${dir}: ${e.message}`);
    }
  }

  console.log(`Generated ${tools.length} tool entries`);

  // Generate the tools.ts file
  const output = `// Auto-generated tools registry — ${tools.length} tools with SEO metadata
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

// Helper functions
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
  console.log(`\nWritten to ${outputFile}`);
}

main();
