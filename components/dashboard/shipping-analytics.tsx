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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Performa Logistik & Pengiriman (1 Bulan)</CardTitle>
          <CardDescription>
            Monitoring SLA pengiriman periode {data.periodMonth} ({formatNumber(data.totalDispatched)} paket terkirim)
          </CardDescription>
        </div>
        <Badge variant={Number(onTimePct) >= 94 ? "success" : "warning"}>
          SLA {onTimePct}% On-Time
        </Badge>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Metric Cards Grid - Pure White with border */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded border border-zinc-200 bg-white p-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
              <IconCheckCircle size={13} className="text-emerald-600" />
              <span>Terkirim Tepat Waktu</span>
            </div>
            <div className="mt-2 font-mono text-base font-bold text-zinc-900">
              {formatNumber(data.deliveredOnTime)}
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
              {onTimePct}% dari volume
            </div>
          </div>

          <div className="rounded border border-zinc-200 bg-white p-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-800">
              <IconClock size={13} className="text-amber-600" />
              <span>Mengalami Delay</span>
            </div>
            <div className="mt-2 font-mono text-base font-bold text-zinc-900">
              {formatNumber(data.delayed)}
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
              {delayPct}% keterlambatan
            </div>
          </div>

          <div className="rounded border border-zinc-200 bg-white p-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-rose-800">
              <IconAlertTriangle size={13} className="text-rose-600" />
              <span>Gagal / Tidak Terkirim</span>
            </div>
            <div className="mt-2 font-mono text-base font-bold text-zinc-900">
              {formatNumber(data.undeliveredOrFailed)}
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
              {failedPct}% delivery failure
            </div>
          </div>

          <div className="rounded border border-zinc-200 bg-white p-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-700">
              <IconTruck size={13} className="text-zinc-500" />
              <span>Transit & RTS</span>
            </div>
            <div className="mt-2 font-mono text-base font-bold text-zinc-900">
              {formatNumber(data.inTransit + data.returnedToSender)}
            </div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
              Transit: {inTransitPct}% | RTS: {rtsPct}%
            </div>
          </div>
        </div>

        {/* Multi-segment Fulfillment Bar */}
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-zinc-500">
            <span>Rasio Status Distribusi Paket</span>
            <span className="font-mono text-[10px] text-zinc-400">100% Volume</span>
          </div>
          <div className="flex h-2.5 w-full overflow-hidden rounded bg-zinc-100">
            <div
              style={{ width: `${onTimePct}%` }}
              title={`On-time: ${onTimePct}%`}
              className="bg-emerald-600 transition-all"
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
              className="bg-zinc-300 transition-all"
            />
          </div>
        </div>

        {/* Root Causes for Delays Table */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-700 mb-2">
            Analisis Akar Masalah Keterlambatan (Root-Cause Breakdown)
          </div>
          <div className="space-y-2">
            {data.delayCausesBreakdown.map((item) => (
              <div
                key={item.cause}
                className="flex items-center justify-between rounded border border-zinc-200 bg-white p-2.5 text-xs"
              >
                <div className="flex-1 pr-4">
                  <div className="font-medium text-zinc-800">{item.cause}</div>
                  <div className="mt-1.5 h-1 w-full rounded bg-zinc-100">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className="h-1 rounded bg-zinc-800"
                    />
                  </div>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <div className="font-bold text-zinc-900">
                    {formatNumber(item.incidentCount)} kasus
                  </div>
                  <div className="text-zinc-400 text-[10px]">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
