import { Fragment, useContext } from "react";
import AssetTypeCard from "./AssetTypeCard";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router";
import AppContext from "../../store/AppContext/app-context";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./AssetTypesList.module.css";
import { Typography } from "@material-ui/core";

const AssetTypesList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const appCtx = useContext(AppContext);

  const onAssetTypeClickHandler = (assetType) => {
    history.push(location.pathname + "/" + assetType.code.toLowerCase());
  };

  const listItems = appCtx.assetTypes.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={item.id}>
        <AssetTypeCard
          assetType={item}
          onClick={onAssetTypeClickHandler}
          onEdit={() => props.onEdit(item)}
          onDelete={() => props.onDelete(item)}
        ></AssetTypeCard>
      </Grid>
    );
  });

  return (
    <Fragment>
      {appCtx.assetTypes.length > 0 && (
        <Grid container spacing={2}>
          {listItems}
        </Grid>
      )}
      {appCtx.assetTypesLoaded && appCtx.assetTypes.length <= 0 && (
        <Typography>No asset types to show.</Typography>
      )}
      {!appCtx.assetTypesLoaded && (
        <div className={classes.loading}>
          <CircularProgress disableShrink />
        </div>
      )}
    </Fragment>
  );
};

export default AssetTypesList;
