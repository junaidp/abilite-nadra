import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setupPlanningReportFileUpload,
  setupPlanningReportFileDelete,
} from "../../../../../../../global-redux/reducers/reports/planing-report/slice";
import { handleDownload, validateFile } from "../../../../../../../config/helper";

/**
 * Handles uploading, listing, downloading, and deleting files
 * for the Planning Report section.
 */
const PlanningReportFileUpload = ({ reportId, item }) => {
  const dispatch = useDispatch();
  const { updateLoading, reportAddSuccess } = useSelector(
    (state) => state?.planningReport
  );

  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const clearSelectedFile = React.useCallback(() => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  /** Validate and set selected file */
  const handleFileChange = React.useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValid = await validateFile(file, toast);
    if (isValid) {
      setSelectedFile(file);
    } else {
      clearSelectedFile();
    }
  }, [clearSelectedFile]);

  /** Dispatch API call to upload file */
  const uploadFileToServer = React.useCallback(
    (file) => {
      if (updateLoading) return;

      const formData = new FormData();
      formData.append("file", file);

      dispatch(
        setupPlanningReportFileUpload({
          formData,
          planningReportId: reportId,
        })
      );
    },
    [dispatch, updateLoading, reportId]
  );

  /** Trigger upload handler */
  const handleFileUpload = React.useCallback(async () => {
    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    const isValid = await validateFile(selectedFile, toast);
    if (!isValid) {
      clearSelectedFile();
      return;
    }

    uploadFileToServer(selectedFile);
  }, [selectedFile, uploadFileToServer, clearSelectedFile]);

  /** Reset file input after successful upload */
  React.useEffect(() => {
    if (reportAddSuccess) {
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [reportAddSuccess]);

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach files</label>

        {/* ==== File Upload Controls ==== */}
        <div className="row mb-3">
          <div className="col-lg-4 row">
            <div className="col-lg-6">
              <input
                type="file"
                id="fileInput"
                className="f-10"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx, .xls, .pdf, .txt"
              />
            </div>
            <div className="col-lg-6">
              <button
                className={`btn btn-labeled btn-primary shadow ${updateLoading ? "disabled" : ""
                  }`}
                onClick={handleFileUpload}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-save"></i>
                </span>
                {updateLoading ? "Loading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>

        {/* ==== File List Table ==== */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!item?.uploads?.length ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                item.uploads.map((fileItem, index) => (
                  <tr key={index}>
                    <td>
                      <span>{fileItem?.fileName}</span>
                    </td>
                    <td className="w-130">
                      {/* Download Icon */}
                      <i
                        className="fa fa-download f-18 mx-2 cursor-pointer"
                        onClick={() =>
                          handleDownload({
                            base64String: fileItem?.fileData,
                            fileName: fileItem?.fileName,
                          })
                        }
                      ></i>

                      {/* Delete Icon */}
                      <i
                        className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                        onClick={() => {
                          if (!updateLoading) {
                            dispatch(
                              setupPlanningReportFileDelete({
                                fileId: Number(fileItem?.id),
                                planningReportId: reportId,
                              })
                            );
                          }
                        }}
                      ></i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlanningReportFileUpload;