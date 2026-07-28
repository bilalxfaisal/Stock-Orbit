import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { ProductType } from "@/types/product-type.types";
import DeleteProductTypeDialog from "./DeleteProductTypeDialog";

interface Props {
    productTypes: ProductType[];
}

export default function ProductTypeTable({ productTypes }: Props) {
    if (!productTypes.length) {
        return <p className="text-muted-foreground">No product types found.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Products Stocked</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {productTypes.map((productType) => (
                    <TableRow key={productType.id}>
                        <TableCell>{productType.name}</TableCell>
                        <TableCell>{productType.category}</TableCell>
                        <TableCell>{productType.productCount}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                            <DeleteProductTypeDialog id={productType.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
