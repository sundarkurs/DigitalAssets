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

const AssetCard = (props) => {
  const classes = useStyles();

  const { asset } = props;

  const getAvatarText = (name) => {
    var matches = name.match(/\b(\w)/g);
    var acronym = matches.join("");
    return acronym;
  };

  return (
    <Card onClick={() => props.onAssetClick(asset)} elevation={10}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={asset.name}
          height="200"
          image={`${window.location.origin}/images/asset-type-images/service-document.jpg`}
          title={asset.name}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="h5">
            {asset.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {asset.updatedBy}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AssetCard;
