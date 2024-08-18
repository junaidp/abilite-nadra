import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupUpdateFollowUp,
  setupSubmitReportingInFollowUp,
} from "../../../../../../global-redux/reducers/reporting/slice";
import { toast } from "react-toastify";

const SubmitDialog = ({ item, setShowSubmitDialog }) => {
  const dispatch = useDispatch();
  const { loading, followUpSubmittedAddSuccess } = useSelector(
    (state) => state?.reporting
  );

  function handleSubmit() {
    if (loading) {
      return;
    }
    if (
      item?.followUp?.recommendationsImplemented.toString() === "true" &&
      (item?.followUp?.finalComments === null ||
        item?.followUp?.finalComments === "")
    ) {
      toast.error(
        "Final Comments missing. Please provide them first and then submit the observation"
      );
      return;
    }
    dispatch(
      setupUpdateFollowUp({
        ...item?.followUp,
        recommendationsImplemented:
          item?.followUp?.recommendationsImplemented.toString() === "true"
            ? true
            : false,
        finalComments:
          item?.followUp?.recommendationsImplemented.toString() === "true"
            ? item?.followUp?.finalComments
            : "",
      })
    );

    setTimeout(() => {
      dispatch(
        setupSubmitReportingInFollowUp({
          ...item,
          stepNo: 6,
        })
      );
    }, 900);
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
