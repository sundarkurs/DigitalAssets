import { Fragment, useContext } from "react";
import AssetCard from "../Card/AssetCard";
import Grid from "@material-ui/core/Grid";
import ExplorerContext from "../../../store/ExplorerContext/explorer-context";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AssetLoading from "../Card/AssetLoading";

const AssetsList = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const { assets, loading, assetTypeCode } = props;

  const editHandler = (asset) => {
    explorerCtx.editAsset(asset);
  };

  const viewFilesHandler = (asset) => {
    explorerCtx.assetFiles(asset);
  };

  const addFileHandler = (asset) => {
    explorerCtx.addFile(asset);
  };

  const deleteHandler = (asset) => {
    explorerCtx.deleteAsset(asset);
  };

  var listItems = [];

  if (assets && assets.length > 0) {
    listItems.push(
      assets.map((asset) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={asset.id}>
            <AssetCard
              asset={asset}
              assetTypeCode={assetTypeCode}
              actions={[
                {
                  icon: <EditIcon onClick={() => editHandler(asset)} />,
                  name: "Edit",
                },
                {
                  icon: <DeleteIcon onClick={() => deleteHandler(asset)} />,
                  name: "Delete",
                },
                {
                  icon: (
                    <PhotoLibraryIcon onClick={() => viewFilesHandler(asset)} />
                  ),
                  name: "View files",
                },
                {
                  icon: (
                    <AddPhotoAlternateIcon
                      onClick={() => addFileHandler(asset)}
                    />
                  ),
                  name: "Upload file",
                },
              ]}
            ></AssetCard>
          </Grid>
        );
      })
    );
  }

  if (loading) {
    listItems.push(
      <Grid item xs={12} sm={6} md={4} lg={3} key={999}>
        <AssetLoading></AssetLoading>
      </Grid>
    );
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        {listItems}
      </Grid>
    </Fragment>
  );
};

export default AssetsList;
