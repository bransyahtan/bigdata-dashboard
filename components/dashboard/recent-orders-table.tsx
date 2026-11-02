import React from "react";
import { Order, OrderStatus } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface RecentOrdersTableProps {
  orders: Order[];
}

export const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
  const getStatusBadge = (status: OrderStatus): { variant: BadgeVariant; label: string } => {
    switch (status) {
      case "Completed":
        return { variant: "success", label: "Selesai" };
      case "Shipped":
        return { variant: "default", label: "Terkirim" };
      case "Processing":
        return { variant: "warning", label: "Diproses" };
      case "Cancelled":
        return { variant: "danger", label: "Dibatalkan" };
      case "Refunded":
        return { variant: "danger", label: "Refund" };
      default:
        return { variant: "outline", label: status };
    }
  };

  const getShippingBadge = (status: Order["shippingStatus"]): { variant: BadgeVariant; label: string } => {
    switch (status) {
      case "Delivered":
        return { variant: "success", label: "Diterima" };
      case "In Transit":
        return { variant: "secondary", label: "Perjalanan" };
      case "Delayed":
        return { variant: "warning", label: "Tertunda" };
      case "Failed":
        return { variant: "danger", label: "Gagal Kirim" };
      default:
        return { variant: "outline", label: status };
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Aliran Transaksi Terkini (Real-time Stream Sampling)</CardTitle>
          <CardDescription>
            Audit log order terkini dari pipeline ingest transaksi 15.2M records
          </CardDescription>
        </div>
        <span className="font-mono text-xs text-zinc-400">Stream: 6 live records</span>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-white text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
              <tr>
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Pelanggan / Entitas</th>
                <th className="py-3 px-4 font-semibold">Waktu Transaksi</th>
                <th className="py-3 px-4 text-center font-semibold">Item</th>
                <th className="py-3 px-4 text-right font-semibold">Total Nilai</th>
                <th className="py-3 px-4 font-semibold">Metode Bayar</th>
                <th className="py-3 px-4 font-semibold">Status Order</th>
                <th className="py-3 px-4 font-semibold">Logistik / Resi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {orders.map((order) => {
                const statusBadge = getStatusBadge(order.status);
                const shippingBadge = getShippingBadge(order.shippingStatus);

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-50/70 transition"
                  >
                    <td className="py-3 px-4 font-mono font-medium text-zinc-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-zinc-900">
                        {order.customerName}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-400">{order.customerId}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-500 text-[11px]">
                      {order.createdAt}
                    </td>
                    <td className="py-3 px-4 text-center font-mono">{order.itemCount}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-zinc-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="py-3 px-4 text-zinc-600">
                      <div>{order.paymentMethod}</div>
                      <div className="font-mono text-[10px] text-zinc-400">
                        Status: {order.paymentStatus}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Badge variant={shippingBadge.variant} className="text-[9px]">
                          {shippingBadge.label}
                        </Badge>
                      </div>
                      <div className="font-mono text-[10px] text-zinc-400 mt-0.5">
                        {order.shippingTrackingNumber}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
