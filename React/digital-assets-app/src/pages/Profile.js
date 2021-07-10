import React from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";

const Profile = (props) => {
  return (
    <PageSettings title="Profile">
      <AppSection>
        <p>Some content goes here...</p>
      </AppSection>
    </PageSettings>
  );
};

export default Profile;
