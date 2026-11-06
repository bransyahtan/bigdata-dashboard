/**
 * Domain Entities and Analytical Models for Enterprise E-Commerce Big Data
 * Designed according to Clean Architecture principles.
 */

// 1. Customer Entity
export interface Customer {
  id: string;
  name: string;
  email: string;
  segment: "Enterprise" | "Wholesale" | "Retail" | "VIP";
  totalSpent: number;
  totalOrders: number;
  registeredAt: string;
  status: "Active" | "Dormant" | "Suspended";
}

// 2. Product Entity
export interface Product {
  sku: string;
  name: string;
  categoryId: string;
  categoryName: string;
  unitPrice: number;
  costPrice: number;
  stockLevel: number;
  reorderLevel: number;
  ratingAverage: number;
  reviewCount: number;
}

// 3. Category Entity
export interface Category {
  id: string;
  name: string;
  skuCount: number;
  monthlyGmv: number;
  contributionPercentage: number;
  growthRatePct: number;
}

// 4. Order Entity
export type OrderStatus = "Completed" | "Processing" | "Shipped" | "Cancelled" | "Refunded";

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  createdAt: string;
  itemCount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: "Settled" | "Pending" | "Refunded";
  shippingTrackingNumber: string;
  shippingStatus: "Delivered" | "In Transit" | "Delayed" | "Failed";
}

