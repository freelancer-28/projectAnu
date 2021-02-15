import { styled } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const ReactTextField = styled(TextField)({
  zIndex: 1000,
  backgroundColor: "#fff",
  border: "none !important",
  '& .MuiOutlinedInput-root': {
    // margin: theme.spacing(1),
    width: '262px',
    height: '36px',
    backGround: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 2px 2px #3E474D26',
    border: '1px solid #D1D5D9',
    borderRadius: '3px',
    opacity: 1
  }
});

export { ReactTextField };
