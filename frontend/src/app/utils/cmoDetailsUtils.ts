/**
 * Utility functions for CMO Details data transformation
 */

import type { CMODetailsData, CMODetailsField } from "../types";
import type { FormFieldRow } from "../components/FormTable";

/**
 * Convert FormFieldRow array to CMODetailsData structure
 */
export function convertToCMODetailsData(
  dataSource: FormFieldRow[]
): CMODetailsData {
  const result: Partial<CMODetailsData> = {};

  dataSource.forEach((row) => {
    const field: CMODetailsField = {
      field: row.field,
      value: row.value,
      termDetail: row.termDetail,
      sectionInContract: row.sectionInContract,
      furtherDetails: row.furtherDetails,
      meetsBaseline: row.meetsBaseline,
      baselineTerms: row.baselineTerms,
      sno: row.sno,
    };

    result[row.key as keyof CMODetailsData] = field;
  });

  return result as CMODetailsData;
}

/**
 * Convert CMODetailsData to JSON string
 */
export function cmoDetailsToJSON(data: CMODetailsData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Validate CMO Details data
 * Returns array of validation errors
 */
export function validateCMODetails(data: CMODetailsData): string[] {
  const errors: string[] = [];

  // Required fields validation
  const requiredFields = [
    { key: "cmoName", label: "CMO Name" },
    { key: "location", label: "Location (Facility)" },
    { key: "territory", label: "Territory" },
  ];

  requiredFields.forEach(({ key, label }) => {
    const field = data[key as keyof CMODetailsData];
    if (!field?.value || field.value.trim() === "") {
      errors.push(`${label} is required`);
    }
  });

  // Year Spend validation
  if (data.yearSpend?.value) {
    const yearSpend = parseFloat(data.yearSpend.value);
    if (isNaN(yearSpend) || yearSpend < 0) {
      errors.push("Year Spend must be a valid positive number");
    }
  }

  return errors;
}

/**
 * Create empty CMO Details data structure
 */
export function createEmptyCMODetailsData(): CMODetailsData {
  const emptyField: CMODetailsField = {
    field: "",
    value: "",
    termDetail: "",
    sectionInContract: "",
    furtherDetails: "",
    meetsBaseline: "Yes",
    baselineTerms: "",
  };

  return {
    cmoParent: { ...emptyField, field: "CMO Parent" },
    yearSpend: { ...emptyField, field: "Year Spend (M$)" },
    cmoName: { ...emptyField, field: "CMO Name" },
    signingEntity1: { ...emptyField, field: "Signing Entity 1" },
    supplierEntity2: { ...emptyField, field: "Supplier Entity 2" },
    supplierEntity3: { ...emptyField, field: "Supplier Entity 3" },
    location: { ...emptyField, field: "Location (Facility)" },
    relationshipOwner: { ...emptyField, field: "Supplier Relationship Owner" },
    territory: { ...emptyField, field: "Territory" },
  };
} 