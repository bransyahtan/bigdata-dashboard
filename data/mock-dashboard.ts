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

  // Payment Settlement Distribution
  paymentDistribution: [
    {
      method: "Virtual Account BCA",
      sharePercentage: 42.5,
      transactionVolume: 590_920,
      totalGmv: 98_260_000_000,
    },
    {
      method: "Mandiri Bill Payment",
      sharePercentage: 24.8,
      transactionVolume: 344_819,
      totalGmv: 57_337_600_000,
    },
    {
      method: "QRIS Enterprise",
      sharePercentage: 18.2,
      transactionVolume: 253_052,
      totalGmv: 42_078_400_000,
    },
    {
      method: "Corporate Invoicing / NET-30",
      sharePercentage: 9.7,
      transactionVolume: 134_868,
      totalGmv: 22_426_400_000,
    },
    {
      method: "Corporate Credit Card",
      sharePercentage: 4.8,
      transactionVolume: 66_739,
      totalGmv: 11_097_600_000,
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
};

