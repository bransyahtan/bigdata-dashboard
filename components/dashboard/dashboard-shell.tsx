"use client";

import React, { useState } from "react";
import { DashboardDataset } from "@/types/ecommerce";
import { DashboardSidebar, DashboardTab } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ExecutiveView } from "@/components/dashboard/views/executive-view";
import { MerchantView } from "@/components/dashboard/views/merchant-view";
import { OperationsView } from "@/components/dashboard/views/operations-view";
import { MarketingView } from "@/components/dashboard/views/marketing-view";

interface DashboardShellProps {
  initialData: DashboardDataset;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ initialData }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("executive");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case "executive":
        return <ExecutiveView data={initialData} />;
      case "merchant":
        return <MerchantView data={initialData} />;
      case "operations":
        return <OperationsView data={initialData} />;
      case "marketing":
        return <MarketingView data={initialData} />;
      default:
        return <ExecutiveView data={initialData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-zinc-900">
      {/* 1. Sidebar Component (Stationary on Desktop, Drawer on Mobile) */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <DashboardHeader
          lastUpdated="02 Nov 2026, 17:00 WIB"
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-3 py-5 sm:px-6 lg:px-8">
          {renderActiveView()}

          <footer className="border-t border-zinc-200 pt-5 pb-8 text-center text-xs text-zinc-400">
            Enterprise Commerce Big Data Intelligence Hub &bull; Apache Spark + Google Cloud BigQuery &bull; SOC-2 & ISO-27001 Certified
          </footer>
        </main>
      </div>
    </div>
  );
};
