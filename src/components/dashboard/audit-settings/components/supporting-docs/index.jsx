import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupUploadFile,
  resetFileAddSuccess,
  setupGetAllFiles,
} from "../../../../../global-redux/reducers/settings/supporting-docs/slice";
import { toast } from "react-toastify";
import Table from "./components/Table";
import { sanitizeSimpleName } from "../../../../../config/helper"

const SupportingDocs = ({ userHierarchy, userRole, currentSettingOption }) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const { allFiles, loading, fileAddSuccess } = useSelector(
    (state) => state?.settingsDocs
  );
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);
  const [page, setPage] = React.useState(1);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  // Allowed extensions
  const allowedExtensions = [".xlsx", ".xls", ".pdf", ".txt"];

  const getFileExtension = (fileName = "") => {
    const lower = fileName.toLowerCase();
    const lastDotIndex = lower.lastIndexOf(".");
    if (lastDotIndex === -1) return "";
    return lower.slice(lastDotIndex);
  };

  const hasSuspiciousDoubleExtension = (fileName = "") => {
    // Example: "invoice.pdf.jsp" => suspicious
    const lower = fileName.toLowerCase().trim();
    // If it has more than one dot, and the final extension is NOT allowed, block.
    const parts = lower.split(".");
    if (parts.length <= 2) return false;

    const lastExt = "." + parts[parts.length - 1];
    if (!allowedExtensions.includes(lastExt)) {
      return true;
    }

    // If the last ext is allowed, we still allow it (e.g. report.v1.pdf)
    return false;
  };

  const isProbablyText = (uint8Array) => {
    // Very lightweight heuristic: if too many null bytes / control chars exist,
    // treat as binary. This is NOT perfect, but helps prevent obvious binaries
    // renamed as .txt.
    let suspiciousCount = 0;
    const sampleSize = Math.min(uint8Array.length, 512);

    for (let i = 0; i < sampleSize; i++) {
      const byte = uint8Array[i];
      // Null byte is strong indicator of binary
      if (byte === 0) {
        suspiciousCount++;
        continue;
      }
      // Allow common whitespace + printable ASCII range
      const isAllowed =
        byte === 9 || // tab
        byte === 10 || // \n
        byte === 13 || // \r
        (byte >= 32 && byte <= 126); // printable
      if (!isAllowed) suspiciousCount++;
    }

    // If more than ~10% of bytes look suspicious, treat as binary
    return suspiciousCount / sampleSize <= 0.1;
  };

  const validateFileContentBySignature = async (file, extension) => {
    // Read first 16 bytes for signature checks
    const buffer = await file.slice(0, 16).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // PDF: "%PDF-" => 0x25 0x50 0x44 0x46 0x2D
    if (extension === ".pdf") {
      const pdfSig =
        bytes[0] === 0x25 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x44 &&
        bytes[3] === 0x46 &&
        bytes[4] === 0x2d;
      return pdfSig;
    }

    // XLSX: ZIP container typically starts with "PK" => 0x50 0x4B
    if (extension === ".xlsx") {
      const zipSig = bytes[0] === 0x50 && bytes[1] === 0x4b;
      return zipSig;
    }

    // XLS (OLE Compound File): D0 CF 11 E0 A1 B1 1A E1
    if (extension === ".xls") {
      const oleSig =
        bytes[0] === 0xd0 &&
        bytes[1] === 0xcf &&
        bytes[2] === 0x11 &&
        bytes[3] === 0xe0 &&
        bytes[4] === 0xa1 &&
        bytes[5] === 0xb1 &&
        bytes[6] === 0x1a &&
        bytes[7] === 0xe1;
      return oleSig;
    }

    // TXT: no strong signature. We'll do a lightweight heuristic on a larger slice.
    if (extension === ".txt") {
      const textBuffer = await file.slice(0, 1024).arrayBuffer();
      const textBytes = new Uint8Array(textBuffer);
      return isProbablyText(textBytes);
    }

    // Unknown extension should already be blocked earlier
    return false;
  };

  const validateFile = async (file) => {
    if (!file) return false;

    const fileName = file?.name || "";
    const extension = getFileExtension(fileName);

    // Basic extension allowlist check
    if (!allowedExtensions.includes(extension)) {
      toast.error(
        "Invalid file type. Allowed: .xlsx, .xls, .pdf, .txt"
      );
      return false;
    }

    // Basic filename sanity checks (double extension pattern)
    if (hasSuspiciousDoubleExtension(fileName)) {
      toast.error("Invalid file name. Multiple extensions are not allowed.");
      return false;
    }

    // Best-effort signature check for content validation
    try {
      const signatureOk = await validateFileContentBySignature(file, extension);
      if (!signatureOk) {
        toast.error("File content does not match the selected file type.");
        return false;
      }
    } catch (err) {
      toast.error("Unable to validate file. Please try another file.");
      return false;
    }

    return true;
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const isValid = await validateFile(file);
      if (isValid) {
        setSelectedFile(file);
      } else {
        clearSelectedFile();
      }
    }
  };

  const onApiCall = async (file) => {
    if (!loading) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("companyId", Number(companyId));
      dispatch(setupUploadFile(formData));
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const isValid = await validateFile(selectedFile);
      if (!isValid) {
        clearSelectedFile();
        return;
      }
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };

  React.useEffect(() => {
    if (fileAddSuccess) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      dispatch(setupGetAllFiles(`?companyId=${companyId}`));
      setSelectedFile(null);
      fileInputRef.current.value = "";
      setPage(1);
      setSearchValue("");
      dispatch(resetFileAddSuccess());
    }
  }, [fileAddSuccess]);

  React.useEffect(() => {
    setPage(1);
    setSearchValue("");
    setSelectedFile(null);
  }, [currentSettingOption]);

  return (
    <div
      className="tab-pane fade active show"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div>
          <div className="row my-3">
            <div className="col-lg-12">
              <div className="sub-heading  fw-bold">Supporting Documents</div>
            </div>
          </div>
          <div className="row position-relative mx-1 pointer">
            <div className="col-lg-12 text-center settings-form">
              <form>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".xlsx, .xls, .pdf, .txt"
                />
                <p className="mb-0">Click in this area.</p>
              </form>
            </div>
          </div>
          <p className="my-2">
            {selectedFile?.name ? selectedFile?.name : "Select file"}
          </p>
          <div className="row my-3">
            <div className="col-lg-12 text-end">
              <button
                className={`btn btn-labeled btn-primary px-3 mt-3 shadow ${loading && "disabled"
                  }`}
                onClick={handleFileUpload}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-save"></i>
                </span>
                {loading ? "Loading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="my-3">
        <div className="flex">
          <div className="row position-relative">
            <div className="col-lg-12 text-center settings-form h-0 border-none">
              <form>
                <input type="file" accept=".xlsx, .xls, .pdf, .txt" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6">
          <label className="w-100">Search File Name:</label>
          <input
            className="form-control w-100"
            placeholder="Enter"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(sanitizeSimpleName(e?.target?.value))}
          />
        </div>
      </div>

      <Table
        userRole={userRole}
        userHierarchy={userHierarchy}
        allFiles={allFiles}
        loading={loading}
        searchValue={searchValue}
        handleChangePage={handleChangePage}
        page={page}
      />
    </div>
  );
};

export default SupportingDocs;
