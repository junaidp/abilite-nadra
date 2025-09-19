import React from "react";

/**
 * ImplicationSection
 * Implication Rating and Implication textarea (readonly).
 */
const ImplicationSection = ({ item }) => {
    return (
        <>
            <div className="mb-4 align-items-center">
                <label className="pe-4">Implication Rating:</label>
                <select className="form-select" value={item?.implicationRating} disabled>
                    <option value="">Select One</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
            </div>

            <div className="mb-4">
                <label>Implication:</label>
                <textarea
                    className="form-control"
                    rows="3"
                    value={item?.implication}
                    disabled
                />
            </div>
        </>
    );
};

export default React.memo(ImplicationSection);
