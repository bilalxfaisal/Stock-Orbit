import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { Product } from "@/types/products.types";
import StockOutProductDialog from "./StockOutDialog";

interface Props {
  products: Product[];
}
export default function ProductsTable({ products }: Props) {

  if (!products.length) {
    return (
      <p className="text-muted-foreground">
        No products found.
      </p>
    );
  }

  return (
    <>
      <Table border={1} cellPadding={8}>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Model</TableHead>
            {/* <TableHead>Quantity</TableHead> */}
            <TableHead>Price</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead>Category</TableHead>
            {/* <TableHead>Container</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.model}</TableCell>
              {/* <TableCell>{product.quantity}</TableCell> */}
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.productType}</TableCell>
              <TableCell>{product.category}</TableCell>
              {/* <TableCell>{product.container}</TableCell> */}

              <TableCell>
                <StockOutProductDialog product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

