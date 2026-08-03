import { Package, Container, Warehouse, Users } from "lucide-react";

import { useCountUp } from "@/hooks/useCountUp";

interface HeroBannerProps {
    totalProducts: number;
    totalContainers: number;
    totalWarehouses: number;
    totalUsers: number;
}

function HeroMetric({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Package;
    label: string;
    value: number;
}) {
    const display = useCountUp(value);

    return (
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/15">
                <Icon className="h-4.5 w-4.5 text-sidebar-primary" />
            </div>

            <div className="min-w-0">
                <p className="font-mono text-xl font-semibold tabular-nums text-white">
                    {display.toLocaleString()}
                </p>
                <p className="truncate text-xs text-sidebar-foreground/60">
                    {label}
                </p>
            </div>
        </div>
    );
}

export default function HeroBanner({
    totalProducts,
    totalContainers,
    totalWarehouses,
    totalUsers,
}: HeroBannerProps) {

    const today = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="relative overflow-hidden rounded-2xl bg-sidebar p-6 text-sidebar-foreground sm:p-8">

            {/* Ambient backdrop */}

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "radial-gradient(currentColor 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
                aria-hidden="true"
            />

            <div
                className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 rounded-full bg-sidebar-primary/20 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative flex flex-col gap-6">

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-sidebar-primary" />
                            </span>

                            <span className="text-xs font-medium tracking-wide text-sidebar-foreground/60 uppercase">
                                Live overview
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            Warehouse command center
                        </h1>

                        <p className="text-sm text-sidebar-foreground/60">
                            {today}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <HeroMetric icon={Package} label="Total products" value={totalProducts} />
                    <HeroMetric icon={Container} label="Total containers" value={totalContainers} />
                    <HeroMetric icon={Warehouse} label="Total warehouses" value={totalWarehouses} />
                    <HeroMetric icon={Users} label="Total users" value={totalUsers} />
                </div>

            </div>

        </div>
    );
}