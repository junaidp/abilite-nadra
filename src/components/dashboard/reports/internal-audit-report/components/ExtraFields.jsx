import React, { useCallback, useMemo } from "react";

/**
 * ExtraFields Component
 * ---------------------
 * Renders and manages additional fields in an internal audit report.
 * Includes both existing fields (fetched from the report object)
 * and newly added fields (stored locally until saved).
 */
const ExtraFields = ({
  reportObject,
  handleChangeExtraFields,
  createExtraFieldsLoading,
  handleUpdateExtraField,
  handleAddExtraFieldInArray,
  extraFieldsArray,
  handleDeleteExtraField,
  handleChangeExtraField,
  handleAddExtraField,
}) => {
  // ✅ Memoize list to avoid unnecessary recalculations
  const existingExtraFields = useMemo(
    () => reportObject?.intAuditExtraFieldsList || [],
    [reportObject]
  );

  // ✅ Helper to render textarea with character limit
  const renderTextarea = useCallback(
    (label, name, value, onChange) => (
      <div className="row mb-3">
        <div className="col-lg-12">
          <label>{label}</label>
          <textarea
            placeholder={`Enter ${label.toLowerCase()}`}
            rows="3"
            value={value || ""}
            name={name}
            onChange={onChange}
            className={`form-control ${value?.length >= 3000 ? "error-border" : ""}`}
            maxLength="3000"
          />
          <p className="word-limit-info label-text mb-2">
            Maximum 3000 characters
          </p>
        </div>
      </div>
    ),
    []
  );

  // ✅ Render existing saved fields
  const renderExistingFields = useMemo(() => {
    if (!existingExtraFields || existingExtraFields.length === 0) {
      return <p>No Extra Field Added Till Now</p>;
    }

    return existingExtraFields.map((item, index) => (
      <div className="border px-3 py-2 mt-3 rounded" key={index}>
        {renderTextarea("Heading", "heading", item?.heading, (e) =>
          handleChangeExtraFields(e, item?.id)
        )}
        {renderTextarea("Data", "data", item?.data, (e) =>
          handleChangeExtraFields(e, item?.id)
        )}

        <div className="col-lg-4">
          <div
            className={`btn btn-labeled btn-primary px-3 shadow my-4 ${createExtraFieldsLoading ? "disabled" : ""
              }`}
            onClick={() => handleUpdateExtraField(item)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            {createExtraFieldsLoading ? "Loading.." : "Update Extra Field"}
          </div>
        </div>
      </div>
    ));
  }, [existingExtraFields, renderTextarea, handleChangeExtraFields, handleUpdateExtraField, createExtraFieldsLoading]);

  // ✅ Render new fields added locally
  const renderNewFields = useMemo(() => {
    if (!extraFieldsArray || extraFieldsArray.length === 0) {
      return <p className="p-4">Extra Fields Will Display Here</p>;
    }

    return extraFieldsArray.map((item, index) => (
      <div className="px-3 py-2 mt-3 rounded" key={index}>
        {/* Delete button */}
        <div>
          <i
            className="fa fa-trash text-danger mx-2 f-18 cursor-pointer"
            onClick={() => handleDeleteExtraField(item?.id)}
          ></i>
        </div>

        {renderTextarea("Add heading here", "heading", item?.heading, (e) =>
          handleChangeExtraField(e, item?.id)
        )}

        {renderTextarea("Add data here", "data", item?.data, (e) =>
          handleChangeExtraField(e, item?.id)
        )}
        <hr />
      </div>
    ));
  }, [extraFieldsArray, renderTextarea, handleChangeExtraField, handleDeleteExtraField]);

  return (
    <div>
      {/* Section Header */}
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading fw-bold">Add Additional Fields</div>
        </div>
      </div>

      {/* Existing Extra Fields */}
      {renderExistingFields}

      {/* Add New Field Button */}
      <div className="col-lg-2 mb-4">
        <div
          className="btn btn-labeled btn-primary px-3 shadow my-4"
          onClick={handleAddExtraFieldInArray}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          Add Extra Field
        </div>
      </div>

      {/* New Fields Section */}
      <div className="border mb-4">
        {renderNewFields}

        {/* Save Button (only when there are new fields) */}
        {extraFieldsArray?.length > 0 && (
          <div className="col-lg-2 px-3 py-2">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow my-4 ${createExtraFieldsLoading ? "disabled" : ""
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
    </div>
  );
};

export default ExtraFields;
