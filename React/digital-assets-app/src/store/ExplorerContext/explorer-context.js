import React from "react";

const ExplorerContext = React.createContext({
  openDrawer: false,
  actionType: "",
  selectedFolder: {},
  selectedAsset: {},
  assetType: {},
  folderAction: {},
  assetAction: {},
  closeDrawer: () => {},
  addFolder: () => {},
  renameFolder: (folder) => {},
  deleteFolder: (folder) => {},
  addAsset: () => {},
  editAsset: (asset) => {},
  deleteAsset: (folder) => {},
  assetFiles: (asset) => {},
  addFile: (asset) => {},
  setDrawer: (open) => {},
});

export default ExplorerContext;
