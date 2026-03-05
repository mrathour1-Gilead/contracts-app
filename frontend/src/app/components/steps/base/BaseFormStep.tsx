import { Input, Select, Card, App, InputNumber, DatePicker } from "antd";
import type { TableColumnsType } from "antd";
import {
  useState,
  useCallback,
  useMemo,
  useImperativeHandle,
  useEffect,
  forwardRef,
} from "react";
import { FormTable, FormFieldRow } from "../../FormTable";
import type { StepHandle } from "../types/StepHandle";
interface BaseFormStepProps {
  title: string;
  defaultRows: FormFieldRow[];
  existingRows?: Record<string, Partial<FormFieldRow>> | null;
  transformData: (rows: FormFieldRow[]) => any;
}
const isEmptyObject = (obj?: object | null) =>
  !obj || Object.keys(obj).length === 0;
export const BaseFormStep = forwardRef<StepHandle, BaseFormStepProps>(
  ({ title, defaultRows, existingRows, transformData }, ref) => {
    const { notification } = App.useApp();
    const [dataSource, setDataSource] =
      useState<FormFieldRow[]>(defaultRows);
    /* -----------------------------
       CREATE vs EDIT hydration
    ------------------------------ */
    useEffect(() => {
      if (isEmptyObject(existingRows)) {
        setDataSource(defaultRows);
      } else {
        setDataSource(
          defaultRows.map((row) => ({
            ...row,
            ...existingRows?.[row.key],
          }))
        );
      }
    }, [defaultRows, existingRows]);
    /* -----------------------------
       Value change handler
    ------------------------------ */
    const handleValueChange = useCallback(
      (key: string, field: keyof FormFieldRow, value: string) => {
        setDataSource((prev) =>
          prev.map((row) =>
            row.key === key ? { ...row, [field]: value } : row
          )
        );
      },
      []
    );
    /* -----------------------------
       Shared table columns
    ------------------------------ */
    const columns: TableColumnsType<FormFieldRow> = useMemo(
      () => [
        {
          title: "Field",
          dataIndex: "field",
          width: 220,
          render: (text, record) => (
            <span className="font-medium">
              {text}
              {record.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </span>
          ),
        },
        {
          title: "Value",
          dataIndex: "value",
          width: 220,
          render: (value, record) => {
            /* SELECT */
            if (record.options) {
              return (
                <Select
                  value={value || undefined}
                  options={record.options}
                  placeholder={record.placeholder}
                  className="w-full"
                  onChange={(v) =>
                    handleValueChange(record.key, "value", v)
                  }
                />
              );
            }
            /* NUMBER */
            if (record.type === "number") {
              return (
                <InputNumber
                  value={value ? Number(value) : undefined}
                  className="w-full"
                  controls={false}
                  placeholder={record.placeholder}
                  onChange={(v) =>
                    handleValueChange(
                      record.key,
                      "value",
                      String(v ?? "")
                    )
                  }
                />
              );
            }
            /* DATE */
            if (record.type === "date") {
              return (
                <DatePicker
                  className="w-full"
                  onChange={(date, dateString) =>
                    handleValueChange(
                      record.key,
                      "value",
                      dateString as string
                    )
                  }
                />
              );
            }
            /* TEXT */
            return (
              <Input
                value={value}
                type={record.type || "text"}
                placeholder={record.placeholder}
                className="w-full"
                onChange={(e) =>
                  handleValueChange(
                    record.key,
                    "value",
                    e.target.value
                  )
                }
              />
            );
          },
        },
        {
          title: "Term Detail",
          dataIndex: "termDetail",
          width: 180,
          render: (value, record) => (
            <Input
              value={value}
              placeholder="Enter term detail"
              className="w-full"
              onChange={(e) =>
                handleValueChange(
                  record.key,
                  "termDetail",
                  e.target.value
                )
              }
            />
          ),
        },
        {
          title: "Section in Contract",
          dataIndex: "sectionInContract",
          width: 180,
          render: (value, record) => (
            <Input
              value={value}
              placeholder="Enter section in contract"
              className="w-full"
              onChange={(e) =>
                handleValueChange(
                  record.key,
                  "sectionInContract",
                  e.target.value
                )
              }
            />
          ),
        },
        {
          title: "Further Details / Comments",
          dataIndex: "furtherDetails",
          width: 220,
          render: (value, record) => (
            <Input.TextArea
              value={value}
              autoSize={{ minRows: 1, maxRows: 3 }}
              placeholder="Enter further details / comments"
              className="w-full"
              onChange={(e) =>
                handleValueChange(
                  record.key,
                  "furtherDetails",
                  e.target.value
                )
              }
            />
          ),
        },
        {
          title: "Meets Baseline",
          dataIndex: "meetsBaseline",
          width: 150,
          render: (value, record) => (
            <Select
              value={value}
              className="w-full"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              onChange={(v) =>
                handleValueChange(
                  record.key,
                  "meetsBaseline",
                  v
                )
              }
            />
          ),
        },
        {
          title: "Baseline Terms",
          dataIndex: "baselineTerms",
          width: 200,
          render: (value, record) => (
            <Input
              value={value}
              placeholder="Enter baseline terms"
              onChange={(e) =>
                handleValueChange(
                  record.key,
                  "baselineTerms",
                  e.target.value
                )
              }
            />
          ),
        },
      ],
      [handleValueChange]
    );
    /* -----------------------------
       Validation
    ------------------------------ */
    const validate = useCallback(() => {
      const missingFields = dataSource
        .filter((row) => row.required && !row.value?.trim())
        .map((row) => row.field);
      if (missingFields.length > 0) {
        notification.error({
          message: `${title} – Validation Error`,
          description: (
            <ul style={{ paddingLeft: 16 }}>
              {missingFields.map((field) => (
                <li key={field}>{field} is required</li>
              ))}
            </ul>
          ),
        });
        return false;
      }
      return true;
    }, [dataSource, notification, title]);
    /* -----------------------------
       Expose step API
    ------------------------------ */
    useImperativeHandle(ref, () => ({
      validate,
      data: transformData(dataSource),
    }));
    return (
      <Card title={title} style={{ height: "100%" }}>
        <FormTable dataSource={dataSource} columns={columns} />
      </Card>
    );
  }
);
BaseFormStep.displayName = "BaseFormStep";
 