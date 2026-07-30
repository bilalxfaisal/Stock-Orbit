import { useState } from "react";

import { useInventory } from "@/hooks/useInventory";
import InventoryTable from "@/components/inventory/InventoryTable";
import { useContainers } from "@/hooks/useContainers";
import { useProductTypes } from "@/hooks/useProductTypes";
import { useCategories } from "@/hooks/useCategories";
import FilterSelect from "@/components/FilterSelect";
import { Input } from "@/components/ui/input";

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
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Failed to load Inventory.</h1>;
    }

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">Inventory</h1>
                <p className="text-muted-foreground">
                    View and Find products in Inventory
                </p>
            </div>

            <div className="flex gap-4">
                <Input
                    placeholder="Search brand..."
                    value={brand}
                    onChange={(e) =>
                        setBrand(e.target.value)
                    }
                />

                {/* Model */}

                <Input
                    placeholder="Search model..."
                    value={model}
                    onChange={(e) =>
                        setModel(e.target.value)
                    }
                />

                {/* Category */}

                <FilterSelect
                    value={categoryId}
                    onValueChange={setCategoryId}
                    options={categories.map((category) => ({
                        id: category.id,
                        label: category.name,
                    }))}
                    allLabel="All categories"
                />

                {/* Product type */}

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

                {/* Container */}

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
            </div>

            <InventoryTable inventory={inventory} />

        </div>
    );
}