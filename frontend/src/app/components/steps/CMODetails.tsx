import { Input, Select, Card, App } from "antd";
import type { TableColumnsType } from "antd";
import { useState, useCallback, useMemo, useImperativeHandle, forwardRef } from "react";
import { FormTable, FormFieldRow } from "../FormTable";
import { convertToCMODetailsData } from "../../utils/cmoDetailsUtils";
import type { CMODetailsData } from "../../types";

interface CMODetailsProps {
  onChange?: (data: CMODetailsData) => void;
}

export interface CMODetailsHandle {
  validate: () => boolean;
}

export const CMODetails = forwardRef<CMODetailsHandle, CMODetailsProps>(({ }, ref) => {
  const { message } = App.useApp();
  const [dataSource, setDataSource] = useState<FormFieldRow[]>([
    {
      key: "cmoParent",
      field: "CMO Parent",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: true,
      error: false,
      sno: 1,
    },
    {
      key: "yearSpend",
      field: "Year Spend (M$)",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: true,
      error: false,
      sno: 2,
    },
    {
      key: "cmoName",
      field: "CMO Name",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: true,
      error: false,
      sno: 3,
    },
    {
      key: "signingEntity1",
      field: "Signing Entity 1",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: true,
      error: false,
      sno: 4,
    },
    {
      key: "supplierEntity2",
      field: "Supplier Entity 2",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: false,
      error: false,
      sno: 5,
    },
    {
      key: "supplierEntity3",
      field: "Supplier Entity 3",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: false,
      error: false,
      sno: 6,
    },
    {
      key: "location",
      field: "Location (Facility)",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: true,
      error: false,
      sno: 7,
    },
    {
      key: "relationshipOwner",
      field: "Supplier Relationship Owner",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: true,
      error: false,
      sno: 8,
    },
    {
      key: "territory",
      field: "Territory",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
      required: true,
      error: false,
      sno: 9,
    },
  ]);

  const handleValueChange = useCallback(
    (
      key: string,
      field: keyof FormFieldRow,
      newValue: string,
    ) => {
      setDataSource((prev) =>
        prev.map((row) =>
          row.key === key ? { ...row, [field]: newValue } : row,
        ),
      );
    },
    [],
  );

  console.log("dataSource", dataSource)

  // Validate required fields on blur and show popup message
  // const validateField = useCallback((key: string, fieldName: string) => {
  //   const row = dataSource.find((r) => r.key === key);
  //   if (row && row.required && !row.value.trim()) {
  //     message.error(`${fieldName} is required`);
  //   }
  // }, [dataSource]);

  const columns: TableColumnsType<FormFieldRow> = useMemo(
    () => [
      {
        title: "Field",
        dataIndex: "field",
        key: "field",
        width: 220,
        render: (text: string, record: FormFieldRow) => (
          <span className="font-medium text-gray-900">
            {text}
            {record.required &&  <span className = "text-red-500 ml-1">*</span>}
          </span>
        ),
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        width: 220,
        render: (value: string, record) => (
          record.key === "territory" ? (
            <Select
              value={value || undefined}
              onChange={(v) =>
                handleValueChange(record.key, "value", v)
              }
              // onBlur={() => validateField(record.key, record.field)}
              placeholder="Select territory"
              className="w-full"
              options={[
                {
                  value: "North America",
                  label: "North America",
                },
                { value: "Europe", label: "Europe" },
                {
                  value: "Asia Pacific",
                  label: "Asia Pacific",
                },
                {
                  value: "Latin America",
                  label: "Latin America",
                },
                {
                  value: "Middle East & Africa",
                  label: "Middle East & Africa",
                },
              ]}
            />
          ) : (
            <Input
              value={value}
              type={
                record.key === "yearSpend" ? "number" : "text"
              }
              step={
                record.key === "yearSpend" ? "0.01" : undefined
              }
              onChange={(e) =>
                handleValueChange(
                  record.key,
                  "value",
                  e.target.value,
                )
              }
              placeholder={`Enter ${record.field.toLowerCase()}`}
              // onBlur={() => validateField(record.key, record.field)}
            />
          )
        ),
      },
      {
        title: "Term Detail",
        dataIndex: "termDetail",
        key: "termDetail",
        width: 180,
        render: (value, record) => (
          <Input
            value={value}
            onChange={(e) =>
              handleValueChange(
                record.key,
                "termDetail",
                e.target.value,
              )
            }
            placeholder="Enter term detail"
          />
        ),
      },
      {
        title: "Section in Contract",
        dataIndex: "sectionInContract",
        key: "sectionInContract",
        width: 180,
        render: (value, record) => (
          <Input
            value={value}
            onChange={(e) =>
              handleValueChange(
                record.key,
                "sectionInContract",
                e.target.value,
              )
            }
            placeholder="Enter section"
          />
        ),
      },
      {
        title: "Further Details / Comments",
        dataIndex: "furtherDetails",
        key: "furtherDetails",
        width: 240,
        render: (value, record) => (
          <Input.TextArea
            value={value}
            autoSize={{ minRows: 1, maxRows: 3 }}
            onChange={(e) =>
              handleValueChange(
                record.key,
                "furtherDetails",
                e.target.value,
              )
            }
            placeholder="Enter comments"
          />
        ),
      },
      {
        title: "Meets Baseline",
        dataIndex: "meetsBaseline",
        key: "meetsBaseline",
        width: 150,
        render: (value, record) => (
          <Select
            value={value}
            className="w-full"
            onChange={(v) =>
              handleValueChange(record.key, "meetsBaseline", v)
            }
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
        ),
      },
      {
        title: "Baseline Terms",
        dataIndex: "baselineTerms",
        key: "baselineTerms",
        width: 200,
        render: (value, record) => (
          <Input
            value={value}
            onChange={(e) =>
              handleValueChange(
                record.key,
                "baselineTerms",
                e.target.value,
              )
            }
            placeholder="Enter baseline terms"
          />
        ),
      },
    ],
    [handleValueChange],
  );

  const validate = useCallback(() => {
    let isValid = true;
    dataSource.forEach((row) => {
      if (row.required && !row.value.trim()) {
        message.error(`${row.field} is required`);
        isValid = false;
      }
    });
    return isValid;
  }, [dataSource]);


  useImperativeHandle(ref, () => ({
    validate,
    data: {
      cmoDetails: convertToCMODetailsData(dataSource),
      step: 1
    }
  }));

  return (
    <Card title="CMO Details" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
});

CMODetails.displayName = "CMODetails";