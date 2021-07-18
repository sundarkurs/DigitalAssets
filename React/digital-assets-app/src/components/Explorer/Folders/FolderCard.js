import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import FolderIcon from "@material-ui/icons/Folder";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FolderImage from "../../../media/folder-image.png";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import moment from "moment";

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

  const { folder, actual, back } = props;

  const subHeader = () => {
    if (actual) {
      return moment(folder.updatedOn).format('MMMM DD, YYYY - HH:MM');
    } else if (props.new) {
      return "Add new folder";
    } else if (back) {
      return `Go to folder ${folder.name}`;
    }
  };

  return (
    <Card onClick={props.onFolderOpen} elevation={10}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {actual && <FolderIcon></FolderIcon>}
              {back && <ArrowBackIcon></ArrowBackIcon>}
              {props.new && <CreateNewFolderIcon></CreateNewFolderIcon>}
            </Avatar>
          }
          title={
            <Typography variant="h5" color="textSecondary" component="h2">
              {folder.name}
            </Typography>
          }
          subheader={subHeader()}
        />
        <CardContent className={classes.center}>
          <img
            src={FolderImage}
            alt="Asset folder"
            className={classes.folderImg}
          ></img>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FolderCard;
