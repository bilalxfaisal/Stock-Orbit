import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {

    const { data, isLoading, error } = useDashboard();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Failed to load dashboard.</h1>;
    }

    return (
        <>
            <h1>Dashboard</h1>

            <hr />

            <h2>Products</h2>
            <p>Total Products: {data.products.totalProducts}</p>
            <p>Products Sold: {data.products.productsSold}</p>

            <hr />

            <h2>Containers</h2>
            <p>Total Containers: {data.containers.totalContainers}</p>
            <p>Full Containers: {data.containers.fullContainers}</p>
            <p>Empty Containers: {data.containers.emptyContainers}</p>

            <hr />

            <h2>Warehouses</h2>
            <p>Total Warehouses: {data.warehouses.totalWarehouses}</p>
            <p>Empty Warehouses: {data.warehouses.emptyWarehouses}</p>

            <hr />

            <h2>Categories</h2>
            <p>Total Categories: {data.categories.totalCategories}</p>

            <hr />

            <h2>Product Types</h2>
            <p>Total Product Types: {data.productTypes.totalProductTypes}</p>

            <hr />

            <h2>Users</h2>
            <p>Total Users: {data.users.totalUsers}</p>
            <p>Admins: {data.users.totalAdmins}</p>
            <p>Managers: {data.users.totalManagers}</p>
            <p>Staff: {data.users.totalStaff}</p>
            <p>Auditors: {data.users.totalAuditors}</p>

            <hr />

            <h2>Today</h2>
            <p>Stock In Today: {data.today.stockInToday}</p>
            <p>Stock Out Today: {data.today.stockOutToday}</p>
        </>
    );
}