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
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* 1. Payment Gateway Distribution */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Distribusi Metode Pembayaran & Settlement</CardTitle>
            <CardDescription>
              Volume settlement transaksi per kanal perbankan & gateway
            </CardDescription>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
            <IconCreditCard size={16} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {payments.map((p) => (
              <div key={p.method} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-zinc-900">{p.method}</span>
                    <span className="text-[11px] text-zinc-400 font-mono ml-2">
                      {formatNumber(p.transactionVolume)} trx
                    </span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-zinc-900">
                      {formatCurrency(p.totalGmv, true)}
                    </span>
                    <span className="text-[11px] text-zinc-400 ml-1.5 font-medium">({p.sharePercentage}%)</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    style={{ width: `${p.sharePercentage}%` }}
                    className="h-full rounded-full bg-zinc-800 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3 text-xs text-zinc-600 flex justify-between items-center">
            <span>Rerata waktu rekonsiliasi gateway:</span>
            <span className="font-mono font-semibold text-zinc-900 bg-white px-2 py-0.5 rounded border border-zinc-200/80 shadow-2xs">
              T+0 (Instant Real-time)
            </span>
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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
            <IconTag size={16} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3.5">
          <div className="space-y-3">
            {promotions.map((promo) => {
              const burnRate = Math.round((promo.redemptionCount / promo.maxRedemption) * 100);

              return (
                <div
                  key={promo.code}
                  className="rounded-xl border border-zinc-200/80 bg-zinc-50/40 p-3.5 text-xs hover:border-zinc-300 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-zinc-900 bg-white px-2 py-0.5 rounded-md border border-zinc-200 shadow-2xs">
                          {promo.code}
                        </span>
                        <Badge variant="outline" className="text-[10px] py-0 px-2">
                          {promo.status}
                        </Badge>
                      </div>
                      <div className="text-zinc-600 text-[11px] mt-1 font-medium">{promo.name}</div>
                    </div>

                    <div className="text-right font-mono text-[11px]">
                      <div className="font-bold text-zinc-900">
                        GMV: {formatCurrency(promo.gmvGenerated, true)}
                      </div>
                      <div className="text-zinc-400 text-[10px] mt-0.5">
                        Subsidi: {formatCurrency(promo.budgetAllocated, true)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono mb-1.5">
                      <span>Klaim: {formatNumber(promo.redemptionCount)} / {formatNumber(promo.maxRedemption)}</span>
                      <span className="font-semibold text-zinc-700">{burnRate}% kuota</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-200/70 overflow-hidden">
                      <div
                        style={{ width: `${burnRate}%` }}
                        className="h-full rounded-full bg-zinc-800 transition-all duration-300"
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
