import AuditTable from "@/components/audit/AuditTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuditHistory, useAuditStats } from "@/hooks/useAudit";

export default function AuditPage() {
    const { data: audits = [], isLoading: historyLoading, error: historyError } = useAuditHistory();
    const { data: stats, isLoading: statsLoading, error: statsError } = useAuditStats();

    if (historyLoading || statsLoading) {
        return <h1>Loading...</h1>;
    }

    if (historyError || statsError) {
        return <h1>Failed to load audit logs.</h1>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Audit Logs</h1>
                <p className="text-muted-foreground">Recent system activity and inventory events.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Warehouses</CardTitle>
                    </CardHeader>
                    <CardContent>{stats?.totalWarehouses ?? 0}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>{stats?.totalCategories ?? 0}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Containers</CardTitle>
                    </CardHeader>
                    <CardContent>{stats?.totalContainers ?? 0}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Product Types</CardTitle>
                    </CardHeader>
                    <CardContent>{stats?.totalProductTypes ?? 0}</CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                    </CardHeader>
                    <CardContent>{stats?.totalProducts ?? 0}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Today&apos;s Stock Movement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        In: {stats?.stockInToday ?? 0} | Out: {stats?.stockOutToday ?? 0}
                    </CardContent>
                </Card>
            </div>

            <AuditTable audits={audits} />
        </div>
    );
}
