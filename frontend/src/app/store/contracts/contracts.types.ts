export type MeetsBaseline = "Yes" | "No";

/* =====================================================
   CMO DETAILS (FORM STRUCTURE)
===================================================== */

export interface CMODetailItem {
  value: string | number;
  termDetail?: string;
  sectionInContract?: string;
  comments?: string;
  meetsBaseline: MeetsBaseline;
}

export interface CMODetails {
  cmoParent?: CMODetailItem;
  cmoName?: CMODetailItem;
  yearSpend?: CMODetailItem;
  signingEntity1?: CMODetailItem;
  supplierEntity2?: CMODetailItem;
  location?: CMODetailItem;
  territory?: CMODetailItem;
  relationshipOwner?: CMODetailItem;
}

/* =====================================================
   STATUS UPDATE
===================================================== */

export interface StatusUpdate {
  status: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

/* =====================================================
   CONTRACT (DB MODEL)
===================================================== */

export interface Contract {
  id: string;
  cnt_id: string;

  /* ---- flattened searchable fields ---- */

  cmoName: string;
  relationshipOwner: string;

  autoRenewTerms: string;
  typeOfAgreement: string;
  currentExpirationDate: string;
  notificationTime: string;

  forecastTimeHorizon: string;
  forecastBindingPeriod: string;

  paymentTerms: string;

  searchString: string;

  /* ---- section data ---- */

  cmoDetails: CMODetails;
  version: number;

  statusUpdate?: StatusUpdate;
  generalTerms?: Record<string, unknown>;
  delivery?: Record<string, unknown>;
  product?: Record<string, unknown>;
  forecastOrdering?: Record<string, unknown>;
  pricing?: Record<string, unknown>;
  rawMaterials?: Record<string, unknown>;
  qcTesting?: Record<string, unknown>;
  performance?: Record<string, unknown>;
  governance?: Record<string, unknown>;
  comments?: Record<string, unknown>;
  specialFields?: Record<string, unknown>;

  /* ---- metadata ---- */

  createdAt: string;
  updatedAt: string;

  status?: string;
  currentStep?: number;
}

/* =====================================================
   CONTRACT VIEW (TABLE UI)
===================================================== */

export interface ContractView {
  id: string;
  cnt_id: string;

  /* searchable fields */

  cmoName: string;
  relationshipOwner: string;

  autoRenewTerms: string;
  typeOfAgreement: string;
  currentExpirationDate: string;
  notificationTime: string;

  forecastTimeHorizon: string;
  forecastBindingPeriod: string;

  paymentTerms: string;

  searchString: string;

  /* sections */

  cmoDetails: CMODetails;

  statusUpdate?: StatusUpdate;
  generalTerms?: Record<string, unknown>;
  delivery?: Record<string, unknown>;
  product?: Record<string, unknown>;
  forecastOrdering?: Record<string, unknown>;
  pricing?: Record<string, unknown>;
  rawMaterials?: Record<string, unknown>;
  qcTesting?: Record<string, unknown>;
  performance?: Record<string, unknown>;
  governance?: Record<string, unknown>;
  comments?: Record<string, unknown>;
  specialFields?: Record<string, unknown>;

  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface AuditChange {
  section: string;
  field: string;
  from: string | null;
  to: string | null;
}

export interface AuditLog {
  version: number;
  user: string;
  changed_at: string;
  changes: AuditChange[];
}