import CreateWarehouseDialog from "@/components/warehouse/CreateWarehouseDialog";
import WarehouseTable from "@/components/warehouse/WarehouseTable";
import { useWarehouses } from "@/hooks/useWarehouses";
import { useState } from "react";

export default function WarehousesPage() {

    const [search, setSearch] = useState("");

    const {
        data: warehouses = [],
        isLoading,
        isFetching,
        error,
    } = useWarehouses({
        name: search,
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Failed to load warehouses.</h1>;
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Warehouses
                    </h1>

                    <p className="text-muted-foreground">
                        Manage all warehouses.
                    </p>
                </div>

                <CreateWarehouseDialog />
            </div>

            <input
                className="border rounded px-3 py-2"
                placeholder="Search warehouse..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {isFetching}

            <WarehouseTable warehouses={warehouses} />

        </div>
    );
}