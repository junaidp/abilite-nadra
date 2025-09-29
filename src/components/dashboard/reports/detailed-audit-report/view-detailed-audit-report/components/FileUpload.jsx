import React, { useCallback } from "react";
import { handleDownload } from "../../../../../../config/helper";

const ConsolidationFileUpload = ({ item }) => {
  // ✅ Memoized handler for downloading a file to avoid recreating function on each render
  const onDownload = useCallback((fileItem) => {
    handleDownload({
      base64String: fileItem?.fileData,
      fileName: fileItem?.fileName,
    });
  }, []);

  // ✅ Derived variable for readability
  const uploads = item?.annexureUploads || [];

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table table-bordered table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.length === 0 ? (
                // ✅ No files case
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                  <td></td>
                </tr>
              ) : (
                uploads.map((fileItem, index) => (
                  <tr key={index}>
                    <td>
                      {/* Display file name */}
                      <span>{fileItem?.fileName}</span>
                    </td>
                    <td className="w-130">
                      {/* Download button */}
                      <i
                        className="fa fa-download f-18 mx-2 cursor-pointer"
                        onClick={() => onDownload(fileItem)}
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

export default ConsolidationFileUpload;
