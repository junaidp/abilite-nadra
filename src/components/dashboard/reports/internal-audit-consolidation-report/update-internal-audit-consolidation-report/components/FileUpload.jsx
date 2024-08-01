import React from "react";
import { toast } from "react-toastify";
import {
  setupConsolidationFileUpload,
  setupConsolidationFileDelete,
  setupConsolidationFileUpdate,
} from "../../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../../../../../constants/index";

const ConsolidationFileUpload = ({ item }) => {
  const dispatch = useDispatch();
  const { subLoading, consolidationFileUploadAddSuccess } = useSelector(
    (state) => state?.consolidationReport
  );
  const updatedFileInputRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const [selectedUpdateFile, setSelectedUpdateFile] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (validTypes.includes(fileType)) {
        setSelectedFile(file);
      } else {
        toast.error(
          "Invalid file type. Only Pdf and Excel files are acceptable"
        );
      }
    }
  };

  const handleUpdateFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (validTypes.includes(fileType)) {
        setSelectedUpdateFile(file);
      } else {
        toast.error(
          "Invalid file type. Only Pdf and Excel files are acceptable"
        );
      }
    }
  };

  const onApiCall = async (file) => {
    if (!subLoading) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(
        setupConsolidationFileUpload({ formData: formData, id: item?.id })
      );
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onApiCall(selectedFile);
    } else {
      toast.error("No file selected.");
    }
  };

  const updateFileApiCal = async (file, id) => {
    if (!subLoading) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(
        setupConsolidationFileUpdate({ formData: formData, id: Number(id) })
      );
    }
  };

  const handleFileUpdate = (id) => {
    if (selectedUpdateFile) {
      updateFileApiCal(selectedUpdateFile, id);
    } else {
      toast.error(
        "Please select update file from above in order to change the file."
      );
    }
  };

  function handleDownload(id) {
    window.open(
      `${baseUrl}/consolidatedReports/ConsolidatedIARAnnexureUploads/download?fileId=${id}`,
      "_blank"
    );
  }
  React.useEffect(() => {
    if (consolidationFileUploadAddSuccess) {
      setSelectedFile(null);
      setSelectedUpdateFile(null);
      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
      if (updatedFileInputRef?.current) {
        updatedFileInputRef.current.value = "";
      }
    }
  }, [consolidationFileUploadAddSuccess]);
  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach files</label>
        <div className="row mb-3">
          <div className="col-lg-4 row">
            <div className="col-lg-6">
              <input
                type="file"
                id="fileInpu"
                className="f-10"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="col-lg-6">
              <button
                className={`btn btn-labeled btn-primary  shadow ${
                  subLoading && "disabled"
                }`}
                onClick={handleFileUpload}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-save"></i>
                </span>
                {subLoading ? "Loading..." : "Upload"}
              </button>
            </div>
          </div>

          <div className="col-lg-8 row flex flex-end">
            <div className="col-lg-3">
              <label>Updated File here:</label>
              <input
                type="file"
                id="fileInpu"
                className="f-10"
                ref={updatedFileInputRef}
                onChange={handleUpdateFileChange}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered  table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!item?.annexureUploads || item?.annexureUploads?.length == 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                item?.annexureUploads?.map((fileItem, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a>{fileItem?.fileName}</a>
                      </td>
                      <td className="w-130">
                        <i
                          className="fa fa-download f-18 mx-2 cursor-pointer"
                          onClick={() => handleDownload(fileItem?.id)}
                        ></i>
                        <i
                          className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                          onClick={() => {
                            if (!subLoading) {
                              dispatch(
                                setupConsolidationFileDelete({
                                  fileId: Number(fileItem?.id),
                                  id: Number(item?.id),
                                })
                              );
                            }
                          }}
                        ></i>

                        <i
                          className="fa fa-edit px-2 f-18 cursor-pointer"
                          onClick={() => handleFileUpdate(fileItem?.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsolidationFileUpload;
