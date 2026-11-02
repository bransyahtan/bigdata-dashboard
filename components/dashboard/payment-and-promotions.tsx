import React from "react";
import { PaymentDistribution, PromotionCampaign } from "@/types/ecommerce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { IconCreditCard, IconTag } from "@/components/ui/icons";

interface PaymentAndPromotionsProps {
  payments: PaymentDistribution[];
  promotions: PromotionCampaign[];
}

export const PaymentAndPromotions: React.FC<PaymentAndPromotionsProps> = ({
  payments,
  promotions,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* 1. Payment Gateway Distribution */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Distribusi Metode Pembayaran & Settlement</CardTitle>
            <CardDescription>
              Volume settlement transaksi per kanal perbankan & gateway
            </CardDescription>
          </div>
          <IconCreditCard size={15} className="text-zinc-400" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="divide-y divide-zinc-100">
            {payments.map((p) => (
              <div key={p.method} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-zinc-900">{p.method}</span>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                      {formatNumber(p.transactionVolume)} transaksi
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-zinc-900">
                      {formatCurrency(p.totalGmv, true)}
                    </span>
                    <div className="text-[10px] text-zinc-400">{p.sharePercentage}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded border border-zinc-200 bg-white p-2.5 text-xs text-zinc-500">
            Rerata waktu rekonsiliasi gateway: <span className="font-mono font-medium text-zinc-800">T+0 (Instant Real-time)</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Active Promotions & Campaign ROI */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Efektivitas Kampanye Promosi (Voucher & Subsidi)</CardTitle>
            <CardDescription>
              Evaluasi serapan anggaran promosi dan kontribusi terhadap GMV
            </CardDescription>
          </div>
          <IconTag size={15} className="text-zinc-400" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            {promotions.map((promo) => {
              const burnRate = Math.round((promo.redemptionCount / promo.maxRedemption) * 100);

              return (
                <div
                  key={promo.code}
                  className="rounded border border-zinc-200 bg-white p-3 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-zinc-900">
                          {promo.code}
                        </span>
                        <Badge variant="outline" className="text-[9px]">
                          {promo.status}
                        </Badge>
                      </div>
                      <div className="text-zinc-500 text-[11px] mt-0.5">{promo.name}</div>
                    </div>

                    <div className="text-right font-mono text-[11px]">
                      <div className="font-bold text-zinc-900">
                        GMV: {formatCurrency(promo.gmvGenerated, true)}
                      </div>
                      <div className="text-zinc-400 text-[10px]">
                        Subsidi: {formatCurrency(promo.budgetAllocated, true)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono mb-1">
                      <span>Klaim: {formatNumber(promo.redemptionCount)} / {formatNumber(promo.maxRedemption)}</span>
                      <span>{burnRate}% kuota</span>
                    </div>
                    <div className="h-1.5 w-full rounded bg-zinc-100">
                      <div
                        style={{ width: `${burnRate}%` }}
                        className="h-1.5 rounded bg-zinc-800"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
