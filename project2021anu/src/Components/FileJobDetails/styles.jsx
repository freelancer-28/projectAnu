import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import MuiButton from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import MuiTextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonContainer = styled(Box)({
  // width: "100%",
  marginLeft: 10,
  paddingTop: 10,
  paddingBottom: 10,
  display: "flex",
  background: "#F4F5F6",
  justifyContent: "space-between",
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

const SaveButton = styled(MuiButton)({
  width: 100,
  color: "#fff",
  border: "1px solid #027784",
  marginLeft: 10,
  background: "#027784 !important",
});

const TextField = styled(MuiTextField)({
  width: 394,
  color: "#027784",
});

const IconContainer = styled(FontAwesomeIcon)({
  marginLeft: 6,
  color: '#027784'
});

export { LinkContainer, Box, Button, SaveButton, ButtonContainer, TextField, IconContainer };
