import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AppSpeedMenu from "../../UI/AppSpeedMenu";

const AssetCard = (props) => {
  const { asset, actions } = props;

  return (
    <Card elevation={10}>
      <CardActionArea>
        {actions && <AppSpeedMenu actions={actions}></AppSpeedMenu>}
        <CardMedia
          component="img"
          alt={asset.name}
          height="200"
          // image={`${window.location.origin}/images/asset-type-images/service-document.jpg`}
          image={`http://digitalassets.com/api/v1/${props.assetTypeCode}/${asset.id}/file/`}
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
