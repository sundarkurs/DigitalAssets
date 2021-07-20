import React, { useEffect, useState } from "react";
import ExplorerContext from "./explorer-context";

export const ExplorerContextProvider = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedFolder, setSelectedFolder] = useState({});

  const closeDrawerHandler = () => {
    setActionType("");
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
    setActionType("add-asset");
    setOpenDrawer(true);
  };

  return (
    <ExplorerContext.Provider
      value={{
        openDrawer: openDrawer,
        actionType: actionType,
        selectedFolder: selectedFolder,
        closeDrawer: closeDrawerHandler,
        addFolder: addFolderHandler,
        renameFolder: renameFolderHandler,
        deleteFolder: deleteFolderHandler,
        addAsset: addAssetHandler,
      }}
    >
      {props.children}
    </ExplorerContext.Provider>
  );
};
