import React from "react";
import { DashboardDataset } from "@/types/ecommerce";
import { PaymentAndPromotions } from "@/components/dashboard/payment-and-promotions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatCurrency, formatNumber } from "@/lib/utils";

interface MarketingViewProps {
  data: DashboardDataset;
}

export const MarketingView: React.FC<MarketingViewProps> = ({ data }) => {
  return (
    <div className="space-y-5">
      {/* 1. Campaign Performance & Payment Channels */}
      <section aria-label="Campaign and Promotion Performance">
        <PaymentAndPromotions
          payments={data.paymentDistribution}
          promotions={data.activePromotions}
        />
      </section>

      {/* 2. Customer Segmentation Breakdown */}
      <section>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Segmentasi Basis Pelanggan (Customer Segmentation)</CardTitle>
              <CardDescription>
                Klasifikasi profil 5.1M akun terdaftar dan kontribusi terhadap total GMV bisnis
              </CardDescription>
            </div>
            <Badge variant="outline">
              4 Kohort Strategis
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-200 bg-white text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Segmen Pelanggan</th>
                    <th className="py-3 px-4 text-right font-semibold">Jumlah Entitas</th>
                    <th className="py-3 px-4 text-center font-semibold">Pangsa GMV</th>
                    <th className="py-3 px-4 font-semibold">Frekuensi Pembelian</th>
                    <th className="py-3 px-4 font-semibold">Karakteristik & Strategi Pemasaran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {data.customerSegments.map((seg) => (
                    <tr key={seg.name} className="hover:bg-zinc-50/70 transition">
                      <td className="py-3 px-4 font-semibold text-zinc-900">{seg.name}</td>
                      <td className="py-3 px-4 text-right font-mono font-medium text-zinc-800">
                        {formatNumber(seg.customerCount)} akun
                      </td>
                      <td className="py-3 px-4 text-center font-mono">
                        <span className="font-bold text-zinc-900">{seg.revenueContributionPct}%</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-600">{seg.avgOrderFrequency}</td>
                      <td className="py-3 px-4 text-zinc-600 text-[11px] leading-relaxed">
                        {seg.characteristics}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Conversion Funnel Analysis */}
      <section>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Analisis Corong Konversi (Conversion Funnel Analysis)</CardTitle>
            <CardDescription>
              Tahapan konversi end-to-end dari kunjungan sesi hingga settlement pembayaran sukses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {data.conversionFunnel.map((stage, idx) => {
                const maxSessions = data.conversionFunnel[0].userCount;
                const widthPct = Math.round((stage.userCount / maxSessions) * 100);

                return (
                  <div key={stage.stageName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-900">{stage.stageName}</span>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="font-bold text-zinc-900">
                          {formatNumber(stage.userCount)} sesi ({widthPct}%)
                        </span>
                        {idx > 0 && (
                          <span className="text-zinc-500 text-[10px]">
                            Dropoff: {stage.dropoffRatePct}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-2 w-full rounded bg-zinc-100 overflow-hidden">
                      <div
                        style={{ width: `${widthPct}%` }}
                        className="h-2 rounded bg-zinc-800 transition-all"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded border border-zinc-200 bg-white p-3 text-xs flex justify-between items-center text-zinc-600">
              <span>Overall End-to-End Conversion Rate (Visitor to Paid Trx):</span>
              <span className="font-mono font-bold text-emerald-700">
                10.60% (Efisiensi Tinggi)
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

