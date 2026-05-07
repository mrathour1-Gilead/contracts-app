const commonValue = {
  value: "",
  termDetail: "",
  furtherDetails: "",
  required: true,
  error: false,
};

export function buildRows(config: any): any {
  return config.map((item: any) => ({
    ...commonValue,
    ...item,
  }));
}
