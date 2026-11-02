import React from "react";
import { Metadata } from "next";
import { dashboardService } from "@/services/dashboard.service";
import { OperationsView } from "@/components/dashboard/views/operations-view";

export const metadata: Metadata = {
  title: "Operations Dashboard | Enterprise Commerce Big Data",
  description: "Order fulfillment tracking, fraud detection, and system pipeline telemetry",
};

export default async function OperationsDashboardPage() {
  const data = await dashboardService.getDashboardDataset();
  return <OperationsView data={data} />;
}
