import { CalculatorTool } from "./CalculatorTool";

export function MortgageCalculator() {
  return (
    <CalculatorTool
      description="Calculate monthly mortgage payments with full amortization. Default rate: 6.3% (2026 US average)."
      inputs={[
        { key: "homePrice", label: "Home Price ($)", type: "number", defaultValue: 300000, min: 10000 },
        { key: "downPayment", label: "Down Payment ($)", type: "number", defaultValue: 60000, min: 0 },
        { key: "interestRate", label: "Interest Rate (%)", type: "number", defaultValue: 6.3, min: 0.1, step: 0.1 },
        { key: "loanTerm", label: "Loan Term (years)", type: "number", defaultValue: 30, min: 5, max: 50 },
      ]}
      presets={[
        { label: "15yr Fixed", values: { loanTerm: 15, interestRate: 5.8 } },
        { label: "30yr Fixed", values: { loanTerm: 30, interestRate: 6.3 } },
        { label: "FHA Loan", values: { loanTerm: 30, interestRate: 6.0, downPayment: 10500 } },
      ]}
      formula={(v) => {
        const P = Number(v.homePrice) - Number(v.downPayment);
        const r = Number(v.interestRate) / 100 / 12;
        const n = Number(v.loanTerm) * 12;
        const payment = r > 0 ? P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
        const total = payment * n;
        const interest = total - P;
        return [
          { label: "Monthly Payment", value: "$" + payment.toFixed(2) },
          { label: "Total Payment", value: "$" + total.toFixed(0) },
          { label: "Total Interest", value: "$" + interest.toFixed(0) },
          { label: "Loan Amount", value: "$" + P.toFixed(0) },
        ];
      }}
    />
  );
}
