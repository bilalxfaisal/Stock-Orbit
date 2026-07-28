import { useState } from "react";

import CreateCategoryDialog from "@/components/categories/CreateCategoryDialog";
import CategoryTable from "@/components/categories/CategoryTable";
import { useCategories } from "@/hooks/useCategories";

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
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Failed to load categories.</h1>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <p className="text-muted-foreground">Manage all categories.</p>
                </div>

                <CreateCategoryDialog />
            </div>

            <input
                className="border rounded px-3 py-2"
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <CategoryTable categories={categories} />
        </div>
    );
}
