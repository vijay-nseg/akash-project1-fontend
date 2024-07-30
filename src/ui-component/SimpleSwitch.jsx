import Switch from "@mui/material/Switch";
import React from "react";

export default function SimpleSwitch({id, value, changeHandler}) {
  const [state, setState] = React.useState({
    checked: !!value,
  });
  
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
    console.log(state.checked);
    changeHandler(Number(id), state.checked)
  };
  
  return (
    <Switch
    color="primary"
        value="status"
        checked={state.checked}
        onChange={handleChange("checked")}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
  );
}
