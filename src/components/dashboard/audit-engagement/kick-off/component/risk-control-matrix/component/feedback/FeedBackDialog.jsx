import React from "react";
import { toast } from "react-toastify";
import { setupRiskControlMatrixFeedBack } from "../../../../../../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import RickText from "../../../../../../../common/feed-back-rich-text/index";

const FeedBackDialog = ({ setFeedBackDialog, currentAuditEngagement }) => {
  const dispatch = useDispatch();
  const { loading, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const [description, setDescription] = React.useState("");

  function handleClose() {
    setFeedBackDialog(false);
    setDescription("");
  }

  function onContentChange(value) {
    setDescription(value);
  }

  function handleAdd() {
    if (!loading) {
      if (description === "") {
        toast.error("Provide description");
      } else {
        dispatch(
          setupRiskControlMatrixFeedBack({
            id: Number(currentAuditEngagement?.riskControlMatrix?.id),
            description: description,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setDescription("");
      setFeedBackDialog(false);
    }
  }, [auditEngagementAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div className="row mb-2">
        <div className="col-lg-2 label-text">Description:</div>
        <div className="col-lg-8">
          <div className="form-group">
            <RickText onContentChange={onContentChange} />
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

export default FeedBackDialog;
