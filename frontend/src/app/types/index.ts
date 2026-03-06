/**
 * Core type definitions for the Global Supply Chain Contracts Database
 */

import { Contract } from "@/app/store/contracts/contracts.types";

export type ContractStatus = "Active" | "Inactive" | "Pending" | "Expired";

export type ViewState =
  | "dashboard"
  | "cmo-details"
  | "stepper-form"
  | "stepper-view";

export interface Step {
  id: number;
  label: string;
  completed: boolean;
}

/**
 * Dashboard / Top Form
 */
export interface CMOFormData {
  cmoParent?: string;
  yearSpend?: string;
  cmoName?: string;
  signingEntity1?: string;
  supplierEntity2?: string;
  supplierEntity3?: string;
  location?: string;
  relationshipOwner?: string;
  territory?: string;
  [key: string]: string | undefined;
}

/**
 * Shared table structure used in all contract step tables
 */
export interface CommonFieldData {
  field: string;
  value: string;
  termDetail: string;
  sectionInContract: string;
  furtherDetails: string;
  meetsBaseline: string;
  baselineTerms: string;
  sno: number;
}

/**
 * CMO Details
 */
export interface CMODetailsData {
  cmoParent: CommonFieldData;
  yearSpend: CommonFieldData;
  cmoName: CommonFieldData;
  signingEntity1: CommonFieldData;
  supplierEntity2: CommonFieldData;
  supplierEntity3: CommonFieldData;
  location: CommonFieldData;
  relationshipOwner: CommonFieldData;
  territory: CommonFieldData;
}

/**
 * Status Update
 */
export interface StatusUpdateData {
  mostRecentContractUpdate: CommonFieldData;
  contractsConsolidation: CommonFieldData;
  templateMigrationStatus: CommonFieldData;
  qagLinkageInMsa: CommonFieldData;
  qagApproval: CommonFieldData;
}

/**
 * Delivery
 */
export interface DeliveryData {
  continuousImprovement: CommonFieldData;
  poDeadlineToAcknowledgeBySupplier: CommonFieldData;
  specialField1: CommonFieldData;
  specialField2: CommonFieldData;
}

/**
 * Comments
 */
export interface CommentsData {
  additionalComments: CommonFieldData;
}

/**
 * Special Fields
 */
export interface SpecialFieldsData {
  specialField3: CommonFieldData;
  specialField4: CommonFieldData;
  specialField5: CommonFieldData;
}

/**
 * Raw Materials
 */
export interface RawMaterialsData {
  materialsStockpiles: CommonFieldData;
  mabDsApiReimbursement: CommonFieldData;
  mabDsApiLoss: CommonFieldData;
}

/**
 * QC Testing
 */
export interface QCTestingData {
  includedInPrice: CommonFieldData;
  notIncludedInPrice: CommonFieldData;
  otherDetails: CommonFieldData;
  supplyDeliveryPenalty: CommonFieldData;
}

/**
 * Product
 */
export interface ProductData {
  productName: CommonFieldData;
  productCode: CommonFieldData;
  productCategory: CommonFieldData;
  dosageForm: CommonFieldData;
  strength: CommonFieldData;
  packSize: CommonFieldData;
  shelfLife: CommonFieldData;
  storageConditions: CommonFieldData;
  hsCode: CommonFieldData;
}

/**
 * Pricing
 */
export interface PricingData {
  pricing: CommonFieldData;
  annualPricingAdjustments: CommonFieldData;
}

/**
 * Performance
 */
export interface PerformanceData {
  performanceKpis: CommonFieldData;
  yieldIncreaseExpectation: CommonFieldData;
  nonConformingPenalty: CommonFieldData;
  performanceTarget: CommonFieldData;
  meetingFrequency: CommonFieldData;
}

/**
 * Governance
 */
export interface GovernanceData {
  annualBusinessReviewRequired: CommonFieldData;
}

/**
 * General Terms
 */
export interface GeneralTermsData {
  typeOfAgreement: CommonFieldData;
  effectiveDate: CommonFieldData;
  initialTerm: CommonFieldData;
  expirationDateOfContract: CommonFieldData;
  currentExpirationDate: CommonFieldData;
  notificationTime: CommonFieldData;
  autoRenewTerms: CommonFieldData;
  renewActionOrNotificationDate: CommonFieldData;
  paymentTerms: CommonFieldData;
}

/**
 * Forecast & Ordering
 */
export interface ForecastOrderingData {
  forecastFrequency: CommonFieldData;
  forecastTimeHorizon: CommonFieldData;
  forecastBindingPeriod: CommonFieldData;
  forecastUpdateDeadline: CommonFieldData;
  forecastMoreDetails: CommonFieldData;
  poOrderLeadTimeRequired: CommonFieldData;
  poFixedPOWindow: CommonFieldData;
  poMinimumOrderQuantity: CommonFieldData;
  poOtherDetails: CommonFieldData;
  contractVolumeByPartAnnual: CommonFieldData;
}

/**
 * Table action handlers
 */
export interface TableActionHandlers {
  onView: (contract: Contract) => void;
  onEdit: (contract: Contract) => void;
}

/**
 * Step navigation handlers
 */
export interface NavigationHandlers {
  onNext: () => void;
  onPrevious: () => void;
  onSave: () => void;
  onSaveLater: () => void;
  onBackToDashboard: () => void;
}

/**
 * Base step props used by BaseFormStep
 */
export interface BaseStepProps {
  viewMode?: boolean;
  contractData?: any;
  onChange?: () => void;
}