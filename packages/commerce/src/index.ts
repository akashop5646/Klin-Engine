// Core & DI
export * from "./core/CommerceEngine";
export * from "./core/CommerceRuntime";
export * from "./core/CommerceState";
export * from "./core/CommerceLifecycle";
export * from "./core/CommerceContext";
export * from "./core/CommerceManager";
export * from "./core/CommerceConfig";
export * from "./core/FeatureFlags";
export * from "./di/DIContainer";
export * from "./modules/CommerceModule";

// Features Modules
export * from "./modules/CatalogModule";
export * from "./modules/InventoryModule";
export * from "./modules/CheckoutModule";
export * from "./modules/PaymentModule";
export * from "./modules/OrderModule";
export * from "./modules/ShippingModule";
export * from "./modules/CustomerModule";
export * from "./modules/AnalyticsModule";
export * from "./modules/AutomationModule";

// Catalog & Inventory
export * from "./catalog/Product";
export * from "./catalog/Variant";
export * from "./catalog/Collection";
export * from "./catalog/Category";
export * from "./catalog/Brand";
export * from "./catalog/Tag";
export * from "./catalog/Attribute";
export * from "./catalog/AttributeSet";
export * from "./catalog/Option";
export * from "./catalog/OptionValue";
export * from "./catalog/ProductMedia";
export * from "./catalog/SEOData";
export * from "./catalog/CatalogManager";
export * from "./catalog/ProductImporter";
export * from "./catalog/ProductExporter";
export * from "./catalog/RecommendationEngine";
export * from "./catalog/SearchIndexer";

export * from "./inventory/Inventory";
export * from "./inventory/Warehouse";
export * from "./inventory/StockItem";
export * from "./inventory/Reservation";
export * from "./inventory/Transfer";
export * from "./inventory/InventoryManager";
export * from "./inventory/MovementLog";
export * from "./inventory/StockAdjustment";
export * from "./inventory/InventoryAudit";

// Pricing & Calculations
export * from "./pricing/PriceEngine";
export * from "./pricing/PriceList";
export * from "./pricing/PriceRule";
export * from "./pricing/CurrencyManager";
export * from "./pricing/ExchangeRates";
export * from "./pricing/Discount";
export * from "./pricing/Promotion";
export * from "./pricing/Coupon";
export * from "./pricing/GiftCard";
export * from "./pricing/TaxEngine";
export * from "./pricing/TaxProvider";
export * from "./pricing/PriceCalculator";

// Cart & Checkout
export * from "./cart/Cart";
export * from "./cart/CartItem";
export * from "./cart/Wishlist";
export * from "./cart/SavedCart";
export * from "./cart/CartManager";
export * from "./cart/CartCalculator";
export * from "./cart/CartRecovery";

export * from "./checkout/CheckoutSession";
export * from "./checkout/CheckoutManager";
export * from "./checkout/CheckoutValidator";
export * from "./checkout/AddressValidator";
export * from "./checkout/FraudDetector";
export * from "./checkout/OrderBuilder";

// Orders & Customers
export * from "./orders/Order";
export * from "./orders/OrderItem";
export * from "./orders/OrderStatus";
export * from "./orders/OrderManager";
export * from "./orders/OrderHistory";
export * from "./orders/Invoice";
export * from "./orders/Refund";
export * from "./orders/Return";
export * from "./orders/Cancellation";
export * from "./orders/CreditMemo";

export * from "./customers/Customer";
export * from "./customers/CustomerGroup";
export * from "./customers/CustomerManager";
export * from "./customers/Address";
export * from "./customers/WishlistManager";
export * from "./customers/RewardPoints";
export * from "./customers/LoyaltyProgram";
export * from "./customers/StoreCredit";
export * from "./customers/CustomerSegment";

// Payments & Webhooks
export * from "./payments/PaymentManager";
export * from "./payments/PaymentIntent";
export * from "./payments/PaymentProvider";
export * from "./payments/ProviderRegistry";
export * from "./payments/StripeProvider";
export * from "./payments/RazorpayProvider";
export * from "./payments/PayPalProvider";
export * from "./payments/CashOnDelivery";
export * from "./payments/ManualPayment";
export * from "./payments/WebhookProcessor";
export * from "./payments/PaymentAudit";

// Shipping & Fulfillment
export * from "./shipping/ShippingManager";
export * from "./shipping/ShippingZone";
export * from "./shipping/ShippingRate";
export * from "./shipping/ShippingMethod";
export * from "./shipping/CourierProvider";
export * from "./shipping/Tracking";
export * from "./shipping/Shipment";
export * from "./shipping/LabelGenerator";
export * from "./shipping/DeliveryEstimate";

