import React, { useContext, useState } from "react";
import BreadcrumbMenu from "../components/Assets/BreadcrumbMenu";
import PageSettings from "./Settings/PageSettings";
import Divider from "@material-ui/core/Divider";
import { useParams } from "react-router";
import AppContext from "../store/AppContext/app-context";
import { productImageAssets } from "../common/Data/MockData";
import AssetsList from "../components/Assets/AssetsList";
import FoldersList from "../components/Assets/FoldersList";
import { CssBaseline } from "@material-ui/core";
import mClasses from "./AssetExplorer.module.css";

const AssetExplorer = (props) => {
  const appCtx = useContext(AppContext);
  const params = useParams();

  const [breadcrumbItems, setBreadcrumbItems] = useState(appCtx.folders);

  console.log(params.assetTypeCode);

  const onMenuClickHandler = () => {
    const updatedBreadcrumbItems = breadcrumbItems.filter(
      (item) => item.id < 2
    );
    setBreadcrumbItems(updatedBreadcrumbItems);
  };

  return (
    <PageSettings title="Asset Explorer">
      <BreadcrumbMenu
        menuItems={breadcrumbItems}
        onMenuClick={onMenuClickHandler}
      />
      <Divider className={mClasses.divider}></Divider>
      <FoldersList folders={appCtx.folders}></FoldersList>
      <div style={{ paddingTop: 50 }}></div>
      <AssetsList assets={productImageAssets}></AssetsList>
    </PageSettings>
  );
};

export default AssetExplorer;
