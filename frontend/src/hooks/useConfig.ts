import { useQuery } from "@tanstack/react-query";

import { getStockSettings } from "@/api/config.api";

export function useStockSettings() {
    return useQuery({
        queryKey: ["config", "stock-settings"],
        queryFn: getStockSettings,
        // This barely ever changes — no need to refetch aggressively.
        staleTime: 5 * 60 * 1000,
    });
}
