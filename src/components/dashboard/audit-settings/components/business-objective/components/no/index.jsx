import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import {
  setupAddFinancialQuantifiableNo,
  setupUpdateFinancialQuantifiableNo,
  setupGetFinancialQuantifiableNoForCompany,
  resetNoAddSuccess,
} from "../../../../../../../global-redux/reducers/settings/business-objective/slice";
import DeleteDailog from "./DeleteDailog";

const FinanciallyQuantifiableNo = ({
  userHierarchy,
  userRole,
  currentSettingOption,
}) => {
  const dispatch = useDispatch();
  const { noLoading, noAll, noAddSuccess } = useSelector(
    (state) => state?.settingsBusinessObjective
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [currentObjectiveId, setCurrentObjectiveId] = React.useState("");
  const [showDeleteObjectiveDialog, setShowDeleteObjectiveDialog] =
    React.useState(false);
  const [noList, setNoList] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [description, setDescription] = React.useState("");

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleSave() {
    if (!noLoading) {
      if (description === "") {
        toast.error("Provide description");
      } else {
        let companyId = user[0]?.company.find(
          (all) => all?.companyName === company
        )?.id;
        if (companyId) {
          const object = {
            name: description,
            companyId: companyId,
            engagementId: -1,
            yesOrNo: false,
          };
          dispatch(setupAddFinancialQuantifiableNo(object));
        }
      }
    }
  }

  function handleUpdate(id) {
    if (!noLoading) {
      const currentItem = noList.find((all) => all?.id === id);
      if (currentItem?.name === "") {
        toast.error("Provide all values");
        return;
      }
      dispatch(setupUpdateFinancialQuantifiableNo(currentItem));
    }
  }

  function handleChangeInputValue(event, id) {
    setNoList((pre) =>
      pre?.map((item) =>
        item?.id === id ? { ...item, name: event?.target?.value } : item
      )
    );
  }

  function handleChangeCheckValue(event, id) {
    setNoList((pre) =>
      pre?.map((item) =>
        item?.id === id ? { ...item, yesOrNo: event?.target?.checked } : item
      )
    );
  }

  React.useEffect(() => {
    if (noAddSuccess) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      setDescription("");
      dispatch(setupGetFinancialQuantifiableNoForCompany({ companyId }));
      dispatch(resetNoAddSuccess());
      setPage(1);
    }
  }, [noAddSuccess]);

  React.useEffect(() => {
    if (noAll) {
      setNoList(noAll);
    }
  }, [noAll]);

  React.useEffect(() => {
    setPage(1);
    setDescription("");
  }, [currentSettingOption]);

  return (
    <div>
      {showDeleteObjectiveDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <DeleteDailog
              setShowDeleteObjectiveDialog={setShowDeleteObjectiveDialog}
              currentObjectiveId={currentObjectiveId}
            />
          </div>
        </div>
      )}
      {(userRole === "ADMIN" || userHierarchy === "IAH") && (
        <div className="mt-3 d-flex flex-wrap gap-4">
          <div className="flex-1 w-100">
            <label className="w-100">Impact On</label>
            <input
              className="form-control w-100"
              placeholder="Enter"
              type="text"
              value={description}
              onChange={(event) => setDescription(event?.target?.value)}
            />
          </div>
          <div className="col-lg-6 text-end float-end align-self-end">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow ${
                noLoading && "disabled"
              }`}
              onClick={handleSave}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              {noLoading ? "Loading..." : "Add"}
            </div>
          </div>
        </div>
      )}

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            {noLoading ? (
              <CircularProgress />
            ) : !noList || noList?.length === 0 ? (
              <p>No Business Objective To Show.</p>
            ) : (
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="w-80">Sr No.</th>
                    <th>Impact</th>
                    <th>Value</th>
                    {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                      <th>Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {noList
                    ?.slice((page - 1) * 10, page * 10)
                    ?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{(page - 1) * 10 + index + 1}</td>
                          <td>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              name="name"
                              value={item?.name || ""}
                              onChange={(event) =>
                                handleChangeInputValue(event, item?.id)
                              }
                              maxLength="5000"
                            ></textarea>
                            <label className="word-limit-info label-text">
                              Maximum 5000 characters
                            </label>
                          </td>

                          <td>
                            <input
                              className="form-check-input w-26 h-26 border-black"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              name="yesOrNo"
                              checked={item?.yesOrNo || ""}
                              onChange={(event) =>
                                handleChangeCheckValue(event, item?.id)
                              }
                            ></input>
                          </td>
                          {(userRole === "ADMIN" ||
                            userHierarchy === "IAH") && (
                            <td>
                              <div className="d-flex flex-wrap gap-4">
                                <div
                                  className={`btn btn-labeled btn-primary `}
                                  onClick={() => handleUpdate(item?.id)}
                                >
                                  <span className="btn-label me-2">
                                    <i className="fa fa-check-circle"></i>
                                  </span>
                                  Save
                                </div>

                                <div
                                  className={`btn btn-labeled btn-danger`}
                                  onClick={() => {
                                    setCurrentObjectiveId(item?.id);
                                    setShowDeleteObjectiveDialog(true);
                                  }}
                                >
                                  <span className="btn-label me-2">
                                    <i className="fa fa-check-circle f-18"></i>
                                  </span>
                                  Delete
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
            {noAll && noAll?.length > 0 && (
              <Pagination
                count={Math.ceil(noAll?.length / 10)}
                page={page}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanciallyQuantifiableNo;
