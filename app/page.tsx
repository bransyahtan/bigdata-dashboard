import React from "react";
import { Metadata } from "next";
import { dashboardService } from "@/services/dashboard.service";
import { ExecutiveView } from "@/components/dashboard/views/executive-view";

export const metadata: Metadata = {
  title: "Executive Dashboard | Enterprise Commerce Big Data",
  description: "Executive Management & C-Level Big Data Analytics Dashboard",
};

export default async function ExecutiveDashboardPage() {
  const data = await dashboardService.getDashboardDataset();
  return <ExecutiveView data={data} />;
}
