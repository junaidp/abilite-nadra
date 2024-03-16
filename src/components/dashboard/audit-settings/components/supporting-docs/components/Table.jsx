import React from "react";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
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
  handleUpdateFileChange,
  handleFileUpdate,
  handleChangePage,
  page,
  selectedUpdateFile,
}) => {
  return (
    <div className="row my-3">
      <div className="float-right w-100 flex flex-end">
        {(userRole === "ADMIN" || userHierarchy === "IAH") && (
          <p className="my-2">
            {selectedUpdateFile?.name
              ? selectedUpdateFile?.name
              : "Add File To Update"}
          </p>
        )}
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table table-bordered   rounded">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="w-80">Sr No.</th>
                <th className="w-80">Id</th>
                <th>File Name</th>
                <th>File Location</th>
                <th className="w-180">Action</th>
                {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                  <th className="w-180">Update</th>
                )}
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
                        <td>{file?.id}</td>
                        <td>{file?.fileName}</td>
                        <td>{file?.location}</td>
                        <td>
                          <i className="fa-eye fa f-18"></i>

                          {(userRole === "ADMIN" ||
                            userHierarchy === "IAH") && (
                            <i className="fa fa-trash text-danger f-18 px-3"></i>
                          )}
                          <i className="fa fa-download f-18 mx-2"></i>
                        </td>
                        {(userRole === "ADMIN" || userHierarchy === "IAH") && (
                          <td>
                            <div className="row">
                              <div className="mx-2 mb-2 col-lg-3">
                                <Button
                                  component="label"
                                  role={undefined}
                                  variant="contained"
                                  tabIndex={-1}
                                  startIcon={<CloudUploadIcon />}
                                  onChange={handleUpdateFileChange}
                                >
                                  Upload
                                  <VisuallyHiddenInput type="file" />
                                </Button>
                                <Button
                                  component="label"
                                  className="mt-2"
                                  onClick={() => handleFileUpdate(file?.id)}
                                >
                                  Update
                                </Button>
                              </div>
                            </div>
                          </td>
                        )}
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
