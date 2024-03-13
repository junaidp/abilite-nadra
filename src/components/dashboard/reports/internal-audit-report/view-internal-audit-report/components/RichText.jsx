import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ initialValue }) => {
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
      readonly: true,

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
  };

  return (
    <JoditEditor
      ref={editor}
      config={config}
      tabIndex={1}
      value={content}
      onChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
