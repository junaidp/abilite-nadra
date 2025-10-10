import ViewRichTextEditor from "../../../../../../common/view-rich-text-editor/ViewRichTextEditor";

/**
 * Displays read-only rich text sections for the Planning Report.
 * Each section corresponds to a specific part of the report.
 */
const Editors = ({ data }) => {
  // Define the report sections with labels and corresponding data keys
  const sections = [
    {
      label: "Executive Summary",
      value: data?.summary,
    },
    {
      label: "Audit Planning Methodology",
      value: data?.methodology,
    },
    {
      label: "Risk Assessment Summary",
      value: data?.riskAssessmentSummary,
    },
    {
      label:
        "Organizational strategy, key areas of focus, key risks, and associated assurance strategies in the audit plan.",
      value: data?.organizationStrategy,
    },
    {
      label: "Summary of Risks",
      value: data?.summaryRisk,
    },
  ];

  return (
    <div>
      {sections.map(({ label, value }, index) => (
        <div className="row mb-3" key={index}>
          <div className="col-lg-12">
            <label className="form-label">{label}</label>
            <ViewRichTextEditor initialValue={value} />
            <p className="word-limit-info mb-0">Maximum 1500 words</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Editors;
