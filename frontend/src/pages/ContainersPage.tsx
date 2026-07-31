import { useState } from "react";

import { useContainers } from "@/hooks/useContainers";
import CreateContainerDialog from "@/components/container/CreateContainerDialog";
import ContainerTable from "@/components/container/ContainerTable";
import FilterSelect from "@/components/FilterSelect";
import { useCategories } from "@/hooks/useCategories";
import { useWarehouses } from "@/hooks/useWarehouses";
import PageHeader from "@/components/PageHeader";
import FilterToolbar from "@/components/FilterToolbar";
import SearchInput from "@/components/SearchInput";
import { PageLoadingState, ErrorState } from "@/components/PageStates";

export default function ContainersPage() {

    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [warehouseId, setWarehouseId] = useState<number | undefined>(undefined);

    const {
        data: containers,
        isLoading,
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
        return <PageLoadingState />;
    }

    return (
        <div className="space-y-6">

            <PageHeader
                title="Containers"
                description="Manage all containers."
                action={<CreateContainerDialog />}
            />

            {error ? (
                <ErrorState description="We couldn't load containers. Try adjusting your filters or refreshing the page." />
            ) : (
                <>
                    <FilterToolbar>
                        <SearchInput
                            placeholder="Search container..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            containerClassName="flex-1 min-w-[160px]"
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
                    </FilterToolbar>

                    <ContainerTable
                        containers={containers ?? []}
                    />
                </>
            )}

        </div>
    );
}
