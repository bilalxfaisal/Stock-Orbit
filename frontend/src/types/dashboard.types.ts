export interface DashboardStats {
    products: {
        totalProducts: number;
        productsSold: number;
    };
    containers: {
        totalContainers: number;
        fullContainers: number;
        emptyContainers: number;
    };
    warehouses: {
        totalWarehouses: number;
        emptyWarehouses: number;
    };
    categories: {
        totalCategories: number;
    };
    productTypes: {
        totalProductTypes: number;
    };
    users: {
        totalUsers: number;
        totalAdmins: number;
        totalManagers: number;
        totalStaff: number;
        totalAuditors: number;
    };
    today: {
        stockInToday: number;
        stockOutToday: number;
    };
    stockActivity: {
        date: string;
        stockIn: number;
        stockOut: number;
    }[];
    categoryDistribution: {
        name: string;
        productCount: number;
    }[];
    warehouseUtilization: {
        code: string;
        name: string;
        currentCapacity: number;
        maximumCapacity: number;
        utilization: number;
    }[];
    recentActivity: {
        id: number;
        action: string;
        entity: string;
        quantity: number | null;
        reason: string | null;
        description: string | null;
        createdAt: string;
    }[];
}