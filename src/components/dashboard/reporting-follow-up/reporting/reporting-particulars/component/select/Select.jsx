import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectComponent = ({ list, setReports, value, label, id, allUsers }) => {
  function handleChange(event) {
    setReports((pre) =>
      pre.map((item) =>
        Number(item?.id) === Number(id)
          ? {
              ...item,
              auditee: allUsers?.find(
                (user) => user?.name === event?.target?.value
              ),
            }
          : item
      )
    );
  }
  return (
    <>
      {list?.length !== 0 && (
        <FormControl variant="filled" sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value || ""}
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
      )}
    </>
  );
};

export default SelectComponent;
