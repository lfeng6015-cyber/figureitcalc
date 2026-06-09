// Add 5 trade calculators as IT-Tools format directories + formula entries
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const itToolsDir = join(__dirname, '..', '..', 'it-tools', 'src', 'tools');
const formulaFile = join(__dirname, '..', 'src', 'app', 'data', 'formulas.ts');

function createTool(dirName, title, desc, keywords) {
  const dir = join(itToolsDir, dirName);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  // index.ts (Vue - won't be used by toolsite, just for IT-Tools compatibility)
  writeFileSync(join(dir, 'index.ts'), `import { Calculator } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: '${title}',
  path: '/${dirName}',
  description: '${desc}',
  keywords: [${keywords.map(k => `'${k}'`).join(', ')}],
  component: () => import('./${dirName}.vue'),
  icon: Calculator,
  createdAt: new Date('2026-06-08'),
});
`);

  // Minimal .vue placeholder (toolsite uses React, not Vue)
  writeFileSync(join(dir, `${dirName}.vue`), `<template><div>${title} — React version in toolsite</div></template>`);
  console.log(`  ✅ ${dirName}`);
}

console.log('Creating trade tool directories...');
createTool('landed-cost-calculator', 'Landed Cost Calculator',
  'Calculate the true landed cost of imported goods including product cost, freight, insurance, customs duty, VAT/GST, and brokerage fees. All rates are adjustable — enter your own values.',
  ['landed', 'cost', 'import', 'duty', 'customs', 'tariff', 'freight', 'insurance', 'VAT', 'CIF', 'importing']);

createTool('import-duty-calculator', 'Import Duty Calculator',
  'Calculate import customs duties and taxes. Includes 2026 reference tariff rates for major trading partners. All rates are adjustable — enter your actual rates.',
  ['import', 'duty', 'customs', 'tariff', 'tax', 'HS code', 'importing', 'border', 'trade']);

createTool('fob-cif-converter', 'FOB/CIF Trade Terms Converter',
  'Convert between FOB (Free On Board) and CIF (Cost, Insurance, Freight) values. Calculate freight and insurance costs for international shipping. Enter your own rates.',
  ['FOB', 'CIF', 'trade', 'terms', 'shipping', 'freight', 'insurance', 'incoterms', 'international']);

createTool('tariff-impact-calculator', 'Tariff Impact Calculator',
  'Calculate how tariffs affect your final product price. See the impact on profit margins, retail pricing, and consumer cost. All rates user-adjustable.',
  ['tariff', 'impact', 'price', 'trade war', 'consumer', 'cost', 'margin', 'import']);

createTool('currency-hedge-calculator', 'Currency Hedge Cost Calculator',
  'Calculate the cost and benefit of hedging currency risk for international trade. Compare hedged vs unhedged import costs. Forward rates are user-entered.',
  ['currency', 'hedge', 'forex', 'FX', 'forward', 'contract', 'exchange', 'risk', 'import', 'trade finance']);

