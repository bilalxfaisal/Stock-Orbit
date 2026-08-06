/**
 * Decorative dot-grid + ambient glow, meant to be dropped inside a
 * `relative overflow-hidden` container. Purely visual — no layout impact.
 */
export default function BrandBackdrop() {
    return (
        <>
            <div
                className="pointer-events-none absolute inset-0 text-sidebar-foreground opacity-[0.08]"
                style={{
                    backgroundImage:
                        "radial-gradient(currentColor 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                }}
            />

            <div
                className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sidebar-primary/20 blur-3xl"
                aria-hidden="true"
            />

            <div
                className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sidebar-primary/10 blur-3xl"
                aria-hidden="true"
            />
        </>
    );
}
