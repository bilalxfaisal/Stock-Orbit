import { Warehouse as WarehouseIcon } from "lucide-react";

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

import type { Warehouse } from "@/types/warehouse.types";

import UpdateWarehouseDialog from "./UpdateWarehouseDialog";
import DeleteWarehouseDialog from "./DeleteWarehouseDialog";

interface Props {
    warehouses: Warehouse[];
}

export default function WarehouseTable({
    warehouses,
}: Props) {

    if (!warehouses.length) {
        return (
            <EmptyState
                icon={WarehouseIcon}
                title="No warehouses found"
                description="Try adjusting your search, or create a new warehouse."
            />
        );
    }

    return (
        <DataTableCard>
            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Containers</TableHead>
                        <TableHead className="text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {warehouses.map((warehouse) => (

                        <TableRow key={warehouse.id}>

                            <TableCell className="font-medium text-foreground">
                                {warehouse.code}
                            </TableCell>

                            <TableCell className="text-muted-foreground">
                                {warehouse.name}
                            </TableCell>

                            <TableCell className="text-muted-foreground">
                                {warehouse.location}
                            </TableCell>

                            <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                                {warehouse.containerQty}
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <UpdateWarehouseDialog
                                        warehouse={warehouse}
                                    />

                                    <DeleteWarehouseDialog
                                        id={warehouse.id}
                                    />
                                </div>
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>
        </DataTableCard>
    );
}
