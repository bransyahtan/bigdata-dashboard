import type { Metadata } from "next";
import "./globals.css";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Enterprise Commerce Big Data Analytics",
  description: "Executive Management Big Data Dashboard for Enterprise E-Commerce Operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full bg-white antialiased">
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
