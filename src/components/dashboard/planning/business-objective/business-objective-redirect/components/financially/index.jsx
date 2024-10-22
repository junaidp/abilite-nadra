import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setupUpdateFinancialQuantifiableYes,
  setupGetFinancialQuantifiableYesForEngagement,
  resetYesAddSuccess,
} from "../../../../../../../global-redux/reducers/settings/business-objective/slice";

const FinanciallyQuantifiableYes = ({
  engagementId,
  planingEngagementSingleObject,
}) => {
  const dispatch = useDispatch();
  const { yesLoading, yesAll, yesAddSuccess } = useSelector(
    (state) => state?.settingsBusinessObjective
  );
  const { user } = useSelector((state) => state?.auth);

  const [yesList, setYesList] = React.useState([]);

  function handleUpdate(id) {
    if (!yesLoading) {
      const currentItem = yesList.find((all) => all?.id === id);
      if (
        currentItem?.name === "" ||
        !currentItem?.amount ||
        !currentItem?.weight
      ) {
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
      dispatch(
        setupGetFinancialQuantifiableYesForEngagement({
          engagementId: engagementId,
        })
      );
      dispatch(resetYesAddSuccess());
    }
  }, [yesAddSuccess]);

  React.useEffect(() => {
    if (yesAll && yesAll?.length !== 0) {
      setYesList(yesAll);
    }
  }, [yesAll]);

  return (
    <div>
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
                    <th>Objective</th>
                    <th>Amount</th>
                    <th>Weight</th>
                    {(planingEngagementSingleObject?.complete === false ||
                      (planingEngagementSingleObject?.complete === true &&
                        planingEngagementSingleObject?.locked === false &&
                        user[0]?.userId?.employeeid?.userHierarchy ===
                          "IAH")) && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {yesList?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
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
                            disabled={
                              planingEngagementSingleObject?.locked === true ||
                              (planingEngagementSingleObject?.complete ===
                                true &&
                                planingEngagementSingleObject?.locked ===
                                  false &&
                                user[0]?.userId?.employeeid?.userHierarchy !==
                                  "IAH")
                                ? true
                                : false
                            }
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
                            disabled={
                              planingEngagementSingleObject?.locked === true ||
                              (planingEngagementSingleObject?.complete ===
                                true &&
                                planingEngagementSingleObject?.locked ===
                                  false &&
                                user[0]?.userId?.employeeid?.userHierarchy !==
                                  "IAH")
                                ? true
                                : false
                            }
                          ></input>
                        </td>
                        <td>
                          <input
                            type="number"
                            id="weight"
                            className="form-control"
                            name="weight"
                            value={item?.weight || ""}
                            onChange={(event) =>
                              handleChangeValue(event, item?.id)
                            }
                            disabled={
                              planingEngagementSingleObject?.locked === true ||
                              (planingEngagementSingleObject?.complete ===
                                true &&
                                planingEngagementSingleObject?.locked ===
                                  false &&
                                user[0]?.userId?.employeeid?.userHierarchy !==
                                  "IAH")
                                ? true
                                : false
                            }
                          ></input>
                        </td>
                        {(planingEngagementSingleObject?.complete === false ||
                          (planingEngagementSingleObject?.complete === true &&
                            planingEngagementSingleObject?.locked === false &&
                            user[0]?.userId?.employeeid?.userHierarchy ===
                              "IAH")) && (
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
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanciallyQuantifiableYes;
