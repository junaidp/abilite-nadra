import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUpdateComplianceCheckList } from "../../../../../../global-redux/reducers/audit-engagement/slice";

const ComplianceCheckList = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  setComplianceCheckListMainId,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.auditEngagement);
  const [currentButtonId, setCurrentButtonId] = React.useState("");
  const { user } = useSelector((state) => state?.auth);
  function checkStaus(item) {
    let submit = true;
    item?.checklistObservationsList?.forEach((all) => {
      if (
        all?.remarks === "" ||
        all?.remarks === null ||
        all?.observation === "" ||
        all?.observation === null ||
        all?.remarks === "PARTIALLY_APPLICABLE"
      ) {
        submit = false;
      }
    });
    return submit;
  }

  function handleSubmit(item) {
    if (!loading) {
      dispatch(setupUpdateComplianceCheckList({ ...item, submitted: true }));
    }
  }
  function handleApprove(item) {
    if (!loading) {
      dispatch(setupUpdateComplianceCheckList({ ...item, approved: true }));
    }
  }
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingeight">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseSeven"
          aria-expanded="false"
          aria-controls="flush-collapseSeven"
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              Compliance Checklist
            </div>
          </div>
        </button>
      </h2>
      <div
        id="flush-collapseSeven"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="f-80">Sr No.</th>
                        <th>Location Name</th>
                        <th>Sub Location Name</th>
                        <th>Status</th>
                        <th>Change Request</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAuditEngagement?.auditStepChecklistList?.map(
                        (mainItem, index) => {
                          return (
                            <tr key={index}>
                              <td>{mainItem?.id}</td>
                              <td>
                                <a
                                  className="fw-bold  text-primary  px-3 py-1 f-10"
                                  onClick={() => {
                                    if (mainItem?.approved !== true) {
                                      setComplianceCheckListMainId(
                                        mainItem?.id
                                      );
                                      setShowComplianceCheckListDialog(true);
                                    }
                                  }}
                                >
                                  {
                                    mainItem?.subLocation?.locationid
                                      ?.description
                                  }
                                </a>
                              </td>
                              <td>
                                <a
                                  className="fw-bold  text-primary  px-3 py-1 f-10"
                                  onClick={() => {
                                    if (mainItem?.approved !== true) {
                                      setComplianceCheckListMainId(
                                        mainItem?.id
                                      );
                                      setShowComplianceCheckListDialog(true);
                                    }
                                  }}
                                >
                                  {mainItem?.subLocation?.description}
                                </a>
                              </td>
                              <td>null</td>
                              <td>null</td>
                              <td>
                                {checkStaus(mainItem) ? (
                                  <i className="fa fa-check-circle text-success f-18"></i>
                                ) : (
                                  <i className="fa fa-check-circle text-danger  f-18"></i>
                                )}
                              </td>
                              <td>
                                <div>
                                  {checkStaus(mainItem) &&
                                    mainItem?.submitted === false && (
                                      <button
                                        className={`btn btn-labeled btn-primary px-3  shadow ${
                                          loading &&
                                          Number(mainItem?.id) ===
                                            Number(currentButtonId) &&
                                          "disabled"
                                        }`}
                                        onClick={() => {
                                          setCurrentButtonId(mainItem?.id);
                                          handleSubmit(mainItem);
                                        }}
                                      >
                                        {loading &&
                                        Number(mainItem?.id) ===
                                          Number(currentButtonId)
                                          ? "Loading..."
                                          : "Submit"}
                                      </button>
                                    )}
                                </div>
                                <div>
                                  {checkStaus(mainItem) &&
                                    mainItem?.submitted === true &&
                                    mainItem?.approved === false &&
                                    (user[0]?.userId?.employeeid
                                      ?.userHierarchy === "IAH" ||
                                      Number(user[0]?.userId?.id) ===
                                        Number(
                                          currentAuditEngagement
                                            ?.resourceAllocation
                                            ?.backupHeadOfInternalAudit?.id
                                        ) ||
                                      Number(user[0]?.userId?.id) ===
                                        Number(
                                          currentAuditEngagement
                                            ?.resourceAllocation
                                            ?.proposedJobApprover?.id
                                        )) && (
                                      <button
                                        className={`btn btn-labeled btn-primary px-3  shadow ${
                                          loading &&
                                          Number(mainItem?.id) ===
                                            Number(currentButtonId) &&
                                          "disabled"
                                        }`}
                                        onClick={() => {
                                          setCurrentButtonId(mainItem?.id);
                                          handleApprove(mainItem);
                                        }}
                                      >
                                        {loading &&
                                        Number(mainItem?.id) ===
                                          Number(currentButtonId)
                                          ? "Loading..."
                                          : "Approve"}
                                      </button>
                                    )}
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCheckList;
