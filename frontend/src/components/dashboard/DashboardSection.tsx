interface DashboardSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function DashboardSection({
    title,
    children,
}: DashboardSectionProps) {
    return (
        <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {title}
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {children}
            </div>
        </section>
    );
}