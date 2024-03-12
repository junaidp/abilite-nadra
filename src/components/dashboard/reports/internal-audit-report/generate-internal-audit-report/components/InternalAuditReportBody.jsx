import React from "react";
import FollowUpItem from "./FollowUpItem";
import ReportFirstLayout from "./ReportFirstLayout";
import RichTextEditor from "./RichText";

const InternalAuditReportBody = ({ internalAuditReportObject }) => {
  return (
    <div>
      <ReportFirstLayout
        internalAuditReportObject={internalAuditReportObject}
      />

      <div className="border px-3 py-2  mt-3 rounded">
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Executive summary</label>
            <RichTextEditor />
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Audit Purpose</label>
            <RichTextEditor />
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading   fw-bold">Summary of key Finding(s)</div>
        </div>
      </div>

      <div className="border px-3 py-2  mt-3 rounded">
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Finding 1</label>
            <textarea
              className="form-control"
              placeholder="Enter Finding"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Finding 2</label>
            <textarea
              className="form-control"
              placeholder="Enter Finding"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Finding 3</label>
            <textarea
              className="form-control"
              placeholder="Enter Finding"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">All Findings</div>
        </div>
      </div>
      {internalAuditReportObject?.reportingAndFollowUp?.reportingList?.map(
        (item, index) => {
          return <FollowUpItem key={index} item={item} />;
        }
      )}

      <div className="border px-3 py-2  mt-3 rounded">
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Add heading here</label>
            <textarea
              className="form-control"
              placeholder="Enter heading"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Add heading here</label>
            <textarea
              className="form-control"
              placeholder="Enter heading"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>
      </div>

      <div className="border px-3 py-2  mt-3 rounded">
        <div className="row mb-3">
          <div className="col-lg-12">
            <label> Annexure</label>
            <textarea
              className="form-control"
              placeholder="Enter heading"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <label htmlFor="fileInput">Add Attachment:</label>
            <input className="ms-3 f-10" type="file" id="fileInput" />

            <div className="table-responsive mt-3">
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="w-80">Sr No.</th>
                    <th>File Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>File Attachment 1</td>
                    <td>
                      <i className="fa-eye fa f-18"></i>
                      <i className="fa fa-edit  px-3 f-18"></i>

                      <i className="fa fa-trash text-danger f-18"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>File Attachment 2</td>
                    <td>
                      <i className="fa-eye fa f-18"></i>
                      <i className="fa fa-edit  px-3 f-18"></i>

                      <i className="fa fa-trash text-danger f-18"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-12 d-flex justify-content-between">
          <div className="btn btn-labeled btn-primary px-3 shadow fitContent">
            <span className="btn-label me-2">
              <i className="fa fa-file-pdf f-18"></i>
            </span>
            Download PDF
          </div>
          <div className="btn btn-labeled btn-primary px-3 shadow me-3 fitContent">
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalAuditReportBody;
