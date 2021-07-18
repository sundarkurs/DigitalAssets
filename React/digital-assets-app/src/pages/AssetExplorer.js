import React, { useEffect, useState } from "react";
import BreadcrumbMenu from "../components/Explorer/BreadcrumbMenu";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import Divider from "@material-ui/core/Divider";
import { useParams } from "react-router";
import AssetsList from "../components/Explorer/Assets/AssetsList";
import FoldersList from "../components/Explorer/Folders/FoldersList";
import styles from "./AssetExplorer.module.css";
import axios from "../store/DbContext/assets-db-context";

const AssetExplorer = (props) => {
  const params = useParams();
  const [assetTypeCode, setAssetTypeCode] = useState(params.assetTypeCode);
  const [currentFolder, setCurrentFolder] = useState(params.folderId);

  const [folder, setFolder] = useState(null);
  const [folderParent, setFolderParent] = useState(null);
  const [folderChildrens, setFolderChildrens] = useState([]);

  const [assets, setAssets] = useState([]);

  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    getFolderDetails(currentFolder);
    getAssets(currentFolder);

    var bread = [];
    if (folderParent) {
      bread.push(folderParent);
    }
    if (folder) {
      bread.push(folder);
    }
    if (folderChildrens) {
      bread.push(folderChildrens);
    }

    setBreadcrumbItems(bread);
  }, [currentFolder]);

  const getAssets = (id) => {
    axios
      .get(`${assetTypeCode}/folder/${id}`)
      .then((response) => {
        setAssets(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFolderDetails = (id) => {
    axios
      .get(`Folder/${id}`)
      .then((response) => {
        setFolder(response.data.data.folder);
        setFolderParent(response.data.data.parent);
        setFolderChildrens(response.data.data.childrens);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFolderOpenHandler = (folder) => {
    setCurrentFolder(folder.id);
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
          parent={folderParent}
          childrens={folderChildrens}
          onFolderOpen={onFolderOpenHandler}
        ></FoldersList>
        <div style={{ paddingTop: 50 }}></div>
        <AssetsList assets={assets}></AssetsList>
      </AppSection>
    </PageSettings>
  );
};

export default AssetExplorer;
