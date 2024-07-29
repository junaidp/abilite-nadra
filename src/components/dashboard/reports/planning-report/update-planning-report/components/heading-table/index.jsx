import React from "react";
import AddHeadingDialog from "../dialogs/add-heading-dialog";
import UpdateHeadingDialog from "../dialogs/update-heading-dialog";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteHeading } from "../../../../../../../global-redux/reducers/reports/planing-report/slice";

const HeadingTable = ({ data, reportId }) => {
  const dispatch = useDispatch();
  const { updateLoading } = useSelector((state) => state?.planningReport);
  const [showAddHeadingDialog, setShowAddHeadingDialog] = React.useState(false);
  const [showUpdateHeadingDialog, setShowUpdateHeadingDialog] =
    React.useState(false);
  const [updateHeadingId, setUpdateHeadingId] = React.useState("");

  function handleDeleteHeading(headingId) {
    if (!updateLoading) {
      dispatch(setupDeleteHeading({ headingId, planningReportId: reportId }));
    }
  }

  function handleUpdateHeading(id) {
    setUpdateHeadingId(id);
    setShowUpdateHeadingDialog(true);
  }

  function handleAddHeading() {
    setShowAddHeadingDialog(true);
  }
  return (
    <div>
      {showAddHeadingDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddHeadingDialog
              setShowAddHeadingDialog={setShowAddHeadingDialog}
              reportId={reportId}
            />
          </div>
        </div>
      )}
      {showUpdateHeadingDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <UpdateHeadingDialog
              setShowUpdateHeadingDialog={setShowUpdateHeadingDialog}
              updateHeadingId={updateHeadingId}
              reportId={reportId}
            />
          </div>
        </div>
      )}
      <div className="flex justify-start">
        <button
          className={`btn btn-secondary  my-4 `}
          onClick={handleAddHeading}
        >
          Add Heading
        </button>
      </div>
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
            {data?.newHeading?.length === 0 || !data?.newHeading ? (
              <tr>
                <td className="w-300">No Heading Added!</td>
              </tr>
            ) : (
              data?.newHeading?.map((head, index) => {
                return (
                  <tr key={index}>
                    <td>{head?.heading}</td>
                    <td>{head?.description}</td>
                    <td className="w-130">
                      <i
                        className="fa fa-edit  px-3 f-18 cursor-pointer"
                        onClick={() => handleUpdateHeading(head?.id)}
                      ></i>
                      <i
                        className="fa fa-trash text-danger f-18 cursor-pointer"
                        onClick={() => handleDeleteHeading(head?.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeadingTable;
