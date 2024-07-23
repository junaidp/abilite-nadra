import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectComponent = ({ value, handleChange, users, label }) => {
  return (
    <>
      {users?.length !== 0 && (
        <FormControl variant="filled" sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            name="auditee"
            onChange={handleChange}
          >
            <MenuItem value="">Select User</MenuItem>
            {users
              ?.filter(
                (user) =>
                  user?.employeeid?.userHierarchy === "Management_Auditee"
              )
              ?.map((user, index) => {
                return (
                  <MenuItem value={user?.id} key={index}>
                    {user?.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default SelectComponent;
