import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectComponent = ({
  list,
  name,
  setCurrentJobScheduling,
  value,
  label,
}) => {
  function handleChange(event) {
    setCurrentJobScheduling((pre) => {
      return {
        ...pre,
        [name]: { name: event?.target?.value },
      };
    });
  }
  return (
    <FormControl variant="filled" sx={{ width: "100%" }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">Select User</MenuItem>
        {list?.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
