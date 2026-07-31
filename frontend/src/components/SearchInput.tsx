import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps
    extends Omit<React.ComponentProps<"input">, "className"> {
    className?: string;
    containerClassName?: string;
}

export default function SearchInput({
    className,
    containerClassName,
    ...props
}: SearchInputProps) {
    return (
        <div className={cn("relative", containerClassName)}>
            <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                className={cn("pl-8", className)}
                {...props}
            />
        </div>
    );
}
