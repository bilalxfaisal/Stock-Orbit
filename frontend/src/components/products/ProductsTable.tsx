import { PackageSearch } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import DataTableCard from "@/components/DataTableCard";
import { EmptyState } from "@/components/PageStates";
import type { Product } from "@/types/products.types";
import StockOutProductDialog from "./StockOutDialog";

interface Props {
  products: Product[];
}
export default function ProductsTable({ products }: Props) {

  if (!products.length) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="Try adjusting your filters, or stock in a new product to get started."
      />
    );
  }

  return (
    <DataTableCard>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium text-foreground">{product.brand}</TableCell>
              <TableCell className="text-muted-foreground">{product.model}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {new Intl.NumberFormat().format(product.price)}
              </TableCell>
              <TableCell className="text-muted-foreground">{product.productType}</TableCell>
              <TableCell className="text-muted-foreground">{product.category}</TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end">
                  <StockOutProductDialog product={product} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableCard>
  );
}
