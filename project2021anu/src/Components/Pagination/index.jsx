import React, { Component, useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import {
  Container,
  ActionsButtons,
  TextLabel,
  PageBlock,
  PageSelect,
} from "./styles";

const fetchTableAttributes = (tableRef) => {
  // console.log('tableref', tableRef);
  if (!tableRef || !tableRef.current) return {};
  const ref = tableRef.current;
  return {
    currentPage: ref.state.page,
    totalPages: 1 + Math.floor((ref.state.displayData.length - 1) / ref.state.rowsPerPage),
    rowsPerPage: ref.state.rowsPerPage,
    changeRowsPerPage: ref.changeRowsPerPage,
    rowsPerPageOptions: ref.state.rowsPerPageOptions.map((r) => ({
      value: r,
      label: r,
    })),
    changePage: ref.changePage,
    totalRows: ref.state.displayData.length,
  };
};

const Pagination = forwardRef(({ tableRef }, ref) => {
  const attrs = fetchTableAttributes(tableRef);
  window.a = tableRef;

  const [currentPage, setCurrentPage] = useState(attrs.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(attrs.rowsPerPage);
  const [totalPages, setTotalPages] = useState(attrs.totalPages);

  useImperativeHandle(ref, () => ({
    refreshPagination() {
      refresh();
    },
  }));

  const refresh = () => {
    const attrs = fetchTableAttributes(tableRef);
    // console.log("userEffect attrs", attrs);
    setCurrentPage(attrs.currentPage);
    setRowsPerPage(attrs.rowsPerPage);
    setTotalPages(attrs.totalPages);
  };

  // console.log(
  //   "tableRef.current.state.displayData.length",
  //   tableRef.current && tableRef.current.state.displayData.length
  // );

  useEffect(() => {
    refresh();
  }, [attrs]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage >= attrs.totalPages) return;
    setCurrentPage(nextPage);
    attrs.changePage(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    setCurrentPage(prevPage);
    attrs.changePage(prevPage);
  };

  const handleRowPerPageChange = (data) => {
    setRowsPerPage(data.value);
    attrs.changeRowsPerPage(data.value);
    setTotalPages(1 + Math.floor(attrs.totalRows / data.value));
  };
  return (
    <Container>
      <TextLabel>Show: </TextLabel>
      <PageSelect
        options={attrs.rowsPerPageOptions}
        menuPlacement="top"
        value={
          attrs.rowsPerPageOptions &&
          attrs.rowsPerPageOptions.filter((r) => r.value === rowsPerPage)[0]
        }
        onChange={handleRowPerPageChange}
      />
      <ActionsButtons disabled={currentPage === 0} onClick={handlePrevPage}>
        {"< Previous"}
      </ActionsButtons>
      <PageBlock>
        {currentPage + 1 || "-"} of {totalPages || "-"}
      </PageBlock>
      <ActionsButtons
        disabled={currentPage >= totalPages - 1}
        onClick={handleNextPage}
      >
        {"Next >"}
      </ActionsButtons>
    </Container>
  );
});

export default Pagination;
