import React from "react";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import DeleteFileDialog from "./DeleteDailog";
import { handleDownload } from "../../../../../../constants/index";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 1,
  whiteSpace: "nowrap",
  width: 1,
});

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
        <div className="model-parent">
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
              ) : allFiles?.length === 0 ||
                allFiles[0]?.error === "Not Found" ? (
                <tr>
                  <td className="w-300">No Files Added Yet</td>
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
                        <td>{index + 1}</td>
                        <td>{file?.fileName}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <i
                              className="fa fa-download f-18  cursor-pointer"
                              onClick={() =>
                                handleDownload({
                                  base64String: file?.fileData,
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
          <Pagination
            count={Math.ceil(allFiles?.length / 10)}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
