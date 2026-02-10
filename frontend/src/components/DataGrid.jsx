import React, { forwardRef, memo, useImperativeHandle } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";


const DataGrid = memo(
  forwardRef((props, ref) => {
    const {
      className = "",
      columns = [],
      rows = [],
      loading = false,
      checkboxSelection = false,
      rowSelection = false,
      disableFilter = false,
      disableMultipleRowSelection = true,
      handleRowClick = () => {},
      dataGridProps = {},
      renderTopToolbarCustomActions = () => {},
    } = props;

    const table = useMaterialReactTable({
      columns,
      data: rows,
      enableColumnPinning: false,
      enableRowSelection: checkboxSelection || rowSelection,
      enableMultiRowSelection: !disableMultipleRowSelection,
      enableSorting: true,
      enableFilters: !disableFilter,
      enableRowVirtualization: true,
      enablePagination: false,
      enableColumnResizing: true,
      enableDensityToggle: false,
      enableStickyHeader: true,
      enableFullScreenToggle: false,
      enableBottomToolbar: false,
      enableHiding: false,
      state: { isLoading: loading },
      initialState: {
        // pagination: {
        //   pageSize: 100,
        //   pageIndex: 0,
        // },
        columnPinning: {
          left: ["sfa_id"],
          right: ["actions"],
        },
      },
      muiTableContainerProps: {
        sx: {
          maxHeight: "calc(100vh - 340px)",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "5px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#5f0f1e",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#5f0f1e",
          },
        },
        className,
      },
      muiTableBodyRowProps: ({ row }) => ({
        onClick: () => handleRowClick({ row: row.original }),
        sx: { cursor: "pointer" },
      }),
      // columnFilterDisplayMode: "popover",
      // muiTablePaginationProps: {
      //   rowsPerPageOptions : [10,25,50,100],
      // },
      renderTopToolbarCustomActions,
      ...dataGridProps,
    });

    // Expose filtered rows for export
    useImperativeHandle(ref, () => ({
      getFilteredRows: () =>
        table.getFilteredRowModel().rows.map((r) => r.original),
    }));

    return <MaterialReactTable table={table} />;
  })
);

export default DataGrid;
