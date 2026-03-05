import type { Contract, CMODetails } from "./contracts.types";

/**
 * Converts CMODetails form data into
 * API-ready Contract payload
 */
export function mapCMODetailsToContract(
  cmoDetails: CMODetails
): Pick<
  Contract,
  | "cmoParent"
  | "cmoName"
  | "yearSpend"
  | "signingEntity1"
  | "supplierEntity2"
  | "location"
  | "territory"
  | "relationshipOwner"
  | "cmoDetails"
  | "searchString"
  | "statusUpdate"
  | "generalTerms"
  | "delivery"
  | "product"
  | "forecastOrdering"
  | "pricing"
  | "rawMaterials"
  | "qcTesting"
  | "performance"
  | "governance"
  | "comments"
  | "specialFields"
> {
  const payload = {
    cmoDetails,

    // 👇 initialize ALL sections as empty JSON
    statusUpdate: {},
    generalTerms: {},
    delivery: {},
    product: {},
    forecastOrdering: {},
    pricing: {},
    rawMaterials: {},
    qcTesting: {},
    performance: {},
    governance: {},
    comments: {},
    specialFields: {},
  } as Pick<
    Contract,
    | "cmoParent"
    | "cmoName"
    | "yearSpend"
    | "signingEntity1"
    | "supplierEntity2"
    | "location"
    | "territory"
    | "relationshipOwner"
    | "cmoDetails"
    | "searchString"
    | "statusUpdate"
    | "generalTerms"
    | "delivery"
    | "product"
    | "forecastOrdering"
    | "pricing"
    | "rawMaterials"
    | "qcTesting"
    | "performance"
    | "governance"
    | "comments"
    | "specialFields"
  >;

  const searchParts: string[] = [];

  (Object.keys(cmoDetails) as (keyof CMODetails)[]).forEach((key) => {
    const item = cmoDetails[key];
    if (!item) return;

    // flatten value (keep null / undefined)
    (payload as any)[key] = item.value ?? null;

    // build search string (skip only null / undefined)
    if (item.value != null) {
      searchParts.push(String(item.value).toLowerCase());
    }
  });

  payload.searchString = searchParts.join(" ");

  return payload;
}