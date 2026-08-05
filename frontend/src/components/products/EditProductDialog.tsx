// import { useState } from "react";
// import { Button } from "../ui/button"
// import type { StockOutProps } from "@/types/stock-out-props.types"
// import { StockOutReason } from "@/types/stock-out-reason.enum"
// import { useStockOutProduct } from "@/hooks/useStockOutProduct";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Label } from "../ui/label";
// import { InputField } from "@/components/InputField";

// export default function CreateStockOutProductDialog({
//     product,
//     open,
//     onOpenChange,
// }: StockOutProps) {

//     const { mutate, isPending } = useStockOutProduct();

//     const brand = product.brand;
//     const model = product.model;
//     const inventoryId = product.id;
//     const [quantity, setQuantity] = useState<number>(1)
//     const [reason, setReason] = useState<StockOutReason>(StockOutReason.SOLD)

//     function handleSubmit(e: React.FormEvent) {
//         e.preventDefault();

//         mutate({
//             inventoryId,
//             quantity,
//             reason
//         }, {
//             onSuccess: () => { onOpenChange(false); }
//         }
//         );

//         //resetFilters();
//     }

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange} >
//             <DialogContent>
//                 <form onSubmit={handleSubmit}>
//                     <InputField
//                         label="Brand"
//                         placeholder="Brand"
//                         value={brand}
//                         readOnly
//                     />

//                     <InputField
//                         label="Model"
//                         placeholder="Model"
//                         value={model}
//                         readOnly
//                     />

//                     <InputField
//                         label="Quantity"
//                         type="number"
//                         placeholder="Quantity"
//                         value={quantity}
//                         onChange={(e) => setQuantity(Number(e.target.value))}
//                     />

//                     <Label>Reason</Label>
//                     <br />

//                     <Select
//                         value={reason}
//                         onValueChange={(value) => setReason(value as StockOutReason)}
//                     >
//                         <SelectTrigger>
//                             <SelectValue placeholder="Select reason" />
//                         </SelectTrigger>

//                         <SelectContent>
//                             {Object.values(StockOutReason).map((reason) => (
//                                 <SelectItem key={reason} value={reason}>
//                                     {reason}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>

//                     <br />
//                     <br />

//                     <Button type="submit" disabled={isPending}>
//                         Stock Out
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog >
//     );
// }