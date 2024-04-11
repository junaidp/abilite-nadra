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
  } = useSelector((state) => state?.auditEngagement);

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
      if (
        currentAuditStep?.sampling === "" ||
        currentAuditStep?.samplingMethod === "" ||
        currentAuditStep?.controlRisk === "" ||
        currentAuditStep?.frequency === ""
      ) {
        toast.error("Provide all the values");
      } else {
        dispatch(setupUpdateAuditSteps(currentAuditStep));
      }
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
      setShowAuditStepsDialog(false);
      setDescription("");
    }
  }, [auditEngagementAddSuccess]);

  React.useEffect(() => {
    if (auditEngagementObservationAddSuccess) {
      setDescription("");
    }
  }, [auditEngagementObservationAddSuccess]);
  return (
    <div className="mx-5">
      <FirstLayout
        currentAuditStep={currentAuditStep}
        handleChange={handleChange}
      />

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
                    value={item?.description}
                  ></textarea>
                  <div className="col-lg-2">
                    <p className="word-limit-info mb-0">Maximum 1500 words</p>
                  </div>
                </div>
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
              </div>
              <ObservationFileUpload item={item} />
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
      </div>
    </div>
  );
};

export default AuditStepsDialog;
