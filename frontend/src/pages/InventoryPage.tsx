import { useState } from "react";

import { useInventory } from "@/hooks/useInventory";
import InventoryTable from "@/components/inventory/InventoryTable";
import { useContainers } from "@/hooks/useContainers";
import { useProductTypes } from "@/hooks/useProductTypes";
import { useCategories } from "@/hooks/useCategories";
import FilterSelect from "@/components/FilterSelect";
import PageHeader from "@/components/PageHeader";
import FilterToolbar from "@/components/FilterToolbar";
import SearchInput from "@/components/SearchInput";
import { PageLoadingState, ErrorState } from "@/components/PageStates";

export default function InventoryPage() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [productTypeId, setProductTypeId] = useState<number | undefined>(undefined);
    const [containerId, setContainerId] = useState<number | undefined>(undefined);

    const {
        data: inventory = [],
        isLoading,
        error,
    } = useInventory({
        brand,
        model,
        categoryId,
        containerId,
        productTypeId
    });

    const {
        data: categories = [],
    } = useCategories();

    // Product types

    const {
        data: productTypes = [],
    } = useProductTypes(
        categoryId
            ? {
                categoryId,
            }
            : undefined,
    );

    // Containers

    const {
        data: containers = [],
    } = useContainers(
        categoryId
            ? {
                categoryId,
            }
            : undefined,
    );

    if (isLoading) {
        return <PageLoadingState />;
    }

    return (
        <div className="space-y-6">

            <PageHeader
                title="Inventory"
                description="View and find products in inventory."
            />

            {error ? (
                <ErrorState description="We couldn't load inventory. Try adjusting your filters or refreshing the page." />
            ) : (
                <>
                    <FilterToolbar>
                        <SearchInput
                            placeholder="Search brand..."
                            value={brand}
                            onChange={(e) =>
                                setBrand(e.target.value)
                            }
                            containerClassName="flex-1 min-w-[160px]"
                        />

                        <SearchInput
                            placeholder="Search model..."
                            value={model}
                            onChange={(e) =>
                                setModel(e.target.value)
                            }
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
                            value={productTypeId}
                            onValueChange={setProductTypeId}
                            options={productTypes.map((productType) => ({
                                id: productType.id,
                                label: productType.name,
                            }))}
                            allLabel="All product types"
                            disabled={!categoryId}
                        />

                        <FilterSelect
                            value={containerId}
                            onValueChange={setContainerId}
                            options={containers.map((container) => ({
                                id: container.id,
                                label: container.code,
                            }))}
                            allLabel="All Containers"
                            disabled={!categoryId}
                        />
                    </FilterToolbar>

                    <InventoryTable inventory={inventory} />
                </>
            )}

        </div>
    );
}
