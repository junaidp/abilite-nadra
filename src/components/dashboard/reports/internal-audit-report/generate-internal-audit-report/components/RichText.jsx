import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Jodit } from "jodit";

const RichTextEditor = ({
  handleChangeExcutiveSummary,
  initialValue,
  handleChangeAuditPurpose,
  handleChangeAnnexure,
  handleChangeSummaryOfKeyFinding,
  keyFindingId,
}) => {
  const editor = useRef(null);
  const [content, setContent] = React.useState("");

  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
      },
      controls: {
        font: {
          list: {
            Serif: "Sans Serif",
            Garamond: "Garamond",
          },
        },
      },
      toolbarAdaptive: false,
      spellcheck: true,
      pasteHTMLActionList: Jodit.atom([
        {
          value: Jodit.constants.INSERT_ONLY_TEXT,
          text: "Insert this content as text",
        },
      ]),
      askBeforePasteHTML: true,
      buttons: [
        "bold",
        "|",
        "strikethrough",
        "|",
        "underline",
        "|",
        "italic",
        "|",
        "ul",
        "|",
        "ol",
        "|",
        "image",
        "|",
        "table",
        "|",
        "font",
        "|",
        "fontsize",
        "|",
        "paragraph",
        "|",
      ],

      buttonsXS: [
        "bold",
        "|",
        "strikethrough",
        "|",
        "underline",
        "|",
        "italic",
        "|",
        "ul",
        "|",
        "ol",
        "|",
        "image",
        "|",
        "table",
        "|",
        "font",
        "|",
        "fontsize",
        "|",
        "paragraph",
        "|",
      ],

      events: {},
      textIcons: false,
    }),
    []
  );

  React.useEffect(() => {
    if (initialValue !== null && initialValue !== "") {
      setContent(initialValue);
    }
  }, [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    if (handleChangeExcutiveSummary) {
      handleChangeExcutiveSummary(newContent);
    }
    if (handleChangeAuditPurpose) {
      handleChangeAuditPurpose(newContent);
    }
    if (handleChangeAnnexure) {
      handleChangeAnnexure(newContent);
    }
    if (handleChangeSummaryOfKeyFinding) {
      handleChangeSummaryOfKeyFinding(newContent, keyFindingId);
    }
  };

  return (
    <JoditEditor
      ref={editor}
      config={config}
      tabIndex={1}
      value={content}
      onChange={(newContent) => {}}
      onBlur={handleEditorChange}
    />
  );
};

export default RichTextEditor;
