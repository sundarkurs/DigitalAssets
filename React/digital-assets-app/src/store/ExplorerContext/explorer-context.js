import React from "react";

const ExplorerContext = React.createContext({
  openDrawer: false,
  actionType: "",
  selectedFolder: {},
  assetType: {},
  folderAction: {},
  assetAction: {},
  closeDrawer: () => {},
  addFolder: () => {},
  renameFolder: (folder) => {},
  deleteFolder: (folder) => {},
  addAsset: () => {},
  setDrawer: (open) => {},
});

export default ExplorerContext;
