import { memo, useEffect, useRef, useState } from "react";
import { Table, Button, Tooltip, Input } from "antd";
import {
  PlusOutlined,
  CloudUploadOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type {
  TableActionHandlers,
} from "../../types";
import { Contract } from "@/app/store/contracts/contracts.types"
import { getContractColumns } from "../../config/tableColumns";
import { TABLE_CONFIG, BRAND_COLORS } from "../../constants";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { fetchContracts } from "@/app/store/contracts/contractsThunks";
import { resetPagination } from "@/app/store/contracts/contractsSlice";

interface DashboardViewProps {
  onAddContract: () => void;
  onRowClick: (contract: Contract) => void;
  onViewContract: (contract: Contract) => void;
  onEditContract: (contract: Contract) => void;
}

export const DashboardView = memo(
  ({
    onAddContract,
    onRowClick,
    onViewContract,
    onEditContract,
  }: DashboardViewProps) => {
    const [searchText, setSearchText] = useState("");
    const debounceTimer = useRef<number | null>(null)
    const dispatch = useAppDispatch();
    const { contractLists, loading, totalCount, page } = useAppSelector((state) => state.contracts);

    useEffect(() => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      debounceTimer.current = window.setTimeout(() => {
        dispatch(resetPagination())
        dispatch(fetchContracts({ page: 1, search: searchText }))
      }, 750)


      return () => {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current)
        }
      }
    }, [searchText, dispatch])

    const onViewClick = (itemData: Contract) => {
      const data = contractLists.find((item: Contract) => item.id === itemData.id);

      if (data) {
        onRowClick(data)
        onViewContract(data)
      }
    }
    const actionHandlers: TableActionHandlers = {
      onView: onViewClick,
      onEdit: onEditContract,
    };

    type Primitive = string | number | boolean | null;
    type TableRow = Record<string, Primitive>;
    const keepPrimitiveKeyValues = (
      records: Contract[]
    ): Record<string, Contract>[] => {
      const array = Array.isArray(records) ? records : [records];
      return array.map((record) =>
        Object.entries(record).reduce<Record<string, Contract>>(
          (acc, [key, value]) => {
            if (
              value === null ||
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              acc[key] = value;
            }
            return acc;
          },
          {}
        )
      );
    };


    const columns = getContractColumns(actionHandlers);


    // Filter contracts based on search text
    const filteredContracts: any[] = keepPrimitiveKeyValues(contractLists)

    const onReload = () => {
      if(loading.list) return;
      setSearchText("")
    }

    return (
      <div className="bg-white border border-gray-100 overflow-hidden mt-3">
        <div className="bg-white border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Contracts Summery
              </h2>
              <p className="text-sm text-gray-600">
                Provides visibility into approved contract
                rates, validity periods, and site coverage.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              {/* Search input box */}
              <Input
                placeholder="Search contracts..."
                prefix={
                  <SearchOutlined
                    style={{ color: BRAND_COLORS.primary }}
                  />
                }
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                style={{ width: 360 }}
                className="shadow-sm"
                disabled={loading.list}
              />

              {/* Reload button */}
              <Tooltip title="Reload">
                <Button
                  type="text"
                  icon={
                    <ReloadOutlined
                      spin={loading.list}
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
            dataSource={filteredContracts}
            rowKey="id"
            loading={loading.list}
            pagination={{
              current: page,
              pageSize: TABLE_CONFIG.defaultPageSize,
              total: totalCount,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
              onChange: (page) => {
                dispatch(fetchContracts({ page, search: searchText }))
              },
            }}
            onRow={(record) => ({
              onClick: () => onViewClick(record),
              className: "cursor-pointer hover:bg-[#306e9a]/5",
            })}
            scroll={{
              x: TABLE_CONFIG.scrollX,
              y: TABLE_CONFIG.scrollY,
            }}
            locale={{
              emptyText:
                "No contracts yet. Click 'Add New Contract' to get started.",
            }}
          />
        </div>
      </div>
    );
  },
);

DashboardView.displayName = "DashboardView";