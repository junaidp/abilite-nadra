import React from "react";
import { toast } from "react-toastify";

const EditGeneratePlaningReportDialog = ({
  setEditGeneratePlaningReportDialog,
  setData,
  data,
  editGeneratePlaningId,
  setEditGeneratePlaningId,
}) => {
  const [heading, setHeading] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleClose() {
    setEditGeneratePlaningReportDialog(false);
    setHeading("");
    setDescription("");
    setEditGeneratePlaningId("");
  }

  function handleEdit() {
    if (heading === "" || description === "") {
      toast.error("Please Provide both values");
    } else {
      setData((pre) => {
        return {
          ...pre,
          newHeading: pre?.newHeading?.map((item) =>
            item?.id === editGeneratePlaningId
              ? { id: item?.id, heading, description }
              : item
          ),
        };
      });
      setHeading("");
      setDescription("");
      setEditGeneratePlaningId("");
      setEditGeneratePlaningReportDialog(false);
    }
  }

  React.useEffect(() => {
    if (editGeneratePlaningId) {
      const currentHeading = data?.newHeading?.find(
        (item) => item?.id === editGeneratePlaningId
      );
      setDescription(currentHeading?.description);
      setHeading(currentHeading?.heading);
    }
  }, [editGeneratePlaningId]);
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
          <button className="btn btn-primary float-start" onClick={handleEdit}>
            Edit
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

export default EditGeneratePlaningReportDialog;
