import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Pagination = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        alignContent: "center",
        gap: "20px",
      }}
    >
      <p style={{ marginTop: "13px" }}>Items per page:</p>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Page</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
      <p style={{ marginTop: "13px" }}>1 – 5 of 6</p>
    </div>
  );
};

export default Pagination;
