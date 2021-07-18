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
import { useHistory, useLocation } from "react-router-dom";

const AssetExplorer = (props) => {
  const history = useHistory();
  const params = useParams();
  const [currentFolder, setCurrentFolder] = useState(params.folderId);

  const [folderInfo, setFoderInfo] = useState({
    folder: null,
    parent: null,
    childrens: [],
  });
  const [assets, setAssets] = useState([]);

  console.log(params);
  console.log(currentFolder);

  useEffect(() => {
    getFolderDetails(currentFolder);
    getAssets(currentFolder);
  }, [currentFolder]);

  const getAssets = (id) => {
    axios
      .get(`${params.assetTypeCode}/folder/${id}`)
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
        setFoderInfo(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFolderOpenHandler = (folder) => {
    if (folder.id) {
      setCurrentFolder(folder.id);
      history.push(`/asset-types/${params.assetTypeCode}/${folder.id}`);
    }
  };

  return (
    <PageSettings title="Asset Explorer">
      <AppSection>
        <FoldersList
          parent={folderInfo.parent}
          childrens={folderInfo.childrens}
          onFolderOpen={onFolderOpenHandler}
        ></FoldersList>
        <div style={{ paddingTop: 50 }}></div>
        <AssetsList assets={assets}></AssetsList>
      </AppSection>
    </PageSettings>
  );
};

export default AssetExplorer;
