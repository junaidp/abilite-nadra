import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setupUpdateAuditProgram } from "../../../../../../global-redux/reducers/audit-engagement/slice";

const AuditProgram = ({
  currentAuditEngagement,
  setCurrentAuditEngagement,
  setShowAddAuditProgramDialog,
}) => {
  const dispatch = useDispatch();
  const { loading, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const [currentButtonId, setCurrentButtonId] = React.useState("");
  function handleChange(event, id) {
    setCurrentAuditEngagement((pre) => {
      return {
        ...pre,
        auditProgram: {
          ...pre?.auditProgram,
          programList: pre?.auditProgram?.programList?.map((program) =>
            Number(program?.id) === Number(id)
              ? { ...program, [event?.target?.name]: event?.target?.value }
              : program
          ),
        },
      };
    });
  }

  function handleUpdate(item) {
    if (!loading) {
      setCurrentButtonId(item?.id);
      if (
        item?.description === "" ||
        item?.rating === "" ||
        item?.controlRisk_id === ""
      ) {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupUpdateAuditProgram({
            id: item?.id,
            description: item?.description,
            rating: item?.rating,
            controlRisk_id: item?.controlRisk_id,
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setCurrentButtonId("");
    }
  }, [auditEngagementAddSuccess]);
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed br-8"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFive"
          aria-expanded="false"
          aria-controls="flush-collapseFive"
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {currentAuditEngagement?.auditProgram !== null && (
                <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
              )}
              Audit Program
            </div>
          </div>
        </button>
      </h2>
      <div
        id="flush-collapseFive"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <div className="container">
            <div className="row mb-2">
              <div className="col-lg-12">
                <button
                  className="btn btn-labeled float-end btn-primary px-3 mt-3 shadow"
                  onClick={() => setShowAddAuditProgramDialog(true)}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-eye"></i>
                  </span>
                  Add Audit Program
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead>
                      <tr>
                        <th>Sr. #</th>
                        <th>Controls</th>
                        <th>Rating</th>
                        <th>Program</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAuditEngagement?.auditProgram?.programList?.map(
                        (item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item?.id}</td>
                              <td>
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlT"
                                  rows="3"
                                  value={item?.description}
                                  name="description"
                                  onChange={(event) =>
                                    handleChange(event, item?.id)
                                  }
                                ></textarea>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={item?.rating}
                                    name="rating"
                                    onChange={(event) =>
                                      handleChange(event, item?.id)
                                    }
                                  >
                                    <option value="">Select One</option>
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                  </select>
                                </div>
                              </td>
                              <td>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={item?.controlRisk_id}
                                  name="controlRisk_id"
                                  onChange={(event) =>
                                    handleChange(event, item?.id)
                                  }
                                >
                                  <option value="">Select One</option>
                                  {currentAuditEngagement?.riskControlMatrix?.objectives?.map(
                                    (objective) =>
                                      objective?.riskRatingList?.map((risk) =>
                                        risk?.controlRiskList?.map(
                                          (control, i) => {
                                            return (
                                              <option
                                                value={control?.id}
                                                key={i}
                                              >
                                                {control?.description}
                                              </option>
                                            );
                                          }
                                        )
                                      )
                                  )}
                                </select>
                              </td>
                              <td>
                                <button
                                  className={`btn btn-labeled mt-2 btn-primary shadow ${
                                    loading &&
                                    item?.id === currentButtonId &&
                                    "disabled"
                                  }`}
                                  onClick={() => handleUpdate(item)}
                                >
                                  <span className="btn-label me-2">
                                    <i className="fa fa-save"></i>
                                  </span>
                                  {loading && item?.id === currentButtonId
                                    ? "Loading..."
                                    : "Update"}
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditProgram;
