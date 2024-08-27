import React from "react";
import { useSelector } from "react-redux";
import TableRow from "./components/TableRow";
import { baseUrl } from "../../../../../../constants/index";
import ApproveDialog from "./components/ApproveDialog";
import SubmitDialog from "./components/submit-dialog";

const ComplianceCheckList = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  setComplianceCheckListMainId,
  singleAuditEngagementObject,
}) => {
  const { loading } = useSelector((state) => state?.auditEngagement);
  const { user } = useSelector((state) => state?.auth);
  const [currentButtonId, setCurrentButtonId] = React.useState("");
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [showApproveDialog, setShowApproveDialog] = React.useState(false);
  const [currentApproveItem, setCurrentApproveItem] = React.useState({});
  const [currentSubmittedItem, setCurrentSubmittedItem] = React.useState({});

  function checkStaus(item) {
    let submit = true;
    item?.checklistObservationsList?.forEach((all) => {
      if (
        all?.remarks === "" ||
        all?.remarks === null ||
        all?.observation === "" ||
        all?.observation === null ||
        all?.remarks === "PARTIALLY_APPLICABLE" ||
        all?.remarks === "0"
      ) {
        submit = false;
      }
    });
    return submit;
  }

  function handleSubmit(item) {
    setCurrentSubmittedItem(item);
    setShowSubmitDialog(true);
  }

  function handleApprove(item) {
    setCurrentApproveItem(item);
    setShowApproveDialog(true);
  }

  const handleDownload = async (checkListId) => {
    window.open(
      `${baseUrl}/auditEngagement/auditStepChecklist/downloadOfflineChecklist?auditStepChecklistId=${checkListId}`,
      "_blank"
    );
  };

  return (
    <div className="accordion-item">
      {showSubmitDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <SubmitDialog
              object={currentSubmittedItem}
              setShowSubmitDialog={setShowSubmitDialog}
            />
          </div>
        </div>
      )}
      {showApproveDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <ApproveDialog
              setShowApproveDialog={setShowApproveDialog}
              currentApproveItem={currentApproveItem}
            />
          </div>
        </div>
      )}
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
              {singleAuditEngagementObject?.auditStepChecklistList?.find(
                (singleItem) => singleItem?.approved === true
              ) && (
                <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
              )}
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
                        <th>Sub Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAuditEngagement?.auditStepChecklistList
                        ?.length === 0 ? (
                        <tr>
                          <td>No data to show</td>
                        </tr>
                      ) : (
                        currentAuditEngagement?.auditStepChecklistList?.map(
                          (mainItem, index) => {
                            return (
                              <TableRow
                                index={index}
                                key={index}
                                mainItem={mainItem}
                                setComplianceCheckListMainId={
                                  setComplianceCheckListMainId
                                }
                                setShowComplianceCheckListDialog={
                                  setShowComplianceCheckListDialog
                                }
                                checkStaus={checkStaus}
                                setCurrentButtonId={setCurrentButtonId}
                                user={user}
                                loading={loading}
                                currentButtonId={currentButtonId}
                                handleSubmit={handleSubmit}
                                handleApprove={handleApprove}
                                handleDownload={handleDownload}
                                currentAuditEngagement={currentAuditEngagement}
                              />
                            );
                          }
                        )
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
