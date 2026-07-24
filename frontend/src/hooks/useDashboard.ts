import { getDashboard } from "@/api/dashboard.api";
import { useQuery } from "@tanstack/react-query";

export function useDashboard() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
    });
}