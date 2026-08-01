import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* ProportionBar — a stacked horizontal bar for showing how a total    */
/* splits across categories (e.g. users by role, products by status). */
/* ------------------------------------------------------------------ */

interface Segment {
    label: string;
    value: number;
    className: string; // background color utility, e.g. "bg-primary"
}

interface ProportionBarProps {
    segments: Segment[];
    className?: string;
}

export function ProportionBar({ segments, className }: ProportionBarProps) {
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
                {segments.map((segment, i) => {
                    const width = (segment.value / total) * 100;

                    if (width <= 0) return null;

                    return (
                        <div
                            key={i}
                            className={cn(
                                "h-full transition-all",
                                segment.className,
                            )}
                            style={{ width: `${width}%` }}
                            title={`${segment.label}: ${segment.value}`}
                        />
                    );
                })}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {segments.map((segment, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                        <span
                            className={cn(
                                "h-2 w-2 shrink-0 rounded-full",
                                segment.className,
                            )}
                        />
                        <span className="text-muted-foreground">
                            {segment.label}
                        </span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                            {segment.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* RadialGauge — a ring showing value/total, for occupancy-style       */
/* ratios (full containers, empty warehouses, etc).                    */
/* ------------------------------------------------------------------ */

interface RadialGaugeProps {
    value: number;
    total: number;
    label: string;
    colorVar?: string; // CSS color, e.g. "var(--color-primary)"
    size?: number;
}

export function RadialGauge({
    value,
    total,
    label,
    colorVar = "var(--color-primary)",
    size = 72,
}: RadialGaugeProps) {
    const safeTotal = total > 0 ? total : 1;
    const ratio = Math.min(value / safeTotal, 1);

    const strokeWidth = 7;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - ratio);

    return (
        <div className="flex items-center gap-3">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="-rotate-90 shrink-0"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--color-muted)"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={colorVar}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                />
            </svg>

            <div className="min-w-0">
                <p className="font-mono text-lg font-semibold tabular-nums text-foreground">
                    {value}
                    <span className="text-sm font-normal text-muted-foreground">
                        /{total}
                    </span>
                </p>
                <p className="truncate text-xs text-muted-foreground">
                    {label}
                </p>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* CompareBars — two side-by-side bars for comparing two live counts   */
/* (e.g. stock in vs stock out today).                                 */
/* ------------------------------------------------------------------ */

interface CompareBarsProps {
    a: { label: string; value: number; className: string };
    b: { label: string; value: number; className: string };
}

export function CompareBars({ a, b }: CompareBarsProps) {
    const max = Math.max(a.value, b.value, 1);

    return (
        <div className="space-y-2.5">
            {[a, b].map((item, i) => (
                <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                            {item.value}
                        </span>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className={cn("h-full rounded-full transition-all", item.className)}
                            style={{ width: `${(item.value / max) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
