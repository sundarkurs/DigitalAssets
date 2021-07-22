import { Fragment } from "react";
import AssetCard from "../Card/AssetCard";
import Grid from "@material-ui/core/Grid";

const AssetsList = (props) => {
  const onAssetClickHandler = (asset) => {};

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
