import React from "react";

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
  return (
    <div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Add Additional Fields</div>
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
                    maxLength="500"
                  ></textarea>
                  <p className="word-limit-info label-text mb-2">
                    Maximum 500 characters
                  </p>{" "}
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
                    maxlength="500"
                  ></textarea>
                  <p className="word-limit-info label-text mb-2">
                    Maximum 500 characters
                  </p>{" "}
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
                      maxlength="500"
                    ></textarea>
                    <p className="word-limit-info label-text mb-2">
                      Maximum 500 characters
                    </p>
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
                      maxlength="500"
                    ></textarea>
                    <p className="word-limit-info label-text mb-2">
                      Maximum 500 characters
                    </p>
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
    </div>
  );
};

export default ExtraFields;
