import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

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
  singleJobSchedulingObject,
}) {
  const theme = useTheme();
  const { user } = useSelector((state) => state?.auth);
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
          disabled={
            singleJobSchedulingObject?.locked === true ||
            (singleJobSchedulingObject?.complete === true &&
              singleJobSchedulingObject?.locked === false &&
              user[0]?.userId?.employeeid?.userHierarchy !== "IAH")
              ? true
              : false
          }
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
