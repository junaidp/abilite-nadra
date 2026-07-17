import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupGetAllFiles } from "../../../../global-redux/reducers/settings/supporting-docs/slice";
import { Pagination } from "@mui/material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../../config/constants";

const SupportingDocs = ({ tab }) => {
  const dispatch = useDispatch();
  const { allFiles, loading } = useSelector((state) => state?.settingsDocs);
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.common);
  const [searchValue, setSearchValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [downloadingFileId, setDownloadingFileId] = React.useState(null);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

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

  React.useEffect(() => {
    if (user[0]?.token && tab === "doc") {
      const companyId = user[0]?.company?.find(
        (item) => item?.companyName === company
      )?.id;
      dispatch(setupGetAllFiles(`?companyId=${companyId}`));
    }
  }, [tab, dispatch]);

  return (
    <div
      className="tab-pane fade active show"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div className="row mb-3">
        <div className="col-lg-6">
          <label className="w-100">Search File Name:</label>
          <input
            className="form-control w-100"
            placeholder="Enter"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e?.target?.value)}
          />
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-bordered   rounded">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="w-80">Sr No.</th>
                  <th>File Name</th>
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
                            <i
                              className={`fa ${
                                downloadingFileId === file?.id
                                  ? "fa-spinner fa-spin"
                                  : "fa-download"
                              } f-18 mx-2 cursor-pointer`}
                              onClick={() => handleDownloadFile(file)}
                            ></i>
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
    </div>
  );
};

export default SupportingDocs;
