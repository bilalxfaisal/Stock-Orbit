import { Heading2 } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import type { ProductResponse } from "@/types/products.types";
import CreateStockOutProductDialog from "./stockOutProductDialog";
import { Button } from "./ui/button";
import { useState } from "react";

export default function ProductsTable() {

  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data = [], isLoading, isError } = useProducts();

  const openStockOutDialog = (product: ProductResponse) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  if (isLoading) return <Heading2>Loading...</Heading2>;

  if (isError) return <Heading2>Error loading products.</Heading2>;

    return (
    <>
      <Table border={1} cellPadding={8}>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Container</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product: ProductResponse) => (
            <TableRow key={product.id}>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.model}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.productType}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.container}</TableCell>

              <TableCell>
                <Button onClick={() => openStockOutDialog(product)}>
                  Stock Out
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedProduct && (
        <CreateStockOutProductDialog
          product={selectedProduct}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
}

