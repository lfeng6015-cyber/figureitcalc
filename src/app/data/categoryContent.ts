// Rich SEO content for category landing pages
// Each category gets detailed knowledge content for search engines and users

export interface CategoryConcept {
  emoji: string;
  title: string;
  desc: string;
}

export interface TutorialStep {
  title: string;
  desc: string;
}

export interface CategoryFAQ {
  q: string;
  a: string;
}

export interface CategoryContent {
  title: string;
  intro: string;
  conceptsTitle?: string;
  concepts?: CategoryConcept[];
  tutorialTitle?: string;
  tutorial?: TutorialStep[];
  tips?: string[];
  faq?: CategoryFAQ[];
}

export const categoryContentRegistry: Record<string, CategoryContent> = {
  developer: {
    title: "Developer Tools — Free Online Coding & Dev Utilities",
    intro: "Developer tools are the backbone of modern software engineering. Whether you're formatting JSON, encoding Base64, generating UUIDs, testing regex patterns, or converting between data formats — these utilities save hours of manual work and reduce errors. Our collection includes 90+ free developer tools covering encoding, hashing, formatting, diff comparison, URL parsing, HTTP status reference, cron expression building, and much more. All tools run entirely in your browser — your data never leaves your device. No signup, no ads in tool areas, instant results. Perfect for backend developers, frontend engineers, DevOps, QA testers, and computer science students.",
    conceptsTitle: "Core Developer Concepts",
    concepts: [
      { emoji: "🔐", title: "Data Encoding & Hashing", desc: "Base64, URL encoding, MD5/SHA hashing, HMAC, bcrypt — understand the difference between encoding (reversible), hashing (one-way), and encryption (key-based)." },
      { emoji: "📊", title: "Data Format Conversion", desc: "JSON ↔ YAML ↔ TOML ↔ XML ↔ CSV. Each format has ideal use cases: JSON for APIs, YAML for config, TOML for project metadata, CSV for spreadsheets." },
      { emoji: "🔍", title: "Text Processing & Regex", desc: "Regular expressions for pattern matching, text diff for comparing versions, case converters for naming conventions, and text statistics for content analysis." },
      { emoji: "🆔", title: "ID & Token Generation", desc: "UUID v4/v7 for distributed IDs, ULID for sortable identifiers, secure token generation via Web Crypto API, and BIP39 mnemonics for cryptographic key backup." },
      { emoji: "🌐", title: "Network & HTTP Tools", desc: "IP subnet calculators, HTTP status code reference, URL parser/encoder, JWT decoder, User-Agent parser, and Crontab expression builder for task scheduling." },
      { emoji: "💻", title: "Code Formatting & Quality", desc: "SQL prettifier, HTML entity encoder, Markdown to HTML converter, and various code beautifiers for consistent, readable output across languages." },
    ],
    tutorialTitle: "Developer Workflow: From API Response to Debugged Data",
    tutorial: [
      { title: "Fetch & Inspect", desc: "Get your raw API response or log data. Use JSON Viewer to explore nested structures, or Text Diff to compare response versions." },
      { title: "Convert & Format", desc: "Transform data between formats — JSON to CSV for Excel analysis, JSON to YAML for config files, XML to JSON for API migration." },
      { title: "Encode & Secure", desc: "Use Base64 encoder for data URI embedding, Hash Text for checksum verification, HMAC generator for API request signing." },
      { title: "Validate & Test", desc: "Test regex patterns against sample data, validate JWT token claims, check HTTP status code meanings, verify UUID format." },
      { title: "Generate & Deploy", desc: "Generate secure API tokens, create cron schedules for automated tasks, build Docker Compose files from docker run commands." },
    ],
    tips: [
      "Bookmark frequently used tools — developers typically use 5-10 tools repeatedly. Our browser localStorage saves your recent tools automatically.",
      "For API debugging: JSON Viewer → JSON Diff (compare responses) → JWT Parser (check auth tokens) — this trio handles 80% of API debugging workflows.",
      "All encoding/hashing tools are client-side only. Use the bcrypt and HMAC generators confidently — your secrets never touch a server.",
      "The CIDR/Subnet calculator is essential for cloud VPC planning. AWS reserves 5 IPs per subnet; factor this into your subnet sizing.",
    ],
    faq: [
      { q: "Are these developer tools really free?", a: "Yes — completely free. No signup, no registration, no premium tiers. All tools run client-side in your browser. We earn revenue through non-intrusive display ads (like every other tool site)." },
      { q: "Is my code/data secure when using these tools?", a: "Yes. All processing happens locally in your browser via JavaScript. Your JSON, passwords, API keys, and source code never leave your device. We cannot see, store, or access your data." },
      { q: "Which JSON tool should I use for my task?", a: "JSON Viewer for exploring/navigating data, JSON Formatter for beautifying, JSON Diff for comparing two payloads, JSON to CSV for spreadsheet export, JSON to YAML/TOML for config conversion. Each tool serves a specific purpose." },
    ],
  },

  finance: {
    title: "Financial Calculators — Free Online Money & Investment Tools",
    intro: "Financial calculators help you make smarter money decisions — whether you're planning retirement, comparing loan offers, calculating investment returns, or budgeting for major purchases. Our collection covers compound interest, mortgage amortization, ROI analysis, inflation impact, tax calculations, and more. Unlike spreadsheet templates that require Excel knowledge, these calculators work instantly in your browser with clear inputs and detailed outputs. Perfect for personal finance planning, investment analysis, business financial modeling, and financial literacy education. All calculators use industry-standard formulas (APR per Regulation Z, compound interest formulas, amortization schedules) with 2026 tax rates and limits.",
    conceptsTitle: "Financial Literacy Essentials",
    concepts: [
      { emoji: "📈", title: "Compound Interest", desc: "The most powerful force in finance — earning returns on your returns. Even small monthly investments grow exponentially over decades. Start early for maximum benefit." },
      { emoji: "🏠", title: "Mortgage & Loans", desc: "Understanding amortization, APR vs. interest rate, PMI, and loan-to-value ratios helps you compare offers and save thousands over the life of a loan." },
      { emoji: "💰", title: "Investment Returns", desc: "ROI, CAGR, dividend yield, and total return are the key metrics for evaluating investment performance. Always compare against a benchmark like the S&P 500." },
      { emoji: "📊", title: "Tax Planning", desc: "Sales tax, property tax, capital gains tax, and income tax all affect your real returns. Understanding marginal vs. effective tax rates is crucial for financial planning." },
      { emoji: "🎯", title: "Goal-Based Planning", desc: "Retirement (FIRE), savings goals, net worth tracking — define your target, calculate the monthly savings needed, and track progress over time." },
      { emoji: "📉", title: "Inflation & Purchasing Power", desc: "Your money loses value every year. At 3% inflation, $100 today will only buy $74 worth of goods in 10 years. Always calculate real (inflation-adjusted) returns." },
    ],
    tutorialTitle: "Personal Finance Workflow: From Budget to Financial Freedom",
    tutorial: [
      { title: "Know Your Numbers", desc: "Start with Net Worth Calculator to understand where you stand. Then use Budget Calculator to track monthly cash flow." },
      { title: "Plan Your Goals", desc: "Use Savings Goal Calculator for short-term targets, Retirement Calculator for long-term planning, and FIRE Calculator to explore early retirement." },
      { title: "Optimize Debt", desc: "Use Loan Comparison Calculator to evaluate refinancing offers. Early Payoff Calculator shows how extra payments slash interest costs." },
      { title: "Grow Wealth", desc: "Use Compound Interest Calculator to model investment growth. ROI Calculator and Stock Return Calculator track actual performance." },
      { title: "Protect & Review", desc: "Use Inflation Calculator to understand purchasing power erosion. Review net worth quarterly and adjust contributions annually." },
    ],
    tips: [
      "The 50/30/20 budget rule: 50% needs, 30% wants, 20% savings/debt repayment. Use our budgeting tools to see if you're on track.",
      "For retirement: aim to save 15% of pre-tax income (including employer match). At 7% return, this replaces ~70% of pre-retirement income over a 40-year career.",
      "When comparing loans, always use APR (not interest rate). APR includes fees and gives the true annual cost. A 6.5% loan with $0 fees beats a 6.0% loan with $5,000 in fees.",
      "The 2026 401(k) contribution limit is $23,000 ($30,500 if 50+). IRA limit is $7,000 ($8,000 catch-up). Max these before taxable investing.",
    ],
    faq: [
      { q: "Are these financial calculators accurate?", a: "Yes — all calculators use standard financial formulas (compound interest, loan amortization per Regulation Z, CAGR, etc.) with 2026 tax rates and limits. They match results from Excel financial functions (FV, PMT, RATE, NPER)." },
      { q: "Do I need to create an account to use the calculators?", a: "No — all calculators are free, instant, and require no signup. Your financial data stays in your browser and is never sent to any server." },
      { q: "Can these calculators replace a financial advisor?", a: "These tools are educational and planning aids — they're excellent for understanding concepts and running scenarios. For complex situations (estate planning, tax strategy, retirement income planning), consult a qualified financial advisor." },
    ],
  },

  'trade': {
    title: "Trade & Tariff Tools — Import Cost, Duty & Landed Cost Calculators",
    intro: "International trade is complex — tariffs, customs duties, freight costs, and currency fluctuations can swing your profit margins by 20% or more. Our trade tools help importers, e-commerce sellers, supply chain managers, and customs brokers calculate true landed costs, compare FOB vs. CIF pricing, assess tariff impacts, and hedge currency risk. With 2026's dynamic trade environment (Section 301 tariffs at elevated levels, shifting supply chains, and volatile ocean freight rates), accurate cost calculation is not optional — it's the difference between profit and loss on every shipment.",
    conceptsTitle: "International Trade Fundamentals",
    concepts: [
      { emoji: "🚢", title: "Incoterms (FOB, CIF, EXW)", desc: "Incoterms define who pays for what in international shipping. FOB means seller loads onto ship; CIF includes freight and insurance. Understanding Incoterms prevents costly misunderstandings." },
      { emoji: "📋", title: "HS Codes & Tariff Classification", desc: "Every product has a Harmonized System (HS) code that determines its duty rate. Correct classification is critical — wrong codes can mean underpaying (penalties) or overpaying (wasted money)." },
      { emoji: "💵", title: "Customs Valuation", desc: "Duties are calculated on CIF value (cost + insurance + freight), not FOB. This is the most common customs mistake — undervaluing goods by using the wrong base." },
      { emoji: "📊", title: "Tariff Engineering", desc: "Strategic product design, sourcing shifts, and Free Trade Agreement utilization can legally reduce duty exposure by 50% or more." },
    ],
    tutorialTitle: "Import Cost Calculation Workflow",
    tutorial: [
      { title: "Get Supplier Quote", desc: "Suppliers typically quote FOB (their local port). Use FOB/CIF Converter to add estimated freight and insurance for the CIF value." },
      { title: "Calculate Duties", desc: "Use Import Duty Calculator — enter CIF value, find your product's duty rate (check hts.usitc.gov for US), and compute customs duty." },
      { title: "Add All Costs", desc: "Use Landed Cost Calculator — add freight, insurance, duty, VAT/GST, brokerage, port fees, and inland transportation for the true total." },
      { title: "Model Scenarios", desc: "Use Tariff Impact Calculator to model 'what if' scenarios — rate changes, supplier switches, or FTA utilization." },
      { title: "Hedge Currency Risk", desc: "Use Currency Hedge Calculator if paying in foreign currency. A 5% FX move can wipe out your margin. Forward contracts lock in rates." },
    ],
    tips: [
      "Always get actual freight quotes. A 40ft container Asia→US West Coast costs $1,800-$3,000 in 2026; Asia→Europe is $2,000-$4,000. Rates fluctuate weekly.",
      "Marine insurance costs 0.1-0.3% of cargo value — incredibly cheap protection against total loss. Never ship uninsured.",
      "Section 301 tariffs on many Chinese goods remain at 19-25% in 2026 ON TOP of normal duty rates. Factor these into your landed cost or you'll underprice by 20%+.",
      "Free Trade Agreements (USMCA, KORUS, etc.) can eliminate duties entirely. Check if your product qualifies before assuming the standard rate applies.",
    ],
    faq: [
      { q: "What's the difference between FOB and CIF?", a: "FOB (Free On Board): seller pays costs until goods are loaded onto the vessel. CIF (Cost, Insurance, Freight): seller pays freight and insurance to the destination port. Customs duties are calculated on CIF value, not FOB — a common and costly mistake." },
      { q: "How do I find my product's HS code?", a: "Search the Harmonized Tariff Schedule at hts.usitc.gov (US). The first 6 digits are globally standardized; remaining digits vary by country. When in doubt, hire a customs broker — classification errors are expensive." },
    ],
  },

  health: {
    title: "Health & Fitness Calculators — BMI, TDEE, Body Fat, Heart Rate & More",
    intro: "Health calculators translate your body measurements into actionable fitness and wellness insights. From basic BMI screening to advanced TDEE (calorie) calculations, body fat estimation, heart rate zone training, and sleep cycle optimization — these tools help you understand your body, set realistic goals, and track progress. Unlike fitness apps that require accounts and subscriptions, our calculators are instant, private, and free. All calculations use clinically validated formulas (Mifflin-St Jeor for BMR, US Navy method for body fat, Karvonen for heart rate zones). Remember: these are screening and educational tools — always consult healthcare professionals for medical advice.",
    conceptsTitle: "Health Metrics Explained",
    concepts: [
      { emoji: "⚖️", title: "BMI (Body Mass Index)", desc: "A quick weight-to-height screening tool. BMI <18.5 underweight, 18.5-24.9 normal, 25-29.9 overweight, 30+ obese. Does NOT account for muscle mass — athletes may have high BMI but low body fat." },
      { emoji: "🔬", title: "Body Fat Percentage", desc: "A more meaningful metric than BMI. US Navy method uses circumference measurements. Healthy ranges: men 10-20%, women 18-28%. Essential fat: men 2-5%, women 10-13%." },
      { emoji: "🔥", title: "TDEE (Total Daily Energy Expenditure)", desc: "Your total daily calorie burn. Eat below TDEE to lose weight, at TDEE to maintain, above to gain. Calculated as BMR × activity factor. The foundation of all weight management." },
      { emoji: "💪", title: "Macronutrients", desc: "Protein (4 cal/g), carbs (4 cal/g), fat (9 cal/g). Optimal split depends on goals: higher protein for cutting, higher carbs for endurance, balanced for maintenance." },
      { emoji: "❤️", title: "Heart Rate Zones", desc: "Five training zones based on max HR. Zone 2 (60-70%) = fat burning and endurance base. Zone 4-5 (80-100%) = performance and VO2 max. The 80/20 rule: 80% easy, 20% hard." },
      { emoji: "😴", title: "Sleep Science", desc: "90-minute sleep cycles. Waking mid-cycle causes grogginess. Time sleep in 90-minute blocks for natural awakening. Adults need 7-9 hours (4.5-6 cycles)." },
    ],
    tutorialTitle: "Fitness Planning: From Assessment to Results",
    tutorial: [
      { title: "Assess Baseline", desc: "Use BMI, Body Fat, and Ideal Weight calculators to understand where you are. Take circumference measurements with a flexible tape measure." },
      { title: "Calculate Your Numbers", desc: "Use TDEE Calculator to find maintenance calories. Then use Macro Calculator to set protein/carb/fat targets based on your goal (cut, maintain, bulk)." },
      { title: "Plan Training", desc: "Use Heart Rate Zone Calculator to find your training zones. Structure workouts: 80% Zone 2 (aerobic base), 20% Zones 4-5 (intensity)." },
      { title: "Track Recovery", desc: "Use Sleep Cycle Calculator to optimize bedtimes. Use Water Intake Calculator for hydration. Recovery is where gains happen." },
      { title: "Monitor Progress", desc: "Re-measure every 2-4 weeks. Recalculate TDEE every 10-15 lbs lost. Body measurements (waist, hips) often show progress when the scale doesn't." },
    ],
    tips: [
      "TDEE calculators provide estimates — track your weight and calorie intake for 2-3 weeks to find your actual maintenance calories, then adjust.",
      "The US Navy body fat method is accurate within 3-4% of DEXA. Measure first thing in the morning before eating, with help from another person for accuracy.",
      "Zone 2 training (able to hold a conversation but slightly breathless) builds mitochondrial density. This is the 'metabolic foundation' that makes everything else work better.",
      "Sleep is the most underrated fitness tool. One night of poor sleep reduces testosterone, increases cortisol, and impairs glucose metabolism. Prioritize 7+ hours.",
    ],
    faq: [
      { q: "Which body fat measurement method is most accurate?", a: "DEXA scan is the gold standard (within 1-2%). US Navy circumference method is accurate within 3-4% for most people. Bioelectrical impedance (smart scales) can vary 5-8% based on hydration. Use the same method consistently for tracking trends." },
      { q: "How many calories should I eat to lose weight?", a: "Subtract 300-500 calories from your TDEE for sustainable weight loss (~0.5-1 lb/week). Never drop below BMR (your basal metabolic rate). Crash dieting below BMR causes muscle loss and metabolic adaptation. Recalculate every 10-15 lbs lost." },
    ],
  },

  education: {
    title: "Education Tools — GPA, Grade, Scientific Calculator & Learning Utilities",
    intro: "Academic success requires the right tools. Our education calculators help students calculate GPAs, determine final exam scores needed, solve complex math problems, and understand statistical concepts. From elementary arithmetic to college-level statistics, these tools support learning across all levels. Teachers use them to demonstrate concepts; students use them to check work and plan study strategies. All tools are free, require no account, and work on any device — perfect for classroom use.",
    conceptsTitle: "Academic Success Toolkit",
    concepts: [
      { emoji: "📝", title: "GPA Calculation", desc: "Grade Point Average on 4.0 scale. Weighted GPA (+1.0 for AP/IB) can exceed 4.0. Colleges typically recalculate using their own formula — official GPA is on your transcript." },
      { emoji: "🎯", title: "Grade Planning", desc: "Calculate the exact score needed on remaining assignments to reach your target grade. Prioritize high-weight categories (finals, projects) for maximum grade impact." },
      { emoji: "🔢", title: "Mathematics Tools", desc: "Scientific calculator for trig/log/exponents, graphing calculator for function visualization, statistics calculator for data analysis, probability calculator for combinatorics." },
      { emoji: "📚", title: "Study Skills", desc: "The Pomodoro Technique (25-min focus blocks) improves retention. Active recall beats re-reading. Spaced repetition optimizes long-term memory." },
    ],
    tutorialTitle: "Semester Success Strategy",
    tutorial: [
      { title: "Start Strong", desc: "Calculate your target GPA for the semester. Break down each course's grading weights. Know which assignments matter most." },
      { title: "Track Progress", desc: "Use GPA Calculator after each major assignment. Use Grade Calculator mid-semester to identify which courses need more focus." },
      { title: "Plan Study Time", desc: "Use Pomodoro Timer for focused study sessions. Allocate more time to high-weight assignments identified by the Grade Calculator." },
      { title: "Final Push", desc: "Use Grade Calculator during finals to determine exact scores needed. Focus energy where it will change your letter grade." },
    ],
    tips: [
      "A single C in a 4-credit course impacts GPA more than a C in a 1-credit course. Allocate study time proportional to credit hours.",
      "Raising a low GPA is mathematically hard: a 2.5 after 60 credits requires 3.5 average in the next 60 just to reach 3.0.",
      "Many graduate programs look at 'last 60 credits' GPA rather than cumulative. An upward trend matters more than the absolute number.",
      "Use the Grade Calculator to check if your target is mathematically possible. If the needed final score exceeds 100%, focus on extra credit or accept the outcome.",
    ],
    faq: [
      { q: "How is weighted GPA different from unweighted?", a: "Unweighted GPA uses 4.0 scale (A=4.0 regardless of course). Weighted GPA adds points for advanced courses: typically +0.5 for honors, +1.0 for AP/IB/dual-enrollment. A student taking AP courses can exceed 4.0 weighted." },
      { q: "What score do I need on my final exam?", a: "Enter your current grades and category weights into the Grade Calculator. It solves: Needed_Final = (Target − Σ(Completed_Weight × Score)) ÷ Remaining_Weight. If the result exceeds 100%, the target isn't mathematically possible." },
    ],
  },

  cooking: {
    title: "Cooking Calculators & Kitchen Tools — Recipe Conversion, Cooking Times & Ratios",
    intro: "Cooking is equal parts art and science. Our kitchen tools handle the science: recipe scaling, cooking time estimation, baker's percentages, coffee ratios, calorie calculation, and ingredient substitutions. Whether you're doubling a cake recipe for a party, converting a family recipe from metric, timing the perfect roast, or figuring out substitutions for missing ingredients, these calculators eliminate the mental math and reduce kitchen disasters. Perfect for home cooks, bakers, meal preppers, and anyone who's ever panicked mid-recipe because they're out of eggs.",
    conceptsTitle: "Kitchen Science Essentials",
    concepts: [
      { emoji: "🍞", title: "Baker's Percentages", desc: "All ingredients expressed relative to flour weight (flour = 100%). A dough with 70% hydration behaves the same whether making 500g or 50kg. The professional baker's scaling system." },
      { emoji: "☕", title: "Coffee Brewing Ratios", desc: "SCA Golden Ratio: 1g coffee per 16-18g water. Varies by method: espresso 1:2-3, pour-over 1:15-17, French press 1:13-15, cold brew concentrate 1:4-8." },
      { emoji: "🥩", title: "Cooking Time Science", desc: "Internal temperature, not clock time, determines doneness. Carryover cooking adds 5-10°F during rest. USDA safe temps: poultry 165°F, ground meat 160°F, pork 145°F." },
      { emoji: "📐", title: "Recipe Scaling Math", desc: "Not all ingredients scale linearly. Spices and leavening agents need less than proportional increase when scaling 3×+. Eggs round to nearest whole number." },
    ],
    tutorialTitle: "Recipe Success: From Pinterest to Plate",
    tutorial: [
      { title: "Scale the Recipe", desc: "Use Recipe Converter to adjust servings. If halving a recipe with 3 eggs, beat them and measure half by weight (~75g for 3 eggs)." },
      { title: "Check Ratios", desc: "Use Baker's Percentage Calculator for bread, Coffee Ratio Calculator for brewing, or Food Calorie Calculator for nutrition tracking." },
      { title: "Calculate Timing", desc: "Use Cooking Time Calculator — enter weight, cooking method, and desired doneness. Always verify with a meat thermometer." },
      { title: "Handle Substitutions", desc: "Use Ingredient Substitution Calculator if missing an ingredient. Remember: baking is chemistry — substitutions affect texture and rise." },
    ],
    tips: [
      "Always weigh ingredients for baking — 1 cup of flour can vary from 120-150g depending on how you scoop. A $20 kitchen scale is the best baking investment.",
      "The carryover cooking effect: remove meat 5-10°F BELOW target temp. It will rise during rest. Cutting immediately = dry meat (juices haven't redistributed).",
      "For coffee: water at 195-205°F (90-96°C). Too hot = bitter extraction. Too cold = sour, under-extracted. A gooseneck kettle gives pour-over control.",
      "Baking powder doesn't scale linearly. When doubling a cake recipe, use 1.5-1.75× the baking powder, not 2×. Otherwise your cake may over-rise and collapse.",
    ],
    faq: [
      { q: "Can I just double all ingredients in a recipe?", a: "For savory cooking (soups, stews): generally yes, but season gradually. For baking: be cautious — leavening (baking powder/soda) and spices don't scale linearly." },
      { q: "What's the best egg substitute for baking?", a: "Depends on the recipe function: flax egg (binding, for cookies/muffins), applesauce (moisture, for cakes), commercial egg replacer (all-purpose), aquafaba/chickpea water (meringues/foam). No single substitute works for everything." },
    ],
  },

  travel: {
    title: "Travel Calculators — Budget, Fuel Cost, Time Zone & Trip Planning Tools",
    intro: "Smart travel starts with smart planning. Our travel tools help you budget trip costs, calculate fuel expenses, convert time zones for international meetings, estimate arrival times, and track travel expenses. Whether you're planning a weekend road trip, a month-long backpacking adventure, or coordinating a global remote team across time zones, these calculators provide the numbers you need. All tools work offline-capable — perfect for on-the-go planning. No signup required.",
    conceptsTitle: "Travel Planning Essentials",
    concepts: [
      { emoji: "💰", title: "Trip Budgeting", desc: "Major cost categories: flights (30-40%), accommodation (25-35%), food (15-20%), activities (10-15%), transport (5-10%). Always add 15% contingency for the unexpected." },
      { emoji: "⛽", title: "Fuel Cost Planning", desc: "Fuel consumption increases 15-20% at 75 mph vs. 55 mph. Aerodynamic drag scales with speed squared — every 5 mph over 60 costs more than you think." },
      { emoji: "🕐", title: "Time Zone Management", desc: "38 time zones worldwide. DST varies by country. The 'golden hour' for global meetings: 8-9am PT = 4-5pm UK (only US→Europe overlap)." },
      { emoji: "🚗", title: "Mileage & Reimbursement", desc: "IRS business mileage rate: ~70¢/mile for 2026. Commuting is NOT deductible. Travel between work sites IS. Accurate mileage logs are essential for tax compliance." },
    ],
    tutorialTitle: "Trip Planning in 5 Steps",
    tutorial: [
      { title: "Set Your Budget", desc: "Use Travel Budget Calculator with your destination, duration, and travel style. It estimates per-category costs based on regional averages." },
      { title: "Plan Transportation", desc: "Use Fuel Cost Calculator for road trips (compare vehicles for efficiency). Use Mileage Calculator for business trips and reimbursement." },
      { title: "Handle Time Zones", desc: "Use Time Zone Converter for international meetings and flights. Always confirm arrival times in LOCAL time. Use ETA Calculator for road trip planning." },
      { title: "Book with Confidence", desc: "Use Currency Converter for international payments. Compare total costs (not just sticker prices) across booking platforms." },
      { title: "Track & Adjust", desc: "Track actual spending vs. budget during travel. Adjust future days based on actual spending patterns. Share budget with travel companions." },
    ],
    tips: [
      "Check ATM withdrawal limits and foreign transaction fees before traveling. A no-foreign-transaction-fee credit card saves 2-3% on every international purchase.",
      "Travel insurance costs 4-10% of trip cost. One medical evacuation without insurance can cost $50,000-100,000. It's the most important 'maybe I won't need it' purchase.",
      "For road trips: real-world average speed is 50-55 mph despite 70+ mph highways. Stops, construction, and the fact you're not driving exactly the speed limit for 8 hours straight all add up.",
      "Google Flights 'flexible dates' view and Tuesday/Wednesday departures typically save 10-25% on flights. Book 2-5 months ahead for international, 1-3 months for domestic.",
    ],
    faq: [
      { q: "How much should I budget per day for travel?", a: "Rough daily estimates: Southeast Asia $40-80, Eastern Europe $60-120, Western Europe $100-200, US/Canada $150-300, Japan/Australia $120-250. Budget vs. mid-range vs. luxury can halve or double these." },
      { q: "How do I schedule meetings across multiple time zones?", a: "Use the Time Zone Converter. The only reliable US→Europe→Asia overlap is very limited. Rotate meeting times to share the burden of early/late calls fairly across your global team." },
    ],
  },

  'real-estate': {
    title: "Real Estate Calculators — Mortgage, Rent vs Buy, Property Tax & Home Value Tools",
    intro: "Real estate decisions involve the largest financial transactions most people ever make. Our calculators help homebuyers estimate mortgage payments, compare renting vs. buying, calculate property taxes, understand home equity, and plan down payments. Whether you're a first-time buyer navigating mortgage options, a homeowner considering refinancing, or an investor analyzing rental properties, these tools provide the numbers behind the decisions. All calculators use 2026 rates and conform to standard lending formulas (amortization per Regulation Z, PMI calculations, debt-to-income ratios).",
    conceptsTitle: "Real Estate Fundamentals",
    concepts: [
      { emoji: "🏠", title: "Mortgage Mechanics", desc: "Monthly payment = P&I (principal + interest) + T (property tax) + I (insurance) = PITI. PMI required if down payment <20%. Amortization front-loads interest in early years." },
      { emoji: "📊", title: "Rent vs. Buy Analysis", desc: "The 5-year rule: stay less than 5 years, renting usually wins (avoid 8-10% round-trip transaction costs). Unrecoverable ownership costs: mortgage interest + property tax + maintenance + transaction costs." },
      { emoji: "💰", title: "Home Equity", desc: "Equity = market value − mortgage balance. The average US homeowner has ~65-70% equity. LTV <80% eliminates PMI. HELOCs tap equity but convert unsecured to secured debt." },
      { emoji: "📋", title: "Closing Costs", desc: "2-5% of purchase price beyond down payment. Includes lender fees, appraisal, title search, attorney, prepaid taxes/insurance. Budget $8,000-$20,000 on a $400,000 home." },
    ],
    tutorialTitle: "Home Buying: From Search to Closing",
    tutorial: [
      { title: "Know Your Budget", desc: "Use Mortgage Calculator to estimate monthly payment. The 28/36 rule: housing ≤28% gross income, total debt ≤36%." },
      { title: "Save for Down Payment", desc: "Use Down Payment Calculator. 20% avoids PMI ($100-200/month savings). But 3-5% down is increasingly common for first-timers (FHA, conventional 97)." },
      { title: "Compare Financing", desc: "Use Loan Comparison Calculator for multiple offers. Compare APR (not interest rate). Use Rent vs Buy Calculator to confirm buying is right for you." },
      { title: "Understand Taxes", desc: "Use Property Tax Calculator. Rates range from 0.3% (Hawaii) to 2.2% (New Jersey). Tax deductions limited by $10K SALT cap." },
      { title: "Build Equity", desc: "Use Home Equity Calculator to track. Make extra principal payments to accelerate equity and reduce total interest." },
    ],
    tips: [
      "Get pre-approved before house hunting. Pre-approval (hard credit pull) carries more weight with sellers than pre-qualification (soft estimate).",
      "The 'right' time to buy is when you're financially ready and plan to stay 5+ years — not when rates are low. You can refinance rates but can't recover transaction costs.",
      "Bi-weekly mortgage payments (half payment every 2 weeks) = 13 full payments/year = ~4-5 years off a 30-year mortgage through interest savings.",
      "Don't deplete savings for a 20% down payment. Keeping 3-6 months of emergency fund after closing is more important than avoiding PMI.",
    ],
    faq: [
      { q: "Do I really need 20% down to buy a house?", a: "No. Median first-time buyer puts down 7-8%. FHA loans require 3.5%, conventional as low as 3% for first-timers, VA/USDA 0%. 20% avoids PMI and gives the best rates but isn't required." },
      { q: "Is renting throwing money away?", a: "No. Renting buys shelter, flexibility, and freedom from maintenance/property risk. Unrecoverable ownership costs can exceed rent for 5-10 years, especially at 6%+ mortgage rates. The answer depends on your timeline, market, and personal circumstances." },
    ],
  },

  construction: {
    title: "Construction Calculators — Concrete, Flooring, Paint, Roofing & Lumber Estimators",
    intro: "Construction projects live or die by accurate material estimation. Order too little and work stops mid-project. Order too much and you waste hundreds or thousands on unused materials sitting in your garage. Our construction calculators help DIY homeowners, contractors, and builders estimate exactly what they need: concrete for slabs and footings, paint for walls, flooring for rooms, roofing shingles, lumber for framing, and more. Each calculator includes standard waste factors (5-15% depending on material) and industry-standard formulas. Perfect for project planning, contractor quote verification, and DIY budget estimation.",
    conceptsTitle: "Construction Estimation Essentials",
    concepts: [
      { emoji: "🧱", title: "Concrete Volume", desc: "Ordered in cubic yards (1 yd³ = 27 ft³). Ready-mix minimum: 1 yard. Short load fee if <3-4 yards. For small jobs, bagged concrete is cheaper despite higher per-yard material cost." },
      { emoji: "🪵", title: "Lumber & Framing", desc: "Nominal vs. actual dimensions: 2×4 = 1½\"×3½\". Board feet = (T\"×W\"×L\")÷144. Stud spacing: 16\" OC structural, 24\" OC non-load-bearing." },
      { emoji: "🎨", title: "Paint Coverage", desc: "One gallon covers 350-400 sq ft. Textured/porous surfaces reduce coverage 25-50%. Two coats for color changes, one for same-color refresh." },
      { emoji: "🏗️", title: "Roofing Squares", desc: "1 square = 100 sq ft. Roof area ≠ footprint area × pitch multiplier. Standard waste: 10-15% for gable, 15-20% for complex/hip roofs." },
    ],
    tutorialTitle: "DIY Project: From Idea to Materials List",
    tutorial: [
      { title: "Measure & Calculate", desc: "Measure room/wall dimensions accurately. Use Flooring Calculator, Paint Calculator, or Concrete Calculator based on your project type." },
      { title: "Add Waste Factor", desc: "Standard: 5-10% for simple layouts, 15-20% for complex patterns (herringbone, diagonal). Always round up — running out mid-project costs time, not just money." },
      { title: "Get Quotes", desc: "Use estimates to get 3+ contractor quotes. Knowing the material quantity prevents overcharging. Check if quotes include materials or labor only." },
      { title: "Order Smart", desc: "Buy all material at once from the same lot/batch. Color/dye lots vary. Keep 1-2 extra boxes/tiles for future repairs — discontinued patterns are impossible to match." },
    ],
    tips: [
      "Concrete weighs ~4,000 lbs/yard. A full truck carries ~10 yards. Make sure your site is accessible — concrete trucks need 30+ feet of clearance.",
      "For paint: buy by the gallon for large areas. One gallon covers one 12×12 room with one coat. Primer reduces paint needed on new drywall by sealing porosity.",
      "Flooring: vinyl plank is the most DIY-friendly (click-lock, utility knife cuts). Tile and hardwood are harder and often worth professional installation.",
      "Roofing: architectural shingles cost 15-20% more than 3-tab but last 25-30 years vs. 15-20. The premium is almost always worth it for longevity.",
    ],
    faq: [
      { q: "How much extra material should I order?", a: "Standard waste factors: paint 10%, flooring 5-15% (higher for complex patterns), concrete 10%, lumber 10-15%, roofing 10-20%. Always round up to the next full unit (gallon, box, yard)." },
      { q: "Can I install flooring over existing flooring?", a: "Depends on the material and condition. Vinyl plank can often go over existing vinyl/tile if flat. Hardwood needs a proper subfloor. Never install over carpet. Always check manufacturer specs." },
    ],
  },

  pets: {
    title: "Pet Calculators — Dog Age, Cat Age, Pet Calorie & Breed Mix Tools",
    intro: "Our pets depend on us for their health and wellbeing. These calculators help pet owners understand their companion's life stage, nutritional needs, and breed characteristics. From converting dog years to human years (using the latest epigenetic research, not the outdated 7:1 rule), to calculating daily calorie requirements for weight management, to exploring possible breed mixes — these tools support better pet parenting. Pet obesity affects 56% of dogs and 60% of cats in the US, making calorie awareness the single most impactful thing you can do for your pet's longevity.",
    conceptsTitle: "Pet Health Science",
    concepts: [
      { emoji: "🐕", title: "Canine Aging", desc: "Dogs age rapidly in years 1-2 (≈30 human years by age 2), then slow to ~5-7 human years per year. Small dogs live longer (15-20 years) than giant breeds (7-10). Size is the strongest lifespan predictor." },
      { emoji: "🐈", title: "Feline Longevity", desc: "Indoor cats live 12-18 years; outdoor cats 3-7. Year 1 = 15 human years, Year 2 = 24, each after adds 4. Senior at 11, geriatric at 15+." },
      { emoji: "🍖", title: "Pet Nutrition", desc: "RER = 70 × weight(kg)^0.75. DER = RER × life stage factor. Feeding guidelines on bags overestimate 20-30%. Treats should be ≤10% of daily calories." },
      { emoji: "🏥", title: "Preventive Care", desc: "Dental disease affects 80%+ of dogs and 50-75% of cats by age 3. Annual dental cleanings add years to life. Senior pets need vet checkups every 6 months." },
    ],
    tutorialTitle: "Pet Wellness Check",
    tutorial: [
      { title: "Know Their Life Stage", desc: "Use Dog Age or Cat Age Calculator to understand their human-equivalent age. This determines appropriate nutrition, exercise, and veterinary screening schedules." },
      { title: "Check Their Weight", desc: "Use Body Condition Score (BCS 1-9). Ideal: ribs felt with light fat cover, visible waist from above. Use Pet Calorie Calculator to determine proper portions." },
      { title: "Feed Appropriately", desc: "Use calorie results to measure food portions. Weigh food with a kitchen scale — cup measures are inconsistent. Adjust every 2-4 weeks based on weight trend." },
      { title: "Explore Their Heritage", desc: "Use Pet Breed Mix Calculator for fun breed guessing. For accuracy, DNA testing (Embark, Wisdom Panel) is the only reliable method." },
    ],
    tips: [
      "The #1 way to extend a cat's life: keep them indoors or provide a safe catio. Outdoor cats average 3-7 years vs. 12-18 for indoor cats.",
      "Pet food bag guidelines are based on intact, active animals. Most neutered pets need 20-30% fewer calories than the bag suggests. Weigh food, don't scoop.",
      "Dental health is the most overlooked aspect of pet care. By age 3, most pets have periodontal disease. Annual cleanings prevent kidney/heart complications from oral bacteria.",
      "Weight management is the single most impactful health intervention. Even modest weight loss (5-10%) significantly reduces arthritis pain and extends lifespan.",
    ],
    faq: [
      { q: "Is the '1 dog year = 7 human years' rule accurate?", a: "No. A 1-year-old dog ≈ 15 human years (not 7). A 2-year-old ≈ 24 (not 14). After year 2, each year ≈ 4-6 human years depending on breed size. The 7:1 rule significantly underestimates early aging and overestimates later aging." },
      { q: "How do I know if my pet is overweight?", a: "Body Condition Score (BCS): you should be able to feel ribs with light fat cover (like the back of your hand). Look for a visible waist from above and an abdominal tuck from the side. If you can't feel ribs, your pet is overweight." },
    ],
  },

  automotive: {
    title: "Automotive Calculators — Fuel Economy, Tire Size, Car Loan & Depreciation Tools",
    intro: "Car ownership involves ongoing calculations — fuel costs, tire compatibility, loan payments, and depreciation. Our automotive tools help drivers make informed decisions about vehicle purchases, maintenance, and operating costs. Whether you're comparing the fuel economy of two cars, checking if larger tires will fit, calculating your car's depreciation curve, or estimating the true cost of a car loan after interest — these calculators provide clear, actionable numbers. Perfect for car buyers, enthusiasts, fleet managers, and anyone who wants to understand what their car really costs.",
    conceptsTitle: "Car Ownership Economics",
    concepts: [
      { emoji: "⛽", title: "Fuel Economy", desc: "EPA estimates are lab-tested. Real-world MPG is 10-20% lower. MPG drops ~15% at 70 vs. 55 mph. Winter fuel economy is worse (cold starts, winter blends)." },
      { emoji: "🛞", title: "Tire Sizing", desc: "Decode sidewall markings: P225/65R17 = 225mm width, 65% aspect ratio, 17\" rim. Plus-sizing keeps overall diameter within 3% of original for speedometer accuracy." },
      { emoji: "📉", title: "Vehicle Depreciation", desc: "New cars lose 20-30% in year 1, 50-60% by year 5. Best resale: Toyota, Honda, Porsche. Worst: luxury sedans. Used car sweet spot: 3-4 years old." },
      { emoji: "💳", title: "Auto Financing", desc: "APR varies by credit score: prime (720+) 4-6%, subprime (600-659) 12-18%. The 20/4/10 rule: 20% down, 4-year max loan, total car costs <10% of income." },
    ],
    tutorialTitle: "Car Buying: Research Before the Dealership",
    tutorial: [
      { title: "Calculate True Cost", desc: "Use Car Loan Calculator to see total interest. A $35K loan at 6% for 72 months costs $6,800 in interest vs. $5,600 for 60 months." },
      { title: "Compare Fuel Costs", desc: "Use Fuel Economy Calculator to compare two vehicles. A 10 MPG improvement saves $500+/year at current fuel prices." },
      { title: "Check Depreciation", desc: "Use Car Depreciation Calculator. Buying 3-year-old CPO vs. new can save 40-50% of the purchase price while getting a modern, low-mileage vehicle." },
      { title: "Verify Modifications", desc: "Use Tire Size Calculator before upsizing wheels. Speedometer error at 5% means at indicated 60 mph you're doing 63 — ticket territory." },
    ],
    tips: [
      "Always get pre-approved by a bank or credit union before visiting the dealer. You'll have a rate to compare — dealer financing may beat it, but you'll know.",
      "The '20/4/10 rule' for responsible car buying: 20% down, 4-year (48-month) loan maximum, total car expenses under 10% of gross monthly income.",
      "Tire pressure affects fuel economy: under-inflated tires reduce MPG by 3-5%. Check pressure monthly (when tires are cold). Proper inflation also extends tire life.",
      "Credit unions typically offer 1-2% lower auto loan rates than banks. Membership is often easy to obtain (geographic, employer, or association-based).",
    ],
    faq: [
      { q: "New vs. used — which is the better value?", a: "Used (3-4 years old) is almost always the better financial value — someone else absorbed 40-50% depreciation. You get a modern car with remaining warranty at roughly half the original price. Buy new if you need the latest safety/tech features or plan to keep it 10+ years." },
      { q: "Can I fit bigger tires on my car?", a: "Check: (1) overall diameter within 3% of original (speedometer/ABS accuracy), (2) width fits without rubbing at full lock and suspension compression, (3) tires fit existing rim width range. Use our Tire Size Calculator to verify." },
    ],
  },

  business: {
    title: "Business Calculators — Profit Margin, Break-Even, CPM, Invoice & ROI Tools",
    intro: "Running a business requires constant number-crunching. Our business calculators help entrepreneurs, freelancers, and managers make data-driven decisions: calculate profit margins to price products correctly, determine break-even points for new ventures, compute advertising CPM for marketing budgets, generate professional invoices, and measure ROI on investments. Whether you're validating a startup idea, optimizing e-commerce pricing, or tracking freelance billable hours, these tools eliminate spreadsheet complexity and provide instant answers. All calculators use standard business formulas accepted in finance and accounting.",
    conceptsTitle: "Business Metrics That Matter",
    concepts: [
      { emoji: "📊", title: "Profit Margin Analysis", desc: "Gross margin = (Price − COGS)/Price. Net margin accounts for ALL costs. Software targets 70-80% gross; retail 30-50%; restaurants 60-70% gross but only 5-10% net." },
      { emoji: "🎯", title: "Break-Even Point", desc: "Units needed = Fixed Costs ÷ (Price − Variable Cost). The simplest test of business viability. If break-even volume exceeds market size, the model doesn't work." },
      { emoji: "📈", title: "Return on Investment", desc: "ROI% = (Gain − Cost)/Cost × 100. Always annualize for fair comparisons. Factor in ALL costs: fees, taxes, and time. Cash-on-cash return for real estate." },
      { emoji: "💼", title: "Freelance Economics", desc: "Effective hourly rate = (Income − Expenses − Taxes) ÷ Total Hours. Billable hours are only ~60-70% of work time. Price accordingly." },
    ],
    tutorialTitle: "Business Planning: Idea to Profitability",
    tutorial: [
      { title: "Validate the Model", desc: "Use Break-Even Calculator. How many units must you sell to cover costs? Is that volume achievable in your market?" },
      { title: "Price for Profit", desc: "Use Profit Margin Calculator. Know your COGS, then set prices to hit target margins. A 50% markup = 33% margin — don't confuse them." },
      { title: "Measure Marketing", desc: "Use CPM Calculator to evaluate ad costs. Combine with conversion rates to calculate customer acquisition cost (CAC)." },
      { title: "Track Performance", desc: "Use ROI Calculator for investments, Invoice Hours Calculator for billable work. Review financial metrics monthly." },
    ],
    tips: [
      "The difference between markup and margin catches many new business owners. 50% markup on a $60 product = $90 selling price, but the margin is only 33% ($30/$90).",
      "A small discount has a big margin impact: if your margin is 30%, a 20% discount requires selling 300% more units just to maintain the same profit.",
      "For freelancers: your billable rate should be 2-3× your desired hourly wage. Half goes to taxes, expenses, and unbillable time (marketing, admin, learning).",
      "CPM alone doesn't tell the story: a $20 CPM that converts at 5% is cheaper per customer than a $2 CPM that converts at 0.1%. Always calculate CPA (cost per acquisition).",
    ],
    faq: [
      { q: "What's a good profit margin?", a: "Industry-dependent. Software: 70-80% gross margin. Retail: 30-50%. Restaurants: 5-10% net. Services/consulting: 30-50%. A 'good' net margin is anything above 10% in most industries." },
      { q: "How do I price my product?", a: "Cost-plus: COGS × (1 + desired markup). Then check market: what do competitors charge? Finally, value-based: what is it worth to the customer? The optimal price balances margin with volume." },
    ],
  },

  productivity: {
    title: "Productivity Tools — Pomodoro Timer, Stopwatch, Habit Tracker & Chronometer",
    intro: "Productivity isn't about working more hours — it's about working with focus and intention. Our productivity tools are designed around proven behavioral science: the Pomodoro Technique for focused work intervals, habit tracking for building consistency through visual streaks, time tracking for understanding where your hours actually go, and countdown timers for deadline management. All tools are free, require no account, and store data locally in your browser — your productivity data is private. Perfect for remote workers, students, freelancers, and anyone looking to make the most of their time.",
    conceptsTitle: "Productivity Science",
    concepts: [
      { emoji: "🍅", title: "The Pomodoro Technique", desc: "25-minute focused work blocks + 5-minute breaks. After 4 cycles, take 15-30 minutes. Works by making large tasks approachable ('just one pomodoro') and forcing regular recovery." },
      { emoji: "✅", title: "Habit Formation", desc: "Median time to habit formation: 66 days (not 21 — that's a myth). 'Don't break the chain' leverages loss aversion. Track 3-5 habits max to avoid overwhelm." },
      { emoji: "⏱️", title: "Time Awareness", desc: "Tracking time reveals the gap between perceived and actual time use. Most people underestimate time on email/social by 50%+. Measurement is the first step to improvement." },
      { emoji: "📊", title: "The 2-Minute Rule", desc: "If a task takes less than 2 minutes, do it immediately. For habits: define the smallest possible version — 'read one page' not 'read 30 minutes.' Make starting trivial." },
    ],
    tutorialTitle: "Better Productivity in 5 Days",
    tutorial: [
      { title: "Track Your Time", desc: "Use Chronometer to log how you actually spend your day for one week. No judgment — just data collection." },
      { title: "Identify Time Drains", desc: "Review the log. Which activities consumed time without producing value? These are your optimization targets." },
      { title: "Structure Focus Time", desc: "Use Pomodoro Timer with 25/5 intervals. During focus blocks: phone in another room, notifications off, single task only." },
      { title: "Build Key Habits", desc: "Use Habit Tracker with 3-5 habits. Check off daily. Don't break the chain twice — one miss is a slip, two is a new pattern." },
      { title: "Review & Iterate", desc: "Weekly review: which habits are sticking? Adjust targets. A modest habit maintained beats an ambitious one abandoned." },
    ],
    tips: [
      "The Pomodoro Technique works because 25 minutes is short enough to commit to without distraction ('I can ignore my phone for 25 minutes') and long enough to make real progress.",
      "For habit tracking: start with 3-5 habits max. The goal is consistency, not comprehensiveness. Add more only after the first batch is automatic (~2-3 months).",
      "Track completed pomodoros, not hours worked. 10 pomodoros (4 hours of focused work) is an extremely productive day — most knowledge workers average 2-3 hours of deep work daily.",
      "The Chronometer's greatest value is the 'reveal' — seeing that a task you thought took 15 minutes actually takes 40. Accurate time estimation is a learnable skill.",
    ],
    faq: [
      { q: "How long should my Pomodoro sessions be?", a: "Standard is 25 minutes, but adjust to your flow. Creative/coding work often benefits from 50-minute sessions (50/10). The key is the work/break rhythm, not the specific duration. Experiment to find your optimal interval." },
      { q: "How long does it take to form a habit?", a: "Median 66 days (range 18-254 days per a 2009 study). The '21 days' myth comes from a plastic surgeon's observation about patients adjusting to new faces, not habit formation. Focus on consistency, not the calendar." },
    ],
  },

  photography: {
    title: "Photography Calculators — DOF, Photo Print Size, PPI & Camera Tools",
    intro: "Great photography requires both artistic vision and technical precision. Our photography calculators handle the technical side: depth of field for creative focus control, print size optimization for gallery-quality output, PPI for display selection, and photo aspect ratio matching for perfect prints. Whether you're a professional photographer calculating hyperfocal distance for landscape sharpness, a hobbyist determining maximum print size from your camera's megapixels, or a designer matching display PPI for dual-monitor setups — these tools provide the numbers that make your images look their best.",
    conceptsTitle: "Photography Technical Fundamentals",
    concepts: [
      { emoji: "📷", title: "Depth of Field", desc: "Zone of acceptable sharpness. Controlled by aperture (f-stop), focal length, and focus distance. Wide aperture (f/1.4) = shallow DOF for portraits. Narrow (f/11) = deep DOF for landscapes." },
      { emoji: "🖨️", title: "Print Resolution", desc: "300 DPI for professional prints viewed at arm's length. 200 DPI for good quality larger prints. 150 DPI acceptable for posters/canvas viewed from distance. 12MP can print excellent 8×10\"." },
      { emoji: "📱", title: "Display PPI", desc: "Phone: 300-600+ PPI. Monitor: 90-220 PPI. Retina definition: ≥60 pixels per degree of visual angle. At 24\" viewing distance, ~220 PPI is 'retina' quality." },
      { emoji: "📐", title: "Aspect Ratios", desc: "3:2 (DSLR/mirrorless) → 4×6, 8×12, 16×24. 4:3 (Micro 4/3, phones) → 6×8, 12×16. Print size mismatch = forced cropping. Compose with final ratio in mind." },
    ],
    tutorialTitle: "From Camera to Print: Technical Workflow",
    tutorial: [
      { title: "Plan the Shot", desc: "Use Depth of Field Calculator to determine aperture. For landscapes: find hyperfocal distance for maximum sharpness. For portraits: calculate DOF for desired background blur." },
      { title: "Check Resolution", desc: "Use Photo Print Size Calculator. Enter image pixel dimensions → see maximum print size at 300/200/150 DPI. Verify before ordering expensive prints." },
      { title: "Match Aspect Ratio", desc: "Check if your image ratio (3:2, 4:3, 16:9) matches your print size. Mismatch = unwanted cropping. Compose loosely if ratio is uncertain." },
      { title: "Select Display", desc: "Use PPI Calculator when buying monitors. 27\" 4K = 163 PPI (needs scaling). 27\" 1440p = 109 PPI (comfortable at 100%). Match PPI for dual-monitor setups." },
    ],
    tips: [
      "DOF doubles when you: (1) double the f-number, (2) halve the focal length, or (3) double the focus distance. Understanding these relationships helps you control DOF intuitively.",
      "For sharp landscapes: focus at the hyperfocal distance and everything from half that distance to infinity is acceptably sharp. This is the landscape photographer's secret weapon.",
      "300 DPI is the gold standard because human vision resolves ~300 dots/inch at 12\" distance. Beyond 300 DPI, improvement is imperceptible. Large prints viewed from farther away need less DPI.",
      "Aspect ratio mismatch is the #1 cause of print disappointment. A 3:2 image printed at 8×10 (4:5 ratio) loses 17% of the image to cropping. Compose with the final ratio in mind.",
    ],
    faq: [
      { q: "How many megapixels do I need for a good print?", a: "8×10\" at 300 DPI: 2400×3000 = 7.2MP. 16×20\" at 200 DPI: 3200×4000 = 12.8MP. Most modern cameras (20MP+) can print up to 16×20\" at excellent quality. Large prints viewed from farther away need less resolution." },
      { q: "What aperture gives the sharpest image?", a: "Most lenses are sharpest 2-3 stops down from wide open ('the sweet spot,' typically f/5.6-f/8). Diffraction softens images beyond f/11-f/16 on high-resolution sensors. For maximum sharpness, avoid both extremes." },
    ],
  },

  environment: {
    title: "Environmental Calculators — Carbon Footprint, Solar ROI & Water Footprint",
    intro: "Understanding your environmental impact is the first step to reducing it. Our environmental calculators help you measure carbon emissions, evaluate solar panel investment returns, and understand your water footprint — both direct and virtual (embedded in products). These tools translate everyday choices into measurable impacts, helping you identify the most effective changes. Whether you're an individual tracking personal emissions, a homeowner evaluating solar panel ROI, or a student researching sustainability, these calculators provide data-backed insights. Perfect for environmentally conscious consumers, sustainability students, and anyone curious about their ecological footprint.",
    conceptsTitle: "Environmental Impact Fundamentals",
    concepts: [
      { emoji: "🏭", title: "Carbon Footprint", desc: "US average: ~16 tons CO₂e/year per person. Global average: ~4 tons. UN 2°C target: ~2 tons by 2050. Biggest personal levers: fly less, eat less beef, drive less, green electricity." },
      { emoji: "☀️", title: "Solar Economics", desc: "2026 installed cost: ~$2.50-3.50/watt before 30% federal tax credit. Payback period: 6-10 years. 25-year savings typically $15,000-$40,000. Net metering dramatically improves economics." },
      { emoji: "💧", title: "Water Footprint", desc: "Direct use: 80-100 gallons/day (US average). Virtual water: ~2,000 gallons/day embedded in food and products. 1 lb beef = 1,800 gallons. Diet is the biggest water lever." },
      { emoji: "♻️", title: "Reduction Hierarchy", desc: "Reduce > Reuse > Recycle. Reduction eliminates impact entirely. Offsetting is the last step after reduction, not a license to maintain current consumption." },
    ],
    tutorialTitle: "Reduce Your Footprint: A Practical Guide",
    tutorial: [
      { title: "Measure Your Baseline", desc: "Use Carbon Footprint Calculator and Water Footprint Calculator. Understanding your numbers is the first step. Most people are surprised by their virtual water use." },
      { title: "Target the Big Levers", desc: "The biggest personal carbon levers: (1) fly less, (2) eat less beef, (3) drive less/switch to EV, (4) green electricity. Focus here before worrying about plastic straws." },
      { title: "Evaluate Solar", desc: "Use Solar ROI Calculator. In sunny states with high electric rates, solar pays back in 6-8 years and provides 15+ years of free electricity after." },
      { title: "Track Progress", desc: "Recalculate annually. The trend matters more than any single number. Celebrate reductions — a 20% footprint reduction is a significant achievement." },
    ],
    tips: [
      "One transatlantic round-trip flight ≈ 1.6 tons CO₂e — 25% of the 2-ton annual target. Video-conferencing or combining trips can significantly reduce flight-related emissions.",
      "Diet change is the most accessible daily lever: beef has 20× the carbon footprint of plant proteins per gram. One less beef meal per week saves ~1,300 gallons of water.",
      "Solar panels degrade ~0.5%/year. After 25 years, they produce at ~88% of original output. Warranties guarantee 80-85% at year 25. Panels can last 30-40+ years.",
      "Carbon offsets vary in quality. Look for: additionality (wouldn't have happened anyway), permanence (won't be reversed), and verification (Gold Standard, Verra VCS). Prices: $15-30/ton for quality offsets.",
    ],
    faq: [
      { q: "What's the biggest thing I can do to reduce my carbon footprint?", a: "In order of impact: (1) fly less (one less transatlantic flight saves 1.6 tons), (2) eat less beef (going vegetarian saves ~1.5 tons/year), (3) switch to an EV (saves ~2-3 tons/year vs. gas car), (4) switch to green electricity (saves 1-3 tons/year depending on grid)." },
      { q: "Does solar really save money?", a: "In most US locations with good sun and high electricity rates: yes. The 30% federal tax credit + net metering typically yields 6-10 year payback. After payback, 15+ years of near-free electricity. Not ideal in heavily shaded or very low-electricity-rate areas." },
    ],
  },

  electrical: {
    title: "Electrical Calculators — Ohm's Law, Wire Size, LED Resistor & Resistor Color Code",
    intro: "Electrical calculations are fundamental to electronics, DIY electrical work, and engineering. Our electrical tools help you apply Ohm's Law, determine correct wire gauge for circuits, calculate LED current-limiting resistors, and decode resistor color bands. Whether you're an electrician sizing branch circuits per NEC code, a hobbyist building Arduino LED projects, or a student learning foundational electrical principles, these calculators provide instant, accurate results. All calculations follow standard electrical engineering formulas and 2026 NEC (National Electrical Code) guidelines.",
    conceptsTitle: "Electrical Engineering Basics",
    concepts: [
      { emoji: "⚡", title: "Ohm's Law", desc: "V = I × R — the most fundamental relationship in electricity. Voltage (pressure) = Current (flow) × Resistance (opposition). Power: P = V × I = I² × R = V² ÷ R." },
      { emoji: "🔌", title: "Wire Sizing (AWG)", desc: "14 AWG = 15A, 12 AWG = 20A, 10 AWG = 30A. Undersized wire = overheating = fire hazard. Voltage drop: keep <3% for branch circuits, <5% total." },
      { emoji: "💡", title: "LED Circuits", desc: "LEDs are current-driven — no resistor = instant burnout. R = (Vsupply − Vf) ÷ I. Parallel LEDs each need their own resistor. Resistor power rating ≥ 2× calculated dissipation." },
      { emoji: "🌈", title: "Resistor Color Code", desc: "4-band: 2 digits + multiplier + tolerance. 5-band: 3 digits + multiplier + tolerance. Mnemonic: BB ROY Great Britain Very Good Wife (0-9)." },
    ],
    tutorialTitle: "Electronics Project: From Schematic to Working Circuit",
    tutorial: [
      { title: "Calculate Values", desc: "Use Ohm's Law Calculator to find any unknown. Use LED Resistor Calculator for current-limiting resistors. Check power ratings." },
      { title: "Size Your Wires", desc: "Use Wire Size Calculator. Amperage determines gauge; distance determines upsizing for voltage drop. Always follow NEC ampacity tables." },
      { title: "Identify Components", desc: "Use Resistor Color Code Calculator to verify resistor values from band colors (or find band colors from values)." },
      { title: "Test Safely", desc: "Double-check all calculations before applying power. Use a multimeter to verify voltages and resistances. Start with low voltage for initial testing." },
    ],
    tips: [
      "Never use 14 AWG on a 20A breaker — it's a fire hazard. 14 AWG requires 15A breaker max. The breaker protects the wire, not the device.",
      "LEDs in parallel CANNOT share a single resistor. Slight Vf differences cause one LED to hog current, overheat, and fail. Each parallel LED needs its own resistor.",
      "Copper vs. aluminum wiring: aluminum needs 2 AWG sizes larger for the same current. Use antioxidant paste on all aluminum connections to prevent oxidation.",
      "For voltage drop on long runs: 12 AWG at 20A, 120V maxes out at ~50 feet before exceeding 3% drop. Longer runs need thicker wire or higher voltage.",
    ],
    faq: [
      { q: "Can I use 14 AWG for a 20-amp circuit?", a: "No. NEC requires minimum 12 AWG for 20A circuits. A 20A breaker protects against overload — 14 AWG could overheat before the breaker trips. This is a serious fire hazard." },
      { q: "How do I know which direction to read resistor color bands?", a: "The tolerance band (gold ±5%, silver ±10%, brown ±1%) is almost always at the end with a wider gap. Start reading from the opposite end. When in doubt, measure with a multimeter." },
    ],
  },

  pregnancy: {
    title: "Pregnancy Calculators — Due Date, Ovulation, Baby Growth & Child Cost Tools",
    intro: "Pregnancy and parenting involve countless milestones and decisions. Our pregnancy tools help expectant and new parents track important dates, understand fetal development timelines, and plan financially. From calculating your due date and fertile window to tracking baby growth percentiles and estimating the cost of raising a child — these calculators provide evidence-based information for one of life's biggest journeys. All tools use ACOG (American College of Obstetricians and Gynecologists) and WHO guidelines where applicable. Perfect for expectant parents, couples trying to conceive, and families planning for the future.",
    conceptsTitle: "Pregnancy & Parenting Essentials",
    concepts: [
      { emoji: "🤰", title: "Pregnancy Dating", desc: "40 weeks from last menstrual period (LMP). Only 4-5% deliver on due date — full term is 37-42 weeks. First trimester ultrasound provides most accurate dating (±5-7 days)." },
      { emoji: "📅", title: "Fertility Timing", desc: "Fertile window = 5 days before ovulation + ovulation day. Ovulation typically 14 days BEFORE next period (not after last). For couples under 35, 80% conceive within 6 months." },
      { emoji: "👶", title: "Baby Growth", desc: "WHO growth standards (0-2 years) based on breastfed infants. Percentiles: 5th-85th is normal range. Trend matters more than any single measurement — consistent percentile is ideal." },
      { emoji: "💰", title: "Child-Rearing Costs", desc: "USDA estimate: ~$310,000 to raise a child to age 18 (2026 adjusted, not including college). Childcare is the #1 variable cost ($0-$24K/year). Housing is the largest category (29%)." },
    ],
    tutorialTitle: "Pregnancy Planning Timeline",
    tutorial: [
      { title: "Track Your Cycle", desc: "Use Ovulation Calculator to identify fertile days. Combine with ovulation predictor kits (OPKs) for highest conception probability." },
      { title: "Calculate Due Date", desc: "Use Due Date Calculator from LMP. First ultrasound will confirm/adjust. Mark key prenatal visit and testing milestones." },
      { title: "Track Growth", desc: "Use Baby Growth Calculator at each well-baby visit. Plot weight, length, and head circumference percentiles. Consistent growth along the curve is the goal." },
      { title: "Plan Finances", desc: "Use Child Cost Calculator for budgeting. Open a 529 college savings account at birth — $100/month from birth grows to ~$38,000 by age 18 at 7% return." },
    ],
    tips: [
      "The 'two-week wait' (ovulation to expected period) is the most accurate window for early pregnancy testing. Testing too early produces false negatives.",
      "Pregnancy is counted from LMP, so you're '2 weeks pregnant' at conception and '4 weeks' at your missed period. This convention standardizes dating across all pregnancies.",
      "Baby growth charts: a baby consistently at the 15th percentile is likely healthy. A baby dropping from 50th to 15th needs investigation. The TREND is what matters.",
      "For child costs: the second child costs ~25% less due to hand-me-downs and sibling discounts. The largest savings come from childcare choices (daycare vs. nanny vs. stay-at-home).",
    ],
    faq: [
      { q: "How accurate is the due date?", a: "Only 4-5% deliver on the exact date. 80% deliver within 2 weeks (before or after). First-time mothers average 41 weeks + 1 day. Consider it a 'due month,' not a due date." },
      { q: "How long does it typically take to get pregnant?", a: "For healthy couples under 35: ~80% conceive within 6 months, 85-90% within 12 months. If under 35 and not pregnant after 12 months (or 6 months if over 35), consult a fertility specialist." },
    ],
  },

  gaming: {
    title: "Gaming Tools — Poker Odds, Elo Rating, Dice Probability & FPS Bottleneck Calculator",
    intro: "Serious gamers know that math is part of the game. Our gaming tools help you calculate poker hand odds, understand Elo rating changes after matches, compute dice roll probabilities for tabletop gaming, and analyze PC hardware bottlenecks for optimal gaming performance. Whether you're a poker player calculating pot odds, a chess player tracking rating changes, a D&D dungeon master balancing encounters, or a PC builder matching CPU and GPU for your target resolution — these tools give you the numbers behind the game.",
    conceptsTitle: "Gaming Math & Strategy",
    concepts: [
      { emoji: "🃏", title: "Poker Mathematics", desc: "Pre-flop AA vs. KK ≈ 82% favorite. Flush draw (9 outs) after flop ≈ 35% to hit by river. The Rule of 4 and 2: outs × 4% (two cards) or × 2% (one card) for quick estimation." },
      { emoji: "♟️", title: "Elo Rating System", desc: "Expected score = 1/(1+10^((Opponent−Your)/400)). 400-point gap = 91% expected win rate. K-factor controls rating volatility (32 for new, 16 for masters)." },
      { emoji: "🎲", title: "Dice Probability", desc: "2d6: 7 is most common (16.7%), 2 and 12 rarest (2.8%). More dice = more predictable (normal distribution). D&D Advantage: roll 2d20, take highest = avg ~13.8 vs. 10.5." },
      { emoji: "💻", title: "PC Bottleneck Analysis", desc: "At 1080p: CPU often limits. At 1440p: balanced. At 4K: GPU almost always limits. Esports prioritize CPU single-core; AAA prioritize GPU." },
    ],
    tutorialTitle: "Level Up Your Game",
    tutorial: [
      { title: "Learn the Math", desc: "Use Poker Odds Calculator to understand hand equities. Use Dice Probability Calculator to balance encounters. The math separates consistent winners from lucky streaks." },
      { title: "Track Your Rating", desc: "Use Elo Rating Calculator after each match. Understand expected vs. actual outcomes. Ratings are a lagging indicator — focus on skill improvement, not daily fluctuations." },
      { title: "Optimize Hardware", desc: "Use FPS Bottleneck Calculator to identify limiting component. Upgrade the bottlenecked component first for best FPS-per-dollar improvement." },
    ],
    tips: [
      "Poker: the 'Rule of 4 and 2' is your best friend at the table. 9 outs (flush draw) × 4 = 36% chance by river. Compare to pot odds to decide: call or fold?",
      "Elo ratings: don't obsess over daily changes. Your 'true' rating is a range, not a point. A 50-point swing is normal variance. Focus on the 50-game moving average.",
      "PC building: a 'bottleneck-free' system doesn't exist. 5-15% bottleneck is normal and optimal. Chasing 0% bottleneck costs 2-3× more for negligible gains.",
      "D&D balancing: CR (Challenge Rating) is a rough guide. Action economy (number of actions per side) often matters more than CR. One big monster is easier than 5 small ones.",
    ],
    faq: [
      { q: "What are the odds of being dealt pocket aces?", a: "1 in 221 (0.45%). Any pocket pair: 1 in 17 (5.9%). Ace-King suited: 1 in 332 (0.3%)." },
      { q: "Is a 10% CPU bottleneck bad for gaming?", a: "No — 5-15% is normal and expected. You'd likely need to spend 2-3× more on the CPU to eliminate it, which isn't cost-effective. Focus upgrades on the component showing >20% bottleneck." },
    ],
  },

  wedding: {
    title: "Wedding Tools — Budget Calculator, Countdown & Seating Chart Planner",
    intro: "Wedding planning involves hundreds of decisions and a budget that can easily spiral. Our wedding tools help couples plan smarter: estimate costs with industry-standard budget allocations, track the countdown with milestone reminders, and arrange seating charts without the headache of paper diagrams. The average US wedding in 2026 costs $33,000-$36,000, with venue (30-35%), catering (25-30%), and photography (10-12%) as the biggest line items. These tools help you allocate your budget strategically and avoid last-minute surprises.",
    conceptsTitle: "Wedding Planning Fundamentals",
    concepts: [
      { emoji: "💰", title: "Budget Allocation", desc: "Venue 30-35%, Catering 25-30%, Photography 10-12%, Attire 8-10%, Music 7-10%, Flowers 7-8%, Planner 5-10%, Contingency 10-15%. Guest count is the #1 cost driver." },
      { emoji: "📅", title: "Planning Timeline", desc: "12+ months: venue, budget, guest list. 9-11: photographer, caterer, band/DJ. 6-8: dress, save-the-dates. 3-5: invitations, cake, trials. 1-2: license, final fittings." },
      { emoji: "🪑", title: "Seating Strategy", desc: "Round 60\" = 8-10 guests comfortably. 5-6 feet between tables for chairs and walkways. Assign tables (not specific seats) for most events. Put feuding relatives at opposite ends." },
    ],
    tutorialTitle: "Wedding Planning Roadmap",
    tutorial: [
      { title: "Set the Budget", desc: "Use Wedding Budget Calculator. Enter total budget and guest count. See per-category allocation. Adjust priorities — spend more on what you care about, cut what you don't." },
      { title: "Start the Countdown", desc: "Use Wedding Countdown Calculator. Follow the milestone checklist. Book venue first (it determines date, capacity, and often vendor options)." },
      { title: "Plan the Seating", desc: "Use Seating Chart Calculator. Enter guest count, table preferences. Visualize layout. Create digital chart, iterate freely before finalizing." },
      { title: "Track Spending", desc: "As you book vendors, update actual costs in the budget calculator. Watch the contingency buffer — there are ALWAYS unexpected costs." },
    ],
    tips: [
      "The single biggest cost driver is guest count — each additional guest adds $100-300+ in catering, rentals, and favors. A 100 vs. 150-person wedding can differ by $10,000+.",
      "Off-season and non-Saturday weddings save 10-30% on venues and vendors. November-March (excluding holidays) and Friday/Sunday offer the best value.",
      "Always add 10-15% contingency. Last-minute printing, vendor gratuities, bad weather backup plan — there are ALWAYS unexpected costs.",
      "The marriage license is the #1 forgotten task. Requirements vary by state: waiting periods (0-6 days), validity (30-90 days), witness requirements. Research early!",
    ],
    faq: [
      { q: "How far in advance should we plan a wedding?", a: "12-18 months is ideal for a traditional wedding with popular venues. 6-9 months is workable with flexibility. Less than 6 months requires compromise and quick decisions. Micro-weddings and elopements: 1-3 months." },
      { q: "What's the most commonly forgotten wedding expense?", a: "Vendor meals (in your contracts!), gratuities for vendors (15-20% for catering, $50-100 each for others), marriage license fees ($20-100), alterations ($200-600+), and rain plan backup (tent rental for outdoor events)." },
    ],
  },

  fortune: {
    title: "Fortune & Love Tools — Zodiac, Numerology, Tarot, I Ching & More",
    intro: "Explore the mystical side of numbers and stars! Our fortune and love tools combine ancient divination systems with modern algorithms for entertainment and self-reflection. Check zodiac love compatibility, calculate your Life Path Number, draw tarot cards for daily insight, consult the I Ching for wisdom, generate your Ba Zi birth chart, discover a playful past life, or just have fun with the classic Love Calculator. All tools are for entertainment purposes — they're designed to be fun, thought-provoking, and highly shareable. Perfect for parties, self-reflection, or just curious fun with friends.",
    conceptsTitle: "Divination Systems Explained",
    concepts: [
      { emoji: "⭐", title: "Zodiac Astrology", desc: "12 signs divided by element (Fire/Earth/Air/Water) and modality (Cardinal/Fixed/Mutable). Compatibility based on elemental affinity and modality harmony. Same element +25% to base score." },
      { emoji: "🐉", title: "Sheng Xiao (Animal Signs)", desc: "12-year cycle of animal signs. Three Harmonies (三合) identify natural allies; Six Clashes (六冲) identify challenging pairs. Each sign has unique personality traits." },
      { emoji: "🔢", title: "Numerology", desc: "Pythagorean system: Life Path Number from birth date, Destiny Number from name. Master Numbers 11, 22, 33 carry heightened significance. Each number 1-9 has distinct archetypal energy." },
      { emoji: "☯️", title: "Ba Zi (Eight Characters)", desc: "Four Pillars (Year/Month/Day/Hour), each with Heavenly Stem and Earthly Branch. Day Master represents you. Five Elements balance reveals personality tendencies." },
      { emoji: "📿", title: "I Ching (Book of Changes)", desc: "64 hexagrams from six-line combinations. Three coins cast six times. Each hexagram has philosophical interpretation — use for reflection, not prediction." },
      { emoji: "🃏", title: "Tarot", desc: "78-card deck: 22 Major Arcana (life themes) + 56 Minor Arcana (daily situations). Cards serve as mirrors for intuition, not fortune-telling." },
    ],
    tutorialTitle: "How to Use Fortune Tools (For Fun & Reflection)",
    tutorial: [
      { title: "Start with Self-Discovery", desc: "Try Numerology Calculator for your Life Path. Try Ba Zi for your Day Master element. These provide archetypes to reflect on, not deterministic labels." },
      { title: "Explore Relationships", desc: "Use Zodiac Love Compatibility and Sheng Xiao Love Match for fun couple comparisons. Use Soulmate Finder for multi-dimensional birth date analysis." },
      { title: "Seek Perspective", desc: "Use I Ching for open-ended reflection on situations. Use Tarot for daily insight and journaling prompts. The cards/hexagrams spark new ways of thinking." },
      { title: "Have Fun", desc: "Use Love Calculator and Past Life Finder for pure entertainment. Share results with friends. Don't take any of it too seriously!" },
    ],
    tips: [
      "All fortune tools on figureitcalc are for ENTERTAINMENT purposes. They're designed to be fun, thought-provoking, and conversation-starting — not predictive or diagnostic.",
      "Tarot and I Ching work best as mirrors for reflection, not oracles for prediction. The insight comes from how YOU interpret the imagery, not from supernatural forces.",
      "The algorithms are deterministic (same birthday = same result). This is intentional — it gives you a consistent profile to explore, not a randomly changing answer.",
      "Share your results! These tools are most fun when compared with friends. Screenshot your Love Calculator score and send it to your crush — if you're brave!",
    ],
    faq: [
      { q: "Are these fortune tools accurate?", a: "They're for entertainment and self-reflection, not prediction. The algorithms use consistent mathematical rules (numerology, element matching, etc.) but there's no scientific evidence that birth dates predict personality or relationships. Enjoy them for fun!" },
      { q: "Why do I get the same result every time?", a: "Our algorithms are deterministic — the same inputs always produce the same outputs. This is by design so you have a consistent 'profile' to explore and share." },
    ],
  },
};

export function getCategoryContent(categoryId: string): CategoryContent | null {
  return categoryContentRegistry[categoryId] || null;
}
