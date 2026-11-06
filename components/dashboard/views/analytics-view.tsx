"use client";

import React, { useState } from "react";
import { DashboardDataset } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  IconCpu,
  IconTrendingUp,
  IconTruck,
  IconClock,
  IconBoxes,
  IconCheckCircle,
  IconAlertTriangle,
  IconArrowUpRight,
  IconMapPin,
  IconNavigation,
  IconFilter,
} from "@/components/ui/icons";

interface AnalyticsViewProps {
  data: DashboardDataset;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ data }) => {
  // State filters for the 3 sections
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");
  const [selectedRouteTier, setSelectedRouteTier] = useState<string>("ALL");
  const [selectedInventoryUrgency, setSelectedInventoryUrgency] = useState<string>("ALL");

  // Filtered Demand Forecasts
  const filteredDemand = data.demandForecasts.filter((item) => {
    if (selectedRegion === "ALL") return true;
    if (selectedRegion === "JABODETABEK") return item.region === "Jabodetabek";
    if (selectedRegion === "JAWA") return item.region.includes("Jawa");
    if (selectedRegion === "LUAR_JAWA") return !item.region.includes("Jawa") && item.region !== "Jabodetabek";
    return item.region === selectedRegion;
  });

  // Filtered Logistics Routes
  const filteredRoutes = data.logisticsRouteOptimizations.filter((route) => {
    if (selectedRouteTier === "ALL") return true;
    if (selectedRouteTier === "FAST_CHEAP") return route.performanceTier === "Paling Cepat & Murah";
    if (selectedRouteTier === "SLOW_EXPENSIVE") return route.performanceTier === "Paling Lambat & Mahal";
    if (selectedRouteTier === "OTHER") return route.performanceTier !== "Paling Cepat & Murah" && route.performanceTier !== "Paling Lambat & Mahal";
    return true;
  });

  // Filtered Predictive Inventory
  const filteredInventory = data.predictiveStockDepletions.filter((inv) => {
    if (selectedInventoryUrgency === "ALL") return true;
    if (selectedInventoryUrgency === "KRITIS") return inv.urgencyLevel.includes("Kritis");
    if (selectedInventoryUrgency === "PERINGATAN") return inv.urgencyLevel.includes("Peringatan");
    if (selectedInventoryUrgency === "AMAN") return inv.urgencyLevel.includes("Aman") || inv.urgencyLevel.includes("Perhatian");
    return true;
  });

  // High-level aggregates
  const criticalStockCount = data.predictiveStockDepletions.filter((i) => i.daysUntilStockout <= 5).length;
  const totalPreventableLoss = data.predictiveStockDepletions
    .filter((i) => i.daysUntilStockout <= 10)
    .reduce((acc, curr) => acc + curr.estimatedLostRevenueIfOut, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Machine Learning Telemetry Strip */}
      <section aria-label="Machine Learning Model Telemetry">
        <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-2xs">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs">
                <IconCpu size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-zinc-900 tracking-tight">
                    Big Data Machine Learning & Prescriptive Analytics Engine
                  </h2>
                  <Badge variant="success" className="text-[10px] py-0.5 px-2">
                    Model Active &bull; v4.8
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
                  Pemodelan prediktif berbasis ensemble XGBoost, Prophet time-series, dan optimasi rute heuristik terlatih pada 15.2M log transaksi.
                </p>
              </div>
            </div>

            {/* Micro KPI Pills */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:items-center lg:gap-3 shrink-0">
              <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/60 px-3 py-2 text-left">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  Akurasi Prediksi
                </div>
                <div className="font-mono text-sm font-bold text-emerald-700 mt-0.5">
                  94.8% R&sup2;
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/60 px-3 py-2 text-left">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  Rute Terpetakan
                </div>
                <div className="font-mono text-sm font-bold text-zinc-900 mt-0.5">
                  {data.logisticsRouteOptimizations.length} Jalur Utama
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/60 px-3 py-2 text-left">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  SKU Rawan Habis
                </div>
                <div className="font-mono text-sm font-bold text-rose-700 mt-0.5">
                  {criticalStockCount} SKU Kritis
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/60 px-3 py-2 text-left">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  Mitigasi Kerugian
                </div>
                <div className="font-mono text-sm font-bold text-zinc-900 mt-0.5">
                  {formatCurrency(totalPreventableLoss, true)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          1. DEMAND FORECASTING (Prediksi Produk Laris per Wilayah)
         ======================================================== */}
      <section aria-label="Regional Demand Forecasting">
        <Card className="bg-white">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between space-y-0 pb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                  <IconTrendingUp size={15} />
                </span>
                <CardTitle>Demand Forecasting: Prediksi Produk Laris per Wilayah Bulan Depan</CardTitle>
              </div>
              <CardDescription className="mt-1">
                Estimasi volume permintaan produk dan lonjakan konsumsi bulan November 2026 berdasarkan pola musiman, tren regional, dan event lokal
              </CardDescription>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0 rounded-lg border border-zinc-200 bg-zinc-50/70 p-1 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setSelectedRegion("ALL")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedRegion === "ALL"
                    ? "bg-white text-zinc-900 font-semibold shadow-2xs border border-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Semua Wilayah ({data.demandForecasts.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegion("JABODETABEK")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedRegion === "JABODETABEK"
                    ? "bg-white text-zinc-900 font-semibold shadow-2xs border border-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Jabodetabek
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegion("JAWA")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedRegion === "JAWA"
                    ? "bg-white text-zinc-900 font-semibold shadow-2xs border border-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Pulau Jawa
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegion("LUAR_JAWA")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedRegion === "LUAR_JAWA"
                    ? "bg-white text-zinc-900 font-semibold shadow-2xs border border-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Luar Jawa
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-200/80 bg-zinc-50/70 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Wilayah & ID Prediksi</th>
                    <th className="py-3 px-5 font-semibold">Produk & Kategori</th>
                    <th className="py-3 px-5 text-right font-semibold">Demand Saat Ini</th>
                    <th className="py-3 px-5 text-right font-semibold">Prediksi Bulan Depan</th>
                    <th className="py-3 px-5 text-center font-semibold">Lonjakan Pertumbuhan</th>
                    <th className="py-3 px-5 text-center font-semibold">Confidence ML</th>
                    <th className="py-3 px-5 font-semibold">Faktor Pemicu (Key Driver)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredDemand.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1.5">
                          <IconMapPin size={13} className="text-zinc-400 shrink-0" />
                          <span className="font-semibold text-zinc-900">{item.region}</span>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400 mt-0.5 block">
                          {item.id}
                        </span>
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-zinc-900 max-w-xs">{item.productName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[10px] text-zinc-400">{item.productSku}</span>
                          <span className="text-[10px] text-zinc-400">&bull;</span>
                          <span className="text-[10px] text-zinc-500">{item.category}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-right font-mono text-zinc-600">
                        {formatNumber(item.currentMonthlyDemand)} <span className="text-[10px] text-zinc-400">unit</span>
                      </td>

                      <td className="py-3.5 px-5 text-right font-mono font-bold text-zinc-900">
                        {formatNumber(item.forecastedDemandNextMonth)} <span className="text-[10px] text-zinc-400 font-normal">unit</span>
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70">
                          <IconArrowUpRight size={13} />
                          +{item.projectedGrowthPct}%
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {item.confidenceScorePct}% CI
                        </Badge>
                      </td>

                      <td className="py-3.5 px-5 text-zinc-600 text-[11px] max-w-sm leading-relaxed">
                        {item.keyDriver}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ========================================================
          2. OPTIMASI LOGISTIK (Rute Tercepat/Termurah vs Terlambat/Termahal)
         ======================================================== */}
      <section aria-label="Logistics Route Optimization">
        <Card className="bg-white">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between space-y-0 pb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-200/70">
                  <IconTruck size={15} />
                </span>
                <CardTitle>Optimasi Rute Logistik: Analisis Efisiensi Biaya vs Durasi Pengiriman</CardTitle>
              </div>
              <CardDescription className="mt-1">
                Komparasi performa rute ekspedisi: identifikasi jalur paling cepat & paling murah (best-value) versus jalur paling lambat & mahal (bottleneck)
              </CardDescription>
            </div>

            {/* Route Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0 rounded-lg border border-zinc-200 bg-zinc-50/70 p-1 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setSelectedRouteTier("ALL")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedRouteTier === "ALL"
                    ? "bg-white text-zinc-900 font-semibold shadow-2xs border border-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Semua Rute ({data.logisticsRouteOptimizations.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedRouteTier("FAST_CHEAP")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedRouteTier === "FAST_CHEAP"
                    ? "bg-emerald-50 text-emerald-800 font-semibold shadow-2xs border border-emerald-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Paling Cepat & Murah
              </button>
              <button
                type="button"
                onClick={() => setSelectedRouteTier("SLOW_EXPENSIVE")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedRouteTier === "SLOW_EXPENSIVE"
                    ? "bg-rose-50 text-rose-800 font-semibold shadow-2xs border border-rose-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Paling Lambat & Mahal
              </button>
            </div>
          </CardHeader>

          {/* Quick Highlight Cards: Comparison of Extremes */}
          <div className="grid grid-cols-1 gap-4 px-6 pb-2 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <IconCheckCircle size={14} className="text-emerald-600" />
                  Rute Terbaik: Paling Cepat & Paling Murah
                </span>
                <Badge variant="success" className="text-[10px]">Benchmark Efisiensi</Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-white p-2.5 border border-emerald-100 shadow-2xs">
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Rute</span>
                  <div className="font-bold text-zinc-900 text-xs mt-0.5">JKT &rarr; Bandung</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-emerald-100 shadow-2xs">
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Durasi SLA</span>
                  <div className="font-mono font-bold text-emerald-700 text-xs mt-0.5">0.8 Hari</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-emerald-100 shadow-2xs">
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Biaya / Kg</span>
                  <div className="font-mono font-bold text-emerald-700 text-xs mt-0.5">Rp 8.500</div>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-emerald-800 leading-relaxed">
                Jalur tol ekspres terkonsolidasi dengan tingkat on-time delivery mencapai 98.6%. Menjadi tolok ukur efisiensi pengiriman antar-kota.
              </p>
            </div>

            <div className="rounded-xl border border-rose-200/80 bg-rose-50/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <IconAlertTriangle size={14} className="text-rose-600" />
                  Rute Terkendala: Paling Lambat & Paling Mahal
                </span>
                <Badge variant="danger" className="text-[10px]">Perlu Tindakan Routing</Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-white p-2.5 border border-rose-100 shadow-2xs">
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Rute</span>
                  <div className="font-bold text-zinc-900 text-xs mt-0.5">SBY &rarr; Merauke</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-rose-100 shadow-2xs">
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Durasi SLA</span>
                  <div className="font-mono font-bold text-rose-700 text-xs mt-0.5">5.8 Hari</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-rose-100 shadow-2xs">
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Biaya / Kg</span>
                  <div className="font-mono font-bold text-rose-700 text-xs mt-0.5">Rp 68.000</div>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-rose-800 leading-relaxed">
                Terkendala transit ganda di hub Makassar & jadwal kapal kargo laut. Rekomendasi ML: alihkan pengiriman berprioritas tinggi ke kargo udara langsung.
              </p>
            </div>
          </div>

          {/* Full Routes Table */}
          <CardContent className="p-0 pt-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-200/80 bg-zinc-50/70 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Koridor Asal &rarr; Tujuan</th>
                    <th className="py-3 px-5 font-semibold">Moda Armada</th>
                    <th className="py-3 px-5 text-right font-semibold">Rerata Durasi</th>
                    <th className="py-3 px-5 text-right font-semibold">Biaya per Kg</th>
                    <th className="py-3 px-5 text-center font-semibold">Ketepatan SLA</th>
                    <th className="py-3 px-5 text-center font-semibold">Klasifikasi Kinerja</th>
                    <th className="py-3 px-5 font-semibold">Rekomendasi Preskriptif Machine Learning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
                          <IconNavigation size={12} className="text-zinc-400 shrink-0" />
                          <span>{route.originHub}</span>
                          <span className="text-zinc-400">&rarr;</span>
                          <span>{route.destinationCity}</span>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400 mt-0.5 block">
                          {formatNumber(route.monthlyShipmentVolume)} paket/bulan
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-zinc-600 font-medium">
                        {route.courierFleet}
                      </td>

                      <td className="py-3.5 px-5 text-right font-mono font-bold text-zinc-900">
                        {route.avgDurationDays} <span className="text-[10px] font-normal text-zinc-500">hari</span>
                      </td>

                      <td className="py-3.5 px-5 text-right font-mono font-bold text-zinc-900">
                        {formatCurrency(route.avgCostPerKg)}
                      </td>

                      <td className="py-3.5 px-5 text-center font-mono">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          route.onTimeSlaPct >= 95
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                            : route.onTimeSlaPct >= 85
                            ? "bg-amber-50 text-amber-700 border border-amber-200/70"
                            : "bg-rose-50 text-rose-700 border border-rose-200/70"
                        }`}>
                          {route.onTimeSlaPct}%
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <Badge
                          variant={
                            route.performanceTier === "Paling Cepat & Murah"
                              ? "success"
                              : route.performanceTier === "Paling Lambat & Mahal"
                              ? "danger"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {route.performanceTier}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-5 text-zinc-600 text-[11px] max-w-sm leading-relaxed">
                        {route.optimizationRecommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ========================================================
          3. PREDICTIVE INVENTORY (Prediksi Kapan Stok Barang Habis)
         ======================================================== */}
      <section aria-label="Predictive Inventory Depletion">
        <Card className="bg-white">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between space-y-0 pb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-200/70">
                  <IconBoxes size={15} />
                </span>
                <CardTitle>Predictive Inventory: Estimasi Kehabisan Stok Berdasarkan Laju Penjualan</CardTitle>
              </div>
              <CardDescription className="mt-1">
                Kalkulasi burn-rate harian dinamis untuk memprediksi tanggal pasti kehabisan stok (stockout) dan rekomendasi kuantitas restock preventif
              </CardDescription>
            </div>

            {/* Urgency Filter */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0 rounded-lg border border-zinc-200 bg-zinc-50/70 p-1 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setSelectedInventoryUrgency("ALL")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedInventoryUrgency === "ALL"
                    ? "bg-white text-zinc-900 font-semibold shadow-2xs border border-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Semua SKU ({data.predictiveStockDepletions.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedInventoryUrgency("KRITIS")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedInventoryUrgency === "KRITIS"
                    ? "bg-rose-50 text-rose-800 font-semibold shadow-2xs border border-rose-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Kritis (&lt; 5 Hari)
              </button>
              <button
                type="button"
                onClick={() => setSelectedInventoryUrgency("PERINGATAN")}
                className={`rounded-md px-2.5 py-1 transition ${
                  selectedInventoryUrgency === "PERINGATAN"
                    ? "bg-amber-50 text-amber-800 font-semibold shadow-2xs border border-amber-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Peringatan (5-10 Hari)
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-200/80 bg-zinc-50/70 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  <tr>
                    <th className="py-3 px-5 font-semibold">SKU & Detail Produk</th>
                    <th className="py-3 px-5 font-semibold">Lokasi Gudang</th>
                    <th className="py-3 px-5 text-right font-semibold">Stok Saat Ini</th>
                    <th className="py-3 px-5 text-right font-semibold">Laju Penjualan (Burn Rate)</th>
                    <th className="py-3 px-5 text-center font-semibold">Prediksi Tanggal Habis</th>
                    <th className="py-3 px-5 text-center font-semibold">Status Urgensi</th>
                    <th className="py-3 px-5 text-right font-semibold">Rekomendasi Restock</th>
                    <th className="py-3 px-5 text-right font-semibold">Potensi Omset Hilang</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredInventory.map((item) => (
                    <tr key={item.sku} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-zinc-900 max-w-xs">{item.productName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                            {item.sku}
                          </span>
                          <span className="text-[10px] text-zinc-500">{item.category}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-zinc-600 font-mono text-[11px]">
                        {item.warehouseLocation}
                      </td>

                      <td className="py-3.5 px-5 text-right font-mono font-bold text-zinc-900">
                        {item.currentAvailableStock} <span className="text-[10px] font-normal text-zinc-400">unit</span>
                      </td>

                      <td className="py-3.5 px-5 text-right font-mono text-zinc-700">
                        {item.dailyBurnRateUnits} <span className="text-[10px] text-zinc-400">unit/hari</span>
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <div className="font-mono font-bold text-zinc-900 text-xs">
                          {item.predictedStockoutDate}
                        </div>
                        <span className={`inline-block font-mono text-[10px] font-medium mt-0.5 ${
                          item.daysUntilStockout <= 3
                            ? "text-rose-600 font-bold"
                            : item.daysUntilStockout <= 7
                            ? "text-amber-600 font-semibold"
                            : "text-zinc-500"
                        }`}>
                          Sisa {item.daysUntilStockout} hari lagi
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <Badge
                          variant={
                            item.daysUntilStockout <= 5
                              ? "danger"
                              : item.daysUntilStockout <= 10
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {item.urgencyLevel}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <div className="font-mono font-bold text-emerald-700">
                          +{item.recommendedReorderQty} unit
                        </div>
                        <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
                          Lead time: {item.leadTimeRestockDays} hari
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-right font-mono">
                        {item.estimatedLostRevenueIfOut > 0 ? (
                          <span className="font-bold text-rose-700">
                            {formatCurrency(item.estimatedLostRevenueIfOut, true)}
                          </span>
                        ) : (
                          <span className="text-zinc-400 text-xs">Terkendali</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

