import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

function getStyles(name, selectedArray, theme) {
  return {
    fontWeight:
      selectedArray.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
  names,
  title,
  initialPersonalArray,
  setCurrentJobScheduling,
  name,
  section,
  allUsers,
  currentJobSchedulingObject,
}) {
  const theme = useTheme();
  const [selectedArray, setSelectedArray] = React.useState(
    initialPersonalArray || []
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedArray(typeof value === "string" ? value.split(",") : value);
  };

  React.useEffect(() => {
    if (section === "resourceAllocation") {
      let usersList = allUsers.filter((item) =>
        selectedArray.includes(item?.name)
      );
      setCurrentJobScheduling((pre) => {
        return {
          ...pre,
          resourceAllocation: {
            ...pre?.resourceAllocation,
            resourcesList: usersList,
          },
        };
      });
    }
    if (name === "locationList" || name === "subLocation") {
      setCurrentJobScheduling((pre) => {
        return {
          ...pre,
          [name]: selectedArray,
        };
      });
    }
  }, [selectedArray, initialPersonalArray]);

  React.useEffect(() => {
    setSelectedArray(initialPersonalArray);
  }, [initialPersonalArray]);

  // React.useEffect(() => {
  //   if (name === "subLocation") {
  //     setSelectedArray(currentJobSchedulingObject?.subLocation);
  //   }
  // }, [currentJobSchedulingObject?.locationList]);

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedArray || []}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedArray, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
