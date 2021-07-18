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

  useEffect(() => {
    getFolderDetails(currentFolder);
    getAssets(currentFolder);
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

  return (
    <PageSettings title="Asset Explorer">
      <AppSection>
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
