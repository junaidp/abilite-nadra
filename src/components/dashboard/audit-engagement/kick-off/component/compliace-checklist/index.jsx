import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupUpdateComplianceCheckList } from "../../../../../../global-redux/reducers/audit-engagement/slice";
import axios from "axios";
import { toast } from "react-toastify";
import TableRow from "./components/TableRow";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
}) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const { loading } = useSelector((state) => state?.auditEngagement);
  const [currentButtonId, setCurrentButtonId] = React.useState("");
  const [downloadLoading, setDownloadLoading] = React.useState(false);
  const [downloadFileId, setDownloadFileId] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
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
  const handleDownload = async (checkListId) => {
    setDownloadFileId(checkListId);
    setDownloadLoading(true);
    try {
      const response = await axios.get(
        `https://healthy-wolf-certainly.ngrok-free.app/auditEngagement/auditStepChecklist/downloadOfflineChecklist?auditStepChecklistId=${checkListId}`,
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "text/csv" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "yourFileName.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("File downloaded successfully");
      setDownloadLoading(false);
      setDownloadFileId("");
    } catch (error) {
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("An Error has occurred");
      }
      setDownloadFileId("");
      setDownloadLoading(false);
    }
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
        "https://healthy-wolf-certainly.ngrok-free.app/auditEngagement/auditStepChecklist/offlineUpdate",
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
          {currentAuditEngagement?.auditStepChecklistList?.length !== 0 && (
            <>
              <div className="row">
                <div className="mx-2 mb-2 col-lg-3">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
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
                        <th>Location Name</th>
                        <th>Sub Location Name</th>
                        <th>Status</th>
                        <th>Change Request</th>
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
                                downloadLoading={downloadLoading}
                                downloadFileId={downloadFileId}
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
