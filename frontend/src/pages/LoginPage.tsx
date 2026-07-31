import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Form } from "@base-ui/react";
import { Layers, Package, Warehouse, ClipboardCheck } from "lucide-react";

import stockSphereOrangeLogo from "@/components/assets/stock-sphere-logo.png"
import stockSphereBlueLogo from "@/components/assets/stock-sphere-logo-orange.svg"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import FilterToolbar from "@/components/FilterToolbar";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, isAuthenticated, loading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please check your email and password.");
        }
    }

    return (
        <div className="flex min-h-screen">

            {/* Brand panel — hidden on small screens */}

            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-sidebar p-10 text-sidebar-foreground lg:flex xl:p-14">

                {/* Subtle dot-grid backdrop */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "radial-gradient(currentColor 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                    aria-hidden="true"
                />

                {/* Ambient accent glow */}
                <div
                    className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sidebar-primary/20 blur-3xl"
                    aria-hidden="true"
                />

                <div className="translate-y-10 relative flex items-center gap-3">
                    <div className="flex h-15 w-15 items-center justify-center">
                        <img
                            src={stockSphereOrangeLogo}
                            className="h-full w-full"
                        />
                    </div>

                    <span className="max-w-md text-3xl font-semibold tracking-tight text-white xl:text-5xl">
                        Stock Sphere
                    </span>
                </div>

                <div className="relative space-y-8">

                    <p className="max-w-sm text-sm text-sidebar-foreground/70">
                        Track products, containers, and warehouses in real
                        time, with a complete audit trail of every stock
                        movement.
                    </p>

                    <div className="flex flex-col gap-4 pt-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/8">
                                <Package className="h-4 w-4 text-sidebar-primary" />
                            </div>
                            <span className="text-sm text-sidebar-foreground/80">
                                Real-time product &amp; inventory tracking
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/8">
                                <Warehouse className="h-4 w-4 text-sidebar-primary" />
                            </div>
                            <span className="text-sm text-sidebar-foreground/80">
                                Multi-warehouse &amp; container management
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/8">
                                <ClipboardCheck className="h-4 w-4 text-sidebar-primary" />
                            </div>
                            <span className="text-sm text-sidebar-foreground/80">
                                Full audit history on every action
                            </span>
                        </div>
                    </div>
                </div>

                <p className="relative text-xs text-sidebar-foreground/40">
                    &copy; {new Date().getFullYear()} Stock Manager
                </p>
            </div>

            {/* Login form */}

            <div className="flex w-full flex-col items-center justify-center bg-background p-6 lg:w-1/2">

                <div className="w-full max-w-sm space-y-8">

                    {/* Logo shown only on small screens where the brand panel is hidden */}

                    <div className="flex items-center gap-2.5 lg:hidden">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Layers className="h-5 w-5" />
                        </div>

                        <span className="text-sm font-semibold text-foreground">
                            Stock Sphere
                        </span>
                    </div>

                    <div className="space-y-1.5">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                            Welcome back
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Sign in to your account to continue.
                        </p>
                    </div>

                    <Form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div className="space-y-1.5">
                            <Label htmlFor="email">
                                Email
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>

                    </Form>

                </div>

            </div>

        </div>
    );
}
