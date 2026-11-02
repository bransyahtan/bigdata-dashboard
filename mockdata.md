# Enterprise E-Commerce Big Data Architecture & Mock Dataset

Dokumen ini mendefinisikan arsitektur data, skema domain, serta spesifikasi dataset mock untuk **Dashboard Eksekutif Big Data E-Commerce** (skala 15 juta transaksi order, 5 juta pelanggan, dan 2 juta SKU katalog).

---

## 1. Skema 10 Entitas Inti (Core Entities)

| No | Entitas | Skala / Volume | Atribut Utama | Peran dalam Dashboard |
|---|---|---|---|---|
| 1 | `customers` | ~5,140,000 records | `id`, `name`, `email`, `segment` (Enterprise/VIP/Regular), `totalSpent`, `totalOrders`, `status` | Metrik basis pelanggan, pertumbuhan MoM, segmentasi B2B |
| 2 | `products` | ~2,050,000 SKU | `sku`, `name`, `categoryId`, `unitPrice`, `stockLevel`, `ratingAverage`, `reviewCount` | Total katalog SKU, utilisasi inventori |
| 3 | `categories` | 5 kategori utama | `id`, `name`, `skuCount`, `monthlyGmv`, `contributionPercentage` | Distribusi pendapatan vertikal bisnis |
| 4 | `orders` | ~15,280,000 orders | `id`, `customerId`, `createdAt`, `totalAmount`, `status`, `paymentStatus`, `shippingStatus` | Tren volume order bulanan (12 bulan), agregasi GMV YTD |
| 5 | `order_items` | ~38,000,000 items | `id`, `orderId`, `productSku`, `quantity`, `unitPrice`, `subtotal` | Rerata nilai pesanan (AOV), komposisi keranjang |
| 6 | `payments` | ~15,280,000 records | `id`, `orderId`, `method`, `amount`, `settlementStatus`, `settledAt` | Distribusi settlement (BCA VA, Mandiri, QRIS, Invoicing) |
| 7 | `reviews` | ~8,400,000 ulasan | `id`, `productSku`, `rating` (1-5), `sentiment`, `createdAt` | Indeks kepuasan pembeli & rating katalog |
| 8 | `inventory` | Multi-gudang (4 WH) | `sku`, `warehouseCode`, `availableStock`, `reorderThreshold`, `stockStatus` | Peringatan stok kritis (Low Stock & Critical Out of Stock) |
| 9 | `shipping` | ~1,390,000 / bulan | `trackingId`, `orderId`, `courierName`, `status`, `delayReason`, `deliveryDate` | Analisis SLA pengiriman bulanan, delay, dan gagal kirim |
| 10 | `promotions` | Kampanye berkala | `code`, `name`, `discountType`, `redemptionCount`, `gmvGenerated`, `budgetBurn` | ROI promosi, utilisasi kupon B2B & subsidi ongkir |

---

## 2. Spesifikasi Data Agregasi Dashboard (Analytical Mock Specs)

### A. Metrik Utama Ringkasan Eksekutif (KPIs)
- **Gross Merchandise Value (GMV YTD)**: Rp 2.458.920.000.000 (+12.4% MoM)
- **Total Orders (Tahunan)**: 15.284.920 transaksi (+8.6% MoM)
- **Pelanggan Aktif**: 5.142.800 entitas (+5.1% MoM)
- **Fulfillment On-Time Rate**: 94.2% (Delay rate: 4.2%, Target SLA: 95%)
- **Katalog SKU Aktif**: 2.054.100 SKU terdistribusi di 5 kategori

### B. Distribusi Order 12 Bulan dalam 1 Tahun (Januari - Desember 2026)
| Bulan | Volume Transaksi | GMV (IDR) | Rerata Keranjang (AOV) | Tingkat Batal |
|---|---|---|---|---|
| Januari | 1.120.500 | Rp 182,5 M | Rp 162.870 | 1.8% |
| Februari | 1.085.200 | Rp 175,2 M | Rp 161.445 | 1.6% |
| Maret | 1.210.400 | Rp 198,4 M | Rp 163.910 | 1.7% |
| April | 1.350.900 | Rp 224,5 M | Rp 166.185 | 2.1% |
| Mei | 1.180.300 | Rp 191,2 M | Rp 161.992 | 1.9% |
| Juni | 1.295.600 | Rp 211,8 M | Rp 163.476 | 1.8% |
| Juli | 1.240.100 | Rp 202,3 M | Rp 163.132 | 1.5% |
| Agustus | 1.275.800 | Rp 208,6 M | Rp 163.505 | 1.6% |
| September | 1.310.200 | Rp 215,9 M | Rp 164.784 | 1.7% |
| Oktober | 1.390.400 | Rp 231,2 M | Rp 166.283 | 1.9% |
| November | 1.580.720 | Rp 268,4 M | Rp 169.796 | 2.3% |
| Desember | 1.644.800 | Rp 288,9 M | Rp 175.656 | 2.5% |
| **Total Tahunan** | **15.284.920** | **Rp 2,45 Triliun** | **Rp 165.260 (avg)** | **1.86% (avg)** |

