import { Card } from "antd";
import type { TableColumnsType } from "antd";
import { useMemo } from "react";
import { FormTable, FormView } from "../FormTable";

import dayjs from "dayjs";



interface CommonDataViewProps {
  data: any;
  title: string;
}



export function CommonDataView({ data, title }: CommonDataViewProps) {
const isValidDate = (value: any) => dayjs(value).isValid();

const renderValue = (value: any) => {
  if(value && isValidDate(value)) {
    return dayjs(value).format("MMM DD YYYY");
  }
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "object") return JSON.stringify(value);
  return value;
};

  const columns: TableColumnsType<FormView> = useMemo(
    () => [
      {
        title: "Field",
        dataIndex: "field",
        width: 200,
        render: (text: string) => (
          <span className="font-medium text-gray-900">{text}</span>
        ),
      },
      {
        title: "Value",
        dataIndex: "value",
        width: 220,
        render: renderValue,
      },
      {
        title: "Term Detail",
        dataIndex: "termDetail",
        width: 180,
        render: renderValue,
      },
      {
        title: "Section in Contract",
        dataIndex: "sectionInContract",
        width: 180,
        render: renderValue,
      },
      {
        title: "Further Details / Comments",
        dataIndex: "furtherDetails",
        width: 220,
        render: (value) => (
          <div className="whitespace-pre-wrap">
            {renderValue(value)}
          </div>
        ),
      },
      {
        title: "Meets Baseline",
        dataIndex: "meetsBaseline",
        width: 150,
        render: renderValue,
      },
      {
        title: "Baseline Terms",
        dataIndex: "baselineTerms",
        width: 180,
        render: renderValue,
      },
    ],
    []
  );

  return (
    <Card title={title} style={{ height: "100%" }}>
      <FormTable
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.field}
      />
    </Card>
  );
}