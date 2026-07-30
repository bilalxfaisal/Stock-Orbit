import { useState } from "react";

import CreateProductTypeDialog from "@/components/product-types/CreateProductTypeDialog";
import ProductTypeTable from "@/components/product-types/ProductTypeTable";
import { useProductTypes } from "@/hooks/useProductTypes";
import { useCategories } from "@/hooks/useCategories";
import FilterSelect from "@/components/FilterSelect";
import { Input } from "@/components/ui/input";

export default function ProductTypesPage() {
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

    const {
        data: productTypes = [],
        isLoading,
        error,
    } = useProductTypes({
        name: search,
        categoryId,
    });

    const {
        data: categories = [],
    } = useCategories();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Failed to load product types.</h1>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Product Types</h1>
                    <p className="text-muted-foreground">Manage all product types.</p>
                </div>

                <CreateProductTypeDialog />
            </div>

            <div className="flex gap-4">
                <Input
                    className="border rounded px-3 py-2"
                    placeholder="Search product type..."
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
            </div>

            <ProductTypeTable productTypes={productTypes} />
        </div>
    );
}
