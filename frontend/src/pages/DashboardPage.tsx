import DashboardSection from "@/components/dashboard/DashboardSection";
import StatCard from "@/components/dashboard/StatCard";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
    const { data, isLoading, error } = useDashboard();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error || !data) {
        return <h1>Failed to load dashboard.</h1>;
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Warehouse overview and statistics.
                </p>
            </div>

            {/* Products */}

            <DashboardSection title="Products">
                <StatCard
                    title="Total Products"
                    value={data.products.totalProducts}
                />

                <StatCard
                    title="Products Sold"
                    value={data.products.productsSold}
                />
            </DashboardSection>

            {/* Containers */}

            <DashboardSection title="Containers">
                <StatCard
                    title="Total Containers"
                    value={data.containers.totalContainers}
                />

                <StatCard
                    title="Full Containers"
                    value={data.containers.fullContainers}
                />

                <StatCard
                    title="Empty Containers"
                    value={data.containers.emptyContainers}
                />
            </DashboardSection>

            {/* Warehouses */}

            <DashboardSection title="Warehouses">
                <StatCard
                    title="Total Warehouses"
                    value={data.warehouses.totalWarehouses}
                />

                <StatCard
                    title="Empty Warehouses"
                    value={data.warehouses.emptyWarehouses}
                />
            </DashboardSection>

            {/* Inventory Structure */}

            <DashboardSection title="Inventory Structure">
                <StatCard
                    title="Categories"
                    value={data.categories.totalCategories}
                />

                <StatCard
                    title="Product Types"
                    value={data.productTypes.totalProductTypes}
                />
            </DashboardSection>

            {/* Users */}

            <DashboardSection title="Users">
                <StatCard
                    title="Total Users"
                    value={data.users.totalUsers}
                />

                <StatCard
                    title="Admins"
                    value={data.users.totalAdmins}
                />

                <StatCard
                    title="Managers"
                    value={data.users.totalManagers}
                />

                <StatCard
                    title="Staff"
                    value={data.users.totalStaff}
                />

                <StatCard
                    title="Auditors"
                    value={data.users.totalAuditors}
                />
            </DashboardSection>

            {/* Today's Activity */}

            <DashboardSection title="Today's Activity">
                <StatCard
                    title="Stock In Today"
                    value={data.today.stockInToday}
                />

                <StatCard
                    title="Stock Out Today"
                    value={data.today.stockOutToday}
                />
            </DashboardSection>

        </div>
    );
}