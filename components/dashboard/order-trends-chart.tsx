"use client";

import React, { useState } from "react";
import { MonthlyOrderMetrics } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber, formatCurrency, formatNumber } from "@/lib/utils";

interface OrderTrendsChartProps {
  data: MonthlyOrderMetrics[];
}

export const OrderTrendsChart: React.FC<OrderTrendsChartProps> = ({ data }) => {
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(data.length - 1);
  const activeMonth = data[activeMonthIndex] || data[data.length - 1];

  const maxVolume = Math.max(...data.map((d) => d.orderVolume));
  const totalAnnualOrders = data.reduce((acc, curr) => acc + curr.orderVolume, 0);
  const totalAnnualGmv = data.reduce((acc, curr) => acc + curr.gmvAmount, 0);

  return (
    <Card className="flex flex-col bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Distribusi & Tren Order Bulanan (1 Tahun)</CardTitle>
          <CardDescription>
            Agregasi volume transaksi dan GMV 12 bulan (Total {formatNumber(totalAnnualOrders)} orders)
          </CardDescription>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Akumulasi GMV</div>
          <div className="font-mono text-base font-bold text-zinc-900 mt-0.5">
            {formatCurrency(totalAnnualGmv, true)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Active Month Detail Bar */}
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-zinc-200/70 bg-zinc-50/60 p-4 sm:grid-cols-4">
          <div>
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Bulan Terpilih</span>
            <div className="font-bold text-zinc-900 text-sm mt-0.5">
              {activeMonth.month} 2026
            </div>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Volume Transaksi</span>
            <div className="font-mono text-sm font-bold text-zinc-900 mt-0.5">
              {formatNumber(activeMonth.orderVolume)} <span className="text-xs font-normal text-zinc-500">orders</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Nilai GMV</span>
            <div className="font-mono text-sm font-bold text-zinc-900 mt-0.5">
              {formatCurrency(activeMonth.gmvAmount, true)}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Rerata Nilai (AOV)</span>
            <div className="font-mono text-sm font-bold text-zinc-900 mt-0.5">
              {formatCurrency(activeMonth.averageOrderValue)}
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div>
          <div className="h-44 w-full flex items-end gap-2 pt-6 pb-2 border-b border-zinc-200/80">
            {data.map((item, index) => {
              const heightPct = Math.round((item.orderVolume / maxVolume) * 100);
              const isSelected = activeMonthIndex === index;

              return (
                <div
                  key={item.monthCode}
                  onClick={() => setActiveMonthIndex(index)}
                  className="group relative flex flex-1 flex-col items-center h-full justify-end cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute -top-8 z-10 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-mono text-white shadow-md">
                    {formatCompactNumber(item.orderVolume)} orders
                  </div>

                  {/* Bar element */}
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-md transition-all duration-200 ${
                      isSelected
                        ? "bg-zinc-900 shadow-2xs"
                        : "bg-zinc-200 hover:bg-zinc-300/80"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Month Labels below bars */}
          <div className="flex w-full justify-between gap-2 pt-2 text-center font-mono text-[11px]">
            {data.map((item, index) => (
              <span
                key={item.monthCode}
                onClick={() => setActiveMonthIndex(index)}
                className={`flex-1 cursor-pointer py-1 rounded transition-colors ${
                  activeMonthIndex === index
                    ? "font-bold text-zinc-900 bg-zinc-100"
                    : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {item.monthCode}
              </span>
            ))}
          </div>
        </div>

        {/* Mini Table Summary for Formal Financial Review */}
        <div className="overflow-hidden rounded-xl border border-zinc-200/80">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200/80 bg-zinc-50/70 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
              <tr>
                <th className="py-2.5 px-3.5 font-medium">Kuartal / Bulan</th>
                <th className="py-2.5 px-3.5 text-right font-medium">Order Count</th>
                <th className="py-2.5 px-3.5 text-right font-medium">GMV (IDR)</th>
                <th className="py-2.5 px-3.5 text-right font-medium">AOV</th>
                <th className="py-2.5 px-3.5 text-right font-medium">Batal (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-mono text-[11px]">
              {data.slice(-4).map((row) => (
                <tr
                  key={row.month}
                  onClick={() => setActiveMonthIndex(data.findIndex((d) => d.month === row.month))}
                  className="cursor-pointer hover:bg-zinc-50/80 transition-colors"
                >
                  <td className="py-2.5 px-3.5 font-sans font-medium text-zinc-900">
                    {row.month}
                  </td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-zinc-800">{formatNumber(row.orderVolume)}</td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-zinc-900">{formatCurrency(row.gmvAmount, true)}</td>
                  <td className="py-2.5 px-3.5 text-right text-zinc-600">{formatCurrency(row.averageOrderValue)}</td>
                  <td className="py-2.5 px-3.5 text-right text-zinc-500">{row.cancellationRatePct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
