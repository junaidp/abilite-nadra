import React from "react";
import FollowUpItem from "./FollowUpItem";
import ReportFirstLayout from "./ReportFirstLayout";
import RichTextEditor from "./RichText";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setupCreateExtraFields,
  resetInternalAuditReportExtraFieldsAddSuccess,
  setupUpdateExtraField,
} from "../../../../../../global-redux/reducers/reports/internal-audit-report/slice";
import { v4 as uuidv4 } from "uuid";

const InternalAuditReportBody = ({
  reportObject,
  handleChangeReportObject,
  handleChangeExcutiveSummary,
  handleChangeAuditPurpose,
  handleChangeSummaryOfKeyFinding,
  handleSaveInternalAuditReport,
  addReportLoading,
  handleChangeExtraFields,
  handleChangeAnnexure,
}) => {
  const dispatch = useDispatch();
  let [extraFieldsArray, setExtraFieldsArray] = React.useState([]);
  const { createExtraFieldsLoading, internalAuditReportExtraFieldsAddSuccess } =
    useSelector((state) => state?.internalAuditReports);

  function handleUpdateExtraField(item) {
    if (!createExtraFieldsLoading) {
      dispatch(setupUpdateExtraField(item));
    }
  }

  function handleDeleteExtraField(id) {
    setExtraFieldsArray((pre) => pre?.filter((all) => all?.id !== id));
  }

  function handleAddExtraFieldInArray() {
    setExtraFieldsArray((pre) => [
      ...pre,
      { id: uuidv4(), data: "data", heading: "heading" },
    ]);
  }

  function handleAddExtraField() {
    if (extraFieldsArray?.length === 0) {
      toast.error("Provide both values");
    }
    if (extraFieldsArray?.length !== 0) {
      if (!createExtraFieldsLoading) {
        dispatch(
          setupCreateExtraFields({
            reportId: reportObject?.id,
            extraFieldsArray: extraFieldsArray,
          })
        );
      }
    }
  }

  function handleChangeExtraField(event, id) {
    setExtraFieldsArray((pre) =>
      pre?.map((all) =>
        all?.id === id
          ? { ...all, [event?.target?.name]: event?.target?.value }
          : all
      )
    );
  }

  React.useEffect(() => {
    if (internalAuditReportExtraFieldsAddSuccess === true) {
      setExtraFieldsArray([]);
      dispatch(resetInternalAuditReportExtraFieldsAddSuccess());
    }
  }, [internalAuditReportExtraFieldsAddSuccess]);
  return (
    <div>
      <ReportFirstLayout
        reportObject={reportObject}
        handleChangeReportObject={handleChangeReportObject}
      />
      {/* Editors Start */}
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
      {/* Editors Ends */}

      {/* Findings Start */}
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
      {/* Findings Ends */}
      {/* Reporting And Follow Up Starts */}
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Reporting & Follow Up</div>
        </div>
      </div>
      {reportObject?.reportingAndFollowUp?.reportingList?.map((item, index) => {
        return <FollowUpItem key={index} item={item} />;
      })}
      {/* Reporting And Follow Up Ends */}

      {/* Extra Fields Starts */}
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Audit Extra Fields List</div>
        </div>
      </div>
      {reportObject?.intAuditExtraFieldsList?.length === 0 ? (
        <p>No Extra Field Added Till Now</p>
      ) : (
        reportObject?.intAuditExtraFieldsList !== null &&
        reportObject?.intAuditExtraFieldsList?.length !== 0 &&
        reportObject?.intAuditExtraFieldsList &&
        reportObject?.intAuditExtraFieldsList?.map((item, index) => {
          return (
            <div className="border px-3 py-2  mt-3 rounded" key={index}>
              <div className="row mb-3">
                <div className="col-lg-12">
                  <label>Heading</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter heading"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={item?.heading || ""}
                    name="heading"
                    onChange={(event) =>
                      handleChangeExtraFields(event, item?.id)
                    }
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-12">
                  <label>Data</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter heading"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={item?.data || ""}
                    name="data"
                    onChange={(event) =>
                      handleChangeExtraFields(event, item?.id)
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${
                    createExtraFieldsLoading && "disabled"
                  }`}
                  onClick={() => handleUpdateExtraField(item)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-check-circle f-18"></i>
                  </span>
                  {createExtraFieldsLoading
                    ? "Loading.."
                    : "Update Extra Field"}
                </div>
              </div>
            </div>
          );
        })
      )}
      {/* Add Extra Fields */}

      <div className="col-lg-2 mb4">
        <div
          className={`btn btn-labeled btn-primary px-3 shadow  my-4 `}
          onClick={handleAddExtraFieldInArray}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          Add Extra Field
        </div>
      </div>
      <div className="border mb-4">
        {extraFieldsArray?.length === 0 ? (
          <p className="p-4">Extra Fields Will Display Here</p>
        ) : (
          extraFieldsArray?.map((singleItem, index) => {
            return (
              <div className="px-3 py-2  mt-3 rounded" key={index}>
                <div>
                  <i
                    className="fa fa-trash text-danger mx-2 f-18 cursor-pointer"
                    onClick={() => handleDeleteExtraField(singleItem?.id)}
                  ></i>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-12">
                    <label>Add heading here</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter heading"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="heading"
                      value={singleItem?.heading}
                      onChange={(event) =>
                        handleChangeExtraField(event, singleItem?.id)
                      }
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
                      value={singleItem?.data}
                      name="data"
                      onChange={(event) =>
                        handleChangeExtraField(event, singleItem?.id)
                      }
                    ></textarea>
                    <label className="word-limit-info label-text">
                      Maximum 5000 words
                    </label>
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        )}
        {extraFieldsArray?.length !== 0 && (
          <div className="col-lg-2 px-3 py-2">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${
                createExtraFieldsLoading && "disabled"
              }`}
              onClick={handleAddExtraField}
            >
              <span className="btn-label me-2">
                <i className="fa fa-check-circle f-18"></i>
              </span>
              {createExtraFieldsLoading ? "Loading.." : "Save"}
            </div>
          </div>
        )}
      </div>

      {/* Add Extra Fields */}

      {/* Extra Fields Ends */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Annexure</label>
          <RichTextEditor
            initialValue={reportObject?.annexure}
            handleChangeAnnexure={handleChangeAnnexure}
          />
          <label className="word-limit-info label-text">
            Maximum 5000 words
          </label>
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
