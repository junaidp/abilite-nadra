import UpdateRichTextEditor from "../../../../../../common/update-rich-text-editor/UpdateRichTextEditor";

/**
 * Renders a collection of editable rich text sections for the planning report.
 * Each section includes a label, editor, and word-limit note.
 */
const Editors = ({ onContentChange, data }) => {
  const sections = [
    {
      label: "Executive Summary",
      name: "summary",
      value: data?.summary,
    },
    {
      label: "Audit Planning Methodology",
      name: "methodology",
      value: data?.methodology,
    },
    {
      label: "Risk Assessment Summary",
      name: "riskAssessmentSummary",
      value: data?.riskAssessmentSummary,
    },
    {
      label:
        "Organizational strategy, key areas of focus, key risks, and associated assurance strategies in the audit plan.",
      name: "organizationStrategy",
      value: data?.organizationStrategy,
    },
    {
      label: "Summary of Risks",
      name: "summaryRisk",
      value: data?.summaryRisk,
    },
  ];

  return (
    <div>
      {sections.map(({ label, name, value }, index) => (
        <div className="row mb-3" key={index}>
          <div className="col-lg-12">
            <label htmlFor={name} className="form-label">
              {label}
            </label>
            <UpdateRichTextEditor
              onContentChange={onContentChange}
              initialValue={value}
              name={name}
            />
            <p className="word-limit-info mb-0">Maximum 1500 words</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Editors;
