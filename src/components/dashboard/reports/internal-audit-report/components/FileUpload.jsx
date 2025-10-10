import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
    setupIahFileUpload,
    setupIahFileDelete,
    setupIahFileUpdate,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { handleDownload } from "../../../../../config/helper";

/**
 * FileUpload Component
 * ---------------------
 * Handles uploading, updating, downloading, and deleting files
 * associated with an internal audit report.
 * 
 * - Uses Redux actions for API calls.
 * - Prevents duplicate actions while loading.
 * - Restricts file deletion to IAH (Head of Internal Audit) users only.
 */
const FileUpload = ({ item, setDeleteFileId }) => {
    const dispatch = useDispatch();

    // ✅ Redux states
    const { addReportLoading, iahFileUploadSuccess } = useSelector(
        (state) => state?.internalAuditReport
    );
    const { user } = useSelector((state) => state?.auth);

    // ✅ Refs for clearing file inputs after success
    const fileInputRef = useRef(null);
    const updatedFileInputRef = useRef(null);

    // ✅ Local state
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedUpdateFile, setSelectedUpdateFile] = useState(null);

    /** 
     * Handle selecting new file for upload 
     */
    const handleFileChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) setSelectedFile(file);
    }, []);

    /** 
     * Handle selecting file for update 
     */
    const handleUpdateFileChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) setSelectedUpdateFile(file);
    }, []);

    /**
     * Upload selected file via API
     */
    const onApiCall = useCallback(
        async (file) => {
            if (!addReportLoading && file) {
                const formData = new FormData();
                formData.append("file", file);
                dispatch(setupIahFileUpload({ formData, id: item?.id }));
            }
        },
        [dispatch, addReportLoading, item?.id]
    );

    /**
     * Trigger upload for selected file
     */
    const handleFileUpload = useCallback(() => {
        if (selectedFile) onApiCall(selectedFile);
        else toast.error("No file selected.");
    }, [selectedFile, onApiCall]);

    /**
     * Update existing uploaded file
     */
    const updateFileApiCall = useCallback(
        async (file, id) => {
            if (!addReportLoading && file) {
                const formData = new FormData();
                formData.append("file", file);
                dispatch(setupIahFileUpdate({ formData, id: Number(id) }));
            }
        },
        [dispatch, addReportLoading]
    );

    const handleFileUpdate = useCallback(
        (id) => {
            if (selectedUpdateFile) {
                updateFileApiCall(selectedUpdateFile, id);
            } else {
                toast.error("Please select an update file before proceeding.");
            }
        },
        [selectedUpdateFile, updateFileApiCall]
    );

    /**
     * Reset inputs after successful upload
     */
    useEffect(() => {
        if (iahFileUploadSuccess) {
            setSelectedFile(null);
            setSelectedUpdateFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            if (updatedFileInputRef.current) updatedFileInputRef.current.value = "";
        }
    }, [iahFileUploadSuccess]);

    /**
     * Render table rows for attached files
     */
    const renderFileRows = useCallback(() => {
        if (!item?.annexureUploads || item?.annexureUploads.length === 0) {
            return (
                <tr>
                    <td className="w-300">No Files Added Yet!</td>
                </tr>
            );
        }

        return item.annexureUploads.map((fileItem, index) => (
            <tr key={index}>
                <td>
                    <a>{fileItem?.fileName}</a>
                </td>
                <td className="w-130">
                    {/* Download */}
                    <i
                        className="fa fa-download f-18 mx-2 cursor-pointer"
                        onClick={() =>
                            handleDownload({
                                base64String: fileItem?.fileData,
                                fileName: fileItem?.fileName,
                            })
                        }
                    ></i>

                    {/* Delete */}
                    <i
                        className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                        onClick={() => {
                            if (addReportLoading) return;
                            const isIAH =
                                user?.[0]?.userId?.employeeid?.userHierarchy === "IAH";

                            if (!isIAH) {
                                toast.error("Only the Head of Internal Audit can delete a file.");
                                return;
                            }

                            setDeleteFileId(fileItem?.id);
                            dispatch(
                                setupIahFileDelete({
                                    fileId: Number(fileItem?.id),
                                    id: Number(item?.id),
                                })
                            );
                        }}
                    ></i>

                    {/* Edit / Update */}
                    <i
                        className="fa fa-edit px-2 f-18 cursor-pointer"
                        onClick={() => handleFileUpdate(fileItem?.id)}
                    ></i>
                </td>
            </tr>
        ));
    }, [item?.annexureUploads, handleFileUpdate, addReportLoading, dispatch, setDeleteFileId, user]);

    return (
        <div className="row mb-3">
            <div className="col-lg-12">
                <label className="form-label me-3 mb-3">Attach files</label>

                {/* Upload and Update Inputs */}
                <div className="row mb-3">
                    {/* Upload New File */}
                    <div className="col-lg-4 row">
                        <div className="col-lg-6">
                            <input
                                type="file"
                                className="f-10"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".xlsx, .xls, .pdf, .txt"
                            />
                        </div>
                        <div className="col-lg-6">
                            <button
                                className={`btn btn-labeled btn-primary shadow ${addReportLoading ? "disabled" : ""
                                    }`}
                                onClick={handleFileUpload}
                            >
                                <span className="btn-label me-2">
                                    <i className="fa fa-save"></i>
                                </span>
                                {addReportLoading ? "Loading..." : "Upload"}
                            </button>
                        </div>
                    </div>

                    {/* Select File for Update */}
                    <div className="col-lg-8 row flex flex-end">
                        <div className="col-lg-3">
                            <label>Updated File here:</label>
                            <input
                                type="file"
                                className="f-10"
                                ref={updatedFileInputRef}
                                onChange={handleUpdateFileChange}
                                accept=".xlsx, .xls, .pdf, .txt"
                            />
                        </div>
                    </div>
                </div>

                {/* File List Table */}
                <div className="table-responsive">
                    <table className="table table-bordered table-hover rounded">
                        <thead className="bg-secondary text-white">
                            <tr>
                                <th>Attach Files</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{renderFileRows()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
