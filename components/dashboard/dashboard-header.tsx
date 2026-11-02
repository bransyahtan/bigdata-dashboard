"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { IconDatabase, IconDownload, IconMenu, IconRefresh } from "@/components/ui/icons";

interface DashboardHeaderProps {
  lastUpdated: string;
  onToggleMobileSidebar?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  lastUpdated,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white px-4 md:px-6 min-h-[76px] md:h-[76px] flex items-center">
      <div className="flex w-full flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:py-0">
        <div className="flex items-center gap-3">
          {/* Hamburger button on mobile */}
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 md:hidden"
            aria-label="Buka menu navigasi"
          >
            <IconMenu size={16} />
          </button>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-base font-bold tracking-tight text-zinc-900 md:text-lg">
                Enterprise Commerce Data Engine
              </h1>
              <Badge variant="outline" className="hidden sm:inline-flex">
                Production Pipeline
              </Badge>
            </div>
            <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
              Audit operasional & analitik transaksi: 15.2M orders, 5.1M accounts, 2.05M SKU terintegrasi.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 rounded border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <IconDatabase size={13} className="text-zinc-400" />
            <span className="font-mono text-[10px]">Synced: {lastUpdated}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <select
              aria-label="Filter Periode Analisis"
              defaultValue="YTD-2026"
              className="h-8 rounded border border-zinc-200 bg-white px-2 text-xs font-medium text-zinc-700 shadow-2xs focus:border-zinc-400 focus:outline-hidden"
            >
              <option value="YTD-2026">YTD 2026</option>
              <option value="M-CURRENT">Bulan Ini</option>
              <option value="Q3-2026">Kuartal 3</option>
            </select>

            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100"
            >
              <IconDownload size={13} />
              <span className="hidden sm:inline">Ekspor CSV</span>
            </button>

            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800 active:bg-zinc-950"
            >
              <IconRefresh size={13} />
              <span className="hidden sm:inline">Sync</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
