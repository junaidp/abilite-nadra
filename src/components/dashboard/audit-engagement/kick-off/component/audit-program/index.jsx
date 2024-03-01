import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setupUpdateAuditProgram,
  setupUpdateAuditProgramApproval,
} from "../../../../../../global-redux/reducers/audit-engagement/slice";
const AuditProgram = ({
  currentAuditEngagement,
  setCurrentAuditEngagement,
  setShowAddAuditProgramDialog,
  auditEngagementId,
  singleAuditEngagementObject,
}) => {
  const dispatch = useDispatch();
  const { loading, auditEngagementAddSuccess } = useSelector(
    (state) => state?.auditEngagement
  );
  const { user } = useSelector((state) => state?.auth);
  const [controlList, setControlList] = React.useState([]);
  const [currentButtonId, setCurrentButtonId] = React.useState("");
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);

  function handleEditable(item) {
    setCurrentAuditEngagement((pre) => {
      return {
        ...pre,
        auditProgram: {
          ...pre?.auditProgram,
          programList: pre?.auditProgram?.programList?.map((program) =>
            program?.id === item?.id ? { ...program, editable: true } : program
          ),
        },
      };
    });
  }

  function handleSubmit() {
    dispatch(
      setupUpdateAuditProgramApproval({
        auditProgram: {
          ...currentAuditEngagement?.auditProgram,
          submitted: true,
        },
        engagement_id: Number(auditEngagementId),
      })
    );
  }

  function handleApprove() {
    dispatch(
      setupUpdateAuditProgramApproval({
        auditProgram: {
          ...currentAuditEngagement?.auditProgram,
          approved: true,
        },
        engagement_id: Number(auditEngagementId),
      })
    );
  }

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
      if (!item?.description || !item?.rating) {
        toast.error("Provide all values");
      } else {
        dispatch(
          setupUpdateAuditProgram({
            program: {
              id: item?.id,
              description: item?.description,
              rating: Number(item?.rating),
              controlRisk_id: item?.controlRisk_id,
            },
            engagement_id: Number(auditEngagementId),
          })
        );
      }
    }
  }

  function getDescription(id) {
    if (controlList?.length !== 0) {
      return controlList?.find((all) => Number(all?.id) === Number(id))
        ?.description;
    }
  }

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setCurrentButtonId("");
    }
  }, [auditEngagementAddSuccess]);

  React.useEffect(() => {
    let array = [];
    currentAuditEngagement?.riskControlMatrix?.objectives?.map((objective) =>
      objective?.riskRatingList?.map((risk) =>
        risk?.controlRiskList?.map((control) => (array = [...array, control]))
      )
    );
    setControlList(array);
  }, [currentAuditEngagement]);

  React.useEffect(() => {
    if (singleAuditEngagementObject?.auditProgram !== null) {
      let submit = true;
      singleAuditEngagementObject?.auditProgram?.programList?.forEach(
        (singleItem) => {
          if (!singleItem?.description || !singleItem?.rating) {
            submit = false;
          }
        }
      );
      setShowSubmitButton(submit);
    }
  }, [singleAuditEngagementObject]);

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
              {currentAuditEngagement?.auditProgram !== null &&
                currentAuditEngagement?.auditProgram?.programList?.length !==
                  0 &&
                showSubmitButton === true && (
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
              {currentAuditEngagement?.auditProgram?.approved !== true && (
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
              )}
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead>
                      <tr>
                        <th>Sr. #</th>
                        <th>Control</th>
                        <th>Rating</th>
                        <th>Audit Program</th>
                        {currentAuditEngagement?.auditProgram?.approved !==
                          true && <th>Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {currentAuditEngagement?.auditProgram?.programList
                        ?.length === 0 ||
                      currentAuditEngagement?.auditProgram === null ? (
                        <tr>
                          <td className="w-300">No program list to show</td>
                        </tr>
                      ) : (
                        currentAuditEngagement?.auditProgram?.programList?.map(
                          (item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item?.id}</td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    id="exampleFormControlT"
                                    rows="3"
                                    value={
                                      getDescription(item?.controlRisk_id) ||
                                      "null"
                                    }
                                    readOnly
                                    disabled
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
                                      disabled={
                                        item?.editable === true &&
                                        currentAuditEngagement?.auditProgram
                                          ?.approved !== true
                                          ? false
                                          : true
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
                                  <textarea
                                    className="form-control"
                                    id="exampleFormControlT"
                                    rows="3"
                                    value={item?.description || ""}
                                    name="description"
                                    onChange={(event) =>
                                      handleChange(event, item?.id)
                                    }
                                    disabled={
                                      item?.editable === true &&
                                      currentAuditEngagement?.auditProgram
                                        ?.approved !== true
                                        ? false
                                        : true
                                    }
                                  ></textarea>
                                </td>
                                {currentAuditEngagement?.auditProgram
                                  ?.approved !== true && (
                                  <td>
                                    {item?.editable === false && (
                                      <i
                                        className="fa fa-edit  px-3 f-18 cursor-pointer"
                                        onClick={() => handleEditable(item)}
                                      ></i>
                                    )}
                                    {item?.editable === true && (
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
                                          : "Save"}
                                      </button>
                                    )}
                                  </td>
                                )}
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                {showSubmitButton &&
                  currentAuditEngagement?.auditProgram?.submitted === false && (
                    <div className="justify-content-end text-end">
                      <button
                        className={`btn btn-labeled mt-2 btn-primary shadow  ${
                          loading && "disabled"
                        }`}
                        onClick={() => handleSubmit()}
                      >
                        <span className="btn-label me-2">
                          <i className="fa fa-save"></i>
                        </span>
                        {loading ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  )}
                {currentAuditEngagement?.auditProgram?.submitted === true &&
                  currentAuditEngagement?.auditProgram?.approved === false &&
                  (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
                    Number(user[0]?.userId?.id) ===
                      Number(
                        currentAuditEngagement?.resourceAllocation
                          ?.backupHeadOfInternalAudit?.id
                      ) ||
                    Number(user[0]?.userId?.id) ===
                      Number(
                        currentAuditEngagement?.resourceAllocation
                          ?.proposedJobApprover?.id
                      )) && (
                    <div className="justify-content-end text-end">
                      <button
                        className={`btn btn-labeled mt-2 btn-primary shadow  ${
                          loading && "disabled"
                        }`}
                        onClick={() => handleApprove()}
                      >
                        <span className="btn-label me-2">
                          <i className="fa fa-save"></i>
                        </span>
                        {loading ? "Loading..." : "Approve"}
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditProgram;
