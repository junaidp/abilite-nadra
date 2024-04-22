import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupUpdateAuditSteps,
  setupAddAuditStepObservation,
  setupUpdateAuditStepObservation,
  setupAuditStepObservationDelete,
} from "../../../global-redux/reducers/audit-engagement/slice";
import { toast } from "react-toastify";
import FirstLayout from "./components/FirstLayout";
import ObservationFileUpload from "./components/ObservationFileUpload";
const AuditStepsDialog = ({
  setShowAuditStepsDialog,
  auditStepId,
  currentAuditEngagement,
}) => {
  const dispatch = useDispatch();
  const [currentAuditStep, setCurrentAuditStep] = React.useState({});
  const [description, setDescription] = React.useState("");
  React.useState(false);
  const {
    auditEngagementAddSuccess,
    loading,
    auditEngagementObservationAddSuccess,
    singleAuditEngagementObject,
  } = useSelector((state) => state?.auditEngagement);
  const { user } = useSelector((state) => state?.auth);

  function handleChange(event) {
    setCurrentAuditStep((pre) => {
      return {
        ...pre,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleAddObservation() {
    if (!loading) {
      if (description === "") {
        toast.error("Provide the description");
      } else {
        dispatch(
          setupAddAuditStepObservation({
            description: description,
            stepId: auditStepId,
          })
        );
      }
    }
  }

  function handleSave() {
    if (!loading) {
      dispatch(setupUpdateAuditSteps(currentAuditStep));
    }
  }

  function handleChangeDescription(event, id) {
    setCurrentAuditStep((pre) => {
      return {
        ...pre,
        auditStepObservationsList: pre?.auditStepObservationsList?.map((item) =>
          Number(item?.id) === Number(id)
            ? { ...item, description: event?.target?.value }
            : item
        ),
      };
    });
  }

  function handleUpdateObservation(item) {
    if (!loading) {
      dispatch(
        setupUpdateAuditStepObservation({
          id: item?.id,
          description: item?.description,
          observationAttachmentsList: null,
        })
      );
    }
  }

  React.useEffect(() => {
    const step = currentAuditEngagement?.auditStep?.stepList?.find(
      (item) => Number(item?.id) === Number(auditStepId)
    );
    setCurrentAuditStep(step);
  }, [currentAuditEngagement]);

  React.useEffect(() => {
    if (auditEngagementAddSuccess) {
      setDescription("");
    }
  }, [auditEngagementAddSuccess]);

  React.useEffect(() => {
    if (auditEngagementObservationAddSuccess) {
      setDescription("");
      handleSave();
    }
  }, [auditEngagementObservationAddSuccess]);

  function handleAllowEdit() {
    let allowEdit = false;
    if (singleAuditEngagementObject?.auditStep?.submitted === false) {
      allowEdit = true;
    }

    if (
      singleAuditEngagementObject?.auditStep?.submitted === true &&
      singleAuditEngagementObject?.auditStep?.approved === false &&
      (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
        Number(user[0]?.userId?.id) ===
          Number(
            singleAuditEngagementObject?.resourceAllocation
              ?.backupHeadOfInternalAudit?.id
          ) ||
        Number(user[0]?.userId?.id) ===
          Number(
            singleAuditEngagementObject?.resourceAllocation?.proposedJobApprover
              ?.id
          ))
    ) {
      allowEdit = true;
    }

    return allowEdit;
  }
  return (
    <div className="mx-5">
      <FirstLayout
        currentAuditStep={currentAuditStep}
        handleChange={handleChange}
        handleAllowEdit={handleAllowEdit}
      />
      {handleAllowEdit() === true && (
        <div className="row mb-3">
          <div className="col-lg-2">
            <button
              className={`btn btn-labeled float-start btn-primary px-3 shadow ${
                loading && "disabled"
              }`}
              onClick={handleAddObservation}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              {!loading ? "Add Observation" : "Loading..."}
            </button>
          </div>
        </div>
      )}
      {handleAllowEdit() === true && (
        <div className="row mb-3">
          <div className="col-lg-12">
            <textarea
              className="form-control"
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              id="exampleFormControlT"
              rows="3"
              value={description}
              onChange={(event) => setDescription(event?.target?.value)}
            ></textarea>
            <p className="word-limit-info mb-0">Maximum 1500 words</p>
          </div>
        </div>
      )}

      <h3 className="heading">Audit Step Observation List</h3>
      {currentAuditStep?.auditStepObservationsList?.length === 0 ? (
        <p>No observation to show</p>
      ) : (
        currentAuditStep?.auditStepObservationsList?.map((item, i) => {
          return (
            <div key={i}>
              {`${i + 1})`}
              <div className="row mb-3">
                <div className="col-lg-10">
                  <textarea
                    className="form-control"
                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    id="exampleFormControlT"
                    rows="3"
                    onChange={(event) =>
                      handleChangeDescription(event, item?.id)
                    }
                    disabled={handleAllowEdit() === true ? false : true}
                    value={item?.description}
                  ></textarea>
                  <div className="col-lg-2">
                    <p className="word-limit-info mb-0">Maximum 1500 words</p>
                  </div>
                </div>
                {handleAllowEdit() === true && (
                  <div className="col-lg-1">
                    <button
                      className={`btn btn-labeled float-end mt-4 btn-primary px-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => handleUpdateObservation(item)}
                    >
                      {!loading ? "Save" : "Loading..."}
                    </button>
                  </div>
                )}
                {handleAllowEdit() === true && (
                  <div className="col-lg-1">
                    <button
                      className={`btn btn-labeled float-end mt-4 btn-danger px-3 shadow ${
                        loading && "disabled"
                      }`}
                      onClick={() => {
                        if (!loading) {
                          dispatch(
                            setupAuditStepObservationDelete(Number(item?.id))
                          );
                        }
                      }}
                    >
                      {!loading ? "Delete" : "Loading..."}
                    </button>
                  </div>
                )}
              </div>
              <ObservationFileUpload
                item={item}
                handleAllowEdit={handleAllowEdit}
              />
              {i !==
                currentAuditStep?.auditStepObservationsList?.length - 1 && (
                <hr />
              )}
            </div>
          );
        })
      )}

      <div className="row">
        <div className="col-lg-6 ">
          <div className="text-end">
            <button
              className="btn btn-danger float-start"
              onClick={() => setShowAuditStepsDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
        {handleAllowEdit() === true && (
          <div className=" col-lg-6 ">
            <div className="text-end">
              <button
                className={`btn btn-primary float-end ${loading && "disabled"}`}
                onClick={handleSave}
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditStepsDialog;
