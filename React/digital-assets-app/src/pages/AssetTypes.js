import React, { useState } from "react";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import AssetTypesList from "../components/AssetTypes/List/AssetTypesList";
import EditAssetType from "../components/AssetTypes/Edit/EditAssetType";
import DisableAssetType from "../components/AssetTypes/Disable/DisableAssetType";
import AssetTypeActions from "../components/AssetTypes/Actions/AssetTypeActions";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import AppRightDrawer from "../components/UI/AppRightDrawer";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  drawer: {
    width: "400px",
  },
}));

const AssetTypes = (props) => {
  const styles = useStyles();
  const [mode, setMode] = useState("");
  const [assetType, setAssetType] = useState({});
  const [showDrawer, setShowDrawer] = useState(false);

  const onEditHandler = (assetType) => {
    setAssetType(assetType);
    setShowDrawer(true);
    setMode("edit");
  };

  const onDisableHandler = (assetType) => {
    setAssetType(assetType);
    setShowDrawer(false);
    setMode("disable");
  };

  const closeDetailsPanelHandler = () => {
    setMode("");
    setShowDrawer(false);
  };

  const onDisableEndHandler = () => {
    setMode("");
    setShowDrawer(false);
  };

  const toggleDrawer = (open) => {
    setShowDrawer(open);
  };

  const onExportHandler = () => {
    setShowDrawer(true);
  };

  var drawerContent = "";
  let drawerTitle = "";
  if (showDrawer) {
    if (mode === "edit") {
      drawerTitle = "Edit asset type";
      drawerContent = (
        <EditAssetType
          assetType={assetType}
          closeDetailsPanel={closeDetailsPanelHandler}
        ></EditAssetType>
      );
    }
  }

  return (
    <PageSettings title="Asset Types">
      <AppSection>
        <AssetTypeActions onExport={onExportHandler} />
        <Divider className={styles.divider} />
        <AssetTypesList onEdit={onEditHandler} onDisable={onDisableHandler} />
      </AppSection>
      {mode === "disable" && (
        <DisableAssetType
          assetType={assetType}
          onDisableEnd={onDisableEndHandler}
        />
      )}

      <AppRightDrawer
        drawerClass={styles.drawer}
        show={showDrawer}
        onClose={() => toggleDrawer(false)}
        title={drawerTitle}
      >
        {drawerContent}
      </AppRightDrawer>
    </PageSettings>
  );
};

export default AssetTypes;
