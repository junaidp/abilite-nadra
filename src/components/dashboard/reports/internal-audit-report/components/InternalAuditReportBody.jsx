import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import ReportFirstLayout from "./ReportFirstLayout";
import UpdateRichTextEditor from "../../../../common/update-rich-text-editor/UpdateRichTextEditor";
import ExtraFields from "./ExtraFields";
import FileUpload from "./FileUpload";
import InternalReportObservations from "./InternalReportObservations";
import {
  setupCreateExtraFields,
  resetInternalAuditReportExtraFieldsAddSuccess,
  setupUpdateExtraField,
} from "../../../../../global-redux/reducers/reports/internal-audit-report/slice";

const InternalAuditReportBody = ({
  reportObject,
  handleChangeReportObject,
  handleSaveInternalAuditReport,
  addReportLoading,
  handleChangeExtraFields,
  onContentChange,

  onAttachmentsChange,
}) => {
  const dispatch = useDispatch();
  const [extraFieldsArray, setExtraFieldsArray] = useState([]);
  const { createExtraFieldsLoading } = useSelector(
    (state) => state?.internalAuditReport
  );

  const handleUpdateExtraField = useCallback(
    (item) => {
      if (!createExtraFieldsLoading) {
        dispatch(setupUpdateExtraField(item));
      }
    },
    [dispatch, createExtraFieldsLoading]
  );

  const handleDeleteExtraField = useCallback((id) => {
    setExtraFieldsArray((current) =>
      current.filter((field) => field?.id !== id)
    );
  }, []);

  const handleAddExtraFieldInArray = useCallback(() => {
    setExtraFieldsArray((current) => [
      ...current,
      { id: uuidv4(), data: "data", heading: "heading" },
    ]);
  }, []);

  const handleAddExtraField = useCallback(async () => {
    if (extraFieldsArray.length === 0) {
      toast.error("Provide both values");
      return;
    }

    if (!createExtraFieldsLoading) {
      dispatch(
        setupCreateExtraFields({
          reportId: reportObject?.id,
          extraFieldsArray: extraFieldsArray.map(({ heading, data }) => ({
            heading,
            data,
          })),
        })
      );
    }
  }, [dispatch, reportObject?.id, extraFieldsArray, createExtraFieldsLoading]);

  const handleChangeExtraField = useCallback((event, id) => {
    const { name, value } = event?.target || {};
    setExtraFieldsArray((current) =>
      current.map((field) =>
        field?.id === id ? { ...field, [name]: value } : field
      )
    );
  }, []);

  const { internalAuditReportExtraFieldsAddSuccess } = useSelector(
    (state) => state?.internalAuditReport
  );

  useEffect(() => {
    if (internalAuditReportExtraFieldsAddSuccess) {
      setExtraFieldsArray([]);
      dispatch(resetInternalAuditReportExtraFieldsAddSuccess());
    }
  }, [internalAuditReportExtraFieldsAddSuccess, dispatch]);

  const renderRichTextSection = useCallback(
    (label, name, value) => (
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>{label}</label>
          <UpdateRichTextEditor
            initialValue={value}
            name={name}
            onContentChange={onContentChange}
          />
        </div>
      </div>
    ),
    [onContentChange]
  );

  return (
    <div>
      <ReportFirstLayout
        reportObject={reportObject}
        handleChangeReportObject={handleChangeReportObject}
      />

      <div className="border px-3 py-2 mt-3 rounded">
        {renderRichTextSection("Identification", "annexure", reportObject?.annexure)}
        {renderRichTextSection(
          "Executive summary",
          "executiveSummary",
          reportObject?.executiveSummary
        )}
        {renderRichTextSection(
          "Financial & Operational Key Figures",
          "auditPurpose",
          reportObject?.auditPurpose
        )}
        {renderRichTextSection(
          "Summary Of Main Findings",
          "keyFindings",
          reportObject?.keyFindings
        )}
      </div>

      <InternalReportObservations reportObject={reportObject} />

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

      <div className="mt-4">
        <FileUpload
          item={reportObject}
          onAttachmentsChange={onAttachmentsChange}
        />
      </div>

      <div className="row my-3">
        <div className="col-lg-12 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-labeled btn-primary px-3 shadow me-3 fitContent"
            disabled={addReportLoading}
            onClick={handleSaveInternalAuditReport}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18" aria-hidden="true" />
            </span>
            {addReportLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternalAuditReportBody;
