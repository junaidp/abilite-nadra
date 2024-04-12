import React from "react";
import { baseUrl } from "../../../../../../constants/index";

const FollowUpFileUpload = ({ item }) => {
  function handleDownload(id) {
    window.open(
      `${baseUrl}/reportingAndFollowUp/reporting/reportingFileAttachments/download?fileId=${id}`,
      "_blank"
    );
  }
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
                          class="fa fa-download f-18 mx-2 cursor-pointer"
                          onClick={() => handleDownload(fileItem?.id)}
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
