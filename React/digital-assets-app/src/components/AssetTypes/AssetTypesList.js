import { Fragment, useContext } from "react";
import AssetTypeCard from "./AssetTypeCard";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router";
import AppContext from "../../store/AppContext/app-context";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./AssetTypesList.module.css";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const AssetTypesList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const appCtx = useContext(AppContext);

  const styles = useStyles();

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
      <Box display="flex" flexDirection="row-reverse" component="div">
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          startIcon={<AddBoxIcon />}
          onClick={props.onAdd}
        >
          Add
        </Button>
      </Box>

      <Divider className={styles.divider}></Divider>
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
