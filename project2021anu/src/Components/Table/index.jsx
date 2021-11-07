import React, { useState, useEffect, useRef } from "react";
import DTable, { ExpandButton } from "mui-datatables";
import Pagination from "../Pagination";
import { MuiThemeProvider } from "@material-ui/core/styles";
import getMuiTheme from "./theme";

import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";

import {
  faSort,
  faSortUp,
  faSortDown,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

import {
  TableContainer,
  Box,
  Main,
  TableHeadCell,
  TableIconCell,
  IconContainer,
} from "./styles";
import TextField from "../TextField";
import Select from "../Select";

const Table = (props) => {

  console.log(props.selectableRows)
  let selectableRowsOption = props.selectableRows !== undefined ? props.selectableRows : true
  const columnWithSortIcon = (columnMeta, handleToggleColumn, sortOrder) => {
    let icon = faSort;
    if (columnMeta.name === sortOrder.name) {
      icon = sortOrder.direction === "asc" ? faSortDown
        : sortOrder.direction === "desc"
          ? faSortUp
          : faSort;
    }
  
    return (
      <TableHeadCell
        key={columnMeta.index}
        onClick={() => handleToggleColumn(columnMeta.index)}
        style={{ cursor: "pointer" }}
      >
        {columnMeta.name}
        <IconContainer icon={icon} />
      </TableHeadCell>
    );
  };
  
  const customWidthCellContent = ({ width, value }) => {
    // console.log(value.name)
    if(typeof value === "function") {
      if(value.name === "applicationname"){
        const appNamesOptions = [
          {
            "value": "PSP",
            "label": "PSP"
          },
          {
            "value": "Saphire",
            "label": "Saphire"
          }
        ]
        return (
          <Select
              // value={appNamesOptions[0]}
              options={appNamesOptions}
              onChange={value}
              isLoading={!(appNamesOptions && appNamesOptions.length)}
              placeholder="Application Name"
            />
        )
      }
      return <TextField onChange={value}></TextField>
    } else {
      return <div style={{ width, overflowWrap: 'anywhere' }}>{value}</div>
    }
  }
  
  // const onEditRow = (rowIndex) => {
  //   console.log(rowIndex)
  // }
  
  const columnWithEndIcon = (columnMeta, handleToggleColumn, sortOrder) => {
    console.log(columnMeta)
    return (
      columnMeta && <TableIconCell key={columnMeta.index} style={{ cursor: "pointer" }}>
        <IconContainer onClick={()=>props.onEditRow(handleToggleColumn.rowIndex)} icon={faEdit} />
      </TableIconCell>
    );
  };
  
  const getTableOptions = ({ paginationRef }) => ({
    // filter: true,
    // filterType: "dropdown",
    responsive: "standard",
    rowsPerPageOptions: [10, 25, 100],
    expandableRows: false,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    elevation: 0,
    export: false,
    print: false,
    search: true,
    download: false,
    filter: true,
    viewColumns: true,
    // sort: true,
    selectableRows: selectableRowsOption,
    onFilterChange: () => {
      paginationRef.current && paginationRef.current.refreshPagination();
    },
    // customToolbar: () => <div />,
    // customToolbarSelect: () => <div />,
    // searchOpen: true,
    //   isRowExpandable: (dataIndex, expandedRows) => {
    //     if (dataIndex === 3 || dataIndex === 4) return false;
  
    //     // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
    //     if (
    //       expandedRows.data.length > 4 &&
    //       expandedRows.data.filter((d) => d.dataIndex === dataIndex).length === 0
    //     )
    //       return false;
    //     return true;
    //   },
    // rowsExpanded: [0, 1],
    // renderExpandableRow: (rowData, rowMeta) => {
    //   return [
    //     <ExpandTableHead className="expand-content">
    //       <ExpandTableCell colSpan={1}></ExpandTableCell>
    //       {rowData.map((d) => (
    //         <ExpandTableCell colSpan={1}>{d}</ExpandTableCell>
    //       ))}
    //     </ExpandTableHead>,
    //     [1, 2, 3].map(() => {
    //       return (
    //         <ExpandTableRow className="expand-content">
    //           <ExpandTableCell colSpan={1}></ExpandTableCell>
    //           <ExpandTableCell colSpan={1}></ExpandTableCell>
    //           <ExpandTableCell colSpan={1}></ExpandTableCell>
    //           {rowData.map((d) => (
    //             <ExpandTableCell colSpan={1}>{d}</ExpandTableCell>
    //           ))}
    //         </ExpandTableRow>
    //       );
    //     }),
    //   ];
    // },
    //   renderExpandableRow: (rowData, rowMeta, a) => {
    //     return (
    //       <TableRow>
    //         <TableCell colSpan={1} />
    //         <TableCell colSpan={rowData.length - 1}>
    //           <Table
    //             className="expandFileDataTable"
    //             title={"Employee list"}
    //             data={[
    //               {
    //                 id: "ABC123",
    //                 date: "2020-06-24T06:36:46.728Z",
    //                 type: "Fire",
    //                 description: "Hot",
    //                 instructions: "",
    //               },
    //               {
    //                 id: "DEF456",
    //                 date: "2020-06-24T06:36:46.728Z",
    //                 type: "Water",
    //                 description: "Wet",
    //                 instructions: "",
    //               },
    //             ]}
    //             columns={[
    //               {
    //                 name: "id",
    //                 label: "ID",
    //               },
    //               {
    //                 name: "type",
    //                 label: "Type",
    //               },
    //               {
    //                 name: "description",
    //                 label: "Description",
    //               },
    //               {
    //                 name: "date",
    //                 label: "Date",
    //               },
    //             ]}
    //             options={{
    //               download: false,
    //               filter: false,
    //               pagination: false,
    //               print: false,
    //               search: false,
    //               viewColumns: false,
    //               expandableRowsHeader: false,
    //               elevation: 0,
    //               selectableRows: "none",
    //               selectToolbarPlacement: "none",
    //               fixedSelectColumn: false,
    //             }}
    //             components={components}
    //           />
    //         </TableCell>
    //       </TableRow>
    //     );
    //   },
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) =>
      console.log(curExpanded, allExpanded, rowsExpanded),
  });
  
  const components = {
    ExpandButton: function (props) {
      if (props.dataIndex === 3 || props.dataIndex === 4)
        return <div style={{ width: "24px" }} />;
      return <ExpandButton {...props} />;
    },
  };
  
  const parseColumns = (columns) => {
    const temp = columns.map((c) => {
      const options = {
        sortThirdClickReset: true,
        customHeadRender: c.sort ? columnWithSortIcon : () => <TableHeadCell>{c.name}</TableHeadCell>,
        customBodyRender: (value, tableMeta, updateValue) => customWidthCellContent({ value, width: c.width || '9em' }),
        ...c.options,
      };
  
      return {
        name: c.name,
        options,
      };
    });
    console.log('********')
    // console.log(temp[0].options.customBodyRender)
    console.log('********')
    temp.push({
      name: "",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => columnWithEndIcon(value),
      },
    });
    return temp;
  };

  const tableRef = useRef(null);
  const paginationRef = useRef(null);
  const columns = parseColumns(props.columns);

  const tableData = (props.data || []).map((row) => [...row, "icon-right"]);
  console.log(tableData)
  tableData.map(x=> {
    if(x.length && typeof x[0] === "function"){
      x[4]=null
    }
    return x
  })
  console.log(tableData)

  // // useEffect(() => {}, []);

  // useEffect(() => {
  //   // fetchProducerFiltersFromServer();
  //   fetchFileDataFromServer();
  //   // return () => { console.log('useEffectProps', props) }
  // }, []);

  // const fetchFileDataFromServer = async () => {
  //   // dispatch(updateProducerOptions([]));
  //   const adminData = await adminAPIs.fetchData();
  //   console.log('adminData', adminData);
  //   // dispatch(updateProducerOptions(producerOptions));
  // };

console.log("----------------")
console.log(props.data)

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <Main>
        <TableContainer>
          <DTable
            className="fileDataTable"
            ref={tableRef}
            title={props.title}
            data={tableData}
            columns={columns}
            options={getTableOptions({ paginationRef })}
            components={components}
          />
        </TableContainer>
        <Pagination tableRef={tableRef} ref={paginationRef} />
      </Main>
    </MuiThemeProvider>
  );
};

export default Table;
