import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { downloadReportingAttachment } from "../../../attachmentDownload";

const FollowUpFileUpload = ({ item }) => {
  const { user } = useSelector((state) => state?.auth);
  const [downloadingFileId, setDownloadingFileId] = React.useState(null);

  const handleFileDownload = async (fileItem) => {
    if (!fileItem?.id || downloadingFileId) return;

    try {
      setDownloadingFileId(fileItem.id);
      await downloadReportingAttachment({
        attachment: fileItem,
        token: user?.[0]?.token,
        fallbackSource: "REPORTING_ATTACHMENT",
      });
    } catch {
      toast.error("Unable to download the file.");
    } finally {
      setDownloadingFileId(null);
    }
  };

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attached files</label>

        <div className="table-responsive">
          <table className="table table-bordered  table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!item?.reportingFileAttachmentsList ||
              item?.reportingFileAttachmentsList?.length == 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                item?.reportingFileAttachmentsList?.map((fileItem, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a>{fileItem?.fileName}</a>
                      </td>
                      <td className="w-130">
                        <i
                          className={`fa ${
                            downloadingFileId === fileItem?.id
                              ? "fa-spinner fa-spin"
                              : "fa-download"
                          } f-18 mx-2 cursor-pointer`}
                          onClick={() => handleFileDownload(fileItem)}
                          title={
                            downloadingFileId === fileItem?.id
                              ? "Downloading"
                              : "Download"
                          }
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

export default FollowUpFileUpload;
