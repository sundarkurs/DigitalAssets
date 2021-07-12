import React, { useState } from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import AssetTypesList from "../components/AssetTypes/AssetTypesList";
import CreateAssetType from "../components/AssetTypes/CreateAssetType";
import EditAssetType from "../components/AssetTypes/EditAssetType";
import DeleteAssetType from "../components/AssetTypes/DeleteAssetType";
import Box from "@material-ui/core/Box";
import classes from "./AssetTypes.module.css";
import AssetTypeActions from "../components/AssetTypes/AssetTypeActions";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const AssetTypes = (props) => {
  const styles = useStyles();
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
        <Box className={panelOpen ? classes.lessWidth : classes.fullWidth}>
          <AppSection>
            <AssetTypeActions onAdd={onAddHandler} />
            <Divider className={styles.divider} />
            <AssetTypesList onEdit={onEditHandler} onDelete={onDeleteHandler} />
          </AppSection>
        </Box>

        {panelOpen && (
          <Box className={classes.addOnPanel}>
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
        />
      )}
    </PageSettings>
  );
};

export default AssetTypes;
