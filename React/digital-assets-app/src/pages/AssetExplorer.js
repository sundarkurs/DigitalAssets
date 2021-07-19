import React, { useEffect, useState } from "react";
import BreadcrumbMenu from "../components/Explorer/BreadcrumbMenu";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import Divider from "@material-ui/core/Divider";
import { useParams } from "react-router";
import AssetsList from "../components/Explorer/Assets/AssetsList";
import FoldersList from "../components/Explorer/Folders/List/FoldersList";
import classes from "./AssetExplorer.module.css";
import axios from "../store/DbContext/assets-db-context";
import { useHistory, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import CreateFolder from "../components/Explorer/Folders/Create/CreateFolder";
import RenameFolder from "../components/Explorer/Folders/Rename/RenameFolder";
import DeleteFolder from "../components/Explorer/Folders/Delete/DeleteFolder";

const AssetExplorer = (props) => {
  const history = useHistory();
  const params = useParams();

  const [panelOpen, setPanelOpen] = useState(false);
  const [mode, setMode] = useState("");

  const [currentFolderId, setCurrentFolderId] = useState(params.folderId);
  const [folderInfo, setFoderInfo] = useState({
    folder: null,
    parent: null,
    childrens: [],
  });
  const [assets, setAssets] = useState([]);

  const [actionFolder, setActionFolder] = useState(null);

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

  const closeDetailsPanelHandler = () => {
    setMode("");
    setPanelOpen(false);
  };

  const onOpenFolderHandler = (folder) => {
    if (folder.id) {
      setCurrentFolderId(folder.id);
      history.push(`/asset-types/${params.assetTypeCode}/${folder.id}`);
    }
  };

  const onAddFolderHandler = (folder) => {
    setPanelOpen(true);
    setMode("add-folder");
  };

  const onRenameFolderHandler = (folder) => {
    setPanelOpen(true);
    setActionFolder(folder);
    setMode("rename-folder");
  };
  const onDeleteFolderHandler = (folder) => {
    setPanelOpen(false);
    setActionFolder(folder);
    setMode("delete-folder");
  };

  const onDeleteEndHandler = () => {
    setMode("");
    setPanelOpen(false);
    refreshFoldersHandler();
  };

  const refreshFoldersHandler = () => {
    getFolderDetails(currentFolderId);
  };

  const refreshAssetsHandler = () => {
    getAssets(currentFolderId);
  };

  return (
    <PageSettings title={`Folder Explorer`}>
      <Box display="flex">
        <Box className={panelOpen ? classes.lessWidth : classes.fullWidth}>
          <AppSection>
            <FoldersList
              parent={folderInfo.parent}
              childrens={folderInfo.childrens}
              onOpenFolder={onOpenFolderHandler}
              onAddFolder={onAddFolderHandler}
              onRenameFolder={onRenameFolderHandler}
              onDeleteFolder={onDeleteFolderHandler}
            ></FoldersList>
            <div style={{ paddingTop: 50 }}></div>
            <AssetsList assets={assets}></AssetsList>
          </AppSection>
        </Box>
        {panelOpen && (
          <Box className={classes.addOnPanel}>
            <AppSection>
              {mode === "add-folder" && (
                <CreateFolder
                  parentId={folderInfo.folder.id}
                  assetType={folderInfo.folder.assetType}
                  closeDetailsPanel={closeDetailsPanelHandler}
                  refreshFolders={refreshFoldersHandler}
                ></CreateFolder>
              )}
              {mode === "rename-folder" && (
                <RenameFolder
                  folder={actionFolder}
                  parentId={folderInfo.folder.id}
                  assetType={folderInfo.folder.assetType}
                  closeDetailsPanel={closeDetailsPanelHandler}
                  refreshFolders={refreshFoldersHandler}
                ></RenameFolder>
              )}
            </AppSection>
          </Box>
        )}
      </Box>
      {mode === "delete-folder" && (
        <DeleteFolder folder={actionFolder} onDeleteEnd={onDeleteEndHandler} />
      )}
    </PageSettings>
  );
};

export default AssetExplorer;
