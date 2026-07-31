import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataTableCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function DataTableCard({
    children,
    className,
}: DataTableCardProps) {
    return (
        <Card
            className={cn(
                "gap-0 overflow-hidden py-0",
                className,
            )}
        >
            {children}
        </Card>
    );
}
