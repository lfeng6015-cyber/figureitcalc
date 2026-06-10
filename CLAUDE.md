# CLAUDE.md — figureitcalc 编程约束

> 适用范围：`G:/A工具站/toolsite/` 全部代码
> 域名：**www.figureitcalc.com**（含 www，裸域 308 重定向至 www）
> 最后更新：2026-06-10

---

## 1. 技术栈锁定

| 约束 | 说明 |
|------|------|
| 框架 | React 19 + TypeScript，**禁止**引入 Vue/Angular/Svelte |
| 构建 | Vite 6.x，**禁止**改用 webpack/turbopack |
| 样式 | Tailwind CSS 4.x + shadcn/ui 组件，**禁止**引入 MUI/Ant Design/Bootstrap |
| 图标 | 仅使用 `lucide-react`，**禁止**引入其他图标库 |
| 包管理 | pnpm，**禁止**使用 npm/yarn 安装新依赖 |
| 运行时 | Node ≥ 18，ESM 模块系统 |

## 2. 目录结构约束

```
toolsite/
├── src/app/
│   ├── App.tsx                  # 主应用（路由、搜索、分类、工具渲染）
│   ├── main.tsx                 # 入口
│   ├── data/
│   │   ├── tools.ts             # 工具注册表（ToolMeta[]），唯一工具数据源
│   │   ├── formulas.ts          # 公式注册表（92 个公式）
│   │   ├── content.ts           # 工具丰富 SEO 内容
│   │   └── categoryContent.ts   # 分类页 SEO 内容
│   └── components/
│       ├── ToolPage.tsx          # 工具详情页布局
│       ├── ToolCard.tsx          # 工具卡片
│       ├── ToolContent.tsx       # SEO 富内容渲染
│       ├── CategoryHero.tsx      # 分类页 Hero
│       ├── AdBanner.tsx          # 广告位
│       ├── StaticPage.tsx        # 通用静态页（About/Privacy/Contact）
│       ├── tools/                # 工具专用组件
│       │   ├── CalculatorTool.tsx    # 通用计算器（173 个工具共享）
│       │   ├── BMICalculator.tsx     # BMI 专用
│       │   ├── MortgageCalculator.tsx
│       │   └── ...
│       └── ui/                   # shadcn/ui 组件，**禁止手动修改**
├── public/                       # 静态资源 + sitemap.xml + robots.txt
├── scripts/                      # 代码生成/批量修复脚本
├── dist/                         # 构建产物，**禁止手动编辑**
├── index.html                    # HTML 入口，含 canonical/meta/AdSense
├── vite.config.ts
├── package.json
└── CLAUDE.md                     # 本文件
```

**关键规则：**
- 新增工具 **只改 `src/app/data/tools.ts`**，不要新建独立文件（除非需要专用计算组件）
- `dist/` 只能通过 `npm run build` 更新，**禁止手动改**
- `scripts/` 中的脚本运行前必须确认不会覆盖手写内容

## 3. 工具新增规范

### 3.1 注册表（tools.ts）

新增工具必须完整填写：

```typescript
{
  id: "my-tool-id",           // kebab-case，全小写+连字符，唯一
  name: "My Tool Name",       // 英文 Title Case
  description: "...",          // 150 字符以内，含关键词
  category: "finance",         // 必须使用已存在的分类 ID
  icon: "Calculator",          // lucide-react 图标名
  isNew: true,                 // 新建工具标记 true，3 周后改 false
  isHot: false,                // 热门标记，默认 false
  component: "calculator",     // 通用用 "calculator"，专用则新增映射
  seo: {
    title: "My Tool — Free Online Calculator | figureitcalc",
    description: "...",        // 150~160 字符，含 3+ 关键词
    keywords: "...",           // 逗号分隔，10~20 个词
    h1: "My Tool",
    intro: "...",              // 200~300 词：What is + How it works + privacy note
    howTo: ["Step 1", "Step 2", "Step 3"],
    faq: [
      { q: "Is this free?", a: "Yes, 100% free. No signup." },
      { q: "Is my data secure?", a: "Yes — all client-side. Nothing uploaded." },
      { q: "工具特定问题", a: "..." },
      { q: "工具特定问题", a: "..." },
    ],
  },
}
```

### 3.2 SEO 内容强制要求

| 字段 | 最低要求 | 格式 |
|------|---------|------|
| `seo.title` | 40~60 字符 | `{Tool Name} — Free Online {Category} | figureitcalc` |
| `seo.description` | 150~160 字符 | 含 3+ 目标关键词 + "Free online tool" + "no signup" |
| `seo.keywords` | 10~20 个 | 逗号分隔，含长尾词如 "free xxx online no signup" |
| `seo.intro` | 200~300 词 | What Is + How It Works + Formula + Privacy Statement |
| `seo.howTo` | 3 条 | 简洁操作步骤 |
| `seo.faq` | 3~4 条 | 1 条通用(免费)、1 条通用(隐私)、1~2 条工具特定 |

