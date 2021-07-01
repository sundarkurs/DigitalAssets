import { Fragment, useContext } from "react";
import AssetCard from "./AssetCard";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router";
import AppContext from "../../../store/AppContext/app-context";

const AssetsList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const appCtx = useContext(AppContext);

  const onAssetClickHandler = (asset) => {
    history.push(location.pathname + "/" + asset.id.toLowerCase());
  };

  const listItems = props.assets.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <AssetCard asset={item} onAssetClick={onAssetClickHandler}></AssetCard>
      </Grid>
    );
  });

  return (
    <Fragment>
      <Grid container spacing={2}>
        {listItems}
      </Grid>
    </Fragment>
  );
};

export default AssetsList;
