import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import Pagination from "../../../../components/common/pagination/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
import MultipleSelect from "../../../common/select/Select";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CancelledDialog from "../../../../components/modals/cancelled-dialog/index";
import PostponedDialog from "../../../../components/modals/postponed-dialog/index";
import Modal from "@mui/material/Modal";
const AuditEngagement = () => {
  let { kickOffRequest } = useSelector((state) => state.common);
  let navigate = useNavigate();
  let [showPostPonedModal, setShowPostPonedModal] = React.useState(false);
  let [showCancelModal, setShowCancelModal] = React.useState(false);

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
  }, [kickOffRequest]);

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
                        <th style={{ width: "80px" }}>Sr No.</th>
                        <th>job Name</th>
                        <th>planned Start Date </th>
                        <th>planned End Date </th>
                        <th>job Type </th>
                        <th>status </th>
                        <th>planning </th>
                        <th>field Work </th>
                        <th>reporting </th>
                        <th>Change Request </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="kink-off">
                          <Link to="/audit/kick-off" className="kink-off">
                            kick off
                          </Link>
                        </td>
                        <td>
                          <div className="progress-bar ">
                            <LinearProgress variant="determinate" value={30} />
                          </div>
                        </td>
                        <td>
                          <div className="progress-bar "></div>
                        </td>
                        <td>
                          <div className="progress-bar ">
                            <LinearProgress variant="determinate" value={30} />
                          </div>
                        </td>
                        <td>
                          <MultipleSelect />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Pagination />
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
