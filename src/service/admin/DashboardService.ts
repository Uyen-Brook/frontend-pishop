// src/services/dashboardService.ts
import { apiClient } from "../api";
// src/types/dashboard.ts
export interface BasicStats {
    totalOrders: number;
    totalProducts: number;
    totalAccounts: number;
    totalRevenue: number;
}

export interface TimeSeriesPoint {
    period: string;
    value: number;
}

export interface RevenueStats {
    monthlyRevenue: TimeSeriesPoint[];
    yearlyRevenue: TimeSeriesPoint[];
    weeklyRevenue: TimeSeriesPoint[];
    last7DaysRevenue: TimeSeriesPoint[];
}

export interface DashboardResponse {
    basicStats?: BasicStats;
    revenueStats?: RevenueStats;
}

export const dashboardService = {
    async getBasicStats(): Promise<BasicStats> {
        const res = await apiClient.get<BasicStats>("/admin/dashboard/stats/basic");
        return res.data;
    },

    async getRevenueStats(year: number): Promise<RevenueStats> {
        const res = await apiClient.get<RevenueStats>("/admin/dashboard/stats/revenue", { params: { year } });
        return res.data;
    },

    async getOverview(from: string, to: string): Promise<DashboardResponse> {
        const res = await apiClient.get<DashboardResponse>("/admin/dashboard/overview", { params: { from, to } });
        return res.data;
    },

    async revenueByDay(from: string, to: string): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/revenue/day", { params: { from, to } });
        return res.data;
    },

    async revenueByMonth(year: number): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/revenue/month", { params: { year } });
        return res.data;
    },

    async revenueByQuarter(year: number): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/revenue/quarter", { params: { year } });
        return res.data;
    },

    async revenueByYearRange(startYear: number, endYear: number): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<{ result: TimeSeriesPoint[] }>("/admin/dashboard/revenue/year", { params: { startYear, endYear } });
        return res.data.result;
    },

    async topProducts(from: string, to: string, limit = 10): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/stats/top-products", { params: { from, to, limit } });
        return res.data;
    },

    async revenueByCategory(from: string, to: string): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/stats/revenue/category", { params: { from, to } });
        return res.data;
    },

    async revenueByBrand(from: string, to: string): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/stats/revenue/brand", { params: { from, to } });
        return res.data;
    },

    async revenueBySupplier(from: string, to: string): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/stats/revenue/supplier", { params: { from, to } });
        return res.data;
    },

    // async ordersByMonth(): Promise<TimeSeriesPoint[]> {
    //     const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/stats/orders/completed/month");
    //     return res.data;
    // },
    async ordersByMonth(year: number): Promise<TimeSeriesPoint[]> {
    const res = await apiClient.get<TimeSeriesPoint[]>(
        "/admin/dashboard/stats/orders/completed/month",
        {
            params: { year }
        }
    );

    return res.data;
},
    async ordersLast7Days(): Promise<TimeSeriesPoint[]> {
        const res = await apiClient.get<TimeSeriesPoint[]>("/admin/dashboard/stats/orders/completed/last7days");
        return res.data;
    },

    async revenueLast7Days(): Promise<TimeSeriesPoint[]> {
        const today = new Date();
        const last7 = new Date();

        last7.setDate(today.getDate() - 6);

        const from = last7.toISOString().split("T")[0];
        const to = today.toISOString().split("T")[0];

        const res = await apiClient.get<TimeSeriesPoint[]>(
            "/admin/dashboard/revenue/day",
            {
                params: { from, to }
            }
        );

        return res.data;
    }
};
