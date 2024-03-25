import React from "react";

const ExtraFields = ({
  reportObject,
  handleChangeExtraFields,
  handleUpdateExtraField,
  createExtraFieldsLoading,
  handleAddExtraFieldInArray,
  extraFieldsArray,
  handleChangeExtraField,
  handleDeleteExtraField,
  handleAddExtraField,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default ExtraFields;
