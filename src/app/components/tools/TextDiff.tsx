import { useState } from "react";

interface DiffPart {
  type: "same" | "added" | "removed";
  text: string;
}

function computeDiff(a: string, b: string): DiffPart[] {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const result: DiffPart[] = [];

  const lcs = (arr1: string[], arr2: string[]): string[][] => {
    const m = arr1.length, n = arr2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = arr1[i-1] === arr2[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
    const seq: string[][] = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (arr1[i-1] === arr2[j-1]) { seq.unshift([arr1[i-1], String(i-1), String(j-1)]); i--; j--; }
      else if (dp[i-1][j] > dp[i][j-1]) i--;
      else j--;
    }
    return seq;
  };

  const common = lcs(aLines, bLines);
  let ai = 0, bi = 0;
  for (const [line, aIdx, bIdx] of common) {
    while (ai < parseInt(aIdx)) { result.push({ type: "removed", text: aLines[ai] }); ai++; }
    while (bi < parseInt(bIdx)) { result.push({ type: "added", text: bLines[bi] }); bi++; }
    result.push({ type: "same", text: line });
    ai++; bi++;
  }
  while (ai < aLines.length) { result.push({ type: "removed", text: aLines[ai] }); ai++; }
  while (bi < bLines.length) { result.push({ type: "added", text: bLines[bi] }); bi++; }
  return result;
}

export function TextDiff() {
  const [left, setLeft] = useState("苹果\n香蕉\n橘子\n葡萄\n西瓜");
  const [right, setRight] = useState("苹果\n芒果\n橘子\n菠萝\n西瓜\n草莓");

  const diff = computeDiff(left, right);
  const added = diff.filter(d => d.type === "added").length;
  const removed = diff.filter(d => d.type === "removed").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">原始文本</label>
          <textarea
            className="w-full h-48 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">对比文本</label>
          <textarea
            className="w-full h-48 p-3 rounded-lg border border-border bg-input-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
            value={right}
            onChange={(e) => setRight(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-muted-foreground">差异统计：</span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <span>+</span>{added} 行新增
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <span>-</span>{removed} 行删除
        </span>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <div className="bg-muted px-3 py-2 text-xs text-muted-foreground border-b border-border flex gap-4">
          <span className="w-8">行号</span>
          <span>内容</span>
        </div>
        <div className="divide-y divide-border/50 max-h-80 overflow-y-auto">
          {diff.map((part, i) => (
            <div key={i} className={`flex gap-3 px-3 py-1.5 text-sm font-mono ${
              part.type === "added" ? "bg-green-50 text-green-800" :
              part.type === "removed" ? "bg-red-50 text-red-800" :
              "text-foreground"
            }`}>
              <span className="w-5 text-xs text-muted-foreground flex-shrink-0 mt-0.5">
                {part.type === "added" ? "+" : part.type === "removed" ? "−" : "·"}
              </span>
              <span className="flex-1 whitespace-pre-wrap break-all">{part.text || <span className="opacity-40">(空行)</span>}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
