import { useState } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useCreateContainer } from "@/hooks/useContainers";
import { InputField } from "../InputField";
import { useCategories } from "@/hooks/useCategories";
import { useWarehouses } from "@/hooks/useWarehouses";
import FilterSelect from "@/components/FilterSelect";
import { Label } from "../ui/label";

export default function CreateContainerDialog() {
    const createContainer = useCreateContainer();

    const [open, setOpen] = useState(false);

    const [code, setCode] = useState("");
    const [maximumCapacity, setMaximumCapacity] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [warehouseId, setWarehouseId] = useState(0);

    const {
        data: warehouses = [],
        isLoading: isWarehouseLoading,
    } = useWarehouses();

    const warehouseOptions = warehouses.map((warehouse) => ({
        id: warehouse.id, 
        label: warehouse.name,
    }))

    const {
        data: categories = [],
        isLoading: isCategoryLoading,
    } = useCategories()

    const categoryOptions = categories.map((category) => ({
        id: category.id, 
        label: category.name,
    }))

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await createContainer.mutateAsync({
                code,
                maximumCapacity,
                categoryId,
                warehouseId,
            });

            toast.success("Container created.");

            setCode("");
            setMaximumCapacity(0),
                setCategoryId(1),
                setWarehouseId(1),

                setOpen(false);
        } catch {
            toast.error("Failed to create container.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger
                render={<Button />}
            >
                Create Container
            </DialogTrigger>

            < DialogContent >
                <DialogHeader>
                    <DialogTitle>Create Container </DialogTitle>
                </DialogHeader>

                < form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <InputField
                        label="Code"
                        type="text"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}

                    />

                    <InputField
                        label="Maximum Capacity"
                        type="number"
                        placeholder="Maximum Capacity"
                        value={maximumCapacity}
                        onChange={(e) => setMaximumCapacity(Number(e.target.value))}

                    />

                    <Label>Category</Label>
                    <FilterSelect
                        value={categoryId === 0 ? undefined : categoryId}
                        onValueChange={(value) => { setCategoryId(value ?? 0) }}
                        options={categoryOptions}
                        allLabel={
                            isCategoryLoading ?
                                "Loading Category ..." :
                                "Select category"
                        }
                    />

                    <Label>Warehouse</Label>
                    <FilterSelect
                        value={warehouseId === 0 ? undefined : warehouseId}
                        onValueChange={(value) => { setWarehouseId(value ?? 0) }}
                        options={warehouseOptions}
                        allLabel={
                            isWarehouseLoading ?
                                "Loading Warehouses ..." :
                                "Select warehouse"
                        }
                    />

                    < Button
                        className="w-full"
                        disabled={createContainer.isPending}
                        type="submit"
                    >
                        {
                            createContainer.isPending
                                ? "Creating..."
                                : "Create"
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
