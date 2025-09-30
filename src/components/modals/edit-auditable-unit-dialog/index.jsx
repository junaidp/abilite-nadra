import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { setupEditAuditableUnit } from "../../../global-redux/reducers/planing/auditable-units/slice";
import RiskAssessment from "./risk-assessment";

const EditAuditJobDialog = ({
  setShowEditAuditableUnit,
  selectedAuditableUnitId,
  selectedAuditableSubUnitId,
}) => {
  const dispatch = useDispatch();
  const { loading, auditableUnitAddSuccess, allAuditableUnits, processess } = useSelector(
    (state) => state?.planningAuditableUnit
  );
  const [selectedProcessess, setSelectedProcessess] = React.useState([])
  const [selectedSubProcessess, setSelectedSubProcessess] = React.useState([])
  const [auditableUnitName, setAuditableUnitName] = React.useState("");
  const [risks, setRisk] = React.useState([]);
  const [data, setData] = React.useState({
    reason: "",
    jobType: "",
  });

  const allowedSubProcesses = selectedProcessess.flatMap((proc) => proc.subProcesses || []);

  // Handles process selection
  const handleProcessChange = (event) => {
    const selectedIds = event.target.value.map((id) => Number(id));

    const newSelectedProcesses = processess.filter((p) =>
      selectedIds.includes(p.id)
    );

    // Identify deselected processes
    const removedProcesses = selectedProcessess.filter(
      (prev) => !selectedIds.includes(prev.id)
    );

    const removedSubProcessIds = removedProcesses
      .flatMap((p) => p.subProcesses?.map((sp) => sp.id) || []);

    // Filter out only subProcesses that belong to the removed process(es)
    const updatedSubProcesses = selectedSubProcessess.filter(
      (sp) => !removedSubProcessIds.includes(sp.id)
    );

    setSelectedProcessess(newSelectedProcesses);
    setSelectedSubProcessess(updatedSubProcesses);
  };

  // Handles sub-process selection
  const handleSubProcessChange = (event) => {
    const selectedIds = event.target.value.map((id) => Number(id));
    const allSubProcesses = allowedSubProcesses;

    const updated = allSubProcesses.filter((sp) =>
      selectedIds.includes(sp.id)
    );

    setSelectedSubProcessess(updated);
  };

  function handleChange(event) {
    setData((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleEdit() {
    if (
      data?.jobType === "" ||
      data?.reason === "" ||
      !selectedProcessess.length ||
      !selectedSubProcessess.length
    ) {
      toast.error("Provide all value");
    } else {
      if (!loading) {
        const currentAuditableUnit = allAuditableUnits?.find(
          (all) => all?.id === selectedAuditableUnitId
        );
        let filteredUnitList = currentAuditableUnit?.unitList?.filter(
          (all) => all?.id !== selectedAuditableSubUnitId
        );
        filteredUnitList = [
          ...filteredUnitList,
          {
            id: selectedAuditableSubUnitId,
            reason: data?.reason,
            jobType: data?.jobType,
            processes: selectedProcessess.map((process) => {
              return {
                "id": process.id,
                "description": process.description,
                "companyid": process.companyid,
                "archived": process.archived
              }
            }),
            subProcesses: selectedSubProcessess,
            riskAssessments: data?.riskAssessments
          },
        ];

        dispatch(
          setupEditAuditableUnit({
            ...currentAuditableUnit,
            unitList: filteredUnitList,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (auditableUnitAddSuccess) {
      setData({
        jobType: "",
        reason: "",
      });
      setShowEditAuditableUnit(false);
    }
  }, [auditableUnitAddSuccess]);


  React.useEffect(() => {
    const selectedItem = allAuditableUnits
      ?.find((all) => all?.id === selectedAuditableUnitId)
      ?.unitList.filter((unit) => unit.id === selectedAuditableSubUnitId)[0];
    const SubProcesses = processess.flatMap(
      (proc) => proc.subProcesses || []
    );
    setData({ reason: selectedItem?.reason, jobType: selectedItem?.jobType });
    setSelectedProcessess(processess.filter((process) => selectedItem.processids.includes(process.id)));
    setSelectedSubProcessess(SubProcesses.filter((subProcess) => selectedItem.subProcessids.includes(subProcess.id)));
    const selectedSingleItem = allAuditableUnits?.find(
      (all) => all?.id === selectedAuditableUnitId
    );
    setAuditableUnitName(selectedSingleItem?.jobName);
    setRisk(selectedItem?.riskAssessments);
  }, []);

  return (
    <div className="p-4">
      <div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <div className="row mb-3">
              <div className="d-flex justify-content-between mb-4 w-100">
                <div className="heading">Business Objective</div>
                <button
                  className="btn-close f-22"
                  type="button"
                  onClick={() => {
                    setShowEditAuditableUnit(false);
                    setData({ jobType: "", reason: "" });
                  }}
                ></button>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-9 sub-heading">{auditableUnitName}</div>
            </div>
            <div className="min-h-400">
              <div className="row mb-3">
                {allAuditableUnits?.find(
                  (all) => all?.id === selectedAuditableUnitId
                )?.natureThrough === "Compliance Checklist" && (
                    <div className="col-lg-12">
                      <label>Job Type</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="jobType"
                        defaultValue={data?.jobType}
                      >
                        <option value="Compliance Checklist">
                          Compliance Checklist
                        </option>
                      </select>
                    </div>
                  )}
                {allAuditableUnits?.find(
                  (all) => all?.id === selectedAuditableUnitId
                )?.natureThrough === "Special Project/Audit" && (
                    <div className="col-lg-12">
                      <label>Job Type</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="jobType"
                        defaultValue={data?.jobType}
                      >
                        <option value="Special Audit">Special Audit </option>
                      </select>
                    </div>
                  )}
                {allAuditableUnits?.find(
                  (all) => all?.id === selectedAuditableUnitId
                )?.natureThrough === "Business Objective" && (
                    <div className="col-lg-12">
                      <label>Job Type</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="jobType"
                        value={data?.jobType}
                        onChange={handleChange}
                      >
                        <option value="">Select Option</option>
                        <option value="Review">Review</option>
                        <option value="Fraud & Investigation">
                          Fraud & Investigation
                        </option>
                        <option value="Assurance and Compiance">
                          Assurance and Compiance
                        </option>
                        <option value="Advisory and consulting">
                          Advisory and consulting
                        </option>
                      </select>
                    </div>
                  )}
              </div>
              <div className="row my-2">
                <div className="col-lg-12">
                  <label>Audit Job</label>
                  <textarea
                    placeholder="Enter Reason"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="reason"
                    value={data?.reason}
                    onChange={handleChange}
                    maxLength="200"
                    className={`form-control  ${data?.reason?.length >= 200 && "error-border"
                      }`}
                  ></textarea>
                  <p className="word-limit-info label-text">
                    Maximum 200 characters
                  </p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6">
                  <FormControl fullWidth>
                    <InputLabel>Process</InputLabel>
                    <Select
                      multiple
                      value={selectedProcessess.map((p) => p.id)}
                      onChange={handleProcessChange}
                      input={<OutlinedInput label="Process" />}
                      renderValue={(selected) =>
                        selected.map((id) => {
                          const match = processess.find((p) => p.id === id);
                          return match?.description;
                        }).join(', ')
                      }
                    >
                      {processess.map((proc) => (
                        <MenuItem key={proc.id} value={proc.id}>
                          <Checkbox
                            checked={selectedProcessess.some((p) => p.id === proc.id)}
                          />
                          <ListItemText primary={proc.description} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="col-lg-6">
                  <FormControl fullWidth>
                    <InputLabel>Sub-Process</InputLabel>
                    <Select
                      multiple
                      value={selectedSubProcessess.map((sp) => sp.id)}
                      onChange={handleSubProcessChange}
                      input={<OutlinedInput label="Sub-Process" />}
                      renderValue={(selected) =>
                        selected.map((id) => {
                          const match = allowedSubProcesses.find((sp) => sp.id === id);
                          return match?.description;
                        }).join(', ')
                      }
                    >
                      {allowedSubProcesses.map((sub) => (
                        <MenuItem key={sub.id} value={sub.id}>
                          <Checkbox
                            checked={selectedSubProcessess.some((sp) => sp.id === sub.id)}
                          />
                          <ListItemText primary={sub.description} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <label className="mb-1">Selected Risks</label>
              <RiskAssessment riskAssessments={risks} />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <button
              className={`btn btn-primary   float-end ${loading && "disabled"}`}
              onClick={handleEdit}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
          <div>
            <div
              className="text-white bg-danger float-end  px-2 py-3 rounded shadow risk-rating-btn cursor-pointer"
              onClick={() => {
                setShowEditAuditableUnit(false);
                setData({ jobType: "", reason: "" });
              }}
            >
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAuditJobDialog;
