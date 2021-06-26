import React from "react";
import PageSettings from "./Settings/PageSettings";
import AssetTypesList from "../components/Assets/AssetTypesList";

const Assets = (props) => {
  return (
    <PageSettings title="Assets">
      <AssetTypesList />
    </PageSettings>
  );
};

export default Assets;
