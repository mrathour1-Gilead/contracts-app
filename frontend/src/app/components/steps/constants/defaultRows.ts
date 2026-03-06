import { buildRows } from "@/app/utils/formRowBuilder";

/**
 * CMO Details
 */
export const CMO_DEFAULT_ROWS = buildRows([
  {
    key: "cmoParent",
    field: "CMO Parent",
    sno: 1,
    placeholder: "Enter CMO parent name",
  },
  {
    key: "yearSpend",
    field: "Year Spend (M$)",
    type: "number",
    sno: 2,
    placeholder: "Enter yearly spend (M$)",
  },
  {
    key: "cmoName",
    field: "CMO Name",
    sno: 3,
    placeholder: "Enter CMO name",
  },
  {
    key: "signingEntity1",
    field: "Signing Entity 1",
    sno: 4,
    placeholder: "Enter signing entity",
  },
  {
    key: "supplierEntity2",
    field: "Supplier Entity 2",
    required: false,
    sno: 5,
    placeholder: "Enter supplier entity",
  },
  {
    key: "supplierEntity3",
    field: "Supplier Entity 3",
    required: false,
    sno: 6,
    placeholder: "Enter supplier entity",
  },
  {
    key: "location",
    field: "Location (Facility)",
    sno: 7,
    placeholder: "Enter facility location",
  },
  {
    key: "relationshipOwner",
    field: "Supplier Relationship Owner",
    sno: 8,
    placeholder: "Enter relationship owner",
  },
  {
    key: "territory",
    field: "Territory",
    sno: 9,
    placeholder: "Select territory",
    options: [
      { value: "North America", label: "North America" },
      { value: "Europe", label: "Europe" },
      { value: "Asia Pacific", label: "Asia Pacific" },
      { value: "Latin America", label: "Latin America" },
      { value: "Middle East & Africa", label: "Middle East & Africa" },
    ],
  },
]);

/**
 * Comments
 */
export const COMMENTS_DEFAULT_ROWS = buildRows([
  {
    key: "additionalComments",
    field: "Additional Comments",
    sno: 1,
    placeholder: "Enter additional comments",
  },
]);

/**
 * Delivery
 */
export const DELIVERY_DEFAULT_ROWS = buildRows([
  {
    key: "continuousImprovement",
    field: "Continuous improvement",
    sno: 1,
    placeholder: "Enter continuous improvement details",
  },
  {
    key: "poDeadlineToAcknowledgeBySupplier",
    field: "PO-Deadline to acknowledge by supplier",
    sno: 2,
    placeholder: "Enter PO acknowledgement deadline",
  },
  {
    key: "specialField1",
    field: "Special Field 1",
    sno: 3,
    furtherDetails: "Define Here",
    placeholder: "Enter value",
  },
  {
    key: "specialField2",
    field: "Special Field 2",
    sno: 4,
    furtherDetails: "Define Here",
    placeholder: "Enter value",
  },
]);

/**
 * Status Update
 */
