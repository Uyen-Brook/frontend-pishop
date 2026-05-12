import { useState, useEffect } from "react";
import { dashboardService, DashboardResponse, TimeSeriesPoint } from "../service/admin/DashboardService";

// ============================
// HOOK: FETCH OVERVIEW DATA
// ============================
export function useOverviewData() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const from = '2020-01-01';
        const to = new Date().toISOString().split('T')[0];
        const result = await dashboardService.getOverview(from, to);
        setData(result);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching overview:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, isLoading, error };
}

// ============================
// HOOK: FETCH REVENUE DATA
// ============================
export function useRevenueData(period: 'month' | 'quarter' | 'year', year: number) {
  const [data, setData] = useState<TimeSeriesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let result: TimeSeriesPoint[] = [];
        if (period === 'month') {
          result = await dashboardService.revenueByMonth(year);
        } else if (period === 'quarter') {
          result = await dashboardService.revenueByQuarter(year);
        } else if (period === 'year') {
          const currentYear = new Date().getFullYear();
          result = await dashboardService.revenueByYearRange(currentYear - 5, currentYear);
        }
        setData(result);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching revenue:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [period, year]);

  return { data, isLoading, error };
}

// ============================
// HOOK: FETCH ORDERS DATA
// ============================

export function useOrdersData() {
  const [byMonth, setByMonth] = useState<TimeSeriesPoint[]>([]);
  const [last7Days, setLast7Days] = useState<TimeSeriesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const currentYear = new Date().getFullYear();

        const [monthData, daysData] = await Promise.all([
          dashboardService.ordersByMonth(currentYear),
          dashboardService.ordersLast7Days(),
        ]);

        setByMonth(monthData);
        setLast7Days(daysData);

      } catch (err) {
        setError(err as Error);
        console.error("Error fetching orders:", err);

      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { byMonth, last7Days, isLoading, error };
}

// ============================
// HOOK: FETCH REVENUE LAST 7 DAYS
// ============================
export function useRevenueLast7Days() {
  const [data, setData] = useState<TimeSeriesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await dashboardService.revenueLast7Days();
        setData(result);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching revenue last 7 days:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, isLoading, error };
}

// ============================
// HOOK: FETCH REVENUE BY CATEGORY
// ============================
export function useRevenueByCategory() {
  const [data, setData] = useState<TimeSeriesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const from = '2020-01-01';
        const to = new Date().toISOString().split('T')[0];
        const result = await dashboardService.revenueByCategory(from, to);
        setData(result);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching revenue by category:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, isLoading, error };
}

// ============================
// HOOK: FETCH REVENUE BY BRAND
// ============================
export function useRevenueByBrand() {
  const [data, setData] = useState<TimeSeriesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const from = '2020-01-01';
        const to = new Date().toISOString().split('T')[0];
        const result = await dashboardService.revenueByBrand(from, to);
        setData(result);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching revenue by brand:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, isLoading, error };
}

// ============================
// HOOK: FETCH REVENUE BY SUPPLIER
// ============================
export function useRevenueBySupplier() {
  const [data, setData] = useState<TimeSeriesPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const from = '2020-01-01';
        const to = new Date().toISOString().split('T')[0];
        const result = await dashboardService.revenueBySupplier(from, to);
        setData(result);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching revenue by supplier:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, isLoading, error };
}
