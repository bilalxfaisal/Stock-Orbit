import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/components/products/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import DashboardPage from "@/pages/DashboardPage";
import ProductsPage from "@/pages/ProductsPage";
import InventoryPage from "@/pages/InventoryPage";
import ContainersPage from "@/pages/ContainersPage";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductTypesPage from "@/pages/ProductTypesPage";
import WarehousesPage from "@/pages/WarehousesPage";
import UsersPage from "@/pages/UsersPage";
import AuditPage from "@/pages/AuditPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: "/",
                        element: <DashboardPage />,
                    },
                    {
                        path: "/products",
                        element: <ProductsPage />,
                    },
                    {
                        path: "/inventory",
                        element: <InventoryPage />,
                    },
                    {
                        path: "/containers",
                        element: <ContainersPage />,
                    },
                    {
                        path: "/categories",
                        element: <CategoriesPage />,
                    },
                    {
                        path: "/product-types",
                        element: <ProductTypesPage />,
                    },
                    {
                        path: "/warehouses",
                        element: <WarehousesPage />,
                    },
                    {
                        path: "/users",
                        element: <UsersPage />,
                    },
                    {
                        path: "/audit",
                        element: <AuditPage />,
                    },
                    {
                        path: "*",
                        element: <NotFoundPage />,
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);