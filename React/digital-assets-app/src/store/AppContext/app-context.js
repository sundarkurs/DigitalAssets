import React from "react";

const AppContext = React.createContext({
  isDarkTheme: true,
  onToggleTheme: () => {},
  pageTitle: "",
  onTitleChange: (title) => {},
  assetTypes: [],
  folders: [],
});

export default AppContext;
