import React from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";

const MySettings = (props) => {
  return (
    <PageSettings title="My Settings">
      <AppSection>
        <p>Some content goes here...</p>
      </AppSection>
    </PageSettings>
  );
};

export default MySettings;
