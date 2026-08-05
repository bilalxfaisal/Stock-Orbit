import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/InputField";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { useStockOutProduct } from "@/hooks/useProducts";
import { StockOutReason, type Product } from "@/types/products.types";
import { useInventory } from "@/hooks/useInventory";
import FilterSelect from "../FilterSelect";
import { usePermission } from "@/hooks/usePermission";
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

export default function StockOutProductDialog({ product }: { product: Product }) {

    const { can } = usePermission();

    const stockOutProduct = useStockOutProduct();

    const {
        data: inventory = [],
        isLoading: isInventoryLoading,
    } = useInventory({
        brand: product.brand,
        model: product.model,
    });

    const containerOptions = inventory.map((item) => ({
        id: item.containerId,
        label: `${item.container} — ${item.quantity} available`,
    }));

    const [open, setOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState<StockOutReason>(
        StockOutReason.SOLD,
    );
    const [containerId, setContainerId] = useState<number>(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    function clearError(field: string) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    function resetForm() {
        setQuantity(1);
        setReason(StockOutReason.SOLD);
        setContainerId(0);
        setErrors({});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const schema = z
            .object({
                quantity: z
                    .number({ error: "Quantity is required." })
                    .int("Quantity must be a whole number.")
                    .positive("Quantity must be greater than 0."),
                reason: z.enum(StockOutReason, { error: "Please select a reason." }),
                containerId: z
                    .number({ error: "Please select a container." })
                    .refine((value) => value !== 0, "Please select a container."),
            })
            .refine(
                (data) => {
                    const item = inventory.find((i) => i.containerId === data.containerId);
                    return !item || data.quantity <= item.quantity;
                },
                {
                    message: "Quantity exceeds available stock in this container.",
                    path: ["quantity"],
                },
            );

        const result = schema.safeParse({ quantity, reason, containerId });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            await stockOutProduct.mutateAsync({
                productId: product.id,
                containerId: result.data.containerId,
                quantity: result.data.quantity,
                reason: result.data.reason,
            });

            toast.success("Product stocked out.");

            resetForm();
            setOpen(false);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to stock out product."));
        }
    }

    return (
        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}>
            <DialogTrigger render={<Button disabled={!can("stockOut")} />}>Stock Out</DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Stock Out Product
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <InputField
                        label="Brand"
                        value={product.brand}
                        readOnly
                    />

                    <InputField
                        label="Model"
                        value={product.model}
                        readOnly
                    />

                    <InputField
                        label="Quantity"
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(Number(e.target.value));
                            clearError("quantity");
                        }}
                        error={errors.quantity}
                    />

                    <div className="space-y-1.5">
                        <Label>Reason</Label>

                        <FilterSelect
                            value={reason}
                            onValueChange={(value) => {
                                if (value !== undefined) {
                                    setReason(value);
                                    clearError("reason");
                                }
                            }}
                            options={Object.values(StockOutReason).map(
                                (reason) => ({
                                    id: reason,
                                    label: reason,
                                }),
                            )}
                            allLabel="Select reason"
                            showAllOption={false}
                            error={errors.reason}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Container</Label>

                        <FilterSelect
                            value={
                                containerId === 0
                                    ? undefined
                                    : containerId
                            }
                            onValueChange={(value) => {
                                setContainerId(value ?? 0);
                                clearError("containerId");
                            }}
                            options={containerOptions}
                            allLabel={
                                isInventoryLoading
                                    ? "Loading containers..."
                                    : containerOptions.length === 0
                                        ? "No stock available"
                                        : "Select container"
                            }
                            disabled={
                                isInventoryLoading ||
                                inventory.length === 0
                            }
                            error={errors.containerId}
                        />
                    </div>

                    <Button
                        className="w-full"
                        type="submit"
                        disabled={stockOutProduct.isPending}
                    >
                        {stockOutProduct.isPending
                            ? "Stocking Out..."
                            : "Stock Out"}
                    </Button>

                </form>

            </DialogContent>
        </Dialog>
    );
}
