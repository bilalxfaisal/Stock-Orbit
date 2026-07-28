import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type { Category } from "@/types/category.types";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

interface Props {
    categories: Category[];
}

export default function CategoryTable({ categories }: Props) {
    if (!categories.length) {
        return <p className="text-muted-foreground">No categories found.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Containers</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.containerCount}</TableCell>
                        <TableCell>{category.productCount}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                            <DeleteCategoryDialog id={category.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
