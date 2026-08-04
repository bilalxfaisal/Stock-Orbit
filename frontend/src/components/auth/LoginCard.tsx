import { Form } from "@base-ui/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";

interface LoginCardProps {
    email: string;
    password: string;
    loading: boolean;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginCard({
    email,
    password,
    loading,
    onEmailChange,
    onPasswordChange,
    onSubmit,
}: LoginCardProps) {
    return (
        <div className="w-full max-w-sm rounded-3xl border bg-card p-8 shadow-xl backdrop-blur md:max-w-md">

            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-foreground">
                        Welcome back
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Sign in to continue.
                    </p>
                </div>

                <div className="shrink-0 rounded-full border bg-muted p-1">
                    <ThemeToggle />
                </div>
            </div>

            <Form onSubmit={onSubmit} className="mt-5 space-y-5">

                <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="space-y-2 text-center lg:hidden">
                    <div className="mx-auto h-px w-16 bg-border" />

                    <p className="text-xs text-muted-foreground">
                        Track inventory, warehouses and audit logs from one
                        dashboard.
                    </p>
                </div>

            </Form>

        </div>
    );
}
