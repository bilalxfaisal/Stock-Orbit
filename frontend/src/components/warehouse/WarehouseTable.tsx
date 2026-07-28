import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
            <p className="text-muted-foreground">
                No warehouses found.
            </p>
        );
    }

    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Containers</TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                {warehouses.map((warehouse) => (

                    <TableRow key={warehouse.id}>

                        <TableCell>
                            {warehouse.code}
                        </TableCell>

                        <TableCell>
                            {warehouse.name}
                        </TableCell>

                        <TableCell>
                            {warehouse.location}
                        </TableCell>

                        <TableCell>
                            {warehouse.containerQty}
                        </TableCell>

                        <TableCell className="flex justify-end gap-2">

                            <UpdateWarehouseDialog
                                warehouse={warehouse}
                            />

                            <DeleteWarehouseDialog
                                id={warehouse.id}
                            />

                        </TableCell>

                    </TableRow>

                ))}

            </TableBody>

        </Table>
    );
}