import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
// import MultipleSelect from "../../common/select/Select";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CancelledDialog from "../../../components/modals/cancelled-dialog/index";
import PostponedDialog from "../../../components/modals/postponed-dialog/index";
import Modal from "@mui/material/Modal";
import { setupGetAllAuditEngagement } from "../../../global-redux/reducers/audit-engagement/slice";
import { CircularProgress } from "@mui/material";
const AuditEngagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { kickOffRequest, company, year } = useSelector(
    (state) => state.common
  );
  const { allAuditEngagement, loading } = useSelector(
    (state) => state?.auditEngagement
  );
  const { user } = useSelector((state) => state.auth);
  const [showPostPonedModal, setShowPostPonedModal] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [showCancelModal, setShowCancelModal] = React.useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (kickOffRequest === "Kick-Off") {
      navigate("/audit/kick-off");
    }
    if (kickOffRequest === "Postponed") {
      setShowPostPonedModal(true);
      setShowCancelModal(false);
    }
    if (kickOffRequest === "Cancelled") {
      setShowCancelModal(true);
      setShowPostPonedModal(false);
    }
    if (kickOffRequest === "None") {
      setShowCancelModal(true);
      setShowPostPonedModal(false);
    }
  }, [kickOffRequest]);

  React.useEffect(() => {
    if (user[0]?.token) {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      if (companyId) {
        dispatch(
          setupGetAllAuditEngagement(
            `?companyId=${companyId}&currentYear=${Number(year)}&userId=${
              user[0]?.userId?.id
            }`
          )
        );
      }
    }
  }, [user, year,company]);

  return (
    <div>
      {showCancelModal && (
        <Modal
          open={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          closeAfterTransition
        >
          <div className="audit-engagement-dialog">
            <CancelledDialog setShowCancelModal={setShowCancelModal} />
          </div>
        </Modal>
      )}
      {showPostPonedModal && (
        <Modal
          open={showPostPonedModal}
          onClose={() => setShowPostPonedModal(false)}
          closeAfterTransition
        >
          <div className="audit-engagement-dialog">
            <PostponedDialog setShowPostPonedModal={setShowPostPonedModal} />
          </div>
        </Modal>
      )}

      <div>
        <section className="faq-section ">
          <div data-aos="fade-up">
            <header className="section-header my-3 text-start d-flex align-items-center justify-content-between">
              <div className="mb-0 heading">Audit Engagement</div>
            </header>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-bordered  table-hover rounded">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th className="w-80">Sr No.</th>
                        <th>job Name</th>
                        <th>planned Start Date </th>
                        <th>planned End Date </th>
                        <th>job Type </th>
                        <th>status </th>

                        {/* <th>Change Request </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td className="w-300">
                            <CircularProgress />
                          </td>
                        </tr>
                      ) : allAuditEngagement?.length === 0 ? (
                        <tr>
                          <td className="w-300">No data to show!</td>
                        </tr>
                      ) : (
                        allAuditEngagement
                          ?.slice((page - 1) * 5, page * 5)
                          ?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item?.id}</td>
                                <td>{item?.title}</td>
                                <td>
                                  {item?.plannedStartDate
                                    ? moment(item?.plannedStartDate).format(
                                        "DD-MM-YYYY"
                                      )
                                    : "null"}
                                </td>
                                <td>
                                  {item?.plannedEndDate
                                    ? moment(item?.item?.plannedEndDate).format(
                                        "DD-MM-YYYY"
                                      )
                                    : "null"}
                                </td>
                                <td>
                                  {item?.jobType ? item?.jobType : "null"}
                                </td>
                                <td className="kink-off">
                                  <Link
                                    to={`/audit/kick-off?auditEngagementId=${item?.id}`}
                                    className="kink-off"
                                  >
                                    kick off
                                  </Link>
                                </td>

                                {/* <td>
                                  <MultipleSelect />
                                </td> */}
                              </tr>
                            );
                          })
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    count={Math.ceil(allAuditEngagement?.length / 5)}
                    page={page}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuditEngagement;
