import React from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const InformationRequestFileUpload = ({ uploads, setUploads }) => {
  const fileInputRef = React.useRef(null);
  const validTypes = [
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (validTypes.includes(fileType)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileData = reader.result.split(",")[1];
          const newFile = {
            id: uuidv4(),
            fileName: file.name,
            fileData: fileData,
          };
          setUploads((prevUploads) => [...prevUploads, newFile]);
          fileInputRef.current.value = "";
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(
          "Invalid file type. Only Pdf and Excel files are acceptable"
        );
      }
    }
  };

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${file.fileData}`;
    link.download = file.fileName;
    link.click();
  };

  const handleDelete = (fileId) => {
    setUploads((prevUploads) =>
      prevUploads.filter((file) => file.id !== fileId)
    );
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
                <th>Attach Files</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!uploads || uploads.length === 0 ? (
                <tr>
                  <td colSpan="2" className="w-300">
                    No Files Added Yet!
                  </td>
                </tr>
              ) : (
                uploads.map((file, index) => (
                  <tr key={file.id}>
                    <td>{file.fileName}</td>
                    <td className="w-130">
                      <i
                        className="fa fa-download f-18 mx-2 cursor-pointer"
                        onClick={() => handleDownload(file)}
                      ></i>
                      <i
                        className="fa fa-trash text-danger f-18 cursor-pointer px-2"
                        onClick={() => handleDelete(file.id)}
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
