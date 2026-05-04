import { Table, ConfigProvider } from "antd";
import type { TableProps, TableColumnsType } from "antd";
import clsx from "clsx";

export interface FormFieldRow {
  key: string;
  field: string;
  value: string;
  termDetail: string;
  sectionInContract: string;
  furtherDetails: string;
  meetsBaseline: string;
  baselineTerms: string;
  required?: boolean;
  error: boolean;
  sno: number;
  placeholder?: string;
  options?: { value: string; label: string }[];
  type?: "text" | "number" | "date" | "select";
  step?: string;
}

export interface FormView {
  key: string;
  field: string;
  value: string;
  termDetail: string;
  sectionInContract: string;
  furtherDetails: string;
  meetsBaseline: string;
  baselineTerms: string;
}

interface FormTableProps<T = FormFieldRow>
  extends Omit<TableProps<T>, "size"> {
  dataSource: T[];
  columns: TableColumnsType<T>;
  className?: string;
}

export function FormTable<T = FormFieldRow>({
  dataSource,
  columns,
  className,
  ...props
}: FormTableProps<T>) {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          controlHeight: 32,
        },
        components: {
          Input: {
            borderRadius: 4,
            controlHeight: 32,
          },
          InputNumber: {
            borderRadius: 4,
            controlHeight: 32,
          },
          Select: {
            borderRadius: 4,
            controlHeight: 32,
          },
          DatePicker: {
            borderRadius: 4,
            controlHeight: 32,
          },
        },
      }}
    >
      <div className="form-table">
        <Table
          pagination={false}
          // bordered
          scroll={{ x: "max-content", y: "calc(100vh - 430px)" }}
          //           scroll={{
          //   x: "max-content",
          //   y: "calc(100vh - 350px)",
          // }}
          // style={{ maxHeight: "70vh" }}
          sticky
          className={clsx("form-table-inner", className)}
          dataSource={dataSource}
          columns={columns}
          {...props}
        />
      </div>

      <style>{`
        /* ===============================
           FormTable layout & spacing
           =============================== */

        .form-table .ant-table-thead > tr > th {
          background: #f8fafc;
          font-weight: 600;
          color: #1f2937;
          border-bottom: 2px solid #e5e7eb;
          padding: 10px 12px;
        }

        .form-table .ant-table-tbody > tr > td {
          padding: 8px 12px;
        }

        /* ===============================
           Hide scrollbar when not needed
           =============================== */

        .form-table .ant-table-body {
          overflow: auto !important;
          min-height: 400px !important;
        }

      .form-table  .ant-table-expanded-row-fixed {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
}

        /* ===============================
           Disable row focus / hover color
           =============================== */

        .form-table .ant-table-tbody > tr.ant-table-row:hover > td,
        .form-table .ant-table-tbody > tr.ant-table-row:focus > td,
        .form-table .ant-table-tbody > tr.ant-table-row:focus-within > td,
        .form-table .ant-table-tbody > tr.ant-table-row.ant-table-row-selected > td,
        .form-table .ant-table-tbody > tr.ant-table-row.ant-table-row-selected:hover > td {
          background: inherit !important;
        }

        /* Prevent control focus bubbling */
        .form-table .ant-select-focused,
        .form-table .ant-input-affix-wrapper-focused {
          background: transparent !important;
        }
      `}</style>
    </ConfigProvider>
  );
}