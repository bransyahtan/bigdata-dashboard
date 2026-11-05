import React from "react";
import { DashboardDataset } from "@/types/ecommerce";
import { PaymentAndPromotions } from "@/components/dashboard/payment-and-promotions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

interface MarketingViewProps {
  data: DashboardDataset;
}

export const MarketingView: React.FC<MarketingViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
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
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div className="min-w-0 flex-1">
              <CardTitle>Segmentasi Basis Pelanggan (Customer Segmentation)</CardTitle>
              <CardDescription>
                Klasifikasi profil 5.1M akun terdaftar dan kontribusi terhadap total GMV bisnis
              </CardDescription>
            </div>
            <Badge variant="outline" className="shrink-0 mt-0.5">
              4 Kohort Strategis
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-200/80 bg-zinc-50/70 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Segmen Pelanggan</th>
                    <th className="py-3 px-5 text-right font-semibold">Jumlah Entitas</th>
                    <th className="py-3 px-5 text-center font-semibold">Pangsa GMV</th>
                    <th className="py-3 px-5 font-semibold">Frekuensi Pembelian</th>
                    <th className="py-3 px-5 font-semibold">Karakteristik & Strategi Pemasaran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {data.customerSegments.map((seg) => (
                    <tr key={seg.name} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-zinc-900">{seg.name}</td>
                      <td className="py-3.5 px-5 text-right font-mono font-bold text-zinc-800">
                        {formatNumber(seg.customerCount)} akun
                      </td>
                      <td className="py-3.5 px-5 text-center font-mono">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold text-zinc-900 bg-zinc-100">
                          {seg.revenueContributionPct}%
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-mono text-zinc-600 font-medium">{seg.avgOrderFrequency}</td>
                      <td className="py-3.5 px-5 text-zinc-600 text-[11px] leading-relaxed">
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
          <CardContent className="space-y-5">
            <div className="space-y-3.5">
              {data.conversionFunnel.map((stage, idx) => {
                const maxSessions = data.conversionFunnel[0].userCount;
                const widthPct = Math.round((stage.userCount / maxSessions) * 100);

                return (
                  <div key={stage.stageName} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-900">{stage.stageName}</span>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="font-bold text-zinc-900">
                          {formatNumber(stage.userCount)} sesi ({widthPct}%)
                        </span>
                        {idx > 0 && (
                          <span className="text-zinc-500 text-[10px] bg-zinc-100 px-2 py-0.5 rounded">
                            Dropoff: {stage.dropoffRatePct}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                      <div
                        style={{ width: `${widthPct}%` }}
                        className="h-full rounded-full bg-zinc-800 transition-all duration-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 text-xs flex justify-between items-center text-zinc-600">
              <span className="font-medium text-zinc-700">Overall End-to-End Conversion Rate (Visitor to Paid Trx):</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/70 shadow-2xs">
                10.60% (Efisiensi Tinggi)
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
