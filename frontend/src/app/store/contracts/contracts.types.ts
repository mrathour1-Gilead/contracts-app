export type MeetsBaseline = "Yes" | "No";

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

export interface StatusUpdate {
  status: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

export interface Contract {
  id: string;
  cnt_id: string;

  // CMO columns
  cmoParent: string;
  cmoName: string;
  yearSpend: number;
  signingEntity1: string;
  supplierEntity2?: string;
  location: string;
  territory: string;
  relationshipOwner: string;
  searchString: string;
  cmoDetails: CMODetails;
  statusUpdate?: StatusUpdate;
  generalTerms?: Record<string, unknown>;
  delivery?: Record<string, unknown>;
  product?: Record<string, unknown>;
  forecastAndOrdering?: Record<string, unknown>;
  pricing?: Record<string, unknown>;
  rawMaterials?: Record<string, unknown>;
  qcTesting?: Record<string, unknown>;
  performance?: Record<string, unknown>;
  governance?: Record<string, unknown>;
  comments?: Record<string, unknown>;
  specialFields?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  status?: string;
}


export interface ContractView {
  id: string;
  cnt_id: string;

  // CMO columns
  cmoParent: string;
  cmoName: string;
  yearSpend: number;
  signingEntity1: string;
  supplierEntity2?: string;
  location: string;
  territory: string;
  relationshipOwner: string;
  searchString: string;
  cmoDetails: CMODetails;
  statusUpdate?: StatusUpdate;
  generalTerms?: Record<string, unknown>;
  delivery?: Record<string, unknown>;
  product?: Record<string, unknown>;
  forecastAndOrdering?: Record<string, unknown>;
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