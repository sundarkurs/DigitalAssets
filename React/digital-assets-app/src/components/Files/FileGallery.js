import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import AppSpeedMenu from "../UI/AppSpeedMenu";
import DeleteIcon from "@material-ui/icons/Delete";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: "100%",
    height: 500,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const ImageFiles = (props) => {
  const classes = useStyles();
  const { files, assetTypeCode } = props;

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        {files.map((file) => (
          <ImageListItem key={file.id}>
            <img
              src={`http://digitalassets.com/api/v1/${assetTypeCode}/${file.assetId}/file/${file.id}`}
              alt={file.title}
            ></img>
            <AppSpeedMenu
              actions={[
                {
                  icon: (
                    <WallpaperIcon onClick={() => props.onDefaultSet(file)} />
                  ),
                  name: "Default",
                },
                {
                  icon: <DeleteIcon onClick={() => props.onFileDelete(file)} />,
                  name: "Delete",
                },
              ]}
            ></AppSpeedMenu>

            <ImageListItemBar
              title={file.name}
              subtitle={`Version: ${file.version}`}
              actionIcon={
                file.isDefault && (
                  <IconButton>
                    <CenterFocusStrongIcon />
                  </IconButton>
                )
              }
            ></ImageListItemBar>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImageFiles;
