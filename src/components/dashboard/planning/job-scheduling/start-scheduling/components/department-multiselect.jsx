import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  //   Chip,
  OutlinedInput,
} from "@mui/material";
import { useSelector } from "react-redux";

const MultiSelect = ({ label, options, selectedValues, setSelectedValues }) => {
  const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        // renderValue={(selected) => (
        //   <div style={{ display: "flex", flexWrap: "wrap" }}>
        //     {selected.map((value) => (
        //       <Chip
        //         key={value}
        //         label={options.find((opt) => opt.id === value)?.description}
        //         style={{ margin: 2 }}
        //       />
        //     ))}
        //   </div>
        // )}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const DepartmentSelector = ({
  selectedDepartments,
  setSelectedDepartments,
  selectedSubDepartments,
  setSelectedSubDepartments,
}) => {
  const { allDepartments } = useSelector((state) => state.settingsDepartment);

  // API Data
  const apiData = allDepartments || [];

  useEffect(() => {
    const newSubDepartments = apiData
      .filter((dept) => selectedDepartments.includes(dept.id))
      .flatMap((dept) => dept.subDepartments);

    setSelectedSubDepartments((prev) =>
      prev.filter((id) => newSubDepartments.some((sub) => sub.id === id))
    );
  }, [selectedDepartments]);

  return (
    <div className="row">
      <div className="col-lg-6">
        <MultiSelect
          label="Select Departments"
          options={apiData}
          selectedValues={selectedDepartments}
          setSelectedValues={setSelectedDepartments}
        />
      </div>
      <div className="col-lg-6">
        <MultiSelect
          label="Select SubDepartments"
          options={apiData
            .filter((dept) => selectedDepartments.includes(dept.id))
            .flatMap((dept) => dept.subDepartments)}
          selectedValues={selectedSubDepartments}
          setSelectedValues={setSelectedSubDepartments}
        />
      </div>
    </div>
  );
};

export default DepartmentSelector;
