import { useState } from "react";

import { useInventory } from "@/hooks/useInventory";
import InventoryTable from "@/components/inventory/InventoryTable";

export default function InventoryPage() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");

    const {
        data: inventory = [],
        isLoading,
        error,
    } = useInventory({
        brand,
        model,
    });

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
                <input
                    className="border rounded px-3 py-2"
                    placeholder="Search brand..."
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />

                <input
                    className="border rounded px-3 py-2"
                    placeholder="Search model..."
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
            </div>

            <InventoryTable inventory={inventory} />

        </div>
    );
}