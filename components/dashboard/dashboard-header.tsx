"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  IconDatabase,
  IconDownload,
  IconMenu,
  IconRefresh,
} from "@/components/ui/icons";

interface DashboardHeaderProps {
  lastUpdated: string;
  onToggleMobileSidebar?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  lastUpdated,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white">
      {/* 1. Mobile App Bar (< md) - Clean, single-line, perfectly balanced */}
      <div className="flex h-14 items-center justify-between px-3 md:hidden">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 transition"
            aria-label="Buka menu navigasi"
          >
            <IconMenu size={18} />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-xs font-bold uppercase tracking-wider text-zinc-900">
              Commerce Engine
            </h1>
            <div className="font-mono text-[10px] text-zinc-400 truncate">
              15.2M records &bull; BigQuery
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <select
            aria-label="Filter Periode Analisis"
            defaultValue="YTD-2026"
            className="h-8 rounded border border-zinc-200 bg-white px-2 font-mono text-[11px] text-zinc-700 shadow-2xs focus:outline-hidden"
          >
            <option value="YTD-2026">YTD</option>
            <option value="M-CURRENT">Bulan Ini</option>
            <option value="Q3-2026">Q3</option>
          </select>

          <button
            type="button"
            title="Ekspor CSV"
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 transition"
          >
            <IconDownload size={14} />
          </button>

          <button
            type="button"
            title="Sinkronisasi Data"
            className="flex h-8 w-8 items-center justify-center rounded bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 transition"
          >
            <IconRefresh size={14} />
          </button>
        </div>
      </div>

      {/* 2. Desktop Header (≥ md) - Exactly h-[76px] to align seamlessly with Sidebar */}
      <div className="hidden h-[76px] items-center justify-between px-6 md:flex">
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

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 rounded border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <IconDatabase size={13} className="text-zinc-400" />
            <span className="font-mono text-[11px]">BigQuery Synced: {lastUpdated}</span>
          </div>

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
    </header>
  );
};
