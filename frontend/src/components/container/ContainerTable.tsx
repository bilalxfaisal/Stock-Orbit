import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
            <p className="text-muted-foreground">
                No containers found.
            </p>
        );
    }

    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Maximum Capacity</TableHead>
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

                        <TableCell>
                            {containers.code}
                        </TableCell>

                        <TableCell>
                            {containers.maximumCapacity}
                        </TableCell>

                        <TableCell>
                            {containers.category}
                        </TableCell>

                        <TableCell>
                            {containers.warehouse}
                        </TableCell>

                        <TableCell className="flex justify-end gap-2">

                            <UpdateContainerDialog
                                container={containers}
                            />

                            <DeleteContainerDialog
                                id={containers.id}
                            />

                        </TableCell>

                    </TableRow>

                ))}

            </TableBody>

        </Table>
    );
}