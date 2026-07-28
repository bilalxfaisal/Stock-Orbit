import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen">

            <aside className="w-64 border-r bg-background shrink-0">
                <Sidebar />
            </aside>

            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>

        </div>
    );
}