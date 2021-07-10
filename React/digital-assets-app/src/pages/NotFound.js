import React from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";

const NotFound = (props) => {
  return (
    <PageSettings title="Not found">
      <AppSection>
        <p>Resource not found.</p>
      </AppSection>
    </PageSettings>
  );
};

export default NotFound;
