import React from "react";

const AppContext = React.createContext({
  isDarkTheme: true,
  onToggleTheme: () => {},
  pageTitle: "",
  onTitleChange: (title) => {},
  assetTypes: [],
  assetTypesLoaded: false,
  resetAssetTypes: () => {},
  folders: [],
});

export default AppContext;
