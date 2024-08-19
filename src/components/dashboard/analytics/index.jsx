import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const TableauEmbed = () => {
  const vizRef = useRef(null);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(
    "https://public.tableau.com/views/SQLQueryResults/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  );

  function handleShowAnalytics() {
    if (url === "") {
      toast.error("Please provide a Tableau graph URL.");
      return;
    }

    if (!url.startsWith("https://public.tableau.com/")) {
      toast.error("Please provide a valid Tableau graph URL.");
      return;
    }

    setShow((prev) => !prev);
  }

  useEffect(() => {
    const options = {
      width: "100%",
      height: "600px",
      hideTabs: true,
      hideToolbar: true,
    };

    const viz = new window.tableau.Viz(vizRef.current, url, options);

    return () => {
      viz.dispose();
    };
  }, [show]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <textarea
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="form-control h-120 w-100"
            placeholder="Enter Tableau URL here"
          />
        </div>
      </div>
      <div className="d-flex justify-end my-4">
        <button onClick={handleShowAnalytics} className="btn btn-primary m-0">
          Show Analytics
        </button>
      </div>
      <div ref={vizRef}></div>
    </div>
  );
};

export default TableauEmbed;
