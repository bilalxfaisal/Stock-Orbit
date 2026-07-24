
import ProductsTable from "@/components/ProductsTable";
import StockInButton from "@/components/StockInButton";

export default function ProductsPage() {
  return (
    <>
      <h1>Products</h1>

      <StockInButton />

      <br />
      
      <ProductsTable />
    </>
  );
}