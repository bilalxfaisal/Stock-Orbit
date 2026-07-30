import AuditTable from "@/components/audit/AuditTable";
import FilterSelect from "@/components/FilterSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuditHistory, useAuditStats } from "@/hooks/useAudit";
import { useAuth } from "@/providers/AuthProvider";
import { AuditAction, AuditEntity } from "@/types/audit.types";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AuditPage() {

    const { user } = useAuth();

    if (user?.role === "AUDITOR") {
        return <Navigate to="/" replace />;
    }

    const [action, setAction] = useState<AuditAction | undefined>(undefined);
    const [entity, setEntity] = useState<AuditEntity | undefined>(undefined);

    const {
        data: audits = [],
        isLoading: historyLoading,
        error: historyError
    } = useAuditHistory({
        entity, action,
    });

    const {
        data: stats, isLoading: statsLoading, error: statsError
    } = useAuditStats();

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

            <div className="flex gap-4">
                <FilterSelect<AuditAction>
                    value={action}
                    onValueChange={setAction}
                    options={Object.values(AuditAction).map((action) => ({
                        id: action,
                        label: action,
                    }))}
                    allLabel="All Actions"
                />

                <FilterSelect<AuditEntity>
                    value={entity}
                    onValueChange={setEntity}
                    options={Object.values(AuditEntity).map((entity) => ({
                        id: entity,
                        label: entity,
                    }))}
                    allLabel="All Entities"
                />
            </div>

            <AuditTable audits={audits} />
        </div>
    );
}
