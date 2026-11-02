"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { IconDatabase, IconDownload, IconRefresh } from "@/components/ui/icons";

interface DashboardHeaderProps {
  lastUpdated: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ lastUpdated }) => {
  return (
    <header className="border-b border-zinc-200 bg-white px-6 py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              Enterprise Commerce Data Engine
            </h1>
            <Badge variant="outline">
              Production Pipeline
            </Badge>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Audit operasional & analitik transaksi: 15.2M orders, 5.1M accounts, 2.05M SKU terintegrasi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 rounded border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <IconDatabase size={13} className="text-zinc-400" />
            <span className="font-mono text-[11px]">BigQuery Synced: {lastUpdated}</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              aria-label="Filter Periode Analisis"
              defaultValue="YTD-2026"
              className="h-8 rounded border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 shadow-2xs focus:border-zinc-400 focus:outline-hidden"
            >
              <option value="YTD-2026">Tahun Kalender 2026 (YTD)</option>
              <option value="M-CURRENT">Bulan Berjalan (Oktober - November)</option>
              <option value="Q3-2026">Kuartal 3 (Q3 2026)</option>
            </select>

            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100"
            >
              <IconDownload size={13} />
              <span>Ekspor CSV</span>
            </button>

            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800 active:bg-zinc-950"
            >
              <IconRefresh size={13} />
              <span>Sinkronisasi</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
