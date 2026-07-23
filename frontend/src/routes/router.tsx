

import LoginPage from "@/features/auth/LoginPage"
import DashboardPage from "@/features/dashboard/DashboardPage"
import {createBrowserRouter} from "react-router-dom"
import ProtectedRoute from "@/components/ProtectedRoute"

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <DashboardPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    }
])