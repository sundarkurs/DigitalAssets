import React, { useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import FoldersList from "../Folders/List/FoldersList";
import CreateFolder from "../Folders/Create/CreateFolder";
import RenameFolder from "../Folders/Rename/RenameFolder";
import DeleteFolder from "../Folders/Delete/DeleteFolder";
import AppDetailDrawer from "../UI/AppDetailDrawer";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";

const FolderExplorer = (props) => {
  const exCtx = useContext(ExplorerContext);
  const history = useHistory();

  const {
    drawerClass,
    folderInfo,
    currentFolderId,
    setCurrentFolderId,
    refreshFolders,
    assetTypeCode,
  } = props;

  const onOpenFolderHandler = (folder) => {
    if (folder.id) {
      setCurrentFolderId(folder.id);
      history.push(`/asset-types/${assetTypeCode}/${folder.id}`);
    }
  };

  const onDeleteEndHandler = () => {
    exCtx.closeDrawer();
    refreshFolders();
  };

  var drawerContent = "";
  let drawerTitle = "";
  if (exCtx.openDrawer) {
    if (exCtx.actionType === exCtx.folderAction.Add) {
      drawerTitle = "Add new folder";
      drawerContent = (
        <CreateFolder
          parentId={folderInfo.folder.id}
          assetType={folderInfo.folder.assetType}
          refreshFolders={refreshFolders}
        ></CreateFolder>
      );
    } else if (exCtx.actionType === exCtx.folderAction.Rename) {
      drawerTitle = "Rename folder";
      drawerContent = (
        <RenameFolder
          folder={exCtx.selectedFolder}
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
        show={exCtx.openDrawer && drawerContent !== ""}
        onClose={() => exCtx.setDrawer(false)}
        title={drawerTitle}
      >
        {drawerContent}
      </AppDetailDrawer>

      {exCtx.actionType === exCtx.folderAction.Delete && (
        <DeleteFolder
          folder={exCtx.selectedFolder}
          onDeleteEnd={onDeleteEndHandler}
        />
      )}
    </>
  );
};

export default FolderExplorer;
