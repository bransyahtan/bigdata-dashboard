"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-white text-zinc-900">
      {/* 1. Sidebar Component (Uses Next.js App Router Links) */}
      <DashboardSidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <DashboardHeader
          lastUpdated="02 Nov 2026, 17:35 WIB"
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-3 py-5 sm:px-6 lg:px-8">
          {children}

          <footer className="border-t border-zinc-200 pt-5 pb-8 text-center text-xs text-zinc-400">
            Enterprise Commerce Big Data Intelligence Hub &bull; Apache Spark + Google Cloud BigQuery &bull; SOC-2 & ISO-27001 Certified
          </footer>
        </main>
      </div>
    </div>
  );
};
