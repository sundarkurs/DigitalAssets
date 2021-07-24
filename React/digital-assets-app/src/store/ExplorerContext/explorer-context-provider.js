import React, { useEffect, useState } from "react";
import ExplorerContext from "./explorer-context";

const AssetType = {
  ProductImage: 1,
  Image: 2,
};

const FolderAction = {
  Add: "add-folder",
  Rename: "rename-folder",
  Delete: "delete-folder",
};

const AssetAction = {
  Create: "add-asset",
  Delete: "delete-asset",
  Edit: "edit-asset",
  Details: "asset-details",
  Files: "asset-files",
};

export const ExplorerContextProvider = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [selectedAsset, setSelectedAsset] = useState({});

  const closeDrawerHandler = () => {
    setActionType(null);
    setOpenDrawer(false);
  };

  const addFolderHandler = () => {
    setActionType(FolderAction.Add);
    setOpenDrawer(true);
  };

  const renameFolderHandler = (folder) => {
    setActionType(FolderAction.Rename);
    setSelectedFolder(folder);
    setOpenDrawer(true);
  };

  const deleteFolderHandler = (folder) => {
    setActionType(FolderAction.Delete);
    setSelectedFolder(folder);
    setOpenDrawer(false);
  };

  const addAssetHandler = () => {
    setActionType(AssetAction.Create);
    setOpenDrawer(true);
  };

  const assetFilesHandler = (asset) => {
    setActionType(AssetAction.Files);
    setOpenDrawer(true);
    setSelectedAsset(asset);
  };

  const editAssetHandler = (asset) => {
    setActionType(AssetAction.Edit);
    setOpenDrawer(true);
    setSelectedAsset(asset);
  };

  const setDrawerHandler = (open) => {
    setOpenDrawer(open);
  };

  return (
    <ExplorerContext.Provider
      value={{
        openDrawer: openDrawer,
        actionType: actionType,
        selectedFolder: selectedFolder,
        selectedAsset: selectedAsset,
        assetType: AssetType,
        folderAction: FolderAction,
        assetAction: AssetAction,
        closeDrawer: closeDrawerHandler,
        addFolder: addFolderHandler,
        renameFolder: renameFolderHandler,
        deleteFolder: deleteFolderHandler,
        addAsset: addAssetHandler,
        editAsset: editAssetHandler,
        assetFiles: assetFilesHandler,
        setDrawer: setDrawerHandler,
      }}
    >
      {props.children}
    </ExplorerContext.Provider>
  );
};
