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
  Files: "view-files",
};

export const ExplorerContextProvider = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState({});

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
    console.log(1);
    setActionType(AssetAction.Create);
    setOpenDrawer(true);
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
        assetType: AssetType,
        folderAction: FolderAction,
        assetAction: AssetAction,
        closeDrawer: closeDrawerHandler,
        addFolder: addFolderHandler,
        renameFolder: renameFolderHandler,
        deleteFolder: deleteFolderHandler,
        addAsset: addAssetHandler,
        setDrawer: setDrawerHandler,
      }}
    >
      {props.children}
    </ExplorerContext.Provider>
  );
};
