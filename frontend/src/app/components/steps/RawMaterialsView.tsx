import { Card } from "antd";
import type { TableColumnsType } from "antd";
import { useMemo } from "react";
import { FormTable, FormFieldRow } from "../FormTable";

interface RawMaterialsViewProps {
  contractData?: any;
}

export function RawMaterialsView({ contractData }: RawMaterialsViewProps) {
  const dataSource: FormFieldRow[] = useMemo(() => [
    {
      key: "rawMaterialSource",
      field: "Raw Material Source",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
    },
    {
      key: "qualityStandards",
      field: "Quality Standards",
      value: "",
      termDetail: "",
      sectionInContract: "",
      furtherDetails: "",
      meetsBaseline: "Yes",
      baselineTerms: "",
    },
    {
      key: "certifications",
      field: "Certifications",
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
    <Card title="Raw Materials" style={{ height: "100%" }}>
      <FormTable dataSource={dataSource} columns={columns} />
    </Card>
  );
}
