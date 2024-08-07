import React from "react";
import { setupUpdateComplianceCheckList } from "../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import RichTextEditor from "./components/TextEditor";
import ObservationFileUpload from "./components/ObservationFileUpload";

const ComplianceCheckListDialog = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  complianceCheckListMainId,
}) => {
  const dispatch = useDispatch();
  const {
    loading,
    auditEngagementObservationAddSuccess,
    singleAuditEngagementObject,
  } = useSelector((state) => state?.auditEngagement);
  const { user } = useSelector((state) => state?.auth);
  const [complianceItem, setComplianceItem] = React.useState({});

  function handleUpdate() {
    if (!loading) {
      dispatch(setupUpdateComplianceCheckList(complianceItem));
    }
  }

  function handleChange(event, id) {
    setComplianceItem((pre) => {
      return {
        ...pre,
        checklistObservationsList: pre?.checklistObservationsList?.map((item) =>
          Number(item?.id) === Number(id)
            ? { ...item, [event?.target?.name]: event?.target?.value }
            : item
        ),
      };
    });
  }

  function onContentChange(id, value) {
    setComplianceItem((pre) => {
      return {
        ...pre,
        checklistObservationsList: pre?.checklistObservationsList?.map((item) =>
          Number(item?.id) === Number(id)
            ? { ...item, observation: value }
            : item
        ),
      };
    });
  }

  React.useEffect(() => {
    if (auditEngagementObservationAddSuccess) {
      handleUpdate();
    }
  }, [auditEngagementObservationAddSuccess]);

  React.useEffect(() => {
    const singleComplianceMainItem =
      currentAuditEngagement?.auditStepChecklistList?.find(
        (mainItem) => Number(mainItem?.id) === Number(complianceCheckListMainId)
      );
    setComplianceItem(singleComplianceMainItem);
  }, [currentAuditEngagement]);

  function handleAllowEdit() {
    let allowEdit = false;
    if (complianceItem?.submitted === false) {
      allowEdit = true;
    }

    if (
      complianceItem?.submitted === true &&
      complianceItem?.approved === false &&
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
    <div className="p-3">
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="heading">Compliance Checklist</div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover rounded equal-columns">
                  <thead>
                    <tr>
                      <th className="sr-col">Sr. #</th>
                      <th className="w-80">Area</th>
                      <th className="w-80">Subject</th>
                      <th className="w-150">Particulars</th>
                      <th className="w-150">Remarks</th>
                      <th>Observation</th>
                      <th>File attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceItem?.checklistObservationsList?.length === 0
                      ? "No Observation To Show"
                      : complianceItem?.checklistObservationsList?.map(
                          (singleItem, index) => {
                            return (
                              <tr key={index}>
                                <td>{singleItem?.id}</td>
                                <td>{singleItem?.area}</td>
                                <td>{singleItem?.subject || "null"}</td>
                                <td>{singleItem?.particulars}</td>

                                <td>
                                  <select
                                    className="form-select mb-2"
                                    aria-label="Default select example"
                                    value={singleItem?.remarks}
                                    name="remarks"
                                    onChange={(event) =>
                                      handleChange(event, singleItem?.id)
                                    }
                                    disabled={
                                      handleAllowEdit() === true ? false : true
                                    }
                                  >
                                    <option value="">Select One</option>
                                    <option value={1}>Yes</option>
                                    <option value={2}>No</option>
                                    <option value={3}>Not Applicable</option>
                                    <option value={4}>
                                      Partially Complied
                                    </option>
                                  </select>
                                </td>
                                <td>
                                  <RichTextEditor
                                    initialValue={singleItem?.observation}
                                    onContentChange={onContentChange}
                                    singleItem={singleItem}
                                    complianceItem={complianceItem}
                                    handleAllowEdit={handleAllowEdit}
                                  />
                                </td>
                                <ObservationFileUpload
                                  item={singleItem}
                                  handleAllowEdit={handleAllowEdit}
                                />
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

      <div className="d-flex justify-content-between">
        {handleAllowEdit() === true && (
          <button
            className={`btn btn-primary ${loading && "disabled"}`}
            onClick={handleUpdate}
          >
            {loading ? "Loading..." : "Save"}
          </button>
        )}
        <button
          className="btn btn-danger"
          onClick={() => setShowComplianceCheckListDialog(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ComplianceCheckListDialog;
