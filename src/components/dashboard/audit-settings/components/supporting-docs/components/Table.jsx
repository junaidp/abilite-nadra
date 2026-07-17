import React from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import DeleteFileDialog from "./DeleteDailog";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../../../../../config/constants";

const Table = ({
  userRole,
  userHierarchy,
  allFiles,
  loading,
  searchValue,
  handleChangePage,
  page,
}) => {
  const [currentFileId, setCurrentFileId] = React.useState("");
  const [deleteFileDialog, setDeleteFileDialog] = React.useState(false);
  const [downloadingFileId, setDownloadingFileId] = React.useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleDownloadFile = async (file) => {
    if (!file?.id || downloadingFileId) return;

    try {
      setDownloadingFileId(file.id);
      const response = await axios.get(
        `${baseUrl}/abiliteconfig/supporting/doc/download?id=${file?.id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${user[0]?.token}`,
          },
        }
      );

      const blobUrl = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file?.fileName || "supporting-document";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Unable to download file");
    } finally {
      setDownloadingFileId(null);
    }
  };

  return (
    <div className="row my-3">
      {deleteFileDialog && (
        <div className="model-parent d-flex justify-content-between items-center">
          <div className="model-wrap">
            <DeleteFileDialog
              setDeleteFileDialog={setDeleteFileDialog}
              currentFileId={currentFileId}
            />
          </div>
        </div>
      )}
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table table-bordered   rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="w-80">Sr No.</th>
                <th>File Name</th>
                <th className="w-180">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="w-300">
                    <CircularProgress />
                  </td>
                </tr>
              ) : allFiles?.length === 0 ? (
                <tr>
                  <td className="w-300">No Files To Show.</td>
                </tr>
              ) : (
                allFiles
                  ?.filter((all) =>
                    all?.fileName
                      ?.toLowerCase()
                      .includes(searchValue?.toLowerCase())
                  )
                  ?.slice((page - 1) * 10, page * 10)
                  ?.map((file, index) => {
                    return (
                      <tr key={index}>
                        <td>{(page - 1) * 10 + index + 1}</td>
                        <td>{file?.fileName}</td>
                        <td>
                          <div className="d-flex flex-wrap gap-4">
                            <i
                              className={`fa ${
                                downloadingFileId === file?.id
                                  ? "fa-spinner fa-spin"
                                  : "fa-download"
                              } f-18  cursor-pointer`}
                              onClick={() => handleDownloadFile(file)}
                            ></i>
                            {(userRole === "ADMIN" ||
                              userHierarchy === "IAH") && (
                              <i
                                className="fa fa-trash text-danger f-18 cursor-pointer"
                                onClick={() => {
                                  setCurrentFileId(file?.id);
                                  setDeleteFileDialog(true);
                                }}
                              ></i>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
          {allFiles && allFiles?.length > 0 && (
            <Pagination
              count={Math.ceil(allFiles?.length / 10)}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
