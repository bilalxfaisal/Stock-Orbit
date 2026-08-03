import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/PageStates";
import { Tags } from "lucide-react";

interface CategoryDistributionChartProps {
    data: { name: string; productCount: number }[];
}

const COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
    "var(--color-primary)",
    "var(--color-info)",
    "var(--color-success)",
];

function ChartTooltip({
    active,
    payload,
}: {
    active?: boolean;
    payload?: { name: string; value: number }[];
}) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
            <p className="font-medium text-foreground">{payload[0].name}</p>
            <p className="font-mono tabular-nums text-muted-foreground">
                {payload[0].value} products
            </p>
        </div>
    );
}

export default function CategoryDistributionChart({
    data,
}: CategoryDistributionChartProps) {

    const total = data.reduce((sum, item) => sum + item.productCount, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Products by category</CardTitle>
            </CardHeader>

            <CardContent>
                {total === 0 ? (
                    <EmptyState
                        icon={Tags}
                        title="No products yet"
                        description="Stock in some products to see the breakdown."
                        className="py-8"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <div className="h-48 w-48 shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="productCount"
                                        nameKey="name"
                                        innerRadius="62%"
                                        outerRadius="100%"
                                        paddingAngle={2}
                                        strokeWidth={0}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={entry.name}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<ChartTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="min-w-0 flex-1 space-y-2">
                            {data.map((entry, index) => (
                                <div
                                    key={entry.name}
                                    className="flex items-center justify-between gap-2 text-sm"
                                >
                                    <div className="flex min-w-0 items-center gap-2">
                                        <span
                                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="truncate text-foreground">{entry.name}</span>
                                    </div>

                                    <span className="shrink-0 font-mono tabular-nums text-muted-foreground">
                                        {entry.productCount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}