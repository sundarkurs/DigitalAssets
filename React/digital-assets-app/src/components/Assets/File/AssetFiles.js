import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import ExplorerContext from "../../../store/ExplorerContext/explorer-context";
import { useContext, useEffect, useState } from "react";
import useRightPanelStyles from "../../Styles/right-panel-styles";
import axios from "../../../store/DbContext/assets-db-context";
import AssetFileRow from "./AssetFileRow";
import AssetImageList from "./AssetImageList";

const AssetFiles = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const rpStyles = useRightPanelStyles();
  const [files, setFiles] = useState([]);

  const { asset, assetTypeCode } = props;

  useEffect(() => {
    getAssetFiles(asset.id);
  }, [asset.id]);

  const getAssetFiles = (assetId) => {
    axios
      .get(`${assetTypeCode}/${assetId}/files`)
      .then((response) => {
        setFiles(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box display="flex" className={rpStyles.toolbar}>
        <Typography variant="h6">Asset files</Typography>
        <CloseIcon
          className={rpStyles.closeIcon}
          onClick={explorerCtx.closeDrawer}
        />
      </Box>
      <Divider className={rpStyles.divider}></Divider>
      <Typography variant="subtitle1">Asset name: {asset.name}</Typography>
      {/* <AssetFileRow files={files}></AssetFileRow> */}
      <AssetImageList files={files}></AssetImageList>
    </>
  );
};

export default AssetFiles;
