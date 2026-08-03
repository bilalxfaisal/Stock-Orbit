import {
    ArrowDownToLine,
    ArrowUpFromLine,
    Plus,
    Pencil,
    Trash2,
    LogIn,
    History,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/PageStates";
import { cn } from "@/lib/utils";

interface ActivityItem {
    id: number;
    action: string;
    entity: string;
    quantity: number | null;
    reason: string | null;
    description: string | null;
    createdAt: string;
}

interface ActivityFeedProps {
    data: ActivityItem[];
}

const ACTION_ICON: Record<string, typeof Plus> = {
    STOCK_IN: ArrowDownToLine,
    STOCK_OUT: ArrowUpFromLine,
    CREATE: Plus,
    UPDATE: Pencil,
    DELETE: Trash2,
    LOG_IN: LogIn,
};

const ACTION_STYLE: Record<string, string> = {
    STOCK_IN: "bg-success/10 text-success",
    STOCK_OUT: "bg-warning/10 text-warning",
    CREATE: "bg-success/10 text-success",
    UPDATE: "bg-info/10 text-info",
    DELETE: "bg-destructive/10 text-destructive",
    LOG_IN: "bg-muted text-muted-foreground",
};

const relativeTimeFormatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

function formatRelativeTime(dateStr: string) {
    const date = new Date(dateStr);
    const diffMs = date.getTime() - Date.now();
    const diffMinutes = Math.round(diffMs / 60000);

    if (Math.abs(diffMinutes) < 60) {
        return relativeTimeFormatter.format(diffMinutes, "minute");
    }

    const diffHours = Math.round(diffMinutes / 60);

    if (Math.abs(diffHours) < 24) {
        return relativeTimeFormatter.format(diffHours, "hour");
    }

    const diffDays = Math.round(diffHours / 24);
    return relativeTimeFormatter.format(diffDays, "day");
}

function describeActivity(item: ActivityItem) {
    const entity = item.entity.replaceAll("_", " ").toLowerCase();
    const action = item.action.replaceAll("_", " ").toLowerCase();

    if (item.description) return item.description;

    if (item.quantity) {
        return `${action} — ${item.quantity} ${entity}`;
    }

    return `${action} ${entity}`;
}

export default function ActivityFeed({ data }: ActivityFeedProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Recent activity</CardTitle>
            </CardHeader>

            <CardContent>
                {data.length === 0 ? (
                    <EmptyState
                        icon={History}
                        title="No activity yet"
                        description="Stock movements and changes will show up here."
                        className="py-8"
                    />
                ) : (
                    <ul className="space-y-4">
                        {data.map((item) => {
                            const Icon = ACTION_ICON[item.action] ?? History;
                            const style = ACTION_STYLE[item.action] ?? "bg-muted text-muted-foreground";

                            return (
                                <li key={item.id} className="flex items-start gap-3">
                                    <div
                                        className={cn(
                                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                            style,
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-0.5">
                                        <p className="truncate text-sm text-foreground capitalize">
                                            {describeActivity(item)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatRelativeTime(item.createdAt)}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}