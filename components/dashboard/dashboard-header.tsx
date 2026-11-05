"use client";

import React from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const getDashboardTitle = () => {
    if (pathname.startsWith("/merchant")) {
      return {
        title: "Merchant Analytics & Performance",
        subtitle: "Monitoring katalog mitra, rekomendasi harga, dan run-rate inventori",
      };
    }
    if (pathname.startsWith("/operation")) {
      return {
        title: "Operations & Logistics Telemetry",
        subtitle: "Pelacakan fulfillment SLA pengiriman, fraud detection, dan streaming pipeline",
      };
    }
    if (pathname.startsWith("/marketing")) {
      return {
        title: "Marketing Intelligence & Funnel",
        subtitle: "Efektivitas kampanye promosi, segmentasi kohort pelanggan, dan konversi corong",
      };
    }
    return {
      title: "Executive Strategic Overview",
      subtitle: "Monitoring 15.2M transaksi, 5.1M pelanggan, dan pendapatan Rp 2.45T",
    };
  };

  const headerInfo = getDashboardTitle();

  return (
    <header className="border-b border-zinc-200/80 bg-white">
      {/* 1. Mobile App Bar (< md) - Clean, single-line, perfectly balanced */}
      <div className="flex h-14 items-center justify-between px-3 md:hidden">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 transition shadow-2xs"
            aria-label="Buka menu navigasi"
          >
            <IconMenu size={17} />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-xs font-bold text-zinc-900 tracking-tight">
              {headerInfo.title.split("&")[0]}
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
            className="h-8 rounded-lg border border-zinc-200 bg-white px-2 font-mono text-[11px] text-zinc-700 shadow-2xs focus:outline-hidden"
          >
            <option value="YTD-2026">YTD</option>
            <option value="M-CURRENT">Bulan Ini</option>
            <option value="Q3-2026">Q3</option>
          </select>

          <button
            type="button"
            title="Ekspor CSV"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 transition shadow-2xs"
          >
            <IconDownload size={14} />
          </button>

          <button
            type="button"
            title="Sinkronisasi Data"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 transition shadow-2xs"
          >
            <IconRefresh size={14} />
          </button>
        </div>
      </div>

      {/* 2. Desktop Header (≥ md) - Exactly h-[76px] to align seamlessly with Sidebar */}
      <div className="hidden h-[76px] items-center justify-between px-6 md:flex">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold tracking-tight text-zinc-900 lg:text-lg">
              {headerInfo.title}
            </h1>
            <Badge variant="outline" className="text-[10px] py-0.5 px-2">
              Production Lakehouse
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-zinc-500">
            {headerInfo.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50/50 px-3 py-1.5 text-xs text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <IconDatabase size={13} className="text-zinc-400" />
            <span className="font-mono text-[11px]">Synced: {lastUpdated}</span>
          </div>

          <select
            aria-label="Filter Periode Analisis"
            defaultValue="YTD-2026"
            className="h-8.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 shadow-2xs focus:border-zinc-400 focus:outline-hidden"
          >
            <option value="YTD-2026">Tahun Kalender 2026 (YTD)</option>
            <option value="M-CURRENT">Bulan Berjalan (Oktober - November)</option>
            <option value="Q3-2026">Kuartal 3 (Q3 2026)</option>
          </select>

          <button
            type="button"
            className="inline-flex h-8.5 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 active:bg-zinc-100 shadow-2xs"
          >
            <IconDownload size={13} />
            <span>Ekspor CSV</span>
          </button>

          <button
            type="button"
            className="inline-flex h-8.5 items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 text-xs font-medium text-white transition hover:bg-zinc-800 active:bg-zinc-950 shadow-xs"
          >
            <IconRefresh size={13} />
            <span>Sinkronisasi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
