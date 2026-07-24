import CreateProductDialog from "@/components/CreateProductDialog";
import ProductsTable from "@/components/ProductsTable";

export default function ProductsPage() {
  return (
    <>
      <h1>Products</h1>

      <CreateProductDialog />

      <br />
      
      <ProductsTable />
    </>
  );
}