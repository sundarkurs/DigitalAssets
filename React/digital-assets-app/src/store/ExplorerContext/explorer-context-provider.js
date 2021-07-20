import React, { useEffect, useState } from "react";
import ExplorerContext from "./explorer-context";

export const ExplorerContextProvider = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedFolder, setSelectedFolder] = useState({});

  const setDrawerHandler = (open) => {
    setOpenDrawer(open);
  };

  const setActionTypeHandler = (action) => {
    setActionType(action);
  };

  const setSelectedFolderHandler = (folder) => {
    setSelectedFolder(folder);
  };

  return (
    <ExplorerContext.Provider
      value={{
        openDrawer: openDrawer,
        setDrawer: setDrawerHandler,
        actionType: actionType,
        setActionType: setActionTypeHandler,
        selectedFolder: selectedFolder,
        setSelectedFolder: setSelectedFolderHandler,
      }}
    >
      {props.children}
    </ExplorerContext.Provider>
  );
};
