import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  setupAddCheckList,
  resetAddCheckListSuccess,
  setupGetAllCheckLists,
  setupUpdateCheckListRemarks,
  resetAddSubCheckListSuccess,
  setupGetAllCheckListItems,
  addCheckListId,
  changeCurrentSubListItem,
} from "../../../../../global-redux/reducers/settings/check-list/slice";
import { useSelector, useDispatch } from "react-redux";
import EditCheckListDialog from "../../../../modals/edit-checklist-dialog";
import EditCheckListItemDialog from "../../../../modals/edit-sub-check-list-dialog";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";

const CheckList = ({ setCheckListManagementDialog }) => {
  const [showEditCheckListDialog, setShowEditCheckListDialog] =
    React.useState(false);
  const [showEditCheckListItemDialog, setShowEditCheckListItemDialog] =
    React.useState(false);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const dispatch = useDispatch();
  const {
    loading,
    checkListAddSuccess,
    subCheckListAddSuccess,
    checkList,
    checkListId,
    checkListItems,
  } = useSelector((state) => state.setttingsCheckList);
  // const { companies } = useSelector((state) => state.company);
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);

  const initialValues = {
    description: "",
    defaultRemarks: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      description: Yup.string().required("Check List is required"),
    }),
    onSubmit: (values) => {
      if (company === "") {
        toast.error("Please select a company from top-bar");
      }
      if (company && !loading) {
        dispatch(
          setupAddCheckList({
            checklistName: values.description,
            defaultRemarks: Number(values.defaultRemarks),
            company: user[0]?.company.find(
              (all) => all?.companyName === company
            ),
            userEmail: user[0]?.email,
          })
        );
      }
    },
  });

  function handleGetAllCheckListItems(id) {
    dispatch(addCheckListId(id));
  }

  function handleChangeCheckListRemarks(event) {
    if (event.target.value) {
      dispatch(
        setupUpdateCheckListRemarks(
          `?userEmailId=${
            user[0]?.email
          }&checklistid=${checkListId}&checklistName=${Number(
            event.target.value
          )}`
        )
      );
    }
  }
  React.useEffect(() => {
    if (checkListAddSuccess) {
      setTimeout(() => {
        dispatch(resetAddCheckListSuccess());
        formik.resetForm({ values: initialValues });
        let email = user[0]?.email;
        let companyId = user[0]?.company.find(
          (all) => all?.companyName === company
        )?.id;
        dispatch(
          setupGetAllCheckLists(`?userEmailId=${email}&companyId=${companyId}`)
        );
      }, 500);
    }
  }, [checkListAddSuccess]);

  React.useEffect(() => {
    let email = user[0]?.email;
    let companyId = user[0]?.company.find(
      (all) => all?.companyName === company
    )?.id;
    if (email && companyId) {
      dispatch(
        setupGetAllCheckLists(`?userEmailId=${email}&companyId=${companyId}`)
      );
    }
  }, [company, user]);

  React.useEffect(() => {
    let email = user[0]?.email;
    if (checkListId && email) {
      dispatch(
        setupGetAllCheckListItems(
          `?userEmailId=${email}&checklistId=${checkListId}`
        )
      );
    }
  }, [checkListId]);

  React.useEffect(() => {
    if (subCheckListAddSuccess) {
      dispatch(resetAddSubCheckListSuccess());
      let email = user[0]?.email;
      dispatch(
        setupGetAllCheckListItems(
          `?userEmailId=${email}&checklistId=${checkListId}`
        )
      );
    }
  }, [subCheckListAddSuccess]);

  return (
    <div
      className="tab-pane fade"
      id="nav-check"
      role="tabpanel"
      aria-labelledby="nav-check-tab"
    >
      {showEditCheckListDialog && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <EditCheckListDialog
              setShowEditCheckListDialog={setShowEditCheckListDialog}
            />
          </div>
        </div>
      )}
      {showEditCheckListItemDialog && (
        <div className="dashboard-modal">
          <div className="model-wrap">
            <EditCheckListItemDialog
              setShowEditCheckListItemDialog={setShowEditCheckListItemDialog}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="sub-heading  fw-bold">Checklist Management</div>
          <label className="fw-light">
            Create and manage your dropdown list for your organisation Location
            Division / Department
          </label>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="row mt-3">
          {/* Description input field */}
          <div className="col-lg-4">
            <label htmlFor="description" className="w-100">
              Check List:
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="form-control w-100 h-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="error">{formik.errors.description}</div>
            )}
          </div>

          <div className="col-lg-4 mt-3 w-100">
            <button
              type="submit"
              className={`btn btn-labeled btn-primary px-3 shadow col-lg-2 ${
                loading && "disabled"
              }`}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              {loading ? "Loading.." : "Add"}
            </button>
          </div>
        </div>
      </form>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="accordion" id="accordionCheckListExample">
            {checkList?.length === 0 ? (
              <p>No Checklist to show!</p>
            ) : (
              checkList?.slice((page - 1) * 5, page * 5)?.map((item, index) => {
                return (
                  <div className="accordion-item" id={index} key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${index}`}
                        onClick={() => handleGetAllCheckListItems(item?.id)}
                      >
                        <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                          <div className=" d-flex align-items-center">
                            {index}. {item?.description}
                          </div>
                          <div onClick={() => setShowEditCheckListDialog(true)}>
                            <i className="fa fa-edit  f-18"></i>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionCheckListExample"
                    >
                      <div className="rows mt-4 mb-4 px-3">
                        <select
                          className="col-lg-6 form-select px-3"
                          value={item?.defaultRemarks}
                          onChange={(e) => handleChangeCheckListRemarks(e)}
                        >
                          <option value="">Select One</option>
                          <option value={1}>Yes</option>
                          <option value={2}>Partially Applicable</option>
                          <option value={3}>No</option>
                          <option value={4}>Not Applicable</option>
                        </select>
                      </div>

                      <div className="accordion-body">
                        <div className=" mt-3 bg-white p-3">
                          <div
                            className="btn btn-labeled btn-primary px-3 shadow col-lg-2"
                            onClick={() => setCheckListManagementDialog(true)}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-plus"></i>
                            </span>
                            Add
                          </div>

                          <div className="row mt-3">
                            <div className="col-lg-12">
                              <div className="table-responsive">
                                <table className="table table-bordered  table-hover rounded">
                                  <thead className="bg-secondary text-white">
                                    <tr>
                                      <th className="w-80">Sr No.</th>
                                      <th>Area</th>
                                      <th>Subject</th>
                                      <th>Particulars</th>
                                      <th>Observation</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {loading ? (
                                      <tr>
                                        <td className="w-300">
                                          <CircularProgress />
                                        </td>
                                      </tr>
                                    ) : checkListItems ? (
                                      checkListItems?.map((item, i) => {
                                        return (
                                          <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.area}</td>
                                            <td>{item?.subject}</td>
                                            <td>{item?.particulars}</td>
                                            <td>{item?.observation}</td>
                                            <td>
                                              <div
                                                onClick={() => {
                                                  setShowEditCheckListItemDialog(
                                                    true
                                                  );
                                                  dispatch(
                                                    changeCurrentSubListItem(
                                                      item
                                                    )
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-edit  px-3 f-18"></i>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })
                                    ) : (
                                      <tr>
                                        <td className="w-300">
                                          No CheckListItem to show. Please Add
                                          One
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <Pagination
            count={Math.ceil(checkList?.length / 5)}
            page={page}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckList;
