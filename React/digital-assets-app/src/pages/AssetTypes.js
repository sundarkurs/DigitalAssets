import React, { useState } from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import AssetTypesList from "../components/AssetTypes/List/AssetTypesList";
import CreateAssetType from "../components/AssetTypes/Create/CreateAssetType";
import EditAssetType from "../components/AssetTypes/Edit/EditAssetType";
import DisableAssetType from "../components/AssetTypes/Disable/DisableAssetType";
import AssetTypeActions from "../components/AssetTypes/Actions/AssetTypeActions";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import classes from "./AssetTypes.module.css";
import { makeStyles } from "@material-ui/core/styles";

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

  const onDisableHandler = (assetType) => {
    setAssetType(assetType);
    setPanelOpen(false);
    setMode("disable");
  };

  const closeDetailsPanelHandler = () => {
    setMode("");
    setPanelOpen(false);
  };

  const onDisableEndHandler = () => {
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
            <AssetTypesList
              onEdit={onEditHandler}
              onDisable={onDisableHandler}
            />
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
      {mode === "disable" && (
        <DisableAssetType
          assetType={assetType}
          onDisableEnd={onDisableEndHandler}
        />
      )}
    </PageSettings>
  );
};

export default AssetTypes;
