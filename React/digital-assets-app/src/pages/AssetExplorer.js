import React, { useContext, useEffect, useState } from "react";
import BreadcrumbMenu from "../components/Explorer/BreadcrumbMenu";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import Divider from "@material-ui/core/Divider";
import { useParams } from "react-router";
import AppContext from "../store/AppContext/app-context";
import AssetsList from "../components/Explorer/Assets/AssetsList";
import FoldersList from "../components/Explorer/Folders/FoldersList";
import styles from "./AssetExplorer.module.css";
import axios from "../store/DbContext/assets-db-context";
import { Typography } from "@material-ui/core";

const rootFolder = {
  id: "11DDA5FB-5B63-44FC-8165-2969882DC7E7",
  name: "IMAGE",
  parentId: null,
  assetType: 1,
  updatedOn: "2021-07-16T11:15:37.12",
  updatedBy: "Sundar Urs",
};

const AssetExplorer = (props) => {
  const appCtx = useContext(AppContext);
  const params = useParams();

  const [currentFolder, setCurrentFolder] = useState(rootFolder);

  const [parent, setParent] = useState(null);
  const [childrens, setChildrens] = useState([]);

  const [breadcrumbItems, setBreadcrumbItems] = useState(appCtx.folders);

  useEffect(() => {
    getParent(currentFolder.id);
    getChildrens(currentFolder.id);
  }, [currentFolder]);

  const getParent = (id) => {
    axios
      .get(`Folder/${currentFolder.id}/parent`)
      .then((response) => {
        setParent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getChildrens = (id) => {
    axios
      .get(`Folder/${currentFolder.id}/childrens`)
      .then((response) => {
        setChildrens(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFolderOpenHandler = (folder) => {
    console.log(`current folder ${currentFolder.name}`);
    setCurrentFolder(folder);
  };

  // TODO
  const onMenuClickHandler = () => {
    const updatedBreadcrumbItems = breadcrumbItems.filter(
      (item) => item.id < 2
    );
    setBreadcrumbItems(updatedBreadcrumbItems);
  };

  return (
    <PageSettings title="Asset Explorer">
      <AppSection>
        <BreadcrumbMenu
          menuItems={breadcrumbItems}
          onMenuClick={onMenuClickHandler}
        />
        <Divider className={styles.divider}></Divider>
        <FoldersList
          parent={parent}
          childrens={childrens}
          onFolderOpen={onFolderOpenHandler}
        ></FoldersList>
        <div style={{ paddingTop: 50 }}></div>
        {/* <AssetsList assets={productImageAssets}></AssetsList> */}
      </AppSection>
    </PageSettings>
  );
};

export default AssetExplorer;
