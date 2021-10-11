import React, { Component } from "react";
import { ReactSelect, ReactSelectStyles } from "./styles";

const Select = (props) => (
  <ReactSelect
    styles={ReactSelectStyles}
    {...props}
  />
);

export default Select;