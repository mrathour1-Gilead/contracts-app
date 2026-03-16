import { Drawer, Table, ConfigProvider, Avatar, Space, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchContractAuditLogs } from "../store/contracts/contractsThunks";
import { STEP_CONFIG } from "./steps/stepConfig";
import { FIELD_LABEL_MAP } from "./steps/constants/defaultRows";
import { AuditLog } from "../store/contracts/contracts.types";

interface AuditLogDrawerProps {
  onClose: () => void;
  contractId: string;
}


interface TableRow {
  key: number;
  sno: number;
  section: string;
  field: string;
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
    <span>{value}</span>
  </Tooltip>
);

const AuditLogDrawer = ({ onClose, contractId }: AuditLogDrawerProps) => {
  const dispatch = useAppDispatch()
  const { auditLogs, loading } = useAppSelector((state) => state.contracts)

  useEffect(() => {
    dispatch(fetchContractAuditLogs(contractId));
  }, [])


  const history: AuditLog[] = auditLogs

  // sort versions ascending
  const columns: ColumnsType<TableRow> = [
    {
      title: "Sno",
      dataIndex: "sno",
      width: 70
    },
    {
      title: "Section",
      dataIndex: "section",
      ellipsis: true,
      render: renderWithTooltip,
      width: 200

    },
    {
      title: "Field",
      dataIndex: "field",
      ellipsis: true,
      render: renderWithTooltip,
      width: 200

    },
    {
      title: "From",
      dataIndex: "from",
      ellipsis: true,
      render: renderWithTooltip,
      width: 200
      // onCell: (record) => ({
      //   style:  { backgroundColor: "#ffccc7" } ,
      // })
    },
    {
      title: "To",
      dataIndex: "to",
      ellipsis: true,
      render: renderWithTooltip,
      width: 200
      //  onCell: (record) => ({
      //   style:  { backgroundColor: "#d9f7be" } ,
      // })
    }
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4
        }
      }}
    >
      <Drawer loading={loading.auditLogs} title="Amendment History" size={1000} open onClose={onClose}>
        {history.map((versionItem) => {

          const tableData: any[] = versionItem.changes.map((c, idx) => ({
            key: idx,
            sno: idx + 1,
            section: STEP_CONFIG.find((s) => s.key === c.section)?.title || c.section,
            field:
              FIELD_LABEL_MAP[c.section as keyof typeof FIELD_LABEL_MAP]?.[
              c.field as string
              ] || c.field,
            from: c.from,
            to: c.to
          }));

          return (
            <div key={versionItem.version} style={{ marginBottom: 24 }}>
              {/* Header with Avatar */}
              <Space align="start" style={{ marginBottom: 20 }}>
                <Avatar style={{ backgroundColor: "#306e9a" }}>
                  {getInitials(versionItem.user)}
                </Avatar>

                <div>
                  <div style={{ fontWeight: 600 }}>{versionItem.user}</div>

                  <div style={{ color: "#888", fontSize: 13 }}>
                    Version {versionItem.version} •{" "}
                    {new Date(versionItem.changed_at).toLocaleString()}
                  </div>
                </div>
              </Space>

              {/* Audit Table */}
              <div className="audit-logs">
                <Table
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  size="small"
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