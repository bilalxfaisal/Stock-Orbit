import { useState } from "react";
import CreateProductDialog from "./StockInDialog";
import { Button } from "../ui/button";

export default function StockInButton() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openStockInDialog = () => {
        setIsDialogOpen(true);
    };
    return <>
        <Button
            onClick={openStockInDialog} >
            Stock In New Product
        </Button>
        {<CreateProductDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        }
    </>
}

