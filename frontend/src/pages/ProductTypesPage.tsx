import { useState } from "react";

import CreateProductTypeDialog from "@/components/product-types/CreateProductTypeDialog";
import ProductTypeTable from "@/components/product-types/ProductTypeTable";
import { useProductTypes } from "@/hooks/useProductTypes";

export default function ProductTypesPage() {
    const [search, setSearch] = useState("");

    const {
        data: productTypes = [],
        isLoading,
        error,
    } = useProductTypes({
        name: search,
    });

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

            <input
                className="border rounded px-3 py-2"
                placeholder="Search product type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ProductTypeTable productTypes={productTypes} />
        </div>
    );
}
