import React from "react";
import { MonthlyShippingSummary } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { IconAlertTriangle, IconCheckCircle, IconClock, IconTruck } from "@/components/ui/icons";

interface ShippingAnalyticsProps {
  data: MonthlyShippingSummary;
}

export const ShippingAnalytics: React.FC<ShippingAnalyticsProps> = ({ data }) => {
  const onTimePct = ((data.deliveredOnTime / data.totalDispatched) * 100).toFixed(1);
  const delayPct = ((data.delayed / data.totalDispatched) * 100).toFixed(1);
  const failedPct = ((data.undeliveredOrFailed / data.totalDispatched) * 100).toFixed(1);
  const inTransitPct = ((data.inTransit / data.totalDispatched) * 100).toFixed(1);
  const rtsPct = ((data.returnedToSender / data.totalDispatched) * 100).toFixed(1);

  return (
    <Card className="flex flex-col bg-white">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="min-w-0 flex-1">
          <CardTitle>Performa Logistik & Pengiriman (1 Bulan)</CardTitle>
          <CardDescription>
            Monitoring SLA pengiriman periode {data.periodMonth} ({formatNumber(data.totalDispatched)} paket terkirim)
          </CardDescription>
        </div>
        <Badge variant={Number(onTimePct) >= 94 ? "success" : "warning"} className="shrink-0 mt-0.5">
          SLA {onTimePct}% On-Time
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
              <IconCheckCircle size={14} className="text-emerald-600" />
              <span>Tepat Waktu</span>
            </div>
            <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
              {formatNumber(data.deliveredOnTime)}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              {onTimePct}% dari volume
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-800">
              <IconClock size={14} className="text-amber-600" />
              <span>Delay</span>
            </div>
            <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
              {formatNumber(data.delayed)}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              {delayPct}% keterlambatan
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
            <div className="flex items-center gap-1.5 text-xs font-medium text-rose-800">
              <IconAlertTriangle size={14} className="text-rose-600" />
              <span>Gagal Kirim</span>
            </div>
            <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
              {formatNumber(data.undeliveredOrFailed)}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              {failedPct}% delivery failure
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 hover:border-zinc-300 transition-all">
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-700">
              <IconTruck size={14} className="text-zinc-500" />
              <span>Transit & RTS</span>
            </div>
            <div className="mt-2 font-mono text-xl font-bold text-zinc-900">
              {formatNumber(data.inTransit + data.returnedToSender)}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              Transit {inTransitPct}% &bull; RTS {rtsPct}%
            </div>
          </div>
        </div>

        {/* Multi-segment Fulfillment Bar */}
        <div>
          <div className="mb-2 flex justify-between text-xs text-zinc-500">
            <span className="font-medium text-zinc-700">Rasio Status Distribusi Paket</span>
            <span className="font-mono text-[11px] text-zinc-400">100% Volume</span>
          </div>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-100 p-0.5">
            <div
              style={{ width: `${onTimePct}%` }}
              title={`On-time: ${onTimePct}%`}
              className="bg-emerald-600 rounded-l-full transition-all"
            />
            <div
              style={{ width: `${inTransitPct}%` }}
              title={`In transit: ${inTransitPct}%`}
              className="bg-zinc-500 transition-all"
            />
            <div
              style={{ width: `${delayPct}%` }}
              title={`Delay: ${delayPct}%`}
              className="bg-amber-500 transition-all"
            />
            <div
              style={{ width: `${failedPct}%` }}
              title={`Gagal: ${failedPct}%`}
              className="bg-rose-500 transition-all"
            />
            <div
              style={{ width: `${rtsPct}%` }}
              title={`Return: ${rtsPct}%`}
              className="bg-zinc-300 rounded-r-full transition-all"
            />
          </div>
        </div>

        {/* Root Causes for Delays Table */}
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-zinc-800 tracking-tight">
            Analisis Akar Masalah Keterlambatan (Root-Cause Breakdown)
          </div>
          <div className="space-y-2">
            {data.delayCausesBreakdown.map((item) => (
              <div
                key={item.cause}
                className="flex items-center justify-between rounded-xl border border-zinc-200/70 bg-zinc-50/40 p-3 text-xs hover:border-zinc-300 transition-all"
              >
                <div className="flex-1 pr-4">
                  <div className="font-medium text-zinc-800">{item.cause}</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-200/70 overflow-hidden">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className="h-full rounded-full bg-zinc-800 transition-all"
                    />
                  </div>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <div className="font-bold text-zinc-900">
                    {formatNumber(item.incidentCount)} kasus
                  </div>
                  <div className="text-zinc-400 text-[10px] mt-0.5">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
