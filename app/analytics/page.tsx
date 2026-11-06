import React from "react";
import { Metadata } from "next";
import { dashboardService } from "@/services/dashboard.service";
import { AnalyticsView } from "@/components/dashboard/views/analytics-view";

export const metadata: Metadata = {
  title: "Big Data Analytics & ML | Enterprise Commerce",
  description: "Demand forecasting, logistics route optimization, and predictive inventory depletion based on 15.2M transaction logs",
};

export default async function AnalyticsDashboardPage() {
  const data = await dashboardService.getDashboardDataset();
  return <AnalyticsView data={data} />;
}

