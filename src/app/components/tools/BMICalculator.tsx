import { CalculatorTool } from "./CalculatorTool";

export function BMICalculator() {
  return (
    <CalculatorTool
      description="Calculate your Body Mass Index (BMI). Supports both metric (cm/kg) and imperial (ft/lbs) units using the 2026 WHO classification."
      inputs={[
        { key: "unit", label: "Unit System", type: "select", options: [{ label: "Metric (cm / kg)", value: "metric" }, { label: "Imperial (ft / lbs)", value: "imperial" }], defaultValue: "metric" },
        { key: "heightCm", label: "Height (cm)", type: "number", defaultValue: 170, min: 50, max: 250 },
        { key: "weightKg", label: "Weight (kg)", type: "number", defaultValue: 70, min: 20, max: 300 },
      ]}
      formula={(v) => {
        let bmi = 0;
        if (v.unit === "metric") {
          const h = Number(v.heightCm) / 100;
          bmi = h > 0 ? Number(v.weightKg) / (h * h) : 0;
        } else {
          const totalIn = Number(v.heightCm) || 0;
          bmi = totalIn > 0 ? (Number(v.weightKg) / (totalIn * totalIn)) * 703 : 0;
        }
        const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal Weight" : bmi < 30 ? "Overweight" : bmi < 35 ? "Obese Class I" : bmi < 40 ? "Obese Class II" : "Obese Class III";
        return [{ label: "BMI", value: bmi.toFixed(1) }, { label: "Category", value: cat }];
      }}
    />
  );
}
