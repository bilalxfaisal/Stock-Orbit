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

    | "viewAudit"

    | "viewSettings"
    | "updateSettings";

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

        "viewSettings",
        "updateSettings",
    ],

    [UserRole.MANAGER]: [
        "viewUsers",

        "viewWarehouses",
        "createWarehouse",
        "updateWarehouse",

        "viewCategories",
        "createCategory",
        "updateCategory",

        "viewContainers",
        "createContainer",
        "updateContainer",

        "viewProductTypes",
        "createProductType",
        "updateProductType",

        "viewProducts",
        "createProduct",
        "updateProduct",

        "stockIn",
        "stockOut",

        "viewInventory",

        "viewAudit",
    ],

    [UserRole.STAFF]: [
        "viewUsers",

        "viewWarehouses",
        "viewCategories",
        "viewContainers",
        "viewProductTypes",

        "viewProducts",

        "stockIn",
        "stockOut",

        "viewInventory",
    ],

    [UserRole.AUDITOR]: [
        "viewUsers",

        "viewWarehouses",
        "viewCategories",
        "viewContainers",
        "viewProductTypes",

        "viewProducts",

        "viewInventory",

        "viewAudit",
    ],
};