import React, { Component } from "react";
import { ReactTextField } from "./styles";

const TextField = (props) => (
  <ReactTextField
    type="string"
    variant="outlined"
    {...props}
  />
);

export default TextField;