import React, { useEffect, useState } from "react";
import ExplorerContext from "./explorer-context";

const AssetType = {
  ProductImage: 1,
  Image: 2,
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
    setActionType("add-folder");
    setOpenDrawer(true);
  };

  const renameFolderHandler = (folder) => {
    setActionType("rename-folder");
    setSelectedFolder(folder);
    setOpenDrawer(true);
  };

  const deleteFolderHandler = (folder) => {
    setActionType("delete-folder");
    setSelectedFolder(folder);
    setOpenDrawer(false);
  };

  const addAssetHandler = () => {
    console.log(1)
    setActionType("add-asset");
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