### C. Analisis Pengiriman Logistik dalam 1 Bulan Berjalan (Oktober 2026)
Total paket didispatch: **1.390.400 paket**.
- **Terkirim Tepat Waktu (On-Time)**: 1.309.757 paket (94.2%)
- **Dalam Perjalanan (In Transit)**: 27.808 paket (2.0%)
- **Mengalami Keterlambatan (Delayed)**: 38.931 paket (2.8%)
- **Gagal Kirim / Tidak Terkirim (Failed Delivery)**: 9.733 paket (0.7%)
- **Retur ke Pengirim (Returned to Sender / RTS)**: 4.171 paket (0.3%)

**Rincian Akar Masalah Keterlambatan (Delay Root-Causes):**
1. *Kepadatan Hub Logistik Regional*: 16.740 insiden (43.0%)
2. *Alamat Penerima Tidak Lengkap / Tidak Merespon*: 11.290 insiden (29.0%)
3. *Cuaca Ekstrem & Jalur Antar Pulau*: 7.007 insiden (18.0%)
4. *Pemeriksaan Dokumen & Regulasi Kargo*: 3.894 insiden (10.0%)

### D. Distribusi Kategori Produk
1. **Elektronik & Komputasi**: 420.000 SKU | 38.5% GMV (Rp 89,0 M/bln)
2. **Kebutuhan Pokok & FMCG**: 680.000 SKU | 24.2% GMV (Rp 55,9 M/bln)
3. **Peralatan Kantor & Industri**: 310.000 SKU | 15.6% GMV (Rp 36,0 M/bln)
4. **Fashion & Tekstil Komersial**: 390.000 SKU | 12.3% GMV (Rp 28,4 M/bln)
5. **Otomotif & Spare Parts**: 254.100 SKU | 9.4% GMV (Rp 21,7 M/bln)

### E. Distribusi Kanal Pembayaran & Settlement
- **Virtual Account BCA**: 42.5% pangsa (Rp 98,2 M)
- **Mandiri Bill Payment**: 24.8% pangsa (Rp 57,3 M)
- **QRIS Enterprise**: 18.2% pangsa (Rp 42,0 M)
- **Corporate Invoicing / NET-30**: 9.7% pangsa (Rp 22,4 M)
- **Corporate Credit Card**: 4.8% pangsa (Rp 11,0 M)

---

## 3. Struktur Clean Architecture Proyek

```
big-data/
├── types/
│   └── ecommerce.ts             # Domain Models & Analytical Contracts
├── data/
│   └── mock-dashboard.ts        # Data Source / Raw Mock Dataset
├── services/
│   └── dashboard.service.ts     # Use-Case / Application Service Layer (Decoupled Interface)
├── lib/
│   └── utils.ts                 # Number, Currency, & Date Formatters
├── components/
│   ├── ui/
│   │   ├── card.tsx             # Container UI komponen formal
│   │   ├── badge.tsx            # Badge status formal
│   │   └── icons.tsx            # SVG Vector Icons (Tanpa dependensi eksternal)
│   └── dashboard/
│       ├── dashboard-header.tsx         # Topbar kontrol & sync metadata
│       ├── kpi-summary-cards.tsx        # 5 metrik performa eksekutif
│       ├── order-trends-chart.tsx       # Tren volume transaksi 12 bulan (interactive)
│       ├── shipping-analytics.tsx       # Audit SLA pengiriman & akar masalah delay
│       ├── category-and-inventory.tsx   # Utilisasi SKU & peringatan restock gudang
│       ├── payment-and-promotions.tsx   # Settlement gateway & efektivitas kupon
│       └── recent-orders-table.tsx      # Sampling stream order transaksi real-time
└── app/
    ├── layout.tsx               # Root layout sistemik
    ├── globals.css              # Typography & tema formal enterprise
    └── page.tsx                 # Server Component orchestrator
```

---

## 4. Keunggulan Implementasi
- **Zero Gimmicks / No Emojis**: Tampilan bersih, tajam, profesional, berbasis kontras monokrom dengan aksen fungsional (*emerald* untuk SLA tercapai, *amber* untuk peringatan delay, *rose* untuk insiden gagal kirim).
- **Decoupled Architecture**: Layer UI tidak mengonsumsi data mentah secara langsung, melainkan melalui `IDashboardService` yang siap dihubungkan ke query SQL BigQuery / Data Warehouse kapan saja.
- **Tinggi Ketelitian Data**: Menjawab langsung analisis keterlambatan pengiriman per bulan dan agregasi order bulanan sepanjang 1 tahun.
