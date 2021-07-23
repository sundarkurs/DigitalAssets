import React, { useContext } from "react";
import AssetsList from "../Assets/List/AssetsList";
import AppDetailDrawer from "../UI/AppDetailDrawer";
import CreateAssetImage from "../Assets/Create/CreateAssetImage";
import CreateAssetProductImage from "../Assets/Create/CreateAssetProductImage";
import AssetImageDetails from "./Details/AssetImageDetails";
import AssetProductImageDetails from "./Details/AssetProductImageDetails";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  drawerDefault: {
    width: "400px",
  },
  drawerExtended: {
    width: "800px",
  },
}));

const AssetExplorer = (props) => {
  const styles = useStyles();
  const explorerCtx = useContext(ExplorerContext);

  const { folderInfo, assets, currentFolderId, refreshAssets } = props;

  var drawerClass = props.drawerClass;
  var drawerContent = "";
  if (explorerCtx.openDrawer) {
    if (explorerCtx.actionType === explorerCtx.assetAction.Create) {
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
    } else if (explorerCtx.actionType === explorerCtx.assetAction.Details) {
      drawerClass = styles.drawerExtended;
      if (folderInfo.folder.assetType === explorerCtx.assetType.Image) {
        drawerContent = <AssetImageDetails asset={explorerCtx.selectedAsset} />;
      }
      if (folderInfo.folder.assetType === explorerCtx.assetType.ProductImage) {
        drawerContent = (
          <AssetProductImageDetails asset={explorerCtx.selectedAsset} />
        );
      }
    }
  }

  return (
    <>
      <AssetsList assets={assets}></AssetsList>

      <AppDetailDrawer
        id="assets"
        drawerClass={drawerClass}
        show={explorerCtx.openDrawer && drawerContent !== ""}
        onClose={() => explorerCtx.setDrawer(false)}
      >
        {drawerContent}
      </AppDetailDrawer>
    </>
  );
};

export default AssetExplorer;
