import React, { useCallback } from "react";

/**
 * ExtraFields Component
 * ---------------------
 * Handles rendering and managing both persisted extra fields (from reportObject)
 * and new dynamic extra fields (from extraFieldsArray).
 * Developers: Avoid duplicating textarea logic—reusable components have been extracted below.
 */

// Reusable TextArea with label and word limit
const LabeledTextArea = ({ label, value, name, onChange, id, maxLength = 3000 }) => (
  <div className="row mb-3">
    <div className="col-lg-12">
      <label>{label}</label>
      <textarea
        placeholder={`Enter ${label.toLowerCase()}`}
        id={id}
        rows="3"
        value={value || ""}
        name={name}
        onChange={onChange}
        maxLength={maxLength}
        className={`form-control ${value?.length >= maxLength ? "error-border" : ""}`}
      />
      <p className="word-limit-info label-text mb-2">Maximum {maxLength} characters</p>
    </div>
  </div>
);

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
  // Memoized handlers to avoid re-creating inline functions
  const onChangePersistedField = useCallback(
    (event, id) => handleChangeExtraFields(event, id),
    [handleChangeExtraFields]
  );

  const onChangeNewField = useCallback(
    (event, id) => handleChangeExtraField(event, id),
    [handleChangeExtraField]
  );

  return (
    <div>
      {/* Section Title */}
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading fw-bold">Add Additional Fields</div>
        </div>
      </div>

      {/* Persisted Extra Fields */}
      {reportObject?.intAuditExtraFieldsList?.length === 0 ? (
        <p>No Extra Field Added Till Now</p>
      ) : (
        reportObject?.intAuditExtraFieldsList?.map((item, index) => (
          <div className="border px-3 py-2 mt-3 rounded" key={item?.id || index}>
            <LabeledTextArea
              label="Heading"
              value={item?.heading}
              name="heading"
              id={`persisted-heading-${index}`}
              onChange={(e) => onChangePersistedField(e, item?.id)}
            />

            <LabeledTextArea
              label="Data"
              value={item?.data}
              name="data"
              id={`persisted-data-${index}`}
              onChange={(e) => onChangePersistedField(e, item?.id)}
            />

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
        ))
      )}

      {/* Add New Extra Field Button */}
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

      {/* Dynamic Extra Fields Section */}
      <div className="border mb-4">
        {extraFieldsArray?.length === 0 ? (
          <p className="p-4">Extra Fields Will Display Here</p>
        ) : (
          extraFieldsArray.map((singleItem, index) => (
            <div className="px-3 py-2 mt-3 rounded" key={singleItem?.id || index}>
              {/* Delete Icon */}
              <div>
                <i
                  className="fa fa-trash text-danger mx-2 f-18 cursor-pointer"
                  onClick={() => handleDeleteExtraField(singleItem?.id)}
                />
              </div>

              <LabeledTextArea
                label="Add heading here"
                value={singleItem?.heading}
                name="heading"
                id={`new-heading-${index}`}
                onChange={(e) => onChangeNewField(e, singleItem?.id)}
              />

              <LabeledTextArea
                label="Add data here"
                value={singleItem?.data}
                name="data"
                id={`new-data-${index}`}
                onChange={(e) => onChangeNewField(e, singleItem?.id)}
              />

              <hr />
            </div>
          ))
        )}

        {/* Save Button for Dynamic Fields */}
        {extraFieldsArray?.length !== 0 && (
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
