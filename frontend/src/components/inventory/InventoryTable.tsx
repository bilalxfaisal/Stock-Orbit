import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Inventory } from "@/types/inventory.types";

interface Props {
    inventory: Inventory[];
}

export default function ProductTypeTable({ inventory }: Props) {
    if (!inventory.length) {
        return <p className="text-muted-foreground">No product types found.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Container</TableHead>
                    <TableHead>Product Type</TableHead>
                    <TableHead>Container</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {inventory.map((inventory) => (
                    <TableRow key={inventory.id}>
                        <TableCell>{inventory.model}</TableCell>
                        <TableCell>{inventory.brand}</TableCell>
                        <TableCell>{inventory.quantity}</TableCell>
                        <TableCell>{inventory.price}</TableCell>
                        <TableCell>{inventory.container}</TableCell>
                        <TableCell>{inventory.productType}</TableCell>
                        <TableCell>{inventory.category}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
