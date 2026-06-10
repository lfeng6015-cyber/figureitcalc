import { useState, useMemo } from "react";
import { CalculatorTool } from "./CalculatorTool";

export function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["metric", "imperial"] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
              unit === u ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {u === "metric" ? "Metric (cm / kg)" : "Imperial (ft/in / lbs)"}
          </button>
        ))}
      </div>

      <CalculatorTool
        description="Calculate your Body Mass Index (BMI) using WHO standards. Supports both metric (cm/kg) and imperial (ft/lbs) units with automatic conversion. Includes health risk category, healthy weight range, and WHO classification details."
        inputs={
          unit === "metric"
            ? [
                { key: "heightCm", label: "Height (cm)", type: "number" as const, defaultValue: 170, min: 50, max: 250 },
                { key: "weightKg", label: "Weight (kg)", type: "number" as const, defaultValue: 70, min: 20, max: 300 },
              ]
            : [
                { key: "heightFt", label: "Height (ft)", type: "number" as const, defaultValue: 5, min: 3, max: 8 },
                { key: "heightIn", label: "Height (in)", type: "number" as const, defaultValue: 7, min: 0, max: 11 },
                { key: "weightLb", label: "Weight (lbs)", type: "number" as const, defaultValue: 154, min: 44, max: 660 },
              ]
        }
        presets={[
          { label: "Avg Male (US)", values: unit === "metric" ? { heightCm: 175, weightKg: 90 } : { heightFt: 5, heightIn: 9, weightLb: 198 } },
          { label: "Avg Female (US)", values: unit === "metric" ? { heightCm: 162, weightKg: 77 } : { heightFt: 5, heightIn: 4, weightLb: 170 } },
          { label: "Athlete", values: unit === "metric" ? { heightCm: 180, weightKg: 80 } : { heightFt: 5, heightIn: 11, weightLb: 176 } },
        ]}
        formula={(v) => {
          let h = 0;
          let w = 0;

          if (unit === "metric") {
            h = Number(v.heightCm) / 100;
            w = Number(v.weightKg);
          } else {
            const totalIn = (Number(v.heightFt) || 0) * 12 + (Number(v.heightIn) || 0);
            h = totalIn * 0.0254;
            w = (Number(v.weightLb) || 0) * 0.453592;
          }

          const bmi = h > 0 ? w / (h * h) : 0;

          // WHO risk zones with explanation
          const zones = [
            { max: 16, category: "Severe Thinness", color: "red", risk: "High risk of malnutrition, osteoporosis, and immune deficiency. Consult a healthcare provider." },
            { max: 17, category: "Moderate Thinness", color: "red", risk: "Increased risk of nutritional deficiencies and fatigue. May need dietary assessment." },
            { max: 18.5, category: "Mild Thinness", color: "amber", risk: "Slightly increased health risk. Consider balanced diet and strength training." },
            { max: 25, category: "Normal Weight", color: "green", risk: "Optimal health range. Lowest statistical mortality risk. Maintain with balanced diet and exercise." },
            { max: 30, category: "Overweight", color: "amber", risk: "Increased risk of hypertension, type 2 diabetes, and joint stress. Weight management recommended." },
            { max: 35, category: "Obese Class I", color: "red", risk: "Elevated cardiovascular risk, sleep apnea, metabolic syndrome. Medical consultation advised." },
            { max: 40, category: "Obese Class II", color: "red", risk: "High risk of chronic disease. Structured weight management program strongly recommended." },
            { max: Infinity, category: "Obese Class III", color: "red", risk: "Severe health risk. Bariatric intervention may be considered. Immediate medical consultation recommended." },
          ];

          const zone = zones.find(z => bmi < z.max) || zones[zones.length - 1];

          // Healthy weight range for this height
          const minHealthyKg = 18.5 * h * h;
          const maxHealthyKg = 25 * h * h;

          const results = [
            {
              label: "Your BMI",
              value: bmi.toFixed(1) + " kg/m²",
              color: zone.color,
              emphasis: true,
            },
            {
              label: "WHO Category",
              value: zone.category,
              color: zone.color,
            },
          ];

          if (unit === "imperial") {
            results.push(
              { label: "Healthy Range", value: `${(minHealthyKg * 2.20462).toFixed(0)}–${(maxHealthyKg * 2.20462).toFixed(0)} lbs`, color: "green" } as any
            );
          } else {
            results.push(
              { label: "Healthy Range", value: `${minHealthyKg.toFixed(0)}–${maxHealthyKg.toFixed(0)} kg`, color: "green" } as any
            );
          }

          results.push(
            { label: "Health Risk", value: zone.risk, insight: `Source: WHO BMI Classification (2026). BMI is a screening tool — it does not measure body fat directly. Athletes with high muscle mass may have elevated BMI without health risk. Consult a healthcare professional for individual assessment.` } as any
          );

          return results;
        }}
      />
    </div>
  );
}
