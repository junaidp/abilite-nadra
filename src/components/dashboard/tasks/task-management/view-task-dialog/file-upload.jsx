import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setupTaskFileDownload } from "../../../../../global-redux/reducers/tasks-management/slice";

const InformationRequestFileUpload = ({ updateTaskId }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = React.useState([]);
  const { singleTask } = useSelector((state) => state?.tasksManagement);

  const handleFileDownload = (fileItem) => {
    dispatch(
      setupTaskFileDownload({
        fileId: Number(fileItem?.id),
        fileName: fileItem?.fileName,
      })
    )
      .unwrap()
      .then(({ blob, fileName }) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        toast.error("Unable to download file.");
      });
  };

  React.useEffect(() => {
    const task = Number(singleTask?.id) === Number(updateTaskId) ? singleTask : {};
    setFiles(task?.fileAttachments);
  }, [updateTaskId, singleTask]);

  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label className="form-label me-3 mb-3">Attached Files</label>

        <div className="table-responsive">
          <table className="table table-bordered  table-hover rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Attach Files </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!files || files?.length == 0 ? (
                <tr>
                  <td className="w-300">No Files Added Yet!</td>
                </tr>
              ) : (
                files?.map((fileItem, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a>{fileItem?.fileName}</a>
                      </td>
                      <td className="w-130">
                        <i
                          className="fa fa-download f-18 mx-2 cursor-pointer"
                          onClick={() => handleFileDownload(fileItem)}
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
    </div>
  );
};

export default InformationRequestFileUpload;
