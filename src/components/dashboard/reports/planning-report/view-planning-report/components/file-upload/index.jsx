import { handleDownload } from "../../../../../../../config/helper";

/**
 * Displays the list of attached files for a planning report.
 * Allows downloading each file directly from the table.
 */
const PlanningReportFileUpload = ({ item }) => {
  const files = item?.uploads || [];

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attached Files</label>

        <div className="table-responsive">
          <table className="table table-bordered table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>File Name</th>
                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              {files.length === 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                files.map((file, index) => (
                  <tr key={index}>
                    <td>{file?.fileName}</td>
                    <td>
                      <i
                        className="fa fa-download f-18 mx-2 cursor-pointer"
                        onClick={() =>
                          handleDownload({
                            base64String: file?.fileData,
                            fileName: file?.fileName,
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

export default PlanningReportFileUpload;
