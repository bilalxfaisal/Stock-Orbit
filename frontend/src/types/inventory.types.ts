export interface Inventory {
    id: number, 
    productId: number, 
    brand: string,
    model: string
    price: number, 
    containerId: number, 
    container: string, 
    category: string,
    productType: string, 
    quantity: number
}

export interface SearchInventoryDto {
    model?: string, 
    brand?: string, 
    containerId?: number,
    categoryId?: number,
    productTypeId?: number,
}

// "id": 4,
//     "productId": 41,
//     "brand": "Zero",
//     "model": "Z811",
//     "price": 5000,
//     "containerId": 5,
//     "containerCode": "C1001",
//     "category": "Electronics",
//     "productType": "Earbuds",
//     "quantity": 3,
//     "createdAt": "2026-07-27T17:28:29.103Z",
//     "updatedAt": "2026-07-27T17:28:29.103Z"