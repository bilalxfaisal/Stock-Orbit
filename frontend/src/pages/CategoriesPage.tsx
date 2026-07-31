import { useState } from "react";

import CreateCategoryDialog from "@/components/categories/CreateCategoryDialog";
import CategoryTable from "@/components/categories/CategoryTable";
import { useCategories } from "@/hooks/useCategories";
import PageHeader from "@/components/PageHeader";
import FilterToolbar from "@/components/FilterToolbar";
import SearchInput from "@/components/SearchInput";
import { PageLoadingState, ErrorState } from "@/components/PageStates";

export default function CategoriesPage() {
    const [search, setSearch] = useState("");

    const {
        data: categories = [],
        isLoading,
        error,
    } = useCategories({
        name: search,
    });

    if (isLoading) {
        return <PageLoadingState />;
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Categories"
                description="Manage all categories."
                action={<CreateCategoryDialog />}
            />

            {error ? (
                <ErrorState description="We couldn't load categories. Try adjusting your search or refreshing the page." />
            ) : (
                <>
                    <FilterToolbar>
                        <SearchInput
                            placeholder="Search category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            containerClassName="flex-1 min-w-[200px]"
                        />
                    </FilterToolbar>

                    <CategoryTable categories={categories} />
                </>
            )}
        </div>
    );
}
