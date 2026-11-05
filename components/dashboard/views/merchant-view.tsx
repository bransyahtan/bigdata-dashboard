import React from "react";
import { DashboardDataset } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface MerchantViewProps {
  data: DashboardDataset;
}

export const MerchantView: React.FC<MerchantViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* 1. Merchant Sales Performance & Analytics */}
      <section>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div className="min-w-0 flex-1">
              <CardTitle>Performa Penjualan Merchant (Sales Performance & Analytics)</CardTitle>
              <CardDescription>
                Monitoring volume omset, pertumbuhan kuartalan, dan kesehatan katalog mitra penjual utama
              </CardDescription>
            </div>
            <Badge variant="outline" className="shrink-0 mt-0.5">
              Top Enterprise Merchants
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-200/80 bg-zinc-50/70 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Merchant ID</th>
                    <th className="py-3 px-5 font-semibold">Nama Mitra Penjual</th>
                    <th className="py-3 px-5 text-right font-semibold">Omset Bulanan</th>
                    <th className="py-3 px-5 text-center font-semibold">Pertumbuhan MoM</th>
                    <th className="py-3 px-5 font-semibold">Kesehatan Stok</th>
                    <th className="py-3 px-5 font-semibold">Insight & Rekomendasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {data.merchantInsights.map((mch) => (
                    <tr key={mch.merchantId} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-3.5 px-5 font-mono font-medium text-zinc-900">{mch.merchantId}</td>
                      <td className="py-3.5 px-5 font-semibold text-zinc-900">{mch.name}</td>
                      <td className="py-3.5 px-5 text-right font-mono font-bold text-zinc-900">
                        {formatCurrency(mch.monthlySales, true)}
                      </td>
                      <td className="py-3.5 px-5 text-center font-mono">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${
                          mch.growthPct >= 0 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" 
                            : "bg-rose-50 text-rose-700 border border-rose-200/60"
                        }`}>
                          {formatPercentage(mch.growthPct)}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <Badge
                          variant={
                            mch.inventoryHealth === "Optimal"
                              ? "success"
                              : mch.inventoryHealth === "Need Restock"
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {mch.inventoryHealth}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-5 text-zinc-600 text-xs">{mch.pricingAlert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. Inventory Optimization & Pricing Recommendations */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Inventory Optimization Suggestions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Saran Optimalisasi Inventori (Inventory Optimization)</CardTitle>
            <CardDescription>
              Kalkulasi safety stock berbasis algoritma run-rate penjualan untuk mencegah kehabisan stok
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div className="space-y-3">
              {data.inventorySuggestions.map((item) => (
                <div key={item.sku} className="rounded-xl border border-zinc-200/80 bg-zinc-50/40 p-3.5 hover:border-zinc-300 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-400 bg-white px-2 py-0.5 rounded border border-zinc-200/80 shadow-2xs">
                        {item.sku}
                      </span>
                      <div className="text-xs font-semibold text-zinc-900 mt-1">{item.productName}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-zinc-900">
                        Order: +{item.recommendedOrderQty} unit
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        Sisa: {item.daysOfInventoryLeft} hari
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-1 border-t border-zinc-200/60">
                    <span>Stok Saat Ini: {item.currentStock} unit</span>
                    <span className="text-rose-700 font-medium">
                      Potensi Rugi: {formatCurrency(item.potentialStockoutLoss, true)}
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
          <CardContent className="space-y-3.5">
            <div className="space-y-3">
              {data.pricingRecommendations.map((pr) => (
                <div key={pr.sku} className="rounded-xl border border-zinc-200/80 bg-zinc-50/40 p-3.5 hover:border-zinc-300 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-400 bg-white px-2 py-0.5 rounded border border-zinc-200/80 shadow-2xs">
                        {pr.sku}
                      </span>
                      <div className="text-xs font-semibold text-zinc-900 mt-1">{pr.productName}</div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60">
                        +{pr.projectedRevenueLiftPct}% Est. Lift
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-zinc-500 pt-1 border-t border-zinc-200/60">
                    <div>
                      Harga Kini: <span className="font-bold text-zinc-900">{formatCurrency(pr.currentPrice)}</span>
                    </div>
                    <div>
                      Saran: <span className="font-bold text-emerald-800">{formatCurrency(pr.recommendedPrice)}</span>
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
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Ulasan & Rating Katalog
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
                  {data.reviewMetrics.averageRating} / 5.0
                </div>
                <div className="text-[11px] text-emerald-700 font-mono mt-1 font-medium">
                  {data.reviewMetrics.positivePct}% sentimen positif
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Repeat Purchase Rate
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
                  64.2%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">
                  Pembelian berulang merchant
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Rerata Keranjang (AOV)
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
                  {formatCurrency(data.summaryKpis.totalRevenueYtd / data.summaryKpis.totalOrdersAnnual)}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">
                  Per transaksi order
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Tingkat Retur Barang
                </span>
                <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
                  0.3%
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-1">
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
