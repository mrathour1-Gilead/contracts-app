/**
 * Core type definitions for the Global Supply Chain Contracts Database
 */

import  { Contract } from  "@/app/store/contracts/contracts.types"

export type ContractStatus = "Active" | "Inactive" | "Pending" | "Expired";

export type ViewState = "dashboard" | "cmo-details" | "stepper-form" | "stepper-view";

export interface Step {
  id: number;
  label: string;
  completed: boolean;
}

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
 * Complete CMO Details field structure with all table columns
 */
export interface CMODetailsField {
  field: string;
  value: string;
  termDetail: string;
  sectionInContract: string;
  furtherDetails: string;
  meetsBaseline: string;
  baselineTerms: string;
  sno: number ;
}

/**
 * Complete CMO Details data structure
 */
export interface CMODetailsData {
  cmoParent: CMODetailsField;
  yearSpend: CMODetailsField;
  cmoName: CMODetailsField;
  signingEntity1: CMODetailsField;
  supplierEntity2: CMODetailsField;
  supplierEntity3: CMODetailsField;
  location: CMODetailsField;
  relationshipOwner: CMODetailsField;
  territory: CMODetailsField;
}

export interface TableActionHandlers {
  onView: (contract: Contract) => void;
  onEdit: (contract: Contract) => void;
}

export interface NavigationHandlers {
  onNext: () => void;
  onPrevious: () => void;
  onSave: () => void;
  onSaveLater: () => void;
  onBackToDashboard: () => void;
}