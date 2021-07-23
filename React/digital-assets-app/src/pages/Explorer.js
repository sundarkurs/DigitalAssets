import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Divider from "@material-ui/core/Divider";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import axios from "../store/DbContext/assets-db-context";
import { makeStyles } from "@material-ui/core/styles";
import ExplorerActions from "../components/Explorer/ExplorerActions";
import FolderExplorer from "../components/Explorer/FolderExplorer";
import AssetExplorer from "../components/Explorer/AssetExplorer";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  drawer: {
    width: "400px",
  },
}));

const Explorer = () => {
  const styles = useStyles();
  const params = useParams();

  const [currentFolderId, setCurrentFolderId] = useState(params.folderId);
  const [folderInfo, setFoderInfo] = useState({
    folder: null,
    parent: null,
    childrens: [],
  });
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getFolderDetails(currentFolderId);
    getAssets(currentFolderId);
  }, [currentFolderId]);

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

  const refreshAssetsHandler = () => {
    getAssets(currentFolderId);
  };

  const refreshFoldersHandler = () => {
    getFolderDetails(currentFolderId);
  };

  const setCurrentFolderIdHandler = (folderId) => {
    setCurrentFolderId(folderId);
  };

  return (
    <PageSettings title={`${params.assetTypeCode} Explorer`}>
      <AppSection>
        <ExplorerActions></ExplorerActions>

        <Divider className={styles.divider} />

        <FolderExplorer
          folderInfo={folderInfo}
          currentFolderId={currentFolderId}
          setCurrentFolderId={setCurrentFolderIdHandler}
          refreshFolders={refreshFoldersHandler}
          drawerClass={styles.drawer}
        ></FolderExplorer>

        <div style={{ paddingTop: 50 }}></div>

        <AssetExplorer
          folderInfo={folderInfo}
          currentFolderId={currentFolderId}
          assets={assets}
          refreshAssets={refreshAssetsHandler}
          drawerClass={styles.drawer}
        ></AssetExplorer>
      </AppSection>
    </PageSettings>
  );
};

export default Explorer;
