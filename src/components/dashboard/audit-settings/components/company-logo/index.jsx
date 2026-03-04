import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setupSaveCompanyLogo } from "../../../../../global-redux/reducers/auth/slice";

const CompanyLogo = () => {
    const { loading, user } = useSelector((state) => state.auth);
    const { company } = useSelector((state) => state.common);
    const dispatch = useDispatch();

    // Get default logo as Base64 if available
    const defaultLogoBase64 = user?.[0]?.company?.[0]?.logo?.fileData || "";
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(
        defaultLogoBase64 ? `data:image/jpeg;base64,${defaultLogoBase64}` : ""
    );
    const [error, setError] = useState("");

    useEffect(() => {
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
        bytes?.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;

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
        // Example: logo.jpg.bat => suspicious
        const lower = fileName.toLowerCase().trim();
        const parts = lower.split(".");
        return parts.length > 2; // for logo upload we keep it strict
    };

    const validateImageBySignature = async (file) => {
        const bytes = await readHeaderBytes(file, 16);

        // Prefer signature over mimetype (mimetype can be spoofed)
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

        // 2) Extra strict: block double extensions like .jpg.bat
        if (hasSuspiciousDoubleExtension(fileName)) {
            setError("Invalid file name. Multiple extensions are not allowed.");
            setLogoFile(null);
            return;
        }

        // 3) MIME allowlist (best-effort; still spoofable)
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

        // 5) Signature / magic-bytes check (prevents obvious rename tricks)
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

        const selectedCompany = user[0]?.company?.find(
            (item) => item?.companyName === company
        );

        dispatch(
            setupSaveCompanyLogo({
                body: formData,
                companyId: selectedCompany?.id,
            })
        );
    };

    return (
        <div
            className="tab-pane fade"
            id="nav-logo"
            role="tabpanel"
            aria-labelledby="nav-logo-tab"
        >
            <div className="row">
                <div className="col-lg-12">
                    <div className="sub-heading fw-bold">Company Logo</div>
                    <label className="fw-light">
                        Upload your company's logo. Accepted formats: PNG, JPG, JPEG. Max size: 2MB.
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
    );
};

export default CompanyLogo;