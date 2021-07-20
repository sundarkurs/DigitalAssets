import React from "react";

const ExplorerContext = React.createContext({
  openDrawer: false,
  setDrawer: (open) => {},
  actionType: "",
  setActionType: (action) => {},
  selectedFolder: {},
  setSelectedFolder: (folder) => {},
});

export default ExplorerContext;
