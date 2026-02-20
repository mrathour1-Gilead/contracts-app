/**
 * Core type definitions for the Global Supply Chain Contracts Database
 */

export interface Contract {
  id: number;
  cmoParent: string;
  yearSpend: string;
  cmoName: string;
  signingEntity1: string;
  supplierEntity2: string;
  supplierEntity3: string;
  location: string;
  relationshipOwner: string;
  territory: string;
  status: ContractStatus;
  progress: number;
}

export type ContractStatus = "Active" | "Inactive" | "Pending" | "Expired";

export type ViewState = "dashboard" | "cmo-details" | "stepper-form";

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
