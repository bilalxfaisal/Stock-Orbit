import { useState } from "react";
import { useStockInProduct } from "@/hooks/useStockInProduct";
import { Input } from "@base-ui/react";
import { Button } from "./ui/button"

export default function CreateProductDialog() {

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
        <form onSubmit={handleSubmit}>

            <Input
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />

            <Input
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />

            <Input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />

            <Input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <Input
                type="number"
                placeholder="Product Type"
                value={productTypeId}
                onChange={(e) => setProductTypeId(Number(e.target.value))}
            />

            <Input
                type="number"
                placeholder="Container"
                value={containerId}
                onChange={(e) => setContainerId(Number(e.target.value))}
            />

            <Button type="submit" disabled={isPending} >
                Create Product
            </Button >

        </form>
    );
}