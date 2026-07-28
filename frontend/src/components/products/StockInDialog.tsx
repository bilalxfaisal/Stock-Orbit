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

import { useStockInProduct } from "@/hooks/useProducts";
import { InputField } from "../InputField";
import { useProductTypes } from "@/hooks/useProductTypes";
import { useContainers } from "@/hooks/useContainers";
import FilterSelect from "../FilterSelect";
import { Label } from "../ui/label";

export default function CreateProductDialog() {

    // Stock-in mutation

    const stockInProduct = useStockInProduct();

    // Form state

    const [open, setOpen] = useState(false);

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    // 0 means no option has been selected

    const [productTypeId, setProductTypeId] = useState(0);
    const [containerId, setContainerId] = useState(0);

    // Get all product types

    const {
        data: productTypes = [],
        isLoading: isProductTypeLoading,
    } = useProductTypes();

    // Convert product types into FilterSelect options

    const productTypeOptions = productTypes.map(
        (productType) => ({
            id: productType.id,
            label: productType.name,
        }),
    );

    // Find the selected product type

    const selectedProductType = productTypes.find(
        (productType) =>
            productType.id === productTypeId,
    );

    // Get the category of the selected product type

    const selectedCategoryId =
        selectedProductType?.categoryId;

    // Get only containers belonging to that category

    const {
        data: containers = [],
        isLoading: isContainerLoading,
    } = useContainers(
        selectedCategoryId !== undefined
            ? {
                categoryId: selectedCategoryId,
            }
            : undefined,
    );

    // Convert containers into FilterSelect options

    const containerOptions = containers.map(
        (container) => ({
            id: container.id,
            label: container.code,
        }),
    );

    // Submit stock-in request

    async function handleSubmit(
        e: React.FormEvent,
    ) {
        e.preventDefault();

        // Prevent submitting without selections

        if (
            productTypeId === 0 ||
            containerId === 0
        ) {
            toast.error(
                "Please select a product type and container.",
            );

            return;
        }

        try {
            await stockInProduct.mutateAsync({
                brand,
                model,
                price,
                quantity,
                productTypeId,
                containerId,
            });

            toast.success(
                "Product stocked in.",
            );

            resetForm();
            setOpen(false);

        } catch {
            toast.error(
                "Failed to stock in product.",
            );
        }
    }

    // Reset all form fields

    function resetForm() {
        setBrand("");
        setModel("");

        setPrice(0);
        setQuantity(0);

        setProductTypeId(0);
        setContainerId(0);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger
                render={<Button />}
            >
                Stock In Product
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        Stock In Product
                    </DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* Brand */}

                    <InputField
                        label="Brand"
                        type="text"
                        placeholder="Enter brand"
                        value={brand}
                        onChange={(e) =>
                            setBrand(
                                e.target.value,
                            )
                        }
                    />

                    {/* Model */}

                    <InputField
                        label="Model"
                        type="text"
                        placeholder="Enter model"
                        value={model}
                        onChange={(e) =>
                            setModel(
                                e.target.value,
                            )
                        }
                    />

                    {/* Price */}

                    <InputField
                        label="Price"
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) =>
                            setPrice(
                                Number(
                                    e.target.value,
                                ),
                            )
                        }
                    />

                    {/* Quantity */}

                    <InputField
                        label="Quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(
                                Number(
                                    e.target.value,
                                ),
                            )
                        }
                    />

                    {/* Product type */}

                    <Label>Product Type</Label>
                    <FilterSelect
                        value={
                            productTypeId === 0
                                ? undefined
                                : productTypeId
                        }
                        onValueChange={(value) => {

                            setProductTypeId(
                                value ?? 0,
                            );

                            // The selected container may
                            // belong to the old category

                            setContainerId(0);
                        }}
                        options={
                            productTypeOptions
                        }
                        allLabel={
                            isProductTypeLoading
                                ? "Loading product types..."
                                : "Select product type"
                        }
                        disabled={
                            isProductTypeLoading ||
                            productTypes.length === 0
                        }
                    />

                    {/* Container */}

                    <Label>Container</Label>
                    <FilterSelect
                        value={
                            containerId === 0
                                ? undefined
                                : containerId
                        }
                        onValueChange={(value) =>
                            setContainerId(
                                value ?? 0,
                            )
                        }
                        options={
                            containerOptions
                        }
                        allLabel={
                            productTypeId === 0
                                ? "Select product type first"
                                : isContainerLoading
                                    ? "Loading containers..."
                                    : containers.length === 0
                                        ? "No containers available"
                                        : "Select container"
                        }
                        disabled={
                            productTypeId === 0 ||
                            isContainerLoading ||
                            containers.length === 0
                        }
                    />

                    {/* Submit */}

                    <Button
                        className="w-full"
                        type="submit"
                        disabled={
                            stockInProduct.isPending
                        }
                    >

                        {stockInProduct.isPending
                            ? "Stocking In..."
                            : "Stock In"}

                    </Button>

                </form>

            </DialogContent>

        </Dialog>
    );
}