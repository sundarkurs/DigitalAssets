import React from "react";
import PageSettings from "./Settings/PageSettings";
import PageSection from "./Settings/PageSection";

const NotFound = (props) => {
  return (
    <PageSettings title="Not found">
      <PageSection>
        <p>Resource not found.</p>
      </PageSection>
    </PageSettings>
  );
};

export default NotFound;
