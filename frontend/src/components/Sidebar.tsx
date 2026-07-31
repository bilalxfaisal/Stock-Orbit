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
    Layers,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/providers/AuthProvider";
import { usePermission } from "@/hooks/usePermission";
import type { Permission } from "@/types/permission.types";
import { cn } from "@/lib/utils";
import stockSphereBlueLogo from "@/components/assets/stock-sphere-logo-blue.svg"
import stockSphereOrangeLogo from "@/components/assets/stock-sphere-logo-orange.svg"

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
        permission: "viewProducts" as Permission,
    },
    {
        title: "Inventory",
        href: "/inventory",
        icon: Boxes,
        permission: "viewInventory" as Permission,
    },
    {
        title: "Containers",
        href: "/containers",
        icon: Container,
        permission: "viewContainers" as Permission,
    },
    {
        title: "Categories",
        href: "/categories",
        icon: Tags,
        permission: "viewCategories" as Permission,
    },
    {
        title: "Product Types",
        href: "/product-types",
        icon: Tags,
        permission: "viewProductTypes" as Permission,
    },
    {
        title: "Warehouses",
        href: "/warehouses",
        icon: Warehouse,
        permission: "viewWarehouses" as Permission,
    },
    {
        title: "Users",
        href: "/users",
        icon: Users,
        permission: "viewUsers" as Permission,
    },
    {
        title: "Audit Logs",
        href: "/audit",
        icon: ClipboardList,
        permission: "viewAudit" as Permission,
    },
];

export default function Sidebar() {

    const location = useLocation();
    const { logout, user } = useAuth();
    const { can } = usePermission();

    return (
        <aside className="flex h-full flex-col bg-sidebar text-sidebar-foreground">

            {/* Logo / application title */}

            <div className="flex items-center gap-2.5 border-b border-sidebar-border px-5 py-5">
                {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                </div> */}
                <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                        <img
                            src={stockSphereOrangeLogo}
                            className="h-full w-full"
                        />
                    </div>

                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                        Stock Sphere
                    </p>
                    <p className="truncate text-xs text-sidebar-foreground/60">
                        Warehouse operations
                    </p>
                </div>
            </div>

            {/* Navigation */}

            <nav className="sidebar-scrollbar flex-1 space-y-0.5 overflow-y-auto p-3">

                {links.map((link) => {

                    const allowed =
                        !link.permission || can(link.permission);

                    const Icon = link.icon;
                    const active = location.pathname === link.href;

                    const itemClasses = cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        !allowed && "pointer-events-none opacity-40",
                    );

                    const content = (
                        <span className={itemClasses}>
                            <Icon
                                className={cn(
                                    "h-4.5 w-4.5 shrink-0",
                                    active && "text-sidebar-primary",
                                )}
                            />

                            <span className="truncate">{link.title}</span>

                            {active && (
                                <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-sidebar-primary" />
                            )}
                        </span>
                    );

                    if (!allowed) {
                        return (
                            <Tooltip key={link.href}>
                                <TooltipTrigger
                                    render={
                                        <div aria-disabled="true">
                                            {content}
                                        </div>
                                    }
                                />

                                <TooltipContent side="right">
                                    You don&apos;t have access to this section
                                </TooltipContent>
                            </Tooltip>
                        );
                    }

                    return (
                        <Link key={link.href} to={link.href}>
                            {content}
                        </Link>
                    );
                })}
            </nav>

            <Separator className="bg-sidebar-border" />

            {/* User / logout section */}

            <div className="space-y-3 p-3">

                {user && (
                    <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
                            {user.email?.charAt(0).toUpperCase() ?? "?"}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-white">
                                {user.email}
                            </p>
                            <p className="truncate text-[11px] text-sidebar-foreground/60">
                                {user.role}
                            </p>
                        </div>
                    </div>
                )}

                <button
                    onClick={logout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-destructive/15 hover:text-red-300"
                >
                    <LogOut className="h-4.5 w-4.5" />
                    Logout
                </button>
            </div>

        </aside>
    );
}
