import { handleDownload } from "../../../../../config/helper";

/**
 * DetailedAuditReportAttachments
 *
 * - Displays a table of audit report file attachments.
 * - If no files are available, shows a "No Files Added Yet!" message.
 * - Allows users to download files via the download icon.
 */
const DetailedAuditReportAttachments = ({ item }) => {
  // Extract file list once for readability
  const attachments = item?.reportingFileAttachmentsList || [];

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table table-bordered table-hover rounded">
            {/* Table header */}
            <thead className="bg-secondary text-white">
              <tr>
                <th>File Names</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* If no attachments exist, show a placeholder row */}
              {attachments.length === 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                // Map through attachments and render each file row
                attachments.map((fileItem, index) => (
                  <tr key={index}>
                    <td>
                      {/* File name displayed as text (could later be linked if needed) */}
                      <a>{fileItem?.fileName}</a>
                    </td>
                    <td className="w-130">
                      {/* Download icon triggers file download */}
                      <i
                        className="fa fa-download f-18 mx-2 cursor-pointer"
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

export default DetailedAuditReportAttachments;
