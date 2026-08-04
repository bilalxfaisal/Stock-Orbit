import { Layers, Package, Warehouse, ClipboardCheck } from "lucide-react";

import stockSphereOrangeLogo from "@/components/assets/stock-sphere-logo.png";
import BrandBackdrop from "@/components/auth/BrandBackdrop";

const features = [
    {
        icon: Package,
        label: "Real-time product & inventory tracking",
    },
    {
        icon: Warehouse,
        label: "Multi-warehouse & container management",
    },
    {
        icon: Layers,
        label: "Category & product type organization",
    },
    {
        icon: ClipboardCheck,
        label: "Full audit history on every action",
    },
];

/**
 * Desktop-only. The left half of the split-screen login layout.
 * No responsive branching inside here — MobileBrandHeader covers the
 * small-screen equivalent as a completely separate component.
 */
export default function BrandPanel() {
    return (
        <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-sidebar p-10 text-sidebar-foreground lg:flex xl:p-14">

            <BrandBackdrop />

            <div className="relative z-10 space-y-8">

                <div className="flex items-center gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-2.5 ring-1 ring-white/15">
                        <img
                            src={stockSphereOrangeLogo}
                            alt="Stock Sphere"
                            className="h-full w-full object-contain select-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-sidebar-foreground/75 uppercase ring-1 ring-white/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
                            Warehouse Operations
                        </span>

                        <p className="text-2xl font-semibold tracking-tight text-white xl:text-3xl">
                            Stock Sphere
                        </p>
                    </div>
                </div>

                <p className="max-w-sm text-sm text-sidebar-foreground/70">
                    Track products, containers, and warehouses in real
                    time, with a complete audit trail of every stock
                    movement.
                </p>

                <div className="flex flex-col gap-3.5">
                    {features.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/8">
                                <Icon className="h-4 w-4 text-sidebar-primary" />
                            </div>
                            <span className="text-sm text-sidebar-foreground/80">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <p className="relative z-10 text-xs text-sidebar-foreground/40">
                &copy; {new Date().getFullYear()} Stock Sphere. All rights reserved.
            </p>
        </div>
    );
}
