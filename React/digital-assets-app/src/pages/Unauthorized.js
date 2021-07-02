import React from "react";
import PageSettings from "./Settings/PageSettings";
import PageSection from "./Settings/PageSection";

const Unauthorized = (props) => {
  return (
    <PageSettings title="Unauthorized">
      <PageSection>
        <p>Unauthorized.</p>
      </PageSection>
    </PageSettings>
  );
};

export default Unauthorized;
