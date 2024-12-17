import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const SelectComponent = ({
  title,
  names,
  initialPersonalArray,
  name,
  setCurrentJobScheduling,
  singleJobSchedulingObject,
}) => {
  const { user } = useSelector((state) => state?.auth);

  const [value, setValue] = React.useState("");

  function handleChange(event) {
    if (event.target.value) {
      setValue(event.target.value);
      if (name === "locationList") {
        setCurrentJobScheduling((pre) => {
          return {
            ...pre,
            [name]: [event.target.value],
            subLocation: [],
          };
        });
      } else {
        setCurrentJobScheduling((pre) => {
          return {
            ...pre,
            [name]: [event.target.value],
          };
        });
      }
    }
  }

  React.useEffect(() => {
    if (initialPersonalArray.length) {
      setCurrentJobScheduling((pre) => {
        return {
          ...pre,
          [name]: [initialPersonalArray[0]],
        };
      });
      setValue(initialPersonalArray[0]);
    }
  }, [initialPersonalArray]);

  return (
    <>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
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
          <MenuItem value="">Select {title}</MenuItem>
          {names?.map((item, index) => {
            return (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectComponent;