### 3.3 专用组件

以下工具必须使用专用组件（不能用通用 CalculatorTool）：

- `BMICalculator` — 身高体重 BMI 可视化
- `MortgageCalculator` — 房贷分期表格
- `JsonFormatter` — JSON 编辑器
- `Base64Tool` — 编解码
- `RegexTester` — 正则测试
- `ColorTool` — 颜色选择器
- `EmojiPickerTool` — Emoji 选择器
- `TimestampTool` — 时间戳转换
- `UrlTool` — URL 编解码
- `JwtParser` — JWT 解析
- `Md5Tool` — 哈希工具
- `StopwatchTool` — 秒表/倒计时
- `CameraTool` — 摄像头
- `TextDiff` — 文本对比
- `KeycodeTool` — 键盘码

**新增专用组件步骤：**
1. 在 `src/app/components/tools/` 新建文件
2. 在 `App.tsx` 的 `toolComponentMap` 中注册
3. 在 `tools.ts` 中将该工具的 `component` 字段设为映射 key

### 3.4 工具开发流程模板（强制遵循）

每个新工具必须按照以下 6 步流程开发，**不准跳过任何步骤**。

---

**Step 1: 提交架构设计（Architecture First）**

在写任何代码之前，先输出以下设计摘要：

```
【工具名称】{Tool Name}
【核心逻辑】{一句话描述计算/转换/生成的本质}
【输入参数】{列出所有用户可修改的输入，含类型和单位}
【输出结果】{列出所有计算结果/展示结果}
【公式来源】{如果涉及计算，注明公式出处和标准}
【组件选择】{通用 CalculatorTool / 新建专用组件}
【状态设计】{哪些值需要存入 URL query string}
```

---

**Step 2: 纯前端零后端**

| 约束 | 要求 |
|------|------|
| 计算位置 | **100% 浏览器本地**，不准调用任何后端 API |
| 网络请求 | 仅允许加载静态资源（CSS/JS/字体/图片），禁止数据上报 |
| 隐私声明 | intro 文案中必须包含 "all processing is client-side, no data is ever sent to any server" |
| 离线能力 | 工具的核心计算逻辑不依赖网络（加载完页面即可断网使用） |

---

**Step 3: 实时响应式交互（Reactive）**

```
用户修改任意输入 → 结果区域毫秒级自动更新 → 不显示 "Calculate" 按钮
```

| 约束 | 说明 |
|------|------|
| 触发方式 | `onChange` / `onInput` 事件直接触发重算，**不准**放 Submit 按钮 |
| 防抖 | 复杂计算（> 10ms）加 debounce 100~200ms，简单计算即时 |
| 反馈 | 计算中显示 spinner，计算完成消失（即使只有几毫秒） |
| 空状态 | 所有输入为空时展示默认示例值，不展示空白/错误 |

---

**Step 4: URL 状态持久化（State in URL）**

```
用户修改参数 → 实时同步到 URL query string → 复制 URL 给他人 → 完美还原
```

| 规则 | 实现 |
|------|------|
| 写入 | 每次输入变化，用 `URLSearchParams` 更新 `window.history.replaceState` |
| 读取 | 组件 mount 时优先从 `URLSearchParams` 读取初始值，无则用默认值 |
| 编码 | 特殊字符用 `encodeURIComponent` |
| 不触发重渲染 | 用 `replaceState`（不是 `pushState`），不产生历史记录堆积 |
| 示例 | `?amount=300000&rate=6.5&years=30&type=annuity` |

---

**Step 5: 输入容错与防呆（Input Sanitization）**

```
用户乱输入 → 自动清洗 → 不弹窗不报错
```

| 场景 | 处理方式 |
|------|---------|
| 前后空格 | `trim()` |
| 中间空格 | 数字类：自动移除；文本类：保留 |
| 非数字字符（数字输入） | 正则 `/[^0-9.]/g` 自动过滤 |
| 多个小数点 | 只保留第一个 `.` |
| 负数（不允许时） | 取绝对值 `Math.abs()` 或限制 `min=0` |
| 超出范围 | clamp 到合理范围，同时在输入框旁显示提示 |
| 空输入 | 显示 placeholder 示例，NaN 处显示 `—` |
| 粘贴脏数据 | 同样走清洗逻辑（onPaste + onChange 共用 sanitize 函数） |
| 科学计数法 | 数字输入框禁止（`inputmode="decimal"`） |

**sanitize 函数模板：**
```typescript
function sanitizeNumber(raw: string, min: number, max: number, fallback: number): number {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/[^0-9.]/g, "");           // 去除非数字
  cleaned = cleaned.replace(/(\..*)\./g, "$1");        // 只保留第一个小数点
  const num = parseFloat(cleaned);
  if (isNaN(num)) return fallback;
  return Math.max(min, Math.min(max, num));             // clamp
}
```

---

**Step 6: 一键操作（One-Click Actions）**

每个工具必须至少提供一个一键操作按钮：

