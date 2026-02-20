import { Input, Select, Card } from "antd";
import type { TableColumnsType } from "antd";
import { useState, useCallback, useMemo } from "react";
import { FormTable, FormFieldRow } from "../FormTable";

export function CMODetails() {
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

  const columns: TableColumnsType<FormFieldRow> = useMemo(
    () => [
      {
        title: "Field",
        dataIndex: "field",
        key: "field",
        width: 220,
        render: (text: string) => (
          <span className="font-medium text-gray-900">
            {text}
          </span>
        ),
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        width: 220,
        render: (value: string, record) =>
          record.key === "territory" ? (
            <Select
              value={value || undefined}
              onChange={(v) =>
                handleValueChange(record.key, "value", v)
              }
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
            />
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

  return (
    <Card title="CMO Details" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}