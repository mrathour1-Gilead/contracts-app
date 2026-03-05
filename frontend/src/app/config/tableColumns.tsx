/**
 * Table column definitions for contracts dashboard
 */

import { Button, Tag } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import type { TableActionHandlers } from "../types";
import type { Contract } from  "@/app/store/contracts/contracts.types"
import { getProgressColor, formatProgress } from "../utils";
import { BRAND_COLORS } from "../constants";

/**
 * Generate table columns with action handlers
 *
 */
export const getContractColumns = (
  handlers: TableActionHandlers
): TableColumnsType<Contract> => [
  {
    dataIndex: "cmoName",
    key: "cmoName",
    title: "CMO Name",
    sorter: (a, b) => a.cmoName.localeCompare(b.cmoName),
    width: 180,
  },
    {
    dataIndex: "relationshipOwner",
    key: "relationshipOwner",
    title: "Relationship Owner",
    sorter: (a, b) => a.relationshipOwner.localeCompare(b.relationshipOwner),
    width: 200,
  },
  {
    dataIndex: "typeOfAggrement",
    key: "typeOfAggrement",
    title: "Type Of Aggrement",
    sorter: (a, b) => a.typeOfAggrement.localeCompare(b.typeOfAggrement),
    width: 160,
  },
  {
    dataIndex: "autoRenewTerms",
    key: "autoRenewTerms",
    title: "Auto RenewTerms",
    sorter: (a, b) => a.autoRenewTerms.localeCompare(b.autoRenewTerms),
    width: 160,
  },
  {
    dataIndex: "currentExpirationDate",
    key: "currentExpirationDate",
    title: "Current Expiration Date",
    sorter: (a, b) => a.currentExpirationDate.localeCompare(b.currentExpirationDate),
    width: 200,
  },
  {
    dataIndex: "notificationTime",
    key: "notificationTime",
    title: "Notification Time",
    sorter: (a, b) => a.notificationTime.localeCompare(b.notificationTime),
    width: 180,
  },
  {
    dataIndex: "forecastTimeHorizon",
    key: "forecastTimeHorizon",
    title: "Forecast - Time Horizon",
    // sorter: (a, b) => a.supplierEntity2?.localeCompare(b?.supplierEntity2),
    width: 180,
  },
   {
    dataIndex: "forecastBindingPeriod",
    key: "forecastBindingPeriod",
    title: "Forecast - Binding Period",
    // sorter: (a, b) => a.supplierEntity2?.localeCompare(b?.supplierEntity2),
    width: 200,
  },
  {
    dataIndex: "paymentTerms",
    key: "Payment Terms",
    title: "paymentTerms",
    sorter: (a, b) => a.paymentTerms.localeCompare(b.paymentTerms),
    width: 160,
  },
  // {
  //   dataIndex: "progress",
  //   key: "progress",
  //   title: "Progress",
  //   // sorter: (a, b) => a.progress - b.progress,
  //   width: 200,
  //   render: (progress: number) => (
  //     <div className="flex items-center gap-3">
  //       <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
  //         <div
  //           className={`h-full rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
  //           style={{ width: `${progress}%` }}
  //         />
  //       </div>
  //       <span className="text-xs font-medium text-gray-700 min-w-[38px] text-right">
  //         {formatProgress(progress)}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   dataIndex: "status",
  //   key: "status",
  //   title: "Status",
  //   // sorter: (a, b) => a.status && b.status ? a.status.localeCompare(b.status) : null,
  //   width: 100,
  //   render: (status: string) => (
  //     <Tag
  //       color={status === "Active" ? "success" : "default"}
  //       className="px-2.5 py-1 rounded-sm text-xs font-semibold"
  //     >
  //       {status}
  //     </Tag>
  //   ),
  // },
  {
    key: "actions",
    title: "Actions",
    width: 120,
    fixed: "right" as const,
    render: (_: unknown, record: Contract) => (
      <div className="flex items-center gap-2">
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handlers.onView(record);
          }}
          className="text-[#306e9a] hover:text-[#265778] hover:bg-[#306e9a]/10"
          title="View"
        />
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handlers.onEdit(record);
          }}
          className="text-[#306e9a] hover:text-[#265778] hover:bg-[#306e9a]/10"
          title="Edit"
        />
      </div>
    ),
  },
];
