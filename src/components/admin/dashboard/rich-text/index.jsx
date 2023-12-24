import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichText = () => {
  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ align: [] }],
          ["image", "table"],
        ],
      },
    }),
    []
  );

  const [value, setValue] = useState("");
  return (
    <div>
      <ReactQuill modules={modules} value={value} onChange={setValue} />
    </div>
  );
};

export default RichText;
