import type { StockSettings } from "@/types/config.types";
import api from "./axios";

export async function getStockSettings(): Promise<StockSettings> {
    const response = await api.get("/config/stock-settings");
    return response.data;
}