| 操作 | 实现方式 | 适用工具 |
|------|---------|---------|
| 📋 复制结果 | `navigator.clipboard.writeText()` + toast "Copied!" | 所有工具 |
| 📥 导出 CSV | `Blob` + `URL.createObjectURL` + `<a download>` | 表格/列表结果 |
| 📸 导出图片 | `html2canvas` 或 `canvas.toBlob()` | 可视化结果 |
| 🔗 复制链接 | 复制当前含参数的 URL | 有状态工具 |
| 🗑️ 一键清空 | 重置所有输入为默认值 | 多输入工具 |

**Clipboard API 模板：**
```typescript
async function copyResult(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
  } catch {
    // Fallback for older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("Copied!");
  }
}
```

---

**交付物清单（每个新工具上线前必须全部满足）：**

```
□ Architecture 设计摘要已文档化
□ 所有计算在本机完成，无任何 API 调用
□ 输入变化即时更新结果（无 Submit 按钮）
□ URL query string 完整记录状态，可分享还原
□ 输入自动清洗（空格、非法字符、边界值）
□ 至少一个一键操作按钮（复制/导出/分享）
□ 空输入/异常输入不崩，展示默认示例
□ 公式有注释出处
□ 注册表 tools.ts 字段完整
□ ToolContent.tsx SEO 文字已调用
□ <h1> 唯一，h2/h3 层级正确
□ FAQ 双格式（HTML + JSON-LD Schema）
□ 面包屑 Schema
□ WebApplication Schema
```

### 4.1 必须有实际功能（No Dead Pages）

每个工具页面必须提供**真实可用的交互功能**，严禁纯 SEO 内容页：

| 约束 | 要求 |
|------|------|
| 计算器类 | 有输入框 + 输出结果，公式必须正确，计算结果可验证 |
| 转换器类 | 有输入 + 即时输出，支持双向转换 |
| 生成器类 | 有配置选项 + 生成按钮 + 结果展示/下载 |
| 工具类 | 有操作界面 + 真实执行，不是文字说明 |

**验收标准：**
- 输入测试数据能得到正确结果（与 Excel / Google 计算器 / Python 交叉验证）
- 边界值处理正确（0、负数、极大值、空输入）
- 无 JS 运行时错误
- 不全是被动展示的静态文字

**常见违规（禁止）：**
- ❌ 工具页面只有描述文字和公式，没有输入交互
- ❌ 计算器返回错误结果或 NaN
- ❌ 按钮点击无反应
- ❌ SEO 完整但交互组件是空壳

### 4.2 政策数据时效性（2026 基准）

以下数据必须每年复核更新，源文件和 SEO 文案同步刷新：

#### 美国税务 / IRS（2026）

| 数据项 | 当前值 | 来源 |
|--------|--------|------|
| 标准扣除额（单身） | $15,000 | IRS Rev. Proc. 2025-46 |
| 标准扣除额（已婚联合） | $30,000 | 同上 |
| 401(k) 年缴上限 | $23,500（50+ 追加 $7,500，总计 $31,000） | IRS Notice 2025-72 |
| IRA 年缴上限 | $7,000（50+ 追加 $1,000，总计 $8,000） | 同上 |
| 联邦里程费率（business） | $0.70/mile | IRS Notice 2026-2 |
| 长期资本利得税率 | 0%/15%/20% 三档 | IRC §1(h) |
| 销售税率 | 各州不同（0%~10.25%） | state tax authorities |

#### 外贸 / 关税

| 数据项 | 说明 |
|--------|------|
| Section 301 关税（中国） | 19%~25%，叠加在正常关税之上 |
| 最惠国税率（MFN） | 各国不同，平均 2%~7% |
| 40ft 集装箱运费（亚洲→美西） | 2026 参考：$1,800~$3,000（季节性波动） |
| 40ft 集装箱运费（亚洲→欧洲） | 2026 参考：$2,000~$4,000 |

#### 房贷

| 数据项 | 说明 |
|--------|------|
| 30 年固定利率 | 2026 H1 参考：~6.5%~7.0%（美联储联邦基金利率 4.25%~4.50%） |
| 15 年固定利率 | 2026 H1 参考：~5.8%~6.3% |
| FHA 贷款首付 | 最低 3.5%（信用分 ≥ 580） |
| 常规贷款首付 | 最低 3%（Fannie Mae HomeReady） |

#### 其他经济指标（2026）

| 数据项 | 当前值 |
|--------|--------|
| 联邦最低工资 | $7.25/hr（多数州高于此） |
| 社会保障工资基数 | $176,100（2026） |
| 儿童抚养成本（至 18 岁） | ~$310,000（USDA 2026 调整值） |
| 太阳能安装成本 | ~$2.50~$3.50/watt（联邦税收抵免 30%） |
| FICA 税率 | 6.2% SS + 1.45% Medicare = 7.65%（雇员部分） |

### 4.3 政策数据使用规则

