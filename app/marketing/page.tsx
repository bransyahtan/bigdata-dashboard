import React from "react";
import { Metadata } from "next";
import { dashboardService } from "@/services/dashboard.service";
import { MarketingView } from "@/components/dashboard/views/marketing-view";

export const metadata: Metadata = {
  title: "Marketing Dashboard | Enterprise Commerce Big Data",
  description: "Campaign performance, customer segmentation, and conversion funnel analytics",
};

export default async function MarketingDashboardPage() {
  const data = await dashboardService.getDashboardDataset();
  return <MarketingView data={data} />;
}
