import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import FoldersList from "../../Folders/List/FoldersList";
import CreateFolder from "../../Folders/Create/CreateFolder";
import RenameFolder from "../../Folders/Rename/RenameFolder";
import DeleteFolder from "../../Folders/Delete/DeleteFolder";
import axios from "../../../store/DbContext/assets-db-context";
import AppDetailDrawer from "../../UI/AppDetailDrawer";
import { makeStyles } from "@material-ui/core/styles";
import ExplorerActions from "../../Explorer/ExplorerActions";
import { Fragment } from "react";

const AssetType = {
  ProductImage: 1,
  Image: 2,
};

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  drawer: {
    width: "400px",
  },
}));

const FolderExplorer = (props) => {
  const styles = useStyles();
  const history = useHistory();
  const params = useParams();

  const [showDrawer, setShowDrawer] = useState(false);
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
    setShowDrawer(false);
  };

  const onOpenFolderHandler = (folder) => {
    if (folder.id) {
      setCurrentFolderId(folder.id);
      history.push(`/asset-types/${params.assetTypeCode}/${folder.id}`);
    }
  };

  const onAddFolderHandler = (folder) => {
    setShowDrawer(true);
    setMode("add-folder");
  };

  const onRenameFolderHandler = (folder) => {
    setShowDrawer(true);
    setActionFolder(folder);
    setMode("rename-folder");
  };

  const onDeleteFolderHandler = (folder) => {
    setShowDrawer(false);
    setActionFolder(folder);
    setMode("delete-folder");
  };

  const onDeleteEndHandler = () => {
    setMode("");
    setShowDrawer(false);
    refreshFoldersHandler();
  };

  const refreshFoldersHandler = () => {
    getFolderDetails(currentFolderId);
  };

  const toggleDrawer = (open) => {
    setShowDrawer(open);
  };

  var drawerContent = "";
  if (showDrawer) {
    if (mode === "add-folder") {
      drawerContent = (
        <CreateFolder
          parentId={folderInfo.folder.id}
          assetType={folderInfo.folder.assetType}
          closeDetailsPanel={closeDetailsPanelHandler}
          refreshFolders={refreshFoldersHandler}
        ></CreateFolder>
      );
    } else if (mode === "rename-folder") {
      drawerContent = (
        <RenameFolder
          folder={actionFolder}
          assetType={folderInfo.folder.assetType}
          closeDetailsPanel={closeDetailsPanelHandler}
          refreshFolders={refreshFoldersHandler}
        ></RenameFolder>
      );
    }
  }

  return (
    <Fragment>
      <FoldersList
        parent={folderInfo.parent}
        childrens={folderInfo.childrens}
        onOpenFolder={onOpenFolderHandler}
        onAddFolder={onAddFolderHandler}
        onRenameFolder={onRenameFolderHandler}
        onDeleteFolder={onDeleteFolderHandler}
      ></FoldersList>
      <AppDetailDrawer
        drawerClass={styles.drawer}
        show={showDrawer}
        onClose={() => toggleDrawer(false)}
      >
        {drawerContent}
      </AppDetailDrawer>

      {mode === "delete-folder" && (
        <DeleteFolder folder={actionFolder} onDeleteEnd={onDeleteEndHandler} />
      )}
    </Fragment>
  );
};

export default FolderExplorer;
