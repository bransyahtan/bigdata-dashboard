import React from "react";
import { DashboardDataset } from "@/types/ecommerce";
import { ShippingAnalytics } from "@/components/dashboard/shipping-analytics";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { IconActivity, IconShieldAlert } from "@/components/ui/icons";

interface OperationsViewProps {
  data: DashboardDataset;
}

export const OperationsView: React.FC<OperationsViewProps> = ({ data }) => {
  return (
    <div className="space-y-5">
      {/* 1. System Performance Metrics (Telemetry Pipeline) */}
      <section>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performa Infrastruktur & Pipeline Sistem (System Performance Metrics)</CardTitle>
              <CardDescription>
                Telemetry real-time pipeline BigQuery, Kafka Ingest, dan cluster worker data
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-zinc-500">Pipeline Active</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Kafka Throughput
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  {formatNumber(data.systemTelemetry.kafkaThroughputEventsPerSec)} evt/s
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  Streaming event ingest
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Query Latency (p95)
                </span>
                <div className="mt-1 font-mono text-base font-bold text-emerald-700">
                  {data.systemTelemetry.bigQueryQueryLatencyMs} ms
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  BigQuery lakehouse tier
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  API Success Rate
                </span>
                <div className="mt-1 font-mono text-base font-bold text-zinc-900">
                  {data.systemTelemetry.apiSuccessRatePct}%
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  Error rate 0.02%
                </div>
              </div>

              <div className="rounded border border-zinc-200 bg-white p-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Cluster Worker Health
                </span>
                <div className="mt-1 font-mono text-base font-bold text-emerald-700">
                  {data.systemTelemetry.workerClusterHealthPct}%
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  0 node degradasian
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. Order Fulfillment Tracking & Fraud Detection Alerts */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Fulfillment Tracking */}
        <ShippingAnalytics data={data.shippingMonthlyAnalytics} />

        {/* Fraud Detection Alerts */}
        <Card className="bg-white flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Peringatan Deteksi Fraud (Fraud Detection Alerts)</CardTitle>
              <CardDescription>
                Pencegahan transaksi mencurigakan, velocity check, dan anomali gateway
              </CardDescription>
            </div>
            <Badge variant="danger">
              {data.fraudAlerts.length} Kasus Terpantau
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            <div className="divide-y divide-zinc-100">
              {data.fraudAlerts.map((fraud) => (
                <div key={fraud.flagId} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-zinc-900">{fraud.flagId}</span>
                      <span className="font-mono text-[10px] text-zinc-400">Order: {fraud.orderId}</span>
                    </div>
                    <Badge
                      variant={fraud.status === "Blocked" ? "danger" : fraud.status === "Under Review" ? "warning" : "success"}
                      className="text-[9px]"
                    >
                      {fraud.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-zinc-700 leading-relaxed">{fraud.triggerReason}</div>
                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-zinc-500">
                    <span>Nilai Order: <strong className="text-zinc-900">{formatCurrency(fraud.amount)}</strong></span>
                    <span className="text-rose-700 font-bold">Skor Risiko: {fraud.riskScore}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Real-time Transaction Monitoring (Audit Log Stream) */}
      <section aria-label="Real-time transaction monitoring">
        <RecentOrdersTable orders={data.recentOrders} />
      </section>
    </div>
  );
};

