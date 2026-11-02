import React from "react";
import { DashboardDataset } from "@/types/ecommerce";
import { KpiSummaryCards } from "@/components/dashboard/kpi-summary-cards";
import { OrderTrendsChart } from "@/components/dashboard/order-trends-chart";
import { CategoryAndInventory } from "@/components/dashboard/category-and-inventory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatPercentage } from "@/lib/utils";
import { IconAlertTriangle, IconTrendingUp, IconUsers } from "@/components/ui/icons";

interface ExecutiveViewProps {
  data: DashboardDataset;
}

export const ExecutiveView: React.FC<ExecutiveViewProps> = ({ data }) => {
  return (
    <div className="space-y-5">
      {/* 1. GMV & Revenue KPI Cards */}
      <section aria-label="Executive Summary KPIs">
        <KpiSummaryCards kpis={data.summaryKpis} />
      </section>

      {/* 2. GMV & Revenue Trend (12 Months) + Anomaly Detection Alerts */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <OrderTrendsChart data={data.monthlyOrderTrends} />
        </div>

        {/* Anomaly Detection Alerts */}
        <Card className="bg-white flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Deteksi Anomali Operasional</CardTitle>
              <CardDescription>
                Peringatan otomatis machine learning untuk deviasi metrik transaksi
              </CardDescription>
            </div>
            <Badge variant="warning">
              {data.executiveAnomalies.length} Anomali
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="divide-y divide-zinc-100">
              {data.executiveAnomalies.map((anm) => (
                <div key={anm.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-zinc-400">{anm.id}</span>
                    <Badge
                      variant={anm.severity === "High" ? "danger" : anm.severity === "Medium" ? "warning" : "secondary"}
                      className="text-[9px] py-0 px-1.5"
                    >
                      {anm.severity} Severity
                    </Badge>
                  </div>
                  <div className="text-xs font-semibold text-zinc-900">{anm.metric}</div>
                  <div className="text-[11px] text-zinc-500 leading-relaxed">{anm.description}</div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                    <span>Ekspektasi: {anm.expectedRange}</span>
                    <span className="font-bold text-zinc-800">Aktual: {anm.observedValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Customer Acquisition & Retention Matrix */}
      <section>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Akuisisi & Retensi Pelanggan (Customer Acquisition & Retention)</CardTitle>
            <CardDescription>
              Efisiensi retensi 5.1M akun terdaftar dan rasio keberlanjutan basis pelanggan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Pengguna Baru Bulanan
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  {formatCompactNumber(data.customerAcquisition.newCustomersMonthly)}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  +5.1% MoM acquisition
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Tingkat Retensi
                </span>
                <div className="mt-1 font-mono text-base font-bold text-emerald-700">
                  {data.customerAcquisition.retentionRatePct}%
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  Cohort 12 bulan
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Customer Churn
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  {data.customerAcquisition.customerChurnRatePct}%
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  Batas sehat: &lt; 3.5%
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Rasio LTV : CAC
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  {data.customerAcquisition.ltvToCacRatio}x
                </div>
                <div className="text-[10px] text-emerald-700 font-mono mt-0.5">
                  Sangat Efisien (&gt; 3.0x)
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Repeat Purchase Rate
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  {data.customerAcquisition.repeatPurchaseRatePct}%
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  Order berulang kuartalan
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. Top Categories, Products & Reviews */}
      <section aria-label="Top categories and products">
        <CategoryAndInventory
          categories={data.categoryBreakdown}
          inventoryAlerts={data.inventoryAlerts}
          reviewMetrics={data.reviewMetrics}
        />
      </section>
    </div>
  );
};

