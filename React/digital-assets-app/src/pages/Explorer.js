import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import AssetsList from "../components/Assets/List/AssetsList";
import FoldersList from "../components/Folders/List/FoldersList";
import CreateFolder from "../components/Folders/Create/CreateFolder";
import RenameFolder from "../components/Folders/Rename/RenameFolder";
import DeleteFolder from "../components/Folders/Delete/DeleteFolder";
import BreadcrumbMenu from "../components/Explorer/BreadcrumbMenu";
import axios from "../store/DbContext/assets-db-context";
import AppDetailDrawer from "../components/UI/AppDetailDrawer";
import { makeStyles } from "@material-ui/core/styles";
import ExplorerActions from "../components/Explorer/ExplorerActions";
import CreateAssetImage from "../components/Assets/Create/CreateAssetImage";
import CreateAssetProductImage from "../components/Assets/Create/CreateAssetProductImage";
import ExplorerContext from "../store/ExplorerContext/explorer-context";
import FileExplorer from "../components/Explorer/FileExplorer";
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

const Explorer = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const styles = useStyles();
  const history = useHistory();
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

        <FileExplorer
          folderInfo={folderInfo}
          currentFolderId={currentFolderId}
          setCurrentFolderId={setCurrentFolderIdHandler}
          refreshFolders={refreshFoldersHandler}
        ></FileExplorer>

        <div style={{ paddingTop: 50 }}></div>
        <AssetExplorer
          folderInfo={folderInfo}
          currentFolderId={currentFolderId}
          assets={assets}
          refreshAssets={refreshAssetsHandler}
        ></AssetExplorer>
        
      </AppSection>
    </PageSettings>
  );
};

export default Explorer;
