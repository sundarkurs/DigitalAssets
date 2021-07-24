import { Fragment, useContext } from "react";
import AssetCard from "../Card/AssetCard";
import Grid from "@material-ui/core/Grid";
import ExplorerContext from "../../../store/ExplorerContext/explorer-context";
import EditIcon from "@material-ui/icons/Edit";
import ImageIcon from "@material-ui/icons/Image";

const AssetsList = (props) => {
  const explorerCtx = useContext(ExplorerContext);

  const editHandler = (asset) => {
    explorerCtx.editAsset(asset);
  };

  const filesHandler = (asset) => {
    explorerCtx.assetFiles(asset);
  };

  const listItems = props.assets.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <AssetCard
          asset={item}
          actions={[
            {
              icon: <EditIcon onClick={() => editHandler(item)} />,
              name: "Edit",
            },
            {
              icon: <ImageIcon onClick={() => filesHandler(item)} />,
              name: "Files",
            },
          ]}
        ></AssetCard>
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
