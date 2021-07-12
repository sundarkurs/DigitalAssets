import React, { useEffect, useState } from "react";
import AppContext from "./app-context";
import { folders } from "../../common/Data/MockData";
import axios from "../DbContext/assets-db-context";

export const AppContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [assetTypes, setAssetTypes] = useState([]);
  const [assetTypesLoaded, setAssetTypesLoaded] = useState(false);

  const toggleThemeHandler = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  const onTitleChangeHandler = (title) => {
    setPageTitle(title);
  };

  const resetAssetTypesHandler = (title) => {
    setAssetTypesLoaded(false);
  };

  useEffect(() => {
    if (!assetTypesLoaded) {
      console.log("load asset types");
      axios
        .get("AssetType")
        .then((response) => {
          setAssetTypes(response.data);
          setAssetTypesLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [assetTypesLoaded]);

  return (
    <AppContext.Provider
      value={{
        isDarkTheme: isDarkTheme,
        onToggleTheme: toggleThemeHandler,
        pageTitle: pageTitle,
        onTitleChange: onTitleChangeHandler,
        assetTypes: assetTypes,
        assetTypesLoaded: assetTypesLoaded,
        resetAssetTypes: resetAssetTypesHandler,
        folders: folders,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
