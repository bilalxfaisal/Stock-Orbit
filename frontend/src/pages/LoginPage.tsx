import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Form } from "@base-ui/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";

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
        <div className="flex min-h-screen items-center justify-center bg-muted/30">

            <Card className="w-full max-w-md shadow-lg">

                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-3xl">
                        Stock Management System
                    </CardTitle>

                    <CardDescription>
                        Login to continue
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <Form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
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
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                    </Form>

                </CardContent>

            </Card>

        </div>
    );
}