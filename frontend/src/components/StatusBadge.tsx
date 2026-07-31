import { Badge, type badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

// Maps known role / action / reason values to a semantic badge variant.
// Anything not listed here just falls back to "outline".
const VARIANT_MAP: Record<string, BadgeVariant> = {
    // Roles
    ADMIN: "default",
    MANAGER: "info",
    STAFF: "secondary",
    AUDITOR: "outline",

    // Audit actions
    STOCK_IN: "success",
    STOCK_OUT: "warning",
    CREATE: "success",
    UPDATE: "info",
    DELETE: "destructive",
    LOG_IN: "secondary",

    // Stock-out reasons
    SOLD: "success",
    DAMAGED: "destructive",
    EXPIRED: "destructive",
    OUTDATED: "warning",
};

interface StatusBadgeProps {
    value: string | null | undefined;
    className?: string;
}

export default function StatusBadge({ value, className }: StatusBadgeProps) {
    if (!value) {
        return <span className="text-sm text-muted-foreground">—</span>;
    }

    const variant = VARIANT_MAP[value] ?? "outline";

    return (
        <Badge variant={variant} className={className}>
            {value.replaceAll("_", " ")}
        </Badge>
    );
}
