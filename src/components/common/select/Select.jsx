import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { changeKickOffRequest } from "../../../global-redux/reducers/common/slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function SelectLabels() {
  let { kickOffRequest } = useSelector((state) => state.common);
  let dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(changeKickOffRequest(event?.target?.value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={kickOffRequest}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Postponed">Postponed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Kick-Off">Kick-Off</MenuItem>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
