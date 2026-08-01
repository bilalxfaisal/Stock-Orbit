import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Accent = "primary" | "success" | "warning" | "info" | "signal";

const ACCENT_STYLES: Record<Accent, { icon: string; iconBg: string }> = {
    primary: {
        icon: "text-primary",
        iconBg: "bg-primary/8",
    },
    signal: {
        icon: "text-signal",
        iconBg: "bg-signal/10",
    },
    success: {
        icon: "text-success",
        iconBg: "bg-success/10",
    },
    warning: {
        icon: "text-warning",
        iconBg: "bg-warning/10",
    },
    info: {
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
    children?: React.ReactNode;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    accent = "primary",
    description,
    children,
}: StatCardProps) {
    const styles = ACCENT_STYLES[accent];

    return (
        <Card className="transition-shadow hover:shadow-sm">
            <CardContent className="space-y-3">
                <div className="flex items-start justify-between gap-3">
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
                </div>

                {children && (
                    <div className="border-t border-border pt-3">
                        {children}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
