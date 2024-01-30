import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setupAddAuditableUnit } from "../../../global-redux/reducers/planing/auditable-units/slice";

const AuditableUnitRatingDialog = ({
  setAuditableUnitRatingDialog,
  selectedAuditableUnitId,
}) => {
  const dispatch = useDispatch();
  const { loading, auditableUnitAddSuccess, allAuditableUnits } = useSelector(
    (state) => state?.planingAuditableUnit
  );
  const [auditableUnitName, setAuditableUnitName] = React.useState("");
  const [data, setData] = React.useState({
    reason: "",
    jobType: "",
  });


  function handleChange(event) {
    setData((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleSave() {
    if (data?.jobType === "" || data?.reason === "") {
      toast.error("Provide all value");
    } else {
      if (!loading) {
        dispatch(
          setupAddAuditableUnit({
            reason: data?.reason,
            jobType: data?.jobType,
            processid: null,
            subProcessid: null,
            auditableUnitid: selectedAuditableUnitId,
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
      setAuditableUnitRatingDialog(false);
    }
  }, [auditableUnitAddSuccess]);

  React.useEffect(() => {
    const selectedItem = allAuditableUnits?.find(
      (all) => all?.id === selectedAuditableUnitId
    );
    setAuditableUnitName(selectedItem?.jobName);

    if (selectedItem?.engagement?.natureThrough === "Compliance Checklist") {
      setData((pre) => {
        return {
          ...pre,
          jobType: "Compliance Checklist",
        };
      });
    }
    if (selectedItem?.engagement?.natureThrough === "Special Project/Audit") {
      setData((pre) => {
        return {
          ...pre,
          jobType: "Special Audit",
        };
      });
    }
  }, []);

  return (
    <div className="p-4">
      <div className="row mb-4">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="heading">Auditable Units</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-9 sub-heading">
              <span className="me-2 fw-bold">1.</span>
              {auditableUnitName}
            </div>
            <div className=" col-lg-3 text-end">
              <div
                className="text-white bg-danger float-end  px-2 py-3 rounded shadow risk-rating-btn cursor-pointer"
                onClick={() => {
                  setAuditableUnitRatingDialog(false);
                  setData({ jobType: "", reason: "" });
                }}
              >
                Close
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-lg-12">
              <label>Auditable Unit</label>
              <textarea
                className="form-control"
                placeholder="Enter Reason"
                id="exampleFormControlTextarea1"
                rows="3"
                name="reason"
                value={data?.reason}
                onChange={handleChange}
              ></textarea>
              <label className="word-limit-info label-text">
                Maximum 1500 words
              </label>
            </div>
          </div>

          <div className="row mb-3">
            {allAuditableUnits?.find(
              (all) => all?.id === selectedAuditableUnitId
            )?.engagement?.natureThrough === "Compliance Checklist" && (
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
            )?.engagement?.natureThrough === "Special Project/Audit" && (
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
            )?.engagement?.natureThrough === "Business Objective" && (
              <div className="col-lg-12">
                <label>Job Type</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="jobType"
                  value={data?.jobType}
                  onChange={handleChange}
                >
                  <option>Review</option>
                  <option value="Fraud & Investigation">
                    Fraud & Investigation
                  </option>
                  <option value="Assurance and Compiance">
                    Assurance and Compiance
                  </option>
                  <option value="Advisory and consulting">
                    Advisory and consulting
                  </option>{" "}
                </select>
              </div>
            )}
          </div>
          {/* <div className="row">
            <div className="col-lg-6">
              <label>Process</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option >loram</option>
                <option value="1">Loram 2</option>
              </select>
            </div>

            <div className="col-lg-6">
              <label>Sub-Process</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option >loram</option>
                <option value="1">Loram 2</option>
              </select>
            </div>
          </div> */}
        </div>
      </div>
      <div className="pb-4">
        <button
          className={`btn btn-danger   float-end ${loading && "disabled"}`}
          onClick={handleSave}
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AuditableUnitRatingDialog;
