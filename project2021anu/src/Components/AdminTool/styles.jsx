import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import MuiButton from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

const ButtonContainer = styled(Box)({
  width: "100%",
  paddingTop: 10,
  display: "flex",
  background: "#F4F5F6",
  justifyContent: "flex-end",
  paddingRight: 10,
});

const LinkContainer = styled(Link)({
  color: "#027784",
});

const Button = styled(MuiButton)({
  width: 100,
  color: "#027784",
  border: "1px solid #027784",
  marginLeft: 10,
  background: "#fff !important",
});

export { LinkContainer, Box, Button, ButtonContainer };
