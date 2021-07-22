import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import AssetsList from "../Assets/List/AssetsList";
import AppDetailDrawer from "../UI/AppDetailDrawer";
import { makeStyles } from "@material-ui/core/styles";
import CreateAssetImage from "../Assets/Create/CreateAssetImage";
import CreateAssetProductImage from "../Assets/Create/CreateAssetProductImage";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  drawer: {
    width: "400px",
  },
}));

const AssetExplorer = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const styles = useStyles();

  var isOpenDrawer = false;
  const { folderInfo, assets, currentFolderId, refreshAssets } = props;

  if (explorerCtx.openDrawer) {
    if (explorerCtx.actionType === "add-asset") {
      isOpenDrawer = true;
    }
  }

  var drawerContent = "";
  if (isOpenDrawer) {
    if (explorerCtx.actionType === "add-asset") {
      if (folderInfo.folder.assetType === explorerCtx.assetType.ProductImage) {
        drawerContent = (
          <CreateAssetProductImage
            folderId={folderInfo.folder.id}
            assetType={folderInfo.folder.assetType}
            refreshAssets={refreshAssets}
          ></CreateAssetProductImage>
        );
      } else if (folderInfo.folder.assetType === explorerCtx.assetType.Image) {
        drawerContent = (
          <CreateAssetImage
            folderId={folderInfo.folder.id}
            assetType={folderInfo.folder.assetType}
            refreshAssets={refreshAssets}
          ></CreateAssetImage>
        );
      }
    }
  }

  return (
    <>
      <AssetsList assets={assets}></AssetsList>

      <AppDetailDrawer
        id="assets"
        drawerClass={styles.drawer}
        show={isOpenDrawer}
        onClose={() => explorerCtx.setDrawer(false)}
      >
        {drawerContent}
      </AppDetailDrawer>
    </>
  );
};

export default AssetExplorer;
