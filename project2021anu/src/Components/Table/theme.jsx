import { createMuiTheme } from "@material-ui/core/styles";

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      //   MUIDataTableHeadRow: {
      //     root: {
      //       backgroundColor: "#0a0a46",
      //       color: "#fff"
      //     },
      //   },
      MUIDataTableHeadCell: {
        root: {
          backgroundColor: "#027784",
          color: "#fff",
        },
        fixedHeader: {
          backgroundColor: "#027784",
          color: "#fff",
        },
        sortActive: {
          color: "#fff",
          backgroundColor: "#027784",
        },
      },
      MUIDataTableToolbar: {
        root: { display: "none" },
      },
      MUIDataTableSelectCell: {
        headerCell: {
          backgroundColor: "#F4F5F6",
        },
        fixedLeft: {
          background: "#F4F5F6",
        },
        checked: {
          color: "#008392 !important",
        },
      },
      MUIDataTableHead: {
        main: {
          borderBottom: "10px solid #F4F5F6",
        },
      },
      MUIDataTableBodyRow: {
        root: {
          borderTop: "5px solid #F4F5F6",
          background: "#fff",
          "&:hover": {
            background: "#ace2e8 !important",
            color: "#fff",
          },
        },
        // hover: {
        //   background: "red",
        //   color: "red",
        // },
      },
      MUIDataTableFooter: {
        root: {
          display: "none",
        },
      },
      MUIDataTableToolbarSelect: {
        root: {
          display: "none",
        },
      },
      //   MUIDataTable: {
      //     paper: {
      //       padding: "0 10px",
      //     },
      //   },
      MuiButton: {
        label: {
          textTransform: "none",
        },
      },
      MuiFormControl: {
        root: {
          width: "100%",
        },
      },
      MuiTableCell: {
        body: {
          padding: "5px"
          //   color: "green",
          //   background: "#fff",
        },
      },
    },
  });

export default getMuiTheme;
