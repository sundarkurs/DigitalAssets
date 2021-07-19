import { Fragment } from "react";
import FolderCard from "../Card/FolderCard";
import Grid from "@material-ui/core/Grid";
import uuid from "react-uuid";

const FoldersList = (props) => {
  const { childrens, parent } = props;

  var listItems = [];

  var newFolder = { id: uuid(), name: "New folder", updatedOn: Date.now() };
  if (newFolder) {
    listItems.push(
      <Grid item xs={12} sm={6} md={4} lg={3} key={newFolder.id}>
        <FolderCard
          isNew={true}
          folder={newFolder}
          onFolderClick={props.onAddFolder}
        ></FolderCard>
      </Grid>
    );
  }

  if (parent) {
    listItems.push(
      <Grid item xs={12} sm={6} md={4} lg={3} key={parent.id}>
        <FolderCard
          isBack={true}
          folder={parent}
          onFolderClick={() => props.onOpenFolder(parent)}
        ></FolderCard>
      </Grid>
    );
  }

  if (childrens && childrens.length > 0) {
    listItems.push(
      childrens.map((folder) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={folder.id}>
            <FolderCard
              isFolder={true}
              folder={folder}
              onFolderClick={() => props.onOpenFolder(folder)}
              onRenameFolder={() => props.onRenameFolder(folder)}
              onDeleteFolder={() => props.onDeleteFolder(folder)}
            ></FolderCard>
          </Grid>
        );
      })
    );
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        {listItems}
      </Grid>
    </Fragment>
  );
};

export default FoldersList;
