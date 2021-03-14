import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Select from "../Select";

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: 10,
  zIndex: 1000,
  "&> *": {
    width: 100,
    margin: "auto 10px",
    maxHeight: 40,
    height: 40,
    lineHeight: "40px",
    userSelect: "none",
  },
});

const PageSelect = styled(Select)({
  lineHeight: "20px",
  paddingTop: 12,
  borderRadius: 3,
  width: 75,
  border: "1px solid rgba(0,0,0,0.2)",
});

const TextLabel = styled(Box)({
  width: "fit-content",
});

const ActionsButtons = styled(Button)({
  width: 100,
  background: "#fff !important",
  color: "#008392",
  border: "1px solid rgba(0,0,0,0.2)",
});

const PageBlock = styled(Box)({
  width: "fit-content",
  padding: "0px 20px",
  background: "#008392 !important",
  color: "#fff",
  borderRadius: 3,
  border: "1px solid rgba(0,0,0,0.2)",
});

export { Container, ActionsButtons, TextLabel, PageBlock, PageSelect };
