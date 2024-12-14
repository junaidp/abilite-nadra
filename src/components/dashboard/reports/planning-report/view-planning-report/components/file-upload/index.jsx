import React from "react";
import { handleDownload } from "../../../../../../../config/helper";

const PlanningReportFileUpload = ({ item }) => {
  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attached Files</label>

        <div className="table-responsive">
          <table className="table table-bordered  table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>File Name</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {!item?.uploads || item?.uploads?.length == 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                item?.uploads?.map((fileItem, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a>{fileItem?.fileName}</a>
                      </td>
                      <td>
                        <i
                          className="fa fa-download f-18 mx-2 cursor-pointer"
                          onClick={() =>
                            handleDownload({
                              base64String: fileItem?.fileData,
                              fileName: fileItem?.fileName,
                            })
                          }
                        ></i>{" "}
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

export default PlanningReportFileUpload;
