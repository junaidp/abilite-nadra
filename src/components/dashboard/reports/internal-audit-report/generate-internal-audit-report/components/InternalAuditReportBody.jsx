import React from "react";
import FollowUpItem from "./FollowUpItem";
import ReportFirstLayout from "./ReportFirstLayout";
import RichTextEditor from "./RichText";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setupCreateExtraFields } from "../../../../../../global-redux/reducers/reports/internal-audit-report/slice";

const InternalAuditReportBody = ({
  reportObject,
  handleChangeReportObject,
  handleChangeExcutiveSummary,
  handleChangeAuditPurpose,
  handleChangeSummaryOfKeyFinding,
  handleSaveInternalAuditReport,
  addReportLoading,
}) => {
  const dispatch = useDispatch();
  const [heading, setHeading] = React.useState("");
  const [data, setData] = React.useState("");
  const { createExtraFieldsLoading, internalAuditReportAddSuccess } =
    useSelector((state) => state?.internalAuditReports);

  function handleAddExtraField() {
    if (heading === "" || data === "") {
      toast.error("Provide both values");
    }
    if (heading !== "" && data !== "") {
      if (!createExtraFieldsLoading) {
        dispatch(
          setupCreateExtraFields(
            `?internalAuditReportId=${Number(
              reportObject?.id
            )}&heading=${heading}&data=${data}`
          )
        );
      }
    }
  }

  React.useEffect(() => {
    if (internalAuditReportAddSuccess === true) {
      setHeading("");
      setData("");
    }
  }, [internalAuditReportAddSuccess]);
  return (
    <div>
      <ReportFirstLayout
        reportObject={reportObject}
        handleChangeReportObject={handleChangeReportObject}
      />

      <div className="border px-3 py-2  mt-3 rounded">
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Executive summary</label>
            <RichTextEditor
              initialValue={reportObject?.executiveSummary}
              handleChangeExcutiveSummary={handleChangeExcutiveSummary}
            />
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Audit Purpose</label>
            <RichTextEditor
              initialValue={reportObject?.auditPurpose}
              handleChangeAuditPurpose={handleChangeAuditPurpose}
            />
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
        {reportObject?.keyFindingsList?.map((item, index) => {
          return (
            <div className="row mb-3" key={index}>
              <div className="col-lg-12">
                <label>Finding {index + 1}</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Finding"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={item?.summaryOfKeyFinding}
                  onChange={(event) =>
                    handleChangeSummaryOfKeyFinding(event, item?.id)
                  }
                ></textarea>
                <label className="word-limit-info label-text">
                  Maximum 5000 words
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">All Findings</div>
        </div>
      </div>
      {reportObject?.reportingAndFollowUp?.reportingList?.map((item, index) => {
        return <FollowUpItem key={index} item={item} />;
      })}

      <div className="border px-3 py-2  mt-3 rounded">
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Add heading here</label>
            <textarea
              className="form-control"
              placeholder="Enter heading"
              id="exampleFormControlTextarea1"
              rows="3"
              value={heading}
              onChange={(event) => setHeading(event?.target?.value)}
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Add data here</label>
            <textarea
              className="form-control"
              placeholder="Enter heading"
              id="exampleFormControlTextarea1"
              rows="3"
              value={data}
              onChange={(event) => setData(event?.target?.value)}
            ></textarea>
            <label className="word-limit-info label-text">
              Maximum 5000 words
            </label>
          </div>
        </div>
        <div className="col-lg-2">
          <div
            className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${
              createExtraFieldsLoading && "disabled"
            }`}
            onClick={handleAddExtraField}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            {createExtraFieldsLoading ? "Loading.." : "Add Extra Field"}
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
          <div
            className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${
              addReportLoading && "disabled"
            }`}
            onClick={handleSaveInternalAuditReport}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            {addReportLoading ? "Loading..." : "Save"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalAuditReportBody;
