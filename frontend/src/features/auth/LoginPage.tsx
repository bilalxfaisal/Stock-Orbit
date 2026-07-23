
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
        <>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Login Form</label>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" placeholder="Enter email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <br />

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" placeholder="Enter password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <br />

                <Button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
            </form>
        </>
    );
}