import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Select from "react-select";

const ReactSelectStyles = {
    container: (provided,state) =>( {
...provided,
 paddingTop:12,
 boxShadow: "1px 2px 4px 2px rgba(0, 0, 0, 0.07)"
    }),
  menu: (provided, state) => ({
    ...provided,
    // width: state.selectProps.width,
    borderBottom: "none",
    color: state.selectProps.menuColor,
    marginTop: 2,
    marginBottom: 0,
    width:'fit-content',
    minWidth: '100%',
    maxWidth: '270%'
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    color: state.isSelected ? "#fff" : "#687681",
    backgroundColor: state.isSelected ? "#027784" : "white",
    ":hover": {
      backgroundColor: "#027784",
      color: "#fff",
    },
  }),
control: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    border: "none !important",
    boxShadow: "none",
    marginTop: -10,
    height: 35,
  }),
  indicatorSeparator: (provided) => ({
    visibility: "hidden",
    ...provided,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return {
      ...provided,
      opacity,
      transition,
      color: "#027784",
    };
  },
  placeholder: (provided, state) => ({
      ...provided,
      color: '#687681'
  })
};
const ReactSelect = styled(Select)({
  zIndex: 1000,
  backgroundColor: "#fff",
  border: "none !important",
});

export { ReactSelect, ReactSelectStyles, Box };

