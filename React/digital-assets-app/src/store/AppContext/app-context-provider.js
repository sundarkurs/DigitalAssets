import React, { useState } from "react";
import AppContext from "./app-context";
import { assetTypes, folders } from "../../common/Data/MockData";

export const AppContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [pageTitle, setPageTitle] = useState("Dashboard");

  const toggleThemeHandler = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  const onTitleChangeHandler = (title) => {
    setPageTitle(title);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkTheme: isDarkTheme,
        onToggleTheme: toggleThemeHandler,
        pageTitle: pageTitle,
        onTitleChange: onTitleChangeHandler,
        assetTypes: assetTypes,
        folders: folders,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
