import CreateWarehouseDialog from "@/components/warehouse/CreateWarehouseDialog";
import WarehouseTable from "@/components/warehouse/WarehouseTable";
import { useWarehouses } from "@/hooks/useWarehouses";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import FilterToolbar from "@/components/FilterToolbar";
import SearchInput from "@/components/SearchInput";
import { PageLoadingState, ErrorState } from "@/components/PageStates";

export default function WarehousesPage() {

    const [search, setSearch] = useState("");

    const {
        data: warehouses = [],
        isLoading,
        error,
    } = useWarehouses({
        name: search,
    });

    if (isLoading) {
        return <PageLoadingState />;
    }

    return (
        <div className="space-y-6">

            <PageHeader
                title="Warehouses"
                description="Manage all warehouses."
                action={<CreateWarehouseDialog />}
            />

            {error ? (
                <ErrorState description="We couldn't load warehouses. Try adjusting your search or refreshing the page." />
            ) : (
                <>
                    <FilterToolbar>
                        <SearchInput
                            placeholder="Search warehouse..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            containerClassName="flex-1 min-w-[200px]"
                        />
                    </FilterToolbar>

                    <WarehouseTable warehouses={warehouses} />
                </>
            )}

        </div>
    );
}
