import { memo, useEffect, useRef, useState } from "react"
import { Table, Button, Tooltip, Input } from "antd"
import {
  PlusOutlined,
  CloudUploadOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons"

import { Contract } from "@/app/store/contracts/contracts.types"
import { getContractColumns } from "../../config/tableColumns"
import { TABLE_CONFIG, BRAND_COLORS } from "../../constants"
import { useAppSelector, useAppDispatch } from "@/app/store/hooks"
import { fetchContracts } from "@/app/store/contracts/contractsThunks"
import { resetPagination } from "@/app/store/contracts/contractsSlice"

interface DashboardViewProps {
  onAddContract: () => void
  onViewContract: (contract: Contract) => void
  onEditContract: (contract: Contract) => void
  showAuditLog: (contract: Contract) => void
}

export const DashboardView = memo(
  ({
    onAddContract,
    onViewContract,
    onEditContract,
    showAuditLog,
  }: DashboardViewProps) => {
    const dispatch = useAppDispatch()

    const { contractLists, loading, totalCount, page, lastKeyMap } =
      useAppSelector((state) => state.contracts)

    const [searchText, setSearchText] = useState("")
    const [searchUsed, setSearchUsed] = useState(false)

    const debounceTimer = useRef<number | null>(null)
    const skipNextSearchEffect = useRef(true)


    useEffect(() => {
      dispatch(resetPagination())
      dispatch(fetchContracts({ page: 1, search: "" }))
    }, [])


    useEffect(() => {
      if(!searchUsed) return
      if (skipNextSearchEffect.current) {
        skipNextSearchEffect.current = false
        return
      }

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
    }, [searchText])


    const onReload = () => {
      if (loading.list) return

      // prevent debounce-triggered fetch
      skipNextSearchEffect.current = true

      setSearchText("")
      setSearchUsed(false)
      dispatch(resetPagination())
      dispatch(fetchContracts({ page: 1, search: "" }))
    }

    const onViewClick = (record: Contract) => {
      const data = contractLists.find((i) => i.id === record.id)
      if (data) {
        onViewContract(data)
      }
    }

    const onEditClick = (record: Contract) => {
      const data = contractLists.find((i) => i.id === record.id)
      if (data) {
        // onRowClick(data)
        onEditContract(data)
      }
    }

    const actionHandlers = {
      onView: onViewClick,
      onEdit: onEditClick,
      showAuditLogClick: showAuditLog
    }

    const columns = getContractColumns(actionHandlers);


    return (
      <div className="bg-white border border-gray-100 overflow-hidden mt-3">
        <div className="bg-white border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Contracts Summary
              </h2>
              <p className="text-sm text-gray-600">
                Provides visibility into approved contract rates,
                validity periods, and site coverage.
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <Input
                placeholder="Search contracts..."
                prefix={
                  <SearchOutlined style={{ color: BRAND_COLORS.primary }} />
                }
                value={searchText}
                onChange={(e) => {
                  setSearchUsed(true)
                  setSearchText(e.target.value)
                }}
                allowClear
                style={{ width: 360 }}
                readOnly={loading.list}
              />

              <Tooltip title="Reload">
                <Button
                  // type="text"
                  icon={
                    <ReloadOutlined
                      spin={loading.list}
                      style={{ color: BRAND_COLORS.primary }}
                    />
                  }
                  onClick={onReload}
                />
              </Tooltip>

              <Button
                type="default"
                icon={<CloudUploadOutlined />}
                style={{ color: BRAND_COLORS.primary }}
              >
                Bulk Upload
              </Button>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onAddContract}
              >
                Add New Contract
              </Button>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={contractLists}
            rowKey="id"
            loading={loading.list}
            pagination={{
              current: page,
              pageSize: TABLE_CONFIG.defaultPageSize,
              total: totalCount,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
              onChange: (nextPage) => {
                if (lastKeyMap[nextPage] !== undefined) {
                  dispatch(fetchContracts({ page: nextPage, search: searchText }))
                }
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
    )
  }
)

DashboardView.displayName = "DashboardView"