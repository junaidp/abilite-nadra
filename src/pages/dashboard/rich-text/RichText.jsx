import React from "react";
import RichTextComponent from "../../../components/admin/dashboard/rich-text/index";
import { Helmet } from "react-helmet-async";

const RichTextPage = () => {
  return (
    <div>
      <Helmet>
        <title>Rich Text Editor</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <RichTextComponent />
    </div>
  );
};

export default RichTextPage;
