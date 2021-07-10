import React from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";

const Unauthorized = (props) => {
  return (
    <PageSettings title="Unauthorized">
      <AppSection>
        <p>Unauthorized.</p>
      </AppSection>
    </PageSettings>
  );
};

export default Unauthorized;
