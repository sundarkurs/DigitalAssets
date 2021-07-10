import React, { useState } from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import AssetTypesList from "../components/AssetTypes/AssetTypesList";
import CreateAssetType from "../components/AssetTypes/CreateAssetType";
import Box from "@material-ui/core/Box";
import styles from "./AssetTypes.module.css";

const AssetTypes = (props) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const openDetailsPanelHandler = () => {
    setPanelOpen(true);
  };

  const closeDetailsPanelHandler = () => {
    setPanelOpen(false);
  };

  return (
    <PageSettings title="Asset Types">
      <Box display="flex">
        <Box className={panelOpen ? styles.lessWidth : styles.fullWidth}>
          <AppSection>
            <AssetTypesList openDetailsPanel={openDetailsPanelHandler} />
          </AppSection>
        </Box>
        {panelOpen && (
          <Box className={styles.addOnPanel}>
            <AppSection>
              <CreateAssetType
                closeDetailsPanel={closeDetailsPanelHandler}
              ></CreateAssetType>
            </AppSection>
          </Box>
        )}
      </Box>
    </PageSettings>
  );
};

export default AssetTypes;
