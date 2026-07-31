import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Accent = "primary" | "success" | "warning" | "info";

const ACCENT_STYLES: Record<Accent, { bar: string; icon: string; iconBg: string }> = {
    primary: {
        bar: "bg-primary",
        icon: "text-primary",
        iconBg: "bg-primary/10",
    },
    success: {
        bar: "bg-success",
        icon: "text-success",
        iconBg: "bg-success/10",
    },
    warning: {
        bar: "bg-warning",
        icon: "text-warning",
        iconBg: "bg-warning/10",
    },
    info: {
        bar: "bg-info",
        icon: "text-info",
        iconBg: "bg-info/10",
    },
};

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    accent?: Accent;
    description?: string;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    accent = "primary",
    description,
}: StatCardProps) {
    const styles = ACCENT_STYLES[accent];

    return (
        <Card className="relative overflow-hidden transition-shadow hover:shadow-md">

            <span
                className={cn("absolute inset-y-0 left-0 w-1", styles.bar)}
                aria-hidden="true"
            />

            <CardContent className="flex items-start justify-between gap-3 pl-5">
                <div className="min-w-0 space-y-1">
                    <p className="truncate text-sm font-medium text-muted-foreground">
                        {title}
                    </p>

                    <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
                        {value}
                    </p>

                    {description && (
                        <p className="text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                {Icon && (
                    <div
                        className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                            styles.iconBg,
                        )}
                    >
                        <Icon className={cn("h-4.5 w-4.5", styles.icon)} />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
