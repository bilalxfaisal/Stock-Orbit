import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StockActivityChartProps {
    data: { date: string; stockIn: number; stockOut: number }[];
}

function formatDay(dateStr: string) {
    const date = new Date(`${dateStr}T00:00:00`);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function ChartTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: { value: number; name: string; color: string }[];
    label?: string;
}) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
            <p className="mb-1 font-medium text-foreground">
                {label ? formatDay(label) : ""}
            </p>

            {payload.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                    <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-muted-foreground capitalize">{entry.name}:</span>
                    <span className="font-mono font-medium tabular-nums text-foreground">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function StockActivityChart({ data }: StockActivityChartProps) {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">Stock activity</CardTitle>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-success" />
                        Stock in
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-warning" />
                        Stock out
                    </span>
                </div>
            </CardHeader>

            <CardContent className="h-72 pl-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="stockInGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="stockOutGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-warning)" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="var(--color-warning)" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            stroke="var(--color-border)"
                        />

                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDay}
                            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                            tickLine={false}
                            axisLine={{ stroke: "var(--color-border)" }}
                            interval="preserveStartEnd"
                        />

                        <YAxis
                            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                            tickLine={false}
                            axisLine={false}
                            width={32}
                            allowDecimals={false}
                        />

                        <Tooltip content={<ChartTooltip />} />

                        <Area
                            type="monotone"
                            dataKey="stockIn"
                            name="Stock in"
                            stroke="var(--color-success)"
                            strokeWidth={2}
                            fill="url(#stockInGradient)"
                        />

                        <Area
                            type="monotone"
                            dataKey="stockOut"
                            name="Stock out"
                            stroke="var(--color-warning)"
                            strokeWidth={2}
                            fill="url(#stockOutGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}