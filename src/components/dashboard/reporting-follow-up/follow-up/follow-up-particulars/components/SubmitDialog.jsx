import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupUpdateFollowUpByManagement,
  setupSubmitReportingInFollowUp,
} from "../../../../../../global-redux/reducers/reporting/slice";
import { toast } from "react-toastify";

const SubmitDialog = ({ item, setShowSubmitDialog }) => {
  const dispatch = useDispatch();
  const { loading, followUpSubmittedAddSuccess } = useSelector(
    (state) => state?.reporting
  );

  async function handleSubmit() {
    if (loading) {
      return;
    }

    if (
      item?.followUp?.recommendationsImplemented.toString() === "true" &&
      (!item?.followUp?.finalComments ||
        item?.followUp?.finalComments.trim() === "")
    ) {
      toast.error(
        "Final Comments missing. Please provide them first and then submit the observation"
      );
      return;
    }

    try {
      await dispatch(
        setupUpdateFollowUpByManagement({
          ...item?.followUp,
          recommendationsImplemented:
            item?.followUp?.recommendationsImplemented.toString() === "true",
          finalComments:
            item?.followUp?.recommendationsImplemented.toString() === "true"
              ? item?.followUp?.finalComments
              : "",
        })
      ).unwrap();

      await dispatch(
        setupSubmitReportingInFollowUp({
          ...item,
          stepNo: 6,
        })
      ).unwrap();
    } catch (error) {
      toast.error("An error occurred while submitting. Please try again.");
    }
  }

  React.useEffect(() => {
    if (followUpSubmittedAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [followUpSubmittedAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Follow Up?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary  ${loading ? "disabled" : ""}`}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          className={`btn btn-danger  float-end mx-2`}
          onClick={() => setShowSubmitDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitDialog;
