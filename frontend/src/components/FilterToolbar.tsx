import { cn } from "@/lib/utils";

interface FilterToolbarProps {
    children: React.ReactNode;
    className?: string;
}

export default function FilterToolbar({
    children,
    className,
}: FilterToolbarProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:flex-wrap sm:items-center",
                className,
            )}
        >
            {children}
        </div>
    );
}
