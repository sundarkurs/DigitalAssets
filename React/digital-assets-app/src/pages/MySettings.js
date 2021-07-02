import React from "react";
import PageSettings from "./Settings/PageSettings";
import PageSection from "./Settings/PageSection";

const MySettings = (props) => {
  return (
    <PageSettings title="My Settings">
      <PageSection>
        <p>Some content goes here...</p>
      </PageSection>
    </PageSettings>
  );
};

export default MySettings;
