import { toast } from "react-toastify";
import TableBody from "../components/TableBody";
import React from "react";
import {
  setupUpdateObjective,
  setupUpdateRisk,
  setupUpdateControl,
  setupUpdateProgram,
} from "../../../../../../global-redux/reducers/settings/risk-control-matrix/slice";
import { useDispatch } from "react-redux";

const AccordionItem = ({
  item,
  setUpdatedRCMId,
  setShowUpdateRCMDialog,
  setRiskControlMatrix,
  loading,
  rcmAddSuccess,
  userHierarchy,
  userRole,
  setShowDeleteRCMDialog,
}) => {
  const dispatch = useDispatch();
  function handleEditableObjective(objectiveId) {
    setRiskControlMatrix((pre) => {
      return pre?.map((singleItem) =>
        Number(singleItem?.id) === Number(item?.id)
          ? {
              ...singleItem,
              rcmLibraryObjectives: singleItem?.rcmLibraryObjectives?.map(
                (objective) =>
                  Number(objective?.id) === Number(objectiveId)
                    ? { ...objective, editable: true }
                    : objective
              ),
            }
          : singleItem
      );
    });
  }
  function handleChangeObjective(event, objectiveId) {
    setRiskControlMatrix((pre) => {
      return pre?.map((singleItem) =>
        Number(singleItem?.id) === Number(item?.id)
          ? {
              ...singleItem,
              rcmLibraryObjectives: singleItem?.rcmLibraryObjectives?.map(
                (objective) =>
                  Number(objective?.id) === Number(objectiveId)
                    ? {
                        ...objective,
                        [event?.target?.name]: event?.target?.value,
                      }
                    : objective
              ),
            }
          : singleItem
      );
    });
  }
  function handleEditableRisk(objectiveId, riskId) {
    setRiskControlMatrix((pre) => {
      return pre?.map((singleItem) =>
        Number(singleItem?.id) === Number(item?.id)
          ? {
              ...singleItem,
              rcmLibraryObjectives: singleItem?.rcmLibraryObjectives?.map(
                (objective) =>
                  Number(objective?.id) === Number(objectiveId)
                    ? {
                        ...objective,
                        rcmLibraryRiskRating:
                          objective?.rcmLibraryRiskRating?.map((risk) =>
                            Number(risk?.id) === Number(riskId)
                              ? { ...risk, editable: true }
                              : risk
                          ),
                      }
                    : objective
              ),
            }
          : singleItem
      );
    });
  }
  function handleChangeRisk(event, objectiveId, riskId) {
    setRiskControlMatrix((pre) => {
      return pre?.map((singleItem) =>
        Number(singleItem?.id) === Number(item?.id)
          ? {
              ...singleItem,
              rcmLibraryObjectives: singleItem?.rcmLibraryObjectives?.map(
                (objective) =>
                  Number(objective?.id) === Number(objectiveId)
                    ? {
                        ...objective,
                        rcmLibraryRiskRating:
                          objective?.rcmLibraryRiskRating?.map((risk) =>
                            Number(risk?.id) === Number(riskId)
                              ? {
                                  ...risk,
                                  [event?.target?.name]: event?.target?.value,
                                }
                              : risk
                          ),
                      }
                    : objective
              ),
            }
          : singleItem
      );
    });
  }
  function handleEditableControl(objectiveId, riskId, controlId) {
    setRiskControlMatrix((pre) => {
      return pre?.map((singleItem) =>
        Number(singleItem?.id) === Number(item?.id)
          ? {
              ...singleItem,
              rcmLibraryObjectives: singleItem?.rcmLibraryObjectives?.map(
                (objective) =>
                  Number(objective?.id) === Number(objectiveId)
                    ? {
                        ...objective,
                        rcmLibraryRiskRating:
                          objective?.rcmLibraryRiskRating?.map((risk) =>
                            Number(risk?.id) === Number(riskId)
                              ? {
                                  ...risk,
                                  rcmLibraryControlRisk:
                                    risk?.rcmLibraryControlRisk?.map(
                                      (control) =>
                                        Number(control?.id) ===
                                        Number(controlId)
                                          ? { ...control, editable: true }
                                          : control
                                    ),
                                }
                              : risk
                          ),
                      }
                    : objective
              ),
            }
          : singleItem
      );
    });
  }
  function handleChangeControl(event, objectiveId, riskId, controlId) {
    setRiskControlMatrix((pre) => {
      return pre?.map((singleItem) =>
        Number(singleItem?.id) === Number(item?.id)
          ? {
              ...singleItem,
              rcmLibraryObjectives: singleItem?.rcmLibraryObjectives?.map(
                (objective) =>
                  Number(objective?.id) === Number(objectiveId)
                    ? {
                        ...objective,
                        rcmLibraryRiskRating:
                          objective?.rcmLibraryRiskRating?.map((risk) =>
                            Number(risk?.id) === Number(riskId)
                              ? {
                                  ...risk,
                                  rcmLibraryControlRisk:
                                    risk?.rcmLibraryControlRisk?.map(
                                      (control) =>
                                        Number(control?.id) ===
                                        Number(controlId)
                                          ? {
                                              ...control,
                                              [event?.target?.name]:
                                                event?.target?.value,
                                            }
                                          : control
                                    ),
                                }
                              : risk
                          ),
                      }
                    : objective
              ),
            }
          : singleItem
      );
    });
  }
  function handleEditableProgram(objectiveId, riskId, controlId, programId) {
    setRiskControlMatrix((pre) => {
      return pre?.map((singleItem) =>
        Number(singleItem?.id) === Number(item?.id)
          ? {
              ...singleItem,
              rcmLibraryObjectives: singleItem?.rcmLibraryObjectives?.map(
                (objective) =>
                  Number(objective?.id) === Number(objectiveId)
                    ? {
                        ...objective,
                        rcmLibraryRiskRating:
                          objective?.rcmLibraryRiskRating?.map((risk) =>
                            Number(risk?.id) === Number(riskId)
                              ? {
                                  ...risk,
                                  rcmLibraryControlRisk:
                                    risk?.rcmLibraryControlRisk?.map(
                                      (control) =>
                                        Number(control?.id) ===
                                        Number(controlId)
                                          ? {
                                              ...control,
                                              rcmLibraryAuditProgramsList:
                                                control?.rcmLibraryAuditProgramsList?.map(
                                                  (program) =>
                                                    Number(program?.id) ===
                                                    Number(programId)
                                                      ? {
                                                          ...program,
                                                          editable: true,
                                                        }
                                                      : program
                                                ),
                                            }
                                          : control
                                    ),
                                }
                              : risk
                          ),
                      }
                    : objective
              ),
            }
          : singleItem
      );
    });
  }

  function handleSaveObjective(item) {
    if (!loading) {
      if (item?.description === "" || item?.rating === "") {
        toast.error("Provide all values");
      } else {
        dispatch(setupUpdateObjective(item));
      }
    }
  }

  function handleSaveRisk(item) {
    if (!loading) {
      if (item?.description === "" || item?.rating === "") {
        toast.error("Provide all values");
      } else {
        dispatch(setupUpdateRisk(item));
      }
    }
  }

  function handleSaveControl(item) {
    if (!loading) {
      if (item?.description === "" || item?.rating === "") {
        toast.error("Provide all values");
      } else {
        dispatch(setupUpdateControl(item));
      }
    }
  }

  function handleSaveProgram(item) {
    if (!loading) {
      if (item?.description === "" || item?.rating === "") {
        toast.error("Provide all values");
      } else {
        dispatch(setupUpdateProgram(item));
      }
    }
  }

  function handleChangeProgram(
    event,
    objectiveId,
    riskId,
    controlId,
    programId
  ) {
    setRiskControlMatrix((pre) => {
      return pre?.map((singleItem) =>
        Number(singleItem?.id) === Number(item?.id)
          ? {
              ...singleItem,
              rcmLibraryObjectives: singleItem?.rcmLibraryObjectives?.map(
                (objective) =>
                  Number(objective?.id) === Number(objectiveId)
                    ? {
                        ...objective,
                        rcmLibraryRiskRating:
                          objective?.rcmLibraryRiskRating?.map((risk) =>
                            Number(risk?.id) === Number(riskId)
                              ? {
                                  ...risk,
                                  rcmLibraryControlRisk:
                                    risk?.rcmLibraryControlRisk?.map(
                                      (control) =>
                                        Number(control?.id) ===
                                        Number(controlId)
                                          ? {
                                              ...control,
                                              rcmLibraryAuditProgramsList:
                                                control?.rcmLibraryAuditProgramsList?.map(
                                                  (program) =>
                                                    Number(program?.id) ===
                                                    Number(programId)
                                                      ? {
                                                          ...program,
                                                          [event?.target?.name]:
                                                            event?.target
                                                              ?.value,
                                                        }
                                                      : program
                                                ),
                                            }
                                          : control
                                    ),
                                }
                              : risk
                          ),
                      }
                    : objective
              ),
            }
          : singleItem
      );
    });
  }
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed br-8"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${item?.id}`}
          aria-expanded="false"
          aria-controls={`flush-collapseFive${item?.id}`}
        >
          <div className="d-flex w-100 me-3 align-items-center justify-content-between">
            <div className=" d-flex align-items-center">
              {item?.description}
            </div>
          </div>
        </button>
      </h2>
      <div
        id={`flush-collapse${item?.id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {(userRole === "ADMIN" || userHierarchy === "IAH") && (
            <div className="row mx-0">
              <div
                className="col-lg-2"
                onClick={() => {
                  setShowUpdateRCMDialog(true);
                  setUpdatedRCMId(item?.id);
                }}
              >
                <div className="btn btn-labeled btn-primary  shadow">
                  Update RCM
                </div>
              </div>
              <div className="col-lg-2">
                <div
                  className={`btn btn-labeled btn-danger  shadow`}
                  onClick={() => {
                    setShowDeleteRCMDialog(true);
                    setUpdatedRCMId(item?.id);
                  }}
                >
                  Delete RCM
                </div>
              </div>
            </div>
          )}
          <div className="container">
            <div className="row py-4">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead>
                      <tr>
                        <th>Objective</th>
                        <th>Risk</th>
                        <th>Control</th>
                        <th>Program</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item?.rcmLibraryObjectives?.length === 0 ? (
                        <tr>
                          <td>No Objective Added Till Now</td>
                        </tr>
                      ) : (
                        item?.rcmLibraryObjectives?.map((objective, index) => {
                          return (
                            <TableBody
                              objective={objective}
                              key={index}
                              handleEditableObjective={handleEditableObjective}
                              handleChangeObjective={handleChangeObjective}
                              handleEditableRisk={handleEditableRisk}
                              handleChangeRisk={handleChangeRisk}
                              handleEditableControl={handleEditableControl}
                              handleChangeControl={handleChangeControl}
                              handleEditableProgram={handleEditableProgram}
                              handleChangeProgram={handleChangeProgram}
                              handleSaveObjective={handleSaveObjective}
                              handleSaveRisk={handleSaveRisk}
                              handleSaveControl={handleSaveControl}
                              handleSaveProgram={handleSaveProgram}
                              loading={loading}
                              rcmAddSuccess={rcmAddSuccess}
                              userHierarchy={userHierarchy}
                              userRole={userRole}
                            />
                          );
                        })
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

export default AccordionItem;
