import { Box } from "lucide-react";

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

import UpdateContainerDialog from "./UpdateContainerDialog";
import DeleteContainerDialog from "./DeleteContainerDialog";
import type { Container } from "@/types/container.types";

interface Props {
    containers: Container[];
}

export default function ContainersTable({
    containers,
}: Props) {

    if (!containers.length) {
        return (
            <EmptyState
                icon={Box}
                title="No containers found"
                description="Create a container to start assigning it to a warehouse and category."
            />
        );
    }

    return (
        <DataTableCard>
            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead className="text-right">
                            Maximum Capacity
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Warehouse</TableHead>
                        <TableHead className="text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {containers.map((containers) => (

                        <TableRow key={containers.id}>

                            <TableCell className="font-medium text-foreground">
                                {containers.code}
                            </TableCell>

                            <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                                {containers.maximumCapacity}
                            </TableCell>

                            <TableCell className="text-muted-foreground">
                                {containers.category}
                            </TableCell>

                            <TableCell className="text-muted-foreground">
                                {containers.warehouse}
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">

                                    {/* <UpdateContainerDialog
                                        container={containers}
                                    /> */}

                                    <DeleteContainerDialog
                                        id={containers.id}
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
