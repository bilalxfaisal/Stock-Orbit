import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import BrandPanel from "@/components/auth/BrandPanel";
import BrandBackdrop from "@/components/auth/BrandBackdrop";
import MobileBrandHeader from "@/components/auth/MobileBrandHeader";
import LoginCard from "@/components/auth/LoginCard";
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

    const cardProps = {
        email,
        password,
        loading,
        onEmailChange: setEmail,
        onPasswordChange: setPassword,
        onSubmit: handleSubmit,
    };

    return (
        <>
            {/* ---------------------------------------------------------- */}
            {/* Desktop (lg and above) — split screen, unchanged from the   */}
            {/* original design.                                           */}
            {/* ---------------------------------------------------------- */}

            <div className="hidden min-h-screen lg:flex">
                <BrandPanel />

                <div className="flex w-1/2 flex-col items-center justify-center bg-background px-8 py-10">
                    <LoginCard {...cardProps} />
                </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* Mobile (below lg) — one centered vertical stack. Height is  */}
            {/* driven entirely by flex + gap, so it self-centers on any   */}
            {/* device without device-specific spacing hacks.              */}
            {/* ---------------------------------------------------------- */}

            <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-sidebar px-6 py-12 text-foreground lg:hidden">
            {/* <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-background px-6 py-12 text-foreground lg:hidden"></div> */}
                <BrandBackdrop />

                <MobileBrandHeader />

                <LoginCard {...cardProps} />

                <p className="relative z-10 text-xs text-sidebar-foreground/40">
                    &copy; {new Date().getFullYear()} Stock Orbit. All rights reserved.
                </p>
            </div>
        </>
    );
}