- **所有默认值/预设值**必须取自上述最新政策数据，不准用过时数据
- **工具描述/SEO 文案**中引用具体数字必须与当前数据一致（如 "401(k) limit: $23,500 for 2026"）
- **价格类数据**（运费、安装成本等）标注"参考值"，提供可调节输入框
- **SEO 时效文案**检查：每年 1 月扫描全部 `2026` 字符串，更新为当年年份
- **税务计算器**必须加免责声明：`Estimates only. Consult a tax professional.`

### 4.4 公式正确性验证

每个含公式的工具必须通过以下验证：

1. **至少 3 组测试用例**（正常值、边界值、小数值）
2. **交叉验证** — 与 Excel / Google Sheets / authoritative calculator 结果比对
3. **公式来源注释** — 在 `formulas.ts` 或组件中注释公式出处

```typescript
// ✅ 正确：公式带注释
// BMI = weight(kg) / height(m)²  —  WHO standard
const bmi = weight / (height * height);

// ❌ 错误：魔法数字无出处
const x = a * 0.035274;
```

### 4.5 工具功能分级

| 级别 | 标准 | 示例 |
|------|------|------|
| **S 级** | 专用 React 组件 + 可视化 + 多场景预设 + 公式完整 | BMICalculator, MortgageCalculator |
| **A 级** | 通用 CalculatorTool + 定制公式 + 预设按钮 + SEO 完整 | AnnuityCalculator, RoofingCalculator |
| **B 级** | 通用 CalculatorTool + 基础公式 + SEO 完整 | 173 个标准计算器 |
| **不可上线** | 无交互、无公式、纯文字页 | — |

新工具至少达到 **A 级**，通用工具可降至 B 级但必须公式正确。

## 5. SEO 完整规范 — 关键词 · 标题 · 内容 · 长尾 · Schema

> 每个工具/分类页面必须在代码层面满足以下要求。仅填数据表字段是不够的 — 渲染输出必须经过验证。

---

### 5.1 关键词策略体系

#### 5.1.1 关键词金字塔（每个工具必须覆盖三层）

```
         ┌─────────────┐
         │  主关键词 1个  │  ← 最核心，出现在 Title/H1/URL
         ├─────────────┤
         │  次级关键词 3~5个 │  ← 变体/同义词，出现在 H2/description
         ├─────────────┤
         │  长尾关键词 10~20个 │  ← 搜索意图明确，分布在 content/keywords meta
         └─────────────┘
```

**示例 — BMI Calculator：**

| 层级 | 关键词 | 搜索意图 |
|------|--------|---------|
| **主关键词** | `BMI Calculator` | 核心工具搜索 |
| **次级** | `body mass index calculator`、`BMI chart`、`healthy weight calculator`、`BMI formula` | 同义词/相关搜索 |
| **长尾** | `free BMI calculator online no signup`、`how to calculate BMI for women`、`BMI calculator for men in pounds and feet`、`BMI chart by age and gender`、`what is a healthy BMI range`、`BMI percentile calculator for teens`、`ideal weight calculator based on BMI`、`BMI calculator that stores no data`、`printable BMI chart kg and cm`、`calculate my BMI with age` | 自然语言问题/场景化搜索 |

#### 5.1.2 长尾关键词生成规则

长尾关键词必须覆盖以下 6 种搜索意图：

| 意图类型 | 模板 | 示例 |
|---------|------|------|
| **免费诉求** | `free {tool} online no signup` | `free BMI calculator online no signup` |
| **操作引导** | `how to calculate/use/convert {topic}` | `how to calculate BMI at home` |
| **人群限定** | `{tool} for {demographic}` | `BMI calculator for women over 50` |
| **单位变体** | `{tool} in {unit1} and {unit2}` | `BMI calculator in pounds and inches` |
| **隐私关切** | `{tool} without {privacy_issue}` | `BMI calculator that stores no data` |
| **对比/场景** | `{tool} vs {alternative}` 或 `{tool} for {scenario}` | `BMI vs body fat percentage` |

**每个工具生成 8~15 条长尾关键词**，填入 `seo.keywords` 字段。

#### 5.1.3 关键词密度表

| 标签/位置 | 主关键词出现 | 说明 |
|-----------|------------|------|
| `<title>` | **1 次**（前 30 字符） | 最早 = 权重最高 |
| `<meta description>` | 1 次 | 自然融入，不堆砌 |
| `<meta keywords>` | 全部长尾词 | 逗号分隔，单数+复数都覆盖 |
| `<h1>` | 1 次 | 与 title 主关键词一致 |
| 首段 `<p>` (intro) | 1~2 次 | 前 100 字符内出现 |
| `<h2>` 标签 | 每个 h2 含变体 | What Is **BMI**? / How **Body Mass Index** Works |
| `<h3>` 标签 | Use Case / Pro Tip 标题含关键词 | **BMI** for Weight Loss Tracking |
| FAQ `<summary>` | 每个问题含关键词变体 | How accurate is the **BMI formula**? |
| 正文段落 | 每 150 词自然出现 1 次主关键词 | 不堆砌，不超 2% 密度 |
| URL slug | 1 次 | `/tools/bmi-calculator.html` |
| 图片 alt | ≥1 张图片 alt 含关键词 | `alt="BMI calculator chart showing weight categories"` |

