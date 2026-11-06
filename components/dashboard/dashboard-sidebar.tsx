"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconActivity,
  IconBriefcase,
  IconCpu,
  IconMegaphone,
  IconStore,
  IconX,
} from "@/components/ui/icons";

interface DashboardSidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  isMatch: (pathname: string) => boolean;
  badge?: string;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpenMobile,
  onCloseMobile,
}) => {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      title: "Executive Dashboard",
      href: "/",
      icon: IconBriefcase,
      isMatch: (path) => path === "/",
    },
    {
      title: "Merchant Dashboard",
      href: "/merchant",
      icon: IconStore,
      isMatch: (path) => path.startsWith("/merchant"),
    },
    {
      title: "Operations Dashboard",
      href: "/operation",
      icon: IconActivity,
      isMatch: (path) => path.startsWith("/operation"),
    },
    {
      title: "Marketing Dashboard",
      href: "/marketing",
      icon: IconMegaphone,
      isMatch: (path) => path.startsWith("/marketing"),
    },
    {
      title: "Big Data Analytics",
      href: "/analytics",
      icon: IconCpu,
      isMatch: (path) => path.startsWith("/analytics") || path.startsWith("/bigdata"),
      badge: "Predictive ML",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-2xs transition-opacity md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-200/80 bg-white transition-transform duration-200 ease-in-out md:static md:z-auto md:w-64 md:translate-x-0 md:shrink-0 lg:w-72 ${
          isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & Organization Title */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-zinc-200/80 px-6">
          <Link href="/" className="flex items-center gap-3 group" onClick={onCloseMobile}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white font-mono text-xs font-bold shadow-xs group-hover:bg-zinc-800 transition">
              EC
            </div>
            <div>
              <div className="font-semibold text-xs text-zinc-900 tracking-tight">
                Enterprise Commerce
              </div>
              <div className="text-[11px] text-zinc-400">
                Big Data Platform
              </div>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition md:hidden"
            aria-label="Tutup menu sidebar"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          <div className="px-3 pt-2 pb-1.5 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase font-mono">
            Modul Analitik
          </div>

          {menuItems.map((item) => {
            const isActive = item.isMatch(pathname);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-all ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-xs"
                    : "text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={16}
                    className={isActive ? "text-white" : "text-zinc-400"}
                  />
                  <span>{item.title}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 shrink-0">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Pipeline Telemetry Indicator */}
        <div className="border-t border-zinc-200/80 p-4">
          <div className="rounded-lg border border-zinc-200/70 bg-zinc-50/60 p-3 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 font-medium">Cluster Worker</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <div className="font-mono text-[10px] text-zinc-400 truncate">
              Spark Core &bull; BigQuery Stream
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
