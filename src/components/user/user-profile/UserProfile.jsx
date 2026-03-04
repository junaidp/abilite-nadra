import React from "react";
import UserProfileDialog from "../../modals/user-profile-dialog/index";
import { useSelector, useDispatch } from "react-redux";
import {
  resetUpdateUserNameSuccess,
  setupUpdateUserName,
  updateUserState,
  setupSaveUserLogo,
} from "../../../global-redux/reducers/auth/slice";
import { toast } from "react-toastify";
import { sanitizeSimpleName } from "../../../config/helper";

const UserProfile = () => {
  let { user, userNameUpdateSuccess, loading } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = React.useState(user[0]?.name || "");
  const [updateUserDialog, setUpdateUserDialog] = React.useState(false);
  const dispatch = useDispatch();

  // User Logo States
  const defaultLogoBase64 = user?.[0]?.userId?.imgFileData || "";
  const [logoFile, setLogoFile] = React.useState(null);
  const [logoPreview, setLogoPreview] = React.useState(
    defaultLogoBase64 ? `data:image/jpeg;base64,${defaultLogoBase64}` : ""
  );
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (userNameUpdateSuccess) {
      dispatch(resetUpdateUserNameSuccess());
      dispatch(updateUserState(name));
    }
  }, [userNameUpdateSuccess]);

  function handleUpdateUser() {
    if (name === "") {
      toast.error("Provide the name");
    }
    if (name && !loading) {
      dispatch(
        setupUpdateUserName(`?emailid=${user[0]?.userId?.email}&name=${name}`)
      );
    }
  }

  React.useEffect(() => {
    if (user[0]?.name) {
      setName(user[0]?.name);
    }
  }, [user]);

  // User Logo Handlers
  React.useEffect(() => {
    if (defaultLogoBase64) {
      setLogoPreview(`data:image/jpeg;base64,${defaultLogoBase64}`);
    }
  }, [defaultLogoBase64]);

  // --- Frontend signature validation (magic-bytes) ---
  const readHeaderBytes = async (file, length = 16) => {
    const buffer = await file.slice(0, length).arrayBuffer();
    return new Uint8Array(buffer);
  };

  const isJpeg = (bytes) =>
    bytes?.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff;

  const isPng = (bytes) =>
    bytes?.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a;

  const getFileExtension = (fileName = "") => {
    const lower = fileName.toLowerCase().trim();
    const lastDotIndex = lower.lastIndexOf(".");
    if (lastDotIndex === -1) return "";
    return lower.slice(lastDotIndex);
  };

  const hasSuspiciousDoubleExtension = (fileName = "") => {
    // Example: avatar.jpg.bat => suspicious
    const lower = fileName.toLowerCase().trim();
    const parts = lower.split(".");
    return parts.length > 2; // keep strict for profile picture
  };

  const validateImageBySignature = async (file) => {
    const bytes = await readHeaderBytes(file, 16);
    if (isPng(bytes)) return true;
    if (isJpeg(bytes)) return true;
    return false;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation rules (frontend UX only)
    const allowedExtensions = [".png", ".jpg", ".jpeg"];
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSizeMB = 2;

    const fileName = file?.name || "";
    const ext = getFileExtension(fileName);

    // 1) Extension allowlist
    if (!allowedExtensions.includes(ext)) {
      setError("Only PNG, JPG, or JPEG files are allowed.");
      setLogoFile(null);
      return;
    }

    // 2) Block double extensions like .jpg.bat
    if (hasSuspiciousDoubleExtension(fileName)) {
      setError("Invalid file name. Multiple extensions are not allowed.");
      setLogoFile(null);
      return;
    }

    // 3) MIME allowlist (best-effort; spoofable)
    if (!allowedMimeTypes.includes(file.type)) {
      setError("Invalid file type. Only PNG, JPG, or JPEG files are allowed.");
      setLogoFile(null);
      return;
    }

    // 4) Size limit
    if (file.size / 1024 / 1024 > maxSizeMB) {
      setError(`File size should not exceed ${maxSizeMB}MB.`);
      setLogoFile(null);
      return;
    }

    // 5) Signature / magic-bytes check
    try {
      const signatureOk = await validateImageBySignature(file);
      if (!signatureOk) {
        setError("File content does not match a valid PNG/JPEG image.");
        setLogoFile(null);
        return;
      }
    } catch (err) {
      setError("Unable to validate image. Please try another file.");
      setLogoFile(null);
      return;
    }

    setError("");
    setLogoFile(file);

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (loading) return; // Prevent multiple submissions
    if (!logoFile) {
      setError("Please upload a logo before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("file", logoFile);

    dispatch(
      setupSaveUserLogo({
        body: formData,
        userId: user[0]?.userId?.id,
      })
    );
  };

  return (
    <div>
      {updateUserDialog && (
        <div className="model-parent">
          <div className="model-wrap">
            <UserProfileDialog setUpdateUserDialog={setUpdateUserDialog} />
          </div>
        </div>
      )}

      <div className="row mb-4 mt-4">
        <div className="col-lg-2 label-text">Email:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="john@gmail.com"
              required="required"
              value={user[0]?.email}
            />
          </div>
        </div>
      </div>

      <div className="row mb-4 mt-4">
        <div className="col-lg-2 label-text">Name:</div>
        <div className="col-lg-10">
          <div className="form-group">
            <input
              type="text"
              id="fname"
              className="form-control"
              name="fname"
              placeholder="john@gmail.com"
              required="required"
              value={name}
              onChange={(e) => setName(sanitizeSimpleName(e?.target?.value))}
            />
          </div>
        </div>
      </div>

      <div className="rows">
        <button
          className="btn btn-labeled btn-primary px-3  shadow col-lg-2 mr-2"
          onClick={() => setUpdateUserDialog(true)}
        >
          Reset Password
        </button>
        <button
          className={`btn btn-labeled btn-primary px-3  shadow col-lg-2 mx-2 ${loading && "disabled"
            }`}
          onClick={handleUpdateUser}
        >
          {loading ? "Loading" : "Update Name"}
        </button>
      </div>

      <hr />
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="sub-heading fw-bold">Profile Picture</div>
            <label className="fw-light">
              Upload your profile picture. Accepted formats: PNG, JPG, JPEG. Max
              size: 2MB.
            </label>

            <div className="mt-2 mb-2">
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Company Logo Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>

            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className="form-control"
              onChange={handleFileChange}
            />
            {error && <div className="text-danger mt-1">{error}</div>}
          </div>
        </div>

        <div>
          <button
            className={`btn btn-primary mt-4 ${loading ? "disabled" : ""}`}
            onClick={handleSave}
          >
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;