import { useState } from "react";
import { useStockInProduct } from "@/hooks/useStockInProduct";
import { Input } from "@base-ui/react";
import { Button } from "./ui/button"
import type { StockInProps } from "@/types/stock-in-new-props.types";
import { Dialog, DialogContent } from "./ui/dialog";
import { Label } from "./ui/label";
import type { InputFieldProps } from "@/types/input-field.types";

export default function CreateProductDialog(props: StockInProps) {

    const { mutate, isPending } = useStockInProduct();

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [productTypeId, setProductTypeId] = useState(1);
    const [containerId, setContainerId] = useState(1);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log("Product created")
        mutate({
            brand,
            model,
            price,
            quantity,
            productTypeId,
            containerId,
        }, {
            onSuccess: () => { props.onOpenChange(false) }
        });

        resetFilters();
    }

    const resetFilters = () => {
        setBrand("");
        setModel("");
        setPrice(0);
        setQuantity(0);
        setProductTypeId(1);
        setContainerId(1);
    }

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange} >
            <DialogContent>
                <form onSubmit={handleSubmit}>

                    <InputField
                        label="Brand"
                        type="string"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />

                    <InputField
                        label="Model"
                        type="string"
                        placeholder="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />

                    <InputField
                        label="Price"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />

                    <InputField
                        label="Quantity"
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />

                    <InputField
                        label="Product Type"
                        type="number"
                        placeholder="Product Type"
                        value={productTypeId}
                        onChange={(e) => setProductTypeId(Number(e.target.value))}
                    />

                    <InputField
                        label="Container"
                        type="number"
                        placeholder="Container"
                        value={containerId}
                        onChange={(e) => setContainerId(Number(e.target.value))}
                    />

                    <Label>Brand</Label><br />
                    <Button type="submit" disabled={isPending} >
                        Create Product
                    </Button >

                </form>
            </DialogContent>
        </Dialog>
    );
}

export function InputField(props: InputFieldProps) {
    return (
        <>
            <Label>{props.label}</Label><br />
            <Input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                className={props.className}
            /><br /><br />
        </>
    );
}