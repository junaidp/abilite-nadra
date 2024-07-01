import React, { useRef } from "react";
import { toast } from "react-toastify";

const InformationRequestFileUpload = ({
  fileAttachments,
  setFileAttachments,
}) => {
  const fileInputRef = useRef(null);

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
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileData = reader.result.split(",")[1];
          const newFile = {
            fileName: file.name,
            fileData: [fileData],
          };
          setFileAttachments((prevFiles) => [...prevFiles, newFile]);
        };
        reader.readAsDataURL(file);
        fileInputRef.current.value = null;
      } else {
        toast.error(
          "Invalid file type. Only Pdf and Excel files are acceptable"
        );
      }
    }
  };

  const handleDeleteFile = (index) => {
    setFileAttachments((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

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
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fileAttachments?.length === 0 ? (
                <tr>
                  <td>No Files Added Yet!</td>
                </tr>
              ) : (
                fileAttachments.map((fileItem, index) => (
                  <tr key={index}>
                    <td>
                      <a>{fileItem.fileName}</a>
                    </td>
                    <td className="w-130">
                      <i
                        className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                        onClick={() => handleDeleteFile(index)}
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

export default InformationRequestFileUpload;
