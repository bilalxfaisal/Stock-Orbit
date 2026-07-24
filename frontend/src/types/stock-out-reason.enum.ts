export const StockOutReason = {
    SOLD: "SOLD",
    DAMAGED: "DAMAGED",
    EXPIRED: "EXPIRED",
    OUTDATED: "OUTDATED",
} as const;

export type StockOutReason =
    typeof StockOutReason[keyof typeof StockOutReason];