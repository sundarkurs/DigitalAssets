import React, { useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import FolderIcon from "@material-ui/icons/Folder";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FolderImage from "../../../media/folder-image.png";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FolderOptionsMenu from "../FolderOptionsMenu";
import useFolderCardStyles from "./folder-card-styles";
import ExplorerContext from "../../../store/ExplorerContext/explorer-context";
import Folder from "@material-ui/icons/Folder";

const FolderCard = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const classes = useFolderCardStyles();

  const { isBack, isFolder, isNew, folder, onFolderClick } = props;

  const subHeader = () => {
    if (isFolder) {
      return moment(folder.updatedOn).format("MMMM DD, YYYY - HH:MM");
    } else if (isNew) {
      return "Add new folder";
    } else if (isBack) {
      return `Go to folder ${folder.name}`;
    }
  };

  const [moreOptionsEl, setMoreOptionsEl] = useState(null);

  const onMoreOptionsClickHandler = (event) => {
    setMoreOptionsEl(event.currentTarget);
  };

  const onMoreOptionsCloseHandler = () => {
    setMoreOptionsEl(null);
  };

  const onRenameFolderHandler = () => {
    setMoreOptionsEl(null);
    explorerCtx.renameFolder(folder);
  };

  const onDeleteFolderHandler = () => {
    setMoreOptionsEl(null);
    explorerCtx.deleteFolder(folder);
  };

  return (
    <>
      <Card elevation={10}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar aria-label="folder" className={classes.avatar}>
                {isFolder && <FolderIcon></FolderIcon>}
                {isBack && <ArrowBackIcon></ArrowBackIcon>}
                {isNew && <CreateNewFolderIcon></CreateNewFolderIcon>}
              </Avatar>
            }
            action={
              isFolder && (
                <IconButton
                  aria-label="options"
                  onClick={onMoreOptionsClickHandler}
                >
                  <MoreVertIcon />
                </IconButton>
              )
            }
            title={
              <Typography variant="h5" color="textSecondary" component="h2">
                {folder.name}
              </Typography>
            }
            subheader={subHeader()}
          />
          <CardContent onClick={onFolderClick} className={classes.center}>
            <img
              src={FolderImage}
              alt="folder"
              className={classes.folderImg}
            ></img>
          </CardContent>
        </CardActionArea>
      </Card>

      <FolderOptionsMenu
        element={moreOptionsEl}
        onClose={onMoreOptionsCloseHandler}
        onRename={onRenameFolderHandler}
        onDelete={onDeleteFolderHandler}
      ></FolderOptionsMenu>
    </>
  );
};

export default FolderCard;