---

### 5.2 标题（Title）优化规范

#### 5.2.1 Title 格式模板

```
{工具名} — Free Online {分类名} {子类型} | figureitcalc
```

| 工具类型 | Title 模板 |
|---------|-----------|
| 计算器 | `{Name} — Free Online Calculator | figureitcalc` |
| 转换器 | `{Name} — Free Online {Format} Converter | figureitcalc` |
| 生成器 | `{Name} — Free Online {Format} Generator | figureitcalc` |
| 金融工具 | `{Name} — Free {Purpose} Calculator (2026 Rates) | figureitcalc` |
| 健康工具 | `{Name} — Free {Metric} Calculator (Metric & Imperial) | figureitcalc` |
| 开发者工具 | `{Name} — Online {Format} Tool for Developers | figureitcalc` |
| 命理/运势 | `{Name} — Free {Type} Reading Online | figureitcalc` |

#### 5.2.2 Title 硬性约束

| 约束 | 说明 |
|------|------|
| 长度 | **40~60 字符**（中文 20~30 字），超出部分 Google 会截断 |
| 主关键词位置 | **前 30 字符内**出现主关键词 |
| 品牌位置 | `| figureitcalc` 放在末尾 |
| 分隔符 | 使用 `—`（em dash）或 `|`（pipe），不用 `-`（hyphen） |
| 独特性 | 每个页面 title 必须不同，不准有重复 |
| 营销词 | 必须含 `Free` 或 `Free Online` |
| 时效性 | 涉及数据的工具加年份 `(2026)` |

#### 5.2.3 Title 好坏示例

| ✅ 正确 | ❌ 错误 | 问题 |
|---------|---------|------|
| `BMI Calculator — Free Body Mass Index Calculator Online | figureitcalc` | `BMI Calculator — figureitcalc` | 太短，缺少长尾关键词 |
| `Mortgage Payment Calculator — Free Home Loan Calculator (2026 Rates) | figureitcalc` | `Mortgage Calculator` | 无品牌标识，无营销词 |
| `Free URL Encoder & Decoder — Online Tool for Developers | figureitcalc` | `URL Encoder/Decoder 工具` | 混合语言，无品牌 |

---

### 5.3 Meta Description 优化规范

#### 5.3.1 Description 格式模板

```
{一句话价值主张}。{次级关键词+场景}。{行动号召} — {差异化卖点}。
```

**示例（BMI Calculator）：**
```
Calculate your BMI instantly with our free Body Mass Index calculator. 
Works in metric (kg/cm) and imperial (lbs/inches). Includes BMI chart, 
healthy weight range, and formula explanation. 100% client-side — no 
uploads, no signup.
```

#### 5.3.2 Description 硬性约束

| 约束 | 说明 |
|------|------|
| 长度 | **140~160 字符**，超出会被截断 |
| 主关键词 | 前 100 字符内出现 1 次 |
| 次级关键词 | 至少 2 个变体/同义词 |
| 行动号召 | 出现 1 个 CTA 词：`Calculate`、`Convert`、`Generate`、`Try`、`Use` |
| 卖点 | 必须包含：`free` + `no signup` 或 `no registration` 或 `client-side` |
| 可读性 | 完整句子，非关键词堆砌 |
| 独特性 | 每个页面 description 必须不同 |

---

### 5.4 正文内容结构与关键词分布

每个工具页面的 SEO 正文通过 `ToolContent.tsx` 渲染，必须按以下结构组织：

```
┌─ <h1> {工具名} ─────────────────────────────┐
│  开头含主关键词                                │
├─ <p> intro (200~300 词) ─────────────────────┤
│  段落1: What is {工具名}? — 主关键词 前100字符内 │
│  段落2: How it works — 次级关键词 2~3个         │
│  段落3: Formula/原理 — 含公式关键词              │
│  段落4: Privacy note — "no data collected..."  │
├─ <h2> How {Tool Name} Works ─────────────────┤
│  <p> 逐步说明 + 公式展示                        │
├─ <h2> {Number} Practical Use Cases ───────────┤
│  <h3> Use Case 1: {标题含关键词}               │
│  <h3> Use Case 2: ...                         │
│  ... (5 个 use case，每个 h3 含关键词变体)      │
├─ <h2> Pro Tips for Accurate {Results} ────────┤
│  <h3> Tip 1: {含关键词}                        │
│  ... (4 条 tip)                                │
├─ <h2> Frequently Asked Questions ─────────────┤
│  <details> FAQ 1~4 条 (含 JSON-LD Schema)      │
└──────────────────────────────────────────────┘
```

**关键词分布检查清单：**

