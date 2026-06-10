import { CalculatorTool } from "./CalculatorTool";

export function MortgageCalculator() {
  return (
    <CalculatorTool
      description="Calculate full monthly mortgage payment with PITI breakdown (Principal, Interest, Taxes, Insurance). Includes property tax, homeowners insurance, PMI, and HOA fees. 2026 US rates. All client-side and private."
      inputs={[
        { key: "homePrice", label: "Home Price ($)", type: "number", defaultValue: 300000, min: 10000 },
        { key: "downPayment", label: "Down Payment ($)", type: "number", defaultValue: 60000, min: 0 },
        { key: "interestRate", label: "Interest Rate (%)", type: "number", defaultValue: 6.3, min: 0.1, step: 0.1 },
        { key: "loanTerm", label: "Loan Term (years)", type: "number", defaultValue: 30, min: 5, max: 50 },
        { key: "propertyTax", label: "Property Tax Rate (%)", type: "number", defaultValue: 1.1, min: 0, max: 5, step: 0.1 },
        { key: "insurance", label: "Insurance ($/yr)", type: "number", defaultValue: 1800, min: 0 },
        { key: "hoa", label: "HOA Fee ($/mo)", type: "number", defaultValue: 0, min: 0 },
      ]}
      presets={[
        { label: "15yr Fixed", values: { loanTerm: 15, interestRate: 5.8, propertyTax: 1.1, insurance: 1800, hoa: 0 } },
        { label: "30yr Fixed", values: { loanTerm: 30, interestRate: 6.3, propertyTax: 1.1, insurance: 1800, hoa: 0 } },
        { label: "FHA 3.5%", values: { loanTerm: 30, interestRate: 6.0, downPayment: 10500, propertyTax: 1.1, insurance: 1800, hoa: 0 } },
        { label: "TX (no income tax)", values: { loanTerm: 30, interestRate: 6.3, propertyTax: 1.8, insurance: 2500, hoa: 0 } },
      ]}
      formula={(v) => {
        const price = Number(v.homePrice);
        const down = Number(v.downPayment);
        const P = price - down;
        const r = Number(v.interestRate) / 100 / 12;
        const n = Number(v.loanTerm) * 12;
        const principalAndInterest = r > 0 ? P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
        const monthlyTax = price * (Number(v.propertyTax) / 100) / 12;
        const monthlyInsurance = Number(v.insurance) / 12;
        const monthlyHoa = Number(v.hoa);
        const pmi = down / price < 0.2 ? P * 0.0075 / 12 : 0;
        const totalMonthly = principalAndInterest + monthlyTax + monthlyInsurance + monthlyHoa + pmi;
        const totalPayment = totalMonthly * n;
        const totalInterest = principalAndInterest * n - P;
        return [
          { label: "P&I (Loan)", value: "$" + principalAndInterest.toFixed(2), emphasis: true },
          { label: "Taxes", value: "$" + monthlyTax.toFixed(2) },
          { label: "Insurance", value: "$" + monthlyInsurance.toFixed(2) },
          { label: "PMI", value: pmi > 0 ? "$" + pmi.toFixed(2) : "$0", insight: pmi > 0 ? "Required when down payment < 20%. Falls off automatically at 78% LTV." : "No PMI — down payment >= 20%" },
          { label: "HOA", value: "$" + monthlyHoa.toFixed(2) },
          { label: "TOTAL PITI", value: "$" + totalMonthly.toFixed(2), emphasis: true, insight: "PITI = Principal + Interest + Taxes + Insurance + PMI + HOA. This is your full monthly housing cost. Lenders use this for the 28% DTI rule." },
          { label: "Total Over " + n / 12 + "yr", value: "$" + totalPayment.toFixed(0) },
          { label: "Total Interest", value: "$" + totalInterest.toFixed(0) },
        ];
      }}
    />
  );
}
