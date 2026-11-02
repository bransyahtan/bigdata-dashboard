import React from "react";
import { DashboardDataset } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import { IconPackage, IconTrendingUp, IconUsers } from "@/components/ui/icons";

interface MerchantViewProps {
  data: DashboardDataset;
}

export const MerchantView: React.FC<MerchantViewProps> = ({ data }) => {
  return (
    <div className="space-y-5">
      {/* 1. Merchant Sales Performance & Analytics */}
      <section>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performa Penjualan Merchant (Sales Performance & Analytics)</CardTitle>
              <CardDescription>
                Monitoring volume omset, pertumbuhan kuartalan, dan kesehatan katalog mitra penjual utama
              </CardDescription>
            </div>
            <Badge variant="outline">
              Top Enterprise Merchants
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-200 bg-white text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Merchant ID</th>
                    <th className="py-3 px-4 font-semibold">Nama Mitra Penjual</th>
                    <th className="py-3 px-4 text-right font-semibold">Omset Bulanan</th>
                    <th className="py-3 px-4 text-center font-semibold">Pertumbuhan MoM</th>
                    <th className="py-3 px-4 font-semibold">Kesehatan Stok</th>
                    <th className="py-3 px-4 font-semibold">Insight & Rekomendasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {data.merchantInsights.map((mch) => (
                    <tr key={mch.merchantId} className="hover:bg-zinc-50/70 transition">
                      <td className="py-3 px-4 font-mono font-medium text-zinc-900">{mch.merchantId}</td>
                      <td className="py-3 px-4 font-medium text-zinc-900">{mch.name}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-zinc-900">
                        {formatCurrency(mch.monthlySales, true)}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">
                        <span className={mch.growthPct >= 0 ? "text-emerald-700 font-medium" : "text-rose-700 font-medium"}>
                          {formatPercentage(mch.growthPct)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            mch.inventoryHealth === "Optimal"
                              ? "success"
                              : mch.inventoryHealth === "Need Restock"
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[9px]"
                        >
                          {mch.inventoryHealth}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-zinc-600 text-[11px]">{mch.pricingAlert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. Inventory Optimization & Pricing Recommendations (Two-column grid) */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Inventory Optimization Suggestions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Saran Optimalisasi Inventori (Inventory Optimization)</CardTitle>
            <CardDescription>
              Kalkulasi safety stock berbasis algoritma run-rate penjualan untuk mencegah kehabisan stok
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="divide-y divide-zinc-100">
              {data.inventorySuggestions.map((item) => (
                <div key={item.sku} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-400">{item.sku}</span>
                      <div className="text-xs font-semibold text-zinc-900">{item.productName}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-zinc-900">
                        Order: +{item.recommendedOrderQty} unit
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Sisa: {item.daysOfInventoryLeft} hari
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-1">
                    <span>Stok Saat Ini: {item.currentStock} unit</span>
                    <span className="text-rose-700 font-medium">
                      Potensi Rugi Stok Habis: {formatCurrency(item.potentialStockoutLoss, true)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Recommendations */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Rekomendasi Penyesuaian Harga (Pricing Recommendations)</CardTitle>
            <CardDescription>
              Optimasi elastisitas harga dan perbandingan indeks harga kompetitor industri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="divide-y divide-zinc-100">
              {data.pricingRecommendations.map((pr) => (
                <div key={pr.sku} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-400">{pr.sku}</span>
                      <div className="text-xs font-semibold text-zinc-900">{pr.productName}</div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-xs font-bold text-emerald-700">
                        +{pr.projectedRevenueLiftPct}% Est. Lift
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-zinc-500 pt-1">
                    <div>
                      Harga Kini: <span className="font-bold text-zinc-900">{formatCurrency(pr.currentPrice)}</span>
                    </div>
                    <div>
                      Saran Harga: <span className="font-bold text-emerald-800">{formatCurrency(pr.recommendedPrice)}</span>
                    </div>
                    <div>
                      Pasar: <span className="text-zinc-600">{formatCurrency(pr.competitorIndexPrice)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Customer Behavior Insights for Merchants */}
      <section>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Insight Perilaku Pelanggan Merchant (Customer Behavior Insights)</CardTitle>
            <CardDescription>
              Pola pembelian, loyalitas akun, dan sentimen pembeli terhadap katalog toko
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Ulasan & Rating Katalog
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  {data.reviewMetrics.averageRating} / 5.0
                </div>
                <div className="text-[10px] text-emerald-700 font-mono mt-0.5">
                  {data.reviewMetrics.positivePct}% sentimen positif
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Repeat Purchase Rate
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  64.2%
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  Pembelian berulang merchant
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Rerata Keranjang (AOV)
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  {formatCurrency(data.summaryKpis.totalRevenueYtd / data.summaryKpis.totalOrdersAnnual)}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  Per order belanja
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Tingkat Retur Barang
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  0.3%
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  4.171 paket dikembalikan
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

