import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-background">

            <aside className="w-64 shrink-0">
                <Sidebar />
            </aside>

            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}