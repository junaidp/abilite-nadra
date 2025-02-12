import React from "react";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import DeleteFileDialog from "./DeleteDailog";
import { handleDownload } from "../../../../../../config/helper";

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
                              className="fa fa-download f-18  cursor-pointer"
                              onClick={() =>
                                handleDownload({
                                  base64String: file?.fileBufferblob,
                                  fileName: file?.fileName,
                                })
                              }
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
