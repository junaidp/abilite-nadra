import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Pagination.css"
const Pagination = () => {
  return (
    <div
      className="pagination-wrap"
    >
      <p className="mt-13">Items per page:</p>

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
      <p className="mt-13">1 – 5 of 6</p>
    </div>
  );
};

export default Pagination;
