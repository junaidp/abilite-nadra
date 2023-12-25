import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const Example = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    // readonly: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "align",
      "ul",
      "ol",
      "|",
      "image",
      "table",
    ],
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {}}
    />
  );
};

export default Example;
