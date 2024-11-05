import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import {
  setupAddFinancialQuantifiableYes,
  setupUpdateFinancialQuantifiableYes,
  setupGetFinancialQuantifiableYesForCompany,
  resetYesAddSuccess,
} from "../../../../../../../global-redux/reducers/settings/business-objective/slice";
import DeleteDialog from "./DeleteDailog";

const FinanciallyQuantifiableYes = ({
  userHierarchy,
  userRole,
  currentSettingOption,
}) => {
  const dispatch = useDispatch();
  const { yesLoading, yesAll, yesAddSuccess } = useSelector(
    (state) => state?.settingsBusinessObjective
  );
  const { company } = useSelector((state) => state?.common);
  const { user } = useSelector((state) => state?.auth);
  const [currentObjectiveId, setCurrentObjectiveId] = React.useState("");
  const [showDeleteObjectiveDialog, setShowDeleteObjectiveDialog] =
    React.useState(false);
  const [yesList, setYesList] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [description, setDescription] = React.useState("");

  const handleChange = (_, value) => {
    setPage(value);
  };

  function handleSave() {
    if (!yesLoading) {
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
            amount: 0,
            weight: 0,
          };
          dispatch(setupAddFinancialQuantifiableYes(object));
        }
      }
    }
  }

  function handleUpdate(id) {
    if (!yesLoading) {
      const currentItem = yesList.find((all) => all?.id === id);
      if (currentItem?.name === "" || !currentItem?.amount) {
        toast.error("Provide all values");
        return;
      }
      dispatch(setupUpdateFinancialQuantifiableYes(currentItem));
    }
  }

  function handleChangeValue(event, id) {
    setYesList((pre) =>
      pre?.map((item) =>
        item?.id === id
          ? { ...item, [event.target.name]: event?.target?.value }
          : item
      )
    );
  }

  React.useEffect(() => {
    if (yesAddSuccess) {
      let companyId = user[0]?.company.find(
        (all) => all?.companyName === company
      )?.id;
      setDescription("");
      dispatch(setupGetFinancialQuantifiableYesForCompany({ companyId }));
      dispatch(resetYesAddSuccess());
      setPage(1);
    }
  }, [yesAddSuccess]);

  React.useEffect(() => {
    if (yesAll) {
      setYesList(yesAll);
    }
  }, [yesAll]);

  React.useEffect(() => {
    setPage(1);
    setDescription("");
  }, [currentSettingOption]);

  return (
    <div>
      {showDeleteObjectiveDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <DeleteDialog
              setShowDeleteObjectiveDialog={setShowDeleteObjectiveDialog}
              currentObjectiveId={currentObjectiveId}
            />
          </div>
        </div>
      )}

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
              yesLoading && "disabled"
            }`}
            onClick={handleSave}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            {yesLoading ? "Loading..." : "Add"}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            {yesLoading ? (
              <CircularProgress />
            ) : !yesList || yesList?.length === 0 ? (
              <p>No Business Objective To Show.</p>
            ) : (
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="w-80">Sr No.</th>
                    <th>Impact</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {yesList
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
                                handleChangeValue(event, item?.id)
                              }
                              maxLength="5000"
                            ></textarea>
                            <label className="word-limit-info label-text">
                              Maximum 5000 characters
                            </label>
                          </td>
                          <td>
                            <input
                              type="number"
                              id="amount"
                              className="form-control"
                              name="amount"
                              value={item?.amount || ""}
                              onChange={(event) =>
                                handleChangeValue(event, item?.id)
                              }
                            ></input>
                          </td>
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
                              {(userRole === "ADMIN" ||
                                userHierarchy === "IAH") && (
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
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
            {yesAll && yesAll?.length > 0 && (
              <Pagination
                count={Math.ceil(yesAll?.length / 10)}
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

export default FinanciallyQuantifiableYes;