// ===== Update formulas.ts =====
const formulaEntries = `

  // ===== TRADE & TARIFF =====
  'landed-cost-calculator': {
    inputs: [
      { key: 'fobPrice', label: 'FOB Product Price ($)', type: 'number', defaultValue: 10000 },
      { key: 'freight', label: 'Freight Cost ($)', type: 'number', defaultValue: 1500 },
      { key: 'insurance', label: 'Insurance Cost ($)', type: 'number', defaultValue: 200 },
      { key: 'dutyRate', label: 'Customs Duty Rate (%) — enter your rate', type: 'number', defaultValue: 10, step: 0.1 },
      { key: 'vatRate', label: 'VAT/GST Rate (%) — enter your rate', type: 'number', defaultValue: 20, step: 0.1 },
      { key: 'brokerageFee', label: 'Customs Brokerage Fee ($)', type: 'number', defaultValue: 150 },
      { key: 'otherFees', label: 'Other Fees — port, handling, etc ($)', type: 'number', defaultValue: 100 },
    ],
    presets: [
      { label: 'US Import (China 44%)', values: { dutyRate: 44, vatRate: 0 } },
      { label: 'US Import (EU 20%)', values: { dutyRate: 20, vatRate: 0 } },
      { label: 'EU Import (standard)', values: { dutyRate: 5, vatRate: 21 } },
      { label: 'UK Import (standard)', values: { dutyRate: 5, vatRate: 20 } },
    ],
    formula: (v) => {
      const fob = F(v.fobPrice), freight = F(v.freight), insurance = F(v.insurance);
      const cif = fob + freight + insurance;
      const duty = cif * F(v.dutyRate) / 100;
      const vat = (cif + duty) * F(v.vatRate) / 100;
      const brokerage = F(v.brokerageFee), other = F(v.otherFees);
      const totalLanded = cif + duty + vat + brokerage + other;
      const effectiveRate = fob > 0 ? (totalLanded - fob) / fob * 100 : 0;
      return [
        { label: 'CIF Value', value: '$' + cif.toFixed(2) },
        { label: 'Customs Duty (' + F(v.dutyRate) + '%)', value: '$' + duty.toFixed(2) },
        { label: 'VAT/GST (' + F(v.vatRate) + '%)', value: '$' + vat.toFixed(2) },
        { label: 'Brokerage + Other Fees', value: '$' + (brokerage + other).toFixed(2) },
        { label: 'TOTAL LANDED COST', value: '$' + totalLanded.toFixed(2) },
        { label: 'Effective Import Rate', value: effectiveRate.toFixed(1) + '% over FOB' },
      ];
    },
  },

  'import-duty-calculator': {
    inputs: [
      { key: 'productValue', label: 'Product Value (FOB, $)', type: 'number', defaultValue: 10000 },
      { key: 'freightInsurance', label: 'Freight + Insurance ($)', type: 'number', defaultValue: 1500 },
      { key: 'tariffRate', label: 'Tariff / Duty Rate (%) — enter your rate', type: 'number', defaultValue: 10, step: 0.1 },
      { key: 'additionalTariff', label: 'Additional Tariff / Surcharge (%) — if applicable', type: 'number', defaultValue: 0, step: 0.1 },
      { key: 'vatRate', label: 'VAT/GST on Import (%) — enter your rate', type: 'number', defaultValue: 20, step: 0.1 },
    ],
    presets: [
      { label: 'US→China goods 2026 (~44%)', values: { tariffRate: 25, additionalTariff: 19, vatRate: 13 } },
      { label: 'US→EU goods 2026 (~20%)', values: { tariffRate: 10, additionalTariff: 10, vatRate: 21 } },
      { label: 'USMCA (0%)', values: { tariffRate: 0, additionalTariff: 0, vatRate: 0 } },
      { label: 'UK import', values: { tariffRate: 5, additionalTariff: 0, vatRate: 20 } },
    ],
    formula: (v) => {
      const cif = F(v.productValue) + F(v.freightInsurance);
      const totalRate = F(v.tariffRate) + F(v.additionalTariff);
      const duty = cif * totalRate / 100;
      const vat = (cif + duty) * F(v.vatRate) / 100;
      const total = cif + duty + vat;
      return [
        { label: 'CIF Value', value: '$' + cif.toFixed(2) },
        { label: 'Total Duty Rate (' + totalRate.toFixed(1) + '%)', value: '$' + duty.toFixed(2) },
        { label: 'VAT/GST (' + F(v.vatRate) + '%)', value: '$' + vat.toFixed(2) },
        { label: 'Total Import Cost', value: '$' + total.toFixed(2) },
        { label: 'Duty % of Product', value: (cif > 0 ? duty / cif * 100 : 0).toFixed(1) + '%' },
      ];
    },
  },

  'fob-cif-converter': {
    inputs: [
      { key: 'conversion', label: 'Conversion Direction', type: 'select', options: [{label: 'FOB → CIF', value: 'toCIF'}, {label: 'CIF → FOB', value: 'toFOB'}], defaultValue: 'toCIF' },
      { key: 'amount', label: 'Amount ($)', type: 'number', defaultValue: 10000 },
      { key: 'freight', label: 'Freight Cost ($) — enter yours', type: 'number', defaultValue: 1500 },
      { key: 'insurancePct', label: 'Insurance Rate (%) — typically 0.1-0.5%', type: 'number', defaultValue: 0.2, step: 0.01 },
    ],
    formula: (v) => {
      const isToCIF = v.conversion === 'toCIF';
      if (isToCIF) {
        const insurance = F(v.amount) * F(v.insurancePct) / 100;
        const cif = F(v.amount) + F(v.freight) + insurance;
        return [
          { label: 'FOB Value', value: '$' + F(v.amount).toFixed(2) },
          { label: 'Freight', value: '$' + F(v.freight).toFixed(2) },
          { label: 'Insurance (' + F(v.insurancePct).toFixed(1) + '%)', value: '$' + insurance.toFixed(2) },
          { label: 'CIF Value', value: '$' + cif.toFixed(2) },
        ];
      } else {
        const insurance = F(v.amount) * F(v.insurancePct) / 100 / (1 + F(v.insurancePct)/100);
        const fob = Math.max(0, F(v.amount) - F(v.freight) - insurance);
        return [
          { label: 'CIF Value', value: '$' + F(v.amount).toFixed(2) },
          { label: 'Freight (deduct)', value: '$' + F(v.freight).toFixed(2) },
          { label: 'Insurance (deduct)', value: '$' + insurance.toFixed(2) },
          { label: 'FOB Value', value: '$' + fob.toFixed(2) },
        ];
      }
    },
  },

  'tariff-impact-calculator': {
    inputs: [
      { key: 'fobUnitCost', label: 'FOB Unit Cost ($)', type: 'number', defaultValue: 50 },
      { key: 'currentDuty', label: 'Current Duty Rate (%) — enter your rate', type: 'number', defaultValue: 10, step: 0.1 },
      { key: 'newDuty', label: 'New/Proposed Duty Rate (%)', type: 'number', defaultValue: 44, step: 0.1 },
      { key: 'sellingPrice', label: 'Current Selling Price ($)', type: 'number', defaultValue: 100 },
      { key: 'unitsPerShipment', label: 'Units per Shipment', type: 'number', defaultValue: 1000 },
    ],
    presets: [
      { label: '10% → 44% (US-China scenario)', values: { currentDuty: 10, newDuty: 44 } },
      { label: '10% → 20% (US-EU scenario)', values: { currentDuty: 10, newDuty: 20 } },
      { label: '0% → 25% (new tariff)', values: { currentDuty: 0, newDuty: 25 } },
    ],
    formula: (v) => {
      const unitCost = F(v.fobUnitCost);
      const oldDutyAmt = unitCost * F(v.currentDuty) / 100;
      const newDutyAmt = unitCost * F(v.newDuty) / 100;
      const extraPerUnit = newDutyAmt - oldDutyAmt;
      const totalExtra = extraPerUnit * F(v.unitsPerShipment);
      const priceIncrease = F(v.sellingPrice) > 0 ? extraPerUnit / F(v.sellingPrice) * 100 : 0;
      const marginLoss = F(v.sellingPrice) > 0 ? extraPerUnit / (F(v.sellingPrice) - unitCost - oldDutyAmt) * 100 : 0;
      return [
        { label: 'Old Duty/Unit', value: '$' + oldDutyAmt.toFixed(2) },
        { label: 'New Duty/Unit', value: '$' + newDutyAmt.toFixed(2) },
        { label: 'Extra Cost per Unit', value: '$' + extraPerUnit.toFixed(2) },
        { label: 'Total Extra per Shipment', value: '$' + totalExtra.toFixed(2) },
        { label: 'Price Increase Needed', value: priceIncrease.toFixed(1) + '%' },
        { label: 'Profit Margin Erosion', value: marginLoss.toFixed(1) + '%' },
      ];
    },
  },

  'currency-hedge-calculator': {
    inputs: [
      { key: 'invoiceAmount', label: 'Invoice Amount (foreign currency)', type: 'number', defaultValue: 100000 },
      { key: 'currentSpot', label: 'Current Spot Rate (1 foreign = ? USD)', type: 'number', defaultValue: 1.10, step: 0.0001 },
      { key: 'forwardRate', label: 'Forward Rate (1 foreign = ? USD) — enter your bank quote', type: 'number', defaultValue: 1.0950, step: 0.0001 },
      { key: 'hedgeCost', label: 'Forward Contract Fee ($) — enter your bank fee', type: 'number', defaultValue: 200 },
      { key: 'yourForecast', label: 'Your Spot Forecast at Payment (1 foreign = ? USD) — your guess', type: 'number', defaultValue: 1.05, step: 0.0001 },
    ],
    presets: [
      { label: 'EUR/USD hedge', values: { currentSpot: 1.10, forwardRate: 1.0950, hedgeCost: 200 } },
      { label: 'GBP/USD hedge', values: { currentSpot: 1.27, forwardRate: 1.2650, hedgeCost: 250 } },
      { label: 'JPY/USD hedge (x100)', values: { currentSpot: 0.69, forwardRate: 0.6850, hedgeCost: 150 } },
    ],
    formula: (v) => {
      const amount = F(v.invoiceAmount), spot = F(v.currentSpot), fwd = F(v.forwardRate);
      const hedgeCost = F(v.hedgeCost), forecast = F(v.yourForecast);

      const unhedgedCost = amount * spot;
      const hedgedCost = amount * fwd + hedgeCost;
      const forecastCost = amount * forecast;

      const hedgeVsSpot = hedgedCost - unhedgedCost;
      const hedgeVsForecast = hedgedCost - forecastCost;

      return [
        { label: 'Unhedged Cost (at spot)', value: '$' + unhedgedCost.toFixed(2) },
        { label: 'Hedged Cost (forward + fee)', value: '$' + hedgedCost.toFixed(2) },
        { label: 'If Your Forecast is Right', value: '$' + forecastCost.toFixed(2) },
        { label: 'Hedge vs Spot', value: (hedgeVsSpot >= 0 ? '+' : '') + '$' + hedgeVsSpot.toFixed(2) },
        { label: 'Hedge Premium', value: (unhedgedCost > 0 ? (hedgeVsSpot / unhedgedCost * 100).toFixed(3) : '0') + '%' },
        { label: 'Recommendation', value: hedgeVsForecast < 0 ? 'HEDGE — cheaper than forecast' : 'DON\'T HEDGE — forecast better' },
      ];
    },
  },
`;

// Append to formulas.ts (before the closing export function)
let formulaContent = readFileSync(formulaFile, 'utf8');
const insertPoint = formulaContent.lastIndexOf('export function getFormula');
formulaContent = formulaContent.slice(0, insertPoint) + formulaEntries + '\n' + formulaContent.slice(insertPoint);
writeFileSync(formulaFile, formulaContent);
console.log('✅ Formula entries added to formulas.ts');

console.log('\n🎉 Trade calculators ready!');
