import React, { useContext } from "react";
import AssetsList from "../Assets/List/AssetsList";
import AppDetailDrawer from "../UI/AppDetailDrawer";
import CreateAssetImage from "../Assets/Create/CreateAssetImage";
import CreateAssetProductImage from "../Assets/Create/CreateAssetProductImage";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";

const AssetExplorer = (props) => {
  const explorerCtx = useContext(ExplorerContext);

  const { drawerClass, folderInfo, assets, currentFolderId, refreshAssets } =
    props;

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
