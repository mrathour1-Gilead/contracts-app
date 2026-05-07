import type { CommonFieldData } from "../types";
import type { FormFieldRow } from "../components/FormTable";

export function convertFormRowsToData<T>(
  dataSource: FormFieldRow[]
): T {
  const result: Partial<Record<keyof T, CommonFieldData>> = {};

  dataSource.forEach((row) => {
    const field: CommonFieldData = {
      field: row.field,
      value: row.value,
      termDetail: row.termDetail,
      furtherDetails: row.furtherDetails,
      sno: row.sno,
    };

    result[row.key as keyof T] = field;
  });

  return result as T;
}