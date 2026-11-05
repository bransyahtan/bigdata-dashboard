"use client";

import React, { useState } from "react";
import { PaymentDistribution, CategorySummary } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatCurrency, formatNumber } from "@/lib/utils";
import { IconCreditCard, IconPackage, IconPieChart } from "@/components/ui/icons";

interface DistributionPieChartsProps {
  paymentData: PaymentDistribution[];
  categoryData: CategorySummary[];
}

interface SliceData {
  id: string;
  label: string;
  shortLabel: string;
  percentage: number;
  count: number;
  countLabel: string;
  gmv: number;
  color: string;
}

// Round to 2 decimal places and avoid -0
function round2(val: number): number {
  const rounded = Math.round(val * 100) / 100;
  return rounded === 0 ? 0 : rounded;
}

// Polar coordinate to Cartesian helper (deterministic rounding to prevent SSR hydration mismatches)
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: round2(centerX + radius * Math.cos(angleInRadians)),
    y: round2(centerY + radius * Math.sin(angleInRadians)),
  };
}

// Generate SVG arc path for pie or donut slice with deterministic numbers
function describeArc(
  x: number,
  y: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
) {
  const isFullCircle = endAngle - startAngle >= 359.99;
  const safeEndAngle = isFullCircle ? startAngle + 359.99 : endAngle;

  const startOuter = polarToCartesian(x, y, outerRadius, startAngle);
  const endOuter = polarToCartesian(x, y, outerRadius, safeEndAngle);
  const largeArcFlag = safeEndAngle - startAngle <= 180 ? 0 : 1;

  if (innerRadius <= 0) {
    // Solid pie chart
    return [
      `M ${round2(x)} ${round2(y)}`,
      `L ${startOuter.x} ${startOuter.y}`,
      `A ${round2(outerRadius)} ${round2(outerRadius)} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      "Z",
    ].join(" ");
  }

  // Donut chart with central hole
  const startInner = polarToCartesian(x, y, innerRadius, safeEndAngle);
  const endInner = polarToCartesian(x, y, innerRadius, startAngle);

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${round2(outerRadius)} ${round2(outerRadius)} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${round2(innerRadius)} ${round2(innerRadius)} 0 ${largeArcFlag} 0 ${endInner.x} ${endInner.y}`,
    "Z",
  ].join(" ");
}

interface InteractivePieDonutProps {
  slices: SliceData[];
  chartType: "donut" | "pie";
  centerMainLabel: string;
  centerSubLabel: string;
  centerCountLabel: string;
}

const InteractivePieDonut: React.FC<InteractivePieDonutProps> = ({
  slices,
  chartType,
  centerMainLabel,
  centerSubLabel,
  centerCountLabel,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const cx = 110;
  const cy = 110;
  const outerR = 94;
  const innerR = chartType === "donut" ? 64 : 0;

  // Calculate cumulative angles
  let currentAngle = 0;
  const slicesWithAngles = slices.map((slice) => {
    const sliceAngle = (slice.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle += sliceAngle;
    return {
      ...slice,
      startAngle,
      endAngle,
      midAngle: startAngle + sliceAngle / 2,
    };
  });

  const activeSlice = slicesWithAngles.find((s) => s.id === hoveredId);

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
      {/* SVG Pie / Donut Canvas */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 220 220"
          className="h-52 w-52 overflow-visible select-none drop-shadow-xs"
          suppressHydrationWarning
        >
          {slicesWithAngles.map((slice) => {
            const isHovered = hoveredId === slice.id;
            const isDimmed = hoveredId !== null && !isHovered;

            // Explode offset on hover (strictly 0 when idle to prevent -0 SSR difference)
            const rad = ((slice.midAngle - 90) * Math.PI) / 180.0;
            const offset = isHovered ? 5 : 0;
            const dx = offset ? round2(Math.cos(rad) * offset) : 0;
            const dy = offset ? round2(Math.sin(rad) * offset) : 0;

            const pathD = describeArc(
              cx,
              cy,
              innerR,
              isHovered ? outerR + 2 : outerR,
              slice.startAngle,
              slice.endAngle
            );

            return (
              <g
                key={slice.id}
                transform={`translate(${dx}, ${dy})`}
                className="transition-transform duration-200 ease-out cursor-pointer"
                onMouseEnter={() => setHoveredId(slice.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <path
                  d={pathD}
                  fill={slice.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  suppressHydrationWarning
                  className={`transition-opacity duration-200 ${
                    isDimmed ? "opacity-35" : "opacity-100"
                  }`}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Overlay for Donut Chart */}
        {chartType === "donut" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
            <div className="flex h-[110px] w-[110px] flex-col items-center justify-center rounded-full p-1">
              {activeSlice ? (
                <div className="flex flex-col items-center transition-all duration-150 animate-in fade-in zoom-in-95">
                  <span className="block font-mono text-[8px] uppercase font-bold text-zinc-400 tracking-wider truncate max-w-[85px]">
                    {activeSlice.shortLabel}
                  </span>
                  <span className="block font-mono text-xl font-extrabold text-zinc-900 leading-none my-1">
                    {activeSlice.percentage}%
                  </span>
                  <span className="block text-[10px] text-zinc-500 font-mono truncate max-w-[85px]">
                    {formatCompactNumber(activeSlice.count)} {activeSlice.countLabel}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="block font-mono text-[8px] uppercase tracking-wider text-zinc-400 font-semibold leading-tight truncate max-w-[85px]">
                    {centerSubLabel}
                  </span>
                  <span className="block font-mono text-xl font-bold text-zinc-900 leading-none my-1">
                    {centerMainLabel}
                  </span>
                  <span className="block text-[10px] text-zinc-500 font-medium leading-tight truncate max-w-[85px]">
                    {centerCountLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Legend & Details List */}
      <div className="w-full space-y-2 min-w-0">
        {slicesWithAngles.map((slice) => {
          const isHovered = hoveredId === slice.id;
          const isDimmed = hoveredId !== null && !isHovered;

          return (
            <div
              key={slice.id}
              onMouseEnter={() => setHoveredId(slice.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group flex items-center justify-between gap-2.5 rounded-lg border p-2 transition-all cursor-pointer ${
                isHovered
                  ? "border-zinc-300 bg-zinc-50/90 shadow-2xs"
                  : isDimmed
                  ? "border-transparent opacity-40 hover:opacity-100"
                  : "border-zinc-200/50 bg-white hover:border-zinc-200 hover:bg-zinc-50/50"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: slice.color }}
                />
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-zinc-900">
                    {slice.label}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400">
                    {formatNumber(slice.count)} {slice.countLabel} &bull; GMV {formatCurrency(slice.gmv, true)}
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className="inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs font-bold"
                  style={{
                    backgroundColor: `${slice.color}15`,
                    color: slice.color,
                  }}
                >
                  {slice.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DistributionPieCharts: React.FC<DistributionPieChartsProps> = ({
  paymentData,
  categoryData,
}) => {
  const [paymentChartType, setPaymentChartType] = useState<"donut" | "pie">("donut");
  const [categoryChartType, setCategoryChartType] = useState<"donut" | "pie">("donut");

  // Modern corporate color palette
  const paymentColors = [
    "#059669", // QRIS - emerald-600
    "#4f46e5", // CC - indigo-600
    "#0284c7", // Debit / VA - sky-600
    "#d97706", // COD - amber-600
    "#52525b", // Cash / Transfer - zinc-600
  ];

  const categoryColors = [
    "#18181b", // Elektronik - zinc-900
    "#059669", // FMCG - emerald-600
    "#4f46e5", // Peralatan Kantor - indigo-600
    "#e11d48", // Fashion - rose-600
    "#d97706", // Otomotif - amber-600
  ];

  // Map Payment Distribution
  const paymentSlices: SliceData[] = paymentData.map((p, idx) => ({
    id: `payment-${idx}`,
    label: p.method,
    shortLabel: p.method.split(" ")[0],
    percentage: p.sharePercentage,
    count: p.transactionVolume,
    countLabel: "trx",
    gmv: p.totalGmv,
    color: paymentColors[idx % paymentColors.length],
  }));

  const totalPaymentOrders = paymentData.reduce((acc, curr) => acc + curr.transactionVolume, 0);

  // Map Category Distribution
  const categorySlices: SliceData[] = categoryData.map((c, idx) => ({
    id: `category-${idx}`,
    label: c.category,
    shortLabel: c.category.split(" ")[0],
    percentage: c.revenueSharePct,
    count: c.skuCount,
    countLabel: "SKU",
    gmv: c.monthlyGmv,
    color: categoryColors[idx % categoryColors.length],
  }));

  const totalCatalogSkus = categoryData.reduce((acc, curr) => acc + curr.skuCount, 0);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 1. Payment Methods Pie / Donut Chart */}
      <Card className="bg-white flex flex-col">
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                <IconCreditCard size={13} />
              </span>
              <CardTitle className="truncate">Distribusi Metode Pembayaran</CardTitle>
            </div>
            <CardDescription className="mt-1">
              Proporsi pengguna berdasarkan metode settlement (QRIS, CC, Debit, COD, Cash)
            </CardDescription>
          </div>

          <div className="flex items-center gap-1 shrink-0 rounded-lg border border-zinc-200 bg-zinc-50/70 p-0.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setPaymentChartType("donut")}
              className={`rounded-md px-2 py-0.5 font-medium transition ${
                paymentChartType === "donut"
                  ? "bg-white text-zinc-900 shadow-2xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Donut
            </button>
            <button
              type="button"
              onClick={() => setPaymentChartType("pie")}
              className={`rounded-md px-2 py-0.5 font-medium transition ${
                paymentChartType === "pie"
                  ? "bg-white text-zinc-900 shadow-2xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Pie
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-2 flex-1">
          <InteractivePieDonut
            slices={paymentSlices}
            chartType={paymentChartType}
            centerSubLabel="TOTAL TRANSAKSI"
            centerMainLabel={formatCompactNumber(totalPaymentOrders)}
            centerCountLabel="100% Total"
          />
        </CardContent>
      </Card>

      {/* 2. Category Distribution Pie / Donut Chart */}
      <Card className="bg-white flex flex-col">
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
                <IconPackage size={13} />
              </span>
              <CardTitle className="truncate">Pangsa Pembelian per Kategori</CardTitle>
            </div>
            <CardDescription className="mt-1">
              Distribusi transaksi & kontribusi omset per segmen katalog (Elektronik, Fashion, dll)
            </CardDescription>
          </div>

          <div className="flex items-center gap-1 shrink-0 rounded-lg border border-zinc-200 bg-zinc-50/70 p-0.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setCategoryChartType("donut")}
              className={`rounded-md px-2 py-0.5 font-medium transition ${
                categoryChartType === "donut"
                  ? "bg-white text-zinc-900 shadow-2xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Donut
            </button>
            <button
              type="button"
              onClick={() => setCategoryChartType("pie")}
              className={`rounded-md px-2 py-0.5 font-medium transition ${
                categoryChartType === "pie"
                  ? "bg-white text-zinc-900 shadow-2xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Pie
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-2 flex-1">
          <InteractivePieDonut
            slices={categorySlices}
            chartType={categoryChartType}
            centerSubLabel="TOTAL KATALOG"
            centerMainLabel={formatCompactNumber(totalCatalogSkus)}
            centerCountLabel="5 Kategori"
          />
        </CardContent>
      </Card>
    </div>
  );
};

