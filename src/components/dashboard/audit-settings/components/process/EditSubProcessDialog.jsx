import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setupEditSubProcess } from "../../../../../global-redux/reducers/settings/process/slice";

const EditSubProcessDialog = ({ setShowSubProcessDialog, subProcessId }) => {
  const [subProcessName, setSubProcessName] = React.useState("");
  const { subLoading, subProcessAddSuccess, allSubProcess } = useSelector(
    (state) => state?.settingsProcess
  );
  const dispatch = useDispatch();
  function handleSubmit() {
    if (subProcessName === "") {
      toast.error("Provide name");
    }
    if (subProcessName && !subLoading) {
      const SubProcessItem = allSubProcess?.find(
        (item) => item?.id === subProcessId
      );
      dispatch(
        setupEditSubProcess({ ...SubProcessItem, description: subProcessName })
      );
    }
  }

  React.useEffect(() => {
    if (subProcessAddSuccess) {
      setSubProcessName("");
      setShowSubProcessDialog(false);
    }
  }, [subProcessAddSuccess]);
  React.useEffect(() => {
    const { description } = allSubProcess?.find(
      (item) => item?.id === subProcessId
    );
    setSubProcessName(description);
  }, []);
  return (
    <div className="p-4">
      <h4 className="mb-4">Edit Sub Process</h4>
      <div className="row mb-4 flex items-center">
        <div className="col-lg-2 label-text">Sub Process Name:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <input
              type="description"
              id="description"
              name="description"
              className="form-control"
              value={subProcessName}
              onChange={(e) => setSubProcessName(e?.target?.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 w-100">
          <button
            className={`btn btn-primary ${subLoading && "disabled"}`}
            onClick={handleSubmit}
          >
            {subLoading ? "Loading..." : "Edit"}
          </button>
        </div>
        <div className="mb-4">
          <button
            className="btn btn-danger float-end"
            onClick={() => {
              setShowSubProcessDialog(false);
              setSubProcessName("");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubProcessDialog;
