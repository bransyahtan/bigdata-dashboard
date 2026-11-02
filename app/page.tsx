import React from "react";
import { dashboardService } from "@/services/dashboard.service";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KpiSummaryCards } from "@/components/dashboard/kpi-summary-cards";
import { OrderTrendsChart } from "@/components/dashboard/order-trends-chart";
import { ShippingAnalytics } from "@/components/dashboard/shipping-analytics";
import { CategoryAndInventory } from "@/components/dashboard/category-and-inventory";
import { PaymentAndPromotions } from "@/components/dashboard/payment-and-promotions";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";

export const metadata = {
  title: "Dashboard Eksekutif E-Commerce | Big Data Analytics",
  description: "Platform Monitoring Operasional dan Finansial E-Commerce Skala Enterprise (15M Records)",
};

export default async function DashboardPage() {
  const data = await dashboardService.getDashboardDataset();

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 antialiased">
      {/* 1. Header & Controls */}
      <DashboardHeader lastUpdated="02 Nov 2026, 16:40 WIB" />

      {/* Main Analytical Canvas - Pure Clean White */}
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        {/* 2. Executive KPI Cards */}
        <section aria-label="Executive Summary KPIs">
          <KpiSummaryCards kpis={data.summaryKpis} />
        </section>

        {/* 3. Primary Analytical Deep-Dives: 12-Month Order Trends & Shipping SLA Analysis */}
        <section
          aria-label="Tren Order dan Analisis Pengiriman"
          className="grid grid-cols-1 gap-5 xl:grid-cols-2"
        >
          <OrderTrendsChart data={data.monthlyOrderTrends} />
          <ShippingAnalytics data={data.shippingMonthlyAnalytics} />
        </section>

        {/* 4. Product Catalog & Inventory Health */}
        <section aria-label="Kategori Produk dan Inventori">
          <CategoryAndInventory
            categories={data.categoryBreakdown}
            inventoryAlerts={data.inventoryAlerts}
          />
        </section>

        {/* 5. Payments Settlement & Promotion Campaigns */}
        <section aria-label="Metode Pembayaran dan Promosi">
          <PaymentAndPromotions
            payments={data.paymentDistribution}
            promotions={data.activePromotions}
          />
        </section>

        {/* 6. Recent Real-time Transaction Stream Table */}
        <section aria-label="Aliran Transaksi Terkini">
          <RecentOrdersTable orders={data.recentOrders} />
        </section>

        {/* Footer Audit Information */}
        <footer className="border-t border-zinc-200 pt-5 pb-8 text-center text-xs text-zinc-400">
          Enterprise Commerce Big Data Dashboard &bull; Pipeline Ingest Apache Kafka + Google Cloud BigQuery &bull; SOC-2 Compliant
        </footer>
      </main>
    </div>
  );
}
