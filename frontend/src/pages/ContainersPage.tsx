import { useState } from "react";

import { useContainers } from "@/hooks/useContainers";
import CreateContainerDialog from "@/components/container/CreateContainerDialog";
import ContainerTable from "@/components/container/ContainerTable";
import FilterSelect from "@/components/FilterSelect";
import { useCategories } from "@/hooks/useCategories";
import { useWarehouses } from "@/hooks/useWarehouses";
import { Input } from "@/components/ui/input";

export default function ContainersPage() {

    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [warehouseId, setWarehouseId] = useState<number | undefined>(undefined);

    const {
        data: containers,
        isLoading,
        isFetching,
        error,
    } = useContainers({
        code: search,
        categoryId,
        warehouseId,
    });

    const {
        data: categories = [],
    } = useCategories();

    const {
        data: warehouses = [],
    } = useWarehouses({
        id: warehouseId,
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Failed to load containers.</h1>;
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Containers
                    </h1>

                    <p className="text-muted-foreground">
                        Manage all containers.
                    </p>
                </div>

                <CreateContainerDialog />

            </div >

            <div className="flex gap-4">
                <Input
                    className="border rounded px-3 py-2"
                    placeholder="Search container..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <FilterSelect
                    value={categoryId}
                    onValueChange={setCategoryId}
                    options={categories.map((category) => ({
                        id: category.id,
                        label: category.name,
                    }))}
                    allLabel="All categories"
                />

                <FilterSelect
                    value={warehouseId}
                    onValueChange={setWarehouseId}
                    options={warehouses.map((warehouse) => ({
                        id: warehouse.id,
                        label: `${warehouse.code} - ${warehouse.name}`,
                    }))}
                    allLabel="All warehouses"
                />
            </div>

            {isFetching}

            <ContainerTable
                containers={containers ?? []}
            />

        </div>
    );
}