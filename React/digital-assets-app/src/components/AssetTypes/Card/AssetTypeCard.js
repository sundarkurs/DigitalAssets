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
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import classes from "./AssetTypeCard.module.css";
import { getAvatarText } from "../../../common/Functions/StringFormats";

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
  const styles = useStyles();
  const { assetType } = props;
  return (
    <Card elevation={10}>
      <CardActionArea onClick={() => props.onExplore(assetType)}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={styles.avatar}>
              {getAvatarText(assetType.name)}
            </Avatar>
          }
          title={
            <Typography variant="h5" color="textSecondary" component="h2">
              {assetType.name}
            </Typography>
          }
          subheader={assetType.code}
        />

        <CardMedia
          component="img"
          alt={assetType.name}
          height="140"
          image={`${window.location.origin}${assetType.imageUrl}`}
          title={assetType.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {assetType.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing className={classes.actions}>
        <Button size="small" color="secondary" onClick={props.onDisable}>
          {assetType.disabled ? "Enable" : "Disable"}
        </Button>
        {!assetType.disabled && (
          <Button size="small" color="default" onClick={props.onEdit}>
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