export * from "./fulfillment/FulfillmentManager";
export * from "./fulfillment/PickingList";
export * from "./fulfillment/PackingSlip";
export * from "./fulfillment/ShipmentManager";
export * from "./fulfillment/DeliveryManager";
export * from "./fulfillment/FulfillmentWorkflow";

// Digital, Subscriptions, Reviews & Search
export * from "./digital/DigitalProduct";
export * from "./digital/LicenseKey";
export * from "./digital/Download";
export * from "./digital/DownloadManager";
export * from "./digital/ActivationManager";

export * from "./subscriptions/Subscription";
export * from "./subscriptions/SubscriptionPlan";
export * from "./subscriptions/RenewalManager";
export * from "./subscriptions/RecurringBilling";
export * from "./subscriptions/SubscriptionInvoice";

export * from "./reviews/Review";
export * from "./reviews/Rating";
export * from "./reviews/Question";
export * from "./reviews/Answer";
export * from "./reviews/Moderation";
export * from "./reviews/SpamDetector";

export * from "./search/SearchEngine";
export * from "./search/Autocomplete";
export * from "./search/FacetEngine";
export * from "./search/FilterEngine";
export * from "./search/CatalogIndexer";
export * from "./search/SearchProvider";

// Marketplace, B2B & POS
export * from "./marketplace/MarketplaceAdapter";
export * from "./marketplace/AmazonAdapter";
export * from "./marketplace/FlipkartAdapter";
export * from "./marketplace/eBayAdapter";
export * from "./marketplace/ShopifyAdapter";
export * from "./marketplace/ExportScheduler";

export * from "./b2b/CompanyAccount";
export * from "./b2b/PurchaseOrder";
export * from "./b2b/QuoteManager";
export * from "./b2b/ContractPricing";
export * from "./b2b/ApprovalWorkflow";
export * from "./b2b/CreditLimit";

export * from "./pos/POSManager";
export * from "./pos/Register";
export * from "./pos/Receipt";
export * from "./pos/CashDrawer";
export * from "./pos/BarcodeScanner";
export * from "./pos/InventorySync";

// Analytics & Automation
export * from "./analytics/SalesAnalytics";
export * from "./analytics/RevenueAnalytics";
export * from "./analytics/InventoryAnalytics";
export * from "./analytics/ConversionAnalytics";
export * from "./analytics/CustomerAnalytics";
export * from "./analytics/ProductAnalytics";
export * from "./analytics/FunnelAnalytics";

export * from "./automation/WorkflowEngine";
export * from "./automation/CartRecovery";
export * from "./automation/EmailAutomation";
export * from "./automation/SMSAutomation";
export * from "./automation/DiscountAutomation";
export * from "./automation/InventoryAutomation";

// Events Sourcing Projections
export * from "./events/CommerceEvents";
export * from "./events/CommerceEventStore";
export * from "./events/CommerceAggregate";
export * from "./events/ProjectionManager";
export * from "./events/CatalogProjection";
export * from "./events/OrderProjection";
export * from "./events/InventoryProjection";
export * from "./events/CustomerProjection";

// Pluggable Providers & Plugins
export * from "./providers/ProviderRegistry";
export * from "./providers/PaymentProvider";
export * from "./providers/ShippingProvider";
export * from "./providers/TaxProvider";
export * from "./providers/MarketplaceProvider";
export * from "./providers/EmailProvider";
export * from "./providers/StorageProvider";

export * from "./plugins/CommercePlugin";
export * from "./plugins/PluginRegistry";
export * from "./plugins/PluginSandbox";
export * from "./plugins/ExtensionBridge";

// Diagnostics
export * from "./diagnostics/CommerceMetrics";
export * from "./diagnostics/CommerceProfiler";
export * from "./diagnostics/HealthMonitor";
export * from "./diagnostics/CommerceInspector";
export * from "./diagnostics/PerformanceTimeline";

// AI, API Gateway & SDK
export * from "./ai/RecommendationAI";
export * from "./ai/PricingAI";
export * from "./ai/InventoryForecast";
export * from "./ai/DemandPrediction";
export * from "./ai/SearchRankingAI";
export * from "./ai/FraudDetectionAI";
export * from "./ai/CommerceAIContext";

export * from "./api/CommerceGateway";
export * from "./api/CommerceRouter";
export * from "./api/WebhookGateway";
export * from "./api/ApiRateLimiter";

export * from "./sdk/CommerceSDK";
