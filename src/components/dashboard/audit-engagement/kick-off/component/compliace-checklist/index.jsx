import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import TableRow from "./components/TableRow";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { baseUrl } from "../../../../../../constants/index";
import ApproveDialog from "./components/ApproveDialog";
import SubmitDialog from "./components/submit-dialog";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 1,
  whiteSpace: "nowrap",
  width: 1,
});

const ComplianceCheckList = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  setComplianceCheckListMainId,
  singleAuditEngagementObject,
}) => {
  const fileInputRef = React.useRef(null);
  const { loading } = useSelector((state) => state?.auditEngagement);
  const [currentButtonId, setCurrentButtonId] = React.useState("");
  const [showSubmitDialog, setShowSubmitDialog] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [showUpdateButton, setShowUpdateButton] = React.useState(true);
  const [showApproveDialog, setShowApproveDialog] = React.useState(false);
  const [currentApproveItem, setCurrentApproveItem] = React.useState({});
  const [currentSubmittedItem, setCurrentSubmittedItem] = React.useState({});

  const { user } = useSelector((state) => state?.auth);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onApiCall = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post(
        `${baseUrl}/auditEngagement/auditStepChecklist/offlineUpdate`,
        formData
      );
      toast.success("File Updated Successfully");
      setSelectedFile(null);
    } catch (error) {
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("An Error has occurred");
      }
    }
  };

  const handleFileUpdate = () => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };

  React.useEffect(() => {
    if (
      singleAuditEngagementObject?.auditStepChecklistList &&
      singleAuditEngagementObject?.auditStepChecklistList?.length !== 0
    ) {
      const containsSubmittedFalse =
        singleAuditEngagementObject?.auditStepChecklistList.some(
          (item) => !item.submitted
        );
      if (containsSubmittedFalse) {
        setShowUpdateButton(true);
      } else {
        setShowUpdateButton(false);
      }
    }
  }, [singleAuditEngagementObject]);

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
          {currentAuditEngagement?.auditStepChecklistList?.length !== 0 &&
            showUpdateButton === true && (
              <>
                <div className="row">
                  <div className="mx-2 mb-2 col-lg-3">
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<FontAwesomeIcon icon={faUpload} />}
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    >
                      File
                      <VisuallyHiddenInput type="file" />
                    </Button>
                    <Button
                      component="label"
                      className="mx-2"
                      onClick={handleFileUpdate}
                    >
                      Update File
                    </Button>
                  </div>
                </div>
                <p className="mx-2">
                  {selectedFile?.name ? selectedFile?.name : "Select file"}
                </p>
              </>
            )}

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
