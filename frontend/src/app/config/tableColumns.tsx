import { Button, Tooltip } from "antd"
import { EditTwoTone, EyeTwoTone } from "@ant-design/icons"
import type { TableColumnsType } from "antd"
import type { TableActionHandlers } from "../types"
import type { Contract } from "@/app/store/contracts/contracts.types"

const renderEllipsis = (value: any) => {
  if (value === null || value === undefined) return ""

  if (typeof value === "object") return ""

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={value}
    >
      {value}
    </div>
  )
}

const headerNoWrap = {
  whiteSpace: "nowrap" as const,
}

export const getContractColumns = (
  handlers: TableActionHandlers
): TableColumnsType<Contract> => [
  {
    dataIndex: "cmoName",
    key: "cmoName",
    title: "CMO Name",
    width: 180,
    sorter: (a, b) => a.cmoName.localeCompare(b.cmoName),
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    dataIndex: "relationshipOwner",
    key: "relationshipOwner",
    title: "Relationship Owner",
    width: 200,
    sorter: (a, b) =>
      a.relationshipOwner.localeCompare(b.relationshipOwner),
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    dataIndex: "typeOfAgreement",
    key: "typeOfAgreement",
    title: "Type Of Agreement",
    width: 160,
    sorter: (a, b) =>
      a.typeOfAgreement.localeCompare(b.typeOfAgreement),
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    dataIndex: "autoRenewTerms",
    key: "autoRenewTerms",
    title: "Auto Renew Terms",
    width: 160,
    sorter: (a, b) =>
      a.autoRenewTerms.localeCompare(b.autoRenewTerms),
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    dataIndex: "currentExpirationDate",
    key: "currentExpirationDate",
    title: "Current Expiration Date",
    width: 200,
    sorter: (a, b) =>
      a.currentExpirationDate.localeCompare(b.currentExpirationDate),
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    dataIndex: "notificationTime",
    key: "notificationTime",
    title: "Notification Time",
    width: 180,
    sorter: (a, b) =>
      a.notificationTime.localeCompare(b.notificationTime),
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    dataIndex: "forecastTimeHorizon",
    key: "forecastTimeHorizon",
    title: "Forecast - Time Horizon",
    width: 180,
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    dataIndex: "forecastBindingPeriod",
    key: "forecastBindingPeriod",
    title: "Forecast - Binding Period",
    width: 50,
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    dataIndex: "paymentTerms",
    key: "paymentTerms",
    title: "Payment Terms",
    width: 160,
    sorter: (a, b) => a.paymentTerms.localeCompare(b.paymentTerms),
    render: renderEllipsis,
    onHeaderCell: () => ({ style: headerNoWrap }),
  },
  {
    key: "actions",
    title: "Actions",
    width: 120,
    fixed: "right" as const,
    onHeaderCell: () => ({ style: headerNoWrap }),
    render: (_: unknown, record: Contract) => (
      <div className="flex items-center gap-2">
       <Tooltip title="Edit">
         <Button
          type="text"
          icon={<EditTwoTone twoToneColor="#306e9a" />}
          style={{color: "#306e9a"}}
          onClick={(e) => {
            e.stopPropagation()
            handlers.onEdit(record)
          }}
        >
          Edit
          </Button>
       </Tooltip>
        {record.version > 0 && (
          <Tooltip title="View Amendment History">
            <Button
            type="text"
            style={{color: "#306e9a"}}
            icon={<EyeTwoTone twoToneColor="#306e9a" />}
            onClick={(e) => {
              e.stopPropagation()
              handlers.showAuditLogClick(record)
            }}
          >
            View
            </Button>
          </Tooltip>
        )}
      </div>
    ),
  },
]