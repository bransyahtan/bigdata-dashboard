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
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
      {/* 1. GMV Revenue */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Pendapatan Kotor (GMV)</span>
            <IconBarChart size={13} className="text-zinc-400" />
          </div>
          <div className="mt-2 text-xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatCurrency(kpis.totalRevenueYtd, true)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            <span className="inline-flex items-center text-emerald-700 font-medium">
              <IconTrendingUp size={11} className="mr-0.5" />
              {formatPercentage(kpis.totalRevenueMoMGrowth)}
            </span>
            <span className="text-zinc-400">MoM growth</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Total Volume Orders */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Total Transaksi Order</span>
            <IconPackage size={13} className="text-zinc-400" />
          </div>
          <div className="mt-2 text-xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatCompactNumber(kpis.totalOrdersAnnual)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            <span className="inline-flex items-center text-emerald-700 font-medium">
              <IconTrendingUp size={11} className="mr-0.5" />
              {formatPercentage(kpis.totalOrdersMoMGrowth)}
            </span>
            <span className="text-zinc-400">15.2M records</span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Customer Base */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Pelanggan Terdaftar</span>
            <IconUsers size={13} className="text-zinc-400" />
          </div>
          <div className="mt-2 text-xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatCompactNumber(kpis.activeCustomerBase)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            <span className="inline-flex items-center text-emerald-700 font-medium">
              <IconTrendingUp size={11} className="mr-0.5" />
              {formatPercentage(kpis.activeCustomerMoMGrowth)}
            </span>
            <span className="text-zinc-400">5.1M entitas</span>
          </div>
        </CardContent>
      </Card>

      {/* 4. Shipping SLA On-Time */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Fulfillment Tepat Waktu</span>
            <IconTruck size={13} className="text-zinc-400" />
          </div>
          <div className="mt-2 text-xl font-bold tracking-tight text-zinc-900 font-mono">
            {kpis.shippingOnTimeRate}%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            <span className="font-medium text-amber-700">
              Delay {kpis.shippingDelayRate}%
            </span>
            <span className="text-zinc-400">Target SLA: 95%</span>
          </div>
        </CardContent>
      </Card>

      {/* 5. Product SKUs Catalog */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Katalog SKU Aktif</span>
            <IconPackage size={13} className="text-zinc-400" />
          </div>
          <div className="mt-2 text-xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatCompactNumber(kpis.totalSkusCatalog)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            <span className="text-zinc-700 font-medium">2.05M SKU</span>
            <span className="text-zinc-400">5 kategori</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
