import React, { useContext, useState } from "react";
import BreadcrumbMenu from "../components/Explorer/BreadcrumbMenu";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import Divider from "@material-ui/core/Divider";
import { useParams } from "react-router";
import AppContext from "../store/AppContext/app-context";
import { productImageAssets } from "../common/Data/MockData";
import AssetsList from "../components/Explorer/Assets/AssetsList";
import FoldersList from "../components/Explorer/Folders/FoldersList";
import styles from "./AssetExplorer.module.css";

const AssetExplorer = (props) => {
  const appCtx = useContext(AppContext);
  const params = useParams();
  const [parentFolderId, setParentFolderId] = useState(null);

  const [breadcrumbItems, setBreadcrumbItems] = useState(appCtx.folders);

  console.log(params.assetTypeCode);

  const onMenuClickHandler = () => {
    const updatedBreadcrumbItems = breadcrumbItems.filter(
      (item) => item.id < 2
    );
    setBreadcrumbItems(updatedBreadcrumbItems);
  };

  const getFolders = () => {

  };

  return (
    <PageSettings title="Asset Explorer">
      <AppSection>
        <BreadcrumbMenu
          menuItems={breadcrumbItems}
          onMenuClick={onMenuClickHandler}
        />
        <Divider className={styles.divider}></Divider>
        <FoldersList folders={appCtx.folders}></FoldersList>
        <div style={{ paddingTop: 50 }}></div>
        <AssetsList assets={productImageAssets}></AssetsList>
      </AppSection>
    </PageSettings>
  );
};

export default AssetExplorer;
