import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import FolderIcon from "@material-ui/icons/Folder";
import FolderImage from "../../media/folder-image.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  folderImg: {
    maxWidth: 200,
    height: 150,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  center: {
    textAlign: "center",
  },
}));

const FolderCard = (props) => {
  const classes = useStyles();

  const { folder } = props;

  const getAvatarText = (name) => {
    var matches = name.match(/\b(\w)/g);
    var acronym = matches.join("");
    return acronym;
  };

  return (
    <Card onClick={() => props.onFolderClick(folder)} elevation={10}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <FolderIcon></FolderIcon>
            </Avatar>
          }
          title={
            <Typography variant="h5" color="textSecondary" component="h2">
              {folder.name}
            </Typography>
          }
          subheader={folder.updatedOn.toLocaleDateString()}
        />
        <CardContent className={classes.center}>
          <img
            src={FolderImage}
            alt="Burger Builder"
            className={classes.folderImg}
          ></img>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FolderCard;
