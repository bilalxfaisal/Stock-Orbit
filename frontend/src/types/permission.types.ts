import { UserRole } from "@/types/user.types";

export type Permission =
    | "viewUsers"
    | "createUser"
    | "updateUser"
    | "deleteUser"

    | "viewWarehouses"
    | "createWarehouse"
    | "updateWarehouse"
    | "deleteWarehouse"

    | "viewCategories"
    | "createCategory"
    | "updateCategory"
    | "deleteCategory"

    | "viewContainers"
    | "createContainer"
    | "updateContainer"
    | "deleteContainer"

    | "viewProductTypes"
    | "createProductType"
    | "updateProductType"
    | "deleteProductType"

    | "viewProducts"
    | "createProduct"
    | "updateProduct"
    | "deleteProduct"
    | "stockIn"
    | "stockOut"

    | "viewInventory"

    | "viewAudit";

export const permissions: Record<UserRole, Permission[]> = {

    [UserRole.ADMIN]: [
        "viewUsers",
        "createUser",
        "updateUser",
        "deleteUser",

        "viewWarehouses",
        "createWarehouse",
        "updateWarehouse",
        "deleteWarehouse",

        "viewCategories",
        "createCategory",
        "updateCategory",
        "deleteCategory",

        "viewContainers",
        "createContainer",
        "updateContainer",
        "deleteContainer",

        "viewProductTypes",
        "createProductType",
        "updateProductType",
        "deleteProductType",

        "viewProducts",
        "createProduct",
        "updateProduct",
        "deleteProduct",
        "stockIn",
        "stockOut",

        "viewInventory",

        "viewAudit",
    ],

    [UserRole.MANAGER]: [
        "viewWarehouses",
        "viewCategories",
        "viewContainers",
        "viewProductTypes",

        "viewProducts",
        "createProduct",
        "updateProduct",
        "stockIn",
        "stockOut",

        "viewInventory",
    ],

    [UserRole.STAFF]: [
        "viewProducts",
        "stockIn",
        "stockOut",

        "viewInventory",
    ],

    [UserRole.AUDITOR]: [
        "viewWarehouses",
        "viewCategories",
        "viewContainers",
        "viewProductTypes",
        "viewProducts",
        "viewInventory",
    ],
};