import { Drawer, Table, ConfigProvider, Avatar, Space, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchContractAuditLogs } from "../store/contracts/contractsThunks";
import { STEP_CONFIG } from "./steps/stepConfig";
import { FIELD_LABEL_MAP } from "./steps/constants/defaultRows";

const PROPERTY_LABEL_MAP: Record<string, string> = {
  value: "Value",
  meetsBaseline: "Meets Baseline",
  baselineTerms: "Baseline Terms",
  termDetail: "Term Detail",
  sectionInContract: "Section In Contract",
  furtherDetails: "Further Details",
}

interface AuditLogDrawerProps {
  onClose: () => void;
  contractId: string;
}

interface TableRow {
  key: string;
  sno: number;
  field: string;
  property: string;
  from: string;
  to: string;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const renderWithTooltip = (value: string) => (
  <Tooltip title={value}>
    <span>{value || "-"}</span>
  </Tooltip>
);

const AuditLogDrawer = ({ onClose, contractId }: AuditLogDrawerProps) => {
  const dispatch = useAppDispatch();
  const { auditLogs, loading } = useAppSelector((state) => state.contracts);

  useEffect(() => {
    if (contractId) {
      dispatch(fetchContractAuditLogs(contractId));
    }
  }, [contractId]);

  const history: any = auditLogs; // ✅ already sorted from backend

  const columns: ColumnsType<TableRow> = [
    {
      title: "Sno",
      dataIndex: "sno",
      width: 70,
    },
    {
      title: "Field",
      dataIndex: "field",
      ellipsis: true,
      render: renderWithTooltip,
      width: 220,
    },
    {
      title: "Property",
      dataIndex: "property",
      ellipsis: true,
      render: renderWithTooltip,
      width: 160,
    },
    {
      title: "From",
      dataIndex: "from",
      ellipsis: true,
      render: renderWithTooltip,
      width: 220,
      // onCell: () => ({
      //   style: { backgroundColor: "#fff1f0" },
      // }),
    },
    {
      title: "To",
      dataIndex: "to",
      ellipsis: true,
      render: renderWithTooltip,
      width: 220,
      // onCell: () => ({
      //   style: { backgroundColor: "#f6ffed" },
      // }),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
        },
      }}
    >
      <Drawer
        loading={loading.auditLogs}
        title="Amendment History"
        size="55%"
        open
        onClose={onClose}
      >
        {history.map((versionItem: any) => {
          const sectionKey = versionItem.changes?.[0]?.section;

          const sectionLabel =
            STEP_CONFIG.find((s) => s.key === sectionKey)?.title ||
            sectionKey;

          const tableData: any = versionItem.changes.flatMap((c: any, idx: any) =>
            Object.keys(c.changes).map((key, subIdx) => {
              const val = c.changes[key];

              return {
                key: `${idx}-${subIdx}`,
                sno: idx + subIdx + 1,

                field:
                  FIELD_LABEL_MAP[
                  c.section as keyof typeof FIELD_LABEL_MAP
                  ]?.[c.field as string] || c.field,

                property: PROPERTY_LABEL_MAP[key] || key,

                from: val?.from ?? "",
                to: val?.to ?? "",
              };
            })
          );

          return (
            <div key={versionItem.version} style={{ marginBottom: 28 }}>
              {/* Header */}
              <Space align="start" style={{ marginBottom: 16 }}>
                <Avatar style={{ backgroundColor: "#306e9a" }}>
                  {getInitials(versionItem.user)}
                </Avatar>

                <div>
                  <div style={{ fontWeight: 600 }}>
                    {versionItem.user}
                  </div>

                  <div style={{ color: "#888", fontSize: 13 }}>
                    {/* Version {versionItem.version} •{" "} */}
                    {new Date(
                      versionItem.changed_at
                    ).toLocaleString()}
                  </div>

                  <div
                    style={{
                      color: "#306e9a",
                      fontSize: 13,
                      marginTop: 2,
                      fontWeight: 500,
                    }}
                  >
                    Section: {sectionLabel}
                  </div>
                </div>
              </Space>

              {/* Table */}
              <div className="audit-logs">
                <Table
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  size="small"
                  rowKey="key"
                />
              </div>
            </div>
          );
        })}

        <style>{`
          .audit-logs .ant-table-thead > tr > th {
            background: #f8fafc;
            font-weight: 600;
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            padding: 10px 12px;
          }

          .audit-logs .ant-table-tbody > tr > td {
            padding: 8px 12px;
          }

          .audit-logs .ant-table-body {
            overflow: auto !important;
          }

          .audit-logs .ant-table-tbody > tr.ant-table-row:hover > td {
            background: inherit !important;
          }
        `}</style>
      </Drawer>
    </ConfigProvider>
  );
};

export default AuditLogDrawer;