import { Warehouse } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/PageStates";
import { cn } from "@/lib/utils";

interface WarehouseUtilizationProps {
    data: {
        code: string;
        name: string;
        currentCapacity: number;
        maximumCapacity: number;
        utilization: number;
    }[];
}

function barColor(utilization: number) {
    if (utilization >= 90) return "bg-destructive";
    if (utilization >= 70) return "bg-warning";
    return "bg-success";
}

export default function WarehouseUtilization({ data }: WarehouseUtilizationProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Warehouse capacity</CardTitle>
            </CardHeader>

            <CardContent>
                {data.length === 0 ? (
                    <EmptyState
                        icon={Warehouse}
                        title="No warehouses yet"
                        description="Create a warehouse to see capacity utilization here."
                        className="py-8"
                    />
                ) : (
                    <div className="space-y-4">
                        {data.map((warehouse) => (
                            <div key={warehouse.code} className="space-y-1.5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-foreground">
                                        {warehouse.name}
                                        <span className="ml-1.5 font-mono text-xs text-muted-foreground">
                                            {warehouse.code}
                                        </span>
                                    </span>

                                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                                        {warehouse.currentCapacity}/{warehouse.maximumCapacity}
                                        <span className="ml-1 text-foreground">
                                            ({warehouse.utilization}%)
                                        </span>
                                    </span>
                                </div>

                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-700",
                                            barColor(warehouse.utilization),
                                        )}
                                        style={{ width: `${Math.min(warehouse.utilization, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}