interface AdBannerProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
}

export function AdBanner({ width = "100%", height = "90px", label = "广告位 · Advertisement", className = "" }: AdBannerProps) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-border rounded-lg bg-muted/50 text-muted-foreground select-none ${className}`}
      style={{ width, height }}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
}
