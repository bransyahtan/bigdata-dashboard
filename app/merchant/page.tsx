import React from "react";
import { Metadata } from "next";
import { dashboardService } from "@/services/dashboard.service";
import { MerchantView } from "@/components/dashboard/views/merchant-view";

export const metadata: Metadata = {
  title: "Merchant Dashboard | Enterprise Commerce Big Data",
  description: "Sales performance, inventory optimization, and pricing recommendations for merchants",
};

export default async function MerchantDashboardPage() {
  const data = await dashboardService.getDashboardDataset();
  return <MerchantView data={data} />;
}

