import { AlertTriangle, Inbox, type LucideIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Full-page loading skeleton — mirrors the shape of a typical
 * page (header, filter toolbar, table) so the layout doesn't jump.
 */
export function PageLoadingState({ rows = 6 }: { rows?: number }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-44" />
                    <Skeleton className="h-4 w-64" />
                </div>

                <Skeleton className="h-9 w-32 rounded-lg" />
            </div>

            <Skeleton className="h-[52px] w-full rounded-xl" />

            <div className="space-y-2">
                {Array.from({ length: rows }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-lg" />
                ))}
            </div>
        </div>
    );
}

interface ErrorStateProps {
    title?: string;
    description?: string;
    className?: string;
}

/** Inline error card — used when a page's data fails to load. */
export function ErrorState({
    title = "Couldn't load this page",
    description = "Something went wrong while fetching data. Try refreshing the page.",
    className,
}: ErrorStateProps) {
    return (
        <Card className={cn("border-destructive/25 bg-destructive/5", className)}>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>

                <div className="space-y-1">
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="max-w-sm text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    className?: string;
}

/** Empty-table / empty-list placeholder. */
export function EmptyState({
    title,
    description,
    icon: Icon = Inbox,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-6 py-14 text-center",
                className,
            )}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
            </div>

            <p className="font-medium text-foreground">{title}</p>

            {description && (
                <p className="max-w-sm text-sm text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}
