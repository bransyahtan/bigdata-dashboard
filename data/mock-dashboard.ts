import { DashboardDataset } from "@/types/ecommerce";

/**
 * Enterprise E-Commerce Big Data Mock Dataset
 * Reflecting ~15M orders, ~5M customers, ~2M SKUs catalog operations.
 */
export const MOCK_DASHBOARD_DATA: DashboardDataset = {
  summaryKpis: {
    totalRevenueYtd: 2_458_920_000_000, // Rp 2.45 Triliun
    totalRevenueMoMGrowth: 12.4,
    totalOrdersAnnual: 15_284_920, // 15 juta orders scale
    totalOrdersMoMGrowth: 8.6,
    activeCustomerBase: 5_142_800, // 5 juta customers scale
    activeCustomerMoMGrowth: 5.1,
    totalSkusCatalog: 2_054_100, // 2 juta SKU scale
    shippingOnTimeRate: 94.2, // 94.2% on-time fulfillment
    shippingDelayRate: 4.2, // 4.2% delay rate
  },

  // 12 Months Order Trends (Jan - Dec)
  monthlyOrderTrends: [
    {
      month: "Januari",
      monthCode: "Jan",
      orderVolume: 1_120_500,
      gmvAmount: 182_500_000_000,
      averageOrderValue: 162_870,
      cancellationRatePct: 1.8,
    },
    {
      month: "Februari",
      monthCode: "Feb",
      orderVolume: 1_085_200,
      gmvAmount: 175_200_000_000,
      averageOrderValue: 161_445,
      cancellationRatePct: 1.6,
    },
    {
      month: "Maret",
      monthCode: "Mar",
      orderVolume: 1_210_400,
      gmvAmount: 198_400_000_000,
      averageOrderValue: 163_910,
      cancellationRatePct: 1.7,
    },
    {
      month: "April",
      monthCode: "Apr",
      orderVolume: 1_350_900,
      gmvAmount: 224_500_000_000,
      averageOrderValue: 166_185,
      cancellationRatePct: 2.1,
    },
    {
      month: "Mei",
      monthCode: "Mei",
      orderVolume: 1_180_300,
      gmvAmount: 191_200_000_000,
      averageOrderValue: 161_992,
      cancellationRatePct: 1.9,
    },
    {
      month: "Juni",
      monthCode: "Jun",
      orderVolume: 1_295_600,
      gmvAmount: 211_800_000_000,
      averageOrderValue: 163_476,
      cancellationRatePct: 1.8,
    },
    {
      month: "Juli",
      monthCode: "Jul",
      orderVolume: 1_240_100,
      gmvAmount: 202_300_000_000,
      averageOrderValue: 163_132,
      cancellationRatePct: 1.5,
    },
    {
      month: "Agustus",
      monthCode: "Agu",
      orderVolume: 1_275_800,
      gmvAmount: 208_600_000_000,
      averageOrderValue: 163_505,
      cancellationRatePct: 1.6,
    },
    {
      month: "September",
      monthCode: "Sep",
      orderVolume: 1_310_200,
      gmvAmount: 215_900_000_000,
      averageOrderValue: 164_784,
      cancellationRatePct: 1.7,
    },
    {
      month: "Oktober",
      monthCode: "Okt",
      orderVolume: 1_390_400,
      gmvAmount: 231_200_000_000,
      averageOrderValue: 166_283,
      cancellationRatePct: 1.9,
    },
    {
      month: "November",
      monthCode: "Nov",
      orderVolume: 1_580_720,
      gmvAmount: 268_400_000_000,
      averageOrderValue: 169_796,
      cancellationRatePct: 2.3,
    },
    {
      month: "Desember",
      monthCode: "Des",
      orderVolume: 1_644_800,
      gmvAmount: 288_920_000_000,
      averageOrderValue: 175_656,
      cancellationRatePct: 2.5,
    },
  ],

  // Monthly Shipping Analytics (Periode: 30 Hari Terakhir / 1 Bulan Berjalan)
  shippingMonthlyAnalytics: {
    periodMonth: "Oktober 2026",
    totalDispatched: 1_390_400,
    deliveredOnTime: 1_309_757, // 94.2%
    inTransit: 27_808, // 2.0%
    delayed: 38_931, // 2.8%
    undeliveredOrFailed: 9_733, // 0.7%
    returnedToSender: 4_171, // 0.3%
    delayCausesBreakdown: [
      {
        cause: "Kepadatan Hub Logistik Regional",
        incidentCount: 16_740,
        percentage: 43.0,
      },
      {
        cause: "Alamat Penerima Tidak Lengkap / Tidak Merespon",
        incidentCount: 11_290,
        percentage: 29.0,
      },
      {
        cause: "Cuaca Ekstrem / Bencana Jalur Distribusi Antar Pulau",
        incidentCount: 7_007,
        percentage: 18.0,
      },
      {
        cause: "Pemeriksaan Dokumen & Regulasi Kargo Khusus",
        incidentCount: 3_894,
        percentage: 10.0,
      },
    ],
  },

  // Category Distribution & SKUs
  categoryBreakdown: [
    {
      category: "Elektronik & Perangkat Komputasi",
      skuCount: 420_000,
      revenueSharePct: 38.5,
      monthlyGmv: 89_012_000_000,
      stockHealthPct: 96.2,
    },
    {
      category: "Kebutuhan Pokok & FMCG",
      skuCount: 680_000,
      revenueSharePct: 24.2,
      monthlyGmv: 55_950_400_000,
      stockHealthPct: 92.8,
    },
    {
      category: "Peralatan Kantor & Industri",
      skuCount: 310_000,
      revenueSharePct: 15.6,
      monthlyGmv: 36_067_200_000,
      stockHealthPct: 94.5,
    },
    {
      category: "Fashion & Tekstil Komersial",
      skuCount: 390_000,
      revenueSharePct: 12.3,
      monthlyGmv: 28_437_600_000,
      stockHealthPct: 88.4,
    },
    {
      category: "Otomotif & Spare Parts",
      skuCount: 254_100,
      revenueSharePct: 9.4,
      monthlyGmv: 21_732_800_000,
      stockHealthPct: 97.1,
    },
  ],

  // 7. Customer Reviews & Sentiment Analytics (8.4M records scale)
  reviewMetrics: {
    totalReviews: 8_420_000,
    averageRating: 4.65,
    positivePct: 82.4,
    neutralPct: 13.8,
    negativePct: 3.8,
  },

  // Inventory Stock Health & Real-time Alerts
  inventoryAlerts: [
    {
      sku: "SKU-ELC-99214",
      productName: "Server Rack UPS 3000VA Enterprise",
      category: "Elektronik & Komputasi",
      warehouseCode: "WH-CGK-01 (Cikarang)",
      availableStock: 8,
      reservedStock: 14,
      reorderThreshold: 25,
      stockStatus: "Low Stock",
      leadTimeDays: 7,
    },
    {
      sku: "SKU-IND-44102",
      productName: "Hydraulic Fluid Drum ISO-VG 46 (200L)",
      category: "Peralatan Industri",
      warehouseCode: "WH-SUB-02 (Surabaya)",
      availableStock: 0,
      reservedStock: 4,
      reorderThreshold: 15,
      stockStatus: "Critical Out of Stock",
      leadTimeDays: 14,
    },
    {
      sku: "SKU-FMC-12099",
      productName: "Thermal Paper Roll 80x80mm Box 50 Roll",
      category: "Kebutuhan Pokok & FMCG",
      warehouseCode: "WH-BDG-01 (Bandung)",
      availableStock: 42,
      reservedStock: 80,
      reorderThreshold: 100,
      stockStatus: "Low Stock",
      leadTimeDays: 3,
    },
    {
      sku: "SKU-AUT-88319",
      productName: "Fleet Diagnostic Scanner OBD-II Professional",
      category: "Otomotif & Spare Parts",
      warehouseCode: "WH-CGK-02 (Marunda)",
      availableStock: 12,
      reservedStock: 18,
      reorderThreshold: 30,
      stockStatus: "Low Stock",
      leadTimeDays: 10,
    },
  ],

  // Payment Settlement Distribution (QRIS, CC, Debit, COD, Cash)
  paymentDistribution: [
    {
      method: "QRIS Enterprise & Dynamic",
      sharePercentage: 31.4,
      transactionVolume: 436_585,
      totalGmv: 76_930_000_000,
    },
    {
      method: "Kartu Kredit (Credit Card / CC)",
      sharePercentage: 24.6,
      transactionVolume: 342_038,
      totalGmv: 60_270_000_000,
    },
    {
      method: "Debit Online & Virtual Account",
      sharePercentage: 20.8,
      transactionVolume: 289_203,
      totalGmv: 50_960_000_000,
    },
    {
      method: "Cash on Delivery (COD)",
      sharePercentage: 13.5,
      transactionVolume: 187_704,
      totalGmv: 33_075_000_000,
    },
    {
      method: "Tunai & Transfer Bank (Cash)",
      sharePercentage: 9.7,
      transactionVolume: 134_870,
      totalGmv: 23_765_000_000,
    },
  ],

  // Active Promotions
  activePromotions: [
    {
      code: "B2B-Q4-ENTERPRISE",
      name: "Diskon Volume Pengadaan Kuartal 4",
      discountType: "Percentage",
      discountValue: 12,
      redemptionCount: 8_420,
      maxRedemption: 10_000,
      gmvGenerated: 42_100_000_000,
      budgetAllocated: 5_052_000_000,
      status: "Active",
      expiresAt: "2026-12-31",
    },
    {
      code: "FREE-FREIGHT-JAVA",
      name: "Subsidi Logistik Armada Truk Pulau Jawa",
      discountType: "Fixed Value",
      discountValue: 250_000,
      redemptionCount: 14_920,
      maxRedemption: 20_000,
      gmvGenerated: 31_450_000_000,
      budgetAllocated: 3_730_000_000,
      status: "Active",
      expiresAt: "2026-11-30",
    },
    {
      code: "SMART-OFFICE-BUNDLE",
      name: "Paket Hardware Komputasi & Kantor",
      discountType: "Percentage",
      discountValue: 8,
      redemptionCount: 3_810,
      maxRedemption: 5_000,
      gmvGenerated: 19_800_000_000,
      budgetAllocated: 1_584_000_000,
      status: "Active",
      expiresAt: "2026-12-15",
    },
  ],

  // Recent Representative Transactions (Sampling from 15M records stream)
  recentOrders: [
    {
      id: "ORD-202611-948102",
      customerId: "CUST-089124",
      customerName: "PT Sinar Perkasa Solusindo",
      createdAt: "02 Nov 2026, 16:32",
      itemCount: 24,
      totalAmount: 48_500_000,
      status: "Completed",
      paymentMethod: "Virtual Account BCA",
      paymentStatus: "Settled",
      shippingTrackingNumber: "TRK-JNE-88192041",
      shippingStatus: "Delivered",
    },
    {
      id: "ORD-202611-948098",
      customerId: "CUST-041928",
      customerName: "CV Maju Mandiri Distribusi",
      createdAt: "02 Nov 2026, 16:15",
      itemCount: 120,
      totalAmount: 112_000_000,
      status: "Shipped",
      paymentMethod: "Corporate Invoicing",
      paymentStatus: "Settled",
      shippingTrackingNumber: "TRK-CARGO-192834",
      shippingStatus: "In Transit",
    },
    {
      id: "ORD-202611-948091",
      customerId: "CUST-104921",
      customerName: "PT Bahari Nusantara Logistik",
      createdAt: "02 Nov 2026, 15:50",
      itemCount: 15,
      totalAmount: 34_800_000,
      status: "Processing",
      paymentMethod: "Mandiri Bill",
      paymentStatus: "Settled",
      shippingTrackingNumber: "TRK-SCP-49102941",
      shippingStatus: "Delayed",
    },
    {
      id: "ORD-202611-948085",
      customerId: "CUST-002914",
      customerName: "PT Prima Graha Utama",
      createdAt: "02 Nov 2026, 15:24",
      itemCount: 6,
      totalAmount: 18_250_000,
      status: "Processing",
      paymentMethod: "QRIS Enterprise",
      paymentStatus: "Settled",
      shippingTrackingNumber: "TRK-JNT-00918234",
      shippingStatus: "In Transit",
    },
    {
      id: "ORD-202611-948079",
      customerId: "CUST-071842",
      customerName: "Koperasi Pegawai Telekomunikasi",
      createdAt: "02 Nov 2026, 14:48",
      itemCount: 45,
      totalAmount: 67_400_000,
      status: "Cancelled",
      paymentMethod: "Virtual Account BCA",
      paymentStatus: "Refunded",
      shippingTrackingNumber: "TRK-JNE-99410293",
      shippingStatus: "Failed",
    },
    {
      id: "ORD-202611-948070",
      customerId: "CUST-055102",
      customerName: "PT Aero Global Logistik",
      createdAt: "02 Nov 2026, 14:10",
      itemCount: 80,
      totalAmount: 89_300_000,
      status: "Completed",
      paymentMethod: "Virtual Account BCA",
      paymentStatus: "Settled",
      shippingTrackingNumber: "TRK-CARGO-550192",
      shippingStatus: "Delivered",
    },
  ],

  // Executive Extensions: Anomalies & Retention
  executiveAnomalies: [
    {
      id: "ANM-202611-01",
      timestamp: "02 Nov 2026, 15:40",
      metric: "Spike Pembatalan Order (Cancellation Rate)",
      severity: "High",
      description: "Lonjakan pembatalan 4.8% pada kategori Peralatan Kantor akibat kegagalan verifikasi limit Corporate Invoicing.",
      expectedRange: "1.2% - 2.0%",
      observedValue: "4.82%",
    },
    {
      id: "ANM-202611-02",
      timestamp: "02 Nov 2026, 12:15",
      metric: "Volume Transaksi Tak Wajar (Wholesale Surge)",
      severity: "Medium",
      description: "Akun CUST-041928 melakukan checkout massal 120 SKU dalam 1 menit, terkonfirmasi pengadaan rutin terverifikasi.",
      expectedRange: "< 30 SKU / order",
      observedValue: "120 SKU",
    },
    {
      id: "ANM-202611-03",
      timestamp: "01 Nov 2026, 23:10",
      metric: "Delay Inflow Hub Surabaya",
      severity: "Low",
      description: "Penumpukan antrian kontainer di Hub Rungkut menyebabkan estimasi dispatch mundur 6 jam.",
      expectedRange: "< 2 jam",
      observedValue: "6.4 jam",
    },
  ],

  customerAcquisition: {
    newCustomersMonthly: 248_600,
    retentionRatePct: 78.4,
    customerChurnRatePct: 2.8,
    ltvToCacRatio: 4.85,
    repeatPurchaseRatePct: 64.2,
  },

  // Merchant Dashboard Data
  merchantInsights: [
    {
      merchantId: "MCH-00912",
      name: "PT Tri Daya Komputindo",
      monthlySales: 18_450_000_000,
      growthPct: 14.2,
      inventoryHealth: "Optimal",
      pricingAlert: "Harga bersaing dengan indeks pasar 98.4%",
    },
    {
      merchantId: "MCH-00431",
      name: "CV Sinar Mandiri Industri",
      monthlySales: 12_800_000_000,
      growthPct: -3.5,
      inventoryHealth: "Need Restock",
      pricingAlert: "3 SKU memiliki harga 7% lebih tinggi dari rata-rata kategori",
    },
    {
      merchantId: "MCH-01284",
      name: "PT Berkah Logam Nusantara",
      monthlySales: 9_240_000_000,
      growthPct: 8.9,
      inventoryHealth: "Optimal",
      pricingAlert: "Margin optimal pada kuantitas pengadaan tier-2",
    },
    {
      merchantId: "MCH-00109",
      name: "Distributor FMCG Makmur Jaya",
      monthlySales: 24_600_000_000,
      growthPct: 21.0,
      inventoryHealth: "Overstocked",
      pricingAlert: "Rekomendasi diskon bundel untuk menghabiskan stok lambat",
    },
  ],

  inventorySuggestions: [
    {
      sku: "SKU-ELC-99214",
      productName: "Server Rack UPS 3000VA Enterprise",
      currentStock: 8,
      recommendedOrderQty: 45,
      daysOfInventoryLeft: 3.2,
      potentialStockoutLoss: 145_000_000,
    },
    {
      sku: "SKU-IND-44102",
      productName: "Hydraulic Fluid Drum ISO-VG 46 (200L)",
      currentStock: 0,
      recommendedOrderQty: 30,
      daysOfInventoryLeft: 0,
      potentialStockoutLoss: 98_000_000,
    },
    {
      sku: "SKU-FMC-12099",
      productName: "Thermal Paper Roll 80x80mm Box 50 Roll",
      currentStock: 42,
      recommendedOrderQty: 150,
      daysOfInventoryLeft: 4.8,
      potentialStockoutLoss: 42_000_000,
    },
  ],

  pricingRecommendations: [
    {
      sku: "SKU-ELC-88120",
      productName: "Industrial Managed Switch 24-Port Gigabit",
      currentPrice: 8_450_000,
      recommendedPrice: 8_190_000,
      elasticityScore: 1.42,
      projectedRevenueLiftPct: 8.6,
      competitorIndexPrice: 8_150_000,
    },
    {
      sku: "SKU-FMC-44019",
      productName: "Heavy Duty Corrugated Carton Box A3 (Pack 100)",
      currentPrice: 420_000,
      recommendedPrice: 445_000,
      elasticityScore: 0.65,
      projectedRevenueLiftPct: 5.2,
      competitorIndexPrice: 460_000,
    },
    {
      sku: "SKU-AUT-22910",
      productName: "Synthetic Engine Oil 5W-30 Full Synthetic 4L",
      currentPrice: 580_000,
      recommendedPrice: 565_000,
      elasticityScore: 1.15,
      projectedRevenueLiftPct: 4.1,
      competitorIndexPrice: 560_000,
    },
  ],

  // Operations Dashboard Data
  fraudAlerts: [
    {
      flagId: "FRD-99104",
      orderId: "ORD-202611-948120",
      riskScore: 89,
      triggerReason: "IP Address Proxy Anonymous + 5x Gagal CVV berturut-turut",
      amount: 142_500_000,
      status: "Blocked",
      timestamp: "02 Nov 2026, 16:20",
    },
    {
      flagId: "FRD-99103",
      orderId: "ORD-202611-948088",
      riskScore: 74,
      triggerReason: "Perubahan alamat pengiriman drastis antar pulau 2 menit pasca checkout",
      amount: 68_000_000,
      status: "Under Review",
      timestamp: "02 Nov 2026, 15:35",
    },
    {
      flagId: "FRD-99098",
      orderId: "ORD-202611-948012",
      riskScore: 42,
      triggerReason: "Pemesanan pertama kali dengan limit kredit korporat baru",
      amount: 35_000_000,
      status: "Cleared",
      timestamp: "02 Nov 2026, 13:50",
    },
  ],

  systemTelemetry: {
    kafkaThroughputEventsPerSec: 42_850,
    bigQueryQueryLatencyMs: 142,
    apiSuccessRatePct: 99.98,
    workerClusterHealthPct: 100.0,
    lastCheckpointTime: "02 Nov 2026, 17:00:00 WIB",
  },

  // Marketing Dashboard Data
  customerSegments: [
    {
      name: "Enterprise B2B Accounts",
      customerCount: 142_800,
      revenueContributionPct: 54.2,
      avgOrderFrequency: "12x / bulan",
      characteristics: "Faktur korporat NET-30, kontrak pengadaan tahunan, AOV tinggi",
    },
    {
      name: "Wholesale & Sub-Distributor",
      customerCount: 685_000,
      revenueContributionPct: 26.5,
      avgOrderFrequency: "6x / bulan",
      characteristics: "Pengadaan partai besar, sensitif terhadap kupon ongkir armada truk",
    },
    {
      name: "Retail High-Frequency",
      customerCount: 2_840_000,
      revenueContributionPct: 15.1,
      avgOrderFrequency: "2.4x / bulan",
      characteristics: "Pengguna QRIS dan Virtual Account, transaksi cepat",
    },
    {
      name: "Dormant / At-Risk",
      customerCount: 1_475_000,
      revenueContributionPct: 4.2,
      avgOrderFrequency: "0.2x / bulan",
      characteristics: "Tidak ada transaksi dalam 90 hari terakhir, target re-aktivasi promo",
    },
  ],

  conversionFunnel: [
    {
      stageName: "1. Visitor Sessions (Kunjungan Katalog)",
      userCount: 48_500_000,
      conversionRateFromPreviousPct: 100,
      dropoffRatePct: 0,
    },
    {
      stageName: "2. Product Detail Views (Tinjauan SKU)",
      userCount: 28_200_000,
      conversionRateFromPreviousPct: 58.1,
      dropoffRatePct: 41.9,
    },
    {
      stageName: "3. Add to Cart / Quotation (Tambah Keranjang)",
      userCount: 14_900_000,
      conversionRateFromPreviousPct: 52.8,
      dropoffRatePct: 47.2,
    },
    {
      stageName: "4. Checkout Initiated (Inisiasi Pemesanan)",
      userCount: 6_240_000,
      conversionRateFromPreviousPct: 41.9,
      dropoffRatePct: 58.1,
    },
    {
      stageName: "5. Payment Settled (Transaksi Sukses)",
      userCount: 5_142_800,
      conversionRateFromPreviousPct: 82.4,
      dropoffRatePct: 17.6,
    },
  ],
};

