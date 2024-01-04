import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectComponent = () => {
  const [year, setYear] = React.useState();
  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 180 }}>
      <InputLabel id="demo-simple-select-filled-label">Year</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={year}
        onChange={(e) => setYear(e.target.year)}
      >
        <MenuItem value=""></MenuItem>
        <MenuItem value={2023}>2023</MenuItem>
        <MenuItem value={2024}>2024</MenuItem>
        <MenuItem value={2025}>2025</MenuItem>
        <MenuItem value={2026}>2026</MenuItem>
        <MenuItem value={2027}>2027</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
