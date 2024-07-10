import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const SelectComponent = ({
  list,
  name,
  setCurrentJobScheduling,
  value,
  label,
  allUsers,
  singleJobSchedulingObject,
}) => {
  const { user } = useSelector((state) => state?.auth);
  function handleChange(event) {
    setCurrentJobScheduling((pre) => {
      return {
        ...pre,
        resourceAllocation: {
          ...pre?.resourceAllocation,
          [name]: allUsers?.find((user) => user?.name === event?.target?.value),
        },
      };
    });
  }
  return (
    <>
      {list?.length !== 0 && (
        <FormControl variant="filled" sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={handleChange}
            disabled={
              singleJobSchedulingObject?.locked === true ||
              (singleJobSchedulingObject?.complete === true &&
                singleJobSchedulingObject?.locked === false &&
                user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
                ? true
                : false
            }
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
