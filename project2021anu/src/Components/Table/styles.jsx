import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableContainer = styled(Box)({
  // marginTop: "20vh",
  paddingTop: 10,
  // "& thead th:nth-child(2)": {
  //   width: "50%",
  // },
  // "& thead th:nth-child(3)": {
  //   width: "30%",
  // },
   "& tbody tr td:nth-child(5)": {
    textAlign: "center !important",
  },
});

const ProgressContainer = styled(Box)({
  // marginTop: "20vh",
  height: 400,
  textAlign: "center",
  paddingTop: 150,
  "& svg": {
    color: "#027784",
  },
});

const Main = styled(Box)({
    background: "#F4F5F6",
    height: "100%",
    padding: "0 10px",
});

const ExportButton = styled(Button)({
  width: "100%",
  background: "#fff !important",
  color: "rgba(0, 0, 0, 0.87)",
});

const ResetButton = styled(Button)({
  width: "100%",
  background: "#fff !important",
  color: "rgba(0, 0, 0, 0.87)",
});

const SubmitButton = styled(Button)({
  width: "100%",
  background: "#0a0a46 !important",
  color: "#fff",
});

const FormElementContainer = styled(FormControl)({
  padding: 10,
  background: "#fff",
  borderRadius: 4,
  "&> div::before, &> div::after": {
    border: "none !important",
  },
});

const ExpandTable = styled(Table)({
  background: "#fff",
  border: "5px solid #F4F5F6",
  width: "100%",
});

const ExpandTableRow = styled(TableRow)({
  background: "#fff",
  height: 60,
  border: "5px solid #F4F5F6",
});

const ExpandTableHead = styled(TableRow)({
  background: "#027784",
  color: "#fff",
  height: 60,
  border: "5px solid #F4F5F6",
  "& > td": {
    color: "#fff",
  },
});

const ExpandTableCell = styled(TableCell)({
  "&:first-child": {
    backgroundColor: "#F4F5F6",
  },
});

const TableHeadCell = styled(TableCell)({
  background: "#027784",
  color: "#fff",
});

const TableIconCell = styled(TableCell)({
  background: "transparent",
  color: "#027784",
  border: "none",
});

const SLAStatusText = styled(Box)(({ color, background }) => ({
  color,
  background,
  padding: "3px 10px",
  width: "fit-content",
  borderRadius: 12,
}));

const IconContainer = styled(FontAwesomeIcon)({
  marginLeft: 6
});

export {
  TableContainer,
  Main,
  Box,
  ExportButton,
  SubmitButton,
  ResetButton,
  FormElementContainer,
  ExpandTableRow,
  ExpandTableHead,
  ExpandTableCell,
  SLAStatusText,
  ExpandTable,
  ProgressContainer,
  TableHeadCell,
  IconContainer,
  TableIconCell,
};