- [ ] 主关键词在 h1、首段前 100 字符、至少 1 个 h2、URL slug 中出现
- [ ] 次级关键词分散在 h2/h3 标题和 FAQ 问题中
- [ ] 长尾关键词填充在 keywords meta 和正文自然位置
- [ ] 同义词/复述交替使用（如 BMI ↔ body mass index ↔ weight-to-height ratio）
- [ ] LSI 相关词自然出现（如 `weight`、`height`、`obesity`、`healthy range`、`formula`）

---

### 5.5 分类页面 SEO 内容

分类页通过 `CategoryHero.tsx` + `categoryContent.ts` 渲染，必须包含：

| 元素 | 内容 | 长度 |
|------|------|------|
| H1 | `Free Online {Category} Tools & Calculators` | — |
| Hero description | 品类介绍 + 关键词 | 150~200 词 |
| What Is (h2) | 品类是什么 | 200~300 词 |
| How It Works (h2) | 品类工具如何运作 | 150~200 词 |
| Pro Tips (h2) | 使用技巧 5 条（每条 h3 标题含关键词） | 每条 60~100 词 |
| FAQ (h2) | 4~5 条品类级 FAQ + FAQPage Schema | 每条 50~100 词 |
| Tools Grid | 展示该分类全部工具卡片 | — |
| 内链 | 指向同分类工具 + 关联分类 | ≥ 8 条 |

---

### 5.6 页面 HTML 语义结构

```
<html lang="en">
  <head>
    <title>             ← 每个页面独立，40~60 字符（按 5.2 模板）
    <meta description>  ← 每个页面独立，140~160 字符（按 5.3 模板）
    <meta keywords>     ← 含全部三层关键词（按 5.1）
    <meta robots>       ← index,follow（工具页/分类页）/ noindex（管理页/404）
    <link canonical>    ← https://www.figureitcalc.com/tools/{id}.html
    <meta og:title>     ← 与 title 一致
    <meta og:description> ← 与 description 一致
    <meta og:type>      ← website
    <meta og:image>     ← https://www.figureitcalc.com/og-image.png
    <meta twitter:card> ← summary_large_image
    <script type="application/ld+json">  ← FAQPage Schema（见 5.8）
    <script type="application/ld+json">  ← BreadcrumbList Schema（见 5.9）
    <script type="application/ld+json">  ← WebApplication Schema（见 5.10）
  </head>
  <body>
    <nav aria-label="Breadcrumb">   ← 面包屑 + Schema
    <main>
      <article>
        <header>
          <h1>           ← 唯一 H1
        </header>
        <section>        ← 工具交互区（计算器/转换器/生成器）
        <section>        ← SEO 文字内容区（What Is / How To / Use Cases / Tips）
        <section>        ← FAQ 可视区 + Schema
        <aside>          ← Related Tools（同分类推荐）
      </article>
    </main>
    <footer>
  </body>
</html>
```

### 5.7 标题层级规范

| 标签 | 页面内数量 | 用途 |
|------|-----------|------|
| `<h1>` | **仅 1 个** | 工具名称，含主关键词，位于页面顶部 |
| `<h2>` | 5~7 个 | What Is / How It Works / Use Cases / Pro Tips / FAQ / Related Tools |
| `<h3>` | 与用例/Tip数量一致 | 每个 Use Case 和 Pro Tip 用 h3 标题 |

**硬性规则：**
- 必须按层级嵌套（h1 → h2 → h3），不准跳级
- 禁止用 `<div class="text-2xl font-bold">` 代替 `<h2>` — Google 不认
- 每页必须有且仅有一个 `<h1>`
- 每个 h2/h3 标题必须包含关键词或变体

### 5.8 FAQ 双格式要求（HTML + JSON-LD）

每个工具页面的 FAQ 必须同时存在两种形态：

**① 可视 HTML（`<details>` + `<summary>` — 用户可见）：**
```tsx
<section>
  <h2>Frequently Asked Questions About {Tool Name}</h2>
  {tool.seo.faq.map((item, i) => (
    <details key={i}>
      <summary>{item.q}</summary>   ← 问题含关键词
      <p>{item.a}</p>               ← 回答 50~100 词，含关键词
    </details>
  ))}
</section>
```

**② JSON-LD Schema（搜索引擎结构化数据）：**
```tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": tool.seo.faq.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a
    }
  }))
})}
</script>
```

### 5.9 面包屑 Schema

```tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.figureitcalc.com/" },
    { "@type": "ListItem", "position": 2, "name": categoryName, "item": "https://www.figureitcalc.com/category/{id}.html" },
    { "@type": "ListItem", "position": 3, "name": toolName }
  ]
})}
</script>
```

### 5.10 WebApplication Schema（工具页专用）

```tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": toolName,
  "url": `https://www.figureitcalc.com/tools/${tool.id}.html`,
  "description": tool.seo.description,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "browserRequirements": "Requires JavaScript"
})}
</script>
```

### 5.11 URL 结构约束

| 页面类型 | URL 格式 | 示例 |
|---------|---------|------|
| 首页 | `/` | `https://www.figureitcalc.com/` |
| 分类页 | `/category/{id}.html` | `/category/finance.html` |
| 工具页 | `/tools/{tool-id}.html` | `/tools/bmi-calculator.html` |
| 静态页 | `/{page}.html` | `/about.html` |

