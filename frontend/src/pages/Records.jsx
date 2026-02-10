import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import DataGrid from "../components/DataGrid";
import clsx from "clsx";

// import {
//   Dropdown,
//   Menu,
//   MenuItem,
//   MenuButton,
//   Avatar,
//   Tooltip,
//   IconButton,
// } from "@mui/joy";
// import { MenuButton } from "@mui/base";
// import { exportToCSV, exportToExcel } from "../utils/exportDataUtils.tsx";
import { useDispatch, useSelector } from "react-redux";
// import { getSFAList, filterRecords } from "../slices/sfaSlice.ts";
// import { getColumns } from "../utils/columnsUtils.tsx";
// import getTwoLetterInitials from "../utils/helper.ts";
// import { resetAuth } from "../slices/authSlice.ts";

const Records = () => {
  const [open, setOpen] = useState(false);


  // const { listingLoader, isDataFetched, filteredRecords, sfaLists } =
    useSelector((state) => state.sfaSlice);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const drawerRef = useRef(null);
  const dataGridRef = useRef(null);

  const onRowClick = (params) => {
    // setEditData(params?.row);
    setOpen(true);
  };

  const tableData = []

  // const tableData = useMemo(
  //   () => filteredRecords,
  //   [filteredRecords]
  // );
  // const columns = useMemo(
  //   () => getColumns({ onRowClick, user }),
  //   [user]
  // );

  // const extractParams = () => {
  //   const filteredParams: any = {};
  //   if (!params.sfa_id) {
  //     getColumns({}).forEach((col: any) => {
  //       if (
  //         Object.keys(params).includes(col?.accessorKey)
  //       ) {
  //         filteredParams[col?.accessorKey] = params[col?.accessorKey];
  //       }
  //     });
  //   }
  //   setFilters(filteredParams);
  //   dispatch(getSFAList()).then((_: any) => {
  //     if (
  //       params &&
  //       // isDataFetched &&
  //       Object.keys(params).length > 0 &&
  //       !clearAllClicked &&
  //       !params.sfa_id
  //     ) {
  //       setOpen(true);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (editData) {
  //     setOpen(true);
  //   }
  // }, [editData]);

  // useEffect(() => {
  //   extractParams();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (isDataFetched) {
      dispatch(filterRecords({ filters: filters || {} }));
    }
  }, [dispatch, filters, isDataFetched]);

  // useEffect(() => {
  //   if (isDataFetched && params?.sfa_id) {
  //     const data = sfaLists.find((row) => row.sfa_id === params.sfa_id);
  //     const paramsData = { ...params };
  //     delete paramsData.sfa_id;
  //     setParams(paramsData);
  //     setEditData(data);
  //   }
  // }, [isDataFetched, params, params.sfa_id, sfaLists]);

  // const removeParams = useCallback(
  //   (__: any, param: any) => {
  //     const { [param[0]]: _, ...newState } = filters;
  //     setFilters(newState);
  //     dispatch(filterRecords({ filters: newState || {} }));
  //   },
  //   [dispatch, filters]
  // );

  const paramsData = { ...filters };
  // if (params.kpi_name && !clearAllClicked) {
  //   paramsData.kpi_name = params.kpi_name;
  // }

  const exportData = (type) => {
    const columnsData = columns.filter((row) => row.header !== "Actions");
    const rowsData = dataGridRef?.current?.getFilteredRows();
    if (type === "csv") {
      exportToCSV(columnsData, rowsData);
    } else {
      exportToExcel(columnsData, rowsData);
    }
  };

  const renderTopToolbarCustomActions = () => {
    return (
      <div className="flex items-center -mr-17 gap-2">
        <IconButton
          variant="plain"
          onClick={() => extractParams()}
          className={clsx(
            "text-red-700 cursor-pointer",
            listingLoader && "animate-spin"
          )}
        >
          <Tooltip title="Refresh" placement="top">
            <Icon width={17} height={17} icon="tdesign:refresh" />
          </Tooltip>
        </IconButton>
        <Dropdown>
          <MenuButton
            variant="plain"
            className="w-[20px]"
            startDecorator={
              <IconButton variant="plain" className="w-[20px]">
                <Icon width={20} height={20} icon="mdi:download" />
              </IconButton>
            }
          />

          <Menu>
            <MenuItem
              disabled={listingLoader}
              onClick={() => exportData("excel")}
            >
              Export To Excel
            </MenuItem>
            <MenuItem
              disabled={listingLoader}
              onClick={() => exportData("csv")}
            >
              Export To CSV
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-end gap-5 h-[35px]">
        {!!Object.entries(filters).length && (
          <Chip
            key="clear-all"
            chipName={["Clear All", "Clear All"]}
            onDeleteCB={() => {
              setFilters({});
              setClearAllClicked(true);
              dispatch(filterRecords({ filters: {} }));
            }}
          />
        )}
        {(user?.isAdmin || user?.isKpiOwner)  && (
          <div className="flex justify-end">
            <div className="ml-4">
              <Button
                btnName="+ Create"
                onClickCB={() => setOpen(true)}
                color="danger"
                variant="outlined"
                className="!px-2 !text-md"
                size="md"
              />
            </div>
          </div>
        )}
        <Dropdown>
          <MenuButton
            size="sm"
            sx={{
              borderRadius: "50%",
            }}
            variant="plain"
          >
            <Tooltip title={user?.email} placement="top">
              <Avatar>{getTwoLetterInitials(user?.email)}</Avatar>
            </Tooltip>
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => dispatch(resetAuth())}>
              <Icon
                icon="material-symbols-light:login-outline"
                width="24"
                height="24"
              />
              Log Out
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      {/* <div className="flex items-center gap-2 flex-wrap mt-5">
        {Object.entries(filters).map((param, index) => (
          <Chip key={index} chipName={param} onDeleteCB={removeParams} />
        ))}
      </div> */}
      <DataGrid
        ref={dataGridRef}
        // loading={listingLoader}
        className="mt-4"
        rows={tableData}
        columns={columns}
        handleRowClick={onRowClick}
        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      />
    </>
  );
};

export default Records;