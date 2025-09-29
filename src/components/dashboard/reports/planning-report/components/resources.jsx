
const ResourcesTables = ({ resources }) => {
    // Get all unique job names from resources
    const jobColumns = Array.from(
        new Set(
            resources.flatMap((res) => Object.keys(res.jobs || {}))
        )
    );

    const monthColumns = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return (
        <div>
            <div className="row">
                {/* Months Table */}
                <div className="col-lg-12 col-md-12 mb-4">
                    <h5 className="mb-3">Assigned Resources as per Months</h5>
                    <table className="table table-bordered table-hover rounded equal-columns">
                        <thead>
                            <tr>
                                <th>Resource Name</th>
                                {monthColumns.map((month) => (
                                    <th key={month}>{month}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((res) => (
                                <tr key={res.resourceId}>
                                    <td>{res.resourceName}</td>
                                    {monthColumns.map((month) => (
                                        <td key={month}>
                                            {res.monthsOfYear?.[month] ? "✅" : "❌"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Jobs Table */}
                <div className="col-lg-12 col-md-12 mb-4">
                    <h5 className="mb-3">Assigned Resources as per Audit Jobs</h5>
                    <table className="table table-bordered table-hover rounded equal-columns">
                        <thead>
                            <tr>
                                <th>Resource Name</th>
                                <th>Job Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((res) =>
                                Object.entries(res.jobs || {}).map(([jobName, isAssigned]) => (
                                    <tr key={`${res.resourceId}-${jobName}`}>
                                        <td>{res.resourceName}</td>
                                        <td>{jobName}</td>
                                        <td>{isAssigned ? "✅ Assigned" : "❌ Not Assigned"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ResourcesTables;
