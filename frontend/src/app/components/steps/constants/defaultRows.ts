import { buildRows } from "@/app/utils/formRowBuilder";

export const CMO_DEFAULT_ROWS = buildRows([
  {
    key: "cmoParent",
    field: "CMO Parent",
    sno: 1,
    placeholder: "Enter cmo parent name",
  },
  {
    key: "yearSpend",
    field: "Year Spend (M$)",
    type: "number",
    sno: 2,
    placeholder: "Enter year spend(m$)",
  },
  {
    key: "cmoName",
    field: "CMO Name",
    sno: 3,
    placeholder: "Enter cmo name",
  },
  {
    key: "signingEntity1",
    field: "Signing Entity 1",
    sno: 4,
    placeholder: "Enter signing entity 1",
  },
  {
    key: "supplierEntity2",
    field: "Supplier Entity 2",
    required: false,
    sno: 5,
    placeholder: "Enter supplier entity 2",
  },
  {
    key: "supplierEntity3",
    field: "Supplier Entity 3",
    required: false,
    sno: 6,
    placeholder: "Enter supplier entity 3",
  },
  {
    key: "location",
    field: "Location (Facility)",
    sno: 7,
    placeholder: "Enter location",
  },
  {
    key: "relationshipOwner",
    field: "Supplier Relationship Owner",
    sno: 8,
    placeholder: "Enter supplier relationship owner",
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

export const COMMENTS_DEFAULT_ROWS = buildRows([
  {
    key: "additionalComments",
    field: "Additional Comments",
    sno: 1,
    placeholder: "Enter comments",
  },
]);

export const DELIVERY_DEFAULT_ROWS = buildRows([
  {
    key: "continuousImprovement",
    field: "Continuous improvement",
    sno: 1,
    placeholder: "Enter continuous improvement",
  },
  {
    key: "poDeadlineToAcknowledgeBySupplier",
    field: "PO-Deadline to acknowledge by supplier",
    sno: 2,
    placeholder: "Enter PO deadline",
  },
  {
    key: "specialField1",
    field: "Special Field 1",
    sno: 3,
    furtherDetails: "Define Here",
  },
  {
    key: "specialField2",
    field: "Special Field 2",
    sno: 4,
    furtherDetails: "Define Here",
  },
]);

export const STATUS_UPDATE_DEFAULT_ROWS = buildRows([
  {
    key: "mostRecentContractUpdate",
    field: "Most recent contract update",
    sno: 1,
    placeholder: "Enter Most recent contract update",
  },
  {
    key: "contractsConsolidation",
    field: "Contracts consolidation",
    sno: 2,
    placeholder: "Enter Contracts consolidation",
  },
  {
    key: "templateMigrationStatus",
    field: "Template migration status",
    sno: 3,
    value: "No",
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
  { key: "specialField3", field: "Special Field 3", sno: 1 },
  { key: "specialField4", field: "Special Field 4", sno: 2 },
  { key: "specialField5", field: "Special Field 5", sno: 3 },
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
  },
  {
    key: "mabDsApiReimbursement",
    field: "mAb / DS / API reimbursement",
    sno: 2,
  },
  {
    key: "mabDsApiLoss",
    field: "mAb / DS / API loss",
    sno: 3,
  },
]);

/**
 * QC Testing
 */
export const QC_TESTING_DEFAULT_ROWS = buildRows([
  { key: "includedInPrice", field: "Included in price", sno: 1 },
  { key: "notIncludedInPrice", field: "Not included in price", sno: 2 },
  { key: "otherDetails", field: "Other details", sno: 3 },
  { key: "supplyDeliveryPenalty", field: "Supply delivery penalty", sno: 4 },
]);

/**
 * Product
 */
export const PRODUCT_DEFAULT_ROWS = buildRows([
  { key: "productName", field: "Product Name", sno: 1 },
  { key: "productCode", field: "Product Code", sno: 2 },
  { key: "productCategory", field: "Product Category", sno: 3 },
  { key: "dosageForm", field: "Dosage Form", sno: 4 },
  { key: "strength", field: "Strength", sno: 5 },
  {
    key: "packSize",
    field: "Pack Size",
    sno: 6,
    type: "number",
  },
  {
    key: "shelfLife",
    field: "Shelf Life (Months)",
    sno: 7,
    type: "number",
  },
  { key: "storageConditions", field: "Storage Conditions", sno: 8 },
  { key: "hsCode", field: "HS Code", sno: 9 },
]);

/**
 * Pricing
 */
export const PRICING_DEFAULT_ROWS = buildRows([
  { key: "pricing", field: "Pricing", sno: 1 },
  { key: "annualPricingAdjustments", field: "Annual pricing adjustments", sno: 2 },
]);

/**
 * Performance
 */
export const PERFORMANCE_DEFAULT_ROWS = buildRows([
  { key: "performanceKpis", field: "Performance KPIs", sno: 1 },
  {
    key: "yieldIncreaseExpectation",
    field: "Yield increase expectation",
    sno: 2,
    type: "number",
  },
  {
    key: "nonConformingPenalty",
    field: "Non-conforming penalty",
    sno: 3,
    type: "number",
  },
  {
    key: "performanceTarget",
    field: "Performance target",
    sno: 4,
    type: "number",
  },
  { key: "meetingFrequency", field: "Meeting frequency", sno: 5 },
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
  },
]);

/**
 * General Terms
 */
export const GENERAL_TERMS_DEFAULT_ROWS = buildRows([
  { key: "typeOfAgreement", field: "Type of Agreement", sno: 1 },
  { key: "effectiveDate", field: "Effective Date", type: "date", sno: 2 },
  { key: "initialTerm", field: "Initial Term", sno: 3 },
  { key: "expirationDateOfContract", field: "Expiration date of contract",  type: "date", sno: 4 },
  { key: "currentExpirationDate", field: "Current expiration date",  type: "date", sno: 5 },
  { key: "notificationTime", field: "Notification Time", sno: 6 },
  { key: "autoRenewTerms", field: "Auto Renew Terms", sno: 7 },
  {
    key: "renewActionOrNotificationDate",
    field: "Renew Action or Notification Date",
    type: "date",
    sno: 8,
  },
  { key: "paymentTerms", field: "Payment terms", sno: 9 },
]);

/**
 * Forecast & Ordering
 */
export const FORECAST_ORDERING_DEFAULT_ROWS = buildRows([
  { key: "forecastFrequency", field: "Forecast - Frequency", sno: 1 },
  { key: "forecastTimeHorizon", field: "Forecast - Time Horizon", sno: 2 },
  { key: "forecastFirmOrderPeriod", field: "Forecast - Firm Order Period", sno: 3 },
  { key: "forecastUpdateDeadline", field: "Forecast - Update Deadline", sno: 4 },
  { key: "forecastMoreDetails", field: "Forecast - More Details", sno: 5 },
  {
    key: "poOrderLeadTimeRequired",
    field: "PO - Order Lead Time Required",
    sno: 6,
    type: "number",
  },
  { key: "poFixedPOWindow", field: "PO - Fixed PO Window", sno: 7 },
  {
    key: "poMinimumOrderQuantity",
    field: "PO - Minimum Order Quantity",
    sno: 8,
    type: "number",
  },
  { key: "poOtherDetails", field: "PO - Other Details", sno: 9 },
  {
    key: "contractVolumeByPartAnnual",
    field: "Contract Volume by Part (Annual)",
    sno: 10,
    type: "number",
  },
]);