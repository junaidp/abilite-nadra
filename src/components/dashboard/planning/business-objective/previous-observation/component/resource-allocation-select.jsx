import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ResourceAllocationSelect = ({ label, value, setValues, name, users }) => {
  function handleChange(event) {
    setValues((pre) => {
      return {
        ...pre,
        resourceAllocation: {
          ...pre?.resourceAllocation,
          [name]: users?.find((user) => user?.id === event?.target?.value)?.id,
        },
      };
    });
  }
  return (
    <>
      {users?.length !== 0 && (
        <FormControl variant="filled" sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={handleChange}
          >
            <MenuItem value="">Select User</MenuItem>
            {users
              ?.filter(
                (user) =>
                  user?.employeeid?.userHierarchy !== "IAH" &&
                  user?.employeeid?.userHierarchy !== "Management_Auditee"
              )
              ?.map((item, index) => {
                return (
                  <MenuItem value={item?.id} key={index}>
                    {item?.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default ResourceAllocationSelect;