**强制：**
- 工具 URL 使用 `tools/`（单数前缀），不用 `tool/`
- 工具 ID 用 kebab-case，全小写，英文
- `.html` 后缀必须保留
- 分类 ID 与 `CATEGORIES[].id` 一致
- URL 中不准出现中文/空格/特殊字符

### 5.12 内链规范

| 位置 | 链接类型 | 数量 |
|------|---------|------|
| 面包屑 | Home → 分类页 → 当前工具 | 2~3 条 |
| "Related Tools" section | 同分类工具 | 3~6 条 |
| 正文 Use Cases 内 | 提到其他工具时加链接 | 2~4 条 |
| footer | About / Privacy / Contact | 3 条 |
| 分类页底部 | 关联分类交叉推荐 | 3~5 条 |

- 锚文字用**工具名**或**描述性文字**，不准用 "click here" / "read more" / "learn more"
- 每页内链 ≥ 5 条，≤ 15 条（太多稀释权重）
- 深层次页面（工具页）必须能通过 ≤ 3 次点击从首页到达

### 5.13 图片 SEO

- 所有 `<img>` 必须有 `alt` 属性，内容描述 + 含关键词，如 `alt="BMI calculator showing healthy weight range chart"`
- SVG 图标用 `aria-hidden="true"`（装饰性，不参与 SEO）
- Open Graph 图片 1200×630px，文件 < 300KB
- Favicon 完整套件：`favicon.ico` + `favicon-32x32.png` + `favicon-16x16.png` + `apple-touch-icon.png` + `site.webmanifest`

### 5.14 内容保鲜 & 时效性信号

Google 对以下信号敏感，直接影响排名：

| 信号 | 做法 | 频次 |
|------|------|------|
| 年份标记 | Title 和 H1 中含 `(2026)` 表示数据为新 | 每年 1 月更新 |
| lastmod | sitemap 中每个 URL 加 `<lastmod>` 日期 | 每次构建 |
| 内容更新 | 政策数据/费率/利率更新后同步修改 SEO 文案 | 政策变更后 1 周内 |
| 版权年份 | footer 显示当年 `© 2026` | 每年 1 月更新 |
| 博客/更新日志 | 可选：`/updates.html` 列出工具更新记录 | 每次更新后追加 |

### 5.15 页面性能 SEO（Core Web Vitals）

| 指标 | 目标 | Google 权重 |
|------|------|------------|
| LCP (Largest Contentful Paint) | < 2.5s | 排名因子 |
| INP (Interaction to Next Paint) | < 200ms | 排名因子 |
| CLS (Cumulative Layout Shift) | < 0.1 | 排名因子 |
| TTFB (Time to First Byte) | < 800ms | Vercel CDN 保证 |
| 首字节含文字 | `curl` 可获取到 SEO 文字 | 索引必要条件 |

**代码措施：**
- SEO 文字组件**不懒加载**（ToolContent 同步渲染），确保爬虫立即获取
- 工具交互组件 `lazy()` 懒加载，优化 LCP
- 字体用系统栈 + `font-display: swap`，避免 FOIT
- 图片指定 `width` / `height` 防 CLS
- 广告容器预留固定高度 `min-h-[90px]`

### 5.16 SEO 上线前自查清单

新工具/新页面上线前必须逐项确认：

```
代码级检查：
□ <title> 40~60 字符，主关键词在前 30 字符，含 | figureitcalc
□ <meta description> 140~160 字符，含 2~3 个关键词变体 + CTA + "no signup"
□ <meta keywords> 10~20 条，含主关键词+次级+长尾
□ <link canonical> 指向正确的 www 域名完整 URL
□ <meta robots> = "index, follow"
□ <meta og:title> / <meta og:description> 与 title/description 一致
□ FAQ JSON-LD Schema 正确，每条 faq 包含 q 和 a
□ BreadcrumbList JSON-LD Schema 正确，position 连续递增
□ WebApplication JSON-LD Schema 存在，price=0

内容级检查：
□ <h1> 唯一，含主关键词
□ <h2> 5~7 个，每个含关键词变体
□ <h3> 每个 Use Case/Tip 标题含关键词
□ intro 首段前 100 字符含主关键词
□ FAQ 问题含关键词变体（不是重复标题）
□ Use Cases 5 个，Pro Tips 4 个
□ 内链 ≥ 5 条，锚文字为工具名/描述性
□ 所有 <img> 有 alt 属性

curl 验证：
□ curl {url} | grep -i "{主关键词}"   → 有结果
□ curl {url} | grep "<h1>"             → 有结果
□ curl {url} | grep "application/ld+json" → FAQ + BreadcrumbList + WebApplication
```

## 6. 代码风格

### 6.1 React 组件

