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

  const classes = useStyles();

  const onAssetTypeClickHandler = (assetType) => {
    history.push(location.pathname + "/" + assetType.code.toLowerCase());
  };

  const listItems = appCtx.assetTypes.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={item.id}>
        <AssetTypeCard
          assetType={item}
          onAssetTypeClick={onAssetTypeClickHandler}
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
          className={classes.button}
          startIcon={<AddBoxIcon />}
          onClick={props.openDetailsPanel}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>

      <Divider className={classes.divider}></Divider>
      {appCtx.assetTypes.length > 0 && (
        <Grid container spacing={2}>
          {listItems}
        </Grid>
      )}
      {appCtx.assetTypes.length <= 0 && <p>No asset types to show.</p>}
    </Fragment>
  );
};

export default AssetTypesList;
