import type { FormFieldRow } from "../components/FormTable";

const commonValue = {
  value: "",
  termDetail: "",
  sectionInContract: "",
  furtherDetails: "",
  meetsBaseline: "Yes",
  baselineTerms: "",
  required: true,
  error: false,
};

export function buildRows(config: any): any {
  return config.map((item: any) => ({
    ...commonValue,
    ...item,
  }));
}
