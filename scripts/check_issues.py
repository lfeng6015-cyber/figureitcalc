"""Check which tools from the user's issue list have formulas in formulas.ts"""
import re

with open('src/app/data/tools.ts', 'r', encoding='utf-8') as f:
    tools = f.read()
with open('src/app/data/formulas.ts', 'r', encoding='utf-8') as f:
    formulas = f.read()

# User's specific tools to check
checks = {
    # 通用计算类
    'percentage-calculator': 'Percentage Calculator',
    'bmi-calculator': 'BMI Calculator',
    'body-fat-calculator': 'Body Fat Calculator',
    # 金融/收益类
    'salary-calculator': 'Salary Calculator',
    'paycheck-calculator': 'Paycheck Calculator',
    'roi-calculator': 'ROI Calculator',
    'crypto-profit-calculator': 'Crypto Profit',
    'dividend-yield-calculator': 'Dividend Calculator',
    # 商业/营销类
    'cpm-calculator': 'CPM Calculator',
    'profit-margin-calculator': 'Margin Calculator',
    'break-even-calculator': 'Break-even Calculator',
    # 数学
    'percentage-calculator': 'Percentage Calc',
    # 时间
    'date-time-converter': 'Date Converter',
    'time-zone-converter': 'Time Zone',
    'age-calculator': 'Age Calculator',
    # 数据/统计
    'gpa-calculator': 'GPA Calculator',
    'probability-calculator': 'Probability',
    'statistics-calculator': 'Statistics',
    # 单位转换
    'temperature-converter': 'Temperature',
    # 金融深层
    'loan-comparison-calculator': 'Loan Comparison',
    'emi-calculator': 'EMI Calculator',
    'inflation-calculator': 'Inflation',
    # 随机/生成
    'random-port-generator': 'Random Port Gen',
}

print("=== Formula Existence Check ===")
for tool_id, name in checks.items():
    has_formula = f"'{tool_id}':" in formulas or f'"{tool_id}":' in formulas
    in_tools = f'"id": "{tool_id}"' in tools
    status = "✅ Has formula" if has_formula else "❌ NO FORMULA"
    present = "✅ In tools.ts" if in_tools else "❌ NOT IN tools.ts"
    print(f"  {name} ({tool_id}): {status} | {present}")

# Check for specific patterns
print("\n=== Specific Formula Quality Checks ===")

# Check ROI has annualization
if 'roi-calculator' in formulas:
    idx = formulas.index("'roi-calculator'")
    snippet = formulas[idx:idx+300]
    has_years = 'year' in snippet.lower() or 'annual' in snippet.lower()
    print(f"  ROI Calculator: {'✅ mentions years/annual' if has_years else '⚠️ No year dimension'}")

# Check margin doesn't confuse markup vs margin
if 'profit-margin-calculator' in formulas:
    idx = formulas.index("'profit-margin-calculator'")
    snippet = formulas[idx:idx+300]
    print(f"  Profit Margin: inputs={snippet[:150]}")

# Check body fat formula type
if 'body-fat-calculator' in formulas:
    idx = formulas.index("'body-fat-calculator'")
    snippet = formulas[idx:idx+400]
    has_navy = 'navy' in snippet.lower()
    print(f"  Body Fat: {'✅ mentions Navy method' if has_navy else '⚠️ No formula source noted'}")

# Check GPA has scale differentiation
if 'gpa-calculator' in formulas:
    idx = formulas.index("'gpa-calculator'")
    snippet = formulas[idx:idx+300]
    has_scale = 'scale' in snippet.lower() or '4.0' in snippet or '5.0' in snippet
    print(f"  GPA: {'✅ has scale input' if has_scale else '⚠️ No scale differentiation'}")

# Check crypto profit
if 'crypto-profit-calculator' in formulas:
    idx = formulas.index("'crypto-profit-calculator'")
    snippet = formulas[idx:idx+400]
    has_fee = 'fee' in snippet.lower()
    print(f"  Crypto Profit: {'✅ has fee input' if has_fee else '⚠️ No fee model'}")

# Check probability
if 'probability-calculator' in formulas:
    idx = formulas.index("'probability-calculator'")
    snippet = formulas[idx:idx+300]
    has_independent = 'independent' in snippet.lower()
    print(f"  Probability: {'✅ mentions independence' if has_independent else '⚠️ No independence assumption noted'}")

# Check statistics
if 'statistics-calculator' in formulas:
    idx = formulas.index("'statistics-calculator'")
    snippet = formulas[idx:idx+500]
    has_population = 'population' in snippet.lower() or 'sample' in snippet.lower()
    print(f"  Statistics: {'✅ has population/sample distinction' if has_population else '⚠️ No pop vs sample'}")

# Check random tools
if 'random-port-generator' in formulas:
    idx = formulas.index("'random-port-generator'")
    snippet = formulas[idx:idx+300]
    print(f"  Random Port Gen: inputs={snippet[:150]}")
