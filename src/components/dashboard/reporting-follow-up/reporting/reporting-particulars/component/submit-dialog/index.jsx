import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { setupUpdateReportingByManagementAuditee } from "../../../../../../../global-redux/reducers/reporting/slice";
import { toast } from "react-toastify";

const SubmitDialog = ({ item, setShowSubmitDialog }) => {
  const dispatch = useDispatch();
  const { loading, managementAuditeeReportingAddSuccess } = useSelector(
    (state) => state?.reporting
  );

  const hasContent = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    const text = div.textContent || div.innerText || '';
    return text.trim().length > 0;
  };


  function handleSubmit() {
    if (!loading) {
      const today = moment.utc().startOf("day");
      const implementationDate = moment
        .utc(item?.implementationDate)
        .startOf("day");

      if (
        !item?.managementComments ||
        !item?.implementationDate ||
        item?.managementComments === "" ||
        item?.implementationDate === "" ||
        !hasContent(item?.managementComments)
      ) {
        toast.error(
          "Fields missing. Please fill them first and then submit the observation"
        );
        return;
      }

      if (implementationDate.isBefore(today)) {
        toast.error("Implementation date must be today or greater than today");
        return;
      }

      dispatch(
        setupUpdateReportingByManagementAuditee({
          ...item,
          stepNo: 3,
        })
      );
    }
  }

  React.useEffect(() => {
    if (managementAuditeeReportingAddSuccess) {
      setShowSubmitDialog(false);
    }
  }, [managementAuditeeReportingAddSuccess]);

  return (
    <div className="p-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <p>Are You Sure You Want To Submit Reporting?</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-secondary  ${loading && "disabled"}`}
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
