import React from "react";
import { dashboardService } from "@/services/dashboard.service";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata = {
  title: "Dashboard Eksekutif E-Commerce | Big Data Analytics",
  description: "Enterprise Executive Big Data Dashboard: Executive, Merchant, Operations, & Marketing Analytics",
};

export default async function DashboardPage() {
  // Fetch dataset through Clean Architecture Service Layer
  const data = await dashboardService.getDashboardDataset();

  return <DashboardShell initialData={data} />;
}