export const STATUS_UPDATE_DEFAULT_ROWS = buildRows([
  {
    key: "mostRecentContractUpdate",
    field: "Most recent contract update",
    sno: 1,
    placeholder: "Enter most recent contract update",
  },
  {
    key: "contractsConsolidation",
    field: "Contracts consolidation",
    sno: 2,
    placeholder: "Enter contracts consolidation details",
  },
  {
    key: "templateMigrationStatus",
    field: "Template migration status",
    sno: 3,
    value: "No",
    placeholder: "Select template migration status",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
]);

/**
 * Special Fields
 */
export const SPECIAL_FIELDS_DEFAULT_ROWS = buildRows([
  {
    key: "specialField3",
    field: "Special Field 3",
    sno: 1,
    placeholder: "Enter Special Field 3",
  },
  {
    key: "specialField4",
    field: "Special Field 4",
    sno: 2,
    placeholder: "Enter Special Field 4",
  },
  {
    key: "specialField5",
    field: "Special Field 5",
    sno: 3,
    placeholder: "Enter Special Field 5",
  },
]);

/**
 * Raw Materials
 */
export const RAW_MATERIALS_DEFAULT_ROWS = buildRows([
  {
    key: "materialsStockpiles",
    field:
      "Materials Stockpiles - Components, excipient and API furnished by Gilead",
    sno: 1,
    placeholder: "Enter material stockpile details",
  },
  {
    key: "mabDsApiReimbursement",
    field: "mAb / DS / API reimbursement",
    sno: 2,
    placeholder: "Enter reimbursement terms",
  },
  {
    key: "mabDsApiLoss",
    field: "mAb / DS / API loss",
    sno: 3,
    placeholder: "Enter API loss details",
  },
]);

/**
 * QC Testing
 */
export const QC_TESTING_DEFAULT_ROWS = buildRows([
  {
    key: "includedInPrice",
    field: "Included in price",
    sno: 1,
    placeholder: "Enter details",
  },
  {
    key: "notIncludedInPrice",
    field: "Not included in price",
    sno: 2,
    placeholder: "Enter details",
  },
  {
    key: "otherDetails",
    field: "Other details",
    sno: 3,
    placeholder: "Enter additional details",
  },
  {
    key: "supplyDeliveryPenalty",
    field: "Supply delivery penalty",
    sno: 4,
    placeholder: "Enter delivery penalty terms",
  },
]);

/**
 * Product
 */
export const PRODUCT_DEFAULT_ROWS = buildRows([
  { key: "productName", field: "Product Name", sno: 1, placeholder: "Enter product name" },
  { key: "productCode", field: "Product Code", sno: 2, placeholder: "Enter product code" },
  { key: "productCategory", field: "Product Category", sno: 3, placeholder: "Select product category" },
  { key: "dosageForm", field: "Dosage Form", sno: 4, placeholder: "Select dosage form" },
  { key: "strength", field: "Strength", sno: 5, placeholder: "Enter strength" },
  { key: "packSize", field: "Pack Size", sno: 6, type: "number", placeholder: "Enter pack size" },
  { key: "shelfLife", field: "Shelf Life (Months)", sno: 7, type: "number", placeholder: "Enter shelf life in months" },
  { key: "storageConditions", field: "Storage Conditions", sno: 8, placeholder: "Select storage conditions" },
  { key: "hsCode", field: "HS Code", sno: 9, placeholder: "Enter HS code" },
]);

/**
 * Pricing
 */
export const PRICING_DEFAULT_ROWS = buildRows([
  { key: "pricing", field: "Pricing", sno: 1, placeholder: "Select pricing model" },
  { key: "annualPricingAdjustments", field: "Annual pricing adjustments", sno: 2, placeholder: "Enter adjustment terms" },
]);

/**
 * Performance
 */
export const PERFORMANCE_DEFAULT_ROWS = buildRows([
  { key: "performanceKpis", field: "Performance KPIs", sno: 1, placeholder: "Enter KPIs" },
  { key: "yieldIncreaseExpectation", field: "Yield increase expectation", sno: 2, type: "number", placeholder: "Enter yield increase percentage" },
  { key: "nonConformingPenalty", field: "Non-conforming penalty", sno: 3, type: "number", placeholder: "Enter penalty amount" },
  { key: "performanceTarget", field: "Performance target", sno: 4, type: "number", placeholder: "Enter performance target" },
  { key: "meetingFrequency", field: "Meeting frequency", sno: 5, placeholder: "Select meeting frequency" },
]);

/**
 * Governance
 */
export const GOVERNANCE_DEFAULT_ROWS = buildRows([
  {
    key: "annualBusinessReviewRequired",
    field: "Annual business review required",
    value: "No",
    sno: 1,
    placeholder: "Select option",
  },
]);

/**
 * General Terms
 */
export const GENERAL_TERMS_DEFAULT_ROWS = buildRows([
  { key: "typeOfAgreement", field: "Type of Agreement", sno: 1, placeholder: "Select agreement type" },
  { key: "effectiveDate", field: "Effective Date", type: "date", sno: 2, placeholder: "Select effective date" },
  { key: "initialTerm", field: "Initial Term", sno: 3, placeholder: "Enter initial term" },
  { key: "expirationDateOfContract", field: "Expiration date of contract", type: "date", sno: 4, placeholder: "Select expiration date" },
  { key: "currentExpirationDate", field: "Current expiration date", type: "date", sno: 5, placeholder: "Select current expiration date" },
  { key: "notificationTime", field: "Notification Time", sno: 6, placeholder: "Enter notification period" },
  { key: "autoRenewTerms", field: "Auto Renew Terms", sno: 7, placeholder: "Enter auto-renew terms" },
  { key: "renewActionOrNotificationDate", field: "Renew Action or Notification Date", type: "date", sno: 8, placeholder: "Select renewal notification date" },
  { key: "paymentTerms", field: "Payment terms", sno: 9, placeholder: "Enter payment terms" },
]);

/**
 * Forecast & Ordering
 */
export const FORECAST_ORDERING_DEFAULT_ROWS = buildRows([
  { key: "forecastFrequency", field: "Forecast - Frequency", sno: 1, placeholder: "Enter forecast frequency" },
  { key: "forecastTimeHorizon", field: "Forecast - Time Horizon", sno: 2, placeholder: "Enter forecast time horizon" },
  { key: "forecastBindingPeriod", field: "Forecast - Firm Order Period(binding)", sno: 3, placeholder: "Enter firm order period" },
  { key: "forecastUpdateDeadline", field: "Forecast - Update Deadline", sno: 4, placeholder: "Enter update deadline" },
  { key: "forecastMoreDetails", field: "Forecast - More Details", sno: 5, placeholder: "Enter additional forecast details" },
  { key: "poOrderLeadTimeRequired", field: "PO - Order Lead Time Required", sno: 6, type: "number", placeholder: "Enter lead time (days)", options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ], },
  { key: "poFixedPOWindow", field: "PO - Fixed PO Window", sno: 7, placeholder: "Enter PO window" },
  { key: "poMinimumOrderQuantity", field: "PO - Minimum Order Quantity", sno: 8, type: "number", placeholder: "Enter minimum order quantity" },
  { key: "poOtherDetails", field: "PO - Other Details", sno: 9, placeholder: "Enter additional PO details" },
  { key: "contractVolumeByPartAnnual", field: "Contract Volume by Part (Annual)", sno: 10, type: "number", placeholder: "Enter annual contract volume" },
]);