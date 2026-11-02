import React from "react";
import { CategorySummary, InventoryStock, ReviewSentimentSummary } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatCurrency, formatNumber } from "@/lib/utils";
import { IconAlertTriangle, IconCheckCircle } from "@/components/ui/icons";

interface CategoryAndInventoryProps {
  categories: CategorySummary[];
  inventoryAlerts: InventoryStock[];
  reviewMetrics: ReviewSentimentSummary;
}

export const CategoryAndInventory: React.FC<CategoryAndInventoryProps> = ({
  categories,
  inventoryAlerts,
  reviewMetrics,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* 1. Category & Review Performance */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Kontribusi Kategori Produk & Ulasan (2M SKU & 8.4M Reviews)</CardTitle>
          <CardDescription>
            Pangsa pendapatan per vertikal industri dan indeks kepuasan produk
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-900">{cat.category}</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-zinc-500">{formatCompactNumber(cat.skuCount)} SKU</span>
                    <span className="font-bold text-zinc-900">
                      {formatCurrency(cat.monthlyGmv, true)} ({cat.revenueSharePct}%)
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded bg-zinc-100">
                  <div
                    style={{ width: `${cat.revenueSharePct}%` }}
                    className="h-1.5 rounded bg-zinc-800"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Review & Sentiment Summary (Entity #7: reviews) */}
          <div className="rounded border border-zinc-200 bg-white p-3 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-zinc-800">Ulasan & Rating Produk ({formatCompactNumber(reviewMetrics.totalReviews)} records):</span>
              <span className="font-mono font-bold text-zinc-900">
                Score: {reviewMetrics.averageRating} / 5.0
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span className="text-emerald-700 font-medium">Positif: {reviewMetrics.positivePct}%</span>
              <span className="text-zinc-600">Netral: {reviewMetrics.neutralPct}%</span>
              <span className="text-rose-700">Negatif: {reviewMetrics.negativePct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded bg-zinc-100 flex">
              <div style={{ width: `${reviewMetrics.positivePct}%` }} className="bg-emerald-600" />
              <div style={{ width: `${reviewMetrics.neutralPct}%` }} className="bg-zinc-400" />
              <div style={{ width: `${reviewMetrics.negativePct}%` }} className="bg-rose-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Critical Inventory & Warehouse Alerts */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Peringatan Inventori & Gudang (Warehouse)</CardTitle>
            <CardDescription>
              Item di bawah safety stock threshold yang memerlukan pengadaan ulang
            </CardDescription>
          </div>
          <Badge variant="warning">
            {inventoryAlerts.length} Perlu Tindakan
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-zinc-100">
            {inventoryAlerts.map((item) => (
              <div key={item.sku} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-zinc-400">{item.sku}</span>
                      <Badge
                        variant={item.stockStatus === "Critical Out of Stock" ? "danger" : "warning"}
                        className="text-[9px] py-0 px-1.5"
                      >
                        {item.stockStatus}
                      </Badge>
                    </div>
                    <div className="text-xs font-medium text-zinc-900 mt-0.5">
                      {item.productName}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                      Gudang: {item.warehouseCode}
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <div className="font-bold text-zinc-900">
                      Sisa: {formatNumber(item.availableStock)} unit
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      Min: {item.reorderThreshold} | Lead: {item.leadTimeDays}d
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <IconAlertTriangle size={13} className="text-amber-600" />
              Lead time pengadaan terlama: 14 hari kerja
            </span>
            <button
              type="button"
              className="text-xs font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-600"
            >
              Kelola Purchase Order &rarr;
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
