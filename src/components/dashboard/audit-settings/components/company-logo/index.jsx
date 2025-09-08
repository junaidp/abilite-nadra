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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation rules
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        const maxSizeMB = 2;

        if (!allowedTypes.includes(file.type)) {
            setError("Only PNG, JPG, or JPEG files are allowed.");
            setLogoFile(null);
            return;
        }

        if (file.size / 1024 / 1024 > maxSizeMB) {
            setError(`File size should not exceed ${maxSizeMB}MB.`);
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