- 全部使用函数组件 + Hooks，**禁止** Class 组件
- Props 类型必须在组件文件内通过 interface 定义
- 导出命名用 PascalCase，文件名与组件名一致
- 无 props 组件不使用空 interface

```typescript
// ✅ 正确
interface ToolCardProps {
  tool: ToolMeta;
  onSelect: (id: string) => void;
}
export function ToolCard({ tool, onSelect }: ToolCardProps) { ... }

// ❌ 错误
export function ToolCard(props: any) { ... }
```

### 6.2 导入顺序

```typescript
// 1. React / 第三方库
import { useState } from "react";
import { Search } from "lucide-react";

// 2. 内部组件
import { ToolCard } from "./components/ToolCard";

// 3. 数据 / 类型
import { TOOLS, type ToolMeta } from "./data/tools";
```

### 6.3 样式

- 优先使用 Tailwind 原子类，避免内联 `style={}`
- 动画用 `motion` 库（已安装），不用 CSS animation
- 颜色统一用 Tailwind 语义色（`bg-primary`、`text-muted-foreground`），不用硬编码色值
- 响应式断点：`sm:`(640)、`md:`(768)、`lg:`(1024)、`xl:`(1280)

### 6.4 共享常量

- 所有工具数据、分类、SEO 内容放在 `src/app/data/` 下
- 魔法数字和字符串抽取为命名常量在本文件顶部
- 类型定义与数据放在同一文件，用 `export interface` 导出

## 7. 国际化 & 无障碍

- **全站英文**：所有 UI 文案、SEO 内容、错误提示使用英文
- **数字格式化**：使用 `Intl.NumberFormat` 或 `toLocaleString()`，不手写格式化
- **日期格式化**：使用时区感知的 `date-fns`（已安装）
- **无障碍**：表单控件必须有 `<label>`，图标按钮必须有 `aria-label`

## 8. 性能约束

- 工具组件必须 `lazy()` 懒加载，在 `App.tsx` 的 `toolComponentMap` 注册
- 大于 1MB 的数据用动态 `import()` 按需加载
- 避免在 render 中创建新对象/函数作为依赖项
- 列表渲染必须用唯一 `id` 做 key（禁止用 index）

## 9. 部署 & 域名

### 8.1 域名规则

| 用途 | URL |
|------|-----|
| **主站（canonical）** | `https://www.figureitcalc.com/` |
| 裸域重定向 | `https://figureitcalc.com/` → 308 → www |
| 所有 sitemap URL | 必须以 `https://www.figureitcalc.com/` 开头 |
| robots.txt Sitemap 引用 | `https://www.figureitcalc.com/sitemap.xml` |
| canonical 标签 | 必须用 www 域名 |

### 8.2 构建与部署

```bash
# 本地开发
pnpm dev

# 构建（含 sitemap 重新生成）
pnpm build   # 执行 vite build + scripts/generate-static.js

# 部署 — 推送 main 分支自动触发 Vercel 部署
git add -A
git commit -m "feat: ..."
git push origin main
```

### 8.3 部署后检查清单

- [ ] `https://www.figureitcalc.com/sitemap.xml` 可访问，URL 全为 www 域名
- [ ] `https://www.figureitcalc.com/robots.txt` Sitemap 引用正确
- [ ] 首页 canonical 指向 `https://www.figureitcalc.com/`
- [ ] 工具页面可正常加载，无 JS 报错
- [ ] Google Search Console 提交 sitemap

## 10. 禁止事项

- ❌ **禁止**在 sitemap/robots/canonical 中使用裸域（无 www）
- ❌ **禁止**引入 Google Analytics 之外的第三方分析脚本（已使用 GA+AdSense）
- ❌ **禁止**工具收集用户输入数据上传服务器 — 全部 client-side 处理
- ❌ **禁止**在 `public/` 下放置可执行脚本或敏感配置
- ❌ **禁止**手动编辑 `dist/` 目录内容
- ❌ **禁止**使用 `any` 类型（除非确实无法推断）
- ❌ **禁止**移除或修改 `react-helmet-async` 的 SEO meta 输出逻辑
- ❌ **禁止**安装非必要的 npm 依赖（先检查已有依赖是否可满足需求）

## 11. Git 提交规范

```
<type>: <short description>

feat:    新功能 / 新工具
fix:     Bug 修复
refactor: 代码重构（不改变功能）
seo:     SEO 相关改动（title/desc/sitemap 等）
style:   样式调整
docs:    文档更新
chore:   构建/脚本/配置

示例：
feat: add SIP calculator tool
fix: sitemap URLs use www.figureitcalc.com
seo: improve FAQ content for finance tools
```

## 12. 新增广告位规范

- AdSense 广告位使用 `AdBanner.tsx` 组件
- 每个工具页面最多 2 个广告位（中部、底部）
- 广告位必须带 `aria-label="Advertisement"` 标注
- 不要在工具的核心交互区插入广告
- 广告代码统一用 `ca-pub-6044600625597443`
