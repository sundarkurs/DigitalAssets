import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Typography } from "@material-ui/core";
import AppSpeedMenu from "../../UI/AppSpeedMenu";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import WallpaperIcon from "@material-ui/icons/Wallpaper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const ImageFiles = (props) => {
  const classes = useStyles();
  const { files } = props;

  const defaultHandler = (file) => {};

  const deleteHandler = (file) => {};

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        {files.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src="https://source.unsplash.com/random"
              alt={item.title}
            ></img>
            <AppSpeedMenu
              actions={[
                {
                  icon: <WallpaperIcon onClick={() => defaultHandler(item)} />,
                  name: "Default",
                },
                {
                  icon: <DeleteIcon onClick={() => deleteHandler(item)} />,
                  name: "Delete",
                },
              ]}
            ></AppSpeedMenu>
            <ImageListItemBar
              title={item.name}
              subtitle={`Version: ${item.version}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImageFiles;
