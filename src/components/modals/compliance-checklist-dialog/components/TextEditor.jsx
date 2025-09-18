import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({
  onContentChange,
  initialValue,
  singleItem,
  allowEdit,
}) => {
  const editor = useRef(null);
  const [content, setContent] = React.useState(initialValue || "");

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
      readonly:
        singleItem?.remarks === "1" ||
          singleItem?.remarks === "3" ||
          allowEdit === false
          ? true
          : false,
      spellCheck: true,
      askBeforePasteHTML: true,
      removeButtons: ['about'],
      events: {},
      textIcons: false,

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
        "table",
        "|",
        "font",
        "|",
        "fontsize",
        "|",
        "paragraph",
        "|",
        "image"
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
        "table",
        "|",
        "font",
        "|",
        "fontsize",
        "|",
        "paragraph",
        "|",
        "image"
      ],
    }),
    [singleItem?.remarks]
  );

  React.useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onContentChange(singleItem?.id, newContent);
  };

  return (
    <JoditEditor
      ref={editor}
      config={config}
      tabIndex={1}
      value={content}
      onChange={(newContent) => { }}
      onBlur={handleEditorChange}
    />
  );
};

export default RichTextEditor;
