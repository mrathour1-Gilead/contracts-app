import { Card } from "antd";
import type { TableColumnsType } from "antd";
import { useMemo } from "react";
import { FormTable, FormFieldRow } from "../FormTable";

interface SpecialFieldsViewProps {
  contractData?: any;
}

export function SpecialFieldsView({ contractData }: SpecialFieldsViewProps) {
  const dataSource: FormFieldRow[] = useMemo(() => [
    {
      key: "customField1",
      field: "Custom Field 1",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
    },
    {
      key: "customField2",
      field: "Custom Field 2",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
    },
  ], [contractData]);

  const columns: TableColumnsType<FormFieldRow> = useMemo(
    () => [
      {
        title: "Field",
        dataIndex: "field",
        key: "field",
        width: 200,
        render: (text: string) => (
          <span className="font-medium text-gray-900">{text}</span>
        ),
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        width: 220,
        render: (value: string) => (
          <span className="text-gray-900">{value || "-"}</span>
        ),
      },
      {
        title: "Term Detail",
        dataIndex: "termDetail",
        key: "termDetail",
        width: 180,
        render: (value: string) => (
          <span className="text-gray-900">{value || "-"}</span>
        ),
      },
      {
        title: "Section in Contract",
        dataIndex: "sectionInContract",
        key: "sectionInContract",
        width: 180,
        render: (value: string) => (
          <span className="text-gray-900">{value || "-"}</span>
        ),
      },
      {
        title: "Further Details / Comments",
        dataIndex: "furtherDetails",
        key: "furtherDetails",
        width: 220,
        render: (value: string) => (
          <div className="text-gray-900 whitespace-pre-wrap">
            {value || "-"}
          </div>
        ),
      },
      {
        title: "Meets Baseline",
        dataIndex: "meetsBaseline",
        key: "meetsBaseline",
        width: 150,
        render: (value: string) => (
          <span className="text-gray-900">{value || "-"}</span>
        ),
      },
      {
        title: "Baseline Terms",
        dataIndex: "baselineTerms",
        key: "baselineTerms",
        width: 180,
        render: (value: string) => (
          <span className="text-gray-900">{value || "-"}</span>
        ),
      },
    ],
    [],
  );

  return (
    <Card title="Special Fields" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}
