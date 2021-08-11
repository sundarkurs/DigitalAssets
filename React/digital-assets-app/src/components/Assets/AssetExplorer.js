import React, { useContext } from "react";
import AssetsList from "../Assets/List/AssetsList";
import AppRightDrawer from "../UI/AppRightDrawer";
import CreateAssetImage from "../Assets/Create/CreateAssetImage";
import CreateAssetProductImage from "../Assets/Create/CreateAssetProductImage";
import EditAssetImage from "./Edit/EditAssetImage";
import EditAssetProductImage from "./Edit/EditAssetProductImage";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";
import { makeStyles } from "@material-ui/core/styles";
import AssetFiles from "../Files/AssetFiles";
import UploadFile from "../Files/Upload/UploadFile";
import DeleteAsset from "./Delete/DeleteAsset";

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

  const {
    folderInfo,
    assets,
    currentFolderId,
    refreshAssets,
    assetTypeCode,
    loading,
  } = props;

  var drawerClass = props.drawerClass;
  var drawerContent = "";
  let drawerTitle = "";
  if (explorerCtx.openDrawer) {
    if (explorerCtx.actionType === explorerCtx.assetAction.Create) {
      if (folderInfo.folder.assetType === explorerCtx.assetType.ProductImage) {
        drawerTitle = "Create Product Image asset";
        drawerContent = (
          <CreateAssetProductImage
            folderId={folderInfo.folder.id}
            assetType={folderInfo.folder.assetType}
            refreshAssets={refreshAssets}
          ></CreateAssetProductImage>
        );
      } else if (folderInfo.folder.assetType === explorerCtx.assetType.Image) {
        drawerTitle = "Create Image asset";
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
        drawerTitle = "Update Image asset";
        drawerContent = (
          <EditAssetImage
            asset={explorerCtx.selectedAsset}
            refreshAssets={refreshAssets}
          />
        );
      }
      if (folderInfo.folder.assetType === explorerCtx.assetType.ProductImage) {
        drawerTitle = "Update Product image asset";
        drawerContent = (
          <EditAssetProductImage
            asset={explorerCtx.selectedAsset}
            refreshAssets={refreshAssets}
          />
        );
      }
    } else if (explorerCtx.actionType === explorerCtx.assetAction.Files) {
      drawerTitle = `${explorerCtx.selectedAsset.name} : Files`;
      drawerClass = styles.drawerExtended;
      drawerContent = (
        <AssetFiles
          asset={explorerCtx.selectedAsset}
          assetTypeCode={assetTypeCode}
        ></AssetFiles>
      );
    } else if (explorerCtx.actionType === explorerCtx.assetAction.AddFile) {
      drawerTitle = `${explorerCtx.selectedAsset.name} : Upload files`;
      drawerContent = (
        <UploadFile
          asset={explorerCtx.selectedAsset}
          assetTypeCode={assetTypeCode}
        ></UploadFile>
      );
    }
  }

  const onDeleteEndHandler = () => {
    explorerCtx.closeDrawer();
    refreshAssets();
  };

  return (
    <>
      <AssetsList
        assets={assets}
        assetTypeCode={assetTypeCode}
        loading={loading}
      ></AssetsList>

      <AppRightDrawer
        id="assets"
        drawerClass={drawerClass}
        show={explorerCtx.openDrawer && drawerContent !== ""}
        onClose={() => explorerCtx.setDrawer(false)}
        title={drawerTitle}
      >
        {drawerContent}
      </AppRightDrawer>

      {explorerCtx.actionType === explorerCtx.assetAction.Delete && (
        <DeleteAsset
          asset={explorerCtx.selectedAsset}
          assetTypeCode={assetTypeCode}
          onDeleteEnd={onDeleteEndHandler}
        ></DeleteAsset>
      )}
    </>
  );
};

export default AssetExplorer;
