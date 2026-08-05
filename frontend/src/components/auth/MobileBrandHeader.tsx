import stockSphereOrangeLogo from "@/components/assets/stock-sphere-logo.png";

/**
 * Mobile-only. Sits at the top of the centered vertical stack — just
 * enough branding to identify the app before the login card.
 */
export default function MobileBrandHeader() {
    return (
        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 p-2.5 ring-1 ring-white/15">
                <img
                    src={stockSphereOrangeLogo}
                    alt="Stock Orbit"
                    className="h-full w-full object-contain select-none"
                />
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-sidebar-foreground/75 uppercase ring-1 ring-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
                Warehouse Operations
            </span>

            <p className="text-2xl font-semibold tracking-tight text-white">
                Stock Orbit
            </p>
        </div>
    );
}
