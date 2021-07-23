import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import FoldersList from "../Folders/List/FoldersList";
import CreateFolder from "../Folders/Create/CreateFolder";
import RenameFolder from "../Folders/Rename/RenameFolder";
import DeleteFolder from "../Folders/Delete/DeleteFolder";
import AppDetailDrawer from "../UI/AppDetailDrawer";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";

const FolderExplorer = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const history = useHistory();
  const params = useParams();

  const {
    drawerClass,
    folderInfo,
    currentFolderId,
    setCurrentFolderId,
    refreshFolders,
  } = props;

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

  var drawerContent = "";
  if (explorerCtx.openDrawer) {
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
        drawerClass={drawerClass}
        show={explorerCtx.openDrawer && drawerContent !== ""}
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

export default FolderExplorer;
