import React from "react";
import { createPortal } from "react-dom";
import {
  setupGetAuditStepChecklistObservations,
  setupUpdateAuditStepChecklistObservations,
  setupGetAuditStepChecklistLite,
  setupGetAuditStepChecklistObservation,
  setupUpdateAuditStepChecklistObservation,
} from "../../../global-redux/reducers/audit-engagement/slice";
import { useDispatch, useSelector } from "react-redux";
import { Chip, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import ComplianceRow from "./components/compliance-row";
import RichTextEditor from "./components/TextEditor";

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const getObservationValue = (response) => response?.data?.observation ?? "";

const ComplianceCheckListDialog = ({
  setShowComplianceCheckListDialog,
  currentAuditEngagement,
  complianceCheckListMainId,
  onChecklistStatusUpdated,
}) => {
  const dispatch = useDispatch();
  const { singleAuditEngagementObject } = useSelector(
    (state) => state?.auditEngagement
  );
  const { user } = useSelector((state) => state?.auth);

  const [observations, setObservations] = React.useState([]);
  const [changedRows, setChangedRows] = React.useState({});
  const [currentDeleteFileId, setCurrentDeleteFileId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [totalNoOfRecords, setTotalNoOfRecords] = React.useState(0);
  const [observationsLoading, setObservationsLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [observationCache, setObservationCache] = React.useState({});
  const [activeObservation, setActiveObservation] = React.useState(null);
  const [activeObservationContent, setActiveObservationContent] = React.useState("");
  const [observationLoadingId, setObservationLoadingId] = React.useState(null);
  const [observationSaving, setObservationSaving] = React.useState(false);

  const complianceItem = React.useMemo(
    () =>
      currentAuditEngagement?.auditStepChecklistList?.find(
        (mainItem) => Number(mainItem?.id) === Number(complianceCheckListMainId)
      ) || {},
    [currentAuditEngagement, complianceCheckListMainId]
  );

  const buildChangedRow = React.useCallback((row) => ({
    id: row?.id,
    remarks: row?.remarks,
  }), []);

  const fetchObservations = React.useCallback(async () => {
    if (!complianceCheckListMainId) return;

    try {
      setObservationsLoading(true);
      const response = await dispatch(
        setupGetAuditStepChecklistObservations({
          auditStepChecklistId: complianceCheckListMainId,
          page: page - 1,
          size: itemsPerPage,
        })
      ).unwrap();

      setObservations(response?.data?.content || []);
      setTotalNoOfRecords(response?.data?.totalElements || 0);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An Error has occurred"
      );
    } finally {
      setObservationsLoading(false);
    }
  }, [complianceCheckListMainId, dispatch, itemsPerPage, page]);

  React.useEffect(() => {
    setChangedRows({});
    setCurrentDeleteFileId("");
    setObservationCache({});
    setActiveObservation(null);
    setActiveObservationContent("");
    setObservationLoadingId(null);
  }, [complianceCheckListMainId]);

  React.useEffect(() => {
    fetchObservations();
  }, [fetchObservations]);

  const fetchObservationContent = React.useCallback(async (observationId) => {
    if (!observationId) return "";

    if (hasOwn(observationCache, observationId)) {
      return observationCache[observationId];
    }

    const response = await dispatch(
      setupGetAuditStepChecklistObservation(observationId)
    ).unwrap();
    const observation = getObservationValue(response);

    setObservationCache((prev) => ({
      ...prev,
      [observationId]: observation,
    }));
    setObservations((prev) =>
      prev.map((row) =>
        Number(row?.id) === Number(observationId)
          ? { ...row, observation }
          : row
      )
    );

    return observation;
  }, [dispatch, observationCache]);

  const handleOpenObservation = React.useCallback(async (row) => {
    if (!row?.id) return;

    setActiveObservation(row);
    setActiveObservationContent("");

    if (hasOwn(observationCache, row.id)) {
      setActiveObservationContent(observationCache[row.id]);
      return;
    }

    try {
      setObservationLoadingId(row.id);
      const observation = await fetchObservationContent(row.id);
      setActiveObservationContent(observation);
    } catch (error) {
      setActiveObservation(null);
      toast.error(
        error?.response?.data?.message || "Unable to load observation"
      );
    } finally {
      setObservationLoadingId(null);
    }
  }, [fetchObservationContent, observationCache]);

  const handleCloseObservation = React.useCallback(() => {
    setActiveObservation(null);
    setActiveObservationContent("");
    setObservationLoadingId(null);
  }, []);

  const handleObservationContentChange = React.useCallback((id, value) => {
    setActiveObservationContent(value);
  }, []);


  const allowEdit = React.useMemo(() => {
    let allowEdit = false;

    if (complianceItem?.submitted === false) {
      allowEdit = true;
    }

    const resourceAllocation = singleAuditEngagementObject?.resourceAllocation;
    const backupHeadId =
      resourceAllocation?.backupHeadOfInternalAudit?.id ??
      resourceAllocation?.backupHeadOfInternalAudit;
    const proposedApproverId =
      resourceAllocation?.proposedJobApprover?.id ??
      resourceAllocation?.proposedJobApprover;

    if (
      complianceItem?.submitted === true &&
      complianceItem?.approved === false &&
      (user[0]?.userId?.employeeid?.userHierarchy === "IAH" ||
        Number(user[0]?.userId?.id) === Number(backupHeadId) ||
        Number(user[0]?.userId?.id) === Number(proposedApproverId))
    ) {
      allowEdit = true;
    }

    return allowEdit;
  }, [complianceItem, user, singleAuditEngagementObject]);

  const canEditActiveObservation = React.useMemo(
    () =>
      allowEdit === true &&
      activeObservation?.remarks !== "1" &&
      activeObservation?.remarks !== "3",
    [activeObservation?.remarks, allowEdit]
  );

  const handleSaveObservation = React.useCallback(async () => {
    if (!activeObservation?.id || observationSaving || !canEditActiveObservation) return;

    try {
      setObservationSaving(true);
      const response = await dispatch(
        setupUpdateAuditStepChecklistObservation({
          observationId: activeObservation.id,
          observation: activeObservationContent,
        })
      ).unwrap();
      const savedObservation = getObservationValue(response) || activeObservationContent;

      setObservationCache((prev) => ({
        ...prev,
        [activeObservation.id]: savedObservation,
      }));
      setObservations((prev) =>
        prev.map((row) =>
          Number(row?.id) === Number(activeObservation.id)
            ? { ...row, observation: savedObservation }
            : row
        )
      );
      toast.success("Observation saved successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to save observation"
      );
    } finally {
      setObservationSaving(false);
    }
  }, [activeObservation, activeObservationContent, canEditActiveObservation, dispatch, observationSaving]);

  const handleUpdate = React.useCallback(async () => {
    const changedRowsList = Object.values(changedRows);
    if (changedRowsList.length === 0 || saving) return;

    try {
      setSaving(true);
      await dispatch(
        setupUpdateAuditStepChecklistObservations(changedRowsList)
      ).unwrap();

      setChangedRows({});
      toast.success("Compliance checklist saved successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An Error has occurred"
      );
    } finally {
      setSaving(false);
    }
  }, [changedRows, dispatch, saving]);

  const handleChange = React.useCallback((event, id) => {
    if (!event.target.value) return;

    const { name, value } = event.target;

    setObservations((prev) =>
      prev.map((item) => {
        if (Number(item?.id) !== Number(id)) return item;

        const updatedRow = { ...item, [name]: value };
        setChangedRows((changed) => ({
          ...changed,
          [id]: buildChangedRow(updatedRow),
        }));
        return updatedRow;
      })
    );
  }, [buildChangedRow]);

  const handleObservationFileUploaded = React.useCallback((observationId, file) => {
    if (!file?.id) return;

    setObservations((prev) =>
      prev.map((item) => {
        if (Number(item?.id) !== Number(observationId)) return item;

        return {
          ...item,
          observationsDataAttachmentsList: [
            ...(item?.observationsDataAttachmentsList || []),
            file,
          ],
        };
      })
    );
  }, []);

  const handleObservationFileDeleted = React.useCallback((observationId, deletedFileId) => {
    setObservations((prev) =>
      prev.map((item) => {
        if (Number(item?.id) !== Number(observationId)) return item;

        return {
          ...item,
          observationsDataAttachmentsList: (
            item?.observationsDataAttachmentsList || []
          ).filter((file) => Number(file?.id) !== Number(deletedFileId)),
        };
      })
    );
  }, []);


  const handleClose = React.useCallback(async () => {
    setShowComplianceCheckListDialog(false);

    if (!complianceCheckListMainId) return;
    if (complianceItem?.approved === true) return;

    try {
      const response = await dispatch(
        setupGetAuditStepChecklistLite(complianceCheckListMainId)
      ).unwrap();
      const checklistLite = response?.data || response;

      if (checklistLite?.id) {
        onChecklistStatusUpdated?.(checklistLite.id, checklistLite);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to refresh checklist status"
      );
    }
  }, [
    complianceCheckListMainId,
    complianceItem?.approved,
    dispatch,
    onChecklistStatusUpdated,
    setShowComplianceCheckListDialog,
  ]);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handleChangeItemsPerPage = (event) => {
    setPage(1);
    setItemsPerPage(Number(event.target.value));
  };

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
                  className="btn-close f-22"
                  onClick={handleClose}
                ></button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover rounded compliance-checklist-table mb-0">
                  <colgroup>
                    <col style={{ width: "48px" }} />
                    <col style={{ width: "115px" }} />
                    <col style={{ width: "92px" }} />
                    <col style={{ width: "260px" }} />
                    <col style={{ width: "150px" }} />
                    <col style={{ width: "140px" }} />
                    <col style={{ width: "230px" }} />
                  </colgroup>
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
                    {observationsLoading ? (
                      <tr>
                        <td colSpan="7">
                          <CircularProgress />
                        </td>
                      </tr>
                    ) : observations.length === 0 ? (
                      <tr>
                        <td colSpan="7">No Observation To Show</td>
                      </tr>
                    ) : (
                      observations.map((singleItem, index) => (
                        <ComplianceRow
                          key={singleItem?.id || index}
                          index={(page - 1) * itemsPerPage + index}
                          singleItem={singleItem}
                          handleChange={handleChange}
                          onViewObservation={handleOpenObservation}
                          observationLoadingId={observationLoadingId}
                          allowEdit={allowEdit}
                          setCurrentDeleteFileId={setCurrentDeleteFileId}
                          onFileUploaded={handleObservationFileUploaded}
                          onFileDeleted={handleObservationFileDeleted}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalNoOfRecords > 0 && (
                <div className="row mt-4 mb-2 align-items-center">
                  <div className="col-lg-6 mb-3 mb-lg-0 d-flex align-items-center">
                    <Pagination
                      count={Math.ceil(totalNoOfRecords / itemsPerPage)}
                      page={page}
                      onChange={handlePaginationChange}
                    />
                  </div>
                  <div className="col-lg-6 mb-3 mb-lg-0 d-flex justify-content-end">
                    <FormControl sx={{ minWidth: 200 }} size="small">
                      <InputLabel id="checklist-observations-page-size-label">
                        Items Per Page
                      </InputLabel>
                      <Select
                        labelId="checklist-observations-page-size-label"
                        id="checklist-observations-page-size"
                        label="Items Per Page"
                        value={itemsPerPage}
                        onChange={handleChangeItemsPerPage}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-3">
        {allowEdit === true && (
          <button
            className={`btn btn-primary ${saving ? "disabled" : ""}`}
            onClick={handleUpdate}
          >
            {saving ? "Loading..." : "Save"}
          </button>
        )}
        <button
          className="btn btn-danger"
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      {activeObservation && createPortal(
        <div
          className="model-parent d-flex justify-content-center align-items-start"
          style={{ zIndex: 110, paddingTop: 24, paddingBottom: 24 }}
        >
          <div className="model-wrap compliance-observation-editor-modal">
            <div className="p-3 compliance-observation-editor-layout">
              <div className="d-flex items-center justify-content-between mb-3 compliance-observation-editor-header">
                <div className="pe-3">
                  <div className="heading">Observation</div>
                  <div className="text-muted f-12 text-truncate compliance-observation-editor-title">
                    {activeObservation?.particulars || activeObservation?.subject || activeObservation?.area}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close f-22 flex-shrink-0"
                  onClick={handleCloseObservation}
                  disabled={observationSaving}
                ></button>
              </div>

              <div className="compliance-observation-editor-shell">
                {observationLoadingId === activeObservation?.id ? (
                  <div className="d-flex justify-content-center align-items-center py-5">
                    <CircularProgress />
                  </div>
                ) : (
                  <RichTextEditor
                    key={activeObservation?.id}
                    initialValue={activeObservationContent}
                    onContentChange={handleObservationContentChange}
                    singleItem={activeObservation}
                    allowEdit={allowEdit}
                  />
                )}
              </div>

              <div className="d-flex justify-content-between mt-3 compliance-observation-editor-footer">
                {allowEdit === true && (
                  <button
                    className={`btn btn-primary ${observationSaving ? "disabled" : ""}`}
                    onClick={handleSaveObservation}
                    disabled={!canEditActiveObservation || observationLoadingId === activeObservation?.id || observationSaving}
                  >
                    {observationSaving ? "Loading..." : "Save Observation"}
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={handleCloseObservation}
                  disabled={observationSaving}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ComplianceCheckListDialog;
