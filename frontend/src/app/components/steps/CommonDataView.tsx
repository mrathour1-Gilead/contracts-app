
import { Card } from "antd";
import type { TableColumnsType } from "antd";
import { useMemo, useCallback } from "react";
import { FormTable, FormView } from "../FormTable";
import { STEP_CONFIG } from "../steps/stepConfig";
import dayjs from "dayjs";
interface CommonDataViewProps {
  data: any;
  title: string;
  dataKey: string;
}
export function CommonDataView({ data, title, dataKey }: CommonDataViewProps) {

  const stepFields = useMemo(
    () => STEP_CONFIG.find((step) => step.key === dataKey)?.rows || [],
    [dataKey]
  );

  const fieldMap = useMemo(() => {
    const map: Record<string, any> = {};
    stepFields.forEach((f: any) => {
      if (f?.field) map[f.field] = f;
    });
    return map;
  }, [stepFields]);
  const isValidDate = useCallback((value: any) => dayjs(value).isValid(), []);

  const renderValue = useCallback(
    (value: any, row?: any) => {
      const fieldConfig = row?.field ? fieldMap[row.field] : null;
      if (value && fieldConfig?.type === "date" && isValidDate(value)) {
       return dayjs(value).format("MMM DD YYYY");
      }
      return value;
    },
    [fieldMap, isValidDate]
  );

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
        render: (value: any, row: any) => (
          <div className="whitespace-pre-wrap">
            {renderValue(value, row)}
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
    [renderValue]
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