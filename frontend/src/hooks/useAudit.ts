import { useQuery } from "@tanstack/react-query";

import { getAuditHistory, getAuditStats } from "@/api/audit.api";
import type { SearchAuditDto } from "@/types/audit.types";

export function useAuditHistory(query?: SearchAuditDto) {
  return useQuery({
    queryKey: ["audit-history", query],
    queryFn: () => getAuditHistory(query),
  });
}

export function useAuditStats() {
  return useQuery({
    queryKey: ["audit-stats"],
    queryFn: getAuditStats,
  });
}
