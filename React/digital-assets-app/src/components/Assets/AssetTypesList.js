import { Fragment, useContext } from "react";
import AssetTypeCard from "./AssetTypeCard";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router";
import AppContext from "../../store/AppContext/app-context";

const AssetTypesList = () => {
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
          onAssetTypeClick={onAssetTypeClickHandler}
        ></AssetTypeCard>
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

export default AssetTypesList;
