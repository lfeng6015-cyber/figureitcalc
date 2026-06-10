/**
 * calcEngine — shared calculation utilities for all tools.
 *
 * Goals:
 * - Single source of truth for numeric parsing, precision, and formatting
 * - Reusable formula building blocks (PMT, FV, CAGR, etc.)
 * - Input validation helpers
 * - Type-safe: no more ad-hoc parseFloat scattered across 92 formulas
 */

// ── Numeric Parsing ──────────────────────────────────────────

/** Safely parse a value to number. Returns fallback (default 0) for NaN/Infinity. */
export function parseNum(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : Number(v);
  return isFinite(n) ? n : fallback;
}

/** Parse and clamp to [min, max]. */
export function parseClamp(v: unknown, min: number, max: number, fallback = 0): number {
  return Math.max(min, Math.min(max, parseNum(v, fallback)));
}

/** Parse percentage input (user enters 7 for 7%). Returns decimal (0.07). */
export function parsePct(v: unknown, fallback = 0): number {
  return parseNum(v, fallback) / 100;
}

// ── Number Formatting ─────────────────────────────────────────

/** Format number for display: thousands separator, max 4 decimal places. */
export function fmtNum(n: number, decimals = 4): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1e12) return n.toExponential(4);
  return n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

/** Format as currency with $ prefix. */
export function fmtCurrency(n: number, decimals = 2): string {
  if (!isFinite(n)) return "—";
  return "$" + n.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

/** Format as percentage. */
export function fmtPct(n: number, decimals = 2): string {
  if (!isFinite(n)) return "—";
  return n.toFixed(decimals) + "%";
}

// ── Financial Formula Blocks ──────────────────────────────────

/**
 * Future Value of a lump sum. FV = P * (1 + r)^n
 * @param principal - starting amount
 * @param ratePerPeriod - interest rate per period (decimal, e.g. 0.07/12 for monthly)
 * @param periods - number of compounding periods
 */
export function fvLumpSum(principal: number, ratePerPeriod: number, periods: number): number {
  return principal * Math.pow(1 + ratePerPeriod, periods);
}

/**
 * Future Value with regular payments (annuity).
 * FV = P * (1+r)^n + pmt * ((1+r)^n - 1) / r
 */
export function fvAnnuity(
  principal: number,
  payment: number,
  ratePerPeriod: number,
  periods: number,
): number {
  if (ratePerPeriod === 0) return principal + payment * periods;
  const fv = principal * Math.pow(1 + ratePerPeriod, periods);
  const fvPmt = payment * (Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod;
  return fv + fvPmt;
}

/**
 * Loan payment (PMT). Monthly payment for a fixed-rate loan.
 * PMT = P * r * (1+r)^n / ((1+r)^n - 1)
 */
export function pmt(principal: number, ratePerPeriod: number, periods: number): number {
  if (ratePerPeriod === 0) return principal / periods;
  return principal * ratePerPeriod * Math.pow(1 + ratePerPeriod, periods)
    / (Math.pow(1 + ratePerPeriod, periods) - 1);
}

/**
 * CAGR (Compound Annual Growth Rate).
 * CAGR = (end/start)^(1/years) - 1
 */
export function cagr(startValue: number, endValue: number, years: number): number {
  if (startValue <= 0 || years <= 0) return 0;
  return Math.pow(endValue / startValue, 1 / years) - 1;
}

/**
 * Simple interest. I = P * r * t
 */
export function simpleInterest(principal: number, rate: number, years: number): number {
  return principal * rate * years;
}

/**
 * Rule of 72: years to double at given rate.
 */
export function ruleOf72(ratePct: number): number {
  return ratePct > 0 ? 72 / ratePct : Infinity;
}

/**
 * Discounted present value. PV = FV / (1 + r)^n
 */
export function presentValue(futureValue: number, ratePerPeriod: number, periods: number): number {
  return futureValue / Math.pow(1 + ratePerPeriod, periods);
}

/**
 * Inflation-adjusted real return.
 * real = (1 + nominal) / (1 + inflation) - 1
 */
export function realReturn(nominalRate: number, inflationRate: number): number {
  return (1 + nominalRate) / (1 + inflationRate) - 1;
}

// ── Math / Statistics ─────────────────────────────────────────

/** Mean of number array. */
export function mean(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

/** Median of number array. */
export function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Population standard deviation. */
export function stdDevPop(values: number[]): number {
  if (!values.length) return 0;
  const m = mean(values);
  return Math.sqrt(values.reduce((s, v) => s + (v - m) ** 2, 0) / values.length);
}

/** Sample standard deviation (n-1 denominator). */
export function stdDevSample(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return Math.sqrt(values.reduce((s, v) => s + (v - m) ** 2, 0) / (values.length - 1));
}

// ── Input Validation ──────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  message?: string;
  level: "ok" | "warning" | "error";
}

/** Validate a numeric input against expected range. */
export function validateRange(
  value: number,
  min: number,
  max: number,
  label: string,
): ValidationResult {
  if (!isFinite(value)) return { valid: false, message: `${label} is not a valid number`, level: "error" };
  if (value < min) return { valid: false, message: `${label} must be >= ${min}`, level: "warning" };
  if (value > max) return { valid: false, message: `${label} must be <= ${max}`, level: "warning" };
  return { valid: true, level: "ok" };
}

/** Convert common percentage inputs from user-facing % to decimal. */
export function pctToDecimal(userInput: number): number {
  return userInput / 100;
}

/** Convert decimal to percentage for display. */
export function decimalToPct(decimal: number): number {
  return decimal * 100;
}

// ── Display Helpers ────────────────────────────────────────────

/** Safely convert any value to a display string. Returns "—" for empty/invalid. */
export function safeStr(v: unknown): string {
  if (v === undefined || v === null || v === "") return "—";
  const s = String(v);
  if (s === "NaN" || s === "Infinity" || s === "-Infinity") return "—";
  return s;
}

/** Check if a value is a valid finite number. */
export function isValidNum(v: unknown): boolean {
  const n = typeof v === "number" ? v : Number(v);
  return isFinite(n) && !isNaN(n);
}
