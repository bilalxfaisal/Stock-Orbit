import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

import Sidebar from "../Sidebar";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "../ThemeToggle";

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background">

            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 md:block">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col overflow-hidden">

                <header className="relative flex h-16 items-center border-b bg-sidebar px-4 md:hidden">

                    {/* Left */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger
                            render={
                                <button className="rounded-md p-2 text-sidebar-foreground hover:bg-sidebar-accent">
                                    <Menu className="h-6 w-6" />
                                </button>
                            }
                        />

                        <SheetContent side="left" className="w-64 p-0">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>

                    {/* Center */}
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-sidebar-foreground">
                        Stock Sphere
                    </h1>

                    {/* Right */}
                    <div className="ml-auto">
                        <ThemeToggle />
                    </div>

                </header>

                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </div>

            </main>

        </div>
    );
}