import {
    Package,
    ShoppingCart,
    Container,
    PackageCheck,
    PackageOpen,
    Warehouse,
    Tags,
    Layers,
    Users,
    ShieldCheck,
    UserCog,
    UserRound,
    ClipboardCheck,
    ArrowDownToLine,
    ArrowUpFromLine,
} from "lucide-react";

import DashboardSection from "@/components/dashboard/DashboardSection";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/PageHeader";
import { PageLoadingState, ErrorState } from "@/components/PageStates";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
    const { data, isLoading, error } = useDashboard();

    if (isLoading) {
        return <PageLoadingState rows={4} />;
    }

    if (error || !data) {
        return (
            <div className="space-y-6">
                <PageHeader
                    title="Dashboard"
                    description="Warehouse overview and statistics."
                />
                <ErrorState description="We couldn't load the dashboard statistics. Try refreshing the page." />
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <PageHeader
                title="Dashboard"
                description="Warehouse overview and statistics."
            />

            {/* Products */}

            <DashboardSection title="Products">
                <StatCard
                    title="Total Products"
                    value={data.products.totalProducts}
                    icon={Package}
                    accent="primary"
                />

                <StatCard
                    title="Products Sold"
                    value={data.products.productsSold}
                    icon={ShoppingCart}
                    accent="info"
                />
            </DashboardSection>

            {/* Containers */}

            <DashboardSection title="Containers">
                <StatCard
                    title="Total Containers"
                    value={data.containers.totalContainers}
                    icon={Container}
                    accent="primary"
                />

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
            </DashboardSection>

            {/* Warehouses */}

            <DashboardSection title="Warehouses">
                <StatCard
                    title="Total Warehouses"
                    value={data.warehouses.totalWarehouses}
                    icon={Warehouse}
                    accent="primary"
                />

                <StatCard
                    title="Empty Warehouses"
                    value={data.warehouses.emptyWarehouses}
                    icon={PackageOpen}
                    accent="warning"
                />
            </DashboardSection>

            {/* Inventory Structure */}

            <DashboardSection title="Inventory Structure">
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
            </DashboardSection>

            {/* Users */}

            <DashboardSection title="Users">
                <StatCard
                    title="Total Users"
                    value={data.users.totalUsers}
                    icon={Users}
                    accent="primary"
                />

                <StatCard
                    title="Admins"
                    value={data.users.totalAdmins}
                    icon={ShieldCheck}
                    accent="info"
                />

                <StatCard
                    title="Managers"
                    value={data.users.totalManagers}
                    icon={UserCog}
                    accent="info"
                />

                <StatCard
                    title="Staff"
                    value={data.users.totalStaff}
                    icon={UserRound}
                    accent="info"
                />

                <StatCard
                    title="Auditors"
                    value={data.users.totalAuditors}
                    icon={ClipboardCheck}
                    accent="info"
                />
            </DashboardSection>

            {/* Today's Activity */}

            <DashboardSection title="Today's Activity">
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
            </DashboardSection>

        </div>
    );
}
