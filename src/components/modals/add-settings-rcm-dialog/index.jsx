import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupGetAllProcess,
  setupGetAllSubProcess,
} from "../../../global-redux/reducers/settings/process/slice";
import { toast } from "react-toastify";
import { setupCreateRiskControlMatrix } from "../../../global-redux/reducers/settings/risk-control-matrix/slice";

const AddSettingsRCMDialog = ({ setShowCreateRCMDialog }) => {
  const dispatch = useDispatch();
  const { rcmAddSuccess, loading } = useSelector(
    (state) => state?.setttingsRiskControlMatrix
  );
  let { allProcess, allSubProcess } = useSelector(
    (state) => state?.setttingsProcess
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [processId, setProcessId] = React.useState("");
  const [subProcessId, setSubProcessId] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleClose() {
    setShowCreateRCMDialog(false);
    setDescription("");
    setSubProcessId("");
    setProcessId("");
  }

  React.useEffect(() => {
    if (rcmAddSuccess) {
      setShowCreateRCMDialog(false);
      setDescription("");
      setSubProcessId("");
      setProcessId("");
    }
  }, [rcmAddSuccess]);

  function handleAdd() {
    if (!loading) {
      if (processId === "" || subProcessId === "" || description === "") {
        toast.error("Provide all values");
      } else {
        const companyId = user[0]?.company?.find(
          (item) => item?.companyName === company
        )?.id;
        if (companyId) {
          dispatch(
            setupCreateRiskControlMatrix({
              description: description,
              process_Id: Number(processId),
              subProcess_Id: Number(subProcessId),
              company: Number(companyId),
            })
          );
        }
      }
    }
  }

  React.useEffect(() => {
    if (processId && processId !== "") {
      setSubProcessId("");
      dispatch(setupGetAllSubProcess(`?processId=${Number(processId)}`));
    }
  }, [processId]);

  React.useEffect(() => {
    if (user[0]?.token) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(setupGetAllProcess(Number(companyId)));
      }
    }
  }, [user]);

  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">Add Risk Control Matrix</h2>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Process</div>
        <div className="col-lg-8">
          <select
            className="form-select "
            aria-label="Default select example"
            value={processId}
            onChange={(event) => setProcessId(event?.target?.value)}
          >
            <option value="">Select One</option>
            {allProcess?.map((item, index) => {
              return (
                <option value={item?.id} key={index}>
                  {item?.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Sub Process</div>
        <div className="col-lg-8">
          <select
            className="form-select "
            aria-label="Default select example"
            value={subProcessId}
            onChange={(event) => setSubProcessId(event?.target?.value)}
          >
            <option value="">Select One</option>
            {allSubProcess?.map((item, index) => {
              return (
                <option value={item?.id} key={index}>
                  {item?.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Description</div>
        <div className="col-lg-8">
          <div className="form-group">
            <textarea
              type="text"
              id="fname"
              className="form-control h-400"
              name="fname"
              placeholder="Add detail here"
              required="required"
              value={description}
              onChange={(event) => setDescription(event?.target?.value)}
              maxlength="2000"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 2000 characters
            </label>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-lg-6 text-end">
          <button
            className={`btn btn-primary float-start ${loading && "disabled"}`}
            onClick={handleAdd}
          >
            {loading ? "Loading..." : "Add"}
          </button>
        </div>
        <div className="col-lg-6 text-end">
          <button className="btn btn-danger float-end" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSettingsRCMDialog;
