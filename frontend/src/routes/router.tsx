import {createBrowserRouter} from "react-router-dom"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardPage from "@/pages/DashboardPage"
import LoginPage from "@/pages/LoginPage"
import ProductsPage from "@/pages/ProductsPage"


export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <DashboardPage />
            },
            {
                path: "/products",
                element: <ProductsPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    }
])