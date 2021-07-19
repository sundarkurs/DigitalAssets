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

const AssetExplorer = (props) => {
  const history = useHistory();
  const params = useParams();

  const [panelOpen, setPanelOpen] = useState(false);
  const [mode, setMode] = useState("");

  const [currentFolder, setCurrentFolder] = useState(params.folderId);
  const [folderInfo, setFoderInfo] = useState({
    folder: null,
    parent: null,
    childrens: [],
  });
  const [assets, setAssets] = useState([]);

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

  const closeDetailsPanelHandler = () => {
    setMode("");
    setPanelOpen(false);
  };

  const onOpenFolderHandler = (folder) => {
    if (folder.id) {
      setCurrentFolder(folder.id);
      history.push(`/asset-types/${params.assetTypeCode}/${folder.id}`);
    }
  };

  const onAddFolderHandler = (folder) => {
    setPanelOpen(true);
    setMode("edit-folder");
  };

  const onEditFolderHandler = (folder) => {
    setPanelOpen(true);
    setMode("edit-folder");
  };
  const onDeleteFolderHandler = (folder) => {};

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
              onEditFolder={onEditFolderHandler}
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
                ></CreateFolder>
              )}
              {mode === "edit-folder" && (
                <CreateFolder
                  parentId={folderInfo.folder.id}
                  assetType={folderInfo.folder.assetType}
                  closeDetailsPanel={closeDetailsPanelHandler}
                ></CreateFolder>
              )}
            </AppSection>
          </Box>
        )}
      </Box>
    </PageSettings>
  );
};

export default AssetExplorer;
