"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconActivity,
  IconBriefcase,
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
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-2xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-200 bg-white transition-transform duration-200 ease-in-out md:static md:z-auto md:w-64 md:translate-x-0 md:shrink-0 lg:w-72 ${
          isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & Organization Title (Exact h-[76px] to align with Header border line) */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-zinc-200 px-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={onCloseMobile}>
            <div className="flex h-7 w-7 items-center justify-center rounded border border-zinc-300 bg-zinc-900 text-white font-mono text-xs font-bold">
              EC
            </div>
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-zinc-900">
                Enterprise Data Platform
              </div>
              <div className="font-mono text-[10px] text-zinc-400">
                Big Data Intelligence Hub
              </div>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 md:hidden"
            aria-label="Tutup menu sidebar"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Clean Menu Links (Real Next.js App Router Navigation) */}
        <nav className="flex-1 space-y-1.5 p-3">
          {menuItems.map((item) => {
            const isActive = item.isMatch(pathname);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-xs font-semibold transition ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-xs"
                    : "text-zinc-700 hover:bg-zinc-100/80 active:bg-zinc-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} className={isActive ? "text-white" : "text-zinc-500"} />
                  <span>{item.title}</span>
                </div>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer System Status */}
        <div className="border-t border-zinc-200 p-4">
          <div className="rounded border border-zinc-200 bg-white p-2.5 text-[11px]">
            <div className="flex items-center justify-between text-zinc-500 mb-1">
              <span>Cluster Status</span>
              <span className="font-mono font-bold text-emerald-700">Healthy</span>
            </div>
            <div className="font-mono text-[10px] text-zinc-400">
              Spark + BigQuery Lakehouse
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
