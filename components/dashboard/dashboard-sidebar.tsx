"use client";

import React from "react";
import {
  IconActivity,
  IconBarChart,
  IconBriefcase,
  IconMegaphone,
  IconShieldAlert,
  IconStore,
  IconTrendingUp,
  IconTruck,
  IconUsers,
} from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";

export type DashboardTab = "executive" | "merchant" | "operations" | "marketing";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

interface MenuSection {
  id: DashboardTab;
  title: string;
  icon: React.FC<{ size?: number; className?: string }>;
  items: string[];
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const sections: MenuSection[] = [
    {
      id: "executive",
      title: "Executive Dashboard",
      icon: IconBriefcase,
      items: [
        "GMV & Revenue trend",
        "Customer acquisition & retention",
        "Top categories & products",
        "Anomaly detection alerts",
      ],
    },
    {
      id: "merchant",
      title: "Merchant Dashboard",
      icon: IconStore,
      items: [
        "Sales performance & analytics",
        "Inventory optimization suggestions",
        "Pricing recommendations",
        "Customer behavior insights",
      ],
    },
    {
      id: "operations",
      title: "Operations Dashboard",
      icon: IconActivity,
      items: [
        "Order fulfillment tracking",
        "Fraud detection alerts",
        "System performance metrics",
        "Real-time transaction monitoring",
      ],
    },
    {
      id: "marketing",
      title: "Marketing Dashboard",
      icon: IconMegaphone,
      items: [
        "Campaign performance",
        "Customer segmentation",
        "Conversion funnel analysis",
      ],
    },
  ];

  return (
    <aside className="w-full shrink-0 border-r border-zinc-200 bg-white md:w-64 lg:w-72">
      {/* Brand & Organization Title */}
      <div className="border-b border-zinc-200 px-5 py-4">
        <div className="flex items-center gap-2.5">
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
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="p-3 space-y-4">
        {sections.map((section) => {
          const isActive = activeTab === section.id;
          const Icon = section.icon;

          return (
            <div key={section.id} className="space-y-1">
              {/* Category Header / Button */}
              <button
                type="button"
                onClick={() => onSelectTab(section.id)}
                className={`flex w-full items-center justify-between rounded px-3 py-2 text-left transition ${
                  isActive
                    ? "bg-zinc-900 text-white font-semibold"
                    : "text-zinc-800 hover:bg-zinc-100/70"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={14} className={isActive ? "text-white" : "text-zinc-500"} />
                  <span className="text-xs font-semibold">{section.title}</span>
                </div>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </button>

              {/* Sub-items (Bullets from Image) */}
              <ul className="pl-7 pr-2 py-1 space-y-1">
                {section.items.map((item) => (
                  <li
                    key={item}
                    onClick={() => onSelectTab(section.id)}
                    className={`cursor-pointer rounded px-2 py-1 text-[11px] transition flex items-center gap-2 ${
                      isActive
                        ? "text-zinc-700 font-medium hover:text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-700"
                    }`}
                  >
                    <span className="h-1 w-1 rounded-full bg-zinc-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div className="border-t border-zinc-200 p-4 mt-auto">
        <div className="rounded border border-zinc-200 bg-white p-2.5 text-[11px]">
          <div className="flex items-center justify-between text-zinc-500 mb-1">
            <span>Cluster Status</span>
            <span className="font-mono font-bold text-emerald-700">Healthy</span>
          </div>
          <div className="font-mono text-[10px] text-zinc-400">
            Node: Apache Spark + BigQuery
          </div>
        </div>
      </div>
    </aside>
  );
};