// 5. Order Item Entity
export interface OrderItem {
  id: string;
  orderId: string;
  productSku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// 6. Payment Entity
export interface PaymentRecord {
  id: string;
  orderId: string;
  method: "Virtual Account BCA" | "Mandiri Bill" | "QRIS Enterprise" | "Credit Card" | "Corporate Invoicing";
  amount: number;
  settlementStatus: "Settled" | "Pending" | "Failed";
  settledAt: string;
  transactionFee: number;
}

// 7. Review Entity
export interface Review {
  id: string;
  productSku: string;
  productName: string;
  rating: number; // 1-5
  sentiment: "Positive" | "Neutral" | "Negative";
  comment: string;
  createdAt: string;
}

// 8. Inventory Entity
export interface InventoryStock {
  sku: string;
  productName: string;
  category: string;
  warehouseCode: string;
  availableStock: number;
  reservedStock: number;
  reorderThreshold: number;
  stockStatus: "Normal" | "Low Stock" | "Critical Out of Stock";
  leadTimeDays: number;
}

// 9. Shipping Entity
export type ShippingDeliveryStatus = "Delivered" | "In Transit" | "Delayed" | "Undelivered" | "Returned";

export interface ShippingRecord {
  trackingId: string;
  orderId: string;
  courierName: string;
  serviceType: "Same Day" | "Next Day" | "Regular Fleet" | "Cargo Bulk";
  destinationCity: string;
  dispatchedAt: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  status: ShippingDeliveryStatus;
  delayReason?: string;
}

// 10. Promotion Entity
export interface PromotionCampaign {
  code: string;
  name: string;
  discountType: "Percentage" | "Fixed Value";
  discountValue: number;
  redemptionCount: number;
  maxRedemption: number;
  gmvGenerated: number;
  budgetAllocated: number;
  status: "Active" | "Scheduled" | "Completed";
  expiresAt: string;
}

// ==========================================
// Dashboard Analytical Aggregations & ViewModels
// ==========================================

export interface DashboardSummaryKpis {
  totalRevenueYtd: number;
  totalRevenueMoMGrowth: number;
  totalOrdersAnnual: number; // 15M scale
  totalOrdersMoMGrowth: number;
  activeCustomerBase: number; // 5M scale
  activeCustomerMoMGrowth: number;
  totalSkusCatalog: number; // 2M scale
  shippingOnTimeRate: number; // Percentage, e.g. 94.2%
  shippingDelayRate: number; // Percentage, e.g. 4.2%
}

export interface MonthlyOrderMetrics {
  month: string;
  monthCode: string;
  orderVolume: number;
  gmvAmount: number;
  averageOrderValue: number;
  cancellationRatePct: number;
}

export interface MonthlyShippingSummary {
  periodMonth: string;
  totalDispatched: number;
  deliveredOnTime: number;
  inTransit: number;
  delayed: number;
  undeliveredOrFailed: number;
  returnedToSender: number;
  delayCausesBreakdown: {
    cause: string;
    incidentCount: number;
    percentage: number;
  }[];
}

export interface PaymentDistribution {
  method: string;
  sharePercentage: number;
  transactionVolume: number;
  totalGmv: number;
}

export interface CategorySummary {
  category: string;
  skuCount: number;
  revenueSharePct: number;
  monthlyGmv: number;
  stockHealthPct: number;
}

export interface ReviewSentimentSummary {
  totalReviews: number; // 8.4M scale
  averageRating: number; // e.g. 4.65
  positivePct: number;
  neutralPct: number;
  negativePct: number;
}

export interface AnomalyAlert {
  id: string;
  timestamp: string;
  metric: string;
  severity: "High" | "Medium" | "Low";
  description: string;
  expectedRange: string;
  observedValue: string;
}

export interface CustomerAcquisitionMetrics {
  newCustomersMonthly: number;
  retentionRatePct: number;
  customerChurnRatePct: number;
  ltvToCacRatio: number;
  repeatPurchaseRatePct: number;
}

export interface MerchantInsight {
  merchantId: string;
  name: string;
  monthlySales: number;
  growthPct: number;
  inventoryHealth: "Optimal" | "Need Restock" | "Overstocked";
  pricingAlert: string;
}

export interface InventoryOptimizationSuggestion {
  sku: string;
  productName: string;
  currentStock: number;
  recommendedOrderQty: number;
  daysOfInventoryLeft: number;
  potentialStockoutLoss: number;
}

export interface PricingRecommendation {
  sku: string;
  productName: string;
  currentPrice: number;
  recommendedPrice: number;
  elasticityScore: number;
  projectedRevenueLiftPct: number;
  competitorIndexPrice: number;
}

export interface FraudAlert {
  flagId: string;
  orderId: string;
  riskScore: number; // 0 - 100
  triggerReason: string;
  amount: number;
  status: "Under Review" | "Blocked" | "Cleared";
  timestamp: string;
}

export interface SystemPipelineTelemetry {
  kafkaThroughputEventsPerSec: number;
  bigQueryQueryLatencyMs: number;
  apiSuccessRatePct: number;
  workerClusterHealthPct: number;
  lastCheckpointTime: string;
}

export interface CustomerSegment {
  name: string;
  customerCount: number;
  revenueContributionPct: number;
  avgOrderFrequency: string;
  characteristics: string;
}

export interface FunnelStage {
  stageName: string;
  userCount: number;
  conversionRateFromPreviousPct: number;
  dropoffRatePct: number;
}

// ==========================================
// Big Data Advanced & Predictive Analytics
// ==========================================

export interface DemandForecastItem {
  id: string;
  region: string;
  productSku: string;
  productName: string;
  category: string;
  currentMonthlyDemand: number;
  forecastedDemandNextMonth: number;
  projectedGrowthPct: number;
  confidenceScorePct: number;
  demandLevel: "Lonjakan Tinggi" | "Pertumbuhan Stabil" | "Permintaan Sedang";
  keyDriver: string;
}

export interface LogisticsRouteOptimization {
  id: string;
  originHub: string;
  destinationCity: string;
  courierFleet: string;
  avgDurationDays: number;
  avgCostPerKg: number;
  onTimeSlaPct: number;
  performanceTier: "Paling Cepat & Murah" | "Paling Lambat & Mahal" | "Standar Efisien" | "Perlu Optimalisasi";
  monthlyShipmentVolume: number;
  optimizationRecommendation: string;
}

export interface PredictiveStockDepletion {
  sku: string;
  productName: string;
  category: string;
  warehouseLocation: string;
  currentAvailableStock: number;
  dailyBurnRateUnits: number;
  daysUntilStockout: number;
  predictedStockoutDate: string;
  urgencyLevel: "Kritis (< 5 Hari)" | "Peringatan (5-10 Hari)" | "Perhatian (11-20 Hari)" | "Aman (> 20 Hari)";
  recommendedReorderQty: number;
  estimatedLostRevenueIfOut: number;
  leadTimeRestockDays: number;
}

export interface DashboardDataset {
  summaryKpis: DashboardSummaryKpis;
  monthlyOrderTrends: MonthlyOrderMetrics[];
  shippingMonthlyAnalytics: MonthlyShippingSummary;
  categoryBreakdown: CategorySummary[];
  inventoryAlerts: InventoryStock[];
  reviewMetrics: ReviewSentimentSummary;
  paymentDistribution: PaymentDistribution[];
  activePromotions: PromotionCampaign[];
  recentOrders: Order[];

  // Executive Extensions
  executiveAnomalies: AnomalyAlert[];
  customerAcquisition: CustomerAcquisitionMetrics;

  // Merchant Dashboard Data
  merchantInsights: MerchantInsight[];
  inventorySuggestions: InventoryOptimizationSuggestion[];
  pricingRecommendations: PricingRecommendation[];

  // Operations Dashboard Data
  fraudAlerts: FraudAlert[];
  systemTelemetry: SystemPipelineTelemetry;

  // Marketing Dashboard Data
  customerSegments: CustomerSegment[];
  conversionFunnel: FunnelStage[];

  // Big Data Predictive Analytics
  demandForecasts: DemandForecastItem[];
  logisticsRouteOptimizations: LogisticsRouteOptimization[];
  predictiveStockDepletions: PredictiveStockDepletion[];
}

