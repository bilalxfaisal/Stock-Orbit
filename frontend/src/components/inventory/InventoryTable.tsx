import { Boxes } from "lucide-react";

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
import type { Inventory } from "@/types/inventory.types";

interface Props {
    inventory: Inventory[];
}

export default function ProductTypeTable({ inventory }: Props) {
    if (!inventory.length) {
        return (
            <EmptyState
                icon={Boxes}
                title="No inventory found"
                description="Try adjusting your filters — inventory shows stocked products across containers."
            />
        );
    }

    return (
        <DataTableCard>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead>Container</TableHead>
                        <TableHead>Product Type</TableHead>
                        <TableHead>Category</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {inventory.map((inventory) => (
                        <TableRow key={inventory.id}>
                            <TableCell className="font-medium text-foreground">{inventory.model}</TableCell>
                            <TableCell className="text-muted-foreground">{inventory.brand}</TableCell>
                            <TableCell className="text-right font-mono tabular-nums text-muted-foreground">{inventory.quantity}</TableCell>
                            <TableCell className="text-muted-foreground">{inventory.container}</TableCell>
                            <TableCell className="text-muted-foreground">{inventory.productType}</TableCell>
                            <TableCell className="text-muted-foreground">{inventory.category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DataTableCard>
    );
}
