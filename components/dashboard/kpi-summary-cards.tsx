import React from "react";
import { DashboardSummaryKpis } from "@/types/ecommerce";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompactNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import { IconBarChart, IconPackage, IconTrendingUp, IconTruck, IconUsers } from "@/components/ui/icons";

interface KpiSummaryCardsProps {
  kpis: DashboardSummaryKpis;
}

export const KpiSummaryCards: React.FC<KpiSummaryCardsProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {/* 1. GMV Revenue */}
      <Card className="hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Gross Merchandise Value</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100/80 text-zinc-600">
              <IconBarChart size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatCurrency(kpis.totalRevenueYtd, true)}
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 border border-emerald-200/60">
              <IconTrendingUp size={12} />
              {formatPercentage(kpis.totalRevenueMoMGrowth)}
            </span>
            <span className="text-zinc-400">vs bulan lalu</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Total Volume Orders */}
      <Card className="hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Total Volume Order</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100/80 text-zinc-600">
              <IconPackage size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatCompactNumber(kpis.totalOrdersAnnual)}
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 border border-emerald-200/60">
              <IconTrendingUp size={12} />
              {formatPercentage(kpis.totalOrdersMoMGrowth)}
            </span>
            <span className="text-zinc-400">15.2M records</span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Customer Base */}
      <Card className="hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Basis Pelanggan Aktif</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100/80 text-zinc-600">
              <IconUsers size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatCompactNumber(kpis.activeCustomerBase)}
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 border border-emerald-200/60">
              <IconTrendingUp size={12} />
              {formatPercentage(kpis.activeCustomerMoMGrowth)}
            </span>
            <span className="text-zinc-400">5.1M akun</span>
          </div>
        </CardContent>
      </Card>

      {/* 4. Shipping SLA On-Time */}
      <Card className="hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Fulfillment Tepat Waktu</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100/80 text-zinc-600">
              <IconTruck size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {kpis.shippingOnTimeRate}%
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 font-medium text-amber-700 border border-amber-200/60">
              Delay {kpis.shippingDelayRate}%
            </span>
            <span className="text-zinc-400">Target SLA: 95%</span>
          </div>
        </CardContent>
      </Card>

      {/* 5. Product SKUs Catalog */}
      <Card className="hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Katalog SKU Aktif</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100/80 text-zinc-600">
              <IconPackage size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatCompactNumber(kpis.totalSkusCatalog)}
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-[11px]">
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700">
              2.05M SKU
            </span>
            <span className="text-zinc-400">5 vertikal</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
