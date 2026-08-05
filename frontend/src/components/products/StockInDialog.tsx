import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

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
import { usePermission } from "@/hooks/usePermission";
import { useStockSettings } from "@/hooks/useConfig";
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

const baseSchema = {
    brand: z.string().trim().min(1, "Brand is required."),
    model: z.string().trim().min(1, "Model is required."),
    price: z.number({ error: "Price is required." }).positive("Price must be greater than 0."),
    quantity: z.number({ error: "Quantity is required." }).int("Quantity must be a whole number.").positive("Quantity must be greater than 0."),
    productTypeId: z.number({ error: "Please select a product type." }).refine((value) => value !== 0, "Please select a product type."),
};

const manualSchema = z.object({
    ...baseSchema,
    containerId: z.number({ error: "Please select a container." }).refine((value) => value !== 0, "Please select a container."),
});

const autoSchema = z.object(baseSchema);

export default function CreateProductDialog() {

    const { can } = usePermission();

    // Whether the user is allowed to pick a container manually, or the
    // backend assigns one automatically on stock-in.

    const {
        data: stockSettings,
        isLoading: isStockSettingsLoading,
    } = useStockSettings();

    const allowManualContainerSelection =
        stockSettings?.allowManualContainerSelection ?? true;

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

    const [errors, setErrors] = useState<Record<string, string>>({});

    function clearError(field: string) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }

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

        const schema = allowManualContainerSelection ? manualSchema : autoSchema;

        const result = schema.safeParse({
            brand,
            model,
            price,
            quantity,
            productTypeId,
            ...(allowManualContainerSelection ? { containerId } : {}),
        });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            const response = await stockInProduct.mutateAsync(result.data);

            if (!allowManualContainerSelection && response?.container?.code) {
                toast.success(
                    `Product stocked in — assigned to container ${response.container.code}.`,
                );
            } else {
                toast.success(
                    "Product stocked in.",
                );
            }

            resetForm();
            setOpen(false);

        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to stock in product."));
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

        setErrors({});
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}
        >

            <DialogTrigger
                render={<Button disabled={!can("stockIn")} />}
            >
                Stock In Product
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">

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
                        onChange={(e) => {
                            setBrand(e.target.value);
                            clearError("brand");
                        }}
                        error={errors.brand}
                    />

                    {/* Model */}

                    <InputField
                        label="Model"
                        type="text"
                        placeholder="Enter model"
                        value={model}
                        onChange={(e) => {
                            setModel(e.target.value);
                            clearError("model");
                        }}
                        error={errors.model}
                    />

                    {/* Price */}

                    <InputField
                        label="Price"
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => {
                            setPrice(Number(e.target.value));
                            clearError("price");
                        }}
                        error={errors.price}
                    />

                    {/* Quantity */}

                    <InputField
                        label="Quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(Number(e.target.value));
                            clearError("quantity");
                        }}
                        error={errors.quantity}
                    />

                    {/* Product type */}

                    <div className="space-y-1.5">
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

                                clearError("productTypeId");

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
                            error={errors.productTypeId}
                        />
                    </div>

                    {/* Container */}

                    {allowManualContainerSelection ? (
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
                                error={errors.containerId}
                            />
                        </div>
                    ) : (
                        !isStockSettingsLoading && (
                            <p className="rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                                A container will be assigned automatically based on available capacity.
                            </p>
                        )
                    )}

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
