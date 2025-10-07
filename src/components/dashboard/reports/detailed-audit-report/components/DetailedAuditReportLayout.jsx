import React, { useState, useEffect, useCallback } from "react";
import ReportFirstLayout from "./ReportFirstLayout";
import UpdateRichTextEditor from "../../../../common/update-rich-text-editor/UpdateRichTextEditor";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setupCreateExtraFields,
  resetInternalAuditReportExtraFieldsAddSuccess,
  setupUpdateExtraField,
} from "../../../../../global-redux/reducers/reports/consolidation-report/slice";
import { v4 as uuidv4 } from "uuid";
import ExtraFields from "./ExtraFields";
import FileUpload from "./FileUpload";
import ConsolidatedObservations from "./ConsolidatedObservataions";

const DetailedAuditReportLayout = ({
  reportObject,
  handleChangeReportObject,
  handleSaveInternalAuditReport,
  addReportLoading,
  handleChangeExtraFields,
  setDeleteFileId,
  consolidatedObservations,
  onContentChange,
}) => {
  const dispatch = useDispatch();
  const [extraFieldsArray, setExtraFieldsArray] = useState([]);

  const { createExtraFieldsLoading, internalAuditReportExtraFieldsAddSuccess } =
    useSelector((state) => state?.consolidationReport);

  // Update existing extra field
  const handleUpdateExtraField = useCallback(
    (item) => {
      if (!createExtraFieldsLoading) {
        dispatch(setupUpdateExtraField(item));
      }
    },
    [dispatch, createExtraFieldsLoading]
  );

  // Remove extra field by id
  const handleDeleteExtraField = useCallback((id) => {
    setExtraFieldsArray((prev) => prev?.filter((all) => all?.id !== id));
  }, []);

  // Add placeholder extra field to array
  const handleAddExtraFieldInArray = useCallback(() => {
    setExtraFieldsArray((prev) => [
      ...prev,
      { id: uuidv4(), data: "data", heading: "heading" },
    ]);
  }, []);

  // Save extra fields to backend
  const handleAddExtraField = useCallback(() => {
    if (extraFieldsArray?.length === 0) {
      toast.error("Provide both values");
      return;
    }

    if (!createExtraFieldsLoading) {
      dispatch(
        setupCreateExtraFields({
          consolidatedInternalAuditReportId: reportObject?.id,
          extraFieldsArray: extraFieldsArray.map((item) => ({
            data: item?.data,
            heading: item?.heading,
          })),
        })
      );
    }
  }, [dispatch, extraFieldsArray, createExtraFieldsLoading, reportObject?.id]);

  // Handle inline changes for extra fields
  const handleChangeExtraField = useCallback((event, id) => {
    setExtraFieldsArray((prev) =>
      prev?.map((all) =>
        all?.id === id
          ? { ...all, [event?.target?.name]: event?.target?.value }
          : all
      )
    );
  }, []);

  // Reset local state when extra fields are successfully added
  useEffect(() => {
    if (internalAuditReportExtraFieldsAddSuccess === true) {
      setExtraFieldsArray([]);
      dispatch(resetInternalAuditReportExtraFieldsAddSuccess());
    }
  }, [internalAuditReportExtraFieldsAddSuccess, dispatch]);

  return (
    <div>
      {/* Top section layout */}
      <ReportFirstLayout
        reportObject={reportObject}
        handleChangeReportObject={handleChangeReportObject}
        isReadOnly={false}
      />

      {/* Executive summary + Audit purpose editors */}
      <div className="border px-3 py-2 mt-3 rounded">
        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Executive summary</label>
            <UpdateRichTextEditor
              initialValue={reportObject?.executiveSummary}
              name="executiveSummary"
              onContentChange={onContentChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <label>Financial & Operational Key Figures</label>
            <UpdateRichTextEditor
              initialValue={reportObject?.auditPurpose}
              name="auditPurpose"
              onContentChange={onContentChange}
            />
          </div>
        </div>
      </div>

      {/* Consolidated Observations Section */}
      {consolidatedObservations && consolidatedObservations?.length !== 0 && (
        <ConsolidatedObservations
          consolidatedObservations={consolidatedObservations}
          reportObject={reportObject}
        />
      )}

      {/* Extra Fields Section */}
      <ExtraFields
        reportObject={reportObject}
        handleChangeExtraFields={handleChangeExtraFields}
        createExtraFieldsLoading={createExtraFieldsLoading}
        handleUpdateExtraField={handleUpdateExtraField}
        handleAddExtraFieldInArray={handleAddExtraFieldInArray}
        extraFieldsArray={extraFieldsArray}
        handleDeleteExtraField={handleDeleteExtraField}
        handleChangeExtraField={handleChangeExtraField}
        handleAddExtraField={handleAddExtraField}
      />

      {/* Annexure editor */}
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>Annexure</label>
          <UpdateRichTextEditor
            initialValue={reportObject?.annexure}
            name="annexure"
            onContentChange={onContentChange}
          />
        </div>
      </div>

      {/* File upload section */}
      <div className="mt-4">
        <FileUpload item={reportObject} setDeleteFileId={setDeleteFileId} />
      </div>

      {/* Save button */}
      <div className="row my-3">
        <div className="col-lg-12 d-flex justify-content-between">
          <div
            className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${addReportLoading && "disabled"
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

export default DetailedAuditReportLayout;
