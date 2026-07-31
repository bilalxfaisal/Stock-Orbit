import { Navigate } from "react-router-dom";
import { useState } from "react";
import {
    Warehouse,
    Tags,
    Container,
    Layers,
    Package,
    ArrowDownToLine,
    ArrowUpFromLine,
} from "lucide-react";

import AuditTable from "@/components/audit/AuditTable";
import FilterSelect from "@/components/FilterSelect";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/PageHeader";
import FilterToolbar from "@/components/FilterToolbar";
import { PageLoadingState, ErrorState } from "@/components/PageStates";
import { useAuditHistory, useAuditStats } from "@/hooks/useAudit";
import { useAuth } from "@/providers/AuthProvider";
import { AuditAction, AuditEntity } from "@/types/audit.types";

export default function AuditPage() {

    const { user } = useAuth();

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

    if (user?.role === "AUDITOR") {
        return <Navigate to="/" replace />;
    }

    if (historyLoading || statsLoading) {
        return <PageLoadingState />;
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Audit Logs"
                description="Recent system activity and inventory events."
            />

            {(historyError || statsError) ? (
                <ErrorState description="We couldn't load audit data. Try adjusting your filters or refreshing the page." />
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            title="Warehouses"
                            value={stats?.totalWarehouses ?? 0}
                            icon={Warehouse}
                            accent="primary"
                        />
                        <StatCard
                            title="Categories"
                            value={stats?.totalCategories ?? 0}
                            icon={Tags}
                            accent="primary"
                        />
                        <StatCard
                            title="Containers"
                            value={stats?.totalContainers ?? 0}
                            icon={Container}
                            accent="primary"
                        />
                        <StatCard
                            title="Product Types"
                            value={stats?.totalProductTypes ?? 0}
                            icon={Layers}
                            accent="primary"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <StatCard
                            title="Products"
                            value={stats?.totalProducts ?? 0}
                            icon={Package}
                            accent="primary"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <StatCard
                                title="Stock In Today"
                                value={stats?.stockInToday ?? 0}
                                icon={ArrowDownToLine}
                                accent="success"
                            />
                            <StatCard
                                title="Stock Out Today"
                                value={stats?.stockOutToday ?? 0}
                                icon={ArrowUpFromLine}
                                accent="warning"
                            />
                        </div>
                    </div>

                    <FilterToolbar>
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
                    </FilterToolbar>

                    <AuditTable audits={audits} />
                </>
            )}
        </div>
    );
}
