import {
    ArrowDownToLine,
    ArrowUpFromLine,
    ShoppingCart,
    PackageCheck,
    PackageOpen,
    Tags,
    Layers,
} from "lucide-react";

import HeroBanner from "@/components/dashboard/HeroBanner";
import StockActivityChart from "@/components/dashboard/StockActivityChart";
import CategoryDistributionChart from "@/components/dashboard/CategoryDistributionChart";
import WarehouseUtilization from "@/components/dashboard/WarehouseUtilization";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import RoleBreakdown from "@/components/dashboard/RoleBreakdown";
import StatCard from "@/components/dashboard/StatCard";

import { PageLoadingState, ErrorState } from "@/components/PageStates";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
    const { data, isLoading, error } = useDashboard();

    if (isLoading) {
        return <PageLoadingState rows={6} />;
    }

    if (error || !data) {
        return (
            <ErrorState description="We couldn't load the dashboard statistics. Try refreshing the page." />
        );
    }

    return (
        <div className="space-y-6">

            <div className="animate-rise-in">
                <HeroBanner
                    totalProducts={data.products.totalProducts}
                    totalContainers={data.containers.totalContainers}
                    totalWarehouses={data.warehouses.totalWarehouses}
                    totalUsers={data.users.totalUsers}
                />
            </div>

            {/* Stock activity trend + today's snapshot */}

            <div className="grid gap-4 lg:grid-cols-3">
                <div
                    className="animate-rise-in lg:col-span-2"
                    style={{ animationDelay: "60ms" }}
                >
                    <StockActivityChart data={data.stockActivity} />
                </div>

                <div
                    className="animate-rise-in space-y-4"
                    style={{ animationDelay: "100ms" }}
                >
                    <StatCard
                        title="Stock In Today"
                        value={data.today.stockInToday}
                        icon={ArrowDownToLine}
                        accent="success"
                    />

                    <StatCard
                        title="Stock Out Today"
                        value={data.today.stockOutToday}
                        icon={ArrowUpFromLine}
                        accent="warning"
                    />

                    <StatCard
                        title="Products Sold"
                        value={data.products.productsSold}
                        icon={ShoppingCart}
                        accent="info"
                    />
                </div>
            </div>

            {/* Category distribution + warehouse capacity */}

            <div
                className="animate-rise-in grid gap-4 lg:grid-cols-2"
                style={{ animationDelay: "140ms" }}
            >
                <CategoryDistributionChart data={data.categoryDistribution} />
                <WarehouseUtilization data={data.warehouseUtilization} />
            </div>

            {/* Recent activity + team composition */}

            <div
                className="animate-rise-in grid gap-4 "
                style={{ animationDelay: "180ms" }}
            >
                {/* <ActivityFeed data={data.recentActivity} /> */}

                <RoleBreakdown
                    totalAdmins={data.users.totalAdmins}
                    totalManagers={data.users.totalManagers}
                    totalStaff={data.users.totalStaff}
                    totalAuditors={data.users.totalAuditors}
                />
            </div>

            {/* At a glance */}

            <div
                className="animate-rise-in space-y-3"
                style={{ animationDelay: "220ms" }}
            >
                <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                    At a glance
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        title="Full Containers"
                        value={data.containers.fullContainers}
                        icon={PackageCheck}
                        accent="success"
                    />

                    <StatCard
                        title="Empty Containers"
                        value={data.containers.emptyContainers}
                        icon={PackageOpen}
                        accent="warning"
                    />

                    <StatCard
                        title="Empty Warehouses"
                        value={data.warehouses.emptyWarehouses}
                        icon={PackageOpen}
                        accent="warning"
                    />

                    <StatCard
                        title="Categories"
                        value={data.categories.totalCategories}
                        icon={Tags}
                        accent="primary"
                    />

                    <StatCard
                        title="Product Types"
                        value={data.productTypes.totalProductTypes}
                        icon={Layers}
                        accent="primary"
                    />
                </div>
            </div>

        </div>
    );
}