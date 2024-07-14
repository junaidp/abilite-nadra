import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setupAddHeading } from "../.././../../../../../global-redux/reducers/reports/planing-report/slice";

const AddHeadingDialog = ({ setShowAddHeadingDialog, reportId }) => {
  const dispatch = useDispatch();
  const { updateLoading, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );
  const [heading, setHeading] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleClose() {
    setShowAddHeadingDialog(false);
    setHeading("");
    setDescription("");
  }

  function handleAdd() {
    if (!updateLoading) {
      if (heading === "" || description === "") {
        toast.error("Please Provide both values");
      } else {
        dispatch(
          setupAddHeading({
            heading: heading,
            description: description,
            planningReportId: Number(reportId),
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (reportAddSuccess) {
      setHeading("");
      setDescription("");
      setShowAddHeadingDialog(false);
    }
  }, [reportAddSuccess]);

  return (
    <div className="px-4 py-4">
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Heading</div>
        <div className="col-lg-8">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="Enter"
              required="required"
              value={heading}
              onChange={(event) => setHeading(event?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Details</div>
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
            ></textarea>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-lg-6 text-end">
          <button
            className={`btn btn-primary float-start ${
              updateLoading && "disabled"
            }`}
            onClick={handleAdd}
          >
            {updateLoading ? "Loading..." : "Add Heading"}
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

export default AddHeadingDialog;
