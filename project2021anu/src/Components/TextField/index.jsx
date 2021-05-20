import React, { Component } from "react";
import { ReactTextField } from "./styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

const TextField = (props) => {
  const { icon, type, error, helperText } = props
  return <ReactTextField
    type={type || "string" }
    variant="outlined"
    error={error || false}
    helperText={helperText || ""}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {icon && <AccountCircle />}
        </InputAdornment>
      ),
    }}
    {...props}
  />
  };

export default TextField;