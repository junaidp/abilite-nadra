import React, { useCallback, useMemo } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

/**
 * SelectComponent
 * A wrapper around MUI Select for choosing an auditee user.
 *
 * @param {Array<string>} list - Options to render in dropdown.
 * @param {Function} setReport - State updater for reports.
 * @param {string} value - Currently selected value.
 * @param {string} label - Label text for the select.
 * @param {string|number} id - Reporting item id.
 * @param {Array<Object>} allUsers - Full users list for mapping selected user.
 * @param {boolean} disabled - Whether select is disabled.
 */
const SelectComponent = ({
  list = [],
  setReport,
  value,
  label,
  id,
  allUsers = [],
  disabled = false,
}) => {
  /**
   * Handles selection change and updates the report state immutably.
   */
  const handleChange = useCallback(
    (event) => {
      const selectedUser =
        allUsers.find((user) => user?.name === event.target.value) || null;

      setReport((prev) => ({
        ...prev,
        reportingList: prev?.reportingList?.map((report) =>
          Number(report?.id) === Number(id)
            ? { ...report, auditee: selectedUser }
            : report
        ),
      }));
    },
    [allUsers, id, setReport]
  );

  /**
   * Memoize menu items so they don’t re-render unnecessarily.
   */
  const menuItems = useMemo(
    () =>
      list.map((item, index) => (
        <MenuItem value={item} key={index}>
          {item}
        </MenuItem>
      )),
    [list]
  );

  if (!list.length) return null;

  return (
    <FormControl variant="filled" sx={{ width: "100%" }}>
      <InputLabel id={`select-label-${id}`}>{label}</InputLabel>
      <Select
        labelId={`select-label-${id}`}
        id={`select-${id}`}
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
      >
        <MenuItem value="">Select User</MenuItem>
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
