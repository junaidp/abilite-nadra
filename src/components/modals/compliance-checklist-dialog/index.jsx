import React from 'react';
import { setupUpdateComplianceCheckList } from "../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { Chip } from "@mui/material";
import ComplianceRow from "./components/compliance-row";


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
  const [currentDeleteFileId, setCurrentDeleteFileId] = React.useState("");

  // ✅ memoized handleUpdate so it doesn’t re-create on every render
  const handleUpdate = React.useCallback(() => {
    if (!loading) {
      dispatch(
        setupUpdateComplianceCheckList({
          ...complianceItem,
          checklistObservationsList:
            complianceItem?.checklistObservationsList?.map((complianceItem) => {
              return {
                ...complianceItem,
                observationsDataAttachmentsList:
                  complianceItem?.observationsDataAttachmentsList?.filter(
                    (file) => file?.id !== currentDeleteFileId
                  ),
              };
            }),
        })
      );
    }
  }, [loading, dispatch, complianceItem, currentDeleteFileId]);


  // ✅ memoized handleChange
  const handleChange = React.useCallback((event, id) => {
    if (!event.target.value) return;
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
  }, []);


  // ✅ memoized onContentChange
  const onContentChange = React.useCallback((id, value) => {
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
  }, []);

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

  // ✅ memoized allowEdit calculation
  const allowEdit = React.useMemo(() => {
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
  }, [complianceItem, user, singleAuditEngagementObject]);

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="d-flex items-center justify-content-between">
              <div className="heading">Compliance Checklist</div>
              <div className="d-flex items-center gap-4">
                <Chip
                  label={complianceItem?.subLocationDescription}
                  className="float-end"
                />
                <button
                  type="button"
                  class="btn-close f-22"
                  onClick={() => setShowComplianceCheckListDialog(false)}
                ></button>
              </div>
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
                      <th className="w-150">File attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceItem?.checklistObservationsList?.length === 0 ? (
                      <tr>
                        <td colSpan="7">No Observation To Show</td>
                      </tr>
                    ) : (
                      complianceItem?.checklistObservationsList?.map((singleItem, index) => (
                        <ComplianceRow
                          key={singleItem?.id || index}
                          index={index}
                          singleItem={singleItem}
                          handleChange={handleChange}
                          onContentChange={onContentChange}
                          allowEdit={allowEdit}
                          setCurrentDeleteFileId={setCurrentDeleteFileId}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        {allowEdit === true && (
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
