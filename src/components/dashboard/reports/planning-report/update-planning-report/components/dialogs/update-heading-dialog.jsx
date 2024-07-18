import React from "react";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { setupUpdateHeading } from "../../../../../../../global-redux/reducers/reports/planing-report/slice";

const UpdateHeadingDialog = ({
  setShowUpdateHeadingDialog,
  updateHeadingId,
  reportId,
}) => {
  const dispatch = useDispatch();
  const [heading, setHeading] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { updateLoading, singleReportObject, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );

  function handleClose() {
    setShowUpdateHeadingDialog(false);
    setHeading("");
    setDescription("");
  }

  function handleEdit() {
    if (!updateLoading) {
      if (heading === "" || description === "") {
        toast.error("Please Provide both values");
      } else {
        dispatch(
          setupUpdateHeading({
            heading: {
              id: updateHeadingId,
              heading: heading,
              description: description,
            },
            planningReportId: reportId,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (updateHeadingId) {
      const currentHeading = singleReportObject?.newHeading?.find(
        (item) => Number(item?.id) === Number(updateHeadingId)
      );
      setDescription(currentHeading?.description);
      setHeading(currentHeading?.heading);
    }
  }, [updateHeadingId]);

  React.useEffect(() => {
    if (reportAddSuccess) {
      setHeading("");
      setDescription("");
      setShowUpdateHeadingDialog(false);
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
            onClick={handleEdit}
          >
            {updateLoading ? "Loading..." : "Update"}
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

export default UpdateHeadingDialog;
