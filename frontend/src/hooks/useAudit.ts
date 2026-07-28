import { useQuery } from "@tanstack/react-query";

import { getAuditHistory, getAuditStats } from "@/api/audit.api";

export function useAuditHistory() {
  return useQuery({
    queryKey: ["audit-history"],
    queryFn: getAuditHistory,
  });
}

export function useAuditStats() {
  return useQuery({
    queryKey: ["audit-stats"],
    queryFn: getAuditStats,
  });
}
