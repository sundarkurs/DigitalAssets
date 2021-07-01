import React from "react";
import PageSettings from "./Settings/PageSettings";
import AssetTypesList from "../components/AssetTypes/AssetTypesList";

const AssetTypes = (props) => {
  return (
    <PageSettings title="Assets">
      <AssetTypesList />
    </PageSettings>
  );
};

export default AssetTypes;
