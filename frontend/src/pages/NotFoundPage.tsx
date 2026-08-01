import { useNavigate } from "react-router-dom";
import { PackageSearch, ArrowLeft, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">

            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                <PackageSearch className="h-10 w-10 text-primary" />
            </div>

            <p className="font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                Error 404
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                This page went missing from the warehouse
            </h1>

            <p className="mt-3 max-w-md text-sm text-muted-foreground">
                We looked everywhere but couldn&apos;t find what you&apos;re
                looking for. The page may have been moved, renamed, or
                never existed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                    Go back
                </Button>

                <Button onClick={() => navigate("/")}>
                    <LayoutDashboard className="h-4 w-4" />
                    Back to dashboard
                </Button>
            </div>

        </div>
    );
}
