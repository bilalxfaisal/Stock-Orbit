import { useState } from "react";
import { toast } from "sonner";

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

export default function StockOutProductDialog({ product }: { product: Product }) {

    const {can} = usePermission();

    console.log("Product received:", product);

    console.log("Reached Stock Out Dialog");

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

    console.log(containerOptions);

    const [open, setOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState<StockOutReason>(
        StockOutReason.SOLD,
    );
    const [containerId, setContainerId] = useState<number>(1);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await stockOutProduct.mutateAsync({
                productId: product.id,
                containerId,
                quantity,
                reason,
            });

            toast.success("Product stocked out.");

            setQuantity(1);
            setReason(StockOutReason.SOLD);
            setOpen(false);
        } catch {
            toast.error("Failed to stock out product.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button disabled={!can("stockOut")}/>}>Stock Out</DialogTrigger>
            <DialogContent>
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
                        placeholder="Brand"
                        readOnly
                    />

                    <InputField
                        label="Model"
                        value={product.model}
                        placeholder="Model"
                        readOnly
                    />

                    <InputField
                        label="Quantity"
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Number(e.target.value))
                        }
                    />

                    <div>
                        <Label>Reason</Label>< br />

                        <FilterSelect
                            value={reason}
                            onValueChange={(value) => {
                                if (value !== undefined) {
                                    setReason(value);
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
                        />
                    </div>

                    <div>
                        <Label>Container</Label><br />

                        <FilterSelect
                            value={
                                containerId === 0
                                    ? undefined
                                    : containerId
                            }
                            onValueChange={(value) =>
                                setContainerId(Number(value) ?? 0)
                            }
                            options={containerOptions}
                            allLabel={
                                isInventoryLoading
                                    ? "Loading containers..."
                                    : "Select container"
                            }
                            disabled={
                                isInventoryLoading ||
                                inventory.length === 0
                            }
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