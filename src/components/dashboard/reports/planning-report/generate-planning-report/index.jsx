import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import GeneratePlaningReportDialog from "../../../../modals/generate-planing-report-dialog";
import EditGeneratePlaningReportDialog from "../../../../modals/edit-generate-planing-report-dialog";
import { useSelector, useDispatch } from "react-redux";
import {
  resetReportAddSuccess,
  setupSaveReports,
  setupGetAllReports,
  setupUpdateSingleReport,
} from "../../../../../global-redux/reducers/reports/slice";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setupGetAllUsers } from "../../../../../global-redux/reducers/settings/user-management/slice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AuditableUnits from "./components/auditable-units";
import RiskScores from "./components/risk-scores";
import RiskFactorApproach from "./components/risk-factor-approach";
import AttachFiles from "./components/attach-files/index";
import Editors from "./components/editors";

const GeneratePlanningReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const editable = searchParams.get("editable");
  const reportId = searchParams.get("reportId");
  const [rolesList, setRolesList] = React.useState([
    "IAH",
    "Team_Lead",
    "Audit_Executive_2",
    "Audit_Executive_1",
  ]);
  const [pdfLoading, setPdfLoading] = React.useState(false);
  const [generatePlaningReportDialog, setGeneratePlaningReportDialog] =
    React.useState(false);
  const [editGeneratePlaningReportDialog, setEditGeneratePlaningReportDialog] =
    React.useState(false);
  const [editGeneratePlaningId, setEditGeneratePlaningId] = React.useState("");

  const [shareWithUserId, setShareWithUserId] = React.useState("");
  const [hierarchy, setHierarchy] = React.useState("");
  const [selectedUser, setSelectedUsers] = React.useState([]);
  const { allUsers } = useSelector((state) => state?.setttingsUserManagement);
  const { loading, reportAddSuccess, allReports } = useSelector(
    (state) => state?.reports
  );
  const { user } = useSelector((state) => state?.auth);
  const [data, setData] = React.useState({
    summary: "",
    methodology: "",
    riskAssesmentSummary: "",
    orgnizationStrategy: "",
    summaryRisk: "",
    newHeading: [],
    reportShareWith: "",
  });

  const handleEditorContentChange = (name, newContent) => {
    setData((pre) => {
      return {
        ...pre,
        [name]: newContent,
      };
    });
  };

  function handleDeleteHeading(id) {
    setData((pre) => {
      return {
        ...pre,
        newHeading: pre?.newHeading?.filter((all) => all.id !== id),
      };
    });
  }

  const handleDownload = () => {
    if (!pdfLoading) {
      const element = document.getElementById("reportsPage");
      setPdfLoading(true);
      html2canvas(element)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const pdf = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: [imgWidth, imgHeight],
          });
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("document.pdf");
          setPdfLoading(false);
          toast.success("Pdf Dowloaded!");
        })
        .catch((error) => {
          toast.error("Error generating PDF:", error);
          setPdfLoading(false);
        });
    }
  };

  function handleSaveReport() {
    if (!loading) {
      if (
        data?.summary === "" ||
        data?.methodology === "" ||
        data?.riskAssesmentSummary === "" ||
        data?.orgnizationStrategy === "" ||
        data?.summaryRisk === "" ||
        data?.newHeading?.length === 0 ||
        data?.reportShareWith === ""
      ) {
        toast.error("Please Provide all the fields");
      } else {
        dispatch(
          setupSaveReports({
            ...data,
            newHeading: data?.newHeading?.map((item) => {
              return {
                heading: item?.heading,
                description: item?.description,
              };
            }),
            createdBy: user[0]?.userId?.id,
            storedHtml: null,
            reportStatus: "draft",
          })
        );
      }
    }
  }

  function handleEditReport() {
    if (!loading) {
      if (
        data?.summary === "" ||
        data?.methodology === "" ||
        data?.riskAssesmentSummary === "" ||
        data?.orgnizationStrategy === "" ||
        data?.summaryRisk === "" ||
        data?.newHeading?.length === 0 ||
        data?.reportShareWith === ""
      ) {
        toast.error("Please Provide all the fields");
      } else {
        dispatch(
          setupUpdateSingleReport({
            ...data,
            newHeading: data?.newHeading?.map((item) => {
              return {
                heading: item?.heading,
                description: item?.description,
              };
            }),
            createdBy: user[0]?.userId?.id,
            storedHtml: null,
            reportStatus: "draft",
            id: Number(reportId),
          })
        );
      }
    }
  }

  React.useEffect(() => {
    if (shareWithUserId !== "") {
      setData((pre) => {
        return {
          ...pre,
          reportShareWith: Number(shareWithUserId),
        };
      });
    }
  }, [shareWithUserId]);

  React.useEffect(() => {
    if (reportAddSuccess) {
      dispatch(resetReportAddSuccess());
      setData({
        summary: "",
        methodology: "",
        riskAssesmentSummary: "",
        orgnizationStrategy: "",
        summaryRisk: "",
        newHeading: [],
        reportShareWith: "",
      });
      navigate("/audit/planning-report");
    }
  }, [reportAddSuccess]);

  React.useEffect(() => {
    if (hierarchy !== "") {
      const users = allUsers?.filter(
        (all) => all?.employeeid?.userHierarchy === hierarchy
      );
      setSelectedUsers(users);
    }
  }, [hierarchy]);

  React.useEffect(() => {
    if (
      editable === "false" &&
      allReports?.length !== 0 &&
      allUsers?.length !== 0
    ) {
      const details = allReports?.find((all) => all?.id === Number(reportId));
      setData({
        summary: details?.summary,
        methodology: details?.methodology,
        riskAssesmentSummary: details?.riskAssesmentSummary,
        orgnizationStrategy: details?.orgnizationStrategy,
        summaryRisk: details?.summaryRisk,
        newHeading: details?.newHeading || [],
        reportShareWith: details?.reportShareWith?.id,
      });
      const currentUser = allUsers?.find(
        (all) => Number(all?.id) === Number(details?.reportShareWith?.id)
      );
      setHierarchy(currentUser?.employeeid?.userHierarchy);
      setShareWithUserId(details?.reportShareWith?.id);
    }
  }, [editable, allReports, allUsers]);

  React.useEffect(() => {
    if (
      editable === "true" &&
      allReports?.length !== 0 &&
      allUsers?.length !== 0
    ) {
      const details = allReports?.find((all) => all?.id === Number(reportId));
      setData({
        summary: details?.summary,
        methodology: details?.methodology,
        riskAssesmentSummary: details?.riskAssesmentSummary,
        orgnizationStrategy: details?.orgnizationStrategy,
        summaryRisk: details?.summaryRisk,
        newHeading: details?.newHeading || [],
        reportShareWith: details?.reportShareWith?.id,
      });
      const currentUser = allUsers?.find(
        (all) => Number(all?.id) === Number(details?.reportShareWith?.id)
      );
      setHierarchy(currentUser?.employeeid?.userHierarchy);
      setShareWithUserId(details?.reportShareWith?.id);
    }
  }, [editable, allReports, allUsers]);

  React.useEffect(() => {
    if (user[0]?.token) {
      setRolesList((pre) =>
        pre.filter((all) => all !== user[0]?.userId?.employeeid?.userHierarchy)
      );
    }
  }, [user]);

  React.useEffect(() => {
    if (!editable) {
      navigate("/audit/planning-report");
    }
    if (editable === "true" || editable === "false") {
      if (!reportId) {
        navigate("/audit/planning-report");
      }
    }
  }, [editable]);

  React.useEffect(() => {
    if (user[0]?.token) {
      dispatch(setupGetAllReports());
      dispatch(setupGetAllUsers({ shareWith: true }));
    }
  }, [user]);

  return (
    <div id="reportsPage">
      {generatePlaningReportDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <GeneratePlaningReportDialog
              setGeneratePlaningReportDialog={setGeneratePlaningReportDialog}
              setData={setData}
            />
          </div>
        </div>
      )}
      {editGeneratePlaningReportDialog && (
        <div className="audit-settings-modal">
          <div className="model-wrap">
            <EditGeneratePlaningReportDialog
              setEditGeneratePlaningReportDialog={
                setEditGeneratePlaningReportDialog
              }
              data={data}
              setData={setData}
              editGeneratePlaningId={editGeneratePlaningId}
              setEditGeneratePlaningId={setEditGeneratePlaningId}
            />
          </div>
        </div>
      )}
      <header className="section-header my-3">
        <div className="row align-items-center mb-4">
          <div className="col-lg-12 d-flex align-items-center">
            <i
              className="fa fa-arrow-left text-primary fs-5 pe-3 cursor-pointer"
              onClick={() => navigate("/audit/planning-report")}
            ></i>

            <div className="mb-0 heading">Internal Audit Planning Report</div>
          </div>
        </div>
      </header>

      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-8 d-flex">
              <div className="mb-3 d-flex me-3  align-items-end">
                <label className="form-label me-2">From</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                />
              </div>
              <div className="mb-3 d-flex me-3 align-items-end">
                <label className="form-label me-2">To</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                />
              </div>
            </div>
            {editable !== "false" && (
              <div className="col-lg-4 d-flex text-end justify-content-end">
                <div className="mb-3">
                  <div
                    className="btn btn-labeled btn-primary px-3 shadow fitContent"
                    onClick={() => setGeneratePlaningReportDialog(true)}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-plus"></i>
                    </span>
                    Add Section
                  </div>
                </div>
                <i
                  className="fa fa-info-circle ps-3 text-secondary mt-2 cursor-pointer"
                  title="Info"
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>

      <Editors
        handleEditorContentChange={handleEditorContentChange}
        data={data}
        editable={editable}
      />

      <div className="table-responsive">
        <table className="table table-bordered  table-hover rounded">
          <thead className="bg-secondary text-white">
            <tr>
              <th>Heading </th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.newHeading?.length === 0 ? (
              <tr>
                <td className="w-300">No Haeding Added!</td>
              </tr>
            ) : (
              data?.newHeading?.map((head, index) => {
                return (
                  <tr key={index}>
                    <td>{head?.heading}</td>
                    <td>{head?.description}</td>
                    <td className="w-130">
                      <i
                        className="fa fa-trash text-danger f-18 cursor-pointer"
                        onClick={() => handleDeleteHeading(head?.id)}
                      ></i>
                      <i
                        class="fa fa-edit  px-3 f-18 cursor-pointer"
                        onClick={() => {
                          setEditGeneratePlaningId(head?.id);
                          setEditGeneratePlaningReportDialog(true);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <AuditableUnits />
      <RiskScores />
      <RiskFactorApproach />
      <AttachFiles />
      {editable !== "notApplicable" && (
        <div className="row mb-4">
          <div className="col-lg-6">
            <label htmlFor="area">User:</label>
            <input
              id="name"
              name="name"
              type="text"
              readOnly
              className="form-control"
              defaultValue={
                allUsers?.find(
                  (all) => Number(all?.id) === Number(shareWithUserId)
                )?.name
              }
            />
          </div>
          <div className="col-lg-6">
            <label htmlFor="area"> User Hierarchy:</label>
            <input
              id="name"
              name="name"
              type="text"
              readOnly
              className="form-control"
              defaultValue={hierarchy}
            />
          </div>
        </div>
      )}
      {editable === "notApplicable" && (
        <div className="row mb-4">
          <div className="col-lg-6">
            <label htmlFor="defaultRemarks" className="w-100">
              User Hierarchy:
            </label>
            <select
              id="userHierarchy"
              name="userHierarchy"
              className="form-control w-100 h-40"
              value={hierarchy}
              onChange={(event) => setHierarchy(event?.target?.value)}
            >
              <option value="">Select</option>
              {rolesList?.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-lg-6">
            <label htmlFor="defaultRemarks" className="w-100">
              Users:
            </label>
            <select
              id="userHierarchy"
              name="userHierarchy"
              className="form-control w-100 h-40"
              value={shareWithUserId}
              onChange={(event) => setShareWithUserId(event?.target?.value)}
            >
              <option value="">Select</option>
              {selectedUser?.map((all, index) => {
                return (
                  <option value={all?.id} key={index}>
                    {all?.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}

      <div className="row mb-3">
        <div className="col-lg-12 d-flex justify-content-between">
          <div
            className={`btn btn-labeled btn-primary px-3 shadow fitContent ${
              pdfLoading && "disabled"
            }`}
            onClick={handleDownload}
          >
            <span className="btn-label me-2">
              <i className="fa fa-file-pdf f-18"></i>
            </span>
            {pdfLoading ? "Loading" : "Download PDF"}
          </div>
          {editable === "notApplicable" && (
            <div
              className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${
                loading && "disabled"
              }`}
              onClick={handleSaveReport}
            >
              <span className="btn-label me-2">
                <i className="fa fa-check-circle f-18"></i>
              </span>
              {loading ? "Loading..." : "Save"}
            </div>
          )}
          {editable === "true" && (
            <div
              className={`btn btn-labeled btn-primary px-3 shadow me-3 fitContent ${
                loading && "disabled"
              }`}
              onClick={handleEditReport}
            >
              <span className="btn-label me-2">
                <i className="fa fa-check-circle f-18"></i>
              </span>
              {loading ? "Loading..." : "Edit"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePlanningReport;
