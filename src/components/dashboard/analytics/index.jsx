import React, { useEffect, useRef } from "react";

const TableauEmbed = () => {
  const vizRef = useRef(null);

  useEffect(() => {
    const vizUrl =
      "https://public.tableau.com/views/SQLQueryResults/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";
    const options = {
      width: "100%",
      height: "600px",
      hideTabs: true,
      hideToolbar: true,
    };

    const viz = new window.tableau.Viz(vizRef.current, vizUrl, options);

    return () => {
      viz.dispose();
    };
  }, []);

  return <div ref={vizRef}></div>;
};

export default TableauEmbed;
