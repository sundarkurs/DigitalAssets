import React, { useState } from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import AssetTypesList from "../components/AssetTypes/AssetTypesList";
import CreateAssetType from "../components/AssetTypes/CreateAssetType";
import EditAssetType from "../components/AssetTypes/EditAssetType";
import DeleteAssetType from "../components/AssetTypes/DeleteAssetType";
import Box from "@material-ui/core/Box";
import styles from "./AssetTypes.module.css";

const AssetTypes = (props) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [assetType, setAssetType] = useState({});

  const onAddHandler = () => {
    setPanelOpen(true);
    setMode("add");
  };

  const onEditHandler = (assetType) => {
    setAssetType(assetType);
    setPanelOpen(true);
    setMode("edit");
  };

  const onDeleteHandler = (assetType) => {
    setAssetType(assetType);
    setPanelOpen(false);
    setMode("delete");
  };

  const closeDetailsPanelHandler = () => {
    setMode("");
    setPanelOpen(false);
  };

  const onDeleteEndHandler = () => {
    setMode("");
    setPanelOpen(false);
  };

  return (
    <PageSettings title="Asset Types">
      <Box display="flex">
        <Box className={panelOpen ? styles.lessWidth : styles.fullWidth}>
          <AppSection>
            <AssetTypesList
              onAdd={onAddHandler}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
            />
          </AppSection>
        </Box>

        {panelOpen && (
          <Box className={styles.addOnPanel}>
            <AppSection>
              {mode === "add" && (
                <CreateAssetType
                  closeDetailsPanel={closeDetailsPanelHandler}
                ></CreateAssetType>
              )}
              {mode === "edit" && (
                <EditAssetType
                  assetType={assetType}
                  closeDetailsPanel={closeDetailsPanelHandler}
                ></EditAssetType>
              )}
            </AppSection>
          </Box>
        )}
      </Box>
      {mode === "delete" && (
        <DeleteAssetType
          assetType={assetType}
          onDeleteEnd={onDeleteEndHandler}
        ></DeleteAssetType>
      )}
    </PageSettings>
  );
};

export default AssetTypes;
