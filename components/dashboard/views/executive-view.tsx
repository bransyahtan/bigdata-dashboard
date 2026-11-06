import React from "react";
import Link from "next/link";
import { DashboardDataset } from "@/types/ecommerce";
import { KpiSummaryCards } from "@/components/dashboard/kpi-summary-cards";
import { OrderTrendsChart } from "@/components/dashboard/order-trends-chart";
import { DistributionPieCharts } from "@/components/dashboard/distribution-pie-charts";
import { CategoryAndInventory } from "@/components/dashboard/category-and-inventory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import { IconCpu, IconArrowUpRight, IconTrendingUp, IconTruck, IconBoxes } from "@/components/ui/icons";

interface ExecutiveViewProps {
  data: DashboardDataset;
}

export const ExecutiveView: React.FC<ExecutiveViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* 1. GMV & Revenue KPI Cards */}
      <section aria-label="Executive Summary KPIs">
        <KpiSummaryCards kpis={data.summaryKpis} />
      </section>

      {/* 2. GMV & Revenue Trend (12 Months) + Anomaly Detection Alerts */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <OrderTrendsChart data={data.monthlyOrderTrends} />
        </div>

        {/* Anomaly Detection Alerts */}
        <Card className="bg-white flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div className="min-w-0 flex-1">
              <CardTitle>Deteksi Anomali Operasional</CardTitle>
              <CardDescription>
                Peringatan otomatis machine learning untuk deviasi transaksi
              </CardDescription>
            </div>
            <Badge variant="warning" className="shrink-0 mt-0.5">
              {data.executiveAnomalies.length} Anomali
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="divide-y divide-zinc-100">
              {data.executiveAnomalies.map((anm) => (
                <div key={anm.id} className="py-3 first:pt-0 last:pb-0 space-y-1.5 hover:bg-zinc-50/50 -mx-2 px-2 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                      {anm.id}
                    </span>
                    <Badge
                      variant={anm.severity === "High" ? "danger" : anm.severity === "Medium" ? "warning" : "secondary"}
                      className="text-[10px] py-0 px-2"
                    >
                      {anm.severity} Severity
                    </Badge>
                  </div>
                  <div className="text-xs font-semibold text-zinc-900">{anm.metric}</div>
                  <div className="text-[11px] text-zinc-500 leading-relaxed">{anm.description}</div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                    <span>Ekspektasi: {anm.expectedRange}</span>
                    <span className="font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">
                      {anm.observedValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Distribution Breakdown: Payment Methods (QRIS, CC, Debit, COD, Cash) & Product Category Share */}
      <section aria-label="Payment and Category Distribution Pie Charts">
        <DistributionPieCharts
          paymentData={data.paymentDistribution}
          categoryData={data.categoryBreakdown}
        />
      </section>

      {/* 4. Customer Acquisition & Retention Matrix */}
      <section>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Akuisisi & Retensi Pelanggan (Customer Acquisition & Retention)</CardTitle>
            <CardDescription>
              Efisiensi retensi 5.1M akun terdaftar dan rasio keberlanjutan basis pelanggan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-5">
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Pengguna Baru Bulanan
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
                  {formatCompactNumber(data.customerAcquisition.newCustomersMonthly)}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">
                  +5.1% MoM acquisition
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Tingkat Retensi
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-emerald-700">
                  {data.customerAcquisition.retentionRatePct}%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">
                  Cohort 12 bulan
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Customer Churn
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
                  {data.customerAcquisition.customerChurnRatePct}%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">
                  Batas sehat: &lt; 3.5%
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Rasio LTV : CAC
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
                  {data.customerAcquisition.ltvToCacRatio}x
                </div>
                <div className="text-[11px] text-emerald-700 font-mono mt-1 font-medium">
                  Sangat Efisien (&gt; 3.0x)
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Repeat Purchase Rate
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
                  {data.customerAcquisition.repeatPurchaseRatePct}%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">
                  Order berulang kuartalan
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 5. Top Categories, Products & Reviews */}
      <section aria-label="Top categories and products">
        <CategoryAndInventory
          categories={data.categoryBreakdown}
          inventoryAlerts={data.inventoryAlerts}
          reviewMetrics={data.reviewMetrics}
        />
      </section>

      {/* 6. Big Data Prescriptive Intelligence Spotlight */}
      <section aria-label="Big Data Prescriptive Analytics Spotlight">
        <Card className="bg-white border-zinc-200/90 overflow-hidden">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-5 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-400 border border-white/15">
                  <IconCpu size={18} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold tracking-tight">
                      Modul Analisis Big Data & Prescriptive Intelligence
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-wider font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ML Live
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Model Machine Learning untuk Demand Forecasting, Optimasi Rute Pengiriman, dan Prediksi Kehabisan Stok
                  </p>
                </div>
              </div>

              <Link
                href="/analytics"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-zinc-100 transition shadow-xs shrink-0 self-start sm:self-center"
              >
                <span>Buka Dashboard Analisis Big Data</span>
                <IconArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Highlight 1: Demand Forecasting */}
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-4 hover:border-zinc-300 transition">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <IconTrendingUp size={13} />
                  </span>
                  <span className="font-semibold text-xs text-zinc-900">Demand Forecasting Regional</span>
                </div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Lonjakan Tertinggi:</span>
                    <span className="font-mono font-bold text-emerald-700">Kaltim (+85.7%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Produk Utama:</span>
                    <span className="font-medium text-zinc-800 truncate max-w-[140px]">IoT LoRaWAN &amp; UPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Rerata Confidence:</span>
                    <span className="font-mono font-semibold text-zinc-700">94.8% CI</span>
                  </div>
                </div>
              </div>

              {/* Highlight 2: Route Optimization */}
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-4 hover:border-zinc-300 transition">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    <IconTruck size={13} />
                  </span>
                  <span className="font-semibold text-xs text-zinc-900">Optimasi Rute Logistik</span>
                </div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Rute Cepat &amp; Murah:</span>
                    <span className="font-mono font-bold text-emerald-700">JKT-BDO (0.8 hr &bull; Rp 8.5K)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Rute Lambat &amp; Mahal:</span>
                    <span className="font-mono font-bold text-rose-700">SBY-DJJ (5.8 hr &bull; Rp 68K)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">SLA Ketepatan:</span>
                    <span className="font-mono font-semibold text-zinc-700">98.6% vs 78.2%</span>
                  </div>
                </div>
              </div>

              {/* Highlight 3: Predictive Inventory */}
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-4 hover:border-zinc-300 transition">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    <IconBoxes size={13} />
                  </span>
                  <span className="font-semibold text-xs text-zinc-900">Predictive Inventory Depletion</span>
                </div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Status Kritis:</span>
                    <span className="font-mono font-bold text-rose-700">2 SKU (&lt; 5 hari habis)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Habis Tercepat:</span>
                    <span className="font-mono font-medium text-zinc-800">Hydraulic Drum (2 hr)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Penyelamatan Omset:</span>
                    <span className="font-mono font-bold text-zinc-900">{formatCurrency(1064500000, true)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
