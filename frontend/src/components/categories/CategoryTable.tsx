import { FolderTree } from "lucide-react";

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

import type { Category } from "@/types/category.types";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

interface Props {
    categories: Category[];
}

export default function CategoryTable({ categories }: Props) {
    if (!categories.length) {
        return (
            <EmptyState
                icon={FolderTree}
                title="No categories found"
                description="Create a category to start organizing product types and containers."
            />
        );
    }

    return (
        <DataTableCard>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Containers</TableHead>
                        <TableHead className="text-right">Products</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium text-foreground">{category.name}</TableCell>
                            <TableCell className="text-right font-mono tabular-nums text-muted-foreground">{category.containerCount}</TableCell>
                            <TableCell className="text-right font-mono tabular-nums text-muted-foreground">{category.productCount}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <DeleteCategoryDialog id={category.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DataTableCard>
    );
}
