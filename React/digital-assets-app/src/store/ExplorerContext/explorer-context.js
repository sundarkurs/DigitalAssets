import React from "react";

const ExplorerContext = React.createContext({
  openDrawer: false,
  actionType: "",
  selectedFolder: {},
  assetType: {},
  closeDrawer: () => {},
  addFolder: () => {},
  renameFolder: (folder) => {},
  deleteFolder: (folder) => {},
  addAsset: () => {},
  setDrawer: (open) => {},
});

export default ExplorerContext;
