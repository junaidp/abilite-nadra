import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setupUpdateFinancialQuantifiableNo,
  setupGetFinancialQuantifiableNoForEngagement,
  resetNoAddSuccess,
} from "../../../../../../../global-redux/reducers/settings/business-objective/slice";

const FinanciallyQuantifiableNo = ({
  engagementId,
  planingEngagementSingleObject,
}) => {
  const dispatch = useDispatch();
  const { noLoading, noAll, noAddSuccess } = useSelector(
    (state) => state?.settingsBusinessObjective
  );
  const { user } = useSelector((state) => state?.auth);
  React.useState(false);
  const [noList, setNoList] = React.useState([]);

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
      dispatch(setupGetFinancialQuantifiableNoForEngagement({ engagementId }));
      dispatch(resetNoAddSuccess());
    }
  }, [noAddSuccess]);

  React.useEffect(() => {
    if (noAll && noAll?.length !== 0) {
      setNoList(noAll);
    }
  }, [noAll]);

  return (
    <div>
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
                    <th>Objective</th>
                    <th>Value</th>
                    {(planingEngagementSingleObject?.complete === false ||
                      (planingEngagementSingleObject?.complete === true &&
                        planingEngagementSingleObject?.locked === false &&
                        user[0]?.userId?.employeeid?.userHierarchy ===
                          "IAH")) && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {noList?.map((item, index) => {
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
                              handleChangeInputValue(event, item?.id)
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
                            className="form-check-input w-26 h-26 border-black"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            name="yesOrNo"
                            checked={item?.yesOrNo || ""}
                            onChange={(event) =>
                              handleChangeCheckValue(event, item?.id)
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

export default FinanciallyQuantifiableNo;
