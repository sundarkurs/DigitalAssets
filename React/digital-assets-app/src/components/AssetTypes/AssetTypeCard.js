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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function AssetTypeCard(props) {
  const classes = useStyles();

  console.log(window.location.origin);

  const getAvatarText = (name) => {
    var matches = name.match(/\b(\w)/g);
    var acronym = matches.join("");
    return acronym;
  };

  return (
    <Card onClick={() => props.onAssetTypeClick(props.assetType)} elevation={10}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {getAvatarText(props.assetType.name)}
            </Avatar>
          }
          title={
            <Typography variant="h5" color="textSecondary" component="h2">
              {props.assetType.name}
            </Typography>
          }
          subheader={props.assetType.code}
        />

        <CardMedia
          component="img"
          alt={props.assetType.name}
          height="140"
          image={`${window.location.origin}${props.assetType.imageUrl}`}
          title={props.assetType.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.assetType.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
