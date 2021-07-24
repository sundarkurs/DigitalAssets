import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
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

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        {files.map((item) => (
          <ImageListItem key={item.img}>
            <img src="https://source.unsplash.com/random" alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<Typography>{item.name}</Typography>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${item.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImageFiles;
