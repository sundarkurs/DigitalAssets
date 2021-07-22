import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import FoldersList from "../Folders/List/FoldersList";
import CreateFolder from "../Folders/Create/CreateFolder";
import RenameFolder from "../Folders/Rename/RenameFolder";
import DeleteFolder from "../Folders/Delete/DeleteFolder";
import AppDetailDrawer from "../UI/AppDetailDrawer";
import { makeStyles } from "@material-ui/core/styles";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  drawer: {
    width: "400px",
  },
}));

const FileExplorer = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const styles = useStyles();
  const history = useHistory();
  const params = useParams();

  var isOpenDrawer = false;
  const { folderInfo, currentFolderId, setCurrentFolderId, refreshFolders } =
    props;

  const onOpenFolderHandler = (folder) => {
    if (folder.id) {
      setCurrentFolderId(folder.id);
      history.push(`/asset-types/${params.assetTypeCode}/${folder.id}`);
    }
  };

  const onDeleteEndHandler = () => {
    explorerCtx.closeDrawer();
    refreshFolders();
  };

  if (explorerCtx.openDrawer) {
    if (
      explorerCtx.actionType === "add-folder" ||
      explorerCtx.actionType === "rename-folder"
    ) {
      isOpenDrawer = true;
    }
  }

  var drawerContent = "";
  if (isOpenDrawer) {
    if (explorerCtx.actionType === "add-folder") {
      drawerContent = (
        <CreateFolder
          parentId={folderInfo.folder.id}
          assetType={folderInfo.folder.assetType}
          refreshFolders={refreshFolders}
        ></CreateFolder>
      );
    } else if (explorerCtx.actionType === "rename-folder") {
      drawerContent = (
        <RenameFolder
          folder={explorerCtx.selectedFolder}
          assetType={folderInfo.folder.assetType}
          refreshFolders={refreshFolders}
        ></RenameFolder>
      );
    }
  }

  return (
    <>
      <FoldersList
        parent={folderInfo.parent}
        childrens={folderInfo.childrens}
        onOpenFolder={onOpenFolderHandler}
      ></FoldersList>

      <AppDetailDrawer
        id="file"
        drawerClass={styles.drawer}
        show={isOpenDrawer}
        onClose={() => explorerCtx.setDrawer(false)}
      >
        {drawerContent}
      </AppDetailDrawer>

      {explorerCtx.actionType === "delete-folder" && (
        <DeleteFolder
          folder={explorerCtx.selectedFolder}
          onDeleteEnd={onDeleteEndHandler}
        />
      )}
    </>
  );
};

export default FileExplorer;
