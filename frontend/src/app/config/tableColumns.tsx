/**
 * Table column definitions for contracts dashboard
 */

import { Button, Tag } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import type { Contract, TableActionHandlers } from "../types";
import { getProgressColor, formatProgress } from "../utils";
import { BRAND_COLORS } from "../constants";

/**
 * Generate table columns with action handlers
 */
export const getContractColumns = (
  handlers: TableActionHandlers
): TableColumnsType<Contract> => [
  {
    dataIndex: "cmoParent",
    key: "cmoParent",
    title: "CMO Parent",
    sorter: (a, b) => a.cmoParent.localeCompare(b.cmoParent),
    render: (text: string) => (
      <span className="text-[#306e9a] font-medium hover:underline cursor-pointer">
        {text}
      </span>
    ),
    width: 180,
  },
  {
    dataIndex: "cmoName",
    key: "cmoName",
    title: "CMO Name",
    sorter: (a, b) => a.cmoName.localeCompare(b.cmoName),
    width: 180,
  },
  {
    dataIndex: "yearSpend",
    key: "yearSpend",
    title: "Year Spend (M$)",
    sorter: (a, b) => Number(a.yearSpend) - Number(b.yearSpend),
    width: 130,
  },
  {
    dataIndex: "signingEntity1",
    key: "signingEntity1",
    title: "Signing Entity 1",
    sorter: (a, b) => a.signingEntity1.localeCompare(b.signingEntity1),
    width: 180,
  },
  {
    dataIndex: "supplierEntity2",
    key: "supplierEntity2",
    title: "Supplier Entity 2",
    sorter: (a, b) => a.supplierEntity2.localeCompare(b.supplierEntity2),
    width: 180,
  },
  {
    dataIndex: "location",
    key: "location",
    title: "Location",
    sorter: (a, b) => a.location.localeCompare(b.location),
    width: 160,
  },
  {
    dataIndex: "territory",
    key: "territory",
    title: "Territory",
    sorter: (a, b) => a.territory.localeCompare(b.territory),
    width: 120,
  },
  {
    dataIndex: "relationshipOwner",
    key: "relationshipOwner",
    title: "Relationship Owner",
    sorter: (a, b) => a.relationshipOwner.localeCompare(b.relationshipOwner),
    width: 160,
  },
  {
    dataIndex: "progress",
    key: "progress",
    title: "Progress",
    sorter: (a, b) => a.progress - b.progress,
    width: 200,
    render: (progress: number) => (
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-700 min-w-[38px] text-right">
          {formatProgress(progress)}
        </span>
      </div>
    ),
  },
  {
    dataIndex: "status",
    key: "status",
    title: "Status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    width: 100,
    render: (status: string) => (
      <Tag
        color={status === "Active" ? "success" : "default"}
        className="px-2.5 py-1 rounded-sm text-xs font-semibold"
      >
        {status}
      </Tag>
    ),
  },
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
