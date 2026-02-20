/**
 * Dashboard view component displaying contracts table and action buttons
 */

import { memo } from "react";
import { Table, Button, Tooltip } from "antd";
import {
  PlusOutlined,
  CloudUploadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { Contract, TableActionHandlers } from "../../types";
import { getContractColumns } from "../../config/tableColumns";
import { TABLE_CONFIG, BRAND_COLORS } from "../../constants";

interface DashboardViewProps {
  contracts: Contract[];
  loading: boolean;
  onAddContract: () => void;
  onReload: () => void;
  onRowClick: (contract: Contract) => void;
  onViewContract: (contract: Contract) => void;
  onEditContract: (contract: Contract) => void;
}

export const DashboardView = memo(({
  contracts,
  loading,
  onAddContract,
  onReload,
  onRowClick,
  onViewContract,
  onEditContract,
}: DashboardViewProps) => {
  const actionHandlers: TableActionHandlers = {
    onView: onViewContract,
    onEdit: onEditContract,
  };

  const columns = getContractColumns(actionHandlers);

  return (
    <div className="bg-white border border-gray-100 overflow-hidden mt-3">
      <div className="bg-white border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Contracts Summery
            </h2>
            <p className="text-sm text-gray-600">
              Provides visibility into approved contract rates, validity
              periods, and site coverage.
            </p>
          </div>
          <div className="flex gap-4">
            {/* Reload button */}
            <Tooltip title="Reload">
              <Button
                type="text"
                icon={
                  <ReloadOutlined
                    style={{
                      fontSize: "16px",
                      color: BRAND_COLORS.primary,
                    }}
                  />
                }
                onClick={onReload}
                size="middle"
                className="flex items-center justify-center"
                style={{
                  padding: "4px 8px",
                }}
              />
            </Tooltip>

            {/* Bulk Upload button */}
            <Button
              type="default"
              icon={
                <CloudUploadOutlined
                  style={{
                    color: BRAND_COLORS.primary,
                  }}
                />
              }
              size="middle"
              className="shadow-lg font-semibold"
              style={{
                color: BRAND_COLORS.primary,
              }}
            >
              Bulk Upload
            </Button>

            {/* Add New Contract button */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onAddContract}
              size="middle"
              className="shadow-lg font-semibold"
            >
              Add New Contract
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={contracts}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: TABLE_CONFIG.defaultPageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} items`,
          }}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
            className: "cursor-pointer hover:bg-[#306e9a]/5",
          })}
          scroll={{ x: TABLE_CONFIG.scrollX, y: TABLE_CONFIG.scrollY }}
          locale={{
            emptyText:
              "No contracts yet. Click 'Add New Contract' to get started.",
          }}
        />
      </div>
    </div>
  );
});

DashboardView.displayName = "DashboardView";
