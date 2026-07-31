import { Layers } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DataTableCard from "@/components/DataTableCard";
import { EmptyState } from "@/components/PageStates";

import type { ProductType } from "@/types/product-type.types";
import DeleteProductTypeDialog from "./DeleteProductTypeDialog";

interface Props {
    productTypes: ProductType[];
}

export default function ProductTypeTable({ productTypes }: Props) {
    if (!productTypes.length) {
        return (
            <EmptyState
                icon={Layers}
                title="No product types found"
                description="Create a product type to start stocking products under a category."
            />
        );
    }

    return (
        <DataTableCard>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Products Stocked</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {productTypes.map((productType) => (
                        <TableRow key={productType.id}>
                            <TableCell className="font-medium text-foreground">{productType.name}</TableCell>
                            <TableCell className="text-muted-foreground">{productType.category}</TableCell>
                            <TableCell className="text-right font-mono tabular-nums text-muted-foreground">{productType.productCount}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <DeleteProductTypeDialog id={productType.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DataTableCard>
    );
}
