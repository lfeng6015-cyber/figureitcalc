import { CalculatorTool } from "./CalculatorTool";

// Tip Calculator
export function TipCalculator() {
  return (
    <CalculatorTool
      description="Calculate tips and split restaurant bills. Standard US tipping: 15-20%."
      inputs={[
        { key: "bill", label: "Bill Amount ($)", type: "number", defaultValue: 50, min: 0 },
        { key: "tipPct", label: "Tip (%)", type: "number", defaultValue: 18, min: 0, max: 100 },
        { key: "split", label: "Split Between", type: "number", defaultValue: 1, min: 1, max: 50 },
      ]}
      presets={[
        { label: "10%", values: { tipPct: 10 } }, { label: "15%", values: { tipPct: 15 } },
        { label: "18%", values: { tipPct: 18 } }, { label: "20%", values: { tipPct: 20 } }, { label: "25%", values: { tipPct: 25 } },
      ]}
      formula={(v) => {
        const tip = Number(v.bill) * Number(v.tipPct) / 100;
        const total = Number(v.bill) + tip;
        const perPerson = Number(v.split) > 0 ? total / Number(v.split) : total;
        return [
          { label: "Tip Amount", value: "$" + tip.toFixed(2) },
          { label: "Total", value: "$" + total.toFixed(2) },
          ...(Number(v.split) > 1 ? [{ label: "Per Person", value: "$" + perPerson.toFixed(2) }] : []),
        ];
      }}
    />
  );
}

// Discount Calculator
export function DiscountCalculator() {
  return (
    <CalculatorTool
      inputs={[
        { key: "price", label: "Original Price ($)", type: "number", defaultValue: 100, min: 0 },
        { key: "discount", label: "Discount (%)", type: "number", defaultValue: 20, min: 0, max: 100 },
      ]}
      presets={[
        { label: "10%", values: { discount: 10 } }, { label: "20%", values: { discount: 20 } },
        { label: "25%", values: { discount: 25 } }, { label: "30%", values: { discount: 30 } },
        { label: "50%", values: { discount: 50 } }, { label: "70%", values: { discount: 70 } },
      ]}
      formula={(v) => {
        const saved = Number(v.price) * Number(v.discount) / 100;
        const final = Number(v.price) - saved;
        return [
          { label: "Final Price", value: "$" + final.toFixed(2) },
          { label: "You Save", value: "$" + saved.toFixed(2) },
        ];
      }}
    />
  );
}

// Compound Interest Calculator
export function CompoundInterestCalculator() {
  return (
    <CalculatorTool
      description="See compound interest grow your savings. Einstein called it the 8th wonder of the world."
      inputs={[
        { key: "principal", label: "Initial Investment ($)", type: "number", defaultValue: 10000, min: 0 },
        { key: "rate", label: "Annual Interest Rate (%)", type: "number", defaultValue: 7, min: 0, step: 0.1 },
        { key: "years", label: "Years", type: "number", defaultValue: 10, min: 1, max: 50 },
        { key: "monthly", label: "Monthly Addition ($)", type: "number", defaultValue: 100, min: 0 },
        { key: "compoundFreq", label: "Compound Frequency", type: "select", options: [
          { label: "Daily (365)", value: "365" }, { label: "Monthly (12)", value: "12" },
          { label: "Quarterly (4)", value: "4" }, { label: "Annually (1)", value: "1" },
        ], defaultValue: "12" },
      ]}
      formula={(v) => {
        const r = Number(v.rate) / 100 / Number(v.compoundFreq);
        const n = Number(v.years) * Number(v.compoundFreq);
        const fvPrincipal = Number(v.principal) * Math.pow(1 + r, n);
        const pmt = Number(v.monthly) * (12 / Number(v.compoundFreq));
        const fvContrib = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
        const future = fvPrincipal + fvContrib;
        const totalIn = Number(v.principal) + Number(v.monthly) * Number(v.years) * 12;
        return [
          { label: "Future Value", value: "$" + Math.round(future).toLocaleString() },
          { label: "Total Invested", value: "$" + Math.round(totalIn).toLocaleString() },
          { label: "Interest Earned", value: "$" + Math.round(future - totalIn).toLocaleString() },
        ];
      }}
    />
  );
}

// Simple two-input calculator (ROI, profit margin, percentage, etc.)
export function TwoInputCalculator({ config }: { config: { labels: [string, string, string]; calc: (a: number, b: number) => { label: string; value: string }[]; defaults?: [number, number]; units?: [string, string] } }) {
  return (
    <CalculatorTool
      inputs={[
        { key: "a", label: config.labels[0], type: "number", defaultValue: config.defaults?.[0] ?? 100, min: 0 },
        { key: "b", label: config.labels[1], type: "number", defaultValue: config.defaults?.[1] ?? 50, min: 0 },
      ]}
      formula={(v) => config.calc(Number(v.a), Number(v.b))}
    />
  );
}

// Generic calc wrapper for simple ratio/percentage calculators
export function GenericCalculator({ title, fn }: { title?: string; fn: (a: number, b: number) => number }) {
  return (
    <CalculatorTool
      description={title}
      inputs={[
        { key: "a", label: "Input A", type: "number", defaultValue: 100 },
        { key: "b", label: "Input B", type: "number", defaultValue: 50 },
      ]}
      formula={(v) => [{ label: "Result", value: String(fn(Number(v.a), Number(v.b))) }]}
    />
  );
}
