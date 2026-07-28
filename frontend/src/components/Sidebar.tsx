import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Boxes,
    Container,
    Tags,
    Warehouse,
    Users,
    ClipboardList,
    LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/providers/AuthProvider";

const links = [
    {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/products",
        icon: Package,
    },
    {
        title: "Inventory",
        href: "/inventory",
        icon: Boxes,
    },
    {
        title: "Containers",
        href: "/containers",
        icon: Container,
    },
    {
        title: "Categories",
        href: "/categories",
        icon: Tags,
    },
    {
        title: "Product Types",
        href: "/product-types",
        icon: Tags,
    },
    {
        title: "Warehouses",
        href: "/warehouses",
        icon: Warehouse,
    },
    {
        title: "Users",
        href: "/users",
        icon: Users,
    },
    {
        title: "Audit Logs",
        href: "/audit",
        icon: ClipboardList,
    },
];

export default function Sidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    return (
        <aside className="flex h-full flex-col">

            <div className="p-6 border-b">
                <h1 className="text-xl font-bold">
                    Stock Manager
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">

                {links.map((link) => {

                    const Icon = link.icon;

                    const active = location.pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            to={link.href}
                        >
                            <Button
                                variant={active ? "default" : "ghost"}
                                className="w-full justify-start"
                            >
                                <Icon className="mr-2 h-5 w-5" />
                                {link.title}
                            </Button>
                        </Link>
                    );
                })}
            </nav>

            <Separator />

            <div className="p-4">
                <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={logout}
                >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                </Button>
            </div>

        </aside>
    );
}