import React, { useContext } from "react";
import AssetsList from "../Assets/List/AssetsList";
import AppDetailDrawer from "../UI/AppDetailDrawer";
import CreateAssetImage from "../Assets/Create/CreateAssetImage";
import CreateAssetProductImage from "../Assets/Create/CreateAssetProductImage";
import EditAssetImage from "./Edit/EditAssetImage";
import EditAssetProductImage from "./Edit/EditAssetProductImage";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssetFiles from "../File/AssetFiles";
import UploadFile from "../File/Upload/UploadFile";

const useStyles = makeStyles((theme) => ({
  drawerDefault: {
    width: "400px",
  },
  drawerExtended: {
    width: "600px",
  },
}));

const AssetExplorer = (props) => {
  const styles = useStyles();
  const explorerCtx = useContext(ExplorerContext);

  const { folderInfo, assets, currentFolderId, refreshAssets, assetTypeCode } =
    props;

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
    } else if (explorerCtx.actionType === explorerCtx.assetAction.Edit) {
      if (folderInfo.folder.assetType === explorerCtx.assetType.Image) {
        drawerContent = (
          <EditAssetImage
            asset={explorerCtx.selectedAsset}
            refreshAssets={refreshAssets}
          />
        );
      }
      if (folderInfo.folder.assetType === explorerCtx.assetType.ProductImage) {
        drawerContent = (
          <EditAssetProductImage
            asset={explorerCtx.selectedAsset}
            refreshAssets={refreshAssets}
          />
        );
      }
    } else if (explorerCtx.actionType === explorerCtx.assetAction.Files) {
      drawerClass = styles.drawerExtended;
      drawerContent = (
        <AssetFiles
          asset={explorerCtx.selectedAsset}
          assetTypeCode={assetTypeCode}
        ></AssetFiles>
      );
    } else if (explorerCtx.actionType === explorerCtx.assetAction.AddFile) {
      drawerContent = (
        <UploadFile
          asset={explorerCtx.selectedAsset}
          assetTypeCode={assetTypeCode}
        ></UploadFile>
      );
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
