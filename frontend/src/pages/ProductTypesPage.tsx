import { useState } from "react";

import CreateProductTypeDialog from "@/components/product-types/CreateProductTypeDialog";
import ProductTypeTable from "@/components/product-types/ProductTypeTable";
import { useProductTypes } from "@/hooks/useProductTypes";
import { useCategories } from "@/hooks/useCategories";
import FilterSelect from "@/components/FilterSelect";
import PageHeader from "@/components/PageHeader";
import FilterToolbar from "@/components/FilterToolbar";
import SearchInput from "@/components/SearchInput";
import { PageLoadingState, ErrorState } from "@/components/PageStates";

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
        return <PageLoadingState />;
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Product Types"
                description="Manage all product types."
                action={<CreateProductTypeDialog />}
            />

            {error ? (
                <ErrorState description="We couldn't load product types. Try adjusting your filters or refreshing the page." />
            ) : (
                <>
                    <FilterToolbar>
                        <SearchInput
                            placeholder="Search product type..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            containerClassName="flex-1 min-w-[200px]"
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
                    </FilterToolbar>

                    <ProductTypeTable productTypes={productTypes} />
                </>
            )}
        </div>
    );
}
