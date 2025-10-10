import { handleDownload } from "../../../../../../config/helper";

/**
 * Displays a read-only list of attached files in the internal audit report.
 * Allows downloading files directly via the download icon.
 */
const FileUpload = ({ item }) => {
  const files = item?.annexureUploads || [];

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attach Files</label>

        <div className="table-responsive">
          <table className="table table-bordered table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>File Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-3">
                    No files added yet.
                  </td>
                </tr>
              ) : (
                files.map((fileItem, index) => (
                  <tr key={index}>
                    <td>{fileItem?.fileName || "Unnamed File"}</td>
                    <td className="w-130 text-center">
                      <i
                        className="fa fa-download f-18 mx-2 cursor-pointer"
                        title="Download File"
                        onClick={() =>
                          handleDownload({
                            base64String: fileItem?.fileData,
                            fileName: fileItem?.fileName,
                          })
                        }
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

export default FileUpload;
