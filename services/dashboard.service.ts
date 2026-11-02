import { DashboardDataset, DashboardSummaryKpis, MonthlyOrderMetrics, MonthlyShippingSummary, Order } from "@/types/ecommerce";
import { MOCK_DASHBOARD_DATA } from "@/data/mock-dashboard";

/**
 * Clean Architecture - Service / Use-Case Layer
 * Decouples presentation components from the raw data source.
 * In production, this can be swapped with BigQuery/ClickHouse/Postgres analytical queries.
 */
export interface IDashboardService {
  getDashboardDataset(): Promise<DashboardDataset>;
  getSummaryKpis(): Promise<DashboardSummaryKpis>;
  getMonthlyOrderTrends(): Promise<MonthlyOrderMetrics[]>;
  getShippingAnalytics(): Promise<MonthlyShippingSummary>;
  getRecentOrders(limit?: number): Promise<Order[]>;
}

export class DashboardService implements IDashboardService {
  /**
   * Retrieves the comprehensive aggregate dashboard dataset.
   */
  async getDashboardDataset(): Promise<DashboardDataset> {
    // Simulated micro-delay for realistic async pipeline resolution
    return Promise.resolve(MOCK_DASHBOARD_DATA);
  }

  /**
   * Retrieves high-level KPI cards for executive decision making.
   */
  async getSummaryKpis(): Promise<DashboardSummaryKpis> {
    return Promise.resolve(MOCK_DASHBOARD_DATA.summaryKpis);
  }

  /**
   * Retrieves 12 months order metrics and GMV trends.
   */
  async getMonthlyOrderTrends(): Promise<MonthlyOrderMetrics[]> {
    return Promise.resolve(MOCK_DASHBOARD_DATA.monthlyOrderTrends);
  }

  /**
   * Retrieves current monthly shipping delivery breakdown and delay root-causes.
   */
  async getShippingAnalytics(): Promise<MonthlyShippingSummary> {
    return Promise.resolve(MOCK_DASHBOARD_DATA.shippingMonthlyAnalytics);
  }

  /**
   * Retrieves latest transaction stream with optional limit.
   */
  async getRecentOrders(limit: number = 10): Promise<Order[]> {
    return Promise.resolve(MOCK_DASHBOARD_DATA.recentOrders.slice(0, limit));
  }
}

// Export singleton instance for dependency injection across server/client components
export const dashboardService = new DashboardService();

